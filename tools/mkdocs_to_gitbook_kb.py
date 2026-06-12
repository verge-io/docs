#!/usr/bin/env python3
"""Convert MkDocs Material knowledge-base articles to a GitBook space layout.

Source:  docs/knowledge-base/posts/*.md  (MkDocs Material + YAML frontmatter)
Output:  kb/  (GitBook-flavored Markdown: README.md, SUMMARY.md, 9 category
         sections, .gitbook/assets/) -- the directory is regenerated from
         scratch on every run.

Re-run after editing source articles:  python3 tools/mkdocs_to_gitbook_kb.py
"""

import os
import re
import shutil
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
DOCS = REPO / "docs"
SRC = DOCS / "knowledge-base" / "posts"
DST = REPO / "kb"
ASSETS = DST / ".gitbook" / "assets"

DOCS_SITE = "https://docs.verge.io"

# MkDocs admonition type -> GitBook hint style
HINT_STYLE = {
    "note": "info",
    "info": "info",
    "question": "info",
    "example": "info",
    "tip": "success",
    "success": "success",
    "warning": "warning",
    "important": "warning",
    "danger": "danger",
}

# Sections in display order: (dir, title, card blurb, README intro sentence)
SECTIONS = [
    ("getting-started", "Getting Started & Installation",
     "Install, license, and update VergeOS",
     "Articles to help you plan, install, license, and update VergeOS."),
    ("virtual-machines", "Virtual Machines",
     "Create, import, and manage VMs and guest workloads",
     "How-to guides for creating, importing, configuring, and managing virtual machines."),
    ("networking", "Networking",
     "Networks, rules, routing, VPNs, and firewalls",
     "Guides for VergeOS networking — networks, rules, routing, VPNs, and firewalls."),
    ("storage-vsan", "Storage & vSAN",
     "vSAN architecture, tiers, scaling, and NAS",
     "Articles covering vSAN architecture, storage tiers, scaling, encryption, and NAS."),
    ("tenants", "Tenants",
     "Build and operate multi-tenant environments",
     "Guides for creating and operating tenants in multi-tenant VergeOS environments."),
    ("backup-dr", "Backup & DR",
     "Snapshots, syncs, and disaster recovery",
     "Snapshots, sync jobs, restores, and disaster recovery guidance."),
    ("automation-api", "Automation & API",
     "REST API, scripting, Terraform, and task automation",
     "Working with the VergeOS API, automation tasks, Terraform, and integration tooling."),
    ("system-administration", "System Administration",
     "Updates, security, authentication, and platform management",
     "Platform administration topics — updates, security, authentication, branding, and performance."),
    ("troubleshooting", "Troubleshooting",
     "Diagnose and resolve common issues",
     "Diagnostic procedures and fixes for common VergeOS issues."),
]

# Assignment PRIORITY order (first section whose category list matches any of
# the article's categories wins) -> section dir: [source categories]
PRIORITY = [
    ("tenants", ["Tenant", "Tenants"]),
    ("networking", ["Network", "Network Configuration", "Network Rules",
                    "Network Security", "Network Services", "VPN", "Firewall"]),
    ("backup-dr", ["Backup", "Backup and DR", "Snapshot"]),
    ("storage-vsan", ["vSAN", "Storage", "NAS", "Scale Up"]),
    ("automation-api", ["API", "API Reference", "Automation", "Development"]),
    ("virtual-machines", ["VM", "VMs", "Virtual Machines", "Media Images",
                          "Migration", "VMware"]),
    ("getting-started", ["Installation", "Getting Started", "Licensing"]),
    ("system-administration", ["System Administration", "Security",
                               "Authentication", "Cluster Settings", "Clusters",
                               "Maintenance", "Software Updates", "UI",
                               "Branding", "Performance",
                               "Advanced Configuration", "Best Practices"]),
    ("troubleshooting", ["Troubleshooting"]),
]
FALLBACK_SECTION = "system-administration"

# Broken source links -> correct target (slug that exists)
LINK_FIXES = {
    "/knowledge-base/posts/understanding-vsan-growth":
        "/knowledge-base/understanding-and-explaining-unexpected-vsan-growth",
}

warnings = []
notes = []


def warn(msg):
    warnings.append(msg)


def note(msg):
    notes.append(msg)


# ---------------------------------------------------------------- frontmatter

def unquote(val):
    val = val.strip()
    if len(val) >= 2 and val[0] in "\"'" and val[-1] == val[0]:
        val = val[1:-1]
    return val


def parse_frontmatter(text):
    m = re.match(r"\A---\n(.*?)\n---\n", text, re.DOTALL)
    if not m:
        return {}, text
    fm_text, body = m.group(1), text[m.end():]
    fm = {}
    for key in ("title", "slug", "description"):
        km = re.search(rf"^{key}:\s*(.+)$", fm_text, re.MULTILINE)
        if km:
            fm[key] = unquote(km.group(1))
    cm = re.search(r"^categories:\n((?:[ \t]+-[ \t]*.*\n?)+)", fm_text, re.MULTILINE)
    fm["categories"] = (
        [unquote(c) for c in re.findall(r"^[ \t]+-[ \t]*(.+)$", cm.group(1), re.MULTILINE)]
        if cm else []
    )
    return fm, body


def yaml_quote(s):
    return '"' + s.replace("\\", "\\\\").replace('"', '\\"') + '"'


# -------------------------------------------------------------- block helpers

FENCE_RE = re.compile(r"^\s*(```|~~~)")


def dedent4(lines):
    """Dedent an admonition/collapsible body by exactly 4 spaces."""
    out = []
    for l in lines:
        if not l.strip():
            out.append("")
        elif l.startswith("    "):
            out.append(l[4:])
        else:
            out.append(l.lstrip())
    while out and not out[0].strip():
        out.pop(0)
    while out and not out[-1].strip():
        out.pop()
    return out


def collect_indented_body(lines, i, min_indent):
    """Collect lines at index >= i that are blank or indented > min_indent."""
    body = []
    while i < len(lines):
        l = lines[i]
        if not l.strip():
            body.append(l)
            i += 1
            continue
        if len(l) - len(l.lstrip()) > min_indent:
            body.append(l)
            i += 1
            continue
        break
    while body and not body[-1].strip():
        body.pop()
    return body, i


def convert_collapsibles(lines, name):
    """??? type "Title" / ???+ type "Title"  ->  <details>...</details>."""
    out = []
    i = 0
    in_fence = False
    while i < len(lines):
        line = lines[i]
        if FENCE_RE.match(line):
            in_fence = not in_fence
        m = None if in_fence else re.match(
            r'^\?\?\?\+?\s+([\w-]+)(?:\s+"(.*)")?\s*$', line)
        if not m:
            out.append(line)
            i += 1
            continue
        title = m.group(2) or m.group(1).replace("-", " ").title()
        body, i = collect_indented_body(lines, i + 1, 3)
        body = dedent4(body)
        if out and out[-1].strip():
            out.append("")
        out += ["<details>", "", f"<summary>{title}</summary>", ""]
        out += body
        out += ["", "</details>"]
        if i < len(lines) and lines[i].strip():
            out.append("")
    return out


PARA_FOLD_RE = re.compile(r"^[^\s#>*\-`\d!|<]")  # plain paragraph text


def convert_admonitions(lines, name):
    """!!! type "Title"  ->  {% hint %} (top level) or blockquote (indented)."""
    out = []
    i = 0
    in_fence = False
    while i < len(lines):
        line = lines[i]
        if FENCE_RE.match(line):
            in_fence = not in_fence
        m = None if in_fence else re.match(
            r'^(\s*)!!!\s+([\w-]+)(\s+annotate)?(?:\s+"(.*)")?\s*$', line)
        if not m:
            out.append(line)
            i += 1
            continue
        indent, kind, annotate, title = m.groups()
        style = HINT_STYLE.get(kind.lower())
        if style is None:
            style = "info"
            warn(f"{name}: unknown admonition type !!! {kind} -> info")

        if not indent:
            body, i = collect_indented_body(lines, i + 1, 3)
            body = dedent4(body)
            if annotate:
                # MkDocs annotations: pull trailing `N. text` definitions
                # into the hint body as plain `(N) text` lines.
                j = i
                while j < len(lines) and not lines[j].strip():
                    j += 1
                pulled = 0
                while j < len(lines) and re.match(r"^\d+\.\s+\S", lines[j]):
                    am = re.match(r"^(\d+)\.\s+(.*)$", lines[j])
                    body += ["", f"({am.group(1)}) {am.group(2)}"]
                    pulled += 1
                    j += 1
                if pulled:
                    i = j
                note(f"{name}: converted '!!! {kind} annotate' "
                     f"({pulled} definition(s) inlined)")
            if out and out[-1].strip():
                out.append("")
            out.append(f'{{% hint style="{style}" %}}')
            if title:
                out.append(f"**{title}**")
                if body:
                    out.append("")
            out.extend(body)
            out.append("{% endhint %}")
            if i < len(lines) and lines[i].strip():
                out.append("")
        else:
            # Nested in a list item: hints don't nest reliably -> blockquote
            body, i = collect_indented_body(lines, i + 1, len(indent))
            body = dedent4(body)
            label = title or kind.replace("-", " ").title()
            if not body:
                # Malformed source: body missing. Fold the next plain
                # paragraph line in if it clearly belongs to the admonition.
                if (i < len(lines) and lines[i].strip()
                        and PARA_FOLD_RE.match(lines[i].lstrip())):
                    body = [lines[i].strip()]
                    i += 1
                    note(f"{name}: folded orphan paragraph into nested "
                         f"!!! {kind} blockquote")
                elif title:
                    # All content lives in the title (e.g. a one-line tip)
                    body = [title]
                    label = kind.replace("-", " ").title()
                    note(f"{name}: nested !!! {kind} had title-only content")
                else:
                    warn(f"{name}: empty nested admonition !!! {kind}")
            if body:
                out.append(f"{indent}> **{label}:** {body[0].strip()}")
                for bl in body[1:]:
                    out.append(f"{indent}> {bl}".rstrip())
            else:
                out.append(f"{indent}> **{label}:**")
            if i < len(lines) and lines[i].strip():
                out.append("")
    return out


def strip_mkdocs_markup(text, name):
    """Strip leftover MkDocs Material-specific inline markup."""
    for pat, what in [
        (r"\[TOC\]\n?", "[TOC]"),
        (r"\{:?\s*\.[\w-]+[^}]*\}", "attribute list { .x }"),
        (r":(?:material|octicons|fontawesome)-[\w-]+:", "icon shortcode"),
    ]:
        text, n = re.subn(pat, "", text)
        if n:
            note(f"{name}: stripped {n}x {what}")
    return text


# -------------------------------------------------------------------- images

# Balanced-paren target: tolerates one level of () inside filenames
REF_RE = re.compile(r"(!?)\[([^\]]*)\]\(([^()\s]*(?:\([^()]*\)[^()\s]*)*)\)")

copied_assets = {}  # asset filename -> source Path


def copy_asset(src_file):
    """Copy image into kb/.gitbook/assets, dedupe by filename."""
    name = src_file.name
    existing = copied_assets.get(name)
    if existing is not None and existing != src_file:
        if existing.read_bytes() == src_file.read_bytes():
            return name
        stem, dot, ext = name.partition(".")
        n = 2
        while f"{stem}-{n}{dot}{ext}" in copied_assets:
            n += 1
        name = f"{stem}-{n}{dot}{ext}"
        warn(f"asset name collision: {src_file} copied as {name}")
    copied_assets[name] = src_file
    dest = ASSETS / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copyfile(src_file, dest)
    return name


def resolve_image(path, name):
    """Find an image's source file on disk."""
    candidates = [
        DOCS / path.lstrip("/"),
        SRC / path,
        DOCS / "assets" / path,
    ]
    for c in candidates:
        if c.is_file():
            return c
    warn(f"{name}: missing image {path}")
    return None


# --------------------------------------------------------------------- links

def make_ref_rewriter(slug_map, stem_map, out_rel, name, stats):
    out_dir = out_rel.parent

    def rel_to(target_rel):
        return os.path.relpath(target_rel, out_dir)

    def rewrite(m):
        bang, label, target = m.group(1), m.group(2), m.group(3)
        path, _, frag = target.partition("#")
        anchor = "#" + frag if frag else ""
        path, _, query = path.partition("?")
        if query:
            note(f"{name}: dropped query string ?{query} from {target}")

        if bang:  # ---- image ----
            if frag == "only-dark":
                stats["dark_dropped"] += 1
                return ""  # light variant is kept; GitBook has no scheme tags
            if frag == "only-light":
                stats["light_kept"] += 1
                anchor = ""
            src_file = resolve_image(path, name)
            if src_file is None:
                return m.group(0)  # leave reference unchanged
            asset_name = copy_asset(src_file)
            return f"![{label}]({rel_to(Path('.gitbook/assets') / asset_name)}{anchor})"

        # ---- link ----
        if not path:  # pure anchor
            return m.group(0)
        if re.match(r"^(https?:|mailto:)", path):
            return m.group(0)
        path = LINK_FIXES.get(path, path)

        kb = re.match(r"^/knowledge-base/(?:posts/)?([^/]+)/?$", path)
        if kb:
            slug = kb.group(1).lower()
            if slug in slug_map:
                return f"[{label}]({rel_to(slug_map[slug])}{anchor})"
            warn(f"{name}: unresolved KB link {target} -> docs.verge.io URL")
            return f"[{label}]({DOCS_SITE}{path.rstrip('/')}/{anchor})"

        if path.startswith("/"):  # other docs-site page -> absolute URL
            clean = re.sub(r"\.md$", "", path).rstrip("/")
            return f"[{label}]({DOCS_SITE}{clean}/{anchor})"

        if path.endswith(".md"):  # relative link to a sibling post
            stem = Path(path).name[:-3].lower()
            if stem in stem_map:
                return f"[{label}]({rel_to(stem_map[stem])}{anchor})"
            slug = Path(path).name[:-3].lower()
            if slug in slug_map:
                return f"[{label}]({rel_to(slug_map[slug])}{anchor})"
            warn(f"{name}: unresolved relative link {target}")
            return m.group(0)

        warn(f"{name}: unrecognized link target {target}")
        return m.group(0)

    return rewrite


def rewrite_refs_outside_fences(text, rewrite):
    out = []
    in_fence = False
    for line in text.split("\n"):
        if FENCE_RE.match(line):
            in_fence = not in_fence
            out.append(line)
            continue
        out.append(line if in_fence else REF_RE.sub(rewrite, line))
    return "\n".join(out)


# ------------------------------------------------------------------ articles

def assign_section(categories, name):
    cats = {c.strip().lower() for c in categories}
    for section_dir, source_cats in PRIORITY:
        if cats & {s.lower() for s in source_cats}:
            return section_dir
    warn(f"{name}: no category match {categories} -> {FALLBACK_SECTION}")
    return FALLBACK_SECTION


def truncate(text, limit=140):
    if len(text) <= limit:
        return text
    cut = text[:limit].rsplit(" ", 1)[0]
    return cut.rstrip(" ,;:.") + "…"


def convert_article(src_path, fm, body, out_rel, slug_map, stem_map, stats):
    name = src_path.name
    lines = body.split("\n")
    lines = convert_collapsibles(lines, name)
    lines = convert_admonitions(lines, name)
    body = "\n".join(lines)
    body = strip_mkdocs_markup(body, name)
    body = rewrite_refs_outside_fences(
        body, make_ref_rewriter(slug_map, stem_map, out_rel, name, stats))
    body = re.sub(r"[ \t]+$", "", body, flags=re.MULTILINE)
    body = re.sub(r"\n{3,}", "\n\n", body).strip() + "\n"

    if not body.startswith("# "):
        body = f"# {fm.get('title', src_path.stem)}\n\n" + body
        note(f"{name}: added H1 from frontmatter title")

    parts = []
    if fm.get("description"):
        parts.append(f"---\ndescription: {yaml_quote(fm['description'])}\n---\n\n")
    else:
        warn(f"{name}: no description in frontmatter")
    parts.append(body)
    out_path = DST / out_rel
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text("".join(parts), encoding="utf-8")


# ------------------------------------------------------------------ indexes

def html_escape(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def write_landing():
    rows = []
    for d, title, blurb, _ in SECTIONS:
        rows.append(
            f"<tr><td><strong>{html_escape(title)}</strong></td>"
            f"<td>{html_escape(blurb)}</td>"
            f'<td><a href="{d}/README.md">{d}/README.md</a></td></tr>'
        )
    table = (
        '<table data-view="cards"><thead><tr><th></th><th></th>'
        '<th data-hidden data-card-target data-type="content-ref"></th>'
        "</tr></thead><tbody>" + "".join(rows) + "</tbody></table>"
    )
    desc = ("Searchable how-to guides, troubleshooting articles, and best "
            "practices for VergeOS.")
    (DST / "README.md").write_text(
        f"---\ndescription: {yaml_quote(desc)}\n---\n\n"
        "# VergeOS Knowledge Base\n\n"
        "Welcome to the VergeOS Knowledge Base — a library of how-to guides, "
        "configuration examples, troubleshooting articles, and best practices "
        "maintained by the VergeOS documentation team. Browse a category below "
        "or use search to find what you need.\n\n"
        f"{table}\n",
        encoding="utf-8",
    )


def write_section_readmes(by_section):
    for d, title, _, intro in SECTIONS:
        items = []
        for art in sorted(by_section[d], key=lambda a: a["title"].lower()):
            line = f"* [{art['title']}]({art['file']})"
            if art["description"]:
                line += f" — {truncate(art['description'])}"
            items.append(line)
        (DST / d / "README.md").parent.mkdir(parents=True, exist_ok=True)
        (DST / d / "README.md").write_text(
            f"# {title}\n\n{intro}\n\n" + "\n".join(items) + "\n",
            encoding="utf-8",
        )


def write_summary(by_section):
    out = ["# Table of contents", "", "* [VergeOS Knowledge Base](README.md)"]
    for d, title, _, _ in SECTIONS:
        out.append(f"* [{title}]({d}/README.md)")
        for art in sorted(by_section[d], key=lambda a: a["title"].lower()):
            out.append(f"  * [{art['title']}]({d}/{art['file']})")
    (DST / "SUMMARY.md").write_text("\n".join(out) + "\n", encoding="utf-8")


def write_gitbook_yaml():
    (REPO / ".gitbook.yaml").write_text(
        "root: ./kb/\n\nstructure:\n  readme: README.md\n  summary: SUMMARY.md\n",
        encoding="utf-8",
    )


# --------------------------------------------------------------------- main

def main():
    if DST.exists():
        shutil.rmtree(DST)
    ASSETS.mkdir(parents=True)

    posts = sorted(p for p in SRC.glob("*.md"))
    articles = []
    used_names = {}
    for p in posts:
        fm, body = parse_frontmatter(p.read_text(encoding="utf-8"))
        slug = (fm.get("slug") or p.stem).lower()
        if slug in used_names:
            warn(f"output filename collision: {slug} ({p.name} vs "
                 f"{used_names[slug]})")
            slug = f"{slug}-{len(used_names)}"
        used_names[slug] = p.name
        section = assign_section(fm.get("categories", []), p.name)
        articles.append({
            "src": p,
            "fm": fm,
            "body": body,
            "slug": slug,
            "title": fm.get("title", p.stem),
            "description": fm.get("description", ""),
            "section": section,
            "file": f"{slug}.md",
            "out_rel": Path(section) / f"{slug}.md",
        })

    slug_map = {a["slug"]: a["out_rel"] for a in articles}
    stem_map = {a["src"].stem.lower(): a["out_rel"] for a in articles}

    stats = {"dark_dropped": 0, "light_kept": 0}
    by_section = {d: [] for d, *_ in SECTIONS}
    for a in articles:
        convert_article(a["src"], a["fm"], a["body"], a["out_rel"],
                        slug_map, stem_map, stats)
        by_section[a["section"]].append(a)

    write_landing()
    write_section_readmes(by_section)
    write_summary(by_section)
    write_gitbook_yaml()

    print(f"Converted {len(articles)} articles, "
          f"copied {len(copied_assets)} assets -> {DST}")
    print(f"Light/dark image pairs: kept {stats['light_kept']} light, "
          f"dropped {stats['dark_dropped']} dark variants")
    print("\nPer-section counts:")
    for d, title, *_ in SECTIONS:
        print(f"  {title}: {len(by_section[d])}")
    print("\nAssignments:")
    for d, title, *_ in SECTIONS:
        for a in sorted(by_section[d], key=lambda a: a["slug"]):
            print(f"  {d}/{a['file']}  <-  {a['src'].name}  "
                  f"{a['fm'].get('categories')}")
    if notes:
        print("\nNotes:")
        for n in notes:
            print(f"  NOTE: {n}")
    if warnings:
        print("\nWarnings:", file=sys.stderr)
        for w in warnings:
            print(f"  WARNING: {w}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    sys.exit(main())

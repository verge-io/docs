#!/usr/bin/env python3
"""
Validate that all documentation Markdown files have YAML frontmatter.

Frontmatter is the YAML block between --- delimiters at the top of a file.
At minimum, every doc must have a `title` and `description` field.
"""

import re
import sys
from pathlib import Path

# Files and directories excluded from frontmatter requirements
EXCLUDE_PATHS = {
    "docs/index.md",
    "docs/support.md",
    "docs/how-to-write-a-verge-guide.md",
    "docs/knowledge-base/template.md",
    "docs/knowledge-base/index.md",
}

EXCLUDE_DIRS = {
    "docs/overrides",
    "docs/stylesheets",
    "docs/javascripts",
    "docs/assets",
}

# Fields required in all frontmatter
REQUIRED_FIELDS = {"title", "description"}

# Additional fields required for knowledge base articles
KB_REQUIRED_FIELDS = {"title", "slug", "description", "date", "tags", "categories"}


def parse_frontmatter(content: str) -> dict | None:
    """Extract frontmatter fields from file content. Returns None if no frontmatter."""
    if not content.startswith("---"):
        return None

    match = re.match(r"^---\s*\n(.*?)\n---", content, re.DOTALL)
    if not match:
        return None

    fields = {}
    for line in match.group(1).splitlines():
        key_match = re.match(r"^(\w[\w_-]*)\s*:", line)
        if key_match:
            fields[key_match.group(1)] = True

    return fields


def should_check(file_path: Path, repo_root: Path) -> bool:
    """Determine if a file should be checked for frontmatter."""
    relative = str(file_path.relative_to(repo_root))

    if relative in EXCLUDE_PATHS:
        return False

    for exclude_dir in EXCLUDE_DIRS:
        if relative.startswith(exclude_dir):
            return False

    return True


def is_kb_article(file_path: Path, repo_root: Path) -> bool:
    """Check if a file is a knowledge base article."""
    relative = str(file_path.relative_to(repo_root))
    return relative.startswith("docs/knowledge-base/posts/")


def validate_file(file_path: Path, repo_root: Path) -> list[str]:
    """Validate frontmatter for a single file. Returns list of error messages."""
    errors = []
    relative = str(file_path.relative_to(repo_root))
    content = file_path.read_text(encoding="utf-8")

    fields = parse_frontmatter(content)

    if fields is None:
        errors.append(f"  {relative}: missing frontmatter")
        return errors

    required = KB_REQUIRED_FIELDS if is_kb_article(file_path, repo_root) else REQUIRED_FIELDS

    missing = required - set(fields.keys())
    if missing:
        errors.append(f"  {relative}: missing required fields: {', '.join(sorted(missing))}")

    return errors


def main():
    repo_root = Path(__file__).parent.parent.parent
    docs_dir = repo_root / "docs"

    if not docs_dir.exists():
        print(f"Error: {docs_dir} not found")
        sys.exit(1)

    all_errors = []

    for md_file in sorted(docs_dir.rglob("*.md")):
        if not should_check(md_file, repo_root):
            continue
        all_errors.extend(validate_file(md_file, repo_root))

    if all_errors:
        print("ERROR: Frontmatter validation failed:")
        print("=" * 70)
        for error in all_errors:
            print(error)
        print("=" * 70)
        print(f"Found {len(all_errors)} file(s) with missing or incomplete frontmatter.")
        print()
        print("Every documentation file needs YAML frontmatter with at least:")
        print("  title, description")
        print()
        print("Knowledge base articles additionally require:")
        print("  slug, date, tags, categories")
        sys.exit(1)
    else:
        print(f"All documentation files have valid frontmatter.")
        sys.exit(0)


if __name__ == "__main__":
    main()

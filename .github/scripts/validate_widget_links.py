#!/usr/bin/env python3
"""
Validate that all URLs in widget_to_docs_map.json point to existing documentation files.

These links are embedded in the VergeOS UI and cannot change without breaking the product.
"""

import json
import os
import re
import sys
from pathlib import Path


def get_kb_slugs(docs_dir: Path) -> set[str]:
    """Extract all slugs from knowledge base posts."""
    slugs = set()
    kb_posts_dir = docs_dir / "knowledge-base" / "posts"

    if not kb_posts_dir.exists():
        return slugs

    for md_file in kb_posts_dir.glob("*.md"):
        content = md_file.read_text()
        match = re.search(r'^slug:\s*(.+)$', content, re.MULTILINE)
        if match:
            slugs.add(match.group(1).strip())

    return slugs


def normalize_path(url_path: str) -> str:
    """Remove query parameters and trailing slashes from URL path."""
    # Remove query parameters
    path = url_path.split('?')[0]
    # Remove trailing slash
    path = path.rstrip('/')
    return path


def validate_widget_links(json_path: Path, docs_dir: Path) -> list[tuple[str, str]]:
    """
    Validate all links in the widget map.

    Returns a list of (widget_key, url_path) tuples for broken links.
    """
    with open(json_path) as f:
        data = json.load(f)

    widget_map = data.get('widget_to_docs_map', {})
    kb_slugs = get_kb_slugs(docs_dir)
    broken_links = []

    for widget_key, url_path in widget_map.items():
        normalized = normalize_path(url_path)

        # Check if it's a knowledge-base link (uses slugs)
        if normalized.startswith('knowledge-base/'):
            slug = normalized.replace('knowledge-base/', '')
            if slug not in kb_slugs:
                broken_links.append((widget_key, url_path))
        else:
            # It's a product-guide or other direct path
            md_path = docs_dir / f"{normalized}.md"
            # Also check for index.md in directory
            index_path = docs_dir / normalized / "index.md"

            if not md_path.exists() and not index_path.exists():
                broken_links.append((widget_key, url_path))

    return broken_links


def main():
    # Determine paths
    script_dir = Path(__file__).parent
    repo_root = script_dir.parent.parent
    json_path = script_dir.parent / "widget_to_docs_map.json"
    docs_dir = repo_root / "docs"

    if not json_path.exists():
        print(f"Error: {json_path} not found")
        sys.exit(1)

    if not docs_dir.exists():
        print(f"Error: {docs_dir} not found")
        sys.exit(1)

    broken_links = validate_widget_links(json_path, docs_dir)

    if broken_links:
        print("ERROR: The following widget links point to non-existent documentation:")
        print("=" * 70)
        for widget_key, url_path in broken_links:
            print(f"  Widget: {widget_key}")
            print(f"  URL:    {url_path}")
            print()
        print("=" * 70)
        print(f"Found {len(broken_links)} broken link(s).")
        print()
        print("These links are embedded in the VergeOS UI.")
        print("Either create the missing documentation or update the widget map.")
        sys.exit(1)
    else:
        print("All widget links are valid.")
        sys.exit(0)


if __name__ == "__main__":
    main()

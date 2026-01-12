# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the VergeOS documentation repository, built with MkDocs Material. The site is published to https://docs.verge.io.

## Commands

```bash
# Setup (one-time)
python -m venv venv
source venv/bin/activate  # macOS/Linux (Windows: .\venv\Scripts\activate)
pip install -r requirements.txt

# Run locally (serves at http://127.0.0.1:8000)
mkdocs serve

# Build site
mkdocs build
```

## Architecture

- **Navigation**: All site navigation is defined in `mkdocs.yml` under the `nav:` key. New pages must be added here to appear on the site.
- **Blog plugin**: Knowledge base uses the MkDocs blog plugin (`blog_dir: knowledge-base`). KB articles go in `docs/knowledge-base/posts/` and require specific frontmatter.
- **Theme customizations**: Custom CSS in `docs/stylesheets/extra.min.css`, JS in `docs/javascripts/extra.js`, and theme overrides in `docs/overrides/` (includes `main.html` and `home.html`).
- **Style guide**: Detailed writing guidance is in `docs/how-to-write-a-verge-guide.md`.

## Content Guidelines

### Knowledge Base Articles
Place new KB articles in `docs/knowledge-base/posts/`. Use the template at `docs/knowledge-base/template.md`. Required frontmatter:
```yaml
---
title: Article Title
slug: url-friendly-title
description: Brief description
author: Author Name
published: true
date: YYYY-MM-DD
tags: [tag1, tag2]
categories:
  - Category1
---
```

KB articles should include: Overview with key points, Prerequisites, Steps, Examples, Troubleshooting, and Additional Resources sections.

### Writing Style
- Use "we" for shared learning ("we have just seen", "we now understand")
- Use "you" for user-specific actions ("edit your file", "your directory")
- Keep guides focused on one topic, 15-30 minutes to complete
- Each step should be concise (5-10 minutes) and end with tangible progress
- Avoid external links mid-guide; place them in first/last steps only

### Markdown Features (MkDocs Material)
- Admonitions: `!!! note`, `!!! tip`, `!!! warning`, `!!! info`, `!!! question`, `!!! danger`, `!!! success`, `!!! failure`, `!!! bug`, `!!! example`, `!!! quote`, `!!! abstract`
- Collapsible blocks: `??? note` (collapsed), `???+ note` (expanded)
- Content tabs: `=== "Tab 1"` / `=== "Tab 2"`
- Task lists: `- [x] Done` / `- [ ] Todo`
- Mermaid diagrams in fenced code blocks
- Glightbox for image lightboxes

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/ci.yml`. CI uses MkDocs Material Insiders (private repo).

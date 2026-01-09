# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the VergeOS documentation repository, built with MkDocs Material. The site is published to https://docs.verge.io.

## Commands

```bash
# Setup (one-time)
python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt

# Run locally
mkdocs serve

# Build site
mkdocs build
```

## Repository Structure

- `docs/` - All documentation content
  - `product-guide/` - Main product documentation organized by feature area
  - `implementation-guide/` - Installation and setup guides
  - `knowledge-base/posts/` - Blog-style KB articles (uses MkDocs blog plugin)
  - `reference-architecture/` - Reference architecture documents
  - `release-notes/` - Version release notes
  - `assets/` - Images and static files
  - `overrides/` - MkDocs theme customizations
- `mkdocs.yml` - Site configuration and navigation structure
- `kb-template.md` - Template for new knowledge base articles

## Content Guidelines

### Knowledge Base Articles
Use the template in `docs/knowledge-base/template.md`. Required frontmatter:
```yaml
---
title: [Article Title]
slug: [url-friendly-title]
description: [Brief description]
author: [Author Name]
published: [true/false]
date: [YYYY-MM-DD]
tags: [tag1, tag2, tag3]
categories:
  - [Category1]
---
```

### Writing Style
- Use "we" for shared learning ("we have just seen", "we now understand")
- Use "you" for user-specific actions ("edit your file", "your directory")
- Keep guides focused on one topic, 15-30 minutes to complete
- Each step should show concrete, visible progress

### Markdown Features (MkDocs Material)
- Admonitions: `!!! note`, `!!! tip`, `!!! warning`, `!!! info`, etc.
- Collapsible blocks: `??? note` (collapsed), `???+ note` (expanded)
- Code blocks with syntax highlighting and copy button
- Mermaid diagrams supported via fenced code blocks

## Deployment

Pushes to `main` trigger automatic deployment to GitHub Pages via `.github/workflows/ci.yml`.

# VergeOS Documentation

Technical documentation for VergeOS hyperconverged infrastructure (HCI) platform.

**Live site:** https://docs.verge.io

## Tech Stack

- **Framework:** MkDocs with Material theme (mkdocs-material)
- **Language:** Markdown
- **Plugins:** mkdocs-glightbox (image lightbox), blog plugin
- **Deployment:** GitHub Pages via GitHub Actions

## Project Structure

```
docs/                        # All documentation content
├── index.md                 # Homepage
├── implementation-guide/    # Installation and setup guides
├── product-guide/           # Feature documentation by category
│   ├── auth/               # Authentication (Azure AD, Google, MFA)
│   ├── backup-dr/          # Snapshots, syncs, disaster recovery
│   ├── nas/                # Network-attached storage
│   ├── networks/           # Networking configuration
│   ├── private-ai/         # AI features
│   ├── storage/            # vSAN, tiers, Fibre Channel
│   ├── system/             # System config, nodes, clusters
│   ├── tenants/            # Multi-tenancy
│   ├── virtual-machines/   # VM management
│   └── vpn/                # IPSec, WireGuard
├── knowledge-base/          # Blog-style articles and how-tos
│   └── posts/              # Individual KB articles
├── reference-architecture/  # Deployment patterns
├── release-notes/          # Version history
├── assets/                 # Images, logos, SVGs
├── stylesheets/            # Custom CSS
├── javascripts/            # Custom JS
└── overrides/              # MkDocs theme overrides
mkdocs.yml                  # Site configuration and navigation
```

## Commands

```bash
# Setup
python -m venv venv
source venv/bin/activate      # macOS/Linux
pip install -r requirements.txt

# Development
mkdocs serve                  # Local dev server at http://127.0.0.1:8000

# Build
mkdocs build --site-dir ./_site
```

## Documentation Conventions

### File Organization

- **Product Guide:** Feature documentation organized by category
- **Knowledge Base:** Step-by-step articles in `docs/knowledge-base/posts/`
- **Implementation Guide:** Installation and deployment procedures

### Knowledge Base Article Template

All KB articles use frontmatter:

```yaml
---
title: [Article Title]
slug: [url-friendly-title]
description: [Brief description]
author: [Author Name]
published: true
date: YYYY-MM-DD
tags: [tag1, tag2, tag3]
categories:
  - [Category]
---
```

### Writing Style

- Use friendly, collaborative tone ("we" not "I")
- Keep guides focused on single topics (15-30 min read time)
- Each step should show tangible progress
- Avoid external links mid-guide (only in first/last sections)
- Separate commands from their output in code blocks

### Markdown Features

MkDocs Material admonitions are available:

```markdown
!!! note "Title"
    Content here

!!! tip "Pro Tip"
    Helpful advice

!!! warning "Caution"
    Important warnings

??? note "Collapsible"
    Hidden by default
```

Supported types: `note`, `abstract`, `info`, `tip`, `success`, `question`, `warning`, `failure`, `danger`, `example`, `bug`, `quote`

### Images

- Store in `docs/assets/`
- Use relative paths: `![Alt text](../assets/image.png)`
- Glightbox plugin enables click-to-zoom

## Navigation

Site navigation is defined in `mkdocs.yml` under `nav:`. The structure mirrors the documentation categories.

## CI/CD

- **Trigger:** Push to `main` branch
- **Build:** `mkdocs build` with Material Insiders theme
- **Deploy:** GitHub Pages via `deploy-pages` action

## Resources

- [MkDocs Material Documentation](https://squidfunk.github.io/mkdocs-material/)
- Style guide: `docs/how-to-write-a-verge-guide.md`
- KB template: `docs/knowledge-base/template.md`

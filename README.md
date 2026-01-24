# VergeOS Documentation

[![Deploy](https://github.com/verge-io/docs/actions/workflows/ci.yml/badge.svg)](https://github.com/verge-io/docs/actions/workflows/ci.yml)
[![MkDocs Material](https://img.shields.io/badge/docs-MkDocs%20Material-blue)](https://squidfunk.github.io/mkdocs-material/)

Official technical documentation for the VergeOS hyperconverged infrastructure (HCI) platform.

**Live Site:** [https://docs.verge.io](https://docs.verge.io)

## Overview

This repository contains the source files for VergeOS product documentation, including installation guides, feature documentation, knowledge base articles, and reference architectures.

## Tech Stack

- **Framework:** [MkDocs](https://www.mkdocs.org/) with [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- **Language:** Markdown
- **Plugins:** mkdocs-glightbox (image lightbox), blog plugin
- **Deployment:** GitHub Pages via GitHub Actions

## Getting Started

### Prerequisites

- Python 3.8+
- pip

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/verge-io/docs.git
   cd docs
   ```

2. **Create and activate a virtual environment**

   macOS / Linux:
   ```bash
   python -m venv venv
   source venv/bin/activate
   ```

   Windows (CMD):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate.bat
   ```

   Windows (PowerShell):
   ```bash
   python -m venv venv
   .\venv\Scripts\activate.ps1
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Start the development server**
   ```bash
   mkdocs serve
   ```

   The site will be available at [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Project Structure

```
docs/
├── implementation-guide/    # Installation and setup procedures
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

| Command | Description |
|---------|-------------|
| `mkdocs serve` | Start local development server with hot-reload |
| `mkdocs build` | Build the static site |
| `mkdocs build --site-dir ./_site` | Build to custom output directory |

## Contributing

### Writing Style

- Use friendly, collaborative tone ("we" not "I")
- Keep guides focused on single topics
- Each step should show tangible progress
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

- Store images in `docs/assets/`
- Use relative paths: `![Alt text](../assets/image.png)`
- Glightbox plugin enables click-to-zoom

### Knowledge Base Articles

KB articles require YAML frontmatter:

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
  - Category
---
```

## Resources

- [MkDocs Material Documentation](https://squidfunk.github.io/mkdocs-material/)
- [VergeOS Website](https://verge.io)
- [Support](mailto:support@verge.io)

## License

Copyright © 2026 [Verge.io](https://verge.io). All rights reserved.

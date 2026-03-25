# Phase 2: Write New Content Pages

Depends on: Phase 1 (directory structure exists)

## Overview
Create the 7 new pages: overview, getting started, vrg CLI, Ansible collection, Packer plugin, and 2 placeholders. Use the existing writing style from other docs in the repo.

## Tasks

### Task 1: Create developer-guide/overview.md
Write the Developer Guide overview page. This is the landing page for the section.

Content should cover:
- What the Developer Guide is for
- Two audiences: application developers (API, SDKs) and platform engineers/DevOps (IaC, CI/CD, CLI)
- Brief overview of each subsection with links
- Keep it concise — this is a wayfinding page, not a tutorial

Use the style of `docs/product-guide/intro/what-is-vergeos.md` as a reference for tone.

### Task 2: Create developer-guide/getting-started.md
Write a getting-started placeholder page. Include:
- Title: "Getting Started"
- Brief intro explaining this will cover developer onboarding
- Sections with placeholder content for:
  - Generating an API key (link to `product-guide/system/api-keys.md`)
  - Making your first API call (brief curl example using the VergeOS API pattern: `curl -sk -H "x-yottabyte-token: <API_KEY>" https://<HOST>/api/v4/vms`)
  - Choosing your tool (links to SDKs, CLI, IaC sections)
- Mark sections that need expansion with `!!! info "Coming Soon"` admonitions

### Task 3: Create developer-guide/cli/vrg.md
Write the vrg CLI documentation page based on the GitHub repo README at https://github.com/verge-io/vrg.

Content should cover:
- Overview: terminal interface for VergeOS management, 200+ commands
- Installation methods: pipx (recommended), pip, uv, Homebrew, standalone binaries
- Authentication: API key, environment variables, config file
- Command categories: compute, networking, tenants, NAS, identity, monitoring
- Declarative VM templates
- Output formats: table, JSON, CSV
- Shell completion setup
- Link to GitHub repo for full reference

### Task 4: Create developer-guide/iac/ansible-collection.md
Write the Ansible Collection documentation based on https://github.com/verge-io/ansible-collection-vergeos.

Content should cover:
- Overview: manage VergeOS infrastructure via Ansible
- Requirements: Python 3.9+, Ansible 2.14.0+
- Installation: `ansible-galaxy collection install vergeos.vergeos`
- Authentication/connection setup
- Example playbooks: VM deployment, snapshot management
- Dynamic inventory plugin for querying VMs across sites
- Tag management for VM classification
- Link to GitHub repo

### Task 5: Create developer-guide/iac/packer-plugin.md
Write the Packer Plugin documentation based on https://github.com/verge-io/packer-plugin-vergeio.

Content should cover:
- Overview: build VM templates on VergeOS with Packer
- Requirements: Packer 1.10.2+
- Installation: `packer plugins install github.com/verge-io/vergeio`
- Builder configuration with example HCL
- Key features: intelligent power management, automatic disk import waiting, SSH/WinRM connectivity, static IP via cloud-init, graceful shutdown
- Link to GitHub repo

### Task 6: Create developer-guide/webhooks-events.md
Create a placeholder page:
- Title: "Webhooks & Events"
- Brief description of what this section will cover (building integrations that react to VergeOS events)
- Link to the existing Product Guide webhooks page (`product-guide/automation/webhooks.md`) for current webhook configuration docs
- `!!! info "Coming Soon"` admonition for developer-focused webhook content

### Task 7: Create developer-guide/code-examples.md
Create a placeholder page:
- Title: "Code Examples"
- Brief description of what this section will cover (common automation recipes in Python, Go, PowerShell)
- Links to the SDKs section and API Reference section
- `!!! info "Coming Soon"` admonition

## Task Checklist
- [x] Task 1: Create overview.md
- [x] Task 2: Create getting-started.md
- [x] Task 3: Create cli/vrg.md
- [x] Task 4: Create iac/ansible-collection.md
- [x] Task 5: Create iac/packer-plugin.md
- [x] Task 6: Create webhooks-events.md placeholder
- [x] Task 7: Create code-examples.md placeholder

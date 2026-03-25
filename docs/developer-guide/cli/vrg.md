# vrg CLI

## Overview

`vrg` is the official command-line interface for managing VergeOS infrastructure from your terminal. With over 200 commands spanning VMs, networking, tenants, NAS, automation, and more, it provides fast, scriptable access to every aspect of the platform.

Whether you're interactively managing a single environment or scripting batch operations across a fleet of tenants, `vrg` is designed to fit naturally into your workflow.

!!! tip "GitHub Repository"
    Full source code, issue tracker, and release downloads are available at [github.com/verge-io/vrg](https://github.com/verge-io/vrg){target="_blank"}.

## Installation

### pipx (Recommended)

[pipx](https://pipx.pypa.io/){target="_blank"} installs `vrg` in an isolated environment — no dependency conflicts, no virtual environments to manage:

```bash
pipx install vrg
```

### pip

```bash
pip install vrg
```

### uv

```bash
uv tool install vrg
```

### Homebrew

```bash
brew install verge-io/tap/vrg
```

### Standalone Binaries

Pre-built executables are available for Linux (x86_64), macOS (ARM64), and Windows (x86_64) from the [GitHub Releases](https://github.com/verge-io/vrg/releases){target="_blank"} page.

!!! note "macOS Quarantine"
    On macOS, you may need to remove the quarantine attribute before running the binary:

    ```bash
    xattr -d com.apple.quarantine ./vrg
    ```

### Verify the Installation

```bash
vrg --version
```

!!! info "Python Requirement"
    `vrg` requires Python 3.10 or higher when installed via pipx, pip, or uv.

## Quick Start

```bash
vrg configure setup      # Configure credentials
vrg system info          # Verify connection
vrg vm list              # List virtual machines
```

## Authentication

`vrg` supports multiple authentication methods. You can configure credentials interactively or set them via environment variables and config files.

### Interactive Setup

The easiest way to get started is the guided setup command:

```bash
vrg configure setup
```

This walks you through entering your VergeOS host URL and credentials, then stores them in a local configuration file.

### Environment Variables

Environment variables override the config file and are ideal for CI/CD pipelines and containers:

| Variable | Description |
|----------|-------------|
| `VERGE_HOST` | VergeOS host URL |
| `VERGE_TOKEN` | Bearer token or API key |

### Configuration File

Settings are stored in `~/.vrg/config.toml`. You can define multiple named profiles and switch between them:

```bash
vrg --profile staging vm list
```

## Command Categories

Commands are organized across 15+ domains, most following standard CRUD patterns (`list`, `get`, `create`, `update`, `delete`):

| Category | What You Can Manage |
|----------|-------------------|
| **Compute** | VMs, drives, NICs, devices, snapshots |
| **Networking** | Networks, firewall rules, DNS, hosts, aliases, diagnostics |
| **Tenants** | Multi-tenant infrastructure operations |
| **NAS** | Storage services, volumes, CIFS shares, NFS exports, file sync |
| **Infrastructure** | Clusters, nodes, storage administration |
| **Identity & Access** | Users, groups, permissions, API keys, auth sources |
| **Automation** | Tasks, schedules, triggers, events, scripts |
| **Monitoring** | Alarms, logs, historical data |
| **Additional** | Snapshots, sites/replication, certificates, SSO, recipes, catalogs, updates, tagging |

!!! warning "Destructive Operations"
    Commands that delete or destroy resources require explicit `--yes` confirmation to prevent accidental changes.

## Declarative VM Templates

`vrg` supports a declarative, infrastructure-as-code approach to VM provisioning using `.vrg.yaml` template files. Templates support variable substitution, cloud-init scripting, and batch operations.

### Preview Before Creating

Use `--dry-run` to see exactly what will happen before committing:

```bash
vrg vm create -f web-server.vrg.yaml --dry-run
```

### Create from Template

```bash
vrg vm create -f web-server.vrg.yaml
```

### Override Variables at Runtime

```bash
vrg vm create -f web-server.vrg.yaml --set cpu_cores=8 --set ram=16384
```

## Output Formats

Control how results are displayed with the `--output` flag:

| Format | Flag | Best For |
|--------|------|----------|
| Table | `--output table` | Interactive terminal use (default) |
| Wide | `--output wide` | Viewing all available columns |
| JSON | `--output json` | Scripting and piping to `jq` |
| CSV | `--output csv` | Spreadsheets and data analysis |

### Field Extraction

Use `--query` to extract specific fields with dot notation:

```bash
vrg vm list --query name,status,ram
```

## Shell Completion

Enable tab completion for faster command entry:

```bash
vrg --install-completion
```

This configures completion for your current shell (bash, zsh, fish, or PowerShell). Restart your shell or source the completion file to activate it.

## Global Options

| Option | Short | Description |
|--------|-------|-------------|
| `--profile` | `-p` | Select a configuration profile |
| `--host` | `-H` | Override the VergeOS host URL |
| `--output` | `-o` | Set output format (table/wide/json/csv) |
| `--query` | | Extract specific fields |
| `--verbose` | `-v` | Increase detail level (`-v`, `-vv`, `-vvv`) |
| `--quiet` | `-q` | Suppress non-essential output |
| `--no-color` | | Disable colored terminal output |
| `--version` | `-V` | Display the installed version |
| `--help` | | Show help for any command |

## Exit Codes

When scripting with `vrg`, you can use exit codes to handle errors programmatically:

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | General error |
| `2` | Invalid arguments |
| `3` | Configuration error |
| `4` | Authentication error |
| `5` | Permission denied |
| `6` | Resource not found |
| `7` | Conflict (e.g., duplicate names) |
| `8` | Validation error |
| `9` | Timeout |
| `10` | Connection error |

## Next Steps

- **[Getting Started](../getting-started.md)** — Generate an API key and make your first API call
- **[Terraform Provider](../iac/terraform-provider.md)** — Declarative infrastructure provisioning
- **[Code Examples](../code-examples.md)** — Common automation recipes and patterns

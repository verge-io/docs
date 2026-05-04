---
title: "VergeOS CLI (vrg)"
description: "vrg is the official command-line interface for VergeOS, providing 200+ commands for managing virtual machines, networks, tenants, NAS, and more from a terminal or automation pipeline."
semantic_keywords:
  - "VergeOS CLI command line tool vrg"
  - "automate VergeOS from the terminal"
  - "declarative VM templates with vrg.yaml"
  - "scripting VergeOS with shell and JSON output"
use_cases:
  - terminal_management
  - declarative_vm_provisioning
  - shell_scripting_automation
  - ci_cd_pipelines
  - bulk_resource_operations
tags:
  - cli
  - vrg
  - automation
  - scripting
  - templates
  - shell
  - python
categories:
  - Automation
---

# VergeOS CLI (vrg)

## Overview

`vrg` is the official command-line interface for VergeOS. It provides 200+ commands across compute, networking, tenants, NAS, identity, automation, and monitoring, plus declarative `.vrg.yaml` VM templates for reproducible, version-controlled provisioning. Use it for terminal-first administration, shell scripting, and CI/CD pipelines.

## Requirements

- Python 3.10 or later (when installing via `pip`, `pipx`, or `uv`)
- A user account or API key with appropriate permissions on the VergeOS instance

## Installation

`vrg` can be installed several ways. `pipx` is recommended because it isolates the CLI in its own virtual environment.

### pipx (recommended)

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

### Standalone Binary

Download a pre-built binary from the [latest release](https://github.com/verge-io/vrg/releases/latest){target="_blank"}, then place it on your `PATH`. Binaries are available for Linux (x86_64), macOS (ARM64), and Windows (x86_64).

!!! warning "macOS Quarantine"
    On macOS, the standalone binary may be quarantined by Gatekeeper. Remove the attribute before running:

    ```bash
    xattr -d com.apple.quarantine ./vrg
    ```

After installation, verify with:

```bash
vrg --version
```

### Upgrading

| Install Method | Upgrade Command |
|----------------|-----------------|
| `pipx` | `pipx upgrade vrg` |
| `pip` | `pip install --upgrade vrg` |
| `uv` | `uv tool upgrade vrg` |
| Homebrew | `brew upgrade vrg` |
| Standalone | Re-download from the [releases page](https://github.com/verge-io/vrg/releases/latest){target="_blank"} |

## Quick Start

```bash
# 1. Configure credentials (interactive wizard)
vrg configure setup

# 2. Verify the connection
vrg system info

# 3. Discover commands as you go — every command supports --help
vrg --help
vrg vm --help

# 4. List your VMs
vrg vm list
```

`vrg configure setup` is an interactive wizard that prompts for the host URL, authentication method, and default output format. It saves the result to `~/.vrg/config.toml`. See [Authentication](#authentication) for the details on each method and how to script credentials.

## Authentication

`vrg` accepts four authentication methods. All four can be supplied through the interactive wizard, environment variables, command-line flags, or a profile in `~/.vrg/config.toml`.

| Method | Best For | How to Provide |
|--------|----------|----------------|
| **Bearer token** | CI pipelines, scripts | `--token` flag or `VERGE_TOKEN` env var |
| **API key** | Long-lived service automation | `--api-key` flag |
| **Username + password** | Interactive sessions, one-offs | `--username` / `--password` or wizard prompts |
| **Profile** | Multiple instances | `--profile <name>` after running `vrg configure setup` |

### Generating an API Key

API keys are managed both in the VergeOS UI (System → API Keys) and through the CLI itself once you've authenticated by another method:

```bash
# After your first interactive login, mint a long-lived key for CI
vrg api-key create --name ci-pipeline
vrg api-key list
```

Treat the returned value as a secret — store it in your CI provider's secret manager, never in source control.

### Environment Variables

Environment variables override values in the config file, which makes them ideal for CI/CD:

```bash
export VERGE_HOST=https://verge.example.com
export VERGE_TOKEN=eyJhbGc...
vrg vm list
```

### Profiles

Profiles let you switch between multiple VergeOS instances (production, staging, customer environments):

```bash
vrg configure setup --profile prod   # Set up a named profile
vrg configure list                   # List configured profiles
vrg configure show                   # Show active profile (credentials masked)
vrg --profile prod vm list           # Use a specific profile for one command
vrg -p staging vm list               # Short form
```

!!! tip "Cross-Profile Queries"
    Use `--all-profiles` on a list command to run it against every configured profile. Each output row includes a `profile` column showing where it came from.

## Command Pattern

All `vrg` commands follow a consistent structure:

```
vrg [global-options] <domain> [sub-domain] <action> [arguments] [options]
```

Most resources implement standard CRUD actions: `list`, `get`, `create`, `update`, and `delete`. Destructive operations require `--yes` to skip the confirmation prompt.

### Command Domains

| Domain | Sub-domains |
|--------|-------------|
| **Compute** | `vm`, `vm drive`, `vm nic`, `vm device`, `vm snapshot`, `vm export`, `vm import` |
| **Networking** | `network`, `network rule`, `network dns`, `network host`, `network alias`, `network diag`, `network query` |
| **Tenants** | `tenant`, `tenant node`, `tenant storage`, `tenant net`, `tenant snapshot`, `tenant stats`, `tenant share`, `tenant logs` |
| **NAS** | `nas service`, `nas volume`, `nas cifs`, `nas nfs`, `nas user`, `nas sync`, `nas files` |
| **Infrastructure** | `cluster`, `node`, `storage` |
| **Snapshots** | `snapshot`, `snapshot profile` |
| **Sites & Replication** | `site`, `site sync outgoing`, `site sync incoming` |
| **Identity & Access** | `user`, `group`, `permission`, `api-key`, `auth-source` |
| **Certificates & SSO** | `certificate`, `oidc` |
| **Automation** | `task`, `task schedule`, `task trigger`, `task event`, `task script` |
| **Recipes** | `recipe`, `recipe section`, `recipe question`, `recipe instance`, `recipe log` |
| **Catalog** | `catalog`, `catalog repo` |
| **Updates** | `update`, `update source`, `update branch`, `update package`, `update available` |
| **Monitoring** | `alarm`, `alarm history`, `log` |
| **Tagging** | `tag`, `tag category`, `resource-group` |
| **System** | `system`, `system settings`, `system license`, `system diag`, `doctor`, `configure`, `file`, `completion` |

The complete reference is maintained in the [Command Reference](https://github.com/verge-io/vrg/blob/main/docs/COMMANDS.md){target="_blank"}.

## Usage Examples

### Listing and Inspecting VMs

```bash
# List all VMs
vrg vm list

# Inspect a single VM
vrg vm get web-server

# Power state
vrg vm start web-server --wait    # --wait blocks until the VM is running
vrg vm stop web-server --wait
vrg vm restart web-server
```

### Building a VM from Shell Flags

The shell-flag approach is good for quick experiments. For repeatable provisioning, see [VM Templates](#vm-templates).

```bash
# Create a VM (--ram is in MB)
vrg vm create --name web-server --ram 4096 --cpu 2

# Add a 50 GB disk and attach a NIC
vrg vm drive create web-server --size 50GB --name os-disk
vrg vm nic create web-server --network External

# Start the VM
vrg vm start web-server --wait
```

!!! note "Empty VMs Don't Boot"
    A VM created from shell flags has no operating system attached. To install one, either boot from an ISO drive (`vrg vm drive create … --media cdrom`), clone an existing VM (`vrg vm clone`), or define an OS image and cloud-init in a `.vrg.yaml` template.

### Working with Networks

```bash
# Create an internal network with DHCP
vrg network create --name dev-net --cidr 10.0.0.0/24 --ip 10.0.0.1 --dhcp
vrg network start dev-net

# Allow incoming SSH (--dest-ports accepts a single port, range "80-443", or "80,443")
vrg network rule create dev-net \
  --name allow-ssh --action accept --direction incoming \
  --protocol tcp --dest-ports 22

# Apply pending firewall changes
vrg network apply-rules dev-net
```

### Network and Node Diagnostics

`vrg` exposes diagnostic queries that run on a network's virtual router or directly on a physical node:

```bash
# Network connectivity tests
vrg network query ping External 8.8.8.8
vrg network query traceroute External 8.8.8.8
vrg network query dns External example.com

# Node hardware checks
vrg node query smartctl node1 /dev/sda
vrg node query ipmi-sensor node1
vrg node lldp list node1
```

### System Health Check

```bash
# Run all built-in health checks
vrg doctor

# Run a specific subset
vrg doctor --check connectivity,clusters,nodes,storage

# JSON output for automation; exit code 0 = healthy, 1 = failures
vrg -o json doctor | jq '.[] | select(.status == "fail")'
```

## VM Templates

Define VMs as `.vrg.yaml` files for repeatable, version-controlled provisioning. Templates support variables, dry-run previews, runtime overrides via `--set`, cloud-init, and batch creation with `VirtualMachineSet`.

### Example Template

Save the following as `web-server.vrg.yaml`:

```yaml
apiVersion: v4
kind: VirtualMachine

vm:
  name: web-server-01
  os_family: linux
  cpu_cores: 4
  ram: 8GB
  machine_type: q35
  uefi: true
  guest_agent: true

  cloudinit:
    datasource: nocloud
    files:
      - name: user-data
        content: |
          #cloud-config
          hostname: web-server-01
          packages:
            - nginx
            - qemu-guest-agent
          runcmd:
            - systemctl enable --now nginx

  drives:
    - name: "OS Disk"
      media: disk
      interface: virtio-scsi
      size: 50GB

  nics:
    - name: "Primary"
      interface: virtio
      network: External
```

### Validating and Creating

```bash
# Validate the template against the schema
vrg vm validate -f web-server.vrg.yaml

# Preview the operation without making changes
vrg vm create -f web-server.vrg.yaml --dry-run

# Create the VM
vrg vm create -f web-server.vrg.yaml

# Override a field at runtime
vrg vm create -f web-server.vrg.yaml \
  --set vm.name=web-server-02 --set vm.ram=16GB
```

!!! tip "Variables and Defaults"
    Templates support `${VAR}` substitution from environment variables or a `vars:` block, plus default-value syntax (`${VM_RAM:-4GB}`). This is useful for parameterizing a single template across environments.

For the complete template field reference, see the [Template Guide](https://github.com/verge-io/vrg/blob/main/docs/TEMPLATES.md){target="_blank"}.

## Output Formats

All commands support `--output` (or `-o`) for changing the output format and `--query` for extracting a field with dot notation.

| Format | Use Case |
|--------|----------|
| `table` | Default human-readable output |
| `wide` | All available columns, including those hidden from the default view |
| `json` | Machine-readable output for piping to `jq` or other tools |
| `csv` | Spreadsheet-friendly export |

```bash
# All columns
vrg -o wide vm list

# JSON for scripting
vrg -o json vm list | jq '.[].name'

# CSV export
vrg -o csv vm list > vms.csv

# Extract a single field with dot notation (supports nested paths)
vrg --query status vm get web-server
vrg --query nics[0].network vm get web-server
```

## Shell Completion

Tab completion is available for bash, zsh, fish, and PowerShell. The fastest way to enable it is:

```bash
vrg --install-completion
```

!!! warning "macOS zsh: insecure directories"
    If you see `compinit: insecure directories` after installing completions on macOS, fix the Homebrew directory permissions:

    ```bash
    chmod 755 /opt/homebrew/share/zsh /opt/homebrew/share/zsh/site-functions
    ```

## Global Options

| Option | Short | Description |
|--------|-------|-------------|
| `--profile` | `-p` | Configuration profile to use |
| `--host` | `-H` | VergeOS host URL (override) |
| `--token` | | Bearer token for authentication |
| `--api-key` | | API key for authentication |
| `--username` | `-u` | Username for basic auth |
| `--password` | | Password for basic auth |
| `--output` | `-o` | Output format (`table`, `wide`, `json`, `csv`) |
| `--query` | | Extract field using dot notation |
| `--all-profiles` | | Run list commands across every configured profile |
| `--verbose` | `-v` | Increase verbosity (`-v`, `-vv`, `-vvv`) |
| `--quiet` | `-q` | Suppress non-essential output |
| `--no-color` | | Disable colored output |
| `--yes` | | Skip confirmation prompts on destructive actions |
| `--version` | `-V` | Show version |
| `--help` | | Show help |

## Exit Codes

`vrg` uses meaningful exit codes for scripting and CI integration:

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Invalid arguments |
| 3 | Configuration error |
| 4 | Authentication error |
| 5 | Permission denied |
| 6 | Resource not found |
| 7 | Conflict (e.g., duplicate name) |
| 8 | Validation error |
| 9 | Timeout |
| 10 | Connection error |

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Exit code 4 | Authentication failure | Run `vrg configure setup` and verify the token, API key, or credentials |
| Exit code 3 | Configuration error | Inspect `~/.vrg/config.toml` or run `vrg configure show` |
| Exit code 10 | Connection error | Verify `VERGE_HOST` is reachable and the URL is correct |
| `compinit: insecure directories` (macOS) | Homebrew permissions | `chmod 755 /opt/homebrew/share/zsh /opt/homebrew/share/zsh/site-functions` |
| `vrg` blocked on macOS | Gatekeeper quarantine | `xattr -d com.apple.quarantine ./vrg` |

## Choosing the Right Tool

`vrg` is one of several VergeOS automation interfaces. Pick based on how you work:

| Tool | Use When |
|------|----------|
| **vrg CLI** | You live in a terminal, want declarative VM templates, or need a one-shot script |
| [Python SDK](python-sdk.md) | You're writing Python applications, complex automation, or integrating with other Python tooling |
| [PowerShell Module](powershell-module.md) | You're a Windows-first shop or already automate with PowerShell |
| [Terraform Provider](terraform-provider.md) | You manage VergeOS alongside other Terraform-managed infrastructure |
| [Go SDK](go-sdk.md) | You're embedding VergeOS management into a Go application |

## Resources & Support

- [GitHub Repository](https://github.com/verge-io/vrg){target="_blank"} — source, issues, and releases
- [Command Reference](https://github.com/verge-io/vrg/blob/main/docs/COMMANDS.md){target="_blank"} — every command and flag
- [Template Guide](https://github.com/verge-io/vrg/blob/main/docs/TEMPLATES.md){target="_blank"} — full `.vrg.yaml` field reference
- [Cookbook](https://github.com/verge-io/vrg/blob/main/docs/COOKBOOK.md){target="_blank"} — task-oriented recipes
- [Architecture](https://github.com/verge-io/vrg/blob/main/docs/ARCHITECTURE.md){target="_blank"} — design and internals
- [Known Issues](https://github.com/verge-io/vrg/blob/main/docs/KNOWN_ISSUES.md){target="_blank"} — current limitations and workarounds
- [PyPI Package](https://pypi.org/project/vrg/){target="_blank"}
- [Report an Issue](https://github.com/verge-io/vrg/issues){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)

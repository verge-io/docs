# Getting Started

## Overview

This guide walks you through the essentials of getting up and running as a developer on the VergeOS platform. By the end, you'll have an API key, a working API call, and a sense of which tools best fit your workflow.

## Prerequisites

Before you begin, make sure you have:

- **A VergeOS environment** with admin or user-level access
- **Network access** to the VergeOS management interface (HTTPS)
- **curl** or a similar HTTP client installed on your workstation

## Step 1: Generate an API Key

Every programmatic interaction with VergeOS requires authentication. The simplest way to get started is by creating an API key tied to your user account.

1. Log into the VergeOS UI
2. Navigate to **System > Users** and select your user account
3. Click the **API Keys** widget, then click **+ New API Key**
4. Give the key a descriptive name (e.g., `dev-workstation`) and set an expiration date
5. Click **Submit** and **copy the key immediately** — it won't be shown again

!!! danger "Save Your Key"
    The full API key is only displayed once at creation time. Store it securely — if you lose it, you'll need to create a new one.

For detailed information on API key configuration, IP restrictions, and security best practices, see the [API Keys](../product-guide/system/api-keys.md) documentation.

## Step 2: Make Your First API Call

With your API key in hand, let's verify everything works by listing the virtual machines in your environment.

### Authenticate and Get a Token

VergeOS uses token-based authentication. First, request a token using your API key:

```bash
curl -sk \
  -X POST \
  -H 'x-yottabyte-token: <API_KEY>' \
  'https://<YOUR_HOST>/api/v4/vms'
```

Replace `<API_KEY>` with your actual API key and `<YOUR_HOST>` with your VergeOS hostname or IP address.

### Example Response

A successful call returns a JSON array of VM objects:

```json
[
  {
    "name": "web-server-01",
    "status": "running",
    "cpu_cores": 4,
    "ram": 8192
  }
]
```

!!! tip "Use `-sk` for Self-Signed Certificates"
    The `-s` flag silences progress output and `-k` skips SSL certificate verification. In production, we recommend configuring proper TLS certificates and removing the `-k` flag.

### Store Your Key as an Environment Variable

For convenience and security, store your API key in an environment variable rather than passing it directly in commands:

```bash
export VERGEOS_API_KEY="your-api-key-here"

curl -sk \
  -H "x-yottabyte-token: ${VERGEOS_API_KEY}" \
  'https://<YOUR_HOST>/api/v4/vms'
```

!!! info "Coming Soon"
    We're expanding this section with more detailed API walkthrough examples, including creating VMs, managing snapshots, and working with NAS volumes.

## Step 3: Choose Your Tool

Now that you've confirmed API access, pick the tool that best fits how you work:

### For Application Developers

If you're building applications that integrate with VergeOS, start with our SDKs:

| Tool | Language | Best For |
|------|----------|----------|
| [Python SDK](sdks/python-sdk.md) | Python | Scripts, automation, data pipelines |
| [Go SDK](sdks/go-sdk.md) | Go | High-performance integrations, microservices |
| [PowerShell Module](sdks/powershell-module.md) | PowerShell | Windows automation, admin scripts |

### For Platform Engineers & DevOps

If you're managing infrastructure and automating deployments, check out our IaC and CLI tools:

| Tool | Purpose | Best For |
|------|---------|----------|
| [vrg CLI](cli/vrg.md) | Terminal interface | Interactive management, quick operations |
| [Terraform Provider](iac/terraform-provider.md) | Infrastructure provisioning | Declarative infrastructure, GitOps workflows |
| [Ansible Collection](iac/ansible-collection.md) | Configuration management | Playbook-driven automation, fleet management |
| [Packer Plugin](iac/packer-plugin.md) | Image building | Automated VM template creation |

### For Monitoring & Observability

If you need to export VergeOS metrics to your monitoring stack:

- [Prometheus Exporter](monitoring/prometheus-exporter.md) — Export platform metrics to Prometheus and Grafana

## Next Steps

- **[API Reference](api-reference/overview.md)** — Explore the full REST API, including endpoints, filtering, and field selection
- **[Code Examples](code-examples.md)** — Common automation recipes and patterns
- **[Webhooks & Events](webhooks-events.md)** — Build event-driven integrations

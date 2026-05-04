---
title: "Developer Guide"
---

## Overview

The VergeOS Developer Guide is your central resource for building on and automating the VergeOS platform. Whether you're an application developer integrating with the VergeOS API or a platform engineer automating infrastructure with CLI and IaC tools, you'll find everything you need here.

VergeOS exposes a comprehensive RESTful API and provides official SDKs, CLI tooling, and infrastructure-as-code integrations — so you can manage your entire virtual data center programmatically.

## Who Is This Guide For?

This guide serves two primary audiences:

- **Application Developers** — Building software that integrates with VergeOS via the API and SDKs. You'll find API reference docs, SDK installation guides, and code examples to get you started quickly.
- **Platform Engineers & DevOps** — Automating VergeOS deployments and operations using CLI tools, Terraform, Ansible, Packer, and CI/CD pipelines. We cover configuration management, infrastructure provisioning, and monitoring integrations.

## What's Inside

### [Getting Started](getting-started)

Set up your developer environment, generate an API key, and make your first API call.

### [API Reference](api-reference/overview)

Detailed documentation for the VergeOS REST API, including authentication, available endpoints, and practical examples for managing virtual machines, NAS volumes, and more.

### [SDKs](sdks/powershell-module)

Official client libraries for interacting with VergeOS programmatically:

- [PowerShell Module](sdks/powershell-module) — Manage VergeOS from PowerShell scripts and automation workflows
- [Python SDK](sdks/python-sdk) — Python bindings for the VergeOS API
- [Go SDK](sdks/go-sdk) — Go client library for building integrations

### [CLI](cli/vrg)

The `vrg` command-line interface provides terminal access to over 200 VergeOS management commands, with support for declarative VM templates, multiple output formats, and shell completion.

### [Infrastructure as Code](iac/terraform-provider)

Provision and manage VergeOS resources using your preferred IaC tooling:

- [Terraform Provider](iac/terraform-provider) — Declarative infrastructure provisioning with Terraform
- [Ansible Collection](iac/ansible-collection) — Configuration management and orchestration with Ansible
- [Packer Plugin](iac/packer-plugin) — Automated VM template builds with HashiCorp Packer

### [Kubernetes](kubernetes/kubernetes-integration)

Run containerized workloads on VergeOS with native Kubernetes and Rancher integrations:

- [Kubernetes Integration](kubernetes/kubernetes-integration) — CSI Driver and Cloud Controller Manager
- [Rancher Integration](kubernetes/rancher-integration) — Docker Machine Driver and UI Extension

### [Monitoring](monitoring/prometheus-exporter)

Export VergeOS metrics to your observability stack with the [Prometheus Exporter](monitoring/prometheus-exporter).

### [Webhooks & Events](webhooks-events)

Build event-driven integrations that react to changes in your VergeOS environment.

### [Code Examples](code-examples)

Common automation recipes and patterns in Python, Go, and PowerShell.

## Next Steps

Ready to dive in? We recommend starting with:

1. **[Getting Started](getting-started)** — Generate an API key and make your first call
2. **[API Reference](api-reference/overview)** — Explore the full API surface
3. **[vrg CLI](cli/vrg)** — Install the CLI for fast, interactive management

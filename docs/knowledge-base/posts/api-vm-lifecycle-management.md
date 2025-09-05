---
title: VM Lifecycle Management API Overview
slug: vm-lifecycle-management
description: Complete REST API guide for virtual machine lifecycle management in VergeOS - create, manage, configure, and delete VMs programmatically
author: VergeOS Documentation Team
draft: false
date: 2025-08-24T01:35:27Z
semantic_keywords:
  - "VM lifecycle management, virtual machine automation, API workflow"
  - "REST API overview, VM management endpoints, programmatic control"
  - "VergeOS automation, infrastructure as code, VM orchestration"
  - "API documentation, developer guide, integration workflows"
use_cases:
  - "api_overview"
  - "developer_onboarding"
  - "automation_planning"
  - "integration_guidance"
  - "workflow_design"
tags:
  - api
  - vm
  - lifecycle
  - overview
  - rest-api
  - virtual-machines
  - automation
categories:
  - API Reference
  - Virtual Machines
editor: markdown
dateCreated: 2025-08-24T01:35:27Z
---

# VM Lifecycle Management API Overview

!!! info "Key Points"
    - Complete REST API for virtual machine lifecycle management and automation
    - Programmatically create, configure, manage, and delete VMs using HTTP endpoints
    - Four-stage API workflow: Creation → Power Management → Configuration → Advanced Operations
    - Comprehensive API documentation optimized for developers and automation tools

<!-- WORKFLOW CONTEXT -->
**Stage**: API Overview (Entry Point)
**Input**: Developer requirements, automation needs
**Output**: Guided workflow to specific API documentation
**Navigation Path**:
- Start here → Choose specific operation → Follow detailed guides
- Complete lifecycle: Creation → Power → Configuration → Advanced
<!-- END CONTEXT -->

## This Document Helps With
- "VM API overview and getting started"
- "REST API workflow for VM management"
- "API endpoint reference and navigation"
- "Developer onboarding for VergeOS APIs"
- "Infrastructure as code planning"
- "Automation workflow design"
- "API integration guidance"
- "VM management automation strategy"

## API Workflow Stages

### 1. VM Creation API
Create virtual machines programmatically with drives, devices, and network interfaces using REST API calls.
**→ See:** [`VM-Creation-API.md`](VM-Creation-API.md)

### 2. VM Power Management API
Start, stop, reboot, and monitor VM power states through API endpoints.
**→ See:** [`VM-Power-Management.md`](VM-Power-Management.md)

### 3. VM Configuration API
Modify CPU, RAM, storage drives, and network settings via API calls.
**→ See:** [`VM-Configuration.md`](VM-Configuration.md)

### 4. Advanced VM Operations API
Clone VMs, create snapshots, delete virtual machines, and troubleshoot issues using API methods.
**→ See:** [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md)

## Key API Concepts

- **VM Key vs Machine Key**: API distinction for VM settings vs hardware operations
- **REST API Authentication**: Bearer token authentication required for all API calls
- **Resource Groups**: UUID-based API parameters for device passthrough (GPUs, PCI devices)
- **Storage Tiers**: API-configurable performance levels (1-5) for drive placement
- **HTTP Methods**: GET, POST, PUT, DELETE operations for complete VM lifecycle management

## Primary API Endpoints

| API Operation | HTTP Method | REST Endpoint | Purpose |
|---------------|-------------|---------------|---------|
| Create VM | POST | `/api/v4/vms` | Create new virtual machine |
| VM Actions | POST | `/api/v4/vm_actions` | Power operations, clone, snapshot |
| Update VM | PUT | `/api/v4/vms/{id}` | Modify VM configuration |
| Add Storage | POST | `/api/v4/machine_drives` | Attach drives to VM |
| Add Network | POST | `/api/v4/machine_nics` | Configure network interfaces |
| Add Devices | POST | `/api/v4/machine_devices` | Attach GPU/PCI devices |
| Delete VM | DELETE | `/api/v4/vms/{id}` | Remove virtual machine |
| VM Status | GET | `/api/v4/vms/{id}` | Query VM information |
| Power State | GET | `/api/v4/machine_status/{id}` | Check runtime status |

## API Quick Reference by Stage
| Stage | Primary Operations | Key Endpoints | Documentation |
|-------|-------------------|---------------|---------------|
| **Creation** | Create VM, Add drives, Add NICs, Add devices | `POST /api/v4/vms`, `POST /api/v4/machine_*` | [`VM-Creation-API.md`](VM-Creation-API.md) |
| **Power** | Start, Stop, Reboot, Monitor | `POST /api/v4/vm_actions`, `GET /api/v4/machine_status` | [`VM-Power-Management.md`](VM-Power-Management.md) |
| **Config** | Update CPU/RAM, Manage drives, Manage NICs | `PUT /api/v4/vms`, `POST/PUT/DELETE /api/v4/machine_*` | [`VM-Configuration.md`](VM-Configuration.md) |
| **Advanced** | Clone, Snapshot, Delete, Troubleshoot | `POST /api/v4/vm_actions`, `DELETE /api/v4/vms` | [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md) |

## Common API Error Scenarios
- **Authentication Issues**: Invalid API key, expired tokens, insufficient permissions
- **Resource Constraints**: Insufficient storage, memory limits, CPU quotas exceeded
- **Configuration Errors**: Invalid parameters, missing required fields, malformed JSON
- **State Conflicts**: VM already running, operation in progress, resource locked
- **Network Issues**: API timeout, connection refused, service unavailable
- **Validation Errors**: Invalid VM names, unsupported configurations, constraint violations

## API Getting Started Guide

1. [`Create VMs`](api-vm-creation.md) - REST API calls to create virtual machines
2. [`Power Control`](api-vm-power-management.md) - API endpoints to start, stop, and manage VMs  
3. [`Configure VMs`](api-vm-configuration.md) - API methods to modify VM settings and hardware
4. [`Advanced Operations`](api-vm-advanced-operations.md) - API calls for cloning, backup, and troubleshooting

## Common API Use Cases

- **Automated VM Provisioning**: Create VMs programmatically for cloud automation
- **Infrastructure as Code**: Manage virtual machine infrastructure through API calls
- **DevOps Integration**: Integrate VM management into CI/CD pipelines using REST APIs
- **Monitoring and Alerting**: Query VM status and power states via API endpoints
- **Backup and Recovery**: Automate VM snapshots and cloning through API operations
- **Resource Management**: Programmatically manage VM CPU, memory, and storage allocation

## API Authentication

All VM lifecycle API endpoints require authentication:
```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://your-vergeos.example.com/api/v4/vms
```

Start with the VM Creation API documentation to begin automating your virtual machine management workflows.
---
title: "VM Creation API"
slug: vm-creation-api
description: Complete guide to creating virtual machines in VergeOS, including basic creation, recipe-based configurations, drives, devices, and network interfaces
author: VergeOS Documentation Team
draft: false
date: 2025-08-24T01:20:00Z
parent_guide: "VM Lifecycle Management"
workflow_stage: "creation"
prerequisites:
  - "Valid VergeOS API credentials with VM management permissions"
  - "Understanding of clusters, vnets, and resource groups"
next_steps:
  - "Power Management: VM-Power-Management.md"
  - "Configuration: VM-Configuration.md"
  - "Advanced Operations: VM-Advanced-Operations.md"
key_concepts:
  - "vm_key_vs_machine_key"
  - "storage_tiers"
  - "media_types"
  - "resource_groups"
semantic_keywords:
  - "virtual machine creation, VM provisioning, new VM setup"
  - "REST API endpoints, POST requests, JSON payloads"
  - "VergeOS virtualization, VM lifecycle management"
  - "machine key vs VM key, resource management"
  - "drive attachment, storage configuration, disk provisioning"
  - "GPU passthrough, PCI device attachment, hardware configuration"
  - "network interface creation, NIC configuration, vnet setup"
use_cases:
  - "automated_provisioning"
  - "devops_integration"
  - "infrastructure_as_code"
  - "vm_template_deployment"
  - "bulk_vm_creation"
  - "cloud_automation"
tags:
  - api
  - vm
  - creation
  - virtual-machines
categories:
  - API Reference
  - Virtual Machines
editor: markdown
dateCreated: 2025-08-24T01:20:00Z
---

# VM Creation API

!!! info "Key Points"
    - Create VMs with essential configuration parameters using REST API
    - Support for recipe-based VM creation with complex configurations
    - Add drives, devices, and network interfaces after VM creation
    - Understand VM key vs Machine key distinctions for different operations

This guide covers creating virtual machines in VergeOS, from basic VM creation through adding drives, devices, and network interfaces. The VergeOS API provides comprehensive endpoints for VM creation and hardware configuration.

<!-- WORKFLOW CONTEXT -->
**Stage**: VM Creation (1 of 4)
**Input**: API credentials, cluster info, VM specifications
**Output**: VM key (42) + Machine key (54)
**Next**: Use keys for power management
**Common Next Steps**:
- Power on VM → [`VM-Power-Management.md`](VM-Power-Management.md)
- Configure settings → [`VM-Configuration.md`](VM-Configuration.md)
- Advanced operations → [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md)
<!-- END CONTEXT -->

## This Document Helps With
- "How to create a VM via API"
- "Adding drives during VM setup"
- "Attaching GPU/PCI devices to VMs"
- "VM creation with cloud-init"
- "Understanding VM vs machine keys"
- "Setting up network interfaces for new VMs"
- "Recipe-based VM provisioning"
- "Bulk VM creation automation"
- "Infrastructure as code VM deployment"

## Quick Reference

### Primary Endpoints
- **Create VM**: `POST /api/v4/vms`
- **Add Drive**: `POST /api/v4/machine_drives`
- **Add Device**: `POST /api/v4/machine_devices`
- **Add NIC**: `POST /api/v4/machine_nics`

### Key Parameters
- `name`: VM identifier (required)
- `cluster`: Target cluster ID
- `machine`: Machine ID from VM creation (for hardware additions)
- `resource_group`: UUID for device passthrough

### Authentication
```bash
-H "Authorization: Bearer YOUR_API_KEY"
-H "Content-Type: application/json"
```

### Next Steps
After VM creation → Power Management ([`VM-Power-Management.md`](VM-Power-Management.md))

## API Quick Reference
| Operation | Method | Endpoint | Key Type | Purpose |
|-----------|--------|----------|----------|---------|
| Create VM | POST | `/api/v4/vms` | Returns both | Initial creation |
| Add Drive | POST | `/api/v4/machine_drives` | Machine key | Hardware |
| Add Device | POST | `/api/v4/machine_devices` | Machine key | GPU/PCI passthrough |
| Add NIC | POST | `/api/v4/machine_nics` | Machine key | Network interface |
| Power On | POST | `/api/v4/vm_actions` | VM key | Control |
| Check Status | GET | `/api/v4/machine_status/{id}` | Machine key | Monitor |

## Troubleshooting Index
- **409 Conflict**: VM name exists, already running, permission denied
- **400 Bad Request**: Invalid parameters, missing required fields, invalid JSON
- **507 Insufficient Storage**: Tier full, reduce size, choose different tier
- **403 Forbidden**: API key permissions, cluster access denied
- **404 Not Found**: Invalid cluster ID, missing media source, invalid resource group
- **422 Unprocessable Entity**: Invalid drive interface, unsupported media type

## Prerequisites

- Valid VergeOS API credentials with VM management permissions
- Understanding of VergeOS concepts: clusters, vnets, media sources, and resource groups
- Basic knowledge of REST API principles and JSON formatting

## Authentication

All VM creation operations require authentication using either:

- **API Key**: Include in the `Authorization` header as `Bearer YOUR_API_KEY`
- **Basic Authentication**: Username and password for interactive sessions
- **Session Token**: For web-based integrations

```bash
# Using API Key
curl -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     https://your-vergeos.example.com/api/v4/vms
```

## Basic VM Creation

### POST /api/v4/vms

**Description**: Creates a new virtual machine with the specified configuration.

**Request Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| name | string | Yes | Unique VM name |
| description | string | No | VM description |
| cluster | string | No | Target cluster ID (numeric string) |
| ram | integer | No | RAM in MB (default: 1024) |
| cpu_cores | integer | No | Number of CPU cores (default: 1) |
| guest_agent | string | No | Enable guest agent ("true"/"false") |
| console_pass_hash | string | No | Console password hash (empty string if not used) |
| video | string | No | Video adapter type (virtio, std, cirrus, etc.) |
| rtc_base | string | No | RTC base setting (utc, localtime) |
| uefi | string | No | Enable UEFI boot ("true"/"false") |

**Request Body Example**:
```json
{
  "name": "web-server-01",
  "description": "Production web server",
  "cluster": "1",
  "ram": 8192,
  "cpu_cores": 4,
  "guest_agent": "true",
  "console_pass_hash": "",
  "video": "virtio",
  "rtc_base": "utc",
  "uefi": "true"
}
```

**Response Example**:
```json
{
  "location": "/v4/vms/42",
  "dbpath": "vms/42",
  "$row": 42,
  "$key": "42",
  "response": {
    "machine": "54"
  }
}
```

**Response Fields**:

| Field | Type | Description |
|-------|------|-------------|
| location | string | API endpoint for the created VM |
| dbpath | string | Database path for the VM record |
| $row | integer | Database row number |
| $key | string | VM ID (used for subsequent API calls) |
| response.machine | string | Machine ID (used for drives, NICs, devices) |

**Error Responses**:
- `400 Bad Request`: Invalid configuration parameters
- `409 Conflict`: VM name already exists
- `403 Forbidden`: Insufficient permissions

!!! important "VM Key vs Machine Key"
    - **VM key** (e.g., "42"): Use for VM settings like CPU, RAM, console
    - **Machine key** (e.g., "54"): Use for hardware like drives, NICs, devices
    - You get both keys in the VM creation response

## Recipe-Based VM Creation

VergeOS supports complex VM creation using recipes that include drives, network interfaces, and devices.

### Complete VM with Recipe Configuration

```json
{
  "name": "enterprise-vm",
  "description": "Enterprise application server",
  "cluster": "1",
  "cpu_cores": 8,
  "ram": 16384,
  "guest_agent": "true",
  "video": "virtio",
  "rtc_base": "utc",
  "uefi": "true",
  "secure_boot": "true",
  "console_pass_hash": "",
  "cloudinit_datasource": "nocloud",
  "cloudinit_files": [
    {
      "name": "user-data",
      "contents": "#cloud-config\nusers:\n  - name: admin\n    sudo: ALL=(ALL) NOPASSWD:ALL\n    ssh_authorized_keys:\n      - ssh-rsa AAAAB3NzaC1yc2E..."
    },
    {
      "name": "meta-data",
      "contents": "instance-id: enterprise-vm-001\nlocal-hostname: enterprise-vm"
    }
  ]
}
```

## Adding Drives

Drives must be created separately after VM creation using the machine drives endpoint.

### POST /api/v4/machine_drives

**Request Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| machine | string | Yes | Machine ID from VM creation |
| name | string | No | Drive name |
| media | string | No | Media type (disk, cdrom, import, clone, efidisk) |
| interface | string | No | Drive interface (virtio-scsi, ide, ahci, etc.) |
| disksize | integer | No | Disk size in bytes (for new disks) |
| preferred_tier | string | No | Storage tier (1-5) |
| media_source | string | No | Source media ID (for import/clone/cdrom) |
| show_pt | string | No | Override Preferred Tier ("true"/"false") - overrides media source's default tier |

### Creating a Boot Drive

```json
{
  "machine": "54",
  "name": "OS Drive",
  "media": "disk",
  "interface": "virtio-scsi",
  "disksize": 2199023255552,
  "preferred_tier": "1"
}
```

**Response Example**:
```json
{
  "location": "/v4/machine_drives/54",
  "dbpath": "machine_drives/54",
  "$row": 54,
  "$key": "54"
}
```

### Attaching CDROM/ISO

```json
{
  "machine": "54",
  "media": "cdrom",
  "interface": "ahci",
  "media_source": "7"
}
```

**Response Example**:
```json
{
  "location": "/v4/machine_drives/55",
  "dbpath": "machine_drives/55",
  "$row": 55,
  "$key": "55"
}
```

### Importing from Media Source

```json
{
  "machine": "54",
  "name": "Ubuntu Server",
  "description": "Ubuntu 22.04 LTS",
  "interface": "virtio-scsi",
  "media": "import",
  "media_source": 123,
  "preferred_tier": "3"
}
```

## Adding Devices (GPU, PCI Passthrough, etc.)

### POST /api/v4/machine_devices

**Description**: Attaches hardware devices like GPUs, PCI devices, USB devices, or TPM to a virtual machine.

**Request Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| machine | string | Yes | Machine ID |
| resource_group | string | Yes | Resource group UUID for the device |
| settings_args | object | No | Device-specific settings (empty object for basic passthrough) |

### PCI Passthrough GPU

```json
{
  "machine": "54",
  "resource_group": "1f67f07e-f653-db95-c475-01b8a2ea0ff1",
  "settings_args": {}
}
```

**Response Example**:
```json
{
  "location": "/v4/machine_devices/2",
  "dbpath": "machine_devices/2",
  "$row": 2,
  "$key": "2",
  "response": {
    "uuid": "934e250b-a13c-bd8f-104d-a31995b06eba"
  }
}
```

!!! tip "Finding Resource Groups"
    The `resource_group` parameter identifies the specific hardware device to attach. Use these endpoints to find available resource group UUIDs:
    
    - `GET /api/v4/resource_groups` - General hardware devices (GPUs, PCI devices, USB, etc.)
    - `GET /api/v4/node_nvidia_vgpu_devices` - NVIDIA vGPU devices specifically

### Finding Available Devices

```bash
# General hardware devices
curl "https://your-vergeos.example.com/api/v4/resource_groups" \
  -H "Authorization: Bearer YOUR_API_KEY"

# NVIDIA vGPU devices
curl "https://your-vergeos.example.com/api/v4/node_nvidia_vgpu_devices" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Adding Network Interfaces

### POST /api/v4/machine_nics

**Request Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| machine | string | Yes | Machine ID |
| vnet | string | Yes | Virtual network ID (key of the target network) |
| name | string | No | NIC name |
| interface | string | No | NIC interface type (virtio, e1000, etc.) |
| enabled | boolean | No | NIC enabled state |

**Example**:
```json
{
  "machine": "54",
  "vnet": "3"
}
```

**Response Example**:
```json
{
  "location": "/v4/machine_nics/78",
  "dbpath": "machine_nics/78",
  "$row": 78,
  "$key": "78"
}
```

!!! note "Virtual Network Keys"
    The `vnet` parameter uses the network's key/ID. For example, vnet "3" might be your external network. You can find network keys by listing available networks via the networks API endpoint.

## Complete VM Creation Example

Here's a complete workflow for creating a VM with drives, devices, and network interfaces:

```bash
# Step 1: Create the VM
curl -X POST "https://your-vergeos.example.com/api/v4/vms" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "production-server",
    "description": "Production application server",
    "cluster": "1",
    "ram": 16384,
    "cpu_cores": 8,
    "guest_agent": "true",
    "video": "virtio",
    "uefi": "true"
  }'

# Response: VM key = 42, Machine key = 54

# Step 2: Add boot drive
curl -X POST "https://your-vergeos.example.com/api/v4/machine_drives" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "name": "Boot Drive",
    "media": "disk",
    "interface": "virtio-scsi",
    "disksize": 107374182400,
    "preferred_tier": "1"
  }'

# Step 3: Add network interface
curl -X POST "https://your-vergeos.example.com/api/v4/machine_nics" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "vnet": "3"
  }'

# Step 4: Add GPU (optional)
curl -X POST "https://your-vergeos.example.com/api/v4/machine_devices" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "resource_group": "1f67f07e-f653-db95-c475-01b8a2ea0ff1",
    "settings_args": {}
  }'
```

!!! note "Related Operations"
    - **Power Management**: See [`VM-Power-Management.md`](VM-Power-Management.md) for starting/stopping VMs
    - **Configuration**: See [`VM-Configuration.md`](VM-Configuration.md) for CPU/RAM changes  
    - **Advanced Operations**: See [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md) for cloning and snapshots

!!! question "Need Help?"
    For additional support with VM creation:
    - Check the VergeOS documentation portal
    - Contact VergeOS support with specific error messages
    - Review system logs for detailed error information
    - Consult the VergeOS community forums
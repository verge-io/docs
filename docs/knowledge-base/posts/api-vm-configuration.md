---
title: "VM Configuration API"
slug: vm-configuration
description: Complete guide to modifying VM configurations in VergeOS, including CPU/RAM updates, notes, drive management, and network interface management
author: VergeOS Documentation Team
draft: false
date: 2025-08-24T01:23:17Z
parent_guide: "VM Lifecycle Management"
workflow_stage: "configuration"
prerequisites:
  - "VM must be created first (see VM-Creation-API.md)"
  - "Valid VergeOS API credentials with VM management permissions"
next_steps:
  - "Power Management: VM-Power-Management.md"
  - "Advanced Operations: VM-Advanced-Operations.md"
key_concepts:
  - "vm_key_vs_machine_key"
  - "hotplug_capabilities"
  - "storage_tiers"
  - "network_interfaces"
semantic_keywords:
  - "VM configuration changes, CPU RAM updates, virtual machine settings"
  - "drive management, storage expansion, disk resizing"
  - "network interface configuration, NIC management, vnet changes"
  - "hotplug operations, live configuration changes"
  - "VM notes, documentation, operational tracking"
  - "hardware modification, device management"
use_cases:
  - "resource_scaling"
  - "performance_tuning"
  - "storage_expansion"
  - "network_reconfiguration"
  - "operational_documentation"
  - "capacity_management"
tags:
  - api
  - vm
  - configuration
  - management
  - virtual-machines
categories:
  - API Reference
  - Virtual Machines
editor: markdown
dateCreated: 2025-08-24T01:23:17Z
---

# VM Configuration API

!!! info "Key Points"
    - Modify VM settings like CPU, RAM, console, and video through REST API
    - Manage drives with resizing, adding, and removal capabilities
    - Update network interfaces and their configurations
    - Add documentation notes to VMs for operational tracking

This guide covers modifying virtual machine configurations in VergeOS after creation, including CPU/RAM updates, drive management, network interface changes, and adding operational notes.

<!-- WORKFLOW CONTEXT -->
**Stage**: VM Configuration (3 of 4)
**Input**: VM key (42) + Machine key (54), configuration changes
**Output**: Updated VM settings, modified hardware
**Previous**: VM powered on → [`VM-Power-Management.md`](VM-Power-Management.md)
**Common Next Steps**:
- Advanced operations → [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md)
- Power cycle for changes → [`VM-Power-Management.md`](VM-Power-Management.md)
<!-- END CONTEXT -->

## This Document Helps With
- "How to change VM CPU and RAM"
- "Adding storage drives to existing VMs"
- "Resizing VM drives and storage"
- "Managing VM network interfaces"
- "Adding notes and documentation to VMs"
- "Hotplug operations and live changes"
- "VM performance tuning"
- "Storage expansion workflows"
- "Network reconfiguration"

## Quick Reference

### Primary Endpoints
- **VM Settings**: `PUT /api/v4/vms/{id}`
- **VM Notes**: `POST /api/v4/note_actions`
- **Drive Management**: `POST/PUT/DELETE /api/v4/machine_drives`
- **NIC Management**: `POST/PUT/DELETE /api/v4/machine_nics`

### Key Concepts
- **VM key**: Use for VM settings (CPU, RAM, console)
- **Machine key**: Use for hardware (drives, NICs, devices)
- **Hotplug**: Some changes require VM restart

### Authentication
```bash
-H "Authorization: Bearer YOUR_API_KEY"
-H "Content-Type: application/json"
```

### Prerequisites
VM must be created first → See [`VM-Creation-API.md`](VM-Creation-API.md)

## API Quick Reference
| Operation | Method | Endpoint | Key Type | Purpose |
|-----------|--------|----------|----------|---------|
| Update VM | PUT | `/api/v4/vms/{id}` | VM key | CPU, RAM, console settings |
| Add Note | POST | `/api/v4/note_actions` | VM key | Documentation |
| Add Drive | POST | `/api/v4/machine_drives` | Machine key | Storage expansion |
| Resize Drive | PUT | `/api/v4/machine_drives/{id}` | Drive key | Increase disk size |
| Remove Drive | DELETE | `/api/v4/machine_drives/{id}` | Drive key | Storage removal |
| Add NIC | POST | `/api/v4/machine_nics` | Machine key | Network interface |
| Update NIC | PUT | `/api/v4/machine_nics/{id}` | NIC key | Network changes |
| Remove NIC | DELETE | `/api/v4/machine_nics/{id}` | NIC key | Interface removal |

## Troubleshooting Index
- **400 Bad Request**: Invalid RAM size, invalid CPU count, malformed JSON
- **409 Conflict**: VM must be stopped, hotplug not supported, resource in use
- **507 Insufficient Storage**: Tier full, disk size too large, quota exceeded
- **403 Forbidden**: API key permissions, VM access denied, cluster restrictions
- **422 Unprocessable Entity**: Drive cannot be shrunk, invalid interface type
- **404 Not Found**: VM not found, drive not found, NIC not found, invalid vnet

## CPU and RAM Updates

### PUT /api/v4/vms/{id}

**Description**: Updates VM configuration. Uses the VM key (not machine key) for VM-level settings.

**Request Body Example**:
```json
{
  "ram": 16384,
  "cpu_cores": 3,
  "console": "spice",
  "video": "qxl",
  "show_advanced": "true",
  "nested_virtualization": "true",
  "disable_hypervisor": "true"
}
```

**Complete API Call**:
```bash
curl -X PUT "https://your-vergeos.example.com/api/v4/vms/42" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "ram": 16384,
    "cpu_cores": 3,
    "console": "spice",
    "video": "qxl",
    "show_advanced": "true",
    "nested_virtualization": "true",
    "disable_hypervisor": "true"
  }'
```

### Common Configuration Parameters

| Parameter | Type | Description | Restart Required |
|-----------|------|-------------|------------------|
| ram | integer | RAM in MB | Usually yes |
| cpu_cores | integer | Number of CPU cores | Usually yes |
| console | string | Console type (spice, vnc, none) | On next start |
| video | string | Video adapter (qxl, virtio, std, cirrus) | On next start |
| nested_virtualization | string | Enable nested virtualization ("true"/"false") | Yes |
| disable_hypervisor | string | Disable hypervisor ("true"/"false") | Yes |
| guest_agent | string | Enable guest agent ("true"/"false") | On next start |
| uefi | string | Enable UEFI boot ("true"/"false") | Yes |
| secure_boot | string | Enable secure boot ("true"/"false") | Yes |

!!! important "VM Key vs Machine Key"
    - **VM settings** (CPU, RAM, console, video): Use VM key (e.g., `42`) with `/api/v4/vms/{vm_key}`
    - **Hardware changes** (drives, NICs, devices): Use machine key (e.g., `54`) with `/api/v4/machine_*` endpoints

!!! warning "Configuration Changes"
    - CPU and RAM changes usually require VM restart
    - Console and video changes take effect on next VM start
    - Nested virtualization and hypervisor settings require VM restart
    - Always check `allow_hotplug` setting for hot-add capabilities

## Adding Notes to VMs

### POST /api/v4/note_actions

**Description**: Adds or updates notes for a VM in the VergeOS UI for documentation purposes.

**Request Body**:
```json
{
  "owner": "vms/42",
  "action": "update",
  "params": {
    "text": "This is a test VM"
  }
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/note_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "vms/42",
    "action": "update",
    "params": {
      "text": "Production web server - Updated 2025-08-24"
    }
  }'
```

**Parameters**:

| Name | Type | Required | Description |
|------|------|----------|-------------|
| owner | string | Yes | Resource identifier (format: "vms/{vm_key}") |
| action | string | Yes | Action to perform ("update") |
| params.text | string | Yes | Note text content |

!!! tip "VM Notes"
    Notes are visible in the VergeOS UI and help with VM documentation, maintenance schedules, or configuration details. Use the VM key (not machine key) in the owner field.

## Drive Management

### Adding New Drives

Use the machine drives endpoint to add storage after VM creation:

#### POST /api/v4/machine_drives

```json
{
  "machine": "54",
  "name": "Data Drive",
  "interface": "virtio-scsi",
  "media": "disk",
  "disksize": 536870912000,
  "preferred_tier": "2"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/machine_drives" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "name": "Data Drive",
    "interface": "virtio-scsi",
    "media": "disk",
    "disksize": 536870912000,
    "preferred_tier": "2"
  }'
```

### Resizing Drives

#### PUT /api/v4/machine_drives/{drive_id}

**Description**: Increases the size of an existing drive. Note that drives can only be expanded, not shrunk.

```json
{
  "disksize": 1073741824000
}
```

**Complete API Call**:
```bash
curl -X PUT "https://your-vergeos.example.com/api/v4/machine_drives/55" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "disksize": 1073741824000
  }'
```

!!! warning "Drive Resizing"
    - Drives can only be expanded, never shrunk
    - The guest OS may need to be configured to recognize the new size
    - Some file systems require manual expansion after drive resize

### Removing Drives

Before deletion, drives must be hot-unplugged if the VM is running:

#### Step 1: Hot-Unplug Drive (if VM is running)

```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vm": "42",
    "action": "hotplugdrive",
    "params": {
      "device": "drive-id-here",
      "unplug": true
    }
  }'
```

#### Step 2: Delete the Drive

#### DELETE /api/v4/machine_drives/{drive_id}

```bash
curl -X DELETE "https://your-vergeos.example.com/api/v4/machine_drives/55" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Drive Management Examples

#### Adding a CDROM/ISO

```json
{
  "machine": "54",
  "media": "cdrom",
  "interface": "ahci",
  "media_source": "7"
}
```

#### Adding an Import Drive

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

## Network Interface Management

### Adding NICs

#### POST /api/v4/machine_nics

```json
{
  "machine": "54",
  "name": "Secondary Network",
  "interface": "virtio",
  "vnet": "8",
  "enabled": true
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/machine_nics" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "name": "Secondary Network",
    "interface": "virtio",
    "vnet": "8",
    "enabled": true
  }'
```

### Updating NIC Configuration

#### PUT /api/v4/machine_nics/{nic_id}

```json
{
  "vnet": "10",
  "enabled": true
}
```

**Complete API Call**:
```bash
curl -X PUT "https://your-vergeos.example.com/api/v4/machine_nics/78" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vnet": "10",
    "enabled": true
  }'
```

### Removing NICs

#### DELETE /api/v4/machine_nics/{nic_id}

```bash
curl -X DELETE "https://your-vergeos.example.com/api/v4/machine_nics/78" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### NIC Configuration Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| machine | string | Yes | Machine ID |
| vnet | string | Yes | Virtual network ID |
| name | string | No | NIC name |
| interface | string | No | NIC interface type (virtio, e1000, rtl8139) |
| enabled | boolean | No | NIC enabled state |

!!! note "Virtual Network Keys"
    The `vnet` parameter uses the network's key/ID. You can find network keys by listing available networks via the networks API endpoint.

## Complete Configuration Workflow

Here's an example of updating a VM's complete configuration:

```bash
# Step 1: Update VM settings (CPU, RAM, console)
curl -X PUT "https://your-vergeos.example.com/api/v4/vms/42" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "ram": 32768,
    "cpu_cores": 8,
    "console": "spice",
    "video": "virtio"
  }'

# Step 2: Add operational note
curl -X POST "https://your-vergeos.example.com/api/v4/note_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "owner": "vms/42",
    "action": "update",
    "params": {
      "text": "Upgraded to 32GB RAM and 8 cores for increased workload - 2025-08-24"
    }
  }'

# Step 3: Add additional storage
curl -X POST "https://your-vergeos.example.com/api/v4/machine_drives" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "name": "Application Data",
    "interface": "virtio-scsi",
    "media": "disk",
    "disksize": 1073741824000,
    "preferred_tier": "2"
  }'

# Step 4: Add secondary network interface
curl -X POST "https://your-vergeos.example.com/api/v4/machine_nics" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "machine": "54",
    "name": "Management Network",
    "interface": "virtio",
    "vnet": "5",
    "enabled": true
  }'
```

## Configuration Best Practices

### Before Making Changes

1. **Check VM Status**: Ensure VM is in appropriate state for changes
2. **Backup Important Data**: Create snapshots before major changes
3. **Review Dependencies**: Consider impact on running applications
4. **Plan Downtime**: Some changes require VM restart

### After Making Changes

1. **Verify Configuration**: Check that changes were applied correctly
2. **Test Functionality**: Ensure VM operates as expected
3. **Update Documentation**: Add notes about configuration changes
4. **Monitor Performance**: Watch for any performance impacts

### Hotplug Considerations

```bash
# Check if VM supports hotplug
curl "https://your-vergeos.example.com/api/v4/vms/42?fields=allow_hotplug" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

!!! tip "Hotplug Support"
    - Modern guest operating systems generally support CPU and RAM hotplug
    - Drive hotplug depends on the guest OS and drive interface
    - Network interface hotplug is widely supported
    - Always test hotplug capabilities in your environment

## Error Handling

### Common Configuration Errors

**Error**: `400 Bad Request - Invalid RAM size`
```json
{
  "error": "RAM size must be at least 512 MB and at most 1048576 MB"
}
```

**Error**: `409 Conflict - VM must be stopped`
```json
{
  "error": "Cannot modify CPU cores while VM is running without hotplug support"
}
```

**Solution**: Stop the VM or check hotplug capabilities before making changes.

**Error**: `507 Insufficient Storage`
```json
{
  "error": "Insufficient storage space in tier 2 for requested disk size"
}
```

**Solution**: Choose different storage tier or reduce disk size.

!!! note "Related Operations"
    - **VM Creation**: See [`VM-Creation-API.md`](VM-Creation-API.md) for initial VM setup
    - **Power Management**: See [`VM-Power-Management.md`](VM-Power-Management.md) for start/stop operations
    - **Advanced Operations**: See [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md) for cloning and snapshots

!!! question "Need Help?"
    For additional support with VM configuration:
    - Check the VergeOS documentation portal
    - Contact VergeOS support with specific error messages
    - Review system logs for detailed error information
    - Consult the VergeOS community forums
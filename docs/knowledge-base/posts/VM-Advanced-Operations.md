---
title: "VM Advanced Operations API"
slug: vm-advanced-operations
description: Complete guide to advanced VM operations in VergeOS, including cloning, snapshots, deletion, and troubleshooting
author: VergeOS Documentation Team
draft: false
date: 2025-08-24T01:24:43Z
parent_guide: "VM Lifecycle Management"
workflow_stage: "advanced_operations"
prerequisites:
  - "VM must be created first (see VM-Creation-API.md)"
  - "Valid VergeOS API credentials with VM management permissions"
  - "Understanding of VM lifecycle stages"
related_docs:
  - "Creation: VM-Creation-API.md"
  - "Power Management: VM-Power-Management.md"
  - "Configuration: VM-Configuration.md"
key_concepts:
  - "vm_cloning"
  - "snapshot_management"
  - "safe_deletion"
  - "error_handling"
semantic_keywords:
  - "VM cloning, virtual machine duplication, VM copying"
  - "snapshot creation, backup operations, point-in-time recovery"
  - "VM deletion, resource cleanup, safe removal"
  - "troubleshooting, error handling, diagnostic operations"
  - "disaster recovery, backup workflows, VM restoration"
  - "template creation, VM replication, mass deployment"
use_cases:
  - "disaster_recovery"
  - "backup_automation"
  - "template_creation"
  - "testing_environments"
  - "resource_cleanup"
  - "troubleshooting_workflows"
tags:
  - api
  - vm
  - cloning
  - snapshots
  - deletion
  - troubleshooting
categories:
  - API Reference
  - Virtual Machines
editor: markdown
dateCreated: 2025-08-24T01:24:43Z
---

# VM Advanced Operations API

!!! info "Key Points"
    - Clone VMs with complete configuration and drive copying
    - Create and restore VM snapshots for backup and recovery
    - Safely delete VMs with automatic resource cleanup
    - Comprehensive error handling and troubleshooting guidance

This guide covers advanced virtual machine operations in VergeOS, including cloning, snapshot management, deletion, and troubleshooting. These operations provide powerful capabilities for VM lifecycle management and disaster recovery.

<!-- WORKFLOW CONTEXT -->
**Stage**: VM Advanced Operations (4 of 4)
**Input**: VM key (42), operation type, parameters
**Output**: Cloned VMs, snapshots, cleanup confirmation
**Previous**: VM configured → [`VM-Configuration.md`](VM-Configuration.md)
**Common Operations**:
- Clone for templates → New VM creation cycle
- Snapshot for backup → Recovery workflows
- Delete for cleanup → End of lifecycle
<!-- END CONTEXT -->

## This Document Helps With
- "How to clone VMs via API"
- "Creating VM snapshots and backups"
- "Restoring VMs from snapshots"
- "Safely deleting VMs and cleanup"
- "VM troubleshooting and diagnostics"
- "Template creation workflows"
- "Disaster recovery operations"
- "Bulk VM management"
- "Resource cleanup automation"

## Quick Reference

### Primary Endpoints
- **VM Actions**: `POST /api/v4/vm_actions`
- **VM Deletion**: `DELETE /api/v4/vms/{vm_key}`
- **VM Listing**: `GET /api/v4/vms`

### Key Actions
- `clone`: Create complete VM copy
- `snapshot`: Create VM snapshot
- `restore`: Restore from snapshot

### Authentication
```bash
-H "Authorization: Bearer YOUR_API_KEY"
-H "Content-Type: application/json"
```

### Prerequisites
VM must exist → See [`VM-Creation-API.md`](VM-Creation-API.md)

## API Quick Reference
| Operation | Method | Endpoint | Key Type | Purpose |
|-----------|--------|----------|----------|---------|
| Clone VM | POST | `/api/v4/vm_actions` | VM key | Create complete copy |
| Create Snapshot | POST | `/api/v4/vm_actions` | VM key | Point-in-time backup |
| Restore Snapshot | POST | `/api/v4/vm_actions` | VM key | Recovery operation |
| List Snapshots | GET | `/api/v4/vms` | Filter query | Find snapshots |
| Delete VM | DELETE | `/api/v4/vms/{id}` | VM key | Complete removal |
| VM Status | GET | `/api/v4/vms/{id}` | VM key | Configuration check |
| Operation Status | GET | `/api/v4/machine_status/{id}` | Machine key | Runtime monitoring |

## Troubleshooting Index
- **409 Conflict**: Clone name exists, VM already running, operation in progress
- **507 Insufficient Storage**: Not enough space for clone, snapshot storage full
- **403 Forbidden**: API key permissions, VM access denied, cluster restrictions
- **404 Not Found**: VM not found, snapshot not found, invalid VM key
- **408 Request Timeout**: Clone operation timeout, snapshot creation timeout
- **422 Unprocessable Entity**: Invalid clone parameters, snapshot restore conflict
- **500 Internal Server Error**: Storage system issues, hypervisor problems, cluster failures

## VM Cloning

### POST /api/v4/vm_actions

**Description**: Creates a complete copy of a VM including all drives and configuration.

### Basic Clone

```json
{
  "params": {
    "name": "test clone",
    "quiesce": "true"
  },
  "action": "clone",
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "params": {
      "name": "test clone",
      "quiesce": "true"
    },
    "action": "clone",
    "vm": "42"
  }'
```

**Response Example**:
```json
{
  "response": {
    "vmkey": "43",
    "machinekey": "55",
    "machinestatuskey": "55",
    "clusterkey": "1"
  }
}
```

### Advanced Clone Options

```json
{
  "params": {
    "name": "production-clone",
    "description": "Production server clone for testing",
    "preserve_macs": "true",
    "preserve_device_uuids": "true",
    "quiesce": "true",
    "cluster": "2"
  },
  "action": "clone",
  "vm": "42"
}
```

### Clone Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| name | string | Yes | Name for the cloned VM |
| description | string | No | Description for the clone |
| quiesce | string | No | Quiesce VM before cloning ("true"/"false") for data consistency |
| preserve_macs | string | No | Preserve MAC addresses ("true"/"false") |
| preserve_device_uuids | string | No | Preserve device UUIDs ("true"/"false") |
| cluster | string | No | Target cluster ID |

!!! tip "Clone Options"
    - **Quiesce**: Use `"quiesce": "true"` to ensure data consistency by pausing the VM briefly
    - **Preserve MACs**: Use `"preserve_macs": "true"` to keep the same MAC addresses (may cause network conflicts)
    - **Preserve Device UUIDs**: Use `"preserve_device_uuids": "true"` to maintain device identifiers
    - **Cross-Cluster**: Specify different cluster ID to clone to another cluster

### Clone Workflow Example

```bash
# Step 1: Create clone
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "params": {
      "name": "backup-clone-$(date +%Y%m%d)",
      "description": "Automated backup clone",
      "quiesce": "true"
    },
    "action": "clone",
    "vm": "42"
  }'

# Step 2: Verify clone creation (using returned vmkey)
curl "https://your-vergeos.example.com/api/v4/vms/43?fields=name,description,created" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Step 3: Check clone power state
curl "https://your-vergeos.example.com/api/v4/machine_status/55?fields=powerstate,status" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## VM Snapshots

### Creating Snapshots

```json
{
  "vm": "42",
  "action": "snapshot",
  "params": {
    "name": "pre-update-snapshot",
    "description": "Before system update"
  }
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vm": "42",
    "action": "snapshot",
    "params": {
      "name": "pre-update-snapshot",
      "description": "Before system update - $(date)"
    }
  }'
```

### Restoring from Snapshots

```json
{
  "vm": "42",
  "action": "restore",
  "params": {
    "snapshot_id": "snapshot-67890"
  }
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vm": "42",
    "action": "restore",
    "params": {
      "snapshot_id": "snapshot-67890"
    }
  }'
```

### Listing VM Snapshots

#### GET /api/v4/vms

Use filters to find snapshots:

```bash
curl "https://your-vergeos.example.com/api/v4/vms?filter=is_snapshot%20eq%20true%20and%20name%20contains%20'web-server'" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Find All Snapshots for a VM**:
```bash
curl "https://your-vergeos.example.com/api/v4/vms?filter=is_snapshot%20eq%20true%20and%20parent_vm%20eq%2042" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Snapshot Management Workflow

```bash
# Step 1: Create snapshot before maintenance
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vm": "42",
    "action": "snapshot",
    "params": {
      "name": "maintenance-snapshot-$(date +%Y%m%d-%H%M)",
      "description": "Pre-maintenance snapshot"
    }
  }'

# Step 2: List snapshots to find snapshot ID
curl "https://your-vergeos.example.com/api/v4/vms?filter=is_snapshot%20eq%20true%20and%20parent_vm%20eq%2042&fields=name,description,created" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Step 3: Restore if needed (after maintenance issues)
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "vm": "42",
    "action": "restore",
    "params": {
      "snapshot_id": "found-snapshot-id"
    }
  }'
```

## VM Deletion and Cleanup

### Complete VM Deletion

#### DELETE /api/v4/vms/{vm_key}

**Description**: Deletes a VM and automatically removes all associated resources including drives, NICs, devices, and configurations.

```bash
curl -X DELETE "https://your-vergeos.example.com/api/v4/vms/42" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response**: `200 OK` on successful deletion.

!!! important "Automatic Cleanup"
    When you delete a VM using `DELETE /api/v4/vms/{vm_key}`, VergeOS automatically removes:
    
    - **All drives** attached to the VM
    - **All network interfaces** (NICs)
    - **All devices** (GPU, PCI passthrough, USB, TPM, etc.)
    - **VM configuration** and metadata
    - **Cloud-init files** and configurations
    - **VM notes** and documentation
    - **Associated machine resources**

### Pre-Deletion Considerations

Before deleting a VM, consider:

1. **Data Backup**: Ensure important data is backed up
2. **Snapshots**: VM snapshots may be deleted with the VM
3. **Dependencies**: Check if other systems depend on this VM
4. **Network Configuration**: Note any special network configurations
5. **Licensing**: Consider software licensing implications

### Safe Deletion Process

#### Step 1: Power Off VM (Recommended)

```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "kill",
    "vm": "42"
  }'
```

#### Step 2: Verify Power State

```bash
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=powerstate" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Step 3: Create Final Backup (Optional)

```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "params": {
      "name": "final-backup-before-deletion",
      "description": "Final backup before VM deletion"
    },
    "action": "clone",
    "vm": "42"
  }'
```

#### Step 4: Delete VM and All Resources

```bash
curl -X DELETE "https://your-vergeos.example.com/api/v4/vms/42" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

!!! tip "VM Key Usage"
    Use the VM key (e.g., `42`) from the VM creation response or VM listing, not the machine key. The deletion process automatically handles all associated machine resources.

### No Manual Cleanup Required

Unlike some virtualization platforms, VergeOS handles complete resource cleanup automatically. You do **not** need to manually:

- Delete individual drives
- Remove network interfaces
- Detach devices
- Clean up configuration files
- Remove machine status entries

The single `DELETE /api/v4/vms/{vm_key}` operation handles all cleanup automatically.

### Finding Orphaned Resources

```bash
# Find drives without associated machines
curl "https://your-vergeos.example.com/api/v4/machine_drives?filter=machine%20eq%20null" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Find NICs without associated machines
curl "https://your-vergeos.example.com/api/v4/machine_nics?filter=machine%20eq%20null" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Error Handling and Troubleshooting

### Common Error Scenarios

#### VM Creation Failures

**Error**: `400 Bad Request - Invalid machine type`
```json
{
  "error": "Invalid machine_type 'invalid-type'. Valid options: pc, q35, pc-i440fx-*, pc-q35-*"
}
```

**Solution**: Use valid machine types from the supported list.

#### Power State Conflicts

**Error**: `409 Conflict - VM already running`
```json
{
  "error": "Cannot power on VM: already in running state"
}
```

**Solution**: Check current power state before issuing power commands.

#### Resource Constraints

**Error**: `507 Insufficient Storage`
```json
{
  "error": "Insufficient storage space in tier 3 for requested disk size"
}
```

**Solution**: Choose different storage tier or reduce disk size.

#### Clone Failures

**Error**: `409 Conflict - Clone name already exists`
```json
{
  "error": "VM with name 'test clone' already exists"
}
```

**Solution**: Use unique names for cloned VMs.

### Monitoring VM Operations

#### Checking Operation Status

Many VM operations are asynchronous. Monitor progress using:

```bash
# Check VM status
curl "https://your-vergeos.example.com/api/v4/vms/42?fields=machine%23status" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Check machine status for runtime information
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=status,powerstate" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Operation Timeouts

Set appropriate timeouts for long-running operations:

- **VM Creation**: 5-10 minutes
- **Clone Operations**: 10-30 minutes (depending on size)
- **Snapshot Creation**: 2-5 minutes
- **Snapshot Restore**: 5-15 minutes
- **Power State Changes**: 30-60 seconds
- **VM Deletion**: 2-5 minutes

### Retry Logic

Implement retry logic for transient failures:

```python
import time
import requests

def wait_for_operation_completion(vm_id, max_retries=20):
    """Wait for VM operation to complete"""
    for attempt in range(max_retries):
        response = requests.get(
            f"https://your-vergeos.example.com/api/v4/vms/{vm_id}",
            params={"fields": "machine#status#status as operation_status"},
            headers={"Authorization": "Bearer YOUR_API_KEY"}
        )
        
        status = response.json().get("operation_status", "")
        if status not in ["cloning", "snapshotting", "restoring"]:
            return True
            
        time.sleep(10)  # Wait 10 seconds between checks
    
    return False

# Example usage
if wait_for_operation_completion("42"):
    print("Operation completed successfully")
else:
    print("Operation timed out")
```

### Debugging VM Issues

#### Check VM Configuration

```bash
# Get complete VM configuration
curl "https://your-vergeos.example.com/api/v4/vms/42?fields=most" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Check Machine Status

```bash
# Get runtime status and errors
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=most" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

#### Check System Resources

```bash
# Check cluster resources
curl "https://your-vergeos.example.com/api/v4/clusters/1?fields=resources" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Check storage tiers
curl "https://your-vergeos.example.com/api/v4/storage_tiers" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Best Practices

1. **Always test operations** in development environments first
2. **Create snapshots** before major changes
3. **Monitor resource usage** during operations
4. **Implement proper error handling** in automation scripts
5. **Use descriptive names** for clones and snapshots
6. **Clean up unused resources** regularly
7. **Document operational procedures** for your team

!!! note "Related Operations"
    - **VM Creation**: See [`VM-Creation-API.md`](VM-Creation-API.md) for initial VM setup
    - **Power Management**: See [`VM-Power-Management.md`](VM-Power-Management.md) for start/stop operations
    - **Configuration**: See [`VM-Configuration.md`](VM-Configuration.md) for CPU/RAM changes

!!! question "Need Help?"
    For additional support with VM advanced operations:
    - Check the VergeOS documentation portal
    - Contact VergeOS support with specific error messages
    - Review system logs for detailed error information
    - Consult the VergeOS community forums
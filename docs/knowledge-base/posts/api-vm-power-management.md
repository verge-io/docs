---
title: "VM Power Management API"
slug: vm-power-management
description: Complete guide to managing VM power states in VergeOS, including starting, stopping, rebooting, and monitoring power status
author: VergeOS Documentation Team
draft: false
date: 2025-08-24T01:21:35Z
parent_guide: "VM Lifecycle Management"
workflow_stage: "power_management"
prerequisites:
  - "VM must be created first (see VM-Creation-API.md)"
  - "Valid VergeOS API credentials with VM management permissions"
next_steps:
  - "Configuration: VM-Configuration.md"
  - "Advanced Operations: VM-Advanced-Operations.md"
key_concepts:
  - "vm_key_vs_machine_key"
  - "power_states"
  - "graceful_vs_forced_operations"
semantic_keywords:
  - "VM power control, virtual machine startup, VM shutdown"
  - "REST API power management, VM state control"
  - "graceful shutdown, forced power off, ACPI operations"
  - "VM reboot, reset operations, power cycling"
  - "power state monitoring, VM status checking"
  - "machine key vs VM key, runtime status"
use_cases:
  - "automated_power_management"
  - "scheduled_operations"
  - "maintenance_workflows"
  - "monitoring_automation"
  - "disaster_recovery"
  - "resource_optimization"
tags:
  - api
  - vm
  - power
  - management
  - virtual-machines
categories:
  - API Reference
  - Virtual Machines
editor: markdown
dateCreated: 2025-08-24T01:21:35Z
---

# VM Power Management API

!!! info "Key Points"
    - Control VM power states through REST API endpoints
    - Support for graceful and forced power operations
    - Monitor VM power state and runtime status
    - Understand VM key vs Machine key for different status checks

This guide covers managing virtual machine power states in VergeOS, including starting, stopping, rebooting, and monitoring VMs. The VergeOS API provides comprehensive power management capabilities with both graceful and forced operations.

<!-- WORKFLOW CONTEXT -->
**Stage**: VM Power Management (2 of 4)
**Input**: VM key (42) from creation, power operation type
**Output**: Power state changes, runtime status
**Previous**: VM created → [`VM-Creation-API.md`](VM-Creation-API.md)
**Common Next Steps**:
- Configure VM settings → [`VM-Configuration.md`](VM-Configuration.md)
- Advanced operations → [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md)
<!-- END CONTEXT -->

## This Document Helps With
- "How to start/stop VMs via API"
- "Checking VM power status"
- "Graceful vs forced VM shutdown"
- "VM reboot and reset operations"
- "Monitoring VM power state"
- "Power management automation"
- "VM startup troubleshooting"
- "Scheduled power operations"
- "Resource optimization through power control"

## Quick Reference

### Primary Endpoints
- **Power Actions**: `POST /api/v4/vm_actions`
- **VM Status**: `GET /api/v4/vms/{id}`
- **Power State**: `GET /api/v4/machine_status/{machine_id}`

### Key Actions
- `poweron`: Start VM
- `poweroff`: Graceful shutdown (ACPI)
- `kill`: Force power off
- `reset`: Reboot VM

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
| Power On | POST | `/api/v4/vm_actions` | VM key | Start virtual machine |
| Power Off | POST | `/api/v4/vm_actions` | VM key | Graceful shutdown (ACPI) |
| Force Off | POST | `/api/v4/vm_actions` | VM key | Immediate termination |
| Reboot | POST | `/api/v4/vm_actions` | VM key | Restart VM |
| VM Info | GET | `/api/v4/vms/{id}` | VM key | Configuration data |
| Power State | GET | `/api/v4/machine_status/{id}` | Machine key | Runtime status |

## Troubleshooting Index
- **409 Conflict**: VM already running, VM not running, power state mismatch
- **507 Insufficient Resources**: Not enough cluster resources, memory/CPU unavailable
- **403 Forbidden**: API key permissions, cluster access denied, VM access restricted
- **404 Not Found**: Invalid VM key, VM deleted, machine key not found
- **408 Request Timeout**: Power operation timeout, VM unresponsive, cluster communication failure
- **500 Internal Server Error**: Hypervisor issues, node problems, storage failures

## Starting VMs

### POST /api/v4/vm_actions

**Description**: Powers on a virtual machine and waits for it to reach running state.

**Power On Request**:
```json
{
  "action": "poweron",
  "params": {},
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "poweron",
    "params": {},
    "vm": "42"
  }'
```

**Response**: `201 Created` when action is initiated.

!!! tip "Best Practices"
    - Always verify VM configuration before powering on
    - Ensure all required drives and network interfaces are attached
    - Check cluster resource availability
    - Verify VM is not already running to avoid conflicts

## Stopping VMs

### Graceful Power Off (ACPI)

**Description**: Sends an ACPI shutdown signal to the guest operating system, allowing it to shut down cleanly.

```json
{
  "action": "poweroff",
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "poweroff",
    "vm": "42"
  }'
```

### Force Power Off (Kill)

**Description**: Immediately terminates the VM without allowing the guest OS to shut down cleanly. Use only when graceful shutdown fails.

```json
{
  "action": "kill",
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "kill",
    "vm": "42"
  }'
```

!!! warning "Force Power Off"
    Using `kill` action may cause data loss or corruption. Always try graceful `poweroff` first and only use `kill` when necessary.

## Rebooting VMs

### Graceful Reboot (ACPI)

**Description**: Sends an ACPI reset signal to the guest operating system for a clean restart.

```json
{
  "action": "reset",
  "params": {
    "graceful": true
  },
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reset",
    "params": {
      "graceful": true
    },
    "vm": "42"
  }'
```

### Hard Reset (Power Cycle)

**Description**: Immediately restarts the VM without allowing the guest OS to shut down cleanly.

```json
{
  "action": "reset",
  "vm": "42"
}
```

**Complete API Call**:
```bash
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reset",
    "vm": "42"
  }'
```

## VM Status and Information

### GET /api/v4/vms/{id}

**Description**: Retrieves VM configuration and metadata using various field filters.

**Get Complete VM Information**:
```bash
curl "https://your-vergeos.example.com/api/v4/vms/42?fields=most" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response Example**:
```json
{
  "$key": 42,
  "name": "test",
  "machine": 54,
  "description": "test vm",
  "enabled": true,
  "created": 1755991665,
  "modified": 1755993248,
  "is_snapshot": false,
  "machine_type": "pc-q35-9.0",
  "allow_hotplug": true,
  "guest_agent": true,
  "cpu_cores": 3,
  "cpu_type": "host",
  "ram": 16384,
  "console": "spice",
  "video": "qxl",
  "sound": "none",
  "os_family": "linux",
  "rtc_base": "utc",
  "boot_order": "cd",
  "console_pass_enabled": false,
  "usb_tablet": true,
  "uefi": true,
  "secure_boot": false,
  "serial_port": false,
  "boot_delay": 5,
  "uuid": "821e96ec-2479-7cc4-7c14-c623557bdd2b",
  "need_restart": false,
  "console_status": 42,
  "cloudinit_datasource": "none",
  "imported": false,
  "created_from": "custom",
  "migration_method": "auto",
  "note": "This is a test VM",
  "power_cycle_timeout": 0,
  "allow_export": true,
  "creator": "admin",
  "nested_virtualization": true,
  "disable_hypervisor": true,
  "usb_legacy": false
}
```

## VM Power State and Runtime Status

### GET /api/v4/machine_status/{machine_id}

**Description**: Retrieves the actual runtime status and power state of a VM using the machine key.

**Check VM Power State**:
```bash
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=most" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

### Stopped VM Response Example

```json
{
  "$key": 54,
  "machine": 54,
  "running": false,
  "migratable": true,
  "node": null,
  "migrated_node": null,
  "migration_destination": null,
  "started": 1755993338,
  "local_time": 0,
  "status": "stopped",
  "status_info": "",
  "state": "offline",
  "powerstate": false,
  "last_update": 1755993358,
  "running_cores": 3,
  "running_ram": 16384,
  "agent_version": "",
  "agent_features": [],
  "agent_guest_info": []
}
```

### Running VM Response Example

```json
{
  "$key": 44,
  "machine": 44,
  "running": true,
  "migratable": true,
  "node": 3,
  "migrated_node": null,
  "migration_destination": null,
  "started": 1755460982,
  "local_time": 0,
  "status": "running",
  "status_info": "",
  "state": "online",
  "powerstate": true,
  "last_update": 1755993927,
  "running_cores": 6,
  "running_ram": 12288,
  "agent_version": "",
  "agent_features": [],
  "agent_guest_info": []
}
```

!!! important "VM vs Machine Status"
    - **VM Information** (`/api/v4/vms/{vm_key}`): Configuration, settings, and metadata
    - **Power State** (`/api/v4/machine_status/{machine_key}`): Runtime status, power state, and resource usage
    - Always use the machine key (not VM key) to check actual power state and runtime status

!!! tip "Status Fields"
    - `powerstate`: Boolean indicating if VM is powered on
    - `running`: Boolean indicating if VM is currently running
    - `status`: Text status ("running", "stopped", etc.)
    - `state`: Overall state ("online", "offline")
    - `node`: Which physical node the VM is running on (null if stopped)

## Power State Monitoring

### Checking Power State Only

For quick power state checks, you can request specific fields:

```bash
# Check just the power state
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=powerstate,running,status" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

**Response**:
```json
{
  "powerstate": true,
  "running": true,
  "status": "running"
}
```

### Monitoring Power State Changes

```python
import time
import requests

def wait_for_power_state(machine_id, desired_state, max_retries=10):
    """Wait for VM to reach desired power state"""
    for attempt in range(max_retries):
        response = requests.get(
            f"https://your-vergeos.example.com/api/v4/machine_status/{machine_id}",
            params={"fields": "powerstate,running,status"},
            headers={"Authorization": "Bearer YOUR_API_KEY"}
        )
        
        data = response.json()
        if data.get("powerstate") == desired_state:
            return True
            
        time.sleep(5)  # Wait 5 seconds between checks
    
    return False

# Example usage
if wait_for_power_state("54", True):
    print("VM is now running")
else:
    print("VM failed to start within timeout")
```

## Common Power Management Workflows

### Safe VM Shutdown Workflow

```bash
# Step 1: Attempt graceful shutdown
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action": "poweroff", "vm": "42"}'

# Step 2: Wait and check status (repeat as needed)
sleep 30
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=powerstate,status" \
  -H "Authorization: Bearer YOUR_API_KEY"

# Step 3: Force shutdown if graceful failed (after reasonable timeout)
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action": "kill", "vm": "42"}'
```

### VM Restart Workflow

```bash
# Step 1: Graceful reboot
curl -X POST "https://your-vergeos.example.com/api/v4/vm_actions" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "reset",
    "params": {"graceful": true},
    "vm": "42"
  }'

# Step 2: Monitor restart progress
curl "https://your-vergeos.example.com/api/v4/machine_status/54?fields=powerstate,status,node" \
  -H "Authorization: Bearer YOUR_API_KEY"
```

## Error Handling

### Common Power Management Errors

**Error**: `409 Conflict - VM already running`
```json
{
  "error": "Cannot power on VM: already in running state"
}
```
**Solution**: Check current power state before issuing power commands.

**Error**: `409 Conflict - VM not running`
```json
{
  "error": "Cannot power off VM: not in running state"
}
```
**Solution**: Verify VM is actually running before attempting shutdown.

**Error**: `507 Insufficient Resources`
```json
{
  "error": "Insufficient cluster resources to start VM"
}
```
**Solution**: Check cluster resource availability or reduce VM resource requirements.

### Operation Timeouts

Set appropriate timeouts for power operations:

- **Power On**: 30-60 seconds
- **Graceful Shutdown**: 60-120 seconds
- **Force Shutdown**: 10-30 seconds
- **Reboot**: 60-120 seconds

!!! note "Related Operations"
    - **VM Creation**: See [`VM-Creation-API.md`](VM-Creation-API.md) for creating VMs
    - **Configuration**: See [`VM-Configuration.md`](VM-Configuration.md) for CPU/RAM changes
    - **Advanced Operations**: See [`VM-Advanced-Operations.md`](VM-Advanced-Operations.md) for cloning and snapshots

!!! question "Need Help?"
    For additional support with VM power management:
    - Check the VergeOS documentation portal
    - Contact VergeOS support with specific error messages
    - Review system logs for detailed error information
    - Consult the VergeOS community forums
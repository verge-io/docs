---
title: VM and Tenant Hot-Plug Capabilities
slug: vm-hotplug-capabilities
description: Understanding which resources can be modified on running VMs and tenants without requiring a restart
author: Verge.io
published: true
date: 2026-02-03
tags:
  - virtual machines
  - tenants
  - hot-plug
  - configuration
categories:
  - Virtual Machines
  - Tenants
---

# VM and Tenant Hot-Plug Capabilities

This article explains which resources can be modified on running virtual machines and tenants without requiring a power cycle, and which changes require a restart.

## Virtual Machine Hot-Plug

The **Allow Hotplug** setting on a VM (enabled by default) controls whether drives and NICs can be added or removed while the VM is running.

### What Can Be Hot-Plugged

| Resource | Hot-Plug | Notes |
|----------|----------|-------|
| **Drives** | Yes | Guest OS must support hot-add; Virtio-SCSI interface recommended |
| **NICs** | Yes | Widely supported by modern guest operating systems |
| **Drive Resize** | Yes | Virtio-SCSI drives can be expanded without power cycle; guest OS may need to rescan or extend filesystem |

### What Requires a Power Cycle

| Resource | Power Cycle Required | Notes |
|----------|---------------------|-------|
| **RAM** | Yes | Memory changes always require VM to be powered off and back on |
| **CPU Cores** | Yes | Core count changes always require a power cycle |
| **Console Type** | Yes | VNC/Spice/Serial changes take effect on next power on |
| **Video Card** | Yes | Video adapter changes require power cycle |
| **Machine Type** | Yes | Chipset changes require power cycle |
| **UEFI/BIOS** | Yes | Boot mode changes require power cycle |

### Hot-Plug Requirements

For drive and NIC hot-plug to work:

1. **Allow Hotplug** must be enabled on the VM (this is the default)
2. The guest operating system must support hot-plug for the device type
3. For drives, using the **Virtio-SCSI** interface provides the best hot-plug compatibility

### Performing Hot-Plug Operations

**Adding a drive or NIC while VM is running:**

1. Navigate to the VM dashboard
2. Click **Drives** or **NICs** on the left menu
3. Click **New** to add the device
4. The device appears in the guest OS (may require a rescan in some operating systems)

**Removing a drive or NIC while VM is running:**

1. Navigate to the VM dashboard
2. Click **Drives** or **NICs** on the left menu
3. Select the device to remove
4. Click **Hotplug** on the left menu to safely detach it
5. Once detached, the device can be deleted

!!! warning "Guest OS Considerations"
    Before hot-removing a drive, ensure it is not in use by the guest OS. Unmount filesystems and remove from any volume groups or RAID arrays first.

---

## Tenant Node Resources

Tenant nodes behave differently from VMs regarding resource changes.

### Tenant Resources Can Be Changed Live

| Resource | Live Change | Notes |
|----------|-------------|-------|
| **RAM** | Yes | Tenant node memory can be increased or decreased without restart |
| **CPU Cores** | Yes | Tenant node cores can be increased or decreased without restart |
| **Storage** | Yes | Storage tiers can be added or expanded without restart |

Tenant nodes are designed for flexible resource allocation. You can adjust a tenant node's RAM and cores from the parent system without interrupting workloads running inside the tenant.

### How to Modify Tenant Node Resources

1. From the tenant dashboard, click **Nodes** on the left menu
2. Double-click the tenant node to modify
3. Click **Edit** on the left menu
4. Adjust **Cores** and/or **RAM** as needed
5. Click **Submit**

The changes take effect immediately without requiring the tenant or its workloads to restart.

!!! tip "Resource Planning"
    While tenant node resources can be changed on the fly, the resources must actually be available on the physical host. The system validates availability when the change is submitted.

---

## Summary

| Component | RAM | CPU | Drives | NICs |
|-----------|-----|-----|--------|------|
| **VM** | Power cycle | Power cycle | Hot-plug | Hot-plug |
| **Tenant Node** | Live change | Live change | N/A | N/A |

For VMs, plan RAM and CPU requirements before powering on, as changes require a power cycle. Drives and NICs can be adjusted on the fly.

For tenants, resources can be adjusted at any time without service interruption, making it easy to scale tenant environments as needs change.

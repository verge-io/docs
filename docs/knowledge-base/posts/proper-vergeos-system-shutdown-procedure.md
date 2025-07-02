---
title: Proper VergeOS System Shutdown Procedure
slug: proper-vergeos-system-shutdown-procedure
description: Complete step-by-step guide for safely shutting down VergeOS systems and clusters
draft: false
date: 2025-07-02T00:00:00.000Z
tags:
  - shutdown
  - power-off
  - cluster-management
  - system-maintenance
  - best-practices
  - troubleshooting
categories:
  - System Administration
  - Best Practices
  - Troubleshooting
editor: markdown
dateCreated: 2025-07-02T00:00:00.000Z
---

# Proper VergeOS System Shutdown Procedure

## Overview

This document provides the step-by-step procedure for properly shutting down a VergeOS system. Following the correct shutdown sequence is critical to ensure data integrity, prevent corruption, and maintain the health of your VergeOS environment.

## Prerequisites

- Administrative access to the VergeOS UI
- Understanding of your cluster topology
- Identification of all running workloads and tenants
- Knowledge of controller node locations (Node1 & Node2)

## Shutdown Sequence

### Step 1: Inventory Running Workloads

Before beginning the shutdown process, you must identify all active workloads across your environment.

1. Navigate to each **Node Dashboard** in your cluster
2. Review the **Running Machines** section on each node
3. Document all running workloads including:
   - Virtual machines (VMs)
   - Tenant nodes
   - VMware backup services
   - NAS services
   - Any other active services

### Step 2: Shutdown Tenant Workloads

If tenants are running on any nodes in your cluster:

1. **Log into each tenant environment** that has active workloads
2. **Gracefully shut down all running workloads** within each tenant
3. **Verify shutdown completion** before proceeding to the next step

!!! warning "Important"
    Ensure all tenant workloads are properly shut down before proceeding. Failing to do so may result in data loss or corruption.

### Step 3: Power Off Host-Level Workloads

After all tenant workloads are shut down, power off all remaining workloads on each node:

1. **Virtual Machines (VMs)**: Use the graceful shutdown option when possible
2. **Tenant Nodes**: Ensure these are powered off after their internal workloads
3. **VMware Backup Services**: Stop any active backup operations
4. **NAS Services**: Safely stop all NAS-related services
5. **Other Services**: Power off any remaining active services

!!! info "vNet Containers"
    vNet containers do not need to be manually stopped. They will be gracefully stopped automatically during the cluster shutdown process.

### Step 4: Shutdown Individual Nodes

Once all workloads are stopped:

1. Navigate to the **Cluster Dashboard** for the cluster you wish to power off
2. Select **Power Off** from the left-hand menu
3. The system will begin shutting down each node in the cluster
4. **Monitor the shutdown progress** through the cluster dashboard

### Step 5: Shutdown the Entire Cluster

After individual nodes have been shut down:

1. Navigate to **System → Clusters**
2. Select the cluster you want to shut down
3. Select **Power Off** from the left menu
4. Confirm the shutdown when prompted

## Multi-Cluster Environment Considerations

!!! danger "Critical Warning"
    If your environment contains **multiple clusters**, you must **ALWAYS** shut down the cluster containing the controller nodes (Node1 & Node2) **LAST**.

### Shutdown Order for Multi-Cluster Environments:
1. Shut down all **non-controller clusters** first
2. Shut down the **controller cluster** (containing Node1 & Node2) last

This ensures that cluster coordination and management services remain available until all other clusters are safely shut down.

## Alternative Method: API Shutdown

For advanced users or automation purposes, you can use the VergeOS API to shutdown clusters:

```json
POST /v4/cluster_actions
{
    "cluster": [cluster_id],
    "action": "shutdown",
    "params": "{}"
}
```

## Proper Power-On Sequence

When powering your VergeOS system back on, follow this sequence:

### Single Cluster Environment:
1. **Power on Node1** first
2. **Wait for Node1 to come online** completely
3. **Power on Node2**
4. **Power on remaining nodes** one at a time, waiting approximately 1 minute between each
5. **Verify system status** on the main dashboard (should show Green and Online)

### Multi-Cluster Environment:
1. **Power on the controller cluster first** (Node1, then Node2, then remaining controller nodes)
2. **Wait for controller cluster to be fully online**
3. **Power on other clusters** following the single-cluster sequence for each

## Verification and Monitoring

After completing the shutdown or startup process:

1. **Check the main dashboard** for system status indicators
2. **Verify all nodes** show appropriate status (Offline for shutdown, Online for startup)
3. **Monitor system logs** for any errors or warnings
4. **Test critical services** after startup to ensure proper operation

## Troubleshooting

### Common Issues During Shutdown:

**Workloads Won't Shut Down Gracefully:**
- Check guest OS ACPI settings
- Use "Hard Reset" or "Kill Power" options as last resort
- Review VM power management settings

**Nodes Won't Enter Shutdown:**
- Verify all workloads are stopped
- Check for stuck or non-responsive VMs
- Review node logs for error messages

**Cluster Shutdown Fails:**
- Ensure individual nodes are properly shut down first
- Check cluster status and connectivity
- Verify no active migrations or maintenance operations

### Getting Help:

If you encounter issues during the shutdown process:
1. **Document the error messages** and current system state
2. **Check the VergeOS logs** for detailed error information
3. **Contact VergeOS support** with specific details about the issue

## Best Practices

- **Plan shutdown windows** during low-usage periods
- **Notify users** before beginning shutdown procedures
- **Document your specific environment** including cluster topology and critical workloads
- **Test the shutdown process** in non-production environments first
- **Maintain current backups** before performing system shutdowns
- **Use maintenance mode** for individual nodes when possible instead of full shutdowns

## Summary Checklist

- [ ] Inventory all running workloads across all nodes
- [ ] Shut down tenant workloads gracefully
- [ ] Power off all host-level workloads (VMs, services, etc.)
- [ ] Navigate to Cluster Dashboard and select Power Off
- [ ] Navigate to System → Clusters and power off the entire cluster
- [ ] For multi-cluster: Shut down controller cluster (Node1 & Node2) LAST
- [ ] Verify shutdown completion through dashboard monitoring
- [ ] Document any issues encountered for future reference

Following this procedure ensures a safe and controlled shutdown of your VergeOS environment while maintaining data integrity and system health.

---

!!! note "Document Information"
    - Document Type: Knowledge Base Article
    - Category: System Administration
    - Tags: shutdown, power-off, cluster-management, system-maintenance
    - Applies to: VergeOS 4.12.6 and later versions

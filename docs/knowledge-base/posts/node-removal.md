---
title: Removing a Node from a VergeOS Cluster
slug: removing-a-node-from-cluster
description: How to safely remove a physical node from a VergeOS system
author: VergeOS Documentation Team
published: true
date: 2026-01-23
tags: [nodes, cluster, maintenance, decommission]
categories:
  - System Administration
  - Maintenance
---

# Removing a Node from a VergeOS Cluster

## Overview

This guide covers the process of removing a physical node from a VergeOS system. This procedure is used for hardware decommissioning, cluster downsizing, or node replacement scenarios.

!!! warning "Important Limitation"
    Node removal can only be performed on the **last node** in the system. Nodes must be removed in reverse order (last added, first removed).

## Prerequisites

Before removing a node, ensure the following:

- **vSAN Health**: All vSAN tiers must be healthy (green status)
- **Cluster Size**: At least two nodes must remain in the cluster after removal
- **Recent Snapshot**: A current system snapshot is recommended before proceeding
- **Backup Access**: Verify IPMI or console access is available for troubleshooting

## Removal Process

### Step 1: Enable Maintenance Mode

1. Navigate to **System** > **Nodes**.
2. Double-click the **last node** in the system.
3. Click **Enable Maintenance** on the left menu.
4. Click **Yes** to confirm.
5. Wait for all workloads to migrate off the node. Monitor the **Running Machines** section until it is empty.

!!! note "Non-Migratable Workloads"
    VMs with GPU passthrough or host CPU type must be powered off manually before the node can enter maintenance mode.

### Step 2: Offline and Delete Drives

Before powering off the node, all drives must be removed from the vSAN.

1. Navigate to **System** > **vSAN** > **Drives**.
2. For each drive on the node being removed:
    1. Double-click the drive to open its dashboard.
    2. Click **Offline** on the left menu.
    3. Click **Yes** to confirm.
    4. Wait for the drive status to show **Offline**.
    5. Click **Delete** on the left menu.
    6. Click **Yes** to confirm the deletion.
3. Repeat for all drives on the node.

!!! warning "Wait for Data Migration"
    After offlining each drive, the vSAN will migrate data to other drives. Monitor the vSAN dashboard and wait for repairs to complete before deleting the drive.

### Step 3: Power Off the Node

1. Once all drives are deleted and the node status shows **Maintenance Mode**, click **Power Off** on the left menu.
2. Click **Yes** to confirm.
3. Wait for the node to fully power down.

### Step 4: Delete the Node

1. With the node powered off, click **Delete** on the left menu.
2. Click **Yes** to confirm the deletion.

### Step 5: Wait for Final Repairs

After the node is deleted, the vSAN will perform final data redistribution across the remaining nodes.

1. Navigate to **System** > **vSAN** to monitor repair progress.
2. Wait for all tiers to return to **green** (healthy) status before performing any other operations.

!!! danger "Do Not Interrupt Repairs"
    Do not power off, restart, or remove additional nodes while vSAN repairs are in progress. Allow the repairs to complete fully.

## Post-Removal Verification

After repairs complete:

- Verify all vSAN tiers show green status
- Confirm cluster resources are balanced across remaining nodes
- Check system logs for any warnings or errors

## Additional Resources

- [Maintenance Mode](/product-guide/operations/maintenance-mode/)
- [Nodes Overview](/product-guide/system/nodes-overview/)
- [Clusters Overview](/product-guide/system/clusters-overview/)

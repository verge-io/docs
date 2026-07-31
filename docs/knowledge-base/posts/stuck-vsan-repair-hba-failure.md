---
title: Stuck vSAN Repair After a Node's Storage Controller Fails
slug: stuck-vsan-repair-hba-failure
description: When a node's storage HBA faults and drops all of that node's drives at once, the vSAN tier goes non-redundant and the repair cannot finish until those drives return. Here is how to recognize it and recover safely.
author: VergeOS Documentation Team
draft: false
date: 2026-07-09T00:00:00.000Z
semantic_keywords:
  - "vsan repair stuck alarm never clears non-redundant tier"
  - "node storage hba controller fault all drives offline at once"
  - "megaraid_sas fw in fault state vsan drives dropped"
  - "vm read errors flapping fillpage no such file vsan"
  - "cold power cycle node clear controller firmware fault"
use_cases:
  - recover_from_stuck_vsan_repair
  - diagnose_node_storage_controller_failure
  - restore_vsan_redundancy_after_drive_loss
tags:
  - vsan
  - storage
  - repair
  - stuck repair
  - non-redundant
  - hba
  - raid controller
  - megaraid
  - drives offline
  - node
  - troubleshooting
  - data protection
categories:
  - Troubleshooting
  - vSAN
  - Storage
editor: markdown
dateCreated: 2026-07-09T00:00:00.000Z
---

# Stuck vSAN Repair After a Node's Storage Controller Fails

In this guide we work through a specific vSAN condition: repairs that never finish because a single node's storage controller failed and took all of that node's drives offline at once. Free space is not the problem here, and the repair will not self-heal onto the other nodes — the drives have to come back first.

## Symptoms

- The cluster shows many **vSAN Repair Stuck** alarms that never clear.
- The tier reports **non-redundant**.
- All of a single node's drives go offline at the same instant.
- One or more VMs flap or hit read errors.

## Overview

A node's storage HBA or RAID controller hit a firmware fault, the adapter was killed, and every vSAN drive on that node dropped offline together. The tier goes non-redundant and starts a repair — but the repair **cannot complete while that node's drives are missing**, so it churns indefinitely and keeps firing stuck-repair alarms.

The node's operating system often stays up through this; it doesn't reboot. Only its storage controller is gone. The VM read errors you see are blocks whose only surviving copy lived on the now-offline drives.

!!! info "This is a distinct cause"
    The repair does **not** rebuild onto the surviving nodes on its own, and free space on the tier is irrelevant. The offline drives must rejoin before the repair can finish. That makes this different from a bad-block or out-of-space stuck repair.

!!! warning "The tier is running non-redundant"
    Until the drives return, a second node loss in the same tier risks data loss. Do not reboot, power off, or run maintenance on any other node in the tier while the repair is outstanding.

## Resolution

1. Migrate any VM still running on the affected node to another node so it isn't impacted.
2. Cold power-cycle the affected node: hard power off, pull power, let residual power drain for about a minute, then power back on. A warm reboot often will **not** clear a controller firmware fault.
3. Wait for the node to come fully back up. Its drives rejoin and vSAN folds them back into the tier automatically.
4. Confirm the drives are back online and the repair count is dropping.
5. If the controller faults again after the cold cycle, the HBA needs hardware service or replacement.

!!! tip "Watch for collateral during a heavy repair"
    A long repair leans on the controller nodes' vSAN cache and on the failed node's memory. If the node also shows elevated DIMM temperatures or a history of uncorrectable ECC errors, have the hardware checked while you're in there.

## Additional Resources

- [Identifying a Failed Disk](/knowledge-base/identifying-a-failed-disk-drive)
- [Removing a Node from a VergeOS Cluster](/knowledge-base/removing-a-node-from-cluster)

!!! question "Need Help?"
    If the drives don't rejoin after a cold power cycle, or the controller keeps faulting, contact VergeOS support before taking any other node offline.

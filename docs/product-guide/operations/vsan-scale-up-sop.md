---
title: "vSAN Scale Up Standard Operating Procedure"
description: "Step-by-step runbook for safely adding drives to existing VergeOS nodes, including preparation checklists, execution steps, post-scale-up verification, and troubleshooting guidance."
semantic_keywords:
  - "vSAN scale up procedure, add drives to existing nodes, storage expansion runbook"
  - "vSAN maintenance window planning, pre-flight checklist, post-scale-up verification"
  - "storage capacity expansion, drive installation SOP, vSAN repair monitoring"
  - "HCI storage scale up, UCI storage node expansion, VergeOS storage operations"
use_cases:
  - storage_management
  - capacity_planning
  - administration
  - tier_configuration
tags:
  - vsan
  - scale-up
  - storage
  - maintenance
  - operations
  - sop
  - capacity-planning
categories:
  - Storage
  - System Administration
---

# VergeOS vSAN Scale Up SOP

Follow this checklist when adding drives to existing nodes during a maintenance window.

!!! abstract "Overview"
    Scaling up a vSAN requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into four phases:

    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Scale Up Verification** - Final checks immediately before beginning the scale up
    3. **Scale Up Execution** - Step-by-step procedure for adding drives, with key safety reminders
    4. **Post-Scale Up Verification** - Ensuring the scale up was successful

## Prerequisites

- Administrative access to VergeOS system
- IPMI access to all nodes in the cluster
- New storage drives that have passed manufacturer diagnostic tests (e.g., SMART extended self-test) and been verified in non-production hardware
- Physical access to nodes for drive installation

## Preparation Phase

Complete these steps well before your scheduled maintenance window:

### System Readiness

- [ ] Verify that at least one full system snapshot (cloud snapshot) exists and is set to expire no earlier than 3 days after the planned maintenance window
- [ ] Set specific success and verification criteria for your workloads

### Hardware Preparation

- [ ] Disks pre-tested in non-production hardware
- [ ] New disks are as large or larger than existing disks
    -  And of same performance class
- [ ] Verify drive compatibility with existing hardware
- [ ] Ensure you have enough new drives for each member node of the storage tier

### Documentation and Planning

- [ ] Update platform documentation with planned drive additions
- [ ] Document current vSAN configuration for reference
- [ ] Plan communication timeline for affected users

### Maintenance Window Planning

- [ ] Estimate repair time for your environment. After drives are added, the vSAN redistributes data across all drives in the tier. As a rough baseline, expect approximately 1-2 TB per hour for SSD-based tiers and slower for HDD-based tiers. Actual times depend on total data stored, drive speed, number of drives, and cluster workload. For a multi-node cluster, multiply by the number of nodes since each node must complete its repair cycle before proceeding to the next.
- [ ] Schedule the maintenance window with enough buffer for the full repair cycle to complete. Do not schedule the end of your maintenance window before repairs are expected to finish.

### Resource Verification

- [ ] Check cluster resource utilization
    - For HCI Systems (combined storage+compute nodes), ensure you have sufficient free memory to reboot 1 node
    - For UCI Systems (dedicated storage nodes) ensure no workloads are running on your storage cluster
- [ ] Confirm network paths among nodes
    - From Node1: Node Diagnostics -> 'Fabric Configuration' reports Core1 and Core2 paths 'confirmed:true' for all nodes
    - From Node2, verify the same
- [ ] Confirm IPMI access to all nodes via a method that allows console access in emergencies

## Pre-Scale Up Verification

Perform these checks on the day of scheduled maintenance, before beginning the scale up:

### Current State Verification

- [ ] Ensure no large storage operations are in progress (VMWare Backups, Imports, NAS file copies, Site Syncs)
- [ ] Resource availability - System is N+1
    - Verify RAM usage is enough to run workloads with a node offline (HCI Systems)
    - Verify vSAN tier being scaled is <70% full (recommended to ensure sufficient working space for data redistribution)
- [ ] System Snapshots (cloud snapshots) are recent and available
    - Set the most recent Snapshot to expire several days in the future for extra retention
- [ ] Confirm Outbound Syncs (if configured) are current
    -  Set the most recent remote Snapshot to expire several days in the future for extra retention
- [ ] Verify all vSAN tiers are in a healthy state (green status)
- [ ] Confirm no nodes are pending a reboot
- [ ] Verify Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all nodes
- [ ] Verify Node2 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all nodes

## Execution Phase

Work through the following steps for **each storage node**, one node at a time. Do not begin the next node until the current node's repair cycle is complete.

!!! tip "Node Ordering"
    There is no required order for processing nodes. However, starting with a node that has fewer workloads (or a dedicated storage node in a UCI setup) can reduce risk for the first iteration.

### Per-Node Procedure

1. **Put the node in [Maintenance Mode](/product-guide/system/maintenance-mode/)** (if hot-swap is not supported for your hardware).

2. **Power down the target node** via IPMI (if hot-swap is not supported). For hot-swap capable hardware, skip this step and proceed directly to drive installation.

3. **Install the new drives** in the target node following the manufacturer's physical installation guidelines.

4. **Power up the node** (if it was powered down) and verify it rejoins the cluster. Confirm the node appears healthy in the VergeOS UI.

5. **Refresh drives in the UI** so the system detects the new hardware:
    - Navigate to the node in the VergeOS UI.
    - Select **Refresh** from the left menu, then choose **Drives & NICs** from the dropdown.
    - Confirm by selecting **Yes**.

6. **Add the new drives to the vSAN tier:**
    - Select the **Scale Up** option from the left menu on the node page.
    - The newly inserted drives will appear in an **offline** state. Select the drive(s), then under **Node Drives**, select the **Scale Up** function.
    - Select the appropriate tier for the drive(s) and submit.

7. **Monitor vSAN repair progress.** After the drives are added, the vSAN tier will transition to a **yellow** status as data redistributes across all drives in the tier. Monitor progress under **System -> vSAN** in the UI. The tier will return to **green** when redistribution is complete.

    !!! warning "Critical Wait Period"
        It is essential to wait for the vSAN tier to return to a **green** healthy status before proceeding to the next node. Starting the next node while repair is still in progress risks data availability.

8. **Repeat steps 1-7 for each remaining storage node** until all nodes have been scaled up.

!!! info "Detailed UI Walkthrough"
    For additional screenshots and UI-level detail on the scale up process, see the [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan/) knowledge base article.

## Post-Scale Up Verification

After the scale up completes on all nodes, verify the system is operating correctly:

### System Health Checks

- [ ] Verify all new drives are recognized and added to the appropriate vSAN tier
- [ ] Confirm increased storage capacity is reflected in the UI
- [ ] Verify vSAN tier shows green status
- [ ] Test/confirm guest systems as required per your success criteria
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps
- [ ] Confirm data distribution is balanced across all drives

## Troubleshooting

### Common Issues

**vSAN tier remains yellow after extended time**

- Verify all new drives are properly seated and detected
- Check for drive errors in logs
- Ensure sufficient network bandwidth for repairs
- Remember that repairs redistribute data across all drives and may take hours to days depending on data volume and drive speed. Refer to your maintenance window estimate from the Preparation Phase.
- Contact support if repairs stall or show no progress for an extended period

**New drives not detected**

- Verify physical drive installation
- Check disk controller configuration if applicable
- Confirm drive compatibility with existing hardware
- Review system logs for hardware detection issues
- Try running **Refresh -> Drives & NICs** again from the node page

**Performance degradation during repairs**

- Workload I/O is prioritized over repair I/O by default. Some throughput reduction is expected during active repairs.
- Consider minimizing non-essential workloads during the maintenance window to reduce impact
- Monitor system resources
- If workload performance is unacceptable, contact support to discuss repair throttling options

**Drive fails mid-repair**

- Do not proceed to the next node
- Check the drive status in **System -> vSAN** for error indicators
- Verify the physical drive is properly seated
- If the drive has failed, it may need to be replaced before continuing. See the [Drive Replacement](/product-guide/operations/drive-replacement/) guide.
- Contact support if the tier does not recover after addressing the failed drive

## Rollback Procedure

!!! danger "Rollback Limitations"
    Once drives are added to a vSAN tier and repair/redistribution begins, the process cannot be safely reversed without support assistance. **Do NOT** remove newly added drives or power off nodes while repair is in progress.

If the scale-up encounters issues:

1. **Do not proceed to the next node.** Stop the scale-up process at the current node.
2. **Check the current state:**
    - Verify the vSAN tier status under **System -> vSAN** (is it yellow/repairing, red/degraded, or green/healthy?)
    - Check whether the newly added drives show errors or are online
    - Review system logs for any error messages
3. **If the tier is still repairing (yellow):** In most cases, the safest action is to wait for the repair to complete. Interrupting a repair can cause data availability issues.
4. **If a newly added drive has not yet received data:** You may be able to remove it from the tier safely. Verify the drive shows zero usage before attempting removal.
5. **Document the current state** with screenshots of the vSAN status page, tier details, and any log entries.
6. **Contact [support](/support)** with your system ID, a description of the issue, and the documentation you gathered. Support can assess whether it is safe to proceed, wait, or take corrective action.

## Next Steps

After successful scale up completion:

- [ ] Update capacity planning documentation
- [ ] Adjust monitoring thresholds for new capacity
- [ ] Review backup and snapshot policies for increased data
- [ ] Plan for future scaling needs based on growth projections
- [ ] Schedule follow-up performance monitoring

For guidance on when to scale and how to estimate future capacity needs, see [Capacity Planning](/product-guide/storage/capacity-planning).

!!! question "Need Help?"
    If you have questions about the vSAN scale up process or need assistance planning your maintenance window, contact [VergeOS Support](/support) or visit our [Knowledge Base](/knowledge-base/) for additional resources.

---
title: Selecting Storage Hardware for vSAN
slug: selecting-storage-hardware
description: Guide to choosing the right storage hardware for VergeOS vSAN deployments, including drive types, tier mapping, endurance planning, and capacity tradeoffs.
author: VergeOS Documentation Team
draft: false
date: 2026-04-03T00:00:00Z
semantic_keywords:
  - "vSAN storage hardware selection, drive recommendations, tier mapping"
  - "NVMe SSD HDD drive types, enterprise storage drives, DWPD endurance"
  - "storage capacity planning, drive sizing, hardware checklist"
  - "Fibre Channel integration, mixed drive configurations, hot spare planning"
use_cases:
  - storage_management
  - capacity_planning
  - initial_setup
  - tier_configuration
  - configuration
tags:
  - vsan
  - storage
  - hardware
  - drives
  - planning
  - capacity
  - nvme
  - ssd
  - hdd
categories:
  - vSAN
editor: markdown
dateCreated: 2026-04-03T00:00:00Z
---

# Selecting Storage Hardware for vSAN

## Overview

!!! info "Key Points"
    - Drive type determines which vSAN tier a device is assigned to and the workloads it can support
    - Enterprise-grade drives are required for production environments
    - Matching drive specifications to workload characteristics avoids overspending and underperforming
    - SMART monitoring and hot spare planning help you stay ahead of drive failures

Choosing the right storage hardware is one of the most impactful decisions you will make when deploying VergeOS. The vSAN tiered architecture lets you mix different drive types within a single cluster, so you can optimize for both performance and cost. This guide walks through drive selection, tier mapping, endurance planning, and capacity tradeoffs to help you build a storage foundation that meets your needs today and scales for the future.

## Prerequisites

- Familiarity with the [vSAN tiered storage model](/product-guide/storage/storage-tiers)
- Review of the [Node Sizing Guide](/implementation-guide/sizing/) for minimum and recommended hardware specifications
- An understanding of your target workloads (VM types, I/O patterns, capacity requirements)

## Drive Types and Tier Mapping

The vSAN supports up to six storage tiers (0-5). When you add a physical drive, the system auto-detects the drive type and suggests a tier assignment. You can override this assignment if your deployment strategy requires it.

### NVMe SSDs

NVMe drives connect directly to the PCIe bus, delivering the lowest latency and highest throughput of any local storage option.

| Tier | Role | Drive Recommendation |
|------|------|---------------------|
| **Tier 0** | vSAN metadata | High-endurance NVMe with 3+ DWPD |
| **Tier 1** | High-performance workloads | Enterprise NVMe with 1-3 DWPD |

!!! tip "Tier 0 Sizing"
    Plan for at least 5 GB of Tier 0 storage per 1 TB of usable cluster capacity (minimum). For better headroom, target 10 GB per 1 TB. Tier 0 drives should be on both controller nodes for redundancy.

### SATA/SAS SSDs

SATA and SAS SSDs offer strong read/write performance at a lower cost per gigabyte than NVMe. They are a good fit for mixed and read-heavy workloads.

| Tier | Role | Drive Recommendation |
|------|------|---------------------|
| **Tier 2** | Mixed workloads | Mid-range enterprise SATA/SAS SSD |
| **Tier 3** | Read-optimized workloads | Read-optimized enterprise SSD |

### HDDs (Hard Disk Drives)

Rotational drives provide the highest capacity per dollar and are appropriate for data that does not require low-latency access.

| Tier | Role | Drive Recommendation |
|------|------|---------------------|
| **Tier 4** | Capacity / bulk storage | Enterprise SAS or SATA HDD |
| **Tier 5** | Archive / cold storage | High-capacity archival HDD |

!!! warning "Large HDD Considerations"
    HDDs larger than 8 TB are not recommended outside of archive-specific environments. Larger drives significantly extend rebuild times after a failure, which increases the window of reduced redundancy and can impact cluster performance.

## Workload-Based Drive Recommendations

Different workloads place very different demands on storage. Use the table below as a starting point when selecting drives for your deployment.

### VDI (Virtual Desktop Infrastructure)

| Attribute | Recommendation |
|-----------|---------------|
| **Primary tier** | Tier 1 (NVMe) or Tier 2 (SSD) |
| **I/O pattern** | High random read, moderate write during boot storms |
| **Endurance** | 1+ DWPD for persistent desktops; 0.3+ DWPD for non-persistent with dedup |
| **Capacity** | Size for peak concurrent desktops, accounting for deduplication savings on clone-heavy deployments |

### Database Workloads

| Attribute | Recommendation |
|-----------|---------------|
| **Primary tier** | Tier 1 (NVMe) |
| **I/O pattern** | High random write, low-latency reads |
| **Endurance** | 3+ DWPD for transaction logs; 1+ DWPD for data files |
| **Capacity** | Account for write amplification and snapshot overhead |

### General-Purpose VM Hosting

| Attribute | Recommendation |
|-----------|---------------|
| **Primary tier** | Tier 2 (SSD) |
| **I/O pattern** | Mixed read/write |
| **Endurance** | 1 DWPD is typically sufficient |
| **Capacity** | Thin provisioning reduces actual consumption -- monitor real usage, not allocated sizes |

### Archive and Backup Storage

| Attribute | Recommendation |
|-----------|---------------|
| **Primary tier** | Tier 4 or Tier 5 (HDD) |
| **I/O pattern** | Sequential write, infrequent read |
| **Endurance** | Standard enterprise HDD rated for always-on operation |
| **Capacity** | Plan for snapshot growth and retention policies |

## Storage Controllers: HBA and JBOD Mode

VergeOS manages all storage redundancy and data placement through the vSAN. Because of this, the vSAN requires direct access to individual physical drives -- hardware RAID must not be used for drives assigned to the vSAN.

### Controller Requirements

- **JBOD or HBA pass-through mode is required.** Each physical drive must be presented individually to the operating system so the vSAN can manage it directly.
- **Hardware RAID must be disabled** for any drives intended for vSAN use. If your server has a hardware RAID controller, configure it to present drives in JBOD mode (also called "pass-through," "IT mode," or "HBA mode" depending on the manufacturer).
- **Dedicated HBA cards** (such as LSI/Broadcom SAS HBAs) that operate natively in pass-through mode are the simplest option and avoid RAID controller complications entirely.

### Configuring RAID Controllers for JBOD Mode

Most enterprise RAID controllers support a JBOD or pass-through mode, but the configuration steps vary by manufacturer:

- **Dell PERC controllers**: Use the BIOS configuration utility to switch the controller to HBA mode. Some PERC models require a firmware change to enable this.
- **HPE Smart Array controllers**: Set the controller to HBA mode in the BIOS/UEFI or use the SSA (Smart Storage Administrator) utility.
- **Broadcom/LSI MegaRAID controllers**: Use the WebBIOS or StorCLI utility to configure each drive as a JBOD or to switch the controller to JBOD mode.

!!! warning "Do Not Use Hardware RAID"
    Creating RAID volumes (RAID 0, 1, 5, etc.) on drives used by the vSAN will cause unpredictable behavior. The vSAN assumes direct control of each physical drive for block placement, redundancy, and repair. Hardware RAID interferes with all of these operations.

!!! tip "Verify Drive Visibility"
    After configuring your controller, verify that each physical drive appears as an individual block device in the operating system. During VergeOS installation, all available drives should be visible for vSAN tier assignment.

## Mixing Drive Types Within a Cluster

One of the strengths of the vSAN tiered model is the ability to combine different drive types in the same cluster. This lets you place latency-sensitive data on fast SSDs while keeping bulk data on cost-effective HDDs.

### Guidelines for Mixed Configurations

- **Match drives across nodes** -- For data redundancy, at least two nodes must have drives in the same tier. The vSAN stores two copies of every block on different nodes, so each tier needs capacity on multiple nodes.
- **Not every tier needs to be populated** -- A cluster with only NVMe and HDD storage might use just Tiers 1 and 4. The system uses only the tiers that have drives assigned.
- **Balance capacity within a tier** -- Drives in the same tier across nodes should be similar in size so that data distributes evenly. Significant capacity mismatches can lead to uneven utilization.
- **Plan RAM for storage nodes** -- Each storage node requires a minimum of 1 GB of RAM per 1 TB of raw storage (1.5 GB per TB is recommended for better performance).

!!! tip "CPU Cores for Storage"
    For optimal performance, plan for 1 CPU core per physical disk on each storage node.

## Drive Endurance: DWPD and TBW

Drive endurance measures how much data you can write to a drive over its warranty life before it wears out. Two metrics are commonly used:

- **DWPD (Drive Writes Per Day)** -- How many times you can overwrite the full drive capacity per day over the warranty period.
- **TBW (Terabytes Written)** -- The total amount of data you can write over the drive's lifetime.

### Why Endurance Matters

Write-heavy workloads (databases, transaction logs, heavy VM activity) consume SSD endurance faster than read-heavy workloads. Choosing a drive with insufficient endurance leads to premature wear-out and unplanned replacements.

| Workload Type | Recommended DWPD |
|---------------|-------------------|
| Metadata (Tier 0) | 3+ DWPD |
| Database / transaction logs | 3+ DWPD |
| Mixed VM workloads | 1 DWPD |
| VDI (persistent) | 1+ DWPD |
| Read-heavy / archive | 0.3 DWPD or standard HDD |

!!! note "Converting Between DWPD and TBW"
    To compare drives with different specs, convert to TBW:

    **TBW = DWPD x Drive Capacity (TB) x Warranty (years) x 365**

    For example, a 1.92 TB drive rated at 1 DWPD with a 5-year warranty provides:
    1 x 1.92 x 5 x 365 = **3,504 TBW**

## SMART Monitoring and Proactive Replacement

VergeOS continuously monitors drive health using SMART (Self-Monitoring, Analysis, and Reporting Technology) data. This gives you early warning of drives that are approaching failure, so you can plan replacements before data is at risk.

### Key Health Indicators

| Indicator | What It Tells You |
|-----------|-------------------|
| **Wear level** | How much SSD endurance has been consumed (percentage) |
| **Reallocated sectors** | Sectors the drive has remapped due to errors -- an early failure sign |
| **Current pending sectors** | Unstable sectors awaiting reallocation |
| **Temperature** | Excessive heat can accelerate drive degradation |
| **Operating hours** | Total powered-on time |
| **Offline uncorrectable** | Errors that the drive could not correct internally |

### Configuring Warning Thresholds

VergeOS lets you set cluster-level warning thresholds for each SMART indicator. When a drive exceeds a threshold, the system raises an alert so you can schedule a replacement.

!!! tip "Replacement Planning"
    We recommend keeping at least one hot spare drive per tier in your cluster. A hot spare sits idle during normal operations but immediately absorbs data from a failed drive, accelerating the repair process and minimizing the time your cluster operates without full redundancy.

### Best Practices for Drive Health

- **Review SMART data regularly** -- Check drive health dashboards as part of your routine maintenance.
- **Set conservative thresholds** -- Catch problems early rather than waiting for outright failure.
- **Track wear level trends** -- A drive approaching its endurance limit should be replaced proactively, even if it has not yet generated errors.
- **Keep firmware current** -- Drive firmware updates can improve reliability and compatibility.

## Capacity vs. Performance Tradeoffs

When budgets are constrained, you may need to make tradeoffs between raw capacity and I/O performance. Here are some strategies to get the most from your hardware investment:

### Tiered Storage Strategy

Instead of buying all-flash storage, use the tier system to your advantage:

- **Place hot data on SSDs (Tier 1-2)** -- Active VM disks, databases, and frequently accessed files.
- **Place cold data on HDDs (Tier 4-5)** -- Snapshots, archives, backups, and infrequently accessed files.
- **Use live tier migration** -- As data ages or access patterns change, move it to a more appropriate tier without downtime.

### Deduplication Savings

The vSAN performs inline deduplication across all tiers. Workloads with high data similarity (VDI clones, similar OS images, development environments) can see significant space savings. Factor expected deduplication ratios into your capacity planning -- but do not rely on optimistic estimates for critical capacity.

### Thin Provisioning

Volumes are thin-provisioned by default, meaning they consume only the space actually written. This allows you to allocate generously without immediately consuming physical capacity. However:

- **Monitor actual consumption**, not just allocated sizes
- **Set utilization alerts** at 80% and critical alerts at 90% per tier
- **Plan for snapshot growth**, which can consume tier capacity quickly

## Fibre Channel and External Storage

If you have an existing Fibre Channel (FC) SAN investment, VergeOS can incorporate FC LUNs as vSAN storage devices. Each LUN is treated exactly like a local physical disk and assigned to a tier.

!!! note "Physical Disks Are Preferred"
    Verge.io recommends direct-attached physical disks for the best performance and simplest configuration. Fibre Channel integration is best suited for environments with existing SAN infrastructure or specific compliance requirements.

Key considerations for FC storage:

- **Each node must receive its own unique LUNs** -- Do not present the same LUNs to multiple nodes.
- **Disable RAID and automatic tiering** on the SAN for LUNs used by VergeOS, since the vSAN handles redundancy and tiering natively.
- **Tier 0 must use local physical disks** -- Even with FC storage for data tiers, the metadata tier requires direct-attached NVMe.
- **Core network bandwidth matters** -- The vSAN replicates data across nodes over the core network. If your FC SAN is faster than your core network, the core network becomes the bottleneck.

For detailed FC configuration steps, see [Using Fibre Channel Storage with vSAN](/product-guide/storage/fibre-channel).

## Quick Reference: Hardware Checklist

Use this checklist when specifying storage hardware for a new VergeOS deployment:

- [ ] **Storage controllers**: HBA pass-through or JBOD mode (no hardware RAID)
- [ ] **Controller nodes**: Enterprise NVMe with 3+ DWPD for Tier 0 (both controllers)
- [ ] **Tier 0 capacity**: At least 5-10 GB per 1 TB of usable cluster capacity
- [ ] **Primary workload tier**: Enterprise NVMe or SSD sized for active data set
- [ ] **Drive endurance**: Matched to workload write intensity (see DWPD table above)
- [ ] **Capacity tier** (if needed): Enterprise HDDs, 8 TB or smaller recommended
- [ ] **Hot spares**: At least one spare per tier
- [ ] **RAM per storage node**: 1-1.5 GB per TB of raw storage
- [ ] **CPU per storage node**: 1 core per physical disk
- [ ] **At least 2 nodes** with matching disk configuration per tier for redundancy
- [ ] **No consumer-grade drives** in production environments

!!! warning "Consumer-Grade Disks"
    VergeOS does not officially support consumer-grade disks in production environments. Consumer drives may have firmware limitations, non-standard command implementations, or compatibility issues that affect vSAN operation. They may be acceptable for test, development, or proof-of-concept environments where data loss is tolerable.

## Additional Resources

- [Storage Tiers](/product-guide/storage/storage-tiers) -- Detailed tier specifications and migration procedures
- [Node Sizing Guide](/implementation-guide/sizing/) -- Minimum and recommended hardware requirements
- [vSAN Architecture](/product-guide/storage/vsan-architecture) -- How the vSAN distributes and protects data
- [Using Fibre Channel Storage with vSAN](/product-guide/storage/fibre-channel) -- FC LUN integration guide
- [Capacity Planning](/product-guide/storage/capacity-planning) -- Monitoring and managing tier utilization

---

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).

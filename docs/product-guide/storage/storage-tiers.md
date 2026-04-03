---
title: "Storage Tiers in VergeOS vSAN"
description: "Understand how VergeOS vSAN storage tiers work, including tier specifications, live migration, health monitoring, capacity planning, and tenant tier restrictions."
semantic_keywords:
  - "vSAN storage tiers, tier selection, drive tier assignment"
  - "live tier migration, move data between tiers, change preferred tier"
  - "tier health states, tier capacity planning, tier exhaustion"
  - "tenant tier restrictions, storage cost optimization, tiered storage"
use_cases:
  - storage_management
  - tier_configuration
  - capacity_planning
  - tenant_management
  - performance_tuning
tags:
  - vsan
  - storage
  - tiers
  - capacity-planning
  - tenant-management
  - migration
categories:
  - Storage
  - vSAN
---

# Storage Tiers in VergeOS vSAN

## Overview

VergeOS vSAN organizes physical drives into up to 6 tiers (0-5), allowing administrators to match data placement to workload performance requirements. Each tier is optimized for different workloads and data types, enabling cost-effective storage management based on performance needs and access patterns.

For vSAN sizing recommendations, see the [Node Sizing Guide](/implementation-guide/sizing). For detailed guidance on estimating capacity needs, snapshot overhead, and deduplication expectations, see [Capacity Planning](/product-guide/storage/capacity-planning).

## Tier Specifications

!!! info "Hardware Descriptions Are Defaults, Not Requirements"
    The hardware descriptions below reflect typical configurations. The vSAN assigns drives to tiers based on auto-detection, and administrators can override tier assignments manually. See [How Tier Selection Works](#how-tier-selection-works) below.

### Tier 0: Metadata Tier

- **Hardware**: High-endurance NVMe-based SSD
- **Purpose**: Used exclusively for vSAN metadata
- **Characteristics**: Optimized for ultra-low latency operations
- **Use Case**: System metadata management

!!! danger "Tier 0 Is System-Managed"
    Tier 0 is **not** a user-selectable storage tier. It is reserved exclusively for vSAN metadata and is managed automatically by the system. Administrators cannot assign volumes, VM drives, or files to Tier 0. Unlike Tiers 1-5, Tier 0 does not appear as a preferred tier option. **Tier 0 exhaustion is catastrophic** -- if the metadata tier runs out of space, all vSAN write operations halt across every tier. Monitor Tier 0 utilization from **System > vSAN > Tiers** and maintain at least 10% free space at all times.

### Tier 1: High-Performance Tier

- **Hardware**: High-endurance NVMe-based SSDs
- **Purpose**: Write-intensive workloads
- **Characteristics**: Maximum I/O performance, high durability
- **Use Cases**:
    - High-performance databases
    - Heavily used transaction logs
    - Write-intensive applications

### Tier 2: Mixed Workload Tier

- **Hardware**: Mid-range SSDs
- **Purpose**: Balanced read/write workloads
- **Characteristics**: Good balance of performance and cost
- **Use Cases**:
    - General-purpose VM storage
    - Mixed application workloads
    - Development environments

### Tier 3: Read-Optimized Tier

- **Hardware**: Read-optimized SSDs
- **Purpose**: Read-intensive workloads
- **Characteristics**: Optimized for read operations
- **Use Cases**:
    - Content delivery
    - Application repositories
    - Reference data

### Tier 4: Capacity Tier

- **Hardware**: High-capacity HDDs
- **Purpose**: Less frequently accessed data
- **Characteristics**: High capacity, cost-effective
- **Use Cases**:
    - File servers
    - Backup targets
    - Infrequently accessed data

### Tier 5: Archive Tier

- **Hardware**: Archival-grade HDDs
- **Purpose**: Cold storage and long-term retention
- **Characteristics**: Maximum capacity, lowest cost per TB
- **Use Cases**:
    - Long-term data retention
    - Compliance archives
    - Backup archives

## How Tier Selection Works

When a physical drive is added to the vSAN, the system automatically assigns it a **detected tier** based on the drive's characteristics (NVMe, SSD, rotational HDD, etc.). This auto-detection places drives on the tier that best matches their performance profile.

Administrators can **override the detected tier** by manually assigning a drive to a different tier. This is useful when you want to repurpose hardware -- for example, placing a high-endurance SATA SSD into Tier 1 alongside NVMe drives, or dedicating a fast HDD to a capacity tier.

!!! tip "Preferred Tier vs. Actual Tier"
    Every volume, VM drive, and file has a **preferred tier** setting (Tiers 1-5) that tells the vSAN where data should be stored. The vSAN honors this preference when capacity is available on the requested tier. If you change the preferred tier on an existing resource, the system automatically migrates the data in the background.

### Tier Assignment Priority

1. **Explicit assignment** -- If an administrator sets a preferred tier on a volume or file, that tier is used.
2. **System defaults** -- When no explicit tier is set, the system selects an appropriate default tier based on system configuration and tenant policy.
3. **Capacity awareness** -- The system validates that the destination tier has sufficient free space before placing new data.

Not all tiers need to be populated. The system uses only the tiers that have physical drives assigned, so a cluster with only NVMe and HDD storage might use just Tiers 1 and 4.

## Live Tier Migration

Data can be moved between tiers at any time without downtime. When you change the preferred tier on a volume or file, the vSAN submits a background migration job that relocates the data while keeping it fully accessible for reads and writes.

To change a volume's preferred tier, navigate to the volume's settings page and update the **Preferred Tier** field. For VM drives, edit the drive configuration from the VM's dashboard. For detailed guidance, see [Preferred Tiers](/product-guide/storage/preferred-tiers).

### What Happens During Migration

1. The system validates that the requesting tenant has permission to use the target tier.
2. Available capacity on the destination tier is confirmed.
3. An asynchronous migration job moves data blocks to the new tier in the background.
4. The resource (volume, file, or VM drive) remains fully accessible throughout the process.
5. Once migration completes, the system updates tracking information and notifies dependent systems.
6. Post-migration cleanup runs with reduced I/O priority to minimize impact on active workloads.

### Migration Best Practices

- **Check capacity first** -- Before changing a tier, confirm that the destination tier has enough free space. For files, the system checks automatically. For volumes, verify tier utilization manually from **System > vSAN > Tiers**.
- **Avoid simultaneous large migrations** -- Running multiple large tier migrations at the same time can saturate I/O bandwidth and degrade performance for active workloads.
- **Schedule migrations during low activity** -- Migration consumes I/O bandwidth, so plan large data moves for maintenance windows or off-peak hours when possible.
- **Rollback is straightforward** -- If a migration needs to be reversed, simply change the preferred tier back to the original value. Another migration job will move the data back.

!!! warning "Monitor Migration Progress"
    You can track tier migration status from **System > vSAN > Tiers** and through system events. If a migration appears stuck, check that the destination tier has adequate free space and that the tier is in an **online** health state.

## Tier Health States

Each tier reports a health state that reflects its current operational condition. Monitoring these states helps you identify and respond to storage issues quickly.

| State | Description |
|---|---|
| **Online** | The tier is healthy and fully redundant. All data copies are intact and accessible. |
| **No Redundancy** | The tier is accessible but has lost redundancy -- typically due to a drive or node failure. Data is still available, but a second failure could result in data loss. |
| **Repairing** | The vSAN is actively re-replicating data to restore full redundancy. This happens automatically when spare capacity is available. |
| **Initializing** | The tier is being set up for the first time or after a configuration change. |
| **Verifying** | An integrity verification is in progress, confirming that all data blocks are consistent. |
| **Out of Space** | The tier has exceeded its maximum usage threshold (default 90%) and writes are being throttled. Immediate action is needed. |
| **Offline** | The tier is completely unavailable. No reads or writes can be processed. |

!!! danger "Responding to Critical States"
    - **No Redundancy** -- The vSAN begins automatic repair if spare capacity exists. Avoid making additional changes until repair completes. If a drive has failed, replace it as soon as possible.
    - **Out of Space** -- Free up space by migrating data to another tier, deleting unnecessary snapshots, or adding more storage devices to the tier.
    - **Offline** -- Investigate immediately. Check for node failures, drive failures, or network connectivity issues between nodes.

## Capacity Planning Per Tier

Effective tier management requires ongoing monitoring and thoughtful planning to prevent performance degradation or capacity exhaustion.

### Monitoring Tier Utilization

- Navigate to **System > vSAN > Tiers** to view per-tier capacity, utilization percentage, and available free space.
- Track the gap between a volume's logical maximum size and its actual vSAN consumption. Thin provisioning means volumes often use far less storage than their configured maximum.
- Review deduplication ratios per tier -- tiers with highly duplicated data (such as VM clone tiers) will show better space efficiency.

### Thin Provisioning Considerations

Volumes in VergeOS are thin-provisioned by default, meaning they consume only the space actually written -- not the full configured size. While this improves storage efficiency, it requires careful planning:

- **Over-commitment is possible** -- The sum of all volume maximum sizes can exceed the physical tier capacity, since not all volumes will be fully utilized.
- **Monitor actual consumption** -- Track real usage rather than allocated sizes. A tier that looks healthy based on allocations may be closer to capacity than expected.
- **Set utilization alerts** -- Configure warnings at 80% tier utilization and critical alerts at 90% to give yourself time to respond before a tier fills up.

### Avoiding Tier Exhaustion

When a tier runs out of capacity:

- New allocations requesting that tier are rejected.
- Existing data remains accessible, but no new data can be written to the tier.
- Write operations targeting the full tier may fail or degrade.

To prevent this:

- **Set utilization thresholds** -- Alert at 80%, take action at 90%.
- **Implement lifecycle policies** -- Migrate older or less-accessed data to lower-cost tiers as part of regular maintenance.
- **Manage snapshot growth** -- Use snapshot expiry policies to limit storage consumption on premium tiers.
- **Add capacity proactively** -- When a tier consistently runs above 70%, plan to add drives or migrate workloads.

### Right-Sizing Tier Assignments

- Place frequently accessed, latency-sensitive data on lower-numbered tiers (Tier 1-2).
- Move infrequently accessed data, archives, and old snapshots to higher-numbered tiers (Tier 4-5).
- Review tier assignments periodically as workload patterns change.
- For most VM disk images, the default tier assignment is appropriate. Override only when performance requirements are clearly identified.

## Tenant Tier Restrictions

In multi-tenant environments, system administrators can control which storage tiers each tenant is allowed to use. This prevents tenants from consuming premium storage resources without authorization and enables cost-based storage allocation.

### How Tenant Tier Enforcement Works

- When a tenant creates a file or requests a tier change, the system validates that the tenant is authorized to use the requested tier.
- If the tenant does not have permission for the requested tier, the operation is denied.
- System administrators configure tier access policies at the tenant level, and the system enforces them automatically during file creation and tier migration.

!!! note "Volume Tier Policies"
    Automatic tenant-level tier enforcement applies to **files** (including VM disk images managed through the file subsystem). For NAS volumes, tier access policies should be enforced through operational procedures and monitoring rather than automatic system enforcement.

### Configuring Tenant Tier Access

Administrators can restrict tenant tier access from the tenant configuration in the VergeOS UI. This allows you to:

- Limit tenants to specific tiers (e.g., only Tier 2 and Tier 4)
- Reserve premium tiers (Tier 1) for specific tenants or workloads
- Assign default tiers per tenant to simplify resource management

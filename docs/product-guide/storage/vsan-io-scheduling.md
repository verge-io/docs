# vSAN I/O Scheduling and Workload Management

This page explains how the vSAN distributes storage I/O, what automatic protections are in place when tiers approach capacity, and what options are available for managing workload isolation.

## Overview

When multiple VMs, tenants, and volumes share the same vSAN storage, I/O is distributed across physical devices through the vSAN's hash-based block placement algorithm. Each 64 KB block is assigned to a specific drive based on a hash, which naturally spreads I/O across all drives in a tier without creating hot spots.

At the device level, the Linux kernel's block I/O schedulers handle request ordering and fairness across all operations reaching each drive.

!!! info "Key Takeaway"
    The vSAN distributes I/O across drives through hash-based block placement and protects against capacity issues with automatic write throttling. It does **not** provide per-VM or per-tenant I/O limits (IOPS caps, bandwidth caps, or storage QoS policies).

## How I/O Distribution Works

The vSAN distributes data blocks across all drives in a tier using a hash-based mapping algorithm. This has several important effects on I/O behavior:

- **Natural load spreading** — Because blocks are distributed by hash across all drives and nodes in a tier, read and write operations are spread across physical devices automatically
- **No hot spots** — No single drive or node bears a disproportionate share of I/O, regardless of which VM or tenant generates it
- **Scales horizontally and vertically** — Adding more drives to existing nodes or adding new nodes with drives both increase the aggregate I/O capacity available to all workloads
- **Data locality** — When a block is available on the local node, reads are served locally, reducing network overhead and latency
- **N+1 redundancy** — Every block is stored on two different nodes. If a node goes offline, all data remains accessible from the surviving copy with no interruption to I/O
- **No manual tuning required** — Block distribution is automatic and requires no configuration

## Automatic Capacity-Based Throttling

The vSAN includes built-in protections that automatically throttle write operations when storage tiers approach capacity limits. This prevents a full tier from causing data loss or cluster instability.

### Throttling Thresholds

| Capacity Used | System Behavior |
|---|---|
| Below 91% | Normal operation — no throttling applied |
| 91% | Write throttling begins — the vSAN adds **5 ms of write latency** to the affected tier |
| 96% | Aggressive throttling — the vSAN adds **50 ms of write latency** to prevent the tier from filling completely |

!!! warning "Capacity Planning"
    Throttling is a safety mechanism, not a substitute for capacity planning. Even the initial 5 ms penalty at 91% can noticeably affect latency-sensitive workloads. Monitor tier utilization and add capacity before reaching these thresholds.

### How Throttling Manifests

When capacity-based throttling activates:

- All workloads on the affected tier experience increased write latency — no single workload is singled out.
- The tier status may transition to `outofspace` if usage continues to climb.
- Throttling applies to the entire tier across all nodes.

### Monitoring Throttle Status

You can check for active throttling in the following locations:

- **Dashboard** — Navigate to **System > vSAN > Tier Status** to view per-tier utilization, health, and throttle state
- **Per-drive metrics** — Individual drive throttle values are visible under **System > Nodes > [Node] > Drives**

## Storage Tier Placement

While the vSAN does not offer per-workload I/O limits, **storage tier placement** is the primary mechanism for separating workload performance classes. VergeOS supports up to five user-configurable tiers (Tier 1 through Tier 5), and each tier can be backed by any media type. The tier number does not dictate the type of drive — it is up to the administrator to assign drives to tiers based on the needs of the environment.

For example, a common configuration might look like:

| Tier | Media | Use Case |
|---|---|---|
| Tier 1 | NVMe SSD | High-performance databases, latency-sensitive applications |
| Tier 2 | SATA/SAS SSD | General-purpose VM storage, mixed workloads |
| Tier 3 | HDD | File servers, backup targets, cold storage |

However, an environment could just as easily have three tiers of NVMe at different capacities or performance profiles, or two tiers of SSD and one of HDD. The tier structure is entirely flexible.

Each VM disk, volume, and media file supports a **preferred tier** setting that controls which tier its data is stored on. For details on configuring tier assignments, see [Preferred Tier](/product-guide/storage/preferred-tiers).

!!! tip "Performance Isolation Strategy"
    For strategies on isolating latency-sensitive workloads, see [Strategies for Workload Isolation](#strategies-for-workload-isolation) below.

## What the vSAN Does Not Provide

The following storage QoS capabilities are **not currently available** in VergeOS vSAN:

| Capability | Status |
|---|---|
| Per-VM IOPS limits | Not available |
| Per-VM bandwidth caps | Not available |
| Per-tenant storage I/O limits | Not available |
| Storage QoS policies or profiles | Not available |
| I/O priority classes per workload | Not available |

!!! note "Network vs. Storage I/O Limiting"
    VergeOS **does** support network bandwidth limiting through [network rate limiting](/product-guide/networks/network-rules), which can cap the network throughput for individual VMs or tenants. However, this applies only to network traffic — it does not affect storage I/O operations within the vSAN.

## Strategies for Workload Isolation

For environments that require tighter control over storage I/O distribution, there are several approaches depending on scale:

### Tier-Based Separation

For latency-sensitive workloads, assign them to a dedicated tier or distribute them across multiple tiers to reduce contention. Each tier has its own pool of physical devices, so workloads on different tiers do not compete for the same I/O resources. This is the simplest and most effective approach within a single cluster.

### Dedicated Storage Clusters

In larger environments such as enterprises or MSPs with mixed workloads, consider dedicating entire storage clusters to high-performance workloads. This provides full physical isolation — the high-performance cluster's drives, nodes, and network are not shared with general-purpose workloads at all.

### Guest-Level I/O Controls

Operating systems within VMs can enforce their own I/O limits:

- **Linux** — Use `cgroups` (specifically the `blkio` or `io` controller) to cap IOPS or bandwidth for processes within the guest
- **Windows** — Use File Server Resource Manager (FSRM) for file server workloads, or third-party tools for general disk I/O throttling within the guest

!!! note
    Guest-level controls limit I/O from the perspective of the guest operating system. They reduce how much I/O the guest generates, but they do not interact with the vSAN — the vSAN sees the resulting (reduced) I/O just like any other workload.

### Workload Scheduling

For batch or background workloads (backups, data processing, replication), schedule them during off-peak hours when fewer interactive workloads are competing for I/O. This reduces contention during business hours.

## Monitoring I/O Distribution

VergeOS provides several tools for observing how I/O is distributed across the cluster:

- **Dashboard** — The vSAN dashboard displays real-time I/O rates, tier utilization, and per-node activity
- **Tier Status** — Navigate to **System > vSAN > Tier Status** to view per-tier health, capacity, and throttling state
- **Drive Metrics** — Individual drive statistics (read/write errors, latency, throttling) are available under **System > Nodes > [Node] > Drives**

These tools help identify whether a particular tier is experiencing contention, allowing administrators to make informed decisions about tier placement or capacity expansion.

## Summary

- **Hash-based block distribution** spreads I/O naturally across all drives in a tier without manual configuration
- **Capacity-based throttling** adds 5 ms of write latency at 91% tier utilization and 50 ms at 96% to protect against full tiers
- **Tier placement** is the primary tool for separating workload performance classes
- **Per-VM and per-tenant I/O limits** are not available — use tier separation, guest-level controls, or resource right-sizing as alternatives

### Related Documentation

- [Storage Overview](/product-guide/storage/overview)
- [vSAN Architecture](/product-guide/storage/vsan-architecture)
- [Storage Tiers](/product-guide/storage/storage-tiers)
- [Preferred Tier](/product-guide/storage/preferred-tiers)
- [Network Rules](/product-guide/networks/network-rules)

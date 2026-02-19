---
status: new
---

# vSAN I/O Scheduling and Workload Management

VergeOS vSAN uses a fair queuing mechanism to distribute storage I/O across all competing workloads. This page explains how I/O scheduling works, what automatic protections are in place, and what workload-level controls are and are not available.

## Overview

When multiple VMs, tenants, and volumes share the same vSAN storage, the system must decide how to allocate I/O bandwidth among them. The vSAN handles this through **fair queuing** — an automatic scheduling approach that distributes I/O operations proportionally across all active workloads without requiring manual configuration.

This design prioritizes simplicity and consistent behavior: every workload gets a fair share of available I/O, and no single VM or tenant can monopolize storage resources under normal conditions.

!!! info "Key Takeaway"
    The vSAN provides automatic, cluster-wide I/O fairness and capacity-based throttling. It does **not** provide per-VM or per-tenant I/O limits (IOPS caps, bandwidth caps, or storage QoS policies).

## How Fair Queuing Works

The vSAN's I/O scheduler operates at the block layer, distributing read and write operations across all available storage devices in a tier. Key characteristics include:

- **Proportional distribution** — I/O requests from all workloads (VMs, volumes, tenants) are serviced in a round-robin fashion, preventing any single workload from starving others
- **No manual tuning required** — Fair queuing is always active and requires no configuration
- **Cluster-wide scope** — I/O scheduling operates across all nodes participating in the vSAN, not just within a single node
- **Automatic rebalancing** — As workloads start and stop, the scheduler adjusts automatically

Because data blocks are distributed across all drives in a tier using a hash-based algorithm, I/O naturally spreads across physical devices. This avoids hot spots and ensures that adding more drives to a tier increases aggregate I/O capacity for all workloads.

## Automatic Capacity-Based Throttling

The vSAN includes built-in protections that automatically throttle write operations when storage tiers approach capacity limits. This prevents a full tier from causing data loss or cluster instability.

### Throttling Thresholds

| Capacity Used | System Behavior |
|---|---|
| Below 91% | Normal operation — no throttling applied |
| 91% | Write throttling begins — the vSAN progressively slows incoming writes to the affected tier |
| 96% | Aggressive throttling — write operations are significantly restricted to prevent the tier from filling completely |

!!! warning "Capacity Planning"
    Throttling is a safety mechanism, not a substitute for capacity planning. Sustained operation above 91% will degrade write performance for **all** workloads on the affected tier. Monitor tier utilization and add capacity before reaching these thresholds.

### How Throttling Manifests

When capacity-based throttling activates:

- The `write_throttle` value in the tier's settings becomes non-zero, representing a bytes-per-second limit
- Individual drives show a `vsan_throttle` value in their status
- The tier status may transition to `outofspace` if usage continues to climb
- All workloads on the affected tier experience slower writes proportionally — no single workload is singled out

### Monitoring Tier Capacity

We can monitor tier capacity and throttling status through the VergeOS dashboard or from the command line:

- Navigate to **System > vSAN > Tier Status** in the dashboard to view per-tier utilization and health
- Check for active throttling by reviewing the tier's write throttle status and per-drive throttle values

## Storage Tier Placement

While the vSAN does not offer per-workload I/O limits, **storage tier placement** is the primary mechanism for differentiating performance between workloads. By assigning workloads to different tiers backed by different media classes, we can achieve meaningful performance separation.

| Tier | Typical Media | Best For |
|---|---|---|
| Tier 1 | NVMe SSD | High-performance databases, latency-sensitive applications |
| Tier 2 | SATA/SAS SSD | General-purpose VM storage, mixed workloads |
| Tier 3 | SSD or fast HDD | Read-heavy workloads, application repositories |
| Tier 4 | HDD | File servers, backup targets |
| Tier 5 | Archive HDD | Cold storage, long-term retention |

Each VM disk, volume, and media file supports a **preferred tier** setting that controls which tier its data is stored on. For details on configuring tier assignments, see [Preferred Tier](/product-guide/storage/preferred-tiers).

!!! tip "Performance Isolation Strategy"
    To isolate a performance-sensitive workload, place it on a dedicated tier that other workloads do not use. For example, assign a critical database VM's disks to Tier 1 (NVMe) while keeping general workloads on Tier 2 (SATA SSD). The fair queuing scheduler operates independently per tier, so workloads on separate tiers do not compete for the same I/O resources.

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

## Workarounds for Workload Isolation

For environments that require tighter control over storage I/O distribution, consider these strategies:

### Tier-Based Separation

Assign performance-sensitive workloads to faster, less-contended tiers while placing bulk or background workloads on slower tiers. This is the most effective approach because each tier has its own pool of physical devices and its own I/O scheduling scope.

### Guest-Level I/O Controls

Operating systems within VMs can enforce their own I/O limits:

- **Linux** — Use `cgroups` (specifically the `blkio` controller) to cap IOPS or bandwidth for processes within the guest
- **Windows** — Use Windows System Resource Manager or Storage QoS policies within the guest OS to throttle disk I/O for specific processes or services

!!! note
    Guest-level controls limit I/O from the perspective of the guest operating system. They do not interact with the vSAN's fair queuing mechanism — they simply reduce how much I/O the guest generates in the first place.

### Right-Sizing Tenant Resources

For multi-tenant environments, right-sizing the compute and memory resources allocated to each tenant indirectly constrains their storage I/O generation. A tenant with fewer CPU cores and less RAM will naturally generate less storage I/O than one with more resources.

### Workload Scheduling

For batch or background workloads (backups, data processing, replication), schedule them during off-peak hours when fewer interactive workloads are competing for I/O. This maximizes the benefit of fair queuing by reducing contention during business hours.

## Monitoring I/O Distribution

VergeOS provides several tools for observing how I/O is distributed across the cluster:

- **Dashboard** — The vSAN dashboard displays real-time I/O rates, tier utilization, and per-node activity
- **Tier Status** — Navigate to **System > vSAN > Tier Status** to view per-tier health, capacity, and throttling state
- **Drive Metrics** — Individual drive statistics (read/write errors, latency, throttling) are available under **System > Nodes > [Node] > Drives**

These tools help identify whether a particular workload or tier is experiencing contention, allowing administrators to make informed decisions about tier placement or capacity expansion.

## Summary

The vSAN's approach to I/O scheduling prioritizes fairness and simplicity:

- **Fair queuing** automatically distributes I/O across all workloads without configuration
- **Capacity-based throttling** protects tiers from filling up by progressively slowing writes at 91% and 96% utilization
- **Tier placement** is the primary tool for separating workload performance classes
- **Per-VM and per-tenant I/O limits** are not available — use tier separation, guest-level controls, or resource right-sizing as alternatives

### Related Documentation

- [Storage Overview](/product-guide/storage/overview)
- [vSAN Architecture](/product-guide/storage/vsan-architecture)
- [Storage Tiers](/product-guide/storage/storage-tiers)
- [Preferred Tier](/product-guide/storage/preferred-tiers)
- [Network Rules](/product-guide/networks/network-rules)

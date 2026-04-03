---
title: Understanding vSAN Redundancy Levels
description: Learn about VergeOS vSAN N+1 and N+2 redundancy levels, their requirements, use cases, and considerations
tags: [vsan, storage, redundancy, fault tolerance]
categories: [Storage, vSAN]
---

# Understanding vSAN Redundancy Levels

## Overview

!!! info "Key Points"
    - **N+1 / RF2** (default) maintains 2 copies of every data block and can survive one simultaneous node failure. N+1 provides robust protection suitable for most production environments.
    - **N+2 / RF3** maintains 3 copies of every data block and can survive two simultaneous failures.
    - Redundancy is configured per system and applies per vSAN tier.

VergeOS vSAN supports configurable redundancy levels — also known as **Replication Factors (RF)** — that determine how many copies of each data block are maintained across the system. Choosing the right level is a balance between fault tolerance, storage overhead, and infrastructure cost.

## N+1 Redundancy (RF2)

N+1 redundancy maintains **2 copies** of every data block in the vSAN. This allows a cluster to survive **one simultaneous failure** — either a node failure or drive failures within a single node.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 2 controller nodes |
| **Recommended Nodes** | 3 (provides spare capacity for faster repair and avoids running at zero redundancy during single-node maintenance) |
| **Copies of Data** | 2 |
| **Storage Overhead** | ~2x (before deduplication) |

### When to Use N+1

N+1 is the right choice for most VergeOS deployments. Pair it with regular snapshots and off-site replication to protect against scenarios that exceed single-failure tolerance.

!!! tip
    For additional protection, a [Repair Server](/product-guide/backup-dr/repair-server) can be configured to automatically attempt to retrieve missing data blocks from a sync destination if failures exceed the configured redundancy level, potentially avoiding a full snapshot rollback.

## N+2 Redundancy (RF3)

N+2 vSAN redundancy is available for environments that have a specific requirement to maintain **3 copies** of every data block and/or for a system to survive **two simultaneous failures**. N+2 can survive two simultaneous node failures, disk failures across two nodes, or a combination of both.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 3 (all controller nodes) |
| **Recommended Nodes** | 5 (provides an odd-count majority to avoid split-brain scenarios -- see below) |
| **Copies of Data** | 3 |
| **Storage Overhead** | ~3x (before deduplication) |

### Witness Nodes and Split-Brain Prevention

A **split-brain scenario** occurs when a network partition divides the cluster into two groups that cannot communicate with each other. Without a way to determine which group should remain authoritative, both groups may attempt to continue operating independently, which can lead to data inconsistency.

An odd number of nodes prevents split-brain by ensuring that one partition always holds a **majority** of nodes. The majority partition continues operating normally, while the minority partition is fenced off to protect data integrity. In a 5-node N+2 cluster, even if two nodes become isolated, the remaining three nodes form a clear majority and the cluster continues safely.

With an even number of nodes (such as 4), a network split can produce two equal-sized groups with no clear majority. This is why 5 nodes is recommended for N+2 deployments -- the 5th node acts as a tiebreaker.

### When to Use N+2

N+2 is designed for environments with a specific requirement to withstand more than one simultaneous failure. Common scenarios include **ultra-critical workloads** where even the brief exposure during a rebuild is unacceptable, or **remote/edge sites** where failed hardware cannot be replaced quickly. In these cases, the extra infrastructure cost of N+2 may be justified.

### Write Performance Considerations

Because N+2 maintains 3 copies of every data block, each write operation must be replicated to two additional nodes instead of one. This increases write I/O across the cluster fabric and can result in higher write latency compared to N+1, particularly for write-intensive workloads. The impact depends on network fabric speed and workload characteristics. For read-heavy workloads, the performance difference is minimal.

## Per-Tier Redundancy

A failure only affects the tier where the failed drives reside. For example, in an N+2 configuration, if drives on Tier 1 fail on two nodes **and** a Tier 4 drive fails on a different node, the cluster remains fully operational, and no data is lost.

## Configuring vSAN Redundancy Level

Redundancy level is typically configured during [system installation](/implementation-guide/installation-guide).

## Changing a System's Redundancy Levels

It is possible to upgrade an N+1 system to N+2 (provided the minimum node requirement is met). This transition involves a data rebalancing process.

!!! warning
    To perform a redundancy level change, contact **Verge.io Support.**

## Viewing Tier Redundancy Status

To check the current redundancy configuration and status of a vSAN tier:

1. Navigate to **Infrastructure** > **vSAN Tiers** from the top menu.
2. Double-click the desired tier to open its dashboard.
3. Locate the **Status** card:
      - **Redundancy** — Displays the configured redundancy level (e.g., N+1 with 2 copies, N+2 with 3 copies).
      - **Redundant** checkbox — Indicates whether the tier is currently meeting its configured redundancy level. This will be unchecked if any nodes or tier drives are down.

## How Self-Healing Works

When a drive or node becomes unavailable, the vSAN automatically begins restoring full redundancy without administrator intervention. Understanding this process can help you plan capacity and set expectations during failure events.

### Automatic Repair Process

1. **Detection** — The vSAN continuously monitors all drives and nodes. When a failure is detected, the affected tier transitions to a **repairing** state.
2. **Re-replication** — The system identifies every data block that was stored on the failed drive or node and begins copying those blocks from the surviving copies to other available drives within the same tier.
3. **Completion** — Once all affected blocks have been re-replicated, the tier returns to a fully **redundant** state.

!!! info "Repair Duration"
    Repair time depends on the amount of data that needs to be re-replicated and the available I/O bandwidth across the cluster. Larger tiers with more data will naturally take longer to fully repair.

During the repair process, the system remains operational and continues to serve workloads. However, until repair completes, the tier is running at reduced redundancy — meaning an additional failure during this window could result in data loss. This is one of the key reasons some environments choose N+2 redundancy.

### Monitoring Repair Progress

You can monitor the repair status from the VergeOS UI:

1. Navigate to **Infrastructure** > **vSAN Tiers**.
2. Double-click the affected tier.
3. The **Status** card will show the tier in a repairing state with progress information, including the number of blocks repaired and estimated time remaining.

## Spare Drives

Spare drives are standby drives that remain empty during normal operations and are automatically brought into service when a drive fails. Configuring spare drives can significantly reduce the time a tier spends in a degraded state.

### How Spare Drives Work

- During normal operations, a spare drive sits idle and holds no data.
- When a drive fails, the spare **immediately absorbs data**, providing pre-allocated capacity for the repair process.
- Because the spare is already present in the node and ready to accept writes, repair can begin instantly rather than waiting for a physical drive replacement.
- After a spare has absorbed data from a failed drive, we recommend replacing the failed drive and designating the replacement as the new spare.

### When to Configure Spare Drives

!!! tip "Best Practice"
    Spare drives are especially valuable in environments where physical drive replacement may take hours or days — such as remote sites, edge deployments, or locations without on-site hardware support.

Consider configuring spare drives when:

- **Hardware replacement is not immediate** — Remote or unmanned sites benefit the most.
- **Repair time is critical** — Spare drives minimize the window during which the tier operates at reduced redundancy.
- **You are running N+1 redundancy** — Since N+1 can only tolerate one failure, reducing the repair window is particularly important.

## Integrity Checking

The vSAN uses content-addressed storage, meaning each data block is identified by a unique fingerprint (hash) of its contents. This architectural choice enables continuous, automatic integrity verification — commonly known as **bit-rot detection**.

### How It Works

The vSAN periodically "walks" each tier, reading every stored block and verifying that its contents still match the expected fingerprint. If a mismatch is detected — indicating silent data corruption — the system automatically replaces the corrupted block with a valid copy from another node.

This process runs in the background and does not require any administrator action to initiate. It helps catch and correct issues such as:

- **Bit rot** — Gradual data degradation on storage media over time.
- **Silent drive errors** — Corruption that the drive firmware does not report.
- **Cosmic ray bit flips** — Rare but real single-bit errors in stored data.

### What to Monitor

Administrators should periodically review the following indicators:

- **SMART health data** — The VergeOS dashboard surfaces key drive health metrics including reallocated sectors, SSD wear level, operating hours, and temperature. These early warning indicators can help you identify drives that may be approaching failure.
- **Tier redundancy status** — A tier that repeatedly drops out of redundancy may indicate an underlying hardware issue.
- **Repair counts** — An unusually high number of repaired blocks during a walk may signal a drive that is silently failing.

!!! warning "SMART Warnings"
    If a drive begins reporting elevated reallocated sectors, pending sectors, or uncorrectable errors, we recommend proactively replacing it before a full failure occurs. The vSAN will handle the transition gracefully.

## Redundancy During Maintenance

When a node is taken offline for planned maintenance (such as firmware updates, hardware upgrades, or physical relocation), the vSAN treats the offline node similarly to a failure — the affected tier or tiers will show as **not redundant** while the node is down.

### What to Expect

- **N+1 environments** — Taking one node offline means the tier is operating with no failure tolerance until the node returns. Avoid taking additional nodes offline simultaneously.
- **N+2 environments** — Taking one node offline still leaves the tier with tolerance for one additional failure. This is one of the key advantages of N+2 for environments that perform rolling maintenance.

!!! tip "Maintenance Best Practice"
    In an N+1 configuration, always ensure a maintenance node has fully rejoined and the tier has returned to a **redundant** state before taking the next node offline. This avoids any window where a second failure could cause data loss.

When the node comes back online, the vSAN verifies its data and performs any necessary repairs automatically. In most maintenance scenarios — where the node's drives are unchanged — this process completes quickly since the data on the returning drives is still valid.

## Reference Counts and Deduplication

Because the vSAN uses content-addressed storage, identical data blocks written by different VMs, volumes, or snapshots share the same physical storage automatically. The system maintains **reference counts** to track how many logical references point to each unique data block.

### How Reference Counts Work

- Each time a VM, volume, or snapshot references a data block, the reference count for that block is incremented.
- When a snapshot is deleted or a VM's data changes, the reference count is decremented.
- A data block is only physically freed when its reference count reaches zero — meaning no VM, volume, or snapshot references it any longer.

This mechanism is what makes vSAN deduplication and efficient snapshot storage possible. It also means that deleting a snapshot does not always free physical space immediately — the blocks may still be referenced by other snapshots or active VMs.

!!! note "Deduplication Ratio"
    You can view the current deduplication ratio for each tier from the tier dashboard. This metric shows the ratio of logical data to physical data stored, giving you visibility into how much space deduplication is saving.

## Quick Comparison

| Feature | N+1 (RF2) | N+2 (RF3) |
|---|---|---|
| Copies of data | 2 | 3 |
| Simultaneous failures tolerated | 1 | 2 |
| Minimum controller nodes | 2 | 3 |
| Recommended nodes | 3 | 5 |
| Storage overhead (before dedup) | ~2x | ~3x |
| Default  | Yes | No |

### N+1 (RF2) -- 3-Node Cluster

``` mermaid
graph LR
    subgraph Node 1
        A1[Block A - Primary]
        C1[Block C - Copy]
    end
    subgraph Node 2
        A2[Block A - Copy]
        B2[Block B - Primary]
    end
    subgraph Node 3
        B3[Block B - Copy]
        C3[Block C - Primary]
    end
```

Each block is stored on two different nodes. The cluster survives any single node failure without data loss.

### N+2 (RF3) -- 5-Node Cluster

``` mermaid
graph LR
    subgraph Node 1
        A1r[Block A - Primary]
    end
    subgraph Node 2
        A2r[Block A - Copy 1]
    end
    subgraph Node 3
        A3r[Block A - Copy 2]
    end
    subgraph Node 4
        B4r[Block B - Primary]
    end
    subgraph Node 5
        B5r[Block B - Copy 1]
    end
```

Each block is stored on three different nodes. The cluster survives any two simultaneous node failures without data loss.

---

## Related Topics

- [**vSAN Health Monitoring**](/product-guide/storage/vsan-health-monitoring) -- set up proactive monitoring for redundancy status and repair progress.
- [**vSAN Diagnostics**](/product-guide/storage/vsan-diagnostics) -- troubleshoot redundancy issues with diagnostic commands.
- [**vSAN Architecture**](/product-guide/storage/vsan-architecture) -- understand how blocks are distributed and replicated across nodes.

!!! note "Document Information"
    - Last Updated: 2026-04-03
    - VergeOS Version: 26.1.2

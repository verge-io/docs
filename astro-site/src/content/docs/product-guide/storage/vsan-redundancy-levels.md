---
title: Understanding vSAN Redundancy Levels
---

## Overview

:::note[Key Points]
- **N+1 / RF2** (default) maintains 2 copies of every data block and can survive one simultaneous node failure. N+1 provides robust protection suitable for most production environments.
- **N+2 / RF3** maintains 3 copies of every data block and can survive two simultaneous failures.
- Redundancy is configured per system and applies per vSAN tier.
:::

VergeOS vSAN supports configurable redundancy levels — also known as **Replication Factors (RF)** — that determine how many copies of each data block are maintained across the system. Choosing the right level is a balance between fault tolerance, storage overhead, and infrastructure cost.

## N+1 Redundancy (RF2)

N+1 redundancy maintains **2 copies** of every data block in the vSAN. This allows a cluster to survive **one simultaneous failure** — either a node failure or drive failures within a single node.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 2 controller nodes |
| **Copies of Data** | 2 |
| **Storage Overhead** | ~2x (before deduplication) |

### When to Use N+1

VergeOS N+1 is the default configuration and well suited for most scenarios. It provides a strong balance between capacity efficiency and fault tolerance and is appropriate for many production environments when combined with best practices for data protection such as regular snapshots and off-site data replication.

:::tip
For additional protection, a [Repair Server](/product-guide/backup-dr/repair-server) can be configured to automatically attempt to retrieve missing data blocks from a sync destination if failures exceed the configured redundancy level, potentially avoiding a full snapshot rollback.
:::

## N+2 Redundancy (RF3)

N+2 vSAN redundancy is available for environments that have a specific requirement to maintain **3 copies** of every data block and/or for a system to survive **two simultaneous failures**. N+2 can survive two simultaneous node failures, disk failures across two nodes, or a combination of both.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 3 (all controller nodes) |
| **Recommended Nodes** | 5 (provides a witness node to completely avoid split-brain scenarios) |
| **Copies of Data** | 3 |
| **Storage Overhead** | ~3x (before deduplication) |

### When to Use N+2

N+2 is designed for environments with a specific requirement to withstand more than one simultaneous failure. Common scenarios include **ultra-critical workloads** where even the brief exposure during a rebuild is unacceptable, or **remote/edge sites** where failed hardware cannot be replaced quickly. In these cases, the extra infrastructure cost of N+2 may be justified.

## Per-Tier Redundancy

A failure only affects the tier where the failed drives reside. For example, in an N+2 configuration, if drives on Tier 1 fail on two nodes **and** a Tier 4 drive fails on a different node, the cluster remains fully operational, and no data is lost.

## Configuring vSAN Redundancy Level

Redundancy level is typically configured during [system installation](/implementation-guide/installation-guide).

## Changing a System's Redundancy Levels

It is possible to upgrade an N+1 system to N+2 (provided the minimum node requirement is met). This transition involves a data rebalancing process.

:::caution
To perform a redundancy level change, contact **Verge.io Support.**
:::

## Viewing Tier Redundancy Status

To check the current redundancy configuration and status of a vSAN tier:

1. Navigate to **Infrastructure** > **vSAN Tiers** from the top menu.
2. Double-click the desired tier to open its dashboard.
3. Locate the **Status** card:
      - **Redundancy** — Displays the configured redundancy level (e.g., N+1 with 2 copies, N+2 with 3 copies).
      - **Redundant** checkbox — Indicates whether the tier is currently meeting its configured redundancy level. This will be unchecked if any nodes or tier drives are down.

## Quick Comparison

| Feature | N+1 (RF2) | N+2 (RF3) |
|---|---|---|
| Copies of data | 2 | 3 |
| Simultaneous failures tolerated | 1 | 2 |
| Minimum controller nodes | 2 | 3 |
| Recommended nodes | 3 | 5 |
| Storage overhead (before dedup) | ~2x | ~3x |
| Default  | Yes | No |

---

:::note[Document Information]
- Last Updated: 2026-03-03
- VergeOS Version: 26.1.2
:::

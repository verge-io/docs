---
title: Understanding vSAN Redundancy Levels
slug: understanding-vsan-redundancy-levels
description: Learn about VergeOS vSAN N+1 and N+2 redundancy levels, their requirements, use cases, and considerations 
published: true
date: 2026-02-14T00:00:00.000Z
tags:
  - vsan
  - redundancy
  - storage
  - replication
  - fault tolerance
  - RF3
  - RF2
  - redundancy factor
  - FTT
  - resiliency factor
categories:
  - vSAN
  - Storage
editor: markdown
dateCreated: 2026-02-14T00:00:00.000Z
---

# Understanding vSAN Redundancy Levels

## Overview

!!! info "Key Points"
    - **N+1** (default) maintains 2 copies of every data block and can survive one simultaneous node or drive failure. N+1 provides robust protection suitable for most production environments.
    - **N+2** (official support starting in 26.1.2) maintains 3 copies of every data block and can survive two simultaneous failures.
    - Redundancy is configured per system and applies per vSAN tier.

VergeOS vSAN supports configurable redundancy levels that determine how many copies of each data block are maintained across the system. Choosing the right level is a balance between fault tolerance, storage overhead, and infrastructure cost.

## N+1 Redundancy

N+1 redundancy maintains **2 copies** of every data block in the vSAN. This allows a cluster to survive **one simultaneous failure** — either a node failure or drive failures within a single node.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 2 controller nodes |
| **Copies of Data** | 2 |
| **Storage Overhead** | ~2x |

### When to Use N+1

VergeOS N+1 is the default configuration and well suited for most scenarios. It provides a strong balance between capacity efficiency and fault tolerance and is appropriate for many production environments when combined with best practices for data protection such as regular snapshots and off-site data replication.

!!! tip
    VergeOS's **Repair Server** feature and native fabric redundancy extend N+1 protection beyond what a typical two-factor data redundancy scheme provides. Even in the unlikely event of a double failure, data can be automatically, live-recovered from a VergeOS repair server, often without downtime.

## N+2 Redundancy

N+2 vSAN redundancy is available for environments that have a specific requirement to maintain **3 copies** of every data block and/or for a system to survive **two simultaneous failures**. N+2 can survive two simultaneous node failures, disk failures across two nodes, or a combination of both.

| Requirement | Detail |
|---|---|
| **Minimum Nodes** | 3 (all controller nodes) |
| **Recommended Nodes** | 5 (provides a witness node to completely avoid split-brain scenarios) |
| **Copies of Data** | 3 |
| **Storage Overhead** | ~3x |

### When to Use N+2

N+2 is designed for environments with a specific requirement to withstand more than one simultaneous failure. Common scenarios include **ultra-critical workloads** where even the brief exposure during a rebuild is unacceptable, or **remote/edge sites** where failed hardware cannot be replaced quickly. In these cases, the extra infrastructure cost of N+2 may be justified.

!!! info "Availability"
    Official support for N+2 redundancy was introduced in **VergeOS 26.1.2**.

## Per-Tier Redundancy

A failure only affects the tier where the failed drives reside. For example, in an N+2 configuration, if drives on Tier 1 fail on two nodes **and** a Tier 4 drive fails on a different node, the cluster remains fully operational, and no data is lost.

## Configuring vSAN Redundancy Level

Redundancy level is typically configured during [system installation](/implementation-guide/installation-guide).  

## Changing a System's Redundancy Levels

It is possible to upgrade an N+1 system to N+2 (provided the minimum node requirement is met) or downgrade from N+2 to N+1. This transition involves a data rebalancing process.

!!! warning
    To perform a redundancy level change, contact **Verge.io Support**

## Viewing Tier Redundancy Status

To check the current redundancy configuration and status of a vSAN tier:

1. Navigate to **Infrastructure** > **vSAN Tiers** from the top menu.
2. Double-click the desired tier to open its dashboard.
3. Locate the **Status** card:
      - **Redundancy** — Displays the configured redundancy level (e.g., N+1 with 2 copies, N+2 with 3 copies).
      - **Redundant** checkbox — Indicates whether the tier is currently meeting its configured redundancy level. This will be unchecked if any nodes or tier drives are down.

## Quick Comparison

| Feature | N+1 | N+2 |
|---|---|---|
| Copies of data | 2 | 3 |
| Simultaneous failures tolerated | 1 | 2 |
| Minimum controller nodes | 2 | 3 |
| Recommended nodes | 3 | 5 |
| Storage overhead | ~2x | ~3x |
| Default  | Yes | No |

---

!!! note "Document Information"
    - Last Updated: 2026-02-14
    - VergeOS Version: 26.1.2

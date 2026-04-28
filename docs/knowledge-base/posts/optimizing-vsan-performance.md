---
title: Optimizing vSAN Performance
slug: optimizing-vsan-performance
description: Factors that affect VergeOS vSAN performance and journal walk times, including RAM allocation, Tier 0 storage, drive media, CPU, and network design — with practical guidance on tuning the Storage buffer per node setting.
author: VergeOS Documentation Team
draft: true
date: 2026-04-21
semantic_keywords:
  - "vsan performance tuning optimization"
  - "storage buffer per node ram allocation"
  - "journal walk times slow vsan"
  - "vsan ram gb per tb recommendation"
  - "tier 0 nvme vsan metadata performance"
use_cases:
  - optimize_vsan_performance
  - improve_journal_walk_times
  - tune_storage_buffer_ram
  - diagnose_slow_vsan
tags:
  - vsan
  - performance
  - storage
  - ram
  - optimization
categories:
  - vSAN
  - Storage
editor: markdown
dateCreated: 2026-04-21
---

# Optimizing vSAN Performance

## Overview

!!! info "Key Points"
    - vSAN performance is affected by several hardware and configuration factors
    - RAM allocation is the most commonly overlooked tuning opportunity on running systems
    - VergeOS auto-reserves a bare minimum of RAM for vSAN — this is not sufficient for good performance
    - The **Storage buffer per node** cluster setting allocates additional RAM and can significantly improve performance and journal walk times
    - Other factors include Tier 0 storage, drive media type, CPU speed, and network design

Several factors determine how well your VergeOS vSAN performs, including the speed of journal walks (the background integrity verification processes that directly affect maintenance window durations, update times, and overall storage health). This article describes each factor and where to act on it.

## RAM Allocation

RAM is the highest-impact tuning lever available on a running system. It affects caching, buffering, and journal walk speed.

### How VergeOS Allocates vSAN RAM

VergeOS **automatically reserves a bare minimum of RAM** needed for vSAN operation. This happens transparently — you do not configure it. However, this automatic minimum is not intended to provide good performance; it is a floor, not a target.

The **Storage buffer per node** setting in [Cluster Settings](/product-guide/system/cluster-settings/) allocates *additional* RAM beyond that baseline for vSAN caching and buffering. This is the setting to adjust when you want to improve performance.

### Installation Behavior

During installation, VergeOS automatically sets **Storage buffer per node** based on the storage detected at that time. If:

- **Little or no storage was present at install** — the setting defaults to 2 GB and stays there
- **Storage was added or significantly scaled post-installation** — the setting is not automatically updated; it should be manually re-evaluated

### RAM per TB Guidelines

Use the following targets for total vSAN RAM per node (auto-reserved minimum + Storage buffer per node):

| Use case | Target RAM per TB of raw storage |
|---|---|
| Archive / cold storage | 0.5 GB/TB (minimum) |
| Standard general use | 1 GB/TB |
| High performance | 1–2 GB/TB |

**Example:** A node with 40 TB of raw storage used for standard workloads should target approximately 40 GB of total vSAN RAM. If the auto-reserved minimum accounts for some of that, set **Storage buffer per node** to cover the remainder, subject to available RAM on the node.

### How to Adjust the Setting

1. Navigate to **Infrastructure** > **Clusters** > double-click the cluster
2. Click **Edit** on the left menu
3. Update **Storage buffer per node** under the **Cluster** section
4. Save — nodes will require a reboot for the change to take effect

!!! warning "Check available RAM first"
    Aim for no more than 80% total RAM utilization under normal operation. Account for workload RAM, system overhead, and the new vSAN allocation before increasing this setting.

!!! tip "On HCI (combined compute+storage) nodes, avoid overprovisioning workload RAM, as this directly competes with vSAN RAM."

---

## Tier 0 — Metadata Storage

Tier 0 is a dedicated NVMe storage tier for vSAN metadata. Its performance has a direct and significant impact on journal walk times.

- **NVMe Tier 0 substantially reduces journal walk times** compared to systems without it
- Enterprise-grade NVMe with high DWPD (3+ Drive Writes Per Day) is recommended
- A redundant Tier 0 configuration (2 NVMe drives) is recommended for production

See the [Sizing Guide](/implementation-guide/sizing/) for Tier 0 storage capacity requirements.

---

## Drive Media

The type of drives used in your vSAN tiers affects both sustained throughput and latency:

- **NVMe/SSD:** Best performance for primary workload storage
- **SATA/SAS SSD:** Good for primary storage; lower cost than NVMe
- **HDD:** Suitable for archive, cold, or snapshot storage — not recommended for primary or high-throughput workloads. HDDs larger than 8 TB are not recommended in non-archive environments due to extended rebuild times.

Mix tiers intentionally: use faster media for active workloads (Tier 1/2) and HDDs only for cold or archival data (lower tiers).

---

## CPU

CPU speed affects the processing of vSAN operations, including data distribution, verification, and repair:

- A minimum of **2.7 GHz** is required; **3.0+ GHz** is recommended
- **1 CPU core per disk** is recommended for storage nodes under load
- CPU security mitigations (if enabled) can impact storage performance — see [Cluster Settings](/product-guide/system/cluster-settings/) for details

---

## Network Design

The core fabric network — the dedicated interconnect between nodes — is critical for vSAN replication and repair:

- Minimum **10 GbE** per node for the core fabric; **25 GbE or higher** is recommended
- The core fabric should be **isolated and dedicated** — not shared with external or VM traffic
- All nodes should have confirmed core fabric paths (verify via Node Diagnostics > Fabric Configuration)

See [Network Design](/implementation-guide/network-design) for full guidance.

---

## Additional Resources

- [Cluster Settings — Storage buffer per node](/product-guide/system/cluster-settings/)
- [Sizing & Hardware Requirements](/implementation-guide/sizing/)
- [Understanding vSAN Tier Status / Journal Walks](/knowledge-base/understanding-journal-walks-and-vsan-tier-status)
- [Network Design](/implementation-guide/network-design)
- [vSAN Scale Up Guide](/product-guide/operations/vsan-scale-up-sop/)

---

!!! note "Document Information"
    - Last Updated: 2026-04-21
    - VergeOS Version: 4.13

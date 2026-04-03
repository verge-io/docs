---
title: "vSAN Fundamentals"
description: "An introduction to the VergeOS Virtual Storage Area Network (vSAN), the distributed software-defined block storage engine that pools raw storage across cluster nodes into a unified, self-healing storage layer."
semantic_keywords:
  - "vSAN overview, virtual storage area network, software-defined storage basics"
  - "VergeOS storage engine, distributed block storage, hyperconverged storage"
  - "content-addressed storage, inline deduplication, self-healing storage"
  - "vSAN architecture introduction, tiered storage fundamentals, storage redundancy"
use_cases:
  - storage_management
  - initial_setup
  - capacity_planning
  - administration
tags:
  - vsan
  - storage
  - software-defined-storage
  - deduplication
  - redundancy
  - tiered-storage
  - hyperconverged
  - content-addressed-storage
categories:
  - Storage
---

# vSAN Fundamentals

## What is vSAN?

The VergeOS **Virtual Storage Area Network (vSAN)** is the distributed, software-defined block storage engine at the core of every VergeOS deployment. It pools the raw storage devices across all cluster nodes into a single, unified storage layer -- eliminating the need for external SANs, dedicated storage appliances, or third-party storage software.

With vSAN, storage is not a separate silo to manage. It is built directly into the hyperconverged platform, sharing the same nodes that run compute workloads. This tight integration simplifies operations, reduces hardware costs, and enables capabilities like inline deduplication and instant snapshots that would be difficult to achieve with bolt-on storage.

## Why vSAN Exists

Traditional data center architectures treat storage as an independent infrastructure tier -- separate hardware, separate management tools, separate teams. That model introduces complexity, latency, and cost at every layer.

VergeOS takes a different approach. By embedding a full-featured distributed storage engine into the platform, we can:

- **Eliminate external dependencies** -- no SAN switches, no dedicated storage controllers, no license fees for third-party storage software.
- **Simplify day-to-day operations** -- storage is managed through the same VergeOS UI used for compute, networking, and tenants.
- **Scale naturally** -- adding nodes expands both compute and storage capacity simultaneously.
- **Protect data by default** -- redundancy, self-healing, and integrity checking are built in from the ground up.

## How vSAN Fits into VergeOS

The vSAN is the foundational storage layer for everything in VergeOS. All data written by the platform ultimately lands on the vSAN:

- **Virtual machine disks** -- every VM drive is backed by vSAN blocks.
- **NAS volumes** -- file shares (NFS, CIFS/SMB) are stored on vSAN-backed volumes.
- **Files and media** -- ISO images, VM disk images, Cloud-Init templates, and other uploaded files reside on the vSAN.
- **Snapshots and replication** -- system snapshots, VM snapshots, and site sync data are all stored within the vSAN.
- **System data** -- the VergeOS control plane itself, including its database, runs on top of vSAN storage.

In short, if data exists in VergeOS, it lives on the vSAN.

## Key Design Properties

### No Single Point of Failure

Every data block is replicated across drives and nodes (2 copies with N+1/RF2, 3 copies with N+2/RF3) according to configurable [redundancy levels](/product-guide/storage/vsan-redundancy-levels). A minimum of **2 nodes** is required for N+1 redundancy and **3 nodes** for N+2. If a drive or an entire node fails, the system continues operating from the remaining copies and automatically rebuilds redundancy in the background.

### Self-Healing

The vSAN continuously monitors data integrity. When it detects a failed drive, a missing replica, or silent data corruption (bit rot), it automatically initiates repairs using the remaining healthy copies -- without administrator intervention.

### Content-Addressed Storage

Data is divided into **64 KB blocks**, each identified by a SHA-based cryptographic hash of its contents rather than by physical location. This design provides two important benefits:

- **Automatic deduplication** -- if two VMs write identical blocks, only one physical copy is stored. The hash ensures duplicates are detected transparently.
- **Built-in integrity verification** -- the hash serves as a checksum. Any corruption is immediately detectable because the data will no longer match its identifier.

### Tiered Storage

The vSAN organizes physical drives into [storage tiers](/product-guide/storage/storage-tiers), allowing administrators to match data placement to performance requirements. Fast media like NVMe and SSD can serve latency-sensitive workloads, while high-capacity spinning disks or archive media handle bulk storage -- all within the same unified pool.

!!! tip "Preferred Tier"
    Each volume and file can be assigned a [preferred tier](/product-guide/storage/preferred-tiers) that tells the vSAN where to place its data. The system honors this preference when capacity is available and can migrate data between tiers in the background without interrupting access.

### Horizontal Scalability

Adding nodes to a cluster expands both storage capacity and I/O throughput. The vSAN automatically redistributes data across new nodes to maintain balanced performance. For details on expansion options, see the [Scale Out Guide](/implementation-guide/scale-out-nodes).

## vSAN, Volumes, and Files

The vSAN provides raw block storage, but workloads interact with it through two higher-level subsystems:

| Subsystem | What It Stores | How It Is Accessed |
|-----------|---------------|-------------------|
| **Files** | VM disk images, ISOs, Cloud-Init templates, uploaded media | VergeOS UI, API, VM attachment |
| **Volumes** | NAS file shares, application data | NFS, CIFS/SMB, volume browser |

Both subsystems store their data on the vSAN and respect the same tier placement and redundancy settings. The key difference is that **files** are managed directly by the vSAN, while **volumes** run inside a NAS Service VM that provides filesystem and sharing capabilities.

!!! note "Entity Relationship"
    The storage hierarchy follows a clear structure:

    **vSAN** > **Tiers** > **Volumes & Files**

    The vSAN contains tiers, which contain the physical media. Volumes and files are logical entities placed on those tiers according to their preferred tier setting.

``` mermaid
graph TD
    subgraph VSAN [vSAN]
        direction TB
        subgraph logical [Logical Layer]
            VOL[NAS Volumes]
            FILES[VM Disks / ISOs / Media]
            SNAP[Snapshots]
        end
        subgraph physical [Physical Layer]
            T1[Tier 1 — NVMe] --> D1[Drives]
            T2[Tier 2 — SSD] --> D2[Drives]
            T3[Tier 3 — HDD] --> D3[Drives]
        end
        VOL -- "blocks placed on" --> T1
        VOL -- "blocks placed on" --> T2
        FILES -- "blocks placed on" --> T1
        FILES -- "blocks placed on" --> T2
        FILES -- "blocks placed on" --> T3
        SNAP -. "copy-on-write" .-> VOL
        SNAP -. "copy-on-write" .-> FILES
    end
```

## Multi-Tenancy and vSAN

VergeOS supports [multi-tenancy](/product-guide/tenants/overview) with full storage isolation. Each tenant receives its own isolated storage allocation carved from the parent system's vSAN. From the tenant's perspective, it has its own independent vSAN with its own tiers, volumes, and files.

This isolation means:

- **Tenants cannot see or access each other's data** -- storage boundaries are enforced at the platform level.
- **Storage resources are allocated by the parent** -- administrators control how much capacity each tenant can consume.
- **Tenants can be nested** -- a tenant can create sub-tenants with their own isolated storage, enabling multi-layer service provider architectures.

## What's Next

This page covered the *what* and *why* of vSAN. To learn more about how it works under the hood, explore these related pages:

- [**vSAN Architecture**](/product-guide/storage/vsan-architecture) -- block-level data distribution, hash-based placement, read/write operations, and cross-node redundancy.
- [**Storage Tiers**](/product-guide/storage/storage-tiers) -- how tiers are configured and how data placement works across different media classes.
- [**vSAN Redundancy Levels**](/product-guide/storage/vsan-redundancy-levels) -- configuring replication factors for data protection.
- [**Preferred Tier**](/product-guide/storage/preferred-tiers) -- controlling where specific workloads place their data.
- [**Capacity Planning**](/product-guide/storage/capacity-planning) -- sizing guidance, snapshot overhead, deduplication expectations, and when to scale.

---

!!! question "Need Help?"
    If you have questions about vSAN fundamentals or need assistance with your storage environment, visit [VergeOS Support](/support) for expert guidance.

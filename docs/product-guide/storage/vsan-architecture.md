---
title: "vSAN Block-Level Architecture"
description: "How the VergeOS vSAN stores, distributes, and protects data at the block level. Covers the write path, read path, data distribution, master node coordination, and core network transport."
semantic_keywords:
  - "vSAN block architecture, content-addressed storage, 64 KB block hashing"
  - "vSAN write path, read path, data distribution across nodes"
  - "vSAN master node failover, storage redundancy, crash-consistent journal"
  - "distributed storage internals, deduplication, core network fabric"
use_cases:
  - storage_management
  - capacity_planning
  - performance_tuning
  - troubleshooting
tags:
  - vsan
  - storage
  - architecture
  - block-storage
  - deduplication
  - redundancy
  - core-network
categories:
  - Storage
---

# vSAN Block-Level Architecture

## Overview

VergeOS vSAN stores all data as 64 KB blocks distributed across cluster nodes. This page explains how those blocks are written, read, distributed, and protected.

The entire VergeOS control plane lives within the vSAN: the application database, VM disk images, volume data, and NAS shares are all stored and served through this unified storage layer.

**Related guides:**

- [Scale Out Guide](/implementation-guide/scale-out-nodes) -- Adding nodes to expand capacity
- [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan) -- Increasing resources on existing nodes

---

## Content-Addressed Storage

At the core of the vSAN is a **content-addressed storage** model. Rather than tracking data by its file name or disk location, every 64 KB data block is identified by a SHA-based cryptographic hash of its contents. This design has several important implications for day-to-day operations:

- **Transparent deduplication** -- If two VMs (or two hundred VMs) write an identical block of data, only one physical copy is stored. The hash is the same, so the vSAN recognizes the block already exists and simply adds a reference to it. There is no deduplication job to schedule or tune; it happens automatically at write time.
- **Built-in integrity verification** -- Because a block's identity *is* its hash, the system can re-compute the hash at any time and compare it to the stored value. A mismatch means the data has changed unexpectedly, enabling automatic corruption detection. Corrupted blocks are automatically repaired by fetching a good copy from a redundancy target.
- **Efficient snapshots and clones** -- Snapshots and clones share all unchanged blocks with the original data through copy-on-write. Only blocks that are actually modified require new storage, making these operations both fast and space-efficient.

!!! tip "Deduplication Ratio"
    You can monitor your environment's deduplication effectiveness in the VergeOS UI under storage tier statistics. The **dedupe ratio** shows the ratio of logical data to physical data stored -- a higher ratio means more space savings from identical blocks.

!!! note "Compression"
    VergeOS vSAN does not perform inline compression on stored data. Compression is only applied when syncing data between sites over the network to optimize bandwidth usage.

---

## Data Distribution Across Nodes

The vSAN distributes data blocks across all participating nodes and drives within each storage tier. Each tier maintains a **distribution map** that assigns every block range to a specific node for its primary copy and a *different* node for its redundancy copy.

```
┌─────────────────────────────────────────────────────────┐
│                    vSAN Cluster                         │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   Node 1    │  │   Node 2    │  │   Node 3    │     │
│  │             │  │             │  │             │     │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │     │
│  │ │ Tier 1  │ │  │ │ Tier 1  │ │  │ │ Tier 1  │ │     │
│  │ │ NVMe    │ │  │ │ NVMe    │ │  │ │ NVMe    │ │     │
│  │ │         │ │  │ │         │ │  │ │         │ │     │
│  │ │ Block A │ │  │ │ Block B │ │  │ │ Block C │ │     │
│  │ │ Block C'│ │  │ │ Block A'│ │  │ │ Block B'│ │     │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │     │
│  │ ┌─────────┐ │  │ ┌─────────┐ │  │ ┌─────────┐ │     │
│  │ │ Tier 2  │ │  │ │ Tier 2  │ │  │ │ Tier 2  │ │     │
│  │ │ SSD     │ │  │ │ SSD     │ │  │ │ SSD     │ │     │
│  │ └─────────┘ │  │ └─────────┘ │  │ └─────────┘ │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  Block A  = Primary on Node 1, Redundancy on Node 2    │
│  Block B  = Primary on Node 2, Redundancy on Node 3    │
│  Block C  = Primary on Node 3, Redundancy on Node 1    │
│  (A', B', C' = redundancy copies)                      │
└─────────────────────────────────────────────────────────┘
```

The primary copy and redundancy copy of every block are always placed on **different nodes** (and different drives), ensuring that a single node failure never results in data loss. When a node or drive fails, the vSAN automatically fails over to redundancy copies and begins re-replicating data to restore the target redundancy level -- no manual intervention is required.

For details on configuring how many copies are maintained, see [vSAN Redundancy Levels](/product-guide/storage/vsan-redundancy-levels).

---

## Write Path

When a VM or volume writes data, the vSAN follows a well-defined sequence to ensure consistency and redundancy:

1. **Data arrives** -- The application (VM, NAS volume, etc.) issues a write through the vSAN filesystem layer.
2. **Block hashing** -- The incoming data is divided into 64 KB blocks, and a SHA-based hash is computed for each block.
3. **Deduplication check** -- The hash is looked up in the block index. If the block already exists (identical content was previously written), the vSAN simply adds a reference to the existing block -- no new data is written to disk. If the block is new, the write continues to step 4.
4. **Tier selection** -- For new blocks, the vSAN determines which [storage tier](/product-guide/storage/storage-tiers) to use based on the volume's or file's preferred tier setting. Tiers range from the fastest media (NVMe) to the slowest (archive).
5. **Primary block write** -- The block is written to the assigned primary node and drive for that tier, as determined by the tier's distribution map.
6. **Redundancy copy write** -- One or more copies of the block are simultaneously written to different nodes (the redundancy targets from the distribution map). Under the default RF2 configuration, one redundancy copy is written. Under RF3 (N+2), two redundancy copies are written to two separate nodes, protecting against two concurrent node failures. See [vSAN Redundancy Levels](/product-guide/storage/vsan-redundancy-levels) for details.
7. **Journal entry** -- The write is recorded in a transactional journal that enables crash-consistent recovery. The journal tracks in-progress transactions, so if a node restarts unexpectedly, the vSAN can recover to a consistent state without a lengthy repair scan.
8. **Acknowledgment** -- Once all required copies (primary and redundancy) are confirmed written, the write is acknowledged back to the application.

``` mermaid
graph TD
    A[Data Arrives] --> B[Compute Block Hash]
    B --> C{Block Already Exists?}
    C -->|Yes| D[Increment Reference Count]
    C -->|No| E[Select Target Tier]
    E --> F[Write Primary Block]
    F --> G[Write Redundancy Copies]
    G --> H[Record Journal Entry]
    D --> I[Acknowledge Write]
    H --> I
```

!!! note "Write Consistency"
    All required copies must be confirmed before a write is acknowledged. This guarantees that your data is protected against node failure from the moment the write completes.

---

## Read Path

The vSAN optimizes reads for the lowest possible latency:

1. **Hash lookup** -- The vSAN resolves the requested file offset to a block hash using its multi-level hash tree index.
2. **Cache check** -- The system first checks the local read cache (an in-memory cache allocated per node). If the block is cached, it is returned immediately without any disk or network I/O.
3. **Locality-aware source selection** -- If the block is not cached, the vSAN determines the best source:
      - **Local primary copy** -- If the primary copy resides on the same node as the requesting workload, it is read directly from the local drive (fastest path).
      - **Local redundancy copy** -- If the redundancy copy is local, it can be used instead, avoiding network traffic.
      - **Remote primary copy** -- If neither copy is local, the block is fetched from the primary node over the core network fabric.
4. **Automatic failover** -- If the primary copy's node is slow or unresponsive, the vSAN transparently falls back to the redundancy copy with no application-level interruption.
5. **Cache population** -- Retrieved blocks are added to the local read cache for future access, improving performance for repeated reads.

``` mermaid
graph TD
    A[Read Request] --> B[Hash Lookup]
    B --> C{Block in Cache?}
    C -->|Yes| D[Serve from Cache]
    C -->|No| E{Local Copy Available?}
    E -->|Yes| F[Read from Local Drive]
    E -->|No| G[Fetch from Remote Node]
    F --> H[Populate Cache]
    G --> H
    H --> I[Return Data]
    D --> I
```

!!! tip "Read Cache Sizing"
    The read cache size is configured per node during installation. For workloads with high read locality (such as databases or frequently accessed VM images), a larger cache can significantly reduce cross-node network traffic.

---

## vSAN Master Node

The vSAN designates one node in the cluster as the **master node**. The master coordinates key cluster-wide storage operations:

- **Write transaction coordination** -- All write transactions across the cluster are coordinated through the master node to maintain consistency.
- **Redundancy verification** -- The master continuously walks each storage tier, verifying that every data block has the required number of copies and initiating repairs when needed.
- **Tier device map management** -- The master maintains the distribution maps that determine which nodes and drives are responsible for each block range.

### Master Node Failover

If the current master node goes offline (due to maintenance, a restart, or an unexpected failure), the vSAN automatically promotes another node to the master role:

- **Automatic promotion** -- A surviving node takes over master responsibilities without administrator intervention.
- **Graceful handoff during maintenance** -- When the master node is shut down gracefully, the system waits for the application server to fail over and for the storage journal to reach an idle state before completing the shutdown. This ensures a clean transition.
- **No data loss** -- Because all data blocks are already replicated across multiple nodes, the failover does not require any data movement. The new master simply picks up coordination duties.

!!! info "Operational Impact"
    Master node failover is transparent to running VMs and applications. You may notice a brief pause in new write transactions during the transition, but existing data remains fully accessible throughout the process.

---

## Network Transport Layer

The vSAN uses a dedicated **core network fabric** for all inter-node storage communication. This is separate from your management and VM traffic networks, ensuring that storage I/O is never contended by other network activity.

### Core Network Characteristics

| Characteristic | Description |
|---|---|
| **Dedicated NICs** | The core network uses dedicated network interfaces, isolating storage traffic from management and tenant networks |
| **Jumbo frames** | The fabric uses large MTU sizes (typically ~9000 bytes) to maximize throughput and reduce per-packet overhead for block transfers |
| **Low-latency design** | The transport layer is purpose-built for distributed storage, prioritizing low latency and high throughput over general-purpose flexibility |
| **Time synchronization** | The fabric synchronizes clocks across all nodes, which is critical for transaction ordering and journal consistency |

### How the Fabric Is Used

Every block-level operation that crosses a node boundary travels over the core fabric:

- **Write replication** -- When a block's redundancy copy is placed on a remote node, the data is sent over the core fabric.
- **Remote reads** -- When a workload needs a block that is not stored locally, the read request is served across the fabric.
- **Repair traffic** -- When the vSAN detects a missing redundancy copy (for example, after a drive failure), re-replication traffic flows over the core fabric.
- **Tier migration** -- When data is moved between tiers that span multiple nodes, the fabric carries the migration traffic.

!!! warning "Core Network Planning"
    The core network is the backbone of vSAN performance. Ensure dedicated, high-bandwidth interfaces are allocated for core traffic and that jumbo frames are enabled on all switches in the core network path. Misconfigured MTU is one of the most common causes of storage performance issues.

---

## RAM-Based Caching and Buffering

The vSAN uses two separate RAM allocations on every node to accelerate I/O. Understanding these is important for capacity planning and performance tuning.

### Read Cache

Each node maintains an in-memory **read cache** that stores recently accessed 64 KB blocks. When a block is read, a copy is kept in RAM so that subsequent reads for the same block are served directly from memory without any disk or network I/O. The cache uses a least-recently-used (LRU) eviction policy — frequently accessed blocks remain cached while cold data is evicted to make room.

The read cache size is set per node during installation. You can view the current allocation by running **Get Cache Info** under **System > vSAN Diagnostics** (the `total` field shows the cache size for the selected node).

### Write Buffer

Each node also allocates a RAM-based **write buffer** (the **Storage buffer per node** cluster setting, default 2 GB). The write buffer absorbs incoming writes and works in conjunction with the vSAN's transactional journal. Writes are held in the buffer while they are being hashed, deduplicated, and committed to disk — this allows the vSAN to coalesce and order writes efficiently rather than issuing many small random writes directly to the underlying drives.

The write buffer is **not** a write-back cache in the traditional sense — it does not defer writes indefinitely. All buffered data is flushed to persistent storage as part of the journaled transaction before the write is acknowledged to the application. The buffer improves write throughput by batching I/O, not by caching it.

!!! tip "Hugepages"
    Both the read cache and write buffer benefit from hugepages (2 MB pages), which reduce memory management overhead. Hugepages are enabled by default during installation and can be verified under **Cluster Settings > Allocate Hugepages for Storage**.

### No SSD Cache Tier

Unlike traditional HCI platforms that dedicate an SSD tier as a read/write cache in front of slower HDD storage, the VergeOS vSAN does **not** use a discrete SSD cache layer. All caching happens in RAM (read cache and write buffer), while SSDs and NVMe drives participate as full storage tiers that hold persistent data.

This distinction matters for capacity planning:

- **Traditional HCI:** SSD capacity is "consumed" by the cache and unavailable for user data. You must size SSDs for cache working set, not data capacity.
- **VergeOS vSAN:** All SSD/NVMe capacity is available for user data. Caching is handled entirely in RAM, so cache sizing is a function of your node memory budget — not your drive configuration.

Tier placement (assigning workloads to faster or slower tiers via [preferred tier settings](/product-guide/storage/preferred-tiers)) serves the role that cache tiering plays in other platforms. Rather than hoping a cache algorithm promotes your hot data to SSD, you explicitly place performance-sensitive workloads on NVMe or SSD tiers and bulk/archival data on HDD tiers.

### Read-Ahead Prefetching

The vSAN includes a **read-ahead** mechanism that pre-fetches sequential blocks into the read cache. This benefits workloads that read data sequentially (such as media streaming or large file transfers). Random I/O workloads (such as databases) generally do not benefit from aggressive read-ahead.

You can check the current read-ahead configuration from **System > vSAN Diagnostics** using the **Get Read Ahead** query.

---

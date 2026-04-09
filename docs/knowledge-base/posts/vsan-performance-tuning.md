---
title: vSAN Performance Tuning
slug: vsan-performance-tuning
description: Guide to optimizing vSAN storage performance through tier selection, cache tuning, and workload placement.
author: VergeOS Documentation Team
published: true
date: 2026-04-03T00:00:00Z
semantic_keywords:
  - "vSAN performance optimization, storage tuning, I/O bottleneck resolution"
  - "read cache hit rate, cache tuning, memory cache sizing"
  - "tier selection, workload placement, NVMe vs SSD performance"
  - "network fabric storage throughput, cluster interconnect bandwidth"
use_cases:
  - performance_tuning
  - storage_management
  - tier_configuration
  - troubleshooting
  - optimization
tags:
  - vsan
  - performance
  - storage
  - tuning
  - tiers
  - cache
  - optimization
  - networking
categories:
  - vSAN
editor: markdown
dateCreated: 2026-04-03T00:00:00Z
---

# vSAN Performance Tuning

## Overview

!!! info "Key Points"
    - Storage performance depends on tier selection, read cache efficiency, and network fabric health
    - Matching I/O patterns to the right tier is more important than simply using the fastest storage
    - The vSAN read cache can dramatically improve performance when properly sized and monitored
    - Network fabric bottlenecks can silently limit storage throughput across the cluster

Whether you are troubleshooting sluggish VMs or planning capacity for a new workload, this guide covers tier selection, cache tuning, network fabric health, and workload placement strategies.

## Prerequisites

- Familiarity with the [vSAN Architecture](/product-guide/storage/vsan-architecture) and how tiers are organized
- Understanding of how [preferred tier settings](/knowledge-base/preferred-tier-usage/) determine storage placement
- Access to the VergeOS dashboard with administrator privileges

## Understanding I/O Patterns and Tier Selection

Choosing the right tier starts with understanding your workload's I/O behavior. Not every workload benefits from the fastest storage, and placing everything on Tier 1 can actually create contention that hurts overall performance.

### Common I/O Patterns

| Pattern | Characteristics | Best Tier Fit |
|---------|----------------|---------------|
| **Random read-heavy** | Small block sizes, high IOPS (e.g., databases, OLTP) | Tier 1 (NVMe) or Tier 2 (SSD) |
| **Sequential read/write** | Large block sizes, high throughput (e.g., video streaming, backups) | Tier 3 or Tier 4 (HDD can handle sequential well) |
| **Write-intensive** | Frequent small writes (e.g., logging, journaling apps) | Tier 1 or Tier 2 for low latency |
| **Mixed random** | Balanced read/write with moderate IOPS | Tier 2 (SSD) offers a good balance |
| **Cold/archival** | Infrequent access, large datasets | Tier 4 or Tier 5 |

!!! tip "Right-Size Your Tier Assignments"
    Placing sequential workloads like backups or media files on Tier 1 (NVMe) wastes premium capacity without meaningful performance gains. Sequential throughput is often limited by network fabric speed, not drive latency. Save NVMe for workloads that genuinely need low-latency random I/O.

### When Tier 1 (NVMe) Makes a Difference

NVMe storage excels at random I/O with very low latency. It provides the most benefit for:

- **Database workloads** with high random read/write IOPS
- **VDI environments** where many users generate concurrent small I/O
- **Latency-sensitive applications** where response time directly impacts user experience

NVMe provides less advantage for:

- Large sequential reads or writes (throughput-bound, not latency-bound)
- Workloads that fit entirely in the read cache
- Lightly loaded VMs that do not generate enough I/O to saturate slower tiers

## RAM Cache and Buffer Optimization

The vSAN uses two separate per-node RAM allocations that directly affect storage performance: a **read cache** and a **write buffer**. For a detailed explanation of how these work at the architecture level, see [RAM-Based Caching and Buffering](/product-guide/storage/vsan-architecture/#ram-based-caching-and-buffering).

!!! info "No SSD Cache Tier"
    Unlike traditional HCI platforms (such as VMware vSAN) that dedicate SSD capacity as a read/write cache layer, the VergeOS vSAN handles all caching in RAM. SSDs and NVMe drives are full storage tiers — all their capacity is available for user data. Cache sizing is determined by your node memory budget, not your drive configuration.

### Write Buffer

Each node allocates a RAM-based write buffer (default 2 GB, configurable via the **Storage buffer per node** cluster setting). The write buffer absorbs incoming writes while they are hashed, deduplicated, and committed to disk through the transactional journal. This allows the vSAN to batch and order writes efficiently rather than issuing many small random writes directly to drives.

The write buffer is not a write-back cache — it does not defer writes indefinitely. All buffered data is flushed to persistent storage as part of the journaled transaction before the write is acknowledged. The buffer improves write throughput by batching I/O, not by caching it.

!!! tip "When to Increase the Write Buffer"
    If your workloads generate frequent write bursts (such as database checkpoints or batch imports), increasing the write buffer can help absorb spikes without stalling. Monitor write latency trends and consider increasing the buffer if you see latency spikes that correlate with bursty write patterns.

### Read Cache

The vSAN read cache sits in front of all tiers and serves frequently accessed data from memory. A well-tuned read cache can make even slower tiers feel fast for read-heavy workloads.

### How the Read Cache Works

When the vSAN reads a data block, it stores a copy in the read cache (RAM). Subsequent reads for the same block are served directly from memory, avoiding disk I/O entirely. The cache uses a least-recently-used (LRU) eviction policy, so frequently accessed blocks stay cached while cold data is evicted.

### Monitoring Cache Hit Rates

You can check read cache performance from the **vSAN Diagnostics** page in the dashboard:

1. Navigate to **System > vSAN Diagnostics**
2. Select **Get Cache Info** from the Query dropdown
3. Click **Send**

The response shows cache hit rates and utilization. The key metric to watch is the **hit rate percentage**.

| Hit Rate | Interpretation | Action |
|----------|---------------|--------|
| **90%+** | Excellent -- most reads served from cache | No action needed |
| **70-90%** | Good -- cache is working but some reads hit disk | Monitor for trends; consider if working set is growing |
| **50-70%** | Fair -- significant disk reads occurring | Review whether hot data can be consolidated or cache increased |
| **Below 50%** | Poor -- cache is not effective for this workload | Investigate working set size vs. available cache; consider tier changes |

!!! warning "Low Hit Rates Are Not Always a Problem"
    A low cache hit rate is expected for workloads that are genuinely sequential or have very large working sets. Do not chase a high hit rate number without understanding the workload. Sequential backup streams or large data imports will naturally show low hit rates, and that is normal.

### Cache Sizing

The read cache size is configured per node during system installation. Each node allocates a fixed amount of RAM for its local read cache. You can view the current cache allocation from the cluster settings in the VergeOS dashboard.

Because the cache is a fixed RAM allocation, increasing it means reserving more node memory for storage and less for VM workloads. When evaluating cache size, consider:

- **Working set size** -- If your active VMs frequently access more data than fits in the cache, hit rates will suffer. Monitor hit rates over time to determine whether the cache is adequately sized.
- **Node memory budget** -- Larger caches improve storage read performance but reduce the RAM available for running VMs. Find the right balance for your workload mix.
- **Number of active VMs per node** -- More VMs competing for cache means each VM gets a smaller effective share. Spreading VMs across more nodes can improve per-VM cache effectiveness.

!!! tip "When to Increase Cache Size"
    If cache hit rates are consistently below 70% for random-read workloads and your nodes have available memory headroom, increasing the cache size may improve performance. Contact [VergeOS Support](/support) for guidance on adjusting cache settings on a running cluster.

### Improving Cache Effectiveness

- **Run VMs on nodes that host their preferred tier drives when possible**, so read cache on those nodes stays warm for the VM's working set. VM affinity settings can help with this.
- **Reduce working set sprawl**: If many VMs are competing for cache, consider whether some can be moved to different tiers or nodes.
- **Review snapshot retention**: Old snapshots consume tier capacity and, when the system reads snapshot blocks during operations like browsing or restoring, those blocks compete for read cache space with active VM data. Review your snapshot retention policies under **System > Snapshots** and remove expired snapshots.

## Network Fabric Impact on Storage Performance

Because the vSAN distributes data across all nodes in the cluster, the network fabric connecting those nodes directly affects storage performance. Even with the fastest NVMe drives, a saturated or misconfigured network will limit throughput.

### Key Fabric Considerations

- **Bandwidth**: The cluster interconnect should have sufficient bandwidth for both storage replication traffic and VM network traffic. Dedicated storage networks or high-bandwidth links (25GbE/100GbE) are recommended for performance-sensitive deployments.
- **Latency**: Inter-node latency directly adds to I/O response time for reads and writes that cross nodes. Keep cluster nodes on the same low-latency switch fabric.
- **Redundancy**: The vSAN replicates data across nodes. A failed link reduces available bandwidth for both replication and read operations.

!!! note "Shared vs. Dedicated Storage Networks"
    In smaller clusters, storage and VM traffic may share the same network interfaces. As the cluster grows or storage demands increase, separating storage replication onto dedicated interfaces can significantly reduce contention and improve both storage and VM network performance.

### Identifying Network Bottlenecks

Signs that the network fabric may be limiting storage performance:

- High I/O latency that does not correlate with drive utilization
- Performance degrades when multiple nodes are active but improves when workloads are concentrated on fewer nodes
- Throughput plateaus well below what the drive tier should deliver

To investigate, navigate to **Nodes > [Node Name] > NICs** and review the traffic graphs and error counters for the core network interfaces. Look for interface saturation, dropped packets, or error counts.

## Monitoring Performance Metrics

Regular monitoring helps you catch issues before they become user-visible problems. Establish a baseline before making tuning changes so you can measure the impact of your adjustments.

### Key Metrics to Watch

| Metric | Where to Find It | What to Look For |
|--------|------------------|------------------|
| **Tier status** | System Dashboard > vSAN | All tiers should show "online" |
| **Tier utilization** | System Dashboard > vSAN | Watch for tiers approaching 90% -- write throttling begins at this threshold |
| **Read cache hit rate** | vSAN Diagnostics > Get Cache Info | Declining hit rates may indicate a growing working set |
| **Cluster I/O rates** | vSAN Diagnostics > Get Cluster Rates | Baseline your normal I/O and watch for anomalies |
| **Top usage rates** | vSAN Diagnostics > Get Top Usage Rates | Identifies the hottest files/volumes driving the most I/O |
| **Drive latency** | Node Dashboard > Drives | Individual drives with high latency may indicate hardware issues |

### Establishing a Baseline

Before you can identify a performance problem, you need to know what "normal" looks like:

1. During a period of typical workload, capture cluster I/O rates and cache statistics from vSAN Diagnostics.
2. Note the read/write mix, throughput, and cache hit rate.
3. Record tier utilization percentages.
4. Use these numbers as your baseline for comparison when investigating issues.

## Workload Placement Strategies

Strategic workload placement across tiers can improve overall cluster performance without adding hardware.

### Tiering Strategy by Workload Type

| Workload | Recommended Tier | Rationale |
|----------|-----------------|-----------|
| Production databases | Tier 1 | Low-latency random I/O is critical |
| Application servers | Tier 1 or Tier 2 | Moderate random I/O; SSD is usually sufficient |
| File servers / NAS | Tier 2 or Tier 3 | Often sequential; capacity matters more than latency |
| Development/test VMs | Tier 2 or Tier 3 | Performance is less critical; save premium tiers |
| Backup targets | Tier 3 or Tier 4 | Sequential writes; capacity and cost are primary concerns |
| Archives and snapshots | Tier 4 or Tier 5 | Infrequently accessed; lowest-cost storage |

### Live Tier Migration

Changing a volume or VM disk's preferred tier triggers a background migration. The workload remains fully accessible during the move. Keep these tips in mind:

- **Migrate during low-activity periods.** Migration competes with production I/O for bandwidth, so running migrations during peak hours will degrade VM performance.
- **Avoid running many large migrations simultaneously** -- stagger them to prevent saturating a tier.
- **Verify destination tier capacity** before starting. The dashboard shows per-tier utilization under the vSAN section.

!!! tip "Preferred Tier Fallback"
    If the preferred tier does not exist in your cluster, VergeOS automatically selects the closest available tier. It will look for the next higher (slower) tier first, then fall back to the next lower (faster) tier. See [Preferred Tier Usage](/knowledge-base/preferred-tier-usage/) for details.

## Common Performance Issues and Solutions

### Write Throttling on a Tier

**Symptom**: Writes become noticeably slow; tier status shows "outofspace" in the dashboard.

**Cause**: The tier has exceeded the maximum usage threshold (default 90%), triggering write throttling to prevent the tier from filling completely.

**Solutions**:

- Migrate data from the full tier to a less-utilized tier
- Add physical drives to the tier
- Delete unnecessary snapshots or volumes consuming space on that tier
- Review and adjust snapshot retention policies

### VMs Slower Than Expected on the "Right" Tier

**Symptom**: A VM is on Tier 1 (NVMe) but performance is still poor.

**Possible Causes**:

- **Network fabric saturation**: The bottleneck is the interconnect, not the drives. Check node interface statistics.
- **Cache thrashing**: Too many VMs competing for read cache. Check cache hit rates.
- **Workload is write-heavy**: NVMe helps most with reads; write performance also depends on replication across the fabric.
- **Tier is nearly full**: Even before the throttle threshold, very full tiers can see degraded performance. Keep headroom.

### Inconsistent Performance Across Nodes

**Symptom**: The same workload performs differently depending on which node it runs on.

**Possible Causes**:

- Uneven drive health -- check for drives with elevated latency or SMART warnings on specific nodes
- Network asymmetry -- one node may have a slower or degraded network link
- Uneven workload distribution -- some nodes may be handling disproportionately more I/O

### Tier Migration Not Completing

**Symptom**: A volume's preferred tier was changed, but data has not moved.

**Solutions**:

1. Navigate to **System > vSAN Diagnostics**
2. Check tier status to confirm the destination tier is online and has available capacity
3. If migrations appear stuck, contact [VergeOS Support](/support) for assistance with verifying tier assignments

## Additional Resources

- [vSAN Architecture Overview](/product-guide/storage/vsan-architecture)
- [Preferred Tier Usage](/knowledge-base/preferred-tier-usage/)
- [Adding Tier 0 to an Existing System](/knowledge-base/adding-tier-zero/)

---

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).

!!! note "Document Information"
    - Last Updated: 2026-04-03
    - VergeOS Version: 4.13

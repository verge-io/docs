---
title: "Storage Capacity Planning"
description: "A practical guide to estimating storage requirements, managing tier balance, understanding snapshot overhead, and planning for growth in a VergeOS vSAN environment."
semantic_keywords:
  - "vSAN capacity planning, storage sizing guide, estimating storage requirements"
  - "thin provisioning, snapshot overhead, deduplication ratio expectations"
  - "tier capacity management, storage growth projections, overcommitment monitoring"
  - "scale up storage, scale out nodes, when to add capacity VergeOS"
use_cases:
  - capacity_planning
  - storage_management
  - tier_configuration
  - monitoring
  - administration
tags:
  - vsan
  - storage
  - capacity-planning
  - thin-provisioning
  - snapshots
  - deduplication
  - tiered-storage
  - scaling
  - monitoring
categories:
  - Storage
---

# Storage Capacity Planning

Effective capacity planning ensures your VergeOS environment has enough storage to meet current demands and accommodate future growth. This guide walks through the key factors that influence storage consumption and provides practical guidance for right-sizing your deployment.

For hardware sizing minimums and recommendations, see the [Node Sizing Guide](/implementation-guide/sizing/). For tier details, see [Storage Tiers](storage-tiers.md).

---

## Estimating Capacity Needs

When estimating total storage requirements, we need to account for more than just the raw data footprint. A good starting formula is:

**Usable Capacity Needed = Raw Data + Snapshot Overhead + Sync/Replication Overhead + Growth Buffer**

As a rule of thumb:

| Factor | Multiplier |
|--------|-----------|
| Raw data (VMs, file shares, media) | 1x |
| Snapshot retention (varies by write rate) | 0.15x -- 0.5x |
| Sync / replication destinations | 1x per destination copy |
| Growth buffer (6--12 months) | 0.2x -- 0.3x |

!!! example "Quick Estimate"
    If you have 10 TB of active VM and NAS data, a moderate snapshot policy, one replication destination, and 12 months of growth headroom, plan for roughly:

    **10 TB + 3 TB (snapshots) + 10 TB (replication) + 3 TB (growth) = ~26 TB usable**

    Remember that vSAN stores data with redundancy (typically 2 copies), so you will need approximately **double** the usable capacity in raw disk.

!!! note "Deduplication Savings"
    VergeOS vSAN performs inline deduplication across all tiers. Actual consumption may be significantly lower than the estimate above, depending on workload type. See the [Deduplication Expectations](#deduplication-ratio-expectations) section below.

---

## Tier Balance

VergeOS vSAN supports up to 5 user-facing tiers (Tier 1 through Tier 5), each backed by a different class of storage media. Keeping tiers balanced is critical because **each tier is an independent capacity pool** -- filling one tier can cause allocation failures even if other tiers have plenty of free space.

### Distributing Data Across Tiers

| Tier | Typical Media | What to Place Here |
|------|---------------|--------------------|
| Tier 1 | NVMe SSD | Active databases, write-intensive VMs, latency-sensitive applications |
| Tier 2 | SATA/SAS SSD | General-purpose VM storage, mixed workloads |
| Tier 3 | High-speed HDD or hybrid | Bulk storage, large sequential workloads |
| Tier 4 | Standard HDD | File servers, backup targets, infrequently accessed data |
| Tier 5 | Archive HDD | Cold storage, compliance archives, long-term retention |

Not every deployment needs all five tiers. Many environments run with just two (for example, an SSD tier for active workloads and an HDD tier for archives and snapshots).

### Tier 0 (Metadata)

!!! danger "Tier 0 Exhaustion is Catastrophic"
    Tier 0 stores critical metadata for the entire vSAN, including block maps and volume structures. If Tier 0 runs out of space, **the entire vSAN is affected** -- not just one workload or tier. New writes across all tiers will fail until Tier 0 capacity is restored.

Tier 0 is backed by the same drives as Tier 1 (typically NVMe or fast SSD) but serves a distinct purpose. As a sizing rule of thumb, allocate **5--10 GB of Tier 0 capacity per 1 TB of total usable capacity** across all tiers. Monitor Tier 0 usage alongside your user-facing tiers, especially as overall data volume grows.

**Where to check:** Navigate to the main dashboard and click the **vSAN Tiers** count box, then review Tier 0 usage. You can also use **System > vSAN Diagnostics > Get Tier Status** for detailed utilization.

### Avoiding Tier Exhaustion

When a tier runs out of capacity:

- New allocations targeting that tier are **rejected** -- VMs and volumes that write to this tier will experience I/O errors.
- Existing data remains accessible, but no new data can be written to the affected tier.
- The vSAN engages write throttling as the tier approaches capacity, progressively slowing writes before a full stop.
- Other tiers are **not** affected; each tier is an independent capacity pool.

!!! warning "Tier Capacity Thresholds"
    Set monitoring alerts at **80% utilization** (warning) and **90% utilization** (critical) for each tier. The vSAN begins throttling writes when a tier reaches the `sync_max_usage` threshold, which defaults to 90%. When you receive a capacity warning, see [Scaling: When to Add Capacity](#scaling-when-to-add-capacity) for your options.

---

## Thin Provisioning

VergeOS volumes use **thin provisioning** by default. This means the configured maximum size of a volume is a logical upper bound -- actual storage consumption on the vSAN grows only as data is written.

### How It Works

- When you create a 1 TB volume, it does not immediately consume 1 TB on the vSAN.
- As data is written to the volume, vSAN blocks are allocated on demand.
- TRIM/discard is enabled by default, so deleted data within the volume releases blocks back to the vSAN.

### Monitoring Thin Provisioning

Pay attention to two key metrics:

- **Allocated (logical) size**: The maximum size configured for the volume.
- **Used (physical) size**: The actual vSAN space consumed.

The ratio between these two values tells you how "thin" the volume actually is. A volume with 1 TB allocated but only 200 GB used has an 80% thin ratio.

!!! tip "Overcommitment"
    Thin provisioning allows you to allocate more total logical capacity than you have physical storage -- this is called overcommitment. While useful for flexibility, monitor actual usage closely to ensure physical capacity does not run out unexpectedly.

---

## Snapshot Retention Impact

Volume snapshots use a **copy-on-write (COW)** mechanism. When a snapshot is taken, it initially consumes almost no additional space. However, as the source volume continues to receive writes, original blocks are preserved in the snapshot, and storage consumption grows over time.

### How Snapshot Growth Works

1. A snapshot is created -- nearly zero additional space is used.
2. A write occurs on the source volume -- the original block is copied to the snapshot before being overwritten.
3. Over time, the snapshot accumulates all the original versions of every block that has been modified since it was taken.

### Estimating Snapshot Overhead

The storage cost of snapshots depends on two factors:

- **Write rate**: How much data changes between snapshots.
- **Retention period**: How long snapshots are kept.

| Workload Type | Daily Change Rate | 7-Day Snapshot Cost (approx.) |
|---------------|-------------------|-------------------------------|
| Read-heavy file server | 1--3% of data | 7--21% of volume size |
| General-purpose VM | 5--10% of data | 35--70% of volume size |
| Write-heavy database | 15--30% of data | 100--200%+ of volume size |

!!! warning "Snapshot Chains"
    Multiple snapshots on a write-heavy volume can accumulate significant storage. A volume with 10 daily snapshots retained for 30 days on a write-heavy workload could consume **more space in snapshots than the volume itself**. Plan retention policies carefully.

### Snapshot Limits

- Each volume supports a maximum of **1,000 snapshots**. When this limit is reached, **new snapshots for that volume will fail** until older snapshots are expired or manually deleted.
- Snapshots created through the UI default to a **72-hour expiry** unless a different value is specified at creation time. Scheduled snapshot policies use whatever expiry is configured in the policy.
- Setting an expiry of `0` creates a snapshot that never automatically expires -- these must be manually managed.

---

## Deduplication Ratio Expectations

VergeOS vSAN performs **inline deduplication** across all tiers. Deduplication identifies identical data blocks and stores only one copy, significantly reducing physical storage consumption in many workloads.

### Typical Deduplication Ratios

| Workload Type | Expected Dedup Ratio | Notes |
|---------------|---------------------|-------|
| VDI (virtual desktops) | 3:1 -- 8:1 | Many identical OS images yield high dedup |
| Similar VMs (same OS template) | 2:1 -- 5:1 | Shared base OS blocks deduplicate well |
| Mixed VM workloads | 1.2:1 -- 2:1 | Some overlap in OS and common libraries |
| Unique data (media, encrypted) | 1:1 -- 1.1:1 | Encrypted or compressed data does not deduplicate |
| Database workloads | 1.1:1 -- 1.5:1 | Varies widely based on data characteristics |

!!! note "Conservative Planning"
    We recommend planning capacity based on **no more than 1.5:1 deduplication** unless you have measured ratios from a representative workload. It is better to have extra capacity than to rely on optimistic dedup assumptions.

---

## File Count Considerations

The VergeOS files subsystem (used for VM disk images, ISOs, and media) supports a maximum of **50,000 file records** per system. When this limit is reached, **new file uploads and VM disk image creation will fail** until existing file records are removed. While this limit is generous for most deployments, large environments with many VM images or extensive media libraries should keep it in mind.

### Practical Guidelines

- Implement lifecycle policies to remove obsolete VM images and ISOs.
- Archive unused templates rather than keeping them as active file records.
- Monitor file count trends as part of regular capacity reviews.

---

## Volume Limits

When planning volume configurations, be aware of these limits:

| Resource | Limit |
|----------|-------|
| Snapshots per volume | 1,000 |
| Volume log retention | 31 days (max 500 entries per volume) |
| Maximum individual vDisk size | 256 TB |
| Maximum disks per VM | 2,000 (Virtio-SCSI required) |

---

## Sync and Replication Overhead

Volume synchronization and site replication create additional copies of data that must be factored into capacity planning.

### Volume Synchronization

When you synchronize volumes for backup or migration:

- The **destination volume** consumes storage roughly equal to the source data.
- During sync operations, **temporary snapshot volumes** may be created (especially when filesystem quiescing is used), adding brief additional overhead.
- Factor in the sync schedule -- more frequent syncs mean more temporary snapshot overhead.

### Site Replication

For disaster recovery configurations where data is replicated to a secondary site:

- The remote site needs capacity at least equal to the replicated data set.
- The `force_receive_sync_tier` setting can direct incoming replication data to a specific tier on the receiving end -- plan that tier's capacity accordingly.

!!! tip "Right-Size the DR Site"
    Not all data needs to be replicated. Prioritize replicating production workloads and critical data. Test/dev environments and easily-recreated data (ISOs, templates) can often be excluded from replication to reduce DR site capacity requirements.

---

## Monitoring Capacity Trends

Proactive monitoring prevents capacity surprises. Here is what to track:

### Key Metrics

| Metric | Where to Check | Alert Threshold |
|--------|---------------|-----------------|
| Per-tier utilization % | Main dashboard > **vSAN Tiers** count box, or **System > vSAN Diagnostics > Get Cluster Usage** | Warn at 80%, critical at 90% |
| Thin provisioning ratio | Select a volume to view its used vs. allocated size | Investigate if overcommit exceeds 3:1 |
| Snapshot count per volume | Select a volume, then view its **Snapshots** tab | Warn above 800 |
| File record count | **Files** section in the left navigation | Warn above 40,000 |
| Deduplication ratio | Main dashboard > **vSAN Tiers** count box, or **System > vSAN Diagnostics > Get Cluster Usage** | Track trends -- sudden drops may indicate workload changes |

For a complete guide to monitoring tools and navigation paths, see [vSAN Health Monitoring](vsan-health-monitoring.md).

### Trend Analysis

- Review capacity utilization weekly or monthly.
- Track the rate of growth to predict when additional storage will be needed.
- Compare actual deduplication ratios against planning assumptions.
- Review snapshot retention policies quarterly to ensure they still match available capacity.

---

## Scaling: When to Add Capacity

### Scale Up (Add Drives to Existing Nodes)

Scale up when:

- A specific tier is running low on capacity but overall node count is sufficient.
- You need more capacity in a single tier without changing the cluster topology.
- Drive bays are available in existing nodes.

For step-by-step instructions, see the [vSAN Scale Up SOP](/product-guide/operations/vsan-scale-up-sop/).

### Scale Out (Add New Nodes)

Scale out when:

- All drive bays in existing nodes are full.
- You need additional compute resources alongside storage.
- You want to increase fault tolerance by distributing data across more nodes.

For step-by-step instructions, see the [Scale Out SOP](/product-guide/operations/sop-scale-out/).

### Add a New Tier

Consider adding a new tier when:

- You have a workload class with distinctly different performance requirements (for example, adding an archive tier for cold data).
- Moving data to a lower-cost tier would free up capacity on premium tiers.
- You are introducing a new media type (for example, adding NVMe alongside existing SATA SSDs).

---

## Common Sizing Mistakes

Avoid these frequent capacity planning pitfalls:

| Mistake | Why It Hurts | What to Do Instead |
|---------|--------------|--------------------|
| Ignoring snapshot overhead | Write-heavy workloads with long retention can double storage consumption | Calculate snapshot cost using daily change rate and retention period |
| Relying on optimistic dedup ratios | Over-estimating dedup leads to premature capacity exhaustion | Plan for 1.5:1 or less unless you have measured data |
| Sizing only one tier | Filling a single tier causes failures even with free space elsewhere | Monitor and plan each tier independently |
| No growth buffer | Running at 90%+ utilization leaves no room for spikes | Maintain at least 20% free space on each tier |
| Forgetting replication overhead | DR copies consume real storage on both sites | Include replication destinations in total capacity math |
| Over-provisioning thin volumes | Allocating 10x more logical space than physical capacity | Set overcommit policies and monitor actual usage trends |
| Ignoring Tier 0 metadata growth | Metadata tier exhaustion affects the entire vSAN | Allocate 5--10 GB of Tier 0 per 1 TB of usable capacity |

!!! tip "Regular Reviews"
    Capacity planning is not a one-time exercise. Schedule quarterly reviews to compare actual consumption against projections, adjust retention policies, and plan procurement timelines for additional storage.

---

!!! question "Need Help?"
    If you have questions about capacity planning or need assistance sizing your storage environment, visit [VergeOS Support](/support) for expert guidance.

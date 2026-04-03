---
title: "vSAN Health Monitoring"
description: "A guide to proactive vSAN health monitoring in VergeOS, covering key metrics, dashboard interpretation, alert configuration, and recommended maintenance schedules for storage infrastructure."
semantic_keywords:
  - "vSAN health monitoring, storage dashboard, tier status alerts"
  - "drive SMART monitoring, cache hit rate, storage performance baseline"
  - "proactive storage alerts, capacity utilization thresholds, repair status"
  - "vSAN maintenance schedule, integrity check, drive lifecycle management"
use_cases:
  - monitoring
  - storage_management
  - administration
  - troubleshooting
  - performance_tuning
tags:
  - vsan
  - storage
  - monitoring
  - health-checks
  - smart
  - alerts
  - capacity
  - maintenance
  - diagnostics
categories:
  - Storage
---

# vSAN Health Monitoring

Proactive health monitoring helps us catch potential storage issues before they affect workloads. This guide covers the key metrics to watch, how to interpret the storage dashboard, setting up alerts, and establishing a regular monitoring cadence.

For reactive troubleshooting when something has already gone wrong, see [vSAN Diagnostics](vsan-diagnostics.md). For sizing and growth planning, see [Capacity Planning](capacity-planning.md).

---

## What "Healthy" Looks Like

A healthy vSAN environment has the following characteristics:

| Indicator | Healthy State |
|---|---|
| **Tier status** | All tiers show **online** |
| **Redundancy** | All data blocks have the expected number of copies across nodes |
| **Capacity usage** | No tier exceeds 80% utilization |
| **Drive health** | No SMART warnings, zero read/write errors |
| **Cache hit rate** | Above 90% for typical workloads |
| **Repair status** | No active repairs (progress = 0, bad drives = 0) |
| **Journal status** | `idle` or `active` with transactions advancing normally |

!!! tip "Know Your Baseline"
    Periodically record cluster I/O rates, cache hit rates, and tier usage during normal operations. Having a known-good baseline makes it much easier to spot anomalies when something changes.

!!! note "Understanding Journal Status"
    The vSAN journal tracks in-flight write transactions to ensure data consistency. Under normal operation, journal status is either **idle** (no pending transactions) or **active** (transactions are being committed). If journal status shows transactions that are not advancing or the journal appears stuck, this may indicate a node communication issue or a stalled I/O path. Check network connectivity between nodes and review the system logs for errors. If journal status does not return to normal after verifying network health, contact [VergeOS Support](/support).

---

## Key Metrics to Watch

### Tier Usage and Status

Tier health is the single most important metric. Each vSAN tier reports a status that reflects its current operational state:

| Status | Meaning | Urgency |
|---|---|---|
| **online** | Healthy and fully redundant | None |
| **noredundant** | Online but missing one or more redundant copies | **High** -- a second failure could cause data loss |
| **repairing** | Actively re-replicating data to restore redundancy | Monitor closely; do not reboot nodes |
| **initializing** | Tier is being set up | Wait for completion |
| **verifying** | Integrity check in progress | Performance may be reduced |
| **outofspace** | Writes are being throttled due to low free space | **High** -- add storage or free space |
| **offline** | Tier is completely unavailable | **Critical** -- investigate immediately |

!!! warning "Noredundant is Urgent"
    A **noredundant** tier is still serving data, but it has zero safety margin. Treat this as a high-priority condition and ensure repair completes or failed hardware is replaced before performing any maintenance that could take another node or drive offline.

**Where to check:** Navigate to the main dashboard and click the **vSAN Tiers** count box. You can also use **System > vSAN Diagnostics > Get Tier Status** for detailed per-tier information.

### Capacity Utilization

Monitor per-tier capacity usage to avoid running out of space on any individual tier. Remember that each tier is an independent capacity pool -- filling one tier causes write throttling on that tier even if other tiers have space available.

| Utilization Level | Recommendation |
|---|---|
| **Below 70%** | Healthy. No action needed. |
| **70--80%** | Begin planning capacity expansion or data migration. |
| **80--90%** | Take action soon. Review snapshot retention, move data to less-full tiers, or add storage. |
| **Above 90%** | The vSAN begins write throttling. Immediate action required. |

!!! tip "Snapshot Accumulation"
    One of the most common causes of unexpected capacity growth is snapshot retention. Workloads with high write rates can cause snapshot space to grow rapidly. Review and adjust retention policies as part of regular capacity management.

**Where to check:** Use **System > vSAN Diagnostics > Get Cluster Usage** for an overall view, or **Summarize Disk Usage** for a per-tier breakdown.

### Cache Hit Rates

The read cache serves data from memory rather than disk. Higher hit rates mean lower latency.

| Hit Rate | Interpretation |
|---|---|
| **Above 90%** | Excellent. Most reads served from memory. |
| **70--90%** | Typical for mixed workloads. Acceptable if performance is satisfactory. |
| **Below 70%** | The working set likely exceeds available cache memory. See remediation steps below. |

A sudden drop in cache hit rate often indicates a workload change, such as a new VM with a large dataset or a backup job scanning large volumes.

!!! tip "Remediating Low Cache Hit Rates"
    If cache hit rates fall below 70%, investigate the following in order:

    1. **Identify the cause** -- Check whether a new VM, backup job, or large sequential scan was recently started. Use **Get Top Usage Rates** to find the heaviest I/O consumers.
    2. **Separate workloads** -- Move bulk or sequential workloads (backups, large imports) to a different tier so they do not evict frequently-accessed blocks from cache.
    3. **Increase cache capacity** -- Cache size is determined by the RAM allocated to the vSAN on each node. To increase cache, either add RAM to existing nodes or add nodes to the cluster.
    4. **Schedule heavy I/O** -- If adding resources is not an option, schedule backup jobs and large data imports during off-peak hours to reduce cache contention with production workloads.

**Where to check:** Use **System > vSAN Diagnostics > Get Cache Info**.

### I/O Rates and Latency

Cluster-wide read and write throughput should remain consistent with your established baseline. Watch for:

- **Sustained throughput drops** that do not correspond to reduced workload activity
- **Elevated latency** on individual drives, which may indicate a failing device
- **Write throttling** (non-zero throttle values on drives or tiers), which signals space pressure

**Where to check:** Use **Get Cluster Rates** for cluster-wide throughput and **Get Device Status** for per-drive latency.

### Redundancy and Repair Status

After any drive or node failure, the vSAN automatically begins repairing data by re-replicating blocks to restore redundancy. During repair:

- **Do not reboot** any nodes until repair completes
- Monitor repair progress -- watch for the progress value approaching 1.0
- The tier status returns to **online** once repair finishes

**Where to check:** Use **Get Repair Status** to track blocks re-replicated, progress (0.0 to 1.0), and bad drive count.

### Drive Health (SMART Monitoring)

The vSAN continuously monitors physical drive health through SMART indicators. The most important indicators to watch are:

| Indicator | What to Watch For |
|---|---|
| **Reallocated sectors** | Counts increasing over time (not just a one-time event) signal early drive failure |
| **Current pending sectors** | Non-zero and growing values indicate active media problems |
| **Offline uncorrectable** | Non-zero values indicate permanent media damage |
| **Wear level** | SSDs approaching the manufacturer's rated endurance limit should be scheduled for replacement |
| **Temperature** | Sustained high temperatures can accelerate wear and increase error rates |
| **Operating hours** | Useful for tracking drive age and planning lifecycle replacements |

Each indicator has a configurable warning threshold at the cluster level. When a drive exceeds any threshold, VergeOS generates an alert.

**Where to check:** Review drive health from the dashboard under the drives section, or use **Get Device Status** for per-drive details.

---

## Reading the Storage Dashboard

The VergeOS main dashboard provides a high-level view of storage health. The **vSAN Tiers** count box shows the number of configured tiers -- click it to see per-tier status, usage percentage, and device count. A green status indicates all tiers are healthy; any non-online status is highlighted to draw attention.

For detailed interpretation of each metric visible on the dashboard -- tier status meanings, capacity thresholds, drive health indicators, and repair progress -- refer to the [Key Metrics to Watch](#key-metrics-to-watch) section above.

---

## Setting Up Proactive Alerts

VergeOS supports subscription-based alerting that can notify you by email when storage conditions require attention.

### Recommended Alert Subscriptions

We recommend creating subscriptions for the following events:

| Event Category | What It Catches |
|---|---|
| **Tier status changes** | Notifies when a tier transitions away from **online** (e.g., to noredundant, outofspace, or offline) |
| **Drive SMART warnings** | Alerts when any SMART indicator exceeds its configured threshold |
| **Drive errors** | Triggers on read/write errors detected by the vSAN |
| **Repair events** | Notifies when repair starts and completes |
| **Capacity thresholds** | Alerts when tier usage exceeds a defined percentage |

### Creating Subscriptions

1. Navigate to **System > Subscriptions**
2. Click **New Subscription**
3. Select the event type and configure the notification target (email address or group)
4. Set any applicable thresholds or filters

For detailed instructions on configuring subscriptions, see [Creating Subscriptions](/product-guide/system/subscriptions-overview/).

### Tuning SMART Thresholds

If you find that default SMART thresholds are too sensitive (or not sensitive enough) for your environment, you can adjust them at the cluster level. Common adjustments include:

- Raising the **temperature threshold** in warmer operating environments
- Lowering the **reallocated sectors threshold** for more aggressive early warning
- Adjusting the **wear level threshold** based on your SSD replacement cycle

---

## Regular Maintenance Checks

Establishing a regular monitoring cadence helps catch issues before they become critical. We recommend the following schedule:

### Daily Checks

- [ ] **Dashboard review** -- Glance at the main dashboard for any highlighted warnings or non-online tier status
- [ ] **Alert inbox** -- Review any storage-related alert emails from the past 24 hours

### Weekly Checks

- [ ] **Tier capacity** -- Review per-tier usage trends using **Get Cluster Usage**. Look for tiers approaching 80% utilization
- [ ] **Drive health** -- Scan the drives section for any new SMART warnings or error counts
- [ ] **Cache performance** -- Check cache hit rates with **Get Cache Info** and compare against your baseline
- [ ] **Top I/O consumers** -- Run **Get Top Usage Rates** to identify any unexpectedly busy workloads

### Monthly Checks

- [ ] **Capacity trend analysis** -- Compare current tier usage against the previous month. Project when additional capacity may be needed
- [ ] **Snapshot audit** -- Review snapshot retention policies and actual snapshot space consumption. Trim unnecessary snapshots
- [ ] **Integrity check** -- Schedule a full integrity check during a maintenance window to verify data consistency across all tiers

!!! warning "Integrity Check Performance Impact"
    Integrity checks scan all data blocks and verify checksums. This can reduce storage performance while running. Schedule integrity checks during low-activity periods such as nights or weekends.

### Quarterly Checks

- [ ] **Drive lifecycle review** -- Review operating hours and wear levels across all drives. Identify any drives approaching end-of-life and plan replacements
- [ ] **Capacity planning update** -- Revisit your capacity plan based on actual growth trends. See [Capacity Planning](capacity-planning.md) for guidance
- [ ] **Alert tuning** -- Review alert history and adjust thresholds if needed to reduce noise or catch issues earlier

---

## Monitoring During Scale-Up Operations

When adding new nodes or drives to the cluster, the vSAN redistributes data across the new hardware. During this period, monitoring is especially important.

### What to Expect

- The affected tier may show **fullwalk: true** as the vSAN redistributes data blocks
- I/O latency may temporarily increase due to background data movement
- The process completes automatically -- no manual intervention is needed

### What to Watch

| Metric | What to Look For |
|---|---|
| **Tier status** | Should remain **online** throughout the operation |
| **Repair status** | Should show active redistribution with progress advancing |
| **Drive usage** | New drives should begin accumulating data as redistribution progresses |
| **Workload performance** | Monitor application-level latency; if the impact is too high, consider scheduling scale-up during off-peak hours |

!!! tip "Scale-Up Timing"
    For large clusters or tiers with significant data volumes, redistribution can take several hours. Plan scale-up operations during maintenance windows or periods of lower workload activity to minimize the performance impact on production workloads.

---

## Monitoring During Maintenance Operations

When performing planned maintenance such as node reboots, firmware updates, or drive replacements:

1. **Check tier status before starting** -- Ensure all tiers are **online** before taking any component offline. Never begin maintenance when a tier is **noredundant** or **repairing**.
2. **Monitor during maintenance** -- Watch tier status for transitions to **noredundant**. This is expected when a node goes offline temporarily.
3. **Verify recovery after maintenance** -- After the node returns, confirm all tiers return to **online** and no repairs are pending.

!!! danger "Never Stack Failures"
    If a tier is already in a **noredundant** or **repairing** state, do not take any additional nodes or drives offline. Wait for the tier to return to **online** before proceeding with maintenance.

---

## Next Steps

- [vSAN Diagnostics](vsan-diagnostics.md) -- Detailed diagnostic commands for reactive troubleshooting
- [Capacity Planning](capacity-planning.md) -- Sizing guidance and growth projections
- [Drive Replacement](/product-guide/operations/drive-replacement/) -- Step-by-step drive swap procedures
- [Creating Subscriptions](/product-guide/system/subscriptions-overview/) -- Configure alert notifications
- [vSAN Redundancy Levels](vsan-redundancy-levels.md) -- Understanding N+1 and N+2 configurations

---

!!! question "Need Help?"
    If you have questions about vSAN health monitoring or need assistance diagnosing storage issues, visit [VergeOS Support](/support) for expert guidance.

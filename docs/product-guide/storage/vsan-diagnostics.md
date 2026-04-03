---
title: "vSAN Diagnostics"
description: "Use vSAN diagnostic commands in VergeOS to troubleshoot storage issues, monitor tier health, inspect cache performance, and assess device status across your cluster."
semantic_keywords:
  - "vSAN diagnostics, storage troubleshooting, vSAN commands"
  - "tier status noredundant, vSAN repair progress, drive failure recovery"
  - "cache hit rate, journal status, storage performance diagnosis"
  - "vcmd commands, vSAN CLI utilities, storage health monitoring"
use_cases:
  - troubleshooting
  - storage_management
  - monitoring
  - performance_tuning
  - administration
tags:
  - vsan
  - storage
  - diagnostics
  - troubleshooting
  - vcmd
  - tier-health
  - repair
  - cache
  - smart
categories:
  - Storage
---

# vSAN Diagnostics

Use vSAN diagnostics to investigate storage performance, device health, and tier status across your cluster. If you are responding to a specific issue, start with [Troubleshooting Workflows](#troubleshooting-workflows). For routine monitoring, see [Best Practices](#best-practices).

## Prerequisites

- Access to VergeOS interface with vSAN management privileges
- Basic understanding of distributed storage concepts
- Knowledge of VergeOS vSAN architecture

!!! note "vSAN Access"
    vSAN diagnostics are only available at the root/parent level. Tenants do not have access to vSAN diagnostic tools.

## Accessing vSAN Diagnostics

1. **Navigate to vSAN Diagnostics:**
   - Select **System** --> **vSAN Diagnostics** from the top menu.
   - Or alternatively: From the Main Dashboard, click the **vSAN Tiers** count box --> **vSAN Diagnostics** from the left menu.

2. **Using Diagnostic Commands:**
   - Select a command from the **Query** dropdown menu
   - Configure available parameters on the right side
   - Click **Send -->** to execute the command

!!! tip "Verify CLI Commands"
    Enable **"Show Command"** in the diagnostics interface to see the exact CLI command being executed. This is the definitive reference for SSH execution and script automation -- use it to confirm command syntax before building scripts.

---

## Tier Health States

Each vSAN storage tier reports a health status that reflects its current operational state. You can view tier health by selecting **Get Tier Status** from the diagnostics page or from the dashboard's vSAN Tiers summary.

| Status | Meaning | Action Required |
|---|---|---|
| **online** | Tier is healthy and fully redundant. All data blocks have the expected number of copies distributed across nodes. | None -- normal operation. |
| **noredundant** | Tier is online and serving I/O, but one or more data blocks have lost a redundant copy (for example, due to a drive or node failure). | Investigate which drive or node is unavailable. If spare capacity exists, repair begins automatically. |
| **repairing** | The vSAN is actively re-replicating data blocks to restore full redundancy. | Monitor repair progress with **Get Repair Status**. Avoid rebooting nodes until repair completes. |
| **initializing** | Tier is being set up (typically seen during initial cluster deployment or when a new tier is created). | Wait for initialization to complete. |
| **verifying** | An integrity check is in progress on this tier. | Monitor progress with **Get Integ Check Status**. Performance may be reduced during verification. |
| **outofspace** | Tier has exceeded its capacity threshold and writes are being throttled. | Free space by removing unnecessary snapshots or volumes, migrate data to another tier, or add storage devices. |
| **offline** | Tier is completely unavailable and cannot serve reads or writes. | Investigate immediately -- check node connectivity, device status, and system logs. |

!!! warning "Noredundant Tiers"
    A tier in the **noredundant** state is still serving data, but a second failure could result in data loss. Treat this as an urgent condition and ensure repair completes or failed hardware is replaced as quickly as possible.

!!! tip "Repair Progress"
    When monitoring a **repairing** tier, use **Get Repair Status** to track key metrics: the number of blocks re-replicated, repair progress (0.0 to 1.0), and the count of bad drives. Repair is complete when the tier returns to **online**.

**Example -- Get Tier Status output (normal):**

```
Tier 0: status=online  used=4.2TB  max=12TB  pct=35%
Tier 1: status=online  used=1.8TB  max=8TB   pct=22%
```

**Example -- Get Tier Status output (degraded):**

```
Tier 0: status=online       used=4.2TB  max=12TB  pct=35%
Tier 1: status=noredundant  used=1.8TB  max=8TB   pct=22%  repairing=0
```

In the degraded example, Tier 1 shows `noredundant` with `repairing=0`, meaning redundancy is lost but automatic repair has not started -- likely because the failed device has not been replaced or spare capacity is insufficient.

---

## Cache Diagnostics

The **Get Cache Info** command provides read cache statistics that help you understand how effectively the vSAN is serving data from memory versus reading from disk.

### Key Cache Metrics

| Metric | What It Tells You |
|---|---|
| **Cache hit rate** | Percentage of read requests served from RAM cache. Higher is better. |
| **Cache size** | Total memory allocated to the read cache on this node. |
| **Evictions** | How frequently data is being removed from cache to make room for new data. |

### Interpreting Cache Performance

- **High hit rate (above 90%):** The cache is working well. Most reads are being served from memory, which means low latency for workloads.
- **Moderate hit rate (70-90%):** Typical for mixed workloads. If performance is acceptable, no changes are needed.
- **Low hit rate (below 70%):** The working set may be larger than the cache. Consider whether the cache size is appropriately configured for the workload, or whether workloads with different access patterns should be placed on separate tiers.

!!! tip "When to Investigate Cache"
    If users report slow read performance but cluster I/O rates look normal, cache hit rates are the first place to check. A sudden drop in hit rate often indicates a workload change -- such as a new VM with a large dataset or a backup job scanning large volumes.

### Read-Ahead Configuration

The **Get Read Ahead** command shows the current read-ahead settings. Read-ahead pre-fetches sequential data into cache, which benefits workloads that read files sequentially (such as media streaming or large file transfers). Random I/O workloads (such as databases) generally do not benefit from aggressive read-ahead.

---

## Journal Status Interpretation

The vSAN journal is a write-ahead log that ensures crash-consistent recovery. All writes pass through the journal before being committed to storage. Use **Get Journal Status** to inspect its current state.

### Journal Status Fields

| Field | Description |
|---|---|
| **status** | Current journal state: `idle` (no active writes), `active` (writes in progress), or `paused` (manually paused for maintenance). |
| **cur_transaction** | The current transaction sequence number. This increments with each committed write batch. |
| **redundant** | Whether journal data is being written to a redundant location for crash safety. |
| **index_unique** | Total number of unique index nodes tracked by the journal. |

### What to Look For

- **Status stuck on "active":** If the journal remains in the `active` state for an extended period without progressing, this may indicate blocked I/O. Check device status and node connectivity.
- **Transaction numbers not advancing:** Compare the transaction counter over time. If it stops incrementing, writes are stalled -- investigate device health and tier status.
- **Redundant = false:** If the journal is not writing redundantly, a single device failure could affect crash recovery. This may occur temporarily during a node or drive failure.

!!! note "Journal During Shutdown"
    During a graceful system shutdown, the vSAN waits for the journal to reach the `idle` state before stopping. If shutdown seems to hang, a large pending write batch may need to complete first.

**Example -- Get Journal Status output (normal):**

```
status=idle  cur_transaction=584210  redundant=true  index_unique=12847
```

**Example -- Get Journal Status output (potential issue):**

```
status=active  cur_transaction=584210  redundant=true  index_unique=12847
```

If `status=active` and `cur_transaction` remains the same value across multiple checks, writes may be stalled. Investigate device health and node connectivity.

---

## Device Health Monitoring

The vSAN continuously monitors physical drive health through SMART (Self-Monitoring, Analysis, and Reporting Technology) indicators. You can review drive health from the VergeOS dashboard under the drives section, or use **Get Device Status** and **Get Device List** for per-device details.

### SMART Indicators Tracked

| Indicator | What It Measures | Why It Matters |
|---|---|---|
| **Reallocated sectors** | Sectors that the drive has remapped due to read/write errors. | Rising counts are an early warning sign of drive failure. Even a small number warrants monitoring. |
| **Wear level** | Percentage of SSD write endurance consumed. | Helps predict when an SSD will reach end of life. Plan replacements before wear reaches critical levels. |
| **Operating hours** | Total powered-on time for the drive. | Useful for tracking drive age and planning lifecycle replacements. |
| **Temperature** | Current drive operating temperature. | Sustained high temperatures can accelerate wear and increase error rates. |
| **Current pending sectors** | Sectors that the drive has flagged as unstable and is waiting to reallocate. | Non-zero values indicate active problems. The drive will attempt reallocation on the next write to these sectors. |
| **Offline uncorrectable** | Sectors with errors that could not be corrected during offline scans. | Non-zero values indicate permanent media damage. Consider proactive replacement. |

### Warning Thresholds

Each SMART indicator has a configurable warning threshold set at the cluster level. When a drive exceeds any threshold, VergeOS generates an alert. The default thresholds are designed to provide early warning before failures become critical.

### Proactive Replacement Triggers

Consider scheduling a drive replacement when you observe any of the following:

- **Reallocated sectors** count is increasing over time (not just a one-time event)
- **Current pending sectors** or **offline uncorrectable** counts are non-zero and growing
- **Wear level** is approaching the manufacturer's rated endurance limit
- **Read or write errors** are appearing in the device status (visible via **Get Device Status**)
- The drive is generating **repeated SMART alerts** in the system dashboard

!!! warning "Drive Errors and Tier Health"
    When a drive begins accumulating errors, the vSAN may mark it as a bad drive. This triggers automatic repair if spare capacity is available, and the tier status will change to **noredundant** or **repairing**. Do not remove the physical drive until repair completes and the tier returns to **online**.

### Per-Drive vSAN Metrics

Beyond SMART data, the vSAN tracks operational metrics for each drive:

| Metric | Description |
|---|---|
| **vsan_used / vsan_max** | Current usage versus maximum capacity for this drive in the vSAN. |
| **vsan_read_errors / vsan_write_errors** | Count of I/O errors encountered by the vSAN on this drive. |
| **vsan_max_latency** | Peak I/O latency observed on this drive. |
| **vsan_throttle** | Write throttle rate in bytes/sec. Non-zero values indicate the drive is being space-throttled. |
| **vsan_repairing** | Number of blocks currently being repaired on this drive. |
| **vsan_repair_estimate** | Estimated bytes remaining in the repair process for this drive. |

**Example -- Get Device Status output (healthy drive):**

```
device=3  status=online  vsan_used=1.4TB  vsan_max=3.6TB
vsan_read_errors=0  vsan_write_errors=0  vsan_max_latency=12ms
vsan_throttle=0  vsan_repairing=0
```

**Example -- Get Device Status output (failing drive):**

```
device=3  status=error  vsan_used=1.4TB  vsan_max=3.6TB
vsan_read_errors=47  vsan_write_errors=12  vsan_max_latency=850ms
vsan_throttle=0  vsan_repairing=2814
```

A high error count and elevated latency indicate the drive should be replaced. Wait for `vsan_repairing` to reach 0 and the tier to return to **online** before physically removing the drive.

---

## Troubleshooting Workflows

The following workflows walk through common vSAN scenarios step by step. Each starts with the symptom you are likely to see and guides you through diagnosis and resolution.

### Tier Shows "noredundant"

A **noredundant** tier has lost one or more redundant copies of data, typically due to a drive or node failure.

``` mermaid
graph TD
    A[Tier Shows Noredundant] --> B[Run Get Tier Status]
    B --> C{Node Offline?}
    C -->|Yes| D[Bring Node Back Online]
    C -->|No| E{Drive Failed?}
    E -->|Yes| F{Spare Capacity Available?}
    E -->|No| G[Check Network Connectivity]
    F -->|Yes| H[Monitor Auto-Repair Progress]
    F -->|No| I[Add Replacement Drive]
    I --> H
    H --> J[Wait for Tier to Return to Online]
```

1. **Check tier status:** Run **Get Tier Status** to confirm which tier is affected and whether repair has started.
2. **Identify the failed component:** Run **Get Device List** to look for missing or errored drives. Cross-reference with **Get Node List** to determine if a node is offline.
3. **Monitor repair progress:** If spare capacity is available, the vSAN begins repairing automatically. Use **Get Repair Status** to track progress -- watch for the progress value approaching 1.0.
4. **Avoid reboots:** Do not reboot any nodes while repair is in progress. A second failure during repair could result in data loss.
5. **Plan hardware replacement:** Once repair completes and the tier returns to **online**, replace the failed drive. After installing the new drive, add it to the vSAN through the UI and verify it appears in **Get Device List**.

!!! danger "Critical: Do Not Ignore Noredundant"
    A tier in the **noredundant** state can still serve data, but it has no safety margin. Prioritize resolving this condition before performing any maintenance that could take another node or drive offline.

---

### Unexpected vSAN Growth

When storage utilization is increasing faster than expected, use these steps to identify the cause.

1. **Get the big picture:** Run **Get Cluster Usage** to see overall utilization and **Summarize Disk Usage** for a breakdown by path.
2. **Identify top consumers:** Use **Get Top Usage Rates** to find which files or volumes are generating the most write activity.
3. **Check individual volumes:** Run **Get Volume Usage** to identify which volumes are consuming the most space.
4. **Review snapshots:** Snapshots retain the state of data at a point in time. If automatic snapshots are configured with long retention periods, they can accumulate significant storage. Review snapshot schedules and retention policies in the VergeOS UI.
5. **Check tier distribution:** Use **Get Tier Status** to see per-tier capacity. An imbalanced tier configuration (for example, most data landing on a small fast tier) can make one tier appear to grow quickly while others have available space.

!!! tip "Snapshot Accumulation"
    One of the most common causes of unexpected growth is snapshot retention. Each snapshot preserves changed blocks, so workloads with high write rates can cause snapshot space to grow rapidly. Review and adjust retention policies as part of regular capacity management.

---

### Drive SMART Warning

When VergeOS alerts you to a SMART warning on a drive, follow this workflow to assess severity and plan your response.

1. **Review the alert:** Note which SMART indicator triggered the warning and the current value.
2. **Check drive details:** Use **Get Device Status** to see the drive's current vSAN state, including read/write error counts and latency.
3. **Assess severity:**
      - **Reallocated sectors or pending sectors increasing:** The drive is actively developing bad sectors. Plan a replacement.
      - **Wear level approaching limit:** The SSD is nearing end of life. Schedule replacement during your next maintenance window.
      - **Temperature warning:** Check the physical environment -- verify cooling systems are functioning and airflow is not obstructed.
      - **Operating hours warning:** Informational only. Drives do not fail at a specific hour count, but this is a reminder to evaluate overall drive health.
4. **Check tier health:** Run **Get Tier Status** to verify the tier is still **online**. If the drive has already been marked as bad, the tier may show **noredundant** or **repairing**.
5. **Plan replacement:** If replacement is needed, ensure spare capacity is available (or add a spare drive) before removing the failing drive. Wait for repair to complete before physically swapping hardware.

!!! note "SMART Warnings Are Predictive"
    A SMART warning does not necessarily mean the drive has failed -- it means conditions suggest a failure may be approaching. Use the warning as an opportunity to proactively replace the drive on your own schedule rather than reacting to an unexpected failure.

---

### Slow I/O Performance

When workloads are experiencing higher-than-normal latency or reduced throughput, follow this workflow to isolate the cause.

``` mermaid
graph TD
    A[Slow I/O Reported] --> B[Run Get Cluster Rates]
    B --> C{Rates Below Baseline?}
    C -->|No| D[Check Individual VM / Volume]
    C -->|Yes| E{Cache Hit Rate Low?}
    E -->|Yes| F[Review Cache Sizing and Workload]
    E -->|No| G{Tier Near Capacity?}
    G -->|Yes| H[Free Space or Add Storage]
    G -->|No| I[Check Device Latency and Errors]
    I --> J[Inspect Journal and Node Health]
```

1. **Check cluster-level rates:** Run **Get Cluster Rates** to see overall read/write throughput across the cluster. Compare against your known baseline.
2. **Identify hot spots:** Use **Get Top Usage Rates** to find which files or volumes are generating the most I/O activity. A single busy workload can saturate a tier.
3. **Review cache efficiency:** Run **Get Cache Info** to check cache hit rates. A low hit rate means more reads are going to disk, increasing latency. See the [Cache Diagnostics](#cache-diagnostics) section above for interpretation guidance.
4. **Check for write throttling:** Run **Get Tier Status** and look for the **outofspace** state. When a tier is low on free space, the vSAN throttles writes to prevent filling completely. Throttling begins at approximately 91% capacity (adding ~10ms latency) and becomes more aggressive above 96% (~50ms latency). Check individual drives via **Get Device Status** for non-zero throttle values.
5. **Inspect individual devices:** Use **Get Device Usage** and **Get Device Status** for drives in the affected tier. Look for high latency values, elevated error counts, or uneven usage distribution.
6. **Check the journal:** Run **Get Journal Status** to verify the journal is progressing normally. A stalled journal can block all writes.
7. **Review node health:** Use **Get Node List** and **Get Node Info** to check whether any nodes are degraded. Network issues between nodes can increase replication latency.

!!! tip "Establishing a Baseline"
    Run **Get Cluster Rates** and **Get Cache Info** periodically during normal operations and record the results. Having a known-good baseline makes it much easier to spot anomalies when performance issues arise.

**Example -- Get Cluster Rates output (normal):**

```
read_rate=245MB/s  write_rate=128MB/s  iops_read=12400  iops_write=6800
```

---

## Best Practices

### Preventive Maintenance

- **Regular Health Checks:** Monitor cluster usage, repair status, and device health
- **Performance Monitoring:** Track cluster rates and top usage patterns
- **Integrity Verification:** Schedule periodic integrity checks during maintenance windows
- **Capacity Planning:** Regularly review usage trends and growth patterns
- **SMART Monitoring:** Review drive health indicators regularly and act on warnings before they become failures
- **Snapshot Hygiene:** Periodically audit snapshot retention policies to prevent unexpected storage growth

---

## Diagnostic Commands Reference

??? note "Alphabetical Command Reference"

    All commands below are accessed through the **Query** dropdown in **System --> vSAN Diagnostics**. The CLI syntax column shows the equivalent command for SSH execution. Enable **"Show Command"** in the UI to confirm the exact syntax for your VergeOS version.

    ### Query Commands

    | UI Command | Purpose | CLI Syntax |
    |---|---|---|
    | **Find Inode** | Locate a specific inode in the vSAN filesystem. **Parameter:** Inode Number | `vcmd findinode [INODE_NUMBER]` |
    | **Get Cache Info** | Display read cache statistics and hit rates | `vcmd getcacheinfo` |
    | **Get Clients** | Show active vSAN client connections | `vcmd getclients` |
    | **Get Cluster Rates** | Display cluster-wide I/O throughput rates | `vcmd getclusterrates` |
    | **Get Cluster Usage** | Show storage utilization by tier | `vcmd getclusterusage` |
    | **Get Current Master** | Identify the current vSAN master node | `vcmd getcurmaster` |
    | **Get Device List** | List all storage devices in the vSAN | `vcmd getdevicelist` |
    | **Get Device Status** | Show detailed status for a specific device. **Parameter:** Device ID | `vcmd getdevicestatus [DEVICE_ID]` |
    | **Get Device Usage** | Show usage statistics for a specific device. **Parameter:** Device ID | `vcmd getdeviceusage [DEVICE_ID]` |
    | **Get File Status** | Retrieve inode info, tier, and size for a file. **Parameter:** File Path | `vcmd stat [FILE_PATH]` |
    | **Get Fuse Info** | Display FUSE filesystem mount and operation statistics | `vcmd getfuseinfo` |
    | **Get Integ Check Status** | Show integrity check progress and results | `vcmd getintegcheckstatus` |
    | **Get Journal Status** | Display journal state, transaction counter, and redundancy | `vcmd getjournalstatus` |
    | **Get Node Device List** | List devices on a specific node. **Parameter:** Node ID | `vcmd getnodedevicelist [NODE_ID]` |
    | **Get Node Info** | Show detailed information about a specific node. **Parameter:** Node ID | `vcmd getnodeinfo [NODE_ID]` |
    | **Get Node List** | List all nodes in the vSAN cluster | `vcmd getnodelist` |
    | **Get Path from Inode** | Resolve an inode number to a filesystem path. **Parameter:** Inode Number | `vcmd getpathfromino [INODE_NUMBER]` |
    | **Get Read Ahead** | Show read-ahead caching configuration | `vcmd getreadahead` |
    | **Get Repair Status** | Display repair progress, block counts, and bad drive count | `vcmd getrepairstatus` |
    | **Get Running Conf** | Show the active vSAN running configuration | `vcmd getrunningconf` |
    | **Get Sync List** | List active site-sync connections | `vcmd getsynclist` |
    | **Get Tier Device Maps** | Show device distribution maps for a tier. **Parameter:** Tier Number | `vcmd gettierdevicemaps [TIER]` |
    | **Get Tier Node Maps** | Show node distribution maps for a tier. **Parameter:** Tier Number | `vcmd gettiernodemaps [TIER]` |
    | **Get Tier Status** | Show health, usage, and capacity for all tiers | `vcmd gettierstatus` |
    | **Get Top Usage Rates** | Identify top I/O consumers (hottest files) | `vcmd gethighusagerate` |
    | **Get Usage** | Display general vSAN usage statistics | `vcmd getusage` |
    | **Get Volume Usage** | Show per-volume storage usage | `vcmd getvolusage` |
    | **Summarize Disk Usage** | Summarize disk usage for a path. **Parameter:** Path | `vcmd du [PATH]` |

    ### Action Commands

    | UI Command | Purpose | CLI Syntax |
    |---|---|---|
    | **Integ Check** | Start a full integrity check across the vSAN | `vcmd integcheck` |
    | **Integ Check Device** | Start an integrity check on a specific device. **Parameter:** Device ID | `vcmd integcheckdevice [DEVICE_ID]` |

    !!! warning "Performance Impact"
        Integrity checks can significantly impact system performance and should be scheduled during maintenance windows.

    ### Finding Parameter Values

    Several commands require a Device ID, Node ID, or other identifier. Use these commands to find the value you need:

    - **Device ID:** Run **Get Device List** (`vcmd getdevicelist`) or check the Drives section in the dashboard
    - **Node ID:** Run **Get Node List** (`vcmd getnodelist`) or check the Nodes section in the dashboard
    - **Inode Number:** Found in vSAN error alerts or by running **Get File Status** on a known path

## Related Topics

- [**vSAN Architecture**](/product-guide/storage/vsan-architecture) -- understand the block-level operations and data distribution that diagnostic commands inspect.
- [**Storage Tiers**](/product-guide/storage/storage-tiers) -- tier health states, tier selection, and live migration details.
- [**vSAN Redundancy Levels**](/product-guide/storage/vsan-redundancy-levels) -- how self-healing and repair processes work.
- [**Capacity Planning**](/product-guide/storage/capacity-planning) -- sizing guidance and monitoring thresholds to prevent capacity issues.
- [**vSAN Health Monitoring**](/product-guide/storage/vsan-health-monitoring) -- proactive monitoring checklists and dashboard interpretation to catch issues before they need diagnostics.
- [**Subscriptions & Alerts**](/product-guide/system/subscriptions-overview) -- set up proactive alerting so issues are caught before they require reactive diagnostics.

!!! question "Need Help?"
    For complex vSAN issues or performance optimization guidance, contact [VergeOS Support](mailto:support@verge.io) with detailed diagnostic output and system configuration information.

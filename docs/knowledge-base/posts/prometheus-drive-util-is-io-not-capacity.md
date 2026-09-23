---
title: Drive Utilization Over 100% in Prometheus or Grafana Is an I/O Metric, Not Drive Fullness
slug: prometheus-drive-util-is-io-not-capacity
description: The vergeos_drive_util metric from the VergeOS Prometheus exporter measures how busy a drive is with I/O, not how full it is, so it can read above 100% and is usually highest on the Tier 0 drive. Here is what it means and which metric to alert on for capacity.
author: Carl Rodabaugh
draft: false
date: 2026-09-23
semantic_keywords:
  - "vergeos drive utilization over 100 percent grafana"
  - "vergeos_drive_util meaning"
  - "prometheus vergeos drive full tier 0"
  - "one drive per node at 100 percent vsan not rebalancing"
  - "alert on vsan tier used percentage prometheus"
use_cases:
  - interpret_vergeos_prometheus_drive_metrics
  - alert_on_vsan_tier_capacity
  - troubleshoot_drive_utilization_alert
tags:
  - prometheus
  - grafana
  - monitoring
  - exporter
  - metrics
  - vsan
  - tier 0
  - drive utilization
  - drive utilisation
  - capacity
  - alerts
  - troubleshooting
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2026-09-23
---

# Drive Utilization Over 100% in Prometheus or Grafana Is an I/O Metric, Not Drive Fullness

## Overview

!!! info "Key Points"
    - `vergeos_drive_util` measures how busy a drive is with I/O. It does not measure how full the drive is.
    - The value can read above 100%. That's not an error and doesn't mean the drive is out of space.
    - The Tier 0 drive on each controller node is normally the busiest drive in the node, so it's the one that reads highest.
    - For capacity alerts, use `vergeos_vsan_tier_used_pct` or a VergeOS Storage Tiers subscription instead.

If you monitor VergeOS with the Prometheus exporter and Grafana, you may see one drive per node at or above 100% "drive utilization" while the other drives in that node sit near 0%. It looks like a full drive, or like vSAN has stopped spreading data across the tier. It's neither. This article explains what the metric measures and what to watch for capacity instead.

## Symptoms

- A Grafana panel or alert built on `vergeos_drive_util` shows one drive on each controller node at or above 100%, often in red:

    ```
    Drive utilisation    102%
    Drive utilisation    101%
    ```

- The other drives on the same nodes read between 0% and 2%.
- The high drive is the Tier 0 drive (the panel's `tier` label reads `0`).
- VergeOS itself shows no alarm, no log entry, and no repair activity. The high figure only appears in your dashboard.

## Why This Happens

The exporter lists `vergeos_drive_util` under its storage metrics, next to drive read and write operations. It's an I/O gauge that reflects how much work the drive is doing, not how much space is used on it. The VM-level equivalent, `vergeos_vm_disk_util`, is described in the exporter's metric list as an "I/O utilization percentage", and the drive metric works the same way. Drive wear is a separate metric, `vergeos_drive_wear_level`.

Because the value tracks I/O activity rather than a share of the drive's size, it isn't capped at 100%. A reading above 100% just means the drive is very busy.

Tier 0 is the vSAN metadata tier. It lives only on the controller nodes, usually as one dedicated NVMe drive per node, and it handles the vSAN metadata for that node on its own. The data tiers spread their work across several drives. So the single Tier 0 drive is routinely the busiest drive in the node, while the data drives look almost idle by comparison. That's the pattern that reads as "one drive is full."

!!! tip "Quick way to confirm"
    Compare the drive panel against the tier's real fill level. If your panel shows the Tier 1 drives at under 2% but `vergeos_vsan_tier_used_pct` for Tier 1 reads, say, 58%, the drive panel can't be a capacity figure.

## Resolution

1. Check the tier's actual fill level with `vergeos_vsan_tier_used_pct` (or `vergeos_vsan_tier_used` against `vergeos_vsan_tier_capacity`). These metrics are labeled by `system_name`, `tier`, and `description`.
2. Move any "drive full" alert off `vergeos_drive_util` and onto `vergeos_vsan_tier_used_pct`.
3. If you'd rather have VergeOS alert you directly, create a Storage Tiers subscription from **System** → **Subscriptions** → **New**, with the Target Type set to Storage Tiers. The default High Usage threshold is 80%, and you can add a second subscription for a critical alert at 90%.
4. Keep `vergeos_drive_util` on a performance panel if it's useful to you, next to read and write operations and `vergeos_drive_service_time`, and read it as I/O load.

5. To see how full an individual drive is, go to **Infrastructure → Nodes**, select the node, and read the **Usage** column in the **Drives** panel. Opening a drive shows the same figure as **Used** under **vSAN Status**.

## Troubleshooting

!!! warning "When it really is a space problem"
    - Problem: The tier itself is close to full.
      - Solution: A genuinely full tier shows up in `vergeos_vsan_tier_used_pct` and in `vergeos_vsan_cur_space_throttle_ms` going above 0. Neither depends on `vergeos_drive_util`. See the Storage Tiers article below for recommended free space on each tier.
    - Problem: You're worried the Tier 0 drive is wearing out.
      - Solution: Check `vergeos_drive_wear_level` for that drive. Wear is a separate measurement from utilization.

## Additional Resources

- [Prometheus Exporter](https://docs.verge.io/automate-protect-and-extend/integrations-and-apis/prometheus-exporter), which links to the exporter's full metric list
- [Creating Subscriptions](https://docs.verge.io/run-the-platform/system-administration/subscriptions-overview), for Storage Tier usage alerts
- [Storage Tiers in VergeOS vSAN](https://docs.verge.io/run-the-platform/storage/storage-tiers), for what Tier 0 holds and free-space guidance

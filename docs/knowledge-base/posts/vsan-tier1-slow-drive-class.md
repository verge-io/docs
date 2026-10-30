---
title: "vSAN \"because tier N slow\" Messages and VM Stalls: Check the Tier's Drive Class"
slug: vsan-tier1-slow-drive-class
description: Repeated vSAN "because tier N slow" log messages mean the named tier is falling behind on writes. One cause is drives whose endurance class doesn't fit the tier, such as read-optimized SSDs placed in Tier 1. Here's how to check for it and what to do.
author: Carl Rodabaugh
draft: false
date: 2026-10-30
semantic_keywords:
  - "adding meta tier 0 snapshot because tier 1 slow"
  - "removing slow tier 0 snapshot of trans"
  - "vsan slow write to tier ms"
  - "vm stops responding for a few seconds network looks fine vergeos"
  - "voip sip calls drop retransmit vergeos vm storage latency"
  - "tier 1 drives read-optimized ssd endurance dwpd vsan performance"
use_cases:
  - troubleshoot_vsan_tier_slow_messages
  - diagnose_intermittent_vm_stalls
  - validate_vsan_tier_drive_selection
tags:
  - vsan
  - storage
  - tiers
  - tier 1
  - ssd
  - endurance
  - performance
  - latency
  - troubleshooting
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2026-10-30
---

# vSAN "because tier N slow" Messages and VM Stalls: Check the Tier's Drive Class

A latency-sensitive VM keeps stalling for a second or two at a time, the network tests clean, and the node logs fill with "because tier N slow" messages. Those messages mean the named tier is falling behind on writes. One cause is a tier built on drives whose endurance class doesn't fit it, such as read-optimized SSDs placed in Tier 1. This article covers how to check for that and what to do about it.

## Overview

!!! info "Key Points"
    - "Because tier N slow" means tier N is behind on writes. Check the tier the message names. It isn't always Tier 1.
    - Several things can slow a tier: a failing drive, a nearly full tier, a heavy scheduled workload, or drives whose class doesn't match the tier.
    - Tier 1 is documented as high-endurance NVMe SSD storage for write-intensive workloads. The sizing guide also permits enterprise SAS or SATA SSDs in a primary vSAN tier when they meet its endurance floor of at least 1 drive write per day (DWPD). Where the two differ, confirm the intended design with VergeOS Support before changing drive classes.
    - Tier 2 is for mixed workloads on mid-range SSDs. Tier 3 is for read-intensive workloads on read-optimized SSDs.
    - A storage stall can reach you as a network or application complaint, so correlate the timestamps before blaming either side.

## Symptoms

A VM with a tight response deadline stops answering for a second or two, then recovers. A storage stall can present to users as an application or network timeout: the guest may not respond promptly even when basic network-path tests are clean. Correlate the VM stall timestamps with the slow-tier log lines and the node's storage metrics before you attribute the incident to storage.

Affected nodes may log lines like these:

```
[JOURNAL] Adding meta tier 0 snapshot of trans <N> because tier 1 slow
[JOURNAL] Removing slow tier 0 snapshot of trans <N>
Slow write to tier <T>, <N> ms.
```

These messages are an internal vSAN response to a lagging tier. Treat the tier number after "because tier" as the one to investigate, and don't assume Tier 0 itself is the bottleneck. Tier 0 is the dedicated metadata tier and shouldn't be repurposed for workload storage.

You may also see a drive warning on the System Dashboard:

```
VSAN drive has a warning status: reallocated sectors exceeded maximum threshold(s).
```

## Why It Happens

When a tier can't keep up with incoming writes, write latency can rise enough to affect deadline-sensitive workloads.

A tier can fall behind for several reasons, and each one has a different fix:

- A failing drive in the tier
- A tier that's nearly full
- A heavy scheduled workload, such as backups, running during the stalls
- Drives whose endurance class doesn't fit the tier

The last cause is the one this article focuses on. The Storage Tiers page describes Tier 1 as high-endurance NVMe SSDs for write-intensive workloads, Tier 2 as mid-range SSDs for mixed workloads, and Tier 3 as read-optimized SSDs for read-intensive workloads. The Node Sizing Guide adds a floor for all workload tiers: enterprise media only, with at least 1 DWPD for write-oriented or general-purpose media. It also permits enterprise SAS or SATA SSDs in a primary vSAN tier when they meet that floor. Treat 1 DWPD as a minimum, not as proof that any SSD belongs in Tier 1, and where the two pages differ, confirm the intended design with VergeOS Support.

During installation, VergeOS shows an automatically detected tier for each drive, and you can change it in the next dialog. If drives detected as a read-optimized tier are moved into Tier 1, that tier can fall behind under sustained writes.

This tends to be a chronic condition rather than a one-off spike. If the "tier slow" messages appear around the clock, lining one up with the timestamp of a single incident is consistent with the cause but doesn't prove it on its own.

## How to Check for It

1. **Note which tier the messages name.** The number in "because tier N slow" and "Slow write to tier N" is the lagging tier. Check that tier in the steps below. It may not be Tier 1.
2. **Confirm the VM drive's intended placement.** Check its **Preferred Tier**. If it's set to default, check **System → Settings → Advanced → Default VM drive tier**. Treat this as the drive's first-choice tier, not proof that every block is stored there; VergeOS can fall back to other tiers when necessary.
3. **Rule out capacity.** Go to **Infrastructure → vSAN Tiers** and check usage on the lagging tier. At 80% used or higher (the default High Usage alert level), investigate capacity right away. That threshold is an alert level, not proof that capacity is causing the latency, but a nearly full tier slows down for different reasons.
4. **Check SMART on the tier's drives.** Go to **Infrastructure → Nodes**, select the node, click **Diagnostics**, and run **S.M.A.R.T. Information** on each drive in the tier. A failing drive is a different problem with a different fix.
5. **List the drives in the tier.** Open the tier from **Infrastructure → vSAN Tiers** and review its **Drives**. You can also check each node under **Infrastructure → Nodes → Drives**, where the **Model**, **Tier**, and **Bus** columns show what each drive is and where it sits.
6. **Look up each drive model's endurance class.** Check the manufacturer's data sheet for the DWPD rating and intended use. Read-optimized or low-endurance models in Tier 1 don't fit its write-intensive role. If Tier 1 uses SAS or SATA SSDs, check they meet the sizing guide's endurance floor, and confirm the design with Support.
7. **Spot-check the logs.** In the same node **Diagnostics** view, run the **Logs** query and look for lines containing `because tier` or `Slow write to tier`. This shows recent lines only, so don't use it to judge how often the messages appear.
8. **Send in a system diagnostics report.** If the drive class looks wrong, or the messages continue and you can't find a cause, generate a system diagnostics report and open a ticket. Support can compare each drive's assigned tier against the tier VergeOS detected for it, check per-drive write latency, and count the slow-tier messages over time.

!!! note "About the reallocated-sectors warning"
    The default maximum reallocated-sector setting is 1, so two or more remapped sectors raise this warning by default (see **Advanced System Settings**). Check the actual count in SMART before replacing a drive. A small count alone doesn't prove that the drive is causing tier-wide slowness, but it is evidence of media degradation. Assess it together with SMART history, error counts, write latency, and the timing of the slow-tier messages.

## Resolution

If the drive class is the cause, the fix is drives suited to the tier's write load. Replacing drives or relocating workloads can reduce the pressure, but relabeling the same slow drives as a different tier doesn't increase their endurance or performance.

1. **Open a ticket before buying drives.** Include a system diagnostics report. Support will confirm the cause and plan adding the new drives and removing the old ones as one job, including where the new drives go and how VM drives move onto them.
2. **Choose drives for the tier's role, with Support.** Tier 1 is documented as high-endurance NVMe for write-intensive work; the sizing guide also permits enterprise SAS or SATA SSDs that meet its 1 DWPD floor. Where the documents differ, confirm the design with Support before buying. Drives in the same tier should be alike in size and type.
3. **Carry out the plan with Support.** Adding drives follows the Scaling Up a vSAN process. Removing drives is support-assisted.

!!! danger "Drive removal is support-assisted"
    Removing drives from a vSAN tier isn't a self-service operation. Done in the wrong order, it can leave the tier degraded. Plan the removal with VergeOS Support before you pull or reassign any drive (see Scaling Down a vSAN).

!!! warning "Consumer-grade drives"
    VergeOS doesn't support consumer-grade disks in production. If any tier uses them, plan to replace them as part of the same work.

## When to Contact Support

Contact VergeOS Support, and include a system diagnostics report, if:

- The tier's drives fit its class, SMART is clean, capacity is fine, and the "tier slow" messages continue.
- You plan to add, remove, or reassign drives to fix a tier's drive class.
- VMs show I/O errors along with the stalls.

## Additional Resources

- [Storage Tiers in VergeOS vSAN](https://docs.verge.io/run-the-platform/storage/storage-tiers)
- [Node Sizing Guide](https://docs.verge.io/plan-and-deploy/implementation-guide/sizing)
- [Installation Guide (drive tier assignments)](https://docs.verge.io/plan-and-deploy/implementation-guide/installation-guide)
- [Preferred Tier](https://docs.verge.io/run-the-platform/storage/preferred-tiers)
- [Node Diagnostics Guide](https://docs.verge.io/run-the-platform/system-administration/node-diagnostics)
- [Advanced System Settings](https://docs.verge.io/run-the-platform/system-administration/advanced-system-settings)
- [Creating Subscriptions (High Usage alerts)](https://docs.verge.io/run-the-platform/system-administration/subscriptions-overview)
- [Drive Replacement](https://docs.verge.io/run-the-platform/operations/drive-replacement)
- [Scaling Up a vSAN](https://docs.verge.io/knowledge-base/storage-vsan/scaling-up-a-vsan)
- [Scaling Down a vSAN](https://docs.verge.io/knowledge-base/storage-vsan/scaling-down-a-vsan)
- [Generating System Diagnostics](https://docs.verge.io/knowledge-base/troubleshooting/generating-system-diagnostics)

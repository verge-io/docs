---
title: "vSAN Writes Fail with \"No space left on device\" While the Tier Shows Free Space (Mixed Drive Sizes)"
slug: vsan-mixed-drive-sizes-no-space-left
description: When a vSAN tier mixes drive sizes, the tier can only use each drive up to the size of the smallest one. Writes can fail with "No space left on device" while the tier percentage still looks healthy. Here is how to confirm it and what to do.
author: Carl Rodabaugh
draft: false
date: 2026-10-30
semantic_keywords:
  - "vsan no space left on device tier not full"
  - "error writing block to tier no space left on device"
  - "out of user space on device vsan"
  - "vm stopped block io error nospace"
  - "mixed drive sizes vsan tier capacity smallest drive"
  - "vsan tier percentage low but writes fail"
use_cases:
  - troubleshoot_vsan_out_of_space_with_free_tier_capacity
  - diagnose_mixed_drive_sizes_in_vsan_tier
  - plan_vsan_scale_up_drive_sizes
tags:
  - vsan
  - storage
  - tiers
  - capacity
  - drives
  - scale up
  - no space left on device
  - troubleshooting
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2026-10-30
---

# vSAN Writes Fail with "No space left on device" While the Tier Shows Free Space (Mixed Drive Sizes)

VMs stop and writes fail with "No space left on device", yet the vSAN tier reports something like 58% or 68% used. If that tier has drives of different sizes, the tier may have used up the space it can actually allocate, even though it doesn't look full. This article shows how to confirm it and how to get space back.

## Overview

!!! info "Key Points"
    - All drives in a tier should be the same capacity. When sizes are mixed, the tier can only use each drive up to the size of the smallest drive.
    - In this situation the tier's usage figure can show much more free space than the drives can actually take.
    - Check each drive's vSAN used and max values, not the tier percentage. Free space by expiring old snapshots and turning on **Discard** with a guest TRIM, then plan matching-size drives.

## Symptoms

Writes fail across the system and VMs stop. Logs show lines like these:

```
ybvsan: Error writing block to tier <T>: (28) No space left on device
ybvsan: OUT OF USER SPACE!! on device <N>: (28) No space left on device
ybvsan: [CACHE] writepage error ino <N>, buffering...: (28) No space left on device
appserver: {"event":"BLOCK_IO_ERROR","data":{"nospace":true,"node-name":"drive<N>","reason":"No space left on device","operation":"write","action":"stop"}}
appserver: (<node>) [Virtual Machine '<VM>'] VM drive drive<N> error during write
```

Outgoing site syncs can fail at the same time:

```
appserver: (<node>) [Site '<site>'] [Outgoing sync] (-28) An error has occurred while syncing '<snapshot>': No space left on device
```

That sync error may also reflect space pressure on the *receiving* system. If your local logs show no write errors, only sync failures, check the receiving system's capacity before you delete anything locally.

Meanwhile, everything else looks healthy. All nodes are online, the tier is redundant, **Unavailable Drives** is zero when you check it, and the tier's usage percentage is well below 100%.

## Why It Happens

The [Scaling Up a vSAN](https://docs.verge.io/knowledge-base/storage-vsan/scaling-up-a-vsan) article states the rule: all drives in a tier must be alike, and if a drive of a different size is added, the tier can only use the space of the smallest drive. In practice, a larger drive fills to the same point as the smaller drives beside it and stops there. The rest of that drive is unreachable.

vSAN also spreads data evenly across the nodes in a tier (see [vSAN Architecture](https://docs.verge.io/run-the-platform/storage/vsan-architecture)). When the drives on one node reach their limit, writes to the tier start failing, even if other drives still have room.

In affected mixed-size tiers, the tier summary can show much more free space than the per-drive limit allows, so a tier can show 58% used while the smaller drives are close to full. Confirm it from each drive's vSAN used and max values rather than treating the tier percentage as the answer.

As a planning approximation, not a supported capacity calculation, the raw space a node can use in the tier is roughly:

```
number of drives in the tier on that node × size of the smallest drive anywhere in the tier
```

The node with the lowest result tends to set the practical limit for the tier. This is raw space. Redundant copies of your data come out of it, so the space available for your data is lower. Check the real limit against each drive's vSAN max and the tier status.

## What to Check

1. For each node, go to **Nodes**, open the node, select **Drives**, and note the size of every drive in the tier named in the error (the `tier <T>` value). If they aren't all the same size, keep going.
2. Check per-drive usage. Open each drive in that tier and compare its vSAN used value to its vSAN max. Keep the physical size from step 1 as context, but judge how full a drive is from the vSAN values. Smaller drives near their max while the tier reads in the 50s or 60s point to this issue. **System → vSAN Diagnostics → Get Device Status** shows the same per-drive state (see [vSAN Diagnostics](https://docs.verge.io/run-the-platform/storage/vsan-diagnostics)).
3. Go to **Infrastructure → vSAN Tiers** and double-click the tier. Confirm **Repairs** is 0, **Unavailable Drives** is 0 (called **Bad Drives** in the linked article), and **Redundant** is checked. Those values make an active drive loss or repair less likely and fit a capacity diagnosis, but on their own they don't rule out every storage or workload issue. These values can be briefly non-zero or unchecked during a journal walk, which [vSAN Tier Status (Journal Walks)](https://docs.verge.io/knowledge-base/storage-vsan/understanding-journal-walks-and-vsan-tier-status) explains along with each field.

## Resolution

### Free space now

1. **Review older, never-expiring, and heavily changed snapshots first.** A snapshot starts out identical to its source and costs more space as the data diverges, so the cost depends on how much has changed, not on age alone (see [System Snapshots](https://docs.verge.io/automate-protect-and-extend/backup-and-dr/system-snapshots)). Review **System → System Snapshots** for snapshots set to never expire or kept longer than you need, and remove what you can. Before you delete one, make sure it isn't queued or actively syncing to a DR site. Deleting it mid-sync aborts that transfer, and the snapshot never arrives on the other side. Removing a snapshot is permanent, so confirm you don't need it as a restore point first. Immutable snapshots can't be deleted until they're unlocked and their waiting period has passed (see [Immutable Snapshots](https://docs.verge.io/automate-protect-and-extend/backup-and-dr/immutable-snapshots)), so start with the ones you can remove now.
2. **Expect a delay.** vSAN frees deleted blocks in the background, so used space drops over time, not the moment you delete (see [vSAN Deletion Process](https://docs.verge.io/run-the-platform/storage/vsan-deletion-process)).
3. **Turn on Discard on VM drives where it's off, then run a TRIM inside the guest.** Without Discard, files deleted inside the guest don't return space to the vSAN, so usage only climbs. Discard works on drives that use the **virtIO-SCSI** or **SATA** interface and sit on a solid-state tier (usually tier 1–3). Turning it on doesn't reclaim space that's already free inside the guest; a TRIM does that (`Optimize-Volume -DriveLetter <letter> -ReTrim` on Windows, `sudo fstrim -av` on Linux). See [Virtual Drive TRIM](https://docs.verge.io/knowledge-base/virtual-machines/virtual-drive-trim).

[Understanding and Explaining Unexpected vSAN Growth](https://docs.verge.io/knowledge-base/storage-vsan/understanding-and-explaining-unexpected-vsan-growth) lists other places space builds up, such as files, incoming syncs, and tenants. Use its checklist of causes.

### Fix the capacity long term

- **Add capacity only in balanced, consistently sized sets.** [Scaling Up a vSAN](https://docs.verge.io/knowledge-base/storage-vsan/scaling-up-a-vsan) requires all drives in a tier to be alike, and a drive larger than the tier's smallest adds only as much space as that smallest drive. So adding larger drives while the small ones remain doesn't unlock the unused space on the large ones. Add drives in equal numbers across the nodes, as [vSAN Architecture](https://docs.verge.io/run-the-platform/storage/vsan-architecture) describes. Follow the [vSAN Scale Up SOP](https://docs.verge.io/run-the-platform/operations/vsan-scale-up-sop) for the procedure itself.
- **When checking the 30% free-space rule before scaling up, validate each drive's effective headroom as well as the tier summary.** A tier that shows 58% used can have smaller drives that are already below 30% free.
- **To use the full size of larger drives, the smaller drives have to be replaced.** Removing drives from a tier isn't a self-service operation (see the [vSAN Scale Up SOP](https://docs.verge.io/run-the-platform/operations/vsan-scale-up-sop)), and it needs free space to move data onto, so contact VergeOS support to plan the replacement.

## When to Contact Support

Contact VergeOS support, and include a system diagnostics report ([Generating System Diagnostics](https://docs.verge.io/knowledge-base/troubleshooting/generating-system-diagnostics)), if:

- Writes are still failing after you've freed space and the background cleanup has had time to run.
- **Repairs** or **Unavailable Drives** stays above 0, or **Redundant** stays unchecked, after the current journal walk finishes.
- You want to replace the smaller drives in a tier.

## Additional Resources

- [Scaling Up a vSAN](https://docs.verge.io/knowledge-base/storage-vsan/scaling-up-a-vsan)
- [vSAN Scale Up SOP](https://docs.verge.io/run-the-platform/operations/vsan-scale-up-sop)
- [vSAN Diagnostics](https://docs.verge.io/run-the-platform/storage/vsan-diagnostics)
- [vSAN Tier Status (Journal Walks)](https://docs.verge.io/knowledge-base/storage-vsan/understanding-journal-walks-and-vsan-tier-status)
- [Understanding and Explaining Unexpected vSAN Growth](https://docs.verge.io/knowledge-base/storage-vsan/understanding-and-explaining-unexpected-vsan-growth)

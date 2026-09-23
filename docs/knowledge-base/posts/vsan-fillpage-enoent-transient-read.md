---
title: "Isolated vSAN \"Error reading block ... from all sources\" Warning Is a Transient Read"
slug: vsan-fillpage-enoent-transient-read
description: A single vSAN FillPage or "Error reading block ... from all sources" warning with an empty repair queue and no bad drives is a transient read, and no data was lost. Here is what to check and when to contact support.
author: Carl Rodabaugh
draft: false
date: 2026-09-23
semantic_keywords:
  - "ybvsan fillpage error no such file or directory"
  - "error reading block from all sources tier"
  - "vm drive error during write input/output error vsan"
  - "vsan block read error no data loss repairs 0"
  - "windows event 153 io operation retried vergeos"
use_cases:
  - troubleshoot_vsan_block_read_warning
  - confirm_no_data_loss_after_vsan_error
  - monitor_vsan_tier_health
tags:
  - vsan
  - storage
  - tiers
  - repairs
  - fillpage
  - block read error
  - input/output error
  - troubleshooting
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2026-09-23
---

# Isolated vSAN "Error reading block ... from all sources" Warning Is a Transient Read

A VM logs a drive write I/O error, and in the same second vSAN logs a block it couldn't read. If the tier's repair queue is empty and no drives are bad, the read succeeded on retry and nothing was lost. This article shows how to confirm that and when to contact support.

## Overview

!!! info "Key Points"
    - A single FillPage or "Error reading block ... from all sources" warning, with **Repairs** at 0 and **Unavailable Drives** at 0, is a transient read. No data was lost.
    - The repair queue is what separates a transient read from real data loss. When vSAN finds a block genuinely missing, it queues a repair.
    - Contact support if a repair is queued, the error repeats, or VMs show ongoing I/O errors.

## Symptoms

The vSAN lines arrive together, usually within the same second, alongside a VM drive event:

```
<VM> VM drive drive<N> error during write: Input/output error
ybvsan: FillPage error for block <N> ino <N> tier <T> hashsrc 0: (2) No such file or directory
ybvsan: Error reading block <SHA1> from all sources tier <T> in <N>ms: (2) No such file or directory
```

On a Windows guest, the System log may show a matching retry warning at the same time:

```
Event ID 153, source: disk, level: Warning
The IO operation at logical block address <LBA> for Disk <N> was retried.
```

The guest keeps running. There's no crash and no filesystem error after the retry.

## Why It Happens

These lines describe one event, not three. `(2) No such file or directory` means the block wasn't found at the moment of that read. It isn't a drive media error, which is why every drive can be healthy while the warning appears. The guest retried the I/O and the retry succeeded.

`hashsrc 0` is the first copy vSAN tried to read from. It doesn't refer to Tier 0 or to a pending repair.

## What to Check

1. Go to **Infrastructure → vSAN Tiers** and open the tier named in the error (the `tier <T>` value).
2. Confirm **Repairs** is 0. This field counts missing data blocks detected on the tier. If vSAN had actually lost a block, it would show here.
3. Confirm **Unavailable Drives** is 0 and **Redundant** is checked.
4. On a Windows guest, check the System log around the timestamp. An Event ID 153 retry with no NTFS or other disk errors afterward means the retry succeeded.

If all of those check out, no data was lost and no action is needed. You don't need to change snapshot schedules, adjust timeouts, or upgrade to clear this warning.

!!! note "Right after maintenance"
    A non-zero Repairs or Unavailable Drives count is normal for a short time after a node reboot, maintenance, or an update, while the Journal Walk catches up. Wait for the walk to finish before judging the count.

## When to Contact Support

Contact VergeOS support, and include a sysdiag, if any of these apply:

- **Repairs** stays above 0 after the current Journal Walk completes.
- **Unavailable Drives** is above 0 with no nodes offline.
- **Redundant** stays unchecked.
- The same error repeats often, or appears on several VMs close together.
- A VM shows ongoing I/O errors, filesystem errors, or data it can't read back.

!!! warning "Not a site sync error"
    The Snapshot Synchronization Errors Explained article (linked below) lists a similar-looking string, `Error walking tier 3 refs: (2) No such file or directory`. That one comes from site sync between two systems and has a different cause. It doesn't apply to a local VM drive error.

## Additional Resources

- [vSAN Tier Status (Journal Walks)](/knowledge-base/storage-vsan/understanding-journal-walks-and-vsan-tier-status)
- [Generating System Diagnostics](/knowledge-base/troubleshooting/generating-system-diagnostics)
- [Snapshot Synchronization Errors Explained](/knowledge-base/backup-dr/snapshot-synchronization-errors-explained)

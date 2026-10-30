---
title: "Replacement Drive Shows \"Device is empty\" and Won't Join the vSAN"
slug: vsan-replacement-drive-device-empty
description: After a hot swap, a replacement vSAN drive can stay offline with "Device is empty, need to call formatdevice or newdevice first" even after Format and Initialize. A controlled node reboot from the UI, followed by repeating the replacement action, can clear it.
author: Carl Rodabaugh
draft: false
date: 2026-10-30
semantic_keywords:
  - "vsan drive is offline device is empty need to call formatdevice or newdevice first"
  - "replacement drive offline won't join vsan after hot swap"
  - "new drive stays offline after format and initialize"
  - "reboot node then format replacement drive vsan"
  - "hot swapped drive not recognized vergeos"
use_cases:
  - troubleshoot_replacement_drive_offline
  - detect_hot_swapped_drive
  - complete_vsan_drive_replacement
tags:
  - vsan
  - storage
  - drives
  - hot swap
  - drive replacement
  - device is empty
  - troubleshooting
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2026-10-30
---

# Replacement Drive Shows "Device is empty" and Won't Join the vSAN

This is a troubleshooting step, not the normal replacement workflow. If the normal same-slot procedure (**Format**, wait for it to finish, then **Initialize**) has completed but the drive stays **Offline** with a "Device is empty" message, a controlled node reboot can resolve this condition when repeating Format and Initialize alone has not. After the node comes back, repeat the replacement action.

## Overview

!!! info "Key Points"
    - This applies only after Format and Initialize haven't cleared it. Before formatting, a same-slot replacement is expected to show Offline, so run Format and Initialize first if you haven't.
    - The message alone doesn't prove the replacement drive is bad, but it doesn't rule out compatibility, seating, controller, or drive-health problems either.
    - Check the drive is compatible and fully seated, reboot the node, then repeat the replacement action. Only reboot while the node is in Maintenance Mode, with all other nodes online and no drive repair running on another node in the same tier.

## Symptoms

After a hot swap, the replacement drive stays **Offline** and doesn't join the vSAN. Running **Format** and **Initialize** on it doesn't change anything. The drive shows this status:

```
VSAN drive is offline: Device is empty, need to call formatdevice or newdevice first
```

## Resolution

Keep the node in **Maintenance Mode** throughout, as the drive replacement procedure directs.

!!! warning "Don't reboot once the drive is Repairing"
    If the drive has already entered **Repairing**, don't restart, reset, or power off any node until the replacement drive is **Online**.

1. Optional quick check: on the node's dashboard, click **Refresh** on the left menu, choose **Drives & NICs**, and confirm with **Yes**. If the drive comes online, skip to step 4. In the case behind this article, the refresh alone didn't clear the error.
2. Verify the replacement is empty, compatible with the original drive's capacity, interface, and performance class, and fully seated in the bay. Then confirm the node is in Maintenance Mode, all other nodes are online, no drive repair is running on another node in the same tier, and no vSAN tier shows errors other than this drive.
3. Reboot the node from the VergeOS UI (**Reboot** on the node's left menu), not a hard power-off. Wait for the node to come back online. The drive may still show the same message after the reboot. That's expected; continue to step 4.
4. Click **Drives** and repeat the replacement action from the drive replacement guide. For the same slot, select the new offline drive, run **Format**, wait for formatting to complete, then run **Initialize**. For a different slot, select the original missing or offline entry and use **Replace**. After that, let the full walk and repair start; the drive can show **Repairing** before it becomes **Online**.

!!! danger "DESTRUCTIVE: Format erases the selected drive"
    Before you click **Format**, double-check you've selected the new replacement drive, not a working member of the vSAN. Match the serial number on the drive's dashboard to the label on the new drive.

## When to Contact Support

Contact VergeOS support, and include a system diagnostics report ([Generating System Diagnostics](https://docs.verge.io/knowledge-base/troubleshooting/generating-system-diagnostics)), if the drive still won't come online after a reboot and a repeated replacement action, or if the drive shows **Error** or isn't listed at all.

## Additional Resources

- [Replacing a Defective or End-of-life Drive](https://docs.verge.io/run-the-platform/operations/drive-replacement)
- [Nodes Overview](https://docs.verge.io/run-the-platform/system-administration/nodes-overview)
- [Generating System Diagnostics](https://docs.verge.io/knowledge-base/troubleshooting/generating-system-diagnostics)

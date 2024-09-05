---
title: Making a Non-Persistent VM
slug: making-a-nonpersistent-vm
description: 
draft: false
date: 2023-01-24T19:25:26.189Z
tags: vm, persistent, non persistent
categories:
  - VM
editor: markdown
dateCreated: 2022-09-16T15:26:27.931Z
---

## How to Create a Non-Persistent VM on Reboot

A Non-Persistent VM reverts to its original state after a reboot, discarding any changes made during the session. This is useful for VDI (Virtual Desktop Infrastructure) environments where the system should reset after each use.

### Steps to Create a Non-Persistent VM:

1. Navigate to the **VM dashboard**.
2. Shutdown the VM by selecting **Actions > Power Off** or using the **Power button**:
   ![nonpersistentvm-img1.png](/docs/public/nonpersistentvm-img1.png)
   !!! note
       This ensures the data is in a good state for cloning.
3. Click the **Copy** button next to the main disk on the VM.
   ![nonpersistent-2.png](/docs/public/nonpersistent-2.png)
4. Change the **Media Type** to **Non-Persistent** and click **Submit** at the bottom.
   ![nonpersistent-3.png](/docs/public/nonpersistent-3.png)
5. Click the **Edit** icon ![editiconpencil.png](/docs/public/editiconpencil.png) for the original **Disk Media Type**.
   ![nonpersistent-4.png](/docs/public/nonpersistent-4.png)
   !!! note
       The new disk will show a **Media Type** of **Non-Persistent**. Any changes made to this disk will be reverted upon a reboot of the VM.
6. Uncheck the **Enabled** checkbox.
   ![nonpersistentvm-img5.png](/docs/public/nonpersistentvm-img5.png)
7. Start the VM by selecting **Power On** from the left-hand menu or clicking the **Play button**:
   ![nonpersistent-5.png](/docs/public/nonpersistent-5.png)

This will boot the VM using the non-persistent disk. The disk is fully writable during the session, but all changes will be discarded upon reboot, reverting the VM back to its original state. 

!!! warning "Do not delete the original disk. It will not take up additional space due to **Deduplication**."

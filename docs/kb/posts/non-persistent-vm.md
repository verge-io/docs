---
title: Making a Non-Persistent VM
slug: making-a-nonpersistent-vm
description: 
published: true
date: 2023-01-24T19:25:26.189Z
tags: vm, persistent, non persistent
categories:
  - VM
editor: markdown
dateCreated: 2022-09-16T15:26:27.931Z
---

## 1 - How to make a Non-Persistent VM on Reboot

The following describes how to make a VM that is Non-Persistent, meaning any changes made to the VM will be reverted back after a reboot. This can be handy for VDI purposes where you want it to revert back any changes they made to the VM.

1. Go to the **VM dashboard**
2. Shutdown the VM **(Actions->Power Off) -or- Power button:**
![nonpersistentvm-img1.png](/public/nonpersistentvm-img1.png)
> This is done to ensure that the data is in a good state for cloning
{.is-info}
3. Click the **copy button** next to the main disk on the vm
![nonpersistent-2.png](/public/nonpersistent-2.png)
4. Change the **Media type** to **Non-Persistent** and click **Submit** at the bottom
![nonpersistent-3.png](/public/nonpersistent-3.png)
5. Click the **Edit** icon ![editiconpencil.png](/public/editiconpencil.png) on the original **Disk** media type
![nonpersistent-4.png](/public/nonpersistent-4.png)
> **NOTE:** The new disk shows as a **media type** of **Non-Persistent**. Any changes made to this disk will be reverted upon a reboot of the VM.
{.is-info}
6. Un-Check the **Enabled** checkbox
![nonpersistentvm-img5.png](/public/nonpersistentvm-img5.png)
7. Start the VM by clicking **Power On** on the left hand menu or clicking the Play button:
![nonpersistent-5.png](/public/nonpersistent-5.png)

This will boot the VM using the only available non-persistent disk. The disk is fully writable but upon a reboot the system will revert the disk back to the original raw file. Do not delete the original disk, it will not take up any additional space due to Deduplication. 

<br>
<div style="text-align: center">
  
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>
---
title: Resizing a Virtual Disk Drive
slug: resizing-a-virtual-disk-drive
description: Step-by-step instructions for increasing the size of a virtual disk drive in VergeOS, including notes on hot-plug support and guest OS requirements.
author: VergeOS Documentation Team
draft: false
date: 2024-01-24T19:27:42.060Z
semantic_keywords:
  - "resize increase virtual disk drive VergeOS"
  - "expand VM disk size hot-plug virtio-scsi"
  - "virtual machine disk drive cannot shrink reduce"
  - "guest OS partition resize after disk increase"
use_cases:
  - increase_virtual_disk_size
  - expand_vm_storage_without_power_cycle
  - resize_disk_with_guest_os_changes
tags:
  - resize
  - disk
  - inside vm
  - inside virtual machine
categories:
  - VM
editor: markdown
dateCreated: 2024-07-11T17:45:53.753Z
---

# How to Resize a Virtual Disk Drive

!!! info "Note"
    Drives can only be increased in size; they cannot be reduced. Verify whether your guest OS supports resizing without a power cycle, particularly for Virtio-SCSI drives.

To resize a virtual disk drive within a VM, follow these steps:

1. From the **VM Dashboard**, click **Drives** in the left menu.
2. Select the drive to be modified.
3. Click **Edit** in the left menu.
4. Modify the drive size as desired.
5. Click **Submit**.

## Important Notes

!!! info "Note"
    If the VM configuration allows hot-plugging, the disk interface is set to **Virtio-SCSI**, and the guest Operating System (OS) supports it, the drive size can typically be increased without power cycling the VM.

!!! danger "Warning"
    Drives cannot be reduced in size. While partitions may be resized inside the guest OS, the disk drive itself cannot be shrunk.

!!! danger "Warning"
    Modifications to drive size will most likely require corresponding changes within the guest Operating System to utilize the newly added space.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

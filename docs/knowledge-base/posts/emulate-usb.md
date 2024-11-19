---
title: Emulate a USB Device
slug: emulate-usb
description: Instructions for creating/attaching an emulated USB device to a VM
draft: false
date: 2024-11-19T15:19:47.449Z
tags:
  - USB
  - device
  - drive
  - hotplug
  - drivers
categories:
  - VM
editor: markdown
dateCreated: 2024-11-19T14:48:12.332Z
---

# Emulate a USB Device

A VM can include an emulated USB device. This can be helpful for:  

* satisfying legacy guest application requirements, where a USB device is specifically required
* on-demand access of guest drivers (e.g. vgpu client, virtio), by allowing hotplugging device containing necessary files

## VM Requirements

* **VM Machine Type**: ***9.0* or higher**
* **Allow Hotplug**: ***enabled***
* **VirtIO drivers installed in the guest**
  
!!! tip "VirtIO"
    Most Linux distros have built-in VirtIO support, but it is not standard in default Windows installations.  VergeOS custom Windows *.iso files contain VirtIO drivers, and they are also available for download at: https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso.

1. Navigate to the **VM dashboard** (Main Dashboard > Machines > Virtual Machines > double-click desired VM.)
2. Click **Drives** on the left menu.
3. Click **New** on the left menu.
4. Configure fields:  
   **Media**: ***Disk***  
   **Interface**: ***USB***  
   **Name(optional)**: a specific name can be entered; if left blank the system will auto-generate a name based on ordinal number, e.g. "drive_2".  
    For information about **other drive fields, see:** [VM Drives](/product-guide/VMdrives).
5. When fields are configured, click **Submit** to finish creating the device. The new USB device will display in the VM drives list with a status of *Offline*.
6. Click to **select the USB device** in the drive list and click **HotPlug** on the left menu.

any special notes about plug/unplug?
test unplugging too
 stuck at "hotplugging"

 troubleshooting?

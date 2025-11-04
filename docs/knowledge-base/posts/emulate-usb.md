---
title: Emulate a USB Device
slug: emulate-usb
description: Instructions for creating/attaching an emulated USB device to a VM
author: VergeOS Documentation Team
draft: false
date: 2024-11-19T15:19:47.449Z
tags:
  - USB
  - device
  - drive
  - hotplug
  - drivers
  - virtio
categories:
  - VM
editor: markdown
dateCreated: 2024-11-19T14:48:12.332Z
---

# Emulating USB Devices in VergeOS

## Overview

!!! info "Key Points"
    - Create emulated USB devices for VMs
    - Enables legacy application support
    - Allows hotplugging storage for driver installation
    - Requires specific VM configuration

## Prerequisites

Before creating an emulated USB device, ensure your VM meets these requirements:

- VM settings:
  - **Allow Hotplug** must be enabled
  - **Machine Type** must be **9.0** or higher
- VirtIO drivers installed in the guest OS

!!! warning "Machine Type Changes"
    Before modifying a VM's machine type, create a short-term snapshot (24-hour expiration) to enable rollback if needed.

!!! tip "VirtIO Driver Installation"
    - Linux distributions typically include VirtIO drivers
    - For Windows, drivers are available in VergeOS custom ISOs or can be downloaded from:
    [VirtIO Drivers](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)

## Steps to Create USB Device

1. **Access VM Settings**
   - Navigate to the VM dashboard (Virtual Machines > List  > Double-click your target VM )
   

2. **Create New Drive**
   - Click **Drives** in the left menu
   - Select **New** from the left menu

3. **Configure USB Device**
   - Set **Media** to either **Disk** or **Clone Disk**
   - Set **Interface** to **USB**
   - Optional: Enter a custom name (system will auto-generate if blank)
   - If using Clone Disk, select the appropriate *.raw file

4. **Enable Device**
   - Click **Submit** to create the device
   - Select the new USB device from the drive list
   - Click **HotPlug** in the left menu

For additional drive configuration options, see: [VM Drives](/product-guide/virtual-machines/vm-drives)

## Troubleshooting

!!! warning "Common Issues"
    - **Problem**: Device stays in "hot plugging" status
      - **Solution**:
        1. Check VM dashboard logs for errors
        2. Verify all prerequisites are met
        3. Try restarting the VM if settings were recently changed
    - **Problem**: Device shows as offline
      - **Solution**: Ensure hotplug is enabled and VirtIO drivers are installed

---

!!! note "Document Information"
    - Last Updated: 2024-11-19
    - VergeOS Version: 4.13

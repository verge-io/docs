---
title: How to Import a RedHat / RHEL / CentOS based VM
slug: import-rhel-centos-vm
description: Importing RedHat / RHEL / CentOS based VMs from other hypervisors and configuring drivers for proper booting in VergeOS.
draft: false
date: 2024-09-09T15:26:24.755Z
tags:
  - vm
  - import
  - boot
  - sata
  - ide
  - media
  - images
  - scsi
  - secure boot
  - disk
  - media images
  - not bootable
  - not booting
  - troubleshooting
  - troubleshoot
  - vm wont boot
  - wont start
  - import vm
categories:
  - Migration
  - Troubleshooting
editor: markdown
dateCreated: 2024-09-09T14:38:43.388Z
---

# How to Import a RedHat / RHEL / CentOS based VM

## Overview

!!! info "Key Points"
     - Redhat/CentOS installs drivers only for the detected hardware during installation.
     - Imported VMs may fail to boot due to missing drivers for new hardware.
     - You can resolve these boot issues by adjusting hardware configuration and regenerating the `initramfs`.

This guide explains how to import Redhat/CentOS based virtual machines from other hypervisors into VergeOS. It addresses potential problems like VMs not booting or lacking network connectivity after migration.

## Prerequisites

- Access to VergeOS and the VergeOS UI.
- Familiarity with the hypervisor environment and VM configuration.
- Imported VM files must be present in the VergeOS environment.

## Steps

### 1. Update VM Hardware Configuration

1. **Change all hard drives to `virtio-scsi`**:
     - In the VergeOS UI, navigate to the VM's settings.
     - For each hard drive, change the interface to `virtio-scsi` for optimal performance and compatibility.

2. **Change all NICs to `virtio`**:
     - Ensure that all network interface cards (NICs) are set to `virtio` for enhanced networking support.

3. **Adjust Boot Order**:
     - Make sure that the OS disk is listed as **ID 0** in the boot order.

### 2. Boot into Rescue Mode

1. **Start the VM**:
     - Power on the VM, and during boot, hold the **Left Shift** key to access the GRUB boot menu.

2. **Select Rescue Mode**:
    - In the GRUB menu, select the rescue mode to boot into a minimal recovery environment.

### 3. Rebuild Initramfs

1. **Log into the Terminal**:
    - Once in rescue mode, access the terminal via the VM console.

2. **Regenerate Initramfs**:
    - Run the following command to regenerate the initramfs with the necessary drivers:
     ```bash
     sudo dracut -f --regenerate-all --add-drivers "virtio_blk virtio_net"
     ```
    - This command adds drivers for `virtio_blk` (block device) and `virtio_net` (network device) to the initramfs, allowing the VM to boot with the correct drivers for VergeOS.

### 4. Reboot and Verify

1. **Reboot the VM**:
    - After regenerating the initramfs, reboot the VM by running:
     ```bash
     reboot
     ```

2. **Verify Boot and Network Connectivity**:
    - Confirm that the VM boots successfully and that network connectivity is functional via the `virtio` NIC.

## Troubleshooting

!!! warning "Common Issues"
     - **VM is not booting**:
       - **Solution**: Double-check the boot order in the VM settings. The OS disk must be set as **ID 0**.
     - **No network connectivity**:
       - **Solution**: Ensure that NICs are set to `virtio` and that the initramfs was rebuilt with the appropriate network drivers.

## Additional Resources

- [Importing VMs](/product-guide/importfromupload/)
- [VM Best Practices](/product-guide/VMbestpractices/)
- [Dracut Wiki](https://github.com/dracutdevs/dracut/wiki/)

## This is a test 123
     adsfasdfasdf
     
## Feedback

!!! question "Need Help?"
    If you have any questions or encounter issues while importing a VM, please reach out to our support team for assistance.

---

!!! note "Document Information"
     - Last Updated: 2024-09-09
     - VergeOS Version: 4.12.6

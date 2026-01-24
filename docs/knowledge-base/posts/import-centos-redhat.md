---
title: How to Import a Linux VM (RHEL, CentOS, SUSE, Debian, Ubuntu)
slug: import-rhel-centos-vm
description: Importing Linux VMs from other hypervisors and configuring virtio drivers for proper booting in VergeOS.
draft: false
date: 2025-01-23T00:00:00.000Z
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
  - rhel
  - centos
  - suse
  - debian
  - ubuntu
  - dracut
  - initramfs
categories:
  - Migration
  - Troubleshooting
editor: markdown
dateCreated: 2024-09-09T14:38:43.388Z
---

# How to Import a Linux VM (RHEL, CentOS, SUSE, Debian, Ubuntu)

## Overview

!!! info "Key Points"
     - Linux distributions install drivers only for detected hardware during installation.
     - Imported VMs may fail to boot due to missing virtio drivers for VergeOS hardware.
     - You can resolve boot issues by adjusting VM configuration and regenerating the initramfs.
     - This guide covers RHEL, CentOS, Fedora, SUSE, openSUSE, Debian, and Ubuntu.

This guide explains how to import Linux virtual machines from other hypervisors into VergeOS. It addresses potential problems like VMs not booting or lacking network connectivity after migration, and provides distribution-specific instructions for regenerating the initramfs.

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

!!! tip "SUSE/openSUSE Alternative"
    If you cannot boot to rescue mode from GRUB (common with SLES15 and openSUSE Leap 15), mount an installation ISO to the VM and boot from it. The ISO will provide a "Rescue System" option.

### 3. Mount the Root Filesystem and Chroot

Once booted into rescue mode, log in as root and mount the root filesystem.

1. **Find the root partition**:

    If you don't know which partition contains the root filesystem, list all available partitions:

    ```bash
    cat /proc/partitions
    ```

    For systems using LVM, list all logical volumes:

    ```bash
    lvdisplay
    ```

2. **Mount the root partition**:

    Mount the root partition or logical volume to `/mnt`:

    ```bash
    mount /dev/<device_name> /mnt
    ```

    Replace `<device_name>` with your root partition (e.g., `sda2`, `mapper/vg0-root`).

3. **Verify the mount**:

    Check that you mounted the correct filesystem by listing its contents:

    ```bash
    ls /mnt
    ```

    You should see directories like `/root`, `/boot`, `/home`, `/etc`, and `/var`.

4. **Bind the virtual filesystems**:

    Use the following for-loop to bind the necessary virtual filesystems:

    ```bash
    for i in proc sys dev run; do mount --rbind /$i /mnt/$i; done
    ```

    Alternatively, mount them individually:

    ```bash
    mount --rbind /proc /mnt/proc
    mount --rbind /sys /mnt/sys
    mount --rbind /dev /mnt/dev
    mount --rbind /run /mnt/run
    ```

5. **Chroot into the mounted filesystem**:

    ```bash
    chroot /mnt
    ```

6. **Mount remaining filesystems**:

    After chrooting, mount any additional partitions defined in fstab:

    ```bash
    mount -a
    ```

### 4. Rebuild Initramfs

After chrooting into the system, regenerate the initramfs with the necessary virtio drivers.

#### RHEL / CentOS / Fedora / SUSE (using dracut)

Run the following command to regenerate the initramfs:

```bash
dracut -f --regenerate-all --add-drivers "virtio_blk virtio_net virtio_pci"
```

This adds drivers for `virtio_blk` (block device), `virtio_net` (network device), and `virtio_pci` (PCI bus) to the initramfs.

#### Debian / Ubuntu (using update-initramfs)

If `dracut` is not available (common on Debian 10 and Ubuntu), use `update-initramfs` instead:

1. Add the virtio modules to the initramfs configuration:

    ```bash
    cat >> /etc/initramfs-tools/modules << EOF
    virtio_pci
    virtio_blk
    virtio_net
    EOF
    ```

2. Regenerate the initramfs:

    ```bash
    update-initramfs -u
    ```

### 5. Reboot and Verify

1. **Exit the chroot environment**:

    ```bash
    exit
    ```

2. **Reboot the VM**:

    ```bash
    reboot
    ```

3. **Verify Boot and Network Connectivity**:
    - Confirm that the VM boots successfully and that network connectivity is functional via the `virtio` NIC.

## Troubleshooting

!!! warning "Common Issues"
     - **VM is not booting**:
       - **Solution**: Double-check the boot order in the VM settings. The OS disk must be set as **ID 0**.
     - **No network connectivity**:
       - **Solution**: Ensure that NICs are set to `virtio` and that the initramfs was rebuilt with the appropriate network drivers.

## Additional Resources

- [Migrating VMs](/product-guide/virtual-machines/vm-migration-overview)
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices)
- [Dracut Wiki](https://github.com/dracutdevs/dracut/wiki/)

## Feedback

!!! question "Need Help?"
    If you have any questions or encounter issues while importing a VM, please reach out to our support team for assistance.


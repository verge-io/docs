---
title: RHEL 9 Family VMs Failing to Boot After Clone or Snapshot Restore
slug: rhel9-boot-failure-clone-snapshot-restore
description: How to fix boot failures in RHEL 9 family VMs (AlmaLinux, Rocky Linux, CentOS Stream) after cloning or restoring a snapshot in VergeOS, caused by the LVM system.devices file pinning the original disk serial numbers.
author: VergeOS Documentation Team
draft: false
date: 2026-04-22T00:00:00.000Z
semantic_keywords:
  - "clone redhat 9.x linux vm rhel centos almalinux rocky"
  - "snapshot restore redhat 9.x linux vm rhel centos almalinux rocky"
  - "vm cloning boot failure troubleshooting"
  - "vm restore boot failure troubleshooting"
  - "lvm system.devices file serial number"
  - "redhat rescue mode dracut initramfs"
  - "udev persistent device rules virtio"
use_cases:
  - clone_redhat_linux_vm_in_vergeos
  - restore_redhat_linux_vm_from_snapshot
  - troubleshoot_linux_vm_boot_failure
  - migrate_rhel_centos_almalinux_rocky
tags:
  - vm
  - clone
  - snapshot
  - restore
  - boot
  - scsi
  - disk
  - not bootable
  - not booting
  - troubleshooting
  - troubleshoot
  - vm wont boot
  - wont start
  - rhel
  - centos
  - almalinux
  - rocky linux
  - lvm
  - system.devices
  - dracut
  - initramfs
  - udev
  - virtio
categories:
  - Troubleshooting
  - Backup and DR
editor: markdown
dateCreated: 2026-04-22T00:00:00.000Z
---

# RHEL 9 Family VMs Failing to Boot After Clone or Snapshot Restore

This guide covers a specific boot failure: a RHEL 9 family VM (RHEL, AlmaLinux 9, Rocky Linux 9, or CentOS Stream 9) that boots fine before a clone or snapshot restore in VergeOS, then fails afterward because LVM's system.devices file no longer matches the VM's disk serial numbers. The steps below repair the VM from rescue mode.  if you haven't performed the clone or restore yet, see the "*Preventing this on future clones, snapshots, or exports*" note further down.

## Symptoms
* After restoring a VM from a snapshot, or cloning a VM, the RHEL 9 VM fails to boot (drops to emergency mode or hangs at boot)
* In rescue mode, vgchange -ay produces no output and lvdisplay shows nothing


## Overview

RHEL 9 and its derivatives (AlmaLinux 9, Rocky Linux 9, CentOS Stream 9) use an LVM devices file at `/etc/lvm/devices/system.devices` that explicitly whitelists block devices by their unique identifiers — most notably disk serial numbers. At boot, LVM only considers devices listed in this file when assembling volume groups. If the serial numbers it sees don't match the ones recorded when the file was created, LVM won't activate the root volume group and the VM drops to a dracut emergency shell.

This means any operation that gives a VM new disk serial numbers — cloning a VM with new hardware serial numbers generated, or restoring a snapshot in a way that changes serial numbers — will cause the boot process to fail.

!!! info "VergeOS 26.1.5 and Later"
    Starting in VergeOS 26.1.5, VM clones and snapshot restores **preserve the original drive serial numbers by default**, eliminating the serial number mismatch for most clone and restore operations. This issue most commonly affects:

    - Clones or restores where the option to generate new hardware serial numbers was explicitly selected
    - Environments running VergeOS versions earlier than 26.1.5

!!! note "Imports from another hypervisor"
    The same boot failure can occur when importing a VM from another hypervisor *if* the VM was exported without preserving its original device serial numbers.  Additionally, Imported VMs may fail to boot due to missing virtio drivers for VergeOS hardware.  See  [Importing a Linux VM Guide](/knowledge-base/import-rhel-centos-vm) for instructions including adjusting VM configuration and regenerating the initramfs.


!!! note "Preventing this on future clones, snapshots, or exports"
    If you still have access to a working source VM, you can avoid the boot failure on future clones, snapshots, or exports from another hypervisor by disabling the LVM devices file *before* the operation. Set `use_devicesfile = 0` in `/etc/lvm/lvm.conf` on the guest. LVM will fall back to scanning all available block devices regardless of serial number. The LVM devices file was designed primarily for hosts attached to a SAN fabric, where a single machine can see many block devices that don't belong to it; in a typical VergeOS environment a VM only sees the virtual disks explicitly assigned to it, so the protection it provides is rarely needed. See Red Hat's [Limiting LVM device visibility and usage](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/limiting-lvm-device-visibility-and-usage_configuring-and-managing-logical-volumes) for more on the devices file.

## Prerequisites

- Access to the VergeOS UI and VM console
- A RHEL 9 family installation ISO available in VergeOS media (required only if the VM cannot reach the GRUB menu)

## Steps

### 1. Boot into a Rescue Environment

The VM will likely fail to boot normally. Use one of the following methods to reach a working shell.

#### Option A — GRUB Rescue Kernel (preferred)

1. Power on the VM and open the console in VergeOS.
2. During boot, press and hold **Shift** (BIOS) or **Esc** (UEFI) to access the GRUB menu.
3. Select **Advanced options** and choose the **rescue** kernel entry.
4. Follow any prompts — if asked whether to mount the root filesystem, select **Continue**.

#### Option B — Boot from Installation ISO

If the GRUB menu is unreachable or the VM won't get that far:

1. In VergeOS, attach a RHEL 9 family installation ISO to the VM as a CD/DVD drive.
2. Adjust the VM's boot order to boot from the ISO first, or use a one-time boot option.
3. At the installer menu, navigate to **Troubleshooting → Rescue a [distro] system**.
4. When prompted about mounting the installed system, choose option **1** (mount under `/mnt/sysimage`).
5. Select **Shell** to open a command prompt.

!!! warning "ISO rescue uses a different mount path"
    When using installer rescue mode, your installed system is at `/mnt/sysimage` rather than `/mnt`. Adjust next steps accordingly.

### 2.  Confirm the disk is visible, rescan, and verify volume groups

  * **Display Block devices:**

    `lsblk`

    Note the device name (e.g., /dev/sda) and the LVM partition (e.g., /dev/sda3)

  * **Force LVM to re-scan all block devices (bypasses the devices file):**

    `pvscan --cache`  
    `vgchange -ay`

  * **If rescan still shows nothing, register the LVM partition explicitly:**

    `lvmdevices --adddev /dev/sda3`  Replace with your actual LVM partition from lsblk  
    `vgchange -ay`

    !!! tip "RHEL 9 installations typically use LVM, with the root logical volume at `/dev/mapper/rhel-root` (or `almalinux-root`, `rocky-root`)." 


### 3. Verify volume groups are now visible

    * `lvdisplay`


### 4. Mount the root partition and verify 

  * `mount /dev/<device_name> /mnt`  
    Replace <device_name> with your root partition (e.g., sda2, mapper/vg0-root).  


  * **Verify the mount:** 

    `ls /mnt`  

    You should see directories like /root, /boot, /home, /etc, and /var.

### 5. Bind the Filesystems

 * **Use the following for-loop to bind the necessary virtual filesystems:** 

    `for i in proc sys dev run; do mount --rbind /$i /mnt/$i; done`


 * **OR mount them individually:**

    `mount --rbind /proc /mnt/proc`  
    `mount --rbind /sys /mnt/sys`      
    `mount --rbind /dev /mnt/dev`  
    `mount --rbind /run /mnt/run`  


### 6. Chroot into the Installed System


    `chroot /mnt`

### 7. Mount remaining filesystems:

After chrooting, mount any additional partitions defined in fstab:

    `mount -a`

### 7. Regenerate the Initramfs

  * Rebuild the initramfs so it picks up the cleaned-up device configuration:

    `dracut -f --regenerate-all` 

### 7. Reboot and Verify

  * Exit the chroot environment:

    `exit`

  * Reboot the VM:

    `reboot`

  * Verify Boot 

Confirm that the VM boots successfully, all drives appear as expected, and network connectivity. 



## Troubleshooting

!!! warning "Can't reach GRUB menu"
    If the VM doesn't display GRUB at all, use Option B from Step 1 to boot from an installation ISO into rescue mode.

!!! warning "No network after boot"
    - Confirm the NIC is set to **virtio** in the VergeOS VM settings.
    - Check that no persistent network rules (`70-persistent-net.rules`) exist that would block the new interface from being named correctly.
    - Run `ip link show` to see whether a NIC is present but not configured, then check `/etc/sysconfig/network-scripts/` or NetworkManager for the interface configuration.



## Additional Resources

- [Limiting LVM device visibility and usage (Red Hat)](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/limiting-lvm-device-visibility-and-usage_configuring-and-managing-logical-volumes)
- [Configuring and managing logical volumes (Red Hat)](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/index)
- [Importing Linux VMs — General Guide](/knowledge-base/import-rhel-centos-vm)
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices)

!!! question "Need Help?"
    If you continue to experience boot issues after following this guide, contact VergeOS support for assistance.

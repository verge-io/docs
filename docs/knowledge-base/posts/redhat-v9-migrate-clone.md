---
title: RHEL 9 Family VMs Failing to Boot After Clone, Import, or Restore
slug: rhel9-boot-failure-clone-import-restore
description: How to fix boot failures in RHEL 9 family VMs (AlmaLinux, Rocky Linux, CentOS Stream) after cloning, importing, or restoring in VergeOS, caused by the system.devices whitelist encoding original hardware serial numbers in the initramfs.
author: VergeOS Documentation Team
draft: false
date: 2026-04-22T00:00:00.000Z
semantic_keywords:
  - "import redhat 9.x linux vm rhel centos almalinux rocky"
  - "clone redhat 9.x linux vm rhel centos almalinux rocky"
  - "vm import boot failure troubleshooting"
  - "vm cloning boot failure troubleshooting"
  - "vm restore boot failure troubleshooting"
  - "system.devices whitelist hardware serial number"
  - "redhat rescue mode dracut initramfs"
  - "udev persistent device rules virtio migration"
use_cases:
  - import_redhat_linux_vm_from_other_hypervisor
  - clone_redhat_linux_vm_in_vergeos
  - restore_redhat_linux_vm_from_snapshot
  - troubleshoot_linux_vm_boot_failure
  - migrate_rhel_centos_almalinux_rocky
  - import_rhel_centos_almalinux_rocky
tags:
  - vm
  - import
  - boot
  - scsi
  - disk
  - not bootable
  - not booting
  - troubleshooting
  - troubleshoot
  - vm wont boot
  - wont start
  - import vm
  - rhel
  - centos
  - almalinux
  - rocky linux
  - dracut
  - initramfs
  - udev
  - virtio
  - migration
categories:
  - Migration
  - Troubleshooting
editor: markdown
dateCreated: 2026-04-22T00:00:00.000Z
---

# RHEL 9 Family VMs Failing to Boot After Clone, Import, or Restore

## Overview

RHEL 9 and its derivatives (AlmaLinux 9, Rocky Linux 9, CentOS Stream 9) use a `system.devices` file inside the initramfs that explicitly whitelists hardware devices by their unique identifiers — disk serial numbers, PCI addresses, and MAC addresses. Rather than scanning for hardware dynamically at each boot (as earlier RHEL releases did), the system expects to find exactly the hardware that was present when the initramfs was last built.

This means any operation that changes a VM's drive serial numbers — importing from another hypervisor, cloning within VergeOS with new serial numbers generated, or restoring a snapshot where serial numbers changed — will cause the boot process to fail. The VM hangs or drops to a dracut emergency shell because the whitelisted hardware IDs no longer match what's present.

!!! info "VergeOS 26.1.5 and Later"
    Starting in VergeOS 26.1.5, VM clones and snapshot restores **preserve the original drive serial numbers by default**, eliminating the serial number mismatch for most clone and restore operations. This issue most commonly affects:

    - VMs imported from another hypervisor (VMware, Hyper-V, KVM, etc.)
    - Clones or restores where **New Hardware Serial Numbers** was explicitly selected
    - Environments running VergeOS versions earlier than 26.1.5

The steps below walk through fixing a VM that is already in VergeOS and failing to boot using rescue mode.

!!! info "Applies To"
    - Red Hat Enterprise Linux 9.x
    - AlmaLinux 9.x
    - Rocky Linux 9.x
    - CentOS Stream 9

## Prerequisites

- Access to the VergeOS UI and VM console
- A RHEL 9 family installation ISO available in VergeOS media (required only if the VM cannot reach the GRUB menu)

!!! tip "Importing from another hypervisor? You can avoid rescue mode."
    If the source VM is still running on the original hypervisor, you can clear the device whitelist before migrating. On the source VM, remove the persistent device rules (`sudo rm -f /etc/udev/rules.d/70-persistent-net.rules /etc/udev/rules.d/70-persistent-cd.rules`) and rebuild the initramfs generically (`sudo dracut -f --no-hostonly --add-drivers "virtio_scsi virtio_net virtio_pci virtio_blk" --regenerate-all`), then shut down and import. The VM will boot directly in VergeOS without needing rescue mode.

## Steps

### 1. Configure VM Hardware in VergeOS

Before attempting to boot the imported VM, update its virtual hardware to use VergeOS-native device types.

1. In the VergeOS UI, open the VM and go to its **Drives** settings.
2. Change each hard drive's interface to **virtio-scsi**.
3. Confirm the OS disk is set to **Boot Order ID 0**.
4. Go to the VM's **NICs** settings.
5. Change all NICs to **virtio**.

!!! note
    Changing to virtio-scsi at this point is correct even though the initramfs won't have virtio-scsi drivers yet — you'll rebuild the initramfs in a later step.

### 2. Boot into a Rescue Environment

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
    When using installer rescue mode, your installed system is at `/mnt/sysimage` rather than `/mnt`. Adjust the chroot path in the next step accordingly.

### 3. Activate LVM and Mount the Root Filesystem

In the rescue shell, activate LVM volumes and mount the installed system.

```bash
# Scan and activate LVM volume groups
vgscan
vgchange -ay

# List block devices to identify the root volume
lsblk
```

RHEL 9 installations typically use LVM, with the root logical volume at `/dev/mapper/rhel-root` (or `almalinux-root`, `rocky-root`). Mount it:

```bash
mount /dev/mapper/rhel-root /mnt
```

If `/boot` is a separate partition (common with LVM installs), mount it too:

```bash
# The /boot partition is usually the first partition on the disk
mount /dev/vda2 /mnt/boot
```

!!! tip "Not sure which partition is /boot?"
    Run `blkid` to see filesystem types and UUIDs, or check what's listed in `/dev/mapper/` for LVM volumes.

### 4. Chroot into the Installed System

Bind the necessary virtual filesystems and chroot into the installed OS.

```bash
for i in proc sys dev run; do mount --rbind /$i /mnt/$i; done
chroot /mnt
mount -a
```

If you used **Option B** (installer ISO), substitute `/mnt/sysimage` for `/mnt` in the commands above:

```bash
for i in proc sys dev run; do mount --rbind /$i /mnt/sysimage/$i; done
chroot /mnt/sysimage
mount -a
```

### 5. Clear Persistent Device Rules

Remove the udev persistent naming rules that tie device names to the original hardware identifiers. Without this step, udev will fail to name devices correctly on the new virtio hardware.

```bash
rm -f /etc/udev/rules.d/70-persistent-net.rules
rm -f /etc/udev/rules.d/70-persistent-cd.rules
```

Check for any additional rules referencing hardware-specific identifiers (serial numbers, WWNs, PCI slots):

```bash
ls /etc/udev/rules.d/
```

Remove any rule files that are specific to the original hardware. Rules that ship with the distribution (e.g., in `/usr/lib/udev/rules.d/`) don't need to be touched.

If the system was configured with multipath storage, clear the device WWID whitelist:

```bash
# Only if multipath is in use
[ -f /etc/multipath/wwids ] && > /etc/multipath/wwids
```

### 6. Verify fstab Uses UUID References

RHEL 9 installations default to UUID-based device references in `/etc/fstab`, which survive the hardware change intact. Confirm this is the case:

```bash
cat /etc/fstab
```

A correct entry looks like:

```
UUID=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx  /      xfs   defaults  0 0
UUID=yyyyyyyy-yyyy-yyyy-yyyy-yyyyyyyyyyyy  /boot  xfs   defaults  0 0
```

If any entry uses a bare device path (e.g., `/dev/sda2` or `/dev/vda2`) instead of a UUID, find its UUID and update the entry:

```bash
blkid
```

### 7. Regenerate the Initramfs

Rebuild the initramfs to include virtio-scsi and virtio-net drivers for VergeOS hardware:

```bash
dracut -f --regenerate-all --add-drivers "virtio_scsi virtio_net virtio_pci virtio_blk"
```

This will take up to a minute. Wait for the command to complete without errors before proceeding.

### 8. Update GRUB

Regenerate the GRUB configuration to ensure it references the current disk layout.

**For BIOS systems:**

```bash
grub2-mkconfig -o /boot/grub2/grub.cfg
```

**For UEFI systems** (use the path matching your distribution):

```bash
# RHEL
grub2-mkconfig -o /boot/efi/EFI/redhat/grub.cfg

# AlmaLinux
grub2-mkconfig -o /boot/efi/EFI/almalinux/grub.cfg

# Rocky Linux
grub2-mkconfig -o /boot/efi/EFI/rocky/grub.cfg

# CentOS Stream
grub2-mkconfig -o /boot/efi/EFI/centos/grub.cfg
```

### 9. Reboot and Verify

Exit the chroot and reboot:

```bash
exit
reboot
```

Watch the boot sequence in the VergeOS console. The VM should now boot to a login prompt. Log in and confirm the hardware is correct:

```bash
# Verify virtio-scsi disk is present
lsblk

# Verify virtio NIC is present
ip link show
```

## Troubleshooting

!!! warning "Dracut emergency shell at boot"
    The initramfs loaded but couldn't find the root filesystem. Common causes:

    - **fstab references an old device path**: Boot back into rescue mode and confirm `/etc/fstab` uses UUID references. Run `blkid` inside the chroot to get current UUIDs.
    - **LVM volume group not activated**: In rescue mode, run `vgscan && vgchange -ay` before mounting.
    - **Incorrect dracut drivers**: Confirm the `dracut` command in Step 7 completed without errors. Re-run it if needed.

!!! warning "No network after boot"
    - Confirm the NIC is set to **virtio** in the VergeOS VM settings.
    - Check that no persistent network rules (`70-persistent-net.rules`) exist that would block the new interface from being named correctly.
    - Run `ip link show` to see whether a NIC is present but not configured, then check `/etc/sysconfig/network-scripts/` or NetworkManager for the interface configuration.

!!! warning "Can't reach GRUB menu"
    If the VM doesn't display GRUB at all, use Option B from Step 2 to boot from an installation ISO into rescue mode.

## Additional Resources

- [Importing Linux VMs — General Guide](/knowledge-base/import-rhel-centos-vm)
- [Migrating VMs to VergeOS](/product-guide/virtual-machines/vm-migration-overview)
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices)

!!! question "Need Help?"
    If you continue to experience boot issues after following this guide, contact VergeOS support for assistance.

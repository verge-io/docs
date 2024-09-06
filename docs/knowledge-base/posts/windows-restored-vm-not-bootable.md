---
title: Windows Restored VM Not Bootable
slug: windows-restored-vm-not-bootable
description: Troubleshooting steps for a Windows VM that is not booting after being restored from a snapshot.
draft: false
date: 2023-01-23T22:31:03.605Z
tags: windows, restored, not bootable, not booting, not restarting, bsod, blue screen
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-10T18:45:23.678Z
---

# Windows Restored VM Not Bootable

After restoring a copy of a virtual machine from a recent snapshot, the restored copy may fail to boot properly. The VM may stop with a blue screen message which reads: 

> `Your PC ran into a problem and needs to restart. We're just collecting some error info, and then we'll restart for you.`

There are several guest-level issues that can cause a VM running Windows to not start successfully. Below are the most common causes and their corresponding solutions.

## Common Causes and Solutions

### 1. **Non-Quiesced Snapshots**

One of the most frequent causes of a restored VM failing to boot is that the snapshot was not taken in a clean (**Quiesced**) state. A quiesced snapshot ensures that the VM's memory and disk I/O are in a stable state, making the restored VM more likely to boot successfully. Without quiescing, the snapshot could have captured an unstable or inconsistent state.

#### **Solution:**
- Ensure that when snapshots are taken, they are **quiesced**. Quiescing allows the OS to pause I/O operations, flush memory, and ensure that no incomplete transactions are saved in the snapshot.
- For future backups, enable the **Quiesce Snapshots** option when scheduling backups for Windows VMs. This feature ensures that the system is in a stable state before taking a snapshot.

### 2. **Pending or Partially Installed Windows Updates**

If Windows updates were partially installed or in progress when the snapshot was taken, the restored VM might experience issues booting due to an incomplete or corrupted update state.

#### **Solution:**
- Boot the VM into **Safe Mode** and complete any pending updates.
- You can also attempt to disable the Windows Update service temporarily to allow the VM to boot without applying incomplete updates. Once booted, manually re-enable and check for updates.
- Review the **Windows Update Logs** using Event Viewer to identify any problematic updates that might need to be rolled back or reinstalled.

### 3. **Driver Incompatibility or Missing Drivers**

Sometimes, the VM's hardware configuration in VergeOS (e.g., disk controllers, network adapters) may differ from the original environment, causing issues with booting due to incompatible or missing drivers. This is especially common when restoring VMs from a different hypervisor.

#### **Solution:**
- Boot the VM using **Windows Recovery** and attempt to repair the system automatically.
- Verify that the appropriate **Virtio** or **SCSI drivers** are installed, especially if the VM is using Virtio interfaces for storage or networking.
- If the issue persists, boot into **Safe Mode** and manually update the VM's drivers from the Device Manager.

### 4. **Corrupted Boot Loader**

If the Windows bootloader was corrupted in the snapshot, the restored VM will not boot properly. This could happen if the system was performing a critical task related to the boot process (like an update or disk operation) when the snapshot was taken.

#### **Solution:**
- Use the **Windows Recovery Environment (WinRE)** to repair the bootloader:
  1. Boot the VM using a Windows installation disk or recovery media.
  2. Select **Repair your computer** > **Troubleshoot** > **Advanced options** > **Startup Repair**.
  3. If Startup Repair doesn’t work, open a Command Prompt and run the following commands:
     ```doscon
     bootrec /fixmbr
     bootrec /fixboot
     bootrec /rebuildbcd
     ```
- These commands will repair the Master Boot Record (MBR) and rebuild the Boot Configuration Data (BCD).

### 5. **Hardware Configuration Changes**

Changes to the VM’s hardware configuration, such as CPU count, memory allocation, or disk type, may cause instability or prevent the VM from booting.

#### **Solution:**
- Verify that the VM’s hardware configuration in VergeOS matches the original configuration from when the snapshot was taken.
- If you made any changes, such as increasing memory or changing the number of CPUs, try reverting to the original configuration to see if the VM boots properly.

## Best Practice: Manage Windows Updates in Guest VMs

A guest VM running Windows OS, and experiencing an unexpected restart, is often found to be caused by the Microsoft Windows Update service being configured to automatically apply updates that frequently require a restart. 

**Recommendations:**
- Schedule **snapshot creation** during maintenance windows when Windows updates are **not** being applied.
- Configure **Windows Update** settings to avoid automatic installations or reboots, especially on critical VMs. Instead, use a **manual update** process during scheduled maintenance periods.
- Regularly review the **Windows Update logs** in Event Viewer to detect potential issues related to updates that could affect the stability of the VM.

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

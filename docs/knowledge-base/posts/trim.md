---
title: Virtual Drive TRIM
slug: virtual-drive-trim
description: How to regain space on a virtual SSD
draft: false
date: 2023-01-24T14:15:07.757Z
tags: disk management, trim, discard, storage, vsan, disk performance, disk
categories:
  - VM
editor: markdown
dateCreated: 2022-05-18T21:40:52.344Z
---

# How to TRIM your Drives

After importing a virtual machine from another hypervisor, sometimes the free space available inside the virtual machine does not match the free space reported to the VergeOS platform. This discrepancy is often due to the virtual disk being thick-provisioned from the VM source, making VergeOS unaware of the unused disk space. To resolve this, a TRIM/UNMAP operation needs to be performed on the virtual disk from within the virtual machine.

## Prerequisites for Running a TRIM Command

1. Edit the virtual drive(s) in question in the VergeOS UI and ensure **Discard** is enabled.
2. Ensure the virtual drive(s) is using a drive type of **virtIO-SCSI** or **SATA**.
3. Ensure the virtual drive(s) is assigned to a **Solid State Tier** (usually tier 1-3).

## Trimming a Windows Drive

To perform a manual TRIM operation in a Windows environment, follow these steps:

1. Launch **PowerShell** as an admin user.
2. From the PowerShell prompt, type the following command:
   
   ```powershell
   Optimize-Volume -DriveLetter YourDriveLetter -ReTrim -Verbose
   ```
   Example:
   
   ```powershell
   Optimize-Volume -DriveLetter E -ReTrim -Verbose
   ```
3. Press **Enter** and wait for the command to complete.

As the TRIM operation progresses, you can watch the reported free space in the VergeOS dashboard increase as the blank data on the volume is removed.

If this does not resolve the issue, TRIM may not be enabled. To check if TRIM is enabled:

1. Run the following **FSUTIL** command:

   ```powershell
   fsutil behavior query disabledeletenotify
   ```

   If the value is **1**, TRIM is not enabled on the drive.

2. To enable TRIM, run:

   ```powershell
   fsutil behavior set disabledeletenotify 0
   ```

   After enabling, rerun the TRIM commands.

## Trimming a Linux Drive

Newer Linux distros have TRIM enabled by default via a systemd service or a cron job. To check if automated TRIM is enabled, follow these steps:

1. **Ensure the prerequisite steps** from above are complete.

Example: **Ubuntu Server**

1. Launch a terminal.
2. Enter the following commands to check the status:

   - Check TRIM Timer/Schedule Status:
     
     ```bash
     sudo systemctl status fstrim.timer
     ```
   - Check TRIM Service Status:
     
     ```bash
     sudo systemctl status fstrim
     ```

If TRIM is enabled, an operation will run at the next scheduled time. If TRIM is not enabled, you can run a manual TRIM using:

```bash
sudo fstrim -av
```

!!! info
    It is recommended to enable automatic TRIM to ensure that data usage is reflected accurately between VergeOS and the guest OS.

To enable automatic TRIM, run:

```bash
sudo systemctl enable fstrim.timer
```

For more information on `fstrim`, visit the [man page](https://man7.org/linux/man-pages/man8/fstrim.8.html).

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

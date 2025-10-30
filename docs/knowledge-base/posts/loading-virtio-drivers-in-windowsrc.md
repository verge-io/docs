---
title: Loading Virtio Drivers in Windows Recovery Console  
slug: loading-virtio-drivers-in-windows-recovery-console  
description: How to load Virtio Disk and Storage drivers in Windows Recovery Console  
draft: false  
date: 2023-01-24T14:18:13.900Z  
tags:
  - virtio
  - storage
  - recovery console
  - recovery
  - console
  - drivers
  - hard drive
categories:  
  - VM  
  - Troubleshooting  
editor: markdown  
dateCreated: 2022-07-29T15:28:29.904Z  
---

# Loading Virtio Drivers in Windows Recovery Console

If a guest VM running any version of Windows OS with the Virtio-SCSI disk drivers installed is booted into Recovery Console mode, the operating system partition may not be visible as the drivers are not yet loaded.

## Prerequisites

Before starting with recovery work on a guest OS, ensure that the administrator has:

1. Access to the VM, including **tested/known working credentials**.
2. The **Virtio drivers ISO** loaded and available in the VergeOS environment under **Files**.
3. The **Windows OS installation ISO** available in the VergeOS environment.

## Requirements

To load Windows drivers from a Windows Guest OS recovery console, administrators will need:

1. VergeOS UI platform access to the environment running the Guest OS.
2. A copy of the (latest) **Virtio disk drivers** in ISO format.
3. A copy of the **Windows operating system ISO** (example: Windows boot disk).

## Starting the Windows Recovery Console

1. Login to the **console** and follow the Windows installation prompts to navigate to the **Recovery Console** and **Command Prompt**.
2. Once at a command prompt, type the following command to list available disks on the VM:

   ```doscon
   wmic logicaldisk get deviceid, volumename, description
   ```

   Press <kbd>ENTER</kbd>.

   This will return a list of available disks. Typically, **D:** will be the EFI boot volume, **E:** will be the CD installation media, and **X:** will be the active, booted Windows recovery session.

   The Virtio-SCSI disks are likely not present, and the drivers need to be loaded for them to appear.

## Installing the Virtio-SCSI and Storage Drivers

From the **Command Prompt** in the Windows Recovery Console, follow these steps:

1. To load the Virtio-SCSI Storage drivers, type:

   ```doscon
   Drvload e:\vioscsi\2k16\amd64\vioscsi.inf
   ```

   Press <kbd>ENTER</kbd>.

   - **E:** refers to the drive letter where the Virtio ISO is loaded.
   - **2k16\\amd64** refers to the path to the Virtio driver based on OS. Browse the ISO image for paths to other OS versions if needed.

2. To load the Virtio Storage drivers, type:

   ```doscon
   Drvload e:\viostor\2k16\amd64\viosstor.inf
   ```

   Press <kbd>ENTER</kbd>.

   - **E:** refers again to the drive letter where the Virtio ISO is loaded.
   - **2k16\\amd64** refers to the path to the Virtio driver based on OS. Adjust as necessary.

## Verifying the Disk Mount

After loading both drivers, the disk should mount, typically as an **F:** drive.

To verify this, run the command again:

```doscon
wmic logicaldisk get deviceid, volumename, description
```

Press <kbd>ENTER</kbd>. You should now see the newly mounted disk.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

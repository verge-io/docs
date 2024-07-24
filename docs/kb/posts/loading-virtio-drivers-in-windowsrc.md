---
title: Loading Virtio Drivers in Windows Recovery Console
slug: loading-virtio-drivers-in-windows-recovery-console
description: How to load Virtio Disk and Storage drivers in Windows Recovery Console
published: true
date: 2023-01-24T14:18:13.900Z
tags: virtio, storage, recovery console, recovery, console, drivers, hard drive
categories:
  - VM
  - Troubleshooting
editor: markdown
dateCreated: 2022-07-29T15:28:29.904Z
---

## Loading Virtio Drivers in Windows Recovery Console

**If a guest VM, running any version of Windows OS with the Virtio-SCSI disk drivers installed, is booted into Recovery Console mode, the operating system partition is not visible as the drivers are not yet loaded.**


**Before starting with recovery work on a guest OS, ensure that the administrator has:**
1. Access to the VM including **tested/known working credentials**
1. The ISO for Virtio is loaded as available in the VergeIO environment under Media Images
1. The OS installation ISO loaded and available in the VergeIO environment

**To load Windows drivers from a Windows Guest OS recovery console, administrators will need to have the following things before hand:**
1. VergeIO UI platform access to the environment running the Guest OS with an issue
1. A copy of the (latest) virtio disk drivers in an ISO format
1. A copy of the installed system operating system ISO [example: windows boot disk]

**Starting the Windows Recovery Console:**
Login to the console and follow the Windows installation prompts to navigate to the Recovery Console and Command Prompt access inside of that.
Once at a command prompt, type the following command:
`wmic logicaldisk get deviceid, volumename, description` <kbd>ENTER</kbd>

This will return a list of available disks on the virtual machine.  For example: D:, E:, X:
Users can change to each disk to verify the contents.  Typically, D: will be an EFI boot volume, E: will be the CD installation media installed, and X: will be the active, booted Windows recovery session.
The Virtio-SCSI disks are most likely not present and the drivers need to be loaded for them to appear.

**Install the Virtio-SCSI and Storage drivers:**
From the command prompt running in the Windows Recovery Console, type the following command to load the Virtio-SCSI Storage drivers:
`Drvload e:\vioscsi\2k16\amd64\vioscsi.inf` <kbd>ENTER</kbd>
E: ← refers to the drive letter which the virtio iso is loaded.
2k16\ ← refers to the path to the virtio driver, based on OS.  Browse the iso image for paths to other OS versions.

From the command prompt running in the Windows Recovery Console, type the following command to load the Virtio Storage drivers:
`Drvload e:\viostor\2k16\amd64\viosstor.inf` <kbd>ENTER</kbd>
E: ← refers to the drive letter which the virtio iso is loaded.
2k16\ ← refers to the path to the virtio driver, based on OS.  Browse the iso image for paths to other OS versions.
 

After loading both drivers, the disk should mount, typically as an F drive.
This can be verified by again running
`wmic logicaldisk get deviceid, volumename, description` <kbd>ENTER</kbd>

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
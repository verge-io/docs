---
title: Windows Disks Showing Offline After Restarting
slug: windows-disks-showing-offline-after-restarting
description: 
draft: false
date: 2023-01-24T14:16:57.949Z
tags: windows, offline, restarting, disks
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-10T18:23:27.988Z
---

## How to Correct Disks showing Offline after a Windows VM is Restarted
After importing a VM into the VergeOS platform, some (virtual) disks may not come online after a restart of the guest VM.

Beginning in Windows 2008, Microsoft added a setting for the default state of additional (non OS) disk drives.
Occasionally when restarting, Windows may detect a hardware change, which is more likely if the VM was imported from an alternate hypervisor.
When windows detects a hardware change, it may not bring secondary virtual disks online automatically.
To change this to the recommended setting run the following Windows PowerShell:

`Set-StorageSetting -NewDiskPolicy OnlineAll`

Additionally, this can be done from the command line using diskpart or from Disk Management.
<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

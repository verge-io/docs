---
title: Windows Disks Showing Offline After Restarting
slug: windows-disks-showing-offline-after-restarting
description: How to fix secondary virtual disks that show as offline after restarting a Windows VM imported into VergeOS, using the Set-StorageSetting PowerShell command.
author: VergeOS Documentation Team
draft: false
date: 2023-01-24T14:16:57.949Z
semantic_keywords:
  - "windows disks offline after reboot restart"
  - "Set-StorageSetting NewDiskPolicy OnlineAll PowerShell"
  - "imported VM secondary disk not online"
  - "windows disk management virtual machine"
use_cases:
  - fix_offline_disks_after_vm_restart
  - resolve_imported_vm_disk_issues
  - configure_windows_disk_online_policy
tags:
  - windows
  - offline
  - restarting
  - disks
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

```ps1con
Set-StorageSetting -NewDiskPolicy OnlineAll
```

Additionally, this can be done from the command line using diskpart or from Disk Management.

---

!!! note "Document Information"
    - Last Updated: 2024-08-10
    - vergeOS Version: 4.11

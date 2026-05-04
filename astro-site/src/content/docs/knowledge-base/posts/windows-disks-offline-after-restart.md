---
title: Windows Disks Showing Offline After Restarting
slug: knowledge-base/windows-disks-showing-offline-after-restarting
date: 2023-01-24
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

:::note[Document Information]
- Last Updated: 2024-08-10
- vergeOS Version: 4.11
:::

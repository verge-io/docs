---
title: Windows - Slow to Format a New Disk
slug: windows--slow-to-format-a-new-disk
description: Troubleshooting slow disk formatting in Windows VMs.
draft: false
date: 2023-01-23T22:31:24.436Z
tags: vm, windows, slow, format
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-25T17:12:31.551Z
---

## Formatting a Virtual Disk with Windows 2012 (and later) Hosts May Take Longer Than Expected

Windows Server 2012 (and later) hosts will, by default, issue SCSI **TRIM** and **Unmap** commands equivalent to the entire size of the virtual disk. This behavior is the same even if the "Perform a quick format" option is checked, which significantly slows down the format process.

It is possible to disable the **SCSI TRIM** and **Unmap** feature on the host for the duration of the format.

### To Disable TRIM and Unmap

Using a Windows **CMD** window on the host, issue the following command:

```doscon
fsutil behavior set DisableDeleteNotify 1
```

### To Re-enable the Feature

Use the following command to re-enable the **Trim and Unmap** feature:

```doscon
fsutil behavior set DisableDeleteNotify 0
```

### To Verify the Current Setting

You can verify the current **Trim and Unmap** setting by issuing the following command:

```doscon
fsutil behavior query DisableDeleteNotify
```

The output will show one of the following:

- **DisableDeleteNotify=0** - The 'Trim and Unmap' feature is **on** (enabled).
- **DisableDeleteNotify=1** - The 'Trim and Unmap' feature is **off** (disabled).

!!! info "Affected Versions"
    - Only Windows Server 2012 and later hosts are affected. All earlier versions (e.g., Windows 2008) do not exhibit the same issue.

!!! info "Non-server Versions"
    - Non-server versions of Windows (e.g., Windows 8.x and 10.x) do not support the **DisableDeleteNotify** parameter.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - VergeOS Version: 4.12.6

---
title: Windows - Slow to Format a New Disk
slug: windows--slow-to-format-a-new-disk
description: 
published: true
date: 2023-01-23T22:31:24.436Z
tags: vm, windows, slow, format
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-25T17:12:31.551Z
---

## Formatting a Virtual Disk with Windows 2012 (and later) Hosts may take longer than expected

Windows Server 2012 (and later) Hosts will by default issue SCSI TRIM and Unmap commands equivalent to the entire size of the Virtual Disk. This behaviour is the same even if the Perform a quick format option is checked. This will significantly slow down the format process.

It is possible to disable the SCSI TRIM and Unmap feature on the Host for the duration of the format.

Using a Windows CMD window on the Host issue the command:

`fsutil behavior set DisableDeleteNotify 1`

To re-enable the feature use the following command:

`fsutil behavior set DisableDeleteNotify 0`

To verify the current setting use the following command:

`fsutil behavior query DisableDeleteNotify`

DisableDeleteNotify=0 - indicates the 'Trim and Unmap' feature is on (enabled)
DisableDeleteNotify=1 - indicates the 'Trim and Unmap' feature is on (disabled)


> Only Windows Server 2012 and later Hosts are affected. All earlier versions (e.g Windows 2008) do not have the same issue.
{.is-info}

> Non-server versions of Windows (e.g. Windows 8.x and 10.x) do not support the DisableDeleteNotify parameter.
{.is-info}


<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

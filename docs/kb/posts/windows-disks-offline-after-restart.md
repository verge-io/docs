---
title: Windows Disks Showing Offline After Restarting
slug: windows-disks-showing-offline-after-restarting
description: 
published: true
date: 2023-01-24T14:16:57.949Z
tags: windows, offline, restarting, disks
editor: markdown
dateCreated: 2022-08-10T18:23:27.988Z
---

## How to Correct Disks showing Offline after a Windows VM is Restarted
After importing a VM into the VergeIO platform, some (virtual) disks may not come online after a restart of the guest VM.

Beginning in Windows 2008, Microsoft added a setting for the default state of additional (non OS) disk drives.
Occasionally when restarting, Windows may detect a hardware change, which is more likely if the VM was imported from an alternate hypervisor.
When windows detects a hardware change, it may not bring secondary virtual disks online automatically.
To change this to the recommended setting run the following Windows PowerShell:

`Set-StorageSetting -NewDiskPolicy OnlineAll`

Additionally, this can be done from the command line using diskpart or from Disk Management.
<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
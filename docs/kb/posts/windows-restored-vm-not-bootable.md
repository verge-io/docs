---
title: Windows Restored VM Not Bootable
slug: windows-restored-vm-not-bootable
description: 
published: true
date: 2023-01-23T22:31:03.605Z
tags: windows, restored, not bootable, not booting, not restarting, bsod, blue screen
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-10T18:45:23.678Z
---

## After restoring a copy of a virtual machine from a recent snapshot, the restored copy may fail to boot properly.
The VM may stop with a blue screen message which reads: 
- `Your PC ran into a problem and needs to restart.  We're just collecting some error info, and then we'll restart for you.`

There are several reasons at the guest level that can cause a VM running Windows to not start successfully.
The most common issue is generally because the snapshot was not taken in a clean (**Quiesced**) state and usually the result of the Microsoft Windows Update service partially installing update packages.

**Best Practice:**
A guest VM running a Windows OS, and experiencing an unexpected restart is often found to be caused by the Microsoft Windows Update Services being configured to automatically apply updates that frequently require a restart.  To investigate this further, consult with published Knowledge-Base articles about your particular version of Windows. One of the best places to start investigating at a Windows Guest level is using Windows Event Viewer application and reviewing the Windows Update logs for more information.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
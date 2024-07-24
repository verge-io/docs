---
title: Changing resolution on a UEFI VM
slug: changing-resolution-on-a-uefi-vm
description: 
published: true
date: 2023-11-15T21:13:25.425Z
tags: vm, uefi, resolution
categories:
  - VM
  - Troubleshooting
editor: markdown
dateCreated: 2022-09-07T17:26:07.927Z
---

## How To Change the Screen Resolution on a UEFI VM

When you setup a VM using UEFI, only the resolution that is configured in the OVFM Platform configuration is made available to the VM. Here are the steps to change it.

1. Reboot the VM while connected to the Console.
1. Press <kbd>ESC</kbd> to load the UEFI Settings menu.
1. Select Device Manager.
1. Select OVMF Platform Configuration.
1. Select your "Prefered Resolution".
1. Save, and reboot the VM.
<br>
<div style="text-align: center">
  
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>
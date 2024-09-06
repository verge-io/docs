---
title: UEFI Tweaks for Imported VMs
slug: uefi-tweaks-for-imported-vms
description: Addressing UEFI Devices on Imported VMs
draft: false
date: 2023-01-24T14:15:45.862Z
categories:
  - VM
  - Troubleshooting
tags: vm, import, uefi, secure boot, troubleshooting, bios, boot order
editor: markdown
dateCreated: 2022-06-28T14:46:35.084Z
---

# UEFI Disks as Boot Devices Will Not Boot Properly

After importing VM images leveraging UEFI disks as boot devices, sometimes the VM will not boot properly inside the VergeOS platform. To resolve this, tweaks to boot order/options need to be made.

Here is a list of suggested solutions for issues with imported VMs not booting because of guest UEFI BIOS settings:

## Solution 1

1. From a fresh import of the VM (before trying to power it up inside VergeOS), edit the VM in Verge and enable the **UEFI Boot** option.
2. Power on the VM.
3. Hit **ESC** within 5 seconds to get into the VM BIOS (you can edit the VM settings in Verge to increase the boot timer if necessary).
4. Enter the BIOS and navigate to **Boot Manager Options** (this may vary depending on the BIOS).
5. Change the selected boot device to the Verge IO device.
6. Exit the UEFI BIOS.
7. Reboot the VM.

## Solution 2

1. From a fresh import of the VM (before trying to power it up inside VergeOS), edit the VM in Verge and enable the **UEFI Boot** option.
2. Power on the VM.
3. Hit **ESC** within 5 seconds to get into the VM BIOS (you can edit the VM settings in Verge to increase the boot timer if necessary).
4. Enter the BIOS and navigate to **Boot Manager Options** (this may vary depending on the BIOS).
5. Disable **Secure Boot** as an option.
6. Exit the UEFI BIOS.
7. Reboot the VM.

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

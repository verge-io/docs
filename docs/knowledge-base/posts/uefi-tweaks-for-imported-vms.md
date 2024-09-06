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

## UEFI disks as boot devices will not boot properly  

After importing VM images leveraging UEFI disks as boot devices, sometimes the VM will not boot properly inside the VergeOS platform.  To resolve this, tweaks to boot order/options need to be made.


Here is a list of suggested solutions for issues with imported VMs not booting because of guest UEFI bios settings:

### Solution 1

1. From a fresh import of the VM (before trying to power it up inside VergeOS), edit the VM in Verge and enable the UEFI boot option.
2. Power on the VM
3. Hit ESC within 5 seconds to get into the VM BIOS (you can edit the VM settings in Verge to increase the boot timer if necessary)
4. Enter the BIOS and navigate to Boot Manager options (varies by bios)
5. Change the selected boot device to the Verge IO device
6. Exit the UEFI BIOS
7. Reboot the VM 

### Solution 2

1. From a fresh import of the VM (before trying to power it up inside VergeOS), edit the VM in Verge and enable the UEFI boot option.
1. Power on the VM
1. Hit ESC within 5 seconds to get into the VM BIOS (you can edit the VM settings in Verge to increase the boot timer if necessary)
1. Enter the BIOS and navigate to Boot Manager options (varies by bios)
1. Disable secure boot as an option
1. Exit the UEFI BIOS
1. Reboot the VM 
<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

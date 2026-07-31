---
title: SonicWall NSv 7.1.1+ Will Not Boot on VergeOS
slug: sonicwall-nsv-boot-failure-signed-firmware
description: SonicWall NSv virtual firewalls running SonicOS 7.1.1 and later fail to boot after import into VergeOS because the appliance requires SonicWall's own signed OVMF firmware. Support for custom EFI firmware is coming in Q3 2026; here is why the boot fails and what your options are in the meantime.
author: VergeOS Documentation Team
draft: false
date: 2026-07-09T00:00:00.000Z
semantic_keywords:
  - "sonicwall nsv virtual firewall won't boot vergeos"
  - "sonicwall nsv invalid firmware detected import"
  - "sonicos 7.1.1 signed ovmf secure boot firmware"
  - "import sonicwall nsv kvm qcow2 ova vhdx fails"
  - "custom efi firmware nvram vergeos not supported"
use_cases:
  - import_sonicwall_nsv_into_vergeos
  - run_virtual_firewall_on_vergeos
  - troubleshoot_vm_boot_failure_after_import
tags:
  - vm
  - import
  - migration
  - firewall
  - sonicwall
  - nsv
  - secure boot
  - ovmf
  - uefi
  - efi
  - firmware
  - won't boot
  - not booting
  - invalid firmware
  - troubleshooting
categories:
  - Troubleshooting
  - Migration
editor: markdown
dateCreated: 2026-07-09T00:00:00.000Z
---

# SonicWall NSv 7.1.1+ Will Not Boot on VergeOS

SonicWall NSv virtual firewalls running SonicOS 7.1.1 and later cannot currently be imported and booted on VergeOS. This guide explains why the appliance fails to start and what your options are in the meantime.

!!! info "Support coming in Q3 2026"
    We are adding support for custom EFI firmware in Q3 2026, which will allow the SonicWall NSv appliance to boot on VergeOS. Until that support ships, use one of the alternatives described below.

## Symptoms

- You import a SonicWall NSv appliance into VergeOS and it fails to boot.
- The console shows a firmware validation error such as `Invalid firmware detected`.
- The failure is the same no matter which source format you import from — KVM/QCOW2, VMware OVA, or Hyper-V VHDX.

## Overview

SonicWall ships the NSv image with its own custom OVMF firmware files — `OVMF_CODE.sw.fd` and `OVMF_VARS.sw.fd` — that carry SonicWall-specific Secure Boot certificates. At boot, SonicCoreX checks that it is running on exactly that firmware and aborts on anything else.

VergeOS builds and manages each VM's UEFI variable disk itself, from standard OVMF templates, and does not currently allow the EFI disk's media source to be swapped through the UI or API. Because there is no supported way to present SonicWall's custom firmware files to the VM, the appliance's boot-time firmware check fails and the NSv never comes up.

!!! info "Why every import format fails the same way"
    The block is in the appliance's firmware validation, not in any one disk format. Converting or re-importing the image — QCOW2, OVA, or VHDX — does not change the outcome, because none of those paths let you supply SonicWall's signed `.fd` firmware.

!!! note "Applies to SonicOS 7.1.1 and later"
    Earlier SonicOS builds that did not enforce the signed-firmware check are not affected in the same way. The behavior described here is specific to NSv on 7.1.1+.

## Options in the meantime

Any virtual firewall that boots on standard UEFI firmware runs well on VergeOS, either as a VM or inside a tenant, and can fill the role until NSv support arrives.

If you want to stay on SonicWall today, run the firewall on physical SonicWall hardware and connect it to your VergeOS environment over the network, rather than trying to virtualize the NSv appliance.

!!! question "Need Help?"
    If you are planning a firewall migration into VergeOS and want to talk through options, contact VergeOS support.

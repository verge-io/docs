---
title: Pre-installation Checklist
slug: preinstallation-checklist
description: 
published: true
date: 2023-04-21T13:29:50.040Z
tags: installation, checklist, install guide
categories:
  - Installation
editor: markdown
dateCreated: 2022-10-10T19:52:07.207Z
---

## Main Items
- [ ] Site Survey completed and approved by VergeOS
- [ ] ISO downloaded and installed on a USB drive
- [ ] Encryption Key USB installed and ready (if enabling encryption)
- [ ] Nodes powered up with ISO booted to VergeOS Install screen
- [ ] Crash cart ready if applicable
- [ ] Remote screen share capability or remote IPMI access (WAN or VPN)

## Hardware
- [ ] Hardware burn-in complete
- [ ] All Drives setup for JBOD, **NO RAID**
- [ ] BIOS set to proper boot settings (Legacy / Dual / UEFI) **UEFI is required if all drives are NVMe**
- [ ] Redundant Power supplies setup and connected (recommended)
- [ ] IPMI ports patched and configured
- [ ] IPMI setup / configured / tested
- [ ] Latest IPMI firmware (recommended)
- [ ] Test IPMI remote console capability (in case of incorrect licensing)

## Network
- [ ] All switches online and tested
- [ ] All cables patched
- [ ] All VLANs configured (core and external)
- [ ] All switch ports configured (core and external)
- [ ] 2 NICs per node minimum and separate switches
- [ ] Correct Supported SFP modules (if applicable)
- [ ] Correct IPs validated and available
<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
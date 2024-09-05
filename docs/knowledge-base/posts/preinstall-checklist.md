---
title: Pre-installation Checklist
slug: preinstallation-checklist
description: 
draft: false
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
- [ ] Encryption Key USB prepared (if enabling encryption)
- [ ] Nodes powered up with ISO booted to the VergeOS Install screen
- [ ] Crash cart ready, if applicable
- [ ] Remote screen share capability or remote IPMI access (via WAN or VPN)

## Hardware
- [ ] Hardware burn-in completed
- [ ] All drives set up for **JBOD** (No RAID)
- [ ] BIOS configured to the proper boot settings (Legacy / Dual / UEFI)
    - **Note:** UEFI is required if all drives are NVMe
- [ ] Redundant power supplies connected and set up (recommended)
- [ ] IPMI ports patched and configured
- [ ] IPMI setup tested and configured
- [ ] Latest IPMI firmware installed (recommended)
- [ ] Remote console capability tested via IPMI (in case of licensing issues)

## Network
- [ ] All switches online and tested
- [ ] All cables patched and connected
- [ ] All VLANs configured (core and external)
- [ ] All switch ports configured (core and external)
- [ ] Minimum of 2 NICs per node with connections to separate switches
- [ ] Correct supported SFP modules in use (if applicable)
- [ ] IP addresses validated and available


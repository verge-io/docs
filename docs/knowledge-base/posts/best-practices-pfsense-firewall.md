---
title: Best Practices - Running a pfSense Virtual Firewall
slug: running-a-pfsense-virtual-firewall
description: 
published: true
date: 2023-01-24T19:25:40.944Z
tags: pfsense, firewall, best, practice
categories:
  - Firewall
  - Best Practices
editor: markdown
dateCreated: 2022-09-01T16:45:24.147Z
---

Frequently, pfSense is used as a virtual firewall inside the VergeOS platform and the following are the best practices when creating and maintaining a pfSense virtual firewall VM.

- The disk and network interfaces should be set to VirtIO. Without having the NIC interface set to VirtIO (E1000 is the default) users may experience intermittent traffic stops.
- Inside pfSense, Hardware Checksum Offloading should be disabled for systems experiencing intermittent slowness or packet loss. Enabing the setting disables the virtual machine from relying on the NIC to process this, slowing down the VM considerably.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
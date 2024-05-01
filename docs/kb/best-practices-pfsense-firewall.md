---
title: Best Practices - Running a pfSense Virtual Firewall
description: 
published: true
date: 2023-01-24T19:25:40.944Z
tags: pfsense, firewall, best, practice
editor: markdown
dateCreated: 2022-09-01T16:45:24.147Z
---

Frequently, pfSense is used as a virtual firewall inside the VergeIO platform and the following are the best practices when creating and maintaining a pfSense virtual firewall VM.

- The disk and network interfaces should be set to VirtIO. Without having the NIC interface set to VirtIO (E1000 is the default) users may experience intermittent traffic stops.
- Inside pfSense, Hardware Checksum Offloading should be disabled for systems experiencing intermittent slowness or packet loss. Enabing the setting disables the virtual machine from relying on the NIC to process this, slowing down the VM considerably.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
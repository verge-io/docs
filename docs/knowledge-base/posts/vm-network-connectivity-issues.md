---
title: VM Network Connectivity Issues
slug: vm-network-connectivity-issues
description: 
draft: false
date: 2023-01-24T19:28:39.954Z
tags: vm, networking, NIC, IP, virtio, troubleshooting
categories:
  - Troubleshooting
  - VM
  - Network
editor: markdown
dateCreated: 2022-08-26T17:43:47.993Z
---

## Troubleshooting VM Network Connectivity Issues

Before you begin, verify if other virtual machines in the environment can access the internet. If no other machines can, then there is likely a network issue upstream of the VergeOS platform preventing access to the outside world. 
If other VMs are still able to access the internet, the most likely cause is that a configuration step was missed.

The following are the most common configuration mistakes which cause this:
- The newly created VM does not have a NIC configured. To verify this, review the NICs section of the VM dashboard.  Is there at least one NIC present? If not, add one.
- The newly created VM does have a NIC present but is not connected to the correct network.  To verify this, review the NICs section of the VM dashboard.  Is there at least one NIC present with the status of Up and under the Network a network is listed?  If not, edit the NIC and set the Network to match a VM which has access to the internet.
- The newly created VM does not have an IP address configured properly.   Typically, this is resolved at the guest level.  Consult with documentation on best practices of the guest operating system to verify that the NIC is detected, installed (including guest level drivers) and configured properly at the guest level.
- The Virtio drivers are not installed. Information about installing the virtio drivers can be found in the inline help within the category titled Virtual Machines under the section labeled VM NICs.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
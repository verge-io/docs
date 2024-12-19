---
title: VM Network Connectivity Issues
slug: vm-network-connectivity-issues
description: 
draft: false
date: 2023-01-24T19:28:39.954Z
tags:
  - vm
  - networking
  - NIC
  - IP
  - virtio
  - troubleshooting
categories:
  - Troubleshooting
  - VM
  - Network
editor: markdown
dateCreated: 2022-08-26T17:43:47.993Z
---

# Troubleshooting VM Network Connectivity Issues

Before you begin, verify if other virtual machines in the environment can access the internet. If no other machines can, there may be a network issue upstream of the VergeOS platform that is preventing access to the outside world. If other VMs are still able to access the internet, the most likely cause is that a configuration step was missed.

The following are the most common configuration mistakes that cause network issues:

- **Missing NIC Configuration**: The newly created VM may not have a NIC configured. To verify this, review the **NICs** section of the VM dashboard. Ensure at least one NIC is present. If not, add one.
- **Incorrect Network Assignment**: The VM's NIC may be connected to the wrong network. In the **NICs** section, ensure at least one NIC is present with the status set to **Up**, and verify that the correct network is listed. If not, edit the NIC and assign the correct network (one used by a VM with internet access).
- **Improper IP Configuration**: The VM might not have a properly configured IP address. Typically, this is resolved at the guest level. Refer to the guest operating system’s documentation to ensure the NIC is detected, installed (with drivers), and configured correctly.
- **Virtio Drivers Not Installed**: If the Virtio drivers are not installed, the NIC may not function properly. For instructions on installing Virtio drivers, refer to the [Product Guide](/product-guide/virtual-machines/vm-guest-agent/).

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

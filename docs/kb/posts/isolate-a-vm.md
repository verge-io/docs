---
title: Isolating a VM
slug: isolating-a-vm
description: 
published: true
date: 2023-01-24T19:25:06.933Z
tags: vm, network, isolate
categories:
  - VM
editor: markdown
dateCreated: 2022-09-07T17:13:03.825Z
---

## How to Isolate a Virtual Machine

There are several ways that this can be accomplished, and the best solution depends on a few considerations.
<br>
### Remove the attached network from the VM

In this scenario, the virtual machine will function as if it simply has no network cable plugged in.
If the virtual machine requires no external connectivity to any other network, then before powering on the virtual machine edit the NIC and remove the attached network.  
To accomplish this follow these steps:
1. Navigate to the virtual machine dashboard
1. On the virtual machine dashboard click on **NIC**s, in the left navigation menu to edit the machine's virtual network adapters.
1. Select the NIC and click on **Edit** in the left navigation menu. 
1. In the NIC configuration window, using the drop-down list options, change the Network from its current value to **--None--**.
1. If there are multiple NICs, make sure to repeat this step for **all active/enabled** NICs attached to this VM.
<br>

### Create a new Internal Network

In this scenario, an administrator will create a new internal network that contains no other virtual machines. 
If the VM requires external network connectivity, this is the preferred method.
Information about creating an Internal Network can be found in the inline help within the category titled Networking in the section titled "Internal Networks".
When creating a new internal network, make sure to set a Default Gateway so that this network has outbound access.
After creating a new internal network, modify the virtual machine's NIC so that it is connected to the newly created internal network.
<br>
<div style="text-align: center">
  
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>
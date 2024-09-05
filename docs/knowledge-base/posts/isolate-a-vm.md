---
title: Isolating a VM  
slug: isolating-a-vm  
description:  
draft: false  
date: 2023-01-24T19:25:06.933Z  
tags: vm, network, isolate  
categories:  
  - VM  
editor: markdown  
dateCreated: 2022-09-07T17:13:03.825Z  
---

# How to Isolate a Virtual Machine

Isolating a virtual machine (VM) can be done in several ways, depending on the specific requirements of the environment. Below are two common methods for isolating a VM within VergeOS.

## Remove the Attached Network from the VM

This method essentially simulates unplugging a network cable from the VM, making it function without any external connectivity. It’s suitable when the VM doesn’t need to communicate with any other network.

### Steps to Remove the Network:

1. Navigate to the **Virtual Machine Dashboard**.
2. Click on **NICs** in the left navigation menu to access the VM's virtual network adapters.
3. Select the NIC you want to edit and click **Edit** from the left navigation menu.
4. In the **NIC configuration window**, use the drop-down list to change the **Network** from its current value to **--None--**.
5. If the VM has multiple NICs, repeat this process for all active/enabled NICs.

By removing the network from all NICs, the VM will no longer have network access.

## Create a New Internal Network

If the VM requires connectivity but still needs to be isolated from other networks, creating a **new internal network** with no other VMs connected is the preferred solution.

### Steps to Create an Internal Network:

1. From the VergeOS dashboard, navigate to **Networking** and create a new **Internal Network**.
2. Set a **Default Gateway** for outbound access if needed.
3. After the internal network is created, return to the **VM dashboard** and update the **NIC** to attach the VM to the newly created internal network.

!!! note "For more detailed instructions on creating internal networks, refer to the VergeOS inline help under **Networking** in the **Internal Networks** section."

This method allows the VM to have restricted network access while still providing outbound connectivity through the internal network.

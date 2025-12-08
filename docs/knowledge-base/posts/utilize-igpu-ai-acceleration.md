---
title: Utilizing an iGPU for AI Acceleration
slug: using-igpu-ai-acceleration
description: Instructions for configuring an iGPU (integrated GPU) for AI acceleration
draft: false
date: 2025-12-04T12:39:06.743Z
tags:
  - verge.io
  - ai
  - private ai
  - device passthrough
  - resource groups
  - performance
categories:
  - Advanced Configuration
  - Performance
editor: markdown
dateCreated: 2025-12-01T16:29:03.267Z
---

# Using an iGPU for AI Acceleration

An iGPU (a graphics processing unit built directly into the CPU rather than a separate graphics card) can be used for acceleration of private AI within VergeOS.


Benefits: 
* lower, more efficient power use, requires less cooling
* allows you to leverage igpus that are already included in CPUs rather than being an additional purchase

? why make resource instead of make passthrough?

Performance boost can be substantial depending on the onboard gpu. modern servers have pretty fast igpus, even when they are a bit older and not that hefty you get the advantage of utilizing this built-in hardware and taking the burden off your cores.


Steps:

1. Navigate to **Infrastructure** > **Nodes** and **double-click the node** containing the iGPU.
2. Select the **PCI Devices** card or left-menu option.
3. A listing of all the node's PCI devices is presented. Select ***Display Controller*** from the dropdown at the top of the Type column to filter the list to only display controllers.  
4. Click to select the iGPU device from the filtered list.
5. Click **Make Resource** on the left menu.
6. Create a new Resource Group:
If no resource groups exist, the Resource Group entry form will be presented


? why does the resource still show up in the PCI devices list? - i thought when resources were used they came off the list?

why does resource group created show 2 rules, one with type Host GPU and one with type PCI?, the one with PCI shows 0 resources

7. message at the top of the screen that driver reload is required. 

* when creating resource groups, it is important to use care to select intended device; selecting an incorrect device for passthrough can cause problems

To add additional node iGPUs to the same resource group
* repeat steps 1-5 above.
* When prompted for a resource group to ***Attach to***, you can select the resource group (created above) from the dropdown list. 

by adding iGPUs from different nodes and placing them in the same resource group, you create a pool of igpus that your AI models can pull from.

To learn more about vergeos resource groups, see: [Resource Groups](/product-guide/system/device-pass-overview#resource-groups)







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



How much of an AI performance boost/acceleration can you get?

Steps:

1. Navigate to **Infrastructure** > **Nodes** and **double-click the node** containing the iGPU.
2. Select the **PCI Devices** card or left-menu option.
3. A listing of all the node's PCI devices is presented. Select ***Display Controller*** from the dropdown at the top of the Type column to filter the list to only display controllers.  
4. Click to select the iGPU device from the filtered list.
5. Click **Make Resource** on the left menu.
6. 

To add additional node iGPUs to the same resource group
* repeat steps 1-5 above.
* When prompted for a resource group to ***Attach to***, you can select the resource group (created above) from the dropdown list. 

by adding iGPUs from different nodes and placing them in the same resource group, you create a pool of igpus that your AI models can pull from.

To learn more about vergeos resource groups, see: [Resource Groups](/product-guide/system/device-pass-overview#


?'s 
- do you have to create a resource group for each different node? or does this work like other resource group types where there are rules/filters?
- how do you give AI this resource?  is it across the board for all AI or per model/assistant?
- is there a system where I can experiment or view this setup?
- are there any cautions, best practices, tips that we should include in the documentation?
- how exactly does vRAM work with this?  does it require vRAM?  otherwise, does it utilize regular RAM as well?
- can iGPU (host gpu resource group) be used for anything else other than AI now? what about in the future - will it maybe be used for other services too?



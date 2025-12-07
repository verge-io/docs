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

Navigate to **Infrastructure** > **Resources**.
Click **New** on the left menu.
Configure Resource Group:
* **Name**:
* **Type**: select ***Host GPU***
* **Max vRAM**: (limit the amount of vRAM that can be used?)

?'s 
- do you have to create a resource group for each different node? or does this work like other resource group types where there are rules/filters?
- how do you give AI this resource?  is it across the board for all AI or per model/assistant?
- is there a system where I can experiment or view this setup?
- are there any cautions, best practices, tips that we should include in the documentation?
- how exactly does vRAM work with this?  does it require vRAM?  otherwise, does it utilize regular RAM as well?
- can iGPU (host gpu resource group) be used for anything else other than AI now? what about in the future - will it maybe be used for other services too?



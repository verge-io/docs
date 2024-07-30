---
title: Product Guide - GPU Overview
description: General information about GPU functionality/support within VeregOS
published: true
date: 2023-06-27T13:37:25.185Z
tags: 
editor: markdown
dateCreated: 2023-03-27T19:47:15.647Z
---

# GPU Overview

VeregOS supports both vGPU and GPU passthrough to allow for advanced computational workloads ,e.g. machine learning, research computing and enhanced graphics within VMs.

<br>
<br>

### GPU Passthrough
A physical GPU installed on the host node is presented to a virtual machine; passthrough provides one-to-one access from a single physical GPU to a single VM at a time.  Instructions are available here: [**GPU Passthrough**](/product-guide/GPUPassthrough)  

<br>

### vGPU
A physical GPU installed on the host node is dissected into multiple virtual GPUs; vGPU provides access to multiple VMs simultaneously from a single piece of GPU hardware.  Instructions for configuring NVIDIA GRID (NVIDIA vGPU implementation) on VeregOS are available here: [**NVIDIA vGPU**](/product-guide/nvidiavGPU)

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
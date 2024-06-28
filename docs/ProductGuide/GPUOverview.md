---
title: Product Guide - GPU Overview
description: General information about GPU functionality/support within VergeIO
published: true
date: 2023-06-27T13:37:25.185Z
tags: 
editor: markdown
dateCreated: 2023-03-27T19:47:15.647Z
---

# GPU Overview

VergeIO supports both vGPU and GPU passthrough to allow for advanced computational workloads ,e.g. machine learning, research computing and enhanced graphics within VMs.

<br>
<br>

### GPU Passthrough
A physical GPU installed on the host node is presented to a virtual machine; passthrough provides one-to-one access from a single physical GPU to a single VM at a time.  Instructions are available here: [**GPU Passthrough**](/public/ProductGuide/GPUPassthrough)  

<br>

### vGPU
A physical GPU installed on the host node is dissected into multiple virtual GPUs; vGPU provides access to multiple VMs simultaneously from a single piece of GPU hardware.  Instructions for configuring NVIDIA GRID (NVIDIA vGPU implementation) on VergeIO are available here: [**NVIDIA vGPU**](/public/ProductGuide/nvidiavGPU)

<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
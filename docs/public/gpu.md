---
title: GPU
description: GPU Architecture
published: true
date: 2024-04-03T17:58:24.173Z
tags: 
editor: markdown
dateCreated: 2022-03-01T21:24:48.770Z
---

## Supported GPU Architectures
- Direct Passthrough (1 to 1 mapping) 
- vGPU (1 to many mapping)

## Hardware Compatibility List (Tested)
- NVIDIA
  - vGPU Capabilities
    - Tesla
    - A Series (A2 - A100)
    - A6000

> To take advantage of vGPU functionality, the selected GPU must be compatible with one of the following NVIDIA GRID drivers 13.2, 13.10, 14.0, 15.2, 15.3, 16.0, 16.1, 16.2, 16.3, 16.4 and 16.5.<br>
NVIDIA GRID drivers can be downloaded from your NVIDIA licensing portal or by registering for a [free evaluation](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation) from NVIDIA.
{.is-info}

---
- AMD
> vGPU for AMD is not a supported configuration at this time.
{.is-danger}

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
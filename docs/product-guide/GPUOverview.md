

# GPU Overview

VergeOS supports both vGPU and GPU passthrough to allow for advanced computational workloads ,e.g. machine learning, research computing and enhanced graphics within VMs.

<br>
<br>

### GPU Passthrough
A physical GPU installed on the host node is presented to a virtual machine; passthrough provides one-to-one access from a single physical GPU to a single VM at a time.  Instructions are available here: [**GPU Passthrough**](/docs/product-guide/GPUPassthrough)  

<br>

### vGPU
A physical GPU installed on the host node is dissected into multiple virtual GPUs; vGPU provides access to multiple VMs simultaneously from a single piece of GPU hardware.  Instructions for configuring NVIDIA GRID (NVIDIA vGPU implementation) on VergeOS are available here: [**NVIDIA vGPU**](/docs/product-guide/nvidiavGPU)

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
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

!!! note "Key Points"
    * iGPUs (built directly into many modern server CPUs) can provide accelerated AI inference for small to medium-sized AI models
    * An iGPU can deliver lower heat output, reduced power consumption, and solid throughput compared to CPU‑only execution or discrete GPUs
    * Using iGPU enables AI workloads to take advantage of onboard GPU power that would often be underutilized

??? info "More Information"

    An **iGPU** (integrated graphics processing unit) is built directly into the CPU rather than existing as a separate graphics card. Within VergeOS, an iGPU can be used for private AI acceleration, allowing you to leverage hardware already present in many modern servers. This approach reduces the processing burden on CPU cores while typically requiring less power and cooling than dedicated add‑on GPUs. Because iGPUs are optimized for parallel matrix and vector operations, they are generally more efficient than CPUs for inference workloads.

    iGPUs share system memory with the CPU, which can be a bottleneck. However, for small to medium models this limitation is usually manageable. If your goal is maximum performance, discrete GPU hardware remains the preferred option.

    For lightweight inference tasks (e.g., small language models), iGPUs are often more power‑efficient. For heavy training workloads, neither CPU nor iGPU is ideal.

    On personal servers running modest AI models, iGPU inference offers a sweet spot: less heat, lower power draw, and decent throughput.

    **Benefits of Using an iGPU**  

      - Lower power consumption and reduced cooling requirements compared to CPU‑only execution  
      - Leverages hardware already included in CPUs, avoiding additional purchase costs  
      - Better throughput per watt than CPU cores  
      - Offloads compute burden from CPU cores, improving overall system responsiveness  

    Modern servers often include capable iGPUs. Even older or less powerful servers can provide meaningful acceleration by utilizing this built‑in hardware.

---

## High-Level Steps

To use iGPU for private AI models, the following high-level steps are necessary:

* Create Resource Group: type = "Host GPU"
* Add iGPU device(s) physical nodes to the resource group
* Assign the resource group to one or more AI models

## Configuring a Resource Group with an iGPU

1. Navigate to **Infrastructure** > **Nodes** and **double‑click the node** containing the iGPU.  
2. Select the **PCI Devices** card or left‑menu option.  
3. From the device list, set the **Type** filter (top of the Type column) to ***Display Controller*** to show only display devices.  
4. Select the iGPU device from the filtered list. ⚠️ *Be careful when selecting devices for resource groups. Choosing the wrong device can cause issues.*    
5. Click **Make Resource** in the left menu.  
6. Create a **new Resource Group:**      
* If no groups exist, the entry form will appear automatically.  
* Otherwise, select **Attach to**: ***--New Group--*** and click **Next**  
7. Configure Resource Group fields:    
  * **Name**: Provide a descriptive name, e.g. "iGPU"  
  * **Type**: Select ***Host GPU***  
  * **Max vRAM**: Limit the amount of system RAM available to the iGPU (default = 0; no limit).   
    - On systems running other workloads, set a max vRAM to prevent contention between workloads and iGPU usage.  
    - If max vRAM is set too low, models may fail to load and produce errors.  
8. Click **Submit** to save the new Resource Group with the selected iGPU.  
9. Follow the prompt with link at the top of the dashboard to 
**View the node**, place the node into **Maintenance Mode** (see message at top of node dashboard), and **Reload the driver** (prompted at the top of the dashboard once the node is in maintenance mode).  
10. **Exit Maintenance Mode** on the node once the driver reload completes.  

---

### Adding Additional Node iGPUs to the Same Resource Group

!!! tip "Pooling iGPUs Across Nodes"  
    By adding iGPUs from multiple nodes into the same resource group, you create a shared pool of acceleration resources that AI models can draw from. For more details, see [Resource Groups](/product-guide/system/device-pass-overview#resource-groups)

To add more iGPUs:

* Repeat steps 1–5 above.  
* When prompted for a resource group to ***Attach to***, **select the existing Host GPU resource group**.  
* Follow dashboard prompts to place the node into **maintenance mode** and **reload the driver**.  
* **Exit maintenance mode** after the reload completes.  

---

## Assigning the iGPU Resource Group to a Model

Once configured, assign the Host GPU resource group to your AI model using the ***GPU Resource Group Allocation*** setting.  This allows the model to draw from any available iGPUs in the resource group.

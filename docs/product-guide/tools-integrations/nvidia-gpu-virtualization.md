---
title: "NVIDIA GPU Virtualization"
description: "NVIDIA integration with VergeOS enables GPU acceleration for virtual machines through vGPU and Multi-Instance GPU (MIG) technologies, allowing multiple VMs to share physical GPU resources with performance isolation."
semantic_keywords:
  - "NVIDIA vGPU virtualization VergeOS"
  - "GPU passthrough shared GPU virtual machines"
  - "MIG multi-instance GPU partitioning"
  - "AI ML GPU compute virtual desktop acceleration"
use_cases:
  - vgpu_shared_gpu_workloads
  - ai_ml_compute_acceleration
  - professional_graphics_vdi
  - gpu_resource_management
  - live_migration_gpu_vms
tags:
  - nvidia
  - vgpu
  - gpu
  - mig
  - ai
  - vdi
  - passthrough
  - acceleration
categories:
  - Automation
---

# NVIDIA GPU Virtualization

## Overview

The NVIDIA integration with VergeOS enables GPU acceleration for virtual machines through NVIDIA's vGPU and Multi-Instance GPU (MIG) technologies. Multiple VMs can share physical GPU resources while maintaining performance isolation, managed through VergeOS [resource groups](/product-guide/system/device-pass-overview#resource-groups) and policies alongside traditional VMs.

!!! warning "Licensing Required"
    NVIDIA vGPU functionality requires a valid **NVIDIA vGPU software license** that matches your selected profile type and workload. See [Supported Hardware](#supported-hardware) for details.

## Supported Hardware

- Only select data center and professional GPUs support vGPU. Verify hardware and driver compatibility in the [NVIDIA vGPU Supported GPUs](https://docs.nvidia.com/vgpu/gpus-supported-by-vgpu.html){target="_blank"} list.
- NVIDIA vGPU supports Windows and Linux guest operating systems. Feature availability varies by OS — see the [NVIDIA vGPU Product Support Matrix](https://docs.nvidia.com/vgpu/latest/product-support-matrix/index.html){target="_blank"} for details.
- IOMMU (VT-d) and SR-IOV must be enabled in the host BIOS.
- For an overview of licensing options, refer to the [NVIDIA Licensing Guide](https://www.nvidia.com/en-us/data-center/virtual-solutions/){target="_blank"}.

## Architecture

The NVIDIA integration consists of three layers:

**Physical Layer:**

- NVIDIA GPU hardware installed in VergeOS nodes
- NVIDIA vGPU host drivers (uploaded as bundle drivers to the vSAN)
- IOMMU/SR-IOV hardware virtualization support

**Virtualization Layer:**

- VergeOS resource groups for GPU device management and allocation
- Configurable vGPU profiles for different workload types
- Time-sliced vGPU sharing (software-scheduled) or SR-IOV hardware partitioning, depending on the GPU model
- Policy-based resource allocation and scheduling

**Application Layer:**

- NVIDIA guest drivers installed within VMs (optionally attached as a driver ISO from the resource group)
- CUDA runtime and development libraries
- AI frameworks, professional applications, and VDI clients

## vGPU Profile Types

When configuring vGPU resources, NVIDIA uses a letter suffix to indicate the profile type and intended workload:

| Profile Series | Primary Use Case | Required License | CUDA Support | Max Displays |
|---------------|------------------|-----------------|--------------|--------------|
| **A-Series** | Virtual Applications | vApps | No | 1 |
| **B-Series** | Virtual Desktops | vPC | No | Up to 4 |
| **C-Series** | AI/ML Compute | AI Enterprise | Full | 1 |
| **Q-Series** | Professional Graphics | vWS | Full | Up to 4 |

!!! note "C-Series Licensing"
    C-series profiles require an **NVIDIA AI Enterprise** license (not standard vGPU software). C-series was removed from standard vGPU software in version 16.0.

### Choosing a Profile

- **B-Series** — Standard office VDI deployments where users need basic graphics acceleration without CUDA
- **Q-Series** — Professional workstations running CAD, 3D rendering, or applications that require certified NVIDIA drivers
- **C-Series** — Dedicated GPU compute for AI/ML training and inference workloads with no display requirements
- **A-Series** — Lightweight application streaming (e.g., RDSH/Citrix) where a single display is sufficient

Frame buffer sizes and maximum display counts vary by specific profile within each series. For full profile specifications, see the [NVIDIA vGPU User Guide](https://docs.nvidia.com/vgpu/latest/grid-vgpu-user-guide/index.html){target="_blank"}.

### Multi-Instance GPU (MIG)

Supported GPUs (such as the A100, H100, and RTX PRO 6000 Blackwell) can be partitioned into multiple isolated GPU instances using NVIDIA MIG technology. Each MIG instance provides dedicated compute, memory, and memory bandwidth — unlike time-slicing, there is no resource contention between instances.

MIG instances can each run their own vGPU profile (A/B/Q), and when combined with time-sliced vGPU sharing within each instance, high-end GPUs like the RTX PRO 6000 Blackwell can support up to 48 concurrent VMs from a single physical GPU.

MIG profiles appear in the VergeOS resource group profile dropdown with a `MIG` prefix. For details on available MIG configurations, see the [NVIDIA MIG User Guide](https://docs.nvidia.com/datacenter/tesla/mig-user-guide/index.html){target="_blank"}.

## Key Capabilities

- **Shared GPU Resources**: Multiple VMs share a single physical GPU, maximizing hardware utilization instead of dedicating a GPU per VM
- **Live Migration**: Move GPU-accelerated VMs between nodes without downtime (requires matching GPU model and vGPU profile on source and destination nodes)
- **Tenant Isolation**: Hardware-level separation and performance guarantees between GPU workloads, with support for [passing vGPU devices to tenants](/product-guide/system/nvidia-vgpu-configuration#share-an-nvidia-vgpu-to-a-tenant)
- **Dynamic Allocation**: Scale GPU resources based on workload demands and priorities

!!! tip "Full GPU Passthrough"
    If your workload requires exclusive access to an entire physical GPU (e.g., for maximum performance or unsupported vGPU hardware), consider [PCI device passthrough](/product-guide/system/generic-pci-passthrough) instead of vGPU.

## Implementation Resources

### Getting Started

1. Review [Device Passthrough Overview](/product-guide/system/device-pass-overview) for foundation concepts
2. Follow the [NVIDIA vGPU Configuration](/product-guide/system/nvidia-vgpu-configuration) guide for step-by-step setup

### Advanced Configuration

- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices) — Performance optimization guidelines
- [Maintenance Mode](/product-guide/operations/maintenance-mode) — Required when rebooting nodes for driver installation

### External Documentation

- [NVIDIA vGPU Documentation](https://docs.nvidia.com/vgpu/){target="_blank"} — Official NVIDIA vGPU documentation
- [NVIDIA Developer Portal](https://developer.nvidia.com/){target="_blank"} — CUDA development resources and tools
- [NVIDIA Enterprise Support](https://www.nvidia.com/en-us/support/enterprise/){target="_blank"} — Professional support services

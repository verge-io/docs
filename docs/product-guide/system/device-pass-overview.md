# Device Passthrough Overview

VergeOS supports various types of device passthrough, allowing virtual machines to access physical devices connected to their host servers 

!!! tip "To enable PCI passthrough (exclusive, SR-IOV NIC, or vGPU), correct passthrough/virtualization features must be configured in your server BIOS; Intel hosts will require ***VT-d and VT-x*** enabled, while AMD will require ***AMD-vi/AMD-V***, ***IOMMU*** enabled.  Names of settings will vary across BIOS vendors; other common names to look for include terms similar to ***virtualization***, ***PCI Passthrough***, ***PCIe ****, etc. Consult your hardware vendor documentation if uncertain."

## PCI Passthrough Risks/Precautions

### Critical Host Devices

Never passthrough boot devices, primary system controllers, core fabric network controllers, or any other device needed by the host. Passing through a host-critical device will make it unavailable to the host which can render individual nodes or your complete system unstable or unusable.

### Alternative Management Access

Precautions should be taken before configuring PCI or Network controller passthrough, as incorrect configuration can result in loss of remote access to the system.  Prior to making changes, **verify you have the password for the "admin" user (user ID #1) AND ensure you have an alternative method to reach the nodes: physical console access or IPMI access.**

### IOMMU Grouping Requirements

All PCI devices within the same IOMMU group are passed through together (a single IOMMU group cannot be split among different guests). Examples of a single IOMMU group containing multiple PCI devices include: GPUs along with their audio controllers; a dual-port NIC (both ports); devices using a PCI riser card that allows multiple devices on the same PCI slot.

When configuring any PCI device for passthrough, it is important to be aware of all the devices within the same IOMMU group, to ensure that a host-necessary component is not inadvertently passed through.  If a host-critical component is configured for passthrough, it is unloaded and may cause an impaired or crashed system. You can view IOMMU group membership of PCI devices in Resource Manager: Infrastructure > Resources > PCI Devices.  This will list all detected PCI devices on all nodes.  Click the *IOMMU* column heading to sort and more easily determine devices within a IOMMU group.

## Resource Groups

VergeOS Resource Groups are used for all device passthrough; a device must be part of resource group to be passed through to a VM or tenant.  A resource group can contain just a single device or a pool of multiple same (or highly similar) devices to be available for VMs (or for tenants to, in turn, provide to their own VMs).  To attach a device to a VM or tenant, the resource group is selected, which allows the VM to pull an available device from the pool as needed (e.g. when the VM/tenant is powered on).  

## Resource Rules

Resource rules contain filter criteria that determine devices to include in a resource group. Each rule can filter available devices based on a combination of attributes such as device name, vendor, slot, serial number; available fields will vary depending on the particular type (PCI, USB, SR-IOV NIC or NVIDIA vGPU).

### Auto-Generation

Generally, it is recommended (and easiest) to allow the system to auto-generate resource rules by selecting a device for passthrough.  Instructions for auto-generating resource rules are included in the links (Types of device passthrough) provided below.

### Manual Creation/Editing

The KB Article: [Device Passthrough - Advanced Configuration](/knowledge-base/dev-passthrough-advanced) provides information regarding manually creating and editing resource rules.

## Types of Device Passthrough

* [**One-to-One PCI passthrough**](/product-guide/system/generic-pci-passthrough) - enables a VM to utilize a PCI device that is physically installed on the host, providing single device to single VM access (at a time). The PCI device functions as if physically attached to the guest operating system.  

* [**USB Device Passthrough**](/product-guide/system/usb-passthrough) - allows a VM to access a USB device connected to the host machine. This allows users to access USB devices within a VM as if they were directly connected to the VM. Single device to single VM access (at a time) is provided.

* [**NVIDIA vGPU**](/product-guide/system/nvidia-vgpu) - a physical NVIDIA GPU installed on the host node is dissected into multiple virtual GPUs; vGPU provides multiple VMs access to a single piece of GPU hardware.

* [**SR-IOV VF NICs**](/product-guide/system/sriov-nics) -- the Single Root I/O Virtualization (SR-IOV) specification is utilized to create multiple virtual functions (virtualized instances of a network adapter) from one physical, SR-IOV-capable, NIC which are then made available for use in VMs.

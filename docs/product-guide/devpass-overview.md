# Device Passthrough - Overview

VergeOS provides multiple methods of device passthrough in order to allow physical devices connected to host servers to be used by a VM as if it were directly connected.  

## Types of Device Passthrough

* **Straight PCI device passthrough** - enables access to a pci hardware device from a virtual machine. the PCI device functions as if is physically attached to the guest operating system. Single device to single vm access

* **USB Device Passthrough** -  allows a virtual machine (VM) to access a USB device that's connected to the host machine. This allows users to use USB devices within a VM as if they were directly connected to it. Single device to single VM access.

* **vGPU** - A physical GPU installed on the host node is dissected into multiple virtual GPUs; vGPU provides access to multiple VMs simultaneously from a single piece of GPU hardware.

* **SR-IOV VF NICs** -- the Single Root I/O Virtualization (SR-IOV) specification is utilized to create multiple virtual functions (virtualized instances of a network adapter) from one physical network device; these virtualized network adapters are provided to vritual machines. A single PCIe physical Network device is used to create multiple.....

PCI Rule fields
* **Name**
* **Slot**
* **Class**
* **Class HEX**
* **device_type**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**  
* **Driver**

nvidia gpu Rule fields
* **Name**
* **Slot**
* **Virtual Function**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**
* **Physical Function** 
* **Type ID**

SR-IOV NIC Rule fields

* **Name**
* **Slot**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**
* **Physical slot** 

USB Rule fields
* **Bus**
* **Device**
* **Path**
* **Vendor ID**
* **Model ID**
* **Serial**
* **USB Version**
* **Speed**
* **Interface Drivers**

Rule operators:

* **Equal**
* **Not Equal**
* **Less than**
* **Less than or equal**
* **Greater than**
* **Greater than or equal**
* **Begins With**
* **Ends with**
* **Contains (case sensitive)**
* **Contains (case insensitive)**
* **Regex**

facts:

* in order for a device to be passed through it must meet be in a resource group by way of meeting the criteria defined in a rule
* a resource group must have at least one rule configured in order to have any associated devices
* a device will only end up in one resource group - the first one that has a rule that fits the device
* when a passthrough device is consumed by a vm or tenant it is called an instance and it then cannot be used by another until said vm/tenant is powered off/reset?
* instances are shown on the resource group dashboard page
* When a passthrough device is consumed by a tenant it is thick-provisioned to that tenant and cannot be used by another tenant or vm, even if the tenant has not yet passed the device through to one of its vms.
* you assign a resource group to a tenant or vm so that it can grab an individual device from the available devices in the pool.
*a resource group can be created automatically when you select a specific device (straight pci passthrough, vgpu, usb, or sr-iov nic) and set it up for passthrough
* a resource rule can be created automatically when you select a device (straight pci passthrough, vgpu, usb, or sr-iov nic) and set it up for passthrough (recommended method).
* It is possible to create a rule manually, but it can be complex because it requires procurring specific device information such as precise names, vendor names, serial numbers, hex codes, etc.

## Resource Group

A resource group provides a pool of same (or highly similar) devices to pass through to tenants/VMs. One or more resource rules are associated with a resource group to define the devices that will comprise the group.

## Resource Rules

Rules provide filter criteria to specify the devices to include in a resource group. Each rule can filter available devices based on a combination of attributes such as device name, vendor, slot, serial number; available fields will vary depending on the resource type (PCI, USB, SR-IOV NIC or vGPU).


PCI Rule fields
* **Name**
* **Slot**
* **Class**
* **Class HEX**
* **device_type**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**  
* **Driver**

nvidia gpu Rule fields
* **Name**
* **Slot**
* **Virtual Function**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**
* **Physical Function** 
* **Type ID**

SR-IOV NIC Rule fields

* **Name**
* **Slot**
* **Vendor**
* **Device**
* **Vendor Device (Hexidecimal)**
* **Physical slot** 

USB Rule fields
* **Bus**
* **Device**
* **Path**
* **Vendor ID**
* **Model ID**
* **Serial**
* **USB Version**
* **Speed**
* **Interface Drivers**

Rule operators:

* **Equal**
* **Not Equal**
* **Less than**
* **Less than or equal**
* **Greater than**
* **Greater than or equal**
* **Begins With**
* **Ends with**
* **Contains (case sensitive)**
* **Contains (case insensitive)**
* **Regex**

facts:

* in order for a device to be passed through it must meet be in a resource group by way of meeting the criteria defined in a rule
* a resource group must have at least one rule configured in order to have any associated devices
* a device will only end up in one resource group - the first one that has a rule that fits the device
* when a passthrough device is consumed by a vm or tenant it is called an instance and it then cannot be used by another until said vm/tenant is powered off/reset?
* instances are shown on the resource group dashboard page
* When a passthrough device is consumed by a tenant it is thick-provisioned to that tenant and cannot be used by another tenant or vm, even if the tenant has not yet passed the device through to one of its vms.
* you assign a resource group to a tenant or vm so that it can grab an individual device from the available devices in the pool.
*a resource group can be created automatically when you select a specific device (straight pci passthrough, vgpu, usb, or sr-iov nic) and set it up for passthrough
* a resource rule can be created automatically when you select a device (straight pci passthrough, vgpu, usb, or sr-iov nic) and set it up for passthrough (recommended method).
* It is possible to create a rule manually, but it can be complex because it requires procurring specific device information such as precise names, vendor names, serial numbers, hex codes, etc.
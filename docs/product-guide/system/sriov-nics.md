# SR-IOV NICs

VergeOS provides support for SR-IOV-capable network cards, allowing multiple device instances (virtual functions) to be shared to tenants and VMs from a single PCIe network controller device.

!!! note "VergeOS provides built-in, virtualized network adapter capability for virtual machines.  SR-IOV virtual function NICs are supported (version 4.13 and greater) for scenarios where direct NIC passthrough is a requirement. Where direct NIC passthrough is used, VergeOS networking is bypassed, losing inherent portability, redundancy, and other network features."

## Host Installation/Configuration

!!! danger "It is important to read and be familiar with [**PCI Passthrough Risks and Precautions**](/product-guide/system/device-pass-overview#pci-passthrough-risksprecautions) before making passthrough configurations."

The following instructions will configure virtual function passthrough by automatically creating necessary resource rules for each set of virtual functions and attaching the rules to the selected resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/system/device-pass-overview#resource-rules).

1. Navigate to the **Resource Manager Dashboard** (**Infrastructure** > **Resources**) **-OR-** Navigate to a **specific node dashboard** (**Infrastructure** > **Nodes** > double-click desired node in the list.)
2. Click **SR-IOV NICs**. Any existing configured SR-IOV virtual devices will display in the listing that appears.
3. Click **NIC PCI Devices** on the left menu.  The listing of compatible physical devices will display.
4. **Select the desired device(s)** in the list and click **Make Passthrough** on the left menu.
5. **Select an SR-IOV resource group** from the list **-OR-** **Create a new SR-IOV resource group**.

### Creating an SR-IOV NIC Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group, e.g. *SR-IOV NIC vlan10*
2. **Type**: ***SR-IOV NIC***.
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: ***Network***. This field is only used to apply an associated icon to the resource group, and does not affect functionality.

#### SR-IOV NIC Settings

* Specify the **number of VF Devices** (per physical device). The total number of VF Devices to create will be the number specified multiplied by the number of physical devices selected.  
* Check the ***User Defined*** option for fields where a VM user should be allowed to override the specified setting; fields that do not have the User Defined option checked cannot be changed by the user when attaching the device to a VM.  
* **Native VLAN**: (optional) VLAN tag for the virtual device.
* **VLAN Protocol**: *802.1Q* (default) is the most widely used. *802.1ad* provides support for QinQ (nesting of VLAN tags).
* **Minimum Transmit Bandwith (Mbps)**: (optional) can be set to ensure transmission at least at specified minimum (per vf).  This can be used to give different resource groups different shares of overall bandwidth. Setting of 0 disables rate limiting. The Minimum Transmit Bandwidth setting must be set to a lower value than the Maximum Transmit Bandwidth.
* **Virtual Link State**:  
  ***Auto*** - the VF state will simply mirror that of the associated physical device.  
  ***Enable*** - will allow the virtual device to communicate with other virtual devices on the same host even when the physical device is down.  
  ***Disable*** - packets sent by the virtual device are dropped by the hardware.
* **Spoof Checking**: turn Mac spoof checking on/off for the virtual device.
* **VLAN QOS (Priority)**: (optional) value 0-7; sets QOS priority for vf traffic.  QOS priority is dependent on hardware, driver, and guest OS support.
* **Maximum Transmit Bandwidth (Mbps)**: can be set to limit bandwidth (per vf).  This can be used to give different resource groups (i.e. pools of virtual functions) different shares of overall bandwidth.
* **Trust**: when turned on, the VM consumer is able to set specific features which may impact security and/or performance (e.g. multicast promiscuous mode); certain use cases, such as layer 2 services, will require Trust to be turned on.
* **Query RSS Checking**: when turned on, device configuration information can be obtained from the virtual device within the guest OS; some devices will prohibit this by default because information can be considered sensitive when shared between virtual and physical device.
  
5. Click **Submit** to finish creating the new resource group.

After the resource group is selected/created, a **Success** message should appear indicating resource rules were created for the device(s).

6. **A reboot of the associated node(s) may be necessary**; a message will appear at the top of the Resource Manager dashboard.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/operations/maintenance-mode) procedures when rebooting a node to avoid workload disruptions."

The resource group dashboard contains the resource rules that were auto-generated for your selected devices. You can click an individual rule to view configuration detail. A system-created rule can be modified as needed; for example, the *Node* filter can be changed to *-- None --* to include matching devices from all nodes.  Information regarding resource rules is available at: [**Device Passthrough Overview - Resource Rules**](/product-guide/system/device-pass-overview#resource-rules)

## VM/Guest Configuration

1. Navigate to the **VM dashboard** (from the top menu: Virtual Machines > List > double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager: from the Resource Group dashboard > double-click the desired SR-IOV Group > View Machine Devices > New; select the VM from the Machine dropdown list."

### Device Entry Form fields

* **Name**: provide a name to identify the device, e.g. "Intel xl710 sriov", or leave blank to allow the system to auto-generate a device name.
* **Type**: select ***SR=IOV NIC***;
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate SR-IOV resource group from the dropdown list
* **Count**: indicate the number of SR-IOV vf devices to attach to the VM (from this resource group).
* **SR-IOV NIC Settings**: options available here will depend on the *User Defined* toggle selections defined in the SR-IOV Settings of the resource group (See **SR-IOV Settings** above.)
  
4. Click **Submit** to complete adding the new device.
5. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
6. Install any required client **NIC drivers**. Required driver(s) will vary depending on specific SR-IOV NIC make/model and guest operating system; consult hardware vendor documentation.
7. **Restart** the VM.

## Share SR-IOV Devices to a Tenant

SR-IOV devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through SR-IOV virtual function NICs to the tenant, a new resource group is created within the tenant.  

!!! note "When devices are shared to a tenant, they are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants even when not in use.)"

1. Navigate to the desired **tenant dashboard** (from the top menu: Tenants > List > double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Enter a **Name** or leave blank to allow the system to auto-create a name; this name will be used for the resource group created in the tenant.
7. **Type**: set to ***SR-IOV NIC***.
8. **Description**: provides a place to store additional administrative information about the device pool.
9. **Count**: number of virtual function NICs to pass into the tenant resource group.
10. A specific **MAC Address** can be entered or leave blank to allow the system to auto-generate a MAC Address (It is recommended to leave this field blank, allowing unique, system-generated MAC addresses to avoid inadvertently introducing duplicate MAC addresses within the same network.)
11. When fields are completed, click **Submit** to finish passing to the tenant.
12. The device(s) will now be available as a resource group to attach to tenant VMs.  Follow [**VM/Guest Configuration**](#vmguest-configuration) instructions above.  In order to use the passthrough device, the VM must run on the tenant node where the device is attached.

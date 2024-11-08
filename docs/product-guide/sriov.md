# SR-IOV NICs

VergeOS provides support for SR-IOV-capable network cards allowing multiple device instances (virtual functions) to be shared to tenants and VMs from a single PCIe network controller device.

!!! note "VergeOS provides built-in virtualized network adapters for virtual machines.  SR-IOV virtual function NICs are supported (version 4.13 and greater) for scenarios where direct NIC passthrough is a requirement. Where direct NIC passthrough is used, VergeOS networking is bypassed, losing its built-in portability, redundancy, and other network features."

## Host Installation/Configuration

The following instructions will configure virtual function passthrough by automatically creating a new rule for each defined set of virtual functions and attaching that rule to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule?. -->

!!! danger "Precautions should be taken before configuring direct PCI/Network controller passthrough as incorrect configuration can result in loss of remote access to the system.  **Verify you have the password for the "admin" user (user ID #1) AND ensure you have an alternative method to reach the nodes: physical console access or IPMI access.**"

1. Navigate to the **Resource Manager Dashboard** (Main Dashboard -> Resources) **-OR-** Navigate to a **specific node dashboard** (Main Dashboard -> Nodes -> double-click desired node in the list.)
2. Click the **SR-IOV NIC Devices**. (Any existing configured SR-IOV virtual devices will display in the listing that appears.)
3. Click **NIC PCI Devices** on the left menu.  The listing of compatible physical devices will display.
4. Select the desired device(s) in the list and click **Make Passthrough** on the left menu.
5. **Select an SR-IOV resource group** from the list **-OR-** **Create a new SR-IOV resource group** for the device(s).
If no SR-IOV resource groups exist, or you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.

### Creating an SR-IOV NIC Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group, e.g. *SR-IOV NIC vlan10*
2. **Type**: set to ***SR-IOV NIC***.
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: select ***Network***. This field is only used to apply an associated icon to the resource group, and does not affect functionality.

#### SR-IOV NIC Settings

* Specify the **number of VF Devices** (per physical device). The total number of VF Devices to create will be the number specified multiplied by the number of physical devices that were selected.  
* Select the ***User Defined*** option (checkbox) for fields where a VM user should be allowed to override the specified setting; fields that do not have the User Defined option checked cannot be changed by the user when attaching the device to a VM.  
* **Native VLAN**: (optional) VLAN tag for the virtual device.
* **VLAN Protocol**: 802.1Q (default) is the most widely used. 802.1ad provides support OinQ (nesting of VLAN tags).
* **Minimum Transmit Bandwith (Mbps)**: (optional) can be set to ensure transmission at least at specified minimum (per vf).  This can be used to give different resource groups different shares of overall bandwidth. Setting of 0 disables rate limiting.
!!! note "The Minimum Transmit Bandwidth setting must be set to a lower value than the Maximum Transmit Bandwidth."
* **Virtual Link State**:
  ***Auto*** - the VF state will simply mirror that of the associated physical device.
  ***Enable*** - will allow the virtual device to communicate with other virtual devices on the same host even when the physical device is down.
  ***Disable*** - packets sent by the virtual device are dropped by the hardware.
* **Spoof Checking**: turn Mac spoof checking on/off for the virtual device.  ?? what about if you select --default-- where is the default determined?
* **VLAN QOS (Priority)**: (optional) value 0-7; sets QOS priority for vf traffic.  QOS priority is dependent on hardware, driver, and guest OS support.
* **Maximum Transmit Bandwidth (Mbps)**: can be set to limit bandwidth (per vf).  This can be used to give different resource groups (i.e. pools of virtual functions) different shares of overall bandwidth.
* **Trust**: when turned on, the VM consumer is able to set specific features which may impact security and/or performance (e.g. multicast promiscuous mode); certain use cases, such as layer 2 services, will require Trust to be turned on.
* **Query RSS Checking**: when turned on, device configuration information can be obtained from the virtual device within the guest OS; some devices will prohibit this by default because some information can be considered sensitive when shared between Virtual device and physical device.
  
1. Click **Submit** to finish creating the new resource group.

After the resource group is selected, or new one created, a **Success* message should appear indicating resource rules were created for the device(s).

The resource group dashboard appears.  The Rules section will display the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the automatically created rule by clicking Edit on the left menu. For example, edit Node to -- -- None -- to include matching devices from all nodes.
General information about resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager: from the Resource Group dashboard -> double-click the desired SR-IOV Group -> View Machine Devices -> New; select the VM from the Machine dropdown list."

### Device Entry Form fields

* **Name**: provide a name to identify the device, e.g. "Intel xl710 sriov", or leave blank to allow the system to auto-generate a device name.
* **Type**: select ***SR=IOV NIC***;
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate SR-IOV resource group from the dropdown list
* **Count**: indicate the number of SR-IOV vf devices to attach to the VM (from this resource group).
* **SR-IOV NIC Settings**: options available here will depend on the *User Defined* toggle selections defined in the SR-IOV Settings of the selected resource group (See [SR-IOV Settings](sr-iov-nic-settings) above.)
  
4. Click **Submit** to complete adding the new device.
5. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
6. Install any required client **NIC drivers**. Required driver(s) will vary depending on specific SR-IOV NIC make/model and guest operating system; consult hardware vendor documentation.

## Sharing an SR-IOV Device to a Tenant

SR-IOV devices can be passed to a tenant so that it can pass to its own VMs.  

1. Navigate to the desired **tenant dashboard** (Main Dashboard -> Tenants -> Tenants -> double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Reference the [**Device Entry Form Fields**](#device-entry-form-fields) above.
7. When fields are completed, click **Submit** to complete adding the new device.
8. The device will now be available to attach to tenant VMs.  Follow [**VM/Guest Configuration**](vm/guest-configuration) instructions above.  VM must run on the tenant node where the device is attached to use the passthrough device.

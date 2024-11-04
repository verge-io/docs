# SR-IOV NICs

VergeOS provides support for SR-IOV-capable network cards to allow multiple instances to be shared to tenants and VMs from a single PCIe device.

!!! note "In most situations, using emulated (virtio) NICs for VMs will be preferred as this will allow you to take advantage of the full set of VergeOS network virtualization features.  SR-IOV NICs are supported (VergeOS version 4.13 and greater) for scenarios where hardware-assisted virtualization is desirable.

## Host Installation/Configuration

The following instructions will configure virtual function passthrough by automatically creating a new rule for each defined set of virtual functions and attaching that rule to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule?. -->

1. Navigate to the **Resource Manager Dashboard** (Main Dashboard -> Resources)
**-OR-**
Navigate to a **specific node dashboard** (Main Dashboard -> Nodes -> double-click desired node in the list.)
2. Click the **SR-IOV NIC Devices**. (Any existing configured SR-IOV virtual devices will display in the listing that appears.)
3. Click **NIC PCI Devices** on the left menu.  The listing of compatible physical devices will display.
4. Select the desired device(s) in the list and click **Make Passthrough** on the left menu.
5. **Select an SR-IOV resource group** from the list **-OR-**  **Create a new SR-IOV resource group** for the device(s).
If no SR-IOV resource groups exist, or you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.

### Creating an SR-IOV NIC Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group, e.g. *SR-IOV NIC vlan10*
2. **Type**: should be set to ***SR-IOV NIC***.
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: select ***Network***. This field is only used to apply an associated icon to the resource group, and does not affect functionality.

### SR-IOV NIC Settings

* Specify the number of VF Devices (per physical device).
!!! tip "The total number of VF Devices to create will be the number specified multiplied by the number of physical devices that were selected."  
* Select the ***User Defined*** option for fields that you want to allow VM user to override the specified setting; fields that do not have the User Defined option checked cannot be changed by the consumer(user that is attaching the device to a VM)  
* **Native VLAN**:
* **VLAN Protocol**: 802.1Q is the most widely used. 802.1ad provides nesting of VLAN tags ??switch hardware dependent? considerations for the need for 2 sets of VLAN IDs (outer and inner VLAN)
* **Minimum Transmit Bandwith (Mbps)**: can be set to ensure transmission at least at specified minimum (per vf).  This can be used to give different resource groups different shares of overall bandwidth. Setting of 0 disables rate limiting. 
!!! tip "The Minimum Transmit Bandwidth setting must be set to a lower value than the Maximum Transmit Bandwidth."

* **Virtual Link State**:
  ***Auto*** - the VF state will simply mirror that of the associated physical device.
  **Enable** - will allow the virtual device to communicate with other virtual devices on the same host even when the physical device is down. 
  **Disable** - packets sent by the virtual device are dropped by the hardware.
* **Spoof Checking**: turn Mac anti-spoof checking on or off for the virtual device.  ?? what about if you select --default-- where is the default determined?
* **VLAN QOS (Priority)**: ?? what are valid values here?  does this setting take precedence over priority settings elsewhere?  does this priority only work when you have certain configuration on your switch, etc?
* **Maximum Transmit Bandwidth (Mbps)**: can be set to limit bandwidth.  This can be used to give different resource groups different shares of overall bandwidth.
* **Trust**: when turned on, the VM consumer is able to set specific features which may impact security and/or performance (e.g. multicast promiscuous mode); for certain use cases, such as layer 2 services, will require Trust to be turned on.
* **Query RSS Checking**: when turned on, allows querying of RSS configuration from a specific virtual device; some devices will prohibit querying RSS by default because some information can be considered sensitive when shared between Virtual device and physical device.
  
5. Click **Submit** to finish creating the new resource group.

After the resource group is selected,or new one created, a **Success* message should appear indicating resource rules were created for the device(s)

The resource group dashboard appears.  The Rules section will display the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the automatically created rule by clicking Edit on the left menu.
For example, edit Node to -- -- None -- to include matching devices from all nodes.
General information about resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager: from Resource Group dashboard -> double-click the desired SR-IOV Group -> View Machine Devices -> New; select the VM from the Machine dropdown list."

1. Device Entry Form fields:

* **Name**: provide a name to adequately identify the type of device, e.g. "Intel xl710 sriov", or leave blank to allow the system to auto-generate a device name.
* **Type**: select ***SR=IOV NIC***;
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate SR-IOV resource group from the dropdown list
* **Count**: indicate the number of SR-IOV vf devices to attach to the VM (from this resource group).
* **SR-IOV NIC Settings**: options available here will depend on the *User Defined* toggle selections defined in the SR-IOV Settings of the selected resource group (See [SR-IOV Settings](sr-iov-nic-settings) above.)
  
5. Click **Submit** to complete adding the new device.
6. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
7. Install any required client **NIC drivers**. Required driver(s) will vary depending on specific SR-IOV NIC make/model and guest operating system; consult hardware vendor documentation.


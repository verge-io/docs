# One-to-One PCI Passthrough

One-to-One PCI passthrough involves giving a single VM, at a time, access to a PCI device that is physically attached to a VergeOS node. The VM guest operating system utilizes the device as if it were directly attached.

!!! warning "It is important to use caution when configuring a device for PCI passthrough as it involves unloading drivers, making the device unavailable at the host. Before configuring PCI passthrough, be sure that the device is not used/necessary on the host server, e.g. a NIC used for the core fabric network, etc."

have to unload driver and reboot node?

## Host Installation/Configuration

!!! danger "It is important to read and be familiar with [**PCI Passthrough Risks and Precautions**](/product-guide/devpass-overview#pci-passthrough-risksprecautions) before making passthrough configurations."

The following instructions will configure virtual function passthrough by automatically creating a new rule for each defined set of virtual functions and attaching that rule to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule?. -->

1. Navigate to the **Resource Manager Dashboard** (Main Dashboard -> Resources)
**-OR-**
Navigate to a **specific node dashboard** (Main Dashboard -> Nodes -> double-click desired node in the list.)
1. Click **PCI Devices**.
2. Select the desired device(s) in the list and click **Make Passthrough** on the left menu.
3. **Select an existing PCI device resource group** from the list **-OR-**  **Create a new SR-IOV resource group** for the device(s).
If no PCI devices resource groups exist, or you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.

### Creating a PCI Devices Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group, e.g. *PCI GPUs*
2. **Type**: should be set to ***PCI***.
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: select the most appropriate classification from the dropdown list. This field is only used to apply an associated icon to the resource group, and does not affect functionality.
5. Click **Submit** to finish creating the new resource group.

6. **A reboot of the associated node(s) may be necessary**; a message will appear at the top of the Resource Manager dashboard.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."

After the resource group is selected or created, a **Success* message should appear indicating resource rules were created for the device(s).

The resource group dashboard contains a ***Rules*** section displaying the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the automatically created rule by clicking Edit on the left menu.
For example, edit Node to -- -- None -- to include matching devices from all nodes.
General information about resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager; this method allows for adding multiple devices to the VM at once. From Resource Group dashboard -> double-click the desired SR-IOV Group -> View Machine Devices -> New; select the VM from the Machine dropdown list."

4. Device Entry Form fields:

* **Name**: provide a name to adequately identify the type of device, e.g. "Intel xl710 sriov", or leave blank to allow the system to auto-generate a device name.
* **Type**: select ***SR=IOV NIC***;
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate SR-IOV resource group from the dropdown list
* **Count**: indicate the number of PCI devices to attach to the VM (from this resource group).
  
1. Click **Submit** to complete adding the new device.
2. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
3. Install any required client **NIC drivers**. Required driver(s) will vary depending on specific SR-IOV NIC make/model and guest operating system; consult hardware vendor documentation.

## Passthrough a PCI Device to a Tenant

PCI devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through PCI devices to the tenant, a new resource group is created within the tenant.  

!!! note "When devices are shared to a tenant, they are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants even when not in use.)"

1. Navigate to the desired **tenant dashboard** (Main Dashboard -> Tenants -> Tenants -> double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Enter a **Name** or leave blank to allow the system to auto-create a name; this name will be used for the resource group created in the tenant.
7. **Type**: set to ***SR-IOV NIC***.
8. **Description**: provides a place to store additional administrative information about the device pool.\
9. **Count**: number of virtual function NICs to pass into the tenant resource group.
10. A specific **MAC Address** can be entered or leave blank to allow the system to auto-generate a MAC Address (It is recommended to leave this field blank, allowing unique, system-generated MAC addresses to avoid inadvertently introducing duplicate MAC addresses within the same network.)
11. When fields are completed, click **Submit** to finish passing to the tenant.
12. The device(s) will now be available as a resource group to attach to tenant VMs.  Follow [**VM/Guest Configuration**](vm/guest-configuration) instructions above.  In order to use the passthrough device, the VM must run on the tenant node where the device is attached.

# One-to-One PCI Passthrough

One-to-One PCI passthrough involves giving a single VM at a time, access to a PCI device that is physically attached to a host node. The VM guest operating system utilizes the device as if it were directly attached.

## Host Installation/Configuration

!!! danger "It is important to read and be familiar with [**PCI Passthrough Risks and Precautions**](/product-guide/devpass-overview#pci-passthrough-risksprecautions) before making passthrough configurations."

1. Navigate to the **Resource Manager Dashboard** (Main Dashboard > Resources)
**-OR-**
Navigate to a **specific node dashboard** (Main Dashboard > Nodes > double-click desired node in the list.)
2. Click **PCI Devices**.
3. Select the desired device(s) in the list and click **Make Passthrough** on the left menu.
4. **Select an existing PCI device resource group** from the list **-OR-** **Create a new PCI resource group**.

### Creating a PCI Devices Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group, e.g. *PCI GPUs*
2. **Type**: ***PCI***
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: select the most appropriate classification from the dropdown list. This field is only used to apply an associated icon to the resource group, and does not affect functionality.
5. Click **Submit** to finish creating the new resource group.

6. **A reboot of the associated node(s) may be necessary**; a message will appear at the top of the Resource Manager dashboard.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."

After the resource group is selected/created, a **Success* message should appear indicating resource rules were created for the device(s).

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (Main Dashboard > Machines > Virtual Machines > double-click desired VM in the listing).
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager; this method allows for adding multiple devices to the VM at once. From Resource Group dashboard > double-click the desired PCI Group > View Machine Devices > New; select the VM from the Machine dropdown list."

4. Device Entry Form fields:

* **Name**: provide a name to adequately identify the type of device(s), or leave blank to allow the system to auto-generate a device name.
* **Type**: ***PCI***
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate PCI resource group from the dropdown list
* **Count**: indicate the number of PCI devices to attach to the VM (from this resource group).
  
5. Click **Submit** to complete adding the new device.
6. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
7. Install any required client **drivers**. Consult hardware vendor documentation.
8. **Restart the VM**.

## Passthrough a PCI Device to a Tenant

PCI devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through PCI devices to the tenant, a new resource group is created within the tenant.  

!!! note "When devices are shared to a tenant, they are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants even when not in use.)"

1. Navigate to the desired **tenant dashboard** (Main Dashboard > Tenants > Tenants > double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Enter a **Name** or leave blank to allow the system to auto-create a name; this name will be used for the resource group created in the tenant.
7. **Type**: set to ***PCI***.
8. **Description**: provides a place to store additional administrative information about the device pool.
9. **Count**: number of devices to pass into the tenant resource group.
10. When fields are completed, click **Submit** to finish passing to the tenant.
11. The device(s) will now be available as a resource group to attach to tenant VMs.  Follow [**VM/Guest Configuration**](#vmguest-configuration) instructions above.  In order to use the passthrough device, the VM must run on the tenant node where the device is attached.

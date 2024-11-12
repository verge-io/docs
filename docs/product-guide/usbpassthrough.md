# USB Passthrough

USB devices connected to a host can be passed to VMs (and tenants to pass to their VMs), allowing a device to appear and behave as if it were directly attached within the VM.  

Example USB passthrough devices include:

* drives containing software license keys
* security cameras/monitoring equipment
* keyboard/mouse (supporting use among multiple VMs; often more convenient than dual/multi-boot VM configurations for specialized hardware)

## Host Installation/Configuration

The following instructions will configure device passthrough by automatically creating a new rule for each selected device and attaching the device(s) to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).

1. Navigate to the **Resource Manager Dashboard** (*Main Dashboard > Resources*)
**-OR-**
Navigate to a **specific node** where the USB devices are plugged in. (*Main Dashboard > Nodes* > double-click desired node in the list.)
2. Click **USB Devices**. The listing of detected USB devices will display.
!!! tip "A USB device showing a value in the *Resource Group* and *Resource Rules* columns is already configured for passthrough."
3. **Select** the appropriate **USB device(s)** from the list.
!!! note "All selected devices will be added to the same resource group (resource pool), but each will have a separate resource rule created."

4. Click **Make Passthrough** on the left menu.
5. **Create a new USB resource group** **-OR-** **Select a USB resource group** from the list.

### USB Resource Group Fields

* **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group.
* **Type**: ***USB***.
* **Description**: (optional) field to provide more administrative text about the resource group.
* **Class**: allows selection of a general device classification for the group; for example, Generic USB device, Human Input device, Media, etc. This field is only used to apply an associated icon and does not affect functionality.

#### USB Settings

* **Allow Guest Reset**: When checked, VM user is able to reset the USB device.  
* **Allow Guest Resets All**: When checked, VM user is able to reset the USB hub the device is plugged into.
!!! note "The reset action of a USB device depends on the device driver; some devices support a reset and some do not."

After the resource group is selected or new one created, a **Success* message should appear indicating resource rules were created for the device(s).

6. **A reboot of the associated node(s) may be necessary**; a message will appear at the top of the Resource Manager dashboard.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."

The resource group dashboard contains the resource rules that were auto-generated for your selected devices. You can click an individual rule to view configuration detail. A system-created rule can be modified as needed; for example, the *Node* filter can be changed to *-- None --* to include matching devices from all nodes.  Information regarding resource rules is available at: [**Device Passthrough Overview - Resource Rules**](/product-guide/devpass-overview#resource-rules)

## VM/Guest Configuration

1. Navigate to the **VM dashboard** (Main Dashboard > Machines > Virtual Machines > double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager: from the Resource Group dashboard > double-click the desired SR-IOV Group > View Machine Devices > New; select the VM from the Machine dropdown list."

### Device Entry Form fields

* **Name**: provide a name to identify the device, e.g. "exapp license key" or leave blank to allow the system to auto-generate a device name.
* **Type**: ***USB***
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate USB resource group from the dropdown list
* **USB Settings**: see above.
  
4. Click **Submit** to complete adding the new device.
5. Install any required client drivers; consult device hardware documentation, if needed.
6. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.

## Passthrough a USB Device to a Tenant

USB devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through USB devices to the tenant, a new resource group is created within the tenant.  

!!! note "When devices are shared to a tenant, they are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants even when not in use.)"

1. Navigate to the desired **tenant dashboard** (Main Dashboard -> Tenants -> Tenants -> double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Enter a **Name** or leave blank to allow the system to auto-create a name; this name will be used for the resource group created in the tenant.
7. **Type**: ***USB***.
8. **Description**: provides a place to store additional administrative information about the device/device pool.
9. **USB Settings**: see above.
10. When fields are completed, click **Submit** to finish passing to the tenant.
11. The device(s) will now be available as a resource group to attach to tenant VMs.  Follow [**VM/Guest Configuration**](#vmguest-configuration) instructions above.  In order to use the passthrough device, the VM must run on the tenant node where the device is attached.

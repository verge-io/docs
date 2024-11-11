# USB Passthrough

USB devices connected to a VergeOS host can be passed through to VMs (and tenants to pass to their VMs) allowing the device to appear and behave as if it were directly attached within the VM.  Example USB passthrough devices might include:

    * drives containing software license keys
    * security cameras/monitoring equipment
    * usb keyboard/mouse (supporting use among multiple VMs; often more convenient than dual/multi-boot VM configurations for specialized hardware)

## Host Installation/Configuration

The following instructions will configure device passthrough by automatically creating a new rule for each selected device and attaching the device(s) to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule. -->

1. Navigate to a **specific node dashboard** (Main Dashboard -> Nodes -> double-click desired node in the list.)
2. Click the **USB Devices** card.
3. Click **NVIDIA PCI Devices** on the left menu.  The listing of detected USB devices will display.
!!! tip "A USB device showing a value in the *Resource Group* and *Resource Rules* columns is already configured for passthrough."
4. **Select** the appropriate **USB device(s)** from the list.
!!! note "All selected devices will be added to the same resource group (resource pool), but each will have a separate resource rule created."

5. Click **Make Passthrough** on the left menu.
6. **Create a new USB resource group** **-OR-** **Select a USB resource group** from the list.
If no USB resource groups exist, or you select **--New Group--**, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group:

### USB Resource Group Fields

* **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group.
* **Type**: should be set to ***USB***.
* **Description**: optional field to provide more administrative text about the resource group.
* **Class**: allows selection of a general device classification for the group; for example, Generic USB device, Human Input device, Media, etc. This field is only used to apply an associated icon and does not affect functionality.

#### USB Settings**

* **Allow Guest Reset**: When checked, VM user is able to reset the USB device.  
* **Allow Guest Resets All**: When checked, VM user is able to reset the USB hub the device is plugged into.
!!! note "The reset action of a USB device depends on the device driver; some devices support a reset and some do not."

After the resource group is selected or new one created, a **Success* message should appear indicating resource rules were created for the device(s).

7. **A reboot of the associated node(s) may be necessary**; a message will appear at the top of the Resource Manager dashboard.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."

The Resource Group dashboard contains the ***Rules*** section displaying the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the automatically created rule by clicking Edit on the left menu.
For example, edit Node to -- -- None -- to include matching devices from all nodes.
General information about resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

## Passthrough a USB Device to a Tenant

USB devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through USB devices to the tenant, a new resource group is created within the tenant.  

!!! note "When devices are shared to a tenant, they are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants even when not in use.)"

1. Navigate to the desired **tenant dashboard** (Main Dashboard -> Tenants -> Tenants -> double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Enter a **Name** or leave blank to allow the system to auto-create a name; this name will be used for the resource group created in the tenant.
7. **Type**: set to ***USB***.
8. **Description**: provides a place to store additional administrative information about the device/device pool.
9. Set **USB Settings**: see above.
10. When fields are completed, click **Submit** to finish passing to the tenant.
11. The device(s) will now be available as a resource group to attach to tenant VMs.  Follow [**VM/Guest Configuration**](vm/guest-configuration) instructions above.  In order to use the passthrough device, the VM must run on the tenant node where the device is attached.

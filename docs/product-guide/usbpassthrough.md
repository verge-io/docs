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

After the resource group is selected or new one created, a **Success* message should appear indicating resource rules were created for the device(s)

The resource group dashboard appears.  The Rules section will display the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the automatically created rule by clicking Edit on the left menu.
For example, edit Node to -- -- None -- to include matching devices from all nodes.
General information about resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

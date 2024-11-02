# USB Passthrough

general information
* any usb device
    example passthrough usb devices:
    * drives containing software license keys
    * security cameras/monitoring equipment
    * usb keyboard/mouse (from host for use among multiple VMs, often more convenient than dual boot configurations)
* consult general device passthrough page for more information that pertains to all passthrough devices


Host Configuration (to automatically create a new rule based on a selected device and configure the device for passthrough)
Select the desired USB device:
* Navigate to the Resource Manager dashboard (Main Dashboard -> Resources)
-OR-
*Navigate to a specific node dashboard (Main Dashboard -> Nodes -> double-click desired node in the list.)
* click the usb devices card.
* select the appropriate usb device(s) from the list.
* Click **Make Passthrough** on the left menu.

* Select an existing USB resource group to attach to
-OR-
* Create a new USB resource group for the device(s).
If no USB resource groups exist or if you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new USB resource group.

A **Success* message should appear indicating resource rules were created for the device(s)

note here about a rule created for each selected device.

The selected/created resource group dashboard appears.

To view the automatically created rules, click the Rules card and double-click an individual rule in the list.

maybe link here to resource rules dash, view, edit, etc.

The Resource Rule Dashboard

* **General Configuration**
* **Node Resources Count**
* **Node Resources list**
* **USB Filter - Matches**

You can modify the automatically created rule by clicking Edit on the left menu.

maybe link to page that talks about editing rules

For example, edit Node to -- -- None -- to include matching devices from all nodes. 




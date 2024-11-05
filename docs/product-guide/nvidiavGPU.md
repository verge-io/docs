

# NVIDIA vGPU (Virtual GPU)

VergeOS allows seamless utilization of NVIDIA's GRID vGPU platform to provide multiple VMs with access to a single physical GPU at the same time. vGPU access delivers accelerated graphics and high-processing throughput for machine learning, blockchain applications, etc.

!!! info "NVIDIA GRID licensing is required to use NVIDIA vGPU."

---

## Host Installation/Configuration

1. Obtain the appropriate NVIDIA Linux-KVM driver for your GPU hardware. GRID vGPU drivers can be downloaded from your NVIDIA licensing portal or by registering for an NVIDIA free evaluation: [**https://nvidia.com/en-us/data-center/resources/vgpu-evaluation**](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation).
!!! tip "VergeOS supports bundle-version NVIDIA drivers.  For a list of currently supported NVIDIA drivers, navigate to Resource Manager -> Groups -> New Group. Set Type="NVIDIA vGPU" and click the button to view compatible 3rd Party drivers.  Typically, you will want to use the most recent driver in this list that is compatible with your NVIDIA hardware."

2. Upload the NVIDIA bundle driver to the VergeOS vSAN. For directions on uploading to the vSAN, see:
[**Uploading to the vSAN (Media Images)**](/product-guide/uploadingtovSAN)

Resource group and resource rule are required for device passthrough. The following instructions will configure a selected vGPU device for virtual function passthrough, automatically creating a new rule for each selected device and attaching the device(s) to a resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule. -->

1. Navigate to the **Resource Manager Dashboard** (*Main Dashboard -> Resources*)
**-OR-**
Navigate to a **specific node dashboard** (*Main Dashboard -> Nodes* -> double-click desired node in the list.)
2. Click the **NVIDIA vGPUs** card. (Any existing configured vGPUs will display in the listing.)
3. Click **NVIDIA PCI Devices** on the left menu.  A listing of compatible physical devices will display.
4. **Select a vGPU resource group** from the list **-OR-**  **Create a new vGPU resource group** in which to place the device.
If no vGPU resourcselect --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.

### Creating a New NVIDIA vGPU Resource Group

1. **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of device(s) in this group.
2. **Type**: should be set to ***USB***.
3. **Description**: optional field to provide more administrative text about the resource group.
4. **Class**: select ***vGPU***. This field is only used to apply an associated icon to the resource group, and does not affect functionality.
5. Select the appropriate driver. The **Driver** dropdown list will contain NVIDIA vGPU drivers found in media images.  The appropriate driver will need to be uploaded to the vSAN before it can be selected (Steps 1-2 above.)  
6. Click **Submit** to save the resource group.  
After the resource group is selected or new one created, a **Success* message should appear indicating resource rules were created for the device(s)
7. If this driver has not been used previously, a reboot of the associated node(s) will be necessary before you can complete the vGPU configuration.  
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."
8. After the node(s) are rebooted (if necessary), navigate to the NVIDIA vGPU resource group (Main Dashboard -> Resources -> Groups -> double-click the appropriate group.)
9. Click **Edit** on the left menu.
10. Select the desired **NVIDIA vGPU Profile** from the dropdown list.  Consult NVIDIA vGPU documentation for information regarding available profile types.
11. The **Make Guest Driver ISO** option can be used to automatically create a guest driver ISO file from the NVIDIA driver bundle selected for the resource group.  If you select this option, leave the Driver ISO field set to --Default--; the system will automatically create the iso file (based on the bundle driver selected), and specifiy it as the Driver ISO for the resource group.
12. The **Driver ISO** file specifies an ISO file that can be attached to consuming VMs providing a convenient way to access client drivers for installation within the guest operating system.  (Select the ***Attach Guest Drivers*** option when attaching the device to a VM or tenant.)
13. Click **Submit** to save the client driver settings for the resource group.

The resource group dashboard appears.  The Rules section will display the created rules. If you wish to examine the configuration of an individual rule, click the Rules card and double-click an individual rule in the list.

You can modify the auto-generated rule by clicking Edit on the left menu.
For example, the *Node* filter can be changed to *-- None --* to include matching devices from all nodes.
Information regarding resource rules is available at: [Resource Rules](/product-guide/devpass-overview#resourcerules)

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager; this method allows for adding multiple devices to the VM at once. From Resource Group dashboard -> double-click the desired vGPU Group -> View Machine Devices -> New; select the VM from the MAchine dropdown list."

### Device Entry Form fields

* **Name**: provide a name to adequately identify the type of vGPU/profile, e.g. A16-4Q.
* **Type**: select NVIDIA vGPU
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the    appropriate NVIDIA vGPU resource group from the dropdown list.
* **Count**: indicate the number of vGPU devices to attach to the VM. (This option is only available when device entry is accessed via Resource Manager.)
* **Attach Guest Drivers**: if a guest driver ISO was specified on the resource group, you can check this option to automatically attach a CD-ROM drive, loaded with NVIDIA guest drivers, to the VM.
* **Frame Rate Limit**: to set a cap on frames per second.  This can
* **Disable Console VNC**: this option can be used when the vGPU should be used for the primary display, e.g. access solely via RDP.
**Advanced NVIDIA settings; consult NVIDIA documentation for information on the following options:**
* **Enable Unified Memory**
* **Enable NVIDIA CUDA Toolkit Debuggers**
* **Enable NVIDIA CUDA Toolkit Profiles**
  
4. When fields are completed, click **Submit** to complete adding the new device.
5. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
6. Install required **NVIDIA guest driver(s)**; required driver(s) will vary depending on specific GPU model and guest OS version. If the option was selected to attach guest drivers, a CD-ROM drive should be available containing necessary NVIDIA drivers for install.
7. Consult NVIDIA documentation for client vGPU licensing requirements/instructions.

!!! hint "Client licensing may involve generating a client config token on the NVIDIA licensing server that will need to be downloaded into the VM guest, followed by a VM reboot."

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

## Sharing an NVIDIA vGPU Device to a Tenant

NVIDIA vGPU devices can be passed to a tenant for the tenant to pass to its own VMs.  

1. Navigate to the desired **tenant dashboard** (Main Dashboard -> Tenants -> Tenants -> doube-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Reference the [**Device Entry Form Fields**](#device-entry-form-fields) above.
7. When fields are completed, click **Submit** to complete adding the new device.
8. The device will now be available to attach to tenant VMs.  Follow [**VM/Guest Configuration**](vm/guest-configuration) instructions above.

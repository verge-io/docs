

# NVIDIA vGPU (Virtual GPU)

VergeOS allows you to seamlessly utilize NVIDIA's GRID vGPU platform which allows multiple VMs to access a single physical GPU at the same time. vGPU provides VMs with accelerated graphics as well as high-processing throughput for machine learning, blockchain applications, etc.

!!! info "NVIDIA GRID licensing is required to use NVIDIA vGPU."

---

## Host Installation/Configuration

1. Obtain the appropriate NVIDIA Linux-KVM driver for your GPU hardware. GRID vGPU drivers can be downloaded from your NVIDIA licensing portal or by registering for an NVIDIA free evaluation: [**https://nvidia.com/en-us/data-center/resources/vgpu-evaluation**](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation).
!!! tip "VergeOS supports NVIDIA bundle drivers.  For a list of currently supported NVIDIA drivers, navigate to Resource Manager -> Groups -> New Group -> set Type="NVIDIA vGPU". Click the button to view compatible 3rd Party drivers.  Typically, you will want to use the most recent driver in this list that is compatible with your NVIDIA hardware."

2. Upload the NVIDIA bundle driver to the VergeOS vSAN. For directions on uploading to the vSAN, see:
[**Uploading to the vSAN (Media Images)**](/product-guide/uploadingtovSAN)

The following instructions will configure virtual function passthrough by automatically creating a new rule for each selected device and attaching the device(s) to the resource group. For more information about how resource groups and resource rules work, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview#resource-rules).
<!-- later possibly add a link to instructions for manually creating a resource group rule. -->

1. Navigate to the **Resource Manager Dashboard** (Main Dashboard -> Resources)
**-OR-**
Navigate to a **specific node dashboard** (Main Dashboard -> Nodes -> double-click desired node in the list.)
2. Click the **NVIDIA vGPUs** card. (Any existing configured vGPUs will display in the listing.)
3. Click **NVIDIA PCI Devices** on the left menu.  The listing of compatible physical devices will display. 
4. **Select a vGPU resource group** from the list **-OR-**  **Create a new vGPU resource group** for the device(s).
If no vGPU resource groups exist, or you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.
5. Select the appropriate driver. The **Driver** dropdown list will contain NVIDIA vGPU drivers found in media images.  The appropriate driver will need to be uploaded to the vSAN before it can be selected (Steps 1-2 above.)  
6. Click **Submit** to save the driver selection.  
7. If this driver has not been used previously, a reboot of the associated node(s) will be necessary before you can complete the vGPU configuration.  
!!! caution "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."
8. After the node(s) are rebooted (if necessary), navigate to the NVIDIA vGPU resource group (Main Dashboard -> Resources -> Groups -> double-click the appropriate group.)
9. Click **Edit** on the left menu.
10. Select the desired **NVIDIA vGPU Profile** from the dropdown list.  Consult NVIDIA vGPU documentation for information regarding available profile types.
11. The **Make Guest Driver ISO** option can be used to automatically create a guest driver *.ISO file, from the NVIDIA driver bundle selected for the resource group.  If you select this option, leave the Driver ISO field set to --Default--; the system will automatically create the iso file (based on the bundle driver selected), and specifiy it as the Driver ISO for the resource group.
12. The **Driver ISO** file specifies an ISO file that can be attached to consuming VMs providing a convenient way to access client drivers for installation within the guest operating system.  (Use the ***Attach Guest Drivers*** option when configuring guest device.)

## VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach vGPU devices to a VM via Resource Manager; this method allows for adding multiple vGPU devices to the VM at once. From Resource Group dashboard -> double-click the desired vGPU Group -> View Machine Devices -> New; select the VM from the MAchine dropdown list."

4. Device Entry Form fields:

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
*  **Enable NVIDIA CUDA Toolkit Debuggers**
* **Enable NVIDIA CUDA Toolkit Profiles**
  
5. Click **Submit** to complete adding the new device.
6. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
7. Install required **NVIDIA guest driver(s)**; required driver(s) will vary depending on specific GPU model and guest OS version. If the option was selected to attach guest drivers, a CD-ROM drive should be available containing necessary NVIDIA drivers for install.
8. Consult NVIDIA documentation for client vGPU licensing requirements/instructions.

!!! hint "Client licensing may involve generating a client config token on the NVIDIA licensing server that will need to be downloaded into the VM guest, followed by a VM reboot."

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
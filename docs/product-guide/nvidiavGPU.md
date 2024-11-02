

# NVIDIA vGPU (Virtual GPU)

!!! info "NVIDIA GRID licensing is required to use NVIDIA vGPU."

---

## Host Installation/Configuration

(to automatically create a new rule based on a selected device and configure the device for passthrough)

vgpu resource groups include vgpu profile as well.

vgpu resource groups can include the option to create guest option iso for the clients as well.
 

1. Obtain appropriate NVIDIA Linux-KVM driver for your GPU hardware. GRID vGPU drivers can be downloaded from your NVIDIA licensing portal or by registering for an NVIDIA free evaluation:[**https://nvidia.com/en-us/data-center/resources/vgpu-evaluation**](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation).
!!! tip "VergeOS supports NVIDIA bundle drivers.  For a list of supported drivers, navigate to resource manager -> Resource Groups -> New -> set Type="NVIDIA vGPU". Click the button to see compatible 3rd Party drivers. Typically the newest driver in the list should be selected."

2. Upload the NVIDIA bundle driver to the VergeOS vSAN. For directions on uploading to the vSAN, see:
[**Uploading to the vSAN (Media Images)**](/product-guide/uploadingtovSAN)
!!! tip "The following steps detail the instructions to automatically create necessary resource rule(s) to configure NVIDIA vGPU device(s) for passthrough to tenants and VMs; this is the recommended method. To manually create a resource rule, see: [**Device Passthrough - Resource Rules**](/product-guide/devpass-overview).

3. Navigate to the Resource Manager dashboard (Main Dashboard -> Resources)
-OR-
Navigate to a specific node dashboard (Main Dashboard -> Nodes -> double-click desired node in the list.)
4. Click the **NVIDIA vGPUs** card. (Any existing configured vGPUs will display in the listing.)
5. Click **NVIDIA PCI Devices** on the left menu. Select a vGPU resource group from the list -OR-
Create a new vGPU resource group for the device(s).
If no vGPU resource groups exist or you select --New Group--, you are presented with the [Resource Group](/product-guide/devpass-overview#resourcegroups) entry form to create a new resource group.
8. Select the appropriate driver. The **Driver** dropdown list will contain NVIDIA vGPU drivers found in media images.  The appropriate driver will need to be uploaded to the vSAN before it can be selected(Steps 1-2 above.)  
9. Click Submit to save the driver selection.  
10. If this driver has not been used previously for a vGPU device, a reboot of the associated node(s) will be necessary before you can complete the vGPU configuration.  !!! caution "Follow proper [**Maintenance Mode**](/product-guide/maintenancemode) procedures when rebooting a node to avoid workload disruptions."
11. After the node(s) are rebooted (if necessary), navigate to the NVIDIA vGPU resource group (Main Dashboard -> Resources -> Groups -> double-click the appropriate group.)
12. Click **Edit** on the left menu.
13. Select the desired **NVIDIA vGPU Profile** from the dropdown list.  Consult NVIDIA vGPU documentation for information regarding available profile types.
14. The **Make Guest Driver ISO** option can be used to automatically create a guest driver *.ISO file, from the NVIDIA driver bundle selected for the resource group.  If you select this option, leave the Driver ISO field set to --Default--; the system will automatically create the iso file (based on the bundle driver selected), and specifiy it as the Driver ISO for the resource group.
15. The **Driver ISO** file specifies an ISO file that can be attached to consuming VMs providing a convenient way to access client drivers for installation within the guest operating system.  (Use the ***Attach Guest Drivers*** option when configuring guest device.)

# VM/Guest Configuration

1. Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "One or more vGPU devices can also be attached to a VM via Resource Manager: from Resource Group dashboard -> double-click the desired vGPU Group -> View Machine Devices -> New; select the VM from the MAchine dropdown list.  The Device Entry form will also provide a field for *Count*, to indicate the number of vGPU devices to attach to the VM."

4. Device Entry Form fields:

* **Name**: provide a name to adequately identify the type of vGPU/profile, e.g. A16-4Q.
* **Type**: select NVIDIA vGPU
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the    appropriate NVIDIA vGPU resource group from the dropdown list.
* **Attach Guest Drivers**: if a guest driver ISO was specified on the resource group, you can check this option to automatically attach a CD-ROM drive, loaded with NVIDIA guest drivers, to the VM.
* **Frame Rate Limit**: to set a cap on frames per second.  This can
* **Disable Console VNC**: this option can be used when the vGPU should be used for the primary display, e.g. access solely via RDP.

**The following are advanced NVIDIA settings; consult NVIDIA documentation for more information:**

* **Enable Unified Memory**
* **Enable NVIDIA CUDA Toolkit Debuggers**
* **Enable NVIDIA CUDA Toolkit Profiles**

5. Click **Submit** to complete adding the new device.
6. The VM will need to be restarted in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Reboot** on the left menu.
7. Install required NVIDIA guest driver(s).; required guest driver will depend on the specific GPU hardware and guest OS version. 
!!! tip "If the option was selected to attach guest drivers, a CD-ROM drive should be available containing necessary NVIDIA drivers for install."
8. Consult NVIDIA documentation client vGPU licensing requirement/instructions.

!!! hint "Client licensing may involve generating a client config token on the NVIDIA licensing that will need to be downloaded to the client system, followed by a VM reboot."

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
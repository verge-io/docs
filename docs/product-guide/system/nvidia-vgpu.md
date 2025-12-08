
# NVIDIA vGPU (Virtual GPU)

VergeOS allows seamless utilization of NVIDIA's GRID vGPU platform to provide multiple VMs access to a single physical GPU at the same time. vGPU access delivers accelerated graphics and high-processing throughput for machine learning, blockchain applications, etc.

!!! info "NVIDIA GRID licensing is required to use NVIDIA vGPU."

---

## Host Installation/Configuration

!!! danger "It is important to read and be familiar with [**PCI Passthrough Risks and Precautions**](/product-guide/system/device-pass-overview#pci-passthrough-risksprecautions) before making passthrough configurations."

1. Obtain the appropriate NVIDIA Linux-KVM driver for your GPU hardware. GRID vGPU drivers can be downloaded from your NVIDIA licensing portal or by registering for an NVIDIA free evaluation: [**https://nvidia.com/en-us/data-center/resources/vgpu-evaluation**](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation).
!!! tip "VergeOS supports bundle-version NVIDIA drivers.  For a list of currently supported NVIDIA drivers, navigate to Resource Manager > Groups > New. Set Type=*NVIDIA vGPU* and click the button to view compatible 3rd Party drivers.  Typically, you will want to use the most recent driver in this list that is compatible with your NVIDIA hardware."

2. Upload the NVIDIA bundle driver to the VergeOS vSAN. See [**Uploading to the vSAN (Files)**](/product-guide/storage/uploading-files-to-vsan) for directions on uploading to the vSAN.  
The following instructions configure selected vGPU device(s) for virtual function passthrough by automatically creating necessary resource rules for each selected device and attaching the device(s) to a resource group. For more information about resource groups and resource rules, see: [**Device Passthrough - Overview**](/product-guide/system/device-pass-overview#resource-group).

3. Navigate to the **Resource Manager Dashboard** (**Infrastructure** > **Resources** from the top menu)   
**-OR-**
Navigate to a **specific node** where the NVIDIA hardware is installed.
4. Click the **PCI Devices** box / menu item.
5. In the list view, select the **Type** filter to **Display controller** near the top of the page.
6. **Select the desired NVIDIA physical device(s).**
7. Click **Make Resource** on the left menu.
8. **Select an existing vGPU resource group** **-OR-** **select --New Group--** to attach the device.

9. **Creating a New NVIDIA vGPU Resource Group**:

   * **Name**: label used to identify the resource group (i.e. device pool); use a descriptive name so that users are easily able to identify the type of devices/vgpu profiles that will be available in this group.
   * **Type**: should be set to ***NVIDIA vGPU***.
   * **Description**: optional field to provide more administrative text about the resource group.
   * **Class**: select ***vGPU***. This field is only used to apply an associated icon to the resource group, and does not affect functionality.
   * **NVIDIA vGPU Profile**: set this to the vGPU type that you want this resource group to create.
!!! info "If this list is empty, you will need to come back to this step after the drivers have been installed.  Once the drivers have been installed on at least one node, this list will contain the available profiles provided by NVIDIA and the hardware."  
   * The **Driver** dropdown list will contain NVIDIA vGPU drivers found in the *Files* section.  The appropriate driver will need to be uploaded to the vSAN before it can be selected (Steps 1-2 above). Select the appropriate driver. 
   * Click **Submit** to save the resource group.  
After the resource group is selected or new one created, a **Success** message should appear indicating resource rules were created for the device(s)
   * If this driver has not been used previously or IOMMU is not yet enabled for the system, **a reboot of the associated node(s)** will be necessary before you can complete the vGPU configuration.  
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/operations/maintenance-mode) procedures when rebooting a node to avoid workload disruptions.  Also, ensure that IOMMU / VT-d / SR-IOV is enabled in the BIOS."
   * After the node(s) are rebooted, if necessary, navigate to the NVIDIA vGPU resource group just created (Infrastructure > Resources > Groups > double-click the group)
   * Click **Edit** on the left menu.
   * Select the desired **NVIDIA vGPU Profile** from the dropdown list.  Consult NVIDIA vGPU documentation for information regarding available profile types for your hardware.
   * The **Make Guest Driver ISO** option can be used to automatically create a guest driver ISO file from the NVIDIA driver bundle selected above.  If you have already created guest drivers, select the ISO in the next step.
   * The **Driver ISO** file specifies an ISO file that can be attached to consuming VMs, providing a convenient way to access client drivers for installation within the guest operating system.  (Select the ***Attach Guest Drivers*** option when attaching the device to a VM or tenant.)  
!!! note "If you selected *Make Guest Driver ISO* option, leave the Driver ISO field set to *-- None --*; the system will automatically create the ISO file (based on the bundle driver selected), and specify it as the Driver ISO for the resource group."

* Click **Submit** to save the client driver settings for the resource group.  

!!! tip "Once changes have been made, it may be required to put the node into [**Maintenance Mode**](/product-guide/operations/maintenance-mode) and click **Reload Drivers**."

The resource group dashboard contains the resource rules that were auto-generated for your selected NVIDIA devices. You can click an individual rule to view configuration detail. A system-created rule can be modified as needed; for example, the *Node* filter can be changed to *-- None --* to include matching devices from all nodes.  Information regarding resource rules is available at: [**Device Passthrough Overview - Resource Rules**](/product-guide/system/device-pass-overview#resource-rules)

## VM/Guest Configuration

1. Navigate to the VM dashboard (from the top menu: Virtual Machines > List > double-click desired VM in the listing)
2. Click **Devices** on the left menu.
3. Click **New** on the left menu.
!!! tip "You can also attach devices to a VM via Resource Manager; this method allows for adding multiple devices to the VM at once. From Resource Group dashboard > double-click the desired vGPU Group > View Machine Devices > New; select the VM from the Machine dropdown list."

### Device Entry Form fields

* **Name**: **provide a name** to identify the type of vGPU/profile **-OR-** leave blank to allow the system to auto-generate a name for the instance.
* **Type**: select ***NVIDIA vGPU***.
* **Description**(optional): additional text can be entered here for administrative purposes.
* **Resource Group**: select the appropriate NVIDIA vGPU resource group from the dropdown list. (The resource group list will display the number of devices in the group that are currently available.)
* **Count**: indicate the number of vGPU devices to attach to the VM. (This option is only available when device entry is accessed via Resource Manager.)
* **Attach Guest Drivers**: if a guest driver ISO was specified for the resource group, you can check this option to automatically attach a CD-ROM drive, loaded with NVIDIA guest drivers, to the VM.
* **Frame Rate Limit**: to set a cap on frames per second.  Recommended refresh rate settings depend on your specific workload. Lower refresh rates reduce unnecessary overhead on the vGPU. If it will purely be used for compute workloads (like ML/inference), and not for any graphics/display purposes, frame rate limit can be set to 0.
* **Disable Console VNC**: this option can be used when the vGPU should be used for the primary display, e.g. access solely via RDP.
* **Advanced NVIDIA settings; consult NVIDIA documentation for information on the following options:** **Enable Unified Memory**; **Enable NVIDIA CUDA Toolkit Debuggers**; **Enable NVIDIA CUDA Toolkit Profiles**
  
4. When fields are completed, click **Submit** to complete adding the new device.
5. The VM will need a **restart** in order to attach the device. From the VM dashboard, click the *Restart* link on the message that appears at the top of the dashboard, or click **Restart** on the left menu.
6. **Install required NVIDIA guest driver(s)**; required drivers will vary depending on specific GPU model and guest OS version. If the option was selected to attach guest drivers, a CD-ROM drive will be available containing necessary NVIDIA drivers for install.
7. Consult NVIDIA documentation for client vGPU licensing requirements/instructions.

!!! hint "NVIDIA Client licensing may involve generating a client config token on the NVIDIA licensing server that will need to be downloaded into the VM guest, followed by a VM reboot."

## Share an NVIDIA vGPU to a Tenant

NVIDIA vGPU devices can be passed to a tenant for the tenant to pass to its own VMs.  When you pass through devices to a tenant, a new resource group is created within the tenant.  

!!! note "Devices are shared to a tenant are thick provisioned (i.e. the tenant then owns the devices, so they cannot be assigned to other VMs or tenants, even when not in use.)"

1. Navigate to the desired **tenant dashboard** (from the top menu: Tenants > List > double-click the tenant within the list.)
2. Click **Nodes** on the left menu.
3. **Double-click one of the tenant nodes**.
4. Click **Devices** on the left menu.
5. Click **New** on the left menu.
6. Reference the [**Device Entry Form Fields**](#device-entry-form-fields) above.
7. When fields are completed, click **Submit** to complete adding the new device.
8. The device will now be available to attach to tenant VMs.  Follow **VM/Guest Configuration** instructions above.

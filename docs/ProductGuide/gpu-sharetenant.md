

# Sharing a GPU Device to a Tenant

In order to allow a tenant to use a GPU device, the device must be added to one of the tenant's nodes.  

<br>


> A GPU device shared to a tenant node is allocated as a fixed resource to that node and therefore resources are consumed regardless of whether or not the tenant node is powered on; the same GPU device (or virtual device) cannot be assigned to another tenant or VM {.is-warning}

<br>
<br>


## Add a GPU Passthrough Device to a Tenant Node

1. Navigate to the **appropriate tenant dashboard** (**Home -> Tenants -> Tenants -> Double-click the desired tenant** in the list.) 
3. Click **Nodes** on the left menu to view a list of the tenant's nodes.
4.  **Double-click** on the desired **tenant node** in the list. 
5. Click **Devices** on the left menu.
6. Click **New** on the left menu.
7. Optionally, a **Name** can be entered for the device.  This field can be left blank to allow for an auto-generated name.  
8. Select **GPU Passthrough** in the ***Type*** dropdown list.
9. Optionally, a **Description** can be entered to record additional information about the device. 
10. Typically, the **UUID field should be left blank** to allow a system-generated UUID.  A specific UUID should only be entered in very special cases, where necessary, such as duplicating a pre-existing configuration.)
11. Select the appropriate **GPU type** from the dropdown list; this list will include all available GPU types installed on the physical nodes.  
> Selecting --Default-- for *GPU type* is typically not recommended because problems can occur if a tenant node connects to a device and then later connects to a different gpu device type. {.is-info}
12. Click **Submit**, at the bottom of the page, to save the new device on the tenant node.
13. **Repeat** the above steps to add GPU devices to **additional tenant nodes** as necessary.

<br>
<br>


## Add an NVIDIA vGPU Device to a Tenant Node

1. Navigate to the **appropriate tenant dashboard** (Home -> Tenants -> Tenants -> Double-click the desired tenant in the list.) 
3. Click **Nodes** on the left menu to view a list of the tenant's nodes.
4.  **Double-click** on the desired **tenant node** in the list. 
5. Click **Devices** on the left menu.
6. Click **New** on the left menu.
7. Optionally, a **Name** can be entered for the device.  This field can be left blank to allow for an auto-generated name.  
8. Select **NVIDIA vGPU** in the ***Type*** dropdown list. 
9. Optionally, a **Description** can be entered to record additional information about the device. 
10. Typically, the **UUID field should be left blank** to allow a system-generated UUID.  A specific UUID should only be entered in very special cases, where necessary, such as duplicating a pre-existing configuration, etc.)
11. Select *appropriate ***Profile Type***.  Profile Type selected here must be one that has been configured on a physical host NVIDIA vGPU.  
> Selecting **"Any available"** for *Profile Type*  will cause the tenant node to attempt utilizing any vGPU profile available across all host nodes.  In some cases this may not be an issue (e.g. serving Linux VMs that are using a GPU for general purposes). However, in situations such as hosted Windows VMs, or VMs using GPU for more specific purposes, this can be problematic if a VM has been connected and configured to one profile type and after a reboot attempts to connect to a different profile type. {.is-warning}

12. Consult NVIDIA vGPU documentation for guidance on profile settings (unified memory, refresh rate, CUDA, etc. )
12. Click **Submit**,at the bottom of the page, to save the new device on the tenant node.
13. **Repeat** the above steps to add GPU devices to **additional tenant nodes** as necessary.

<br>
<br>

## Guest Configuration (for a Tenant's VM)

> The VM must be running on a tenant node that has a GPU device configured. {.is-info}

GPU Guest configuration instructions are covered on [**GPU Passthrough**](/public/ProductGuide/GPUPassthrough) and [**NVIDIA vGPU**](/public/ProductGuide/nvidiavGPU) pages.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }





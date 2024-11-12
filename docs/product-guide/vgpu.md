# NVIDIA VGPU

This page provides instructions for implementing NVIDIA GRID (NVIDIA vGPU solution that allows multiple VMs to share a single physical GPU) in VergeOS.





!!! note "To configure one-to-one access from a single physical GPU to a single VM (at a time), consult the [**Device Passthrough Overview**](/product-guide/devpass-overview) page for more information."

!!! note "NVIDIA GRID licensing is required to use NVIDIA vGPU." 


## Host Installation/Configuration

1. Obtain appropriate NVIDIA Linux-KVM driver for your GPU hardware.

GRID vGPU drivers can be downloaded from your NVIDIA licensing portal or by registering for an NVIDIA free evaluation: [**https://nvidia.com/en-us/data-center/resources/vgpu-evaluation**](https://nvidia.com/en-us/data-center/resources/vgpu-evaluation).

2. Upload the vGPU driver to the VergeIO vSAN. For directions on uploading to the vSAN, see:
[**Uploading to the vSAN (Media Images)**](/product-guide/uploadingtovSAN)

3. From the Main Dashboard, click **Nodes**.
4.  The Nodes listing page appears. **Double-click the desired node**.
5.  Click **Drivers** on the left menu.
6.  Click **New** on the left menu.
![](/public/userguide-sshots/newdrivernvidiavgpu.png)


7.  From the ***Driver*** dropdown list, select the GPU driver (uploaded to media files in previous step.)
8.  In the ***Apply to PCI Devices*** section, check/select the checkbox for vGPU device(s) to which the driver should be assigned.
9.  Click **Submit** at the bottom of the page.
10.  Perform a **maintenance mode reboot** of the node. Note: Nodes must be put in maintenance mode/rebooted one at a time.


<br>
<br>

### Configure vGPU Profile

11.  On the main dashboard click **Nodes**.
12.  The Nodes listing page appears. **Double-click the desired node**.
13.  Click **GPUs** on the left menu.
14.  **Double-click the desired GPU** in the list.

![](/public/userguide-sshots/gpuprofiledropdown.png)
Selected GPU appears in the first field (PCI Device).

<br>

15.  Select ***vGPu profile*** (for the selected GPU device) from the dropdown list provided; available vGPU profile options will depend upon the specific GPU hardware.
16.  **For VergeIO nodes containing more than one vGPU device: Repeat** the process for each additional vGPU device within the selected node, designating each physical device in the ***PCI Device*** dropdown list and selecting ***vGPU Profile*** to assign to the selected device.
17.  When finished selecting Profile(s) for all vGPU devices for the node, click **Submit** at the bottom of the page.

<br>
<br>

### VM/Guest Configuration

1.  **Power down the VM**.
2.  Navigate to the dashboard of the desired VM (From the main dashboard click **Machines** on the left menu; **Virtual Machines;** double-click desired VM in the listing)
3.  Click **Devices** on the left menu.
4.  Click **New** on the left menu.
5.  The Device Entry Form appears.
![](/public/userguide-sshots/newvmdevicenvidia.png)

6.  Optionally, a ***Name*** can be entered for the device.
7.  Select **NVIDIA vGPU** in the ***Type*** dropdown list.
8.  ***UUID*** is a universally unique identifier and is persistent across reboots. Typically UUID should be left blank allowing the system to automatically assign one; a specific UUID can be entered if necessary (e.g. imported or cloned VM with an existing GPU PCI device).
9.  ***Profile Type*** - Select an appropriate profile type for the VM; this should be a profile type that has been selected on a host node NVIDIA vGPU.
    -   Virtual Applications (vApps)
    -   Virtual Desktops (vPC)
    -   AI/Machine Learning/Training (vCS or vWS)
    -   Virtual Workstations (vWS)
    
>    Selecting "Any available" in *Profile Type* will cause the VM to attempt utilizing any vGPU profile available across all host nodes. This may be problematic if the VM has been configured and connected to one profile type and then later (after a reboot) connects to a different profile type. {.is-info}
    
10.  Click **Submit** at the bottom of the page.
11.  **Power on the VM**.
12.  **Install appropriate guest driver**.

> Required guest driver(s) will depend on specific GPU hardware and guest OS version. Consult NVIDIA vGPU documentation for guidance. {.is-success}


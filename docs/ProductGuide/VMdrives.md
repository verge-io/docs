

# Virtual Machine Drives

<br>
<br>


## Add a New Drive to a VM

1.  From the **VM dashboard**, click **New Drive** on the left menu (near the bottom).
2.  Enter a ***Name*** for the drive (optional).

> When *Name* is not specified, the system automatically names drives in order as created, "drive\_x" where x is an integer starting with 0. For drives that will be used as a "Golden Image", it is recommended to give a name to the drive for easy selection when creating non-persistent drives that will reference the drive. {.is-success}

3.  The ***Read Only*** option can be useful for a drive that should not be modified, such as on a VM restore that is used to recover data.
4.  Select ***Media*** (type) for the drive:
    -   **Disk (default option)** - empty disk; emulates typical SSD/HDD device
    -   **CD-ROM** - emulates CD-ROM device; read-only; associated \*.iso file simulates inserted CD media; typically used for installing OS or other software.
    -   **Clone Disk** - create a duplicate of an existing disk from the same VergeIO Cloud.
    -   **EFI Disk** - this drive type is auto-generated and handled by the system; there should never be a need to manually create a drive of this type.
    -   **Import Disk** - allows selection of a standard format disk file (\*.raw,\*.vmdk,\*.qcow, \*.vhd(x), etc).
    -   **Non-Persistent** - allows for a drive that does not maintain changes between boots; each time the VM is started, the non-persistent drive reverts back to the \*.raw file image (an existing disk drive in the VergeIO Cloud) to which it is referenced. A typical use for the Non-Persistent drive would be maintaining a “golden image” OS install where all updates and modifications can be made centrally; this is particularly useful for solutions, such as VDI, where a consistent installation needs to be maintained for many virtual machines.
    
5.  Select ***Interface***:
    -   **Virtio-SCSI** - (typically recommended option). provides para-virtualized SCSI device; with high performance, while still maintaining standard command set, device passthrough, and device naming within guest OS. There is built-in support in most Linux distros, but not standard in default Windows installations, however, Virtio drivers are available at: [https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso) ; virtio drivers are also included within VergeIO custom Windows \*.iso files.
    -   **Virtio(Legacy)** - this driver was previously scheduled to be phased out; however, development has commenced again. It can be used for utmost I/O performance with the tradeoff being that some native SCSI features, such as TRIM are not supported.
    -   **Virtio-SCSI (Dedicated Controller)** - provides a para-virtualized SCSI device with its own controller. Use this option if adding a virtio-SCSI drive to reside on a different storage tier than existing virtio-SCSI drives within the same VM. For example, if tier 3 virtio-SCSI drive(s) have already been created for the VM, create a tier 2 Virtio-SCSI drive as Dedicated Controller to keep the different tiered drives on separate virtual controllers.
    -   **LSI\*\*\*** - LSI, native VMware options provided for compatibility, where needed.
    -   **SATA(AHCI)** - option only applies to VMs with a Q35 Machine Type.
    -   **IDE** - option only applies to VMs with a PC (i440FX) Machine Type.
6.  Select ***Disk Size***. This option only applies to Media type: **Disk**.
7.  Select ***Media File***. This option only applies to Media Type: **CD-ROM/Clone Disk/Import Disk/ Non-Persistent**.
    -   For **CD-ROM:** Select \*.iso file from the dropdown list. Note: \*.iso file can also be selected after VM creation.
    -   For **Clone Disk:** Select \*.raw file from the dropdown list
    -   For **Import Disk:** Select disk image file\* from the dropdown list. Supported file types: (\*.raw, \*.qcow, \*.qcow2, \*.vhd, \*.vhdx, \*.vmdk)
    -   For **Non-Persistent Disk:** Select \*.raw file from the dropdown list displaying all existing VergeIO drives in this Cloud.
    
 > See [**Media Images**](/public/ProductGuide/uploadingtovSAN) for instructions on uploading *.iso and Disk Image Files to the vSAN {.is-success}  
    
8.  Select ***Preferred Tier***. This option only applies to Media types: **Disk/EFI Disk**.
    -   Options include all storage tiers to which you have access.
    -   **\--Default--** can also be selected to use the default storage tier defined for this cloud in System Settings.
9.  Select the ***Override Preferred Tier*** checkbox: (only applies to Media type: **Clone Disk/Import Disk /Non-Persistent**), if a different Tier is desired (different from the current tier of the selected Media File.) This option only applies to Media Type: **CD-ROM/Clone Disk/Import Disk/ Non-Persistent**.

> For more information about vSAN Storage tiers, see [**Storage Tiers**](/public/ProductGuide/storagetiers) {.is-success}

10.  Enter a ***Description*** for the drive (optional, but recommended when there will be more than one drive)
11.  The ***Asset*** field can be used to define a unique identifier for this drive (e.g. OS, Data drive, etc.) for a drive that can be used within Recipes.
> The Discard option is enabled by default, and is typically recommended to be enabled as it allows storage space to be recovered from deleted files. {.is-info}
12.  Click **Submit.**
13.  **Repeat** the process to add more drives to the VM, **as needed**.

<br>
<br>

## Erase the Data on a Drive
>  **Caution** should be used when erasing a drive since erasing a crucial drive can render the VM unusable. Take special care to ensure an erase operation is being applied to the intended drive on the intended VM. A temporary VM snapshot can be taken prior to erasing the drive, to allow a fallback if needed. {.is-warning}

The **VM must be powered off** before a drive can be erased.
1.  From the **VM dashboard**, click **Drives** from the left menu.  
2.  **Select the drive(s)** to be erased.
3.  Click **Erase** from the left menu.
4.  Click **Yes** to confirm.

<br>
<br>

## Remove a Drive from a VM

A **drive must be offline before it can be deleted**; a drive can be taken offline by powering off the VM or using hotplug (where enabled).
1.  From the **VM dashboard**, click **Drives** from the left menu.  
2.  **Select the drive(s)** to be deleted.
3.  Click **Delete** from the left menu.
4.  Click **Yes** to confirm the deletion.

<br>
<br>

## Modify a VM Drive

> Once a drive is created, the *Media* field (Disk/Non-Persistent/CD-ROM) cannot be modified.{.is-info}

> Drives cannot be reduced in size.{.is-info}

> Modifications involving drive size or drive interface type will likely require corresponding modifications within the guest OS; specific guest OS changes will be dependent on the particular OS in use. {.is-info}

1.  From the **VM dashboard**, click **Drives** from the left menu.
2.  **Select the drive** to be modified.
3.  Click **Edit** from the left menu.
4.  **Modify** fields as desired.
5.  Click **Submit**.

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
# Importing VMs from Uploaded Media Images

Importing via Media Images is a convenient way to import a single VM at a time. VM Data files, such as VMX, VMDK, OVF, VHD(X) are uploaded to the vSAN and then selected for import.

## Import VM (config and disks) from Media Images

!!! info
    Hyper-V VMs should be exported to *.ova/ovf or VMware format before upload, **-OR-** use the ***Create VM Shell, Import VM Disks*** method below to create the VM first and then import disks

1. Upload configuration and disk image files to the vSAN. For instructions on uploading files to the vSAN, see [**Media Images**](/product-guide/storage/uploading-files-to-vsan).
2. From the Main Dashboard, Click **Machines** from the left menu.
3. Click **New VM** from the left menu.
4. From the options list, select **--Import from Media Images--**. Available files (that have been uploaded to the vSAN via **Media Images**) will appear in the Selections Available list on the right side. Click to **select the VM configuration file** (e.g. *.vmx,*.ovf)
5. Click **Next** (bottom of the screen).
6. The ***VM Name*** will default to the name of the selected configuration file if left blank; otherwise a name can be specified.
7. By default ***MAC Address(es)*** of VM NICs will stay the same as the source VM. If this option is unselected, the system will generate new, unique MAC address(es).
8. Select ***Preferred Tier***, or leave at --default--. This determines the tier first attempted for VM storage. See the [**Preferred Tier**](/product-guide/storage/preferred-tiers) page for more information.
9. When fields are entered as desired, click **Submit**.
10. The VM instance is created and the dashboard for the new VM is presented.

## Create VM Shell, Import VM Disks

1. Upload disk image files to the vSAN. For instructions on uploading files to the vSAN, see [**Media Images**](/product-guide/storage/uploading-files-to-vsan)
2. [**Create a new Custom VM**](/product-guide/virtual-machines/creating-vms#create-a-new-custom-vm), assigning appropriate hardware specifications and NIC device(s).
3. Add a new drive to the VM, being sure to select **Import Disk** in the ***Media field***.
4. Select the appropriate ***Interface*** (IDE, SATA, Virtio-SCSI, Virtio-Legacy, etc.)
5. Select drive ***Media File*** (*.vhd,*.vhdx, *.qcow, raw, etc.) from the dropdown list. ([**VM Drives**](/product-guide/virtual-machines/vm-drives) provides detailed drive creation instructions.).
6. If applicable, repeat the drive creation steps for additional drives.
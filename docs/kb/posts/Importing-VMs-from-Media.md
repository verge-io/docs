---
title: Import VMs from Media
slug: import-vms-from-media
description: 
published: true
date: 2024-02-06T15:26:24.755Z
tags: vm, import, boot, sata, ide, media, images, scsi, secure boot, disk, media images, not bootable, not booting, troubleshooting, troubleshoot, vm wont boot, wont start, import vm
categories:
  - Migration
  - Troubleshooting
editor: markdown
dateCreated: 2023-01-19T14:38:43.388Z
---

# Importing VMs from Media Images

Importing via Media Images is a convenient way to import a single VM at a time. VM Data files, such as vmx, vmdk, ovf, vhd(x), are uploaded to the VergeIO vSAN and then selected for import.

## Import VM (config and disks) from Media Images

> **Note:** Hyper-V VMs should be exported to .ova/ovf format or VMware format before upload, or use the **Create VM Shell, Import VM Disks** method below to create the VM first and then import disks.
{.is-info}


1.  Upload configuration and disk image files to the vSAN. For instructions on uploading files to the vSAN, see [Managing Media Images](/public/kb/managing-media-images).
2.  From the **Cloud Dashboard**, Click **Machines** from the left menu.
3.  Click **New VM** from the left menu.
4.  From the options list, select **\--Import from Media Images--**. Available files (that have been uploaded to the vSAN via **Media Images**) will appear in the Selections Available list on the right side. Click to **select the VM configuration file** (e.g. \*.vmx, \*.ovf)
![2023-01-19_12_01_04-2023-01-19_10_35_31-yottadoc___new_virtual_machine.png_‎-_photos.png](/public/2023-01-19_12_01_04-2023-01-19_10_35_31-yottadoc___new_virtual_machine.png_‎-_photos.png)
5.  Click **Next** (bottom of the screen).
![2023-01-19_11_08_23-yottadoc__import_job.png](/public/2023-01-19_11_08_23-yottadoc__import_job.png)
6.  The **VM Name** will default to the name of the selected configuration file if left blank; otherwise a name can be specified.
7.  **Preserve MAC Address** - By default MAC Address(es) of VM NICs will stay the same as the source VM. If this option is unselected, the system will generate a new, unique MAC address(es).
8.  Select **Preferred Tier**, or leave at --default--. This determines the tier first attempted for VM storage. See [Preferred Tier Usage](/public/kb/preferred-tier-usage) for information on how Storage Tiers are handled.
9.  When fields are entered as desired, click Submit.
10.  The VM instance is created and the dashboard for the new VM is presented.

## Create VM Shell, Import VM Disks

When it is not possible to import from a configuration file, a **VM shell** (disk-less VM) can be created, and then disks imported from standard files (such as vhd(x)).

1.  Upload disk image files to the vSAN. For instructions on uploading files to the vSAN, see [Managing Media Images](/public/kb/managing-media-images).
2.  Create a new **Custom VM**, assigning appropriate hardware specifications and NIC device(s). See Creating VMs section of the VergeOS help for information on how to create a Custom VM (Append *#help?id=vms-creating&bookmark=custom* to the end of your VergeOS URL for a direct link).
3.  Add a new drive to the VM, being sure to select **Import Disk** in the Media field.
![2023-01-19_11_20_24-importdiskvm.png](/public/2023-01-19_11_20_24-importdiskvm.png)
4.  Select the appropriate **Interface** (IDE, SATA, virtio-scsi, virtio-legacy, etc.). Choosing SATA can help with driver issues as it is more supported by the guest OS.
5.  Select the **Media File** of the disk (\*.vhd, \*.vhdx, \*.qcow, raw, etc.) from the dropdown list. 
6.  If applicable, repeat the drive creation steps for additional drives.
7.	Start the VM and verify everything boots correctly.

> The following type of files are supported when using media images for import
{.is-info}
- IMG (Raw Disk Image)
- RAW (Binary Disk Image)
- QCOW (Legacy QEMU)
- QCOW2 (QEMU, Xen)
- VDI (VirtualBox)
- VHD/VPC (Legacy Hyper-V)
- VHDX (Hyper-V)
- OVA (VMware, VirtualBox)
- OVF (VMware, VirtualBox)
- VMDK (VMware)
- VMX (VMware)

# Troubleshooting issues

Below are some common issues and resolution steps.


### Failure to boot disk into OS

This is usually a driver issue. Typically this shows up as Inaccessible Boot Device in Windows. 

**Resolution Steps:**

1. Switch the drive interface type from virtio-scsi to another type. Typically IDE or SATA will resolve the boot issue.  
1. Once the guest OS has booted, install the virtio drivers for the interface either by attaching them via a CD-Rom or downloading them directly into the guest from [here](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso).
1. Shut down the VM
1. Switch the driver interface type to virtio-scsi
1. Start the VM 


<br>
<div style="text-align: center">
  
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>
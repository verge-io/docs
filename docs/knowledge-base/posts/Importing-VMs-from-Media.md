---
title: Importing VMs from Media Images
slug: import-vms-from-media
description: Learn how to import VMs using media images into VergeOS.
draft: false
date: 2024-02-06T15:26:24.755Z
tags:
  - vm
  - import
  - boot
  - sata
  - ide
  - media
  - images
  - scsi
  - secure boot
  - disk
  - media images
  - not bootable
  - not booting
  - troubleshooting
  - troubleshoot
  - vm wont boot
  - wont start
  - import vm
categories:
  - Migration
  - Troubleshooting
editor: markdown
dateCreated: 2023-01-19T14:38:43.388Z
---

# Importing VMs from Media Images

Importing via Media Images allows you to import a single VM at a time by uploading VM data files (such as VMX, VMDK, OVF, VHD/X) to VergeOS and then selecting them for import.

## Importing a VM (Configuration and Disks) from Media Images

!!! note "Hyper-V VMs"
    Hyper-V VMs should be exported to OVA/OVF or VMware formats before upload, or you can use the **Create VM Shell, Import VM Disks** method described below to create the VM first, and then import disks.

1. Upload the configuration and disk image files to the vSAN. For instructions, see [Managing Media Images](/knowledge-base/managing-media-images/).
2. From the **Main Dashboard**, click **Machines** on the left menu.
3. Click **New VM** on the left menu.
4. From the options list, select **--Import from Media Images--**. The files uploaded to the vSAN will appear on the right under **Selections Available**. Click to select the VM configuration file (e.g., \*.vmx, \*.ovf).
5. Click **Next** at the bottom of the screen.
6. The **VM Name** will default to the name of the configuration file unless you specify a custom name.
7. By default, the **Preserve MAC Address** option is selected. If you wish to assign a new MAC address to the VM, deselect this option.
8. Select the **Preferred Tier**, or leave it at the default. This specifies the storage tier for the VM's disks. See [Preferred Tier Usage](/knowledge-base/preferred-tier-usage) for more details.
9. Click **Submit** to create the VM. The new VM's dashboard will be presented.

## Create VM Shell, Import VM Disks

If you cannot import the entire configuration, you can create a **VM shell** (a disk-less VM) and then import individual disk files.

1. Upload the disk image files to the vSAN. See [Managing Media Images](/knowledge-base/managing-media-images) for details.
2. Create a new **Custom VM** with appropriate hardware specifications. See the **Creating VMs** section in the VergeOS help guide.
3. Add a new drive to the VM, ensuring to select **Import Disk** in the Media field.
4. Choose the correct **Interface** (IDE, SATA, virtio-scsi, virtio-legacy, etc.). Using **SATA** often helps with driver compatibility in guest OSs.
5. Select the **Media File** from the list of uploaded files (\*.vhd, \*.vhdx, \*.qcow, raw, etc.).
6. Repeat for additional drives if necessary.
7. Start the VM and verify that it boots correctly.

!!! note "Supported File Types"
    The following file types are supported for VM imports using media images:
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

## Troubleshooting Issues

### Failure to Boot into the OS

This is often a driver issue. You may encounter a **Windows Inaccessible Boot Device** error or similar.

**Steps to resolve:**

1. Change the drive interface from **virtio-scsi** to **IDE** or **SATA**. This often resolves driver issues.
2. Once the guest OS boots, install the **virtio drivers** by attaching them via a virtual CD-ROM or downloading them from [virtio-win](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso).
3. Shut down the VM.
4. Switch the drive interface back to **virtio-scsi**.
5. Start the VM again.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

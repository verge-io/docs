---
title: Virtual Machines
description: Virtual Machine Architecture
published: true
date: 2024-01-04T20:07:50.222Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:31:51.484Z
---

## Virtual Machines Features

- Built off of [QEMU](https://www.qemu.org/), an open-source emulator which interoperates with [KVM](https://www.linux-kvm.org/page/Main_Page) at near native performance
- Windows, Linux, and BSD operating systems support
- QEMU Guest Agent support allowing for quiesced snapshots and reporting additional information such as OS and kernel versions to the vm dashboard.
- Q35 machine type for modern motherboard emulation and i440FX for older system support
- Console access through VNC (native), Spice Client, or Serial Console
- Virtio paravirtualization device support for disks and network interface cards
- Hotplug support for disk drives and network interface cards
- Host processor and GPU passthrough support
> Currently only NVIDIA GPU architecture is supported. See the [GPU](/public/gpu) wiki page for more information.
{.is-info}
- Cloud-init support allowing guest level automation on new deployments. See the [recipes](/public/recipes) wiki for more information.
- Live migration with no downtime allowing physical host maintenance without interrupting workloads
> Live migration is only possible when a physical device is not passed through to the vm.
{.is-warning}
- Automatic balancing on vm startup
> When a vm is started the VergeOS appserver will look for the node with the most available compute resources in the cluster the vm is assigned to and start it on the determined node.
{.is-info}

## Importing Virtual Machines
Virtual machines use the **.raw** format for virtual drives. When a vm is imported it is converted from the imported drive type to the .raw format automatically. Virtual machines can be imported into VergeOS in 4 ways.
1. The [VMware backup service](/public/backup#vmware-backup-service)
2. The [VergeOS NAS service](/public/nas)
3. Using the VergeOS clone utility (only accessible by downloading from your environment)
4. Uploading the vm drives and configuration files directly to the media images section of your environment [Click Here for Instructions](/knowledge-base /Importing-VMs-from-Media)
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
<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
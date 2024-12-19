---
title: Importing Windows Server with UEFI into VergeOS  
slug: importing-windows-server-with-uefi-into-vergeos  
description:  
draft: false  
date: 2024-04-03T13:55:51.067Z  
tags:
  - vm
  - windows
  - import
  - virtio
  - scsi
  - uefi
  - disk
  - qemu
  - vms
  - media file
  - guest agent
categories:  
  - Migration  
editor: markdown  
dateCreated: 2024-03-14T16:15:12.992Z  
---

# Importing Windows Server with UEFI into VergeOS

This guide covers how to migrate a Windows Server VM with UEFI enabled from VMware into VergeOS. The process was tested with Windows Server 2019 and 2022, but it may also work for earlier versions of Windows.

!!! note "VMware tools were removed before the migration. This was tested on Windows Server 2019 and 2022. It may also work on previous versions of Windows."

## Steps to Import the Windows Server VM

1. **Import the VM** from the VMware service. Follow the steps from [this guide](/product-guide/virtual-machines/import-from-vmware) to import the VM into VergeOS.
   
2. Set the primary disk interface to **SATA** for compatibility during initial boot.
   
3. Change the primary disk's **Boot Order** to **0** in VergeOS.

4. **Power On** the VM to boot into Windows.

5. Install the **virtio-win-guest-tools.exe** if it's not already installed. This package includes Virtio drivers necessary for disk and network performance.
   
6. Once the installation is complete, **Power Off** the VM.

7. **Delete the EFI drive**, as it is no longer needed after the migration. You can remove it from the VM's disk settings.

8. Change the primary disk interface from **SATA** to **Virtio-SCSI** for optimal performance.

9. Remove the media file (ISO) from the **CD drive** in the VM settings.

10. Change the **NIC driver** to **Virtio** to ensure the VM uses a high-performance network driver.

11. Enable the **QEMU Guest Agent** on the VM edit screen to allow VergeOS to gather information about the VM.

12. **Power On** the VM again and ensure everything is working correctly.

13. Verify that the guest agent is reporting back to VergeOS by checking the VM dashboard.

!!! tip "Monitoring the Guest Agent"
    The guest agent status can be viewed on the VM's dashboard. If it doesn't report back, ensure the guest agent service is running inside the VM.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

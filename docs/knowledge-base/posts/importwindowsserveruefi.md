---
title: Importing Windows Server with UEFI into VergeOS
slug: importing-windows-server-with-uefi-into-vergeos
description: 
published: true
date: 2024-04-03T13:55:51.067Z
tags: vm, windows, import, virtio, scsi, uefi, disk, qemu, vms, media file, guest agent
categories:
  - Migration
editor: markdown
dateCreated: 2024-03-14T16:15:12.992Z
---

## Importing Windows Server with UEFI into VergeOS

How to migrate a Windows Server VM with UEFI enabled from VMware into VergeOS. 

> **NOTE: VMware tools were removed before the migration. This was tested on Windows Server 2019 and 2022. It may also work on previous versions of Windows.** 
{.is-info}


1. [Import the VM](/product-guide/importvmware) from the **VMware service**.
1. Set the primary disk set to **SATA**.
1. Change the primary disk **Boot Order** to **0** in VergeOS.
![2024-03-14_12_04_15-windowsdrivespage.png](/docs/public/knowledgebase/2024-03-14_12_04_15-windowsdrivespage.png)
1. **Power On** the VM.
1. Install the **virtio-win-guest-tools.exe** (If these are already installed you may skip this step.)
![2024-03-14_12_05_24-windows-virtagent.png](/docs/public/knowledgebase/2024-03-14_12_05_24-windows-virtagent.png)
1. **Power Off** the VM.
1. Delete the **EFI drive**.
![2024-03-14_12_06_20-deleteefidrive.png](/docs/public/knowledgebase/2024-03-14_12_06_20-deleteefidrive.png)
1. Change the primary disk to **Virtio-SCSI**.
1. Remove the media file from the **CD drive**.
![2024-03-14_12_07_04-changedisk1.png](/docs/public/knowledgebase/2024-03-14_12_07_04-changedisk1.png)
1. Change the **NIC driver** to **Virtio**.
![2024-03-14_12_10_24-changenetworktovirtio.png](/docs/public/knowledgebase/2024-03-14_12_10_24-changenetworktovirtio.png)
1. Enable the **QEMU Guest Agent** on the VM edit screen.
![2024-03-14_12_11_34-enableguestagent.png](/docs/public/knowledgebase/2024-03-14_12_11_34-enableguestagent.png)
1. **Power On** the VM.
1. Ensure the guest agent is reporting back to VergeOS.
![2024-03-14_12_14_40-showguestagent.png](/docs/public/knowledgebase/2024-03-14_12_14_40-showguestagent.png)


<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

<!--- 
Keep page URLs short (4 words and under if possible) (new-page-blah-blah)

Keep grammar consistent across all pages (select vs click) (navigate vs go to)

Keep title casing consistent (Upper Case for subject words and lower case for others) i,e 
(Creating a VLAN in the User Interface)

Number main steps of directions and indent substeps

Limit the use of personal and subject pronouns (I, You, Your, You're, We, They, etc..)

Reference this page for more layout and grammar references -- https://wiki.verge.io/public/kb/virtual-wires

Use a tool like nimbus (nimbus.me) (it's free) for screen shots. 
Black out all pertinent information (IP address(es), System Name, etc..)
Use the default system color scheme for all screen shots!!!
Reference the screen shot on this page for an example -- 
https://wiki.verge.io/public/kb/proper-power-sequence

Run content through grammarly.com (it's free)

Enter the following script (including script tags) in the scripts tab of the pages property if a table of contents is desired. This should only be used for long pages with multiple headers.

<script>
    var removeTocCard = false;    // Enable or disable Table of Contents Card
    var sideColumnPosition     = 'right';
</script>

Delete commented out lines when done --->
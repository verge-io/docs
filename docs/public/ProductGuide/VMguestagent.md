---
title: Product Guide - VM Guest Agent
description: provide description of the guest agent and its uses, along with instructions for downloading, enabling, installing and verifying the guest agent on a VM.
published: true
date: 2024-03-25T17:58:21.644Z
tags: 
editor: markdown
dateCreated: 2023-04-06T00:02:57.965Z
---

# VM Guest Agent
The guest agent is a program installed inside the guest OS allowing the host to run commands within the VM. This allows consistent, reliable backups by freezing the guest file system before snapshots and proper shutdown of a guest without reliance on ACPI, policies, etc.
**Use of the VM guest agent requires:**

   - Enabling the guest agent for the particular VM (within the Verge.io UI)
- Installation of the guest agent (within the guest operating system)

<br>


## Enabling the Guest Agent
The guest agent must be enabled per VM; this can be done during VM creation or by editing an existing VM.  The Guest Agent checkbox on the VM dashboard indicates if the agent is enabled.

![agent-enabled-notconnected.png](/public/userguide-sshots/agent-enabled-notconnected.png)


<br>

### To Enable the Guest Agent on an existing VM
1. Navigate to the VM Dashboard
2. Click Edit on the left menu.
3. Click to check the QEMU Guest Agent checkbox.
4. Click Submit to save the change.


<br>
<br>
<br>


## Downloading and Installing Agent Software on Windows VMs
<br>

### To Download/install the Guest Tools Installer
The guest agent installer can be downloaded from the following link (and run within the guest): <a href="https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win-guest-tools.exe" target="_blank">https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win-guest-tools.exe</a>
> During the Virtio installer setup, be sure to select the Install button for device software.{.is-success}

The VM will require a restart in order to apply the changes and connect the agent.

<br>
<br>

### To Download the Complete Virtio ISO to the vSAN
The following instructions provide for placing the win-virtio.iso file (containing necessary agent guest software) onto the vSAN; this allows for loading the software onto the CD-ROM drive of a VM for easy Installation within the guest OS.
1. Click the link below to access the Virtio ISO.
2. The Upload from URL link appears, with all fields auto-populated; typically no changes need to be made; however, optionally, File Name, File Description, and/or Preferred Tier fields can be changed, if desired.
3. Click Submit to download the virtio iso file to the vSAN.
4. When the progress shows 100% complete (progress bar top right corner) the file is available, appearing in the Media Images list and an option for selection on any CD drive.
See the directions below for installing the guest agent software from the downloaded virtio iso.

<br>
<br>

### To Install Guest Agent (Windows) from the Virtio ISO
> The VM must have a CD-ROM device{.is-info}

1. Navigate to the **VM dashboard**.
2. Click the CD-ROM selection button (top left)
![fa-eject.png](/public/userguide-sshots/fa-eject.png)
3. Select **virtio-win.iso (or filename modified during download)**.
4. Click **Submit** to apply the CD change.
5. Click **Remote Console** on the left menu to console into the guest OS.
6. Go to **Windows Device Manager**.
7. Right-click on **"PCI Simple Communications Controller"**.
8. Select **Update Driver**.
9. Browse to the **path of the CD-ROM drive** containing the downloaded iso.
10. Navigate into: **vioserial\YOUR WINDOWS VERSION (ex: 2k12R2, WIN10, etc.)**.
11. Click **Next** to complete the driver update.
12. In the Windows file explorer, **browse to the CD-ROM** with the virtio iso.
13. Navigate into the **guest-agent** folder.
14. **Double-click** on the correct MSI **(qemu-ga-x86.msi[64-bit] or qemu-ga-1386.msi[32-bit])** file to initiate the installer.
> A restart of the VM may be required in order to connect the agent to the host. {.is-success}

<br>
<br>


## Installing Agent Software on Linux VMs
On Linux VMs, the **qemu-guest-agent package** must be installed. Installation instructions will vary depending on the specific Linux distro/version.


- On Systems that employ apt for installation **(Debian/Ubuntu-based)**:

    <code>apt-get install qemu-guest-agent</code>
    
    <br>
    <br>
    

- On Systems using **Yum (Redhat)**:
    <code>yum install qemu-guest-agent</code>
  
  <br>
  <br>
  
- Some distros will require **a reboot or manual start** of the agent:
        <code>systemctl start qemu-guest-agent</code>


<br>
<br>
<br>


## Verifying VM Guest Agent Connection
When a guest agent is successfully connected, the version number will display next to the checked Guest Agent checkbox on the VM dashboard.

![agent-connected-version.png](/public/userguide-sshots/agent-connected-version.png)

<br>   




<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }
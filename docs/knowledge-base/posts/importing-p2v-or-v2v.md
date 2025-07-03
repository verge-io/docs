---
title: Importing Physical Machines and Individual VMs into VergeOS
slug: importing-a-physicalvirtual-machine-into-vergeio
description: Learn how to use the VergeOS Clone Utility to import physical or virtual machines into the VergeOS environment.
draft: false
date: 2024-02-07T14:21:34.627Z
tags:
  - vtov
  - ptov
  - p2v
  - v2v
  - import
  - migrate
  - clone
categories:
  - Migration
editor: markdown
dateCreated: 2022-08-10T19:18:14.014Z
---

# Importing Physical Machines/Cross Platform VMs into VergeOS 

The **VergeOS Clone Utility (VergeOS-clone.iso)** can be used to import external physical or virtual machines into VergeOS as virtual machines. This process is optimized for PtoV (physical-to-virtual) and non-VMware VtoV (virtual-to-virtual) migrations using efficient block transfer. 

!!! note "For VMware environments, use the VMware connector instead of the VergeOS Clone Utility."

## Prerequisites

### VergeOS System (Destination)

- Network URL accessible from the source VMs.
- VergeOS credentials with VM creation permissions.
- Sufficient available vSAN storage for VM drives.

!!! note "VergeOS vSAN global deduplication reduces the space requirement by handling zero blocks."

- Adequate RAM/CPU to run the imported VMs.

### Source Machine (Physical or Virtual)

- Network connection accessible to the VergeOS system.
- USB/CD-ROM for the VergeOS Clone ISO.
- At least 1 GB of RAM to boot and run the ISO.

## Selecting Sync Method

- **HTTPS Upload:** Default method requiring minimal configuration.
- **vSAN-direct Sync:** Optimized for LAN connections (requires additional network setup, not recommended for WAN).

!!! note "vSAN-direct sync is only allowed to the host system, not directly to tenants."

## Obtaining the VergeOS Clone Utility

1. From the **Main Dashboard**, click **Backup/DR** on the left menu.
2. Click **Add Clone ISO** in the Clone ISO section.
3. Select the desired public download option for the ISO file. 
4. After the build process completes, download the ISO via the provided link or from the VergeOS UI.

!!! note "You can make a bootable USB using the [Creating Bootable Installation Media](/knowledge-base/creating-bootable-installation-media/) guide, substituting the Clone ISO."

## Using the VergeOS Clone Utility

1. Boot the source machine using the VergeOS Clone ISO.
2. Select **Launch Clone Utility**.
3. Choose the **NIC** to connect to the VergeOS system.
4. Select **DHCP** or configure a **Static IP**.

If using static IP:
- Use the arrow keys to navigate between fields.
- Press <kbd>Enter</kbd> to edit a field and configure the IP, subnet, gateway, and DNS.

5. Enter the **VergeOS system URL** and **credentials**.

!!! warning "Ensure the user has permissions to create VMs."

6. Confirm the **VergeOS connection** and proceed.

## Clone Utility Configuration

1. Enter the **name** for the VM to be created on VergeOS.
2. Select the **disks** to be cloned.
3. Adjust any **Advanced Settings**:
    - **Send Threads:** Default = 4. Adjust for high-latency or high-speed connections.
    - **MAC addresses:** Choose whether to clone existing MAC addresses or generate new ones.

!!! note "Setting threads too high may degrade performance."

4. Begin the clone process by selecting **Start Clone**.

## Resuming a Clone

If a clone import fails or is interrupted, boot the source machine from the VergeOS Clone ISO again and resume by selecting the previously used VM name.

## Rebuilding the Clone ISO

1. To rebuild the Clone ISO after updates, go to **Backup/DR** on the Main Dashboard.
2. Click **Edit Clone ISO** and check **Force Rebuild**.
3. The rebuild may take a few minutes.

To automate rebuilds after system updates, schedule a task under **System > Tasks/Events**.

## Direct vSAN Network Configuration

The **Direct vSAN** transfer method can be used for faster cloning over a local network. It is not recommended for WAN connections.

!!! warning "Direct vSAN can only be used to transfer to a root system (not directly to a tenant)."

### Network Rules Setup

Three networking rules must be created:

### Core Network Rule - 14201 PAT Rule

1. **Name:** vSAN PAT
2. **Action:** Translate
3. **Protocol:** TCP
4. **Direction:** Incoming
5. **Source:** Any / None (default)
6. **Destination Type:** Custom  
   **Custom Filter:** ui  
   **Destination Ports:** 14201
7. **Target Type:** IP/Custom  
   **Target IP:** ui

!!! note "UI is a VergeOS keyword that must be entered in lowercase."

### Core Network SNAT Rule

1. **Name:** vSAN SNAT for Clone Utility
2. **Action:** Translate
3. **Protocol:** TCP
4. **Direction:** Outgoing
5. **Source:** Any / None (default)
6. **Destination Type:** My Network Address  
   **Destination Ports:** 14201
7. **Target Type:** My Router IP

### External Network Rule - 14201 PAT Rule

1. **Name:** vsan PAT
2. **Action:** Translate
3. **Protocol:** TCP
4. **Direction:** Incoming
5. **Source:** Source IP/IP range of the incoming clone transfer
6. **Destination Type:** My Router IP  
   **Destination Ports:** 14201
7. **Target Type:** IP/Custom  
   **Target IP:** ui

Once the rules are created, click **Apply Rules** to finalize the configuration.

## Troubleshooting Common Issues

### Failed DHCP

If DHCP cannot be found:

- Verify there is an active DHCP service.
- Ensure network connectivity is available through the selected NIC.

### Login Failed

- Check the username, password, and URL format (no "https://").
- Verify static IP settings and DNS configuration if using static addressing.

### OpenSSL Errors

These errors indicate network problems. Check for MTU mismatches or other network issues.

### Permission Denied

Ensure the VergeOS user has the necessary permissions to create VMs.

!!! note "If the initial clone fails due to permissions, you can resume the process or delete the VM and restart the clone."

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

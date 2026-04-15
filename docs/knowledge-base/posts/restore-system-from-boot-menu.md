---
title: Restoring a VergeOS System from the Boot Menu
slug: restore-vergeos-system-from-boot-menu
description: How to restore a complete VergeOS system from the boot menu when the UI is inaccessible.
author: VergeOS Documentation Team
draft: false
date: 2026-04-12
semantic_keywords:
  - "restore from boot menu"
  - "full system restore"
  - "recover from inaccessible UI"
  - "command line restore"
  - "boot menu recovery"
use_cases:
  - "restore_entire_system_without_user_interface"
  - "recover_system_from_boot_menu"
tags:
  - snapshot
  - restore
  - recovery
  - boot
  - system
categories:
  - Snapshot
editor: markdown
dateCreated: 2026-04-08
---

# Restoring a VergeOS System from the Boot Menu

A full-system restore can be performed directly from the VergeOS boot menu.  This option is intended for system recovery when you are unable to access the user interface.  The following article walks through the steps to restore a complete VergeOS system from a previously taken system snapshot using the boot menu restore option.

!!! warning "This process will overwrite the existing system."
    Proceeding with a boot menu restore replaces the current system fully with the selected snapshot, reverting all system components to the snapshot state, including:

    - Virtual Machines
    - Tenant configurations
    - NAS data
    - System settings
    - All other system components

    This is a comprehensive restoration that cannot be selectively applied to specific components.

    

## Prerequisites

- At least one available full system snapshot to restore from
- Physical console or IPMI access to the nodes
- Planned shutdown/reboot of all VergeOS nodes
- All nodes must be available and ready for restore (connected, hardware functional)

## Steps

1. **Shut down all nodes** in the VergeOS environment before beginning the restore.

2. **Power on Node 1.**

3. **At the boot menu, select *Verge.io OS System Restore*.**
   - Use the up/down arrow keys to highlight the option and press **Enter** to select it.

    !!! warning "The boot menu has a 5-second timeout."
        Press a key (e.g., an arrow key) within 5 seconds of the menu appearing — otherwise the system will automatically boot to the currently installed version.

4. **Wait for the vSAN to mount.** Do not press any keys during this process — any keypress can interrupt the load.

    !!! warning "The next 2 steps (selecting a snapshot number and confirming the snapshot for restore) each operate with a 5-minute timeout - the system will automatically reboot to the current system state when there is no selection or input during that time."

5. **Select the snapshot to restore from.**
   - A numbered list of available system snapshots is displayed.  Enter the number corresponding to the desired snapshot and press **Enter**. 

    !!! tip "Snapshots are listed alphabetically by name — not by the date/time they were taken. 
   

6. **Confirm the restore snapshot.**
   - When prompted, type the **exact name of the snapshot** you are restoring and press **Enter**.
   - The name must match exactly as shown.
  

7. **Optionally take a snapshot of the current system before overwriting.**
   - The system will prompt you with an option to: **backup the current system before restoring**.

    !!! tip "Considerations for Creating a Snapshot of Current State"
        Taking a snapshot of the current system state can be useful for later diagnostic activities. However, if the restore is being performed due to an out-of-space vSAN or a double-failure situation, this pre-restore snapshot may cause the system to show persistent repair activity until the snapshot is deleted.
   **Yes** is the default — pressing **Enter** without typing anything or not making a selection here will accept the default and take the snapshot.  Snapshot naming convention: `Backup_YYYY-MM-dd_hh:mm:ss`

    !!! warning "This snapshot is created to ***Never Expire***. After the system has been restored, and you confirm this snapshot is no longer needed: delete the snapshot or modify to set the expiration to a near-future date."

8. **Finish the restore.**
    - The restore process will begin. 
    - When the following message appears, power on all other nodes:   
        `Waiting for nodes to be ready for restore: node2` 
    - **Do not press any keys while the restore process is completing.**  Allow the restore process to complete and reboot each node automatically. 

## Post-Restore Steps

### Verification

After the system reboots, log into the VergeOS UI to verify the health of the restored system:

- **Verify all nodes are detected and show online** (green status) in the node list.
- **Review the [Alarms](/product-guide/operations/alarms) dashboard**. 
- **Check the system log** (on the Main Dashboard) for anything unexpected that may have occurred during or after the restore.
- **Confirm all vSAN tiers show online.** Tiers may take some time to come fully online after a restore, as the system may perform a journal walk. See [Journal Walks and vSAN Tier Status](/knowledge-base/understanding-journal-walks-and-vsan-tier-status) for more information.

### Pre-Restore Snapshot

If you opted to take the pre-restore system snapshot, note that it is set to ***Never Expire***. Once the restore is verified and the snapshot is no longer needed, delete it or set its expiration to a near-future date. Snapshots set to never expire can consume significant vSAN storage over time as live data continues to change.

---

## Troubleshooting

### Restore operation appears to hang

**Symptoms:**

- Restore operation appears to stall with the last message indicating it is waiting for a node (e.g. **Waiting for nodes to be ready for restore: node2**).

**Resolution:**

- Verify the specified node is connected and powered on.  All nodes must be functional and able to accept the restore. 

**Symptoms:**

- Restore operation appears to stall with one or more additional characters displaying after the "Waiting for nodes..." message.  


**Resolution:**

- This may indicate a key was pressed while the restore was in the completion phase, halting the process.  If the screen remains unchanged for more than several minutes, reboot node1 to access the boot menu, and repeat restoration steps.  Ensure there is no keyboard activity when the restore indicates it is waiting for nodes to be ready.    


### Error when attempting to log in immediately after restore

**Symptoms:**

- After selecting the *User Interface* option, the browser loads and reports: ***Site Can't be Reached*** or ***Invalid JSON format received from the server***

**Resolution:**

- After a restore, networks must restart before the UI becomes accessible. Wait 1–2 minutes for networks to automatically come back online, refresh the browser page to retry connecting to the VergeOS UI.


---

!!! question "Need Help?"
    If you need further assistance, please contact the [VergeOS Support Team](/support).



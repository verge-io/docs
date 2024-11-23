---
title: Add Tier 0 to a System
slug: adding-tier-zero
description: Special-case instructions to add Tier 0 to an existing system. 
draft: false
date: 2024-11-22T19:22:21.109Z
tags:
  - tier
  - storage
  - configuration
  - meta
categories:
  - Installation
  - Storage
  - vSAN
editor: markdown
dateCreated: 2024-09-22T18:16:54.516Z
---

# Add Tier 0 to an Existing System

Tier 0 should be configured during the VergeOS system install.  The following instructions provide a special-case method for adding tier 0 drives after installation, when dealing with a production system that cannot be reinstalled.  

!!! danger "Danger"

    * **These steps should only be performed by qualified VergeOS engineers or under direct guidance of VergeOS support.**
    
    * **Devices selected to add to vSAN storage will be formatted and all existing data on the drives will be destroyed.**
   
    * **It is critical that correct device paths are entered during this operation; specifying incorrect drives can dismantle your system.**

## Prerequisites

Drives need to be physically installed prior to proceeding.  Tier 0 storage devices must be consistent across controller nodes.  
For proper selection of drive hardware, consult: [Node Sizing](/implementation-guide/sizing) section.  

## Determine Linux Device Paths

Navigate to **vSAN Diagnostics** (Main Dashboard > System > vSAN Diagnostics).  
Find the Linux device path for each drive to be added (/dev/sd\*) using **Query option**: ***Get Node Device List***;**Send**.

* This lists all the storage devices detected on the node, including drives that are already participating in the vSAN.  
* Look for devices that show "vsan = false".  
* Device paths may be different across nodes; be sure to take careful note of device paths corresponding to each controller node.

!!! tip "View the list of drives used in each vSAN tier (Main Dashboard > vSAN Tiers > double-click a tier > Drives) to double-check that device paths are not already in use."

## Steps to Add Tier 0 Drives

**Repeat for each drive:**

Select **Diagnostics Query:** ***Add Drive to vSAN***.  
Configure fields: **Node**: node0 or node1; **Path**: device path determined in step above; **Tier**: ***Tier 0***  
**Swap**: enable/disable for tier 0

!!! warning "Important Swap Considerations"

    * Swap should only be enabled on one tier of storage; disable swap here if it is already enabled on another tier.
    * Enabling Swap on multiple tiers of storage can have adverse effects on performance.
    * If you are unsure about whether to enable swap for tier 0, please consult with VergeOS Engineering.

### Verify/Complete Adding a Drive

The phrase *Yes I know what I'm doing* must be entered (exactly) to allow the operation.

Click **Send** to complete adding the device.

## After Adding Drives

The system dashboard will indicate the tier is "online-no redundancy" while meta is migrated to the new tier.

!!! tip "Run ***Refresh > Drives & NICs*** from both controller node dashboards to update drive/node information that displays on the vSAN tier 0 dashboard."

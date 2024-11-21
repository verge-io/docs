---
title: Add Tier 0 to a System
slug: adding-tier-zero
description: Learn how to export a virtual machine from VergeOS and download its disk as a .raw file.
draft: false
date: 2024-11-19T19:22:21.109Z
tags:
  - tier
  - storage
  - configuration
  - meta
categories:
  - installation
  - Storage
  - vSAN
editor: markdown
dateCreated: 2024-09-19T18:16:54.516Z
---

# Add Tier 0 to an Existing System

Tier 0 should be configured during the VergeOS system install.  The following instructions provide a special-case method for adding tier 0 drives after installation, when dealing with a live, production system that cannot be reinstalled.  

!!! danger "Danger"

    * **These steps should only be performed by qualified VergeOS engineers or under direct guidance of VergeOS support.**
    
    * Devices selected to add to storage will be formatted and all existing data on the drive will be destroyed.
   
    

Drives need to be physically installed prior to proceeding.  For proper selection of drive hardware, consult [Node Sizing](/docs/implementation-guide/sizing.md) section.

## Steps to Add Tier 0 Storage

1. Navigate to **vSAN Diagnostics** (Main Dashboard > System > vSAN Diagnostics)
2. **Determine** the Linux **device path(s)** (e.g. /dev/sde) for the drives to be added using **Query option**: ***Get Node Device List***; The device path may be different across nodes; be sure to take careful note of the correct device path of each drive to be added on each controller node. Typically, only node1 and node2 are controller nodes.

Repeat the following steps for each drive/node:
3. Select Diagnostics Query: ***Add Drive to vSAN***.
4. Configure fields as follows:
**Node**: controller node to add the storage to  
**Path**: device path determined in step above
!!! danger "Device Paths"

    * It is imperative the correct drive paths are entered; specifying incorrect drives can wipe out existing data on your vSAN.
    * Drive paths may be different across nodes. Be careful to use the correct device path corresponding to the selected node.
  
**Tier**: ***Tier 0***  
**Swap**: enable/disable for tier 0
!!! warning "Important Swap Considerations"

    * Swap should only be enabled on one tier of storage; disable swap here if it is already enabled on another tier.
    * Enabling Swap on multiple tiers of storage can have adverse effects on performance.
    * If you are unsure about whether to enable swap for tier 0, please consult with VergeOS Engineering.

**Verify** the phrase: "Yes I know what I'm doing" (entered exactly) is required to allow the operation.  
5. Click **Send** to complete adding the device.

In between adding drive(s) on each tier, there will be errors in the node/system logs that will be normal:

After adding the drives to all controller nodes, the system dashboard will display non redundancy of the storage tier and there will be repair entries in the logs until the meta data has been successfully migrated to the tier 0 drives.
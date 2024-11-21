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

Tier 0 should normally be added during system install.  These instructions provide a special-case method for adding tier 0 drives post install, when it is not possible to reinstall, e.g. when dealing with a live, production system.  
These steps should only be performed by qualified VergeOS engineers or under direct supervision of VergeOS support.

Drives need to be physically installed prior to proceeding.

!!! "important"
    All drives in a tier must be alike. If a drive of an incorrect size is added to an existing tier, the tier will only be able to use the space of the smallest drive.

!!! warning "Important"
  * It is imperative that the correct drives are selected, i.e the correct drive paths are entered for each node.
   * Devices selected to add to storage will be formatted and all existing data on the drive will be destroyed.

1. Navigate to **vSAN Diagnostics** (Main Dashboard > System > vSAN Diagnostics)
2. **Determine** the Linux **device path(s)** (e.g. /dev/sde) for the drives to be added using **Query option**: ***Get Node Device List***; The device path may be different across nodes; be sure to take careful note of the correct device path of each drive to be added on each controller node.
!!! note "Typically, only node1 and node2 are controller nodes."

Repeat the following steps for each drive/node:
3. Select Diagnostics Query: ***Add Drive to vSAN***.
4. Configure fields as follows:
**Node**: controller node to add the storage to  
**Path**: device path determined in step above (Be sure to use the device path that corresponds to the selected node.)  
**Tier**: ***Tier 0***  
**Swap**: enable/disable for tier 0
!!! warning Considerations when selecting Swap
    * Swap should only be enabled on one tier of storage; disable here if it is already enabled on another tier.
    * Enabling Swap on multiple tiers of storage can have adverse effects on performance.
    * If you are unsure about whether to enable swap for tier 0, please consult with VergeOS Engineering.

**Verify** the phrase: "Yes I know what I'm doing" (entered exactly) is required to allow the operation.  
5. Click **Send** to complete adding the device.

In between adding drive(s) on each tier, there will be errors in the node/system logs that will be normal:

After adding the drives to all controller nodes, the system dashboard will display non redundancy of the storage tier and there will be repair entries in the logs until the meta data has been successfully migrated to the tier 0 drives.



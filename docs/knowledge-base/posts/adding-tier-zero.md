---
title: Adding Tier 0 to an Existing System
slug: adding-tier-zero
description: How to add Tier 0 storage to an existing VergeOS system
draft: false
date: 2024-11-25T18:16:54.516Z
tags:
  - tier
  - storage
  - configuration
  - meta
  - metadata
categories:
  - Storage
  - vSAN
editor: markdown
dateCreated: 2024-11-25T18:16:54.516Z
---

# Adding Tier 0 to an Existing System

## Overview

!!! info "Key Points"
    - Tier 0 is normally configured during initial installation
    - This procedure is for special cases requiring post-installation configuration
    - Requires careful attention to device paths and hardware compatibility

This guide outlines the process for adding Tier 0 storage to an existing VergeOS system. While Tier 0 is typically configured during installation, these steps provide a method for adding it to production systems that cannot be reinstalled.

!!! danger "Critical Warning"
    - This procedure should only be performed by qualified VergeOS engineers or under direct support guidance
    - Selected devices will be formatted and all existing data will be destroyed
    - Incorrect device path selection can seriously damage your system

## Prerequisites

Before beginning this procedure, ensure:

- Storage devices are physically installed in the system
- Tier 0 devices are consistent across controller nodes
- Hardware meets specifications from the [Node Sizing Guide](/implementation-guide/sizing/)

## Steps

### 1. Identify Device Paths

1. Navigate to **System > vSAN Diagnostics** from the Main Dashboard
2. Select **Get Node Device List** from the Query dropdown
3. Click **Send**
4. Identify unused devices (marked as "vsan = false")
5. Note the device paths (/dev/sd*) for each controller node

!!! tip 
    Verify current vSAN drive assignments by checking **vSAN Tiers > [select tier] > Drives** to avoid selecting drives already in use.

### 2. Add Drives to Tier 0

For each drive:

1. In vSAN Diagnostics:
   - Set Query to **Add Drive to vSAN**
   - Select the appropriate **Node** (node0 or node1)
   - Enter the correct **Path** for the device
   - Set **Tier** to **Tier 0**
   - Configure **Swap** setting

!!! warning "Swap Configuration"
    - Enable swap on only ONE storage tier
    - If swap is enabled on another tier, disable it for Tier 0
    - Contact VergeOS Support for guidance on swap configuration if needed

2. Enter the verification phrase: *Yes I know what I'm doing*
3. Click **Send** to execute

### 3. Verify Configuration

1. Monitor the system dashboard for tier status
   - Status will show "online-no redundancy" during meta migration
2. Refresh node information:
   - Navigate to each controller node's dashboard
   - Select **Refresh > Drives & NICs**

## Post-Configuration

Monitor the vSAN tier status in the system dashboard. The tier should transition from "online-no redundancy" to "online" once meta migration completes.

## Additional Resources

- [vSAN Architecture Overview](/product-guide/vsanoverview/)
- [Storage Management](/product-guide/storage/)
- [Node Sizing Guide](/implementation-guide/sizing/)

---

!!! note "Document Information"
    - Last Updated: 2024-11-25
    - VergeOS Version: 4.13

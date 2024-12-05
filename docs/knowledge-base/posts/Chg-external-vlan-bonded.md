---
title: Change External Network to VLAN Bonded
slug: chg-ext-vlan-bonded
description: Instuctions to change an existing external network to a vlan bonded across physical networks
author: VergeOS Documentation Team
draft: true
date: 2024-11-24T18:38:59.908Z
tags: bonded, network, bonding, redundant, external
categories:
  - Network
  - Network Configuration
editor: markdown
dateCreated: 2024-11-24T18:38:59.908Z
---

# Change External Network to Bonded with Tagged VLAN

## Overview

!!! info "Key Points"
    - This procedure creates an active-backup bond across vlanned physical networks.
    - It is recommended for bare-metal installations with a limitation of 2 NICs per node.
    - System downtime is not required to make this change.

This guide outlines the process to create a bonded external network across vlanned physical networks.  The outlined method provides optimal redundancy for bare-metal installations that are limited to two NICs per node, allowing for two independent core-fabric networks and a single-VLAN, bonded external network.

## Prerequisites

!!! warning annotate
    - This process should be performed with local server access because external network changes can affect remote UI access. This will also allow you to test the bond configuration by removing one of the network cables to verify expected bond failover.
    - Before making any significant system changes confirm you have the name/password for the "admin" user (user ID #1 (1)), in case command-line operations become needed.

1. Hint: "Key=1" parameter is in the URL of the user's dashboard

## Steps

1. Navigate to the **external network dashboard** (Main Dashboard > Networks > Externals > double-click external network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (VLAN number).
3. **Select** the checkbox option for **both physical networks**.
4. Click **Submit** to save the change.
  
## Post Configuration

1. Check the external network by accessing the UI from a remote connection.
2. Test Bond failover: Navigate to the external network dashboard and select **NICs** to view the network adapters. Physically disconnect one network cable. The UI should now indicate the NIC is in a "Down" status; verify remote UI access is still available.  
!!! warning "Verify core network redundancy is in place before disconnecting network cables."

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Loss of remote access
      - Solution:
        1. Check correct VLAN was entered in the external network config
        2. Verify network switch ports are correctly configured for the VLAN tag.

## Additional Resources

- [Network Design Models](/implementation-guide/network-design)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: [2024-11-26]
    - vergeOS Version: [4.13.1]

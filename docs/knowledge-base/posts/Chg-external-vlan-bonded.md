---
title: Change External Network to vLAN Bonded
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

# Change External Network to bonded with tagged VLAN

## Overview

!!! info "Key Points"
    - This procedure creates an active-backup bond across vlanned physical networks.
    - It is recommended for bare-metal installations limited to 2 NICs per node.
    - System downtime is not required to make this change.

This guide outlines the process to create a bond across vlanned physical networks for an external network.  The outlined method provides optimal redundancy for bare-metal installations that are limited to two NICs per node, allowing each physical network to provide an independent core fabric network and external access vlan tag, bonded across NICs.

```mermaid
flowchart TB
    subgraph NODE_1["Node 1"]
        direction LR
        subgraph NIC_1["NIC 1"]
            N1[NIC 1 Port]
            V101_1[VLAN 101]
            V102_1[VLAN 102<br>Core 1 Fabric]
            N1 --- V101_1
            N1 --- V102_1
        end

        subgraph NIC_2["NIC 2"]
            N2[NIC 2 Port]
            V101_2[VLAN 101]
            V103_1[VLAN 103<br>Core 2 Fabric]
            N2 --- V101_2
            N2 --- V103_1
        end

        BOND1[Bond Interface]
        V101_1 --- BOND1
        V101_2 --- BOND1
    end

    EXTERNAL[External Network]
    BOND1 --- EXTERNAL
    BOND2 --- EXTERNAL

    CORE1[Core 1 Fabric]
    CORE2[Core 2 Fabric]

    subgraph NODE_2["Node 2"]
        direction LR
        subgraph NIC_3["NIC 1"]
            N3[NIC 1 Port]
            V101_3[VLAN 101]
            V102_2[VLAN 102<br>Core 1 Fabric]
            N3 --- V101_3
            N3 --- V102_2
        end

        subgraph NIC_4["NIC 2"]
            N4[NIC 2 Port]
            V101_4[VLAN 101]
            V103_2[VLAN 103<br>Core 2 Fabric]
            N4 --- V101_4
            N4 --- V103_2
        end

        BOND2[Bond Interface]
        V101_3 --- BOND2
        V101_4 --- BOND2
    end

    V102_1 --- CORE1
    V102_2 --- CORE1
    V103_1 --- CORE2
    V103_2 --- CORE2

```

## Prerequisites

!!! warning
    - This process should be performed with local server access because external network changes can affect remote UI access. This will also allow you to test the bond configuration by removing one of the network cables to verify expected bond failover.
    - Before making any significant system changes confirm you have the name/password for the "admin" user(user ID #1) in case command-line operations become needed.

## Steps

1. Navigate to the **external network dashboard** (Main Dashboard > Networks > Externals > double-click external network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (vLAN number).
   !!! warning "Be certain NOT to enter a VLAN ID that is used by one of the core networks."
3. **Select** the checkbox option for **both physical networks**.
4. Click **Submit** to save the change.
  
## Post Configuration

1. Verify inbound/outbound traffic through the external
   1. 
  
2. Test external bond failover
   1. 

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Loss of remote access
      - Solution:
        - Check correct vlan selected in external network config
        - Verify physical switches/external networking are configured to accomodate the vlan tag.

## Additional Resources

- [Network Design Models](/implementation-guide/network-design)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: [2024-11-26]
    - vergeOS Version: [4.13.1]

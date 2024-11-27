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
    - System downtime is not required.

This guide outlines the process to create a bond across vlanned physical networks for an external network.  The outlined method provides optimal redundancy for bare-metal installations that are limited to two NICs per node, allowing each physical network to provide an independent core fabric network and both NICs to provide external access with a common vlan tag, which is then bonded.

## Prerequisites

!!! warning "**Alternative Management Access**"
    - Making changes to your external network will cause temporary loss of remote access. Verify you have physical console or IPMI accesss.
    - Before making any significant system changes you should verify you have the name/password for the "admin" user(user ID #1) which is necessary for command-line operations.

## Steps

1. Navigate to the **external network dashboard** (Main Dashboard > Networks > Externals > double-click intended external network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (vLAN number)
!!! warning
3. Check the **Enable Bonding** option.
4. Select the checkbox option for both physical networks.  

## Troubleshooting

!!! warning "Common Issues"
    [List common issues and their solutions]

    - Problem: [Describe the issue]
      - Solution: [Provide steps to resolve]

## Additional Resources

- [Network Design Models](knowledge-base/network-design)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: [2024-11-26]
    - vergeOS Version: [4.13.1]

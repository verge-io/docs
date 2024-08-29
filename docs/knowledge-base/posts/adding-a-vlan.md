---
title: VLAN Creation
slug: vlan-creation
description: Adding a VLAN to the Verge.io Environment
published: true
date: 2023-06-06T14:17:24.473Z
tags: [vlan, networking]
categories:
  - Network
editor: markdown
dateCreated: 2022-06-30T15:23:20.794Z
---

# VLAN Creation in VergeOS

## Overview

!!! info "Key Points"
    - Add VLANs to appropriate switchports
    - Create a new external network in the VergeOS UI
    - Configure the network settings
    - Attach workloads to the new VLAN

This guide walks you through the process of creating a VLAN (Virtual Local Area Network) in the VergeOS environment. VLANs are essential for network segmentation and improving network performance and security.

## Prerequisites

- Access to the VergeOS system as an administrator
- Physical network infrastructure that supports VLANs
- Basic understanding of networking concepts and VLANs

## Steps

1. Prepare the Physical Network
   - Add the desired VLAN(s) to the appropriate switchports so they are accessible to the nodes running the VergeOS environment

2. Navigate to Network Creation
   - From the **Main Dashboard**, go to **Networks**
   - Select **"New External"** in the left menu

3. Configure Network Settings
   - In the network creation page, enter the following settings:
     ![new-vlan.png](/docs/public/new-vlan.png)

!!! note "Interface Network Selection"
    For the "Interface Network" option, be sure to select the physical network on the nodes that the VLAN enters the environment on. These are typically appended with the name "Switch" during install. For all other settings, the default options are typically sufficient.

4. Submit Configuration
   - Click the submit button to create the new network

5. Verify Network Status
   - You will be brought to the newly created network's dashboard
   - Verify that the status shows as **"Running"** if the configuration from above was used

6. Attach Workloads
   - Workloads can now be attached to the newly created network

!!! note "Adding VLANs to Tenants"
    See the [Virtual Wires KB](/docs/knowledge-base/virtual-wire-setup-and-use/?h=virtual+wire#adding-vlans-inside-of-the-tenant) article for adding VLANS into Tenants.

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Network status not showing as "Running"
      - Solution: 
        1. Verify that the physical network supports the VLAN configuration
        2. Check if the correct Interface Network was selected
        3. Ensure that the VLAN ID matches the one configured on the physical switch

    - Problem: Unable to attach workloads to the new VLAN
      - Solution: 
        1. Confirm that the network is in "Running" status
        2. Verify that the workload has the correct network configuration
        3. Check for any conflicting network policies

## Additional Resources

- [Network Troubleshooting](/docs/product-guide/net-troubleshooting/)
- [Virtual Wire Setup and Use](/docs/knowledge-base/virtual-wire-setup-and-use/?h=virtual+wire#prerequisite-steps)

## Feedback

!!! question "Need Help?"
    If you encounter any issues while creating VLANs or have questions about this process, please don't hesitate to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2023-06-06
    - VergeOS Version: 4.12.6
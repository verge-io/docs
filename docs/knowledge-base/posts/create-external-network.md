---
title: How to Create an External Network
slug: create-external-network
description: Step-by-step guide to creating an external network in VergeOS with VLAN, static IP, and default routing rule configuration.
author: VergeOS Documentation Team
draft: false
date: 2024-10-20T12:00:00.000Z
semantic_keywords:
  - "create external network vergeos vlan static ip"
  - "configure wan network routing rules gateway"
  - "external network setup vlan id interface"
  - "default route rule outgoing gateway configuration"
use_cases:
  - create_external_network_vlan
  - configure_static_ip_external_network
  - add_default_routing_rule
tags:
  - network
  - vlan
  - network setup
  - external routing
  - gateway
  - static ip
  - routing rules
  - wan
  - network management
categories:
  - Network
editor: markdown
dateCreated: 2024-10-20T12:00:00.000Z
---

# How to Create an External Network

This guide provides steps for creating an external network in VergeOS. The example assumes that the physical network in VergeOS is named **External Switch**, the VLAN for the new network is **50**, and a **static IP address** is being used.

## Steps

1. **Access Network Configuration:**
   
   - Navigate to **Networks** > **New External**.

2. **Configure Network Settings:**
   
   - **Network Name**: Enter a name for your network. In this example, use **WAN1**.
   - **Layer 2 Type**: Set to **vLAN**.
   - **Layer 2 ID**: Enter the VLAN ID, in this example, **50**.
   - **MTU**: Leave as **1500** (Advanced users may adjust this as needed).
   - **Interface Network**: Select the physical network, in this example, **External Switch**.

3. **Configure Network Router:**
   
   - **IP Address Type**: Select **Static**. (If using DHCP, select it here and skip the remaining router steps).
   - **IP Address**: Enter the IP address for this network. Example: **192.168.212.2**.
   - **Network Address**: Enter the network address in CIDR format. Example: **192.168.212.0/24**.
   - **Gateway Monitoring**: Enabling this feature is recommended for network reliability.

4. **Save and Activate the Network:**
   
   - Click **Save** and wait for the network to power on. Once it displays as **Running**, proceed to set up routing rules.

5. **Add Default Routing Rule:**
    
   - Click on **Rules** and select **New**.
   - **Rule Name**: Enter a name for this rule, such as **default route**.
   - **Action**: Select **Route**.
   - **Direction**: Choose **Outgoing**.
   - **Source and Destination Filters**: Leave as **any** and **default** since this is the default route.
   - **Target**:
      - **Type**: Select **IP/Custom**.
      - **Target IP**: Enter the router IP of your gateway. Example: **192.168.212.1**.
   - Click **Save**, then **Apply Rules**.

## Required Firewall Rules for WebUI Access

A newly created external network blocks all incoming traffic by default. To access the VergeOS WebUI through the new network, two things are required: a firewall Accept rule on the external network, and an outbound route on the **Core network** that directs traffic back out through WAN1.

### Allow Incoming HTTP and HTTPS

1. Navigate to the external network (**Networks > Externals > WAN1**).
2. Click **Rules** > **New**.
3. Configure the rule:
   - **Rule Name**: Enter a name such as `Allow WebUI`.
   - **Action**: Select **Accept**.
   - **Protocol**: Select **TCP**.
   - **Direction**: Select **Incoming**.
4. Configure **Source**:
   - **Type**: Select **Any**.
5. Configure **Destination**:
   - **Type**: Select **My IP Addresses**.
   - **Destination Ports/Ranges**: Enter **443, 80**.
6. Click **Save**, then **Apply Rules**.

### Core Network Outbound Route (Required)

The external network's default gateway (configured in [Step 5](#add-default-routing-rule)) handles outbound traffic from WAN1 to the upstream router. However, for the Core network to route return traffic back out through WAN1 — rather than sending it out the system's default external network — you must add a specific outbound route on the Core network for the subnets reachable via WAN1. This rule must be placed **before** the Core's existing default route so that matching traffic is handled by it first.

1. Navigate to **Networks > Core**.
2. Click **Rules** > **New**.
3. Configure the rule:
   - **Rule Name**: Enter a name such as `Route via WAN1`.
   - **Action**: Select **Route**.
   - **Direction**: Select **Outgoing**.
4. Configure **Destination**:
   - **Type**: Select **Other Network Address**.
   - **Network**: Select **WAN1**.
5. Configure **Target**:
   - **Type**: Select **Other Network DMZ IP**.
   - **Target Network**: Select **WAN1**.
6. Click **Save**.
7. In the Rules list, ensure this rule appears **above** the Core's default outbound route. Use the rule ordering controls to move it if needed.
8. Click **Apply Rules**.

!!! warning "Apply Rules Required"
    New and modified rules have no effect until **Apply Rules** is clicked. The network dashboard will show a banner reminding you when unapplied changes are pending.

## Feedback

!!! question "Need Help?"
    If you have any questions or encounter issues while creating an external network, please reach out to our support team for assistance.

---

!!! note "Document Information"
     - Last Updated: 2024-10-30
     - VergeOS Version: 4.12.6

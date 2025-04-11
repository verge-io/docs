---
title: Routing Between Internal VergeOS Networks
slug: routing-between-internal-vergeio-networks
description: 
draft: false
date: 2023-01-24T15:45:22.430Z
tags:
  - routing
  - internal
  - route
  - networks
categories:
  - Network
  - Network Rules
editor: markdown
dateCreated: 2022-09-07T13:11:47.555Z
---

# How to Configure Routing Between Networks

The following is a simple method to establish a route between two networks in the VergeOS platform.

## Create a Network Rule on the First Network to Route Traffic to the Second Network

1. Navigate to the first network that you would like to route traffic from.
2. From the network dashboard, click on **Rules** in the left navigation menu.
3. In the **Rules** menu, click on **New** to create a new network rule.
4. Configure the rule with the following settings:
   - **Rule**:
     - Name: *A name indicating this rule is a route to the second network.*
     - Action: **Route**
     - Protocol: **Any**
     - Direction: **Outgoing**
   - **Source**:
     - Type: **My Network Address**
   - **Destination**:
     - Type: **Other Network Address**
     - Network: *The name of the second network*
   - **Target**:
     - Type: **Other Network DMZ IP**
     - Target Network: *The name of the second network*
5. After completing this rule, click **Submit** to save the rule.

---

## Create a Network Rule on the First Network to Allow Traffic from the Second Network

1. From the same network dashboard, click on **Rules** in the left navigation menu.
2. In the **Rules** menu, click on **New** to create a new network rule.
3. Configure the rule with the following settings:
   - **Rule**:
     - Name: *A name indicating this rule allows traffic from the second network.*
     - Action: **Accept**
     - Protocol: **Any**
     - Direction: **Incoming**
   - **Source**:
     - Type: **Other Network Address**
     - Network: *The name of the second network*
   - **Destination**:
     - Type: **My Network Address**
4. After completing this rule, click **Submit** to save the rule.
5. Click **Apply Rules** to enable the rule.

!!! info
    After completing the two rules on the first network, you will need to create identical rules on the second network.

---

## Create a Network Rule on the Second Network to Route Traffic to the First Network

1. Navigate to the **second** network that you would like to route traffic from.
2. From the network dashboard, click on **Rules** in the left navigation menu.
3. In the **Rules** menu, click on **New** to create a new network rule.
4. Configure the rule with the following settings:
   - **Rule**:
     - Name: *A name indicating this rule is a route to the first network.*
     - Action: **Route**
     - Protocol: **Any**
     - Direction: **Outgoing**
   - **Source**:
     - Type: **My Network Address**
   - **Destination**:
     - Type: **Other Network Address**
     - Network: *The name of the first network*
   - **Target**:
     - Type: **Other Network DMZ IP**
     - Target Network: *The name of the first network*
5. After completing this rule, click **Submit** to save the rule.

---

## Create a Network Rule on the Second Network to Allow Traffic from the First Network

1. From the same network dashboard, click on **Rules** in the left navigation menu.
2. In the **Rules** menu, click on **New** to create a new network rule.
3. Configure the rule with the following settings:
   - **Rule**:
     - Name: *A name indicating this rule allows traffic from the first network.*
     - Action: **Accept**
     - Protocol: **Any**
     - Direction: **Incoming**
   - **Source**:
     - Type: **Other Network Address**
     - Network: *The name of the first network*
   - **Destination**:
     - Type: **My Network Address**
4. After completing this rule, click **Submit** to save the rule.
5. Click **Apply Rules** to enable the rule.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

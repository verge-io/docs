---
title: Routing Between Internal Verge.io Networks
slug: routing-between-internal-vergeio-networks
description: 
published: true
date: 2023-01-24T15:45:22.430Z
tags: routing, internal, route, networks
categories:
  - Network
  - Network Rules
editor: markdown
dateCreated: 2022-09-07T13:11:47.555Z
---

## How to Configure Routing Between Networks

The following is a simple method to establish a route between two networks in the VergeIO platform. 
<br>
### Create a network rule on the first network to route traffic to the second network
1. Navigate to the first network that you would like to be able to reach the other network.
1. From that network dashboard, on the left navigation menu, click on **Rules**.
1. In the Rules menu, on the left navigation menu, click on **New** to create a new network rule.
1. The following settings should be configured for this rule:
   - Under Rule
      - Name: *Something to indicate this rule is a route to the second network.*
      - Action: Route
      - Protocol: Any
      - Direction Outgoing
   - Under Source
      - Type: My Network Address
   - Under Destination
      - Type: Other Network Address
      - network: The name of the second network
   - Under Target
      - Type: Other network DMZ IP
      - Target Network: The name of the second network
5. After completing this rule, click **Submit** to save the rule.
<br>

### Create a network rule on the first network to allow traffic from the second network

1. From the same network dashboard, on the left navigation menu, click on **Rules**.
1. In the Rules menu, on the left navigation menu, click on **New** to create a new network rule.
1. The following settings should be configured for this rule:
   - Under Rule
      - Name: *Something to indicate this rule is an allow traffic rule from the second network*
     - Action: Accept
     - Protocol: Any
     - Direction Incoming
   - Under Source
     - Type: Other Network Address
     - Network: The name of the second network
   - Under Destination
     - Type: My Network Address
4. After completing this rule, click **Submit** to save the rule.
1. After submitting both of these rules, the network will need to have the rule enabled by clicking on **Apply Rules**.
<br>

> After completing the two rules on the first network, you will need to create identical rules on the second network.
{.is-info}

<br>

### Create a network rule on the second network to route traffic to the first network

1. Navigate to the **second** network that you would like to be able to reach the other network.
1. From that network dashboard, on the left navigation menu, click on **Rules**.
1. In the Rules menu, on the left navigation menu, click on **New** to create a new network rule.
1. The following settings should be configured for this rule:
   - Under Rule
     - Name: *Something to indicate this rule is a route to the first network*
     - Action: Route
     - Protocol: Any
     - Direction Outgoing
   - Under Source
     - Type: My Network Address
   - Under Destination
     - Type: Other Network Address
     - network: The name of the first network
   - Under Target
     - Type: Other Network DMZ IP
     - Target network: The name of the first network
1. After completing this rule, click **Submit** to save the rule.
<br>

### Create a network rule on the second network to allow traffic from the first network
 
1. From the same network dashboard, on the left navigation menu, click on Rules.
1. In the Rules menu, on the left navigation menu, click on New to create a new network rule.
1. The following settings should be configured for this rule:
   - Under Rule
     - Name: *Something to indicate this rule is an allow traffic rule from the first network*
     - Action: Accept
     - Protocol: Any
     - Direction Incoming
   - Under Source
     - Type: Other Network Address
     - network: The name of the first network
   - Under Destination
     - Type: My Network Address
5. After completing this rule, click **Submit** to save the rule
1. After submitting both of these rules, the network will need to have the rule enabled by clicking on **Apply Rules**.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
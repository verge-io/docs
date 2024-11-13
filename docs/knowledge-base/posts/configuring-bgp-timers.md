---
title: Adjusting BGP Timers
slug: adjusting-bgp-timers
description: Learn how to adjust BGP timers
draft: false
date: 2024-11-13T14:45:26.463Z
author: VergeOS Documentation Team
tags:
  - network
  - networking
  - bgp
categories:
  - Network
dateCreated: 2024-11-13T14:45:26.463Z
---

# Configuring BGP Hold Down Timers

 BGP (Border Gateway Protocol) hold timers are critical for maintaining stable BGP sessions between routers. This document will guide you through configuring the BGP hold down timers to 5 seconds for the keepalive interval and 15 seconds for the hold time.

## Prerequisites

1. **Basic BGP Configuration**: You should have a basic BGP configuration set up.
2. **Basic Knowledge of FRR Configuration**: Familiarity with FRR configuration commands and procedures.

## Configuration Steps

### Step 1: Setup BGP

1. Create a new External Network.
2. Set its IP address type to BGP/OSPF.
3. Set an ASN (Autonomous System Number).
4. Define the IP address and Network Address.
5. If this is a VLAN, configure the Layer 2 ID.
6. Select an interface network.

### Step 2: Open the BGP Network

1. Open the network you created.
2. Select **Routers** from the left menu.
3. Open the ASN you defined during network creation.
4. Select **New** from the left menu.
5. Select **Timers** from the command menu.
6. Under **Parameters**, enter `bgp x y` where `x` is the keepalive interval and `y` is the hold time. For example, `bgp 5 15`.
7. Select **Submit**. This will return you to the Router page.
8. Navigate back to the BGP network. A restart is required for the recent changes to take effect. Click **Restart** to apply changes.

### Step 3: Verify the Setting

1. Navigate back to the BGP network you configured.
2. Select **Network Diagnostics** from the left menu.
3. Choose **FRRRouting BGP/OSPF** from the Query dropdown.
4. Run the default command `show running-config`.
5. The settings modified in Step 2 should now appear in the running configuration.

For more information on other values and variables, refer to the [FRR documentation](https://docs.frrouting.org/en/latest/basic.html).

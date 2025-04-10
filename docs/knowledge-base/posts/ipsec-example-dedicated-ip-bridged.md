---
title: IPsec Configuration Example - Dedicated IP/bridged internal network
slug: ipsec-example1
description: IPsec Tunnel - Configuration Example - Dedicated IP Address, bridged network for workloads
author: VergeOS Documentation Team
draft: false
date: 2025-04-04T15:19:47.449Z
tags:
  - vpn
  - networking
categories:
  - VPN
editor: markdown
dateCreated: 2025-01-31T14:48:12.332Z
---

# IPSec Example -  Dedicated Public IP 

!!! note "IPsec is a complex framework that supports a vast array of configuration combinations and many ways to achieve the same goal, making it impossible to provide  one-size-fits-all instructions.  Sample configurations are given for reference and should be tailored to meet the particular environment and requirements."

!!! info "Consult the [IPSec Product Guide Page](/product-guide/ipsec) for step-by-step general instructions on creating an IPSec tunnel."


The following example utilizes a dedicated public IP address for a VPN tunnel.  The VPN router is bridged to an existing internal network to provide Layer 2-connectivity to that network.

* **VPN Network:** *vpn-ipsec*  
* **VPN Router address:** *192.168.0.254*  
* **Local VPN network:** *192.168.0.0/24*  
* **Remote VPN network:** *10.10.0.0/16*  
* **Bridged Internal Network:** *Internal-xyz*


## Static Lease
We reserve the VPN router address on the network we will bridge to (Internal-xyz), to avoid another device taking this IP address.  
![VPN Static Lease](../assets/ipsec-dedicated-bridged-staticlease.png)

## VPN Network Configuration
![VPN Network Config](../assets/ipsec-dedicated-bridged-vpn-network.png)


## Phase 1

![Phase 1 Configuration](../assets/ipsec-dedicated-bridged-phase1.png)

## Phase 2

![Phase 2 Configuration](../assets/ipsec-dedicated-bridged-phase2.png)


## Assign Public IP Address
The public address must be [Assigned from the external network](/product-guide/networks/assign-external-ip) to the VPN network.

![Assign Public IP](../assets/ipsec-dedicated-bridged-provide-public.png)

<!-- maybe show the rule that is automatically created on the external to route this ip address to the network, and under the hood fw rule too? -->

## Default VPN Network Rules

The following **default firewall rules** are **created automatically** on VPN Network to allow VPN traffic:

* **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**.
* **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**.
* **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**.
* **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**.

![Review Rules](../assets/ipsec-defaultrules.png)


## Additional VPN Network Rules

The following additional rules need to be created on our new VPN network:

!!! tip "These rules can be modified to restrict to specific source addresses, where appropriate."

**NAT Rule:**
![VPN Nat Rule](../assets/ipsec-dedicated-bridged-vpn-nat-rule.png)

!!! note "The incoming NAT rule must be moved to the top, before the *Accept* Rules."

**Default Route Rule:**
![VPN Default Route Rule](../assets/ipsec-dedicated-bridged-vpn-defroute.png)


## Internal Network Rule

A routing rule is needed on Internal-xyz to route VPN traffic to the VPN network.

![VPN Default Route Rule](../assets/ipsec-dedicated-bridged-internal-route.png)


!!! success "Rules must be applied on each network to put them into effect."





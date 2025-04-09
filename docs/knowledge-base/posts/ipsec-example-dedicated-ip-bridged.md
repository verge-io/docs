---
title: IPsec Configuration Example 1 - Dedicated IP/bridged internal network
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

!!! note "IPsec is a complex framework that supports a vast array of configuration options,  combinations and ways to achieve the same goal, making it impossible to provide precise, one-size-fits-all instructions.  Sample Configurations are given for reference and should be tailored to meet your particular environment and requirements."

!!! info "Consult the [IPSec Product Guide Page](/product-guide/ipsec) for step-by-step general instructions on creating an IPSec tunnel."


The following example utilizes a dedicated public IP address for a VPN tunnel.  The VPN router is bridged to an existing internal network to provide Layer 2-connectivity to that network.

**VPN Network:** *vpn-ipsec*
**VPN Router address:** *192.168.0.254*
**Local VPN network:** *192.168.0.0/24*
**Remote VPN network:** *10.10.0.0/16*
**Bridged Internal Network:** *Internal-xyz*


## Static Lease
The VPN network router address is reserved on  *Internal-xyz* (the network we will bridge to), to avoid another device using this IP address.  
![VPN Static Lease](/product-guide/screenshots/ipsec-dedicated-bridged-staticlease.png)

## VPN Network Configuration
![VPN Network Config](/product-guide/screenshots/ipsec-dedicated-bridged-vpn-network.png)


## Phase 1

![Phase 1 Configuration](/product-guide/screenshots/ipsec-dedicated-bridged-phase1.png)

## Phase 2

![Phase 2 Configuration](/product-guide/screenshots/ipsec-dedicated-bridged-phase2.png)


## Assign Public IP Address
[Assign the External Address](/product-guide/networks/assign-external-ip) to the VPN network.

![Assign Public IP](/product-guide/screenshots/ipsec-dedicated-bridged-provide-public.png)


## VPN Network Rules

**Default Firewall Rules:
These are created automatically on VPN Network to allow VPN traffic

* **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**.
* **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**.
* **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**.
* **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**.

![Review Rules](/product-guide/screenshots/ipsec-6.png)

!!! tip "These rules can be modified to restrict to specific source addresses, where appropriate."

**NAT Rule:**
![VPN Nat Rule](/product-guide/screenshots/ipsec-dedicated-bridged-vpn-nat-rule.png)

!!! note "The incoming NAT rule must be moved to the top, before the *Accept* Rules."

**Default Route Rule:**
![VPN Default Route Rule](/product-guide/screenshots/ipsec-dedicated-bridged-vpn-defroute.png)


!!! success "Rules must be applied to the external, VPN, and internal network to put them into effect."





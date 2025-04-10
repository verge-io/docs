---
title: IPsec Configuration Example - Tenant/NAT
slug: ipsec-example1
description: IPsec Tunnel - Configuration Example - Tenant/Nat Translated Public IP Address
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

# IPSec Example - Tenant/NAT UI Address

!!! note "IPsec is a complex framework that supports a vast array of configuration combinations with many ways to achieve the same goal, making it impossible to provide one-size-fits-all instructions.  Sample configurations are given for reference and should be tailored to meet the particular environment and requirements."

!!! info "Consult the [IPSec Product Guide Page](/product-guide/ipsec) for step-by-step general instructions on creating an IPSec tunnel."

The following configuration enables an IPsec tunnel to a VergeOS tenant. The same public address that is used to access the tenant UI is used for the tunnel, using NAT rules to directing VPN traffic appropriately.    

## Host Configuration
Assigning the UI address to a tenant automatically creates appropriate rules **on the host system** external network and tenant network to route and channel traffic appropriately. No further configuration should be needed on the host. Configuration outlined below is all within the tenant system.


## VPN network Configuration

![VPN Network Configuration](../assets/tenant-ipsec-networkconfig.png)


## Phase 1

![Phase 1 Configuration](../assets/tenant-ipsec-phase1.png)

## Phase 2 

![Phase 2 Configuration](../assets/tenant-ipsec-phase2.png)


## VPN Network Rules
**VPN network created within the tenant system**

**Default Firewall Rules:
These are created automatically on VPN Network to allow VPN traffic

- **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**.
- **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**.
- **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**.
- **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**.

![Review Rules](../assets/ipsec-defaultrules.png)

!!! tip "These rules can be modified to restrict to specific source addresses, where appropriate."

**NAT Rule:**
![VPN Nat Rule](../assets/tenant-ipsec-vpn-rule-translate.png)

!!! tip "The incoming NAT rule must be moved to the top, before the automatically-created *Accept* Rules."

**Default Route Rule:**
![VPN Default Route Rule](../assets/tenant-ipsec-vpn-rule-default-route.png)


**sNAT Rule:**
![VPN Nat Rule](../assets/tenant-ipsec-vpn-rule-outgoing-snat.png)


## External Network Rules

We need the following translate rules on the tenant's external network 

![VPN Nat Rule](../assets/tenant-ipsec-external-udp-rule.png)
![VPN Nat Rule](../assets/tenant-ipsec-external-ESP-rule.png)
![VPN Nat Rule](../assets/tenant-ipsec-external-AH-rule.png)


## Connecting Other Networks to the VPN 
Routing can be configured between the VPN network and other internal networks to provide tunnel access to those networks; see KB article [ How to Configure Routing Between Networks](/knowledge-base/routing-between-internal-vergeio-networks).  

!!! tip "Rules must be applied to each network to put them into effect."







---
title: IPsec Configuration Example 2
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

# IPSec Example 2 - Tenant/NAT UI Address

!!! note "IPsec is a complex framework that supports a vast array of configuration options,  combinations and ways to achieve the same goal, making it impossible to provide precise, one-size-fits-all instructions.  Sample Configurations are given for reference and should be tailored to meet your particular environment and requirements."

!!! info "Consult the [IPSec Product Guide Page](/product-guide/ipsec) for step-by-step general instructions on creating an IPSec tunnel."

The following configuration enables an ipsec tunnel to a VergeOS tenant. NAT Translation rules allow us to use the same UI public IP address of the tenant, directing ipsec traffic to the VPN network.  This example works with the tenant's UI address that is used for accessing the tenant's VergeOS user interface.  

## Host Configuration
Assigning the UI address to a tenant automatically creates appropriate rules **on the host system** external network and tenant network to route and channel traffic appropriately. No further configuration should be needed on the host. Configuration outlined below will all be done within the tenant system.


## VPN network Configuration

![VPN Network Configuration](/product-guide/screenshots/tenant-ipsec-networkconfig.png)


## Phase 1

![Phase 1 Configuration](/product-guide/screenshots/tenant-ipsec-phase1.png)

## Phase 2 

![Phase 2 Configuration](/product-guide/screenshots/tenant-ipsec-phase2.png)


## VPN Network Rules

**Default Firewall Rules:
These are created automatically on VPN Network to allow VPN traffic

- **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**.
- **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**.
- **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**.
- **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**.

![Review Rules](/product-guide/screenshots/ipsec-6.png)

!!! tip "These rules can be modified to restrict to specific source addresses, where appropriate."

**NAT Rule:**
![VPN Nat Rule](/product-guide/screenshots/tenant-ipsec-vpn-rule-translate.png)

!!! tip "The incoming NAT rule must be moved to the top, before the automatically-created *Accept* Rules."

**Default Route Rule:**
![VPN Default Route Rule](/product-guide/screenshots/tenant-ipsec-vpn-rule-default-route.png)


**sNAT Rule:**
![VPN Nat Rule](/product-guide/screenshots/tenant-ipsec-vpn-rule-outgoing-snat.png)


## Connecting Networks to the VPN 
Routing can be configured between the VPN network and other internal networks to provide tunnel access to those networks.  See the KB article [ How to Configure Routing Between Networks](/knowledge-base/routing-between-internal-vergeio-networks).  

!!! tip "Rules must be applied to the external, VPN and internal networks to put them into effect."







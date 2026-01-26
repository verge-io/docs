---
title: Tenant External IP Quick Start Guide
slug: configuring-tenant-external-ips
description: Step-by-step guide to configuring external/public IP addresses for tenant VMs with common scenarios
published: true
date: 2026-01-24
tags:
  - tenant
  - networking
  - external ip
  - public ip
  - NAT
  - firewall
categories:
  - Tenant
  - Network Configuration
editor: markdown
dateCreated: 2026-01-24
---

# Tenant External IP Quick Start Guide

## Overview

This guide covers the most common scenarios for providing external/public IP addresses to VMs running inside VergeOS tenants. Whether you need a single VM accessible from the internet or an entire IP block for a customer, this guide walks through the configuration step by step.

!!! info "Related Documentation"
    For more advanced scenarios including virtual switch ports and detailed NAT configurations, see [How to Use External IPs in Tenants](/knowledge-base/how-to-use-external-ips-in-tenants/).

## Prerequisites

- A VergeOS system with at least one tenant configured
- Available public/external IP addresses on your root External network
- Administrative access to both root and tenant environments

## Scenario 1: Single External IP for One Tenant VM

**Use case:** You have one public IP and want a specific tenant VM to be accessible from the internet (e.g., for RDP, SSH, or web services).

### Step 1: Assign the IP to the Tenant (Root Level)

1. Navigate to **Networks** > **External** (your root external network)
2. Click **IP Addresses** in the left menu
3. Click **New** to add a new IP address
4. Configure:
   - **Type:** Virtual IP
   - **IP Address:** Enter your public IP (e.g., `203.0.113.50`)
   - **Owner Type:** Tenant
   - **Owner:** Select your tenant
5. Click **Submit**
6. Return to the External network dashboard and click **Apply Rules**

### Step 2: Assign the IP to the Tenant Network (Tenant Level)

1. Log into the tenant UI
2. Navigate to **Networks** > **External**
3. Click **IP Addresses** - you should see the IP with description "External IP from service provider"
4. Select the IP and click **Edit**
5. Set:
   - **Owner Type:** Network
   - **Owner:** Select the internal network where your VM is connected
6. Click **Submit**
7. Click **Apply Rules** on the External network

### Step 3: Create NAT Rules for the VM

On the tenant's **internal network** (where your VM is connected):

1. Navigate to **Rules** in the left menu
2. Create a **DNAT rule** (incoming traffic):
   - **Name:** `Inbound to VM`
   - **Action:** Translate
   - **Direction:** Incoming
   - **Destination Type:** My IP Addresses
   - **Destination:** Select the external IP
   - **Target Type:** IP/Custom
   - **Target:** Enter the VM's internal IP (e.g., `10.0.0.50`)
3. Create an **SNAT rule** (outgoing traffic):
   - **Name:** `Outbound from VM`
   - **Action:** Translate
   - **Direction:** Outgoing
   - **Source Type:** IP/Custom
   - **Source:** Enter the VM's internal IP
   - **Target Type:** My IP Addresses
   - **Target:** Select the external IP
   - **Pin:** Top
4. Click **Apply Rules**

### Step 4: Allow Traffic Through Firewall

Still on the tenant's internal network rules:

1. Create an **Accept rule** for your service:
   - **Name:** `Allow RDP` (or your service)
   - **Action:** Accept
   - **Protocol:** TCP
   - **Destination Port:** 3389 (or your service port)
   - **Destination Type:** My IP Addresses
   - **Destination:** Select the external IP
2. Click **Apply Rules**

Your VM should now be accessible from the internet on the specified port.

---

## Scenario 2: IP Block for Multiple Tenant VMs

**Use case:** You have a /29 or larger block of public IPs and want to assign them directly to VMs.

### Step 1: Create a Network Block (Root Level)

1. Navigate to **Networks** > **External**
2. Click **Network Blocks** in the left menu
3. Click **New**
4. Configure:
   - **Network Block:** Enter your CIDR block (e.g., `203.0.113.48/29`)
   - **Owner Type:** Tenant
   - **Owner:** Select your tenant
5. Click **Submit**
6. Click **Apply Rules**
7. Navigate to **Tenant Networks**, filter by "Needs FW Apply: Yes"
8. Select your tenant's network and click **Apply Rules**

### Step 2: Create a Network from the Block (Tenant Level)

1. Log into the tenant UI
2. Navigate to **Networks** > **External**
3. Click **Network Blocks** - you should see your block
4. Select the block and click **New Network**
5. The network settings are pre-configured with:
   - **Address Type:** Static (with your block's addressing)
   - **DHCP:** Enabled with available IPs
6. Give the network a **Name** (e.g., `Public-Network`)
7. Click **Submit**
8. Click **Power On** to start the network

### Step 3: Connect VMs

1. Edit your VM and add a NIC connected to the new public network
2. The VM can either:
   - Use DHCP to receive an IP automatically
   - Be configured with a static IP from the block

!!! tip "Firewall Considerations"
    VMs on the public network are directly exposed. Configure firewall rules on the network or within the guest OS to restrict access.

---

## Scenario 3: External Access Without Public IP on VM

**Use case:** You want internet users to reach a tenant VM, but the VM should keep its private IP.

This is the same as Scenario 1 but uses only the DNAT/SNAT rules. The VM keeps its internal IP while the NAT rules translate traffic.

**Advantages:**
- VM doesn't need to know about the public IP
- Simpler VM configuration
- Can change public IPs without reconfiguring VMs

---

## Troubleshooting

### VM Not Accessible from Internet

1. **Check rule application:** Ensure "Apply Rules" was clicked on all affected networks
2. **Verify IP ownership chain:** Root External → Tenant External → Tenant Internal Network
3. **Check NAT rules:** Both DNAT (inbound) and SNAT (outbound) are required
4. **Test internally first:** Can you reach the VM from within the tenant?
5. **Review firewall rules:** Is traffic being blocked before reaching NAT?

### VM Can't Reach Internet

1. **Check SNAT rule:** Ensure outbound translation is configured
2. **Verify default route:** The tenant's external network needs proper routing
3. **Check DNS:** Verify DNS is configured on the VM or DHCP is providing it

### Ping Works But Services Don't

1. **Check port-specific rules:** Accept rules are needed for each service port
2. **Verify service is running:** Check the service is listening on the VM
3. **Check guest firewall:** Windows Firewall or iptables may be blocking

---

## Quick Reference

| Task | Location | Action |
|------|----------|--------|
| Assign IP to tenant | Root External > IP Addresses | Set Owner Type: Tenant |
| Assign IP to network | Tenant External > IP Addresses | Set Owner Type: Network |
| Create DNAT rule | Tenant Internal > Rules | Action: Translate, Direction: Incoming |
| Create SNAT rule | Tenant Internal > Rules | Action: Translate, Direction: Outgoing |
| Allow traffic | Tenant Internal > Rules | Action: Accept, specify port |


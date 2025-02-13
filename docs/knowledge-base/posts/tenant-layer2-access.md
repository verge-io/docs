---
title: Provide Layer 2 VLAN External Access to a Tenant
slug: provide-layer2-to-tenant
description: Instructions for using virtual wires to provide Vlanned layer 2 network access to a tenant
draft: false
date: 2025-02-10T21:42:46.809Z
tags:
  - vlan
  - virtual wire
  - network
  - tenant
categories:
  - Network Configuration
  - Tenant
  - Network
editor: markdown
dateCreated: 2025-02-10T19:58:59.133Z

---
!!! info "Key Points"
    - These instructions pertain to environments with specific requirements for tenant layer 2 connectivity (e.g. utilizing existing non-virtualized network infrastructure or tenant customers with direct MPLS lines, etc.)
    - *Virtual Wires* (virtual network uplinks) are used.  

## High-Level Steps

1. **Prepare the physical network:** verify VLANs are configured on the appropriate physical switch ports so that they are accessible within the VergeOS environment.
!!! warning
    VLANs 1 & 100-102 cannot be used in a virtual wire capacity. These VLANs are reserved for internal traffic. These IDs can, however, be remapped to other VLAN IDs for tenant consumption.

2. **Create the Virtual Wire** Determine whether the tenant will need access to a single VLAN or multiple VLANs. **This will determine the virtual wire configuration**:
    * To pass a single VLAN, use the [Creating a 1:1 Virtual Wire](#creating-a-11-virtual-wire) instructions for each VLAN.
    * If the tenant requires access to more than 1 or 2 VLANs, it is typically best to use the [Creating a Trunk Mode Virtual Wire](#creating-a-trunk-mode-virtual-wire) directions.
!!! info "Virtual Wire Host Placement"
    When using a virtual wire, both networks participating in that virtual wire **must be on the same host**. Failure to meet this requirement can lead to network connectivity issues.

3. [Add VLANs Inside the Tenant](#add-vlans-inside-the-tenant)

## Creating a 1:1 Virtual Wire

1. Ensure the VLAN(s) have been configured in the VergeOS UI. If not, follow the steps to create VLAN(s) [here](/product-guide/networks/create-vlan).
2. From the Main Dashboard, select **Networks** in the left menu to open the Networks Dashboard.
3. Select **Virtual Wires** in the left menu to view all virtual wires in the environment.
4. Select **New** to create the **first half of the virtual wire:**
    * **Name**: a descriptive name, e.g. VLAN from host, etc.
    * **Network**: the external network with the corresponding VLAN to pass to the tenant
    * **Destination Wire**: field should display ***--Empty List--*** or select ***--None--***
    * **PVID**: 1.  
**Example Configuration:**
![virtual-wire-create-settings.png](/product-guide/screenshots/virtual-wire-create-settings.png)

1. **Submit** your changes and return to the virtual wires list view.
2. Select **New** to create **the second half of the virtual wire:**
    * **Name**: a name to identify the wire such as vlan id, tenant, purpose, etc
    * **Network**: the tenant network, typically named `tenant_'$TENANTNAME'`.
    * **Destination Wire**: the other half of the virtual wire created above.
    * **PVID**: VLAN ID of the network being attached.  
**Example Configuration:**
![virtual-wire-create-settings-tenant.png](/product-guide/screenshots/virtual-wire-create-settings-tenant.png)

1. **Submit** your changes.
2. Navigate to the **Networks Dashboard**, select Networks, and **Apply Rules** for both networks connected by the virtual wires.

## Creating a Trunk Mode Virtual Wire

!!! warning
    To use trunk mode virtual wires, the corresponding physical network (tied to node NICs) **must** be set to Bridge mode.

### Set the Physical Network to Bridge Mode

1. Navigate to **Networks** in the left menu to access the Networks Dashboard.
2. Select **Networks** again to view all networks in the environment.
3. Double-click the **Physical Network** (NIC) that the VLANs are trunked to on the physical switch.
!!! tip
       A *Physical Network* typically has "Switch" appended to the name and represents a physical NIC on a node.
4. Select **Edit** to enter the network configuration page.
5. In the configuration page, enable **Physical Bridged** to activate Bridge Mode. It is best to set the **On Power Loss** setting to ***Power On*** so that the network starts up automatically after a system power loss.
6. **Submit** your changes.
7. **Reboot** the necessary nodes for Bridge Mode to become active.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/system/maintenance-mode) procedures when rebooting a node to avoid workload disruptions."

### Configuring a Trunk Mode Virtual Wire

1. **Ensure the *physical network* is set to Bridged Mode and is powered on.**
2. From the Main Dashboard, navigate to **Networks** > **Virtual Wires**.
3. Select **New** to create the **first half of the virtual wire.**
    * **Name**: identify the wire e.g. "trunk from host"
    * **Network**: physical network with the corresponding VLAN to pass to the tenant.
    * **Destination Wire**: should display ***--Empty List--*** or select ***--None--***
    * **PVID**: 0
    * **Allowed VLAN List**: comma-delimited and with ranges as necessary  
**Example Configuration:**
![vw-trunk-host.png](/product-guide/screenshots/vw-trunk-host.png)

1. **Submit** your configuration.
2. Select **New** to create the **second half of the virtual wire**.
    * **Network** dropdown, select the tenant network that the VLAN will be passed to, typically named `tenant_'$TENANTNAME'`.
    * **PVID**: 0
    * **Allowed VLAN List**: comma-delimited and with ranges as necessary
**Example Configuration:**
![vw-trunk-tenant.png](/product-guide/screenshots/vw-trunk-tenant.png)

1. **Submit** your changes.
2. Navigate to the **Networks Dashboard**, select Networks, and **Apply Rules** for both networks connected by the virtual wires.

## Add VLANs Inside the Tenant

1. Navigate to the **tenant UI** and log in.
2. From the Main Dashboard, navigate to **Networks**, then select **New External**.
3. Configure settings:
    * **Name**: a label to identify the network (name, vlan ids, purpose, etc.)
    * **Layer 2 Type:** *VLAN*
    * **Layer 2 ID:** VLAN ID
    * **Interface Network:** *Physical*
    * **IP Address Type:** *None*  
**Example Configuration:**
![virtual-wire-network-in-tenant.png](/product-guide/screenshots/virtual-wire-network-in-tenant.png)

!!! info "Leave other fields at default settings unless specific configuration needed. For information about additional external network options, see: [How to Create an External Network](/knowledge-base/create-external-network)"

4. **Submit** your configuration.
5. Attach workloads to the network for Layer 2 access to networks outside VergeOS.

## Troubleshooting Steps

### Traffic is not reaching the virtual machine

* Confirm firewall rules related to the virtual wire have been applied.
* Verify the destination tenant network and VLAN network are in the "Running" state and reside on the same physical node.
* Ensure VLANs are trunked to the correct physical node ports.

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

---
title: Provide Layer 2 Access to a Tenant - LEGACY
slug: provide-layer2-to-tenant
description: Instructions for using Virtual Switch Ports to provide Vlanned layer 2 network access to a tenant
draft: false
status: deprecated
date: 2025-02-10T21:42:46.809Z
tags:
  - vlan
  - Virtual Switch Port
  - network
  - tenant
categories:
  - Network Configuration
  - Tenant
  - Network
editor: markdown
dateCreated: 2025-02-10T19:58:59.133Z

---

!!! tip "Newer Configuration Method"
    VergeOS 26.0 and later, consider using [Tenant Layer 2 Networks](/product-guide/tenants/layer-2-networks) for a simpler, more streamlined approach to providing Layer 2 access to tenants. This method automatically creates the necessary networks within the tenant environment.

!!! note "Terminology Update"
    Virtual Switch Ports were previously called "Virtual Wires" in earlier versions of VergeOS documentation. The functionality remains the same - only the terminology has been updated for clarity.

## High-Level Steps

1. **Prepare the physical network:** verify VLANs are configured on the appropriate physical switch ports so that they are accessible within the VergeOS environment.
!!! warning
    VLANs 1 & 100-102 cannot be used in a Virtual Switch Port capacity. These VLANs are reserved for internal traffic. These IDs can, however, be remapped to other VLAN IDs for tenant consumption.

2. **Create the Virtual Switch Port** Determine whether the tenant will need access to a single VLAN or multiple VLANs. **This will determine the Virtual Switch Port configuration**:
    * To pass a single VLAN, use the [Creating a 1:1 Virtual Switch Port](#creating-a-11-virtual-wire) instructions for each VLAN.
    * If the tenant requires access to more than 1 or 2 VLANs, it is typically best to use the [Creating a Trunk Mode Virtual Switch Port](#creating-a-trunk-mode-virtual-wire) directions.
!!! info "Virtual Switch Port Host Placement"
    When using a Virtual Switch Port, both networks participating in that Virtual Switch Port **must be on the same host**. Failure to meet this requirement can lead to network connectivity issues.

3. [Add VLANs Inside the Tenant](#add-vlans-inside-the-tenant)

## Creating a 1:1 Virtual Switch Port

1. Ensure the VLAN(s) have been configured in the VergeOS UI. If not, follow the steps to create VLAN(s) [here](/product-guide/networks/create-vlan).
2. Select **Networks** and then **Dashboard** from the top menu to open the Networks Dashboard.
3. Select **Virtual Switch Ports** in the left menu to view all Virtual Switch Ports in the environment.
4. Select **New** to create the **first half of the Virtual Switch Port:**
    * **Name**: a descriptive name, e.g., VLAN from host, etc.
    * **Network**: the external network with the corresponding VLAN to pass to the tenant
    * **Destination Wire**: field should display ***--Empty List--*** or select ***--None--***
    * **PVID**: 1.  
**Example Configuration:**

5. **Submit** your changes and return to the Virtual Switch Ports list view.
6. Select **New** to create **the second half of the Virtual Switch Port:**
    * **Name**: a name to identify the wire such as vlan id, tenant, purpose, etc
    * **Network**: the tenant network, typically named `tenant_'$TENANTNAME'`.
    * **Destination Wire**: the other half of the Virtual Switch Port created above.
    * **PVID**: VLAN ID of the network being attached.  
**Example Configuration:**

7. **Submit** your changes.
8. Navigate to the **Networks Dashboard**, select Networks, and **Apply Rules** for both networks connected by the Virtual Switch Ports.

## Creating a Trunk Mode Virtual Switch Port

!!! info "Bridge Mode Required"
    To use trunk mode Virtual Switch Ports, the corresponding physical network (tied to node NICs) **must** be set to Bridge mode.

### Set the Physical Network to Bridge Mode

1. Navigate to **Networks** in the left menu to access the Networks Dashboard.
2. Select **Networks** again to view all networks in the environment.
3. Double-click the **Physical Network** (NIC) that the VLANs are trunked to on the physical switch.
!!! tip
       A physical Network typically has "Switch" appended to the name and represents a physical NIC on a node.
4. Select **Edit** to enter the network configuration page.
5. In the configuration page, enable **Physical Bridged** to activate Bridge Mode. It is best to set the **On Power Loss** setting to ***Power On*** so that the network starts up automatically after a system power loss.
6. **Submit** your changes.
7. **Reboot** the necessary nodes for Bridge Mode to become active.
!!! warning "Follow proper [**Maintenance Mode**](/product-guide/operations/maintenance-mode) procedures when rebooting a node to avoid workload disruptions."

### Configuring a Trunk Mode Virtual Switch Port

1. **Ensure the *physical network* is set to Bridged Mode and is powered on.**
2. Navigate to **Networks** > **Virtual Switch Ports**.
3. Select **New** to create the **first half of the Virtual Switch Port.**
    * **Name**: identify the wire, e.g., "trunk from host"
    * **Network**: physical network with the corresponding VLAN to pass to the tenant.
    * **Destination Wire**: should display ***--Empty List--*** or select ***--None--***
    * **PVID**: 0
    * **Allowed VLAN List**: comma-delimited and with ranges as necessary  
**Example Configuration:**

4. **Submit** your configuration.
5. Select **New** to create the **second half of the Virtual Switch Port**.
    * **Network** dropdown, select the tenant network that the VLAN will be passed to, typically named `tenant_'$TENANTNAME'`.
    * **PVID**: 0
    * **Allowed VLAN List**: comma-delimited and with ranges as necessary  
**Example Configuration:**

6. **Submit** your changes.
7. Navigate to the **Networks Dashboard**, select Networks, and **Apply Rules** for both networks connected by the Virtual Switch Ports.

## Add VLANs Inside the Tenant

1. Navigate to the **tenant UI** and log in.
2. Select **Networks** > **New External** from the top menu.
3. Configure settings:
    * **Name**: a label to identify the network (name, vlan ids, purpose, etc.)
    * **Layer 2 Type:** *VLAN*
    * **Layer 2 ID:** VLAN ID
    * **Interface Network:** *Physical*
    * **IP Address Type:** *None*  
**Example Configuration:**
!!! info "Leave other fields at default settings unless specific configuration needed. For information about additional external network options, see: [How to Create an External Network](/knowledge-base/create-external-network)"

4. **Submit** your configuration.
5. Attach workloads to the network for Layer 2 access to networks outside VergeOS.

## Troubleshooting Steps

### Traffic is not reaching the virtual machine

* Confirm firewall rules related to the Virtual Switch Port have been applied.
* Verify the destination tenant network and VLAN network are in the "Running" state and reside on the same physical node.
* Ensure VLANs are trunked to the correct physical node ports.

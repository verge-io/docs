---
title: Virtual Wire Setup and Use
slug: virtual-wire-setup-and-use
description: Virtual Wire How To
draft: false
date: 2024-03-15T21:42:46.809Z
tags:
  - vlan
  - virtual wire
  - network
  - tenant
categories:
  - Maintenance
  - Tenant
  - Network Rules
editor: markdown
dateCreated: 2022-06-29T19:58:59.133Z
---

# Virtual Wire Setup and Use

A virtual wire provides a tenant the ability to access a VLAN outside the VergeOS environment without going through routing steps.

## Prerequisite Steps

1. Add the desired VLAN(s) to the appropriate switch ports so they are accessible to the nodes running the VergeOS environment.
2. Determine whether the tenant will need access to a single VLAN or multiple VLANs. **This will determine the virtual wire configuration**.

!!! warning
    VLANs 1 & 100-102 cannot be used in a virtual wire capacity. These VLANs are reserved for internal traffic. They can, however, be remapped to another VLAN for tenant consumption.

!!! info
    If a tenant requires access to more than 1 or 2 VLANs, it is recommended to configure the virtual wire in [Trunk Mode](#creating-a-trunk-mode-virtual-wire).

## Creating a 1:1 Virtual Wire

1. Ensure the VLAN(s) have been created in the VergeOS UI. If not, follow the steps to create VLAN(s) [here](/knowledge-base/adding-a-vlan).
2. From the Main Dashboard, select **Networks** in the left menu to open the Networks Dashboard.
3. Select **Virtual Wires** in the left menu to view all virtual wires in the environment.
4. Select **New** to create a new virtual wire.
5. Enter the following settings:
   ![virtual-wire-create-settings.png](/product-guide/screenshots/virtual-wire-create-settings.png)

!!! info
    - The **Network** dropdown will list all networks inside the environment. Choose the network with the corresponding VLAN to pass into the tenant.
    - The **Destination Wire** dropdown will automatically select **Empty List** if no unconnected virtual wires are detected.
    - Leave the PVID field set to **1**.
6. Submit your changes and return to the virtual wires list view.
7. Select **New** to create the second half of the virtual wire.
8. Enter the following settings:
   ![virtual-wire-create-settings-tenant.png](/product-guide/screenshots/virtual-wire-create-settings-tenant.png)
!!! info
    - In the **Network** dropdown, select the tenant network that the VLAN will be passed to, typically named `tenant_'$TENANTNAME'`.
    - The **Destination Wire** dropdown will automatically select the other half of the virtual wire created earlier.
    - Change the PVID field to the actual VLAN ID of the network being attached.
    - 
9. Submit your changes.
10.  Navigate to the **Networks Dashboard**, select **Networks**, and apply the rules for the networks connected by the virtual wires.

## Creating a Trunk Mode Virtual Wire

!!! warning
    To use Trunk Mode Virtual Wires, the corresponding "Physical Network" (tied to node NICs) **must** be set to bridge mode.

!!! warning
    If the external network is in a VLAN and the physical NIC that the external network references is in bridge mode, trunking a virtual wire from the bridge **will not** work.

### Setting a Physical Network to Bridge Mode

1. Navigate to **Networks** in the left menu to access the Networks Dashboard.
2. Select **Networks** again to view all networks in the environment.
3. Double-click the **Physical Network** (NIC) that the VLANs are trunked to on the physical switch.
   !!! info
       A "Physical Network" typically has "Switch" appended and represents a physical NIC on a node.
4. Select **Edit** to enter the network configuration page.
5. In the configuration page, enable **Physical Bridged** to activate Bridge Mode.
!!! info "The "On Power Loss" setting can remain as **Last State** or **Power On**."
1. Submit your changes.
2. Reboot the necessary nodes for Bridge Mode to become active.

### Configuring a Trunk Mode Virtual Wire

1. Ensure the "Physical Network" is set to Bridged Mode and is powered on.
2. From the Main Dashboard, select **Networks** and then **Virtual Wires**.
3. Select **New** to create the first half of the virtual wire.
4. Enter the following settings:
   ![vw-trunk-host.png](/product-guide/screenshots/vw-trunk-host.png)

!!! info
    - Select the corresponding **Physical Network** in the **Network** dropdown.
    - Set the PVID field to **0**.
    - Enter the allowed VLANs in the **Allowed VLAN List**, comma-delimited and with ranges as necessary.

5. Submit your configuration.
6. Select **New** to create the second half of the virtual wire.
7. Enter the following settings:
   ![vw-trunk-tenant.png](/product-guide/screenshots/vw-trunk-tenant.png)
   
!!! info
    - Select the tenant network in the **Network** dropdown.
    - Set the PVID field to **0**.
    - Enter the allowed VLANs in the **Allowed VLAN List**.
  
1. Submit your changes.
2. Apply the rules for the connected networks as described above.

## Adding VLANs Inside the Tenant

1. Navigate to the **tenant UI** and log in.
2. From the Main Dashboard, navigate to **Networks**, then select **New External**.
3. Enter the following settings:
   ![virtual-wire-network-in-tenant.png](/product-guide/screenshots/virtual-wire-network-in-tenant.png)
   
!!! info "For the interface network, select **Physical**."

4. Submit your configuration.
5. Attach workloads to the network for Layer 2 access to networks outside of Verge.io.

## Troubleshooting Steps

### Traffic is not reaching the virtual machine
- Confirm firewall rules related to the virtual wire have been applied.
- Verify the destination tenant network and VLAN network are in the "Running" state and reside on the same physical node.
- Ensure VLANs are trunked to the correct physical node ports.

---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

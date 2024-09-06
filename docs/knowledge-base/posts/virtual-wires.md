---
title: Virtual Wire Setup and Use
slug: virtual-wire-setup-and-use
description: Virtual Wire How To
draft: false
date: 2024-03-15T21:42:46.809Z
tags: vlan, virtual wire, network, tenant
categories:
  - Maintenance
  - Tenant
  - Network Rules
editor: markdown
dateCreated: 2022-06-29T19:58:59.133Z
---

A virtual wire is the process of providing a tenant the ability to gain access to a VLAN outside of the VergeOS environment without having to go through routing steps.

## Prerequisite Steps
1. Add the desired VLAN(s) to the appropriate switchports so they are accessible to the nodes running the VergeOS environment.
1. Determine whether or not the tenant will need access to a single VLAN or multiple. **This will determine the manner in which the virtual wire is configured**.
> VLANS 1 & 100-102 cannot be used in a virtual wire capacity. These VLANS are reserved for internal traffic that allows the tenant nodes to communicate with each other and with the tenant network hosted above it. They can however be remapped to another VLAN to be consumed in the tenant.
{.is-warning}

> If a tenant requires access to more than 1 or 2 VLANS, it is recommended to configure the virtual wire in [Trunk Mode](#creating-a-trunk-mode-virtual-wire).
{.is-info}

## Creating a 1:1 Virtual Wire
1. Ensure the VLAN(s) have been created in the VergeOS UI. If they have not, follow the steps to create VLAN(s) [here](/docs/knowledge-base/adding-a-vlan).
1. From the Main Dashboard select "Networks" in the left menu and you will be brought to the "Networks Dashboard".
1. Select "Virtual Wires" in the left menu and you will be brought to the list view of all virtual wires in the environment.
1. Select "New" and you will be brought to the virtual wire creation page.
1. Enter the following settings:
![virtual-wire-create-settings.png](/docs/public/virtual-wire-create-settings.png)
> **NOTE:** The "Network" dropdown will list all networks inside of the environment. Choose the network with the corresponding VLAN to be passed into the tenant.<br>
The "Destination Wire" dropdown will automatically select "Empty List" if there are no unconnected virtual wires detected.<br>
Leave the PVID field set to **_1_**!
{.is-info}
6. Submit your changes and you will be brought back to the virtual wires list view.
1. Select "New" and you will be brought to the virtual wire creation page.
1. Enter the following settings:
![virtual-wire-create-settings-tenant.png](/docs/public/virtual-wire-create-settings-tenant.png)
> **NOTE:** In the "Network" dropdown select the tenant network that the VLAN will be passed to. This should be named "tenant_'$TENANTNAME'".<br>
The "Destination Wire" dropdown will automatically select the other half of the virtual wire created earlier _if it is the only free one available_. If it does not select the appropriate wire.<br>
Change the PVID field to the actual VLAN ID of the network that it is being attached to.
{.is-info}
9. Submit your changes and you will be brought back to the virtual wires list view.
1. Navigate to the Networks Dashboard and select "Networks" on the left menu. You will be brought to a list view of all networks inside of the environment.
1. The networks that the created virtual wires were attached to will be highlighted indicating that rules need to be applied.
1. Select both networks, then select "Apply Rules" in the left menu. This will create rules hidden from the UI in both networks that connect the virtual wires together.
1. If all of the rules applied successfully proceed to the [adding vlans to the tenant](#adding-vlans-inside-of-the-tenant) section.
## Creating a Trunk Mode Virtual Wire
> To use Trunk Mode Virtual Wires the corresponding "Physical Network", which ties to node nic(s), **must** be set to bridge mode.
{.is-warning}

>If the external network is in a VLAN and the physical NIC that the external network references is in bridge mode then trunking a virtual wire from the bridge **_will not_** work.
{.is-warning}
#### Setting a Physical Network to Bridge Mode
1. Navigate to the main dashboard and select "Networks" in the left menu. You will be brought to the Networks Dashboard.
1. Select "Networks" again in the left menu and you will be brought to a list view of all networks in the environment.
1. Double click into the "Physical Network"/NIC(s) that the VLAN(s) are trunked to on the physical switch to enter that individual networks dashboard.
> A "Physical Network" typically has "Switch" appended to the end and is a representation of a physical nic on a node.
{.is-info}
4. Select "Edit" in the left menu to enter configuration page for the network.
1. In the configuration page enter the following settings:
![network-bridge-mode.png](/docs/public/network-bridge-mode.png)
> Select the "Physical Bridged" checkbox to enable Bridge Mode.<br>
You may leave this networks "On Power Loss" setting to either "Last State" or "Power On". In either event the network must be turned on to make use of virtual wires.<br>
In most cases all other settings can stay with their default values.
{.is-info}
6. Submit your changes
> In order for Bridge Mode to be active any nodes where the physical network can run must be rebooted!!
{.is-warning}
7. Reboot any necessary nodes and move on to the next section.
### Configuring a Trunk Mode Virtual Wire
1. Ensure the "Physical Network" is set to "Bridged Mode" and it is in a Powered On status.
1. From the Main Dashboard select "Networks" in the left menu and you will be brought to the "Networks Dashboard".
1. Select "Virtual Wires" in the left menu and you will be brought to the list view of all virtual wires in the environment.
1. Select "New" and you will be brought to the virtual wire creation page.
1. Enter the following settings:
![vw-trunk-host.png](/docs/public/vw-trunk-host.png)
> The "Network" dropdown will list all networks inside of the environment. Choose the corresponding "Physical Network" that the VLANS are trunked to.<br>
The "Destination Wire" dropdown will automatically select "Empty List" if there are no unconnected virtual wires detected. If it does not select "Empty List" change it "None".<br>
Change the PVID field to **_0_**!<br>
Enter the VLANS to be passed into the tenant in the "Allowed VLAN List". This list is comma delimited and accepts ranges.
{.is-info}
6. Submit your configuration.
1. Select "New" and you will be brought to the virtual wire creation page.
1. Enter the following settings:
![vw-trunk-tenant.png](/docs/public/vw-trunk-tenant.png)
> In the "Network" dropdown select the tenant network that the VLAN will be passed to. This should be named "tenant_'$TENANTNAME'".<br>
The "Destination Wire" dropdown will automatically select the other half of the virtual wire created earlier _if it is the only free one available_. If it does not select the appropriate wire.<br>
Change the PVID field to **_0_**!<br>
Enter the VLANS to be passed into the tenant in the "Allowed VLAN List". This list is comma delimited and accepts ranges.
{.is-info}
9. Submit your changes and you will be brought back to the virtual wires list view.
1. Navigate to the Networks Dashboard and select "Networks" on the left menu. You will be brought to a list view of all networks inside of the environment.
1. The networks that the created virtual wires were attached to will be highlighted indicating that rules need to be applied.
1. Select both networks, then select "Apply Rules" in the left menu. This will create rules hidden from the UI in both networks that connect the virtual wires together.
1. If all of the rules applied successfully proceed to the [next](#adding-vlans-inside-of-the-tenant) section.

## Adding VLANS Inside of the Tenant
1. Navigate to the **tenant UI** that the vlan is to be passed into and login.
1. From the Main Dashboard navigate to Networks, then select "New External" in the left menu.
1. In the network creation page enter the following settings:
![virtual-wire-network-in-tenant.png](/docs/public/virtual-wire-network-in-tenant.png)
> For the interface network it is **IMPORTANT** to select **"Physical"**. This represents a physical network interface given to a tenant node.<br>
You may leave this networks "On Power Loss" setting to "leave off" as it is not necessary for this one to be running unless you are passing the VLAN into a sub tenant. In which case you will follow the appropriate set of instructions from the start.
{.is-info}
4. Submit your configuration and you will be brought back to the newly created vnets dashboard.
5. You can now attach workloads to the network for Layer 2 access to networks outside of Verge.io.

## Troubleshooting Steps
<br>

#### Traffic is not making it to the virtual machine
- Confirm firewall rules related to the virtual wire have been applied
- Confirm that the destination tenant network and the vlan network are in the "Running" state and reside on the same physical node
- Confirm the VLAN(s) are trunked to the correct ports on the physical nodes

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

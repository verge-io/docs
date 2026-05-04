---
title: Configuring VMware Service VM NIC IPv4 Settings
slug: knowledge-base/vmware-service-vm-nic-ipv4-configuration
description: How to configure static IPv4 settings for VMware service VM NICs in VergeOS, including IP address, DNS, and routing.
date: 2026-03-13
---

## Overview

:::note[Key Points]
- VMware service VMs have a unique NIC configuration panel not found on standard VM NICs
- The IPv4 panel allows static IP assignment with DNS, search domains, and custom routes
- All address fields use CIDR notation for IP addresses and plain IPs for gateways and DNS servers
:::

VMware service VMs in VergeOS use a specialized NIC type (**VMware Backup**) that includes an IPv4 configuration panel for assigning static network settings. This article covers each field in the NIC settings and IPv4 configuration panels, along with an example for setting up a default gateway route.

## Prerequisites

- A VMware service already created and accessible in VergeOS (see [VMware Backup/DR Guide](/knowledge-base/vmwarebackupdrguide/) for setup instructions)
- A VergeOS network available for the service VM to connect to
- The static IP address, subnet, gateway, and DNS information for your environment

## Navigating to the NIC Settings

1. Navigate to **Import/Export** > **VMware Services** from the main menu.
2. **Double-click** the target VMware service to open its dashboard.
3. Click **View Service** on the left menu to open the service VM dashboard.
4. Click **NICs** on the left menu.
5. **Click** the NIC you want to configure and select **Edit** from the left menu.

## NIC Settings (Left Panel)

The left panel contains the general NIC configuration fields:

| Field | Description |
|-------|-------------|
| **Enabled** | Toggle to enable or disable this NIC. |
| **Name** | Interface name as it appears in the VM (e.g., `eth0`). |
| **Order ID** | Boot order for this NIC. `0` loads first. |
| **Network** | VergeOS network to attach this NIC to. |
| **MAC Address** | Automatically assigned. Can be changed if a specific MAC is needed. |
| **Description** | Optional field for notes or identifying information. |

## IPv4 Configuration (Right Panel)

The right panel provides static IPv4 configuration. Set the **Type** dropdown to **Static** to reveal the address fields.

### IP Address

| Field | Format | Example |
|-------|--------|---------|
| **IP Address** | CIDR notation | `192.168.1.10/24` |

:::tip[CIDR Notation]
Always include the subnet prefix length after the IP address. For example, `/24` corresponds to a `255.255.255.0` subnet mask.
:::

### DNS Servers

| Field | Format | Example |
|-------|--------|---------|
| **Address** | Plain IP address | `192.168.1.53` |

Use the **+** button to add entries. Each section also provides up/down arrows to reorder entries, a trash icon to delete, and a pencil icon to edit.

### Search Domains

| Field | Format | Example |
|-------|--------|---------|
| **Domain** | DNS domain name | `company.local` |

Use the **+** button to add entries. Each section also provides up/down arrows to reorder entries, a trash icon to delete, and a pencil icon to edit.

### Routes

| Field | Format | Example |
|-------|--------|---------|
| **Address** (required) | Network in CIDR notation | `0.0.0.0/0` |
| **Gateway** (required) | Plain IP address (next hop) | `192.168.1.1` |
| **Metric** | Integer (lower = higher priority) | `100` |

Use the **+** button to add entries. Each section also provides up/down arrows to reorder entries, a trash icon to delete, and a pencil icon to edit.

:::note[Route Address Field]
Use `0.0.0.0/0` as the address for a default gateway route. For specific subnet routes, enter the destination network in CIDR notation (e.g., `10.0.0.0/8`).
:::

## Example: Default Gateway Configuration

To configure a standard default gateway route for a VMware service VM NIC:

1. Set **Type** to **Static**.
2. Enter the **IP Address** in CIDR notation (e.g., `192.168.1.10/24`).
3. Under **DNS Servers**, click **+** and enter the DNS server address (e.g., `192.168.1.53`).
4. Under **Routes**, click **+** and enter the following:

    | Field | Value |
    |-------|-------|
    | **Address** | `0.0.0.0/0` |
    | **Gateway** | `192.168.1.1` |
    | **Metric** | `100` |

5. Click **Submit** to save the configuration.

## Troubleshooting

:::caution[Common Issues]
- **Service cannot reach external networks**: Verify that a default gateway route (`0.0.0.0/0`) is configured and that the gateway IP is correct for the selected VergeOS network.
- **DNS resolution not working**: Confirm that the DNS server address is reachable from the selected network and entered as a plain IP (not CIDR notation).
- **IP Address rejected**: Ensure the IP address includes the CIDR prefix length (e.g., `192.168.1.10/24`, not `192.168.1.10`).
:::

## Additional Resources

- [VMware Backup/DR Guide](/knowledge-base/vmwarebackupdrguide/)
- [Virtual Machine NICs](/product-guide/virtual-machines/vm-nics/)

## Feedback

:::note[Need Help?]
If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).
:::

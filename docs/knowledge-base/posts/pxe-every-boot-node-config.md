---
title: Configuring a Node for Diskless PXE Boot (PXE every-boot)
slug: pxe-every-boot-node-config
description: How to configure a registered VergeOS compute node to network-boot from the cluster on every startup — for nodes with no local storage or no bootable storage devices.
author: VergeOS Documentation Team
draft: false
date: 2026-05-12
semantic_keywords:
  - "pxe every boot diskless compute node vergeos"
  - "network boot vergeos node no local storage"
  - "configure node to pxe boot every reboot"
  - "diskless compute node maintenance network pxe"
use_cases:
  - pxe_every_boot_node_configuration
  - diskless_compute_node_deployment
  - non_bootable_storage_node_setup
tags:
  - pxe
  - nodes
  - networking
  - installation
  - diskless
categories:
  - Installation
  - Network
editor: markdown
dateCreated: 2026-05-12
---

# Configuring a Node for PXE Every-Boot

## Overview

!!! info "Key Points"
    - PXE every-boot lets a registered VergeOS compute node load the running OS from the cluster on every startup, with no local boot media
    - Intended for nodes that have no local storage, or only non-bootable storage devices
    - Requires a PXE-capable physical network with no competing DHCP servers
    - This guide covers nodes that are installed to PXE-boot on **every reboot**. It does **not** cover one-time PXE installs (where PXE only replaces the USB installer and the node boots from local disk afterward), or PXE networks for tenant workloads.

VergeOS supports PXE booting for host nodes, allowing you to deploy nodes that network-boot from the cluster every time they start. This guide covers configuration of a PXE network and  registered VergeOS host node to use PXE diskless boot.

!!! note "When PXE every-boot applies (dedicated boot drive not needed)"
 
    VergeOS does **not** require a separate drive for the operating system. By default, the installer places a small boot partition on each storage drive — including drives that will participate in the vSAN. The VergeOS system is small, so the impact on vSAN capacity is negligible. PXE every-boot only makes sense when the node either has **no storage at all** or all installed storage devices are **non-bootable**. If the node has any bootable disk, install as a standard (non-pxe) node instead.   


## Configuration Summary

Configuring a node for PXE every-boot involves:

1. **Physical network configuration** — establish an accessible physical network in VergeOS (often already configured during initial controller node installation.)
2. **Node NIC assignment** — connect the node's PXE NIC to the physical network
3. **Create an external network** configure a VergeOS vNet (external network) to serve PXE.
4. **BIOS / UEFI / boot policy** — configure the node to boot from the PXE NIC
5. **Install the node** — boot the VergeOS ISO and select the PXE node install option

Detailed PXE network prerequisites and configuration information is available at [PXE Implementation Guide](/implementation-guide/pxe-boot).


## Network Setup

### Physical Network Requirements

The physical network used for PXE must meet a few requirements:

- **No competing DHCP servers.** VergeOS runs its own DHCP service on the PXE network. Any other DHCP server reachable on the same Layer 2 segment will race with VergeOS, and whichever responds first wins. If a competing server wins, the node gets an IP but no PXE boot information.
- **Broadcast traffic is allowed.** PXE relies on broadcasts to discover the boot server. Switches and any network gear in the path must permit broadcast traffic and must not filter PXE/TFTP traffic.

!!! tip "Recommended pattern: dedicated maintenance network"
    The preferred setup is a dedicated physical network used for maintenance traffic (IPMI / iDRAC) and PXE boot, using inexpensive basic switches (for example, 1 GbE). Keeping PXE on a dedicated maintenance network avoids interference with production traffic and removes the risk of DHCP contention with other system processes.

The physical network **may already exist from initial system installation** (for example, a maintenance network created during controller node installation).  A physical network can also be created post-install. 

To create a new physical network post-install:

1. Navigate to **Networks** > **New Physical**.
2. Configure network settings: 
    - **Name**: a descriptive name such as "Maintenance-pxe Switch"
    - **Layer 2 Type**: `none` 
    - **MTU size**: The MTU setting must always be a value supported by the physical switching hardware.
    - **IP Address Type:** None
3. **Assign the node NIC to the physical network:** 
    - Navigate to **Infrastructure** > **Nodes** and double-click the target node.
    - Click **NICs** on the left menu.
    - Double-click the NIC that is cabled to the PXE network.
    - Set **Interface** to **Direct**.
    - Select the appropriate physical network (e.g. **Maintenance Switch**).

### Create an External network for PXE service

The physical network is the underlying L1/L2 fabric. To actually serve PXE (DHCP + boot image), an External network must be configured on top of this physical network with **DHCP enabled** and the **PXE boot option** set. 

1. Navigate to **Networks** > **New External**.
2. Configure network settings: 
    - **Name:** provide a descriptive name, such as "PXE boot" 
    - **Layer 2 Type**: `none` for a dedicated management / PXE network (recommended). Alternately, **Layer 2 Type**: `vLan` with a dedicated **Layer 2 ID** if PXE will share a trunked uplink with other VLANs.
    - **PXE Boot:** `ybos` 
    - **Interface Network:** select the **physical network** for the pxe network (e.g. *Maintenance Switch*)
    - **IP Address Type:** `Static`
    - **DHCP:** `enabled`
    - **DHCP Start Address:** and **DHCP Stop Address:** defining the address pool
    - **Dynamic DHCP:** `enabled`  
 

## BIOS / UEFI / Boot Policy

The target node must be configured to boot from the NIC cabled into the PXE network. The specific steps are vendor-specific and depend on the server hardware and/or management controller, but typically include:

- **Enable PXE / network boot** on the target NIC
- **Configure the PXE NIC first** in the boot order
- **Verify no other bootable devices take priority** (for example, USB install media)

    !!! warning "**PXE boot will be reliant on specific NIC and interface**: Node identity is tied to the MAC address of the NIC used during node installation - this MAC must remain constant."

!!! tip "Pro Tip"
    Consult your server hardware or BIOS documentation for the exact menus and options. On managed platforms (blade chassis, converged infrastructure), the boot configuration lives in a service profile or boot policy rather than per-node BIOS.


## Install the Node

!!! tip "Consider creating a new cluster first"
    PXE every-boot nodes typically have a different hardware makeup than the nodes in your existing clusters. Because like nodes should be grouped together, you'll usually want a dedicated cluster for them. Common cases:

    - **Compute-only PXE nodes** — create a new compute cluster for them to join, separate from your existing storage or hyperconverged clusters.
    - **Nodes with non-bootable storage devices** — create a new cluster so they don't mix with existing nodes that have bootable vSAN drives.

    Create the new cluster in the VergeOS UI **before** running the installer so it's available for selection in the step below.

With the network and BIOS configured, install the node using the VergeOS ISO:

1. Boot the node to the VergeOS installation ISO. **The ISO version must match the version of VergeOS running on the cluster.**
2. From the install menu, select **PXE Compute node with optional storage**.
3. Enter **admin credentials** for the existing VergeOS system. The installer checks the network configuration to identify core network connections.
4. If prompted, select the appropriate **cluster for the node to join**.
5. For driverless (no-storage) nodes, the installer will report that no drives were discovered. Press **Enter** to proceed with the install.
6. The node registers with the system.
7. When the install finishes processing, remove the install media and reboot the node.

### Verifying success

After the install completes and the node reboots, you should see:

- The node listed in the VergeOS system (additional node visible in the cluster)
- The node automatically network-booting to VergeOS on reboot, with no install media present

## Troubleshooting

!!! warning "Common Issues"
    - **Problem:** After installation and reboot, the VergeOS installer screen appears again instead of the running OS
        - **Solution:** Remove the installation media (for example, USB installer or virtual media mounted via IPMI) and reboot. The node will fall through to the next item in the boot order — the PXE NIC.

    - **Problem:** Installation completes but the node does not boot to VergeOS after reboot
        - **Solution:** Work through the following checks:
            - Verify the BIOS / UEFI / boot policy is configured to PXE boot from the correct NIC. These settings are vendor-dependent — consult your vendor's documentation.
            - Ensure the underlying network infrastructure allows PXE traffic (broadcasts permitted, TFTP not blocked, no firewall or ACL filtering between the node and the VergeOS PXE network).
            - Confirm the PXE NIC is physically connected to the correct switch port and is receiving a DHCP lease from the configured VergeOS PXE network. Verify the lease is **not** coming from a competing DHCP server on the segment.

    - See [PXE Implementation Guide](/implementation-guide/pxe-boot/) for Additional Troubleshooting information.

!!! tip "Pro Tip"
    If you're stuck, use the - [Network Diagnostics Tool](/product-guide/networks/network-diagnostics) on the PXE external network, running the TCPDump command with a filter for `bootp || tftp`. This can show exactly where the PXE "conversation" stops. If you don't see any incoming packets at all, the issue is almost always upstream — a routing or switching problem, a VLAN mismatch, or a NIC not actually configured to send PXE requests.



## Additional Resources
- [PXE Implementation Guide](/implementation-guide/pxe-boot)
- [Installation Guide](/implementation-guide/installation-guide.md)
- [How to Create an External Network](/knowledge-base/create-external-network/)
- [Network Diagnostics Tool](/product-guide/networks/network-diagnostics)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).

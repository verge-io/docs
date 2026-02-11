# Transitioning from VMware to VergeOS

## Overview

!!! info "Key Points"
    - This guide maps VMware concepts to VergeOS equivalents to ease your transition.
    - VergeOS is a unified hyperconverged platform combining compute, storage, and networking into a single OS.
    - Your existing VMware knowledge transfers directly — most vSphere workflows have a VergeOS equivalent.

If you're a VMware user considering a shift to VergeOS, this guide will help you understand the differences in architecture, terminology, and workflows. VMware's vSphere and ESXi provide a robust virtualization platform, often paired with vSAN, NSX, or vCenter for storage, networking, and management. VergeOS, however, integrates these capabilities into a single, software-defined data center operating system. This document outlines the key distinctions and offers practical steps to migrate your VMware workloads to VergeOS.

!!! note "From a Former VMware Admin"
    Migrating to a new platform can _seem_ scary, especially after investing so much of your time and career into a technology that's been so beneficial for you. The good news is that moving to VergeOS is very straightforward. About 80% of the way you did things in vSphere can be done in VergeOS, so you can take your existing knowledge of virtualized environments and continue to use it. Many of us here at Verge.io are former admins ourselves of various virtualization platforms (including vSphere), and there are a number of aspects in VergeOS that we believe are quality-of-life improvements over what you're used to in vSphere.

---

## Prerequisites

- Familiarity with VMware vSphere, ESXi, and optionally vSAN or NSX.
- Access to a VergeOS system or trial environment (see [Bootable Media](/implementation-guide/install-media)).
- A backup of your VMware VMs and configurations before migration. (see [VMware Backup/DR Guide](/knowledge-base/vmwarebackupdrguide)).

---

## Key Differences Between VMware and VergeOS

### 1. Architecture

| **Aspect**            | **VMware (vSphere/ESXi)**                       | **VergeOS**                                   |
|-----------------------|------------------------------------------------|----------------------------------------------|
| **Core Design**       | Separate hypervisor (ESXi) with optional vCenter for management. Add-ons like vSAN and NSX extend functionality. | Single OS integrating virtualization, storage (vSAN), and networking. No separate management layer required. |
| **Deployment**        | Install ESXi on bare metal, then configure vCenter, vSAN, etc., separately. | Install VergeOS as a complete OS on nodes, creating a unified system from the start. |
| **Scalability**       | Scale compute and storage independently with additional licenses (e.g., vSAN). | Scale-out with nodes (compute, storage, or both) within a single vSAN instance. |
| **Multi-Tenancy**     | Limited native multi-tenancy; requires vCloud Director or manual segmentation. | Built-in nested multi-tenancy with isolated tenants and sub-tenants. |

**Takeaway**: VergeOS eliminates the need for separate components like vCenter or NSX by embedding everything into one system, simplifying deployment and management.

---

### 2. Terminology Mapping

Understanding VergeOS terms in VMware context is crucial for a smooth transition:

| **VMware Term**       | **VergeOS Equivalent**                        | **Notes**                                                                 |
|-----------------------|----------------------------------------------|--------------------------------------------------------------------------|
| **ESXi Host**         | **Node**                                     | A physical server running VergeOS. Nodes can be Controller, Compute-Only, or Storage-Only. |
| **vCenter**           | **VergeOS UI**                               | The web-based UI runs on Controller Nodes (Node 1 or 2) for system-wide management. |
| **Cluster**           | **Cluster**                                  | Groups of nodes with similar hardware, but VergeOS clusters share a single vSAN instance. |
| **vSAN**              | **vSAN**                                     | VergeOS’s vSAN is integral, pooling storage across all nodes automatically. |
| **Datastore**         | **vSAN Storage Tiers**                       | VergeOS organizes storage into tiers (e.g., SSD, HDD) within the vSAN. |
| **Virtual Switch**    | **VergeFabric Physical Network**             | VergeOS can present the physical network uplinks across multiple nodes into a logical switch that is referred to as a "Physical Network" in VergeOS. |
| **VM**                | **VM**                                       | Virtual machines are similar, but VergeOS supports larger specs (e.g., 256TB disks). |
| **dvPortGroup**       | **VergeFabric External Network**             | Virtual Networks that can represent a Layer 2 Network (e.g. a VLAN) that a VM can have its virtual NIC on. Can also do Layer 3 services (routing, DNS, DHCP, BGP/OSPF, VPN). |
| **vMotion**           | **Migrate**                                  | Live migration of running VMs between nodes with no downtime. |
| **VM Templates**      | **VM Recipes**                               | Customizable VM templates with Cloud-Init support, organized into Catalogs. |
| **HA**                | **HA**                                       | VMs automatically restart on surviving nodes during a node failure. |
| **Storage DRS**       | **Preferred Tier**                           | Automatic fallback to the next available storage tier when the preferred tier lacks space. |
| **NSX**               | **VergeFabric**                              | Built-in SDN platform providing L2/L3 networking, routing, DNS, DHCP, and VPN. |
| **VMware Tools**      | **QEMU Guest Agent**                         | Optional agent for file system quiescing, graceful shutdown, and enhanced monitoring. |
| **Resource Pool**     | **Tenant**                                   | Tenants are isolated virtual data centers with their own resources and management. |

**Takeaway**: While some terms overlap (e.g., VM, vSAN), VergeOS’s concepts like “Tenants” and “Internal Networks” offer more integrated and flexible options than VMware equivalents.

---

### 3. Networking

| **Feature**           | **VMware**                                   | **VergeOS**                                   |
|-----------------------|---------------------------------------------|----------------------------------------------|
| **Networking**        | vSphere Distributed Switch or Standard Switch; NSX for advanced features. | Built-in layer 2/3 networking with Core Fabric and External Networks. |
| **VLANs**             | Configured via virtual switches.            | Configured on Physical Networks or Internal Networks. |
| **Redundancy**        | NIC teaming or LACP on switches.            | Core Fabric Networks (dedicated L2) and bonded External Networks. |
| **Firewall/Security** | NSX Distributed Firewall or external appliance. | Built-in firewall rules on Internal and External Networks. |
| **DNS/DHCP**          | Typically handled by VMs or external services. | Built-in DNS and DHCP services on VergeOS networks. |
| **VPN**               | Requires NSX or third-party appliance.      | Native IPSec and WireGuard VPN support (see [VPN Overview](/product-guide/vpn/vpn-overview)). |

**Key Difference**: VergeOS requires jumbo frames (MTU 9192) on Core Fabric Networks for vSAN and node communication, unlike VMware's optional jumbo frame support.

For a detailed guide on planning your network configuration, see [Network Design](/implementation-guide/network-design).

---

### 4. Storage

- **VMware**: vSAN is an optional add-on requiring specific licensing and configuration. Datastores are managed separately.
- **VergeOS**: vSAN is the default storage system, pooling all node drives into tiers. No separate datastore creation is needed—storage is automatically available to VMs and tenants.

**Migration Tip**: Export VMware VMs as OVF/OVA files or use VergeOS’s VMware import tool (see [Import from VMware](/product-guide/virtual-machines/import-from-vmware)).

---

### 5. Licensing

- **VMware**: Per-CPU or per-socket licensing with separate licenses for vSphere, vSAN, NSX, vCenter, and other components. Costs can scale significantly as you add features or hosts.
- **VergeOS**: Simplified per-node licensing that includes all platform features—compute, storage, networking, and multi-tenancy—in a single license. No additional add-on costs.

**Takeaway**: VergeOS's all-inclusive licensing model eliminates the complexity and cost of managing multiple VMware SKUs.

---

### 6. Management

- **VMware**: vCenter provides a centralized UI, with command-line options via PowerCLI.
- **VergeOS**: A web UI runs on Controller Nodes, with API access for automation (see [API Guide](/knowledge-base/verge-api-guide)).

**Takeaway**: VergeOS’s UI is more lightweight and always available, avoiding the need for a separate vCenter VM or appliance.

---

## Migration Steps

### 1. Prepare Your VMware Environment

1. **Backup VMs**: Export critical VMs as OVF/OVA files or use a backup solution compatible with VergeOS (e.g., Veeam).
2. **Document Configuration**: Note VM specs (CPU, RAM, disks), network settings (VLANs, IPs), and storage details.
3. **Check Compatibility**: Review VergeOS’s [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) for your workloads.

---

### 2. Set Up VergeOS

1. **Install VergeOS**: Follow the [Installation Guide](/implementation-guide/installation-guide) to deploy on at least two nodes (primary and secondary controllers).
2. **Configure Networks**: Set up Core Fabric Networks (dedicated L2) and an External Network matching your VMware VLANs (see [Network Design](/implementation-guide/network-design)).
3. **Verify Storage**: Ensure drives are assigned to appropriate tiers during installation (e.g., SSDs for Tier 0).

---

### 3. Migrate VMs

1. **Import VMs**:
   - Use VergeOS’s VMware import feature: Upload OVF/OVA files or connect directly to vSphere (see [Import from VMware](/product-guide/virtual-machines/import-from-vmware)).
   - Alternatively, upload disk images to vSAN and create new VMs (see [Uploading Files to vSAN](/product-guide/storage/uploading-files-to-vsan)).
2. **Adjust Network Settings**: Map VMware virtual switches to VergeOS Internal Networks or VLANs.
3. **Test VMs**: Boot migrated VMs and verify functionality (e.g., network connectivity, application performance).

---

### 4. Optimize Post-Migration

1. **Leverage Tenants**: Assign VMs to tenants for multi-tenancy or isolation (see [Creating Tenants](/product-guide/tenants/create-tenants)).
2. **Set Up Snapshots**: Configure system snapshots for backup and DR (see [Snapshots Overview](/product-guide/backup-dr/snapshots-overview)).
3. **Monitor Performance**: Use the VergeOS UI to track node and VM metrics (see [Nodes Overview](/product-guide/system/nodes-overview)).

---

## What's Next?

Now that you've migrated your VMware workloads, explore these resources to get the most out of VergeOS:

- [VM Best Practices](/product-guide/virtual-machines/best-practices) - Optimize your virtual machine configurations.
- [Network Design](/implementation-guide/network-design) - Plan and refine your network architecture.
- [Snapshots Overview](/product-guide/backup-dr/snapshots-overview) - Set up backup and disaster recovery.
- [Creating Tenants](/product-guide/tenants/create-tenants) - Organize workloads with multi-tenancy.
- [API Guide](/knowledge-base/verge-api-guide) - Automate management tasks with the VergeOS API.

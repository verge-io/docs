# Transitioning from VMware to VergeOS

## Overview

!!! info "Key Points"
    - VergeOS is a unified hyperconverged platform combining compute, storage, and networking.
    - Unlike VMware’s modular ecosystem, VergeOS operates as a single OS with built-in multi-tenancy.
    - This guide maps VMware concepts to VergeOS equivalents to ease your migration.

If you’re a VMware user considering a shift to VergeOS, this guide will help you understand the differences in architecture, terminology, and workflows. VMware’s vSphere and ESXi provide a robust virtualization platform, often paired with vSAN, NSX, or vCenter for storage, networking, and management. VergeOS, however, integrates these capabilities into a single, software-defined data center operating system. This document outlines the key distinctions and offers practical steps to migrate your VMware workloads to VergeOS. 

**Note from a former VMware Admin with over 15 years of experience**: Migrating to a new platform can _seem_ scary. Especially after investing so much of your time and career into a technology and platform that's been so beneficial for you.  The good news is that moving to VergeOS is *really really easy*. I would say that 80% of the way you did things in vSphere can be done in VergeOS.  You can take that invested knowledge you have of virtualized environments and continue to use it.  A lot of us here at Verge.io are former admins ourselves of various virtualization platforms (including vSphere). There's a number of aspects in VergeOS that we believe are quality-of-life improvements to what you're used to in vSphere. 

---

## Prerequisites

- Familiarity with VMware vSphere, ESXi, and optionally vSAN or NSX.
- Access to a VergeOS system or trial environment (see [Bootable Media](/implementation-guide/install-media.md)).
- A backup of your VMware VMs and configurations before migration. (see [VMware Backup/DR Guide](/knowledge-base/vmwarebackupdrguide.md)).

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
| **Datastore**         | **VSAN Storage Tiers**                       | VergeOS organizes storage into tiers (e.g., SSD, HDD) within the vSAN. |
| **Virtual Switch**    | **VergeFabric Physical Network**             | VergeOS can present the physical network uplinks across multiple nodes into a logical switch that is referred to as a "Physical Network" in VergeOS. |
| **VM**                | **VM**                                       | Virtual machines are similar, but VergeOS supports larger specs (e.g., 256TB disks). |
| **dvPortGroup**       | **VergeFabric External Network**             | Virtual Networks that can represent a Layer 2 Network (e.g. a VLAN) that a VM can have it's virtual NIC on. Can also do Layer 3 services (routing, DNS, DHCP, BGP/OSPF, VPN)|
| **Resource Pool**     | **Tenant**                                   | Tenants are isolated virtual data centers with their own resources and management. |

**Takeaway**: While some terms overlap (e.g., VM, vSAN), VergeOS’s concepts like “Tenants” and “Internal Networks” offer more integrated and flexible options than VMware equivalents.

---

### 3. Networking

| **Feature**           | **VMware**                                   | **VergeOS**                                   |
|-----------------------|---------------------------------------------|----------------------------------------------|
| **Networking**        | vSphere Distributed Switch or Standard Switch; NSX for advanced features. | Built-in layer 2/3 networking with Core Fabric and External Networks. |
| **VLANs**             | Configured via virtual switches.            | Configured on Physical Networks or Internal Networks. |
| **Redundancy**        | NIC teaming or LACP on switches.            | Core Fabric Networks (dedicated L2) and bonded External Networks. |

**Key Difference**: VergeOS requires jumbo frames (MTU 9192) on Core Fabric Networks for vSAN and node communication, unlike VMware’s optional jumbo frame support.

---

### 4. Storage

- **VMware**: vSAN is an optional add-on requiring specific licensing and configuration. Datastores are managed separately.
- **VergeOS**: vSAN is the default storage system, pooling all node drives into tiers. No separate datastore creation is needed—storage is automatically available to VMs and tenants.

**Migration Tip**: Export VMware VMs as OVF/OVA files or use VergeOS’s VMware import tool (see [Import from VMware](/product-guide/virtual-machines/import-from-vmware.md)).

---

### 5. Management

- **VMware**: vCenter provides a centralized UI, with command-line options via PowerCLI.
- **VergeOS**: A web UI runs on Controller Nodes, with API access for automation (see [API Guide](/knowledge-base/posts/api-guide.md)).

**Takeaway**: VergeOS’s UI is more lightweight and always available, avoiding the need for a separate vCenter VM or appliance.

---

## Migration Steps

### 1. Prepare Your VMware Environment

1. **Backup VMs**: Export critical VMs as OVF/OVA files or use a backup solution compatible with VergeOS (e.g., Veeam).
2. **Document Configuration**: Note VM specs (CPU, RAM, disks), network settings (VLANs, IPs), and storage details.
3. **Check Compatibility**: Review VergeOS’s [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility.md) for your workloads.

---

### 2. Set Up VergeOS

1. **Install VergeOS**: Follow the [Installation Guide](/implementation-guide/installation-guide.md) to deploy on at least two nodes (primary and secondary controllers).
2. **Configure Networks**: Set up Core Fabric Networks (dedicated L2) and an External Network matching your VMware VLANs (see [Network Design](/implementation-guide/network-design.md)).
3. **Verify Storage**: Ensure drives are assigned to appropriate tiers during installation (e.g., SSDs for Tier 0).

---

### 3. Migrate VMs

1. **Import VMs**:
   - Use VergeOS’s VMware import feature: Upload OVF/OVA files or connect directly to vSphere (see [Import from VMware](/product-guide/virtual-machines/import-from-vmware.md)).
   - Alternatively, upload disk images to vSAN and create new VMs (see [Uploading Files to vSAN](/product-guide/vsan/uploading-files-to-vsan.md)).
2. **Adjust Network Settings**: Map VMware virtual switches to VergeOS Internal Networks or VLANs.
3. **Test VMs**: Boot migrated VMs and verify functionality (e.g., network connectivity, application performance).

---

### 4. Optimize Post-Migration

1. **Leverage Tenants**: Assign VMs to tenants for multi-tenancy or isolation (see [Creating Tenants](/product-guide/tenants/create-tenants.md)).
2. **Set Up Snapshots**: Configure cloud snapshots for backup and DR (see [Snapshots Overview](/product-guide/backup-dr/snapshots-overview.md)).
3. **Monitor Performance**: Use the VergeOS UI to track node and VM metrics (see [Nodes Overview](/product-guide/system/nodes-overview.md)).

---

## Examples

### Example: Migrating a VMware VM

**VMware Setup**: A VM with 4 vCPUs, 8GB RAM, 100GB disk on a vSAN datastore, connected to VLAN 10.

**VergeOS Migration**:

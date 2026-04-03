---
title: "External Storage Integration"
description: "Options for integrating external SAN, NAS, and iSCSI storage with VergeOS, including Fibre Channel LUNs as vSAN tiers, NFS/CIFS remote volumes, and in-guest passthrough storage."
semantic_keywords:
  - "external storage integration, SAN with VergeOS, connect existing storage"
  - "Fibre Channel LUNs vSAN tier, FC SAN integration, external SAN as vSAN storage"
  - "NFS CIFS remote volumes, mount external share, NAS backup target"
  - "in-guest iSCSI passthrough, direct SAN access, VM storage clustering"
use_cases:
  - storage_management
  - tier_configuration
  - capacity_planning
  - backup_planning
  - configuration
tags:
  - storage
  - external-storage
  - fibre-channel
  - iscsi
  - nfs
  - cifs
  - vsan
  - san
  - nas
categories:
  - Storage
---

# External Storage Integration

## Overview

VergeOS is designed as a hyperconverged platform with its own vSAN storage. External storage integration supports three scenarios: leveraging existing FC SAN investments as vSAN tiers, mounting remote NFS/CIFS shares for backups and exports, and providing direct SAN access to guest VMs for clustered applications.

!!! info "VergeOS Storage Philosophy"
    VergeOS vSAN provides built-in data redundancy, deduplication, and compression using local disks in each node. For most deployments, locally-attached drives deliver better performance and simpler operations than external storage.

## When to Use External Storage

Evaluate whether external storage integration is the right approach before planning your architecture.

**Good reasons to integrate external storage:**

- Existing SAN investment with available capacity you want to use
- Compliance requirements mandating specific storage systems
- Tiered storage architecture where FC provides a capacity tier behind local NVMe
- Backup target integration via NFS/CIFS shares

**Consider local disks instead when:**

- Building a new environment (local disks are simpler to manage and troubleshoot)
- Cost is a concern (FC infrastructure, HBAs, and SAN licensing add expense)
- Performance is critical (local NVMe consistently outperforms networked storage for latency-sensitive workloads)

!!! warning "Tier 0 (Metadata) Requires Local Storage"
    Regardless of which integration method you choose, **Tier 0 (metadata tier) must remain on locally-attached NVMe SSDs**. FC LUNs and other external storage can only serve as Tier 1 and above. See [Storage Tiers](/product-guide/storage/storage-tiers/#tier-0-metadata-tier) for details.

## Comparison of Integration Methods

| Method | vSAN Integration | Deduplication | Snapshots | Use Case |
|--------|------------------|---------------|-----------|----------|
| FC LUNs as vSAN tier | Yes | Yes | Yes | Leverage existing FC investment |
| NFS/CIFS Remote Volumes | No (NAS only) | No | Volume-level | Backups, exports, file access |
| In-Guest iSCSI/NFS | No | No | No | Direct SAN apps, clustering |

## Integration Options

### Option 1: Fibre Channel LUNs as vSAN Tier

**Best for:** Organizations with existing FC SAN investments

VergeOS can use Fibre Channel LUNs as storage within its vSAN tiers. Each node receives its own dedicated LUN(s)--VergeOS treats FC LUNs like local physical disks.

**Key points:**

- LUNs must be unique per node (no shared LUNs between nodes)
- Disable RAID on the SAN--VergeOS handles redundancy
- FC HBAs required in at least two nodes
- See [Using Fibre Channel Storage with vSAN](/product-guide/storage/fibre-channel/) for full requirements and configuration

!!! note "iSCSI LUNs as a vSAN Tier"
    VergeOS does **not** support iSCSI LUNs as a vSAN tier. Only Fibre Channel LUNs can be integrated into the vSAN tiered architecture. For iSCSI storage, use the in-guest passthrough method (Option 3) instead.

**What happens if the FC link goes down?**

If the Fibre Channel path to a node's LUN becomes unavailable, the vSAN treats it the same as a failed local disk. The vSAN continues operating using data copies stored on other nodes. Because vSAN maintains redundant copies across nodes, no data is lost as long as at least one copy of each block remains accessible. When the FC path recovers, the affected LUN rejoins and the vSAN initiates a repair walk to re-synchronize any stale data. See the [Fibre Channel guide's path management section](/product-guide/storage/fibre-channel/#path-management) for multipath failover details.

### Option 2: NFS/CIFS Remote Volumes (NAS)

**Best for:** VM exports, backups to external storage, legacy application data

VergeOS NAS service can mount remote NFS and CIFS shares, making external storage accessible to VMs and for backup purposes.

**Use cases:**

- VM export destinations for backup
- Accessing legacy file data during migrations
- Integration with backup appliances

**Configuration:**

See [NAS Remote Volumes](/product-guide/nas/nas-remote-volumes/) for detailed setup steps covering volume creation, protocol selection, authentication, and share mounting.

**What happens if the remote share becomes unavailable?**

VMs or services accessing the remote volume will experience I/O errors for any pending operations. No vSAN data is affected because remote volumes are not part of the vSAN. When the remote share comes back online, access resumes automatically. Applications writing to the share should be configured with appropriate timeout and retry logic.

### Option 3: In-Guest iSCSI/NFS (Passthrough)

**Best for:** Applications requiring direct SAN access, clustered applications

VMs can connect directly to external storage using in-guest iSCSI initiators or NFS clients, bypassing VergeOS storage entirely.

**Use cases:**

- Microsoft Failover Clustering with shared storage
- Oracle RAC
- Applications requiring specific SAN features

**Configuration:**

1. Configure VM networking to reach the storage network
2. Install and configure iSCSI initiator or NFS client in the guest OS
3. Connect to storage targets as you would on physical servers

!!! warning "VergeOS Features Not Available"
    When using in-guest storage connections, you lose VergeOS-level deduplication, snapshots, and data protection for that data. Plan backup strategies accordingly.

**What happens if the storage target becomes unavailable?**

The impact is identical to a physical server losing its SAN connection--the guest OS handles the failure according to its own timeout and retry settings. VergeOS has no visibility into or control over in-guest storage connections. The VM itself and any vSAN-backed disks remain unaffected.

## Common Questions

### Can VergeOS use a SAN as its only storage?

FC LUNs can serve as a vSAN tier, but Tier 0 (metadata) must remain on locally-attached NVMe SSDs. You cannot run a VergeOS environment entirely on external storage.

### What about shared storage between nodes?

VergeOS vSAN does not use shared storage in the traditional sense. Each node contributes its own storage to the distributed vSAN. Data redundancy is achieved by storing copies across multiple nodes, not by multiple nodes accessing the same LUN.

### Can I use my existing SAN for VM storage without vSAN?

Not directly. VergeOS VMs store their disks on vSAN. To use external storage:

- Add FC LUNs to a vSAN tier (Option 1), or
- Use in-guest iSCSI/NFS for specific applications (Option 3), or
- Use NAS remote volumes for file-level access (Option 2)

### Does VergeOS support hardware RAID?

VergeOS requires disks in **JBOD mode** (no RAID). The vSAN handles data protection at the software level. If using a RAID controller, configure it for JBOD/HBA mode or individual disk presentation.

## Performance Considerations

1. **Network bandwidth:** Ensure at least 10 GbE connectivity between nodes and external storage. For write-intensive workloads with FC, the core network bandwidth should exceed the FC SAN bandwidth (see the [Fibre Channel guide](/product-guide/storage/fibre-channel/) for details).
2. **Latency:** External storage adds network latency compared to local disks. Benchmark your workloads after integration to establish a performance baseline.
3. **Queue depth:** Monitor and tune HBA queue depths for FC configurations to avoid I/O bottlenecks.

## Redundancy Planning

VergeOS provides redundancy at the vSAN level:

- Data is stored on two nodes minimum
- Disable RAID on external LUNs to avoid double redundancy overhead
- Plan SAN-side redundancy for path failover, not data protection

## Related Documentation

- [vSAN Architecture](/product-guide/storage/vsan-architecture/)
- [Storage Tiers](/product-guide/storage/storage-tiers/)
- [Fibre Channel Storage](/product-guide/storage/fibre-channel/)
- [NAS Remote Volumes](/product-guide/nas/nas-remote-volumes/)
- [VM Migration Overview](/product-guide/virtual-machines/vm-migration-overview/)

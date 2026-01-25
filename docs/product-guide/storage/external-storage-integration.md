# External Storage Integration

## Overview

While VergeOS is designed as a hyperconverged platform with its own vSAN storage, it can integrate with external storage systems in several ways. This guide explains your options for using external SAN, NAS, and iSCSI storage with VergeOS.

!!! info "VergeOS Storage Philosophy"
    VergeOS vSAN provides built-in data redundancy, deduplication, and compression using local disks in each node. External storage integration is typically used for specific use cases rather than primary storage.

## Integration Options

### Option 1: Fibre Channel LUNs as vSAN Tier

**Best for:** Organizations with existing FC SAN investments

VergeOS can use Fibre Channel LUNs as storage within its vSAN tiers. Each node receives its own dedicated LUN(s)—VergeOS treats FC LUNs like local physical disks.

**Key points:**
- LUNs must be unique per node (no shared LUNs between nodes)
- Disable RAID on the SAN—VergeOS handles redundancy
- FC HBAs required in at least two nodes
- See [Using Fibre Channel Storage with vSAN](/product-guide/storage/fibre-channel/) for details

### Option 2: NFS/CIFS Remote Volumes (NAS)

**Best for:** VM exports, backups to external storage, legacy application data

VergeOS NAS service can mount remote NFS and CIFS shares, making external storage accessible to VMs and for backup purposes.

**Use cases:**
- VM export destinations for backup
- Accessing legacy file data during migrations
- Integration with backup appliances

**Configuration:**
1. Navigate to **NAS** > **Volumes**
2. Create a new **Remote Volume**
3. Select NFS or CIFS protocol
4. Enter server address and share path
5. Configure authentication if required

See [NAS Remote Volumes](/product-guide/nas/nas-remote-volumes/) for detailed steps.

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

!!! note "VergeOS Features Not Available"
    When using in-guest storage connections, you lose VergeOS-level deduplication, snapshots, and data protection for that data. Plan backup strategies accordingly.

## Comparison of Integration Methods

| Method | vSAN Integration | Deduplication | Snapshots | Use Case |
|--------|------------------|---------------|-----------|----------|
| FC LUNs as vSAN tier | Yes | Yes | Yes | Leverage existing FC investment |
| NFS/CIFS Remote Volumes | No (NAS only) | No | Volume-level | Backups, exports, file access |
| In-Guest iSCSI/NFS | No | No | No | Direct SAN apps, clustering |

## Common Questions

### Can VergeOS use a SAN as its only storage?

Technically yes, using FC LUNs as a vSAN tier. However, Tier 0 (metadata tier) still requires fast, low-latency storage—typically NVMe SSDs directly attached to nodes. Using external storage for Tier 0 is not recommended.

### What about shared storage between nodes?

VergeOS vSAN does not use shared storage in the traditional sense. Each node contributes its own storage to the distributed vSAN. Data redundancy is achieved by storing copies across multiple nodes, not by multiple nodes accessing the same LUN.

### Can I use my existing SAN for VM storage without vSAN?

Not directly. VergeOS VMs store their disks on vSAN. To use external storage:
- Add the storage to a vSAN tier, or
- Use in-guest iSCSI/NFS for specific applications, or
- Use NAS remote volumes for file-level access

### Does VergeOS support hardware RAID?

VergeOS requires disks in **JBOD mode** (no RAID). The vSAN handles data protection at the software level. If using a RAID controller, configure it for JBOD/HBA mode or individual disk presentation.

### What about data migration from existing storage?

Options for migrating data to VergeOS:
- **VM migration:** Import VMs from VMware, Hyper-V, or disk images
- **File migration:** Mount external shares via NAS and copy data
- **Storage vMotion equivalent:** Not available—migrate VMs instead

See [VM Migration Overview](/product-guide/virtual-machines/vm-migration-overview/) for details.

## Best Practices

### When to Use External Storage Integration

**Good reasons:**
- Existing SAN investment with available capacity
- Compliance requirements for specific storage systems
- Tiered storage architecture needs
- Backup target integration

**Consider alternatives when:**
- Building a new environment (local disks are simpler)
- Cost is a concern (FC infrastructure is expensive)
- Performance is critical (local NVMe often outperforms networked storage)

### Performance Considerations

1. **Network bandwidth:** Ensure sufficient connectivity between nodes and storage
2. **Latency:** External storage adds network latency; measure impact on workloads
3. **Queue depth:** Monitor and tune HBA queue depths for FC configurations

### Redundancy Planning

Remember that VergeOS provides redundancy at the vSAN level:
- Data is stored on two nodes minimum
- Disable RAID on external LUNs to avoid double redundancy overhead
- Plan SAN-side redundancy for path failover, not data protection

## Related Documentation

- [vSAN Architecture](/product-guide/storage/vsan-architecture/)
- [Storage Tiers](/product-guide/storage/storage-tiers/)
- [Fibre Channel Storage](/product-guide/storage/fibre-channel/)
- [NAS Remote Volumes](/product-guide/nas/nas-remote-volumes/)
- [VM Migration Overview](/product-guide/virtual-machines/vm-migration-overview/)

!!! note "Workload Resources"
    The resources listed below are the requirements for VergeOS. Additional resources will be required to support your specific workloads. When planning your deployment, ensure you account for the resources needed by your virtual machines, applications, and other workloads running on the system.

## Minimum Requirements

### Generic Requirements (All Node Types)

- AMD or Intel x86 64-bit processor with hardware virtualization support
- Minimum of 16GB RAM dedicated to VergeOS
- IPMI, iDrac, iLO, or equivalent technology
- NVMe direct-attached (preferred), HBA or RAID controller that supports JBOD or IT mode - NO RAID
- 1 x 1GbE NIC for External Network (Intel, Mellanox, or Broadcom)
- 1 x 10GbE NIC for Core Fabric Network (Intel, Mellanox, or Broadcom)

### Controller Nodes (Node 1 and Node 2)

- 1 x +2.7Ghz CPU
- 1GB of RAM per 1TB of storage for each node
- **Tier 0**: 1 x NVMe direct-attached SSD for vSAN metadata with 3 Drive Writes Per Day (DWPD) or equivalent
- **Tier 0**: 5GB of storage per 1TB of usable capacity for vSAN metadata

### Storage Nodes (Nodes that partipate in vSAN storage)

- +2.7Ghz CPU
- 1GB of RAM per 1TB of RAW storage for each node
- Minimum of one NVMe or SATA/SAS SSD per node for workload storage
- HDDs can be used for snapshot, archive, or file based service storage
- At least 2 nodes with the same disk configuration for data redundancy

!!! warning "HDDs larger than 8TB are not recommended in non-archive-specific environments due to extended drive rebuild times."

### Compute-only Nodes

- Only the [generic requirements](#generic-requirements-all-node-types) apply to Compute-only nodes
- CPU and Memory should be architected for workloads running on these nodes

## Recommended Requirements

### Generic Requirements (All Node Types) - Recommended

- AMD or Intel x86 64-bit processor with hardware virtualization support
- Minimum of 16GB RAM dedicated to VergeOS
- IPMI, iDrac, iLO, or equivalent technology
- NVMe direct-attached (preferred) or HBA
- Minimum of 16GB RAM dedicated to VergeOS
- 2 x 25/40/100GbE NICs (Intel, Mellanox, or Broadcom)
- 2 x 10/25/40/100GbE NICs (Intel, Mellanox, or Broadcom)
- **Dedicated Controller Nodes**

### Controller Nodes (Node 1 and Node 2) - Recommended

- 1 x +3.0Ghz CPU
- **Tier 0**: 2 x NVMe direct-attached SSD for vSAN metadata with 3 Drive Writes Per Day (DWPD) or equivalent
- **Tier 0**: 10GB of storage per 1TB of usable capacity for vSAN metadata

### Storage Nodes (Nodes that partipate in vSAN storage) - Recommended

- +3.0Ghz CPU
- 1 CPU core per disk
- 1.5GB of RAM per 1TB of storage for each node
- 2 x NVMe or SATA/SAS SSD per node for guest usage; more SSDs recommended for enhanced performance
- At least 2 nodes with the same disk configuration for data redundancy

### Compute-only Nodes - Recommended

- Only the [generic requirements](#generic-requirements-all-node-types) apply to Compute-only nodes
- CPU and Memory should be architected for workloads running on these nodes

!!! note "Additional Resources for Workloads"
    Remember to account for additional resources needed by your specific workloads, virtual machines, and applications when planning your deployment.

---

## Maximum Supported Hardware Specifications

The following table outlines the maximum supported hardware specifications for various resources in the VergeOS system as of version 4.12:

| Resource                        | Maximum | Resource Type |
|---------------------------------|---------|---------------|
| Nodes per system                | 200     | node          |
| Individual physical disk size   | 64      | terabyte      |
| RAM per host [^2]               | 5       | terabyte      |
| vDisk size                      | 256     | terabyte      |
| Disks per VM [^3]               | 2000    | vdisk         |
| Clusters per system             | 100     | cluster       |
| Tiers of storage per system     | 5       | tiers         |
| vSAN Fault domains per system   | 2       | vSAN          |

[^1]: Graphics cards are supported for VM usage and may not function for console access.
[^2]: vSAN nodes require a minimum 1GB of RAM per 1TB of Storage
[^3]: Virtio-SCSI Interface required
!!! note "Workload Resources"
    The resources listed below are the requirements for VergeOS. Additional resources will be required to support your specific workloads. When planning your deployment, ensure you account for the resources needed by your virtual machines, applications, and other workloads running on the system.

## Minimum Requirements

### Generic Requirements (All Node Types)

- Intel or AMD x86 64-bit processor with hardware virtualization support
- Minimum of 16GB RAM dedicated to VergeOS
- HBA (preferred) or RAID controller that supports JBOD mode - NO RAID
- 2 x 1/10/25/40GbE NICs (Intel, Mellanox, or Broadcom)

!!! note "1GbE only recommended for External Network communication"

### Controller Nodes (Node 1 and Node 2)

- 1GB of RAM per 1TB of storage for each node
- 1 x 800GB+ 3 DWPD NVMe-based SSD for vSAN metadata
- 5GB of vSAN metadata storage per 1TB of usable capacity in your VergeOS System

### Storage Nodes (Nodes that partipate in vSAN storage)

- 1GB of RAM per 1TB of storage for each node
- Minimum of one NVMe or SATA/SAS SSD per node for workload storage
- HDDs can be used for snapshot, archive, or file based service storage
- At least 2 nodes with the same disk configuration for data redundancy

!!! warning "HDDs larger than 8TB are not recommended in non-archive-specific environments due to extended drive rebuild times."

### Compute-only Nodes

- Only the [generic requirements](#generic-requirements-all-node-types) apply to Compute-only nodes
- CPU and Memory should be architected for workloads running on these nodes

### GPU (Optional)

- Compatible with any AMD, Intel, or Nvidia GPU
- Nvidia vGPU also supported

<!-- ### Additional Network Considerations

- For environments with more than two servers switches are required for Core Fabric Networks
- Core Fabric Networks require jumbo frames of 9216 MTU or greater -->

## Recommended Requirements

### Generic Requirements (All Node Types) - Recommended

- Intel or AMD x86 64-bit processor with hardware virtualization support
- Minimum of 16GB RAM dedicated to VergeOS
- HBA (preferred) or RAID controller that supports JBOD mode - NO RAID
- Minimum of 16GB RAM dedicated to VergeOS
- 2 x 25/40GbE NICs (Intel, Mellanox, or Broadcom)
- 2 x 10/25GbE NICs (Intel, Mellanox, or Broadcom)
- **Dedicated Controller Nodes**

### Controller Nodes (Node 1 and Node 2) - Recommended

- 1 x +3.0Ghz CPU clockrate
- 2 x 800GB+ 3 DWPD NVMe-based SSD for vSAN metadata (Tier 0)
- 5GB of storage per 1TB of usable capacity for vSAN metadata (Tier 0)

### Storage Nodes (Nodes that partipate in vSAN storage) - Recommended

- 2 x +3.0Ghz CPU clockrate
- 1 CPU core per disk
- 1GB of RAM per 1TB of storage for each node
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
| Disks per VM [^3]               | 2000    | vdisk         |
| Individual physical disk size   | 64      | terabyte      |
| vDisk size                      | 2000    | terabyte      |
| RAM per hos [^2]                | 5       | terabyte      |
| Clusters per system             | 1000    | cluster       |
| Tiers of storage per system     | 5       | tiers         |
| vSAN Fault domains per system   | 2       | vSAN          |
| Systems w/o Dedicated Controller Nodes | 10 | node |

[^2]: vSAN nodes require a minimum 1GB of RAM per 1TB of Storage
[^3]: Virtio-SCSI Interface required
# VergeOS Sizing Guide 

## Minimum Requirements
---
### CPU
- **Type:** Intel or AMD 64-bit processor
- **Consistency:** Processor family must be consistent across the cluster
- **Virtualization Support:** Must support VT-x (for Intel) or AMD-V/AMD-SVM (for AMD)
- **Cluster Minimum:** A cluster consists of at least 2 servers (nodes) with like architecture. Multiple clusters can exist within a system.

### Memory
- **VergeIO Operations:** Minimum of 8 GB dedicated to VergeIO for OS and application server operations.
- **Guest Memory:** Additional memory must be designated for guest operations.
- **Storage Memory Requirement:** 1 GB of RAM per 1 TB of storage for each node participating in storage activities.

### Storage
- **Controller Requirements:** HBA or RAID controller that supports JBOD mode (NO RAID) and is certified for the latest LTS Linux Kernel.
- **Metadata Storage:** 1 High Endurance (~3 DWPD) NVMe of at least 240 GB, required only by the first two controller nodes for metadata.
- **Guest Storage:** Minimum of one NVMe or SATA/SAS SSD per node for guest usage; more SSDs are recommended for enhanced performance.
- **Hard Drive Considerations:** HDDs can replace NVMe or SATA/SAS SSDs, though this may impact performance. HDDs larger than 8TB are not recommended in non-archive-specific environments due to extended drive rebuild times.

### Networking
- **Internal Communication:** 2 x 10GbE NICs per server for storage, application server, and workload migrations.
- **External Communication:** 1 x 1GbE NIC per server for UI access and outgoing guest traffic.
- **NIC Recommendations:** Intel, Mellanox, and Broadcom NICs are highly recommended for compatibility and performance.

### Additional Network Considerations
- **Core Switches:** For environments with more than two servers, "core" switches are required for node communication.
- **Jumbo Frames:** Required for "core" networking to facilitate efficient data handling.
- **MTU Settings:** All switch ports in the "core" network should have an MTU setting of 9216 or greater.
- **VLAN Configuration:** All core switch ports must be on the same VLAN per switch, ideally using a Native VLAN / PVID for core communication.

### GPU (Optional)
**vGPU Requirements:**

  - Processor with IOMMU support (Intel VT-d, AMD-Vi/VT).

  - Refer to the Hardware Compatibility List (HCL) for tested drivers and GPUs.

**GPU Passthrough:**

  - Compatible with any AMD, Intel, or Nvidia GPU.

---

## Maximum and Minimum Supported Hardware Specifications

| Resource                          | Minimum          | Maximum        |
|-----------------------------------|------------------|----------------|
| **Nodes per System**              | 2                | 256            |
| **Disks per VM (virtio SCSI)**    | -                | 2000           |
| **Storage per System**            | -                | 1 Petabyte     |
| **Individual Physical Disk Size** | -                | 64 Terabytes   |
| **vDisk Size**                    | -                | 2000 Terabytes |
| **RAM per Host**                  | 8 GB             | 5 TB           |
| **Clusters per System**           | 1                | 1000           |
| **Tiers of Storage per System**   | -                | 5              |
| **Failure Domains per System**    | -                | 2              |
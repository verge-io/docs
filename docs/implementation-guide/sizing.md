# Sizing Guide 

## Minimum Requirements
---
### CPU
- Intel or AMD 64-bit processor
- Processor family must be consistent across the cluster
- Must support VT-x (for Intel) or AMD-V/AMD-SVM (for AMD)
- A cluster consists of at least 2 servers (nodes) with like architecture. Multiple clusters can exist within a system.

### Memory
- Minimum of 16 GB dedicated to VeregOS for OS and application server operations.
- Additional memory must be designated for guest operations.
- 1 GB of RAM per 1 TB of storage for each node participating in storage activities.

### Storage
- HBA or RAID controller that supports JBOD mode (NO RAID) and is certified for the latest LTS Linux Kernel.
- 1 High Endurance (~3 DWPD) NVMe of at least 240 GB, required only by the first two controller nodes for metadata.
- Minimum of one NVMe or SATA/SAS SSD per node for guest usage; more SSDs are recommended for enhanced performance.
- HDDs can replace NVMe or SATA/SAS SSDs, though this may impact performance. 

!!! note "HDDs larger than 8TB are not recommended in non-archive-specific environments due to extended drive rebuild times."

### Networking
- 1 x 10GbE NICs per server for storage, application server, and workload migrations.
- 1 x 1GbE NIC per server for UI access and outgoing guest traffic.
- Intel, Mellanox, and Broadcom NICs are recommended for compatibility and performance.

### Additional Network Considerations
- For environments with more than two servers, "core" switches are required for node communication.
- Required for "core" networking to facilitate efficient data handling.
- All switch ports in the "core" network should have an MTU setting of 9216 or greater.
- All core switch ports must be on the same VLAN per switch, ideally using a Native VLAN / PVID for core communication.

### GPU (Optional)
**vGPU Requirements:**

  - Processor with IOMMU support (Intel VT-d, AMD-Vi/VT).

  - Refer to the Hardware Compatibility List (HCL) for tested drivers and GPUs.

**GPU Passthrough:**

  - Compatible with any AMD, Intel, or Nvidia GPU.

---

## Recomneded Requirements

### CPU
- **vSAN (Storage Nodes)**: Intel Xeon or AMD EPYC Processor, 8c – 16t Processor 3.0 GHz
- **Compute Nodes**: Intel Xeon or AMD EPYC Processor, Dual 32 core Processors 2.2 GHz
- Processor family must be consistent across the cluster
- Must support VT-x (for Intel) or AMD-V/AMD-SVM (for AMD)

### Memory
- Minimum of 16 GB dedicated to VeregOS for OS and application server operations.
- **Compute Nodes**: Memory to Core ratio of 8-1/16-1
- **Storage Nodes**: 1.5GB per 1TB of RAW storage

### Storage
- HBA or RAID controller that supports JBOD mode (NO RAID) and is certified for the latest LTS Linux Kernel.
- 1 High Endurance (~3 DWPD) NVMe of at least 240 GB, required only by the first two controller nodes for metadata.
- 2 x NVMe or SATA/SAS SSD per node for guest usage; more SSDs are recommended for enhanced performance.

!!! note "HDDs larger than 8TB are not recommended in non-archive-specific environments due to extended drive rebuild times."

### Networking
- 2 x 25GbE NICs per server for storage, application server, and workload migrations.
- 2 x 10GbE (LACP) NIC per server for UI access and outgoing guest traffic.
- Redundant network switches

---
## Maximum and Minimum Supported Hardware Specifications[^1]

| Resource                        | Minimum | Maximum | Resource Type |
|---------------------------------|---------|---------|---------------|
| nodes per system (physical servers) |   1 | 65000   | node          |
| VMs per host                    |         |         | vm            |
| Disks per VM (virtio SCSI)[^3]  |         | 2000    | vdisk         |
| Storage per system              |         |         | terabyte      |
| Storage per node                |         |         | terabyte      |
| Individual physical disk size   |         | 64      | terabyte      |
| vDisk size                      |         | 2000    | terabyte      |
| Logical processors per host     |         |         | procs         |
| RAM per host[^2]                    |         | 5       | terabyte      |
| RAM per VM                      |         |         | terabyte      |
| Virtual processors per host     |         |         | procs         |
| Virtual processors per VM       |         |         | procs         |
| clusters per system             |         | 1000    | cluster       |
| tiers of storage per system     |         | 5       | tiers         |
| storage clusters per system?    |         |         | cluster       |
| failure domains per system      |         | 2       |               |
| nodes per cluster               |         | 256     | node          |


[^1]: As of v4.12
[^2]: vSAN nodes require a minimum 1GB of RAM per 1TB of Storage
[^3]: Virtio-SCSI Interface required
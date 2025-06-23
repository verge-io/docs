# Virtual Machine Management (VergeHV)

VergeHV is a central component of the VergeOS unified environment, providing a single interface hypervisor that converges storage and networking functionalities.  This approach reduces complexity to deliver simplified, flexible workload provisioning and management, improved resource utilization, and greater cost efficiency.


## Getting Started

New to VergeOS VM Management? Follow this path:

1. **[VM Best Practices](/product-guide/virtual-machines/vm-best-practices)** - Guidelines for configuring new and imported virtual machines
2. **[Creating VMs](/product-guide/virtual-machines/creating-vms)** - Create new virtual machines from import, clone, recipe or from scratch
3. **[Importing VMs](/product-guide/virtual-machines/import-vms)** - Choose among various methods to easily absorb existing workloads into VergeOS 


## Key Features

* **Robust Security**: Granular control of workloads by easily segregating them into any number of virtual networks for privacy and security 

* **High Performance**  
    - **Low overhead** - Designed to consume minimal host resources, leaving more available for virtual machines.
    - **Near bare metal workload efficiency** - VergeHV leverages KVM to operate as a Type-1 hypervisor, running directly on hardware   

* **Optimized Resource Utilization**: Features such as distributed mirroring, optimized global deduplication, and RAM caching provide efficient reads and writes for your workloads.

* **Broad Compatibility**: 
    - **Guest OS** - Extensive compatibility for x86_64 operating systems. See [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) 
   for more information.  
    - **Hardware Emulation** - QEMU emulation is utilized for wide range hardware support
    - **Passthrough** - Dynamic use of GPU, PCI, SRIOV, USB, and vGPU devices within your workloads  

* **Diverse Resource Profiles**: Create multiple compute clusters within the same system to match varied workloads to the CPU and memory resources they need.

* **Scalability**: Incrementally add more storage and compute resources to meet expanding workload requirements

* **High Availability/Live Migration**: High availability features automatically migrate virtual machines across hosts, ensuring uninterrupted access during maintenance and upgrades, node failure, drive malfunctions, etc.

* **Automation**: **[Recipes](/product-guide/automation/recipes-overview)**, **[Task Engine](/product-guide/automation/create-tasks)**, and **[VergeOS API](/knowledge-base/verge-api-guide)** provide extensive automation and orchestration capabilities.



## Related Documentation

### Getting Started

  * **[VM Best Practices](/product-guide/virtual-machines/vm-best-practices)** - Guidelines for configuring new and imported virtual machines
  * **[Create VMs](/product-guide/virtual-machines/creating-vms)** - Create new virtual machines from import, clone, recipe or from scratch
  * **[Import VMs](/product-guide/virtual-machines/import-vms)** - Easily migrate your existing workloads into VergeOS 


### Guest OS Access

  * **[Remote Console](/product-guide/virtual-machines/vm-remote-console)**
  * **[Guest Agent](/product-guide/virtual-machines/vm-guest-agent)**

### Virtual Desktop Infrastructure (VDI)

  * **[Native VDI](/product-guide/virtual-machines/vdi-overview)**
  * **[Enterprise Integration (Inuvika)](/product-guide/tools-integrations/inuvika)**

### Migrations

  * **[Live Migrations](/product-guide/virtual-machines/live-migrations)**
  * **[Manual VM Migrations](/product-guide/virtual-machines/vm-manual-migration)**

### Backup/Recovery

 * **[VM Snapshots and Restores](/product-guide/backup-dr/vm-snapshots-restores)**

 
### Automation

  * **[Recipes](/product-guide/automation/recipes-overview)**
  * **[Task Engine](/product-guide/automation/create-tasks)**
  * **[VergeOS API](/knowledge-base/verge-api-guide)**




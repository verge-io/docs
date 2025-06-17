# Virtual Machine Management (VergeHV)

The VergeHV hypervisor is a central component of the VergeOS unified environment. Converging complete hypervisor functionalities with storage and networking, VergeOS delivers simplified workload administration, improved resource utilization, and cost efficiencies, by eliminating the need for separate management interfaces or dedicated storage networks.  This reduces complexity and the potential for configuration errors.


## Getting Started

New to VergeOS VM Management? Follow this path:

1. **[VM Best Practices](/product-guide/virtual-machines/vm-best-practices)** - Guidelines for configuring new and imported virtual machines
2. **[Create VMs](/product-guide/backup-dr/sync-configuration)** - Create new virtual machines from import, clone, recipe or from scratch
3. **[Import VMs](/product-guide/virtual-machines/import-vms)** - Easily migrate your existing workloads into VergeOS 


## Key Features

* **High Performance**:
   * **Low overhead** - Designed to consume minimal host resources, leaving more available for virtual machines.
   * **Near bare metal workload efficiency** - VergeHV leverages KVM to operate as a Type-1 hypervisor, running directly on hardware   

* **Robust Security**: Keep your virtual machines under your own control where workloads can be separated into any number of virtual networks for privacy and security 

* **Optimized Resource Utilization**: Efficiently pool and dynamically allocate CPU, memory, storage, and network resources to multiple virtual machines (VMs) from shared capacity. Features such as distributed mirroring, optimized global deduplication, and RAM caching provide efficient reads and writes for your workloads.

* **Broad Compatibility**: 
   * **Guest OS** - Extensive compatibility for x86_64 operating systems. See [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) 
   for more information.  
   * **Hardware Emulation** - QEMU emulation is used to offer a wide range of hardware support
   * **Passthrough** - Comprehensive device passthrough functionality to use GPU, PCI, SRIOV, USB, and vGPU within your workloads  

* **Diverse Resource Profiles**: Support for multiple compute clusters

* **Scalability**: Incrementally add more storage and compute resources to meet expanding workload requirements

* **High Availability/Live Migration**: VergeOS is designed to be highly-resilient and automatically migrate virtual machines, ensuring uninterrupted access during maintenance and upgrades, upon node failure, drive malfunction, etc.

* **Automation**: [Recipes](/product-guide/automation/recipes-overview), [Task Engine](/product-guide/automation/create-tasks), and [VergeOS API](/knowledge-base/verge-api-guide) provide a multitude of automation and orchestration options of your workloads.



## Related Documentation

## Getting Started

1. **[VM Best Practices](/product-guide/virtual-machines/vm-best-practices)** - Guidelines for configuring new and imported virtual machines
2. **[Create VMs](/product-guide/backup-dr/sync-configuration)** - Create new virtual machines from import, clone, recipe or from scratch
3. **[Import VMs](/product-guide/virtual-machines/import-vms)** - Easily migrate your existing workloads into VergeOS 


## Management and Monitoring

* [VM Dashboards](/product-guide/virtual-machines/vm-dashboards)
  * [Live Migrations](/product-guide/virtual-machines/live-migrations/vm-live-migration)
  * [Manual VM Migrations](/product-guide/virtual-machines/vm-manual-migrations)

## Guest OS Access

  * [Remote Console](/product-guide/virtual-machines/vm-remote-console)
  * [Guest Agent](/product-guide/virtual-machines/vm-guest-agent)

## Virtual Desktop Infrastructure (VDI)

  * [Native VDI](/product-guide/virtual-machines/vdi-overview)
  * [Inuvika](/product-guide/tools-integrations/inuvi)

## Backup/Recovery

 * [VM Snapshots and Restores](/product-guide/backup-dr/vm-snapshots-restores)

 





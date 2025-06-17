# Virtual Machine Management (VergeHV)

The VergeHV hypervisor is a central component of the VergeOS unified environment. VergeOS converges complete hypervisor functionalities with storage and networking to provide simplified administration, improved resource utilization, and cost efficiencies, by eliminating the need for separate management interfaces and dedicated storage networks.


## Key Features

* **Near bare metal efficiency**: VergeHV leverages KVM to operate as a Type-1 hypervisor, running directly on hardware for high performance. 

* **Minimized System Overhead**: VergeOS operated with low ovverhead with an efficient design that consumes minimal host resources itself, leaving more resources available for VMs.

* **Optimized Resource Utilization**: VergeHV delivers the ability to efficiently pool and dynamically allocate CPU, memory, storage, and network resources to multiple virtual machines (VMs). This includes features like memory overcommit and shared dedicated capacity to maximize hardware utilization.

* **Simplified Management**: 

* **QEMU?? - hardware emulation??

VM Isolation: Crucial for security and stability, a good hypervisor ensures that each VM operates independently, preventing a problem or security breach in one VM from affecting others on the same host.

Hardware Compatibility: Broad support for various hardware types (CPUs, memory, storage devices, network cards) to ensure flexibility in deployment. also mention device passthrough capabilities

scalability

live migration

high availability

snapshot/replication

recipes

low overhead

* **Wide Guest OS Support**: VergeOS supports a wide range of guest Operating systems. See [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) for more information.

Combining hypervisor and network management, often seen in the context of Software-Defined Networking (SDN) and Hyperconverged Infrastructure (HCI), offers several compelling advantages:

Simplified Management: Instead of managing network infrastructure and virtual machines separately, a unified interface allows administrators to provision, monitor, and troubleshoot both from a single console. This reduces complexity and the potential for configuration errors.
Improved Agility and Automation: With network functions virtualized and controlled by software, it becomes much easier to automate network provisioning for new VMs, dynamically adjust network policies, and adapt to changing workload demands. This allows for faster deployment of applications and services.
Enhanced Resource Utilization: By treating network resources as a pool, just like compute and storage, the integrated solution can dynamically allocate bandwidth and network services to VMs based on their real-time needs, leading to more efficient use of network infrastructure.
Greater Flexibility and Scalability: Decoupling network services from physical hardware allows for greater flexibility in network design and makes it easier to scale network capacity up or down as needed, without being constrained by physical limitations.

## Getting Started

New to VergeOS VM Management? Follow this path:

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





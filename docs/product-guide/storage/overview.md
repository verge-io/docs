# Storage Overview

VergeOS provides an integrated storage solution that can be tailored to meet diverse workload requirements and provide simplified administration.


## vSAN (VergeFS)
The VergeFS **Virtual Storage Area Network (vSAN)** is a fundamental component that tightly integrates storage into the VergeOS Virtual Data Center (VDC). It provides a distributed, multi-tiered storage foundation for all VergeOS workloads.


*[ VDC ] : A portable encapsulation of compute, network, and storage resources that ensures isolation and provides for autonomous management within a shared hardware environment.  Using VDCs enables efficient and flexible use of resources and simplified management.    


### Key Features

* **Direct management of storage hardware**: Eliminates storage abstraction layers for improved performance
* **Comprehensive monitoring and reporting**: Real-time visibility into storage performance, capacity, and health
* **Intelligent load balancing**: Automatically distributes I/O across available storage devices
* **Data efficiency**: Built-in deduplication reduces storage consumption
* **Data integrity**: Continuous bit-rot detection protects against silent data corruption
* **Self-healing**: Automatic recovery from hardware failures
* **Horizontal scalability**: Add storage capacity and performance by adding nodes
* **Legacy hardware support**: Wide device support, including HDD and [Fibre Channel](/product-guide/storage/fibre-channel) to integrate existing SAN infrastructure
* **Effortless virtual disk management**: storage abstraction provides simplified and flexible virtual disk provisioning and management 

More information about VergeFS architecture can be found at: [VergeOS vSAN Block-Level Architecture and Data Distribution](/product-guide/storage/vsan-architecture)

## Integrated Data Protection 

* [**Snapshots**](/product-guide/backup-dr/snapshots-overview): Point-in-time copies for quick recovery
* [**Replication**](/product-guide/backup-dr/sync-configuration): Copy complete systems along with data to another location for archival and disaster recovery
* [**Backup integration**](/product-guide/tools-integrations/storware-backup-recovery): Compatibility with external enterprise backup software 


## File-level Storage

* [**Media Images**](/product-guide/storage/uploading-files-to-vsan) - easily upload and manage individual ISO images, VM disk images, logos and other files to use in your system and share among sites and tenants. 

* [**Network Attached Storage (NAS)**](/product-guide/nas/nas-service) - embedded NAS services allow you to create volumes for file-level access on your VergeOS distributed storage, in order to: share across workloads, easily import/export data for backups or migration, mount external file systems, and more.  






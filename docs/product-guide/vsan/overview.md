# Storage Overview

VergeOS offers integrated storage solutions that can be tailored to meet diverse workload requirements and provide simplified administration.


## vSAN (VergeFS)
The VergeFS virtual Storage Area Network (vSAN) is a fundamental component that tightly integrates storage into the VergeOS virtual data center (VDC). It provides a distributed, multi-tiered storage foundation for all VergeOS workloads.


### Key Features

* **Direct management of storage hardware**: Eliminates storage abstraction layers for improved performance
* **Comprehensive monitoring and reporting**: Real-time visibility into storage performance, capacity, and health
* **Intelligent load balancing**: Automatically distributes I/O across available storage devices
* **Data efficiency**: Built-in deduplication reduces storage consumption
* **Data integrity**: Continuous bit-rot detection protects against silent data corruption
* **Self-healing**: Automatic recovery from hardware failures
* **Horizontal scalability**: Add storage capacity and performance by adding nodes
* [**Fibre Channel support**](/product-guide/vsan/fibre-channel): Integrate existing SAN infrastructure to take advantage of vSAN redundancy and efficiency. 

### Integrated Data Protection 

* [**Snapshots**](/product-guide/backup-dr/snapshots-overview): Point-in-time copies for quick recovery
* [**Replication**](/product-guide/backup-dr/sync-configuration): Copy data to another location for disaster recovery
* [**Backup integration**](/product-guide/backup-dr/backup-integration): Compatibility with enterprise backup solutions 

More information about VergeFS architecture can be found at: [VergeOS vSAN Block-Level Architecture and Data Distribution](/product-guide/vsan/architecture)

## Object-level Storage


## File-level Storage

* [Media Images](/product-guide/vsan/uploading-files-to-vsan) - easily upload and manage files individual ISO images, VM disk images, logos and other files to use in your system and share among various sites and tenants. 

* [Network Attached Storage (NAS)](/product-guide/nas/nas-service) - embedded NAS services allow you to create file-level volumes on the distributed storage for: sharing across workloads, easily importing and exporting data for backups or migration, mounting external file systems, and more.  See the [NAS Service Product Guide](/product-guide/nas/nas-service) for information about configuring and using the NAS service.






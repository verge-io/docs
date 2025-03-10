# Multi-tenant Deployments


Cloud Service Providers (CSPs) aiming for a cost-effective solution to offer multi-tenant based IaaS can leverage VergeOS. This document provides an overview of deploying VergeOS for CSPs, outlining the key benefits, and detailing various configurations available.


## CloudHoster Example


CloudHoster, a mid-sized Cloud Provider, will be used throughout this document to explain the key concepts and details around multi-tenant deployments. CloudHoster approached VergeOS to simplify their IaaS offerings while enhancing resilience, reducing costs, and meeting stringent SLAs.


## What is a tenant?


A tenant represents a Virtual Data Center (VDC) within a larger data center infrastructure. It is essentially a "data center within a data center," providing an isolated environment for different users or organizations. Each tenant operates independently, ensuring that resources, data, and applications within one tenant are completely segregated from those in other tenants. This isolation is crucial for maintaining security, performance, and compliance.


## A Tenant within VergeOS


A tenant in VergeOS functions as a self-contained virtual environment. Each tenant has its own independent user interface and URL, allowing for customization to meet specific needs. Tenants can be nested within other tenants, creating a hierarchical structure that can accommodate complex organizational or service requirements. Resources such as CPU, memory, storage, and network bandwidth are allocated to each tenant independently, ensuring efficient and isolated operation.


## Why Use Tenants?


* **Cost Efficiency**: Multi-tenancy reduces expenses by sharing infrastructure, optimizing resource utilization, and eliminating additional costs associated with traditional data center management.
* **Scalability**: Easily scale resources up or down to meet demand without significant changes to the infrastructure, ensuring flexible and efficient management of computing power and storage.
* **Simplified Management**: Centralized management allows for straightforward administration of Virtual Data Centers (VDCs), ensuring that updates and maintenance are handled seamlessly.
* **Enhanced Security and Compliance**: Complete isolation within VDCs ensures data security and compliance, preventing unauthorized access and enhancing overall data protection.
* **Rapid Deployment**: Quickly provision new tenant environments within the existing setup, reducing time to market for new services and simplifying onboarding processes.
* **Customization and Innovation**: Tailor VDCs to meet specific operational needs and benefit from continuous innovations driven by the collective needs of all users, ensuring an up-to-date and efficient infrastructure.




## Types of Tenants


* Customers
* Business Units
* Dev/ Test / QA
* External Partners
* Portability
* DR


---


## ***Overview***


VergeOS offers a highly adaptable solution for CSPs looking to deploy and manage IaaS offerings. Depending on the deployment scenario, CSPs can provide centralized management, backup and recovery options, and self-service capabilities for their customers.


Below we will detail several deployment scenarios that represent a growing CSP:


* [Scenario 1: 2 sites with DR](#scenario-1-2-sites-with-dr): Deploy 2 primary sites utilizing site sync for DR
* [Scenario 2: Edge clusters](#scenario-2-edge-clusters): Deploy edge clusters to gain presence in new regions
* [Scenario 3: Scale out](#scenario-3-scale-out): Scale out edge cluster to meet demand
* [Scenario 4: Storage Clusters](#scenario-4-storage-clusters): Cloudhoster launches a new S3 compatible storage offering


---


## Scenario 1: 2 sites with DR
6 node clusters deployed in separate data centers.


## Summary


This deployment allows CloudHoster IT staff to centrally manage their IaaS offerings, providing a robust platform for their customers. They will deploy VergeOS clusters in both of their data centers and configure site sync and repair servers on both clusters.


## Hardware and Features


### Hardware
For CloudHoster's VergeOS deployment, the following hardware is recommended:


- (6) High-density servers per data center


* Intel Xeon or AMD EPYC Processor, Dual 32 core Processors 2.2 GHz
* 768 GB ECC RAM
* (2x) NVME drives with 3DWPD **only in node1 and node2**
* (8x) 2.5 in Drive Bays
* (2x) 25 Gbe Ports (or greater)
* (2x) 10 Gbe Port
* On Board IPMI
* Redundant Power Supplies


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source
* **Multi-Tenancy**: Secure isolation of customer environments
* **Self-Service Management**: Web-based UI and API for customer resource management
* **High Availability**: Automated fail-over and data protection mechanisms
* **Site Sync**: Cloud Snapshot replication
* **Repair Server (ioGuardian)**: Automatically retrieve missing blocks from remote site
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots
* **Catalog Repositories**: Centralized management of VM recipes


---


## Scenario 2: Edge clusters
Deploy (6) 2 node clusters to 3rd party data centers.


## Summary


Cloudhoster is looking to expand their offerings into new regions, they are partnering with 3rd party data centers to provide colocation and bandwidth. Since they will be deploying into 6 data centers they are looking to save money by deploying 2 node clusters at first knowing that vergeOS will allow them to scale out quickly when customer demand warrants.


## Hardware and Features


### Hardware
For CloudHoster's VergeOS deployment, the following hardware is recommended:


* Intel Xeon or AMD EPYC Processor, Dual 16c – 32t Processor with a base clock speed of 3 GHz
* 256 GB ECC RAM
* (8x) 2.5 in Drive Bays
* (4x) 10 Gbe Port
* On Board IPMI
* Redundant Power Supplies


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source
* **Multi-Tenancy**: Secure isolation of customer environments
* **Self-Service Management**: Web-based UI and API for customer resource management
* **High Availability**: Automated fail-over and data protection mechanisms
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots
* **Catalog Repositories**: Centralized management of VM recipes
* **Cloud Snapshots**: Local snapshots for quick recovery of a site




---


## Scenario 3: Scale out
Scale out 2 locations by adding new clusters to the existing 2 node sites.


## Summary


Cloudhoster has seen a lot of growth where customers want to deploy workloads in both their east and west coast locations. These sites currently only have 2 nodes each and they need to add capacity to match the demand. In addition they want to start offering DR services between these sites.


To achieve this, Cloudhoster will be adding a new cluster in each site and setting up site sync and repair servers in both of the new clusters.


## Hardware and Features


### Hardware
For CloudHoster's VergeOS deployment, the following hardware is recommended:


- (4) High-density servers per data center


* Intel Xeon or AMD EPYC Processor, Dual 64 core Processors 2.4 GHz
* 1024 GB ECC RAM
* (8x) 2.5 in Drive Bays
* (2x) 25 Gbe Ports (or greater)
* (2x) 10 Gbe Port
* On Board IPMI
* Redundant Power Supplies


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source
* **Multi-Tenancy**: Secure isolation of customer environments
* **Self-Service Management**: Web-based UI and API for customer resource management
* **High Availability**: Automated fail-over and data protection mechanisms
* **Site Sync**: Cloud Snapshot replication
* **Repair Server (ioGuardian)**: Automatically retrieve missing blocks from remote site
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots
* **Catalog Repositories**: Centralized management of VM recipes


---


## Scenario 4: Storage Clusters
Deploy storage clusters to 4 of the sites.


## Summary


CloudHoster is looking to expand their product offerings by introducing a new S3-compatible storage solution called Cloud Storage. To achieve this, Cloudhoster will be adding a new storage cluster to 4 of their sites and creating a tenant recipe that will automate the deployment of the service.


The tenant recipes will create the tenants, networks, firewall rules, deploy the VM that hosts the storage application, along with provisioning the storage. This will allow Cloudhoster to automatically deploy a Cloud Storage instance from their customer portal using API calls to vergeOS.


## Hardware and Features


### Hardware
For CloudHoster's VergeOS deployment, the following hardware is recommended:


- (4) Storage servers per data center


* Intel Xeon or AMD EPYC Processor, 8c – 16t Processor 3.0 GHz
* 2GB per RAW TB of storage
* (16x) 2.5 or 3.5 in Drive Bays
* (2x) 25 Gbe Ports
* (2x) 10 Gbe Port
* On-Board IPMI
* Redundant Power Supplies


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **Tenant Recipes**: Template for creating new tenant instances with predefined settings and configurations
* **VM Recipes**: Template for creating new virtual machines with predefined settings and configurations
* **OpenID Authentication**: Use existing authentication source
* **Multi-Tenancy**: Secure isolation of customer environments
* **Self-Service Management**: Web-based UI and API for customer resource management
* **High Availability**: Automated fail-over and data protection mechanisms
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots






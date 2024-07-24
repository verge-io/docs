# Edge Cluster Deployments


Organizations that need to manage many locations efficiently can leverage VergeOS in an edge cluster deployment model. This document provides an overview of deploying VergeOS edge clusters using low power, small form factor hardware, outlines the key benefits, and details the different edge cluster configurations available.


## Acme Insurance example


Acme Insurance will be used throughout this document to explain the key concepts and details around an edge cluster deployment. Acme came to Verge.io to simplify their branch office deployments and asked for options that would provide for more resiliency and cost savings.


## What is an Edge Cluster


In the context of VergeOS, an edge cluster refers to a compact, efficient solution designed for managing IT infrastructure at remote or branch locations. A typical VergeOS edge cluster consists of two nodes, which are directly connected for core network functionality. This setup ensures high availability and redundancy. By utilizing low power, small form factor hardware, VergeOS edge clusters are optimized for deployments where space and power efficiency are critical.


<figure markdown="span">
 ![Image title](../assets/2nodeexample.png){ width="300" }
 <figcaption>Typical 2 node Edge cluster</figcaption>
</figure>


## Why You Would Want an Edge Cluster


Edge clusters are essential for organizations with distributed locations due to several key benefits:


* **Resilience and Redundancy**: The two-node configuration ensures that services remain operational during maintenance or a hardware failure. Providing continuous availability and data protection.


* **Cost Efficiency**: Utilizing low power, small form factor hardware reduces energy consumption and physical space requirements, leading to lower operational costs.


* **Simplified Management**: Direct connection between nodes streamlines network configuration and reduces complexity in maintenance, enhancing overall IT efficiency.


* **Enhanced Performance**: Local processing and storage reduce latency, improving the performance of applications and services critical to edge environments.


## **Overview**


VergeOS has a highly adaptable and configurable solution for customers looking to deploy workloads to remote sites. Depending on the solution, a remote site can be centrally managed, provide centralized backup and recovery options, offsite archiving of the centralized backups, and centrally managed VM templates.


Below we will detail several deployment scenarios:


* [Scenario 1](#scenario-1): Centralized management using an edge cluster in the primary site
* [Scenario 2](#scenario-2): Deploy VergeOS cluster in a Primary DC to provide backup and recovery services to branch offices
* [Scenario 3](#scenario-3): Utilize the companies DR site to deploy a VergeOS cluster to provide long term backup storage


## Scenario 1
2 node VergeOS clusters deployed at all sites


## Summary


This deployment allows Acme Insurance IT staff to centrally manage their vm templates and all of their branch office clusters. They will deploy a 2 node edge cluster in their main office as a management cluster.


## When to choose this scenario


* Cost is the driver
* Space or power constraints
* Simplified management
* Applications store data centrally


## Hardware and Features


### Hardware
For Acme Insurance's vergeOS deployment, the following hardware is recommended:


- SFF 1L PC w/dual 2.5GB NIC


   * 2TB NVME (for workloads)
   * 4TB SSD (bulk storage)


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Catalog Repositories**: Centralized management of VM recipes
* **Cloud Snapshots**: Local snapshots for quick recovery of a site
* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source


---


## Scenario 2
2 node VergeOS clusters deployed to each of the 20 branch locations with a UCI VergeOS cluster in their primary data center.


## Summary


This deployment enables Acme Insurance IT staff to provide high resiliency to branch offices while centrally managing VM templates and branch office clusters. They will deploy 2-node edge clusters at branch offices and a 6-node UCI (hyper-converged) cluster in their data center for DR and management.


## When to choose this scenario


* Compliance is a factor
* Colocation or Datacenter space is available
* Business continuity
* Centralized backup and recovery requirements
* RPO/TRO requirements


## Hardware and Features


### Hardware
For Acme Insurance's vergeOS deployment, the following hardware is recommended:


- Intel NUC (or similar) w/dual 2.5GB NIC


   * 2TB NVME (for workloads)
   * 4TB SSD (bulk storage)


For their UCI cluster, the following hardware is recommended:


- Intel Xeon with a base clock speed of at least 3 GHz or Single Socket Equivalent


   * 128GB ECC RAM
   * (8x) 4TB SSD
   * (2x) 10 Gbe Ports
   * (2x) 25 Gbe Ports
   * On Board IPMI
   * Redundant Power Supplies




### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Site Sync**: Cloud Snapshot replication
* **Repair Server (ioGuardian)**: Automatically retrieve missing blocks from remote site
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots
* **Catalog Repositories**: Centralized management of VM recipes
* **Cloud Snapshots**: Local snapshots for quick recovery of a site
* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source


---




## Scenario 3
2 node VergeOS clusters deployed to each of the 20 branch locations with a UCI VergeOS cluster in their primary data center.


## Summary


This deployment enables Acme Insurance IT staff to provide high resiliency to branch offices while centrally managing VM templates and branch office clusters. They will deploy 2-node edge clusters at branch offices and a 6-node UCI (hyper-converged) cluster in their data center for Backups and management, and a 4-node UCI cluster in their DR data center.


## When to choose this scenario


* Compliance is a factor
* Colocation or Datacenter space is available
* Business continuity
* Centralized backup and recovery requirements
* RPO/RTO requirements
* Long retention requirements


## Hardware and Features


### Hardware
For Acme Insurance's vergeOS deployment, the following hardware is recommended:


- Intel NUC (or similar) w/dual 2.5GB NIC


   * 2TB NVME (for workloads)
   * 4TB SSD (bulk storage)


For their Primary UCI cluster, the following hardware is recommended:


- Intel Xeon with a base clock speed of at least 3 GHz


   * 128GB ECC RAM
   * (2x) 240GB NVMe (~3 DWPD)
   * (8x) 4TB SSD
   * (2x) 10 Gbe Ports
   * (2x) 25 Gbe Ports
   * On Board IPMI
   * Redundant Power Supplies


For their Archive UCI cluster, the following hardware is recommended:


- Intel Xeon with a base clock speed of at least 3 GHz


   * 128GB ECC RAM
   * (2x) 240GB NVMe (~3 DWPD)
   * (12x) 8TB HDD
   * (4x) 10 Gbe Ports
   * On Board IPMI
   * Redundant Power Supplies


### VergeOS Features
The deployment will leverage the following VergeOS features:


* **Site Sync**: Cloud Snapshot replication
* **Repair Server (ioGuardian)**: Automatically retrieve missing blocks from remote site
* **Global Inline Deduplication**: Reduces storage consumption by eliminating duplicate data across replicated snapshots
* **Catalog Repositories**: Centralized management of VM recipes
* **Cloud Snapshots**: Local snapshots for quick recovery of a site
* **Sites**: Centralized dashboard for managing all sites, viewing recent logs, and stats
* **OpenID Authentication**: Use existing authentication source








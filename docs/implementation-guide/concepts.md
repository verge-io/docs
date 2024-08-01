# Welcome to the VergeOS Implementation Guide 

## Introduction

Our implementation guide takes through everything you need to get your first deployment of VergeOS up and running. This document provides an overview of the key concepts related to VergeOS's physical infrastructure and network architecture to get you prepared for the rest of our Implementation Guide docs. The next 3 docs walk you through hardware sizing, network design models, and finally our pre-installation checklist. 
<br>

If you have any questions please contact our support department.

## Physical Infrastructure

### Nodes

A node is an individual server running VergeOS. There are several types of nodes:

- **Controller Nodes:** Manage the User Interface, Networking, and vSAN functions. In larger environments, they can be dedicated solely to controller functions.
- **Compute and Storage (HCI) Nodes:** Hyperconverged infrastructure combining storage, compute, networking, and management.
- **Compute-Only Nodes:** Expand compute resources within the VergeOS system.
- **Storage-Only Nodes:** Expand storage resources within the VergeOS system. These must be added in pairs for redundancy.

### Clusters

Clusters are logical groupings of nodes that share similar hardware characteristics. Types include:

- **Compute and Storage (HCI) Clusters:** Nodes provide a unified system of storage, compute, networking, and management.
- **Compute-Only Clusters:** Groups of nodes dedicated to expanding compute resources.
- **Storage-Only Clusters:** Groups of nodes dedicated to expanding storage resources.

## Networks (Physical and Virtual)

VergeOS utilizes several network types for its operations:

### Physical Networks

#### Fabric/Core Network
- Primary network for VergeOS internal communication
- Used for vSAN traffic and node-to-node communication
- Requires jumbo frames (minimum MTU of 9216)
- Typically uses two separate physical networks for redundancy

#### External Network
- Used for communication outside of VergeOS
- Can be configured for site-external or just VergeOS-external communication
- Typically one External network per system, with additional VLANs as needed

#### Management Network (Optional)
- Used for hardware management (IPMI) and scale-out operations
- Can share port functionality with an External network port if supported by hardware

### Virtual Networks

#### Internal Network
- Segregated network inside VergeOS
- Can have its own subnet, router, DHCP, DNS, etc.
- Multiple Internal Networks can exist with the same subnet due to default segregation

#### Core

A core network that VergeOS uses to communicate vSAN traffic, Node to Node communication, VM migrations, etc.

#### DMZ

The DMZ network is a virtual network (created automatically during the VergeOS installation/Tenant creation) as a connection point for all networks. Every VergeOS Cloud has 1 DMZ Network (There is a DMZ network at the physical host level; additionally, each Tenant has a DMZ network.).

## Key Functionalities

### vSAN (Virtual Storage Area Network)
A vSAN instance is a storage solution that pools local storage from a cluster of nodes, providing a shared storage resource for the entire vergeOS system. It ensures high availability and redundancy for data storage.


### Nested Tenancy
This feature allows for multiple levels of tenants within the VergeOS system, enabling complex and secure multi-tenant environments.


### Centralized Management
vergeOS systems can be interconnected to facilitate centralized monitoring, authentication, and management. This interconnected approach also supports snapshot replication and vSAN repair services across multiple systems.


### User Interface (UI)
The VergeOS User Interface provides an accessible and intuitive way to manage all aspects of the virtual data center, including node management, workload deployment, and system monitoring.


### Networking
The networking capabilities of VergeOS include comprehensive support for virtual networking, allowing seamless integration with existing network infrastructure and efficient management of network resources within the virtual data center.


<!-- ## Additional Key Features


### Ultra Converged Infrastructure (UCI)
- **Integration:** Combines virtualization, storage, and networking into a single data center operating system.
- **Efficiency:** Eliminates the virtualization tax by treating storage and networking as equal to the hypervisor.


### Data Resiliency
- **Protection:** Industry-leading data resiliency features to ensure data integrity and protection against failures.


### Scalability
- **Flexibility:** Scales from two nodes to hundreds, and supports mixed workloads from small data centers to large enterprise environments.


### Cost Efficiency
- **Savings:** Reduces physical server requirements by 35% and operational expenses by 70%. Eliminates the need for replacing and migrating storage and network infrastructures.


### Migration and Compatibility
- **VMware Exit:** Provides a seamless and cost-effective alternative to VMware, enhancing performance with existing hardware. VergeOS supports near-real-time replication of VMware virtual machines to a remote disaster recovery site, facilitating easy migration without the need for additional hardware.


### High Availability and Disaster Recovery
- **Reliability:** Built-in features for high availability, backup, and disaster recovery ensure business continuity and data protection. VergeOS uses a holistic approach to disaster recovery by replicating entire virtual data centers (VDC), including VMs, network settings, and storage configurations, simplifying the recovery process.


### Ransomware Resiliency
- **Defense:** Incorporates robust ransomware detection and recovery mechanisms, allowing organizations to restore operations quickly after an attack. VergeOS maintains immutable snapshots and requires two-factor authentication for enhanced security. -->

## Conclusion

Understanding these core concepts of VergeOS's physical infrastructure and network architecture is crucial for successful deployment and management of your virtual data center. This foundation will help you make informed decisions about hardware selection, network setup, and overall system design to maximize the performance and flexibility of your VergeOS environment.




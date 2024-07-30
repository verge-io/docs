# Core Concepts


## Overview
**vergeOS** by Verge.io is a comprehensive operating system tailored for swift deployment of virtual data centers, incorporating nested tenancy functionality. It can be installed and run directly on base hardware or within virtual nodes for tenant usage. A vergeOS system is composed of multiple nodes that deploy workloads across a unified vSAN instance, with the capability to interconnect multiple vergeOS systems for centralized monitoring, authentication, management, and vSAN repair services.


## Core Components






### Nodes
A node is an individual server running vergeOS.


**Node Types:**


 - **Controller Nodes:** Manage the User Interface, Networking, and vSAN functions. In larger environments, they can be dedicated solely to controller functions.
 - **Compute and Storage (HCI):** Hyperconverged infrastructure combining storage, compute, networking, and management.
 - **Compute-Only Nodes:** Expand compute resources within the vergeOS system.
 - **Storage-Only Nodes:** Expand storage resources within the vergeOS system. These must be added in pairs for redundancy.


### Clusters
Logical groupings of nodes that share similar hardware characteristics.


**Types:**


 - **Compute and Storage (HCI):** Nodes provide a unified system of storage, compute, networking, and management.
 - **Compute-Only Clusters:** Groups of nodes dedicated to expanding compute resources.
 - **Storage-Only Clusters:** Groups of nodes dedicated to expanding storage resources.


## Key Functionalities


### vSAN (Virtual Storage Area Network)
A vSAN instance is a storage solution that pools local storage from a cluster of nodes, providing a shared storage resource for the entire vergeOS system. It ensures high availability and redundancy for data storage.


### Nested Tenancy
This feature allows for multiple levels of tenants within the vergeOS system, enabling complex and secure multi-tenant environments.


### Centralized Management
vergeOS systems can be interconnected to facilitate centralized monitoring, authentication, and management. This interconnected approach also supports snapshot replication and vSAN repair services across multiple systems.


### User Interface (UI)
The vergeOS User Interface provides an accessible and intuitive way to manage all aspects of the virtual data center, including node management, workload deployment, and system monitoring.


### Networking
The networking capabilities of vergeOS include comprehensive support for virtual networking, allowing seamless integration with existing network infrastructure and efficient management of network resources within the virtual data center.


## Additional Key Features


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
- **Defense:** Incorporates robust ransomware detection and recovery mechanisms, allowing organizations to restore operations quickly after an attack. VergeOS maintains immutable snapshots and requires two-factor authentication for enhanced security.




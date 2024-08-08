# VergeOS Glossary of Key Terms

## A

### **Authorization Sources**: 
Defines a user management authority (GitLab, Google, OpenID) for a VergeIO cloud, allowing single sign-on experiences for users.

### **Anti-Virus Settings**: 
Configuration options within VergeOS for virus scanning and protection, particularly for NAS volumes.

## C

### **Catalog**: 
A group of related recipes in VergeOS. Catalogs can contain various VM or tenant recipes grouped in a way that makes sense for the organization.

### **Cloud (VergeIO Cloud)**: 
Refers to each autonomous Virtual Data Center (VDC) created within a VergeIO system, including the base level VDC and each subsequent tenant and subtenant.

### **Cloud Snapshots**: 
Point-in-time captures of an entire VergeOS cloud, tenant, individual virtual machine, or NAS volume. Used for recovery, development, and testing purposes.

### **Cluster**: 
A group of nodes (physical or virtual) with like hardware resources, used as a pool for storage, compute, or HCI functions. A single VergeIO system can contain various clusters for different performance/costing options.

### **Compute-Only Cluster**: 
A set of nodes in VergeOS added solely to expand compute resources.

### **Compute-Only Node**: 
A node that expands only the compute resources in a VergeOS system.

### **Controller Node**: 
The first two nodes in a VergeOS system, responsible for handling the User Interface, Networking, and vSAN functions.

### **Core Network**: 
A virtual network used by VergeOS for vSAN traffic, Node to Node communication, VM migrations, and other system-level communications.

## D

### **DMZ Network**: 
A virtual network automatically created during VergeOS installation or Tenant creation, serving as a connection point for all networks.

## E

### **External Network**: 
A network outside of the VergeOS system, such as a company LAN, direct WAN connections, or Wi-Fi networks, that interfaces with VergeOS.

## H

### **Host**: 
Refers to the top-level Virtual Data Center (VDC) created during the initial VergeOS install on physical hardware, with direct control over the hardware.

### **Hyperconverged Infrastructure (HCI)**: 
A software-defined, unified system in VergeOS that combines storage, compute, networking, and management in a single infrastructure.

## I

### **Internal Network**: 
A software-defined layer 3 network deployed inside a VergeOS system or tenant, with its own subnet, router, DHCP, and DNS.

## L

### **Local Volume**: 
A volume stored within the VergeOS vSAN.

## M

### **Maintenance Network**: 
An External network in VergeOS created to handle IPMI access to Physical Nodes and optional PXE boot.

### **Media Images**: 
Files uploaded to the VergeOS vSAN to make them available inside the VergeOS environment, such as VM installation files or imported machine images.

## N

### **Nested Multi-Tenancy**: 
Provides layers of tenancy where tenants can allocate portions of their resources to child tenants, creating a hierarchical structure.

### **Node**: 
A single server running VergeOS. Types include physical nodes (actual hardware servers) and tenant nodes (virtual servers that simulate physical nodes).

## P

### **Physical Network**: 
A collection of NICs across nodes in VergeOS that serve the same purpose.

## R

### **Recipe (Tenant)**: 
A customizable template for creating a new tenant instance in VergeOS, including predefined settings and custom fields.

### **Recipe (VM)**: 
A customizable template for launching new virtual machine instances in VergeOS, including hardware specifications and resource pool specifications.

### **Recipe Consumer**: 
The VergeIO user creating a new tenant or VM instance using a recipe.

### **Remote Volume**: 
A pre-existing (external) NFS or CIFS file system mounted to make it accessible within a VergeOS system.

### **Repair Server**: 
A mechanism in VergeOS for potential reconstruction of a system that experienced a problem beyond its redundancy tolerance.

### **Repository**: 
A site collection of recipe catalogs in VergeOS. Each tenant can create a local repository to store its own recipe catalogs.

## S

### **Scale Out**: 
The process of adding additional Nodes to a VergeOS System.

### **Scale Up**: 
The process of adding additional resources to existing Nodes in a VergeOS System.

### **Site**: 
A VergeOS system with its own physical hardware, typically separated by geographical location.

### **Sites Dashboard**: 
Provides a central page for monitoring and administering multiple VergeOS systems, aggregating top-level statistics from included locations.

### **Snapshot**: 
Captures the state of an entity at a particular point in time, allowing for system rollback.

### **Snapshot Profile**: 
A definition of the schedule for snapshot creation and cleanup in VergeOS.

### **Storage-Only Cluster**: 
A set of nodes in VergeOS added solely to expand storage resources.

### **Storage-Only Node**: 
A node that expands only the storage resources in a VergeOS system.

### **Storage Tiers**: 
A method of storing data on various types of media based on performance, availability, and recovery requirements in VergeOS.

### **Subscriptions**: 
A feature in VergeOS that allows for monitoring a system (or components of a system) by defining system information to send to users via Email.

### **Subscription Profiles**: 
Definitions of the aspects of a subscription in VergeOS, such as on-demand/scheduled and trigger criteria/schedule.

## T

### **Tenant**: 
A complete and separate Virtual Data Center running its own instance of the VergeOS OS, apportioned from a parent VergeOS cloud.

### **Tenant Node**: 
Virtual servers in VergeOS that simulate physical nodes, used within tenants.

## V

### **VergeOS**: 
A complete operating system designed for rapid deployment of complete virtual data centers, with nested tenancy functionality.

### **VergeOS System**: 
A collection of nodes used to deploy workloads across a single vSAN instance in VergeOS.

### **vGPU**: 
A physical GPU installed on a host node that is dissected into multiple virtual GPUs, providing access to multiple VMs simultaneously.

### **Virtual Wire**: 
The equivalent of an uplink between two virtual switches (networks) in VergeOS, used to provide Layer 2 connectivity.

### **Volume**: 
A directory structure/collection of files within a VergeOS NAS. Can be configured with different settings for security, snapshots, tiering, max size, Anti-Virus settings, shares, etc.

### **vSAN**: 
The software-defined storage system used in VergeOS to provide shared storage across nodes.
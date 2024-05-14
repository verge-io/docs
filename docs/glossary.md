# Key Terms

***
### SYSTEM
A vergeOS system is a collection of nodes used to deploye workloads across a common vSAN instance. A single vergeOS system can be made up of 1 or more Clusters and vSAN Storage Tiers. A vergeOS system can be connected to other vergeOS systems for the purposes of centralized montoring, authentication, and management as well as replicating snapshots and vSAN repair service

#### Nodes
A node is a single server running vergeOS. Node names are sequential starting with "node1".

##### Controller
The first two nodes in a vergeOS system are considered the Controller Nodes. These are functions like handling the User Interface, Networking, and VSAN functions. For larger environments, they can be set as dedicated controllers where they only handle controller functions and don't run workloads.

##### Compute and Storage (HCI)
Hyperconverged infrastructure (HCI) is a software-defined, unified system that combines all the elements of a traditional data center: storage, compute, networking, and management.

##### Compute-Only
A compute-only node expands compute resources in vergeOS system. 

##### Storage-Only
A storage-only node expands storage resources in vergeOS system. Storage-only nodes need to be added in like pairs for redundancy.

#### Cluster
Cluster is the term we use for a set of Nodes. Nodes are bound to a cluster set based on like hardware. A cluster can consist of all HCI nodes, a compute-only cluster, or a storage-only cluster. You may also have a separate cluster for different types of hardware, like AMD vs Intel. 

##### Compute and Storage (HCI)
Hyperconverged infrastructure (HCI) is a software-defined, unified system that combines all the elements of a traditional data center: storage, compute, networking, and management.

##### Compute-Only
A Compute-only Cluster is a set of nodes that are added to VergeOS with the sole intention of expanding only compute resources. Placing a VM in a Compute-only Cluster does not mean it doesn't get storage. Storage of a VM is determined by which Tier (1,2,3,4) you choose when setting up the disks.

##### Storage-Only
A Storage-only Cluster is a set of nodes that are added to VergeOS with the sole intention of expanding storage. They can be added to an existing Tier of storage if they have like hardware or added as a new Tier.  

### NETWORKS

#### Core
A core network that VergeOS uses to communicate Core functions like VSAN traffic and Node to Node communication.

#### DMZ
This is a network inside VergeOS that is segregated by default. Each Internal Network can have its own subnet, router, DHCP, DNS, etc. Since Internal Networks are segregated by default, you can have multiple Internal Networks with the same subnet.

#### External
This is the network used for any communication Outside of VergeOS. The word "External" means external to VergeOS and not necessarily external to your site unless configured for it. Typical systems will have one External network. If using VLANs, each VLAN will get its own External Network.

#### Internal
This is a network inside VergeOS that is segregated by default. Each Internal Network can have its own subnet, router, DHCP, DNS, etc. Since Internal Networks are segregated by default, you can have multiple Internal Networks with the same subnet.

#### Physical
A physical network is a collection of NICs across nodes, in a vergeOS system, that serve the same purpose (i.e. Core Network 1). 

### MISC (DON'T KNOW HOW TO ORGANIZE YET)

### Sites
A Site is essentially a single virtual data center with a minimum of 2 Nodes. It consists of multiple nodes and can have multiple clusters. You can have multiple Sites in a single building/rack or at separate locations.

### Tenant
A Tenant is a virtual data center(Site) inside of another site. You can nest tenants inside of tenants. Each Tenant has its own separate user interface and URL.

### IPMI
IPMI (Intelligent Platform Management Interface) is a set of standardized specifications for hardware-based platform management systems that makes it possible to control and monitor servers centrally. Each hardware manufacturer has its own software to handle IPMI (like Dell's iDrac or BMC)

### Storage Tiers
Storage tiering is the method of storing data on various types of media based on performance, availability, and recovery requirements. Utilizing this method significantly reduces storage costs while still meeting necessary data access demands for different workloads.

### Scale Out
Scale Out refers to the process of adding additional Nodes to your VergeOS environment.

### Scale Up
Scale Up refers to the process of adding additional resources to your existing nodes. Things like adding more memory or more drives.

### Virtual Datacenter (VDC)
A VDC is a data center in a box. All components of a standard data center are virtualized into a server(s).

### Repair Server
lorum ipsom  

!!! note "For a more complete Glossary of terms, see the product in-line help within the VergeIO software."
    

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ .md-button }

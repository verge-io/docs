# vergeOS Key Terms

***
vergeOS (by verge.io) is a complete operating system specifically designed for rapid deployment, complete virtual data centers, with nested tenancy functionality. vergeOS is installed/run directly on base hardware as well as within virtual nodes (used for tenants).

A vergeOS system is a collection of nodes used to deploy workloads across a single vSAN instance. A single vergeOS system can be made up of 1 or more Clusters and vSAN Storage Tiers. A vergeOS system can be connected to other vergeOS systems for the purposes of centralized montoring, authentication, and management as well as replicating snapshots and vSAN repair service.

## PHYSICAL

### Nodes
A node is a single server running vergeOS. There are 4 types of nodes in a vergeOS system (controller, compute and storage (HCI), compute-only, and storage-only). Node names are hard-coded and sequential starting with "node1".

#### Controller
The first two nodes in a vergeOS system are considered the Controller Nodes. These are functions like handling the User Interface, Networking, and vSAN functions. For larger environments, they can be set as dedicated controllers where they only handle controller functions and don't run workloads.

#### Compute and Storage (HCI)
Hyperconverged infrastructure (HCI) is a software-defined, unified system that combines all the elements of a traditional data center: storage, compute, networking, and management.

#### Compute-Only
A compute-only node expands compute resources in vergeOS system. 

#### Storage-Only
A storage-only node expands storage resources in vergeOS system. 

!!! note "Storage-only nodes need to be added in like pairs for redundancy."

### Cluster
A cluster is a logical grouping of Nodes that are alike from a hardware perspective.

!!! note "You may also have a separate cluster for different types of hardware, like AMD vs Intel."

#### Compute and Storage (HCI)
Hyperconverged infrastructure (HCI) is a software-defined, unified system that combines all the elements of a traditional data center: storage, compute, networking, and management.

#### Compute-Only
A Compute-only Cluster is a set of nodes that are added to VergeOS with the sole intention of expanding only compute resources. Placing a VM in a Compute-only Cluster does not mean it doesn't get storage. Storage of a VM is determined by which Tier (1,2,3,4) you choose when setting up the disks.

#### Storage-Only
A Storage-only Cluster is a set of nodes that are added to VergeOS with the sole intention of expanding storage. They can be added to an existing Tier of storage if they have like hardware or added as a new Tier.

### Actions

#### Scale Out
Adding additional Nodes to a vergeOS System.

#### Scale Up
Adding additional resources to existing Nodes in a vergeOS System.

------------

## NETWORKS

### Physical Networks

#### Physical
A physical network is a collection of NICs across nodes that serve the same purpose (i.e. Core Network 1). 

#### Maintenance
The maintenance network is an External network that can be created to handle IPMI access to Physical Nodes and optional PXE boot.

#### External
An external network is a layer 3 network deployed OUTSIDE a vergeOS system or tenant. A BGP connection to your Internet provider and a layer 2 VLAN trunked into a vergeOS system are examples of external networks. The management of a vergeOS system will use an external network.

### Virtual Networks

#### Core
A core network that VergeOS uses to communicate vSAN traffic, Node to Node communication, VM migrations, etc.

#### DMZ
The DMZ network is a virtual network (created automatically during the VergeOS installation/Tenant creation) as a connection point for all networks. Every VergeOS Cloud has 1 DMZ Network (There is a DMZ network at the physical host level; additionally, each Tenant has a DMZ network.).

#### Management UI/API (External)
An internal network is a layer 3 network deployed OUTSIDE a vergeOS system or tenant. A BGP connection to your Internet provider and a layer 2 VLAN trunked into a vergeOS system are examples of external networks. The management of a vergeOS system will use an external network.

!!! note "External does not indicate that the network has an direct Internet Connection (although it can be), but rather only External to the vergeOS System."

#### Internal
An internal network is a software-defined layer 3 network deployed INSIDE vergeOS system or tenant. Each internal network has its own subnet, router, DHCP, DNS, etc. Internal networks are fully isoloted containers so you can have multiple internal networks with the same subnet.

#### Virtual Wire
A virtual wire is the equivalent of an uplink between two virtual switches (networks) used to provide Layer 2 connectivity.

------------

## MULTI-TENANCY

### Tenant
A Tenant is a virtual data center(Site) inside of another site. You can nest tenants inside of tenants. Each Tenant has its own separate user interface and URL. Sometimes this is referred to as a Virtual Datacenter (VDC) is a data center in a box. All components of a standard data center are virtualized into a server(s).

### Node (Tenant)
Tenant nodes are virtual servers that simulate physical nodes. Each tenant is assigned at least one tenant node and more tenant nodes can be added for scale and/or to accommodate clustering software such as Kubernetes, Hadoop, etc..

### Recipe (Tenant)
A tenant tecipe is a customizable template for creating a new tenant instance. A tenant recipe can include predefined settings for configuration/resource allocation and can include custom fields to gather input at the time of recipe consumption in order to adjust elements of the resulting tenant instance.

------------

## SYSTEM STUFF?

### Sites
Sites are the way you connect vergeOS systems together. You can have multiple Sites in a single building/rack or at separate physical locations. You connect other vergeOS systems for the purposes of replicating snapshots, centralized monitoring and management, and vSAN Repair Server services.

### Cloud Snapshots
A snapshot captures the state of an entity at a particular point in time. Snapshots can be used to create point-in-time capture of an entire VergeOS cloud, tenant, an individual virtual machine, or a NAS volume. Snapshots allow "rolling back" a system, which can be helpful for recovery, development, and testing purposes.

### Snapshot Profile
A snapshot profile defines a schedule for snapshot creation and cleanup.

### Storage Tiers
Storage tiering is the method of storing data on various types of media based on performance, availability, and recovery requirements. Utilizing this method significantly reduces storage costs while still meeting necessary data access demands for different workloads.

### Repair Server
A repair server provides a potential reconstruction mechanism for a system that experienced a problem extending beyond its redundancy tolerance (e.g. simultaneous, multiple drive failures spanning multiple nodes). Typically, a repair server is a sync destination that contains a fairly recent replication of the given system. A repair server will automatically attempt to pull back any needed blocks from the remote system, potentially avoiding the need to roll back using a snapshot. It is generally recommended to have a repair server in place whenever possible.

### Catalog
A catalog is a group of related recipes. For example, one catalog may contain many varied Windows VM recipes, while another catalog in the same repository could contain all Linux-based VM recipes. Customers can group recipes into catalogs in whatever way makes sense for their particular organization.

### Recipe (VM)
A VM recipe is a customizable template for launching new virtual machine instances. A VM recipe can include initial hardware specifications (e.g. number of cores, RAM, CPU type, drives, NICs, etc). and resource pool specification. Additionally, custom fields can be added to the recipe to gather input at the time of recipe consumption. This data, input by the recipe consumer, can then be utilized to adjust elements within the new VM guest OS; typically at first startup. For example, a recipe can be configured to prompt for a database username and password, or for disk/ram size settings to input into an application conf file. VergeOS VM recipes are compatible with Cloud-Init. See https://cloud-init.io for cloud-init documentation.

### Repository
A repository is a site collection of recipe catalogs. Typically, a tenant has access to a repository provided by its VergeOS service provider. Each tenant can also create a local repository to store its own recipe catalogs.

!!! note "The VergeOS Repository is also included by default on a VergeOS Installation. The VergeOS Repository includes the standard NAS Service VM."

### Subscriptions
Subscriptions allow for monitoring a system (or components of a system) by defining system information to send to users via Email.

### Subscription Profiles
Subscription profiles define the aspects of a subscription (on Demand/Scheduled, trigger criteria/schedule). Many subscription profiles are pre-loaded by default with the VergeOS Install. Additional subscription profiles can also be created.

### Volume
A Volume is a directory structure/collection of files within a VergeOS NAS. A VergeOS NAS can contain one or more Volumes, with each individual Volume allowing different settings for aspects such as security, snapshot, tiering, max size, Anti-Virus settings, shares, etc. Remote Volume - mounts a pre-existing (external) NFS or CIFS file system to make it accessible within a VergeOS system. Local Volume - stored within the VergeOS vSAN.

### Snapshot Profile
A snapshot profile defines a schedule for snapshot creation and cleanup.

### Media Images
Media Images are files uploaded to the VergeOS vSAN to make available inside the VergeOS environment. Common files uploaded are those used for installing new virtual machines (e.g. *.iso) or importing machines or drives from existing systems (e.g. *.ova, *.ovf, *.raw, *.qcow, *.vmdk, etc).

### Volume
A Volume is a directory structure/collection of files within a VergeOS NAS. A VergeOS NAS can contain one or more Volumes, with each individual Volume allowing different settings for aspects such as security, snapshot, tiering, max size, Anti-Virus settings, shares, etc.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

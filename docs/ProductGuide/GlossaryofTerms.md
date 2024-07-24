

# Glossary of Terms

**Authorization Sources**
An Authorization Source defines a user management authority (GibLab, Google, OpenID) for a VergeIO cloud. This allows a single sign-on experience for users as credentials from the defined authorization source can be appointed for users to log in to a VergeIO system.

<br>

**Catalog**
A catalog is a group of related recipes. For example, one catalog may contain many varied Windows VM recipes, while another catalog in the same repository could contain all Linux-based VM recipes. Customers can group recipes into catalogs in whatever way makes sense for their particular organization.

<br>

**Cloud (VergeIO Cloud)**
In VergeIO, "cloud" refers to each autonomous Virtual Data Center (VDC) created within a VergeIO system. This includes the VDC created at the base level (when VergeIO is installed on physical hardware) as well as the VDC that is created with each subsequent tenant and subtenant.

<br>

**Cluster**
A cluster is a group of nodes (physical or virtual) with like hardware resources, used as a pool for storage, compute, or HCI functions. A single VergeIO system can contain a variety of different clusters to provide an array of performance/costing options. The resources of a single cluster can be divided up among multiple tenants and a single tenant can be given resources to multiple clusters within the same system.

<br>

**Host**
Refers to the top-level Virtual Data Center(VDC), aka VergeIO cloud, which is created during the initial VergeIO install on the physical hardware. The Host has direct control over the hardware, whereas tenants/subtentants will have resources assigned to them, but no access to physical components.

<br>

**Media Images**
Media Images are files uploaded to the VergeIO vSAN to make available inside the VergeIO environment. Common files uploaded are those used for installing new virtual machines (e.g. \*.iso) or importing machines or drives from existing systems (e.g. \*.ova, \*.ovf, \*.raw, \*.qcow, \*.vmdk, etc).

<br>

**Nested Multi-Tenancy**
Nested Multi-Tenancy provides layers of tenancy; the host tenant can allocate any portion of its base resources to child tenants and those child tenants can then divide and apportion any of its resources down to its own child tenants, and so on.

<br>

**Network (Core)**
The Core Network is a virtual network used to handle all intra-node communication. Every VergeIO cloud has 1 Core Network, which is created automatically during the VergeIO installation (on the Host) or at the point of tenant creation (for each tenant.)

<br>

**Network (DMZ)**
The DMZ Network is a virtual network used to connect all other networks with the Core Network. Every VergeIO cloud has 1 DMZ Network, which is created automatically during the VergeIO installation (on the Host) or at the point of tenant creation (for each tenant.)

<br>

**Network (External)**
An External Network is a network outside of the VergeIO system; any pre-existing network that will be interfaced with VergeIO (e.g. company LAN, direct WAN connections, Wi-Fi networks). In a VergeIO system, there is typically at least one External Network and there can be multiple External networks. External Networks can be defined during or after VergeIO system installation.


 *Note: External does not necessarily indicate that the network is a direct Internet Connection (although it can be), but rather only External to the VergeIO system.*
 
 <br>

**Network (Internal)**
An Internal Network is a virtual network originated within VergeIO. Any number of Internal Networks can be created. An Internal Network is created default-secure; with built-in VergeIO networking functionality allowing for opening up access between Internal Networks and to External Networks as needed.

<br>

**Network (Maintenance)**
A Maintenance Network is an External network that can be created to handle IPMI access to Physical nodes and optional PXE boot.

<br>

**Node (Physical)**
Physical nodes are actual hardware servers that host the base VergeIO cloud.

<br>

**Node (Tenant)**
Tenant nodes are virtual servers that simulate physical nodes. Each tenant is assigned at least one tenant node and more tenant nodes can be added for scale and/or to accommodate clustering software such as Kubernetes, Hadoop, etc..

<br>

**Recipe (VM)**
A VM recipe is a customizable template for launching new virtual machine instances. A VM recipe can include initial hardware specifications (e.g. number of cores, RAM, CPU type, drives, NICs, etc). and resource pool specification. Additionally, custom fields can be added to the recipe to gather input at the time of recipe consumption. This data, input by the recipe consumer, can then be utilized to adjust elements within the new VM guest OS; typically at first startup. For example, a recipe can be configured to prompt for a database username and password, or for disk/ram size settings to input into an application conf file. VergeIO VM recipes are compatible with Cloud-Init. See [https://cloud-init.io](https://cloud-init.io/) for cloud-init documentation.

<br>

**Recipe (Tenant)**
A tenant tecipe is a customizable template for creating a new tenant instance. A tenant recipe can include predefined settings for configuration/resource allocation and can include custom fields to gather input at the time of recipe consumption in order to adjust elements of the resulting tenant instance.

<br>

**Recipe Consumer**
The recipe consumer is the vergeIO user creating a new tenant or VM instance using a recipe.

<br>


**Repair Server**
A repair server provides a potential reconstruction mechanism for a system that experienced a problem extending beyond its redundancy tolerance (e.g. simultaneous, multiple drive failures spanning multiple nodes). Typically, a repair server is a sync destination that contains a fairly recent replication of the given system. A repair server will automatically attempt to pull back any needed blocks from the remote system, potentially avoiding the need to roll back using a snapshot. It is generally recommended to have a repair server in place whenever possible.


<br>

**Repository**
A repository is a site collection of recipe catalogs. Typically, a tenant has access to a repository provided by its VergeIO service provider. Each tenant can also create a local repository to store its own recipe catalogs.

*The vergeIO Repository is also included by default on a VergeIO Installation. The VergeIO Repository includes the standard NAS Service VM.*

<br>

**Site**
A site is a VergeIO system with its own physical hardware. Typically VergeIO sites are separated by geographical location. Multiple sites can be synchronized to allow for robust disaster recovery/business continuity options.

<br>

**Sites Dashboard**
The Sites Dashboard provides a central page for monitoring and administering multiple systems.  Top-level statistics from included locations are aggregated to a single screen, with drill-down options to access individual sites and view more detailed information.  

<br>

**Snapshot**
A snapshot captures the state of an entity at a particular point in time. Snapshots can be used to create point-in-time capture of an entire VergeIO cloud, tenant, an individual virtual machine, or a NAS volume. Snapshots allow "rolling back" a system, which can be helpful for recovery, development, and testing purposes.

<br>

**Snapshot Profile**
A snapshot profile defines a schedule for snapshot creation and cleanup.

<br>

**Storage Tier**
A Storage Tier is a pool of storage with equivalent underlying physical storage devices. Storage Tiering is a feature built into the VergeIO vSAN, allowing splitting data between different types of physical media based on requirements for performance, accessibility, capacity, and cost. Storage tiering can dramatically reduce costs by taking better advantage of more expensive disks where most needed while using less expensive (e.g. spinning disk) for cold storage, like archives, etc. See [**vSAN Tiers**](/public/ProductGuide/storagetiers) for a description of standard Storage Tiers.

<br>

**Subscriptions**
Subscriptions allow for monitoring a system (or components of a system) by defining system information to send to users via Email.

-   Subscriptions with the **On Demand** type send alerts triggered by warnings, errors, or thresholds.
-   Subscriptions with the **Scheduled** type send reporting information at regularly scheduled intervals (e.g. hourly, daily, weekly, etc).

<br>

**Subscription Profiles**
Subscription profiles define the aspects of a subscription (on Demand/Scheduled, trigger criteria/schedule). Many subscription profiles are pre-loaded by default with the VergeIO Install. Additional subscription profiles can also be created.

<br>

**Tenant**
A tenant is a complete and separate Virtual Data Center, running its own instance of the VergeIO OS. Child tenants are apportioned from a parent VergeIO cloud. The nested, multi-tenancy infrastructure allows each VergeIO cloud to subdivide any portion of its resources to provide multiple, sub-divisions of resources. Each tenant is a complete VergeIO cloud with its own storage, networking, and security. Tenants are isolated from each other, with each autonomously managed. This provides the mechanism for service providers or IT departments to allocate and administer resources dynamically, keeping autonomous units for different customers/business groups.

<br>


**VergeOS**
The VergeIO Operating System (Verge OS) is a complete operating system specifically designed for rapidly deployed, complete virtual data centers, with nested tenancy functionality. Verge OS is installed/run directly on base hardware as well as within virtual nodes (used for tenants).

<br>

**vGPU**
A vGPU is a physical GPU installed on a host node that is dissected into multiple virtual GPUs. vGPU provides access to multiple VMs simultaneously from a single piece of GPU hardware.

<br>

**Volume**
A Volume is a directory structure/collection of files within a VergeIO NAS. A VergeIO NAS can contain one or more Volumes, with each individual Volume allowing different settings for aspects such as security, snapshot, tiering, max size, Anti-Virus settings, shares, etc.

-    Remote Volume - mounts a pre-existing (external) NFS or CIFS file system to make it accessible within a VergeIO system.
-   Local Volume - stored within the VergeIO vSAN

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

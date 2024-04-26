### Cluster:
A **Cluster** is a minimum of 2 nodes containing like hardware and architecture. A cluster can consist of all HCI nodes, a compute-only cluster, or a storage-only cluster. You may also have a separate cluster for different types of hardware, i.e. AMD vs Intel. 
<br>

### Node:
A **Node** is a single server running VergeOS. 
<br>

### Controller Nodes:
In any VergeOS Site, the first two nodes (node1 and node2) are considered the Controller nodes. They handle the controller functions of VergeOS. These are functions like handling the User Interface, Networking, and VSAN functions. For larger environments, they can be set as dedicated controllers where they only handle controller functions and don't run workloads.  
<br>

### IPMI:
**IPMI** (Intelligent Platform Management Interface) is a set of standardized specifications for hardware-based platform management systems that makes it possible to control and monitor servers centrally. Each hardware manufacturer has its own software to handle IPMI (like Dell's iDrac or BMC)
<br>

### Storage Tiers:
Storage tiering is the method of storing data on various types of media based on performance, availability, and recovery requirements. Utilizing this method significantly reduces storage costs while still meeting necessary data access demands for different workloads.

<br>

### Compute-only Cluster:
A **Compute-only Cluster** is a set of nodes that are added to VergeOS with the sole intention of expanding only compute resources like RAM and/or Cores. Placing a VM in a **Compute-only Cluster** does not mean it doesn't get storage. Storage of a VM is determined by which Tier (1,2,3,4) you choose when setting up the disks. 
<br>

### Storage-only Cluster:
A **Storage-only Cluster** is a set of nodes that are added to VergeOS with the sole intention of expanding storage. They can be added to an existing Tier of storage if they have like hardware or added as a new Tier. 

<br>


!!! note "Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>"


<br>
[🚗 Take a Test Drive Today!](https://www.verge.io/test-drive){ .md-button .md-button--primary }


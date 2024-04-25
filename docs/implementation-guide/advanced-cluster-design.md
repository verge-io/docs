VergeIO cluster designs come in three basic archetypes: **Hyperconverged**, **Compute** and **Storage**. The solution allows customers to mix and match clusters within the same physical environment.

This guide illustrates reference builds for the three basic cluster types with examples of varying design considerations for each. You can install VergeIO on any of these platforms. These examples are derived from multiple OEMs and are provided for reference only.

<figure markdown="span">
  ![4 node cluster](../assets/4uscaleout.png){ width="300" }
  <figcaption>An example of an advanced 4 node cluster.</figcaption>
</figure>

<br>

### Hyperconverged Cluster

Hyperconverged Clusters consist of nodes with **both compute and storage resources that are presented as usable resources in the VergeIO interface**. Hyperconverged clusters typically fall into three different builds: **Edge Cluster**, **Performance Cluster**, and **High-Performance Cluster**.

### Edge Cluster

An Edge cluster is typically deployed at offices or remote facilities. **Edge Clusters are two-node systems that offer limited compute and storage resources.** Oftentimes, Edge Clusters are used in conjunction with offsite resources.

**Example Workload: Virtual Datacenter for Single Office**
- Domain controller
- File server (NAS)
- Print servers
- Virtual PBX Server
- Low-intensity app servers

**Example Edge Hyperconverged Hardware:** 
-   Intel Xeon or AMD EPYC Processor, 4c – 8t Processor 1.8 GHz
-   64 GB ECC Ram 
-   (2x) 2.5in or 3.5in Drive Bays
-   (2x) 10 Gbe Ports
-   (2x) 1 Gbe Port 
-   On-Board IPMI
-   Redundant Power Supplies
<br>

#### Performance Cluster

**Performance clusters are designed to scale out to house multiple-tenant workloads.** Hardware configurations in Performance Clusters are built around **mid range performance storage** and a **memory-to-core ratio ranging from 4-1/8-1**. 

**Example Workload: Multiple Production Virtual Datacenters**
-   Medium Intensity Databases
-   Web Servers

**Example Performance Hyperconverged Hardware:** 
-   1u Chassis
-   Intel Xeon or AMD EPYC Processor, Dual 8c – 16t Processor 2.2 GHz or Single Socket Equivalent 
-   128 GB ECC Ram
-   (8x) 2.5 in Drive Bays
-   (2x) 10 Gbe Ports
-   (2x) 1 Gbe Port
-   On Board IPMI
-   Redundant Power Supplies
<br>

#### High Performance Cluster

High Performance Clusters are designed to be scale-out systems that house intense compute processes and high IO-demand environments. Hardware configurations for High Performance Clusters are built around **high performance storage (SSD or NVMe)** and a **memory-to-core ratio of 8-1/16-1**.

**Example Workload: High Amount of Virtual Data Centers with Intense Workloads**

-   High intensity databases
-   High traffic web servers
-   RDS server farms
-   VDI/Desktop as a service (DaaS) environments 

**Example High Performance Hyperconverged Hardware**
-   1u Chassis
-   Intel Xeon or AMD EPYC Processor, Dual 16c – 32t Processor 2.2 GHz or Single Socket Equivalent
-   256 GB ECC Ram
-   (8x) 2.5 in Drive Bays
-   (2x) 25 Gbe Ports (or greater)
-   (2x) 1 Gbe Port
-   On Board IPMI
-   Redundant Power Supplies
<br>

### Compute Cluster
Compute clusters are sets of nodes that participate only in providing compute-based resources.  These nodes can have storage-for-boot exclusively (recommended), or can be booted by PXE network. Compute resources are typically categorized by their CPU make (Intel, AMD), model, and generation.

**Example Intel Compute Nodes**

-   Intel Xeon Scalable Gen 2 processor(s)
-   (1x) 2.5 or 3.5 in Drive Bays for boot only (or PXE Boot)
-   (2x) 10 Gbe Ports (or greater)
-   (2x) 1 Gbe Port
-   On-Board IPMI
-   Redundant Power Supplies

**Example AMD Compute Nodes**

-   AMD Epyc processor(s)
-   (1x) 2.5 or 3.5 in Drive Bays for boot only (or PXE Boot)
-   (2x) 10 Gbe Ports (or greater) 
-   (2x) 1 Gbe Port
-   On-Board IPMI
-   Redundant Power Supplies 
<br>

### Storage Cluster

**Storage clusters** are groups of nodes that participate only in the VergeIO virtual storage area network (VSAN). Storage clusters make scaling out an existing storage tier, or adding additional storage tiers completely independent of compute resources. **They also are useful for secondary storage for long term backup retention**. 

**Example Production Storage Nodes**

-   1u, 2u, or 4u Chassis
-   Intel Xeon or AMD EPYC Processor, 8c – 16t Processor 3.0 GHz
-   Minimum RAM GB = 1.5GB times the total RAW storage in the node
-   (2x) 2.5 or 3.5 in Drive Bays per storage tier
-   (2x) 10 Gbe Ports (or greater) 
-   (2x) 1 Gbe Port 
-   On-Board IPMI
-   Redundant Power Supplies

**Example Archive Storage Nodes**

-   1u, 2u, or 4u Chassis
-   Intel Xeon or AMD EPYC Processor, 8c – 16t Processor 3.0 GHz 
-   Minimum RAM GB = 1.5GB times the total RAW storage in the node
-   (2x) 2.5 or 3.5 in Drive Bays per storage tier
-   (2x) 10 Gbe Ports (or greater) 
-   (2x) 1 Gbe Port 
-   On-Board IPMI
-   Redundant Power Supplies

> Archive Storage Node intended for cold storage only, not for active workloads
{.is-info}

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<div style="text-align: center">
  <a href="../implementation/main"><button class="button-grey"><b>↺</b> Back to Implementation</button></a>
  <a href="../implementation/1-2"><button class="button-grey"><b>◄</b> To Previous Module</button></a>
  <a href="../implementation/1-4"><button class="button-grey">To Next Module <b>►</b></button></a>
<br>
<br>
<div style="text-align:center">
  <a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today! </button></a>
</div>

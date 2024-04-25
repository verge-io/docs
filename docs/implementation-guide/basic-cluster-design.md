# Basic Cluster Design
***
VergeIO systems are divided into clusters. Clusters are pools of hardware resources (nodes) that are presented as usable resources in the VergeIO user interface. VergeIO systems can be built using multiple cluster types, giving users the ability to mix and match resource types such as processor architecture or disk tier.

## Basic Requirements
***
All clusters have three basic system design requirements.

1. Each cluster requires at least two nodes to maintain system redundancy.
2. The first two nodes in a system must have a storage tier dedicated to VergeIO metadata (Tier 0)

3. Clusters are designed to be scaled out, as additional nodes can be added later.
Storage tiers can be scaled up by adding disks to existing nodes or scaled out by adding additional nodes. Each node that participates in the scaling storage tier must receive the same number of added disks at the same time.

!!! note "Only the first two nodes in the first cluster require dedicated Tier 0 storage."

## Cluster Example 2 node system
***
Below is an example of a 2 node setup and corresponding hardware specs. For information on minimum requirements visit the Requirements Guide.

| Example Node 1 Hardware | Example Node 2 Hardware |
|------------------------|------------------------|
| 1U – 8x SATA/SAS + 2x NVMe Chassis | 1U – 8x SATA/SAS + 2x NVMe Chassis |
| Intel Xeon or AMD EPYC Processor | Intel Xeon or AMD EPYC Processor |
| (8x) 32GB DDR4 ECC RDIMM | (8x) 32GB DDR4 ECC RDIMM |
| (2x) 800 GB U.2 PCIe NVMe | (2x) 800 GB U.2 PCIe NVMe |
| (4x) 3.84TB 2.5” SATA 6.0Gb/SSD | (4x) 3.84TB 2.5” SATA 6.0Gb/SSD |
| 25-Gigabit Ethernet Adapter (2x SFP28) | 25-Gigabit Ethernet Adapter (2x SFP28) |
| 10-Gigabit Ethernet Network Adapter (2x RJ45) | 10-Gigabit Ethernet Network Adapter (2x RJ45) |
| On-Board IPMI | On-Board IPMI |
| On-Board Dual 1 GBE Port | On-Board Dual 1 GBE Port |
| Redundant Power Supplies | Redundant Power Supplies |

## Example Networking
***

![Image title](../assets/2nodeexample.png)


## Cross-Connect - Edge/Basic 2 node setup
***
In a 2 node configuration, cross-connecting the nodes is the quickest/easiest way to setup the core network. Both Core Networks are used for the VSAN HA redudancy and load balancing the storage network. In the example above, you can see the nodes are cross connected with each other on the 10/25GB ports.

!!! warning "Cross-Connect is great for small, edge, or proof of concept deployments. If you plan to expand to more nodes later it is recommended to use switches for the Core Network instead"

### Example Networking Requirements

- **Fabric/Core Network:** 2x – 10Gb or greater (Recommended for NVME-based storage of 25Gb or greater)
- **External Network:** 2x 1Gb or greater
- **IPMI (Management):** 1x 1Gb or greater
- **PXE (Management):** Network: 1x 1Gb or greater

### Example Cluster Scale-Out 

When **Scaling out** a cluster you can add a minimum of 1 additional node at a time.


**Additional nodes beyond the first two nodes** in a system **do not require Tier 0** storage.

<br>


![VergeIO Cluster Example](../assets/1u.png){align=left}

| **Example Scale Out Nodes** |
|------------------------|
| 1U – 8x SATA/SAS + 2x NVMe Chassis |
| Intel Xeon or AMD EPYC Processor |
| (8x) 32GB DDR4 ECC RDIMM |
| ~~**(2x) 800 GB PCIe NVMe**~~ ***(Not Used)*** |
| (4x) 3.84TB SATA 6.0Gb/SSD |
| 25-Gigabit Ethernet Adapter (2x SFP28) |
| 10-Gigabit Ethernet Network (2x RJ45) |
| On-Board IPMI |
| On-Board Dual 1 GBE Port |
| Redundant Power Supplies |

<br>


### Example Cluster Scale-Up
![VergeIO Cluster Example](../assets/3.png)

**Scale-Up Example:**

The chassis has 4 available drive bays for additional SSDs.

-   1U – 8x SATA/SAS + 2x NVMe Chassis
-   **(4x) 3.84TB SATA 6.0Gb/s SSD**

**All** nodes will have **4 additional drives added** thus expanding the available tier space in the cluster.

**No downtime** is required for this operation. Data on the storage tier will rebalance automatically as a background process.

!!! warning "When adding more drives to an existing tier ensure that the drives are the same endurance and size as the existing drives in that tier"

<br>

### Additional Requirements
For more detailed cluster designs visit the [Advanced Cluster Design Module](advanced-cluster-design.md).

<br>

!!! note "Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>"

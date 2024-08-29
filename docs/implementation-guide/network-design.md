# Network Design Models

Please review the [core concepts](concepts.md) first to learn more about VergeOS Network types before reviewing this document.

!!! note "The following network models are designed for redundancy"

## Generic Requirements (All network design models)

- For environments with more than 2 nodes, switches are required for Core Fabric Networks
- Jumbo Frames configured on all Core Fabric Network switchports

    * Minimum MTU size 9000
    * Recommended MTU size of **9192** and above

- Core Fabric Networks 1 and 2 on their **own** dedicated layer 2 networks
- VergeOS Systems located in the same site need to be completely isolated from eachother

## Layer 2 Static + Dedicated Core Fabric

This model uses a bonded Layer 2 network for the External, UI and API Management Networks, while maintaining dedicated Layer 2 networks for the Core Fabric traffic.

### Use Cases

- High performance production environments
- Existing VMware environments using a Distributed Switch
- Environments where you want to deploy VMs directly in VLANs that are External to VergeOS

### Requirements

- 4 x 10/25/40/100GbE NICs
- Switching infrastructure that supports stacking (MLAG) - For External Network

### Network Configuration

- 4 VergeOS Physical Networks:

    * Core Fabric Network 1
    * Core Fabric Network 2
    * External Network 1 - Primary bond
    * External Network 2 - Secondary bond

- Core Fabric Networks 1 and 2 on their **own** dedicated layer 2 networks
- A single VLAN for UI/API Management (on primary bonded External Network)
- Any other VLANs required for your workloads (on primary bonded External Network)

### Diagram

![Layer 2 Bonded + Dedicated Core](/docs/assets/layer2bonded-dc.png)

## Layer 3 Dynamic + Dedicated Core Fabric

This model uses dynamically advertised Layer 3 networks for the External, UI and API Management Networks, while maintaining dedicated Layer 2 networks for the Core Fabric traffic.

### Use Cases for L3+DC

- High performance production environments
- Large-scale deployments
- Environments requiring advanced network segmentation

### Requirements

- 4 x 10/25/40/100Gb network adapters
- A layer 3 network External to the System that VergeOS can peer with
- BGP, OSPF, or EIGRP capabilities
- Using VergeOS Internal Networks for workloads

### Network Configuration

- 4 VergeOS Physical Networks:

    * Core Fabric Network 1
    * Core Fabric Network 2
    * External Network 1
    * External Network 2

- Core Fabric Networks 1 and 2 on their **own** dedicated layer 2 networks
- A single dynamically advertised network for UI/API Management
- Any other dynamically advertised networks required for your workloads

### Diagram

![Layer 3 Bonded + Dedicated Core](/docs/assets/layer3dynamic.png)

## Layer 3 Static + Dedicated Core Fabric

This model uses a bonded Layer 3 network for the External, UI and API Management Networks, while maintaining dedicated Layer 2 networks for the Core Fabric traffic.

### Use Cases for L3+DC

- High performance production environments
- Large-scale deployments
- Environments requiring advanced network segmentation

### Requirements

- 4 x 10/25/40/100Gb network adapters
- Switching infrastructure that supports stacking (MLAG) - For External Network
- Layer 3 capable switching infrastructure for the External network
- Using VergeOS Internal Networks for workloads

### Network Configuration

- 4 VergeOS Physical Networks:

    * Core Fabric Network 1
    * Core Fabric Network 2
    * External Network 1 - Primary bond
    * External Network 2 - Secondary bond

- Core Fabric Networks 1 and 2 on their **own** dedicated layer 2 networks
- A single statically routed network for UI/API Management
- Any other statically routed networks required for your workloads

### Diagram

![Layer 3 Bonded + Dedicated Core](/docs/assets/layer3bonded-dc.png)

## Layer 2 Static using 2 NICs

In this model, all networks (Core Fabric, External/Management, Workloads) are combined into a single bonded network VergeOS Physical Network.

### Use Cases - 2 NICs

- Proof of concepts
- Small Edge deployments
- Disaster recovery setups
- Development workloads
- Bare Metal Cloud Providers

!!! note "Each statically assigned network you route to VergeOS in this system design will be non-redunant"

### Requirements - 2 NICs

- 2 x 10/25/40/100GbE network adapters
- Ability to trunk VLANs and set a native VLAN on switch

### Network Configuration - 2 NICs

- 2 Physical Networks

    * Core Fabric Network 1
    * Core Fabric Network 2

- All networks VLAN tagged
- Core Network VLANs set as native
- A single VLAN for UI/API Management (Either Core Fabric Network)
- Any other VLANs required for your workloads (Either Core Fabric Network)

### Diagram - 2 NICs

![Layer 2 Bonded](/docs/assets/2nic.png)

By choosing the appropriate network design model based on your specific use case and requirements, you can ensure optimal performance and scalability for your VergeOS deployment.

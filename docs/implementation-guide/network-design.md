# Network Design Models

Please review our <a href="/docs/implementation-guide/concepts/">Concepts</a> doc first to learn more about VergeOS Network types before reviewing this document.

!!! note "The following designs all reflect fully redundant environments from a networking perspective"

## Layer 2 Bonded

### Overview
In this model, all virtual networks (Core Fabric, External/Management, Workloads) are combined into a single bonded network VergeOS Physical Network.

### Use Cases
- Proof of concepts
- Edge deployments
- Disaster recovery setups
- Normal production workloads

### Requirements
- 2 x 10/25/100Gb network adapters
- 9216 MTU configured on all switchports
- Ability to trunk VLANs and set a native VLAN on switch 
- Switching infrastructure that supports stacking (MLAG)

### Network Configuration
- All networks VLAN tagged
- Core Fabric VLAN set as native
- 1 VergeOS Physical Network (Bonded)
- VLAN X - Core (Fabric)
- VLAN Y - External/Management
- Any other VLANs required for your workloads

## Layer 2 Bonded External + Dedicated Core Fabric

### Overview
This model uses Layer 2 for the External/Management network while maintaining a dedicated Layer 2 network for the Core (Fabric) traffic.

### Use Cases
- High performance production environments
- Environments requiring advanced network segmentation

### Requirements
- 4 x 10/25/100Gb network adapters
- 9216 MTU configured on all switchports
- Ability to trunk VLANs and set a native VLAN on switch 
- Switching infrastructure that supports stacking (MLAG)
- Nodes belonging to a system need their own dedicated native VLAN to prevent crosstalk with other systems

> !!! note "The Core Fabric Networks for Two Node VergeOS systems may be cross-connected"

### Network Configuration
- 3 VergeOS Physical Networks:
  1. Core Fabric Network 1
  2. Core Fabric Network 2
  3. Bonded Physical Network for External/Management traffic
- Core Fabrics (on dedicated VLAN or dedicated switching infrastructure)
- Core Fabrics isolated from eachother and rest of client network
- VLAN Y - External/Management (on bonded network)
- Any other VLANs required for your workloads (on bonded network)

## Layer 3 Bonded External + Dedicated Core Fabric

### Overview
This model uses Layer 3 routing for the External network while maintaining a dedicated Layer 2 network for the Core (Fabric) traffic.

### Use Cases
- High performance production environments
- Large-scale deployments
- Environments requiring advanced network segmentation

### Requirements
- 4 x 10/25/100Gb network adapters
- 9216 MTU configured on all switchports
- Layer 3 capable switches for the External network
- Two separate physical networks for system redundancy
- Switching infrastructure that supports stacking (MLAG)
- Nodes belonging to a system need their own dedicated network segment to prevent crosstalk with other systems

> !!! note "The Core Fabric Networks for Two Node VergeOS systems may be cross-connected"

### Network Configuration
- Two separate physical networks:
  1. Dedicated Layer 2 Core (Fabric) network
  2. Layer 3 routed network for External traffic
- Core 1 and Core 2 - Dedicated Layer 2 networks for Fabric traffic
- VLAN Y - External (Layer 3 routed)
- VLAN Z - Workloads (Layer 3 routed)

### Diagram

![](/docs/assets/layer3bonded.png)

## Additional Considerations

!!! info "I don't know what to put here yet"

By choosing the appropriate network design model based on your specific use case and requirements, you can ensure optimal performance and scalability for your VergeOS deployment.

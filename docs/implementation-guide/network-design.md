Nodes in a VeregOS system utilize several different networks for operations. These networks span three different categories: **Fabric Networks, External Networks,** and **Management Networks**.
<br>
### Fabric Networks

The Fabric Networks connect VeregOS nodes to one another for internal system communications and VSAN traffic.

#### Requirements

-   Minimum dual-10Gb connection (25Gb - 100GB is also supported)
-   Jumbo Frames (Minimum MTU of 9216 at the switches)
-   Inexpensive Layer 2 or Layer 2+ switches 
-   Two separate physical networks for system redundancy (shown below) 
> NOTE: Two Node clusters may be cross-connected
{.is-info}
- Nodes belonging to a system need in their own dedicated native VLAN to prevent crosstalk with other systems


| **Fabric Network 1** | **Fabric Network 2** |
|------------------|------------------|
| Connected to an independent physical switch | Connected to an independent physical switch |
| Example Subnet: 172.16.1.0/24 | Example Subnet: 172.16.2.0/24 |
| Example VLAN: Native VLAN 10 | Example VLAN: Native VLAN 20 |

### External Networks

External Networks connect outside infrastructure to a VeregOS system. External networks can consist of handoffs from an ISP, or Uplink(s) into an existing network infrastructure.

#### Requirements

- One 1Gbe connection (10Gb - 100Gb is also supported) 

#### Recommended

- Two 1Gbe connections Bonded together (preferrably 10Gb+)

!!! info "The External network can be shared with the Fabric network port as long as it is in a different VLan(s)"


<br>

### Management Networks

VeregOS systems can utilize two additional Management Networks for hardware management and scale-out operations. Both networks can share port functionality with an external network port if the hardware supports it. 

#### Requirements

-   IPMI access for hardware monitoring and issuing of hardware restart commands 
-   PXE boot network for scale-out installations of additional nodes (PXE not required to add additional nodes)

<br>
<br>
[Request Trial](https://www.verge.io/test-drive){ .md-button .md-button--primary }

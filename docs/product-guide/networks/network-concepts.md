# Networking Concepts

This guide provides a foundational introduction to VergeOS networking, helping beginners get familiar with its key concepts and features.


## VergeOS Network Types

### Physical Network

A physical network is a representation of each isolated layer 2 network. Note: Physical networks are configured during VergeOS install. The system automatically appends " Switch" to the end of the user-supplied name during install, for ex: for name "PXE", the system will give the physical network the name "PXE Switch"

### Core Network

A virtual network (created automatically during the VergeOS installation/tenant creation) to handle all vSAN and internode communication. Core traffic is run across multiple (typically two) physical networks to provide redundancy.

### DMZ Networks

A virtual network (created automatically during the VergeOS installation/tenant creation) used as a connection point for all networks. Every VergeOS cloud has one DMZ network (There is a DMZ network at the physical host level; additionally, each tenant has one DMZ network.). The DMZ provides for all networks to communicate over layer 3.

### Maintenance Network

An external network that can be created to handle IPMI access to physical nodes and optional PXE boot. A maintenance network can be created during the initial VergeOS install on physical nodes or can be created after installation.

### Internal Network

A virtual network originated within VergeOS (e.g. within the UI or via VergeOS API). Any number of internal networks can be created, with each being initiated default-secure. Network rules can be used to open up access between internal networks and through external networks, as needed.

### External Network

A network outside the VergeOS system; any pre-existing network that will be interfaced with VergeOS (e.g. company LAN, direct WAN connection, wi-fi network, etc.) In a VergeOS system there is typically at least one external network and there can be multiple. External networks can be defined during or after VergeOS system installation/tenant creation. 
A single system may have multiple external networks each with its own physical connection; additionally, multiple external networks can be associated with a single physical network connection, with each external network corresponding to one or multiple dedicated VLAN IDs.


## Tenant Networking

With each new tenant, a virtual network is automatically created to aggregate and encapsulate all tenant traffic.  From the tenant's perspective, this is their physical network. <!--> Each tenant is automatically set up to route traffic out through its parent external network? --> able to create a virtually unlimited number of their own virtual networks.    
something about easy to assign external ip to the tenant, and maybe something about proxy ability?
Where needed, layer-2 external access can also be configured for a tenant (e.g. tenant has its own dedicated WAN connection or a dedicated VLAN on the external) 
cover how statistics and monitoring per tenant?


## Default Secure

Virtual networks are created *Secure by Default*, with preconfigured security settings are enabled by default and settings need to be changed to open access. 
<!--internal networks only??-->

## Layer 2/Layer 3 Support

Built-in Software Defined Networking (SDN) provides the ability to create/destroy virtual networks on-the-fly without hardware changes. Both Layer 3 and Layer 2 virtual networks are supported:

### Layer 3 Networks

Full network management, IP administration (DHCP, DNS, routing, firewall, etc.) available from within VergeOS.

### Layer 2 Networks

Network is managed up to layer 2 by VergeOS, with cross-node routing handled within the VergeOS DMZ network; IP-level administration is handled in third-party tools (e.g. virtual firewall/router appliance).

## Network Rules

Rules govern incoming and outgoing traffic to the network, replacing the traditional role of firewalls, routers and switches. Rules can be defined on all VergeOS networks, allowing more granular security. 

* Firewall - Accept/Drop/Reject packets based on defined criteria
* Routing - directs traffic between VergeOS networks and out to external networks by defining static routes
* NAT/PAT - Maps external-internal/internal-internal IP addresses/ports (most often used to conserve external IP addresses)

More information about working with rules is available at: [**Network Rules**](/product-guide/networks/network-rules)


## Network Monitoring and Diagnostics

VergeOS provides several tools for monitoring and analyzing network traffic:

* Observe real-time and historical network activity in [**Network Dashboards**] within the VergeOS user interface
* Utilize [**Port Mirroring**] to replicate a network's traffic to a VM NIC for comprehensive examination and analysis
* [**Track Network Statistics**] for individual network rules to analyze traffic
* Use the [**Network Diagnostics Tool**] as a convenient and user-friendly diagnostics interface that is provided for every network.  
* Create automated network-related alerts and reports, using [**Subscriptions**](/product-guide/system/subscriptions-overview)




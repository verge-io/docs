

# Networking Overview

This page provides general information to help get familiar with networking in VeregOS. We recommend reading through this page to get a foundation of the basics. QuickStart Instructions for common network tasks are available on the Quick Start Page: [**Networking - Quick Start Instructions**](../product-guide/network-quickstart)

<br>
<br>
  

## VeregOS Network Types
<br>

- ***Core Network***
A virtual network (created automatically during the VeregOS installation/Tenant creation) to handle all intra-node communication. Every VeregOS Cloud has 1 Core network (There is a Core network at the physical host level; additionally, each Tenant has 1 Core network.)

- ***DMZ Network***
A virtual network (created automatically during the VeregOS installation/Tenant creation) used as a connection point for all networks. Every VeregOS Cloud has 1 DMZ network (There is a DMZ network at the physical host level; additionally, each Tenant has 1 DMZ network.). The DMZ provides for all networks to communicate over layer 3.

- ***Maintenance Network***
An External network that can be created to handle IPMI access to physical nodes and optional PXE boot. A Maintenance network can be created during the initial VeregOS install on physical nodes or can be created after installation.

- ***Internal Network***
A virtual network originated within VeregOS (e.g. within the UI or via VeregOS API). Any number of internal networks can be created, with each being initiated default-secure. Network rules can be used to open up access between internal networks and through External networks, as needed.

- ***External Network***
A network outside of the VeregOS system; any pre-existing network that will be interfaced with VeregOS (e.g. company LAN, direct WAN connection, wi-fi network, etc.) In a VeregOS system there is typically at least one external network and there can be multiple. External networks can be defined during or after VeregOS system installation/Tenant creation.

- ***Physical Network***
A physical network is a representation of each isolated layer 2 network. Note: Physical networks are configured during VeregOS Install. The system automatically appends " Switch" to the end of the user-supplied name during install, for ex: for name "PXE", the system will give the physical network the name "PXE Switch"

<br>
<br>

## Layer 2 and Layer 3 Networks
Built-in Software Defined Networking(SDN) provides the ability to create/destroy virtual networks on-the-fly without hardware changes. Both Layer 3 and Layer 2 virtual networks are supported:

- **Layer 3 Networks** - full network management, IP administration (DHCP, DNS, routing, firewall, etc.) available from within VeregOS.

<br>

- **Layer 2 Networks** - network is managed up to layer 2 by VeregOS, with cross-node routing handled within the VeregOS DMZ network; IP-level administration is handled in third-party tools (e.g. virtual firewall/router appliance).

<br>
<br>

## Network Rules

Rules govern incoming and outgoing traffic to the network:

- ### Firewall [Action=Accept/Drop/Reject]
	--   **Accept** - allow packets through that meet the defined criteria
--   **Drop** - do not allow packets that meet the defined criteria
--   **Reject** - do not allow specified traffic and send ICMP destination unreachable back to the source, when permitted

<br>

- ### Routing [Action=Route]
  Directs traffic between VeregOS networks and out to external networks by defining static routes

<br>

- ### NAT/PAT [Action=Translate] 
	Maps external-internal/internal-internal IP addresses/ports (most often used to conserve external IP addresses)
 
 <br>
 
 More information about working with network rules is available here: [**Network Rules**](../product-guide/networkrules) 

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

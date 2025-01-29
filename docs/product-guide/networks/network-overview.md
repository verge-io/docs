# Networking Overview

This page provides general information to help get familiar with networking in VergeOS. We recommend reading through this page to get a foundation of the basics. Quick Start instructions for common network tasks are available on the Quick Start Page: [**Networking - Quick Start Instructions**](/product-guide/networks/network-quickstart)

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

A network outside of the VergeOS system; any pre-existing network that will be interfaced with VergeOS (e.g. company LAN, direct WAN connection, wi-fi network, etc.) In a VergeOS system there is typically at least one external network and there can be multiple. External networks can be defined during or after VergeOS system installation/tenant creation.

## Layer 2 and Layer 3 Networks

Built-in Software Defined Networking (SDN) provides the ability to create/destroy virtual networks on-the-fly without hardware changes. Both Layer 3 and Layer 2 virtual networks are supported:

### Layer 3 Networks

Full network management, IP administration (DHCP, DNS, routing, firewall, etc.) available from within VergeOS.

### Layer 2 Networks

Network is managed up to layer 2 by VergeOS, with cross-node routing handled within the VergeOS DMZ network; IP-level administration is handled in third-party tools (e.g. virtual firewall/router appliance).

## Network Rules

Rules govern incoming and outgoing traffic to the network:

### Firewall [Action=Accept/Drop/Reject]

- ***Accept*** - allow packets through that meet the defined criteria
- ***Drop*** - do not allow packets that meet the defined criteria
- ***Reject*** - do not allow specified traffic and send ICMP destination unreachable back to the source, when permitted

### Routing [Action=Route]

Directs traffic between VergeOS networks and out to external networks by defining static routes

### NAT/PAT [Action=Translate]

Maps external-internal/internal-internal IP addresses/ports (most often used to conserve external IP addresses)

More information about working with network rules is available at: [**Network Rules**](/product-guide/networks/network-rules)

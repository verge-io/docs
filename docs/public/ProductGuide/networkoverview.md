---
title: Product Guide - Networking Overview 
description: High-level overview of some of the networking terms and concepts used in VergeIO
published: true
date: 2023-06-27T14:51:24.056Z
tags: 
editor: markdown
dateCreated: 2023-03-29T18:36:29.086Z
---

# Networking Overview

This page provides general information to help get familiar with networking in VergeIO. We recommend reading through this page to get a foundation of the basics. QuickStart Instructions for common network tasks are available on the Quick Start Page: [**Networking - Quick Start Instructions**](../ProductGuide/network-quickstart)

<br>
<br>
  

## VergeIO Network Types
<br>

- ***Core Network***
A virtual network (created automatically during the VergeIO installation/Tenant creation) to handle all intra-node communication. Every VergeIO Cloud has 1 Core network (There is a Core network at the physical host level; additionally, each Tenant has 1 Core network.)

- ***DMZ Network***
A virtual network (created automatically during the VergeIO installation/Tenant creation) used as a connection point for all networks. Every VergeIO Cloud has 1 DMZ network (There is a DMZ network at the physical host level; additionally, each Tenant has 1 DMZ network.). The DMZ provides for all networks to communicate over layer 3.

- ***Maintenance Network***
An External network that can be created to handle IPMI access to physical nodes and optional PXE boot. A Maintenance network can be created during the initial VergeIO install on physical nodes or can be created after installation.

- ***Internal Network***
A virtual network originated within VergeIO (e.g. within the UI or via VergeIO API). Any number of internal networks can be created, with each being initiated default-secure. Network rules can be used to open up access between internal networks and through External networks, as needed.

- ***External Network***
A network outside of the VergeIO system; any pre-existing network that will be interfaced with VergeIO (e.g. company LAN, direct WAN connection, wi-fi network, etc.) In a VergeIO system there is typically at least one external network and there can be multiple. External networks can be defined during or after VergeIO system installation/Tenant creation.

- ***Physical Network***
A physical network is a representation of each isolated layer 2 network. Note: Physical networks are configured during VergeIO Install. The system automatically appends " Switch" to the end of the user-supplied name during install, for ex: for name "PXE", the system will give the physical network the name "PXE Switch"

<br>
<br>

## Layer 2 and Layer 3 Networks
Built-in Software Defined Networking(SDN) provides the ability to create/destroy virtual networks on-the-fly without hardware changes. Both Layer 3 and Layer 2 virtual networks are supported:

- **Layer 3 Networks** - full network management, IP administration (DHCP, DNS, routing, firewall, etc.) available from within VergeIO.

<br>

- **Layer 2 Networks** - network is managed up to layer 2 by VergeIO, with cross-node routing handled within the VergeIO DMZ network; IP-level administration is handled in third-party tools (e.g. virtual firewall/router appliance).

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
  Directs traffic between VergeIO networks and out to external networks by defining static routes

<br>

- ### NAT/PAT [Action=Translate] 
	Maps external-internal/internal-internal IP addresses/ports (most often used to conserve external IP addresses)
 
 <br>
 
 More information about working with network rules is available here: [**Network Rules**](../ProductGuide/networkrules) 

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

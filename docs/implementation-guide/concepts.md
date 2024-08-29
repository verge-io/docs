## Overview

This document provides an overview of the key concepts related to VergeOS's physical infrastructure and network architecture. Understanding these foundational elements is crucial for a successful VergeOS deployment and will prepare you for the subsequent sections of our Implementation Guide.

## The System

We refer to single deployment of VergeOS as a "System". A single VergeOS System can have many Nodes and many Clusters. A VergeOS System represents a single vSAN instance.

## Physical Infrastructure

VergeOS utilizes a flexible and scalable infrastructure model. Let's explore the core components:

### Nodes

A node is an individual server running VergeOS. There are several types of nodes:

- **Controller Nodes:** Manage the User Interface, Networking, and vSAN functions.
- **Compute and Storage (HCI) Nodes:** Expands storage, compute, networking within the VergeOS System
- **Compute-Only Nodes:** Expand compute resources within the VergeOS System
- **Storage-Only Nodes:** Expand storage resources within the VergeOS System

### Clusters

Clusters are logical groupings of Nodes that share similar hardware characteristics. Types include:

- **Compute and Storage (HCI) Clusters:** Groups of Nodes that expand storage, compute, and networking resources
- **Compute-Only Clusters:** Groups of nodes dedicated to expanding compute resources
- **Storage-Only Clusters:** Groups of nodes dedicated to expanding storage resources

## Networks (Physical and Virtual)

### Physical Networks

#### Core Fabric Network

- Primary network for VergeOS internal communication
- Used for vSAN traffic and node-to-node communication
- Requires jumbo frames (minimum MTU of 9216)
- Typically uses two separate physical networks for redundancy

#### External Network

- Used for communication outside of VergeOS
- Can be configured for site-external or just VergeOS-external communication
- Typically one External network per system, with additional VLANs as needed

<!-- #### Management Network (Optional)
- Used for hardware management (IPMI) and scale-out operations
- Can share port functionality with an External network port if supported by hardware -->

### Virtual Networks

#### Internal Network

- A layer 3 network on VergeOS
- Can have its own subnet, router, DHCP, DNS, etc.
- Multiple Internal Networks can exist with the same subnet due to default segregation

#### Core

A core network that VergeOS uses to communicate vSAN traffic, Node to Node communication, VM migrations, and other management communications.

#### DMZ

The DMZ network is a virtual network (created automatically during the VergeOS installation/Tenant creation) as a connection point for all networks. Every VergeOS Cloud has 1 DMZ Network (There is a DMZ network at the physical host level; additionally, each Tenant has a DMZ network.).

## Additional Concepts

### VergeOS User Interface (UI)

The VergeOS User Interface provides an accessible and intuitive way to manage all aspects of the virtual data center, including node management, workload deployment, and system monitoring. 

!!! note "The UI runs on either Node 1 or Node 2 in a VergeOS System"

### vSAN (Virtual Storage Area Network)

A vSAN instance is a storage solution that pools local storage from a cluster of nodes, providing a shared storage resource for the entire vergeOS system. It ensures high availability and redundancy for data storage.

### Tenants

This feature allows for multiple levels of tenants within the VergeOS system, enabling complex and secure multi-tenant environments.

### Sites - Centralized Management

VergeOS systems can be interconnected to facilitate centralized monitoring, authentication, and management. This interconnected approach also supports snapshot replication and vSAN repair services across multiple systems.

### Networks

The networking capabilities of VergeOS include comprehensive support for virtual networking, allowing seamless integration with existing network infrastructure and efficient management of network resources within the virtual data center.

For additional VergeOS key terms please see our [glossary](../glossary.md).

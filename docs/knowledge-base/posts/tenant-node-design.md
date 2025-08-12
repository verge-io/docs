---
title: Tenant Node Planning Guide
slug: tenant-node-planning-guide
description: Considerations for determining number of tenant nodes and resource allocation of tenant nodes
draft: false
date: 2025-07-23T22:27:27.361Z
tags:
  - workloads
  - tenantsanot
categories:
  - Tenants
editor: markdown
dateCreated: 2025-07-01T12:56:28.820Z
---



# Tenant Node Planning Guide

## Overview

This guide outlines key considerations for determining an optimal number of tenant nodes, resource allocation, and placement strategies for VergeOS tenant deployments. Effective tenant node design supports optimal performance and resource utilization while maintaining the isolation and security benefits of tenant environments.

## Prerequisites

Before using this guide, you should have a general foundational understanding of tenant concepts; refer to the [Tenants Overview](/product-guide/tenants/overview) page.

## Purpose and Scope

This guide helps administrators make informed decisions about:

   - An appropriate number of tenant nodes based on tenant requirements
   - Resource allocation strategies across tenant nodes
   - Physical placement considerations for tenant nodes
   - Network considerations for multi-node tenants

---


## What Are Tenant Nodes?

**Tenant Nodes Simulate Physical Infrastructure**  
Tenant nodes are virtual servers that simulate and replicate functionality of physical VergeOS nodes to create a private tenant environment. Each tenant consists of one or more tenant nodes that collectively provide the compute, storage, and networking infrastructure for the tenant's workloads while maintaining separation and privacy using the tenant encapsulated network. 


## Tenant Node Characteristics: 

**Secure Inter-Host Communication**

A tenant is securely scaled across multiple physical hosts, with tenant nodes communicating via the tenant's protected encapsulated network.

**Matched Resource Allocation**

A tenant's varied workload requirements (e.g. vGPU devices, performance profiles, etc.) can be met by distributing tenant nodes to different host nodes and clusters

* **Mobility** Tenant nodes are designed for **portability across physical infrastructure:**

   - Migration between physical hosts for maintenance or load balancing
   - Automatic failover to other physical nodes during hardware failures
   - Live migration capabilities with no service interruption

* **Horizontal and Vertical Scaling** 

   - A Tenant node's resources can be increased or decreased, without a restart
   - Tenant nodes can be added to scale compute resources across multiple physical hosts
   - Seamless integration of new tenant nodes into existing tenant architecture

---

## Single-node Tenants

!!! note "Key Points"
   - Single Node tenants provide redundancy
   - A single tenant node is preferred when able to satisfy resource requirements 
   - Additional tenant nodes can be added non-disruptively, as needed, to scale a tenant's resources 

A tenant can run on a single tenant node while still providing redundancy, because the system employs a "watchdog" mechanism that will automatically restart a tenant node on a new physical host if its physical server were to fail, or the virtual tenant node is non-responsive for a period.  For maintenance operations, a temporary tenant node is automatically created to seamlessly migrate tenant workloads. If RAM and core requirements can be met with a single tenant node and there are no network or device needs that require tenant nodes to be on multiple hosts, a single node is often preferable for simplicity.


## Scaling Flexibility

VergeOS tenants provide disturbance-free resource scaling; you can add resources to your tenant without interfering with their existing workloads.  Tenant nodes should typically be planned and deployed based on current (or short-term) workload needs with resources increased as needed. This will avoid wasting allocated, unused resources. 

**Non-disruptive scaling options:**
- Add resources to existing tenant nodes
- Add additional tenant nodes to distribute load
- Migrate tenant nodes to different physical hosts
- Scale storage independently of compute resources

For detailed procedures on increasing tenant resources, refer to the [Increase Tenant Resources](/product-guide/tenants/increase-resources) documentation.



## Multiple Node Tenants

For larger tenant deployments or those requiring varied hardware or network specifications, more than one tenant node may be necessary. The following sections outline these conditions that necessitate multiple nodes. 

### Necessary Compute Resources Exceed Workload Maximums

The amount of memory and number of cores that can be allocated to a single tenant node is limited by cluster settings: [***Max RAM per machine*** and ***Max cores per machine***](/product-guide/system/cluster-settings).  Deploy multiple tenant nodes when a tenant has resource needs beyond what these settings allow.  

### Tenant Workload Requirements 

Some tenants will have specific application requirements that will indicate running multiple tenant nodes to allow spreading workloads across physical infrastructure: 

* Tenants employing clustered applications (e.g. Web farms, Hadoop, database clusters, etc.) commonly have requirements to run multiple instances on different physical hosts for high availability, load balancing, or parallel processing. 

* To provide a tenant with mixed hardware capabilities, such as varying performance profiles or specialized pass-through hardware (vGPU, PCI, USB devices) it may be necessary to deploy multiple tenant nodes to run on different physical infrastructure. 

* Some tenants may have regulatory requirements for hardware separation among workloads.


### Heterogeneous Network requirements

Although not common, certain situations will require more than one tenant node to accommodate diverse network access: for example, a tenant that needs to reach multiple external networks or vLANs that are only available through a mix of physical servers.

Describe an example here


## Maximum Number of Tenant Nodes

- no hard limit (or very high number) maximum tenant nodes allowed
- typically you will want to keep the number of tenant nodes to n-1 per cluster
- this will allow all of the tenant nodes to run even when there is one physical node is out of service - such as during a node failure and during planned maintenance activities. 

## Determining Tenant Resource Requirements

**CPU Requirements:**
- Assess the total CPU cores needed for all planned workloads
- Consider peak usage patterns and performance requirements
- Account for different workload types (CPU-intensive vs. I/O-bound)

**Memory Requirements:**
- Calculate total RAM needed across all planned virtual machines
- Include memory for planned tenant infrastructure services, such as NAS, AI, etc.
- Consider memory overhead for the tenant's hypervisor functions *****Memory overhead for the tenant's hypervisor and storage is handled by the system.  The memory assigned to tenant nodes is all available to the tenant to use for its own workloads. 

**No Manual Overhead Calculation Required:**
The VergeOS system automatically accounts for hypervisor overhead when allocating resources to tenant nodes. The resources you allocate to tenant nodes will be fully available for the tenant to distribute among its own workloads.
**Right-Sizing Strategy:**
"It's generally recommended to right-size tenant compute resources to match actual workload demands rather than allocating surplus capacity for future growth.  




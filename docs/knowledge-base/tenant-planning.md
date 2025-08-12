# Tenant Node Planning Guide

## Overview

This guide outlines key considerations for determining an optimal number of tenant nodes, compute resource allocation, and placement strategies for VergeOS tenant deployments. Effective tenant node design supports optimal performance and resource utilization while maintaining the isolation and security benefits of tenant environments.

## Prerequisites

Before using this guide, you should have a general foundational understanding of tenant concepts; refer to the [Tenants Overview](/product-guide/tenants/overview) page if you are new to VergeOS tenants.

## Purpose and Scope

This guide helps administrators make informed decisions about:

- An appropriate number of tenant nodes based on tenant requirements
- Resource allocation strategies across tenant nodes
- Physical placement considerations for tenant nodes
- Network considerations for multi-node tenants

---

## What Are Tenant Nodes?

**Tenant Nodes Simulate Physical Hosts**

Tenant nodes are virtual servers that simulate physical VergeOS nodes, closely replicating the same functionality, to create a private tenant environment. Each tenant consists of one or more tenant nodes that collectively provide the compute, storage, and networking infrastructure for the tenant's workloads while maintaining separation and privacy using the tenant encapsulated network.

## Tenant Node Characteristics

**Secure Inter-Host Communication**

A tenant can be securely scaled across multiple physical hosts, with its tenant nodes communicating via the tenant's protected encapsulated network.

**Matched Resource Allocation**

Tenant nodes can be distributed across clusters or hosts with different hardware configurations (including specialized equipment like vGPUs), to match varied workload requirements within the tenant.

**Mobility**

Tenant nodes are designed for portability across physical infrastructure:

- Migration between physical hosts for maintenance or load balancing
- Automatic failover to other physical nodes during hardware failures
- Live migration capabilities with no service interruption

**Horizontal and Vertical Scaling**

- A tenant node's resources can be increased or decreased without a restart
- Tenant nodes can be added to scale compute resources across multiple physical hosts
- Seamless integration of new tenant nodes into existing tenant architecture

---

## Single-Node Tenants

!!! note "Key Points"
    - Single-node tenants provide redundancy through automatic failover
    - A single tenant node is preferred when able to satisfy resource requirements
    - Additional tenant nodes can be added, non-disruptively, as needed to scale a tenant's resources

A tenant can run on a single tenant node while still providing redundancy because the system employs a "watchdog" mechanism that will automatically restart a tenant node on a new physical host if its physical server were to fail, or the virtual tenant node is non-responsive for a period. For maintenance operations, a temporary tenant node is automatically created to seamlessly live migrate tenant workloads. 

If RAM and core requirements can be met with a single tenant node and there are no network or device needs that require tenant nodes to be on multiple hosts, a single node is often preferable for simplicity.

## Scaling Flexibility

VergeOS tenants provide disturbance-free resource scaling; you can add resources to your tenant without interfering with running workloads. Tenant nodes should typically be planned and deployed based on current or short-term workload needs, with resources increased as needed. This approach avoids wasting allocated, unused resources.

**Non-disruptive scaling options:**  

- Add resources to existing tenant nodes
- Add additional tenant nodes to distribute load
- Migrate tenant nodes to different physical hosts
- Scale storage independently of compute resources

For detailed procedures on increasing tenant resources, refer to the [Increase Tenant Resources](/product-guide/tenants/add-tenant-resources) documentation.


## Multiple-Node Tenants

For larger tenant deployments or those requiring varied hardware or network specifications, more than one tenant node may be necessary. The following sections outline conditions that necessitate multiple nodes.

### Necessary Compute Resources Exceed Workload Maximums

The amount of memory and number of cores that can be allocated to a single tenant node is limited by cluster settings: [***Max RAM per machine*** and ***Max cores per machine***](/product-guide/system/cluster-settings). Multiple tenant nodes will be needed to provide resources beyond what these settings allow.

### Tenant Workload Requirements

Some tenants will have specific application requirements that indicate the need for multiple tenant nodes to allow distributing workloads across physical servers:

- **Clustered Applications**: Tenants employing clustered applications (e.g., web farms, Hadoop, database clusters) commonly have requirements to run multiple instances on different physical hosts for high availability, load balancing, or parallel processing.

- **Mixed Hardware Capabilities**: To provide a tenant with varying performance profiles or specialized pass-through hardware (vGPU, PCI, USB devices), it may be necessary to deploy multiple tenant nodes running on different physical VergeOS nodes or clusters.

- **Regulatory Requirements**: Some tenants may have compliance requirements for hardware separation among workloads. 


## Maximum Number of Tenant Nodes

does this even need a section?

There is no hard limit on the maximum number of tenant nodes allowed.
something about how the system generally attempts to balance workloads? 
multiple tenant nodes can be run on the same physical host except when there is some type of application or compliance requirement of the tenant, right?


## Determining Tenant Resource Requirements

**CPU Requirements**  

  - Assess the total CPU cores needed for all planned workloads
  - Consider peak usage patterns and performance requirements
  - Account for different workload types (CPU-intensive vs. I/O-bound) where it might make sense to deploy to different nodes or clusters with specialized hardware capabilities.

**Memory Requirements**

  - Calculate total RAM needed across all planned virtual machines
  - Include memory for planned tenant infrastructure services, such as NAS, AI, etc.
  - The system handles memory overhead through built-in processes.

**No Manual Overhead Calculation Required**

The VergeOS system automatically accounts for hypervisor and storage overhead when allocating resources to tenant nodes. The memory you assign is fully available to the tenant for distributing among its own workloads.

**Right-Sizing Strategy**

It's generally recommended to right-size tenant compute resources to match actual workload demands rather than allocating surplus capacity for future growth. This approach optimizes resource utilization and allows for organic scaling as requirements evolve.


## Example Configurations

The following examples illustrate different tenant node configurations to demonstrate key planning concepts and requirements.


### Example 1 - Small, Single-node Tenant

**Scenario:**

   * A tenant with only 3 VMs, no special requirements
   * Host cluster settings allow for *Max RAM per machine*: 64GB RAM and *Max cores per machine*: 16 
   * Host environment includes multiple physical nodes, each containing the same passthrough devices available for tenant workloads

**Requirements:** 

- Total of 16GB RAM and 8 cores for current tenant workloads
- Some tenant workloads have a requirement for vGPU devices

**Configuration:**

   * Tenant Nodes: 1
   * Resources: 16 GB RAM, 8 cores 

**Rationale:**
A single node provides sufficient resources for the workload while maintaining simplicity.  Automatic failover of tenant nodes ensures redundancy without additional complexity.


**Scaling Path:**  
Add more RAM/cores to the tenant node as resource needs grow (an additional 48GB RAM amd 8 cores can be added to this initial node), or add a second tenant node if resource needs exceed 64 GB/16 cores.


### Example 2 - Mid-Sized Tenant Running High-Availability Web Applications

**Scenario:**

   * A mid-sized tenant running customer-facing web applications with a multi-instance, load-balanced/High-availability setup
   * Host cluster settings allow for *Max RAM per machine*: 128GB RAM and *Max cores per machine*: 16 

**Requirements:** 

   * 4 web servers (2 per host for HA)
   * 2 database servers (primary/replica on separate hosts)


**Configuration:**

   * Tenant Nodes: 2
   * Node 1: 64 GB RAM, 12 cores (hosts 2 web servers + database primary)
   * Node 2: 64 GB RAM, 12 cores (hosts 2 web servers + database replica)

**Rationale:**
Although host cluster settings would allow for enough resources within one tenant node, multiple nodes ensure that the tenant's web servers and database components run on different physical hosts to meet application HA requirements. 


**Scaling Path:**
Add more RAM/cores to the existing nodes as compute needs grow, or add additional tenant node(s) if requirements begin to exceed 256GB/32 cores or further physical workload separation becomes necessary.

### Example 3 - Mixed Workload Tenant with Specialized Hardware

**Scenario:** 

   * Tenant customer needs standard compute resources, high-performance for video rendering, and GPU acceleration for video processing workloads
   * Host environment has multiple clusters with varying hardware configurations and performance profiles
   * Applicable Host clusters: 
      * Standard (mid-range processors, standard processor/core ratio); *Max RAM per machine*: 64GB RAM and *Max cores per machine*: 16
      * vGPU Cluster (high-end processors, vGPU devices); *Max RAM per machine*: 64GB RAM and *Max cores per machine*: 16
      * High-Performance Cluster (high-end processors, memory dense) *Max RAM per machine*: 128 RAM and *Max cores per machine*: 16

**Requirements:** 

- 128GB/8 cores for standard VMs (file servers and management tools)
- 64GB/16 cores for GPU-accelerated VMs for video rendering
- 48GB/12 cores for high-performance host for editing workstations

**Configuration:**

   * Tenant Nodes: 4
   * Node 1: 64 GB RAM, 8 cores (Standard Cluster for file servers)
   * Node 2: 64 GB RAM, 8 cores (Standard Cluster for file servers/management tools)
   * Node 3: 64 GB RAM, 16 cores (vGPU Cluster for video processing rendering workstations)
   * Node 4: 48 GB RAM, 8 cores (Premium Cluster for editing workstations) 

**Rationale:** Multiple nodes allow placement on different clusters with different hardware capabilities: standard, GPU-equipped, and high performance.
Two nodes are needed in the Standard cluster to provide the needed 128GB RAM for file servers and management tools.  

**Hardware Matching:** Each tenant node is placed on physical infrastructure that matches its workload requirements (tenant node *Cluster* setting), optimizing both performance and cost.


**Scaling Path:** For each node/cluster: add more RAM/cores to the existing node if the cluster max settings allow, or add additional tenant node(s).


### Example 4 - Tenant with Clustered-Application Requirements

**Scenario:** 

   * Enterprise tenant customer running a distributed analytics platform requiring multi-host deployment for application load balancing and redundancy functions. 
   * Host cluster settings allow for *Max RAM per machine*: 96GB RAM and *Max cores per machine*: 16 

**Requirements:** 

   * Support for 3 application servers across 3 physical hosts (48GB RAM/8 cores each)
   * Support for 3 database servers (16GB RAM/4 cores each)
   * Support for 2 data processing servers (32GB RAM/8 cores each)


**Configuration:**

 * Tenant Nodes: 
   * Node 1: 64 GB RAM, 12 cores (1 application server + 1 database server)
   * Node 2: 64 GB RAM, 12 cores (1 application server + 1 database server)
   * Node 3: 64 GB RAM, 12 cores (1 application server + 1 database server)
   * Node 4: 32 GB RAM, 8 cores (2 data processing servers)

**Rationale:** Four tenant nodes ensure workload distribution across multiple physical hosts while maintaining the ability to run all services.


**Scaling Path:** Add more RAM/cores to the existing nodes as cluster max settings allow; configure additional tenant nodes when resource needs to exceed current node capacity. 




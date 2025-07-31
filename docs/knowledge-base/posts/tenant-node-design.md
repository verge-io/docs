# Tenant Node Architecture Planning Guide

## Overview

This guide outlines the key considerations for determining an optimal number of tenant nodes, resource allocation, and placement strategies for VergeOS tenant deployments. Proper tenant node architecture planning supports optimal performance, resource utilization, and operational flexibility while maintaining the isolation and security benefits of tenant environments.

## Prerequisites

Before using this guide, you should have a general foundational understanding of tenant concepts and basic configuration, please refer to the [Tenants Overview](/product-guide/tenants/overview) page.

## Purpose and Scope

This guide helps administrators make informed decisions about:
- The appropriate number of tenant nodes based on tenant requirements
- Resource allocation strategies across tenant nodes
- Physical placement considerations for tenant nodes
- Network architecture planning for multi-node tenants

---

## Understanding Tenant Node Architecture

### What Are Tenant Nodes?

Tenant nodes are virtual servers that simulate physical VergeOS nodes to create a tenant environment. Each tenant consists of one or more tenant nodes that collectively provide the compute, storage, and networking infrastructure for the tenant's workloads.  - Maintain network encapsulation even as resources span physical infrastructure

Tenant Node Advantages:

* **Node Mobility** Tenant nodes are designed for **portability across physical infrastructure:**

   - Can migrate between physical hosts for maintenance or load balancing
   - Automatic failover to other physical nodes during hardware failures
   - Live migration capabilities with minimal service interruption

* **Horizontal Scaling** 

   - Tenant nodes can be added to scale compute resources across multiple physical hosts
   - Seamless integration of new tenant nodes into existing tenant architecture

**Redundancy Benefits:**

   - Multiple tenant nodes provide built-in redundancy for tenant workloads
   - Failure of a single physical host doesn't compromise multi-node tenant availability

**Matched Resource Allocation:**
   
   - Tenant nodes can be distributed across clusters or hosts with different hardware configurations (such as specialized equipment like vGPUs) to match varied workload requirements.  


### How Tenant Nodes Simulate Physical Infrastructure

Tenant nodes are designed to closely replicate the functionality of physical VergeOS nodes. Each node represents dedicated CPU cores and RAM resources that the tenant sees as if they were physical hardware.  Multiple tenant nodes create a distributed cluster available for the tenant's workloads.  

- explain how workload failover is achieved with tenant nodes. 
- explain more about how tenant nodes work to ensure the tenant's isolation from other tenants/workloads, even as communication traverses physical nodes. --- it would traverse physical nodes to reach external networks, or if multiple tenant nodes, right? perhaps a quick example here about needing multiple tenant nodes to accomodate total compute needs or provide other different hardware needs to varying tenant workloads - run across multiple physical nodes, but still can be isolated, secure and private tenant environment.

---
## Determining Number of Tenant Nodes to Implement

### Step 1: Establish compute Resources needed 

### Resource Assessment

Begin by evaluating compute requirements (RAM/Cores) for the tenant's intended workloads:

“It’s generally recommended to right-size tenant compute resources based on current workload demands and short-term projected growth, rather than allocating surplus capacity beyond immediate foreseeable needs.”

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

## Step 2: Determine if  For multi-cluster systems, determine if tenant workloads need to be split among the clusters

A Tenant can be run across clusters, with one or more nodes running in one cluster, while other tenant nodes run in a different cluster.  
Describe how some systems may have different clusters for different compute needs, for ex. a cluster with high RAM:CPU ratios, cluster with higher class CPUs, etc.  






**Benefits of Right-Sizing:**
- Prevents waste of physical RAM and CPU cores
- Allows better resource utilization across the physical infrastructure
- Reduces licensing costs in some scenarios
- Easier to manage and monitor resource usage

## Step 2: Determine the Number of Nodes Needed

### Single Node Evaluation

First, assess whether the tenant's requirements can be satisfied with a single tenant node:

**Physical Resource Limits:**
Check against the cluster's maximum resource limits:
- **Max RAM per Machine**: Verify total memory requirement fits within this limit
- **Max Cores per Machine**: Ensure CPU requirements don't exceed this threshold
- **Storage Constraints**: Confirm storage requirements can be met by available tiers

**Single Node Advantages:**
- Simplified management and monitoring
- Reduced network complexity
- Lower resource overhead
- Easier troubleshooting and maintenance

**When Single Node Is Sufficient:**
- Total resource requirements fit comfortably within cluster limits
- No special hardware requirements (passthrough devices)
- Standard networking requirements
- Limited fault tolerance requirements

### Multi-Node Requirements

Consider multiple tenant nodes when any of the following conditions apply:

#### Resource Scaling Requirements

**Exceeding Physical Limits:**
- Total CPU or memory requirements exceed single machine maximums
- Need to distribute workload across multiple physical hostsy

**Performance Distribution:**
- Workloads benefit from distributed processing
- Need to balance I/O load across multiple physical hosts
- Different workload types requiring different resource characteristics

#### Hardware Passthrough Requirements

**Different Passthrough Devices:**
When tenant workloads require access to different types of hardware:
- GPU acceleration on some workloads but not others
- Specialized network cards for different functions
- Storage controllers for specific applications
- Hardware security modules (HSMs) or other specialized devices

**Physical Host Distribution:**
- Passthrough devices may only be available on specific physical hosts
- Regulatory requirements for hardware separation
- Different hardware generations with varying capabilities

#### Special Networking Requirements

**Network Segmentation:**
- Different security zones requiring physical network separation
- Compliance requirements for network isolation
- Integration with external networks available only on specific hosts



**Scaling Flexibility:**
VergeOS provides non-disruptive scaling options:
- Add resources to existing tenant nodes
- Add additional tenant nodes to distribute load
- Migrate tenant nodes to different physical hosts
- Scale storage independently of compute resources

For detailed procedures on increasing tenant resources, refer to the [Increase Tenant Resources](/product-guide/tenants/increase-resources) documentation.

---


**Performance Requirements:**
- High-bandwidth applications requiring dedicated network resources
- Low-latency requirements best met with specific physical network connections
- Specialized networking hardware (InfiniBand, specialized NICs)

### Layer 2 Networking Considerations

**VLAN Access Configuration:**
When implementing Layer 2 (VLAN) access to tenants:

**Multi-Node Implications:**
- VLAN access must be configured individually for each tenant node
- Physical network infrastructure must support VLAN extension across all tenant node locations
- Network policies must account for traffic flowing between tenant nodes

**Planning Requirements:**
- Ensure VLAN availability on all physical hosts where tenant nodes will reside
- Plan for consistent network policies across all tenant nodes
- Consider bandwidth and latency implications of distributed tenant nodes

**Configuration Complexity:**
- Each tenant node requires individual VLAN configuration
- Network changes may need to be applied across multiple tenant nodes
- Troubleshooting network issues becomes more complex with multiple nodes

---

## Multi-Node Architecture Patterns

### Common Deployment Patterns

#### Two-Node High Availability
**Use Case:** Basic redundancy with resource distribution
**Configuration:**
- Primary node: 60-70% of resources
- Secondary node: 30-40% of resources
- Cross-node redundancy for critical workloads

**Benefits:**
- Simple failover scenarios
- Balanced resource utilization
- Manageable complexity

#### Three-Node Distributed
**Use Case:** Enhanced availability with better load distribution
**Configuration:**
- Even resource distribution across three nodes
- Enables majority consensus for cluster decisions
- Optimal for database clusters and distributed applications

**Benefits:**
- Improved fault tolerance
- Better resource distribution
- Supports quorum-based applications

#### Specialized Node Roles
**Use Case:** Different workload types with specific requirements
**Configuration:**
- Compute-intensive nodes with high CPU allocation
- Memory-intensive nodes with high RAM allocation
- I/O-intensive nodes with optimized storage access

**Benefits:**
- Optimized resource allocation per workload type
- Simplified capacity planning
- Easier performance troubleshooting

### Placement Strategies

#### Physical Host Distribution
**Anti-Affinity Rules:**
- Place tenant nodes on different physical hosts when possible
- Avoid single points of failure at the physical layer
- Consider rack-level and facility-level distribution for critical tenants

**Resource Balancing:**
- Distribute tenant nodes to balance load across physical infrastructure
- Consider existing workload distribution when placing new tenant nodes
- Monitor resource utilization across physical hosts

#### Network Proximity
**Latency Optimization:**
- Place communicating tenant nodes close to each other network-wise
- Consider physical network topology when planning node placement
- Balance between fault tolerance and performance requirements

**Bandwidth Considerations:**
- Ensure adequate network bandwidth between tenant nodes
- Plan for peak inter-node communication patterns
- Consider network upgrade requirements for high-bandwidth applications

---

## Scaling and Growth Planning

### Horizontal Scaling Strategies

**Adding Tenant Nodes:**
- Plan for future node additions without service disruption
- Ensure network and storage architecture supports additional nodes
- Consider licensing implications of additional nodes

**Resource Rebalancing:**
- Plan for moving workloads between tenant nodes as they're added
- Consider automation tools for workload distribution
- Develop procedures for rebalancing during peak usage periods

### Vertical Scaling Considerations

**Resource Expansion:**
- Plan for increasing resources on existing tenant nodes
- Monitor resource utilization trends to predict scaling needs
- Balance between horizontal and vertical scaling based on workload characteristics

**Performance Monitoring:**
- Establish baselines for tenant node performance
- Implement monitoring for resource utilization across all tenant nodes
- Set up alerts for resource constraints that might require scaling

---

## Best Practices and Recommendations

### Planning Guidelines

**Start Conservative:**
- Begin with minimum viable resource allocation
- Use monitoring data to guide scaling decisions
- Prefer horizontal scaling for better fault tolerance

**Documentation:**
- Document tenant node architecture decisions and rationale
- Maintain records of resource allocation and utilization patterns
- Create runbooks for common scaling and maintenance procedures

**Testing:**
- Test failover scenarios with multi-node configurations
- Validate network connectivity and performance between tenant nodes
- Verify backup and recovery procedures work across all tenant nodes

### Operational Considerations

**Monitoring and Alerting:**
- Implement comprehensive monitoring across all tenant nodes
- Set up alerts for resource utilization, performance, and availability
- Monitor inter-node communication patterns and performance

**Maintenance Planning:**
- Develop maintenance procedures that account for multi-node architecture
- Plan for rolling updates and maintenance windows
- Test procedures for node migration and failover

**Capacity Management:**
- Regularly review resource utilization across tenant nodes
- Plan for capacity changes based on business growth
- Consider seasonal or cyclical usage patterns in planning

---

## Troubleshooting Common Issues

### Resource Distribution Problems
**Symptoms:** Uneven resource utilization across tenant nodes
**Solutions:**
- Rebalance workloads between nodes
- Adjust resource allocation per node
- Consider workload placement policies

### Network Connectivity Issues
**Symptoms:** Communication problems between tenant nodes
**Solutions:**
- Verify VLAN configuration on all nodes
- Check physical network connectivity
- Review tenant network policies and routing

### Performance Bottlenecks
**Symptoms:** Poor performance despite adequate total resources
**Solutions:**
- Analyze workload distribution patterns
- Check for resource contention on specific nodes
- Consider node placement optimization

---

## Related Documentation

- [Tenants Overview](/product-guide/tenants/overview)
- [Increase Tenant Resources](/product-guide/tenants/increase-resources)
- [Tenant Networking Configuration](/product-guide/tenants/networking)
- [Tenant Storage Management](/product-guide/tenants/storage)
- [Performance Monitoring](/product-guide/monitoring/performance)

---

## Conclusion

Proper tenant node architecture planning is essential for optimal performance, scalability, and fault tolerance. By carefully considering resource requirements, hardware constraints, networking needs, and growth patterns, administrators can design tenant architectures that efficiently utilize physical infrastructure while providing excellent isolation and performance for tenant workloads.

Remember that tenant node architecture can be adjusted over time as requirements change, but starting with a well-planned architecture reduces the need for disruptive changes and ensures optimal resource utilization from the beginning.
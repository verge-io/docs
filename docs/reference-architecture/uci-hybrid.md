# VergeOS Hybrid UCI Architecture

## Overview

VergeOS Hybrid UCI (Ultra Converged Infrastructure) architecture bridges the gap between simple HCI deployments and complex full UCI environments. This two-cluster design separates controller/storage functions from dedicated compute resources, providing the flexibility to scale compute independently while maintaining operational simplicity.

Hybrid UCI is ideal for organizations with 6-10 nodes that need more flexibility than HCI provides but aren't ready for the complexity of full three-cluster UCI deployments.

## What You'll Learn

After completing this guide, you'll be able to:

- Design and implement two-cluster Hybrid UCI architectures
- Transition existing HCI deployments to Hybrid UCI
- Configure controller/storage clusters with multiple nodes
- Deploy and scale dedicated compute-only clusters
- Optimize performance for Hybrid UCI deployments
- Plan growth paths from Hybrid to Full UCI

**Common Questions This Guide Answers:**

- "When should I transition from HCI to Hybrid UCI architecture?"
- "How do I configure a controller/storage cluster beyond just Node 1 and 2?"
- "What's the optimal way to scale compute resources independently?"
- "How do I maintain performance while transitioning from HCI?"
- "What are the network requirements for Hybrid UCI?"
- "How do I plan for future growth to Full UCI?"

## Requirements

**VergeOS Version:** v4.13 or later  
**Access Levels:** Cluster Admin, System Administrator  
**Prerequisites:** Understanding of [VergeOS HCI Architecture](vergeos-hci-architecture.md)

**Hardware Requirements:**

- 6-10 nodes total across both clusters
- Consistent networking (10GbE minimum, 25GbE recommended)
- Mixed node specifications acceptable between clusters

**Implementation Time:** 3-5 hours for initial deployment

## Hybrid UCI Architecture Design

### Two-Cluster Model

Hybrid UCI implements a clean separation between storage/control functions and compute workloads:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLUSTER 1: Controller + Storage                         │
├─────────────────┬─────────────────┬─────────────────┬─────────────────────┤
│   Node 1        │   Node 2        │   Node 3        │   Node 4 (optional) │
│ Controller +    │ Controller +    │ Storage Only    │ Storage Only        │
│ Storage         │ Storage         │                 │                     │
│ (Tier 0 + 1)    │ (Tier 0 + 1)    │ (Tier 1)        │ (Tier 1)            │
└─────────────────┴─────────────────┴─────────────────┴─────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                      CLUSTER 2: Compute Only                               │
├─────────────────┬─────────────────┬─────────────────┬─────────────────────┤
│   Node 5        │   Node 6        │   Node 7        │   Node 8+ (scale)   │
│ Compute Only    │ Compute Only    │ Compute Only    │ Compute Only        │
│ (No Storage)    │ (No Storage)    │ (No Storage)    │ (No Storage)        │
│                 │                 │                 │                     │
└─────────────────┴─────────────────┴─────────────────┴─────────────────────┘
```

!!! note
     This example uses a single workload tier of storage (Tier 1). VergeOS supports up to 5 workload [Storage Tiers](/product-guide/storage/storage-tiers/) of storage in a single System.

### Key Design Principles

**Cluster 1 - Controller/Storage:**

- **Always includes:** Node 1 and Node 2 with Tier 0 storage
- **Can be expanded:** Add Node 3, 4+ for additional storage capacity
- **Mixed functions:** Controller nodes handle both management and storage
- **Storage tiers:** All tiers can exist in this cluster

**Cluster 2 - Compute Only:**

- **Pure compute:** No storage overhead, maximum compute resources
- **Independent scaling:** Add nodes based purely on compute demand
- **Flexible hardware:** Can use different specifications optimized for compute
- **Workload focused:** Dedicated to running VMs and applications

## When to Choose Hybrid UCI

**Organizational Requirements:**

- Deployments with 6-10 nodes requiring more flexibility than HCI
- Organizations needing independent compute scaling capabilities
- Environments with moderate specialization requirements

**Resource Scaling Patterns:**

- Compute demand growing faster than storage needs
- Storage requirements expanding beyond compute growth
- Need for compute nodes with different hardware specifications
- Workloads requiring dedicated compute resources without storage overhead

**Performance Requirements:**

- Need for dedicated compute resources to eliminate storage overhead
- Requirements for specialized compute hardware (GPU, high-memory configurations)
- Performance optimization through resource separation

**Infrastructure Considerations:**

- Planning to expand beyond 10 total nodes in the future
- Need for flexibility in hardware procurement and configuration
- Requirements for workload isolation between storage and compute functions
- Desire for independent maintenance windows for different resource types

### Hybrid UCI vs. Full UCI Decision Matrix

| **Factor** | **Hybrid UCI** | **Full UCI** |
|------------|----------------|--------------|
| **Node Count** | 6-10 nodes | 10+ nodes |
| **Complexity** | Moderate | High |
| **Specialization** | Limited | Maximum |
| **Performance** | Good | Optimal |
| **Management** | Simpler | More complex |
| **Hardware Flexibility** | Some variation | Maximum variation |

## Implementation Guide

### Phase 1: Planning Your Hybrid UCI

**Cluster Sizing Strategy:**

```
Controller/Storage Cluster: 2-4 nodes
- Node 1 & 2: Controller + Storage (required)
- Node 3 & 4: Storage expansion (optional)

Compute Cluster: 4-6 nodes  
- All nodes: Dedicated compute resources
- Hardware can be optimized for compute workloads
```

**Resource Allocation Planning:**

| **Resource Type** | **Controller/Storage Cluster** | **Compute Cluster** |
|-------------------|-------------------------------|---------------------|
| **CPU** | Moderate - controller functions + light compute | Maximum - pure compute workloads |
| **Memory** | High - storage buffer + controller operations | Maximum - VM memory requirements |
| **Storage** | Maximum - all storage tiers | Minimal - OS and local cache only |
| **Network** | High - storage traffic + management | Moderate - VM network traffic |

### Phase 2: Deployment Sequence

**Step 1: Configure Controller/Storage Cluster**

1. **Deploy Initial Controllers:**

   - Install Node 1 and Node 2 with standard HCI configuration
   - Configure Tier 0 storage on both controller nodes
   - Set up initial storage tiers (Tier 1+) as required

2. **Add Storage Nodes (Optional):**

   - Add Node 3 and optionally Node 4 to controller/storage cluster
   - Configure storage tiers on additional nodes (exclude Tier 0)
   - Ensure consistent storage configuration across storage nodes

3. **Optimize Controller/Storage Cluster:**

   - Disable compute capabilities
   - Configure storage buffer allocation appropriate for cluster size
   - Implement workload placement policies to minimize controller load

**Step 2: Deploy Compute-Only Cluster**

1. **Add First Compute Nodes:**

   - Add Node 5 and Node 6 as compute-only nodes
   - Configure nodes with maximum compute resources
   - Verify connectivity to controller/storage cluster


2. **Scale Compute Capacity:**
   - Add additional compute nodes (Node 7, 8+) as needed
   - Optimize each compute node for specific workload requirements
   - Test workload deployment across compute cluster

3. **Validate Hybrid UCI Configuration:**

   - Test VM deployment and migration across compute nodes
   - Verify storage performance from compute to storage cluster
   - Validate network performance and latency

## Network Design for Hybrid UCI

### Network Requirements

**Bandwidth Planning:**

- **Inter-cluster traffic:** Storage I/O from compute to storage cluster
- **Management traffic:** API and control plane communications
- **VM traffic:** Standard east-west and north-south VM communications

**Recommended Network Specifications:**
```
Core Network (Inter-cluster): 25GbE minimum, 100GbE for high-performance
External Network: Based on VM bandwidth requirements
```

### Network Optimization

**Traffic Optimization:**

- Separate core network traffic for storage communications
- Monitor inter-cluster latency and bandwidth utilization via Fabric Configuration
- Plan for network redundancy and failover

**Performance Monitoring:**

- Track storage network utilization between clusters
- Monitor latency for storage operations from compute nodes
- Implement alerting for network performance degradation

## Scaling Hybrid UCI

### Compute Scaling Strategies

**Adding Compute Nodes:**

1. Determine compute capacity requirements
2. Add compute-only nodes to Cluster 2
3. Configure nodes for optimal compute performance
4. Balance workloads across expanded compute capacity

**Compute Node Specialization:**

- **Standard Compute:** General-purpose VMs and applications
- **High-Memory:** Database and analytics workloads
- **GPU Compute:** AI/ML and graphics-intensive applications (when available)

### Storage Scaling Strategies

**Adding Storage Capacity:**

1. Add storage-only nodes to Cluster 1 (controller/storage)
2. Configure additional storage tiers as needed
3. Balance storage distribution across storage nodes
4. Monitor and optimize storage performance

**Storage Tier Expansion:**

- Add drives to existing storage nodes
- Implement new storage tiers for different performance requirements
- Optimize storage buffer allocation for expanded capacity

## Troubleshooting Hybrid UCI

### Common Issues and Resolutions

| **Issue** | **Symptoms** | **Likely Cause** | **Resolution** |
|-----------|--------------|------------------|----------------|
| **Slow Storage Performance** | High latency from compute to storage | Network bandwidth limitation | Upgrade inter-cluster networking |
| **Controller Resource Pressure** | API timeouts, slow management | Controllers running too many workloads | Move workloads to compute cluster |
| **Unbalanced Compute Utilization** | Some compute nodes idle, others overloaded | Poor workload distribution | Implement workload balancing policies |
| **Storage Buffer Exhaustion** | Degraded vSAN performance | Insufficient storage buffer allocation | Increase storage buffer on controllers |

### Monitoring Best Practices

**Key Performance Indicators:**

- Inter-cluster network utilization and latency
- Controller node resource utilization
- Storage performance across all tiers
- Compute node efficiency and balancing
- Overall cluster health and availability

**Regular Maintenance Tasks:**

- Monthly performance review and optimization
- Quarterly capacity planning and scaling assessment
- Review workload placement and balancing

## Next Steps

After implementing Hybrid UCI:

1. **Performance Monitoring:** Establish comprehensive monitoring across both clusters
2. **Capacity Planning:** Develop scaling strategies for both compute and storage
3. **Advanced Optimization:** Consider [Performance Tuning Guide](vergeos-architecture-sizing.md) for advanced configuration
4. **Growth Planning:** Evaluate transition to [Full UCI Architecture](vergeos-full-uci-architecture.md) as requirements evolve

## Related Resources

- [VergeOS Full UCI Architecture](vergeos-full-uci-architecture.md) - Next evolution for larger deployments
- [VergeOS HCI Architecture](vergeos-hci-architecture.md) - Understanding the foundation
- [Architecture Sizing and Performance Tuning](vergeos-architecture-sizing.md) - Advanced optimization techniques
- [Adding Compute Nodes](../implementation-guide/compute-nodes.md) - Procedures for scaling compute capacity

---

!!! info "Hybrid UCI Implementation Support"
    Hybrid UCI provides an excellent balance of flexibility and simplicity for growing VergeOS deployments. For architectural planning assistance or optimization guidance, contact VergeOS Support for consultation on your specific deployment requirements.
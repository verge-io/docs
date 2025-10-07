# VergeOS HCI Architecture

## Overview

VergeOS Hyperconverged Infrastructure (HCI) architecture combines compute, storage, and networking functions within the same physical nodes. This approach delivers operational simplicity and balanced resource scaling, making it ideal for smaller deployments and organizations with predictable, proportional growth requirements.

HCI is the recommended architecture for deployments with 2-6 nodes, where compute and storage needs grow proportionally and operational simplicity is prioritized over maximum performance specialization.

## What You'll Learn

After completing this guide, you'll be able to:

- Configure VergeOS nodes in a hyperconverged architecture
- Optimize HCI deployments for maximum performance within hardware constraints
- Design storage tier distribution across HCI nodes
- Scale HCI clusters efficiently while maintaining performance
- Apply best practices for workload placement in HCI environments
- Troubleshoot common HCI performance issues

**Common Questions This Guide Answers:**

- "How do I configure a 4-node HCI VergeOS cluster for optimal performance?"
- "What's the best storage tier layout for HCI deployments?"
- "Should I run workloads on controller nodes in HCI configurations?"
- "How do I scale an HCI cluster without performance degradation?"
- "What are the storage capacity calculations for HCI with vSAN redundancy?"

## Requirements

**VergeOS Version:** v4.13 or later  
**Access Levels:** Cluster Admin, System Administrator  
**Prerequisites:** Understanding of [VergeOS Architecture Overview](vergeos-architecture-overview.md)

**Hardware Requirements:**

- 2-6 nodes with similar hardware specifications
- Minimum 10GbE core network connectivity
- Consistent storage configuration across nodes
- Adequate memory for both compute workloads and vSAN operations

**Planning Time:** 15-30 minutes  
**Implementation Time:** 2-4 hours depending on cluster size

## HCI Architecture Characteristics

### Node Configuration Model

In HCI architecture, every node provides both compute and storage resources to the cluster:

```
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   Node 1        │ │   Node 2        │ │   Node 3        │ │   Node 4        │
│ Controller +    │ │ Controller +    │ │ Compute +       │ │ Compute +       │
│ Storage +       │ │ Storage +       │ │ Storage         │ │ Storage         │
│ Compute         │ │ Compute         │ │                 │ │                 │
└─────────────────┘ └─────────────────┘ └─────────────────┘ └─────────────────┘
     Tier 0 + 1           Tier 0 + 1         Tier 1           Tier 1
```
!!! note
     This example uses a single workload tier of storage (Tier 1). VergeOS supports up to 5 workload [Storage Tiers](/product-guide/storage/storage-tiers/) of storage in a single System.

**Key Characteristics:**

- Nodes 1 & 2: Always configured as controller nodes with Tier 0 storage
- All nodes contribute to storage capacity and participate in vSAN
- All nodes can run compute workloads (with optimization considerations)
- Resources scale together - adding a node increases both compute and storage

### Storage Distribution Patterns

**Tier 0 (Metadata) Distribution:**

- Must be present on Node 1 and Node 2 only
- High-endurance NVMe storage for vSAN metadata operations
- Sized according to total usable storage capacity in the System

**Tier 1+ Distribution:**

- Distributed across all nodes in the cluster
- Each node contributes equally to storage tier capacity
- Balanced distribution ensures optimal performance

**Example 4-Node HCI Storage Layout:**

| **Node** | **Tier 0** | **Tier 1** | **Total per Node** | **Function** |
|----------|------------|-------------|-------------------|--------------|
| Node 1   | 2x 3.84TB NVMe | 10x 7TB NVMe | ~78TB | Controller + Storage + Compute |
| Node 2   | 2x 3.84TB NVMe | 10x 7TB NVMe | ~78TB | Controller + Storage + Compute |
| Node 3   | - | 10x 7TB NVMe | ~70TB | Storage + Compute |
| Node 4   | - | 10x 7TB NVMe | ~70TB | Storage + Compute |
| **Cluster Total** | ~15TB Raw (~3.2TB Usable) | ~280TB Raw (~140TB Usable) | | |

## HCI Implementation Guide

### Planning Your HCI Cluster

**Step 1: Node Specification Consistency**

For optimal performance, ensure nodes have similar specifications:

- Same CPU architecture and core count (preferred)
- Consistent memory configuration across nodes
- Identical storage device types and sizes within each tier
- Matching network interface capabilities

**Step 2: Storage Tier Planning**

Plan storage tiers based on your workload requirements:

- **Tier 0:** Size based on total cluster storage (5GB per 1TB usable capacity)
- **Tier 1:** High-performance workloads (databases, frequently accessed VMs)  
- **Tier 2:** Mixed workloads (general purpose VMs, development)
- **Tier 3+:** Archive and backup data (if needed)

**Step 3: Network Design**

HCI requires robust networking between nodes:

- Minimum 10GbE for core network between nodes (25GbE recommended)
- Redundant network paths recommended for production
- Dedicated networks for external and core traffic

### Deployment Sequence

**Phase 1: Initialize First Two Nodes**

1. Install VergeOS on Node 1 following standard installation procedures
2. Configure Tier 0 and primary storage tiers during installation
3. Add Node 2 to cluster using [scale-out node procedures](../implementation-guide/scale-out-nodes.md)
4. Verify both controller nodes are operational and vSAN is healthy

**Phase 2: Add Additional Nodes**

1. Add remaining nodes (3, 4, 5, 6) following scale-out procedures
2. Configure storage tiers consistent with existing nodes
3. Verify vSAN health after each node addition
4. Test compute and storage functionality across all nodes

**Phase 3: Optimization and Validation**

1. Configure workload placement policies
2. Test failover scenarios
3. Validate performance meets requirements
4. Implement monitoring and alerting

## HCI Performance Optimization

### Workload Placement Best Practices

**Controller Node Considerations:**

While controller nodes (Node 1 & 2) can run compute workloads, optimize placement for best performance:

- **Avoid on Controllers (specifically Node1):** High I/O intensive workloads that could interfere with controller functions
- **Prefer on Controllers:** Light management workloads, monitoring systems
- **Production Recommendation:** Primarily use Nodes 3+ for production workloads

**Compute Distribution:**

Distribute workloads evenly across compute nodes (typically Nodes 3+):

- Monitor resource utilization across all nodes
- Plan for N+1 compute capacity to handle node failures

### Storage Performance Optimization

**vSAN Optimization for HCI:**

- **Keep Storage Configurations Consistent:** No mixed storage types within the same tier
- **Balance Storage Across Nodes:** Ensure equal storage contribution from each node
- **Storage Buffer Usage:** Default 2GB per node may be insufficient for large deployments

**Storage Tier Strategy:**

- **Minimize Tier Count:** Use 2-3 workload tiers maximum in HCI for simplicity (1 recommended)
- **Size Appropriately:** Tier 0 sizing is critical (see [Node Sizing Guide](/implementation-guide/sizing/))
- **Performance Matching:** Match storage performance to workload requirements

## Scaling HCI Deployments

### When to Scale

Scale your HCI cluster when you experience:

- Consistent CPU utilization above 70% across nodes
- Storage capacity approaching 70% of total
- Memory pressure affecting VM performance  
- Network utilization approaching interface limits

### Scaling Limitations

HCI scaling becomes less efficient beyond certain thresholds:

**6-Node Recommended Maximum:**

- Beyond 6 nodes, resource management complexity increases
- Fault domain considerations become more complex
- Performance optimization becomes more challenging
- Consider UCI architecture for larger deployments

**Resource Imbalance Indicators:**

- Significantly more compute demand than storage
- Storage needs growing much faster than compute requirements
- Need for specialized compute resources (GPU, high-memory)

## Troubleshooting HCI Issues

### Common Performance Issues

| **Symptom** | **Likely Cause** | **Resolution** |
|-------------|------------------|----------------|
| Slow VM I/O performance | Controller nodes overloaded with compute workloads | Move workloads from Node 1 & 2 to other nodes |
| Inconsistent storage performance | Mixed storage configurations within tiers | Standardize storage devices within each tier |
| High network latency | Core network bandwidth insufficient | Upgrade to higher bandwidth networking |
| vSAN degraded performance | Storage buffer allocation too small | Increase storage buffer allocation |
| Node resource imbalance | Workload distribution uneven | Use VergeOS scheduling features to rebalance |

### Monitoring and Maintenance

**Key Metrics to Monitor:**

- CPU utilization across all nodes
- Memory usage per node  
- Storage capacity and performance per tier
- Network utilization on core interfaces
- vSAN health and status

**Regular Maintenance Tasks:**

- Review workload distribution monthly
- Monitor storage tier utilization trends
- Update VergeOS software consistently across cluster
- Test backup and recovery procedures regularly
- Validate failover capabilities quarterly

## Next Steps

After implementing HCI architecture:

1. **Optimize Performance:** Review [VergeOS Architecture Sizing and Performance Tuning](vergeos-architecture-sizing.md) for advanced optimization
2. **Plan Growth:** Consider when to transition to UCI architecture as requirements evolve
3. **Implement Advanced Features:** Explore VergeOS tenancy, backup, and disaster recovery features
4. **Monitor and Scale:** Establish monitoring practices and plan for future growth

## Related Resources

- [VergeOS UCI Architecture](vergeos-uci-architecture.md) - When and how to transition to ultra-converged architecture
- [Node Sizing Requirements](../implementation-guide/sizing.md) - Hardware planning for HCI deployments
- [Scale-Out Node Installation](../implementation-guide/scale-out-nodes.md) - Adding nodes to existing clusters
- [vSAN Storage Tiers](../product-guide/storage/storage-tiers.md) - Understanding VergeOS storage architecture

---

!!! info "HCI Implementation Support"
    HCI architecture provides an excellent balance of simplicity and performance for smaller deployments. For deployment planning assistance or optimization guidance, contact VergeOS Support for architectural consultation.
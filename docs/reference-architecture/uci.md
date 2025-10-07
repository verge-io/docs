# VergeOS UCI Architecture

## Overview

VergeOS UCI (Ultra Converged Infrastructure) architecture delivers exceptional deployment flexibility and performance. This three-cluster design completely separates controller, storage, and compute functions, enabling maximum specialization, independent scaling, and optimal performance for each resource type.

UCI is designed for enterprise environments with 10+ nodes where maximum performance, flexibility, and specialization are critical requirements that justify the additional complexity.

## What You'll Learn

After completing this guide, you'll be able to:

- Design and implement three-cluster UCI architectures
- Configure dedicated controller nodes optimized for management functions
- Deploy specialized storage-only clusters for maximum I/O performance
- Implement diverse compute clusters with different hardware specializations
- Optimize inter-cluster networking for high-performance operations
- Scale each resource type independently based on demand
- Manage complex multi-tenant environments with UCI

**Common Questions This Guide Answers:**

- "How do I configure dedicated controller nodes separate from storage?"
- "What's the optimal hardware configuration for each cluster type in UCI?"
- "How do I scale storage and compute independently in large deployments?"
- "What network architecture supports UCI performance requirements?"
- "How do I implement specialized compute clusters (GPU, high-memory, etc.)?"
- "What's the operational complexity of managing UCI deployments?"

## Requirements

**VergeOS Version:** v4.13 or later  
**Access Levels:** Cluster Admin, System Administrator  
**Prerequisites:** Experience with [Hybrid UCI Architecture](vergeos-hybrid-uci-architecture.md)

**Hardware Requirements:**

- Minimum 6 (typically 10+) nodes across three clusters
- Specialized hardware for different cluster functions
- High-bandwidth networking (25GbE minimum, 100GbE recommended)
- Enterprise-grade storage for controller and storage clusters

**Implementation Time:** 6-12 hours for initial deployment, additional time for optimization

## UCI Architecture Design

### Three-Cluster Model

UCI implements complete separation of functions across three specialized clusters:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    CLUSTER 1: Dedicated Controllers                         │
├─────────────────┬─────────────────┬─────────────────────────────────────────┤
│   Node 1        │   Node 2        │   Additional Controllers (optional)     │
│ Controller Only │ Controller Only │                                         │
│ (High Memory)   │ (High Memory)   │   • API & Management Operations         │
│ • Tier 0 Only   │ • Tier 0 Only   │   • Metadata Caching (750GB+ RAM)       │
│ • 1TB+ Memory   │ • 1TB+ Memory   │   • No Compute Workloads                │
└─────────────────┴─────────────────┴─────────────────────────────────────────┘

┌───────────────────────────────────────────────────────────────────────────┐
│                    CLUSTER 2: Dedicated Storage                           │
├─────────────────┬─────────────────┬─────────────────┬─────────────────────┤
│   Node 3        │   Node 4        │   Node 5        │   Node N (scale)    │
│ Storage Only    │ Storage Only    │ Storage Only    │ Storage Only        │
│ • Max Drives    │ • Max Drives    │ • Max Drives    │ • Max Drives        │
│ • Tier 1        │ • Tier 1        │ • Tier 1        │ • Tier 1            │
│ • No Compute    │ • No Compute    │ • No Compute    │ • No Compute        │
└─────────────────┴─────────────────┴─────────────────┴─────────────────────┘

┌───────────────────────────────────────────────────────────────────────────┐
│                    CLUSTER 3: Specialized Compute                         │
├─────────────────┬─────────────────┬─────────────────┬─────────────────────┤
│   Standard      │   GPU Compute   │   High-Memory   │   Additional        │
│   Compute       │                 │   Compute       │   Specialized       │
│ • General VMs   │ • AI/ML         │ • Databases     │   Compute           │
│ • Max CPU/RAM   │ • Graphics      │ • Analytics     │ • Custom Workloads  │ 
└─────────────────┴─────────────────┴─────────────────┴─────────────────────┘
```

!!! note
     This example uses a single workload tier of storage (Tier 1). VergeOS supports up to 5 workload [Storage Tiers](/product-guide/storage/storage-tiers/) of storage in a single System.

### Cluster Specialization Benefits

**Dedicated Controllers (Cluster 1):**

- **Maximum Management Performance:** All resources dedicated to API, metadata, and cluster management
- **Optimized Memory Allocation:** 750GB+ RAM for metadata caching and storage buffer operations
- **High Availability:** Multiple controller nodes for redundancy without compute interference
- **Predictable Performance:** No compute workloads to create resource contention

**Dedicated Storage (Cluster 2):**

- **Maximum I/O Performance:** All node resources dedicated to storage operations
- **Optimized Hardware:** Storage-optimized servers with maximum drive density
- **Independent Scaling:** Add storage capacity without affecting compute resources
- **Performance Isolation:** No compute overhead impacting storage performance

**Specialized Compute (Cluster 3):**

- **Maximum Compute Efficiency:** All resources available for VM workloads
- **Hardware Specialization:** Different node types optimized for specific workloads
- **Flexible Growth:** Scale compute independently based on workload demands
- **Workload Isolation:** Separate different types of compute workloads

!!! note "Multiple Compute Clusters"
    UCI supports deploying multiple compute clusters based on specific requirements. Organizations commonly implement separate compute clusters for GPU workloads (AI/ML), compute-only environments, licensing isolation (Oracle, Windows), or specialized hardware configurations. Each compute cluster can scale and operate independently while sharing the same controller and storage clusters.

## When to Choose UCI

### Enterprise Requirements Indicators

**Scale Requirements:**

- 10+ nodes with plans for significant growth
- 350TB+ usable capacity (700+ raw capacity) across your vSAN tiers
- Need for independent scaling of compute, storage, and management functions
- Complex multi-tenant environments requiring resource isolation

**Performance Requirements:**

- Maximum I/O performance for storage-intensive applications
- Need for specialized compute resources (GPU, high-memory, CPU-intensive)
- Requirements for predictable, high-performance management operations

**Operational Requirements:**

- Enterprise SLA requirements for availability and performance
- Complex compliance and security requirements
- Need for specialized hardware configurations

### UCI vs. Other Architectures

| **Requirement** | **HCI** | **Hybrid UCI** | **UCI** |
|-----------------|---------|----------------|--------------|
| **Maximum Performance** | Limited | Good | **Optimal** |
| **Hardware Flexibility** | Low | Medium | **Maximum** |
| **Independent Scaling** | No | Partial | **Complete** |
| **Specialization** | None | Limited | **Maximum** |
| **Complexity** | Low | Medium | **High** |
| **Resource Efficiency** | Variable | Good | **Maximum** |

## Implementation Guide

### Phase 1: Architecture Planning

**Cluster Sizing Strategy:**

```
Controller Cluster: 2 nodes
- Minimum: Node 1 & 2 (required for HA)
- Hardware: High-memory, fast storage, moderate CPU

Storage Cluster: 3-12+ nodes  
- Minimum: 3 nodes for balanced distribution
- Recommended: 5-8 nodes for optimal performance
- Hardware: Maximum drives, high-bandwidth networking

Compute Cluster: 5-50 nodes
- Variable based on workload requirements
- Multiple specialized node types supported
- Hardware: Optimized for specific compute workloads
```

**Hardware Specialization Planning:**

| **Cluster Type** | **CPU Focus** | **Memory Focus** | **Storage Focus** | **Network Focus** |
|------------------|---------------|------------------|-------------------|-------------------|
| **Controller** | Moderate (management) | **Maximum** (metadata cache) | **Tier 0 only** (high-endurance) | High (management traffic) |
| **Storage** | Moderate (I/O processing) | High (storage buffer) | **Maximum** (capacity + performance) | **Maximum** (storage traffic) |
| **Compute** | **Maximum** (VM workloads) | **Maximum** (VM memory) | Minimal (OS only) | Moderate (VM traffic) |

### Phase 2: Controller Cluster Deployment

**Step 1: Deploy Dedicated Controllers**

1. **Install Primary Controllers:**
   ```
   Node 1 Configuration:
   - CPU: Moderate core count (16-32 cores)
   - Memory: 1TB+ for large deployments
   - Storage: Tier 0 only (800GB-1.6TB high-endurance NVMe)
   - Network: High-bandwidth for management traffic
   
   Node 2 Configuration: (Match Node 1 specifications)
   ```

2. **Configure Controller Optimization:**

   - Set storage buffer allocation to 750GB+ per controller
   - Configure memory allocation for metadata caching
   - Disable compute workload scheduling on controllers
   - Optimize network settings for management traffic

3. **Validate Controller Performance:**

   - Test API response times under load
   - Verify metadata cache performance
   - Confirm storage buffer allocation effectiveness

**Step 2: Controller High Availability**

1. **Implement Controller Redundancy:**

   - Ensure both controllers are fully operational
   - Test failover scenarios between controllers
   - Configure monitoring and alerting for controller health

### Phase 3: Storage Cluster Deployment

**Step 1: Deploy Storage-Only Nodes**

1. **Configure Storage Nodes:**
   ```
   Storage Node Configuration:
   - CPU: Moderate (sufficient for I/O processing)
   - Memory: 256-512GB (1GB per TB of raw storage)
   - Storage: Maximum drive density (12-24 drives per node)
   - Network: High-bandwidth for storage traffic (25-100GbE)
   ```

2. **Storage Tier Distribution:**

   - Configure Tier 1+ across storage nodes (exclude Tier 0)
   - Maintain consistent drive configurations within tiers
   - Implement balanced distribution across storage nodes
   - Plan for different performance tiers based on workload requirements

3. **Storage Performance Optimization:**

   - Configure storage-specific buffer allocation
   - Optimize network settings for storage traffic
   - Implement storage QoS policies
   - Monitor and tune storage performance

**Step 2: Storage Scaling and Management**

1. **Implement Storage Monitoring:**

   - Track I/O performance across all storage nodes
   - Monitor capacity utilization by tier
   - Implement alerting for storage performance issues

2. **Plan Storage Growth:**

   - Calculate storage scaling requirements
   - Plan for additional storage tiers as needed
   - Implement capacity management procedures

### Phase 4: Compute Cluster Deployment

**Step 1: Standard Compute Nodes**

1. **Deploy General-Purpose Compute:**
   ```
   Standard Compute Node:
   - CPU: Maximum cores for VM workloads (32-64+ cores)
   - Memory: Maximum RAM for VMs (512GB-2TB+)
   - Storage: Minimal (OS and cache only)
   - Network: Sufficient for VM traffic
   ```

2. **Configure Compute Optimization:**

   - Maximize resources available for VM workloads
   - Configure CPU and memory oversubscription ratios
   - Implement VM placement and balancing policies

**Step 2: Specialized Compute Nodes**

1. **GPU Compute Nodes:**
   ```
   GPU Node Configuration:
   - CPU: High core count for GPU support
   - Memory: High capacity for GPU workloads  
   - GPU: Enterprise-grade GPUs (NVIDIA Tesla/A100, etc.)
   - Cooling: Enhanced cooling for GPU operations
   - Power: High-capacity power delivery
   ```

2. **High-Memory Compute Nodes:**
   ```
   High-Memory Node Configuration:
   - CPU: Moderate to high core count
   - Memory: Ultra-high capacity (2TB-8TB+)
   - Storage: Minimal local storage
   - Use Cases: In-memory databases, large-scale analytics
   ```

3. **CPU-Intensive Compute Nodes:**
   ```
   CPU-Intensive Node Configuration:
   - CPU: Maximum core count and frequency
   - Memory: Adequate for CPU workloads
   - Cooling: Enhanced cooling for high CPU utilization
   - Use Cases: Scientific computing, rendering, simulation
   ```

## Network Architecture for UCI

### Inter-Cluster Network Design

**Network Bandwidth Planning:**
```
Controller to Storage: High bandwidth for metadata operations
Storage to Compute: Maximum bandwidth for VM I/O operations  
Controller to Compute: Moderate bandwidth for management operations

Recommended Network Architecture:
- Core Network: 100GbE for storage traffic
- Management Network: 25GbE for control plane
- External Network: Based on VM requirements
```

**Network Optimization Strategies:**
- Implement spine-leaf architecture for large deployments
- Use dedicated networks for different traffic types
- Implement QoS policies for traffic prioritization
- Plan for network redundancy and failover

### Performance Monitoring and Management

**Inter-Cluster Communication:**
- Monitor latency between all cluster pairs
- Track bandwidth utilization on core networks
- Implement alerting for network performance degradation
- Plan for network capacity scaling

## Scaling UCI Deployments

### Independent Scaling Strategies

**Controller Scaling:**
- Add additional controller nodes for API capacity
- Scale memory and storage buffer allocation
- Implement load balancing across controllers

**Storage Scaling:**
- Add storage nodes based on capacity and performance requirements
- Implement new storage tiers for different workload needs
- Scale storage buffer allocation based on total capacity

**Compute Scaling:**
- Add specialized compute nodes based on workload demands
- Implement different compute node types for diverse requirements
- Scale compute resources independently of storage growth

### Compute-to-Storage Ratios for UCI

**Optimal Ratios by Workload Type:**

| **Workload Type** | **Compute:Storage Ratio** | **Specialization Notes** |
|-------------------|---------------------------|--------------------------|
| **General Enterprise** | 4-5:1 | Balanced compute and storage growth |
| **VDI/Desktop** | 6-8:1 | High compute density, moderate storage |
| **AI/ML** | 3-4:1 | GPU nodes, high-performance storage |
| **Database/Analytics** | 2-3:1 | High-memory nodes, fast storage |
| **Archive/Backup** | 8-10:1 | Standard compute, high-capacity storage |

## Advanced UCI Features

### Multi-Tenant Deployments

**Tenant Isolation Strategies:**
- Dedicated compute clusters per major tenant
- Shared storage with tenant-specific tiers
- Network segmentation and isolation
- Resource allocation and billing per tenant

**Service Provider Benefits:**
- Maximum resource efficiency through specialization
- Flexible service offerings based on specialized hardware
- Independent scaling of services
- Comprehensive monitoring and billing capabilities

### Disaster Recovery and High Availability

**Cluster-Level Redundancy:**
- Multi-site controller deployment
- Storage replication across sites
- Compute cluster failover capabilities
- Network redundancy and failover

**Maintenance and Updates:**
- Cluster-by-cluster maintenance windows
- Rolling updates with minimal service impact
- Independent testing and validation per cluster

## Troubleshooting UCI

### Complex Environment Challenges

| **Challenge** | **Symptoms** | **Resolution Strategy** |
|---------------|--------------|-------------------------|
| **Inter-Cluster Latency** | Slow VM I/O, delayed operations | Upgrade networking, optimize traffic routing |
| **Controller Bottlenecks** | API timeouts, slow management | Scale controller cluster, optimize buffer allocation |
| **Storage Imbalance** | Uneven performance across storage nodes | Rebalance storage distribution, add capacity |
| **Compute Resource Waste** | Underutilized specialized nodes | Optimize workload placement, adjust node types |
| **Network Congestion** | High latency, packet loss | Implement QoS, upgrade network infrastructure |

### Monitoring and Maintenance

**Comprehensive Monitoring Strategy:**
- Cluster-specific performance dashboards
- Inter-cluster communication monitoring
- Resource utilization tracking across all clusters
- Predictive capacity planning and alerting

**Regular Maintenance Procedures:**
- Monthly performance review across all clusters
- Quarterly capacity planning and optimization
- Semi-annual disaster recovery testing
- Annual architecture review and optimization

## Next Steps

After implementing UCI:

1. **Advanced Optimization:** Complete [Architecture Sizing and Performance Tuning](vergeos-architecture-sizing.md)
2. **Operational Excellence:** Implement comprehensive monitoring, alerting, and automation
3. **Capacity Planning:** Develop long-term scaling strategies for each cluster type
4. **Disaster Recovery:** Implement multi-site UCI for maximum availability

## Related Resources

- [VergeOS Architecture Sizing and Performance Tuning](vergeos-architecture-sizing.md) - Essential for UCI optimization
- [VergeOS Hybrid UCI Architecture](vergeos-hybrid-uci-architecture.md) - Migration path to UCI
- [Network Design Models](../implementation-guide/network-design.md) - Network architecture for UCI
- [Node Sizing Requirements](../implementation-guide/sizing.md) - Hardware specifications for specialized nodes

---

!!! info "UCI Implementation Support"
    UCI architecture delivers maximum performance and flexibility but requires significant expertise for optimal implementation. Due to the complexity of UCI deployments, VergeOS strongly recommends engaging with VergeOS Professional Services for architecture planning, implementation guidance, and optimization consultation.
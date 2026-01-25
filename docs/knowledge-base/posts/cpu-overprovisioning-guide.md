---
title: CPU Overprovisioning and Resource Planning
slug: cpu-overprovisioning-guide
description: Understanding CPU allocation, overcommit ratios, and performance implications in VergeOS
author: Verge.io
published: true
date: 2026-01-24
tags:
  - CPU
  - performance
  - capacity planning
  - cluster
  - resources
  - overcommit
categories:
  - System Administration
  - Best Practices
---

# CPU Overprovisioning and Resource Planning

## Overview

CPU overprovisioning (also called overcommit) allows you to allocate more virtual CPU cores to workloads than you have physical cores available. This guide explains how VergeOS handles CPU resources, the implications of overprovisioning, and best practices for capacity planning.

## How VergeOS CPU Allocation Works

### Virtual vs Physical Cores

When you assign vCPUs to a VM, you're allocating **virtual cores** that are scheduled onto physical CPU cores. VergeOS does not reserve physical cores exclusively for VMs—instead, it uses time-slicing to share physical resources.

**Key points:**
- vCPUs are not pinned to physical cores by default
- Multiple vCPUs from different VMs can share the same physical core
- The hypervisor scheduler manages CPU time allocation

### The "Max cores per machine" Setting

This cluster setting controls the maximum number of CPU cores that can be allocated to a single workload (VM, tenant node, or NAS service).

**Location:** Infrastructure > Clusters > [Cluster Name] > Edit

!!! warning "Critical Constraints"
    - This value should **never exceed** the total physical cores on your smallest node
    - In most cases, keep it **within a single CPU socket** for optimal NUMA performance
    - VMs exceeding this limit after a change **cannot migrate** until cores are reduced

## CPU Overcommit Ratios

### What is an Overcommit Ratio?

The ratio of total allocated vCPUs to total physical cores:

```
Overcommit Ratio = Total Allocated vCPUs / Total Physical Cores
```

**Example:** A 2-node cluster with 32 cores each (64 total) running VMs with 96 total vCPUs has a 1.5:1 overcommit ratio.

### Recommended Ratios by Workload Type

| Workload Type | Ratio | Notes |
|---------------|-------|-------|
| Light/Office workloads | 4:1 to 6:1 | Desktop VMs, file servers |
| Mixed general purpose | 2:1 to 4:1 | Typical enterprise mix |
| Database/Application servers | 1:1 to 2:1 | Performance-sensitive |
| High-performance computing | 1:1 or less | CPU-bound workloads |

!!! tip "Start Conservative"
    Begin with lower ratios and increase based on monitoring. It's easier to add capacity than recover from poor performance.

## Performance Implications

### When Overcommit Works Well

- **Bursty workloads:** VMs that have occasional CPU spikes but are mostly idle
- **Diverse timing:** Workloads that peak at different times
- **I/O-bound applications:** VMs waiting on disk or network more than CPU

### When Overcommit Causes Problems

- **CPU-bound workloads:** Applications constantly using 100% CPU
- **Latency-sensitive applications:** Real-time systems, VoIP, trading
- **Simultaneous demand:** All VMs needing CPU at the same time

### Signs of Over-Overcommitment

1. **High CPU ready time:** VMs waiting for physical CPU availability
2. **Inconsistent performance:** Applications performing well sometimes, poorly other times
3. **Guest OS showing high CPU:** But hypervisor shows lower utilization

## Capacity Planning

### Calculating Available CPU Capacity

For a cluster with N+1 redundancy:

```
Available Cores = (Nodes - 1) × Cores per Node
Usable vCPUs = Available Cores × Target Overcommit Ratio
```

**Example:** 4-node cluster, 32 cores each, 2:1 target ratio
- Available: (4-1) × 32 = 96 cores
- Usable vCPUs: 96 × 2 = 192 vCPUs

### Migration Considerations

When a node fails or enters maintenance:
- All VMs must fit on remaining nodes
- Each VM must fit within the "Max cores per machine" setting
- VMs with many vCPUs may become stranded if no single node can host them

!!! warning "Migration Readiness"
    If a VM has 64 vCPUs but your nodes only have 32 cores, that VM **cannot migrate** during maintenance or failure events. Keep VM core counts within single-node capacity.

## Best Practices

### General Guidelines

1. **Monitor before allocating:** Understand actual CPU usage patterns before adding capacity
2. **Size VMs appropriately:** Start with fewer vCPUs and increase based on need
3. **Reserve headroom:** Keep 20-30% capacity available for bursts and failover
4. **Use CPU limits sparingly:** They prevent VMs from using available idle resources

### Cluster Design

1. **Consistent node sizing:** Makes capacity planning simpler
2. **Plan for N+1:** Always assume one node will be unavailable
3. **Document assumptions:** Record your overcommit targets and reasons

### VM Configuration

1. **Match vCPUs to workload:** More vCPUs does not always mean better performance
2. **Consider NUMA:** For large VMs, keep vCPUs within NUMA node boundaries
3. **Test performance:** Benchmark with realistic workloads

## Monitoring CPU Health

### Key Metrics to Watch

| Metric | Healthy Range | Action if Exceeded |
|--------|---------------|-------------------|
| Cluster CPU utilization | < 70% average | Add nodes or reduce VMs |
| Node CPU utilization | < 80% sustained | Check VM distribution |
| Individual VM CPU | Varies by workload | Right-size or investigate |

### Using the VergeOS Dashboard

1. Navigate to **Infrastructure** > **Clusters**
2. View CPU utilization graphs
3. Click individual nodes to see per-node metrics
4. Check VM CPU statistics under each VM's dashboard

For more details on cluster monitoring, see [Clusters Overview](/product-guide/system/clusters-overview/).

## FAQ

### Can I assign more vCPUs than physical cores to a single VM?

Yes, but it's rarely beneficial. A VM with more vCPUs than physical cores on a node can experience scheduling delays as the hypervisor waits for enough cores to become available simultaneously.

### Does VergeOS support CPU pinning?

VergeOS does not support CPU pinning (affinity). Under the hood, VergeOS uses the Linux Completely Fair Scheduler (CFS) for CPU scheduling. Each vCPU is mapped to a Linux process/thread, and all vCPU threads share the same CFS run queue. The scheduler uses global fairness logic to determine which process gets CPU time and in what order.

This design ensures optimal resource utilization and maintains VM mobility for live migration and failover. When you oversubscribe CPU resources, you are sharing that pool of physical cores with other VMs and tenants.

### How does this affect software licensing?

Some software (Oracle, SQL Server) is licensed per physical core or socket. VergeOS's dynamic scheduling means you cannot "hard partition" CPU resources. Consult your software vendor's virtualization licensing policies—many offer per-vCPU or per-VM licensing models that work better with modern hypervisors.

### What about NUMA?

For VMs with many vCPUs, VergeOS attempts to keep memory and CPU allocations within the same NUMA node when possible. For best NUMA performance, keep VM vCPU counts at or below a single socket's core count.

---

## Related Topics

- [Clusters Overview](/product-guide/system/clusters-overview/) - Understanding cluster architecture
- [Cluster Configuration Options](/product-guide/system/cluster-settings/) - All cluster settings explained
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices/) - Recommendations for VM configuration
- [Creating Virtual Machines](/product-guide/virtual-machines/creating-vms/) - VM creation guide
- [Live Migrations](/product-guide/virtual-machines/live-migrations/) - Moving VMs between nodes

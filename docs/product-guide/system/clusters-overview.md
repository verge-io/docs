VergeOS Clusters Overview
# VergeOS Clusters Overview

## What is a Cluster?

   - A group of nodes with the same hardware characteristics
   - Forms a logical resource pool presented as usable assets in the VergeOS user interface
   - This enables efficient management, scaling, and high availability for virtualized workloads.

## Purpose of Clusters

### Optimized Performance for Different Workloads

Different workloads have varying performance requirements, and clusters allow you to create hardware configurations tailored to these specific needs. You can design clusters with different specifications such as:

- Memory-to-core ratios optimized for specific applications
- Faster CPUs for compute-intensive workloads
- High-performance storage (NVMe, SSD) for I/O-intensive applications
- Specialized hardware passthrough capabilities (e.g. GPUs, vGPUs)
- Network interface configurations for bandwidth-sensitive workloads

### Workload Organization

Workloads (VMs, tenants, NAS services, etc.) are assigned to specific clusters and optionally configured with failover clusters. This assignment ensures that workloads run on the appropriate hardware infrastructure that matches their performance and availability requirements.


## Cluster Types

VergeOS supports three distinct cluster types that can be mixed and matched within a single system:

* **Combined Compute and Storage (HCI) Clusters** - Nodes provide processing power and memory for workloads and participate in the virtual storage area network (vSAN)
* **Storage-Only Clusters** - Dedicated exclusively to storage services; nodes contribute to the virtual storage area network (vSAN)
* **Compute-Only Clusters** - Nodes dedicated exclusively to compute resources (no participation in vSAN storage).
Compute clusters contain boot-only storage or can be configured for PXE boot.

## System Flexibility

A single VergeOS system can contain multiple clusters in any combination of the available types. This flexibility allows organizations to:

- Start with a simple configuration and expand with specialized clusters as needs evolve
- Optimize resource allocation based on workload characteristics
- Implement cost-effective scaling strategies by adding only the resources needed
- Support diverse application portfolios with varying performance requirements

## Cluster Requirements

* **Minimum Node Count**: Each cluster requires **at least two nodes** to maintain system redundancy and ensure high availability during maintenance operations or hardware failures.

* **Controller Nodes (Tier 0 Storage)**: The **first cluster** in a VergeOS system must include at least two nodes with a storage tier dedicated to VergeOS metadata (Tier 0). These controller nodes are essential for system management and operations.

### Scalability Design

Clusters are designed with scalability in mind:  

  - **Scale-out capability**: Additional nodes can be added to existing clusters as requirements grow  
  - **Dynamic expansion**: Clusters can be expanded without system downtime  
  - **Flexible growth**: Organizations can scale compute and storage independently based on actual needs  

## Cluster Management

### Initial Configuration
Clusters are created during the VergeOS installation process with default settings, including Default CPU type based on detected CPU hardware. 

### Customization and Optimization
After installation, cluster settings can be adjusted through the VergeOS user interface to tune performance, security and operational settings.  See **[Cluster Settings](/product-guide/system/cluster-settings)** for detailed cluster configuration information.


## Best Practices

**Hardware Standardization:**  
Use consistent hardware specifications within each cluster. Using different node hardware within the same cluster can cause performance and reliability issues.

**Planning Cluster Architecture:** 

  - Assess workload requirements before designing cluster configurations
  - Plan for future growth when determining initial cluster sizing
  - Consider network topology and connectivity requirements
  - Evaluate data locality and performance implications

**Performance Optimization:**  

  - Match cluster specifications to workload characteristics  
  - Monitor utilization patterns and adjust configurations as needed  

---

*Clusters provide the foundation for VergeOS's flexible and scalable architecture, enabling organizations to build infrastructure that adapts to their specific workload requirements while maintaining operational simplicity and high availability.*

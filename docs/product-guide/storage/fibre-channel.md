# Using Fibre Channel Storage with vSAN

## Overview

VergeOS vSAN supports the use of Fibre Channel (FC) LUNs as storage devices within its tiered architecture. This enables seamless integration with your existing SAN infrastructure while benefiting from vSAN's native performance, redundancy, and efficiency.

!!! note "Physical Disks vs. Fibre Channel LUNs"
    While VergeOS vSAN supports Fibre Channel LUNs, **Verge.io recommends using physical disks directly attached to nodes** for optimal performance and simplicity. Physical disks provide:
    
    - **Simpler configuration** - No FC zoning, HBA management, or SAN coordination required
    - **Better performance** - Direct access without SAN overhead and network bottlenecks  
    - **Lower complexity** - Fewer failure points and easier troubleshooting
    - **Cost efficiency** - No need for FC infrastructure, HBAs, or SAN licensing
    
    Consider FC LUNs primarily when you have existing SAN investments or specific compliance requirements. 

## Implementation Requirements

### Hardware

- Physical disks in VergeOS Systems vSAN [**Tier 0**](/product-guide/storage/storage-tiers/#tier-0-metadata-tier)
- FC Host Bus Adapters (HBAs) in at least two cluster nodes  
- Compatible FC switches (8/16/32 Gb)  
- Redundant FC fabric highly recommended
- FC storage array with available LUNs

    !!! warning "Unique LUNs Per Node"
        Unlike traditional shared-storage clustering, VergeOS vSAN expects **each node to be presented with its own unique LUN(s)**. Do **NOT** present the same LUNs to multiple nodes. **VergeOS treats Fibre Channel LUNs no different than physical disks.**

### Fabric Configuration

- WWPN-based zoning configured  
- Each node is assigned **dedicated** LUNs (They are treated like they are physical disks)
- Redundant physical paths per node  

!!! tip "One LUN Per Physical Disk"
    For maximum efficiency and to avoid duplicate redundancy, we recommend **mapping each FC LUN to a dedicated physical disk**.

!!! tip "Deduplication"
    VergeOS vSAN handles data deduplication natively at the block level. When using external storage with vSAN, you should disable deduplication on your SAN if it does not support cross-LUN deduplication. If your SAN supports global deduplication, we recommend leaving it enabled to reduce overall storage consumption. For redundancy, VergeOS will always store two copies of your data on the FC LUNs being used as a tier of vSAN storage.

!!! warning "Turn Off Storage Redundancy"
    VergeOS vSAN handles data redundancy natively. You should **disable RAID and automatic tiering features** on the SAN for LUNs used by VergeOS.

## Path Management

### Multipath Configuration

By default, VergeOS manages multiple paths to each LUN in an active/passive configuration:

- **Primary Path** – Used for I/O  
- **Secondary Paths** – Automatically activated on failure  
- **Failover Timeout** – 7-second delay before switching  
- **Path Recovery** – Alternate path remains active until manually overridden

!!! info "VergeOS Path Optimization"
    VergeOS automatically selects the best path for each LUN based on internal algorithms. It's normal to see multiple disks with identical serial numbers in the UI—this does **not** indicate a problem.

## Configuration Steps

1. **Prepare the FC Environment**:
   - Set up WWPN zoning on the FC switch  
   - Present unique LUNs to each node - **Reminder, they are treated like they are physical disks**
   - Confirm multipath availability per node  

2. **Add Storage to vSAN**:
   - Open the **Storage Tiers** section in the VergeOS UI  
   - Select the tier where FC LUNs will be added  
   - Apply the configuration  
   - Confirm that drives appear in the desired tier

!!! warning "Always Scale-Up"
    We recommend adding all Fibre Channel LUNs via [**Scaling Up a vSAN**](/knowledge-base/scaling-up-a-vsan) procedure.

!!! warning "Use Maintenance Mode"
    Always enter [**Maintenance Mode**](/product-guide/operations/maintenance-mode) before modifying storage configurations.

## Best Practices

### Path Management

- Use redundant physical connections per node  
- Test failover functionality regularly  
- Keep HBA firmware updated  
- Monitor path health proactively  

### Performance Optimization

- Distribute LUNs evenly across paths  
- Monitor queue depth and I/O throughput  
- Adjust HBA settings if needed  
- Avoid oversubscribing a single LUN with multiple VMs  

!!! info "Core Network Bandwidth Consideration"
    VergeOS vSAN uses the core network when reading/writing data. This means that during a write operation, the system sends the data to two nodes simultaneously over the core network.
    If your Fibre Channel SAN supports 32 Gb speeds but your core network is 25 Gb, the maximum write throughput will be constrained by the core network, not the SAN.
    To maximize performance, ensure the core network is greater than the FC SAN bandwidth, especially for write-intensive workloads.

## Monitoring and Maintenance

## Troubleshooting

### Path Failures

- Check physical connections  
- Confirm FC switch zoning  
- Review HBA logs and driver status  
- Validate storage array health  

### Performance Bottlenecks

- Check queue depths and path load  
- Confirm proper multipath usage  
- Identify oversubscription of specific LUNs  

## Related Documentation

- [Storage Tiers](/product-guide/storage/storage-tiers)  
- [vSAN Architecture](/product-guide/storage/vsan-architecture)  
- [Maintenance Mode](/product-guide/operations/maintenance-mode)  
- [System Monitoring](/product-guide/system/subscriptions-overview)

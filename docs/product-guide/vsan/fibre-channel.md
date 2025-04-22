# Using Fibre Channel Storage with vSAN

## Overview

VergeOS vSAN supports the use of Fibre Channel (FC) LUNs as storage devices within its tiered architecture. This enables seamless integration with your existing SAN infrastructure while benefiting from vSAN’s native performance, redundancy, and efficiency.

!!! info "VergeOS Path Optimization"
    VergeOS automatically selects the best path for each LUN based on internal algorithms. It’s normal to see multiple disks with identical serial numbers in the UI—this does **not** indicate a problem.

!!! warning "Unique LUNs Per Node"
    Unlike traditional shared-storage clustering, VergeOS vSAN expects **each node to be presented with its own unique LUN(s)**. Do **not** present the same LUNs to multiple nodes.

## Path Management

### Multipath Configuration

VergeOS manages multiple paths to each LUN in an active/passive configuration:

- **Primary Path** – Used for I/O  
- **Secondary Paths** – Automatically activated on failure  
- **Failover Timeout** – 7-second delay before switching  
- **Path Recovery** – Alternate path remains active until manually overridden

!!! note "Default Behavior"
    Multipathing is automatically enabled in VergeOS 4.13 and later.

## Implementation Requirements

### Hardware

- FC Host Bus Adapters (HBAs) in at least two cluster nodes  
- Compatible FC switches (8/16/32 Gb)  
- FC storage array with available LUNs  
- Redundant FC fabric highly recommended  

### Fabric Configuration

- WWPN-based zoning configured  
- Each node is assigned **dedicated** LUNs  
- Redundant physical paths per node  

!!! tip "One LUN Per Physical Disk"
    For maximum efficiency and to avoid duplicate redundancy, we recommend **mapping each FC LUN to a dedicated physical disk**.

!!! warning "Turn Off Storage Redundancy"
    VergeOS vSAN handles data redundancy and deduplication natively. You should **disable RAID, deduplication, or tiering features** on the SAN for LUNs used by VergeOS.

## Configuration Steps

1. **Prepare the FC Environment**:
   - Set up WWPN zoning on the FC switch  
   - Present unique LUNs to each node  
   - Confirm multipath availability per node  

2. **Add Storage to vSAN**:
   - Open the **Storage Tiers** section in the VergeOS UI  
   - Select the tier where FC LUNs will be added  
   - Apply the configuration  
   - Confirm that drives appear in the desired tier  

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

!!! warning "Use Maintenance Mode"
    Always enter [**Maintenance Mode**](/product-guide/system/maintenance-mode) before modifying storage configurations.

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

- [Storage Tiers](/product-guide/vsan/storage-tiers)  
- [vSAN Architecture](/product-guide/vsan/architecture)  
- [Maintenance Mode](/product-guide/system/maintenance-mode)  
- [System Monitoring](/product-guide/system/subscriptions-overview)


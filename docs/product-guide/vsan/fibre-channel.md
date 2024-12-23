# Using Fibre Channel Storage with vSAN

## Overview

VergeOS vSAN can utilize Fibre Channel (FC) LUNs as storage devices within its tiered architecture. This feature allows you to leverage existing FC storage infrastructure while maintaining vSAN's built-in redundancy and performance benefits.

## Path Management

### Multipath Configuration

The system automatically manages multiple paths to FC LUNs in an active/passive configuration:

- **Primary Path**: Designated as the main I/O channel
- **Secondary Paths**: Available for automatic failover
- **Failover Timeout**: 7-second delay before path switching
- **Path Recovery**: System maintains alternate path until manually restored

### Path States

* **Active**: Currently handling I/O operations
* **Passive**: Available for failover
* **Failed**: Detected as non-functional
* **Disabled**: Manually taken offline

!!! note "Default Configuration"
    Multipathing is enabled by default in VergeOS 4.13 and later versions.

## Implementation Requirements

### Hardware Prerequisites

- FC Host Bus Adapters (HBAs) installed in minimum 2 cluster nodes
- Compatible FC switches (8/16/32 Gb)
- FC storage array with available LUNs
- Redundant FC fabric recommended

### Network Requirements 

- Properly zoned FC fabric
- Consistent LUN presentation across nodes
- Redundant physical paths recommended

## Configuration Steps

1. **Prepare FC Environment**:
    - Configure FC switch zoning using WWPN-based zoning
    - Map LUNs consistently across nodes
    - Verify multipath configuration on each node

2. **Add Storage to vSAN**:
    - Navigate to Storage Tiers configuration
    - Select desired tier for FC LUNs
    - Apply changes to implement in vSAN
    - Verify storage appears in selected tier

## Best Practices

- **Path Management**:
    - Configure redundant physical paths
    - Test failover functionality regularly 
    - Keep HBA firmware updated
    - Monitor path status proactively

- **Performance Optimization**:
    - Balance LUNs across available paths
    - Monitor I/O patterns
    - Adjust queue depths if needed
    - Consider MPIO settings for workload

!!! warning "Configuration Changes"
    Always use [**Maintenance Mode**](/product-guide/system/maintenance-mode) when modifying storage configuration to prevent workload disruption.

## Monitoring and Maintenance

### Key Metrics to Monitor

- Path status and health
- I/O latency and throughput
- Error rates
- Queue depth utilization

### Recommended Maintenance Tasks

- Regular path failover testing
- HBA firmware updates
- FC switch firmware maintenance 
- Performance baseline monitoring

!!! tip "Proactive Monitoring"
    Configure [**Subscriptions**](/product-guide/system/subscriptions-overview) to receive alerts for path failures, performance issues or error conditions.

## Troubleshooting

Common issues and solutions:

1. **Path Failures**:
    - Check physical connections
    - Verify switch zoning
    - Review HBA status
    - Check storage array health

2. **Performance Issues**:
    - Monitor queue depths
    - Review multipath settings
    - Check for bottlenecks
    - Analyze I/O patterns

## Related Documentation

- [Storage Tiers](/product-guide/vsan/storage-tiers)
- [vSAN Architecture](/product-guide/vsan/architecture)
- [Maintenance Mode](/product-guide/system/maintenance-mode)
- [System Monitoring](/product-guide/system/subscriptions-overview)

# VergeOS vSAN Scale Up Guide

This guide provides best practices for safely scaling up storage capacity in a VergeOS system by adding drives to existing nodes. It focuses on data security and system resilience through a methodical approach.

!!! abstract "Overview"
    Scaling up a vSAN requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into main phases:

    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Scale Up Verification** - Final checks immediately before beginning the scale up
    3. **Scale Up Execution** - The process of adding and configuring new storage
    4. **Post-Scale Up Verification** - Ensuring the scale up was successful

!!! info "Environment-Specific Requirements"
    This guide covers general best practices. You may need to adapt these steps for your specific environment and requirements.

## Prerequisites

- Administrative access to VergeOS system
- IPMI access to all nodes in the cluster
- New storage drives properly tested and validated
- Physical access to nodes for drive installation
- **Estimated time:** 1-3 hours depending on data rebalancing

## Preparation Phase

Complete these steps well before your scheduled maintenance window:

### System Readiness

- [ ] Ensure system snapshot retention is sufficient for potential rollback
- [ ] Set specific success and verification criteria for your workloads
- [ ] Identify cohorts of VMs, services, etc. required for your particular use case

!!! example "Use Case Examples"
    VDI may have several distinct images or resource pools. VPS may focus more on network functionality and connectivity.

- [ ] Map any time-sensitive system and guest events that must continue functioning

### Hardware Preparation

- [ ] Disks pre-tested in non-production host(s)
- [ ] New disks are "like" to existing disks in the tier (same or similar performance characteristics)
- [ ] Verify drive compatibility with existing hardware
- [ ] Plan drive placement strategy (distribute across nodes for optimal performance)

### Documentation and Planning

- [ ] Update platform documentation with planned drive additions
- [ ] Document current vSAN configuration for rollback reference
- [ ] Plan communication timeline for affected users

### Resource Verification

- [ ] Check cluster resource utilization
    - Ensure your system has enough spare resources to lose your largest node
- [ ] Confirm network paths among hosts
    - From Node1: Node Diagnostics -> 'Fabric Configuration' reports Core1 and Core2 paths 'confirmed:true' for all existing nodes
- [ ] Confirm IPMI access to all hosts via a method that allows console access in emergencies

## Pre-Scale Up Verification

Perform these checks on the day of scheduled maintenance, before beginning the scale up:

### Current State Verification

- [ ] Resource availability - System is N+1
    - Verify RAM usage is enough to run workloads with a node offline
    - Verify vSAN tier being scaled is <90% full
- [ ] Cloud Snapshots are recent and available
    - Set the most recent Snapshot to expire several days in the future for extra retention
- [ ] Confirm multi-site syncing is functional and up to date
- [ ] Verify all vSAN tiers are in a healthy state (green status)
- [ ] Confirm no nodes are pending a reboot
- [ ] Verify Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all existing nodes
- [ ] Record current vSAN tier capacity and usage for comparison

## Execution Phase

### Adding New Storage

For detailed step-by-step instructions on performing the vSAN scale up, please refer to:

[Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan)

### Key Process Overview

1. **Power down target node** (if hot-swap not supported)
2. **Install new drives** following manufacturer guidelines
3. **Power up node** and verify drive detection
4. **Add drives to vSAN tier** via VergeOS UI
5. **Monitor data rebalancing** - this may take significant time
6. **Repeat for additional nodes** as planned

!!! warning "Critical Wait Period"
    During the scale up process, the vSAN Tier will show a yellow status during the rebuild stage. It is essential to wait for the vSAN tier to return to a "green" healthy status before continuing to the next node.

!!! tip "Monitoring Progress"
    Monitor vSAN rebalancing progress in the VergeOS UI under System -> vSAN. The process will show completion status and available capacity updates.

## Post-Scale Up Verification

After the scale up completes, verify the system is operating correctly:

### System Health Checks

- [ ] Verify all new drives are recognized and added to the appropriate vSAN tier
- [ ] Confirm increased storage capacity is reflected in the UI
- [ ] Verify vSAN tier shows green status across all nodes
- [ ] Test/confirm guest systems as required per your success criteria
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps
- [ ] Confirm data distribution is balanced across all drives

### Capacity Validation

- [ ] Verify new capacity is available for VM storage
- [ ] Test storage allocation on the expanded tier
- [ ] Monitor storage performance post-expansion
- [ ] Confirm no degradation in existing workload performance

## Troubleshooting

### Common Issues

**vSAN tier remains yellow after extended time**

- Verify all new drives are properly seated and detected
- Check for drive errors in system logs
- Ensure sufficient network bandwidth for rebalancing
- Contact support if rebalancing stalls

**New drives not detected**

- Verify physical drive installation
- Check RAID controller configuration if applicable
- Confirm drive compatibility with existing hardware
- Review system logs for hardware detection issues

**Performance degradation during rebalancing**

- This is normal during vSAN rebalancing
- Consider throttling workloads during maintenance window
- Monitor system resources and adjust if necessary

**Capacity not reflecting correctly**

- Allow time for vSAN to complete initialization
- Verify drives were added to correct tier
- Check for any failed drive states

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem. Removing drives after data has been written may require data migration.

### If Rollback is Required
1. **Stop any ongoing operations** if possible
2. **Document the current state** and error conditions
3. **Power down affected node** if drive removal is necessary
4. **Remove problematic drives** only if they haven't been integrated
5. **Allow vSAN to stabilize** before making further changes

## Next Steps

After successful scale up completion:

- [ ] Update capacity planning documentation
- [ ] Adjust monitoring thresholds for new capacity
- [ ] Review backup and snapshot policies for increased data
- [ ] Plan for future scaling needs based on growth projections
- [ ] Schedule follow-up performance monitoring

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS vSAN scale up, please contact [our support team](/support) for immediate assistance.

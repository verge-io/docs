# VergeOS vSAN Scale Out Guide

This guide provides best practices for safely scaling out a VergeOS system by adding a new node. It focuses on data security and system resilience through a methodical approach.

!!! abstract "Overview"
    Scaling out a VergeOS system requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into main phases:

    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Scale Out Verification** - Final checks immediately before beginning the scale out
    3. **Scale Out Execution** - The process of adding a new node
    4. **Post-Scale Out Verification** - Ensuring the scale out was successful

!!! info "Environment-Specific Requirements"
    This guide covers general best practices. You may need to adapt these steps for your specific environment and requirements.

## Prerequisites

- Administrative access to VergeOS system
- IPMI access to all nodes in the cluster
- New node hardware properly racked and connected
- Network connectivity verified for new node
- USB drive with appropriate VergeOS installer version
- **Estimated time:** 2-4 hours depending on data rebuild and cluster size

!!! warning "Important"
    Ensure you have a maintenance window that accounts for potential rebuild time. vSAN data redistribution can take several hours depending on the amount of data and storage performance.

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

- [ ] Confirm IPMI access to all existing hosts
    - Via a method that may allow console access in an emergency scenario
- [ ] Include the new node to be added in this maintenance planning
- [ ] Verify VergeOS is a currently supported version
    - VergeOS is running the most recent release
- [ ] USB drive prepped with appropriate installer version

### Documentation and Planning

- [ ] Update platform documentation (ports, IPs, VLANs, etc.)
- [ ] Document current cluster configuration for rollback reference
- [ ] Plan communication timeline for affected users

### Resource Verification

- [ ] Check cluster resource utilization
    - Ensure your system has enough spare resources to lose your largest node
- [ ] Confirm network paths among hosts
    - From Node1: Node Diagnostics -> 'Fabric Configuration' reports Core1 and Core2 paths 'confirmed:true' for all existing nodes

## Pre-Scale Out Verification

Perform these checks on the day of scheduled maintenance, before beginning the scale out:

### Current State Verification

- [ ] Resource availability - System is N+1
    - Verify RAM usage is enough to run workloads with a node offline
- [ ] Cloud Snapshots are recent and available
    - Set the most recent Snapshot to expire several days in the future for extra retention
- [ ] Confirm multi-site syncing is functional and up to date
- [ ] Verify all vSAN tiers are in a healthy state
- [ ] Confirm no nodes are pending a reboot
- [ ] USB installer is inserted and detected on the new node
- [ ] Verify Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all existing nodes

## Execution Phase

### Adding the New Node

For detailed step-by-step instructions on performing the vSAN scale out, please refer to:

[Scale-out Node Installation Guide](/implementation-guide/scale-out-nodes/)

### Key Process Overview

1. **Boot new node** from USB installer
2. **Configure networking** on the new node
3. **Join node to cluster** via VergeOS UI
4. **Monitor vSAN redistribution** - this is the longest phase
5. **Wait for completion** - vSAN tiers must return to green status

!!! warning "Critical Wait Period"
    During the scale out process, vSAN Tiers will show a yellow status during the rebuild stage. It is essential to wait for the vSAN tier to return to a "green" healthy status before continuing with any other operations or considering the scale out complete.

!!! tip "Monitoring Progress"
    You can monitor vSAN rebuild progress in the VergeOS UI under System -> vSAN. The rebuild process will show percentage completion and estimated time remaining.

## Post-Scale Out Verification

After the scale out completes, verify the system is operating correctly:

### System Health Checks

- [ ] Confirm new node appears in VergeOS WebUI
    - No node-specific warnings in its logs
- [ ] Verify vSAN repairs are complete and all tiers show green status
- [ ] Test/confirm guest systems as required per your success criteria
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps
- [ ] Confirm cluster resource distribution is balanced
- [ ] Test VM migration to/from the new node

### Performance Validation

- [ ] Monitor system performance for 24-48 hours post-scale out
- [ ] Verify storage performance meets expectations
- [ ] Confirm network throughput to new node is optimal

## Troubleshooting

### Common Issues

**vSAN tier remains yellow after extended time**

- Check network connectivity between nodes
- Verify storage tier health in System -> vSAN
- Ensure sufficient bandwidth between nodes
- Contact support if rebuild stalls for more than expected timeframe

**New node not appearing in WebUI**

- Verify network configuration and connectivity
- Check DHCP/static IP assignment
- Confirm USB installer version matches cluster version
- Review node installation logs

**Performance degradation during rebuild**

- This is normal during vSAN redistribution
- Consider scheduling during low-usage periods
- Monitor and adjust workload if necessary

**Network fabric issues**

- Verify Core1 and Core2 network paths
- Check physical network connections
- Confirm VLAN configuration matches existing nodes

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem. Complete node removal may require vSAN data redistribution.

### If Rollback is Required

1. **Stop the installation** if still in progress
2. **Power down the new node** to prevent data corruption
3. **Allow vSAN to stabilize** if data was partially migrated
4. **Remove node from cluster** via VergeOS UI if it was successfully added
5. **Monitor system stability** before rescheduling the scale out

## Next Steps

After successful scale out completion:

- [ ] Update monitoring systems to include the new node
- [ ] Update documentation with new node details
- [ ] Schedule routine maintenance for the new node
- [ ] Consider updating backup and DR procedures to account for increased capacity
- [ ] Plan for any additional scale out needs based on growth projections

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS scale out, please contact [our support team](/support) for immediate assistance.

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

## Preparation Phase

Complete these steps well before your scheduled maintenance window:

### System Readiness

- [ ] Ensure system snapshot retention is sufficient for potential rollback
- [ ] Set specific success and verification criteria for your workloads

### Hardware Preparation

- [ ] Disks pre-tested in non-production hardware
- [ ] New disks are as large or larger than existing disks
  - [ ] And of similar performance
- [ ] Verify drive compatibility with existing hardware
- [ ] Ensure you have enough new drives for each member node of the storage tier

### Documentation and Planning

- [ ] Update platform documentation with planned drive additions
- [ ] Document current vSAN configuration for reference
- [ ] Plan communication timeline for affected users
- [ ] Ensure enough time is available for vSAN repair before the storage is required

### Resource Verification

- [ ] Check cluster resource utilization
    - For HCI Systems, ensure you have sufficient free memory to reboot 1 node
    - For UCI Systems, ensure no workloads are running on your storage cluster
- [ ] Confirm network paths among node
    - From Node1: Node Diagnostics -> 'Fabric Configuration' reports Core1 and Core2 paths 'confirmed:true' for all nodes
    - From Node2, verify the same.
- [ ] Confirm IPMI access to all nodes via a method that allows console access in emergencies

## Pre-Scale Up Verification

Perform these checks on the day of scheduled maintenance, before beginning the scale up:

### Current State Verification

- [ ] Ensure no large storage operations are in progress (VMWare Backups, Imports, NAS file copies, Site Syncs)
- [ ] Resource availability - System is N+1
    - Verify RAM usage is enough to run workloads with a node offline
    - Verify vSAN tier being scaled is <70% full
- [ ] Cloud Snapshots are recent and available
    - Set the most recent Snapshot to expire several days in the future for extra retention
- [ ] Confirm Outbound Syncs (if configured) are current
    -  Set the most recent remote Snapshot to expire several days in the future for extra retention
- [ ] Verify all vSAN tiers are in a healthy state (green status)
- [ ] Confirm no nodes are pending a reboot
- [ ] Verify Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all nodes
- [ ] Verify Node2 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all nodes

## Execution Phase

### Adding New Storage

For detailed step-by-step instructions on performing the vSAN scale up, please refer to:

[Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan)

### Key Process Overview

1. **Put the node in Maintenance Mode** (if hot-swap not supported)
1. **Power down target node** (if hot-swap not supported)
2. **Install new drives** following manufacturer guidelines
3. **Power up node** and verify drive detection
4. **Add drives to vSAN tier** via VergeOS UI
5. **Monitor tier repair progress** - this may take significant time

!!! warning "Critical Wait Period"
    During the scale up process, the vSAN Tier will show a yellow status during the repair stage. It is essential to wait for the vSAN tier to return to a "green" healthy status before continuing to the next node.

!!! tip "Monitoring Progress"
    Monitor vSAN repair progress in the VergeOS UI under System -> vSAN. The process will show completion status and available capacity updates.

6. **Repeat for additional nodes** as planned

## Post-Scale Up Verification

After the scale up completes, verify the system is operating correctly:

### System Health Checks

- [ ] Verify all new drives are recognized and added to the appropriate vSAN tier
- [ ] Confirm increased storage capacity is reflected in the UI
- [ ] Verify vSAN tier shows green status
- [ ] Test/confirm guest systems as required per your success criteria
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps
- [ ] Confirm data distribution is balanced across all drives

## Troubleshooting

### Common Issues

**vSAN tier remains yellow after extended time**

- Verify all new drives are properly seated and detected
- Check for drive errors in system logs
- Ensure sufficient network bandwidth for repairs
- Contact support if repairs stall

**New drives not detected**

- Verify physical drive installation
- Check disk controller configuration if applicable
- Confirm drive compatibility with existing hardware
- Review system logs for hardware detection issues

**Performance degradation during repairs**

- VergeOS makes every effort to prioritize workload storage during repairs
- Consider minimizing workloads during maintenance window to reduce any possible impact
- Monitor system resources

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem. Removing drives after data has been written may require data migration. Contact Verge Support in the event of any issues with this process.


## Next Steps

After successful scale up completion:

- [ ] Update capacity planning documentation
- [ ] Adjust monitoring thresholds for new capacity
- [ ] Review backup and snapshot policies for increased data
- [ ] Plan for future scaling needs based on growth projections
- [ ] Schedule follow-up performance monitoring

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS vSAN scale up, please contact [our support team](/support) for immediate assistance.

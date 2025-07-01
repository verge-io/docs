# VergeOS Version Update Guide

This guide provides best practices for safely updating a VergeOS system to a new point release. It focuses on data security and system resilience through a methodical approach.

!!! abstract "Overview"
    Updating your VergeOS system requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into main phases:

    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Update Verification** - Final checks immediately before beginning the update
    3. **Update Execution** - The process of installing the update
    4. **Post-Update Verification** - Ensuring the update was successful

!!! info "Environment-Specific Requirements"
    This guide covers general best practices. You may need to adapt these steps for your specific environment and requirements.

## Prerequisites

- Administrative access to VergeOS system
- IPMI access to all nodes in the cluster
- Network connectivity for update downloads
- **Estimated time:** 1-2 hours depending on cluster size and update complexity

## Preparation Phase

Complete these steps well before your scheduled maintenance window:

### System Readiness

- [ ] Ensure system snapshot retention is sufficient for potential rollback
- [ ] Set specific success and verification criteria for your workloads
- [ ] Identify cohorts of VMs, services, etc. required for your particular use case

!!! example "Use Case Examples"
    VDI may have several distinct images or resource pools. VPS may focus more on network functionality and connectivity.

- [ ] Map any time-sensitive system and guest events that must continue functioning

### Documentation and Planning

- [ ] Update platform documentation with planned maintenance window
- [ ] Review any synergistic updates/upgrades that might need to be run
    - Avoid combining unnecessary updates
- [ ] Check version release notes and plan for any specific impacts
- [ ] Document current system configuration for rollback reference
- [ ] Plan communication timeline for affected users

### Resource Verification

- [ ] Check cluster resource utilization
    - Ensure your system has enough spare resources to lose your largest node
- [ ] Confirm network paths among hosts
    - From each node: Node Diagnostics -> Fabric Configuration (all paths in all nodes should be "confirmed:true")
- [ ] If networking redundancy hasn't been tested recently, schedule a test before updating
- [ ] Confirm IPMI access to all hosts via a method that allows console access in emergencies

### Update Staging

1. In VergeOS, navigate to **System > Updates**
2. Click **Check for Updates**
3. Download the update (it won't start until "Install" is clicked)
4. Record the current version and target version for documentation

## Pre-Update Verification

Perform these checks on the day of scheduled maintenance, before beginning the update:

### Current State Verification

- [ ] Confirm running version is the expected version
- [ ] Check logs for recent errors
    - Note any non-critical issues
    - Cancel if critical errors are found
- [ ] Verify resource availability meets N+1 requirements
    - Confirm RAM usage allows workloads to run with a node offline
- [ ] Verify cloud snapshots are recent and available
    - Set the most recent snapshot to expire several days in the future for extra retention
- [ ] Confirm multi-site syncing is functional and up to date
- [ ] Verify all vSAN tiers are in a healthy state (green status)
- [ ] Confirm no nodes are pending a reboot
- [ ] Record system performance baseline for post-update comparison

### Update Verification

- [ ] Confirm your staged update in **System > Updates**
- [ ] Check for updates again
    - If there is another update, carefully evaluate before proceeding
- [ ] Verify sufficient disk space for update process
- [ ] Confirm all nodes are accessible and responsive

## Execution Phase

### Installing the Update

The actual update process:

1. Navigate to **System > Updates**
2. Click **Install** to begin the update process
3. **Monitor Node 1** as it automatically:
   - Puts itself in maintenance mode
   - Reboots and applies the update
   - Returns to service
4. **Observe subsequent nodes** as the system continues updating and rebooting nodes
5. **Monitor workloads** and system resource usage throughout the process
6. **Track progress** - each node will update sequentially to maintain service availability

!!! tip "Update Monitoring"
    During the update process, you can monitor progress in the System > Updates section. Each node will show its current status and progress through the update stages.

!!! warning "Do Not Interrupt"
    Do not power off nodes or interrupt the update process once it has begun. Allow each node to complete its update cycle naturally.

## Post-Update Verification

After the update completes, verify the system is operating correctly:

### Version Confirmation

- [ ] Confirm expected version in **System > Updates**
    - Verify the following packages are at the expected version:
        - **osm** (Open Street Maps data)
        - **yb** (Verge.io cloud software stack)
        - **yb-help** (Integrated help and documentation)
        - **ybos** (Verge.io operating system)

### System Health Checks

- [ ] Confirm 'Nodes Updated' tile in **System > Updates** is green and all nodes finished
- [ ] Ensure all vSAN tiers show green status
- [ ] Verify all nodes show "Running" green status
    - Confirm nodes do not have any pending reboots
- [ ] Test/confirm guest systems as required per your success criteria
- [ ] Take a manual snapshot with several days' retention
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps
- [ ] Confirm system performance matches or exceeds baseline

### Functionality Testing

- [ ] Test critical VM operations (start, stop, migrate)
- [ ] Verify network connectivity and performance
- [ ] Confirm backup and snapshot operations are working
- [ ] Test any custom integrations or automations

## Troubleshooting

### Common Issues

**Update process stalls on a node**

- Check node accessibility via IPMI
- Review system logs for error messages
- Verify network connectivity to the stalled node
- Contact support if node remains unresponsive

**Version mismatch after update**

- Allow additional time for all components to synchronize
- Check for any failed package installations
- Verify network connectivity between nodes
- Review update logs for specific errors

**Performance degradation post-update**

- Compare against pre-update baseline
- Check for new resource constraints
- Review vSAN tier health and performance
- Monitor for 24-48 hours to establish new baseline

**VMs fail to start after update**

- Check VM configuration compatibility
- Verify storage tier accessibility
- Review VM-specific logs for errors
- Test VM operations individually

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem. VergeOS updates are designed to be forward-compatible, and rollback may not always be possible.

### If Issues Occur
1. **Document the problem** thoroughly with screenshots and logs
2. **Isolate the issue** - determine if it affects all nodes or specific components
3. **Contact support** before attempting any rollback procedures
4. **Preserve system state** for troubleshooting analysis
5. **Follow support guidance** for resolution or rollback procedures

## Next Steps

After successful update completion:

- [ ] Update system documentation with new version information
- [ ] Schedule routine monitoring to ensure stability
- [ ] Review any new features or changes introduced in the update
- [ ] Plan for future updates based on release schedules
- [ ] Update backup and disaster recovery procedures if needed

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS software update, please contact [our support team](/support) for immediate assistance.

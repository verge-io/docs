# VergeOS Version Update Guide

This guide provides best practices for safely updating a VergeOS system to a new point release. It focuses on data security and system resilience through a methodical approach.

!!! abstract "Overview"
    Updating your VergeOS system requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into main phases:
    
    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Upgrade Verification** - Final checks immediately before beginning the update
    3. **Update Execution** - The process of installing the update
    4. **Post-Update Verification** - Ensuring the update was successful

!!! info "Environment-Specific Requirements"
    This guide covers general best practices. You may need to adapt these steps for your specific environment and requirements.

## Preparation Phase

Complete these steps well before your scheduled maintenance window:

### System Readiness
- [ ] Ensure system snapshot retention is sufficient for potential rollback
- [ ] Set specific success and verification criteria for your workloads
- [ ] Identify cohorts of VMs, services, etc. required for your particular use case

!!! example
    VDI may have several distinct images or resource pools. VPS may focus more on network functionality and connectivity.

- [ ] Map any time-sensitive system and guest events that must continue functioning

### Documentation and Planning
- [ ] Update platform documentation (ports, IPs, VLANs, etc.)
- [ ] Review any synergistic updates/upgrades that might need to be run
    - Avoid combining unnecessary updates
- [ ] Check version release notes and plan for any specific impacts

### Resource Verification
- [ ] Check cluster resource utilization
    - Ensure your system has enough spare resources to lose your largest node
- [ ] Confirm network paths among hosts
    - From each node: Node Diagnostics -> Fabric Configuration (all paths in all nodes should be "true")
- [ ] If networking redundancy hasn't been tested recently, schedule a test before updating
- [ ] Confirm IPMI access to all hosts via a method that allows console access in emergencies

### Update Staging
1. In VergeOS, navigate to **System > Updates**
2. Click **Check for Updates**
3. Download the update (it won't start until "Install" is clicked)

## Pre-Upgrade Verification

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
- [ ] Verify all vSAN tiers are in a healthy state
- [ ] Confirm no nodes are pending a reboot

### Update Verification
- [ ] Confirm your staged update in **System > Updates**
- [ ] Check for updates again
    - If there is another update, carefully evaluate before proceeding

## Update Execution

The actual update process:

1. Navigate to **System > Updates**
2. Click **Install**
3. Node 1 will automatically:
   - Put itself in maintenance mode
   - Reboot
   - Apply the update
4. Observe the system as it continues updating and rebooting nodes
5. Monitor workloads and system resource usage

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
- [ ] Test/confirm guest systems as required
- [ ] Take a manual snapshot with several days' retention
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem.

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS softare update, please contact [our support team](/support) for assistance.

---

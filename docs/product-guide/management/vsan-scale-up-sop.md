# VergeOS vSAN Scale Up Guide

This guide provides best practices for safely scaling up storage capacity in a VergeOS system by adding drives to existing nodes. It focuses on data security and system resilience through a methodical approach.

!!! abstract "Overview"
    Scaling up a vSAN requires careful planning and execution to ensure minimal disruption to your services. This guide breaks down the process into main phases:
    
    1. **Preparation** - Steps to take before your scheduled maintenance window
    2. **Pre-Upgrade Verification** - Final checks immediately before beginning the scale up
    3. **Scale Up Execution** - The process of adding and configuring new storage
    4. **Post-Scale Up Verification** - Ensuring the scale up was successful

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

### Hardware Preparation
- [ ] Disks pre-tested in non-production host(s)
- [ ] New disks are "like" to existing disks in the tier

### Documentation and Planning
- [ ] Update platform documentation (ports, IPs, VLANs, etc.)

### Resource Verification
- [ ] Check cluster resource utilization
    - Ensure your system has enough spare resources to lose your largest node
- [ ] Confirm network paths among hosts
    - From Node1: Node Diagnostics -> 'Fabric Configuration' reports Core1 and Core2 paths 'confirmed:true' for all existing nodes
- [ ] Confirm IPMI access to all hosts via a method that allows console access in emergencies

## Pre-Upgrade Verification

Perform these checks on the day of scheduled maintenance, before beginning the scale up:

### Current State Verification
- [ ] Resource availability - System is N+1
    - Verify RAM usage is enough to run workloads with a node offline
    - Verify vSAN tier being scaled is <90% full
- [ ] Cloud Snapshots are recent and available
    - Set the most recent Snapshot to expire several days in the future for extra retention
- [ ] Confirm multi-site syncing is functional and up to date
- [ ] Verify all vSAN tiers are in a healthy state
- [ ] Confirm no nodes are pending a reboot
- [ ] Verify Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all existing Nodes

## Scale Up Execution

For detailed step-by-step instructions on performing the vSAN scale up, please refer to the knowledge base article:

[Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan)

!!! warning
    During the scale up process, the vSAN Tier will show a yellow status during the rebuild stage. It is essential to wait for the vSAN tier to return to a "green" healthy status before continuing to the next node.

## Post-Scale Up Verification

After the scale up completes, verify the system is operating correctly:

### System Health Checks
- [ ] Test/confirm guest systems as required
- [ ] Check logs for any new or unexpected events
- [ ] Verify all success criteria outlined in your preparation steps

## Rollback Procedure

!!! warning "Rollback Considerations"
    If issues occur, the safest approach is to pause, investigate the unexpected behavior, and then proceed again with a clear understanding of the problem.

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS vSAN scale up, please contact [our support team](/support) for assistance.

---

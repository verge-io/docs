# Standard Operating Procedure: VergeOS Version Update

## Purpose
This document provides standardized procedures and best practices for VergeOS Engineers and Administrators performing a VergeOS Version Update. Use this guide as a foundation for creating your own customized procedures tailored to your specific environment.

!!! note
    This document covers checks and procedures that may not be applicable to your specific systems and scenarios. Please ensure your own Update plan and SOP are appropriate to your needs and environment.

## Objective
Safely updating a VergeOS System to a new point release. Prioritizing data security and resilience. Slow is smooth. Smooth is fast.

## Preparation Steps
*Leading up to scheduled maintenance*

- [ ] Ensure System Snapshot retention is sufficient in the event a rollback is required
- [ ] Set success and verification criteria for your workloads
  - [ ] Identify cohorts of guests, services, etc. required for your clients that must be tested to confirm functionality
!!! example
    VDI may have several distinct images or resource pools. VPS may focus more on network functionality and connectivity.
  - [ ] Identify temporal system and guest events that must function
- [ ] Ensure platform documentation is up-to-date
  - [ ] Ports, IPs, Names, VLANs, etc. Know what you know.
- [ ] Review synergistic updates/upgrades
  - [ ] Do not combine unnecessary updates
- [ ] Check Version Release Notes
  - [ ] Plan appropriately for impacts as necessary
- [ ] Check Cluster Resource Utilization
  - [ ] Ensure your system is currently running with enough spare resources to lose your largest node
- [ ] Confirm Network paths among hosts
  - [ ] Each node can ping each other by name in the Core Network
  - [ ] If networking redundancy has not been tested in some time, schedule a redundancy test prior to updating.
- [ ] Confirm IPMI access to all hosts
  - [ ] Via a method that may allow console access in an emergency or outage scenario
- [ ] Stage the update for installation
  - [ ] In VergeOS, navigate to System > Updates
  - [ ] Click 'Check for Updates'
  - [ ] Download the update (It will not start until "Install" is clicked)

## Pre-Upgrade Steps
*Day of scheduled maintenance, prior to outside meetings*

- [ ] Verify Current State
  - [ ] Running version is expected version
  - [ ] Check Logs for recent errors
  - [ ] Note any non-critical issues
  - [ ] Cancel on critical errors
- [ ] Resource availability - System is N+1
  - [ ] Verify RAM usage is enough to run workloads with a node offline
- [ ] Cloud Snapshots are recent and available
  - [ ] Set the most recent Snapshot to expire several days in the future for extra retention.
- [ ] Multi-Site Syncing is functional and up to date
- [ ] All vSAN Tiers in a healthy state
- [ ] No Nodes are pending a reboot
- [ ] Confirm your staged update in System > Updates
  - [ ] Check For Updates again
  - [ ] If there is another update, carefully evaluate before proceeding

## Update
*The Main Event - See [Updating VergeOS](https://docs.verge.io/knowledge-base/updating-vergeos-system/?h=updating)*

- [ ] Navigate to System > Updates
- [ ] Click "Install"
- [ ] node1 will put itself in maintenance mode, reboot, and apply the update
- [ ] Observe the system as it continues updating and rebooting nodes
  - [ ] Watch workloads and system resource usage

## Post-Update
*Post Maintenance Confirmations*

- [ ] Confirm expected version in System > Updates
  - [ ] yb version
  - [ ] yb-help version
  - [ ] ybos version
- [ ] Confirm 'Nodes Updated' tile in System > Updates is green, all nodes finished
- [ ] Ensure all vSANs Tiers are green
- [ ] Ensure all nodes show Running green status
  - [ ] AND do not have any pending reboots
- [ ] Test/Confirm Guest Systems as required
- [ ] Take a manual snapshot with several days' retention
- [ ] Check Logs for any new or divergent events
- [ ] Test Success Criteria outlined in Preparation Steps

## Rollback
If unexpected issues arise during the update process, the recommended approach is to pause operations, thoroughly investigate the problem, and develop a clear resolution plan before proceeding. Always prioritize system integrity over maintenance window deadlines. While maintenance windows typically include buffer time, it's better to reschedule than to risk system instability by rushing through unresolved issues.

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS update installation, please contact [support@verge.io](mailto:support@verge.io) immediately, or call 855-855-8300 if you need immediate on-call emergency assistance. Please have your SOP ready when calling.

---
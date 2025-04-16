# Standard Operating Procedure: VergeOS vSAN Scale Up

## Purpose
This document provides standardized procedures and best practices for VergeOS Engineers and Administrators performing a vSAN Scale Up operation; adding additional storage to an existing storage tier. Use this guide as a foundation for creating your own customized procedures tailored to your specific environment.

!!! note
    This document covers checks and procedures that may not be applicable to your specific systems and scenarios. Please ensure your own Scale Up plan and SOP are appropriate to your needs and environment.

## Objective
Safely performing a vSAN Scale Up on a VergeOS System, adding storage capacity to the existing nodes. Prioritizing data security and resilience. Slow is smooth. Smooth is fast.

## Preparation Steps
*Leading up to scheduled maintenance*

- [ ] Ensure System Snapshot retention is sufficient in the event a rollback is required
- [ ] Set success and verification criteria for your workloads
  - [ ] Identify cohorts of guests, services, etc. required for your clients that must be tested to confirm functionality
!!! example
    VDI may have several distinct images or resource pools. VPS may focus more on network functionality and connectivity.
  - [ ] Identify temporal system and guest events that must function (What scheduled events need to be validated as functional?)
- [ ] Ensure platform documentation is up-to-date
  - [ ] Ports, IPs, Names, VLANs, etc. Know what you know.
- [ ] Check Cluster Resource Utilization
  - [ ] Ensure your system is currently running with enough spare resources to lose your largest node
- [ ] Confirm Network paths among hosts
  - [ ] Each node can ping each other by name in the Core Network
  - [ ] If networking redundancy has not been tested in some time, schedule a redundancy test prior to scaling.
- [ ] Confirm IPMI access to all hosts
  - [ ] Via a method that may allow console access in an emergency or outage scenario
- [ ] Disks pre-tested in non-production host(s)
- [ ] New disks are "like" to existing disks in the tier

## Pre-Upgrade Steps
*Day of scheduled maintenance, prior to outside meetings*

- [ ] Resource availability - System is N+1
  - [ ] Verify RAM usage is enough to run workloads with a node offline
  - [ ] Verify vSAN tier being scaled <90% full
- [ ] Cloud Snapshots are recent and available
  - [ ] Set the most recent Snapshot to expire several days in the future for extra retention.
- [ ] Multi-Site Syncing is functional and up to date
- [ ] All vSAN Tiers in a healthy state
- [ ] No Nodes are pending a reboot

## Scale Up
*The Main Event - See [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan)*

## Post Scale-Up
*Post Maintenance Confirmations*

- [ ] Test/Confirm Guest Systems as required
- [ ] Check Logs for any new or divergent events
- [ ] Test Success Criteria outlined in Preparation Steps

## Rollback
If unexpected issues arise during the Scale Up process, the recommended approach is to pause operations, thoroughly investigate the problem, and develop a clear resolution plan before proceeding. Always prioritize system integrity over maintenance window deadlines. While maintenance windows typically include buffer time, it's better to reschedule than to risk system instability by rushing through unresolved issues.

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS vSAN Scale-Up, please contact [support](/support) immediately, or call 855-855-8300 if you need immediate on-call emergency assistance. Please have your SOP ready when calling.

---

# Standard Operating Procedure: VergeOS vSAN Scale Out

## Purpose
This document provides standardized procedures and best practices for VergeOS Engineers and Administrators performing a vSAN Scale Out operation. Use this guide as a foundation for creating your own customized procedures tailored to your specific environment.

!!! note
    This document covers checks and procedures that may not be applicable to your specific systems and scenarios. Please ensure your own Scale Out plan and SOP are appropriate to your needs and environment.

## Objective
Safely performing a vSAN Scale Out on a VergeOS System, adding a new Node to an existing cluster. Prioritizing data security and resilience. Slow is smooth. Smooth is fast.

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
  - [ ] Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all existing Nodes
- [ ] Confirm IPMI access to all hosts
  - [ ] Via a method that may allow console access in an emergency or outage scenario
  - [ ] Including the new Node to be added in this maintenance
- [ ] Confirm VergeOS version compatibility
  - [ ] VergeOS is running a currently supported version
  - [ ] VergeOS is running the most recent release
- [ ] USB drive prepped with appropriate installer version

## Pre-Upgrade Steps
*Day of scheduled maintenance, prior to outside meetings*

- [ ] Resource availability - System is N+1
  - [ ] Verify RAM usage is enough to run workloads with a node offline
- [ ] Cloud Snapshots are recent and available
  - [ ] Set the most recent Snapshot to expire several days in the future for extra retention.
- [ ] Multi-Site Syncing is functional and up to date
- [ ] All vSAN Tiers in a healthy state
- [ ] No Nodes are pending a reboot
- [ ] USB installer is inserted and detected on the new Node
- [ ] Node1 'Fabric Configuration' diagnostic reports Core1 and Core2 paths 'confirmed:true' for all existing Nodes

## Scale Out
*The Main Event - See [Scale-out Node Installation Guide](https://docs.verge.io/implementation-guide/scale-out-nodes/?h=scale+out#installation-steps)*

- [ ] Boot the USB install disk on the new Node
- [ ] Select Scale-Out
- [ ] Authenticate
- [ ] Confirm OR Correct automatic network interface assignments
- [ ] Select the appropriate Cluster for this Node (if applicable)
- [ ] Confirm storage assignments
- [ ] Finalize

## Post Scale-Out
*Post Maintenance Confirmations*

- [ ] Confirm new Node in VergeOS WebUI
  - [ ] No Node-specific warnings in its logs
- [ ] vSAN repairs complete
- [ ] Test/Confirm Guest Systems as required
- [ ] Check Logs for any new or divergent events
- [ ] Test Success Criteria outlined in Preparation Steps

## Rollback
If unexpected issues arise during the Scale Out process, the recommended approach is to pause operations, thoroughly investigate the problem, and develop a clear resolution plan before proceeding. Always prioritize system integrity over maintenance window deadlines. While maintenance windows typically include buffer time, it's better to reschedule than to risk system instability by rushing through unresolved issues.

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS vSAN Scale-Out, please contact [support@verge.io](mailto:support@verge.io) immediately, or call 855-855-8300 if you need immediate on-call emergency assistance. Please have your SOP ready when calling.

---
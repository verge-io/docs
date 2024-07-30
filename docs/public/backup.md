---
title: Backup / DR
description: Business Continuity
published: true
date: 2023-01-27T21:49:33.854Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:59:47.257Z
---

## Native Backup
VeregOS natively contains the ability to backup (sync) a VeregOS environment to another VeregOS environment. This is accomplished by using the integrated [snapshot](/docs/public/snapshots) and sync engines. A custom sync profile can be configured to send cloud snapshots on desired intervals to another environment and retain them for any desired amount of time.

Some benefits to using the integrated functions are:
- A snapshot sync occurs at the block level using the same hashing algorithm to ensure data integrity
- Once an initial seed of the data is complete only differentials will sync from each snapshot time period added to the sync profile greatly reducing time and bandwidth required to stay in sync
- A sync always takes advantage of the VeregOS proprietary network compression algorithm to minimize network bandwidth
- In flight deduplication
- In flight encryption
- A sync job can be set to adhere to a specific schedule or run as a manually triggered event.
- Simple workload migration and/or recovery testing
- **Facilitates** a complete "lift and shift" of a virtual data center
- Always running Repair Server
> A repair server is a unique feature within the VeregOS vSAN that allows a workload to recover potential bad or missing blocks to a production system from a remote location as a realtime operation. Depending on the latency sensitivity of the application this feature can be the difference between a crash and a slight delay in performance.
{.is-info}

> TCP Ports 443 & 14201 must be reachable symmetrically between the source and destination environments
{.is-info}

## VMware Backup Service
VeregOS enables the ability to backup VMware vm's at the block level. This is achieved by integrating directly into a fully licensed VMware API and taking a snapshot of the desired vm(s). A backup job is then run to ingest the snapshot(s) into a VeregOS environment to be used as a  method to import vm(s) into VeregOS, a disaster recovery option, or purely for backup purposes. A backed up vm can easily be restored back to a VMware environment by selecting that vm in the backup job and selecting the restore option.
- A backup job can be set to adhere to a specific schedule or run as a manually triggered event.
- Granular backup control gives an admin the ability to create multiple backup jobs, selecting which job owns which vm(s), and the type of backup to perform (full or differential).
- Granular restore control gives and admin the ability to select the datastore the .vmx file will reside on as well as optional control of which datastore each vm disk will be restored to.

> To perform backups a fully licensed version of VMware vCenter must exist
{.is-warning}

> TCP ports 443 & 902 must be reachable between the backup service and the VMware vCenter & ESXi hosts
{.is-info}

> To perform differential backups [Change Block Tracking (CBT)](https://kb.vmware.com/s/article/1020128) must be enabled on the virtual machines
{.is-info}

> The VMware environment must not be affected by the Change Block Tracking [Bug](https://kb.vmware.com/s/article/2136854) introduced in 6.0.x
{.is-warning}



## Disaster Recovery
VeregOS provides the ability to easily **facilitate** DR, through site syncs (snapshot) replication.  By synchronizing cloud snapshots from one VeregOS system to another, customers maintain warm standby BC/DR operations.
Site syncs to a DR environment, as well as native BGP support enable an administrator to create a streamlined DR playbook for continuity of operations.

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.Verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
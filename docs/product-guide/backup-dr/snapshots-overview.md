# Snapshots

Snapshots provide nearly-instant, non-disruptive, point-in-time backups that allow for rollback to a previous instance in the event of a hardware failure, faulty application upgrade, VM bluescreen, etc. Snapshot captures and restores can be done at various levels: full system, partial system (select VMs/tenants based on custom tagging) individual virtual machine, or NAS volume.

## Key Features

- **Instant Recovery** – Snapshots can be restored rapidly, minimizing downtime.
- **Minimal Storage Impact** – They are branched against initial data blocks, reducing additional storage consumption.
- **Application-Consistent Snapshots** – VergeOS supports quiescent snapshots, ensuring data integrity by freezing disk activity during capture.
- **Business Continuity & Disaster Recovery (BC/DR)** – System snapshots can be synchronized to another VergeOS system for offsite protection.
- **Flexible Restore Options** – Users can recover individual VMs and tenants, clone copies for testing, or revert entire environments.

## Automated Snapshots (Scheduled Snapshots)

Snapshots can be automated to take at regularly-scheduled intervals using snapshot profiles. A snapshot profile consists of one or more profile periods. Each period determines a frequency for taking snapshots and the default retention time. More information about snapshot profiles is available here: [**Snapshot Profiles (Snapshot Scheduling)**](/product-guide/backup-dr/snapshot-profiles)

## Manual Snapshots

Snapshots can also be taken manually, with settable expiration. Manual snapshots can be useful for backup  immediately before a configuration change, upgrade, or maintenance operation.

## System Snapshot/Restore

System snapshots can be:  

* **Full** - providing backup of the entire VergeOS system  
-OR-
* **Partial** - containing select VMs/tenants based on tagging

### What can be restored from a System Snapshot?

A system snapshot can be used to restore:

- Entire VergeOS system (Full snapshots only)
- Individual VMs (un-quiesced)
- Individual tenants

For information regarding system snapshots, see:
* [**System Snapshots**](/product-guide/backup-dr/system-snapshots) 
* [**Restores from System Snapshot**](/product-guide/backup-dr/system-snapshot-restores)                      

## VM Snapshot/Restore

VM-level snapshots allow for quiesced capture (requires guest agent) and schedule/retention customizable per individual VM. For related instructions, see: [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores).

## Tenant Snapshot/Restore

Individual tenants can be restored from the parent's system snapshot. For related instructions, see: [**Tenant Restores**](/product-guide/tenants/tenant-restores)

Additionally, each tenant can utilize [**System Snapshots**](/product-guide/backup-dr/cloud-snapshot-restore), independently within their environment, to back up their own complete system.

## NAS Snapshot/Restore

Volume snapshots provide quiesced backup/restore of individual NAS volumes. For related instructions, see: [**NAS Volume Snapshots and Restores**](/product-guide/nas/volume-snapshots-restores)


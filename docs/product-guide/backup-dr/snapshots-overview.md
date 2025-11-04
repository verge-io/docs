# Snapshots

Snapshots provide nearly-instant, non-disruptive, point-in-time backups that allow for rollback to a previous instance in the event of a hardware failure, faulty application upgrade, VM bluescreen, etc. Snapshot captures and restores can be done at various levels: cloud (entire system), tenant, individual virtual machine, NAS volume.

## Key Features

- **Instant Recovery** – Snapshots can be restored rapidly, minimizing downtime.
- **Minimal Storage Impact** – They are branched against initial data blocks, reducing additional storage consumption.
- **Application-Consistent Snapshots** – VergeOS supports quiescent snapshots, ensuring data integrity by freezing disk activity during capture.
- **Business Continuity & Disaster Recovery (BC/DR)** – System snapshots can be synchronized to another VergeOS system for offsite protection.
- **Flexible Restore Options** – Users can recover individual VMs and tenants, clone copies for testing, or revert entire environments.

## Automated Snapshots

Snapshots can be automated to take at regularly-scheduled intervals using snapshot profiles. A snapshot profile consists of one or more profile periods. Each period determines a frequency for taking a snapshot as well as a retention time. More information about snapshot profiles is available here: [**Snapshot Profiles (Snapshot Scheduling)**](/product-guide/backup-dr/snapshot-profiles)

## Manual Snapshots

Snapshots can also be taken manually, with settable expiration. Manual snapshots can be useful for backup (of a VM, volume, or entire system) immediately before a configuration change, upgrade, or maintenance operation.

## Cloud (System) Snapshot/Restore

System snapshots provide backup of the entire VergeOS system, including all tenants, VMs, networks, and settings.

### What can be restored from a System Snapshot?

A system snapshot can be used to restore:

- Entire VergeOS system
- Individual VMs (un-quiesced)
- Individual tenants

For information regarding system snapshots, see: [**System Snapshots and Restores**](/product-guide/backup-dr/cloud-snapshot-restore)

## VM Snapshot/Restore

VM-level snapshots allow for quiesced capture (requires guest agent) and schedule/retention customizable per individual VM. For related instructions, see: [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores).

## Tenant Snapshot/Restore

Individual tenants can be restored from the parent's system snapshot. For related instructions, see: [**Tenant Restores**](/product-guide/tenants/tenant-restores)

Additionally, each tenant can utilize [**System Snapshots**](/product-guide/backup-dr/cloud-snapshot-restore), independently within their environments, to back up their own complete systems.

## NAS Snapshot/Restore

Volume snapshots provide quiesced backup/restore of individual NAS volumes. For related instructions, see: [**NAS Volume Snapshots and Restores**](/product-guide/nas/volume-snapshots-restores)


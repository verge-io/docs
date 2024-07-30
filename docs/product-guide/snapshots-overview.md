

# Snapshots

Snapshots provide quick, point-in-time backups, allowing for roll back to a previous instance in the event of a hardware failure, faulty application upgrade, VM Bluescreens, etc.. Snapshots/restores can be done at various levels: cloud (entire system), tenant, individual virtual machine, NAS volume.


<br>
<br>

## Automated Snapshots

Snapshots can be automated to take at regularly scheduled intervals using snapshot profiles. A snapshot profile consists of one or more profile periods. Each period determines a frequency for taking a snapshot as well as a retention time. More information about snapshot profiles is available here: [**Snapshot Profiles (Snapshot Scheduling)**](/product-guide/snapshot-profiles)

<br>
<br>

## Manual Snapshots

Snapshots can also be taken manually, with settable expiration. Manual snapshots can be useful for backup (of a VM, volume, or entire system) immediately before a configuration change, upgrade, or maintenance operation.

<br>
<br>


## Cloud (System) Snapshot/Restore

Cloud Snapshots provide backup of the entire VergeOS system, including all tenants, VMs, networks, and settings.

<br>
<br>


### What can be restored from a Cloud Snapshot?

A cloud snapshot can be used to restore:

-   Entire VergeOS system
-   Individual VMs (unquiesced)
-   Individual tenants

For information regarding cloud snapshots, see: [**Cloud Snapshots and Restores**](/product-guide/cloudsnapshotandrestore)

<br>
<br>

## VM Snapshot/Restore

VM snapshots allow for quiesced snapshotting (requires guest agent) and schedule/retention customizable per individual VM. For related instructions, see: 

[**VM Snapshots and Restores**](/product-guide/VMsnapshotsandrestores).

<br>
<br>

## Tenant Snapshot/Restore

Individual tenants can be restored from the parent's cloud snapshot. For related instructions, see: [**Tenant Restores**](/product-guide/tenantrestores)

Additionally, each tenant can utilize [**Cloud Snapshots**](/product-guide/cloudsnapshotandrestore),  independently within their environments to backup their own systems.
 
 <br>
<br>

## NAS Snapshot/Restore

Volume snapshots provide for quiesced backup/restore of individual NAS volumes. For related instructions, see:  [**NAS Volume Snapshots and Restores**](/product-guide/volumesnapsandrestores)

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
# System Snapshots


!!! note "New in 26.1 - Partial System Snapshots Based on Custom Tagging"
      With the introduction of partial snapsets, system snapshots allow you to selectively include only the VMs or tenants you want to include, giving you far more flexibility in how you design your replication and retention strategy.

      Full system snapshots remain the foundation of protection and are still required for full‑system recovery. However, you can now include partial system snapshots within your schedule to give specific VMs or tenants their own replication and retention cadence.

      By adding partial snaps alongside your regular full system snapshots, you can:  
      - Replicate high‑priority VMs or tenants more frequently  
      - Retain targeted workloads for longer without expanding system‑wide retention  
      - Sync different subsets of workloads to different locations   

      This approach preserves the reliability of full system snapshots while giving you finer‑grained control over how individual workloads are protected.

    
## Full vs. Partial 

### Full System Snapshots:
  * Contain a backup of everything in a system, including all tenants, VMs, NAS volumes, networks, and settings 
  * Can be used to restore an entire system. 
  * Can also be used for selective object restores, including:
    * Tenants
    * NAS volumes
    * VMs 
  * Select: Snapshot Type=*Full*

!!! tip "Default settings on a new system are configured to perform *Full* system snapshots at multiple intervals with different retentions."

### Partial System Snapshots:
  * Include or exclude VMs and tenants based on custom tagging
  * Allow more frequent backup and sync replication of select VMs and tenants 
  * Support longer retention for specific workloads without increasing system‑wide retention
  * Select: Snapshot Type=*Partial - Exclude Tags* OR *Partial - Include Tags*
  

## Automated System Snapshots

By default, system snapshots run according to the included ***System Snapshots*** profile.  It is recommended to keep the System snapshot profile set to this value. The periods within this default profile can be tailored to meet your schedule and retention needs.  

??? tip "Default Schedule"
    The default *"System Snapshots"* profile includes the following schedule of Full snapshots  

      * hourly snapshots retained for 3 hours
      * a daily snapshot at midnight retained for 3 days
      * a daily snapshot at noon retained for 1 day.  

    For many environments, this provides a solid starting point that balances system protection with storage usage.


## Modifying Your System Snapshot Schedule 


To modify the system snapshot schedule: 

1. Navigate to **System** > **System Snapshots**.
2. Click **View Snapshot Profile** on the left menu.  
This takes you to the profile currently set for taking automatic system snapshots (default setting="*System Snapshots*").  

3. Scroll to the **Periods** section of the dashboard.   
Each period listed defines a frequency and retention.  You can modify, remove, or add periods to customize your automatic system snapshot activity.  

See [Snapshot Profiles - Profile Periods](/product-guide/backup-dr/snapshot-profiles#profile-periods) for detailed information on configuring profile periods. 


## Manual System Snapshots

A manual system snapshot can be taken at any time. Creating a short‑term manual snapshot before a major configuration change or maintenance task provides a restore point if you need to roll back.

### Take a Manual Snapshot of the Entire System

1. Navigate to **System** > **System Snapshots**.
2. Select **New** from the left menu.
3. Configure snapshot options:  
    * **Name** (required): provide a descriptive name (e.g. 'before drive maintenance') 
    * **Description** (optional): 
    * **Expires**: select/enter a date and time for expiration.
    * **Snapshot Type**:
        * ***Full***:
        * ***Partial - Exclude Tags***
        * ***Partial - Include Tags***
    * **Private** (default=enabled): this option can be deselected to allow tenants access to their own data within this snapshot.  
    * **Immutable** (default=disabled): when selected, the snapshot is locked and cannot be deleted by anyone until it is unlocked, with a mandatory waiting period.

!!! warning "Immutable snapshots are locked, requiring a mandatory waiting period before they can be deleted. Ensure retention settings align with available storage. For more guidance, see the [Immutable Snapshots Guide](/product-guide/backup-dr/immutable-snapshots)."  

!!! warning "Snapshot Expiration"
    Always consider vSAN usage: initially source and snapshot are the same and thus there is no impact on storage; but, as source data diverges more from the snapshot data, there is less deduplication between the two and thus more vSAN usage. Using the *Never Expire* option is not recommended unless necessary.




    


4. Click **Submit** to take the snapshot.


## Best Practices 

### Storage Considerations

* Retaining an excessive number of snapshots can significantly increase storage consumption and operational overhead. A well‑designed retention policy preserves essential restore points while automatically pruning older, less relevant snapshots, helping you meet recovery objectives without accumulating unnecessary historical data.
* Monitor storage utilization regularly to ensure that snapshot growth remains aligned with your retention strategy.
* Review retention settings after major environment changes—such as adding new VMs, expanding tenants, or increasing workload churn—to confirm that storage usage remains predictable and sustainable.
* Avoid creating overly granular snapshot periods unless they are required for specific workloads. High‑frequency snapshots can increase metadata and storage overhead without providing meaningful recovery benefits for all systems.  

### System Protection

* !!! warning "Ensure your System Snapshots profile includes scheduled periods that *take full snapshots*. Full system snapshots provide the system‑wide recovery point needed to restore from unpredictable hardware failures or configuration errors."

* When more-frequent protection and/or longer retention of select VMs and tenants is needed, add profile periods that take partial snapshots.


## Related Documentation

* [Snapshots Overview](/product-guide/backup-dr/snapshots-overview)
* [Snapshot Profiles](/product-guide/backup-dr/snapshot-profiles)
* [Site Syncs](/product-guide/backup-dr/sync-overview)
* [Tenant Snapshots](/product-guide/tenants/tenant-snapshots)
* [Tenant Restores](/product-guide/tenants/tenant-restores)
* [VM Snapshots and Restores](/product-guide/backup-dr/vm-snapshots-restores)
* [NAS Volume Snapshots and Restores](/product-guide/nas/volume-snapshots-restores)
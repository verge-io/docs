# Tenant Snapshots

Snapshots provide a way to obtain quick recovery points. System snapshots allow for a complete rollback of a system (to the point in time of a snapshot) to protect in the event of major unforeseen issues that may arise. A system snapshot includes whole-system snapshots for each tenant as well. A tenant can be allowed (a per-tenant setting) to browse a listing of available provider snapshots and "self-serve" download selected timestamps to restore their entire system or individual VMs.

!!! tip
    Tenants also have the ability to manage their own VergeOS snapshots within their system using system snapshots. This can allow a tenant to customize scheduling/retention as they wish. Additional vSAN storage will be consumed for the tenant to retain their own snapshots.

## Allow Tenant to Browse/Restore from Provider Snapshots

1. Navigate to **Tenants** > **List** from the top menu.
2. The **Tenants Listing** will appear. **Double-click the desired tenant**.
3. Click **Edit** on the left menu.
4. Enable the ***Expose System Snapshots*** (check box) option.
5. Click **Submit**.

## Restore a Tenant from Snapshot (overwrite existing)

Completing these instructions will overwrite the existing tenant. A tenant can be restored to a new instance from the Cloud Dashboard: [System Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore#restore-select-tenants-from-a-cloud-snapshot).

1. **Power off the tenant offline**; the tenant must be offline before it can be restored.
2. Navigate to the tenant dashboard (from the top menu: Tenants > Dashboard > double-click the desired tenant in the list.)
3. Click **Snapshots** on the left menu.
4. **Select the desired system snapshot** and click **Restore** on the left menu.
5. A warning/confirmation message will require you to click ***Proceed*** to continue with the restore. **Before clicking Proceed, be sure that you want to restore over the existing tenant**, otherwise, click ***Cancel***.  
6. The Changes will not take effect until the tenant is powered on again.

---

## Instructions for Tenants (accessing provider snapshots)

### Instructions for Tenant to Access their Data from Provider Snapshots

1. Navigate to **System** > **System Snapshots**.
2. **Select the desired provider snapshot from the list of available timestamps.**
    - Snapshots from the service provider will have a type = "Provider".
    - Snapshots taken by the tenant will show a type of "Local".
    - Notice the Created Date/Time column to aid in selecting the correct snapshot.
3. Click **Request From Provider** on the left menu.
Once the snapshot displays as "Local" it is now available to use; see restore instructions below.

!!! warning "Extending a snapshot expiration"
    Once the snapshot is local, the snapshot name and expiration can be modified. When setting expirations on snapshots, it is always important to keep storage capacity in mind; the longer the expiration, when there are significant change rates, the more storage will be consumed.  

### Instructions for Tenant to Restore their Entire System from the Provider Snapshot

**Tenant must follow the above instructions first to request the desired snapshot from the provider. A snapshot that has been requested from the provider will appear as type "Local".**

1. **Select** the **snapshot**.
2. Click **Restore** on the left menu.
3. By default, the option is selected to **take a snapshot of the entire cloud before this restore**. This allows for later reverting the cloud back to the state right before the restore operation, if needed.
4. By default, the option to **Reboot all nodes** after the restore is enabled. This will let the system handle the node reboots (Recommended). Reboot is necessary to actually apply the restore.
5. Click the **Proceed** button to continue/ or **Cancel to abort**.
6. Another confirmation message will appear; to continue with the cloud restore, click the **Proceed** button or leave alone as **the restore operation will continue in 60 seconds unless canceled.**

!!! warning "To Cancel the operation, the **Cancel** button must be clicked within 60 seconds; otherwise, the restore operation will continue."

### Instructions for Tenant to Recover Individual VMs from Provider Snapshot

**Tenant must follow the above instructions first to request the desired snapshot from the provider. A snapshot that has been requested from the provider will appear as type "Local".**

1. **Select the snapshot**.
2. Click **View VMs** on the left menu.
3. A **listing of the individual VMs** included in the snapshot appears. **Select a VM** to restore.
4. Click **Recover** on the left menu.
5. The ***VM Name*** will default to the original name, but can be changed. To recover a deleted VM, this name can be left the same. However, if there is currently a VM with the same name (e.g. the original VM still exists) the VM name will need to be changed before it can be recovered.
6. Click **Submit**.
The UI will redirect to the restored VM's dashboard page, where operations such as Power on/Clone/Edit can be performed as desired.

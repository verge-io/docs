# Restores from System Snapshots

## Access System Snapshots from Your Provider/Host

!!! note "This section of instructions apply to systems that are tenants themselves. If your provider has allowed it, you can request to access a snapshot of your environment from the provider's system snapshots. Once requested, the snapshot is then available to use for restoring individual VMs or your complete environment."

1. Navigate to **System** > **System Snapshots**.
3. A listing of available snapshots is displayed; those displayed with a type of ***Provider*** are snapshots taken by the host. **Click to select the desired provider snapshots** (selected snapshots will show a checkmark).
4. Click **Request From Provider** on the left menu.
5. A confirmation dialog appears. Click **Yes** to continue pulling down the selected snapshots.
6. After the process is confirmed, transferring a snapshot down from the host can take 15 or more seconds. Once transferred the snapshot will now display with a type of ***Local*** with a green indicator; at this point it can be used for entire system, tenant, VM and volume restores from system snapshots as described below.

!!! warning "After a snapshot is requested from provider, and displays as *type=Local*, the snapshot can be edited to modify description and expiration. When changing expiration to a longer period it is important to consider effects on storage; long-term snapshots can substantially increase storage usage as data divergence between snapshot and live data increases over time."

___

## Restore Entire System from Snapshot

!!! note "System Requirements"
    * Full system restoration is only supported on the local System where the snapshot was taken. This operation cannot be used to restore one site over another (for example, you cannot restore Site A over Site B). 
    * Restoring a full system requires a complete reboot of all nodes.

!!! warning "Critical Impact"
    A full system restoration will revert all system components to the snapshot state, including:

    - Virtual Machines
    - Tenant configurations
    - NAS data
    - System settings
    - All other system components

    This is a comprehensive restoration that cannot be selectively applied to specific components.

1. Navigate to **System** > **System Snapshots**.
2. Click to **select the desired snapshot** from the list.
3. Select **Restore** from the left menu.
4. A warning message will appear to caution that this will overwrite the entire system.
    - By default, the option is selected to **take a snapshot** of the entire system before this restore. This allows for later reverting the system back to the state right before the restore operation, if needed.
    - By default, the option to **Reboot all nodes after the restore** is enabled. This will let the system handle the node reboots.
   Reboot of all nodes is necessary to complete the system restore.

5. Click the **Proceed** button to continue/ or **Cancel** to abort.
6. Another confirmation message will appear. To continue with the system restore, click the **Proceed** button or simply leave alone as **the restore operation will continue in 60 seconds unless cancelled.**

!!! warning "To cancel the operation, the *Cancel* button must be clicked within 60 seconds; otherwise, the restore operation will continue."

### Restore Select Tenants from a System Snapshot

Full system snapshots include all tenants at the time the snapshot is taken.  Partial system snapshots will only include tenants per the include/exclude tag configuration.

1. Navigate to **System** > **System Snapshots**.
2. **Select the desired system snapshot** from the list.
3. Click **View Tenants** on the left menu. You will be presented with a listing of all VMs contained in the selected system snapshot; this may take up to a few minutes.
4. **Select the tenants** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click **Yes** to proceed (Click *No* if you wish to cancel the operation).
7. The snapshot tenant listing will display a checkmark and ***Complete*** message next to each tenant that was restored, with a message indicating the name of the new tenant instance created (original tenant name with a copy number appended) ex: "Restored to: tenantExampleCorp (1)".

!!! note "An individual tenant can also be restored from the tenant dashboard, with a restore that overwrites the existing tenant, rather than creating a new tenant instance. Instructions can be found [**here**](/product-guide/tenants/tenant-snapshots#restore-a-tenant-from-snapshot-overwrite-existing)."

## Restore Select VMs from a System Snapshot (creates new VM instance(s))

Full system snapshots include all the host's VMs at the time the snapshot is taken.  Partial system snapshots will only include VMs per the include/exclude tag configuration.

1. Navigate to **System** > **System Snapshots**.
2. **Select the desired system snapshot** from the list.
3. Click **View VMs** on the left menu. You will be presented with a listing of all VMs contained in the selected system snapshot; this may take up to a few minutes.
4. **Select the VMs** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click ***Yes*** to proceed (Click *No* if you wish to cancel the operation).
7. The snapshot VM listing will display a checkmark and ***Complete*** message next to each VM that was restored, with a message indicating the name of the new VM instance created (original VM name with a copy number appended) ex: "Restored to: Windows2022SQL (0)".

!!! note "An individual VM can also be restored from the VM dashboard; restoring from the VM dashboard allows the option to create a new VM instance or overwrite the current. Instructions can be found [**here**](/product-guide/backup-dr/vm-snapshots-restores#restore-a-vm-snapshot-to-overwrite-existing-current-version-of-vm)."


## Related Documentation

* [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores) 
* [**Tenant Restores**](/product-guide/tenants/tenant-restores) 
* [**Volume Snapshots and Restores**](/product-guide/nas/volume-snapshots-restores) 
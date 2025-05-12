# Cloud Snapshots and Restores

Cloud snapshots contain a backup of everything in a system, including all tenants, VMs, NAS volumes, networks, and settings. A cloud snapshot can be used to restore an entire system. Additionally, the following can be imported and restored from a cloud snapshot:

- Individual tenants
- Individual NAS volumes
- Individual VMs*

!!! tip "VM snapshots contained within a cloud snapshot are crash-consistent. Individual VM snapshots allow a quiesce option (guest agent required). See [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores) for VM-level snapshot instructions."

## Automated Cloud Snapshots

By default, cloud snapshots run according to the included **Cloud Snapshots** profile. The cloud snapshot schedule can be changed by modifying this default profile or assigning a different profile.

### Assigning a Different Schedule to be Used for Automated Cloud Snapshots

1. From the main dashboard, click **System** on the left menu.
2. Click **Cloud Snapshots** on the left menu.
3. Click **Select Snapshot Profile** on the left menu.
4. **Select the desired snapshot profile** from the dropdown list. For instructions regarding modifying or adding new snapshot profiles, see: [**Snapshot Profiles**](/product-guide/backup-dr/vm-snapshots-restores).
5. Click **Submit** at the bottom of the page.

## Manual Cloud Snapshots

A manual snapshot can be taken at any time.

### Take a Manual Snapshot of Entire Cloud

1. From the main dashboard, click **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. Select **New** from the left menu.
4. Enter a ***Name*** (required) for the snapshot.
5. Enter a ***Description*** (optional).
6. In the ***Expires*** field, select/enter a date and time for expiration.
7. Click **Submit** at the bottom of the page.
!!! warning "Snapshot Expiration"
    Always consider vSAN usage: initially source and snapshot are the same and thus there is no impact on storage; but, as source data diverges more from the snapshot data, there is less deduplication between the two and thus more vSAN usage. Using the *Never Expire* option is not recommended unless necessary."

8. The ***Private*** checkbox is selected by default; this option can be deselected to allow tenants access to their own data within this snapshot.
9. Click **Submit** at the bottom of the page.

## Restores from Cloud Snapshots

### Access Cloud Snapshots from Your Provider/Host

!!! note "The following directions are applicable to systems that are tenants themselves. If provider has allowed it, a tenant can access a snapshot of their own cloud from the provider's cloud snapshots. Once requested from the provider, the snapshot is then available to use for restoring individual VMs or their entire cloud."

1. From the main dashboard, select **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. A listing of available snapshots is displayed; those displayed with a type of ***Provider*** are snapshots taken by the host. **Click to select the desired provider snapshots** (selected snapshots will show a checkmark).
4. Click **Request From Provider** on the left menu.
5. A confirmation dialog appears. Click **Yes** to continue pulling down the selected snapshots.
6. After the process is confirmed, transferring a snapshot down from the host can take 15 or more seconds. Once transferred the snapshot will now display with a type of ***Local*** with a green indicator; at this point it can be used for cloud, tenant, VM and volume restores from cloud snapshots as described below.

!!! warning "After a snapshot is requested from provider, and displays as *type=Local*, the snapshot can be edited to modify description and expiration. When changing expiration to a longer period it is important to consider effects on storage; long-term snapshots can substantially increase storage usage as data divergence between snapshot and live data increases over time."

### Restore Entire System from Snapshot

!!! note "System Requirements"
    Full system restoration is only supported on the local System where the snapshot was taken. This operation cannot be used to restore one site over another (for example, you cannot restore Site A over Site B). This operation requires a complete reboot of all nodes in the system.

!!! warning "Critical Impact"
    A full system restoration will revert all system components to the snapshot state, including:

    - Virtual Machines
    - Tenant configurations
    - NAS data
    - System settings
    - All other system components

    This is a comprehensive restoration that cannot be selectively applied to specific components.

1. From the main dashboard, select **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. Click to **select the desired snapshot** from the list.
4. Select **Restore** from the left menu.
5. A warning message will appear to caution that this will overwrite the entire system.
    - By default, the option is selected to **take a snapshot** of the entire cloud before this restore. This allows for later reverting the cloud back to the state right before the restore operation, if needed.
    - By default, the option to **Reboot all nodes after the restore** is enabled. This will let the system handle the node reboots.
   Reboot of all nodes is necessary to complete the cloud restore.

6. Click the **Proceed** button to continue/ or **Cancel** to abort.
7. Another confirmation message will appear. To continue with the cloud restore, click the **Proceed** button or simply leave alone as **the restore operation will continue in 60 seconds unless cancelled.**

!!! warning "To cancel the operation, the *Cancel* button must be clicked within 60 seconds; otherwise, the restore operation will continue."

### Restore Select Tenants from a Cloud Snapshot

1. Navigate to **Cloud Snapshots** (Main Dashboard > System > Cloud Snapshots).
2. **Select the desired cloud snapshot** from the list.
3. Click **View Tenants** on the left menu. You will be presented with a listing of all VMs contained in the selected cloud snapshot; this may take up to a few minutes.
4. **Select the tenants** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click **Yes** to proceed (Click *No* if you wish to cancel the operation).
7. The snapshot tenant listing will display a checkmark and ***Complete*** message next to each tenant that was restored, with a message indicating the name of the new tenant instance created (original tenant name with a copy number appended) ex: "Restored to: tenantExampleCorp (1)".

!!! note "An individual tenant can also be restored from the tenant dashboard, with a restore that overwrites the existing tenant, rather than creating a new tenant instance. Instructions can be found [**here**](/product-guide/tenants/tenant-snapshots#restore-a-tenant-from-snapshot-overwrite-existing)."

### Restore Select VMs from a Cloud Snapshot (creates new VM instance(s))

1. Navigate to **Cloud Snapshots** (Main Dashboard > System > Cloud Snapshots).
2. **Select the desired cloud snapshot** from the list.
3. Click **View VMs** on the left menu. You will be presented with a listing of all VMs contained in the selected cloud snapshot; this may take up to a few minutes.
4. **Select the VMs** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click ***Yes*** to proceed (Click *No* if you wish to cancel the operation).
7. The snapshot VM listing will display a checkmark and ***Complete*** message next to each VM that was restored, with a message indicating the name of the new VM instance created (original VM name with a copy number appended) ex: "Restored to: Windows2022SQL (0)".

!!! note "An individual VM can also be restored from the VM dashboard; restoring from the VM dashboard allows the option to create a new VM instance or overwrite the current. Instructions can be found [**here**](/product-guide/backup-dr/vm-snapshots-restores#restore-a-vm-snapshot-to-overwrite-existing-current-version-of-vm)."

- See [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores) for instructions on restoring an individual VM from a cloud snapshot.
- See [**Tenant Restores**](/product-guide/tenants/tenant-restores) for instructions on restoring an individual tenant from a cloud snapshot.
- See [**Volume Snapshots and Restores**](/product-guide/nas/volume-snapshots-restores) for instructions on restoring NAS volumes from a cloud snapshot.
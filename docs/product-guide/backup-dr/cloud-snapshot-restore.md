# Cloud Snapshots and Restores

Cloud Snapshots contain a backup of everything in a system, including all tenants, VMs, NAS volumes, networks, and settings. A cloud snapshot can be used to restore an entire system. Additionally, the following can be imported and restored from a cloud snapshot:

- Individual tenants
- Individual NAS volumes
- Individual VMs\*

!!! tip "VM snapshots contained within a cloud snapshot are crash-consistent. Individual VM snapshots allow a quiesce option (guest agent required). See [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores) for VM-level snapshot instructions."

## Automated Cloud Snapshots

By default, cloud snapshots run according to the included **Cloud Snapshots** profile. The cloud snapshot schedule can be changed by modifying this default profile or assigning a different profile.

### Assigning a Different Schedule to be Used for Automated Cloud Snapshots

1. From the main dashboard, Click **System** on the left menu.
2. Click **Cloud Snapshots** on the left menu.
3. Click **Select Snapshot Profile** on the left menu.
4. **Select the desired snapshot profile** from the dropdown list. For instructions regarding modifying or adding new snapshot profiles, see: [**Snapshot Profiles (Snapshot Scheduling)**](/product-guide/backup-dr/vm-snapshots-restores).
5. Click **Submit** at the bottom of the page.

## Manual Cloud Snapshots

A manual snapshot can be taken at any time.

### Take a Manual Snapshot of Entire Cloud

1. From the main dashboard, Click **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. Select **New** from the left menu.
4. Enter a ***Name*** (required) for the snapshot.
5. Enter a ***Description*** (optional).
6. In the ***Expires*** field, Select/Enter a date and time for expiration.
7. Click **Submit** at the bottom of the page.
!!! warning "Snapshot Expirations"
    In the Expiration Type field, "Never Expire" can be selected, however, it is important to consider vSAN space utilization. Initially source and snapshot are the same and thus there is no impact on storage; but, as source data diverges more from the snapshot data, there is less deduplication between the two and thus more vSAN usage. Using the *Never Expire* option is not recommended unless necessary.

8. The ***Private*** checkbox is selected by default; this option can be deselected to allow tenants access to their own data within this snapshot.
9. Click **Submit** at the bottom of the page.

## Restores from Cloud Snapshots

### Access Cloud Snapshots from Your Provider/Host

> The following directions are applicable to systems that are tenants themselves. If provider has allowed it, a tenant can access a snapshot of their own cloud from the provider's cloud snapshots. Once requested from the provider, the snapshot is then available to use for restoring individual VMs or entire cloud.

1. From the main dashboard, Select **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. A listing of available snapshots is displayed; those displayed with a type of ***Provider*** are snapshots taken by the host. **Click to select the desired provider snapshots** (selected snapshots will show a checkmark).
4. Click **Request From Provider** on the left menu.
5. A Confirmation dialog appears. Click **Yes** to continue pulling down the selected snapshots.
6. After the process is confirmed, transferring a snapshot down from the host can take 15 or more seconds. Once transferred the snapshot will now display with a type of ***Local*** with a green indicator; at this point it can be used for cloud, tenant, VM and volume restores from cloud snapshots as described below.

!!! warning "Extending Snapshot Expiration"
    After a snapshot is requested from provider, and displays as type=Local, the snapshot can be edited to modify description and expiration. When changing expiration to a longer period it is important to consider effects on storage; long-term snapshots can substantially increase storage usage as data divergence between snapshot and live data increases over time.

### Restore Entire Cloud from Snapshot

!!! note "Restoring entire cloud requires rebooting of all nodes; rebooting nodes can be done without system outages provided there are adequate system resources."

!!! warning
    **Restoring an entire cloud reverts everything within the system, including all VMs, tenants, NAS data, and settings.**

1. From the Main Dashboard, select **System** from the left menu.
2. Select **Cloud Snapshots** from the left menu.
3. Click to **select the desired snapshot** From the list.
4. Select **Restore** from the left menu.
5. A Warning message will appear to caution that this will overwrite the entire system.
    - By default, the option is selected to **take a snapshot** of the entire cloud before this restore. This allows for later reverting the cloud back to the state right before the restore operation, if needed.
    - By default, the option to **Reboot all nodes after the restore** is enabled. This will let the system handle the node reboots.
   Reboot of all nodes is necessary to complete the cloud restore.

6. Click the **Proceed** button to continue/ or **Cancel** to abort.
7. Another confirmation message will appear. To continue with the cloud restore, click the **Proceed** button or simply leave alone as **the restore operation will continue in 60 seconds unless cancelled.**
!!! warning "To Cancel the operation, the Cancel button must be clicked within 60 seconds; otherwise, the restore operation will continue."

### Restore Select Tenants from a Cloud Snapshot

1. Navigate to **Cloud Snapshots** (Main Dashboard > System > Cloud Snapshots).
2. **Select the desired cloud snapshot** from the list.
3. Click **View Tenants** on the left menu. You will be presented with a listing of all VMs contained in the selected cloud snapshot; this may take up to a few minutes.
4. **Select the tenants** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click ***Yes*** to proceed (Click *No* if you wish to cancel the operation).
7. The snapshot tenant listing will display a checkmark and ***Complete*** message next to each tenant that was restored, with a message indicating the name of the new tenant instance created (original tenant name with a copy number appended) ex: "Restored to: tenantExampleCorp (1)".

!!! note "An individual tenant can also be restored from the tenant dashboard, with a restore that overwrites the existing tenant, rather than creating a new tenant instance.Instructions can be found [**here**](/product-guide/tenants/tenant-snapshots#restore-a-tenant-from-snapshot-overwrite-existing)."

### Restore Select VMs from a Cloud Snapshot (creates new VM instance(s))

1. Navigate to **Cloud Snapshots** (Main Dashboard > System > Cloud Snapshots).
2. **Select the desired cloud snapshot** from the list.
3. Click **View VMs** on the left menu. You will be presented with a listing of all VMs contained in the selected cloud snapshot; this may take up to a few minutes.
4. **Select the VMs** to restore.
5. Click **Recover** on the left menu.
6. A **Confirmation** dialog will require you to click ***Yes*** to proceed (Click *No* if you wish to cancel the operation).
7. The Snapshot VM listing will display a checkmark and ***Complete*** message next to each VM that was restored, with a message indicating the name of the new VM instance created (original VM name with a copy number appended) ex: "Restored to: Windows2022SQL (0)".

!!! note "An individual VM can also be restored from the VM dashboard; restoring from the VM dashboard allows the option to create a new VM instance or overwrite the current. Instructions can be found [**here**](/product-guide/backup-dr/vm-snapshots-restores#restore-a-vm-snapshot-to-overwrite-existing-current-version-of-vm)."

- See [**VM Snapshots and Restores**](/product-guide/backup-dr/vm-snapshots-restores) for instructions on restoring an individual VM from a cloud snapshot.
- See [**Tenant Restores**](/product-guide/tenants/tenantrestores) for instructions on restoring an individual tenant from a cloud snapshot.
- See [**Volume Snapshots and Restores**](/product-guide/nas/volume-snapshots-restores.md) for instructions on restoring NAS volumes from a cloud snapshot.

</br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

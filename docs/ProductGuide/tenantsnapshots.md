

# Tenant Snapshots

Snapshots provide a way to obtain quick recovery points. Cloud snapshots allow for a complete rollback of a system (to the point in time of a snapshot) to protect in the event of major unforeseen issues that may arise. A cloud snapshot includes whole-system snapshots for each tenant as well. A tenant can be allowed (a per-tenant setting) to browse a listing of available provider snapshots and “self-serve” download selected timestamps to restore their entire system or individual VMs.

 > Tenants also have the ability to manage their own VergeIO snapshots within their system; this can allow a tenant to customize scheduling/retention as they wish. (The tenant will need adequate provisioned storage to retain snapshots.){.is-success}

<br>
<br>

## To Allow Tenant to Browse/Restore from Provider Snapshots:

1.  From the Main Dashboard, click **Tenants**.
2.  The **Tenants Listing** will appear. **Double-click the desired tenant**.
3.  Click **Edit** on the left menu.
4.  Enable the ***Expose Cloud Snapshots*** (check box) option.
5.  Click **Submit**.

<br>


## Instructions for the Tenant to Access their Data from Provider Snapshots

1.  From the Main Dashboard, click **System** on the left menu.
2.  Click **Cloud Snapshots** on the left menu.
3.  **Select the desired provider snapshot from the list of available timestamps.**
    -   Snapshots from the service provider will have a type = “Provider”.
    -   Snapshots taken by the tenant will show a type of “Local”.
    -   Notice the Created Date/Time column to aid in selecting the correct snapshot.
4.  Click **Request From Provider** on the left menu.
Once the snapshot displays as "Local" it is now available to use; see restore instructions below.

> Once the snapshot is local, the snapshot name and expiration can be modified. When setting expirations on snapshots, it is always important to keep storage capacity in mind; the longer the expiration, particularly in situations involving high change rates, the more storage that will be consumed. {.is-info}

<br>

## Instructions for the Tenant to Restore their Entire System from the Provider Snapshot
**Tenant must follow the above instructions first to request the desired snapshot from the provider. A snapshot that has been requested from the provider will now appear as type “Local”.**

1.  **Select** the **snapshot**.
2.  Click **Restore** on the left menu.
3.  By default, the option is selected to **take a snapshot of the entire cloud before this restore**. This allows for later reverting the cloud back to the state right before the restore operation, if needed.
4.  By default, the option to **Reboot all nodes** after the restore is enabled. This will let the system handle the node reboots (Recommended). Reboot is necessary to actually apply the restore.
5.  Click the **Proceed** button to continue/ or **Cancel to abort**.
6.  Another confirmation message will appear; to continue with the cloud restore, click the **Proceed** button or leave alone as the restore operation will continue in 60 seconds unless canceled.  
    **<span style="background:yellow"> To cancel the operation, the *Cancel* button must be clicked within 60 seconds</span>; otherwise, the restore operation will automatically continue!**
    
    
<br>

## Instructions for the Tenant to Recover Individual VMs from Provider Snapshot

1.  **Select the snapshot**.
2.  Click **View VMs** on the left menu.
3.  A **listing of the individual VMs** included in the snapshot appears. **Select a VM** to restore.
4.  Click **Recover** on the left menu.
5.  The ***VM Name*** will default to the original name, but can be changed.  
    **Note:** To recover a deleted VM, this name can be left the same. However, if there currently is a VM with the same name (e.g. the original VM still exists,) the VM name will need to be changed before it can be recovered.
6.  Click **Submit**.
The UI will redirect to the VM’s dashboard page, where Power on/Clone/Edit/etc. operations can be performed as desired.
<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
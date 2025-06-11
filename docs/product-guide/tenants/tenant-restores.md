
# Tenant Restores

Individual tenant restores can be obtained from cloud snapshots. Each tenant can also schedule/perform cloud snapshots of their own individual environment and restore directly from those snapshots with no intervention necessary from their VergeOS provider (parent).

A provider can restore a tenant from cloud snapshot **\-OR-** can expose a cloud snapshot listing to a tenant allowing the tenant to perform a restore of their system from their own UI. (Enable ***Expose Cloud Snapshots*** to allow a tenant to view/access to snapshots.)

## Restore an Existing Tenant from Snapshot

!!! warning
    A tenant Restore from the tenant dashboard will overwrite everything within the existing tenant!

1. From the **Main Dashboard**, click **Tenants** on the left menu.
2. Click **Tenants** again on the left menu.
3. **Double-click the desired tenant** from the list.
4. If the tenant is online, it will need to be powered down before it can be restored from snapshot. Click **Power Off** on the left menu.
5. Wait for the ***Tenant Status*** to indicate *Offline*.
6. Click **Snapshots** on the left menu.
7. Click to **Select the desired snapshot** within the list.
8. Click **Restore** on the left menu.
9. A Warning message will appear to caution that this will overwrite the entire existing tenant. Click the **Proceed** button to continue/ **Cancel** to abort.

## Restore a Deleted Tenant from Snapshot

1. From the **Main Dashboard**, click **system** on the left menu.
2. Click **Cloud Snapshots** on the left menu.
3. Click to **Select the desired snapshot** within the list. (Tenants that existed within the selected snapshot appear in the listing. A tenant that does not appear in the list was deleted prior to this time; check a previous snapshot.)
4. Click **View Tenants** on the left menu.
5. Click to **select the desired tenant** within the list.
6. Click **Recover** on the left menu.
7. ***Tenant Name*** will default to the original name but can be changed for the restore, if desired.
8. Click **Submit**
The dashboard for the recovered tenant appears. When the status changes from "Provisioning" to **"Offline"** the **tenant can be powered on**.

Once a deleted tenant is restored, an IP address can be reassigned to it. For more information see: [**Assigning External IP Addresses to a Tenant**](product-guide/tenants/assign-ip-to-tenant/)


# Tenant Restores

Individual tenant restores can be obtained from system snapshots. Each tenant can also schedule/perform system snapshots of their own individual environment and restore directly from those snapshots with no intervention necessary from their VergeOS provider (parent).

A provider can restore a tenant from system snapshot **\-OR-** can expose a system snapshot listing to a tenant allowing the tenant to perform a restore of their system from their own UI. (Enable ***Expose System Snapshots*** to allow a tenant to view/access to snapshots.)

## Restore an Existing Tenant from Snapshot

!!! warning
    A tenant Restore from the tenant dashboard will overwrite everything within the existing tenant!

1. From the top menu click **Tenants** on the top menu.
2. Select **List**.
3. **Double-click the desired tenant** from the list.
4. If the tenant is online, it will need to be powered down before it can be restored from snapshot. Click **Power Off** on the left menu.
5. Wait for the ***Tenant Status*** to indicate *Offline*.
6. Click **Snapshots** on the left menu.
7. Click to **Select the desired snapshot** within the list.
8. Click **Restore** on the left menu.
9. A Warning message will appear to caution that this will overwrite the entire existing tenant. Click the **Proceed** button to continue/ **Cancel** to abort.

### Cancel or Overwrite a Pending Restore

If a tenant restore is already in progress (pending), you can cancel or overwrite it:

- **Cancel:** Select the pending restore and click **Cancel Restore** on the left menu. This stops the in-progress restore operation and returns the tenant to its previous state.
- **Overwrite:** If you initiate a new restore while one is already pending, the system provides the option to overwrite the pending restore with the newly selected snapshot.

## Restoring Sub-Tenants

When restoring a tenant that itself contains sub-tenants (tenants within tenants), the restore operation includes the full sub-tenant hierarchy. The restore process correctly resolves sub-tenant paths, ensuring nested tenant environments are restored accurately.

## Restore a Deleted Tenant from Snapshot

1. From the top menu, click **System**.
2. Select **System Snapshots**.
3. Click to **Select the desired snapshot** within the list. (Tenants that existed within the selected snapshot appear in the listing. A tenant that does not appear in the list was deleted prior to this time; check a previous snapshot.)
4. Click **View Tenants** on the left menu.
5. Click to **select the desired tenant** within the list.
6. Click **Recover** on the left menu.
7. ***Tenant Name*** will default to the original name but can be changed for the restore, if desired.
8. Click **Submit**
The dashboard for the recovered tenant appears. When the status changes from "Provisioning" to **"Offline"** the **tenant can be powered on**.

Once a deleted tenant is restored, an IP address can be reassigned to it. For more information see: [**Assigning External IP Addresses to a Tenant**](/product-guide/tenants/assign-ip-to-tenant)

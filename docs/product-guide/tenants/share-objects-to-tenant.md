# Share a VM between Provider/Tenant

The Shared Objects feature provides a convenient way to share a Virtual Machine image between provider and tenant.  The provider or tenant can make specific VM snapshots available for the other to import into a virtual machine within their own system.

!!! tip "Future development may include the ability to share additional object types between providers and tenants."

what are the plans for additional objects to "share"?  


## Share a VM between Tenant/Provider

**On the sending system:**

1. The VM is shared via a snapshot.  Take a manual snapshot of the VM(/product-guide/backup-dr/vm-snapshots-restores#take-a-manual-snapshot-of-a-vm) or determine an existing VM snapshot you wish to use.
2. From the Main Dashboard, navigate to **System > Shared Objects**.
3. Click **New** on the left menu.
4. Provide a **Name** - should be descriptive for tenant to know what it is.
5. Optional description
6. Select ***Virtual Machine*** in the Type field.
7. Select desired **Snapshot** from the list.
8. Select **Recipient** (a tenant or your service provider).
9. Click **Submit** to make the VM available to the recipient.

**On the receiving system:**

1. From the Main Dashboard, navigate to **System > Shared Objects**.
2. A listing of available shared objects is displayed.
3. Objects shared from other systems will display as "Inbound".
4. Select desired VM(s) and click **Import** on the left menu.
5. (Optional) Uncheck the *Preserve MAC Addresses* checkbox if new, unique MAC addresses should be created.
6. (Optional) Select a Preferred Tier on which to create the new VM(s). Otherwise, VM drives will be created on the system default tier.
!!! warning "Before completing an import, ensure there is adequate space on the selected tier."
7. Click **Import** to complete the VM import.


can be deleted after use or can be renamed to import it again


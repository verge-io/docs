# Share a VM Snapshot between Provider/Tenant

The *Shared Objects* feature provides convenient, snapshot-based VM sharing between provider and tenant. The provider or tenant can make a specific VM snapshot available to the other to create a new VM within their own system.

> Future development may provide for sharing additional object types between providers and tenants.

## On the Sending System

1. **Establish desired VM snapshot**: [Take a manual snapshot of the VM](/product-guide/backup-dr/vm-snapshots-restores#take-a-manual-snapshot-of-a-vm) or determine an existing VM snapshot you wish to use.
2. From the Main Dashboard, navigate to **System > Shared Objects**.
3. Click **New** on the left menu.
4. Provide a **Name** for the shared object; this will be used to name the imported VM on the receiving system.
5. (Optional) **Description** can be used to store additional information about the shared object.
6. Select ***Virtual Machine*** in the **Type** field.
7. Select desired **Snapshot** from the list.  The selection list will include all snapshots of the selected VM.
8. Select **Recipient** (a tenant or your service provider).
9. Click **Submit** to make the VM image available for the recipient to import.

## On the Receiving System

1. From the Main Dashboard, navigate to **System > Shared Objects**.
2. A listing of available shared objects is displayed.  Objects shared from other systems will display as "Inbound".
3. Select desired VM objects and click **Import** on the left menu.
4. (Optional) Uncheck the **Preserve MAC Addresses** checkbox if new, unique MAC addresses should be created. Consider unchecking this option if:  
   - The source VM will remain active  
   - You are creating a test/dev copy  
   - There are potential network conflicts  
!!! note "Guest network configuration may need adjustment after import with new MAC addresses."

5. (Optional) Select a **Preferred Tier** on which to create the new VM(s). Otherwise, VM drives will be created on the system default tier.
!!! warning "Before completing an import, ensure there is adequate space on the selected tier."

6. Click **Import** to complete the operation.  The VM is created with the name given to the shared object (the "Name" specified in step 4 of the sending process), not the original VM name from the source system.

!!! tip "Shared Object Reuse:"
    - The shared object can be deleted after successful import.
    - It cannot be reused with the same name (but can be renamed to allow another import).

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Error message *"You cannot import something that is not in the inbox."*
        - Solution: Verify only "Inbound" items were selected for import; "Outbound" items cannot be imported.
    - Problem: Error message *"A virtual machine already exists with this name."*
        - The VM was already imported, or
        - an existing VM has the same name as the shared object.
        - Solution: Rename the shared object to create a VM with a different name.

# Replacing a Defective or End-of-life Drive

This page covers replacing a drive (participating in the vSAN) due to defect or end of lifespan. Expedient replacement of problem drives is crucial to maintaining vSAN data protection.

## When Does a Drive Need to be Replaced?

The VergeOS interface will provide warnings or alerts to indicate when there is a problem with a physical drive. When a drive has a warning or error status, an indicator will "bubble up" to the System Dashboard page (To access the System Dashboard: select **System** > **Dashboard** from the top menu.)

![Drive Count Box](/product-guide/screenshots/drivecountbox.png)

- Click anywhere within the drive count box to access the full list of drives.
- Double-click a drive with an error/warning to view its dashboard that displays more detail.

![Drive listing warning](/product-guide/screenshots/drivelisting-warning.png)

![Drive Dashboard](/product-guide/screenshots/drivedashboard.png)

### Example Warning/Error Statuses

- **Warning** - Wear level exceeded maximum threshold(s)
- **Warning** - Reallocated sectors exceeded maximum threshold(s)
- **Error** - Drive is unresponsive; read or write error threshold reached

!!! warning "Important"
    **It is highly recommended to configure on-demand and scheduled subscriptions (with *target type=system Dashboard*) to ensure timely awareness of drive issues.** The [Creating Subscriptions Guide](/product-guide/system/subscriptions-overview) provides information about setting up subscriptions.

## Determine Correct Physical Drive for Replacement

1. Navigate to the **node dashboard**.
2. **Activate** the drive **LED**
    - If ***LED Status*** indicates **Off**, click **Turn on LED** on the left menu.

    ![ledoff.png](/product-guide/screenshots/ledoff.png)

    - If ***LED Status*** field indicates **Unsupported**, click **Locate LED** on the left menu.

   ![ledunsupported.png](/product-guide/screenshots/ledunsupported.png)

3. The Diagnostics window will appear with settings pre-filled.  Click **Send ->** to activate the drive LED.

    ![diag-ledon.png](/product-guide/screenshots/diag-ledon.png)

4. Once the LED is activated, the physical drive can be located by identifying the one with a solid light. After identifying the drive, **deactivate the LED**:

![diag-ledoff.png](/product-guide/screenshots/diag-ledoff.png)

## Replace a Drive

!!! danger "**CAUTION: Before** initiating a drive repair operation, **verify**:"
    1. All nodes are operational (none are powered off or in maintenance mode)
    2. Other drive repairs are not in process on a different node for the same storage tier (Drive repairs running on the same physical node pose no problem.)
    3. The correct physical drive is confidently identified before removal (See directions above.)

1. From the node dashboard, click **Drives**.
2. Click to **select the particular drive** (Selected drive shows a check mark on the left.)
3. Click **Close/Take Offline** on the left menu.
4. When the drive status appears as **Offline:** physically remove the drive, **being extremely careful to remove the correct drive.**
5. **Verify** the UI reflects the drive is missing to verify that the proper drive was removed.
6. **Insert the replacement drive**.
7. **Wait** for the drive to be detected; the dashboard will show the new drive as **Offline**.
8. Click **Format** on the left menu.
9. **Wait** until the dashboard no longer indicates the disk is formatting.
10. Click **Initialize** on the left menu.

!!! success
    After the vSAN has completed a full walk, the repair process will begin, and the drive status will change to "Repairing"; at this point the drive dashboard will indicate an **Estimated Repair Completion date and time.**

!!! warning "**DURING THE REPAIR PROCESS:**"  
    - **Do NOT restart, reset or power off any nodes** until the drive shows a status of "Online"; it is important that all other nodes remain fully operational during the repair process.
    - **Additional drive replace/repair operations should NOT be initiated until this repair operation has fully completed** unless the additional drive resides: within the same node - OR - on another storage tier.

# Retrieving a Snapshot back (Sync Back)

This page provides instructions for retrieving a copy of a snapshot from the sync destination back to the source system. This allows you to perform a local restore from the retrieved snapshot. Before a remote snapshot can be recovered to the source system, sync-back must be configured once; it then remains available for all subsequent sync back requests.

## Prerequisites

Before configuring sync-back, ensure:

* **Send and Receive Snapshots** is enabled in site settings (**System → Sites → [Site] → Settings**)
* **Network rules** are configured for sync in both Core and External networks ([see documentation](#))
* You have an active **outgoing sync** to the remote site

## Configure Sync-back

1. From the home screen, click **Sites → Outgoing syncs**
2. Double-click the outgoing sync you want to configure (or check it and click **View**)
3. In the **Remote** section, click **"Click here to Setup"** next to the **Sync-back** field
   - If a sync-back name appears instead, sync-back is already configured
4. Click **Yes** to confirm setup

The Sync-back field now shows a name (e.g., "Sync-back for NAMEofSYNC"), indicating an incoming sync has been automatically created for syncing snapshots back from the remote system.

## Initiate a Sync Back

1. Navigate to the **Outgoing Sync Dashboard**:
   - From the home screen: **Sites → Outgoing syncs** → double-click the desired sync
2. Click **Remote Snaps** in the left menu
3. Select the desired snapshot(s) to sync back (checked snapshots show a checkmark)
4. Click **Request** in the left menu and configure options:
   - **Retention**: Defaults to 3 days (does not affect remote retention)
   - **Priority (0-9)**: Lower numbers sync first (only relevant for multiple sync backs)
   - **Prefix**: Highly recommended to distinguish retrieved snapshots from originals
     - Recommended: `Sync-back` (system automatically adds underscore)
     - Example: `Snapshot_20251027` becomes `Sync-back_Snapshot_20251027`
5. Click **Submit** to initiate the sync-back

The Incoming Sync Dashboard appears showing sync progress. When complete, access the retrieved snapshot by clicking the **Received snapshots** count-box. The snapshot can also be found at **System → Cloud Snapshots** with the **Remote** checkbox checked.

---

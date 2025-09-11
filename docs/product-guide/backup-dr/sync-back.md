# Retrieving a Snapshot back (Sync Back)

This page provides instructions for retrieving a copy of a snapshot from the sync destination back to the source system. This would allow for performing a local restore from the retrieved snapshot. Before a remote snapshot can be recovered to the source system, the sync-back must be configured; once sync-back is configured it is then available for all subsequent sync back requests.

## Configure Sync-back

1. On the sending system, navigate to the **Outgoing Sync Dashboard**.
2. Under the **Remote** section, click **- Click here to Setup -** link next to the **Sync-back** field.
!!! success "A sync-back field link labeled with a sync-back name rather than 'Click here to Setup' indicates that the sync-back has already been configured and should be ready for initiating sync back of specific snapshot(s)."

3. Click **Yes** to confirm setup of the sync-back.
Now a name is listed in the sync-back field (i.e. Sync-back for NAMEofSYNC). This automatically sets up an incoming sync for syncing snapshots back from the remote system.

## Initiate a Sync Back

1. On the sending system, ensure that it can receive system snapshots from the receiving system by navigating to the **Site** of the receiving system.  See [**Add Sites**](/product-guide/system/site-dashboard-add-sites), step 8: Cloud Snapshots.
2. Navigate to the outgoing sync dashboard.
3. Click **Remote Snaps** on the left menu.
4. Click to select desired snapshot(s) to sync back (selected snapshots have check mark on the left).
5. Click **Request** on the left menu.
    - **Retention** for the retrieved snapshot will default to 3 Days; can be changed as desired. (Changing retention setting here does not affect the retention in place for the snapshot on the remote system.)
    - **Priority** (0-9) can be specified, with lower number to sync before higher number; only relevant when multiple sync backs will be initiated.
    - Optionally, a **Prefix** can be added to the snapshot name in order to clearly distinguish it from other snapshots; text entered in this field is appended to the beginning of the existing snapshot name for the retrieved copy.
6. After options are configured as desired, click **Submit** to initiate the sync-back.

The dashboard for the configured sync-back (Incoming Sync) appears. A log entry will indicate a started sync. When the sync-back retrieval is completed, another log entry is generated showing statistics. The retrieved snapshot can be accessed by clicking the **Received snapshots** count-box on this page. Select the snapshot in the list to access menu options that allow for restoring the entire local system or individual VMs contained within the snapshot.

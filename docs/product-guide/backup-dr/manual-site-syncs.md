# Manual Site Sync

Typically, site syncs will be handled with an auto sync configuration, which defines particular cloud sync periods or tasks to be synchronized automatically. Snapshots can also be manually added to the sync queue in order to sync snapshots not included in the auto sync config.

## Manually Add a Snapshot to the Sync Queue

**On the Outgoing Sync Dashboard:**

1. Click the **Add Cloud Snapshot to Queue** link at the bottom of the Snapshot Queue pane.
2. **Cloud Snapshot** dropdown list will include all available snapshots available for manual sync; select desired snapshot.
3. **Retention/Units** fields are autopopulated with the retention settings defined for the local snapshot; these settings can be adjusted to allow for a longer or shorter retention for this snapshot on the remote system.
4. **Priority** determines precedence of snapshots in the sync queue, with lower numbers synchronized before higher numbers.
5. The **Do not expire snapshot** option can be selected to ensure a snapshot will not expire locally before it syncs; this can be important for snapshots configured with a short retention period locally, but a longer retention on the remote system.
6. **Prefix the snapshot name with this on the destination (optional)** can be used to assign added text to the beginning of the existing snapshot name.
7. Click **Submit** to add to queue.

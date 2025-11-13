# Monitoring Site Syncs

Given the importance of syncs, which are used to provide off-site data protection, best practices include regular monitoring to verify expected ongoing sync operations.

Ongoing tracking of sync activity can be done from the sending system or the receiving system.

## Outgoing Sync Dashboard (Sending System)

![outgoingsync-dash.png](/product-guide/screenshots/outgoingsync-dash.png)

### Sync Status

The top left area of the dashboard displays the current status of the sync (e.g. offline, syncing, error). A status of "offline" indicates that no sync activity is currently in progress.

### The Snapshot Queue

The snapshot queue section displays:

- The most recently synchronized snapshots
- Currently synching snapshot (if applicable)
- Snapshots in the waiting list to sync

### Remote Snapshots

The total number of remote snapshots is displayed in the **Remote Snapshots** quick-link box. Click the quick-link box to view the complete list of snapshots on the destination system.

### Destination Snapshots

The most recent synchronized snapshots are displayed in the destination snapshots section. Clicking on this area will bring up the complete list of destination snapshots; from this list, particular snapshots can be selected for modifying expiration or request for restore back to local site.

## Incoming Sync Dashboard (Receiving System)

![incomingsync-dash.png](/product-guide/screenshots/incomingsync-dash.png)

### Sync Status

The top left area of the dashboard displays the current status of the sync (e.g. offline, syncing, error)

### Received History

The received history section shows a listing of the snapshots received along with sync statistics, start and stop time. The most recent received snapshots are displayed, with up to 20 entries; click anywhere on the received history section to bring up the listing page where a full list of received snapshots is displayed.

## Sync Logs (Sending and Receiving Systems)

On both incoming sync and outgoing sync dashboards, logs are displayed at the bottom of the page. A log entry is created to mark the start of each snapshot sync. Another log entry is created when the sync is completed, displaying statistics for the amount checked, scanned, sent, sent net, directory and file counts.

## Sync Statistics (Sending and Receiving Systems)

Statistics shown in sync dashboard listings and log entries. These numbers update to show the progress of the sync, with final numbers displayed at the end of the sync process.

- **Checked** - total size of all files that have been determined need to be compared (file level, pre-deduplication)
- **Scanned** - total size of data blocks compared
- **Sent** - amount of data determined as needed to be sent - e.g. changed data (pre-compression)
- **Net Sent** - actual amount of data transferred on the wire (post-compression)
- **Dirs Checked** - total number of files within the source
- **Files Checked** - total number of files within the source

## Use Subscriptions to Monitor Syncs

Subscriptions are available from both the sending system and the receiving system to oversee sync activity.

!!! info "Reference the [**Subscriptions**](/product-guide/system/subscriptions-overview) page for more information about creating and using subscriptions."

### Example Subscriptions

### Get a Daily Report of the Sync Dashboard (Sending Site)

1. Navigate to the **Incoming Sync Dashboard** page (Backup/DR > Incoming Syncs > double-click the intended incoming sync).
2. Click **Subscriptions** on the left menu.
3. Click **New** on the left menu.
4. Provide a **Name** for the subscription (the name will appear in the subject of the received email notification.)
5. Set the **Type** = ***Scheduled***
6. Set the **Subscription profile** = ***Site Sync Dashboard***.
7. Click **Submit** to save the subscription.

![subscription-syncdash.png](/product-guide/screenshots/subscription-syncdash.png)

### Receive a Notification each Time a New Sync is Completed (Receiving Site)

1. Navigate to the **Outgoing Sync Dashboard** page.
2. Click **Subscriptions** on the left menu.
3. Click **New** on the left menu.
4. Provide a **Name** for the subscription (the name will appear in the subject of the received email notification.)
5. The **Type** field should be left at the default setting of ***On-demand***
6. Set **Subscription profile** = ***Site Sync Received***
7. Click **Submit** to save the subscription.

![subscription-syncreceived.png](/product-guide/screenshots/subscription-syncreceived.png)

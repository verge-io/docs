---
title: Product Guide - Retrieving a Snapshot back (Sync Back)
description: Instructions for configuring a Sync-back, which allows for accessing a snapshot that was sync'd to another system to use for a local restore.
published: true
date: 2023-06-27T14:22:52.994Z
tags: 
editor: markdown
dateCreated: 2023-04-04T15:42:33.384Z
---

# Retrieving a Snapshot back (Sync Back)

This page provides instructions for retrieving a copy of a snapshot from the sync destination back to the source system. (Doing this would allow for performing a local restore from the retrieved snapshot.)  Before a remote snapshot can be retrieved back to the source system, the sync-back must be configured; once sync-back is configured it is then available for all subsequent sync back requests.

<br>
<br>


### Configuring the Sync-back

1.  On the sending system, navigate to the **Outgoing Sync Dashboard**.
2.  Under the **Remote** section, click **\- Click here to Setup -** link next to the **Sync-back** field.

> A Sync-back field link labeled with a sync-back name rather than "Click here to Setup" indicates that the sync-back has already been configured and should be ready for initiating sync back of specific snapshot(s).{.is-success}
3.  Click **Yes** to confirm setup of the sync-back. 
Now a name is listed in the sync-back field (i.e. Sync-back for NAMEofSYNC) This automatically sets up an incoming sync for syncing snapshots back from the remote system.

<br>
<br>


### Initiating a Sync Back

1.  On the sending system, navigate to the Outgoing Sync dashboard
2.  Click **Remote Snaps** on the left menu.
3.  Click to **select desired snapshot(s)** to sync back (selected snapshots have check mark on the left).
4.  Click **Request** on the left menu.
    -   ***Retention*** for the retrieved snapshot will default to 3 Days; can be changed as desired. (Changing retention setting here does not affect the retention in place for the snapshot on the remote system.)
    -   ***Priority*** (0-9) can be specified, with lower number to sync before higher number; only relevant when multiple sync backs will be initiated.
    -   Optionally, a ***Prefix*** can be added to the snapshot name in order to clearly distinguish it from other snapshots; text entered in this field is appended to the beginning of the existing snapshot name for the retrieved copy.
5.  After options are configured as desired, click **Submit** to initiate the sync-back.
The dashboard for the configured sync-back (Incoming Sync) appears. A log entry will indicate a started sync. When the sync-back retrieval is completed, another log entry is generated showing statistics. The completed sync'd back snapshot can be accessed by clicking the Received snapshots count-box on this page. Select the snapshot in the list to access menu options that allow for restoring the entire local system or individual VMs contained within the snapshot.

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
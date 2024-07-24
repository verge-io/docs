---
title: Product Guide - NAS Volume Snapshots and Restores
description: Provides instructions to use the NAS volume snapshot feature to obtain quiesced backup of individual NAS volumes (manually or scheduled); also gives instructions for restoring NAS volume snapshots to create a new volume or overwrite the existing volume.
published: true
date: 2024-03-25T17:38:36.755Z
tags: 
editor: markdown
dateCreated: 2023-04-05T19:45:40.101Z
---

# NAS Volume Snapshots and Restores

Volume-level snapshots allow for customizing snapshot schedule and retention rules per individual NAS volume and provide the option for a quiesced snapshot. (Non-quiesced NAS volumes can be imported from cloud snapshots to be used for restore.)

<br>
<br>


## Quiesced Snapshots

Quiesced volume snapshots freeze file system I/O during the snapshot process. The Quiesce option can be selected when taking a manual volume snapshot and can be enabled within the snapshot profile for automated snapshots.

<br>
<br>


## Scheduling Volume Snapshots
<br>

### Assign a Snapshot Profile to a Volume

> Snapshots can only be performed on volumes of type=local.{.is-success}

1.  From the **volume dashboard**, click **Edit** on the left menu.
2.  In the ***Snapshot profile*** field, select the desired profile from the dropdown list.
3.  Click **Submit** at the bottom of the page.

<br>
<br>

## Manual Volume Snapshots
<br>

### Take a Manual Snapshot of a Volume
> Snapshots can only be performed on volumes of type=local.{.is-success}

1.  From the volume dashboard, click **Take Snapshot** on the left menu.
2.  Enter a ***Name*** for the snapshot (required).
3.  Enter a ***Description*** (optional).
4.  The ***Quiesce*** option can be selected to freeze I/O during the snapshot process.
5.  In the ***Expires*** field, select/enter a date and time for expiration.
6.  Click **Submit** at the bottom of the page.


> **Always consider vSAN Usage**: When selecting expiration for a snapshot it is important to consider vSAN space utilization. Initially source and snapshot are the same and thus there is no impact on storage utilization; however, as source data diverges more from the snapshot data, there is less deduplication between the two and thus more vSAN usage. It is typically not recommended to use the Never Expire option unless necessary. {.is-warning}

<br>
<br>

## Restoring a Volume from Snapshot

> To restore a volume from a cloud snapshot, the volume snapshot must first be imported from the cloud snapshot as detailed below. To restore from an individual volume snapshot, skip the import section of instructions and continue to **Restore to overwrite -Or- Restore to create new instructions*** {.is-info}

<br>
<br>

### *Import Volume Snapshot from a Cloud Snapshot (to make it available for a volume restore).*

1.  From the **volume dashboard**, click **Cloud Snapshots** on the left menu.
2.  Click to **select desired cloud snapshot**.
3.  Click **Import Snapshot** on the left menu.
4.  ***Name, Description and Expiration fields** will default to the values from the cloud snapshot; make changes if desired; changes made will only apply to the import and will not affect the underlying cloud snapshot.
5.  Click **Submit** to continue.
6.  (If the process was continued,) a message should appear stating the import process has begun. Click the **Ok** button to acknowledge.
7.  When the import is complete, the snapshot will be available for restore using instructions below.

<br>
<br>

### *Restore a Volume (to overwrite existing current version of volume)*

1.  From the **volume dashboard**, click **Snapshots** on the left menu.
2.  A listing of available snapshots is displayed. Click to **select the desired snapshot**.
3.  Select **Restore over Source** from the left menu.
4.  A Warning message will appear to caution that this will overwrite the existing volume and all of its data.  *By default, **Restore Data Only** is selected; this option will restore over data within the volume, but not modify any current volume settings. The alternate option: **Restore Data and Settings** will both restore over volume data and will replace volume settings with those in the snapshot.*

5.   Click the **Proceed** button to continue/ or **Cancel** to abort.

<br>
<br>

### *Restore a Volume (to create a new volume)*

1.  From the volume dashboard, click **Snapshots** on the left menu.
2.  A listing of available snapshots is displayed. Click to **select the desired snapshot**.
3.  Click **Restore To New** on the left menu.
4.  The **Destination Service VM** defaults to the NAS service of the source volume; if multiple NAS services exist on the system, a different service can be selected on which to restore the volume.
5.  The **Volume Name** (for the new volume instance) will default to ORIGINALVOLUMENAME\_restored; change name if desired.
6.  Click the **Submit** button to create the new volume from snapshot.
The new volume is brought online automatically. To view the new volume's dashboard, return to Volumes and double-click on the volume in the listing.
<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
---
title: Product Guide - NAS Volume Syncs
description: Explanation of volume syncs and their different uses; instructions for creating a new volume sync.
published: true
date: 2023-06-27T14:47:41.103Z
tags: 
editor: markdown
dateCreated: 2023-03-29T14:36:03.275Z
---

# Volume Syncs

Volume Syncs allow for synchronizing data between two volumes. A volume sync can be used as a one-time transfer or recurring in order to synchronize data on a regular schedule. Volume syncs can involve both [**Remote Volumes**](/public/ProductGuide/nasremotevolumes) and [**Local Volumes**](/public/ProductGuide/naslocalvolumes), providing the ability to:
<br>


-   Easily transfer an external file system into VeregOS storage.
-   Use VeregOS as a target for file-level backups of an external system.
-   Transport data from a VeregOS NAS to an external storage system.
-   Perform regular backups of VeregOS native-NAS data to another VeregOS system or a third-party storage.


<br>
<br>

## Create a Volume Sync

1.  From the Main Dashboard, select **NAS** from the left menu.
2.  Click **Volume Syncs** on the left menu.
3.  Click **New** on the left menu.
4.  Select the ***NAS Service*** (the NAS Service hosting the volumes to be synchronized)
5.  Specify a ***Name*** for the new volume Sync. Note: no spaces allowed.
6.  Select ***Volume Sync*** in the ***Type*** dropdown list.
7.  Enter a ***Description*** for the volume Sync (optional).
8.  Specify ***Max Run Time*** by entering an integer and selecting ***Units*** (Hours/Days) from the dropdown list, **\-or-** Select **'Forever' in the Units field to set an unlimited run time.**
9.  The ***Max Errors*** setting will default to 1000. This will determine at what number of errors the sync job will automatically abort.
10. [Verge.io](Verge.io) sync  is the default sync ***Method***. While this method may provide better performance, alternately, the **rsync** method can be selected to include synchronization of CIFS file permissions.
11.  Select ***Destination Delete*** setting from the dropdown list. This setting specifies how files are handled that exist at the destination, but (no longer) exist at the source.

   -  **Delete after transfer*** - Files are deleted from the destination after all data is transferred; the delete part of the sync operation will entail an additional walk of the filesystem.
   -   **Never delete (default)*** - Files are not deleted (even when they no longer exist on the source).
   -   ***Delete before transfer*** - Files are deleted before data is transferred.
-   ***Delete after transfer (find during)*** - Files to delete are found during transfer, but not actually deleted until after data is transferred. (This does not involve multiple walks of the source data.)
-   ***Delete during transfer*** - Files are deleted as they are encountered during the transfer process.
-   ***Delete files from Destination*** - Files are deleted in a manner automatically determined by the particular system.
<br>
12.  Select ***Source Volume*** from the dropdown list. Source volume can be either a local volume or a remote volume.
13.  Specify a ***Source Start Directory*** (or leave blank to sync the entire volume from the root). A trailing slash will copy only the contents of the directory; no trailing slash will copy the directory by name.  For example: /data/ will copy everything under the data folder, not creating the data folder on the destination; /data will copy the data folder and all its contents.

14.  Specify ***Include Files/Directories*** (optional), to only synchronize particular files, directories, and/or file patterns. Example pattern: /foldername/
15.  Specify ***Exclude Files/Directories*** (optional), to skip particular files, directories, and/or file patterns. Note: the snapshots, lost+found, and quarantine folders are excluded by default.
> Paths used in ***Source Start Directory*** and ***Include/Exclude*** entries **always use forward slash ("/") , not backslash** - including remote CIFS volumes.   {.is-info}

16.  Select ***Destination Volume*** from the dropdown list. (can be either a local volume or remote volume.)
17.  Specify a ***Destination Start Directory*** (or leave blank to sync to the root of the volume).
18.  ***Start Profile*** option should be enabled to provide a recurring, regularly-scheduled sync; disable Start Profile for a one-time sync or a sync that can only be started manually. Select a ***Start Time Profile*** from the dropdown list
**\-or-**
 leave the **\-- Default -** setting to utilize the start time of the built-in **"NAS Volume Syncs"** Profile. The ***Start Time Profile*** determines when the recurring sync will start. Snapshot Profiles are used to control volume sync Start Profiles. See [Snapshot Profiles](/public/ProductGuide/snapshot-profiles) for information about Snapshot Profiles.

> **The Start Time Profile setting determines the start time of the sync only; it does not control snapshots for the volume!** {.is-warning}


<br> 

### Advanced Options

-   Specify a ***Run As User*** (optional). By default, the sync operation is run as "root"
-   ***Freeze Filesystem*** (default - disabled) - Applies only when source volume is a local VeregOS volume; temporarily blocks write operations while buffers are flushed, the filesystem is branched and a clean-state snapshot is taken for the sync operation. Although not as instantaneous as a crash-consistent snapshot operation, a filesystem freeze can be a relatively quick operation.
-   ***Preserve ACLs*** (default - enabled) - Can be disabled for performance, when ACLs are unnecessary on the destination (for example: converting Linux volume to Windows)
-   ***Preserve Extended Attributes*** (default - enabled) - Can be disabled to omit extended attributes from sync transfer.
-   ***Copy Symlinks*** (default - enabled) - Can be disabled where symlinks point to external/separate file systems.
-   ***Preserve Permissions*** (default - enabled) - Applies to Linux permissions; can be disabled to avoid transferring to destination.
-   ***Preserve Modification Time*** (default - enabled) - Can be disabled to force complete transfer of all data on subsequent sync operations.
-   ***Preserve Groups*** (default - enabled) - Can be disabled to avoid transfer of Group setting to destination.
-   ***Preserve Owner*** (default -enabled) - Can be disabled to avoid transfer of Owner setting to destination.
-   ***Preserve Device Files*** (default - disabled) - Can be enabled to facilitate machine backups, etc. **This option should be used with caution!** Requires superuser permissions.
-   ***Omit setting directory time*** (default - disabled) - Directory times are assigned based on time of backup rather than from source data.
-   ***Omit setting symlink time*** (default - disabled) - Symlink times are not transferred from source data.
-   ***Update destination files in-place*** (default - disabled) - When a file needs to be updated, the sync will update the data directly rather than the default method of creating a new copy of the file and moving it into place when it is complete.
-   ***Preserve CIFS ACLs*** (default - enabled) - Sync will update destination ACLs to be the same as the source ACLs. The source and destination system must have compatible ACL entries for this option to work properly.
-   ***Extended properties*** - Extended properties can be specified to provide additional features/constraints for this sync; contact VeregOS Support for assistance with extended properties.
- ***Number of simultaneous workers*** (default - 4) - Specifies the number of threads to be used for the sync operation. Increasing this number can improve sync completion times, particularly where syncs are performed over high-latency connections. 

19.  Click **Submit** to save the settings and create the new volume sync.

The dashboard for the new volume sync will appear. The sync job will be offline until either run manually or automatically started per the specified start profile. **To Start the sync manually select Start Sync from the left menu.**

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
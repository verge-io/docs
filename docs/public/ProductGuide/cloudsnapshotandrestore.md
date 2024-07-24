---
title: Product Guide - Cloud Snapshots and Restores
description: Explanation of how cloud snapshots (which backup an entire system) and restores work.  Specific instructions for setting schedule, running a manual snap, and restoring an entire system or component of a system from a cloud snapshot
published: true
date: 2023-06-27T14:29:44.020Z
tags: 
editor: markdown
dateCreated: 2023-04-03T18:43:32.314Z
---

# Cloud Snapshots and Restores

Cloud Snapshots contain a backup of everything in a system, including all tenants, VMs, NAS volumes, networks, and settings. A cloud snapshot can be used to restore an entire system. Additionally, the following can be imported and restored from a cloud snapshot:

-   Individual tenants
-   Individual NAS volumes
-   Individual VMs\*

> \*VM snapshots contained within a cloud snapshot are crash-consistent. Individual VM snapshots allow a quiesce option (guest agent required). See [**VM Snapshots and Restores**](/public/ProductGuide/VMsnapshotsandrestores) for VM-level snapshot instructions. {.is-info}

<br>
<br>

## Automated Cloud Snapshots

By default cloud snapshots run according to the included **Cloud Snapshots**  profile. The cloud snapshot schedule can be changed by modifying this default profile or assigning a different profile.
<br>

### Assigning a Different Schedule to be Used for Automated Cloud Snapshots

1.  From the main dashboard, Click **System** on the left menu.
2.  Click **Cloud Snapshots** on the left menu.
3.  Click **Select Snapshot Profile** on the left menu.
4.  **Select the desired snapshot profile** from the dropdown list. (For instructions regarding modifying or adding new snapshot profiles, see: [**Snapshot Profiles (Snapshot Scheduling)**](/public/ProductGuide/snapshot-profiles).
5.  Click **Submit** at the bottom of the page.

<br>
<br>


## Manual Cloud Snapshots

A manual snapshot can be taken at any time.

### Take a Manual Snapshot of Entire Cloud

1.  From the main dashboard, Click **System** from the left menu.
2.  Select **Cloud Snapshots** from the left menu.
3.  Select **New** from the left menu.
4.  Enter a ***Name*** (required) for the snapshot.
5.  Enter a ***Description*** (optional).
6.  In the ***Expires*** field, Select/Enter a date and time for expiration.
7.  Click **Submit** at the bottom of the page.

> In the Expiration Type field, "Never Expire" can be selected, however,  it is important to consider vSAN space utilization. Initially source and snapshot are the same and thus there is no impact on storage; but, as source data diverges more from the snapshot data, there is less deduplication between the two and thus more vSAN usage. It is typically not recommended to use the Never Expire option unless necessary.{.is-warning}


8.  The ***Private*** checkbox is selected by default; this option can be deselected to allow tenants access to their own data within this snapshot.
9.  Click **Submit** at the bottom of the page.

<br>
<br>


## Restores from a Cloud Snapshot

<br>
<br>


### Access Cloud Snapshots from Your Provider/Host
<br>

> The following directions are applicable to systems that are tenants themselves. If provider has allowed it, a tenant can access a snapshot of their own cloud from the provider's cloud snapshots. Once requested from the provider, the snapshot is then available to use for restoring individual VMs or entire cloud.1.  From the main dashboard, Select **System** from the left menu. {.is-info}


1.  From the main dashboard, Select **System** from the left menu.
2.  Select **Cloud Snapshots** from the left menu.
3.  A listing of available snapshots is displayed; those displayed with a type of ***Provider*** are snapshots taken by the host. **Click to select the desired provider snapshots** (selected snapshots will show a checkmark).
4.  Click **Request From Provider** on the left menu.
5.  A Confirmation dialog appears. Click **Yes** to continue pulling down the selected snapshots.
6.  After the process is confirmed, transferring a snapshot down from the host can take 15 or more seconds. Once transferred the snapshot will now display with a type of ***Local*** with a green indicator; at this point it can be used for cloud, tenant, VM and volume restores from cloud snapshots as described below.


    ![snapshotlocal.png](/public/userguide-sshots/snapshotlocal.png)
    
    <br>
    <br>
    
    
 >  After a snapshot is requested from provider, and displays as type=Local, the snapshot can be edited to modify description and expiration. When changing expiration to a longer period it is important to consider effects on storage; long-term snapshots can substantially increase storage usage as data divergence between snapshot and live data increases over time.{.is-warning}

<br>
<br>




### Restore Entire Cloud from Snapshot

> **Restoring an entire cloud reverts everything within the system, including all VMs, tenants, NAS data, and settings.** {.is-warning}

>  Restoring entire cloud requires rebooting of all nodes; rebooting nodes can be done without system outages provided there are adequate system resources. {.is-info}

1.  From the main dashboard, select **System** from the left menu.
2.  Select **Cloud Snapshots** from the left menu.
3.  Click to **select the desired snapshot** From the list.
4.  Select **Restore** from the left menu.
5.  A Warning message will appear to caution that this will overwrite the entire system.
    -   By default, the option is selected to **take a snapshot** of the entire cloud before this restore. This allows for later reverting the cloud back to the state right before the restore operation, if needed.
    -   By default, the option to **Reboot all nodes after the restore** is enabled. This will let the system handle the node reboots.
    
    
---
     Reboot  of all nodes is necessary to complete the cloud restore. 
---


6.  Click the **Proceed** button to continue/ or **Cancel** to abort.
7.  Another confirmation message will appear. To continue with the cloud restore, click the **Proceed** button or simply leave alone as <span style="background:yellow">**the restore operation will continue in 60 seconds unless cancelled.**</span> **To Cancel the operation, the Cancel button must be clicked within 60 seconds; otherwise, the restore operation will continue**.


<br>
<br>


### Partial Restores From a Cloud Snapshot

-   See [**VM Snapshots and Restores**](/public/ProductGuide/VMsnapshotsandrestores) for instructions on restoring an individual VM from a cloud snapshot.
-   See [**Tenant Restores**](/public/ProductGuide/tenantrestores) for instructions on restoring an individual tenant from a cloud snapshot.
-   See [**Volume Snapshots and Restores**](/public/ProductGuide/volumesnapsandrestores) for instructions on restoring an individual tenant from a cloud snapshot.

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
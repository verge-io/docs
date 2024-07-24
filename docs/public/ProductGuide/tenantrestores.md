---
title: Product Guide - Tenant Restores
description: Provides instructions for restoring an individual tenant from cloud snapshots
published: true
date: 2023-06-27T14:30:00.877Z
tags: 
editor: markdown
dateCreated: 2023-04-05T19:47:26.842Z
---

# Tenant Restores

Individual tenant restores can be obtained from cloud snapshots. Each tenant can also schedule/perform cloud snapshots of their own individual environment and restore directly from those snapshots with no intervention necessary from their VergeIO povider (Parent).

<br>

A provider can restore a tenant from cloud snapshot **\-OR-** can expose a cloud snapshot listing to a tenant allowing the tenant to perform a restore of their system from their own UI. (Enable ***Expose Cloud Snapshots*** to allow a tenant to view/access to snapshots.)

<br>
<br>


## Restore an Existing Tenant from Snapshot

> A tenant Restore will overwrite everything within the existing tenant!{.is-warning}

1.  From the **Main Dashboard**, click **Tenants** on the left menu.
2.  Click **Tenants** again on the left menu.
3.  **Double-click the desired tenant** from the list.
4.  If the tenant is online, it will need to be powered down before it can be restored from snapshot. Click **Power Off** on the left menu.
5.  Wait for the ***Tenant Status*** to indicate *Offline*.
6.  Click **Snapshots** on the left menu.
7.  Click to **Select the desired snapshot** within the list.
8.  Click **Restore** on the left menu.
9.  A Warning message will appear to caution that this will overwrite the entire existing tenant. Click the **Proceed** button to continue/ **Cancel** to abort.

<br>
<br>


## Restore a Deleted Tenant from Snapshot

1.  From the **Main Dashboard**, click **System**on the left menu.
2.  Click **Cloud Snapshots** on the left menu.
3.  Click to **Select the desired snapshot** within the list. (Tenants that existed within the selected snapshot appear in the listing. A tenant that does not appear in the list was deleted prior to this time; check a previous snapshot.)
4.  Click **View Tenants** on the left menu.
5.  Click to **select the desired tenant** within the list.
6.  Click **Recover** on the left menu.
7.  ***Tenant Name*** will default to the original name but can be changed for the restore, if desired.
8.  Click **Submit**
The dashboard for the recovered tenant appears. When the status changes from "Provisioning" to **"Offline"** the **tenant can be powered on**.
<br>
<br>


## Provide a Tenant with a Local Snapshot (Extracted from Cloud Snapshot)

1.  From the **Main Dashboard**, click **Tenants** on the left menu.
2.  Click **Tenants** again on the left menu.
3.  **Double-click the desired tenant** in the tenant listing.
4.  Click **Snapshots** on the left menu.
5.  Click to **select the desired cloud snapshot** in the list.
6.  Click **Convert** on the left menu.
7.  A dialog appears where ***Name***, ***Description***, ***Expiration*** can be modified, if desired. Click **Submit** to finish the convert (extraction) process.
The snapshot will now appear with type "Tenant Snapshot" on the provider's system. The tenant will see the converted snapshot in their own cloud snapshots listing (Home -> System -> Cloud Snapshots) with type "Local" and it will be readily accessible for the tenant to use for restores.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }
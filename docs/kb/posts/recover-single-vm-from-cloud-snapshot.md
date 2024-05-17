---
title: Recovering a Single VM from a Remote Cloud Snapshot
slug: recovering-a-single-vm-from-a-remote-cloud-snapshot
description: 
published: true
date: 2023-01-24T19:26:35.798Z
tags: vm, snapshot, cloud, recover, single
categories:
  - VM
  - Troubleshooting
  - Snapshot
  - Backup
editor: markdown
dateCreated: 2022-09-07T18:26:22.587Z
---

## How To Efficiently Recover a Single VM from a Remote Cloud Snapshot

This is easily achieved for systems that are successfully configured to send a cloud snapshot to a remote destination tenant, and that have the Sync-back configured properly. 
> **NOTE:** For more information on configuring Sync-back, refer to the inline help Category titled 'Site Sync' under the section labeled 'Syncing Back'.
{.is-info}

### Recover a copy of the VM on the Backup Side
1. On the destination side (where the snapshots are sent) review all of the received remote snapshots and locate the desired snapshot that closest matches the date/time. This is accomplished from the Main Dashboard>System>Cloud Snapshots.

1. Once the snapshot is located, Select (check) the Cloud Snapshot in the list of available snapshots, and on the left navigation menu, select **View VMs**
1. Wait while the list of available VMs loads. This can take a few minutes.
1. Once the list of available virtual machines contained within the cloud snapshot loads, select (check) the desired VM to recover in the list and then select **Recover** on the left navigation menu. 
1. The Recover VM Snapshot option appears. It is recommended to rename the VM to the date the snapshot is from.  For example, *Domain Controller recovered on 09012022*.
1. Wait while the VM recovers.
<br>

### Create a New Cloud snapshot on the Backup Side
1. On the destination side (where snapshots are sent) create a new cloud snapshot that will contain the newly recovered VM from the steps above.  This is accomplished from the Main Dashboard >System >Cloud Snapshots.
1. On the Cloud Snapshots page, select **New** on the left navigation menu.
1. The New Cloud Snapshot creation page will load, Name the snapshot. It is recommended to name it something that is easily referenced in future steps.  For example, *'Recoveryon09012022'*
1. Set the expiration date to something logical. It should not exist forever, but it should be set far enough into the future for the transfer back to the original system to complete.
1. After setting the name and expiration, select **Submit** to create the snapshot.
<br>

### Request a Sync-Back on the Original/Source Side
1. On the origin (sending) side navigate to the configured outgoing site sync.  This is accomplished from The Main Dashboard >Backup/DR >Outgoing Syncs and then double-clicking into the configured outgoing sync.
1. From the outgoing sync dashboard, click on Refresh Remote Snaps on the left navigation menu.  This will query the remote side for any new snapshots and list them.  It should find the snapshot created in the steps above.
1. Once the newly created snapshot is detected, it will be listed under the Remote Snapshots section of the page.  Find the snapshot and click on the Request to Download icon to the far right of the listed snapshot.
![request-to-download.png](/public/request-to-download.png)

1. The Request Cloud Snapshot menu will load. Set a reasonable expiration date for how long the recovered snapshot will be retained on this system and click **Submit**.
1. The system will load the Sync-Back / Incoming Sync.  The length of time it will take to transfer the snapshot back can vary greatly depending on several factors, including the bandwidth speed, and the size of the data to transfer.
1. Wait while the synchronization completes.  When it is completed, under the Log section, a new entry will appear. 
> *Example:*
> **Sync for 'Morning_20220901' complete (4m 17s) checked [78.1GB] scanned [1.76TB] sent [5.16GB] sent net [2.16GB] dirs [210] files [641] updated [31]**
{.is-success}

7. At this point, the snapshot has been successfully transferred back to the original location, and administrators can perform standard recovery tasks as necessary on the VM contained within the snapshot.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
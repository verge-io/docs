---
title: Recovering a Single VM from a Remote Cloud Snapshot
slug: recovering-a-single-vm-from-a-remote-cloud-snapshot
description: 
draft: false
date: 2023-01-24T19:26:35.798Z
tags:
  - vm
  - snapshot
  - cloud
  - recover
  - single
categories:
  - VM
  - Troubleshooting
  - Snapshot
  - Backup
editor: markdown
dateCreated: 2022-09-07T18:26:22.587Z
---

# How To Efficiently Recover a Single VM from a Remote Cloud Snapshot

This is easily achieved for systems that are successfully configured to send a cloud snapshot to a remote destination tenant and have the Sync-back configured properly.

!!! info "Note"
    For more information on configuring Sync-back, refer to the inline help Category titled 'Site Sync' under the section labeled 'Syncing Back'.

## Recover a Copy of the VM on the Backup Side

1. On the destination side (where the snapshots are sent), review all of the received remote snapshots and locate the desired snapshot that closely matches the date/time. This is accomplished from the **System > System Snapshots**.
2. Once the snapshot is located, select (check) the Cloud Snapshot in the list of available snapshots, and on the left navigation menu, select **View VMs**.
3. Wait while the list of available VMs loads. This can take a few minutes.
4. Once the list of virtual machines contained within the cloud snapshot loads, select (check) the desired VM to recover and then select **Recover** on the left navigation menu.
5. The **Recover VM Snapshot** option appears. It is recommended to rename the VM to reflect the date the snapshot was taken. For example, *Domain Controller recovered on 09012022*.
6. Wait while the VM is recovered.

<br>

## Create a New Cloud Snapshot on the Backup Side

1. On the destination side (where snapshots are sent), create a new cloud snapshot that will contain the newly recovered VM from the steps above. This is done from **System > System Snapshots**.
2. On the Cloud Snapshots page, select **New** on the left navigation menu.
3. The New Cloud Snapshot creation page will load. Name the snapshot. It is recommended to name it something that is easily referenced in future steps, such as *Recoveryon09012022*.
4. Set the expiration date to something logical. It should not exist forever but should be far enough into the future to allow time for the transfer back to the original system.
5. After setting the name and expiration, select **Submit** to create the snapshot.

<br>

## Request a Sync-Back on the Original/Source Side

1. On the origin (sending) side, navigate to the configured outgoing site sync. This is done from **Backup/DR > Outgoing Syncs**, and then double-clicking into the configured outgoing sync.
2. From the outgoing sync dashboard, click **Refresh Remote Snaps** on the left navigation menu. This will query the remote side for any new snapshots and list them. It should detect the snapshot created in the steps above.
3. Once the newly created snapshot is detected, it will be listed under the **Remote Snapshots** section. Find the snapshot and click on the **Request to Download** icon to the far right of the listed snapshot.

4. The **Request Cloud Snapshot** menu will load. Set a reasonable expiration date for how long the recovered snapshot will be retained on this system, and click **Submit**.
5. The system will load the Sync-Back / Incoming Sync. The length of time it will take to transfer the snapshot back can vary greatly depending on several factors, including bandwidth speed and the size of the data to transfer.
6. Wait while the synchronization completes. Once finished, a new entry will appear in the log section.

    !!! success "Example"
        Sync for 'Morning_20220901' complete (4m 17s) checked [78.1GB] scanned [1.76TB] sent [5.16GB] sent net [2.16GB] dirs [210] files [641] updated [31]

7. At this point, the snapshot has been successfully transferred back to the original location. Administrators can now perform standard recovery tasks on the VM contained within the snapshot.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

---
title: Product Guide - VM Snapshots and Restores
description: Provides information and instructions on the various ways to snapshot and restore individual VMs
published: true
date: 2023-06-27T14:24:46.358Z
tags: 
editor: markdown
dateCreated: 2023-04-05T19:50:37.174Z
---

# VM Snapshots and Restores

Although cloud snapshots include all VMs and allow for restoring an individual VM, VM-level snapshots allow for customizing schedule and retention rules per individual virtual machine (for example, it may be desirable to capture more frequently or retain snapshots longer for certain VMs). Additionally, VM-level snapshots provide the option for a quiesced snapshot.

<br>
<br>

## Quiesced Snapshots

The quiesce option provides an application-consistent snapshot of a running VM in which the system freezes the filesystem and flushes write buffers; additionally, VSS writers are invoked in order for VSS-aware applications (Windows VMs) to prepare for the snapshot. The Quiesce option can be selected when taking a manual snapshot and can be enabled within the snapshot profile for automated snapshots.

<br>
<br>

## Assign a Snapshot Profile to a VM (for automated scheduled VM-level snapshots)

>  By default, VM-level snapshots are not configured (VM Snapshot Profile setting="--None--"). {.is-success}

1.  From the **VM dashboard**, click **Edit** on the left menu.
2.  In the ***Snapshot profile*** field, select the desired profile from the dropdown list. Instructions for configuring snapshot profiles can be found here: [**Snapshot Profiles (Snapshot Scheduling)**](/public/ProductGuide/snapshot-profiles).
3.  Click **Submit** at the bottom of the page.


<br>
<br>

## Take a Manual Snapshot of a VM

1.  From the **VM dashboard**, select **Snapshots** on the left menu.
2.  Click **Take Snapshot** on the left menu.
3.  Enter a ***Name*** for the snapshot (required).
4.  Enter a ***Description*** (optional).
5.  The ***Quiesce*** option can be selected to freeze disk activity while the snapshot is being taken. This provides application-consistent backups for VMs. ([**VM Guest Agent**](/public/ProductGuide/VMguestagent)) must be installed and registered on VM for quiesced snapshots.
6.  In the ***Expires*** field, select/enter date and time for expiration.

> **Choosing Expiration:** Consider vSAN space when selecting snapshot expirations. Snapshots held for long periods can have a significant effect; initially source and snapshot are the same and thus have no impact on storage utilization; however, as source data diverges more from the snapshot data, there is less deduplication between the two and therefore more vSAN utilization. It is typically not recommended to use the Never Expire option unless necessary. {.is-warning}

7.  Click **Submit** at the bottom of the page.

<br>
<br>

## Restoring a VM from Snapshot

> **To restore an individual VM from a cloud snapshot, it must first be imported** from the cloud snapshot as detailed below. To restore from an individual VM snapshot, skip the import section of instructions and continue to **Restore Overwrite -Or- Restore to a Clone instructions.*** {.is-success}

<br>
<br>

### *Import VM Snapshot from a Cloud Snapshot (to make it available for a VM restore)*

1.  From the **VM dashboard** select **Snapshots** from the left menu.
2.  Click **Cloud Snapshots** on the left menu.
3.  Click to **select desired cloud snapshot**.
4.  Click **Import VM Snapshot** on the left menu.
5.  ***Name, Description, and Expiration fields** will default to the values from the cloud snapshot; if desired, change values for this import of the VM snapshot. Changes made will only apply to the VM snapshot import and will not affect the underlying cloud snapshot.
6.  Click **Submit** to continue.*
7.  (If the process was continued,) a message should appear stating the import process has begun. Click the **Ok** button to acknowledge.
8.  When the imported VM snapshot appears in the list, it can be selected to use for restore.

<br>
<br>

### *Restore a VM Snapshot (to overwrite existing current version of VM).*

1.  ***Power off** the source VM. Use proper guest OS and application shutdown procedures whenever possible.
2.  ***Consider taking a temporary snapshot of the VM right before** restoring over it. This can allow taking the VM back to this point (before the restore), if necessary.
3.  From the **VM Dashboard**, click **Snapshots > Snapshots** on the left menu.
4.  A listing of available snapshots is displayed. Click to **select the desired snapshot**.*
5.  Select **Restore over Source** from the left menu.
6.  A Warning message will appear to caution that this will overwrite the existing Virtual Machine. Click the **Proceed** button to continue/ or **Cancel** to abort.
7.  (If the process was continued,) a message should appear stating the Restore process has begun. Click the **Ok** button to acknowledge the message.

<br>
<br>

### *Restore a VM Snapshot to a Clone*
This option allows for using a snapshot to restore to a new VM instance, rather than overwrite the current VM.


> When initiating VM clones, care should be taken with consideration to running multiple versions of a VM - as conflicts or problems can arise (e.g. same IP address, hostname, Mac Address, or multiple instances of guest applications.) {.is-warning}

1.  From the **VM dashboard**, click **Snapshots > Snapshots** on the left menu.
2.  Click to **select the desired snapshot in the listing**.
3.  Click **Restore To New** from the left menu.
4.  The **VM Name** will default to the name of the snapshot + " restored". Change the name, if desired.
5.  The **Preserve MAC Addresses** option will default to unselected, which means new MAC Address(es) will be auto-generated by the VergeIO system. The option can be enabled to keep the same MAC address(es) on the new VM. Caution should be used when selecting this option, as to avoid duplicate MAC addresses within the same network.
6.  Click the **Submit** button to create the new VM.
<br>

> **Tip:** To avoid issues with running both clone and source VM simultaneously, cloned VM drives can be mounted to a different VM in order to access restored data without powering on the clone: working on a separate VM, add a new drive, select the Clone Disk option, selecting the *.raw file for the restored VM drive.{.is-success}


<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
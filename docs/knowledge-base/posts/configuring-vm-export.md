---
title: Configuring a Volume for Exporting VMs
slug: configuring-a-vm-export-volume
description: How to configure the VergeOS NAS VM Export Volume for backup purposes.
draft: false
date: 2026-01-13T12:42:16.752Z
tags:
  - vm export
  - export
  - backup
  - nas
  - snapshot
categories:
  - Snapshot
  - Backup
  - VM
  - NAS
editor: markdown
dateCreated: 2023-05-25T19:53:15.389Z
---

# How to Configure a Volume for VM Exports


The VergeOS NAS supports a volume type specifically for exporting selected virtual machines (VMs).  The *VM Export volume* provides a controlled way to export selected VMs to a NAS volume that can then be synchronized to a remote storage system (e.g. existing NAS appliance) or shared via CIFS or NFS for access by external backup tools or other applications. 

!!! tip "This export mechanism can be useful for customers who want to synchronize VergeOS VM snapshots to storage hardware they already own, rather than deploying an additional VergeOS system for backup purposes. While VergeOS recommends using its native replication features for the most efficient and fully integrated protection workflow, the VM Export Volume offers flexibility for environments that need to meet compliance requirements or maintain external portability of their VM data."

The following steps describe how to configure and use a NAS-hosted VM export volume.

## 1. Preparing the VMs for Export

1. **Edit each VM** you want to export:
    - Navigate to the VM settings and enable the option for **Allow Export**.

## 2. Setting Up the NAS Service

To host the VM export volume, you will need a NAS service.  Use an existing NAS service or create a new service using the following instructions:

1. Navigate to **NAS > List**.  
!!! note "A listing of current NAS services is displayed. You can select an existing service or continue the following instructions to create a new service." 
2. Click **New**.
3. Provide **Name, Hostname, TimeZone, and Networking** for the NAS service.
6. Click **Submit** to initialize the NAS service.

## 3. Starting the NAS Service

1. Select the NAS service from the list.
2. Click **Power On** to bring the NAS online and prepare it to host the export volume.

## 4. Creating a NAS User

You’ll need to create a user to access the NAS:

1. Navigate to **NAS > List > double-click the NAS Service to be used**.
2. Click **NAS Users > New**.
3. Provide a username and password.
4. Click **Submit** to save the new NAS user.

## 5. Creating a New Volume for VM Export

1. Select **NAS > + New Volume** from the top menu.
2. Configure the volume:  
    * **NAS Service**: select the NAS service from above  
    * **Name**: provide a name for the volume, e.g. "VM-export"  
    * **Filesystem Type**: ***VergeOS VM Export***  
    * **Quiesced**: Typically should be selected to provide application-consistent VM snapshots.  
    * **Max exports to store**: default=3; determines the maximum number of export instances that will be stored at a time  
    * **Enable current folder**: default=enabled. Exports are contained in folders named according to date/time of the export.  With this option enabled, an additional folder named "current" is created to continually contain a branch of the most recent export. This is often helpful to provide an absolute path to retrieve the latest VM snapshots.  
3. Click **Submit**.

!!! tip "After you click Submit, the export volume’s dashboard opens where you can run operations on it.  To access this dashboard later, navigate to **NAS** > **Volumes** in the top menu, then double-click the volume in the list." 

## Running the VM Export (manual start)

1. Under **Export VMs** (mid-page), click the **Start** button to initiate the VM export process.  
2. Confirm by clicking **Yes** at the prompt.


## Accessing the Exported Data

!!! tip "You can quickly view the contents of the export volume using the *Browse* option on the left menu."

To access the exported VM snapshots, set up a **CIFS or NFS share** for the NAS volume:

### Setting up a CIFS Share for the Exported Data

1. **Create a CIFS Share**:    
    * Navigate to **NAS > CIFS Shares > New**.
    * Select the export volume as the target volume.
    * Provide a **Share Name** and assign the NAS user you created in step 4 to access the share.

2. **Access the Share**:  
    * Browse to `\\IPorDNSnameoftheNAS\CIFSShareYouCreated`.
    * Use the NAS user credentials when prompted.
   
!!! note "For Windows Users"
    You may need to edit the Group Policy (GPO) or modify the Windows Registry to connect using the Guest account if Guest mode is enabled.


### Setting up an NFS Share for the Exported Data 

Instructions for creating an NFS share can be found [here](/product-guide/nas/nas-shares#create-an-nfs-share). 

### Synchronizing Exported Data to an External System

Exported VM data can be pushed to an external system using a NAS volume sync.  

1. Create a [Remote Volume](/product-guide/nas/nas-remote-volumes) to mount the external volume to the VergeOS NAS (requires standard NFS or CIFS access)
2. Create a [Volume Sync](/product-guide/nas/volume-syncs) to synchronize data to the Remote Volume.  Volume syncs can be started on-demand manually and can also be scheduled using the Start Profile setting.


## Automating the VM Export

You can schedule regular exports by configuring a task and a schedule trigger.

!!! tip "Available Schedules"
    The following instructions allow you to create a task and assign a schedule.  VergeOS includes multiple pre-installed schedules. Refer to the [Schedules Guide](/product-guide/automation/schedules) for instructions on creating custom schedules.  


1. Navigate to the VM Export Volume: **NAS** > **Volumes** > locate and double-click the export volume.
2. In the **Export VMs** section, click the **Tasks** button.
3. Click **New** on the left menu to create a new export task. 
3. Configure the new task fields: 
  **Name**: provide a descriptive name, e.g. *start-vm-export*.
  **Object Type**: ***VM Export***
  **Object**: select the Export Volume created above
  **Action**: **Start Export**
4. Click **Submit** to save the new task.
5. Click **Schedule Triggers** > **New** on the left menu.  
6. Select desired **schedule from the dropdown list** and click **Submit**


By completing these steps, you will have a VM export volume configured to generate exportable snapshots of selected VMs and make them available to third‑party backup solutions or external storage systems.

For most environments, VergeOS’s built‑in snapshot and replication features remain the most efficient and integrated method for protecting and synchronizing VM data between VergeOS systems. The VM Export volume workflow is intended for scenarios where compliance policies, existing storage investments, or portability requirements call for VM data to be maintained outside the primary VergeOS infrastructure. This provides organizations with flexibility and assurance that their VM data can be integrated into broader backup strategies or external storage ecosystems when needed.

---

!!! note "Document Information"
    - Last Updated: 2026-01-15
    - vergeOS Version: 26.0.2.2



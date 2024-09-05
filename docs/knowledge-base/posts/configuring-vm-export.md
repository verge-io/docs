---
title: Configuring a VM Export Volume
slug: configuring-a-vm-export-volume
description: How to configure the VergeOS NAS VM Export Volume for backup purposes.
published: true
date: 2024-02-27T19:42:16.752Z
tags: vm export, export, backup, nas, snapshot
categories:
  - Snapshot
  - Backup
  - VM
  - NAS
editor: markdown
dateCreated: 2023-05-25T19:53:15.389Z
---

# How to Configure a VM Export Volume

In VergeOS, you can create a volume specifically for exporting selected virtual machines (VMs). This export volume can then be used with third-party backup software to back up the VMs. The volume contains VM snapshots from the most recent export.

## Steps to Configure a VM Export Volume

### 1. Preparing the VMs for Export

1. **Edit the VMs** you want to export:
    - Navigate to the VM settings and enable the option for **Allow Export**. 

### 2. Setting Up the NAS Service

To host the VM export volume, you will need to create and configure a NAS service:

1. Navigate to **NAS > NAS Services**.
2. Click **New**.
3. Provide **Name, Hostname, TimeZone, and Networking** for the NAS service.
6. Click **Submit** to initialize the NAS service.

### 3. Starting the NAS Service

Once the NAS service is created:

1. Select the NAS service from the list.
2. Click **Power On** to bring the NAS online and prepare it to host the export volume.

### 4. Creating a NAS User

You’ll need to create a user to access the NAS:

1. Navigate to **NAS > NAS Services > The NAS Service you created**.
2. Click **NAS Users > New**.
3. Provide a username and password.

### 5. Creating a New Volume for VM Export

1. Navigate to **NAS > Volumes > New**
3. Provide a **Name** for the volume and choose **VergeOS VM Export** as the filesystem type.
4. Select the appropriate NAS service to host the export volume.
5. Make sure **Quiesced** is checked.
6. Adjust the number of exports to store.
7. Click **Submit**.

### 6. Starting the VM Export

1. Under **Export VMs**, select **Start** to initiate the VM export process.
2. Confirm by clicking **Yes** at the prompt.

## Setting up a CIFS Share for the Exported Data

To access the exported VM snapshots, set up a CIFS share on the NAS volume:

1. **Create a CIFS Share**:
   - Navigate to **NAS > CIFS Shares > New**.
   - Select the export volume you created earlier as the target volume.
   - Provide a **Share Name** and assign the NAS user you created in step 4 to access the share.

2. **Access the Share**:
   - Browse to `\\IPorDNSnameoftheNAS\CIFSShareYouCreated`.
   - Use the NAS user credentials when prompted.
   
   !!! note "For Windows Users"
   You may need to edit the Group Policy (GPO) or modify the Windows Registry to connect using the Guest account if Guest mode is enabled.

## Automating the VM Export

You can schedule regular exports by setting up an automated event:

1. Navigate to the **VM Export Volume**.
2. Select **Events > New**.
3. Select ***Scheduled** as the Task Triggered by.
4. Provide a **Name** for the task.
5. Select **VM Exports** for section.
6. Ensure **VM Exports** as the volume you created previously.
7. Configure the event to trigger the export at your desired intervals.
8. Click **Submit**

By following these steps, you'll have a properly configured VM export volume that can be used with third-party backup solutions, along with automated export scheduling.

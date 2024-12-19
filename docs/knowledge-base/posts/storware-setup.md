---
title: Setting Up Storware on VergeOS
slug: setup-storware-vergeos
description: Guide to setting up Storware for virtual machine protection on VergeOS
draft: false
date: 2024-11-07T12:00:00.000Z
tags:
  - backup
  - Storware
  - virtual machines
  - NFS
categories:
  - Storage
  - Backup
editor: markdown
dateCreated: 2024-11-07T12:00:00.000Z
---

# Setting Up Storware on VergeOS

This guide outlines the steps for configuring Storware on VergeOS to protect your virtual machines.

For more comprehensive information on Storware's capabilities and additional backup configuration options, visit the [Storware Backup and Recovery Documentation](https://storware.gitbook.io/backup-and-recovery).


## Prerequisites

- VergeOS on version 4.13 or higher.
- Access to a Storware Backup and Recovery instance on version 7 or higher.
- Credentials for an account with the appropriate permissions to configure both VergeOS and Storware.

## Setup a dedicated Verge NAS Service for Storware

1. **Deploy the NAS Service:**
   
   - Access the VergeOS UI and deploy a new NAS service. [Add a NAS Service](/product-guide/nas/nas-service).
  

2. **Configure NFS Settings:**
   
   - **Before powering on** the NAS service, click on **Edit NFS Settings**.
   - Enable **NFSv4** by selecting the checkbox for this option.
   - Click **Submit** to save the changes.
   - Power on the NAS service.

!!! tip "Depending on the size of your environment you may want to increase the amount of CPU and RAM for the NAS Service. Storware recomends 8 cores and 12 GB of RAM as a good starting point"
---

## Adding Your VergeOS System to Storware

1. **Log in to Storware**:
   
   - Access the Storware Backup and Recovery management console.

2. **Add VergeOS as a Virtual Environment**:
   
   - Navigate to **Virtual Environments** > **Virtualization Providers** and click **Create**.
   - Select **VergeOS** as the Virtualization Provider.

3. **Configure the Connection Details**:

   - **General Tab**:

     - **URL**: Enter the VergeOS URL in the format `https://<VERGE_IP>`.
     - **Username**: Provide the username for VergeOS.
     - **Password**: Enter the password for the specified user.
   - **Verge Settings Tab**:
     - Enter the **name of the NAS service** created in the previous step.

4. **Test the Connection**:

   - Select the newly added Verge system from the list
   - Click **Test Connectivity** to verify that Storware can successfully communicate with the VergeOS environment. 


## Important Notes

!!! tip "NFS Version Selection"
    Enabling NFSv4 on VergeOS ensures compatibility with modern backup solutions like Storware, providing improved security and performance.

!!! info "Snapshot Optimization"
    Using Storware's snapshot management in conjunction with VergeOS’s built-in vSAN capabilities allows for efficient incremental backups, reducing the time and storage required for VM protection.



---

## Feedback

!!! question "Need Help?"
    If you have any questions or encounter issues while setting up Storware on VergeOS, please reach out to our support team for assistance.

---

!!! note "Document Information"
     - Last Updated: 2024-11-07
     - VergeOS Version: 4.13

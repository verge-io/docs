---
title: Sharing a VM into a Tenant
slug: sharing-a-vm-into-a-tenant
description: 
draft: false
date: 2023-01-24T19:28:10.839Z
tags:
  - vm
  - tenant
  - share
categories:
  - Tenant
  - VM
editor: markdown
dateCreated: 2022-09-01T16:10:26.690Z
---

# How to Share a VM into a Tenant

VergeOS provides an easy way to share a virtual machine (VM) image from a parent environment into a tenant located beneath the current environment. Follow these steps to accomplish the task:

## Steps to Share a VM

1. **Navigate to the VM Dashboard**:
   - Go to the VM dashboard of the VM you want to move into a tenant.

2. **Gracefully Power Down the VM**:
   - It is best practice to gracefully power down the VM using the guest operating system's best practices before moving it.

3. **Take a Snapshot**:
   - In the VM dashboard, expand **Snapshots** in the left navigation menu to access the snapshot commands.
   - Click **Take Snapshot** to launch the **Machine Snapshot** creation screen.
   
4. **Complete the Snapshot Creation**:
   - At the Machine Snapshot creation screen, fill in the required fields:
     - **Machine**: The virtual machine you are moving.
     - **Name**: Provide a unique name for the snapshot.
     - **Expiration Date**: Set the date/time when the snapshot will automatically be deleted.
   - Click **Submit** to create the snapshot.

5. **Share the VM Snapshot**:
   - After clicking **Submit**, you will be taken to the dashboard of the newly created snapshot.
   - From this view, click on **Share VM** in the left navigation menu to launch the **Shared Objects** creation screen.

6. **Create the Shared Object**:
   - At the **New Shared Objects** creation screen, fill in the required fields:
     - **Name**: Name the snapshot of the VM something unique.
     - **Type**: Select **Virtual Machine**.
     - **Snapshot**: This should match the name provided during the snapshot creation.
     - **Recipient**: Select the tenant where you want to share the VM.
   - Click **Submit** to create the shared object.

7. **Access the Tenant Environment**:
   - Using a web browser, navigate to the tenant environment where the snapshot object was shared.
   - Log in with the proper authentication credentials.

8. **Create a New Virtual Machine in the Tenant**:
   - In the tenant environment, navigate to **Machines** > **Virtual Machines**, and click **New** to begin creating a new virtual machine.

9. **Import from Shared Objects**:
   - At the **New Virtual Machine** creation screen, under **Select Type**, choose **-- Import from Shared Objects --**.
   - In the **Selections Available** section, select the shared object created earlier, then click **Next**.

10. **Complete the Virtual Machine Settings**:
    - On the **Virtual Machine Settings** screen, complete the required fields:
      - **Shared Objects**: Select the shared object created earlier.
    - Click **Submit** to create the new virtual machine in the tenant.

---
---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

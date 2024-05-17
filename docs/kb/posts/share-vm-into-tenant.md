---
title: Sharing a VM into a Tenant
slug: sharing-a-vm-into-a-tenant
description: 
published: true
date: 2023-01-24T19:28:10.839Z
tags: vm, tenant, share
categories:
  - Tenant
  - VM
editor: markdown
dateCreated: 2022-09-01T16:10:26.690Z
---

## How to share a VM into a Tenant

The VergeIO platform provides an easy way to share a virtual machine (VM) image from a parent environment into a Tenant located beneath the current environment. To accomplish this task, perform the following steps:
1. Navigate to the VM dashboard of the VM that you wish to move to a Tenant.
1. Before moving a VM, it is best practice to gracefully power down the VM following the best practices of the guest operating system.
1. At the VM dashboard, expand Snapshots in the left navigation menu to see snapshot commands available.
1. Click Take Snapshot. This will launch the Machine Snapshot creation screen.
1. At the Machine Snapshot creation screen, complete the required fields:
   1. Machine: The virtual machine that you are intending to move.
   1. Name: Provide a unique name for the snapshot.
   1. Expiration date and Expires details: Set the date/time before the snapshot will automatically be deleted from the platform.
   1. Click Submit to create the snapshot.
1. After clicking Submit, the system will move you to the dashboard of the newly created snapshot.  From this view, click on Share VM in the left navigation menu. This will launch the Shared Objects creation screen.
1. At the New Shared Objects creation screen, complete the required fields:
   1. Name: Name the snapshot of the VM something unique.
   1. Type: Virtual Machine
   1. Snapshot: This should match the name provided in step #5 above.
   1. Recipient: Select the Tenant where you wish to share a copy of the VM.
   1. Click Submit to create the shared object.
1. After the shared object has been created, using a web browser, navigate to the Tenant environment where the snapshot object was just shared and log in with proper authentication credentials.
1. In the Tenant, navigate to Machines, then to Virtual Machines, and click New to begin creating a new Virtual Machine.
1. At the New Virtual Machine creation screen, under Select Type, select '-- Import from Shared Objects --'.
1. Under the Selections Available section, the newly created shared object from step #7 will be listed. Select that object and click Next to continue with the creation of a new Virtual Machine.
1. On the Virtual Machine Settings screen, complete the required fields:
   1. Shared Objects: the shared object created in step #7
   1. Click Submit to create the new Virtual Machine.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
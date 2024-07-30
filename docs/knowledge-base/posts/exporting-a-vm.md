---
title: Exporting a Virtual Machine
slug: exporting-a-virtual-machine
description: 
published: true
date: 2023-01-24T19:22:21.109Z
tags: vm, export
categories:
  - Backup
  - VM
  - Snapshot
editor: markdown
dateCreated: 2022-07-11T18:16:54.516Z
---

### Exporting VMs from VergeOS

1. Login into the VergeOS platform and navigate to the **dashboard of the virtual machine** that you'd like to export.
1. On the left, click on **Drives** to open a **list view** of the virtual disk drives attached to **this VM**.
1. Select **a drive** and choose '**Download**' on the left.  This will download the drive as a **.raw** format, which is supported by most current hypervisors.
1. The system will begin downloading the disk image using the **default settings of your web browser**.
1. Once the drive has been downloaded, **consult with documentation for the new hypervisor** on best practices for uploading/importing/converting .raw disk image types.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
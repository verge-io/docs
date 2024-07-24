---
title: Resizing a Virtual Disk Drive
slug: resizing-a-virtual-disk-drive
description: 
published: true
date: 2023-01-24T19:27:42.060Z
tags: resize, disk, inside vm, inside virtual machine
categories:
  - VM
editor: markdown
dateCreated: 2022-07-11T17:45:53.753Z
---

## How to Resize a Disk Drive Inside a Virtual Machine


Information about resizing a particular VM disk drive can be found in the inline help within the category titled, Virtual Machines, under the section labeled **'Modify a VM Drive'**.

**Some items of note:**
> **NOTE:** If the VM configuration is set to allow hot-plugging, the disk interface is set to 'Virtio-SCSI' and the guest Operating System (OS) supports it, drive size usually can be added without power cycling the VM.
{.is-info}


> **WARNING:** Drives cannot be reduced in size. (Inside the guest OS, Partitions may be able to be resized but not drives.)
> {.is-danger}

> **WARNING:** Modifications to drive size will most likely require corresponding modifications within the guest Operating System to use the newly created space.
> {.is-danger}

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
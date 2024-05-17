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

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
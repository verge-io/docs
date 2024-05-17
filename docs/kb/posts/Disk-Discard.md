---
title: VM Disk Discard
slug: vm-disk-discard
description: 
published: true
date: 2023-09-12T16:53:09.094Z
tags: disk management, trim, discard, storage, vsan, disk performance, disk
editor: markdown
dateCreated: 2023-03-30T13:36:19.727Z
---

## Virtual Machine Disk Discard	


The Discard option on a VM Disk tells the system to TRIM/DISCARD unused blocks. When Creating or Editing a VM Disk, you have the option to enable or disable Discard. Disk Discard is enabled by default and should remain enabled to allow the vsan to discard unused blocks. If disabled, deleting files on the disk will not free up unused space and the drive can use more storage than it actually needs.

![2023-03-30_10_43_52-diskdiscardwindow.png](/public/2023-03-30_10_43_52-diskdiscardwindow.png)

> The only time you should disable Discard is for performance reasons. Please consult with VergeIO Support before disabling. 
{.is-warning}


<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
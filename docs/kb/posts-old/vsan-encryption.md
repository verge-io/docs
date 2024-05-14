---
title: vSAN Encryption Information
description: 
published: true
date: 2023-01-24T19:18:29.667Z
tags: encryption
editor: markdown
dateCreated: 2022-08-25T17:23:10.582Z
---

You can confirm that the vSAN has encryption enabled by navigating to **Nodes> Node 1> Drives** and then **double-clicking on the first drive** in the list. There is a checkbox for encryption.  If it is encrypted, it will be checked.

![encryption.png](/public/encryption.png)

- Encryption for the vSAN is configured **during the initial installation only**.

- System startup on an encrypted system can be configured 2 different ways.

   1.  The most common method is by having encryption keys written to a USB drive during the initial installation. In this scenario, these drives are typically plugged in to the first two nodes of an encrypted system to boot normally. All other nodes do not require them, as Node 1 and Node 2 are the controller nodes. The USB drive does not require much storage at all, less than 1GB.
   2.  If the controller nodes do not have USB encryption keys connected, the system will prompt an operator to type the proper encryption password to complete the power up off the system.

- Default encryption is set for all snapshot synchronizations through a site-sync.  Information about encrypting a Site Synchronization can be found in the inline help within the category titled, Site Syncs, under the section labeled 'Creating Outgoing Sync.'

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
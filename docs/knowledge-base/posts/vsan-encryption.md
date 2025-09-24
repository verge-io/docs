---
title: vSAN Encryption Information
slug: vsan-encryption-information
description: 
draft: false
date: 2023-01-24T19:18:29.667Z
tags:
  - encryption
  - vsan
categories:
  - vSAN
editor: markdown
dateCreated: 2022-08-25T17:23:10.582Z
---

# vSAN Encryption Information

You can confirm that the vSAN has encryption enabled by navigating to **Nodes> Node 1> Drives** and then **double-clicking on the first drive** in the list.  The **Encrypted** checkbox is checked if the Vsan is encrypted.

- Encryption for the vSAN is configured **during the initial installation only**.

- Data is encrypted using AES256

- System startup on an encrypted system can be configured two different ways:

   1.  The most common method is by having encryption keys written to a USB drive during the initial installation. In this scenario, these drives are typically plugged into the first two nodes of an encrypted system to boot normally. All other nodes do not require them, as Node 1 and Node 2 are the controller nodes. The USB drive does not require much storage at all, less than 1GB.
   2.  If the controller nodes do not have USB encryption keys connected, the system will prompt an operator to type the proper encryption password to complete the power-up process.

- Default encryption is set for all snapshot synchronizations through a site-sync.
    
!!! info "Information about encrypting a Site Synchronization can be found in the [Product Guide](/product-guide/backup-dr/sync-configuration)"
---

!!! note "Document Information"
    - Last Updated: 2024-09-03
    - VergeOS Version: 4.12.6

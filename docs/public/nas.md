---
title: VeregOS NAS Service
description: Integrated NAS
published: true
date: 2023-01-27T21:49:53.416Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:57:49.772Z
---

## NAS Overview
The NAS service is a dedicated virtual machine that presents itself as a service providing users the ability the create and manage file based storage without the need for using physical or virtual appliances. Each NAS service is complete with its own dashboard and is completely managed from the user interface. Using the integrated NAS service takes advantage of the VeregOS snapshot engine and deduplication algorithm to get the most of usable storage space.

## NAS Features
- Integrated user interface for volume and share management
- Granular control over volume snapshots catering to specific retention requirements
- NFS and CIFS share compatibility
- Remote volume mounting
> Remote volumes provide the ability to mount shares originating outside of the NAS which in turn allows data to sync into the environment for migration or backup purposes
{.is-info}
- Data migration capabilities using rsync or the proprietary protocol to VeregOS known as ysync 
- Active Directory integration acting as a member or a primary or secondary domain controller
- Takes advantage the VeregOS snapshot engine for instant recovery or cloning of a volume
- Takes advantage of the VeregOS deduplication algorithm
- Volume structure browsing directly from the user interface

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

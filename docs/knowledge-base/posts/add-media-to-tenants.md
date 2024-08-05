---
title: Sharing Media Images to Tenants
slug: sharing-media-images-to-tenants
description: 
published: true
date: 2023-01-24T19:20:42.724Z
tags: media, tenant, media images, tenants
categories:
  - Tenant
  - Media Images
editor: markdown
dateCreated: 2022-08-01T20:59:20.590Z
---

## Providing Files to a Tenant

A Service Provider can provide files (that are already uploaded to the vSAN) to a Tenant.

### To Provide a File to a Tenant:
1. From the Main Dashboard, select Tenants on the left menu.
   - This takes you to the generic Tenants Dashboard.
1. Select Tenants to view a listing of all your Tenants.
1. Double click on the desired Tenant.
1. Select **Add File** in the left menu.
1. Select File Type from the dropdown list .
!!! note "Select **ALL** to get a listing of all files available, regardless of type. This will include .raw files (VM disk images) from the parent VDC."

6. Select specific File from the dropdown list.
1. Submit the changes (bottom of page).
   - The process is near-instant as it is done with a branch command. The file is now available to the Tenant within their own Media Images section.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
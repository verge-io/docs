---
title: Product Guide - Providing Files to a Tenant
description: Instructions for a host to make files in their own vSAN available to a tenant
published: true
date: 2023-06-27T13:58:43.450Z
tags: 
editor: markdown
dateCreated: 2023-04-07T14:37:41.501Z
---

# Providing Files to a Tenant

A Service Provider can provide files (that are already uploaded to the vSAN) to a tenant. For help in the initial upload of files to the Parent vSAN, see: [**Media Images**](/product-guide/uploadingtovSAN)

<br>
<br>

## To Provide a File to a Tenant:

1.  From the Main Dashboard, Click **Tenants** on the left menu.
2.  Click **Tenants** to view a listing of all tenants on this system.
3.  **Double-click** on the desired **tenant**.
4.  Click **Add File** on the left menu.
5.  Select ***File Type*** from the dropdown list (HINT: you can select --ALL-- to get a listing of all files available, regardless of type; this will include \*.raw files(VM disk images) from the parent VDC.)
6.  **Select a file** from the dropdown list.
7.  Click **Submit** (bottom of page).

The process is near-instant as it is done with a branch command. The file is now available to the tenant within their own [**Media Images**](/product-guide/uploadingtovSAN)  section.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
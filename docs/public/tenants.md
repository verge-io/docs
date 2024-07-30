---
title: Tenancy
description: Nested Multi Tenancy
published: true
date: 2023-01-27T21:50:12.405Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:02:07.410Z
---

## Nested Multi Tenancy

Tenancy in a VeregOS environment is the process of creating an entire virtual data center (VDC) that has been allocated portions of storage and compute resources from the overall hardware footprint.

## Secure Enclaves

VeregOS uniquely provides secure, nested, multi-tenancy, which is done by provisioning each tenant it's own virtual node(s) of compute resources provisioned from the level above it. Service providers can provision portions of available resources as independant instances of VeregOS virtual data centers for customers.

## Nested Multi Tenancy Features

- Every tenant is a dedicated instance of the complete VeregOS environment excluding visibility into the hardware infrastructure
- Ability to host multiple customers on the same hardware resources, while still maintaining complete isolation
- Every tenant can provision tenants beneath it, for further isolation of customers
- Individual network management per tenant
- Unique user management system
- Unique [auth source](/docs/public/auth) configuration
- Unique [SSL certificate](/docs/public/certificates) configuration
- Unique user interface per instance
- Custom user interface (UI) branding
- Leveraging [recipes](/docs/public/recipes), you can deploy a completely customized data center in minutes
- No 'Noisy Neighbor' problem
- Add or remove, compute resources available to tenants instantly
<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
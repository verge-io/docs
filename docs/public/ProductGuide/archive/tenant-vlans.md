---
title: Configuring VLANs in a Tenant
description: Instructions for configuration needed inside the tenant for pvids passed in from host
published: false
date: 2023-07-11T14:08:42.162Z
tags: 
editor: markdown
dateCreated: 2023-07-01T13:47:34.893Z
---

# Configuring VLANS in a Tenant

<br>

[**Virtual Wires**](/product-guide/virtualwires) must first be configured to give a tenant VLAN access to an external network.  


<br>
<br>

<!-- a note here about connecting directly to external network ?-->

## Tenant VLAN Configuration

1. **Log into the tenant's system**.
2. Click **Networks** on the left menu.
3. Click **New External** on the left menu.
4. Enter a **Name** that will be useful for future administration, such as a description of the VLAN id(s).
5. Optionally, a **Description** can be entered to record additional information about the network.
6. In the **Layer 2 Type** field, select ***vLAN***.
7. In the **Interface Network** field, select ***Physical***.
8. Select ***None*** for **IP Address Type**.
9. Other field values can be selected as desired; typically, default settings for these fields will be fine.
10. Click **Submit** to save the new network.

Tenant workloads can now be attached to this network for layer2 access to external VLANs (provided [**Virtual Wires**](/product-guide/virtualwires) have been configured appropriately to pass into the tenant.)

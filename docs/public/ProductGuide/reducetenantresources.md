---
title: Product Guide - Reducing a Tenant's Resources
description: Instructions and considerations for reducing resources  provisioned to a tenant
published: true
date: 2023-06-26T12:33:08.909Z
tags: 
editor: markdown
dateCreated: 2023-04-07T14:31:49.606Z
---

# Reducing a Tenant's Resources


Tenant compute resources can be reduced on-the-fly, by deleting a tenant node or reducing the cores/RAM assigned to tenant nodes.

<br>

## Reducing cores/RAM provisioned to a Tenant Node

The tenant node does not need to be powered off to reduce resource settings; however, if those resources are currently in use by tenant workloads, they will not actually be reclaimed until VMs are shut down. Example: if you reduce a tenant node's RAM resources to 28GB while 32GB is in use by its VMs; the change can be made, but it does not automatically shut down or reclaim any RAM from running VMs.

<br>
<br>


## Deleting a Tenant Node

In order to delete a tenant node, it must first be powered off. 

> **Do not delete the original tenant node; each tenant needs at least one node.** {.is-warning}

<br>


### To Delete a Tenant Node

1.  Navigate to the **tenant dashboard**.
2.  Click **Nodes** on the left menu.
3.  **Double-click the desired node** in the list.
4.  **If needed, migrate or power off VMs and Power off** the node, then return to the tenant node list. (Use the browser back button or the "Tenant Nodes" breadcrumb.)
5.  **Select** the **node**.
6.  Click **Delete** on the left menu.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
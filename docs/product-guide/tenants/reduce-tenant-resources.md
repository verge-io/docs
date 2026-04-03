---
title: "Reducing a Tenant's Resources"
description: "Instructions for reducing tenant compute resources by deleting tenant nodes or decreasing cores and RAM allocated to existing nodes."
semantic_keywords:
  - "reduce tenant resources cores RAM VergeOS"
  - "delete tenant node reclaim compute resources"
  - "downsize tenant allocation"
  - "scale down tenant compute capacity"
use_cases:
  - "reduce_tenant_compute_resources"
  - "delete_tenant_node"
  - "reclaim_unused_tenant_resources"
tags:
  - tenants
  - resources
  - scaling
  - tenant-nodes
  - resource-management
categories:
  - Tenants
---

# Reducing a Tenant's Resources

Tenant compute resources can be reduced on-the-fly, by:

- deleting a tenant node, or
- reducing the cores/RAM assigned to tenant nodes.

## Reduce cores/RAM provisioned to a Tenant Node

The tenant node does not need to be powered off to reduce resource settings; however, if those resources are currently in use by tenant workloads, they will not actually be reclaimed until VMs are shut down. Example: if you reduce a tenant node's RAM resources to 28GB while 32GB is in use by its VMs; the change can be made, but it does not automatically shut down or reclaim any RAM from running VMs.

## Delete a Tenant Node

In order to delete a tenant node, it must first be powered off.

!!! warning
    **Do not delete the original tenant node; each tenant needs at least one node.**

1. Navigate to the **tenant dashboard**.
2. Click **Nodes** on the left menu.
3. **Double-click the desired node** in the list.
4. **If needed, migrate or power off VMs and Power off** the node, then return to the tenant node list. (Use the browser back button or the "Tenant Nodes" breadcrumb.)
5. **Select** the **node**.
6. Click **Delete** on the left menu.

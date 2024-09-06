---
title: Workloads Failing to Migrate
slug: workloads-failing-to-migrate
description: Possible reasons why workloads fail to migrate from node to node
draft: false
date: 2023-01-23T22:27:27.361Z
tags:
  - vm
  - workloads
  - migrate
  - migration
categories:
  - Troubleshooting
  - Migration
editor: markdown
dateCreated: 2022-06-28T14:56:28.820Z
---

## Reasons That Workloads May Fail to Migrate

A workload is any process that is running on a node. Common workloads include Virtual Machines (VM), NAS Services, Networking, and Tenant Nodes.

The main reasons a workload fails to migrate from one node to another in the system are:

- **Insufficient available resources**: There may not be enough resources (such as RAM) on the target node to run the workload you're trying to migrate. Check the amount of RAM consumed by the workload (VM or Tenant node), then review the resources available on the target node.
  
- **Pinned VM configuration**: A VM may be pinned to a specific node. Review the VM’s settings and check the **CPU Type** setting. If the CPU Type is set to **Host Processor**, the VM will be unable to migrate. In this case, the VM must be powered off before it can be migrated successfully.

- **Tenant node migration issues**: Tenant nodes may also face migration issues for the same reasons as listed above. Log into the Tenant User Interface, and check the following:
  - Verify that each Tenant node has sufficient available resources to host the migrating tenant workloads.
  - Verify that each Tenant VM is not configured with the CPU Type set to **Host Processor**.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

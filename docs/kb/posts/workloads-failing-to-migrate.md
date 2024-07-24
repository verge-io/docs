---
title: Workloads Failing to Migrate
slug: workloads-failing-to-migrate
description: Possible reasons why workloads fail to migrate from node to node
published: true
date: 2023-01-23T22:27:27.361Z
tags: vm, workloads, migrate, migration
categories:
  - Troubleshooting
  - Migration
editor: markdown
dateCreated: 2022-06-28T14:56:28.820Z
---

## Reasons That Workloads May Fail to Migrate

A workload is any process that is running on a node. Common workloads are Virtual Machines (VM), NAS Services, Networking, and Tenant Nodes.

The main reasons a workload fails to migrate from one node to another in the system are:
* There are **insufficient available resources** on the node to run the workload you are migrating. To verify this, check the amount of RAM consumed by the workload (either a VM or a Tenant node).  Next, review the node that you are trying to migrate the workload to.
* It is possible that a virtual machine (VM) is configured to be pinned to a node.  Review the VM, and confirm the CPU Type setting.  If the CPU Type setting is set to 'Host Processor' this will prevent the VM from migrating.  In this scenario, the VM will need to be powered off before it can successfully migrate to another node.
* Since the VergeIO platform supports complete virtualized data centers, it is also possible that a Tenant node is unable to migrate for the same reasons as listed above.  To verify this, log in into the Tenant User Interface, and inside the Tenant check the same items.
	* Verify that each Tenant node has sufficient available resources to host the migrating tenant workloads
	* Verify that each Tenant VM is not configured with the CPU Type set to 'Host Processor'

<br>
<div style="text-align: center">
  
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>
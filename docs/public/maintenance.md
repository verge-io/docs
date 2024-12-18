---
title: System Maintenance
description: Performing Maintenance
published: true
date: 2023-01-27T21:49:50.227Z
tags: 
editor: markdown
dateCreated: 2022-03-01T16:59:05.579Z
---

## Maintenance Features

When performing planned maintenance on a physical node, that node can be entered into maintenance mode. Maintenance mode gracefully migrates all running workloads to other nodes that belong in the same cluster and prevents any new workloads from being assigned to it in the interim.

Maintenance mode was designed to maintain high availability while performing physical maintenance. Therefore no more than 1 node can be place into maintenance at a time.

Entering maintenance mode is as simple as selecting the node from the node list in the user interface and enabling maintenance mode. VergeOS takes care of everything else automatically to include migrating tenant nodes, virtual machines, and vnets if necessary.

Disabling maintenance mode is just as simple. Once the maintenance is complete and the node has been booted back up the user only has to disable maintenance mode on the node. VergeOS takes care of moving all workloads that originated on the node back to it, therefore rebalancing the workloads back out across the cluster.

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
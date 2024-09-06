---
title: Scaling Up VS. Scaling Out
slug: scaling-up-vs-scaling-out
description: Understanding different methods to add resources to your VergeOS environment
draft: false
date: 2023-01-24T19:16:07.815Z
tags: [scaling, up, out, adding resources, add disk]
categories:
  - Scale Up
  - Scale Out
editor: markdown
dateCreated: 2022-09-07T13:28:01.240Z
---

## Adding Additional Resources

There are several methods to add additional resources to your VergeOS environment. It is recommended that you consult with your sales representative on planning for the option that makes the most sense for your environment.

Here are a few key things to remember when planning for expanding the system:

## Scale Up

Expanding resources on current nodes:

When adding additional drives into existing nodes:
- It is important to add an equal number of drives to all nodes in that cluster. 

When adding additional memory into existing nodes:
- It is important to properly place a node into maintenance mode before powering the node off. 
- This ensures that all running workloads are gracefully migrated to other nodes in the system.

## Scale Out

Expanding by adding additional nodes:

Key points to remember:
- Clusters must contain two or more nodes of the same configuration.
- When adding a new node to a system, N+1 redundancy needs to be maintained to ensure high availability.
- Adding a new node needs to match the configuration of another node in the cluster: processor, memory, and physical disk drives should match the cluster.

If adding a matching node is not an option:
- A new cluster can be added to the system.
- However, every cluster must contain two or more nodes of the same configuration.

Remember, consulting with your sales representative is crucial for planning the expansion that best suits your environment.

---

!!! note "Document Information"
    - Last Updated: 2023-01-24
    - VergeOS Version: 4.12.6


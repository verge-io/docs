---
title: Scaling Up VS. Scaling Out
slug: scaling-up-vs-scaling-out
description: 
published: true
date: 2023-01-24T19:16:07.815Z
tags: scaling, up, out, adding resources
editor: markdown
dateCreated: 2022-09-07T13:28:01.240Z
---

## Adding Additional Resources

There are several methods to add additional resources to your VergeIO environment, and it is recommended that you consult with your sales representative on planning for the option that makes the most sense for your environment.

Here are a few key things to remember when planning for expanding the system.
<br>

### Expanding resources on current nodes

When adding additional drives into existing nodes, it is important to add an equal number of drives to all nodes in that cluster. **This is referred to as a scale-up**.

When adding additional memory into existing nodes, it is important to properly place a node into maintenance mode before powering the node off. This ensures that all running workloads are gracefully migrated to other nodes in the system.
<br>
### Expanding by adding additional nodes
Clusters must contain two or more nodes of the same configuration, this means when adding a new node to a system, N+1 redundancy needs to be maintained to ensure high availability. This means that adding a new node, needs to match the configuration of another node in the cluster: processor, memory, and physical disk drives should match the cluster. **This is referred to as a scale-out**.

If adding a matching node is not an option, then a new cluster can be added to the system.  However, every cluster must contain two or more nodes of the same configuration.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
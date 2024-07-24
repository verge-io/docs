---
title: Proper Power Sequence for a Verge.io Environment
slug: proper-power-sequence-for-a-vergeio-environment
description: 
published: true
date: 2023-01-23T22:25:43.163Z
tags: vergeOS, shutdown, power on, troubleshooting, maintenance
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2022-06-24T13:49:31.305Z
---

## Proper Shutdown Sequence for a VergeIO Environment

To power off a cluster (a collection of two or more like nodes) follow these steps:
1. Check any running workloads on each node of the cluster. This can be accomplished by navigating to the node dashboard for each node of the cluster and reviewing the list under the section **Running Machines**
1. If there are tenants running on any of the nodes, please log into those tenant environments and gracefully shut down all running workloads
1. Power off all running workloads on each node of the cluster. This includes all VMs, any tenant nodes, any VMware backup services and/or NAS services (if applicable).
**You do not need to worry about stopping any running vNet Containers, these will be gracefully stopped automatically by the system in subsequent steps.**
1. After all running workloads are stopped, navigate to the Cluster dashboard that you wish to power off.
1. Once at the Cluster dashboard, on the left-hand column select the function labeled **Power Off**. Please wait while the system successfully powers down each node in the cluster.
1. Power off the entire cluster by navigating to **System --> Clusters** and then select **'Power off'** in the left menu
![cluster-power-off.png](/public/cluster-power-off.png)
> If an environment contains multiple clusters _**ALWAYS**_ shutdown the cluster that contains the controller nodes (Node1 & Node2) _**LAST**_!<br>
{.is-warning}

## Proper Power on Sequence for a VergeIO Environment

To properly power on a VergeIO environment perform the following steps:
1. Power on **Node1** 
1. Once **Node1** comes online power on **Node2**
1. Power on all other nodes waiting approximately 1 minute in between power actions
1. On the main dashboard verify the environment is **Green** and **Online**
![main-dash-stoplights.png](/public/main-dash-stoplights.png)

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
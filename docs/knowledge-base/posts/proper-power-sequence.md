---
title: Proper Power Sequence
slug: proper-power-sequence-for-vergeos
description: Proper Power Sequence
draft: false
date: 2023-01-23T22:25:43.163Z
tags:
  - vergeOS
  - shutdown
  - power on
  - troubleshooting
  - maintenance
categories:
  - Best Practices
  - Troubleshooting
editor: markdown
dateCreated: 2024-06-24T13:49:31.305Z
---

## Proper Shutdown Sequence for a VergeOS Environment

To power off a cluster (a collection of two or more nodes) follow these steps:

1. Check any running workloads on each node of the cluster. Navigate to the node dashboard for each node and review the **Running Machines** section.
1. If there are tenants running on any of the nodes, log into those tenant environments and gracefully shut down all running workloads.
1. Power off all running workloads on each node, including VMs, tenant nodes, VMware backup services, and NAS services (if applicable).
    > **Note:** There’s no need to manually stop any running vNet Containers; they will be gracefully stopped automatically in the subsequent steps.
    {.is-info}
1. After stopping all running workloads, navigate to the **Cluster dashboard** for the cluster you wish to power off.
1. Select **Power Off** from the left-hand menu to begin shutting down each node in the cluster.
1. Finally, navigate to **System -> Clusters** and select **Power Off** in the left menu to power off the entire cluster.
    > **Important:** If an environment contains multiple clusters, _**ALWAYS**_ shut down the cluster containing the controller nodes (Node1 & Node2) _**LAST**_!
    {.is-warning}

![cluster-power-off.png](/public/cluster-power-off.png)

---

## Proper Power On Sequence for a VergeOS Environment

To properly power on a VergeOS environment, perform the following steps:

1. Power on **Node1**.
1. Once **Node1** is online, power on **Node2**.
1. Power on all other nodes, waiting approximately 1 minute between power actions.
1. On the main dashboard, verify that the environment is **Green** and **Online**.

![main-dash-stoplights.png](/public/main-dash-stoplights.png)

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

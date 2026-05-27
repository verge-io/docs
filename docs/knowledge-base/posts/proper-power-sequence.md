---
title: Proper Power Sequence
slug: proper-power-sequence-for-vergeos
description: Correct shutdown and power-on sequence for a VergeOS environment, including multi-cluster considerations and the order for controller nodes.
author: VergeOS Documentation Team
draft: false
date: 2023-01-23T22:25:43.163Z
semantic_keywords:
  - "VergeOS shutdown power on sequence"
  - "cluster node power off order"
  - "controller node startup sequence"
  - "graceful shutdown workloads tenants"
use_cases:
  - shutdown_vergeos_environment
  - power_on_vergeos_cluster
  - follow_proper_node_startup_order
  - perform_planned_maintenance_shutdown
tags:
  - vergeos
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

To power off a cluster (a collection of two or more nodes), follow these steps:

1. Check any running workloads on each node of the cluster. Navigate to the node dashboard for each node and review the **Running Machines** section.
2. If there are tenants running on any of the nodes, log into those tenant environments and gracefully shut down all running workloads.
3. Power off all running workloads on each node, including VMs, tenant nodes, VMware backup services, and NAS services (if applicable).

    !!! info "vNet Containers"
        There is no need to manually stop any running vNet containers; they will be gracefully stopped automatically in the subsequent steps.

4. After stopping all running workloads, navigate to the **Cluster dashboard** for the cluster you wish to power off.
5. Select **Power Off** from the left-hand menu to begin shutting down each node in the cluster.
6. Finally, navigate to **System → Clusters** and select **Power Off** in the left menu to power off the entire cluster.

!!! warning "IMPORTANT"
    If an environment contains multiple clusters, _**ALWAYS**_ shut down the cluster containing the controller nodes (Node1 & Node2) **LAST**.

---

## Proper Power-On Sequence for a VergeOS Environment

To properly power on a VergeOS environment, perform the following steps:

1. Power on **Node1**.
2. **Wait 30 seconds to a minute.**
    - This brief pause lets Node1 begin initializing before the rest of the cluster arrives.
3. **Power on all other nodes within the cluster.** All other cluster nodes can be powered on immediately -- there is no need to delay between nodes.
4. **Multi-cluster environments:** bring the controller cluster fully online before powering on additional clusters.
5. The system will automatically perform integrity checks of each storage tier.

    !!! tip "Storage Tier Integrity Checks"
        See [vSAN Tier Status (Journal Walks)](/knowledge-base/understanding-journal-walks-and-vsan-tier-status/) for information related to these automatic integrity checks (journal walks).

6. **Verify system health.**
    - On the Main Dashboard, verify all nodes and vSAN tiers appear with a green status.
    - Check for any new alarms.

!!! warning "Power-On After an Uncontrolled Shutdown"
    Extra care should be taken when powering on a cluster after an uncontrolled shutdown (e.g. an abrupt power loss, UPS exhaustion, or facility failure). See [Cluster Recovery After Full Power Outage](/knowledge-base/cluster-recovery-after-power-outage/) for the full recovery procedure, including pre-power-on checks, vSAN integrity verification, and prevention guidance.


---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

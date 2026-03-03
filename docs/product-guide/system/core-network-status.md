---
title: "Fabric Status Guide"
description: "How to read, interpret, and troubleshoot core fabric status in VergeOS"
tags: [networking, monitoring, troubleshooting, core]
categories: [Networking, System Administration, Nodes]
---

# Core Network Status Guide

## Overview

The fabric is the backbone of your VergeOS system, utilizing the core network to manage all node-to-node communications, including vSAN traffic, time synchronization, health/status monitoring, cross-node network traffic, VM and network migrations, peer discovery, and other functions.

A typical VergeOS deployment uses **two independent physical core networks** ("Core 1 Switch", "Core 2 Switch") for redundancy. Each node should have two independent physical paths to every other node in the cluster.

This core fabric redundancy is vital to maintain system resiliency and uninterrupted operation, even during a node or drive failure, and allows maintenance operations without downtime.

??? info "How Core Fabric Redundancy Works"
    The core fabric handles redundancy at a low level, creating a mesh where every node maintains redundant paths to every other node in the system. Because of this built-in redundancy, physical LAG or port bonding should **not** be used on core fabric networks — doing so will interfere with the fabric's own mechanisms.

    The VergeOS core fabric provides more comprehensive detection and resiliency than traditional link aggregation. LAG only detects and protects against link-level failures, while the VergeOS fabric operates at the application layer, detecting a much wider range of problems including dropped packets, MTU mismatches, NIC lockups, and bad firmware — in addition to simple disconnected links.


## Accessing Fabric Status

Fabric status is available in the VergeOS UI at multiple levels of detail.

| Method | Detail Level | Use Case |
|--------|-------------|----------|
| **Alarms** | Summary | Day-to-day monitoring — alerts when paths are degraded or lost |
| **Node NICs List** | Per-NIC | Quick status check of all Node NICs |
| **Node Dashboard** | Per-NIC (selected node) | Quick status check of individual NICs and their connections to other nodes |
| **Node Diagnostics** | Full JSON report | Advanced troubleshooting — complete path, score, and peer details |

### Alarms

On a day-to-day basis, monitoring fabric status can be handled through the same alarm system used for the rest of your VergeOS environment. A **warning** alarm is raised when bidirectional communication is unavailable on a core network path.

!!! tip
    Clicking an alarm in the list will navigate directly to the affected Node Dashboard, where further detail is available.

For more information on viewing and managing alarms, see the [Alarms Guide](/product-guide/operations/alarms/).


!!! warning "Address Core Network Alarms Immediately"
    Core network alarms indicate that your system may not have full fabric redundancy. Resolve these promptly to ensure your cluster can tolerate a failure without disruption.
    Event triggers can be configured to send notifications via email, text alerting systems, monitored Slack channels, and more, ensuring administrators are notified immediately. See the [Task Engine Product Guide](/product-guide/automation/task-engine/) for more information about creating automated tasks; this [Automation Example](/knowledge-base/automated-task-example-webhook/) KB article provides an example of setting up event-driven notifications.


### Node NICs List

This is a quick way to view fabric status on all core network NICs from a single page.

1. Navigate to **Infrastructure** > **Nodes**.
2. Click **NICs** on the left menu.
3. A list of all NICs from all nodes is displayed. The **Fabric Status** column shows the status for core network NICs (e.g. 'Confirmed', 'No Path', 'Degraded'). A *Fabric Status* of 'None' is shown for NICs that do not participate in the core fabric (e.g. external networks).
4. Select a fabric NIC and click **View Fabric Status** to view status and score information per path. See [Score Values](#score-values) below 


### Node Dashboards

Status information is available per NIC from each Node Dashboard.

1. Navigate to **Infrastructure** > **Nodes**.
2. Double-click the desired **node** from the list.
3. Scroll down to the **NICs** section on the Node Dashboard.
   Each core fabric NIC displays either a **Confirmed** status indicator or a problem status message (e.g. No Path, Degraded).
4. For more detailed information, click the globe icon <i class="bi bi-globe"></i> on the right. This provides a popup showing NIC details:
    - Vendor, Model, Interface, and Driver
    - **Confirmed** / **No Path** / **Degraded** status per connection to each other node in the system
    - **Score** per connection to each other node (see [Score Values](#score-values) below)
5. Each path should show **Confirmed** status. Any path showing **No Path** or **Degraded** indicates a connectivity issue that should be investigated and resolved.

### Node Diagnostics 

More extensive fabric status details (useful for advanced troubleshooting) are available through Node Diagnostics. This returns a full JSON report of fabric status as seen by the selected node, including all discovered peers, their paths, scores, and confirmation status.

1. Navigate to **Infrastructure** > **Nodes**.
2. Select the desired **node** from the list.
3. Click **Diagnostics** in the left menu.
4. Select **Fabric Configuration** from the **Query** dropdown.
5. Click **Send** to execute.
6. The fabric status is a JSON document where each peer node is represented as a key with its connection details. 

#### Diagnostics Field Reference

The following fields appear in the fabric status JSON output.

| Field | Description |
|-------|-------------|
| `$sysid` | SHA-1 hash identifying this VergeOS system (sourced from `/.system_id`) |
| `$last_update` | Timestamp of the most recent fabric status refresh |
| `syncing_time` | Indicates whether the node is currently synchronizing its clock with the cluster. This must be `false` before the node fully joins. During initial node join, it is normal for the value to be `true`. |
| `paths` | Array of network paths to this peer node |
| `paths[].ip` | IP address of the remote node on the core network |
| `paths[].iface` | Local network interface used to reach this path |
| `paths[].score` | Numeric connectivity quality score (higher is better; **200** = perfect). See [Score Values](#score-values) below. |
| `paths[].confirmed` | Whether this path has been verified as active and reachable (`true` / `false`) |
| `vxlans` | VXLAN tunnel endpoints programmed for this peer |


#### Confirmed Status

| Value | Meaning |
|-------|---------|
| `true` | The path has been verified — bidirectional communication is working |
| `false` | The path could not be verified — connectivity is lost or never established |

### Score Values

The `score` field represents the quality of the connection to a peer node through a specific path. The maximum score corresponds to the link speed of the core NIC — a higher score indicates a faster, healthier connection.

| NIC Link Speed | Maximum Score |
|----------------|---------------|
| 100 Gbps | 200 |
| 50 Gbps | 100 |
| 25 Gbps | 50 |
| 10 Gbps | 20 |

!!! note "Interpreting Scores"
    A "perfect" score means the value matches the expected maximum for your NIC speed. For example, a score of **50** on a 25Gbps NIC is healthy, while a score of **50** on a 100Gbps NIC indicates degradation. Always compare the score against the maximum for your link speed.

A score significantly **below** the expected maximum indicates degradation - possible causes include network latency, packet loss, or suboptimal routing.  A score of **0** indicates a complete loss of bidirectional communication.


!!! tip "Confirmed vs Score"
    *confirmed* indicates whether the path is reachable, while *score* reflects the quality of that path.


## Best Practices

- Address core network alarms immediately to maintain full fabric redundancy.
- Perform a thorough fabric status check, including path scores, after a new system installation or significant network configuration changes.
- Verify fabric status before running updates or other maintenance operations.

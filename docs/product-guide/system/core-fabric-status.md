---
title: "Core Fabric Status Guide"
description: "How to read, interpret, and troubleshoot core fabric status in VergeOS"
tags: [networking, monitoring, troubleshooting, core]
categories: [Networking, System Administration, Nodes]
---

# Core Fabric Status Guide

## Prerequisites

- Access to the VergeOS interface with node management privileges
- Basic understanding of [VergeOS core network architecture](/implementation-guide/concepts/#core-fabric-network)

## What is the Core Fabric?

The fabric is the backbone of your VergeOS system, utilizing the core network to manage all node-to-node communications, including vSAN traffic, peer discovery, management operations, cross-node network traffic, VM and network migrations, and other functions.

A typical VergeOS deployment uses **two independent physical core networks** ("Core 1 Switch", "Core 2 Switch") for redundancy. Each node should have two independent physical paths to every other node in the cluster.

This core fabric redundancy is vital to maintain system resiliency and uninterrupted operation, even during a node or drive failure, and allows maintenance operations without downtime.

??? info "How Core Fabric Redundancy Works"
    The core fabric handles redundancy at a low level, creating a mesh where every node maintains redundant paths to every other node in the system. Because of this built-in redundancy, physical LAG or port bonding should **not** be used on core fabric networks — doing so will interfere with the fabric's own mechanisms.

    The VergeOS core fabric provides more comprehensive detection and resiliency than traditional link aggregation. LAG only detects and protects against link-level failures, while the VergeOS fabric operates at the application layer, detecting a much wider range of problems including dropped packets, MTU mismatches, NIC lockups, and bad firmware — in addition to simple disconnected links.


## Accessing Fabric Status (UI)

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

#### Field Reference

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

A score significantly **below** the expected maximum indicates degradation - possible causes include network latency, packet loss, or suboptimal routing. A score of **0** indicates a complete loss of bidirectional communication.


!!! tip "Confirmed vs Score"
    *confirmed* indicates whether the path is reachable, while *score* reflects the quality of that path.


## Healthy vs. Unhealthy Fabric Examples

### Healthy Fabric (2-Node System)

All nodes visible, two paths each, score 200, all confirmed:

```json
{
    "node1": {
        "paths": [
            { "ip": "172.16.1.1", "score": 200, "confirmed": true },
            { "ip": "172.16.2.1", "score": 200, "confirmed": true }
        ]
    },
    "node2": {
        "paths": [
            { "ip": "172.16.1.2", "score": 200, "confirmed": true },
            { "ip": "172.16.2.2", "score": 200, "confirmed": true }
        ]
    }
}
```

!!! success "What to Look For"
    - Every node in the cluster appears in the output
    - Each node has **two paths** (one per core network)
    - All paths show `"confirmed": true`
    - Scores match the expected maximum for your NIC speed (e.g., 200 for 100Gbps, 50 for 25Gbps)

### Degraded Fabric — Lost Redundancy

One path missing for a node (single core network failure):

```json
{
    "node2": {
        "paths": [
            { "ip": "172.16.1.2", "score": 200, "confirmed": true }
        ]
    }
}
```

!!! warning "Impact"
    The node is reachable through only one core network. If the remaining path fails, the node will lose cluster connectivity entirely. Investigate immediately.

### Degraded Fabric — Low Score

Both paths present but one showing reduced quality:

```json
{
    "node2": {
        "paths": [
            { "ip": "172.16.1.2", "score": 200, "confirmed": true },
            { "ip": "172.16.2.2", "score": 120, "confirmed": true }
        ]
    }
}
```

!!! warning "Impact"
    A score below the expected maximum for your NIC speed indicates network degradation on that path. vSAN performance may be affected. Check for latency, packet loss, or switch issues on the affected core network.

### Critical Fabric — Path Not Confirmed

A path exists but cannot be verified:

```json
{
    "node2": {
        "paths": [
            { "ip": "172.16.1.2", "score": 200, "confirmed": true },
            { "ip": "172.16.2.2", "score": 0, "confirmed": false }
        ]
    }
}
```

!!! danger "Impact"
    The node has lost communication on one core network. If both paths show `"confirmed": false`, the node is isolated from the cluster, which will cause vSAN and workload disruption.

### Critical Fabric — Missing Node

A node that should be in the cluster does not appear in the fabric output at all.

!!! danger "Impact"
    The missing node is completely unreachable. It may be powered off, have both core NICs down, or be on a different VLAN. Check physical connectivity and node power status immediately.

## Pre-Maintenance Fabric Verification

VergeOS maintenance operations require a healthy fabric as a prerequisite. Before performing maintenance operations, verify that **all nodes show two paths with `confirmed: true`**:

!!! tip "Quick Verification"
    From any node, run the **Fabric Configuration** diagnostic and confirm every peer shows two paths with `"confirmed": true` before proceeding with maintenance.

## Troubleshooting Fabric Issues

### Path Not Confirmed

**Symptoms:** One or more paths show `"confirmed": false`

**Common causes and actions:**

1. **Physical cabling** — Verify the cable is seated properly on both the node NIC and the switch port. Try a known-good cable.
2. **Switch VLAN configuration** — Confirm the switch port is assigned to the correct core VLAN. Core ports should be configured as **access ports** on a dedicated VLAN.
3. **MTU mismatch** — Core fabric requires jumbo frames (minimum MTU 9216 on the physical switch). Verify end-to-end MTU consistency:
    - Switch port MTU >= 9216
    - Physical NIC MTU (e.g., 9192)
    - VXLAN MTU = NIC MTU minus 50 bytes overhead
4. **NIC down** — Check the NIC status on the node dashboard. If the NIC shows "Down", it may indicate a hardware failure or driver issue.

### Score Degradation

**Symptoms:** Paths are confirmed but score is below the expected maximum for your NIC speed

**Common causes and actions:**

1. **Network latency** — Check for excessive hops between nodes. Core traffic should ideally traverse a single Layer 2 switch or a directly connected pair.
2. **Switch congestion** — Review switch interface counters for errors, drops, or CRC failures.
3. **Duplex/speed mismatch** — Use **Node Diagnostics** > **Ethernet Tool** to verify the NIC is negotiating at the expected speed (10Gbps+).

### Missing Nodes

**Symptoms:** A node that should be in the cluster does not appear in the fabric output

**Common causes and actions:**

1. **Node offline** — Verify the node is powered on and running. Check IPMI if the node is unresponsive.
2. **Both core NICs down** — If both core network interfaces are down, the node cannot participate in fabric discovery.
3. **VLAN isolation** — Confirm the switch ports for the missing node are on the same VLANs as the other nodes.
4. **ybfabric not running** — The `ybfabric` daemon must be running for a node to participate in fabric discovery. If the process is not running, the `vsan-watchdog` should restart it automatically. If the node remains missing after several minutes, contact VergeOS support.

### Single Path Only

**Symptoms:** Nodes show only one path instead of two

**Common causes and actions:**

1. **Cable failure** — One core network cable may be disconnected or damaged. Try a known-good cable.
2. **Switch port failure** — The switch port for one core network may be down. Check switch interface status and logs.
3. **NIC failure** — One of the two core NICs may have failed. Check the NIC status on the node dashboard. Use **Node Diagnostics** > **Ethernet Tool** to verify link state.

### Time Synchronization Issues

**Symptoms:** `"syncing_time": true` persists for more than 60 seconds after node boot

**Common causes and actions:**

1. The node cannot reach peers to synchronize its clock. Investigate fabric connectivity first.
2. If fabric paths are healthy, the `ybfabric` daemon may need to be restarted via the starter script.

## Best Practices

- **Address core network alarms immediately** - Resolve issues quickly to maintain full fabric redundancy
- **Verify fabric before every maintenance operation** — Make it a habit to check fabric status before updates, scale-ups, scale-outs, and node maintenance
- **Maintain two core networks** — Always keep both Core1 and Core2 paths healthy for redundancy
- **Test after physical changes** — After any cabling, switch, or NIC changes, re-verify fabric status
- **Use the Refresh Fabric action** — After resolving a connectivity issue, use the **Refresh Fabric** button on the node dashboard (or batch action from the nodes list) to force a status update
- **Include fabric status in diagnostics** — When working with VergeOS support, the `ybfabric.txt` file in system diagnostics contains fabric state at the time the diagnostic was generated

## Related Resources

- [Core Concepts — Core Fabric Network](/implementation-guide/concepts/#core-fabric-network)
- [Nodes Overview](/product-guide/system/nodes-overview/)
- [Node Diagnostics Guide](/product-guide/system/node-diagnostics/)
- [System Update SOP](/product-guide/operations/sop-update/)
- [vSAN Scale-Up SOP](/product-guide/operations/vsan-scale-up-sop/)
- [Scale-Out SOP](/product-guide/operations/sop-scale-out/)
- [Switch Configuration Guide](/implementation-guide/switch-configuration/)

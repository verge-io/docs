---
title: "Core Fabric Status Guide"
description: "How to read, interpret, and troubleshoot core fabric status in VergeOS"
tags: [networking, monitoring, troubleshooting]
categories: [Networking, System Administration, Nodes]
---

# Core Fabric Status Guide

The core fabric is the backbone of every VergeOS system, handling vSAN traffic, node-to-node communication, VM migrations, and management operations. Understanding how to read and interpret fabric status is essential for maintaining a healthy cluster.

## Overview

Every VergeOS node communicates with its peers over a VXLAN overlay network called the **core fabric**. The `ybfabric` daemon runs on each node, discovering peers, managing VXLAN forwarding entries, synchronizing time across the cluster, and continuously monitoring path health.

Fabric status data is available through the VergeOS UI and the CLI. This guide explains what each field means, how to recognize healthy and degraded states, and how to troubleshoot common fabric issues.

!!! info "What You'll Learn"
    - How to access fabric status through the UI and CLI
    - What each fabric status field means (`confirmed`, `score`, paths)
    - How to identify healthy, degraded, and critical fabric states
    - How to troubleshoot common fabric connectivity issues
    - When and why to verify fabric health before maintenance operations

## Prerequisites

- Access to the VergeOS interface with node management privileges
- Basic understanding of [VergeOS core network architecture](/implementation-guide/concepts/#core-fabric-network)

## What is the Core Fabric?

The core fabric is a flat Layer 2 network segment that spans all nodes in a VergeOS system. It is built on a VXLAN overlay (VNI 2, UDP port 4789) and carried over dedicated physical NICs configured with jumbo frames.

The fabric handles:

- **vSAN traffic** — All distributed storage reads and writes between nodes
- **Node-to-node communication** — Cluster coordination and heartbeat
- **VM live migrations** — Memory and state transfer during workload moves
- **Management operations** — Controller-to-node commands and status updates

A typical VergeOS deployment uses **two separate physical core networks** (Core1 and Core2) for redundancy. Each node should have two independent paths to every other node in the cluster.

### The ybfabric Daemon

The `ybfabric` daemon is a VergeOS service that runs on every node and provides:

| Function | Description |
|----------|-------------|
| **Peer discovery** | Identifies other VergeOS nodes on the core network via multicast (UDP 14202) |
| **VXLAN FDB management** | Programs the kernel VXLAN forwarding database with remote endpoint addresses |
| **Time synchronization** | Synchronizes clocks across the cluster during boot |
| **Health monitoring** | Tracks path scores and peer reachability |
| **Status reporting** | Writes live status to `/run/ybfabric.json` |

!!! note "Automatic Recovery"
    The `vsan-watchdog` service monitors `ybfabric` every 10 seconds. If the process exits unexpectedly, the watchdog automatically restarts it. Unlike a vSAN crash, an `ybfabric` crash does **not** trigger a node reboot.

## Accessing Fabric Status

### Through the UI

There are two ways to view fabric status in the VergeOS interface:

**Node Diagnostics (detailed JSON output):**

1. Navigate to **Infrastructure** > **Nodes**
2. Select the desired **node** from the list
3. Click **Diagnostics** in the left menu
4. Select **Fabric Configuration** from the **Query** dropdown
5. Click **Send** to execute

This returns the full JSON fabric status as seen by the selected node, including all discovered peers, their paths, scores, and confirmation status.

**NIC Fabric Status (quick visual check):**

1. Navigate to **Infrastructure** > **Nodes**
2. Select the desired **node** from the list
3. Scroll down to the **NICs** section on the node dashboard

Each NIC connected to the core fabric displays a globe icon with a **Confirmed** or **Not Confirmed** status indicator.

### Through the CLI

Access the fabric status file directly:

```bash
cat /run/ybfabric.json
```

For a formatted view:

```bash
cat /run/ybfabric.json | python3 -m json.tool
```

## Understanding Fabric Status Fields

The fabric status is a JSON document where each peer node is represented as a key with its connection details. Here is an annotated example:

```json
{
    "$sysid": "a1b2c3d4e5f6...",
    "$last_update": "02/19/2026 14:30:00",
    "syncing_time": false,
    "node1": {
        "paths": [
            {
                "ip": "172.16.1.1",
                "iface": "enp6s18",
                "score": 200,
                "confirmed": true
            },
            {
                "ip": "172.16.2.1",
                "iface": "enp6s19",
                "score": 200,
                "confirmed": true
            }
        ],
        "vxlans": ["vx2 via 172.16.1.1"]
    },
    "node2": {
        "paths": [
            {
                "ip": "172.16.1.2",
                "iface": "enp6s18",
                "score": 200,
                "confirmed": true
            },
            {
                "ip": "172.16.2.2",
                "iface": "enp6s19",
                "score": 200,
                "confirmed": true
            }
        ],
        "vxlans": ["vx2 via 172.16.1.2"]
    }
}
```

### Field Reference

| Field | Description |
|-------|-------------|
| `$sysid` | SHA-1 hash identifying this VergeOS system (sourced from `/.system_id`) |
| `$last_update` | Timestamp of the most recent fabric status refresh |
| `syncing_time` | Whether the node is currently synchronizing its clock with the cluster. Must be `false` before the node fully joins |
| `paths` | Array of network paths to this peer node |
| `paths[].ip` | IP address of the remote node on the core network |
| `paths[].iface` | Local network interface used to reach this path |
| `paths[].score` | Numeric connectivity quality score (higher is better; **200** = perfect) |
| `paths[].confirmed` | Whether this path has been verified as active and reachable (`true` / `false`) |
| `vxlans` | VXLAN tunnel endpoints programmed for this peer |

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

A score significantly **below** the expected maximum indicates degradation — possible causes include network latency, packet loss, or suboptimal routing. A score of **0** indicates severe connectivity issues where the path may be unusable.

### Confirmed Status

| Value | Meaning |
|-------|---------|
| `true` | The path has been verified — bidirectional communication is working |
| `false` | The path could not be verified — connectivity is lost or never established |

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

Several VergeOS maintenance operations require a healthy fabric as a prerequisite. Before performing any of the following, verify that **all nodes show two paths with `confirmed: true`**:

| Operation | Why Fabric Matters |
|-----------|-------------------|
| [System updates](/product-guide/system/running-updates/) | Nodes reboot sequentially; remaining nodes must communicate reliably |
| [vSAN scale-up](/product-guide/operations/vsan-scale-up-sop/) | New drives join the distributed storage pool; fabric carries replication traffic |
| [Scale-out (adding nodes)](/product-guide/operations/sop-scale-out/) | New nodes must discover and join the existing fabric mesh |
| Node maintenance | Workloads migrate to other nodes over the fabric network |

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

**Symptoms:** Paths are confirmed but score is below 200

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
4. **ybfabric not running** — On the affected node, check if the daemon is running:

    ```bash
    cat /run/ybfabric.pid
    ps -p $(cat /run/ybfabric.pid) -o pid,comm,etime
    ```

    If the process is not running, the `vsan-watchdog` should restart it automatically. Check the watchdog status:

    ```bash
    journalctl -u vsan.service | grep fabric
    ```

### Single Path Only

**Symptoms:** Nodes show only one path instead of two

**Common causes and actions:**

1. **Cable failure** — One core network cable may be disconnected or damaged.
2. **Switch port failure** — The switch port for one core network may be down. Check switch status.
3. **NIC failure** — One of the two core NICs may have failed. Check the NIC status on the node dashboard.
4. **Bond member down** — If core NICs are bonded, check the bond status:

    ```bash
    cat /proc/net/bonding/bond0
    ```

### Time Synchronization Issues

**Symptoms:** `"syncing_time": true` persists for more than 60 seconds after node boot

**Common causes and actions:**

1. The node cannot reach peers to synchronize its clock. Investigate fabric connectivity first.
2. If fabric paths are healthy, the `ybfabric` daemon may need to be restarted via the starter script.

## Best Practices

- **Verify fabric before every maintenance operation** — Make it a habit to check fabric status before updates, scale-ups, scale-outs, and node maintenance
- **Monitor NIC fabric status regularly** — Use the globe icon on the Nodes dashboard for a quick visual check
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

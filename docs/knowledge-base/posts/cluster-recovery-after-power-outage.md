---
title: Cluster Recovery After Full Power Outage
slug: cluster-recovery-after-power-outage
description: Recovery procedure and best practices for VergeOS clusters after an unplanned full power loss, including power-on order, vSAN integrity verification, and prevention guidance.
author: Carl Rodabaugh
draft: false
date: 2026-04-27T00:00:00.000Z
tags: [power-outage, recovery, vsan, cluster-management, troubleshooting, best-practices]
categories:
  - System Administration
  - Best Practices
  - Troubleshooting
editor: markdown
dateCreated: 2026-04-27T00:00:00.000Z
---

# Cluster Recovery After Full Power Outage

## Overview

!!! info "Key Points"
    - Power on **Node1** first; it will boot but halt before mounting the vSAN until enough peers join. Once Node1 has reached that wait state, power on the remaining nodes one at a time, ~1 minute apart
    - vSAN mounts automatically once **N-1 vSAN nodes** are online: a 4-node cluster needs 3, a 6-node needs 5, an 8-node needs 7
    - A non-zero **Repairs** count after recovery is normal; it should decrease as Journal Walks complete
    - Engage VergeIO Support before any destructive action if anomalies persist

This article covers recovery of a VergeOS cluster after an **unplanned full power loss** -- where every host went down at once and no graceful shutdown occurred. Following the correct sequence brings nodes back online safely, restores vSAN redundancy, and verifies integrity before workloads return to service. For a *planned* shutdown, see [Proper VergeOS System Shutdown Procedure](/knowledge-base/proper-vergeos-system-shutdown-procedure/).

## Prerequisites

- Physical or IPMI/BMC access to every node
- Knowledge of which node is **Node1** (boot order matters) and which two nodes are the **controllers** (Node1 and Node2)
- Confirmation that upstream power, networking (core fabric switches), and IPMI are restored and stable
- A recent backup or remote-replicated snapshot in case integrity issues are found
- Familiarity with the [vSAN Tier Dashboard / Journal Walks](/knowledge-base/understanding-journal-walks-and-vsan-tier-status/)
- Familiarity with [Proper Power Sequence](/knowledge-base/proper-power-sequence-for-vergeos/)

## Steps

### What to Expect

- VergeFS is designed to survive abrupt power loss. On controller startup it triggers a **Full Journal Walk** to verify each block and reconcile against peers.
- vSAN requires **N-1 vSAN nodes** online before it will mount. Until that threshold is reached, storage stays offline and VMs will not start.
- Node1 will boot but halt before mounting the vSAN until enough peers join to satisfy N-1.
- Once quorum is reached, VergeOS handles vSAN reconciliation automatically -- no manual repair commands are needed.
- A non-zero **Repairs** count after recovery is normal and should decrease as the Walk progresses.

### Pre-Power-On Checks

1. Confirm **upstream power** is stable. Bringing nodes up on an unstable feed risks a second outage mid-recovery.
2. Confirm **core network switches** are online and the inter-node fabric is up. vSAN cannot reform without it.
3. Verify **IPMI/BMC** access on each node so you can monitor boot remotely if needed.
4. Note any nodes with visible hardware faults (failed PSUs, drive LEDs, fan alarms) -- these may need attention before being added back.

### Power-On Sequence

1. **Power on Node1.**
   - Watch the console/IPMI. Node1 will boot the OS but **halt before mounting the vSAN** until enough peers join to reach N-1.
2. **Power on the remaining nodes, one at a time, approximately 1 minute apart.**
   - vSAN mounts automatically as soon as N-1 nodes are up (3 of 4, 5 of 6, 7 of 8); the rest join cleanly as they come online.
   - Sequential, paced power-on prevents resource contention and lets each node cleanly join the existing cluster.
3. **Multi-cluster environments:** bring the controller cluster fully online before powering on additional clusters, using the same sequence within each.

!!! tip "Pro Tip"
    Node1 boots first and sits waiting while you power on the rest of the cluster -- that's expected, not a stuck state. vSAN mounts on its own as soon as enough peers are online, and VergeOS handles reconciliation automatically; no manual repair commands are needed.

### Post-Recovery Verification

1. **Verify vSAN health.**
   - Open the **Main Dashboard** -- all status lights should be **Green**.
   - Navigate to **System → vSAN → Tiers** and double-click each tier.
   - Review the **Status** tile:
     - **Redundant**: should be `true`. May briefly show `false` while the Full Walk runs.
     - **Full Walk**: typically `true` immediately after recovery (controller startup triggers one).
     - **Walk Progress**: should advance over time.
     - **Repairs**: should be decreasing. A non-zero value is expected after an unplanned outage -- VergeFS is rebuilding redundancy from peers.
     - **Bad Drives**: this is the count of drives the cluster currently can't see. It should drop to `0` once all nodes are fully Online and their drives have re-enumerated. If the count persists after every node is Online, treat it as a real fault and engage support before re-introducing the affected drives.
   - Allow Full Journal Walks to complete on every tier before declaring recovery complete.
   - For a CLI/diagnostics view of the same data, use **System → vSAN Diagnostics → Get Tier Status** (and **Get Repair Status** to monitor active repairs). See the [vSAN Diagnostics Guide](/product-guide/storage/vsan-diagnostics/).
2. **Verify drive health.**
   - Go to **System → vSAN → Drives**.
   - Look for any drives showing errors, warnings, or SMART alerts -- these can occur when drives don't return cleanly after abrupt power loss.
   - Offline any drives with persistent errors and contact support before re-introducing them.
3. **Verify workloads.**
   - Confirm VMs auto-started per their **On Power Loss** settings.
   - Spot-check critical VMs: console responsive, OS healthy, application services up.
   - Review system logs (Main Dashboard) for errors during boot or initial mount.

## Troubleshooting

!!! warning "Common Issues"

    - **Problem:** A node fails to rejoin the cluster.
      - **Solution:** Check IPMI/console output for boot errors. Verify the node's core network interface is up and reachable from peers. Review **System → Nodes → [node]** for status and last-seen timestamps. If the node boots but does not join, do **not** force-remove it -- contact support.

    - **Problem:** vSAN won't mount / storage offline.
      - **Solution:** Confirm **N-1 vSAN nodes are Online** under **System → Nodes** (e.g., 3 of 4 in a 4-node cluster, 5 of 6 in a 6-node cluster). Confirm inter-node connectivity (core fabric switches, link state, MTU). If the threshold is met but storage still won't mount, capture a sysdiag and engage support.

    - **Problem:** Repair count is stuck or growing.
      - **Solution:** A small, decreasing **Repairs** count is normal post-recovery. A count that **stops decreasing** or **grows** indicates blocks vSAN cannot reconstruct from peers. **Do not reboot any nodes.** Engage support before taking remediation steps.

    - **Problem:** Suspected split-brain or inconsistent cluster state.
      - **Solution:** During recovery a network problem can cause two subsets of nodes to come up unable to see each other. If you see signs of two independent clusters forming (rare, but possible after partial network restoration), **do not attempt to merge them yourself**. Capture sysdiags from every node and engage support immediately.

## Prevention

- **UPS sizing and coverage** -- size the UPS to cover graceful shutdown duration plus margin for every node. Include core network switches in the same coverage. Test UPS runtime annually -- batteries degrade.
- **Automated graceful shutdown** -- VergeOS does not currently document a built-in UPS/NUT integration, so graceful-shutdown automation has to be driven externally. Use UPS management software (NUT, IPMI scripting, or your UPS vendor's agent on a management host) to detect a low-battery event and trigger a graceful cluster shutdown -- either via the Cluster Dashboard's **Power Off** action, the VergeOS API (`POST /v4/cluster_actions` with body `{"cluster": <cluster_id>, "action": "shutdown", "params": "{}"}`), or our [**VRG CLI**](https://github.com/verge-io/vrg) wrapper, which can script the same shutdown call from a Linux/macOS/Windows host. Validate the automation in a maintenance window before relying on it.
- **"On Power Loss" VM settings** -- configure each VM's behavior deliberately so post-recovery state is predictable. Three options:
    - ***Last State*** -- VM powers on only if it was on at the time of power loss
    - ***Leave Off*** -- VM stays off when power is restored, regardless of prior state
    - ***Power On*** -- VM powers on when power is restored, regardless of prior state
- **Repair server (ioGuardian)** -- a configured [repair server](/product-guide/backup-dr/repair-server/) gives VergeFS a fallback source for missing blocks if peer nodes can't supply them after an outage. It pulls needed blocks from a synchronized remote VergeOS system and is built from an existing outgoing site sync configuration. Strongly recommended for any production deployment.
- **Off-site snapshots** -- maintain replicated system snapshots at a remote site. If post-outage integrity issues require restoring data, a recent off-site copy is often the cleanest path back.
- **Fencing (handled internally)** -- VergeOS doesn't expose Pacemaker-style STONITH because vSAN is shared-nothing: every block is redundantly stored, and writes require quorum. A partitioned node can't commit to the authoritative copy without satisfying N-1, so split-brain corruption is prevented by design rather than by an external fencing agent. The operator-facing equivalents are [**Maintenance Mode**](/product-guide/operations/maintenance-mode/) (graceful) and an IPMI-driven hard power-off for an unresponsive node, both available from the node dashboard.

## When to Engage Support

Open a support case **before** taking destructive action if any of the following are true:

- vSAN won't mount after N-1 nodes are online and quorum should be met
- A tier shows **Redundant: false** for an extended period after Full Walks complete
- The **Repairs** count is stuck or growing
- A stuck-repairs alert is present (VergeOS 26+)
- Multiple drives report errors after recovery
- You suspect split-brain or inconsistent cluster state
- Any node fails to rejoin and the cause isn't obviously hardware

## Generating a System Diagnostic for Support

Before opening the case, capture a sysdiag and attach it (or send it directly to support):

1. **Log in to the parent/root environment** -- sysdiags can't be generated from a tenant.
2. Navigate to **System → System Diagnostics** and click **Build** (or **New Report**) on the left menu.
3. Give the report a **Name** and **Description** so support can identify it.
4. Check the box for **"Send diagnostic information to Verge.io support"** to upload directly. (For air-gapped systems, leave it unchecked, download the file once it finishes building, and email it to **support@verge.io** -- or use a file-sharing link if the file is too large for email.)
5. Click **Submit**. The status moves from *Building* → *Sending to Support* → *Sent to Support* when complete.

See [Generating System Diagnostics](/knowledge-base/generating-system-diagnostics/) and the full [System Diagnostics](/product-guide/system/diagnostics/) reference.

## Additional Resources

- [Proper Power Sequence](/knowledge-base/proper-power-sequence-for-vergeos/)
- [Proper VergeOS System Shutdown Procedure](/knowledge-base/proper-vergeos-system-shutdown-procedure/)
- [Understanding Journal Walks and vSAN Tier Status](/knowledge-base/understanding-journal-walks-and-vsan-tier-status/)
- [Generating System Diagnostics](/knowledge-base/generating-system-diagnostics/)
- [Repair Server (ioGuardian)](/product-guide/backup-dr/repair-server/)
- [vSAN Diagnostics Guide](/product-guide/storage/vsan-diagnostics/)
- [Sizing & Hardware Requirements](/implementation-guide/sizing/)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: 2026-05-08
    - vergeOS Version: 26.0+

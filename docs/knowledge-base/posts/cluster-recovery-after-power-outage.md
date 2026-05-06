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
    - Power on **Node1** first; it will boot but halt before mounting the vSAN until it sees a peer's vote. Once Node1 has reached that wait state, power on **Node2**; once vSAN mounts, power on remaining nodes one at a time, ~1 minute apart
    - In systems with more than 2 nodes, vSAN requires at least 2 nodes online for quorum -- storage will not mount until then
    - A non-zero **Repairs** count after recovery is normal; it should decrease as Journal Walks complete
    - Engage VergeIO Support before any destructive action if anomalies persist

This article covers recovery of a VergeOS cluster after an **unplanned full power loss** -- where every host went down at once and no graceful shutdown occurred. Following the correct sequence brings nodes back online safely, restores vSAN redundancy, and verifies integrity before workloads return to service. For a *planned* shutdown, see [Proper VergeOS System Shutdown Procedure](/knowledge-base/proper-vergeos-system-shutdown-procedure/).

## Prerequisites

- Physical or IPMI/BMC access to every node
- Knowledge of which nodes are **Node1** and **Node2** (controller nodes)
- Confirmation that upstream power, networking (core fabric switches), and IPMI are restored and stable
- A recent backup or remote-replicated snapshot in case integrity issues are found
- Familiarity with the [vSAN Tier Dashboard / Journal Walks](/knowledge-base/understanding-journal-walks-and-vsan-tier-status/)
- Familiarity with [Proper Power Sequence](/knowledge-base/proper-power-sequence-for-vergeos/)

## Steps

### What to Expect

- VergeFS is designed to survive abrupt power loss. On controller startup it triggers a **Full Journal Walk** to verify each block and reconcile against peers.
- Until at least 2 nodes are online, vSAN cannot establish quorum, storage will not mount, and VMs will not start.
- Node1 will boot but halt before mounting the vSAN until Node2's vote arrives.
- Once quorum is reached, VergeOS handles vSAN reconciliation automatically -- no manual repair commands are needed.
- A non-zero **Repairs** count after recovery is normal and should decrease as the Walk progresses. A non-zero **Bad Drives** count reflects drives missing since the current Walk began (typically nodes still coming up), not physical failures.

### Pre-Power-On Checks

1. Confirm **upstream power** is stable. Bringing nodes up on an unstable feed risks a second outage mid-recovery.
2. Confirm **core network switches** are online and the inter-node fabric is up. vSAN cannot reform without it.
3. Verify **IPMI/BMC** access on each node so you can monitor boot remotely if needed.
4. Note any nodes with visible hardware faults (failed PSUs, drive LEDs, fan alarms) -- these may need attention before being added back.

### Power-On Sequence

1. **Power on Node1.**
   - Watch the console/IPMI. Node1 will boot the OS but **halt before mounting the vSAN** -- it cannot become the active controller on its own. It needs to see another controller node's vote before vSAN will mount.
   - Do not power on other nodes yet. Wait until Node1 has reached that point.
2. **Power on Node2.**
   - Once Node2 boots far enough to register its vote, Node1 proceeds, vSAN mounts, and the cluster comes online.
   - At this point the management UI becomes reachable.
3. **Power on remaining nodes one at a time, approximately 1 minute apart.**
   - Sequential, paced power-on prevents resource contention and lets each node cleanly join the existing cluster.
   - You don't need to wait for each node to show Online before powering on the next -- the 1-minute spacing is enough.
4. **Multi-cluster environments:** bring the controller cluster (containing Node1 and Node2) **fully online first**, then power on additional clusters using the same Node1 → wait-for-vSAN-mount → Node2 → remaining sequence within each.

!!! tip "Pro Tip"
    Node1 will sit and wait for a peer (Node2) before mounting the vSAN -- that wait state is the signal it's ready for the next step, not a green dashboard. vSAN can't form quorum with only one controller, which is why the cluster won't come up until Node2 is also booting. Once quorum is reached, VergeOS handles vSAN reconciliation automatically; no manual repair commands are needed.

### Post-Recovery Verification

1. **Verify vSAN health.**
   - Open the **Main Dashboard** -- all stoplights should be **Green**.
   - Navigate to **System → vSAN → Tiers** and double-click each tier.
   - Review the **Status** tile:
     - **Redundant**: should be `true`. May briefly show `false` while the Full Walk runs.
     - **Full Walk**: typically `true` immediately after recovery (controller startup triggers one).
     - **Walk Progress**: should advance over time.
     - **Repairs**: should be decreasing. A non-zero value is expected after an unplanned outage -- VergeFS is rebuilding redundancy from peers.
     - **Bad Drives**: should drop to `0` once all nodes are online. A non-zero value reflects drives missing since the current Walk began (typically tied to nodes still coming up), not physical failures.
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
      - **Solution:** Confirm at least 2 nodes are **Online** under **System → Nodes**. Confirm inter-node connectivity (core fabric switches, link state, MTU). If quorum is met but storage still won't mount, capture a sysdiag and engage support.

    - **Problem:** Repair count is stuck or growing.
      - **Solution:** A small, decreasing **Repairs** count is normal post-recovery. A count that **stops decreasing** or **grows** indicates blocks vSAN cannot reconstruct from peers. **Do not reboot any nodes.** Engage support before taking remediation steps.

    - **Problem:** Suspected split-brain or inconsistent cluster state.
      - **Solution:** If two subsets of nodes formed clusters independently during the outage (rare, but possible after prolonged network partitions), **do not attempt to merge them yourself**. Capture sysdiags from every node and engage support immediately.

## Prevention

- **UPS sizing and coverage** -- size the UPS to cover graceful shutdown duration plus margin for every node. Include core network switches in the same coverage. Test UPS runtime annually -- batteries degrade.
- **Automated graceful shutdown** -- VergeOS does not ship a built-in "shut down on power loss" signal, so this has to be driven externally. Use UPS management software (NUT, IPMI scripting, or your UPS vendor's agent on a management host) to detect a low-battery event and trigger a graceful cluster shutdown -- either via the Cluster Dashboard's **Power Off** action, the VergeOS API (`POST /v4/cluster_actions` with `action: shutdown`), or our [**VRG CLI**](https://github.com/verge-io/vrg) wrapper, which can script the same shutdown call from a Linux/macOS/Windows host. Validate the automation in a maintenance window before relying on it.
- **"On Power Loss" VM settings** -- configure each VM's behavior deliberately so post-recovery state is predictable. Three options:
    - ***Last State*** -- VM powers on only if it was on at the time of power loss
    - ***Leave Off*** -- VM stays off when power is restored, regardless of prior state
    - ***Power On*** -- VM powers on when power is restored, regardless of prior state
- **Repair server (ioGuardian)** -- a configured [repair server](/product-guide/backup-dr/repair-server/) gives VergeFS a fallback source for missing blocks if peer nodes can't supply them after an outage. It pulls needed blocks from a synchronized remote VergeOS system and is built from an existing outgoing site sync configuration. Strongly recommended for any production deployment, and often auto-created when sites are added to the dashboard.
- **Off-site snapshots** -- maintain replicated system snapshots at a remote site. If post-outage integrity issues require restoring data, a recent off-site copy is often the cleanest path back.
- **Fencing (handled internally)** -- VergeOS doesn't expose Pacemaker-style STONITH because vSAN is shared-nothing: every block is redundantly stored, and writes require quorum. A partitioned node can't commit to the authoritative copy without the controller's vote, so split-brain corruption is prevented by design rather than by an external fencing agent. The operator-facing equivalents are [**Maintenance Mode**](/product-guide/operations/maintenance-mode/) (graceful) and an IPMI-driven hard power-off for an unresponsive node, both available from the node dashboard.

## When to Engage Support

Open a support case **before** taking destructive action if any of the following are true:

- vSAN won't mount after at least 2 nodes are online and quorum should be met
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
    - Last Updated: 2026-04-27
    - vergeOS Version: 26.0+

---
title: "The System Event Log (SEL)"
description: "How to view and clear the IPMI System Event Log (SEL) on VergeOS nodes, including capacity monitoring and log management."
semantic_keywords:
  - "VergeOS system event log SEL IPMI"
  - "clear SEL hardware event log node"
  - "IPMI event log capacity full"
  - "node hardware event monitoring"
use_cases:
  - clear_node_sel_log
  - monitor_sel_capacity
  - review_hardware_events
tags:
  - sel
  - ipmi
  - hardware
  - nodes
  - logs
  - monitoring
categories:
  - System Administration
---

# The System Event Log (SEL)

The System Event Log (SEL) contains events from the hardware IPMI interface. Since this log is stored on hardware there is a limited capacity; after the SEL is full, new events cannot be recorded until it is cleared. The node dashboard displays a percentage bar to indicate the amount of SEL capacity currently used on the node.

## Clear a Node's SEL

1. From the top menu, navigate to **Infrastructure** > **Nodes**.
2. **Double-click the desired Node** to access the **Node dashboard**.
3. Click **Clear SEL** on the left menu.
4. Click **Yes** to confirm.

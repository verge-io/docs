---
title: "Intel Xeon 6 Nodes Stay at Minimum CPU Clock and Guest Write Latency Rises"
slug: xeon-6-cpu-stuck-minimum-clock
description: "On Intel Xeon 6 nodes the kernel logs \"intel_pstate: CPU model not supported\", so the VergeOS CPU Governor and Energy-Performance Policy settings have no effect, cores idle at minimum clock, and guests see high sync-write latency. A static maximum-performance BIOS power profile fixes it."
author: Carl Rodabaugh
draft: false
date: 2026-09-23
semantic_keywords:
  - "intel_pstate cpu model not supported vergeos"
  - "xeon 6 granite rapids cpu stuck at minimum clock"
  - "high vm write latency on healthy nvme vsan"
  - "cpu scaling governor performance not working"
  - "bios power profile maximum performance vergeos node"
use_cases:
  - troubleshoot_high_guest_write_latency
  - configure_bios_power_profile_for_vergeos
tags:
  - xeon 6
  - granite rapids
  - intel_pstate
  - cpu frequency
  - bios
  - power profile
  - performance
  - latency
  - troubleshooting
categories:
  - Troubleshooting
  - Performance
editor: markdown
dateCreated: 2026-09-23
---

# Intel Xeon 6 Nodes Stay at Minimum CPU Clock and Guest Write Latency Rises

## Overview

!!! info "Key Points"
    - On Intel Xeon 6 nodes, the kernel logs `intel_pstate: CPU model not supported` at boot.
    - Without that driver, the **CPU Scaling Governor** and **Energy-Performance Policy** cluster settings never reach the hardware, and idle cores sit at their minimum clock.
    - Guests feel it as high latency on small synchronous writes, even though storage and network look healthy.
    - The fix is a static maximum-performance power profile in each node's BIOS.

This article explains how to recognize the problem on Xeon 6 (Granite Rapids) hardware and how to set the BIOS so the CPUs hold their clocks.

## Symptoms

- The kernel logs this message at boot on every Xeon 6 node:

    ```
    intel_pstate: CPU model not supported
    ```

- Guest VMs show high single-threaded synchronous write latency, often 1.5 to 2 ms per small (4 KB) write, while a cluster on an older CPU generation runs the same test well under 0.5 ms.
- Storage and network look healthy: device write latency is low, the vSAN isn't throttling, and core network links show no errors.
- Latency-sensitive workloads such as RDS session hosts and file servers holding profile disks feel the slowdown most. Throughput benchmarks can still look normal.
- Changing the **CPU Scaling Governor** or **Energy-Performance Policy** makes no difference.

## Cause

VergeOS uses the kernel's `intel_pstate` driver to apply the cluster's **CPU Scaling Governor** and **Energy-Performance Policy** settings. On VergeOS 26.1 builds running the 6.6.x kernel, that driver doesn't recognize Xeon 6 processors, so it doesn't load. The settings have nothing to talk to, and the CPU falls back to its own hardware power management, which parks idle cores at minimum clock.

A single small sync write needs only microseconds of CPU at each step: the guest, the virtual disk, the vSAN, and the mirrored copy on a second node. That's too little work for the cores to ramp up, so every step runs at the low clock and the delays add up. Busy cores do ramp up, which is why throughput tests can look fine while per-write latency stays high.

!!! note "Sleep states aren't the cause"
    Disabling CPU sleep (C-states) won't help here. The cores are awake, just running slowly, so this is a clock speed (P-state) problem.

## Confirm You're Affected

1. Go to **Infrastructure → Nodes** and select a node.
2. On the node dashboard, check that **CPU** shows an Intel Xeon 6 processor, and check **Kernel Version**.

If both match and your guests show the symptoms above, apply the fix below. If you'd like help confirming, contact VergeOS support.

## Resolution

Set each node's BIOS to hold high clocks on its own, without depending on the operating system.

1. **Pick one node to start with.** Place it in maintenance mode so its workloads move to other nodes.
2. **Set a static maximum-performance power profile in the BIOS.** Choose the profile that runs the CPUs at full performance under firmware control. Avoid any profile described as "OS controlled", "OS DBPM", or "custom" power management, since those hand the job back to the missing driver. Menu names vary by vendor. These are examples only, so check your vendor's documentation for your exact model:
    - Dell PowerEdge: **System Profile** set to **Performance**
    - HPE ProLiant: **Workload Profile** set to a maximum-performance option, or **Power Regulator** set to **Static High Performance Mode**
    - Lenovo ThinkSystem: **Operating Mode** set to **Maximum Performance**
    - Supermicro: a **Maximum Performance** power or energy profile
3. **Update the BIOS and firmware** to your vendor's latest release while you're in there. Newer firmware improves how these CPUs manage power on their own.
4. **Reboot the node** and take it out of maintenance mode.
5. **Test.** Move a VM onto the updated node and rerun the same small sync-write test. Per-write latency should drop noticeably.
6. **Roll out to the remaining nodes** one at a time once the first node's numbers improve.

!!! tip "Leave the cluster settings at their defaults"
    Keep **CPU Scaling Governor** and **Energy-Performance Policy** at **Performance**. They have no effect on Xeon 6 with this kernel, but they'll take over again once a VergeOS release adds kernel support for these CPUs.

## Additional Resources

- [Cluster Settings](https://docs.verge.io/run-the-platform/system-administration/cluster-settings) (CPU Scaling Governor and Energy-Performance Policy)
- [Dashboard & System Health](https://docs.verge.io/learn-the-platform/module-9-monitoring-and-troubleshooting/01-dashboard-health) (node CPU and kernel details)

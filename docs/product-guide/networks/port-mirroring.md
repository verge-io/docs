---
title: "Port Mirroring"
description: "Enable port mirroring on a VergeOS network to replicate traffic to a VM NIC for packet analysis, monitoring, and diagnostics using North/South or East/West modes."
semantic_keywords:
  - "port mirroring network traffic replication VergeOS"
  - "mirror packets to VM NIC packet analysis"
  - "north south east west port mirroring"
  - "network traffic capture monitoring diagnostics"
use_cases:
  - enable_port_mirroring_for_diagnostics
  - capture_network_traffic_to_vm
  - monitor_north_south_traffic
  - analyze_east_west_intranetwork_traffic
tags:
  - networking
  - port-mirroring
  - monitoring
  - diagnostics
  - packet-analysis
  - traffic-capture
categories:
  - Networking
---

# Port Mirroring

Port mirroring replicates a network's traffic to a VM NIC, allowing packet analysis for monitoring or diagnostics.

## Configure Port Mirroring

1. Enable **Port Mirroring** in the network settings.
![portmirrordropdown.png](/product-guide/screenshots/portmirrordropdown.png)
    - Select ***North/South*** to copy packets that traverse the network router
    - Select ***East/West*** to copy packets that traverse the router AND all intranetwork packets
!!! warning "***East/West*** port mirroring is typically only recommended as a temporary setting for diagnostics purposes; using it for long durations can impact performance as it replicates all network traffic."

2. Click **Submit** to save the change.
3. Click **Restart** on the left menu to boot the network.
4. Create a VM that will be used for port analysis (or use an existing VM).
5. [**Add a NIC to the VM**](/product-guide/virtual-machines/vm-nics):
   - In the **Network** field, select: *NETWORKNAME*_mirror
   - Click **Submit** (bottom of page) to save
6. (Re)boot the VM.
7. Operating system/application software of choice can be used in the VM for packet analysis.

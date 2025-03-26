---
title: Network Diagnostics Guide
slug: network-diagnostics-guide
description: A guide of network diagnostic options available in the UI
author: VergeOS Documentation Team
draft: false
date: 2025-03-21T02:20:22.022Z
tags: 
  - network
  - guide
  - diagnostics
categories:
  - Network
  - Maintenance
  - System Administration
editor: markdown
dateCreated: 2025-01-01T00:00:00.000Z
---
# Network Diagnostics Guide

## Overview

This guide provides comprehensive information about the network diagnostic options available in the user interface. These diagnostic tools enable system administrators to monitor, troubleshoot, and maintain Verge deployments effectively.
	
!!! danger "Critical Warning"

    <b>The diagnostic commands detailed in this guide are powerful administrative tools. Improper usage can result in:</b>
	
    - System outages
    - Service interruptions
    - Potential data loss
	
	<b>Exercise extreme caution and ensure proper understanding before execution.</b>

## Prerequisites

To use these diagnostic tools, you must have:

- UI access to your VergeIO cluster
- Note: Tenants will have their own networking, and therefore their own Network Diagnostics page.

## Accessing Network Diagnostics / Issuing Diagnostic Commands

1. Navigate to Network Diagnostics using either method:

   - From the home screen: Select the Networks count box → Networks (left menu) → Select a network (right side of the screen) → Diagnostics
   - Alternative path: Home screen → Networks (left menu) → Select a network (right side of the screen) → Diagnostics
2. Command execution:

   - Select desired command from the dropdown menu
   - Configure available options if applicable
   - Click SEND→ to execute

!!! tip "Command Visibility"
    Enable the "Show Command" option to view the exact command being executed. This can be valuable for:
	
    - SSH execution
    - BASH script integration
    - Advanced command automation


## ARP Scan

**Purpose**:
Scans the local network using ARP (Address Resolution Protocol) packets to discover active devices.

**Details**:

   - Sends ARP requests to all possible addresses in the specified network
   - Displays MAC and IP addresses of responding devices
   - Used for network discovery and inventory

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- arp-scan -l -I [interface]
```
---

## ARP Table

**Purpose**:
Displays the current ARP cache with IP addresses instead of hostnames.

**Details**:

   - Shows the ARP table maintained by the kernel
   - The `-n` flag prevents DNS lookups (displays numeric IP addresses)
   - Lists MAC addresses associated with IP addresses the system has communicated with

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- arp -n
```
---

## DHCP Release/Renew
**Purpose**:
Releases the DHCP address for the selected interface, then attempts to renew it.

**Details**:

   - This command sequence effectively performs a "release and renew" operation for DHCP-assigned IP addresses:
   - Release the current IP address (USR2 signal)
   - Waits for 2 seconds (sleep 2)
   - Request a new IP address (USR1 signal)

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- busybox sh -c killall -USR2 udhcpc ; sleep 2 ; killall -USR1 udhcpc
```
---

## DNS Lookup

**Purpose**:
Performs DNS lookups for specified query types.

**Details**:

- Used for troubleshooting DNS issues and domain information gathering
- Common query types:
  - A: IPv4 address records
  - AAAA: IPv6 address records
  - MX: Mail exchange records
  - NS: Name server records
  - TXT: Text records
  - CNAME: Canonical name records

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- host -t Query_Type DNS_Name
```
---


## FRRouting / BGP/OSPF
**Purpose**:
Allows the configuration of FRRouting. 

**Details**:
For more information on other values and variables, refer to [FRR documentation](https://docs.frrouting.org/en/latest/basic.html) & [Configuring BGP Hold Down Timers](https://docs.verge.io/knowledge-base/adjusting-bgp-timers).

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- vtysh -c command_goes_here
```
---

## IP Commands
**Purpose**:
Allows for the configuration of IP and it's subsequent related items.

### Address

**Purpose**:
Displays and configures network interface addresses.

**Details**:

- Shows IP addresses, subnet masks, and interface states
- Displays both IPv4 and IPv6 addresses

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip address
```

### Connection Tracking

**Purpose**:
Displays the contents of Netfilter's Connection Tracking file which contains information about network connections.

**Details**:
This file displays the current state of all tracked network connections on the system.
Each line in the file represents a single tracked connection. 
The contents typically include entries with fields such as:

- Protocol (tcp, udp, icmp)
- Connection states (ESTABLISHED, TIME_WAIT, etc.)
- Source and destination IP addresses and ports
- Connection timeouts
- Packet and byte counts
- NAT information if applicable

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- dd bs=262144 count=1 if=/proc/net/nf_conntrack
```

### Link

**Purpose**:
Displays network interfaces at layer 2 (data link layer).

**Details**:
- Shows interface states, MTU values, and MAC addresses

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip link
```

### Multicast Address

**Purpose**:
Displays multicast addresses assigned to interfaces.

**Details**:
- Shows IPv4 and IPv6 multicast addresses
- Displays which interfaces are subscribed to which multicast groups
- Useful for debugging multicast routing and applications

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip maddress
```

### Multicast Routing Cache

**Purpose**:
Displays multicast routing table.

**Details**:
- Shows active multicast routes
- Includes source and group addresses
- Displays incoming and outgoing interfaces
- Useful for troubleshooting multicast routing issues

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip mroute
```

### Neighbor

**Purpose**:
Displays neighbors (ARP table) of the current device.

**Details**:
- Similar to `arp -n`.
- Shows IPv4 and IPv6 neighbors
- Includes MAC addresses and states of neighbors

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip neighbor
```

### Routing Table

**Purpose**:
Displays the IP routing table.

**Details**:
- Shows all routes currently configured on the system
- Displays default gateway, network routes, and host routes

**CLI Syntax:**
```bash
ip route show table all
```

### Rule

**Purpose**:
Displays and manipulates the routing policy database.

**Details**:
- Shows policy-based routing rules
- Allows for complex routing setups with multiple routing tables
- Used for advanced networking configurations
- Rules are evaluated in priority order (lower numbers first)

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip rule
```

### Transform (xfrm) - Policy

**Purpose**:
Displays IPSec policies.

**Details**:
- Shows security policies for IPSec communications
- Displays source, destination, protocols, and actions

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip xfrm policy
```

### Transform (xfrm) - State

**Purpose**:
Displays IPSec security associations.

**Details**:
- Shows the current security associations (SAs) for IPSec
- Displays encryption algorithms, keys, and related information
- Used in conjunction with `ip xfrm policy`

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /sbin/ip xfrm state
```
---

## IPsec
**Purpose**:
Allows for the configuration of IPsec and it's subsequent related items.

### List Cryptographic Algorithms

**Purpose**:
Lists all algorithms supported by the IPSec stack.

**Details**:
- Displays encryption, authentication, and compression algorithms
- Shows available key lengths and other parameters

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- ipsec listalgs
```

### List IKE Counters

**Purpose**:
Displays statistics and counters for IPSec connections.

**Details**:
- Shows packet counts, bytes transferred, and errors
- Useful for monitoring and troubleshooting IPSec tunnels

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- ipsec listcounters
```
### IPsec Show Config

**Purpose**:
Displays the contents of StrongSwan's VPN Configuration file which contains information about network VPN connections.

** Details**:
This file contains settings for your VPN tunnels including:

- Connection definitions
- Authentication methods
- Encryption algorithms
- Network settings
- Tunnel endpoints
- Identity information
- Secret key references

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- dd bs=262144 count=1 if=/tmp/vpn/ipsec.conf status=none
```

### Status

**Purpose**:
Displays the status of IPSec connections.

**Details**:
- Shows active IPSec tunnels and their current state
- Displays connection names, remote endpoints, and status
- Useful for quick verification of IPSec connectivity

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- ipsec status
```

### Status All

**Purpose**:
Displays detailed status of all IPSec connections.

**Details**:
- Shows comprehensive information about IPSec tunnels
- Includes encryption algorithms, key lifetimes, traffic statistics
- Displays connection policies and security associations
- Valuable for in-depth troubleshooting of IPSec issues

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- ipsec statusall
```
---

## NMAP

**Purpose**:
Network exploration and security auditing tool.

**Details**:
- Scans networks and hosts for open ports and services
- Can determine operating systems and service versions
- Supports various scanning techniques (SYN, TCP, UDP, etc.)
- Offers script-based vulnerability scanning
- Essential tool for network administrators and security professionals

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- nmap 192.168.0.1 -p22-100
```
---

## Ping

**Purpose**:
Tests connectivity to a target host.

**Details**:
- Sends ICMP Echo Request packets and waits for ICMP Echo Reply
- Measures round-trip time (latency) to the target
- Shows packet loss percentage
- Basic but essential network troubleshooting tool
- Useful for testing basic connectivity and network performance

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- busybox ping -c 1 -W 5 8.8.8.8
```
---

## Show Firewall Rules

**Purpose**:
Displays the current nftables firewall ruleset.

**Details**:
- Shows all tables, chains, and rules configured in nftables
- Replacement for the older iptables command
- Provides a comprehensive view of the firewall configuration
- Useful for troubleshooting connectivity issues and security auditing

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- nft list ruleset
```
---

## TCP Connection Test

**Purpose**:
Uses netcat to connect to checkip.dyndns.org to determine your public IP address.

**Details**:
- Establishes a TCP connection to the specified host and port
- Used to determine external IP address

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- busybox nc -w5 checkip.dyndns.org 80
```
---

## TCP Dump

**Purpose**:
Captures and displays network packets on a specific interface.

**Details**:
- There are multiple Verbose Output options
- Checking Show Link-Level Header can aid in VLAN troubleshooting
- Expressions can be used to filter the output.
	- Type qualifiers (host, net, port, portrange)
	- Direction qualifiers (src, dst)
	- Protocol qualifiers (ether, ip, ip6, tcp, udp, icmp, arp)
	- Logical operators (and, or, not)
	- Advanced filters (greater than, less than, TCP flags, byte offsets)


**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- busybox timeout 15 tcpdump -lni eth0 -c 100
```
---

## Top CPU Usage

**Purpose**:
Displays system process information in batch mode for a single iteration.

**Details**:
- Shows CPU, memory, and process details
- Useful for system monitoring and troubleshooting performance issues

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- /usr/bin/top -b -n 1
```
---

## Top Network Usage

**Purpose**:
Displays bandwidth usage on a network interface by host.

**Details**:
- Shows real-time bandwidth usage by connection
- Useful for identifying which hosts are using the most bandwidth

**CLI Syntax:**
```bash 
lxc-attach -n vnet3 -- busybox timeout 10 /usr/sbin/iftop -tNi eth0 -n
```
---

## Trace Route

**Purpose**:
Traces the route packets take to a destination.

**Details**:
- Displays each hop (router) between your computer and the destination
- Shows round-trip time for each hop
- Useful for diagnosing routing issues and network latency problems

**CLI Syntax:**
```bash
traceroute -n -w 3 google.com
```
---

## Trace/Debug Firewall Rules

**Purpose**:
Monitors and traces packets as they traverse nftables rules.

**Details**:
- Shows which rules packets match and the resulting actions
- Extremely useful for debugging complex firewall configurations
- Requires root privileges

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- busybox timeout 3 nft -nnn monitor trace
```
---

## What's My IP

**Purpose**:
Queries OpenDNS to determine your public IP address.

**Details**:
- Simple, reliable method to determine your public IP address
- Works even when HTTP-based services might be blocked

**CLI Syntax:**
```bash
lxc-attach -n vnet3 -- dig +short myip.opendns.com @208.67.222.222
```
---

## Additional Resources

- [VergeOS Documentation](https://docs.verge.io)
- [VergeOS Knowledge Base](https://docs.verge.io/knowledge-base/)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

!!! note "Document Information"

- Last Updated: 2024-03-21
- VergeOS Version: 4.13.4

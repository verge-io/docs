---
title: Deploying VergeOS Using cloud-init
slug: deploying-vergeos-using-cloud-init
description: Guide for deploying VergeOS systems using cloud-init
published: true
date: 2024-12-26
tags:
  - cloud-init
  - deployment
  - installation
  - configuration
categories:
  - Installation
  - System Administration
editor: markdown
dateCreated: 2024-12-26T16:30:00.000Z
---

# Deploying VergeOS Using cloud-init

## Overview

!!! info "Key Points"
    - VergeOS can be deployed using cloud-init
    - Only user_data is sourced for configuration
    - Variables control installation type and system settings

This guide explains how to deploy VergeOS using cloud-init

## Prerequisites

- Basic understanding of cloud-init
- Access to create cloud-init configuration files
- Hardware that meets VergeOS system requirements
- Network Requirements:
    - Two network interfaces
    - VLAN support for external and core networking
    - VLANs must be configured on the switches/network infrastructure

!!! warning "Network Requirements"
    The current cloud-init deployment method requires:

      - 2 network interfaces
      - VLAN capability for both external and core network traffic
      - Properly configured VLANs on your network infrastructure
      - 802.ad LACP for network bonding

## Configuration Variables

### Required Settings Installation
```bash
YC_INSTALL_TYPE=controller  # Options: controller, compute, scale-out
YC_VSAN_NEW=1  # Options 1=New Install and this is node1, 0=existing installation and this is node2 or greater
```

### System Settings
```bash
YC_CLOUD_NAME="cloud"            # Cloud name
YC_CLUSTER_SWAP_PER_DRIVE=1024   # Swap space per drive in MB
YC_CLUSTER_SWAP_TIER=-1          # Storage tier for swap -1 = No Swap
YC_DB_FLUSH_MS=5000              # Database flush interval
YC_NTP_SERVERS='time.nist.gov 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org'
YC_TIMEZONE="America/Detroit"    # Time Zone 
```

### Cluster Performance Settings
```bash
YC_SCALING_GOVERNOR=performance          # CPU scaling governor options: performance, ondemand
YC_SPLIT_LOCK_DETECTION=0                # Split lock detection enabled or disbaled
YC_X86_ENERGY_PERF_POLICY=performance    # Energy performance policy options: balance-performance, balance-power, normal, performance, power
```

### User and Authentication
```bash
YC_USER_EMAIL="email@example.com"    # Admin email
YC_USER_NAME="admin"                 # Admin username
YC_USER_PASSWORD="yottabyte"         # Admin password
```

### Network Configuration
When `YC_VSAN_NEW=1`, the following network settings are configured:

```bash
YC_NET_NIC1_MTU=9000                  # Physical NIC1 MTU
YC_NET_NIC2_MTU=9000                  # Physical NIC2 MTU
YC_IPV6_ENABLED=0                     # IPv6 support
YC_NET_CORE_ADDR=100.96.0.1/24        # Core network address
YC_NET_CORE_MTU=8950                  # Core network MTU
YC_NET_DMZ_ADDR=100.64.0.1/16         # DMZ network address
YC_NET_DMZ_MTU=8950                   # DMZ network MTU
YC_NET_SWITCH1_VLAN=5                 # Core Network VLAN
YC_NET_EXTERNAL1_ADDR=192.168.1.10/24 # External UI IP Address
YC_NET_EXTERNAL1_GATEWAY=192.168.10.1 # External Network Gateway
YC_NET_EXTERNAL1_DNS=1.1.1.1          # DNS servers for external network
YC_NET_EXTERNAL1_DOMAINNAME=verge.io  # Domain Name for the UI
YC_NET_EXTERNAL1_HOSTNAME=cloud1      # Cloud Name shown in UI
YC_NET_EXTERNAL1_MTU=1500             # MTU for External Network
YC_NET_EXTERNAL1_VLAN=10              # VLAN for Extneral Network
```

## Example Configuration
Node1 initial installation, External network uses DHCP and VLAN10, Core Network VLAN5:

```yaml
#cloud-config
YC_INSTALL_TYPE=controller
YC_VSAN_NEW=1
YC_CLOUD_NAME="mycloud"
YC_USER_NAME="admin"
YC_USER_PASSWORD="securepassword"
YC_USER_EMAIL="admin@example.com"
YC_NET_EXTERNAL1_ADDR="dhcp"
YC_NET_EXTERNAL1_HOSTNAME="vergeio"
YC_NET_EXTERNAL1_VLAN=10
YC_NET_SWITCH1_VLAN=5
```

Node2 installation:

```yaml
#cloud-config
YC_INSTALL_TYPE=controller
YC_VSAN_NEW=0
YC_CLOUD_NAME="mycloud"
YC_USER_NAME="admin"
YC_USER_PASSWORD="securepassword"
```


## Important Considerations

!!! warning "Critical Notes"
    - Configurations are only applied when `YC_VSAN_NEW=1`
    - The system will use performance mode by default for scaling and energy policy
    - Default networking is set to DHCP

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Unatended installation does not start
      - Solution: Ensure YC_INSTALL_TYPE is set correctly
      - Solution: Verify YC_VSAN_NEW is set to 1 if this is node1 and 0 if node2+

---

!!! note "Document Information"
    - Last Updated: 2024-12-26
    - VergeOS Version: 4.13.2
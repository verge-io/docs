# VergeOS Network Switch Configuration Guide


## Overview

This guide covers switch port configuration for VergeOS deployments. You'll configure two network types: **core fabric** (internal System/vSAN Storage) and **external** (workload connectivity). Proper switch configuration ensures optimal performance, security, and reliability.

**Target Audience:** Infrastructure and network administrators deploying VergeOS Systems

## What You'll Learn

- Configure isolated VLAN access ports for core fabric with jumbo frames
- Set up VLAN trunk ports with LACP for external networks
- Verify switch configuration and troubleshoot common issues

**Common questions answered:**

- What switch configuration does VergeOS require?
- How do I configure jumbo frames for storage traffic?
- Should I use LACP or active-backup for external networks?
- How do I isolate core fabric from external traffic?

## Time Estimate

**30-45 minutes** per switch for a 3-4 node cluster

## Quick Reference

| Network Type | Configuration | Purpose |
|--------------|--------------|---------|
| **Core Fabric** | Access port, Isolated VLANs, MTU 9216, No STP | Isolate cluster/storage traffic |
| **External** | Trunk port, Multiple VLANs, Active/Backup bonding, LACP (optional) | Workload connectivity with redundancy |

---

## Understanding Network Types

### Core Fabric Network

Private high-speed network for VergeOS cluster operations carrying vSAN storage, cluster coordination, and VM migration traffic.

**Requirements:**

- Dedicated VLANs (isolated from **ALL OTHER** networks)
- Jumbo frames (MTU 9216) for storage efficiency
- Access port configuration (single untagged VLAN per core network)
- 10Gbps or higher recommended

### External Networks

Networks connecting VMs and workloads to users, internet, and other infrastructure.

**Requirements:**

- Multiple VLANs for tenant/workload separation
- LACP bonding for redundancy (or active-backup)
- Trunk port configuration
- Standard MTU 1500 (or 9000 if workloads require)

---

## Configuration Steps

### 1. Prepare Switch

**Access the switch** via console/SSH and enter configuration mode:
```
enable
configure terminal
```

**Create VLANs:**
```
vlan 900
 name VergeOS-Core-Fabric-1
vlan 901
 name VergeOS-Core-Fabric-2
vlan 10
 name VergeOS-External-Management
vlan 20
 name VergeOS-External-Production
exit
```

**Enable jumbo frames globally** (if required by your switch):
```
system mtu jumbo 9216
```

!!! warning "MTU Size Requirement"
    VergeOS requires MTU 9216 on switch ports to accommodate the 9000-byte payload plus VLAN tags, headers, and overhead for Tenants. Setting MTU below 9216 will cause packet fragmentation and degrade storage performance.

!!! note "Vendor Variations"
    Commands shown are Cisco IOS style. Adjust syntax for Dell (OS10), HPE/Aruba, or other vendors. Core concepts remain the same across platforms.

### 2. Configure Core Fabric Ports

Configure each port connecting to node core fabric NICs as an access port with jumbo frames.

**Configuration (per core fabric port):**
```
interface GigabitEthernet1/0/1
 description VergeOS-Node1-Core-Fabric-1
 switchport mode access
 switchport access vlan 900
 mtu 9216
 spanning-tree bpduguard disable
 spanning-tree portfast disable
 no shutdown
 exit

interface GigabitEthernet1/0/2
 description VergeOS-Node1-Core-Fabric-2
 switchport mode access
 switchport access vlan 901
 mtu 9216
 spanning-tree bpduguard disable
 spanning-tree portfast disable
 no shutdown
 exit
```

**Repeat for all nodes:**

- Node1: Gi1/0/1-2
- Node2: Gi1/0/1-2
- Node3: Gi1/0/1-2

**Key settings:**

- Mode: **access** (untagged, single VLAN)
- VLAN: **900** (core fabric isolation)
- MTU: **9216** (jumbo frames for storage)
- Spanning Tree: **Disabled** (not needed for core-fabric links)

### 3. Configure External Network Ports (LACP)

For external networks, configure LACP port-channels for redundancy and bandwidth aggregation.

**Create port-channel:**
```
interface Port-channel1
 description VergeOS-Node1-External-Bond
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 no shutdown
 exit
```

**Add member ports:**
```
interface range GigabitEthernet1/0/7-8
 description VergeOS-Node1-External-Members
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 channel-group 1 mode active
 no shutdown
 exit
```

**Repeat for additional nodes** (Po2, Po3, etc.)

**Key settings:**

- Mode: **trunk** (multiple tagged VLANs)
- Allowed VLANs: **10,20** (only workload and VergeOS management VLANs)
- LACP mode: **active** (initiates negotiation)

### 4. Configure External Ports (Active-Backup Alternative)

If LACP isn't available or preferred, configure individual trunk ports without bonding.

```
interface range GigabitEthernet1/0/7-8
 description VergeOS-Node1-External-NoLACP
 switchport mode trunk
 switchport trunk allowed vlan 10,20
 switchport trunk native vlan 99
 spanning-tree portfast trunk
 no shutdown
 exit
```

!!! note
    VergeOS can handle failover in software using active-backup bonding if LACP is not available.

---

## Verification

### Check Core Fabric Configuration

```
show interfaces GigabitEthernet1/0/1 switchport
show interfaces GigabitEthernet1/0/1 | include MTU
show vlan id 900
```

**Expected results:**

- Mode: access
- VLAN: 900
- MTU: 9216

### Check External Network Configuration (LACP)

```
show etherchannel summary
show interfaces Port-channel1 trunk
```

**Expected results:**

- Port-channel status: SU (in use)
- Member ports: (P) bundled
- Allowed VLANs: 10,20
- Native VLAN: 99

### Test Connectivity After Node Connection

**Verify links are up:**
```
show interfaces status
```

**Test jumbo frames from VergeOS node:**
```bash
ping -M do -s 9188 <other-node-core-ip>
```

**Check LACP negotiation:**
```
show lacp neighbor
```

---

## Troubleshooting

| Issue | Cause | Fix |
|-------|-------|-----|
| No link on core ports | Port shutdown | `no shutdown` command |
| Slow storage performance | Jumbo frames disabled | Set MTU 9000 |
| Node can't join cluster | Wrong VLAN | Assign port to VLAN 100 |
| LACP not forming | Mode mismatch | Set `mode active` on both ends |
| VLANs not working | Not in allowed list | Add VLANs to trunk |
| Port-channel suspended | Config mismatch on members | Ensure identical config |

**Get help:**

- Review switch vendor documentation
- Contact VergeOS support with `show running-config` and `show interfaces status` output

---

## Configuration Summary

### Core Fabric Ports
- **Mode:** Access (untagged)
- **VLAN:** Dedicated (e.g., 900,901)
- **MTU:** 9216 (jumbo frames)
- **Speed:** 10Gbps+ recommended

### External Network Ports
- **Mode:** Trunk (802.1Q tagged)
- **VLANs:** Multiple allowed (e.g., 10,20,30)
- **Bonding:** LACP active mode (or active-backup)

### Save Configuration

```
copy running-config startup-config
```

---

## Next Steps

1. **Configure VergeOS Network Bonds** - Set up bonding on VergeOS side
2. **Create VergeOS Networks** - Define internal and external networks
3. **Verify Connectivity** - Test inter-node and external routing

### Additional Resources

- VergeOS Networking Architecture Overview
- Network Bonding Best Practices
- Switch vendor configuration guides

**VergeOS Support:** support@verge.io | https://docs.verge.io

---

*Last Updated: January 2025 | VergeOS v4.x | Applies to: Cisco IOS/IOS-XE, Dell OS10, HPE/Aruba*
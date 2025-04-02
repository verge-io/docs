# Standard Operating Procedure: VergeOS Installation

## Purpose
This document provides standardized procedures and best practices for VergeOS Engineers and Administrators performing an initial system installation. Use this guide as a foundation for creating your own customized procedures tailored to your specific environment.

!!! note
    This document covers checks and procedures that may not be applicable to your specific systems and scenarios. Please ensure your own Installation plan and SOP are appropriate to your needs and environment. Add space to accommodate node counts, networking configurations, and other needs.

## Objective
Completing initial installation of Node1 and Node2+, the minimum required for system redundancy and production system support.

## Preparation Steps
*Prior to scheduling installation*

- [ ] Confirm hardware meets minimum requirements
  - [ ] 64bit CPU with hardware virtualization support
  - [ ] 16GB RAM per vSAN Node available for OS
    - [ ] +1GB RAM per 1 TB Raw vSAN storage; e.g. 16GB+4GB = 20GB RAM/Node for a Node with 4TB of Raw vSAN storage
- [ ] IPMI; iDRAC, iLO, or similar
- [ ] HBA Disk Controller (Preferred)
  - [ ] if RAID controller: ensure it supports JBOD/IT mode
  - [ ] Make sure the controller supports Booting off of NVME if using them
- [ ] Networking requirements
  - [ ] 1x Physical Network Interface /Node for VergeOS UI/'External' interface
  - [ ] Second Like-type Bonded pair *Highly* Recommended for redundancy
  - [ ] 1x 10Gbps or Greater Network Interface /Node for VergeOS Core Fabric
  - [ ] Second Like-type *Highly* Recommended for redundancy (Not Bonded)
- [ ] Storage requirements
  - [ ] Tier0 Storage (Optional, Recommended)
    - [ ] NVMe-Based
    - [ ] High Write endurance (3+ Drive Writes Per Day (DWPD) recommended)
    - [ ] 5GB/1TB of usable disk in vSAN (10GB/1TB Recommended)
  - [ ] Storage Tiers (1 Required, > Optional)
    - [ ] Minimum 1 PCIe attached NVMe Storage Tier *Highly Recommended*
    - [ ] Performant to workload expectation
  - [ ] At Rest Disk Encryption
    - [ ] Read Step 18 of ['Install the Primary Controller Node'](https://docs.verge.io/implementation-guide/installation-guide/#install-the-primary-controller-node)
    - [ ] USB disk /Node for vSAN decryption key (if desired)

!!! note
    Refer to [VergeOS sizing documentation](https://docs.verge.io/implementation-guide/sizing/) for more detailed sizing recommendations as required.

- [ ] Create install media per [VergeOS documentation](https://docs.verge.io/implementation-guide/install-media/)
  - [ ] Test boot media to verify functionality
- [ ] Document all network requirements:

| Core Network VLAN1: |  |
| :---- | :---- |
| Core Network VLAN2: |  |
| External Network VLAN1: |  |
| External Network VLAN2: |  |
| UI/Management IP Range: |  |
| Gateway: |  |
| DNS Servers:  |  |

- [ ] Verify IPMI access to all nodes
- [ ] Review BIOS settings requirements
  - [ ] Proper Boot Method Selected (Legacy/Dual/UEFI) **UEFI required if all drives are NVMe**
  - [ ] Hardware assisted virtualization enabled
  - [ ] Hyperthreading enabled
  - [ ] All processor cores enabled
  - [ ] Clocks set correctly (All Nodes within seconds)
- [ ] Network documentation
  - [ ] A-B Cable Map 
  - [ ] Rack Elevation
  - [ ] Network Layer2 Design Document/Drawing
  - [ ] Network Layer3 Design Document/Drawing
- [ ] Review and fill the entire SOP Document
- [ ] Decide RAM reservation preference
  - [ ] More Usable Memory in System OR
  - [ ] More enforcement of N+1 High Availability functionality

## Pre-Installation Steps
*<24hrs prior to scheduled installation*

- [ ] Verify Current State
  - [ ] All hardware physically installed and powered
  - [ ] All network cables pass a "tug test"
  - [ ] Switch configurations complete and tested
  - [ ] Current running configuration checked and a 'write mem' completed
  - [ ] IPMI accessible on all nodes
  - [ ] Required IPs are available and pingable
  - [ ] Jumbo frames (MTU 9216+) configured on switches
- [ ] Hardware Final Check
  - [ ] All drives showing in BIOS
  - [ ] All NICs showing in BIOS
  - [ ] Confirm MACs vs records
  - [ ] Time and date correct in BIOS
  - [ ] Virtualization settings enabled
- [ ] Network Final Check
  - [ ] Core network switches responding
  - [ ] External network switches responding
  - [ ] No conflicting DHCP servers (if using DHCP)
  - [ ] Documentation available for troubleshooting

## Installation
*See [Implementation Guide](https://docs.verge.io/implementation-guide/installation-guide/) for current step-by-step*

### Primary Controller Installation

- [ ] Boot from USB installer
- [ ] Select "Standard Install"
- [ ] Select "Controller"
- [ ] Select "New Install"

### Configure System Basics

| Date/Time: |  |
| :---- | :---- |
| Timezone: |  |
| NTP Server: |  |
| System Name: |  |

### Configure Admin Account

| Username: |  |
| :---- | :---- |
| Password: | You'll really want this somewhere secure, not here. |
| Email: |  |

### Network Configuration

| Core1 Fabric: |  |
| :---- | :---- |
| NIC: |  |
| MTU: |  |
| VLAN ID: |  |

| Core2 Fabric: |  |
| :---- | :---- |
| NIC: |  |
| MTU: |  |
| VLAN ID: |  |

| External: |  |
| :---- | :---- |
| NIC (Bond): |  |
| MTU: |  |
| VLAN ID: |  |

### Storage Configuration

| Encryption [] Yes/ []No | Secure Key Location: | *e.g. 'Accounting Safe'* |


| Tier | Nodes | Disks |
| :---: | :---- | :---- |
| **0** | e.g., '1,2' | e.g.,'nvme1n1', 'nvme4', etc |
| **1** |  |  |
| **2** |  |  |
| **3** |  |  |
| **4** |  |  |
| **5** |  |  |

### First Boot Verification

- [ ] System boots to 'blue' screen at console
- [ ] UI accessible
- [ ] All status indicators green in UI
- [ ] vSAN mounted and healthy

## Secondary Controller Installation

- [ ] Boot from USB installer
- [ ] Select "Controller"
- [ ] Select "No" for new install
- [ ] Enter admin credentials from primary
- [ ] Allow network auto-detection
- [ ] Match encryption settings
- [ ] Match drive Tier assignments

### First Boot Verification

- [ ] System boots to 'blue' screen at console
- [ ] Node2 visible in UI
- [ ] All status indicators green
- [ ] vSAN status green

## Post-Installation Verification

- [ ] All nodes showing correct version
- [ ] All nodes in "Running" state
- [ ] No pending reboots
- [ ] vSAN health green across all tiers
- [ ] Core fabric connectivity verified
- [ ] External network connectivity verified
- [ ] All dashboard indicators green
- [ ] No unexpected alerts or warnings
- [ ] Verify SMTP email relay working
- [ ] All nodes can ping each other on both core 1 and core 2
- [ ] Build and Upload System Diagnostic package

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS installation, please contact [support@verge.io](mailto:support@verge.io) immediately, or call 855-855-8300 if you need immediate on-call emergency assistance. Please have your SOP ready when calling.

## Validation Log

| Test Engineer |  | Date |  |
| :---- | :---- | :---- | :---- |
| OS Version + Notes |  |  |  |

---
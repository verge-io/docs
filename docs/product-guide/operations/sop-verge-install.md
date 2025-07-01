# VergeOS Installation Guide

This guide provides standardized procedures and best practices for VergeOS Engineers and Administrators performing an initial system installation using the updated installer interface.

!!! abstract "Overview"
    Installing your VergeOS system requires careful planning and execution to ensure a successful deployment. This guide breaks down the process into main phases:

    1. **Preparation** - Steps to take before scheduling installation
    2. **Pre-Installation** - Final checks within 24 hours of installation
    3. **Installation** - The process of installing and configuring the system
    4. **Post-Installation** - Verification that the installation was successful

!!! info "Environment-Specific Requirements"
    This guide covers general best practices. You may need to adapt these steps for your specific environment and requirements. Add space to accommodate node counts, networking configurations, and other needs.

## Prerequisites

- Physical access to hardware nodes for installation
- Network infrastructure configured and ready
- IPMI/remote management access to all nodes
- VergeOS license credentials
- **Estimated time:** 4-8 hours depending on configuration complexity

## Objective

Completing initial installation of Node1 and Node2+, the minimum required for system redundancy and production system support.

## Preparation Phase

Complete these steps prior to scheduling installation:

### Hardware Requirements

- [ ] Confirm hardware meets minimum requirements

!!! note "Hardware Documentation"
    Refer to [VergeOS sizing documentation](/implementation-guide/sizing/) for current and detailed requirements.

  - [ ] **CPU Requirements:**
    - [ ] 64bit CPU with hardware virtualization support
  - [ ] **Memory Requirements:**
    - [ ] 16GB RAM per vSAN Node available for OS
    - [ ] +1GB RAM per 1 TB Raw vSAN storage; e.g. 16GB+4GB = 20GB RAM/Node for a Node with 4TB of Raw vSAN storage
  - [ ] **IPMI/Remote Management:**
    - [ ] IPMI; iDRAC, iLO, or similar
  - [ ] **Disk Controller:**
    - [ ] HBA Disk Controller (Preferred)
    - [ ] if RAID controller: ensure it supports JBOD/IT mode
    - [ ] Make sure the controller supports Booting off of NVME if using them
  - [ ] **Networking Requirements:**
    - [ ] 1x Physical Network Interface /Node for VergeOS UI/'External' interface
    - [ ] Second Like-type Bonded pair *Highly* Recommended for redundancy
    - [ ] 1x 10Gbps or Greater Network Interface /Node for VergeOS Core Fabric
    - [ ] Second Like-type *Highly* Recommended for redundancy (Not Bonded)
  - [ ] **Storage Requirements:**
    - [ ] Tier0 Storage (Optional, Recommended)
      - [ ] NVMe-Based
      - [ ] High Write endurance (3+ Drive Writes Per Day (DWPD) recommended)
      - [ ] 5GB/1TB of usable disk in vSAN (10GB/1TB Recommended)
    - [ ] Storage Tiers (1 Required, > Optional)
      - [ ] Minimum 1 PCIe attached NVMe Storage Tier *Highly Recommended*
      - [ ] Performant to workload expectation
    - [ ] At Rest Disk Encryption
      - [ ] USB disk /Node for vSAN decryption key (if desired)

### Installation Media and Documentation

- [ ] Create install media per [VergeOS documentation](/implementation-guide/install-media/)
  - [ ] Test boot media to verify functionality

- [ ] Document and Create all network requirements

!!! note "Network Documentation"
    Refer to [VergeOS network design documentation](/implementation-guide/network-design/) for current and detailed network requirements.

  - [ ] **Core Network Configuration:**
    - [ ] Core Network VLAN1 Created and Documented
    - [ ] Core Network VLAN2 Created and Documented
  - [ ] **External Network Configuration:**
    - [ ] External Network VLAN1 Created and Documented
    - [ ] External Network VLAN2 Created and Documented
  - [ ] **IP Configuration:**
    - [ ] UI/Management IP Address Allocated and Documented
    - [ ] Gateway Configuration Documented
    - [ ] DNS Servers Identified and Documented
  - [ ] **Network design/build documentation**
    - [ ] A-B Cable Map Created and Documented
    - [ ] Rack Elevation Documented
    - [ ] Network Layer 2 Design Document/Drawing Created
    - [ ] Network Layer 3 Design Document/Drawing Created

### System Access and Configuration

- [ ] Verify IPMI access to all nodes
- [ ] Review BIOS settings requirements
  - [ ] Proper Boot Method Selected (Legacy/Dual/UEFI) ***UEFI required if all drives are NVMe***
  - [ ] Hardware assisted virtualization enabled
  - [ ] Hyperthreading enabled
  - [ ] All processor cores enabled
  - [ ] Clocks set correctly (All Nodes within seconds)

### Planning Decisions

- [ ] Review the entire procedure described here
- [ ] Prepare information required to complete the entire process
- [ ] Decide RAM reservation preference: More *Usable Memory* __OR__ More *enforcement of N+1 HA*
- [ ] Plan installation timeline and communication to stakeholders

## Pre-Installation Phase

Perform these checks within 24 hours prior to scheduled installation:

### Current State Verification

- [ ] Verify Current State
  - [ ] All hardware physically installed and powered
  - [ ] All network cables pass a "tug test"
  - [ ] Switch configurations complete and tested
  - [ ] Current running network configuration checked and a "write mem" completed
  - [ ] IPMI accessible on all nodes
  - [ ] Required IPs are available and open 
  - [ ] Jumbo frames (MTU 9216+) configured on switches

### Hardware Final Check

- [ ] All drives showing in BIOS
- [ ] All NICs showing in BIOS
- [ ] Confirm MACs vs records
- [ ] Time and date correct in BIOS
- [ ] Virtualization settings enabled

### Network Final Check

- [ ] Core network switches responding
- [ ] External network switches responding
- [ ] No conflicting DHCP servers (if using DHCP)
- [ ] Documentation available for troubleshooting

## Execution Phase

### Primary Controller Installation

The actual installation process following the installer order:

- [ ] Boot from USB installer
- [ ] Select "Standard Install"
- [ ] Select "Controller"
- [ ] Select "New Install"

### System Configuration

**NTP Configuration:**

- [ ] Enter space-delimited list of NTP servers, or leave default

**Date/Time Configuration:**

- [ ] Carefully confirm current date
- [ ] Very carefully confirm current time (Node 1 controls NTP for the system) 

**System Identification:**

- [ ] Enter your System name. (This may be changed after installation)

### Admin Account Configuration

- [ ] Enter your Administrator username, or leave default
- [ ] Enter the password for your administrator account (it should be generated and stored in your password repository)
- [ ] Set the administrator account email address (optional but advised)

### Network Interface Configuration

**Core Network Interfaces:**

- [ ] Select Core1 Network Interface
- [ ] Configure Core1 Interface Name, MTU, Core (Leave "Yes"), and VLAN as required
- [ ] Select Core2 Network Interface  
- [ ] Configure Core2 Interface Name, MTU, Core (Leave "Yes"), and VLAN as required

**External Network Interface:**

- [ ] Select External Network Interface
- [ ] Configure External Network Name, MTU (Generally 1500), Core (Change to "No").
- [ ] Configure External VLAN (if required)
- [ ] Set External IP (CIDR format)
- [ ] Set External Gateway
- [ ] Set External DNS servers

### License Configuration

- [ ] Select License Server (Production or Trial/NFR)
- [ ] Enter License User credentials
- [ ] Enter License Password (store securely in password repository)

### Storage Configuration

**vSAN Encryption:**

- [ ] Choose vSAN Encryption setting (Yes/No)
- [ ] Document encryption key, if enabled (store securely in password repository)
- [ ] Create USB Encryption disk (highly recommended if using vSAN encryption)

**vSAN Disk Selection & Tier Assignment:**

- [ ] Select vSAN disks for installation
- [ ] Assign disks to appropriate storage tiers (as planned during installation prep)

**Swap Configuration:**

- [ ] Configure swap assignment as required
- [ ] After the Installer is Finished, remove the USB media
- [ ] Reboot

### Primary Node Verification

- [ ] System boots to 'blue' screen at console
- [ ] UI accessible at configured IP address
- [ ] All status indicators green in UI
- [ ] vSAN mounted and healthy

## Secondary Controller Installation

- [ ] Boot secondary node from USB installer
- [ ] Select "Controller"
- [ ] Select "No" for new install
- [ ] Enter admin credentials from primary controller
- [ ] Confirm network auto-detection (STOP if any detected IP or Interface is not as-expected!)
- [ ] Match encryption settings from primary
- [ ] Match drive Tier assignments from primary

### Secondary Node Verification

- [ ] System boots to 'blue' screen at console
- [ ] Node2 visible in primary UI
- [ ] All status indicators green
- [ ] vSAN status green across both nodes

## Post-Installation Verification

After the installation completes, verify the system is operating correctly:

### System Health Checks

- [ ] All Dashboard indicators green
- [ ] No unexpected alerts or warnings in Dashboard Logs
- [ ] All Nodes showing correct version
- [ ] All Nodes in "Running" state (check each individual node)
- [ ] No pending Node reboots
- [ ] vSAN health green across all Tiers
- [ ] Core fabric connectivity verified
- [ ] External network connectivity verified

### System Configuration Validation

- [ ] Default VM Storage Tier Set
- [ ] Cluster Target Max RAM percentage configured
- [ ] Site Syncs configured (if required)
- [ ] System Activated and up to date
- [ ] SMTP Server setup (highly recommended)
- [ ] Admin user email notifications configured

### Final Testing

- [ ] Test VM creation and basic operations
- [ ] Verify network connectivity from test VM
- [ ] Confirm snapshot functionality
- [ ] Test system backup/restore if applicable

## Troubleshooting

### Common Issues

**Boot Issues:**

- Verify BIOS boot settings match installation media type
- Check USB media functionality on known working system
- Confirm hardware compatibility with VergeOS

**Network Configuration Issues:**

- Verify VLAN configurations match network design
- Check physical cable connections and switch configurations
- Confirm IP addressing doesn't conflict with existing infrastructure

**Storage Configuration Issues:**

- Verify disk controller is in JBOD/IT mode
- Check disk visibility in BIOS
- Confirm storage tier assignments match planning documentation

**Secondary Node Join Issues:**

- Verify network connectivity between nodes
- Check admin credentials are correct
- Confirm primary node is fully operational before adding secondary

## Next Steps

After successful installation completion:

- [ ] Schedule initial system backup
- [ ] Configure monitoring and alerting
- [ ] Update network documentation with final configuration
- [ ] Plan tenant creation and resource allocation
- [ ] Schedule administrator training if needed
- [ ] Document final system configuration for operations team

!!! danger "Emergency Support"
    Should you have any issues with your VergeOS installation, please contact [our support team](/support) for immediate assistance.

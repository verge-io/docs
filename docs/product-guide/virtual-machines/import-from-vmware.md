---
title: "Importing VMs from VMware Service Backup Jobs"
description: "Guide to importing VMware virtual machines into VergeOS using the VMware service backup connector with incremental backup and minimal downtime migration."
semantic_keywords:
  - "migrate VMware VMs to VergeOS backup import"
  - "VMware service connector incremental backup"
  - "import production VMware virtual machines"
  - "VMware to VergeOS migration with minimal downtime"
use_cases:
  - import_vmware_vms_via_backup
  - migrate_production_vmware_environment
  - incremental_vmware_backup_import
  - batch_import_vmware_vms
tags:
  - virtual-machines
  - import
  - migration
  - vmware
  - backup
  - incremental
  - production
  - connector
categories:
  - Virtual Machines
---

# Importing VMs from VMware Service Backup Jobs

## Overview

!!! info "Key Points"
    - Recommended method for importing multiple production VMware VMs
    - Creates a direct agent connection to VMware environment
    - Allows synchronizing backups of running VMs
    - Supports incremental backups for efficient transfers

This guide explains how to import VMware virtual machines using VergeOS's VMware service backup functionality. This method is optimized for production environments and allows for minimal downtime during migration.

## Prerequisites

- Access to both VMware and VergeOS environments
- VMware service configured and running in VergeOS
- Sufficient storage space in VergeOS vSAN
- Network connectivity between VMware and VergeOS environments
- Appropriate permissions in both environments

## Steps

### 1. Initial Backup Process

1. **Run Initial Backup**:
   - Perform first backup while VMs are running
   - Monitor backup duration and size
   - Continue running incremental backups until backup durations stabilize

2. **Final Backup**:
   - Power down source VMs in VMware
   - Perform one final backup to capture clean state
   - Verify backup completion

### 2. Import VMs from Backup

1. Navigate to the VMware Service:
   - From the top menu, select **Import/Export**
   - Select **VMware Services**
   - Double-click appropriate VMware service

2. Access Backup Jobs:
   - Select **Backup Jobs** from left menu
   - Double-click desired backup job
   - Click **Import VMs** in left menu

3. Configure Import Settings:
   - Select/deselect VMs for import
   - Choose whether to preserve MAC addresses
   - Select preferred storage tier
   - Click **Submit** to begin import

!!! tip "Pro Tip"
    Keeping MAC addresses unchanged (default setting) helps avoid network reconfiguration in guest operating systems, as they will maintain their existing network identity.

## Advanced Options

### Storage Tier Selection

- **Default**: Uses system's default storage tier
- **Custom**: Select specific tier for imported VMs

### MAC Address Handling

- **Preserve MAC** (Default): Maintains original network identity
- **Generate New**: Creates new MAC addresses for imported VMs

## Troubleshooting

!!! warning "Common Issues"
    - **Import Failure**:
      - Solution: Verify storage space and network connectivity
    - **Slow Transfer**:
      - Solution: Check network bandwidth and consider using incremental backups
    - **VM Won't Start**:
      - Solution: Ensure VMware tools are installed and verify hardware compatibility

## Additional Resources

- [VMware Backup/DR Guide](/knowledge-base/vmwarebackupdrguide)
- [Configuring VMware Service VM NIC IPv4 Settings](/knowledge-base/vmware-service-vm-nic-ipv4-configuration/)
- [Viewing Import Jobs](/product-guide/virtual-machines/view-import-jobs)
- [Preferred Tier Usage](/knowledge-base/preferred-tier-usage)
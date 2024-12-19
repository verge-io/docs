---
title: Updating the VergeOS System
slug: updating-vergeos-system
description: A comprehensive guide on performing system updates in VergeOS environments
draft: false
date: 2024-12-19T16:30:00.000Z
tags:
  - license
  - verge
  - vergeos
  - air-gapped
  - software update
  - system update
categories:
  - System Administration
  - Software Updates
editor: markdown
dateCreated: 2024-12-19T16:30:00.000Z
---

# Updating the VergeOS System

## Overview

!!! info "Key Points"
    - System updates should be performed during a maintenance window
    - Updates can be performed with zero downtime when adequate resources are available
    - System updates are only run from the host system (top-level parent)
    - Tenant systems are automatically updated from their host system
    - Updates can be scheduled or performed on-demand
    - The system automatically handles workload migration during updates

This guide provides detailed instructions for performing system updates in VergeOS, whether on-demand or scheduled.

## Prerequisites

- Administrative access to the VergeOS Cloud Dashboard
- Adequate system resources to allow workload migration during updates
- A maintenance window (recommended, though not required due to zero-downtime capability)

## Performing On-Demand Updates

### 1. Check for Updates

1. Navigate to **System** > **Updates** in the Cloud Dashboard
2. Click **Check For Updates** in the left menu
3. Click **Yes** to confirm
    - The Packages section will show available updates
    - A cloud icon indicates downloadable packages
    - Version information displays current and available versions

### 2. Download Updates

1. Click **Download** in the left menu
2. Click **Yes** to confirm
3. Wait for the download to complete

### 3. Install Updates

1. Click **Install** in the left menu
2. Click **Yes** to confirm
3. Wait for installation to complete
    - Status will show "Idle - Reboot Required" when ready
    - The Reboot option will become enabled

!!! note
    Updates that don't include VergeOS package changes won't require full node reboots, but still need the Reboot option to apply changes.

### 4. Apply Updates

1. Click **Reboot** in the left menu
2. Click **Yes** to confirm
   - The system will process one node at a time:
     - Node enters maintenance mode
     - Workloads migrate to other nodes
     - Application restarts/node reboots
     - Node exits maintenance mode
   - Progress shows in the Status field
   - Nodes Updated status tracks completion

!!! tip
    Use **Cancel Reboot** to halt automatic reboots if needed (e.g., for workload rebalancing)

## Scheduling Updates

### 1. Create Update Task

1. Navigate to **System** > **Updates** > **Tasks**
2. Click **New** in the left menu

### 2. Configure Schedule

1. Choose scheduling option:
    - **One-time**: Keep default "Does Not Repeat"
    - **Recurring**: Select frequency (weekly, bi-weekly, monthly)
2. Set **Start Date** and time
3. For recurring tasks, optionally set end date

### 3. Configure Task Details

1. Enter required **Name**
2. Add optional **Description**
3. Select **Task Type**:
    - Choose "Download, Install, and Reboot" for complete update
4. Optional: Enable **Delete After Running**
5. Click **Submit** to save

## Best Practices

- Schedule updates during low-usage periods and during maintenance windows
- Ensure adequate system resources for workload migration
- Monitor system during update process
- Keep regular backups before major updates
- Review available updates before applying

## Troubleshooting

!!! warning "Common Issues"
    - **Issue:** Workloads fail to migrate
      - **Solution:** Verify adequate resources on target nodes

    - **Issue:** Update process hangs
      - **Solution:** Check system logs and contact support if needed
    
    - **Issue:** Node fails to rejoin after reboot
      - **Solution:** Review logs and network connectivity

## Feedback

!!! question "Need Help?"
    If you encounter any issues during the update process or have questions, please reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: 2024-12-19
    - VergeOS Version: All
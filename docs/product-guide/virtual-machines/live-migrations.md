# Live Migrations

## Overview

Live migration in VergeOS allows you to move running workloads between nodes without service interruption. This includes both VM migrations and virtual disk migrations.

!!! info "Automatic Migrations"
    VergeOS automatically handles migrations during:
    - System updates
    - Node maintenance operations (Maintenance Mode)
    - Resource rebalancing after HA events

## Prerequisites

- Adequate system resources on target node(s)
- Network connectivity between source and target nodes
- Sufficient storage space for disk migrations
- Proper permissions to perform migrations

## VM Live Migration

### Single VM Migration

1. Navigate to VM Dashboard:
   - Access the individual **VM dashboard**
   - Click **Migrate** from left menu

2. Configure Migration:
   - Choose migration target:
     - **Auto** (default): System selects optimal target node
     - **Specific Node**: Manually select target node
   - Click **Migrate** to start process

3. Monitor Progress:
   - Watch status field for migration progress
   - Status will return to "Running" when complete
   - Host Node field will update to show new location

### Multiple VM Migration

1. Access VM Listing:
   - Navigate to **Machines > Virtual Machines**
   - Select desired VMs (checkmark indicates selection)

2. Initiate Migration:
   - Click **Migrate** button
   - Choose target option:
     - **Auto**: System distributes VMs across available nodes
     - **Specific Node**: Select target node (may not accommodate all VMs)

3. Track Progress:
   - Monitor status column for each VM
   - Progress percentage displayed during migration
   - Host Node field updates upon completion

## Virtual Disk Live Migration

### Moving Drives Between Storage Tiers

1. Access Drive Settings:
   - Navigate to VM dashboard
   - Click **Drives** on left menu
   - Select the drive to migrate
   - Click **Edit** on left menu

2. Configure New Tier:
   - Select desired storage tier from dropdown
   - Click **Submit** to initiate migration

3. Monitor Migration:
   - Wait for vSAN repairs to complete on new tier
   - Check storage dashboard for repair status
   - Verify drive is accessible on new tier

!!! warning "Storage Performance Impact"
    Moving drives between tiers may temporarily impact storage performance during the migration process.

## Troubleshooting

Common migration issues and solutions:

1. **Failed Migration**
   - Verify resource availability
   - Check network connectivity
   - Review system logs

2. **Slow Migration**
   - Check network bandwidth
   - Verify storage performance
   - Reduce concurrent migrations

3. **Stuck Migration**
   - Review migration logs
   - Check for resource constraints
   - Contact support if persistent

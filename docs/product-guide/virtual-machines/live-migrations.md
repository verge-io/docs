# Live Migrations

Live Migrations in VergeOS allows you to move running VMs between nodes and virtual disks between storage tiers without service interruption.

## Overview

### Virtual Machine (VM) Migration

- Move individual or multiple running VMs between nodes while maintaining service
- Automatically preserve VM state, memory contents, and active connections  
- Choose between automatic node selection or specify target nodes
- Monitor migration progress in real-time through the VM dashboard
- Support for both single VM and bulk VM migrations

### Virtual Disk Migration

- Move virtual disks between different storage tiers while VMs remain operational
- Seamlessly transfer data with automatic vSAN repair processes
- Maintain data integrity and accessibility throughout migration
- Support for adjusting storage performance by moving drives between tiers

These capabilities are integral to VergeOS's infrastructure management, enabling:

- System maintenance without downtime
- Resource optimization
- High availability operations
- Storage performance tuning

VergeOS live migration automatically manages resource allocation, network connectivity, and storage synchronization to ensure smooth transitions between nodes and storage tiers while maintaining workload availability.

!!! info "VergeOS automatically handles VM live migrations during"
    - System updates
    - Node maintenance operations (Maintenance Mode)

!!! note "HA Events"
    After an HA event, VergeOS will automatically start affected VMs on other available nodes.

## Prerequisites

Before performing any live migration, ensure:

- Adequate system resources are available on target node(s)
- Sufficient storage space is available for disk migrations
- You have proper permissions to perform migrations
- Nested virtualization live migration is enabled at the cluster level (if using nested VMs)
- vGPU live migration is enabled at the cluster level (if using vGPU devices)

## Cluster Configuration for Live Migration

### Nested Virtualization Live Migration

To enable live migration for VMs running with nested virtualization:

1. Navigate to **Clusters > [Cluster Name] > Edit**
2. Find the "Allow Nested Virtualization Live Migration" setting
3. Enable the checkbox
4. Click **Save** to apply changes

This allows VMs with nested virtualization enabled to be live migrated between nodes while maintaining hardware acceleration.

### vGPU Live Migration (Experimental)

!!! note "This only applies to Versions of VergeOS 4.13 or later"

To enable live migration for VMs using vGPU devices:

1. Navigate to **Clusters > [Cluster Name] > Edit**
2. Find the "Allow vGPU Live Migration" setting
3. Enable the checkbox
4. Click **Save** to apply changes

!!! warning "vGPU Migration Considerations"
    - This feature is experimental
    - If insufficient vGPU devices are available on the target node, workloads may be temporarily powered off during maintenance
    - Ensure target nodes have compatible vGPU

## VM Live Migration

!!! note "VMs that cannot be migrated"
    VMs with attached vGPU/PCI passthrough, USB passthrough, and SR-IOV NICs cannot be live migrated.

### Single VM Migration

1. Navigate to the individual **VM dashboard**
2. Click **Migrate** from the left menu
3. Choose your migration target:
    - **Auto** (default): System selects optimal target node
    - **Specific Node**: Manually select target node
4. Click **Migrate** to begin the process
5. Monitor the status field for migration progress:
    - Status will return to "Running" when complete
    - Host Node field will update to show new location

### Multiple VM Migration

1. Navigate to **Machines > Virtual Machines**
2. Select desired VMs (checkmark indicates selection)
3. Click the **Migrate** button
4. Choose your target option:
    - **Auto**: System distributes VMs across available nodes
    - **Specific Node**: Select target node (may not accommodate all VMs)
5. Monitor the status column for each VM:
    - Progress percentage displays during migration
    - Host Node field updates upon completion

## Virtual Disk Live Migration

### Moving Drives Between Storage Tiers

!!! note "This only applies to Versions of VergeOS 4.13 or later"

1. Access drive settings:
    - Navigate to VM dashboard
    - Click **Drives** on left menu
    - Select the drive to migrate
    - Click **Edit** on left menu

2. Configure new tier:
    - Select desired storage tier from dropdown
    - Click **Submit** to initiate migration

3. Monitor migration:
    - Wait for vSAN repairs to complete on new tier
    - Check storage dashboard for repair status
    - Verify drive is accessible on new tier

!!! warning "Storage Performance Impact"
    Moving drives between tiers may temporarily impact storage performance during the migration process.

## Troubleshooting

### Common Issues and Solutions

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

### Best Practices

- Perform migrations during off-peak hours when possible
- Avoid migrating too many VMs simultaneously
- Monitor system resources during migrations
- Keep network paths between nodes optimized
- Maintain adequate free space on storage tiers

# vSAN Deletion Process

## Overview

Understanding how VergeOS vSAN handles data deletion is crucial for storage management and capacity planning. The vSAN employs a sophisticated deletion process that prioritizes data integrity while efficiently reclaiming storage space through its block-level architecture.

## Architecture Foundation

### Block-Level Operations

VergeOS vSAN manages data at the block level:

- **Data Segmentation**: VM disks are divided into multiple blocks of optimized size
- **Hash Identification**: Each block receives a unique cryptographic hash value
- **Distributed Storage**: Blocks are distributed across nodes using hash-based algorithms
- **Redundancy**: Both primary and redundant copies are maintained for data protection

### Reference Management

The system tracks data usage through:

- **Hash Map Structure**: Maps block hashes to physical locations and metadata
- **Reference Counting**: Tracks how many objects reference each block
- **Deduplication Tracking**: Manages shared blocks across multiple VMs and snapshots

## Deletion Process

### Immediate Actions

When you delete a VM, drive, or other storage object:

1. **Validation**: System verifies the object can be safely deleted
2. **Reference Removal**: All references to the object are removed from the hash map
3. **Metadata Update**: Object metadata is marked for cleanup
4. **UI Response**: Interface immediately reflects the deletion and "frees" the space

!!! info "Immediate vs. Actual Reclamation"
    The UI shows space as "freed" immediately for capacity planning purposes, but physical space reclamation occurs through background processes.

### Reference Counting System

The vSAN uses intelligent reference management:

- **Decrement Counters**: When an object is deleted, reference counts for its blocks are decremented
- **Shared Block Protection**: Blocks shared by multiple objects (through deduplication) remain protected
- **Zero Reference Marking**: Only blocks with zero references are marked for physical deletion

### Background Cleanup Operations

Physical space reclamation happens through automated background processes:

#### vSAN Walk Process

- **Periodic Scanning**: System regularly scans the entire vSAN for unreferenced blocks
- **Block Validation**: Verifies blocks marked for deletion have no remaining references
- **Hash Verification**: Ensures data integrity throughout the cleanup process

#### Garbage Collection

- **Space Reclamation**: Physically frees storage space from unreferenced blocks
- **Defragmentation**: Optimizes storage layout for improved performance
- **Metadata Cleanup**: Removes obsolete entries from system databases

## Deletion Scenarios

### Virtual Machine Deletion

When deleting a VM:

1. **Prerequisites**: VM must be powered off
2. **Drive Processing**: All VM drives are processed for deletion
3. **Snapshot Handling**: VM-specific snapshots are also deleted
4. **Cloud Snapshot Preservation**: VM remains available in existing cloud snapshots

!!! warning "VM Deletion Requirements"
    VMs must be powered down before deletion. The system prevents deletion of running VMs to ensure data consistency.

### Drive Deletion

For individual drive deletion:

1. **Offline Requirement**: Drive must be offline (VM powered off or hotplug used)
2. **Reference Check**: System verifies no other objects reference the drive
3. **Block Processing**: Drive blocks are marked for cleanup based on reference counts

### Snapshot Deletion

Snapshot deletion involves:

- **Incremental Processing**: Only unique blocks in the snapshot are processed
- **Shared Block Preservation**: Blocks shared with other snapshots or active VMs remain protected
- **Metadata Cleanup**: Snapshot-specific metadata is removed

## Impact on Storage Capacity

### Deduplication Effects

Due to block-level deduplication:

- **Shared Blocks**: Multiple objects may share identical blocks
- **Gradual Reclamation**: Storage space recovery may be gradual as shared blocks are slowly dereferenced
- **Efficiency Optimization**: System prioritizes data integrity over immediate space reclamation

### Capacity Monitoring

Track deletion impact through:

- **Storage Tier Dashboards**: Monitor capacity changes over time
- **vSAN Diagnostics**: View background operation progress
- **Deduplication Ratios**: Understand space sharing effects

## Best Practices

### Planning Deletions

!!! tip "Optimization Tip"
    For large-scale deletions, consider the impact on deduplication ratios and plan accordingly. The vSAN's intelligent cleanup process ensures optimal storage utilization while maintaining data integrity.

1. **Batch Operations**: Group related deletions to optimize cleanup efficiency
2. **Timing Considerations**: Schedule large deletions during maintenance windows
3. **Capacity Monitoring**: Monitor storage trends after deletions

### Monitoring Cleanup

1. **Dashboard Review**: Regularly check storage tier utilization
2. **Log Monitoring**: Review system logs for cleanup operation status
3. **Performance Impact**: Monitor system performance during cleanup operations

### Troubleshooting

If storage space doesn't appear to be reclaimed:

1. **Check Background Operations**: Verify vSAN walk processes are running
2. **Review Deduplication**: Understand shared block relationships
3. **Monitor System Logs**: Look for cleanup operation messages
4. **Contact Support**: For persistent issues or clarification

## Safety Mechanisms

### Data Protection

The deletion process includes multiple safety features:

- **Reference Validation**: Multiple checks ensure blocks aren't prematurely deleted
- **Redundancy Preservation**: Maintains data copies during cleanup operations
- **Rollback Capability**: Cloud snapshots provide recovery options

### Integrity Maintenance

- **Hash Verification**: Continuous validation of block integrity
- **Consistency Checks**: Ensures metadata remains synchronized
- **Error Recovery**: Automatic recovery from cleanup operation failures

## Related Topics

- [Storage Tiers](/product-guide/storage/storage-tiers) - Understanding vSAN tier architecture
- [vSAN Architecture](/product-guide/storage/vsan-architecture) - Detailed technical architecture
- [Cloud Snapshots](/product-guide/backup-dr/cloud-snapshot-restore) - Snapshot management and recovery



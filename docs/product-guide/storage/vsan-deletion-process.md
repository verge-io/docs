---
title: "vSAN Deletion and Storage Reclamation"
description: "Understand how VergeOS reclaims storage when VMs, drives, files, NAS volumes, and tenants are deleted, including reference counting, deduplication, garbage collection, and reclamation timing."
semantic_keywords:
  - "vSAN deletion process, storage reclamation, garbage collection"
  - "reference counting, block deduplication, vSAN walk cleanup"
  - "delete VM storage, tenant deletion storage, free disk space after delete"
  - "slow reclamation troubleshooting, snapshot preventing space free"
use_cases:
  - storage_management
  - capacity_planning
  - troubleshooting
  - tenant_management
  - administration
tags:
  - vsan
  - storage
  - deletion
  - garbage-collection
  - reclamation
  - reference-counting
  - deduplication
  - snapshots
  - tenants
categories:
  - Storage
---

# vSAN Deletion and Storage Reclamation

When you delete a VM, drive, file, NAS volume, or tenant in VergeOS, the underlying storage is not freed instantly. This page explains how the vSAN reclaims space and what factors affect reclamation timing.

## How Deletion Works

Every deletion in VergeOS -- whether a VM, drive, file, or tenant -- follows the same three-phase process:

### 1. Reference Removal

The system removes references to the deleted object's data blocks from the vSAN hash map. Each block maintains a **reference count** tracking how many objects use it. Deleting an object decrements the reference count on each of its blocks.

### 2. Deduplication Evaluation

Because the vSAN uses **block-level deduplication**, multiple objects can share identical blocks. A block is only marked for reclamation when its reference count reaches **zero** -- meaning no VM, drive, file, snapshot, or tenant still references it.

**Example:** If VM-A and VM-B both use an identical Windows base image, deleting VM-A decrements the reference count on shared blocks but frees zero physical space because VM-B still references them.

### 3. Garbage Collection (vSAN Walk)

A background process called the **vSAN walk** scans for blocks with zero references and reclaims the physical storage. Walk frequency and progress can be monitored through [vSAN Diagnostics](/product-guide/storage/vsan-diagnostics).

!!! note "Immediate vs. Actual Reclamation"
    The VergeOS UI reports space as freed immediately after deletion, but **physical reclamation happens during background vSAN walk operations**. This is why storage utilization may not decrease right away.

!!! warning "Snapshots Prevent Space Reclamation"
    System snapshots that reference deleted objects keep those blocks alive. Space is only freed after the snapshots containing those references are also deleted or expire. This is the most common cause of unexpectedly slow reclamation.

## Deletion by Object Type

Each section below covers what is unique to that object type. The core mechanism (reference removal, deduplication evaluation, garbage collection) described above applies to all of them.

### VM and Drive Deletion

- Deleting a VM removes all references from its virtual drives.
- **VM-level snapshots** are deleted along with the VM.
- The VM remains in any **system-level snapshots** taken while it existed. Those snapshot references prevent block reclamation until the system snapshots are removed or expire.

### File Deletion (ISOs, Disk Images, Media)

- Files stored on the vSAN (ISOs, imported disk images, Cloud-Init files) follow the same reference counting process.
- A file **cannot be deleted** while it is still referenced by a VM drive. Remove the drive association first, or use the **Delete Reference** action to clear the association.
- Directory-type files are deleted recursively.

For more detail on file management, see [Uploading Files to vSAN](/product-guide/storage/uploading-files-to-vsan).

### NAS Volume Deletion

- Deleting a NAS volume removes references for all files and directories within the volume.
- NAS volumes that are shared via CIFS or NFS should have active connections terminated before deletion.
- As with other deletions, blocks shared with other volumes or snapshots are retained until all references are cleared.

For NAS configuration, see [NAS Overview](/product-guide/nas/overview).

### Tenant Deletion

Tenants are complete [virtual data centers](/product-guide/tenants/overview) with their own VMs, drives, files, and storage allocations. At the vSAN storage layer, tenant data resides in the same block pool as the parent system, which means deduplication and reference counting operate across tenant boundaries.

#### Prerequisites

- **Power off** the tenant and its tenant networks before deletion.
- All tenant nodes must be offline.

#### What Happens During Tenant Deletion

1. All tenant VMs, drives, files, and metadata references are removed.
2. Tenant storage tier allocations are released back to the parent vSAN.
3. The standard garbage collection process reclaims unreferenced blocks.

#### Nested Tenants

For tenants hosting sub-tenants, the cleanup process works from the innermost tenant outward. Each level follows the same deletion mechanism.

#### Tenant Restore After Deletion

Restoring a deleted tenant from a system snapshot recreates references to previously deleted blocks. This means storage usage may increase when a tenant is restored, and blocks that were pending garbage collection become active again.

### Tenant Storage Tier Removal

Removing a provisioned storage tier from a tenant (without deleting the tenant itself) requires a different approach:

1. **Migrate all data** off the tier before removal -- VMs, drives, and files must be moved to other tiers.
2. Remove the tier allocation from the tenant.
3. Garbage collection reclaims the freed blocks.

!!! warning "Data Migration Required"
    Unlike complete tenant deletion, removing a storage tier requires **manual data migration** to other tiers before the tier can be deprovisioned from the tenant.

## Shared Objects and Cross-Tenant References

- **Files shared between parent and tenant** maintain additional block references. These references must be cleared before those blocks can be reclaimed.
- **Shared VM snapshots** similarly prevent block cleanup until the shared object is removed from both sides.

Consider shared objects when estimating reclamation timing.

## Reclamation Timing

| Scenario | Typical Reclamation Timeframe |
|----------|-------------------------------|
| Small VM deletion (few GB, no shared blocks) | Minutes to tens of minutes |
| Large VM or tenant deletion (hundreds of GB+) | Hours, depending on vSAN walk progress |
| Deletion with active snapshots referencing data | No reclamation until snapshots expire or are deleted |

Exact timing depends on cluster size, vSAN load, and the volume of unreferenced blocks. Monitor progress through [vSAN Diagnostics](/product-guide/storage/vsan-diagnostics).

## Monitoring Reclamation

Track deletion progress through the parent system:

- **Storage Dashboard** -- watch overall tier utilization trending downward after deletion.
- **[vSAN Diagnostics](/product-guide/storage/vsan-diagnostics)** -- monitor vSAN walk status and progress.
- **System Logs** -- review deletion and cleanup events.

## Troubleshooting Slow Reclamation

If storage space is not decreasing after a deletion:

1. **Check for system snapshots** -- snapshots containing the deleted object prevent reclamation. Review snapshot schedules and expiration policies.
2. **Check for shared objects** -- files or VM snapshots shared with tenants maintain block references.
3. **Monitor the vSAN walk** -- use [vSAN Diagnostics](/product-guide/storage/vsan-diagnostics) to confirm the walk is progressing and not stalled.
4. **Review system logs** -- look for vSAN operation errors that may indicate a problem with the cleanup process.

## Related Documentation

- [vSAN Architecture](/product-guide/storage/vsan-architecture)
- [vSAN Diagnostics](/product-guide/storage/vsan-diagnostics)
- [Storage Tiers](/product-guide/storage/storage-tiers)
- [Snapshots Overview](/product-guide/backup-dr/snapshots-overview)
- [Tenants Overview](/product-guide/tenants/overview)

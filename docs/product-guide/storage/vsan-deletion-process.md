# VergeOS vSAN Deletion Process - Comprehensive Guide

## Block-Level Architecture Foundation

VergeOS vSAN operates on a **block-level architecture** where:

- VM and Tenant disks are divided into multiple blocks
- Each block receives a unique cryptographic hash
- Blocks are distributed across nodes using hash-based algorithms
- Both primary and redundant copies are maintained
- **Tenants operate as LXC containers** with their own storage allocations within the parent vSAN

## How Deletion Works

### 1. **Reference Counting System**

When you delete a VM, drive, or tenant in VergeOS:

- The system doesn't immediately delete the actual data blocks
- Instead, it removes the references to those blocks from the hash map
- Each block maintains reference counts tracking how many objects use it
- **Tenant storage follows the same reference counting** as individual VMs, but operates within LXC container boundaries

### 2. **Deduplication Impact**

Since VergeOS uses **block-level deduplication**:

- Multiple VMs may share identical blocks (same hash)
- **Tenant storage can share blocks with parent system or other tenants**
- Deleting one VM or tenant only decrements the reference count
- Blocks are only marked for deletion when reference count reaches zero

### 3. **Garbage Collection Process**

The actual deletion happens through background processes:

- **vSAN Walk**: The system periodically scans for unreferenced blocks
- Blocks with zero references are marked for reclamation
- Physical storage space is then freed and made available
- **Tenant deletions trigger the same garbage collection** as VM deletions

### 4. **Immediate vs. Actual Reclamation**

- **Immediate**: UI shows space as "freed" immediately
- **Actual**: Physical space reclamation happens during background vSAN operations

!!! note "Storage Reclamation Timing"
    This is why you might not see storage space decrease immediately after deletion

## Drive/VM Deletion

When you delete a VM or drive:

1. References are removed from the system
2. Hash map entries are updated
3. Background processes handle actual block cleanup

#### **Snapshots and Deletion**

1. Deleting a VM also deletes its VM snapshots
2. However, the VM remains in cloud snapshots taken while it existed

## Tenant Deletion Scenarios

### **Complete Tenant Deletion**

When deleting a Tenant:

1. All tenant VMs, drives, and metadata references are removed
2. **Tenant storage tiers** are dereferenced from the parent vSAN
3. **LXC container filesystem and allocated storage** are cleaned up
4. Hash map entries for all tenant blocks are updated
5. Background processes handle block cleanup across all tenant data

### **Tenant Storage Tier Deletion**

When removing a provisioned storage tier from a tenant:

1. **All data must be migrated off the tier** before removal (VMs, drives, files)
2. **Tenant storage tier allocation is removed** from the parent vSAN provisioning
3. **Volume tier throttling controls are released** for that specific tier
4. Hash map entries for tenant blocks on that tier are updated
5. Background processes handle block cleanup for the removed tier allocation

!!! warning "Data Migration Required"
    Unlike complete tenant deletion, removing a storage tier requires **manual data migration** to other tiers before the tier can be deprovisioned from the tenant.

## Key Considerations

### **VM/Drive Deletion Within Tenants**

When deleting VMs or drives inside a tenant:

1. References are removed from tenant's local hash map
2. **Parent vSAN hash map entries are also updated**
3. Background processes handle actual block cleanup

### **Tenant vs. Parent vSAN Relationship**

- **Tenants operate as LXC containers within the parent vSAN** - they don't have separate vSANs
- Tenant storage is allocated from parent vSAN tiers through container filesystem layers
- **Block deduplication works across tenant boundaries** and between containers
- Parent system manages all physical storage cleanup for tenant containers

### **Snapshots and Tenant Deletion**

- Deleting a tenant also deletes its local VM snapshots
- **Tenant remains in parent cloud snapshots** taken while it existed
- **Cloud snapshots can prevent immediate storage reclamation**
- Tenant can be restored from cloud snapshots even after deletion

### **Shared Objects and File Sharing**

- **Files shared between parent and tenant** may maintain references
- Shared VM snapshots can prevent complete storage cleanup
- **Media images provided to tenants** create additional block references
- Consider shared objects when estimating storage reclamation

### **Tenant Storage Isolation**

- Each tenant has **dedicated storage volumes** with encryption support within their LXC container
- **Network and administrative separation** doesn't affect vSAN block sharing between containers
- Storage isolation is logical through LXC containerization, not physical at the block level
- **Container filesystem layers** provide tenant separation while sharing underlying blocks

## Advanced Tenant Deletion Scenarios

### **Nested Tenant Deletion**

For tenants that host their own sub-tenants:

- Sub-tenants operate as **nested LXC containers**
- Sub-tenant deletion follows same reference counting within container hierarchy
- **Parent tenant container manages sub-tenant storage cleanup**
- Multiple layers of containerization and reference counting may apply
- Cleanup processes work from innermost to outermost container

### **Tenant Restore Impact on Deletion**

- **Restoring deleted tenants from cloud snapshots** recreates references
- Previously "deleted" blocks may become active again
- **Storage usage may increase** when restoring tenants
- Background cleanup processes adapt to restored references

## Safety Mechanisms

### **Data Integrity During Tenant Deletion**

- The system maintains data integrity during all deletion operations
- **Redundant copies ensure no data loss** during tenant cleanup
- Hash validation prevents accidental deletion of referenced blocks
- **Cross-tenant block sharing is preserved** until all references are removed

### **Tenant Deletion Prerequisites**

- **Tenant LXC container must be powered off** before deletion
- All tenant nodes must be offline
- **Cannot delete the original tenant node** while tenant container is active
- System validates no active references before allowing container deletion

## Monitoring Tenant Storage Deletion

You can monitor the process through:

### **Parent System Monitoring**
- **Storage dashboard** for overall tier utilization
- **vSAN diagnostics** for background operation status
- **System logs** for tenant deletion and cleanup details
- **Tenant statistics** showing storage consumption trends

### **Tenant-Level Monitoring** (before deletion)
- **Tenant dashboard** for internal storage usage
- **Tenant history** for consumption statistics
- **Internal vSAN statistics** within tenant environment

### **Post-Deletion Verification**
- **Storage tier utilization** should decrease over time
- **vSAN walk statistics** show cleanup progress
- **Reference count verification** through vSAN diagnostics

## Troubleshooting

### **Troubleshooting Slow Reclamation**

- Check for **remaining cloud snapshots** containing tenant data
- Verify **shared objects** are properly cleaned up
- Review **system logs** for vSAN operation errors
- Use **vSAN diagnostics** to monitor cleanup progress

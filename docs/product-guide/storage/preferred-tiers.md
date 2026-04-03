---
title: "Preferred Tier"
description: "How to configure the Preferred Tier setting in VergeOS to control which vSAN storage tier is targeted first for data placement, including fallback behavior and live tier migration."
semantic_keywords:
  - "preferred tier setting, storage tier selection, tier placement policy"
  - "vSAN tier fallback, automatic tier failover, tier priority order"
  - "change storage tier, live tier migration, move data between tiers"
  - "VM drive tier, file tier, NAS volume tier, tenant tier restrictions"
use_cases:
  - tier_configuration
  - storage_management
  - capacity_planning
  - administration
tags:
  - vsan
  - storage
  - tiering
  - preferred-tier
  - performance
  - capacity
categories:
  - Storage
---

# Preferred Tier

The **Preferred Tier** setting controls which [vSAN storage tier](/product-guide/storage/storage-tiers) the system targets first when writing data for a given object. It is available when creating or editing VM drives, uploading files, provisioning tenant storage, and configuring NAS volumes.

## How It Works

When data is written, the vSAN attempts to place it on the preferred tier. If that tier is offline, degraded, or has insufficient free space, the system falls back automatically using the following logic:

1. **Try the preferred tier** (e.g., Tier 4).
2. **Fall back to the next less expensive tier** (higher-numbered). If Tier 4 is unavailable, try Tier 5.
3. **Continue to the next less expensive tier** if available.
4. **If no less expensive tier is available**, fall back to the next more expensive tier (lower-numbered) -- Tier 3, then Tier 2, then Tier 1.

This ensures data is always placed on an available tier, even when the preferred tier cannot accept new writes.

![Preferred tier fallback: Tier 4 selected, system falls back to Tier 5, then Tier 3, then Tier 2, then Tier 1](/product-guide/screenshots/preferredtier.png)

## Default Behavior

When no preferred tier is explicitly set (the **Default** option), the system selects a tier based on system-level defaults and any tenant-level storage policies. In most environments, this places data on the lowest-numbered (highest-performance) tier that has available capacity and that the tenant is permitted to use.

## Where to Configure Preferred Tier

### VM Drives

1. Navigate to the **VM dashboard** for the target virtual machine.
2. Select **Drives** from the left menu.
3. Click **New** to create a drive, or select an existing drive and click **Edit**.
4. Set the **Preferred Tier** dropdown to the desired tier (1--5) or leave it at **Default**.
5. Click **Submit**.

Changing the preferred tier on an existing VM drive triggers a background migration of that drive's data to the new tier. The VM remains running and accessible during migration.

### File Uploads (Media Images)

1. Navigate to **Media Images** from the main menu.
2. Click **New** to upload a file.
3. In the upload dialog, set the **Preferred Tier** to the desired tier or leave it at **Default**.
4. Complete the upload.

To change the tier of an existing file, select the file, click **Edit**, and update the **Preferred Tier** setting. The system migrates the file data in the background.

### NAS Volumes

1. Navigate to **NAS** > **Volumes**.
2. Select an existing volume and click **Edit**, or click **New** to create a volume.
3. Set the **Preferred Tier** to the desired tier.
4. Click **Submit**.

### Tenant Storage

When provisioning storage for a tenant, the preferred tier can be set on the tenant's storage allocation. Tenants may also have tier restrictions that limit which tiers they can use. If a tenant requests a tier they are not authorized for, the system rejects the request and falls back to an authorized tier.

## Live Tier Migration

Both VM drives and files support live tier migration. When you change the preferred tier on an existing object:

- Data is moved in the background without interrupting read or write access.
- Migration consumes I/O bandwidth, so plan large migrations during periods of lower activity when possible.
- To reverse a migration, change the preferred tier back to the original value.

!!! tip "Check capacity before migrating"
    Verify that the destination tier has sufficient free space before changing the preferred tier. Use the vSAN dashboard to review per-tier utilization. See [Capacity Planning](/product-guide/storage/capacity-planning) for guidance on monitoring and managing tier capacity.

## Related Documentation

- [**Storage Tiers**](/product-guide/storage/storage-tiers): Understand how vSAN tiers are structured, numbered, and assigned to physical drives.
- [**Capacity Planning**](/product-guide/storage/capacity-planning): Monitor tier utilization and plan for growth.
- [**Storage Overview**](/product-guide/storage/overview): Return to the storage landing page.

---
title: Recovering a Single VM from Inside a Tenant at Your DR Site
slug: per-vm-dr-recovery-tenant-level-sync
description: A host-level site sync replicates a tenant as one object, so there is no single VM to pull out of it at the DR site. Sync at the tenant level when you need per-VM recovery, especially when the DR system is smaller than production.
author: VergeOS Documentation Team
draft: false
date: 2026-07-31T00:00:00.000Z
semantic_keywords:
  - "recover one VM from a tenant at the DR site"
  - "site sync host level or tenant level which to choose"
  - "tenant will not power on at DR site not enough RAM"
  - "restore single virtual machine from replicated tenant snapshot"
  - "test DR recovery of an individual VM inside a tenant"
use_cases:
  - recover_individual_vm_inside_tenant_at_dr
  - choose_site_sync_level
  - test_dr_recovery_of_a_single_vm
  - plan_dr_site_sizing_for_tenants
tags:
  - dr
  - disaster recovery
  - site sync
  - sync
  - tenant
  - snapshot
  - recovery
  - backup
  - sizing
categories:
  - Backup and DR
  - Tenant
  - Best Practices
editor: markdown
dateCreated: 2026-07-09T00:00:00.000Z
---

# Recovering a Single VM from Inside a Tenant at Your DR Site

If the VM you need back lives inside a tenant, the level you configured your site sync at decides how hard the recovery is. A host-level sync replicates the tenant as a single object, so there is no individual VM to pick out of it on the DR side. Syncing at the tenant level puts the snapshots where per-VM recovery already works.

## Recovery granularity follows the system that owns the snapshot

Site syncs replicate [system snapshots](/product-guide/backup-dr/system-snapshots). When you select a received snapshot on the destination system, you get two listings:

- **View VMs** lists the VMs belonging to the host that took the snapshot.
- **View Tenants** lists the tenants that existed on that host.

There is no third listing for the VMs inside those tenants. A host-level snapshot will not show them at all. You have to restore the tenant to get that list, and restoring the tenant is also what makes those VMs recoverable. Both the listing and the restore come from the tenant reading its own snapshots. From the host's snapshot, the smallest thing you can pull out of a tenant is the tenant.

That gives you the rule to plan around: you can recover one level down from the system that owns the snapshot, and no further. A host's snapshot gets you the host's VMs and its whole tenants. A tenant's snapshot gets you that tenant's VMs.

## Recovering a tenant's VM through a host-level sync

DR systems are usually sized well below production. Take a common pair:

|              | Production                        | DR                       |
| ------------ | --------------------------------- | ------------------------ |
| Host RAM     | 500 GB                            | 128 GB                   |
| What it runs | One tenant provisioned 200 GB RAM | VergeOS plus a VM or two |

With a host-level sync between these two, recovering one VM out of that tenant means materializing the whole tenant first:

1. On the DR system, select the received snapshot, click **View Tenants**, and click **Recover**. The tenant is restored as a new instance and settles into an *Offline* state.
2. Power the tenant on. This is where it stops. The recovered tenant carries production's resource allocation, so its nodes want 200 GB of RAM on a 128 GB host. VergeOS will let you assign a tenant node more RAM than the system has, but [the resources have to actually be available to power it on](/product-guide/tenants/add-tenant-resources#add-a-tenant-node).

You can work around it. Tenant node resources can be [reduced on the fly](/product-guide/tenants/reduce-tenant-resources), and you are only opening the tenant to restore the VM, not to run it, so the trim can go well below production. Cut the recovered tenant's nodes down to what it takes to boot the tenant's own VergeOS instance, power the tenant on, log in, and recover the VM from the tenant's snapshot listing. That path does work. What it involves:

- A multi-node tenant has to be edited node by node, and the cluster's *Max RAM per machine* setting caps what any single node can hold.
- Restoring the VM inside the tenant does not get it out of the tenant. Handing it up to the DR host is another pass with [Shared Objects](/product-guide/tenants/share-vm-snapshot), and returning it to production is a sync back on top of that.
- If the goal is to *run* the VM at DR rather than extract it, the trimmed tenant has to carry the VM too, and you are back to sizing the DR host for production's workload.

## Sync at the tenant level instead

Run the sync from the production tenant to a tenant on the DR system. The snapshots then arrive inside the DR tenant, which owns them, so its VMs are enumerable and recoverable one at a time.

1. On the DR system, create the tenant that will receive the sync. Size it for the recovery you intend, not for production. Enough for VergeOS plus the VM or two you would bring up is the whole point.
2. Log into the DR tenant and create the **Incoming Sync**. Log into the production tenant and create the matching **Outgoing Sync**. Both sides are covered in [Configuring a Site Sync](/product-guide/backup-dr/sync-configuration); the sending and receiving system can each be a host or a tenant.
3. To recover a VM, log into the DR tenant, select the received snapshot, click **View VMs**, select the VM, and click **Recover**. Only that VM's resources have to fit. Full steps, including getting the VM back to production afterward, are in [Recovering a Single VM from a Remote System Snapshot](/knowledge-base/recovering-a-single-vm-from-a-remote-cloud-snapshot).

!!! note "Sync network rules belong to the hosts"
    The PAT rules that translate incoming sync traffic to the vSAN are created at the host level, not inside a tenant. Work through the [Network Configuration](/product-guide/backup-dr/sync-configuration#network-configuration) section before you build either sync.

!!! warning "A tenant-level sync protects what is inside the tenant"
    The tenant's resource allocation is provider-side configuration: node count and sizing, provisioned storage, assigned external IP addresses. That lives in the host's records, not in the tenant's own snapshots. Keep a host-level sync, or a written record of the allocation, so you can rebuild the shell that the recovered VMs run in.

## Choosing the level

| What you need to recover                            | Sync at                                               |
| --------------------------------------------------- | ----------------------------------------------------- |
| A VM that lives inside a tenant                     | Tenant level                                          |
| A host-level VM                                     | Host level                                            |
| A whole tenant, running at DR                       | Host level, with a DR system sized to run that tenant |
| The entire system: networks, settings, every tenant | Host level                                            |

These are not exclusive. A host-level sync for whole-system protection and a tenant-level sync for per-VM recovery can run side by side.

Pushing the same tenant's data through both costs transfer time rather than capacity. Deduplication on the receiving system collapses the duplicate blocks, so the second copy does not consume the space twice. Both streams still send that data across the link, and both take the time to do it.

On 26.1 and later, [partial system snapshots](/product-guide/backup-dr/system-snapshots) trim the redundant transfer. Keep taking full system snapshots locally for host-level recovery, and send partial snapshots that exclude the tenant offsite. The tenant's offsite protection then rests entirely on its own sync, so monitor that sync accordingly.

## Additional Resources

- [Configuring a Site Sync](/product-guide/backup-dr/sync-configuration)
- [Restores from System Snapshots](/product-guide/backup-dr/system-snapshot-restores)
- [Tenant Restores](/product-guide/tenants/tenant-restores)
- [Increasing a Tenant's Resources](/product-guide/tenants/add-tenant-resources)
- [Share a VM Snapshot between Provider and Tenant](/product-guide/tenants/share-vm-snapshot)
- [Recovering a Single VM from a Remote System Snapshot](/knowledge-base/recovering-a-single-vm-from-a-remote-cloud-snapshot)

!!! question "Need Help?"
    Designing a DR topology and unsure which level to sync at? Contact VergeOS support before you start replicating. Changing the level later means re-seeding the data.

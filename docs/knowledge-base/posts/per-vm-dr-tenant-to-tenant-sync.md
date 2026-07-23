---
title: Recovering a Single VM in DR Requires a Tenant-to-Tenant Sync
slug: per-vm-dr-tenant-to-tenant-sync
description: A provider-to-provider sync replicates your whole system into DR and gives you no clean handle to restore one VM. For per-VM DR recovery, use a tenant-to-tenant sync instead.
author: VergeOS Documentation Team
draft: false
date: 2026-07-09T00:00:00.000Z
semantic_keywords:
  - "recover single vm disaster recovery vergeos"
  - "provider-to-provider sync vs tenant-to-tenant sync per vm dr"
  - "restore one vm from dr site granularity"
  - "test dr recovery individual virtual machine"
  - "site sync direction provider tenant replication topology"
use_cases:
  - test_dr_recovery_of_a_single_vm
  - choose_dr_sync_direction
  - recover_individual_vm_at_dr_site
tags:
  - dr
  - disaster recovery
  - sync
  - site sync
  - tenant
  - tenant-to-tenant
  - provider-to-provider
  - replication
  - snapshot
  - recovery
  - backup
categories:
  - Backup and DR
  - Tenant
  - Best Practices
editor: markdown
dateCreated: 2026-07-09T00:00:00.000Z
---

# Recovering a Single VM in DR Requires a Tenant-to-Tenant Sync

If you want to test DR recovery of one virtual machine, the sync direction you choose matters. A common assumption is that a provider-to-provider sync between production and DR gives you per-VM granularity. It doesn't — and this guide explains why, and what to set up instead.

## The problem

A provider-to-provider sync replicates your **entire** production system into the DR provider. The object that lands on the DR side is the production *system*, not the individual VMs inside it. There is no clean handle to "restore one VM" out of a provider-to-provider sync, so if your goal is per-VM DR testing, this topology fights you.

## The fix: sync at the tenant level

Replace the provider-to-provider sync with a **tenant-to-tenant sync** — production tenant to DR tenant. Once that sync is flowing:

1. Hop into the DR tenant.
2. Find the synced VM's snapshots.
3. Recover the target VM in isolation. The rest of the tenant is untouched.

!!! warning "Don't run both syncs at once"
    Keeping the provider-to-provider sync running alongside the tenant-to-tenant sync replicates production twice — double the overhead, with no DR benefit. The tenant-to-tenant sync supersedes the provider-to-provider one for this use case, so retire the provider-to-provider sync once the tenant sync is established.

!!! info "Pick the sync direction that matches your goal"
    VergeOS syncs run in three directions: **provider-to-provider**, **provider-to-tenant**, and **tenant-to-tenant**. Provider-to-provider mirrors an entire system; tenant-to-tenant mirrors a single tenant and lets you recover its VMs individually. When you need per-VM recovery, reach for tenant-to-tenant.

## Additional Resources

- [Configuring a Site Sync](/product-guide/backup-dr/sync-configuration/)
- [VM Snapshots and Restores](/product-guide/backup-dr/vm-snapshots-restores/)

!!! question "Need Help?"
    If you're designing a DR topology and aren't sure which sync direction fits, contact VergeOS support before you start replicating.

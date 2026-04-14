---
title: "Sharing Disks Between Virtual Machines"
description: "Overview of the supported methods for sharing disks and data between virtual machines in VergeOS, including Clone Disk and NAS-based file sharing, with guidance on when to use each."
semantic_keywords:
  - "share disk between VMs VergeOS"
  - "shared storage virtual machines"
  - "clone disk vs NAS share"
  - "multi-attach disk VergeOS"
  - "shared file system VMs SMB NFS"
use_cases:
  - share_data_between_vms
  - seed_vm_from_existing_disk
  - provide_shared_file_storage
  - choose_disk_sharing_method
tags:
  - virtual-machines
  - drives
  - storage
  - sharing
  - clone-disk
  - nas
  - shares
categories:
  - Virtual Machines
---

# Sharing Disks Between Virtual Machines

## Overview

VergeOS does not currently attach a single block device to multiple running VMs at the same time. When we need to share data across VMs today, we have two supported approaches: **duplicate the disk** (Clone Disk) so each VM gets its own independent copy, or **share a file system over the network** by mounting a NAS share from each guest. This page explains what each method does, when to choose it, and where to find the procedure.

### What You'll Learn

- The difference between Clone Disk and NAS-based file sharing
- When to use each method based on your use case

### What You'll Need

- A running VergeOS environment with at least two virtual machines
- Administrative access to the VergeOS UI
- For NAS shares: a configured [NAS service](../nas/overview.md)

## Comparison

| Method | What it shares | Read/Write semantics | Best for | Limitations |
|---|---|---|---|---|
| **Clone Disk** | An independent copy of an existing `.raw` disk, made at drive-creation time | Each VM owns a private read/write copy. Changes are **not** synchronized back to the source or to other clones. | Seeding new VMs from a known-good disk image, handing off a point-in-time dataset to another VM | One-time copy only — not a live sharing mechanism. Clones diverge from the source the moment they are created. Permissions are inherited from the source disk. |
| **NAS share (SMB/NFS)** | A NAS volume exposed as a network share and mounted by multiple guests | Concurrent read/write at the **file** level, mediated by the NAS service and the share protocol | Shared application data, file repositories, content libraries, and any workflow where multiple VMs need to read or write the same files | File-level only, not block-level. Network overhead compared to local disk I/O. Concurrency, locking, and performance depend on the protocol and the guest OS. Granular share-level and filesystem-level permissions are available. |

## Method 1 — Clone Disk

A **Clone Disk** is a point-in-time copy of an existing `.raw` drive (the default format for VergeOS VM disks) in the same VergeOS cloud. It is created when we add a drive to a VM and select **Clone Disk** as the media type. Once created, the clone is fully independent of the source: writes from the cloned VM stay in the clone, and writes to the source are not visible to the clone. Because the clone is a full copy, it is unaffected if the source drive is later modified or deleted. This is the right choice for *initializing* a VM from an existing disk, not for keeping data in sync between VMs.

For the step-by-step procedure, see [**Virtual Machine Drives**](vm-drives.md#add-a-drive-to-a-vm) and select **Clone Disk** at the *Media* step.

## Method 2 — NAS Share

A **NAS share** is a volume hosted by the VergeOS NAS service and exposed over SMB or NFS. Each VM mounts the share like any other network file system, and the NAS coordinates concurrent access across all connected guests. This is the supported way to give multiple VMs simultaneous read/write access to the same data.

For setup, see the [**NAS Overview**](../nas/overview.md) and [**NAS Shares**](../nas/nas-shares.md).

## Choosing Between Them

- **Use Clone Disk** when we need a new VM to *start* with a copy of an existing disk and then evolve independently — for example, deploying several VMs from the same prepared OS or data disk.
- **Use Clone Disk** for a one-time data hand-off where the receiving VM should own its copy.
- **Use a NAS share** when two or more VMs need to read or write the *same* files concurrently.
- **Use a NAS share** for shared application content, team file storage, build artifacts, media libraries, or any workflow where consistency across VMs matters.
- **Do not** use Clone Disk to keep data in sync between VMs — clones diverge immediately and there is no merge-back.

!!! info "Roadmap"
    Simultaneous multi-VM attach of a single drive — both read-only and read/write — is planned for a future VergeOS release. This page will be updated when that capability is available.

## Summary

In short: **Clone Disk for seeding, NAS for sharing.** We covered the two supported methods for sharing data between virtual machines in VergeOS:

- **Clone Disk** for creating independent, point-in-time copies of an existing drive — local block-level I/O, no network overhead, but no synchronization
- **NAS shares** for concurrent, file-level access from multiple VMs over SMB or NFS — with granular access control and live collaboration, at the cost of network overhead

### Next Steps

- [Virtual Machine Drives](vm-drives.md#add-a-drive-to-a-vm) — Create a Clone Disk
- [NAS Overview](../nas/overview.md) — Set up the NAS service
- [NAS Shares](../nas/nas-shares.md) — Create and manage file shares

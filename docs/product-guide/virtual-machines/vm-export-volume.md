---
title: "VM Export Volume"
description: "Overview of the VergeOS NAS VM Export volume type for creating exportable VM snapshots accessible to external systems and third-party backup software."
semantic_keywords:
  - "export VM snapshots to external backup software"
  - "VergeOS NAS VM export volume CIFS NFS"
  - "third-party backup integration VM export"
  - "schedule automated VM export snapshots"
use_cases:
  - export_vm_snapshots_externally
  - integrate_third_party_backup
  - configure_vm_export_volume
  - automate_vm_export_schedule
tags:
  - virtual-machines
  - export
  - backup
  - nas
  - snapshots
  - cifs
  - nfs
  - volume
categories:
  - Virtual Machines
  - Backup
---

# VM Export Volume

The VergeOS NAS service provides a special volume type (*Verge.io VM Export*) to facilitate export of VMs. This special volume contains VM snapshots, created each time the export is run, that can then be made available to external systems and third-party backup software.

## Core Concepts

- VMs must have **Allow Export** enabled in their settings to be included in exports.
- The VM export workflow centers on creating a dedicated NAS volume designed specifically for generating exportable snapshots of selected virtual machines.
- Exports can be manually triggered or automated through task schedules.
- Each export produces a set of VM snapshots stored within the volume, organized by timestamped folders.
- To make the exported data accessible to external systems, such as third-party backup tools or external storage platforms:
    * The volume can be [shared over CIFS or NFS](/product-guide/nas/nas-shares)
    * Data can be [volume synchronized](/product-guide/nas/volume-syncs) to an external system (e.g. NAS appliance) via CIFS/NFS using a mounted [remote volume](/product-guide/nas/nas-remote-volumes)

For detailed configuration instructions, see the KB article: **[How to Configure a Volume for VM Exports](/knowledge-base/configuring-a-vm-export-volume)**


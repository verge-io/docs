---
title: Backing Up VergeOS VMs with Commvault
slug: commvault-backup-support
description: Which third-party backup tools are validated with VergeOS, where Commvault stands today, and how to protect VergeOS VMs with Veeam or a NAS VM Export volume shared over NFS or CIFS.
author: Carl Rodabaugh
draft: false
date: 2026-09-23
semantic_keywords:
  - "commvault backup vergeos vms"
  - "commvault ovirt rhv virtual server agent vergeos"
  - "commvault vsdiscovery fails vergeos ovirt api"
  - "which backup software works with vergeos"
  - "vergeos third party backup nfs cifs export"
use_cases:
  - choose_third_party_backup_tool
  - back_up_vergeos_vms_with_commvault
  - export_vms_for_external_backup
tags:
  - backup
  - commvault
  - veeam
  - storware
  - ovirt
  - rhv
  - vm export
  - nas
  - nfs
  - cifs
categories:
  - Backup
editor: markdown
dateCreated: 2026-09-23
---

# Backing Up VergeOS VMs with Commvault

## Overview

!!! info "Key Points"
    - Veeam and Storware are the third-party backup tools validated with VergeOS today.
    - Veeam connects through the VergeOS oVirt-compatible API, delivered by the optional **ovirt-engine** package.
    - Commvault's oVirt/RHV Virtual Server Agent isn't currently validated against that API.
    - To keep using Commvault, back up VM exports from a VergeOS NAS over NFS or CIFS.

VergeOS works with several enterprise backup platforms. This article covers which ones are validated, and what to do if your organization standardizes on Commvault.

## Validated Backup Integrations

**Veeam Backup & Replication** protects VergeOS VMs through the oVirt-compatible API. It needs VergeOS 26.1.7 or later with the ovirt-engine package installed, and Veeam Backup & Replication 13.1 or later. You add each system, and each tenant you want to protect, to Veeam as its own VergeOS Manager.

**Storware Backup and Recovery** connects through the VergeOS API and supports VM discovery, snapshots, and retention management.

Setup steps for both are linked under Additional Resources.

## Symptoms

- Commvault is configured to protect VergeOS VMs using its oVirt/RHV Virtual Server Agent, pointed at the VergeOS oVirt-compatible API.
- VM discovery fails. Commvault reports that it can't parse the certificate path or the API root.
- The failure continues even with the ovirt-engine package installed and enabled.

## Why This Happens

Commvault's oVirt/RHV agent is built around Red Hat Virtualization Manager's own certificate layout and API conventions. The VergeOS oVirt-compatible API is built to serve the integrations validated against it, and Commvault isn't one of them yet. There's no setting on the VergeOS side that changes how Commvault discovers the environment.

## Options

### Option 1: Use Veeam

If Veeam is an option for your team, it's the validated path through the oVirt-compatible API. Install the ovirt-engine package from **System** → **Updates**, then add the system to Veeam as a VergeOS Manager. The Veeam integration guide below walks through every step.

### Option 2: Back up VM exports from a VergeOS NAS

If Commvault needs to stay your backup tool, have it back up VM exports rather than talking to the API directly. This skips oVirt discovery entirely.

1. On each VM you want to protect, edit the VM settings and enable **Allow Export**.
2. Create a NAS volume from **NAS** → **+ New Volume**, and set **Filesystem Type** to **Verge.io VM Export**. Choose **Open Virtualization Format (.ovf)** if you want an industry-standard format.
3. Run the export, or schedule it with a task so exports run on a regular cycle.
4. Share the export volume over CIFS (**NAS** → **CIFS Shares** → **New**) or NFS.
5. Point Commvault at the share as a file-level backup source. Each export lands in a timestamped folder, and the **current** folder always points to the latest one, which gives Commvault a stable path.

The VM Export volume guide below covers each step in detail, including scheduling.

## Additional Resources

- [Veeam integration with VergeOS](https://docs.verge.io/automate-protect-and-extend/integrations-and-apis/veeam)
- [Storware Backup and Recovery integration](https://docs.verge.io/automate-protect-and-extend/integrations-and-apis/storware-backup-recovery)
- [Setting up Storware with VergeOS](https://docs.verge.io/knowledge-base/backup-dr/setup-storware-vergeos)
- [Configuring a volume for exporting VMs](https://docs.verge.io/knowledge-base/backup-dr/configuring-a-vm-export-volume)
- [Creating NAS shares (CIFS and NFS)](https://docs.verge.io/run-the-platform/nas/nas-shares)

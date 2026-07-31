---
title: VMware Import Scans Succeed but File Downloads Fail
slug: vmware-import-downloads-fail-server-refused
description: A VergeOS VMware Service connects to vCenter and scans VMs fine, but backup/import jobs fail with "server refused connection" when they start pulling files. This is almost always DNS or port 902 reachability to the ESXi hosts, not vCenter.
author: VergeOS Documentation Team
draft: false
date: 2026-07-09T00:00:00.000Z
semantic_keywords:
  - "vmware import scan works download fails server refused connection"
  - "vergeos vmware service backup paused retry error downloading file"
  - "esxi host fqdn dns resolution vmware service vm"
  - "vmware import port 902 903 nfc firewall vddk"
  - "vmware backup one cluster works another fails"
use_cases:
  - import_vms_from_vmware_into_vergeos
  - back_up_vmware_vms_with_vergeos
  - troubleshoot_vmware_import_download_failure
tags:
  - vmware
  - import
  - migration
  - backup
  - vcenter
  - esxi
  - dns
  - port 902
  - server refused connection
  - vmware service
  - troubleshooting
categories:
  - Troubleshooting
  - VMware
  - Migration
editor: markdown
dateCreated: 2026-07-09T00:00:00.000Z
---

# VMware Import Scans Succeed but File Downloads Fail

In this guide we work through a VMware import/backup job that connects to vCenter and scans VMs successfully, then fails the moment it starts transferring files. The scan working while downloads fail is the key clue, and it points somewhere other than vCenter.

## Symptoms

- The VMware Service connects to vCenter and lists/scans VMs without trouble.
- A backup or import job starts, then pauses and retries, and after several attempts it fails.
- The service log shows the snapshot succeed, then a run of download errors like:

```
Error: The server refused connection
Error downloading file: [<datastore>] <VM>/<VM>.nvram
Error downloading file: [<datastore>] <VM>/<VM>.vmxf
Error downloading file: [<datastore>] <VM>/<VM>.vmx
Backup job paused due to encountering an error. Will retry again in approximately Nm (#k of 10)
```

- The failure hits **every** file, including the small config files (`.vmx`, `.vmxf`, `.nvram`) — not just the large virtual disks.

!!! info "Why 'every file' matters"
    If the tiny config files fail alongside the disks, this is not a disk-specific or transport-mode (VDDK) problem. It is a connection problem reaching the host that holds the files.

## Overview

The VMware Service uses vCenter only to enumerate VMs and locate their files. The actual file and disk transfer goes **directly to the ESXi host** that owns the VM's datastore, using the host FQDN that vCenter hands back.

So if the VMware Service can reach vCenter but cannot resolve or reach that ESXi host, vCenter looks perfectly healthy — the scan succeeds — while every download fails with "server refused connection." There are two common reasons.

**1. DNS.** The VMware Service can't resolve the ESXi host FQDNs vCenter returns, usually because its NIC has the wrong or missing DNS server or search domain. This is the most common cause. It also explains the classic split where VMs on one cluster back up fine and another cluster fails — the working cluster's hosts happen to be resolvable.

**2. Network or firewall.** The host resolves but isn't reachable directly. The transfer needs TCP **443** (vSphere API) and **902** (NFC — the actual disk data) open from the VMware Service to each ESXi host directly, not just to vCenter. Port 902 is the one most often missed.

## Diagnosis

1. In vSphere, note the ESXi host FQDNs under the cluster that owns the failing VM's datastore. Those are the names VergeOS will connect to.
2. In VergeOS, open **Import/Export → VMware Services**, double-click the service, then open **View Service → Diagnostics**.
3. From there, try to resolve and reach those host FQDNs. If they won't resolve, you've confirmed the DNS path. If they resolve but won't connect, look at the firewall and port 902.

## Fix

1. Set the VMware Service VM's NIC to use a DNS server that resolves the ESXi host FQDNs, or add the correct search domain. See [VMware Service VM NIC IPv4 Configuration](/knowledge-base/vmware-service-vm-nic-ipv4-configuration).
2. Confirm TCP 443 and 902 are open from the VMware Service to **each ESXi host directly**, not only to vCenter.
3. Re-run the job. The downloads should proceed past the config files and into the disks.

## Additional Resources

- [VMware Service VM NIC IPv4 Configuration](/knowledge-base/vmware-service-vm-nic-ipv4-configuration)
- [VMware Backup and DR Guide](/knowledge-base/vmwarebackupdrguide)

!!! question "Need Help?"
    If downloads still fail after DNS and ports check out, contact VergeOS support with a copy of the VMware Service log.

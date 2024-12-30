---
title: vSAN Diagnostics Guide
slug: vsandiagnosticsguide
description: A guide of vSAN diagnostic options available in the UI
author: VergeOS Documentation Team
draft: false
date: 2024-12-26T13:37:37.037Z
tags: 
  - vSAN
  - guide
  - diagnostics
categories:
  - vSAN
  - Storage
  - Maintenance
  - System Administration
editor: markdown
dateCreated: 2024-12-30T14:3737.037Z
---
# vSAN Diagnostics Guide

## Overview

This guide provides comprehensive information about the vSAN diagnostic options available in the user interface. These diagnostic tools enable system administrators to monitor, troubleshoot, and maintain vSAN deployments effectively.

!!! danger "Critical Warning"
    The diagnostic commands detailed in this guide are powerful administrative tools. Improper usage can result in:
    - System outages
    - Service interruptions
    - Potential data loss

    Exercise extreme caution and ensure proper understanding before execution.

## Prerequisites

To use these diagnostic tools, you must have:

- Root-level access to your VergeIO cluster
- Note: Tenants do not have a vSAN.

## Accessing vSAN Diagnostics

1. Navigate to vSAN Diagnostics using either method:

   - From the home screen: Select the vSAN Tiers count box → vSAN Diagnostics (left menu)
   - Alternative path: Home screen → System (left menu) → vSAN Diagnostics
2. Command execution:

   - Select desired command from the dropdown menu
   - Configure available options if applicable
   - Click SEND→ to execute

!!! tip "Command Visibility"
    Enable the "Show Command" option to view the exact command being executed. This can be valuable for:
    - SSH execution
    - BASH script integration
    - Advanced command automation

## Diagnostic Commands

### Add Drive to vSAN

Running this command allows you to manually add a drive via the UI.
Drives are normally added either during the installation, or via the Nodes > Nodes Drives page.
However adding them in that way does not allow for the addition of drives to Tier0.

**Prerequisites:**

- Drive must be physically present in the system
- Drive must be visible from Nodes > Nodes Drives page

**Usage Parameters:**

- Selecting Add Drive to vSAN
- From the right menu, select the Node that we will be adding the drive to.
- Enter the appropriate path, E.G. ``/dev/nvme0n1```<br>`
- You can use the "Click here to view devices" to get the path.
  !!! warning "The contents of this drive will be overwritten."
- Select the Tier you want to assign the drive to.
- Check the Swap box if you want Swap enabled on this drive.
  !!! info "This will use the cluster settings for the Swap size."
- Verify. You will need to TYPE **Yes I know what I'm doing** in the Verify box.
- Select SEND →

**CLI Syntax:**

```bash
vcmd newdevice --path=PATH [OPTIONS]
  --path=PATH    Path to target device
  --tier=NUM     Tier number assignment
```

### Cancel Integrity Check

Terminates any active integrity check operations. See [Integrity Check](/product-guide/vsan/diagnosticsguide/#integrity-check) for additional information.

**CLI Syntax:**

```bash
vcmd cancelintegcheck
```

### Clear Reference Counts

Reference counts are how the vSAN tracks the number of times a file is referenced in the vSAN.
Clearing this count will force a full vSAN walk and a refresh of the Reference Counts.

**Function:**

- Clears existing reference counts
- Initiates full vSAN traversal
- Rebuilds reference count data

!!! warning "Support Authorization Required"
    Execute only under direct support guidance.

**Usage Parameters:**

- Verify. You will need to TYPE **Yes I know what I'm doing** in the Verify box.
- Select SEND →

**CLI Syntax:**

```bash
vcmd clearrefcounts
```

### Find Inode

Running this query will allow you to find out what an Inode (Index Node) referrences.
Inode is a data structure that stores information about a file or directory, such as its owner,
access rights, date and time of creation and modification, size and location on the vSAN.
Each file or directory in the system has its own unique index node number (inode number),
which can be used to perform various operations with a file or directory.
This can be used to troubleshoot errors in the vSAN.

**Purpose:**

- Retrieves inode reference information
- Maps inode numbers to filesystem entities
- Assists in vSAN troubleshooting

**CLI Syntax:**

```bash
find /vsan -inum inode_number_here -printf /%P\n
```

### Get Cache Info

Retrieves detailed cache information for specified nodes.

**Output Information:**

- Total cache capacity
- Available cache space
- Cache page statistics
- Performance metrics

**CLI Syntax:**

```bash
vcmd getcacheinfo
```

### Get Clients

Retrieves client connection information for specified nodes.

**Output Information:**

- Connected node information
- IP address mappings
- Worker thread statistics

**CLI Syntax:**

```bash
vcmd getclients
```

### Get Cluster Rates

Retrieves cluster-wide performance metrics.

**Output Information:**

- Read/write rates
- Throttle status
- Performance statistics

**CLI Syntax:**

```bash
vcmd getclusterrates
```

### Get Cluster Usage

Provides cluster-wide storage utilization information.

**Output Information:**

- Maximum storage capacity
- Current utilization
- Repair operation counts

**CLI Syntax:**

```bash
vcmd getclusterusage
```

### Get Current Master

Retrieves master node information from each cluster member.

**Output Information:**

- Master node identification
- Online status
- Transaction logging information

**CLI Syntax:**

```bash
vcmd getcurmaster
```

### Get Device Integrity

Retrieves integrity check results for specified nodes.

**CLI Syntax:**

```bash
vcmd getdeviceinteg
```

### Get Device List

Provides comprehensive device inventory.

**Output Information:**

- Device identifiers
- System paths
- Tier assignments

**CLI Syntax:**

```bash
vcmd getdevicelist
```

### Get Device Status

Retrieves detailed device status information.

**Output Information:**

- Device paths
- Operational status
- Capacity metrics
- Performance statistics

**CLI Syntax:**

```bash
vcmd getdevicestatus
```

### Get Device Usage

Provides device utilization metrics.

**Output Information:**

- Total capacity
- Current utilization
- Usage trends

**CLI Syntax:**

```bash
vcmd getdeviceusage
```

### Get File Status

Retrieves detailed file metadata.

**Output Information:**

- Inode information
- File type
- Tier assignment
- Hash key data

**CLI Syntax:**

```bash
vcmd stat /path/to/file.raw
```

### Get Fuse Info

Retrieves FUSE (Filesystem in Userspace) statistics.

**Output Information:**

- Mount point information
- Thread statistics
- Throttling metrics

**CLI Syntax:**

```bash
vcmd getfuseinfo
```

### Get Integrity Check Status

Retrieves results from the most recent integrity check.

**Output Information:**

- Check status
- Path information
- Temporal data
- Verification results

**CLI Syntax:**

```bash
vcmd getintegcheckstatus
```

### Get Journal Status

Retrieves journal system status information.

**Output Information:**

- Operational status
- Redundancy status
- System metadata

**CLI Syntax:**

```bash
vcmd getjournalstatus
```

### Get Node Device List

Retrieves detailed hardware information for storage devices.

**Output Information:**

- Driver information
- Model specifications
- Firmware versions
- Physical attributes

**CLI Syntax:**

```bash
vcmd getnodedevicelist
```

### Get Node Info

Retrieves comprehensive node configuration data.

**Output Information:**

- Node identification
- Cluster configuration
- System parameters
- Operational status

**CLI Syntax:**

```bash
vcmd getnodeinfo
```

### Get Node List

Provides cluster-wide node inventory.

**Output Information:**

- Node identification
- Online status
- Version information
- Tier utilization

**CLI Syntax:**

```bash
vcmd getnodelist
```

### Get Path from Inode

Resolves filesystem paths from inode numbers.

**CLI Syntax:**

```bash
vcmd getpathfromino $1
```

### Get Read Ahead

Retrieves read-ahead buffer statistics.

**Output Information:**

- Queue statistics
- Thread utilization
- System status

**CLI Syntax:**

```bash
vcmd getreadahead
```

### Get Repair Status

Monitors ongoing repair operations.

**Output Information:**

- Device repair status
- Operation progress
- System health

**CLI Syntax:**

```bash
vcmd getrepairstatus
```

### Get Running Configuration

Retrieves active system configuration.

**Output Information:**

- Worker thread allocation
- System throttles
- Operational parameters

**CLI Syntax:**

```bash
vcmd getrunningconf
```

### Get Sync List

Monitors synchronization operations.

**Output Information:**

- Operation frequency
- Start times
- File processing status

**CLI Syntax:**

```bash
vcmd getsynclist
```

### Get Tier Device Maps

Retrieves tier-to-device mapping information.

**Output Information:**

- Physical device mappings
- Tier assignments
- System configuration

**CLI Syntax:**

```bash
vcmd gettierdevicemaps
```

### Get Tier Node Maps

Retrieves tier-to-node mapping information.

**Technical Details:**

- Base-0 indexing (0=Node1, 1=Node2, etc.)
- 65536 buckets per tier map
- Primary (tier_x.0) and redundant (tier_x.1) mappings

**CLI Syntax:**

```bash
vcmd gettiernodemaps
```

### Get Tier Status

Retrieves comprehensive tier health information.

**Output Information:**

- Redundancy status
- Walk statistics
- Transaction data
- Health metrics

**CLI Syntax:**

```bash
vcmd gettierstatus
```

### Get Top Usage Rates

Monitors real-time I/O statistics.

!!! note "Real-time Data"
    Multiple executions may be necessary for trend analysis.

**CLI Syntax:**

```bash
vcmd getfhlist | grep -Eo '(ino|rrate|wrate)\b.*'
```

### Get Volume Usage

Retrieves detailed volume utilization statistics.

**Parameters:**

- Path specification (optional)
- Recursive flag
- Human-readable output
- Preferred tier display

**CLI Syntax:**

```bash
vcmd getvolusage --path=/ --recursive=1 --human=1
```

### Integrity Check

Initiates system integrity verification.

**Parameters:**

- Path specification (required)
- Recursive operation
- Fix mode (destructive)
- Meta-tier only option

!!! warning "Data Loss Risk"
    Fix mode zeros bad blocks. THIS IS DESTRUCTIVE. Use only under support guidance.

**CLI Syntax:**

```bash
vcmd integcheck /vol
```

### Integrity Check Device

Performs device-level integrity verification.

**Parameters:**

- Node selection
- Device ID (-1 for all devices)

**CLI Syntax:**

```bash
vcmd integcheckdevice --id=x
```

### Summarize Disk Usage

Generates storage utilization summaries.

**Parameters:**

- Path specification
- Recursive operation
- Preferred tier display
- Deduplication analysis
- Fast deduplication option

**CLI Syntax:**

```bash
vcmd du /vol
```

## Additional Resources

- [VergeOS Documentation](https://docs.verge.io)
- [VergeOS Knowledge Base](https://docs.verge.io/knowledge-base/)

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

!!! note "Document Information"

- Last Updated: 2024-12-27
- VergeOS Version: 4.13.2

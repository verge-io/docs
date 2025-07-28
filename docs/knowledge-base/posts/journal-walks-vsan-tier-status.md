---
title: Understanding vSAN Tier Status/Journal Walks
slug: understanding-journal-walks-and-vsan-tier-status
description: Understanding status metrics provided on the vSAN Tier Dashboard
author: VergeOS Documentation Team
draft: false
date: 2025-07-01T14:20:54.833Z
tags:
  - storage
  - vSAN
  - tiers
categories:
  - Storage
  - Software Updates
  - vSAN
editor: markdown
dateCreated: 2025-06-1T15:10:21.365Z
---



# vSAN Tier Status (Journal Walks)

## Overview

This page is designed to help you understand VergeFS status metrics provided on the *vSAN Tier Dashboard*. These metrics provide insight related to ***Journal Walks***, the processes that continually monitor and support vSAN data integrity. 

!!! note "Monitoring vSAN tier status information covered on this page is typically unnecessary during normal operation (general vSAN health and activity can be monitored on the Main Dashboard).  The following details are intended for troubleshooting or for users interested in viewing Journal Walk activity specifics. This dashboard is most useful when investigating an issue or tracking the progress of a Journal Walk, such as during an update process."


## Journal Walks

VergeFS employs a process called *Journal Walks* (also referred to as "Walks") to continually verify storage fidelity and safeguard against risks like hardware failures, silent bitrot, power disruptions, and misleading device write confirmations. These walks are automatically triggered, scanning each node to verify possession of its expected data blocks.  In the event of any missing data blocks, which may result from: device issues, planned node reboots, or environmental disruptions, VergeFS proactively performs repairs to restore consistency.  

Journal Walks operate as a background process; system operations proceed normally while a Journal Walk is in progress.

The system executes **three types of Journal Walks**:

* **Partial (differential) Walk** - targets data changed since last walk transaction for quicker validation
* **Full Walk** - scans all data across all nodes 
* **Mixed Walk** - occurs when a non-controller node reboots; only that node is fully scanned, while other nodes are differentially scanned.

## Accessing vSAN Tier Status Information

Navigate to: **Main Dashboard** > **vSAN Tiers** > **double-click the desired tier**. This displays the dashboard for the selected vSAN tier. Refer to the Status tile on this page. 

## Status Data 

* **Redundant:** *(checkbox)* Reflects whether the vSAN tier is currently verified as redundant. If unchecked, maintenance mode will be disabled to prevent disruption. The box may appear unchecked during a full Journal Walk until redundancy is confirmed. It also remains unchecked if redundancy cannot be verified, such as when a node is offline after the Journal Walk completes.

* **Encrypted:** *(checkbox)* Shows whether data in the vSAN tier is encrypted. Encryption status is set during installation and remains fixed; this setting cannot be modified after deployment. 

* **Working:** *(checkbox)* Indicates that a Journal Walk is actively running for this tier. If no snapshots or data changes are occurring, walks may complete too quickly to register as “working” in the UI.

* **Full Walk:** *(checkbox)* Flags whether a full Journal Walk is in progress. Full walks are triggered by events such as controller startup or topology changes (e.g., node offline or added, drive failure, etc.).

!!! note "When a node other than the active controller reboots, a Mixed Walk is triggered instead."

* **Walk Progress:** Displays the current Journal Walk’s progress as a percentage, or shows “Idle” if no walk is active.

* **Last Walk Time (ms):** Duration in milliseconds of the most recent Journal Walk.

* **Last Full Walk Time (ms):** Duration in milliseconds of the most recent Full Journal Walk.

* **Current Transaction:** A unique ID representing the latest transaction. This value increments with each Journal Walk, whether full, mixed, or differential.

* **Transaction Start Time:** Timestamp indicating when the current or most recent Journal Walk began. Useful for diagnosing prolonged or stalled operations. (see [Journal Walk Duration](#journal-walk-duration) below).

* **Repairs:** Displays the current count of missing data blocks detected on the tier. It’s normal to see a non-zero value after events such as node failures, maintenance operations, or updates. VergeFS Journal Walks automatically identify and work to correct these detected blocks using redundant data stored on other nodes. If redundancy fails (e.g. double node failure), the system will try to retrieve blocks from a configured repair server. Persistent repair counts (i.e. after several transaction increments) may indicate manual resolution is needed, and contacting VergeIO Support is recommended in such cases.

!!! tip "If missing data blocks have already been detected and a repair server isn’t yet configured, it’s not too late. [Setting up a repair server](/product-guide/backup-dr/repair-server) now allows VergeFS to automatically attempt recovery of those blocks during subsequent Journal Walks."

* **Bad Drives:** Indicates the number of drives missing since the current Journal Walk began. It’s common to see a non-zero value here after node reboots, maintenance, or updates; this doesn’t automatically signal a drive failure. Missing drives are typically related to offline nodes or detection delays at walk start. If no nodes are offline and this field shows a count, review drive and node status via the Main Dashboard for further insight.

## Journal Walk Duration

Walk timespans are variable, with several factors that can affect durations, including: 

- Use of NVME Tier 0 for metadata
- Available memory on controller nodes
- Quantity of data on the tier
- Amount of data changes since the last transaction

### Walk Time Considerations

- Updates involve full walks and mixed walks, hence the time it takes for these operations will affect necessary maintenance windows.   
- The time it ultimately takes to make large deletions and data tier migrations (e.g. from one tier to another) will be reliant on differential walk times. 
- Systems that follow published sizing and design recommendations should experience acceptable walk durations. For example, walks triggered during update operations generally fit within standard maintenance windows.

### Walk Time Optimization

Walk times depend on the tier size and rate of data change.  Adequate resources and proper network design significantly impact walk performance. 

#### Tips to Optimize Journal Walk Times

* Follow recommended [Node Sizing Requirements](/implementation-guide/sizing) (e.g. dedicated tier 0 using NVME drives, right-sizing controller memory for your environment) 
* Implement [Network Design](/implementation-guide/network-design) recommendations (e.g. adequate internode bandwidth of at least 10Gb, isolated, dedicated core networks) 
* Avoid overprovisioning workload RAM on compute-and-storage (HCI) nodes.  
* When possible, schedule maintenance operations that trigger Full or Mixed Walks during scheduled maintenance windows, while avoiding concurrent heavy I/O operations. 


!!! question "If you have questions or concerns about the timeframe of walk transactions, please contact our support team for assistance."



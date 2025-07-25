# VergeOS vSAN Tier Status Detail (Journal Walks)

## Overview

This page is designed to help you understand VergeFS status metrics provided on the vSAN Tier Dashboard. These metrics provide insight related to ***Journal Walks***, the processes that continually monitor and support vSAN data integrity. 

 !!! note "Monitoring the vSAN tier status information covered on this page is typically unnecessary during normal operation (general vSAN health and activity are reported on the Main Dashboard).  These details are intended for troubleshooting or for users interested in viewing Journal Walk activity specifics. This dashboard is most useful when investigating an issue or tracking the progress of a Journal Walk, such as during an update process."


## Journal Walks

VergeFS employs a process called *Journal Walk* to continually verify storage fidelity and safeguard against risks like hardware failures, silent bitrot, power disruptions, and misleading device write confirmations. These walks are automatically triggered to scan each node to verify possession of its expected data blocks.  In the event of any missing data blocks, which may result from device issues, planned node reboots, or environmental disruptions, VergeFS proactively performs repairs to restore consistency. 


The system executes **three types of Journal Walks**:

* **Partial (differential) Walk** - targets data changed since last walk transaction for quicker validation
* **Full Walk** - scans all data across all nodes 
* **Mixed Walk** - occurs when a non-controller node reboots; only that node is fully scanned, while other nodes are differentially scanned.


## Accessing vSAN Tier Status Information

From the **Main Dashboard**, navigate to **vSAN Tiers** and **double-click the desired tier**. This displays the dashboard for the selected vSAN tier. Refer to the Status tile on the page. 

## Status Data 

* **Redundant:** *(checkbox)* Reflects whether the vSAN tier is currently verified as redundant. If unchecked, maintenance mode will be disabled to prevent disruption. The box may appear unchecked during a full Journal Walk until redundancy is confirmed. It also remains unchecked if redundancy cannot be verified, such as when a node is offline after the Journal Walk completes.

* **Encrypted:** *(checkbox)* Shows whether data in the vSAN tier is encrypted. Encryption status is set during installation and remains fixed; this setting cannot be modified after deployment. 

* **Working:** *(checkbox)* Indicates that a Journal Walk is actively running for this tier. If no snapshots or data changes are occurring, walks may complete too quickly to register as “working” in the UI.

* **Full Walk:** *(checkbox)* Flags whether a full Journal Walk is in progress. Full walks are triggered by events such as controller startup, topology changes (e.g., node offline, added, or drive failure).

!!! note "When a node other than the active controller reboots, a Mixed Walk is triggered instead."

* **Walk Progress:** Displays the current Journal Walk’s progress as a percentage, or shows “Idle” if no walk is active.

* **Last Walk Time (ms):** Duration in milliseconds of the most recent Journal Walk.

* **Last Full Walk Time (ms):** Duration in milliseconds of the most recent full Journal Walk.

* **Current Transaction:** A unique ID representing the latest transaction. This value increments with each Journal Walk, whether full, mixed, or differential.

* **Transaction Start Time:** Timestamp indicating when the current or most recent Journal Walk began. Useful for diagnosing prolonged or stalled operations. (see [Duration of Journal Walks](#duration-of-journal-walks) below).

* **Repairs:** Displays the current count of missing data blocks detected on the tier. It’s normal to see a non-zero value after events such as node failures, maintenance operations, or updates. VergeFS Journal Walks automatically identify and attempt to correct these repairs using redundant data stored on other nodes. If redundancy fails (e.g. double node failure), the system will try to retrieve blocks from a configured repair server. Persistent repair counts (i.e. after several transaction increments) may indicate manual resolution is needed, and contacting VergeIO Support is recommended in such cases.

!!! tip "If missing data blocks have already been detected and a repair server isn’t yet configured, it’s not too late. [Setting up a repair server](/product-guide/backup-dr/repair-server) now allows VergeFS to automatically attempt recovery of those blocks during subsequent Journal Walks."

* **Bad Drives:** Indicates the number of drives missing since the current Journal Walk began. It’s common to see a non-zero value here after node reboots, maintenance, or updates; this doesn’t automatically signal a drive failure. Missing drives are typically related to offline nodes or detection delays at walk start. If no nodes are offline and this field shows a count, review drive and node status via the Main Dashboard for further insight.

## Duration of Journal Walks

Journal Walk times are variable, with several factors that can affect durations, including: 

- If the system has NVME tier 0 for meta
- Amount of memory in controller nodes
- Amount of data changes since last transaction

!!! question "If you are concerned about the timeframe of a walk transaction, please contact our support team for assistance."




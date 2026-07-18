---
title: "Replacing a Defective or End-of-life Drive"
description: "Procedures for replacing failed, degraded, or end-of-life vSAN drives in VergeOS, including identifying defective drives, LED activation, and both reactive and proactive replacement scenarios."
semantic_keywords:
  - "replace failed defective drive vSAN VergeOS"
  - "drive error warning missing status replacement procedure"
  - "LED activation identify physical drive for replacement"
  - "proactive drive replacement wear level reallocated sectors"
  - "vSAN drive repair process format initialize"
use_cases:
  - replace_failed_missing_drive
  - proactively_replace_degraded_drive
  - identify_physical_drive_with_led
  - monitor_drive_repair_progress
  - diagnose_drive_warning_errors
tags:
  - drives
  - vsan
  - storage
  - hardware
  - maintenance
  - repair
  - troubleshooting
  - replacement
categories:
  - System Administration
---

# Replacing a Defective or End-of-life Drive

Replacing a failed or end-of-life vSAN drive promptly is essential to maintaining data protection. This page covers how to identify problem drives and complete the replacement safely.

!!! danger "Before You Begin"
    - **Use a compatible replacement drive.** The replacement must be the same model or equivalent — matching the original in capacity, interface type, and specifications. Using an undersized or incompatible drive can result in data loss or vSAN instability.
    - **The replacement drive must be empty.** Verify it contains no data — especially no VergeOS vSAN data. A drive previously used in a VergeOS vSAN that has not been wiped can cause serious system problems if reused as a replacement. When in doubt, wipe the drive on another system before use.
    - **Always place the node into maintenance mode before performing any drive replacement actions.** This is critical to ensuring the vSAN can properly protect data during the replacement process.

## When Does a Drive Need to be Replaced?

The VergeOS interface will provide notifications when there is a problem with a physical drive. Drive warnings and errors are indicated in multiple areas of the VergeOS user interface. 

### Alarms  

   An alarm is raised when a node drive has warnings or errors. 

**To view detail:**  
- Click the Alarms quicklink in the top right or navigate to System > Alarms.  
- Double-click the drive warning or error entry.    
- This will bring you to the node dashboard. Click *Drives*  to access the list of node drives.   
- Double-click a drive with an error/warning to view its dashboard that displays more detail.  

### System Dashboard

 The *Node Drives* card on the System Dashboard displays yellow or red when any physical drive is in a warning or error state. 

**To view detail:**   
- Navigate to System > Dashboard.   
- Click anywhere within the *Node Drives* card to access the full list of drives.  
- Double-click a drive with an error/warning to view its dashboard that displays more detail.



### Example Warning/Error Statuses

- **Warning** - Wear level exceeded maximum threshold(s)
- **Warning** - Reallocated sectors exceeded maximum threshold(s)
- **Error** - Drive is unresponsive; read or write error threshold reached
- **Missing** - Drive is no longer detected by the system (failed or physically removed)

!!! warning "Configure Proactive Drive Alerts"
    Catching drive problems early is critical. A degraded or failed drive that goes unnoticed can escalate into a failure that threatens vSAN redundancy. **Strongly recommended: set up at least one active notification method so administrators are alerted as soon as VergeOS detects a drive issue.**

    Several options are available:

    - **Dashboard & Alarms** — The VergeOS UI raises an alarm and surfaces drive warnings/errors on the System Dashboard. Regular dashboard check-ins can catch issues, but this relies on someone actively looking.
    - **Task Engine + Webhooks** — Use the VergeOS task engine to automatically trigger actions (webhooks, emails, API calls) when drive events occur. This enables push notifications to external systems such as Slack channels, Prometheus alertmanager, Zluri, or any webhook-compatible platform — providing near-instant, hands-free alerting.
    - **Subscriptions** — Configure subscriptions to send email notifications on-demand when VergeOS detects a drive problem, and/or schedule regular reports (e.g., daily System Dashboard summaries) for routine visibility. See the [Subscriptions Overview](/product-guide/system/subscriptions-overview) for setup details.

## Which Replacement Procedure Should I Use?

The replacement procedure depends on the current state of the drive:

| Drive Status | Condition | Procedure |
|--------------|-----------|-----------|
| **Missing** or **Error** (unresponsive) or **Offline** | Drive has already failed and is not responding | [Scenario 1: Replace a Failed/Missing Drive](#scenario-1-replace-a-failedmissing-drive) |
| **Warning** or **Degraded** | Drive is still operational but showing signs of failure | [Scenario 2: Proactively Replace a Working Drive](#scenario-2-proactively-replace-a-working-drive) |

!!! tip "How to Tell if a Drive is Missing"
    A missing drive will show a status of **Missing** in the drive list. This occurs when the drive has completely failed, lost connection, or has already been physically removed. The drive entry remains in the UI to allow you to initiate the replacement process.

## Determine the Correct Physical Drive for Replacement

1. Navigate to the **node dashboard**.
2. Locate the *LED Status* field in the Status card. 
3. Attempt to **activate the drive LED**:
    - If ***LED Status*** indicates **Off**, click **Turn on LED** on the left menu.
    - If ***LED Status*** indicates **Unsupported**, click **Locate LED** on the left menu. The Diagnostics window will appear with settings pre-filled — click **Send ->** to activate the drive LED.

    !!! note "LED Locate Requires Hardware Support"
        LED locate is only available when the hardware supports it. If the LED status shows as unsupported and the locate function does not respond, use the identification tips below instead.

4. Once the LED is activated, locate the physical drive by finding the one with a solid or blinking locate light. 
5. After identifying the drive, **deactivate the LED**: select **Turn off LED** or **Locate LED**; change state to Off; Send. 

### If LED Locate Is Not Available

If your hardware does not support LED locate, use these tips to identify the correct physical drive:

- **For a failed drive** (status **Missing** or **Offline**): A failed drive typically shows no activity — no blinking activity light. Working drives will have a flickering activity light; a dead drive will be dark or show a solid error indicator.
- **Match serial numbers**: The drive serial number shown in the VergeOS drive dashboard can be matched against the label on the physical drive.

## Hot-Swap vs. Shutdown Replacement

**Most production systems** use hot-swap drive bays, which allow a drive to be removed and replaced while the node remains powered on (in maintenance mode). The procedures below assume hot-swap capability.

**Some systems** — such as POC environments, homelabs, or nodes with drives in PCIe slots — require the node to be powered off before drives can be swapped. If your system does not support hot-swap:

1. Place the node into **Maintenance Mode** as directed.
2. **Gracefully shut down the node** from the VergeOS UI (not a hard power-off) before removing any drives.
3. Make the physical drive swap.
4. Power the node back on and wait for it to rejoin the cluster.
5. Continue with the remaining steps.

!!! warning "If You Pull the Wrong Drive"
    If you accidentally remove the wrong drive, re-seat it immediately. For hot-swap systems, no reboot is needed. For systems that require a node shutdown, power the node back on after re-seating the drive. In either case, because the node is in maintenance mode (as directed), the vSAN is protected and there will be no data loss. Once the node is back online, you can begin the procedure again and remove the correct drive.

## Same Slot vs. Different Slot: What to Expect

The steps to complete a replacement in VergeOS differ depending on whether you insert the new drive into the **same slot** as the original or a **different slot**. This applies to both scenarios below.

| Replacement Slot | What the UI Shows | Steps Required |
|---|---|---|
| **Same slot** | VergeOS recognizes the slot and reports the new drive as **Offline** (treating it as the original member without data) | Select the new (Offline) drive → **Format** → **Initialize** |
| **Different slot** | The original drive entry remains (as **Missing** or **Offline**) and the new drive appears separately | Select the **original drive entry** → **Replace** → select the new drive as the replacement |

---

## Scenario 1: Replace a Failed/Missing Drive

Use this procedure when a drive has already failed and is no longer responding, or when the drive shows a **Missing** status in the UI.

!!! danger "**CAUTION: Before** initiating a drive repair operation, **verify**:"
    1. The node containing the failed drive is in **maintenance mode**. All other nodes must be online and fully operational.
    2. No other drive repairs are running on different nodes within the same storage tier *(repairs on the same physical node are acceptable)*.
    3. You have positively identified the appropriate physical drive (See [Determine the Correct Physical Drive for Replacement](#determine-the-correct-physical-drive-for-replacement) above).
    4. The replacement drive is empty and compatible (see warnings at the top of this page).

1. **Place the node** that has the failed drive **into Maintenance Mode.**
2. If the failed drive is still physically present, **remove it** from the node. 
3. **Insert the replacement drive.** (If your system requires a node shutdown first, follow the [Hot-Swap vs. Shutdown](#hot-swap-vs-shutdown-replacement) steps above.)
4. **Wait** for the new drive to be detected by the system. 
5. From the node dashboard, click **Drives**.
6. Complete the replacement using the method that matches where you installed the drive:

    **If the drive is in the same slot as the original:**

    1. Click to **select the new (Offline) drive**.
    2. Click **Format** on the left menu and confirm.
    3. **Wait** until formatting is complete.
    4. Click **Initialize** on the left menu and confirm.

    **If the drive is in a different slot:**

    1. Click to **select the original failed/missing drive entry** in the list.
    2. Click **Replace** on the left menu.
    3. In the dialog, **select the new drive** from the list of available drives.
    4. Click **Submit** to confirm.

!!! success
    The system will begin the repair process. The drive status will change to "Repairing" and the dashboard will show an **Estimated Repair Completion date and time.**

---

## Scenario 2: Proactively Replace a Working Drive

Use this procedure when a drive is still operational but showing warning signs (such as wear level warnings or reallocated sectors) and you want to replace it before it fails.

!!! danger "**CAUTION: Before** initiating a drive repair operation, **verify**:"
    1. The node containing the drive to be replaced is in **maintenance mode**. All other nodes must be online and fully operational.
    2. No other drive repairs are running on different nodes within the same storage tier *(repairs on the same physical node are acceptable)*.
    3. You have positively identified the appropriate physical drive (See [Determine the Correct Physical Drive for Replacement](#determine-the-correct-physical-drive-for-replacement) above).
    4. The replacement drive is empty and compatible (see warnings at the top of this page).

1. **Place the node** that has the faulty drive **into Maintenance Mode.**
2. From the node dashboard, click **Drives**.
3. **Double-click the drive** to be replaced. This takes you to the drive's dashboard. 
4. Click **Close/Take Offline** on the left menu. Confirm by clicking *Yes*.
5. When the drive status shows **Offline**, **physically remove** the drive.  
6. **Verify** the UI shows the drive as *Missing*, confirming the right drive was removed.
7. **Insert the replacement drive.** (If your system requires a node shutdown first, follow the [Hot-Swap vs. Shutdown](#hot-swap-vs-shutdown-replacement) steps above.)
8. **Wait** for the new drive to be detected.  The new drive will show up as "Offline".
9. Complete the replacement using the method that matches where you installed the drive:

    **If the drive is in the same slot as the original:**

    1. Click to **select the new (Offline) drive**.
    2. Click **Format** on the left menu and confirm.
    3. **Wait** until formatting is complete.
    4. Click **Initialize** on the left menu and confirm.

    **If the drive is in a different slot:**

    1. Click to **select the original drive entry** (showing as **Missing** or **Offline**).
    2. Click **Replace** on the left menu.
    3. In the dialog, **select the new drive** from the list of available drives.
    4. Click **Submit** to confirm.

!!! success
    After the vSAN has completed a full walk, the repair process will begin and the drive status will change to "Repairing." The drive dashboard will indicate an **Estimated Repair Completion date and time.**

---

## During the Repair Process

!!! warning "Important"
    The following applies to **both** replacement scenarios:

    - **Do NOT restart, reset, or power off any nodes** until the drive shows a status of "Online." All other nodes must remain fully operational during the repair process.
    - **Do not initiate additional drive replace/repair operations** until this one has fully completed, unless the additional drive is on the same node or a different storage tier.
    - **Consider continuing Maintenance Mode:** The node can be taken out of Maintenance Mode once the drive has started repairing, however, leaving Maintenance Mode enabled for the duration can speed the repair process.


## Troubleshooting

If the **Replace** option is not working or the replacement process fails:

1. **Powercycle the node** - This can help the system properly detect the new drive and clear any stale state.
2. **Verify drive compatibility** - Ensure the replacement drive meets the same specifications as the original (capacity, interface type, performance class).
3. **Check drive seating** - Ensure the new drive is properly seated in the slot.
4. **Contact support** - If issues persist after a powercycle, contact VergeOS support for assistance.

---
title: Identifying a Failed Disk Drive
slug: identifying-a-failed-disk-drive
description: Learn how to identify and locate a failed disk drive in your VergeOS environment using diagnostic tools.
draft: false
date: 2023-01-24T19:14:51.610Z
tags:
  - disk
  - failed
  - troubleshooting
  - diagnostics
  - support
  - vsan
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2022-08-10T18:33:28.938Z
---

# How To Identify a Failed Disk In Your VergeOS Environment

VergeOS offers a diagnostic function that allows system administrators to turn a disk drive's LED light on or off, making it easier to physically identify a failed or problematic drive. Follow the steps below to locate a failed disk drive for replacement.

## Steps to Identify a Failed Disk

1. **Log in** to the VergeOS UI and navigate to the **dashboard** of the node where the failed disk resides.
2. On the **Node Dashboard**, locate and select **Diagnostics** from the left-hand column.
3. In the **Diagnostics** page, change the **Query** to **LED Control (Drive)**.
4. In the **LED Control (Drive)** details section:
    - **Path**: Enter the path to the drive you want to locate (e.g., `/dev/sdb`). If you're unsure of the path, check the system alerts and logs for recent error or warning messages.
    - **State**: Set the LED state to `On`, then click **Send** to activate the LED light on the drive.
5. **Locate the drive** with the active LED indicator in your physical server.
6. Once the drive has been identified and replaced, set the **State** to `Off` and click **Send** to deactivate the LED light.

!!! note "For detailed instructions on drive replacement, refer to the Maintenance section in the inline help under **[Drive Replacement](docs/product-guide/DriveReplacement)**. This section guides you through the entire process."

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

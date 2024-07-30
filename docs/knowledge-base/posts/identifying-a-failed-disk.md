---
title: Identifying a Failed Disk Drive
slug: identifying-a-failed-disk-drive
description: 
published: true
date: 2023-01-24T19:14:51.610Z
tags: disk, failed, troubleshooting, diagnostics, support, vsan
categories:
  - Troubleshooting
  - vSAN
editor: markdown
dateCreated: 2022-08-10T18:33:28.938Z
---

## How To Identify a Failed Disk In Your VergeOS Environment

There is a diagnostic function in the VergeOS platform to turn on and off a disk drive's LED light for easy identification.
To access this function follow these steps:
1. Login into the VergeOS platform and navigate to the dashboard of the node that you'd like to identify a disk drive for removal.
1. Once at the Node dashboard, on the left-hand column select the function labeled Diagnostics
1. In the Diagnostics page, change the Query to LED Control (Drive)
1. In the LED Control (Drive) details section, modify the Path to the drive that needs to be replaced.  (If in doubt, consult recent system alerts and logs for previous errors/warnings) Example: /dev/sdb
1. In the LED Control (Drive) details set the State to `On` and click `Send` to activate the LED.
1. After the drive has been physically located, set the State to `Off` and click `Send` to deactivate the LED.

Additional Information about identifying and replacing a physical drive can be found in the inline help within the category titled Maintenance, under the section Drive Replacement.  This section walks through the entire drive replacement process.
<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
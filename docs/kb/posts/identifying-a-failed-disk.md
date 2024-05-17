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

## How To Identify a Failed Disk In Your VergeIO Environment

There is a diagnostic function in the VergeIO platform to turn on and off a disk drive's LED light for easy identification.
To access this function follow these steps:
1. Login into the VergeIO platform and navigate to the dashboard of the node that you'd like to identify a disk drive for removal.
1. Once at the Node dashboard, on the left-hand column select the function labeled Diagnostics
1. In the Diagnostics page, change the Query to LED Control (Drive)
1. In the LED Control (Drive) details section, modify the Path to the drive that needs to be replaced.  (If in doubt, consult recent system alerts and logs for previous errors/warnings) Example: /dev/sdb
1. In the LED Control (Drive) details set the State to `On` and click `Send` to activate the LED.
1. After the drive has been physically located, set the State to `Off` and click `Send` to deactivate the LED.

Additional Information about identifying and replacing a physical drive can be found in the inline help within the category titled Maintenance, under the section Drive Replacement.  This section walks through the entire drive replacement process.
<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
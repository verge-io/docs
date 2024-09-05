---
title: Generating System Diagnostics
slug: generating-system-diagnostics
description: 
draft: false
date: 2024-03-28T15:48:32.403Z
tags: troubleshooting, diagnostics, support
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2022-09-02T15:35:21.754Z
---

## How to Generate System Diagnostics

VergeOS support may request that a system administrator generate a system diagnostics file for detailed logs from the platform. The diagnostic file will include detailed logs from all nodes in a system and package it into a single compressed file which can easily be then uploaded to support automatically or downloaded to be sent via email or a 3rd party file-sharing service.

Here are the steps to create and download a System Diagnostics file.
1. **Log in** to the **parent/root** environment.  The diagnostics file needs to be generated at the **Parent environment**, rather than a **Tenant**.
1. From the **Main dashboard**, in the left navigation menu, **click System**
1. On the **System dashboard**, in the left navigation menu, **click System Diagnostics**
1. From the **System Diagnostics**, in the left navigation menu, **click Build**

1. Once inside the **New System Diagnostic Report**, complete the **Name**, **Description**, and **check the "Send diagnostic information to VergeOS support**, then click **Submit** at the bottom. This will generate a compressed file of system logs.
1. Wait while the compressed log file is built. The status column will show the status as **'Building"** then on to **'Sending to Support'**.
1. When it is finished, the status will change to **'Sent to Support'**.
1. When sending completes, you can also download the file to your local computer.


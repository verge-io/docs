---
title: Filtering Syslog Messages from the System Logs View
slug: filtering-syslog-messages
author: VergeOS Documentation Team
draft: false
date: 2026-07-31T12:00:00.000Z
semantic_keywords:
  - "filter syslog messages vergeos system logs view"
  - "hide repeating kernel driver message from system logs"
  - "syslog_regex_list filter configuration vergeos"
  - "stop failed ioctl HBA message flooding the logs"
  - "filter cosmetic log noise out of the system logs ui"
use_cases:
  - filter_syslog_messages
  - suppress_cosmetic_log_noise
  - quiet_repeating_driver_message
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2026-07-31T12:00:00.000Z
description: >-
  Filter confirmed-cosmetic hardware and driver messages out of the System Logs
  view with syslog_regex_list. The filter hides lines from the UI only — the
  kernel still writes them to the raw syslog.
tags:
  - logs
  - syslog
  - log filtering
  - syslog_regex_list
  - troubleshooting
  - hardware
  - driver
  - regex
---

# Filtering Syslog Messages from the System Logs View

## Overview

!!! info "Key Points"
    - The `syslog_regex_list` setting hides matching lines from the **System > Logs** view.
    - The filter hides messages from the UI only — the kernel still writes them to the raw syslog.
    - Patterns use POSIX Extended Regular Expression (ERE) syntax, not PCRE.

Some hardware and driver messages repeat constantly in **System > Logs** without indicating a real fault. A storage HBA driver that logs a failed ioctl on every poll is a common example. These messages bury the log entries you care about. This article shows how to hide them with the `syslog_regex_list` setting.

!!! warning
    Use this filter only for messages you have confirmed are cosmetic. The filter quiets the log — it does not fix the underlying condition. Note anything worth monitoring, such as HBA firmware, before you suppress its output.

## Prerequisites

- A repeating log message that you have confirmed is not a real fault.
- A user with administrator access to the system API.

## Step 1: Get the Exact Message Text

1. Navigate to **System > Logs**.
2. Copy the repeating line.
3. Keep the part of the message that stays the same each time it fires.
4. Remove the parts that vary — controller instance numbers, hex status codes, and timestamps.

Example message:

```
kernel: mpi3mr1: Issue IOUCTL time_stamp: Failed ioc_status(0x000d) Loginfo(0x00000000)
```

The stable, matchable part is:

```
Issue IOUCTL time_stamp: Failed ioc_status
```

!!! warning
    Do not include the `kernel:` prefix in your pattern. The Logs view prepends this identifier for display — it is not part of the message the filter sees. A pattern anchored on `kernel:` never matches.

## Step 2: Build the Pattern

Patterns use POSIX Extended Regular Expression (ERE) syntax, not PCRE. The simplest reliable pattern is a plain substring with no anchors and no capture groups:

```
Issue IOUCTL time_stamp: Failed ioc_status
```

This pattern matches every controller instance and every status code because the variable parts are not in it. If you must match variable text, use ERE character classes and escape literal parentheses:

```
mpi3mr[0-9]*: Issue IOUCTL time_stamp: Failed ioc_status\(0x[0-9a-f]+\) Loginfo\(0x[0-9a-f]+\)
```

!!! success "Prefer the Shorter Substring"
    Broader matching is usually fine here. The goal is to quiet a known-cosmetic line, so use the shorter substring.

## Step 3: Add the Pattern to syslog_regex_list

The `syslog_regex_list` setting is not exposed in **System > Settings > Advanced Settings** by default, so set it through the API.

1. Navigate to **System > API Documentation**.
2. Find the settings endpoint.
3. POST a new entry. If `syslog_regex_list` already exists, use PUT instead.

The value is a JSON array of pattern strings:

```json
{
  "key": "syslog_regex_list",
  "value": "[\"Issue IOUCTL time_stamp: Failed ioc_status\"]",
  "description": "syslog message filter"
}
```

To filter more than one message, add more elements to the array:

```json
{
  "key": "syslog_regex_list",
  "value": "[\"Issue IOUCTL time_stamp: Failed ioc_status\",\"another pattern here\"]"
}
```

## Step 4: Reload the Filter on Each Node

Log capture reads the filter when you toggle it. Do this one node at a time:

1. Edit the node.
2. Clear the **Capture System Logs** checkbox and click **Submit**.
3. Wait 15 to 30 seconds.
4. Select the **Capture System Logs** checkbox and click **Submit**.

If a node still shows the message after you toggle log capture, reboot that node to force the reload.

## Step 5: Verify the Filter

Wait until the message would normally recur, then check **System > Logs**. The line no longer appears.

!!! info "Verify in the Logs View, Not the Raw Syslog"
    The raw syslog inside a system diagnostics file still contains the message by design. Only the Logs view reflects the filter.

## Troubleshooting

### The message still appears in the Logs view

**Cause**: The pattern does not match, or a node has not reloaded the filter.

**Solution**:

1. Make sure the pattern does not include the `kernel:` prefix.
2. Make sure the pattern uses ERE syntax — escape literal parentheses as `\(` and `\)`.
3. Toggle **Capture System Logs** on the node again.
4. If the message still appears, reboot the node.

### The message still appears in a system diagnostics file

**Cause**: The filter hides lines from the UI Logs view only. The kernel still writes them to the raw syslog.

**Solution**: This is expected behavior. Verify the filter in **System > Logs**, not in a system diagnostics file.

## Additional Resources

- [Advanced System Settings](/product-guide/system/advanced-system-settings/)
- [Node Diagnostics](/product-guide/system/node-diagnostics/)
- [System Logs](/knowledge-base/system-logs/)
- [Generating System Diagnostics](/knowledge-base/generating-system-diagnostics/)

!!! question "Need Help?"
    If you are not sure whether a repeating log line is cosmetic or a real fault, contact the VergeOS support team before you suppress it.

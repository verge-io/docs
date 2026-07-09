---
title: Suppressing Noisy Messages from the System Logs View
slug: suppressing-noisy-messages-system-logs-view
description: Hide confirmed-cosmetic hardware and driver messages from the System Logs view with a syslog_regex_list filter. The filter only hides lines from the UI Logs view — the kernel still writes them to the raw syslog.
author: VergeOS Documentation Team
draft: false
date: 2026-07-09T00:00:00.000Z
semantic_keywords:
  - "suppress noisy syslog messages vergeos logs view"
  - "hide repeating kernel driver message from system logs"
  - "syslog_regex_list filter configuration vergeos"
  - "stop failed ioctl HBA message flooding the logs"
  - "filter cosmetic log noise out of the system logs ui"
use_cases:
  - suppress_cosmetic_log_noise
  - filter_system_logs_view
  - quiet_repeating_driver_message
tags:
  - logs
  - syslog
  - system logs
  - log filtering
  - syslog_regex_list
  - troubleshooting
  - hardware
  - driver
  - regex
categories:
  - Troubleshooting
  - System
  - Best Practices
editor: markdown
dateCreated: 2026-07-08T00:00:00.000Z
---

# Suppressing Noisy Messages from the System Logs View

Some hardware and driver messages repeat constantly in **System → Logs** without indicating a real fault — a storage HBA driver logging a failed ioctl on every poll is a common one. These are cosmetic: the message is real, but it doesn't reflect a problem VergeOS can act on, and it buries the log entries you actually care about. VergeOS can hide matching lines from the Logs view by adding one or more regular expressions to the `syslog_regex_list` setting.

!!! warning "The filter hides the message, it doesn't stop it"
    The filter only hides matching lines from the UI Logs view. It does not stop the kernel from writing them, so they still appear in the raw syslog inside a sysdiag. That's expected — verify the filter in the Logs view, not by grepping a sysdiag.

## When to use this

Use it for confirmed-cosmetic log noise — a repeating driver, IPMI, or SEL message you've already ruled out as a real fault. Don't use it to hide messages you haven't diagnosed. Filtering quiets the log, it doesn't fix the underlying condition, so note anything worth monitoring (for example, HBA firmware) before you suppress its output.

## Step 1 — Get the exact message text

Open **System → Logs** and copy the repeating line. You want the part of the message that stays the same every time it fires, so drop anything that varies — controller instance numbers, hex status codes, timestamps.

Example message:

```
kernel: mpi3mr1: Issue IOUCTL time_stamp: Failed ioc_status(0x000d) Loginfo(0x00000000)
```

The stable, matchable part is:

```
Issue IOUCTL time_stamp: Failed ioc_status
```

Do not include the `kernel:` prefix in your pattern. That prefix is the syslog identifier the Logs view prepends for display — it isn't part of the message the filter sees. A pattern anchored on `kernel:` will never match.

## Step 2 — Build the pattern

Patterns are POSIX Extended Regular Expressions (ERE), not PCRE. The simplest reliable pattern is a plain substring — no anchors, no capture groups:

```
Issue IOUCTL time_stamp: Failed ioc_status
```

That matches on every controller instance and every status code, because you left the variable parts out. If you do need to match variable text, use ERE character classes and escape literal parentheses:

```
mpi3mr[0-9]*: Issue IOUCTL time_stamp: Failed ioc_status\(0x[0-9a-f]+\) Loginfo\(0x[0-9a-f]+\)
```

!!! tip "Prefer the shorter substring"
    Broader matching is usually fine here. The goal is to quiet a known-cosmetic line, so err toward the shorter substring.

## Step 3 — Add the pattern to syslog_regex_list

This setting isn't exposed in **System → Settings → Advanced Settings** by default, so edit it through the API. Go to **System → API Documentation** (the Swagger UI) and find the settings endpoint. POST a new entry, or use PUT if `syslog_regex_list` already exists. The value is a JSON array of pattern strings:

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

## Step 4 — Reload the filter on each node

Log capture reloads the filter when you toggle it. Do this one node at a time:

1. Edit the node.
2. Uncheck **Capture System Logs** and Submit.
3. Wait 15 to 30 seconds.
4. Re-check **Capture System Logs** and Submit.

If a node still shows the message after toggling, reboot that node to force the reload.

## Step 5 — Verify

Wait until the message would normally recur, then check **System → Logs**. The line should no longer appear.

!!! info "Verify in the Logs view, not the raw syslog"
    Don't verify against a sysdiag or raw syslog. The raw log still contains the message by design — only the Logs view reflects the filter.

## A few gotchas

!!! warning "Common pitfalls"
    - **The `kernel:` prefix isn't matchable.** It's the syslog identifier prepended for display, not part of the message. Leave it out of your pattern.
    - **ERE, not PCRE.** Use POSIX Extended Regular Expression syntax. Escape literal parentheses as `\(` and `\)`, and use classes like `[0-9]*` and `[0-9a-f]+`.
    - **Filtering doesn't fix the cause.** These messages mean the underlying call is actually failing (in the example, the HBA ioctl). Suppressing the log is cosmetic — track the hardware or firmware separately if it warrants it.

## Additional Resources

- [Advanced System Settings](/product-guide/system/advanced-system-settings/)
- [Node Diagnostics](/product-guide/system/node-diagnostics/)

!!! question "Need Help?"
    If you're not sure whether a repeating log line is cosmetic or a real fault, contact VergeOS support before you suppress it.

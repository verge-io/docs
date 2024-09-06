---
title: Reasons a Windows VM Restarted Unexpectedly
slug: reasons-a-windows-vm-restarted-unexpectedly
description: 
draft: false
date: 2023-01-24T14:19:20.724Z
tags: vm, windows, restart, restarted, rebooted, unexpectedly
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-08-17T18:15:41.557Z
---

## Reasons a Windows VM Restarted Unexpectedly


If you have a Windows VM that has recently restarted unexpectedly, the first place where to begin is to review the logs from the VM dashboard.
You can reach the log viewer by navigating from the Main Menu > Machines > Virtual Machines > the name of the VM you are investigating > Logs.

From the Log view, search through (or filter the results) under the Message section. Several status messages will indicate why the VM stopped running.  The following are the most common and a brief explanation of each:
- Message: VM action 'kill' sent.
    This indicates that a VergeOS user issued a Kill Power command from the VergeOS interface. The log will indicate the user under the Source column
    In this scenario, consult with the system user to determine the reason for issuing this command.
- Message: VM action 'poweroff' sent.  This indicates that a VergeOS user issued a graceful Power Off command from the VergeOS interface.  This command successfully interacted with the Guest OS ACPI to gracefully stop the VM. The log will indicate the user under the Source column.
    In this scenario, consult with the system user to determine the reason for issuing this command.
- Message: VM has shutdown.  This indicates that the shutdown command was issued from inside the guest operating system directly.
    In this scenario, consult with the guest operating system logs to determine the reason for the shutdown command.
- Message: VM has reset.  This indicates that the restart command was issued from inside the guest operating system directly.
    In this scenario, consult with the guest operating system logs to determine the reason for the reset command.
> **Best Practice:** A guest VM running Windows experiencing unexpected restarts is often found to be caused by the Microsoft Windows Update Services being configured to automatically apply updates that require a restart.  To investigate this further, consult with Knowledge-Base articles about the particular version of the Windows OS.<BR>
> One of the best places to start investigating at a Windows Guest level is using Windows Event Viewer and reviewing the Windows Update logs for more information.
> {.is-info}

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

---
title: Enabling System SSH Access
slug: enabling-system-ssh
description: Instructions for enabling SSH access to a System
draft: false
date: 2025-02-17T19:25:40.109Z
tags:
  - rules
  - network
  - access
categories:
  - Network Rules
  - System Administration
editor: markdown
dateCreated: 2022-07-11T18:16:54.516Z
---

# Enabling System SSH Access

!!! info "Key Points"
    - SSH access to a VergeOS system is generally not needed as full access is provided from the UI.
    - SSH should only be enabled for specific hardware diagnostics or other special circumstances.
    - Although VergeOS does employ safety protections, opening SSH on any system can introduce vulnerability.

!!! danger "Important SSH Security Procedures"
    - Always use source-controlled external rules to strictly limit ssh access to trusted addresses.
    - Enable SSH access on a temporary basis: disable rules again when done with the session.

## Steps to Enable SSH access

Network rules to allow SSH are auto-created (but disabled) during system installation.

1. **Enable the core network rule:** Navigate to the Core network dashboard, modify the ***SSH Access*** rule, select the **Enabled** option checkbox and **Submit** to save the change.
**Example Core Network Rule:**
![ssh-rule-core.png](/product-guide/screenshots/ssh-rule-core.png)

2. **Enable the external UI network rule and add source control criteria:** Navigate to the external network dashboard, modify the **"SSH Access"*** rule, and specify specific source IP address(es) and/or address range(s) to tightly control the devices/networks allowed SSH access.
**Example External Network Rule:**
![ssh-rule-external.png](/product-guide/screenshots/ssh-rule-external.png)

3. **Apply Rules** to both networks.

## Warning

!!! danger

    - VergeOS is a specialized kernel, with a read-only overlay.  Do not install additional Debian packages or applications as they can conflict with VergeOS operation and cause system malfunction or data loss. Additionally, extraneous programs are wiped at reboot.
    - Check with VergeOS support before making any modifications at the command line.  Issues resulting from unsanctioned command-line changes are the sole responsibility of the customer.

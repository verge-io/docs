---
title: Secure Boot Certificate Expiry - Microsoft Guest VMs (June 2026)
slug: secure-boot-certificate-expiry-2026
description: How to resolve the expiring Microsoft Secure Boot certificate on Windows guest VMs using the one-click fix introduced in VergeOS 26.1.5.
author: VergeOS Documentation Team
draft: false
date: 2026-05-19T00:00:00.000Z
semantic_keywords:
  - "secure boot certificate expiring june 2026"
  - "microsoft CA 2023 secure boot keys windows vm"
  - "current secure boot certificate will expire boot issues"
  - "vergeos 26.1.5 windows vm certificate update"
  - "bitlocker secure boot certificate renewal"
use_cases:
  - resolve_secure_boot_certificate_expiry
  - apply_microsoft_ca_2023_keys
  - windows_vm_secure_boot_maintenance
tags:
  - secure boot
  - windows
  - certificate
  - vm
  - 26.1.5
  - microsoft
  - boot
categories:
  - VMs
editor: markdown
dateCreated: 2026-05-19T00:00:00.000Z
---

# Secure Boot Certificate Expiry - Microsoft Guest VMs (June 2026)

## Overview

!!! info "Key Points"
    - Microsoft's Secure Boot certificate expires in June 2026 and may cause Windows VMs to fail to boot or accept updates
    - VergeOS 26.1.5 introduces a one-click fix to apply the Microsoft CA 2023 Secure Boot keys
    - The VM must be powered off before applying the fix
    - If BitLocker is enabled, have your recovery key available before rebooting

Microsoft's Secure Boot signing certificate used in Windows guest VMs expires in June 2026. Affected VMs will display a warning alert and a yellow banner in VergeOS. Without remediation, Windows VMs may fail to boot or refuse OS updates after the certificate expires.

VergeOS 26.1.5 includes a built-in resolution that applies the Microsoft CA 2023 Secure Boot keys directly from the VM's detail page.

## Prerequisites

- VergeOS 26.1.5 or later (see [Alternate Resolution](#alternate-resolution-without-vergeos-2615) if you cannot upgrade)
- A snapshot of the VM taken before proceeding
- If BitLocker is enabled on the guest: your BitLocker recovery key must be accessible before rebooting
- The VM must be **powered off** before applying the fix

## Identifying Affected VMs

Affected VMs will show two indicators:

**Alert panel**

A warning-level alert will appear with the status message:

> *Current secure boot certificate will expire June 2026 and may cause boot/update issues*

Double-clicking the alert navigates directly to the affected VM's detail page.

**VM detail page banner**

A yellow banner will appear at the top of the VM's detail page:

> *Current secure boot certificate will expire June 2026 and may cause boot/update issues*

## Steps

!!! warning "Take a snapshot first"
    Before proceeding, take a snapshot of the VM. This is your rollback point if anything goes wrong.

1. **Power off the VM**
   - The fix cannot be applied while the VM is running. If the VM is on when you click Apply, an error will appear — power it off first and then retry.

2. **Navigate to the VM detail page**
   - You can double-click the alert from the alert panel, or browse to the VM directly.

3. **Click "Apply" on the yellow banner**
   - The yellow banner at the top of the VM detail page contains an **Apply** button.

4. **Confirm the action**
   - A confirmation dialog will appear:

     > *Resolution: Current secure boot certificate will expire June 2026 and may cause boot/update issues. This will apply the Microsoft CA 2023 secure boot keys. Please ensure you have a snapshot of this machine before performing this action. If you have bitlocker enabled you will need to have your key ready on reboot.*
     >
     > *Would you like to apply this resolution now?*

   - Click **Yes** to apply the Microsoft CA 2023 Secure Boot keys.

5. **Power on the VM**
   - After the fix is applied, start the VM normally.
   - If BitLocker is enabled, the guest may prompt for your recovery key on first boot — enter it when prompted.

## Troubleshooting

!!! warning "Common Issues"
    - **Error when clicking Apply** — The VM must be fully powered off. Confirm the VM status shows *Stopped* before retrying.
    - **BitLocker recovery key prompt on boot** — Expected behavior after updating Secure Boot keys. Enter your BitLocker recovery key to unlock the drive and allow Windows to boot normally.
    - **Warning banner persists after applying** — Refresh the VM detail page. If the banner remains, confirm the fix completed without errors and contact support.

## Alternate Resolution (Without VergeOS 26.1.5)

If you are unable to upgrade to VergeOS 26.1.5, Microsoft has published manual instructions for renewing Secure Boot certificates before the June 2026 expiration:

[Secure Boot Playbook for Certificates Expiring in 2026 - Microsoft Tech Community](https://techcommunity.microsoft.com/blog/windows-itpro-blog/secure-boot-playbook-for-certificates-expiring-in-2026/4469235)

!!! tip "Upgrade recommended"
    Upgrading to VergeOS 26.1.5 is the simplest path. The manual process above requires Windows-level access to each affected VM and is more involved than the built-in one-click fix.

## Additional Resources

- [VM Snapshots and Restores](/product-guide/backup-dr/vm-snapshots-restores)
- [Licensing and Software Updates](/product-guide/system/licensing-and-updates)

## Feedback

!!! question "Need Help?"
    If you encounter issues applying the Secure Boot certificate fix or have questions about affected VMs, please don't hesitate to reach out to the [VergeOS Support Team](/support).

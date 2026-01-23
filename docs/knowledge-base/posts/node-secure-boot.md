---
title: Secure Boot and Boot Integrity for Physical Nodes
slug: node-secure-boot
description: Understanding VergeOS boot integrity protection and why traditional UEFI Secure Boot is not used
author: VergeOS Documentation Team
published: true
date: 2026-01-16
tags:
  - security
  - uefi
  - secure-boot
  - boot-integrity
  - tamper-protection
categories:
  - Installation
  - Security
editor: markdown
dateCreated: 2026-01-16
---

# Secure Boot and Boot Integrity for Physical Nodes

!!! info "Key Points"
    - VergeOS does not use traditional UEFI Secure Boot for physical nodes
    - VergeOS implements its own boot integrity verification that prevents tampered images from booting
    - This approach provides practical tamper protection without the limitations of UEFI Secure Boot

## Overview

VergeOS takes a different approach to boot security than traditional UEFI Secure Boot. While VergeOS physical nodes do not use BIOS-level Secure Boot, the system implements its own boot integrity mechanism that provides robust protection against tampering.

## VergeOS Boot Integrity Protection

VergeOS has implemented its own methodology to ensure boot integrity. This mechanism verifies that the VergeOS image has not been modified or tampered with before allowing the system to boot.

### How It Works

When a VergeOS node starts up, the system validates the integrity of the boot image. If the image has been tampered with or modified in any way, VergeOS will refuse to boot. This ensures that only authentic, unmodified VergeOS software runs on your infrastructure.

### Comparison with Traditional UEFI Secure Boot

| Aspect | UEFI Secure Boot | VergeOS Boot Integrity |
|--------|------------------|------------------------|
| **Tamper protection** | Prevents boot of unsigned/modified OS | Prevents boot of tampered VergeOS images |
| **Alternative OS boot** | Blocks unsigned operating systems entirely | Does not prevent booting a different OS |
| **Implementation** | BIOS/firmware level, requires signed keys | Software-level verification |
| **Practical security** | Protects against unauthorized OS loading | Protects against VergeOS image tampering |

The key difference is timing and scope:

- **UEFI Secure Boot** operates at the BIOS level and won't even attempt to boot an unsigned or unregistered operating system
- **VergeOS Boot Integrity** allows the boot process to begin but will not complete boot if the VergeOS image has been tampered with

This means that while someone could theoretically install a completely different operating system on the hardware, they cannot modify the VergeOS image itself and have it boot successfully. Any tampering with VergeOS system files will be detected and prevent boot.

## Why VergeOS Does Not Use UEFI Secure Boot

Traditional UEFI Secure Boot presents several challenges that make it impractical for VergeOS:

### Certification Requirements

UEFI Secure Boot requires operating systems to be signed with keys that are registered in the system firmware. This process is controlled by a limited set of gatekeepers:

- **Microsoft** maintains control over the primary Secure Boot key infrastructure
- Only a small number of Linux distributions have registered Secure Boot keys (primarily Red Hat and Ubuntu)
- Most Linux distributions that support Secure Boot actually bootstrap through Ubuntu's signed bootloader (shim) to load their own GRUB bootloader

### Practical Limitations

For specialized operating systems like VergeOS, obtaining and maintaining Secure Boot certification would require:

- Ongoing relationship with certificate authorities
- Re-signing with each update
- Dealing with potential key revocation scenarios

## Security Implications

!!! tip "Practical Security"
    For most deployment scenarios, VergeOS boot integrity protection provides equivalent practical security to UEFI Secure Boot. Your VergeOS infrastructure is protected against image tampering, which is the primary concern for production environments.

### What VergeOS Boot Integrity Protects Against

- Modification of VergeOS system files
- Injection of malicious code into the VergeOS image
- Tampering with the boot process after VergeOS installation

### What Requires Physical Security Controls

- Installation of an entirely different operating system (requires physical access and storage reformation)
- BIOS/firmware-level attacks (mitigate with physical security and firmware passwords)

!!! note "Physical Security"
    As with any infrastructure, physical security of your nodes remains important. VergeOS boot integrity protects the software layer, while physical access controls protect against hardware-level attacks.

## Disabling UEFI Secure Boot

Before installing VergeOS on physical nodes, you must disable UEFI Secure Boot in the system BIOS/UEFI settings. The specific steps vary by hardware manufacturer, but generally involve:

1. Enter the BIOS/UEFI setup during system boot (typically F2, Del, or F10)
2. Navigate to the Security or Boot section
3. Locate the Secure Boot option and set it to **Disabled**
4. Save changes and exit
5.

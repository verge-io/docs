---
title: vSAN Encryption Information
slug: vsan-encryption
description: Overview of VergeOS vSAN at-rest encryption, key management options, and site sync encryption.
author: VergeOS Documentation Team
draft: false
date: 2026-04-03T00:00:00Z
semantic_keywords:
  - "vSAN at-rest encryption, AES-256 drive encryption, data protection"
  - "encryption key management, USB key disk, passphrase startup"
  - "site sync encryption, snapshot synchronization security, data in transit"
use_cases:
  - security_hardening
  - configuration
  - data_protection
  - compliance
tags:
  - encryption
  - vsan
  - storage
  - security
  - data-protection
  - aes-256
  - key-management
categories:
  - vSAN
editor: markdown
dateCreated: 2024-09-03T00:00:00Z
---

# vSAN Encryption Information

!!! danger "Encryption Must Be Enabled During Installation"
    vSAN encryption can **only** be configured during the initial VergeOS installation. It **cannot** be enabled on an existing system without a full reinstall. Plan for encryption before your first deployment.

VergeOS vSAN supports **at-rest encryption** to protect data stored on physical drives. Encryption status is tracked per drive and per storage tier, so you can confirm coverage across the entire system.

## Verifying Encryption Status

Encryption is system-wide -- if it is enabled, all drives in the vSAN are encrypted. You can verify by navigating to **Nodes > [any node] > Drives**, double-clicking any drive, and confirming the **Encrypted** checkbox is checked.

Encryption status is also visible at the tier level. Navigate to **Infrastructure > vSAN Tiers**, double-click a tier, and check the **Encrypted** field in the status card.

## How Encryption Works

- Encryption for the vSAN is configured **during the initial installation only**.
- Data is encrypted using **AES-256** at rest on every drive in the vSAN. VergeOS leverages hardware AES-NI acceleration on modern CPUs, so encryption has negligible performance impact.
- Encryption operates at the block level, so all data -- including VM disks, metadata, and file uploads -- is protected transparently.

## Startup and Key Management

System startup on an encrypted system can be configured in two ways:

1. **USB Key Disk (most common)** -- During installation, encryption keys are written to a USB drive. These drives are typically plugged into the first two nodes (controller nodes) of an encrypted system. All other nodes retrieve the key from the controllers during boot, so only the controller nodes need the USB drives connected. The USB drive requires minimal storage (less than 1 GB).

2. **Passphrase Prompt** -- If the controller nodes do not have USB encryption key drives connected, the system will prompt an operator to enter the encryption passphrase to complete the power-up process.

!!! tip "Changing the Encryption Passphrase"
    The encryption passphrase can be changed after installation without requiring a cluster restart. Contact **Verge.io Support** to schedule a passphrase rotation.

!!! danger "Key Loss Results in Permanent Data Loss"
    If the encryption passphrase is lost **and** the USB key disks are unavailable, the encrypted vSAN data is **unrecoverable**. There is no backdoor or recovery mechanism. To protect against this scenario:

    - **Keep backup copies** of the USB key disk in a secure, off-site location.
    - **Store the encryption passphrase** in a dedicated secrets manager or physical safe -- separate from the USB key backups.
    - **Document the key custodians** responsible for key storage and recovery procedures.

## Performance Impact

VergeOS vSAN encryption uses AES-256 with hardware AES-NI acceleration. On modern CPUs that support AES-NI (standard on all current server processors), encryption and decryption are handled in hardware with **negligible performance overhead**. No additional configuration is needed to enable hardware acceleration -- it is used automatically when available.

## Disaster Recovery Considerations

When restoring encrypted vSAN snapshots to a different cluster through a site sync:

- **Snapshot data is decrypted on the source** before being transmitted. The destination cluster does not need the source cluster's encryption keys.
- **The destination cluster uses its own encryption** (if configured). Data is re-encrypted with the destination's keys upon write.
- **A destination cluster does not need encryption enabled** to receive snapshots from an encrypted source. The two encryption configurations are independent.

This means disaster recovery workflows function the same way regardless of encryption status on either side. Encryption protects data at rest on each site independently.

## Multi-Tenancy and Encryption

When vSAN encryption is enabled, **all data on the physical drives is encrypted**, including all tenant workloads. Tenant virtual disks, snapshots, and NAS volumes are stored on the encrypted vSAN and are protected at rest automatically.

Encryption is managed at the host (parent) level -- individual tenants do not manage their own encryption keys and do not need to take any action. From the tenant's perspective, storage operates normally with no visible difference.

## Site Sync Encryption

All site sync traffic is encrypted in transit by default. Snapshot data transmitted between sites is protected regardless of whether at-rest encryption is enabled on either site.

!!! info "Information about encrypting a Site Synchronization can be found in the [Product Guide](/product-guide/backup-dr/sync-configuration)"

---

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to the [VergeOS Support Team](/support).

!!! note "Document Information"
    - Last Updated: 2026-04-03
    - Date Created: 2024-09-03
    - VergeOS Version: 26.1.2

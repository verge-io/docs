---
title: "Storage Units and Capacity Reporting"
description: "How VergeOS represents storage capacity in the GUI and usage reports, including the TB-vs-TiB labeling behavior, a worked example, and a comparison to manufacturer-advertised disk capacity."
semantic_keywords:
  - "VergeOS storage units TB TiB"
  - "tebibyte terabyte capacity reporting"
  - "base-1024 base-1000 storage math"
  - "disk capacity SI binary prefix VergeOS"
  - "why does VergeOS show less storage than the drives I purchased"
use_cases:
  - capacity_planning
  - interpreting_usage_reports
  - reconciling_disk_manufacturer_capacity
  - troubleshooting_apparent_capacity_mismatch
  - administrator_reference
tags:
  - storage
  - capacity-planning
  - units
  - reporting
  - reference
categories:
  - Storage
---

# Storage Units and Capacity Reporting

## Overview

VergeOS displays storage capacity using familiar labels (KB, MB, GB, TB) throughout the GUI, dashboards, and usage reports, with calculations of storage values using **base-1024 (binary) math**. The labels are SI-style ("TB"), with underlying values in tebibytes (TiB), gibibytes (GiB), and so on. This page explains that behavior, why it matters, and how to reconcile VergeOS figures with the SI capacity figures that disk manufacturers advertise.

This labeling convention is not unique to VergeOS. Most operating systems and enterprise infrastructure storage products (Windows, most Linux tools, traditional SAN/NAS arrays, and other HCI platforms) display storage values using SI-style labels — KB, MB, GB, TB — while performing the underlying math in base-1024. Disk manufacturers, by contrast, consistently use the strict SI definition (10¹² bytes per TB) on product labels and datasheets, which is what creates the apparent discrepancy described below.

## Quick reference

!!! info "What “TB” means in the VergeOS UI"
    A value displayed as **1 TB** in VergeOS represents **1 TiB** — i.e. 2⁴⁰ bytes (1,099,511,627,776 bytes), not the SI definition of 10¹² bytes (1,000,000,000,000 bytes). The same principle applies to KB / MB / GB.

## Why this matters

Disk manufacturers and most consumer-facing storage products use SI (decimal, base‑1000) prefixes, an industry convention that results in larger‑appearing capacity numbers than binary units.  Operating systems and infrastructure platforms, including VergeOS, generally use binary (base-1024) calculations because storage is allocated, addressed, and reported in powers of two. Because both the disk manufacturer's spec sheet and the VergeOS UI use the label "TB", the two figures look directly comparable — but they are not. The manufacturer's "TB" means 10¹² bytes; VergeOS's "TB" means 2⁴⁰ bytes (1 TiB).

The difference compounds with size: a 1 TB label in VergeOS is ~9.95% larger than a manufacturer-advertised 1 TB drive. At petabyte scale the gap is closer to ~12.6%.

## Worked example

A drive advertised by the manufacturer as **1 TB** holds 1,000,000,000,000 bytes (10¹² B, SI).

The same byte count reported in VergeOS would display as **~0.909 TB**, because VergeOS uses TiB math (1 TB label = 1,099,511,627,776 B).

Equivalently, a value VergeOS labels as **1 TB** is **1,099,511,627,776 B**, which is **~1.0995 SI TB** — about **9.95% larger** than what the drive's label advertises.

## Example scenario

A customer purchases four drives labeled by the manufacturer as **4 TB** each, expecting **16 TB** of raw capacity. After installation, the VergeOS UI reports the array at approximately **14.55 TB**, and the customer asks where the missing ~1.45 TB went.

Nothing is missing — every byte that was purchased is still there and usable. The drives each hold 4 × 10¹² bytes (4 SI TB), and VergeOS has access to all of that capacity. It simply reports the same byte count using TiB math but with a "TB" label:

- 4 SI TB per drive × 4 drives = 16,000,000,000,000 bytes
- 16,000,000,000,000 ÷ 1,099,511,627,776 = **~14.55 TiB**, displayed as "14.55 TB"

The same effect at common drive sizes:

| Manufacturer label | VergeOS displays |
| --- | --- |
| 1 TB drive | ~0.91 TB |
| 4 TB drive | ~3.64 TB |
| 8 TB drive | ~7.28 TB |
| 12 TB drive | ~10.91 TB |
| 16 TB drive | ~14.55 TB |

## Unit reference

| VergeOS label | Internal value (bytes) | SI equivalent | Difference vs. SI |
| --- | --- | --- | --- |
| 1 KB | 1,024 (2¹⁰) | 1,000 | +2.40% |
| 1 MB | 1,048,576 (2²⁰) | 1,000,000 | +4.86% |
| 1 GB | 1,073,741,824 (2³⁰) | 1,000,000,000 | +7.37% |
| 1 TB | 1,099,511,627,776 (2⁴⁰) | 1,000,000,000,000 | +9.95% |
| 1 PB | 1,125,899,906,842,624 (2⁵⁰) | 10¹⁵ | +12.59% |

## Where this applies

The TB-as-TiB convention applies throughout the VergeOS platform, including:

- vSAN capacity and free-space figures shown on system, cluster, and tier dashboards
- Storage tier sizing reported in the GUI (see [Storage Tiers](/product-guide/storage/storage-tiers))
- Virtual machine drive sizes and snapshots
- NAS volume sizes
- Tenant resource allocations and [usage reports](/product-guide/tenants/tenant-usagereports)
- Backup and replication size reporting

Beyond the labeling convention, vSAN usable capacity is also affected by redundancy levels, which reduce usable capacity in exchange for fault tolerance. Deduplication, by contrast, generally increases usable capacity by collapsing duplicate blocks. These effects are independent of the unit-labeling behavior described on this page. See [vSAN Architecture](/product-guide/storage/vsan-architecture) and [vSAN Redundancy Levels](/product-guide/storage/vsan-redundancy-levels) for details.

## Display rounding across screens

The same drive's capacity can appear differently from one screen to another in the VergeOS UI. Some pages — such as the node drive listing — round to whole numbers and tend to match the manufacturer's SI label (a drive sold as "2 TB" appears as "2 TB"). Other pages — such as the node drive dashboard — display the precise binary value rounded to the nearest tenth (the same drive appears as "1.8 TB"). Both figures refer to the identical physical drive; only the rounding convention differs.

## Planning guidance

When sizing a VergeOS deployment from manufacturer specifications:

- Treat the "TB" figure on a drive's label as **SI TB** (10¹² bytes).
- Convert to binary calculations (TiB) before comparing to VergeOS figures: TiB ≈ SI TB × 0.9095.
- Or, equivalently, multiply VergeOS "TB" figures by ~1.0995 to compare against drive-label capacity.

## Related guides

- [Node Sizing Guide](/implementation-guide/sizing) — sizing recommendations for VergeOS deployments
- [vSAN Architecture](/product-guide/storage/vsan-architecture) — how vSAN distributes and protects data
- [vSAN Redundancy Levels](/product-guide/storage/vsan-redundancy-levels) — how redundancy affects usable capacity
- [Storage Tiers](/product-guide/storage/storage-tiers) — performance and capacity tiering
- [Tenant Usage Reports](/product-guide/tenants/tenant-usagereports) — interpreting per-tenant capacity reporting

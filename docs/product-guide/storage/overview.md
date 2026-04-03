---
title: "Storage Overview"
description: "An overview of VergeOS storage capabilities including the vSAN distributed storage engine, storage tiers, encryption, data protection, and file-level storage services."
semantic_keywords:
  - "VergeOS storage overview, vSAN storage capabilities, hyperconverged storage"
  - "distributed storage engine, software-defined storage, storage management"
  - "storage tiers, encryption at rest, data protection, NAS integration"
  - "virtual disk provisioning, storage health monitoring, capacity planning"
use_cases:
  - storage_management
  - administration
  - initial_setup
  - capacity_planning
tags:
  - vsan
  - storage
  - overview
  - encryption
  - data-protection
  - tiered-storage
  - nas
categories:
  - Storage
---

# Storage Overview

## vSAN (VergeFS)

The VergeFS **Virtual Storage Area Network (vSAN)** is a fundamental component that tightly integrates storage into the VergeOS Virtual Data Center (VDC). It provides a distributed, multi-tiered storage foundation for all VergeOS workloads.

*[VDC]: A portable encapsulation of compute, network, and storage resources that ensures isolation and provides for autonomous management within a shared hardware environment.

### Key Features

- **Direct drive access**: Manages physical drives without requiring hardware RAID controllers or external storage abstraction layers
- **Multi-tier storage**: Organizes drives into [up to five performance tiers](/product-guide/storage/storage-tiers) so workloads can target the right balance of speed and cost
- **Encryption at rest**: Protects stored data with encryption for environments that require data-at-rest security
- **Comprehensive monitoring and reporting**: Real-time visibility into [storage performance, capacity, and health](/product-guide/storage/vsan-health-monitoring)
- **Intelligent load balancing**: Automatically distributes I/O across available storage devices
- **Data efficiency**: Built-in inline deduplication reduces storage consumption
- **Data integrity**: Continuous bit-rot detection protects against silent data corruption
- **Self-healing**: Automatic recovery from hardware failures with configurable [redundancy levels](/product-guide/storage/vsan-redundancy-levels)
- **Horizontal scalability**: Add storage capacity and performance by adding nodes
- **Legacy hardware support**: Wide device support, including HDD and [Fibre Channel](/product-guide/storage/fibre-channel) to integrate existing SAN infrastructure
- **Virtual disk provisioning**: Create and manage virtual disks without manual LUN mapping or datastore configuration

New to VergeOS storage? Start with [vSAN Fundamentals](/product-guide/storage/vsan-fundamentals) for a conceptual introduction, or dive into [vSAN Architecture](/product-guide/storage/vsan-architecture) for detailed technical information about block-level data distribution.

### Storage Operations

- [**Storage Tiers**](/product-guide/storage/storage-tiers): Configure and manage performance tiers across your drive pool
- [**Preferred Tier**](/product-guide/storage/preferred-tiers): Control which tier is targeted first for new data placement
- [**Capacity Planning**](/product-guide/storage/capacity-planning): Estimate storage requirements, monitor utilization, and plan for growth
- [**vSAN Health Monitoring**](/product-guide/storage/vsan-health-monitoring): Track drive health, detect degradation, and respond to alerts
- [**vSAN Diagnostics**](/product-guide/storage/vsan-diagnostics): Troubleshoot storage performance and resolve issues
- [**vSAN Redundancy Levels**](/product-guide/storage/vsan-redundancy-levels): Configure data redundancy to protect against drive and node failures
- [**vSAN Deletion Process**](/product-guide/storage/vsan-deletion-process): Understand how data is securely removed from the vSAN
- [**External Storage Integration**](/product-guide/storage/external-storage-integration): Connect external storage systems to your VergeOS environment

## Integrated Data Protection

- [**Snapshots**](/product-guide/backup-dr/snapshots-overview): Point-in-time copies for quick recovery
- [**Replication**](/product-guide/backup-dr/sync-configuration): Copy complete systems along with data to another location for archival and disaster recovery
- [**Backup integration**](/product-guide/tools-integrations/storware-backup-recovery): Compatibility with external enterprise backup software

## File-Level Storage

- [**File Management**](/product-guide/storage/uploading-files-to-vsan): Upload and manage ISO images, VM disk images, logos, and other files for use across your system, sites, and tenants
- [**Network Attached Storage (NAS)**](/product-guide/nas/overview): Create volumes for file-level access on your VergeOS distributed storage to share across workloads, import/export data, mount external file systems, and more

---
title: API Tables Description
slug: api-tables-description
description: 
published: false
date: 2023-10-06T14:10:54.764Z
tags: api, tables, schema, definitions, description, methods, development, dev, devops
categories:
  - API
editor: markdown
dateCreated: 2023-08-15T20:21:58.872Z
---

# API Tables Description

The following is a brief description of each of the API tables. To find out more details, add **/#swagger** to the end of your VergeUI's URL (or navigate to **System->API Documentation**). Swagger provides detailed information about each table and allows you to test each method with a Get/Post/Put/Delete action. For more instructions on how to integrate with the API, refer to the [API Documentation](/docs/knowledge-base/api) page.

## API Tables

### auth_source_states
Provides a list of auth source states.

### auth_sources
Authorization sources table for managing authorization sources like OpenID or AzureAD.

### billing
Used to get billing information for the current environment. This is stored as billing data with a from->to date.

### billing_actions
Used to send billing actions. The main action is "generate," which creates a new bill.

- **Fields:**
  - **action** : See action list below.

- **Actions:**
  - **generate** : Generate bill

- **Example:**
  
  ```plaintext
  URL: '/v4/billing_actions'
  POST(JSON): {"action": "generate"}
  ```

### catalog_logs
Logs specific to Catalogs.

### catalog_repositories
Catalog repositories and sublists for catalogs, logs, permissions, etc.

### catalog_repository_actions
Used to send Catalog Repository Actions.

- **Fields:**
  - **repository** : Row ID for the repository you want to refresh.
  - **action** : Default action is refresh. See action list below.

- **Actions:**
  - **refresh** : Refresh the Catalog Repository.

- **Example:**
  
  ```plaintext
  URL: '/v4/catalog_repository_actions'
  POST(JSON): {"repository": 1, "action": "refresh"}
  ```

### catalog_repository_logs
View and post Catalog Repository Logs.

### catalog_repository_status
Used to store and update the Catalog Repository statuses. These determine the state and status of a Catalog Repository.

### catalogs
Catalogs table allowing you to update/post/delete Catalogs.

### certificates
SSL Certificates for your site.

### clone_iso
Stores information and status of the Verge.io Clone ISO program.

### clone_iso_actions
Actions for the Clone ISO feature.

- **Fields:**
  - **action** : Default is "update." See action list below.

- **Actions:**
  - **update** : Update the ISO image.
  - **delete** : Delete the ISO image.
  - **cancel** : Cancel the current build.

- **Example:**
  
  ```plaintext
  URL: '/v4/clone_iso_actions'
  POST(JSON): {"action": "update"}
  ```

### cloud_restore
Stores information when a Cloud Restore is performed.

### cloud_snapshot_actions
Actions for the Cloud Snapshot feature.

### cloud_snapshot_tenant_actions
Actions for the Cloud Snapshot feature for a Tenant.

### cloud_snapshot_tenants
Cloud Snapshots for a Tenant.

### cloud_snapshot_vm_actions
Actions for a VM and Cloud Snapshots.

### cloud_snapshot_vms
Used to store information when a Cloud Snapshot is downloaded to a VM.

### cloud_snapshots
The Cloud Snapshots table includes information about the Cloud Snapshot, as well as a list of VMs, Tenants, and Sync Queues. This can be used to see what VMs are included in a Cloud Snapshot.

### cloudinit_files
Operations for the Cloudinit Files feature.

### cluster_actions
Cluster Actions is used to send actions for Clusters.

- **Fields:**
  - **cluster** : Cluster row ID (required).
  - **action** : See action list below.
  - **params** : Parameters supplied in JSON form (optional).

- **Actions:**
  - **shutdown** : Shutdown the Cluster.
  - **cancel_shutdown** : Cancel current shutdown request.

- **Example:**

  ```plaintext
  URL: '/v4/cluster_actions'
  POST(JSON): {"cluster": 1, "action": "shutdown", "params": "{}"}
  ```

### cluster_stats_history_long
The cluster_stats_history_long table holds Cluster stats history for extended periods.

### cluster_stats_history_short
The cluster_stats_history_short table holds Cluster stats for a short period, storing the most recent statistics for quick access.

### cluster_status
Handles the status of all the clusters.

### cluster_tier_stats
Handles statistics for the vSAN tiers of a cluster.

### cluster_tier_stats_history_long
Holds historical statistics for Cluster Tiers over extended periods.

### cluster_tier_stats_history_short
Holds historical statistics for Cluster Tiers over short periods, storing the most recent statistics for quick access.

### cluster_tier_status
Used for Cluster Tier statuses.

### cluster_tiers
Holds a list of Tiers for the cluster.

### clusters
The main table for data on the Clusters.

### file_actions
The file_actions table sends file actions.

- **Fields:**
  - **file** : File ID from files table (required).
  - **action** : See action list below.
  - **params** : Parameters supplied in JSON form (optional).

- **Actions:**
  - **overwrite** : Overwrite the file.
  - **add_link** : Add a file link.
  - **delete_link** : Delete a file link.
  - **delete_references** : Delete file references.

- **Example:**

  ```plaintext
  URL: '/v4/file_actions'
  POST(JSON): {"file": 1, "action": "add_link", "params": "{}"}
  ```

### files
Information related to stored files.

### files_public_links
Handles public links for files.

### group_logs
Logs related to groups.

### groups
Group management table.

### help_actions
Handles help-related actions.

### help_search
Search table for help documentation.

### licenses
Handles VergeOS licenses.

### logs
Handles system logs.

### machine_console
Handles machine console interactions.

### machine_console_active
Tracks active machine console sessions.

### machine_console_active_chat
Tracks chat interactions in active machine consoles.

### machine_device_gpu_stats_history_long
Holds historical GPU stats for extended periods.

### machine_device_gpu_stats_history_short
Holds historical GPU stats for short periods.

### machine_device_settings_nvidia_vgpu
Handles settings for Nvidia vGPU devices.

### machine_device_settings_tpm
Handles settings for TPM devices.

### machine_device_stats
Tracks device statistics.

### machine_device_status
Tracks device status.

### machine_devices
Table for machine device information.

### machine_drive_phys
Physical drive data for machines.

### machine_drive_stats
Drive statistics for machines.

### machine_drive_stats_history_long
Holds historical drive statistics for extended periods.

### machine_drive_stats_history_short
Holds historical drive statistics for short periods.

### machine_drive_status
Tracks drive status for machines.

### machine_drives
Table for machine drives.

### machine_logs
Tracks machine logs.

### machine_nic_stats
NIC statistics for machines.

### machine_nic_stats_history_long
Historical NIC statistics over long periods.

### machine_nic_stats_history_short
Historical NIC statistics over short periods.

### machine_nic_status
NIC status for machines.

### machine_nics
Table for NICs in machines.

### machine_snapshots
Tracks snapshots for machines.

### machine_stats
General statistics for machines.

### machine_stats_history_long
Historical statistics for machines over long periods.

### machine_stats_history_short
Historical statistics for machines over short periods.

### machine_status
Tracks status for machines.

### machines
Main table for machine data.

---

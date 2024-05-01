---
title: API Tables Description
description: 
published: false
date: 2023-10-06T14:10:54.764Z
tags: api, tables, schema, definitions, description, methods, development, dev, devops
editor: markdown
dateCreated: 2023-09-15T20:21:58.872Z
---

## API Tables Description

> The following is a brief description of each of the API tables. To find out more details, add **/#swagger** to the end of your VergeUI's URL (or navigate to **System->API Documentation**). Swagger has detailed information about each table and allows you to test each method with a Get/Post/Put/Delete action. For more instructions on how to integrate with the API, go to the [API Documentation](/public/kb/api) wiki page.
{.is-info}



<details open><summary>auth_source_states</summary>
Provides a list of auth source states

</details>

<details open><summary>auth_sources</summary>
Authorization sources table for managing Authorization sources like OpenID or AzureAD

</details>

<details open><summary>billing</summary>
Used to get billing information for the current environment. This is stored billing data with a from->to date. 
</details>

<details open><summary>billing_actions</summary>
	Used to send billing actions. The main use is the action "generate" which generates a new bill.

**Fields:**
- **action** : See action list below.
  
**Actions:**
- **generate** : Generate bill
  
**Example:**
  
URL: `'/v4/billing_actions'`
POST(JSON): `{"action": "generate"}`
  
</details>

<details open><summary>catalog_logs</summary>
Logs specific to Catalogs
</details>

<details open><summary>catalog_repositories</summary>
Catalog Repositories and sublists for catalogs, logs, permissions, etc.
</details>

<details open><summary>catalog_repository_actions</summary>
Used to send Catalog Repository Actions. 

**Fields:**
- **repository** : Row id for the repository you want to refresh
- **action** : Default action is refresh. See action list below.

**Actions:**
- **refresh** : Refresh the Catalog Repository
  
**Example:**
  
  URL: `'/v4/catalog_repository_actions'`
  POST(JSON): `{"repository: 1", "action": "refresh"}`
  
  
  
</details>

<details open><summary>catalog_repository_logs</summary>
View and post Catalog Repository Logs. 
</details>

<details open><summary>catalog_repository_status</summary>
Used to store and update the Catalog Repository Statuses. These determine the state and status of a Catalog Repository
  
  
</details>

<details open><summary>catalogs</summary>
Catalogs table allowing you to update/post/delete Catalogs.
</details>

<details open><summary>certificates</summary>
 SSL Certificates for your site. 
</details>

<details open><summary>clone_iso</summary>
  Stores information and status of the Verge.io Clone ISO program.
</details>

<details open><summary>clone_iso_actions</summary>
  Actions for the Clone ISO feature.
  
**Fields:**
- **action** : Default is "update". See action list below.

**Actions:**
- **update** : Update the ISO image
- **delete** : Delete the ISO image
- **cancel** : Cancel the current build
  
**Example:**
  
  URL: `'/v4/clone_iso_actions'`
  POST(JSON): `{"action": "update"}`
 
  
</details>

<details open><summary>cloud_restore</summary>
  Stores information when a Cloud Restore is performed.
</details>

<details open><summary>cloud_snapshot_actions</summary>
  Actions for the Cloud Snapshot feature.
</details>

<details open><summary>cloud_snapshot_tenant_actions</summary>
  Actions for the Cloud Snapshot feature for a Tenant.
</details>

<details open><summary>cloud_snapshot_tenants</summary>
  Cloud Snapshots for a Tenant.
</details>

<details open><summary>cloud_snapshot_vm_actions</summary>
  Actions for a VM and Cloud Snapshots. 
</details>

<details open><summary>cloud_snapshot_vms</summary>
  Used to store information when a Cloud Snapshot is Downloaded to a VM.
</details>

<details open><summary>cloud_snapshots</summary>
  Cloud Snapshots table that includes information about the Cloud Snapshot as well as a list of VMs, Tenants, and Sync Queues. This can be used to see what VMs are included in a Cloud Snapshot.
</details>

<details open><summary>cloudinit_files</summary>
  Operations for the Cloudinit Files feature. 
</details>

<details open><summary>cluster_actions</summary>
  Cluster Actions is used to send actions for Clusters.

**Fields:**
- **cluster** : Cluster row id. Required.
- **action** : See action list below.
- **params** : Parameters supplied in JSON form. This is not required.

**Actions:**
- **shutdown** : Shutdown the Cluster.
- **cancel_shutdown** : Cancel current shutdown request.
  
**Example:**
  
  URL: `'/v4/cluster_actions'`
  POST(JSON): `{"cluster" : 1,"action": "shutdown", "params" : "{}"}`
  
  
</details>

<details open><summary>cluster_stats_history_long</summary>
  The cluster_stats_history_long table holds Cluster stats history for extended periods. 
</details>

<details open><summary>cluster_stats_history_short</summary>
  The cluster_stats_history_short table holds Cluster stats for a short period. The most recent statistics are sent here first for quick access and fast page loads. 
</details>

<details open><summary>cluster_status</summary>
  The cluster_status table handles the status of all the clusters.
</details>

<details open><summary>cluster_tier_stats</summary>
  The cluster_tier_stats table handles statistics for the vsan tiers of a cluster. 
</details>

<details open><summary>cluster_tier_stats_history_long</summary>
  The cluster_tier_stats_history_long table holds historical statistics for Cluster Tiers for extended periods. 
</details>

<details open><summary>cluster_tier_stats_history_short</summary>
  The cluster_tier_stats_history_short table holds historical statistics for Cluster Tiers in a short period. The most recent statistics are sent here first for quick access and fast page loads. 
</details>

<details open><summary>cluster_tier_status</summary>
  The cluster_tier_status table is used for Cluster Tier statuses. 
</details>

<details open><summary>cluster_tiers</summary>
  The cluster_tiers table holds a list of Tiers for the cluster. 
</details>

<details open><summary>clusters</summary>
  The clusters table is the main table for data for the Clusters.
</details>

<details open><summary>file_actions</summary>
	The file_actions table sends file actions.  

**Fields:**
- **file** : file id from files table. Required
- **action** : See action list below.
- **params** : Parameters supplied in JSON form.

**Actions:**
- **overwrite** : Overwrite the file.
- **add_link** : Cancel current shutdown request.
- **delete_link** : Delete File Link.
- **delete_references** : Delete File References.
  
**Example:**
  
  URL: `'/v4/file_actions'`
  POST(JSON): `{"file" : 1,"action": "add_link", "params" : "{}"}`
  
</details>

<details open><summary>files</summary>
</details>

<details open><summary>files_public_links</summary>
</details>

<details open><summary>group_logs</summary>
</details>

<details open><summary>groups</summary>
</details>

<details open><summary>help_actions</summary>
</details>

<details open><summary>help_search</summary>
</details>

<details open><summary>licenses</summary>
</details>

<details open><summary>logs</summary>
</details>

<details open><summary>machine_console</summary>
</details>

<details open><summary>machine_console_active</summary>
</details>

<details open><summary>machine_console_active_chat</summary>
</details>

<details open><summary>machine_device_gpu_stats_history_long</summary>
</details>

<details open><summary>machine_device_gpu_stats_history_short</summary>
</details>

<details open><summary>machine_device_settings_nvidia_vgpu</summary>
</details>

<details open><summary>machine_device_settings_tpm</summary>
</details>

<details open><summary>machine_device_stats</summary>
</details>

<details open><summary>machine_device_status</summary>
</details>

<details open><summary>machine_devices</summary>
</details>

<details open><summary>machine_drive_phys</summary>
</details>

<details open><summary>machine_drive_stats</summary>
</details>

<details open><summary>machine_drive_stats_history_long</summary>
</details>

<details open><summary>machine_drive_stats_history_short</summary>
</details>

<details open><summary>machine_drive_status</summary>
</details>

<details open><summary>machine_drives</summary>
</details>

<details open><summary>machine_logs</summary>
</details>

<details open><summary>machine_nic_stats</summary>
</details>

<details open><summary>machine_nic_stats_history_long</summary>
</details>

<details open><summary>machine_nic_stats_history_short</summary>
</details>

<details open><summary>machine_nic_status</summary>
</details>

<details open><summary>machine_nics</summary>
</details>

<details open><summary>machine_snapshots</summary>
</details>

<details open><summary>machine_stats</summary>
</details>

<details open><summary>machine_stats_history_long</summary>
</details>

<details open><summary>machine_stats_history_short</summary>
</details>

<details open><summary>machine_status</summary>
</details>

<details open><summary>machines</summary>
</details>

<details open><summary>members</summary>
</details>

<details open><summary>messages</summary>
</details>

<details open><summary>node_actions</summary>
</details>

<details open><summary>node_allocated_gpus</summary>
</details>

<details open><summary>node_drivers</summary>
</details>

<details open><summary>node_gpu_instances</summary>
</details>

<details open><summary>node_gpu_stats</summary>
</details>

<details open><summary>node_gpu_stats_history_long</summary>
</details>

<details open><summary>node_gpu_stats_history_short</summary>
</details>

<details open><summary>node_gpus</summary>
</details>

<details open><summary>node_lldp_neighbors</summary>
</details>

<details open><summary>node_memory</summary>
</details>

<details open><summary>node_nvidia_vgpu_profiles</summary>
</details>

<details open><summary>node_pci_devices</summary>
</details>

<details open><summary>node_queries</summary>
</details>

<details open><summary>node_stats</summary>
</details>

<details open><summary>nodes</summary>
</details>

<details open><summary>note_actions</summary>
</details>

<details open><summary>oidc_application_groups</summary>
</details>

<details open><summary>oidc_application_logs</summary>
</details>

<details open><summary>oidc_application_users</summary>
</details>

<details open><summary>oidc_applications</summary>
</details>

<details open><summary>permissions</summary>
</details>

<details open><summary>recipe_questions</summary>
</details>

<details open><summary>recipe_sections</summary>
</details>

<details open><summary>recipe_status</summary>
</details>

<details open><summary>repair_servers</summary>
</details>

<details open><summary>schedule_task_events</summary>
</details>

<details open><summary>schedule_task_setting_schema</summary>
</details>

<details open><summary>schedule_task_settings</summary>
</details>

<details open><summary>schedule_tasks</summary>
</details>

<details open><summary>schedules</summary>
</details>

<details open><summary>schema_version_actions</summary>
</details>

<details open><summary>schema_versions</summary>
</details>

<details open><summary>settings</summary>
</details>

<details open><summary>settings_actions</summary>
</details>

<details open><summary>shared_object_actions</summary>
</details>

<details open><summary>shared_objects</summary>
</details>

<details open><summary>site_actions</summary>
</details>

<details open><summary>site_logs</summary>
</details>

<details open><summary>site_sync_stats</summary>
</details>

<details open><summary>site_sync_stats_history_long</summary>
</details>

<details open><summary>site_syncs_incoming</summary>
</details>

<details open><summary>site_syncs_incoming_actions</summary>
</details>

<details open><summary>site_syncs_incoming_logs</summary>
</details>

<details open><summary>site_syncs_incoming_verified</summary>
</details>

<details open><summary>site_syncs_incoming_verified_actions</summary>
</details>

<details open><summary>site_syncs_outgoing</summary>
</details>

<details open><summary>site_syncs_outgoing_actions</summary>
</details>

<details open><summary>site_syncs_outgoing_logs</summary>
</details>

<details open><summary>site_syncs_outgoing_profile_periods</summary>
</details>

<details open><summary>site_syncs_outgoing_queue</summary>
</details>

<details open><summary>site_syncs_outgoing_remote_snap_actions</summary>
</details>

<details open><summary>site_syncs_outgoing_remote_snaps</summary>
</details>

<details open><summary>sites</summary>
</details>

<details open><summary>smtp_actions</summary>
</details>

<details open><summary>smtp_logs</summary>
</details>

<details open><summary>smtp_outbox</summary>
</details>

<details open><summary>smtp_queue</summary>
</details>

<details open><summary>smtp_settings</summary>
</details>

<details open><summary>snapshot_profile_actions</summary>
</details>

<details open><summary>snapshot_profile_periods</summary>
</details>

<details open><summary>snapshot_profiles</summary>
</details>

<details open><summary>storage_tier_stats</summary>
</details>

<details open><summary>storage_tier_stats_history_long</summary>
</details>

<details open><summary>storage_tier_stats_history_short</summary>
</details>

<details open><summary>storage_tiers</summary>
</details>

<details open><summary>subscription_profiles</summary>
</details>

<details open><summary>subscriptions</summary>
</details>

<details open><summary>swagger_actions</summary>
</details>

<details open><summary>system</summary>
</details>

<details open><summary>system_actions</summary>
</details>

<details open><summary>system_diagnostic_actions</summary>
</details>

<details open><summary>system_diagnostics</summary>
</details>

<details open><summary>tenant_actions</summary>
</details>

<details open><summary>tenant_logs</summary>
</details>

<details open><summary>tenant_node_actions</summary>
</details>

<details open><summary>tenant_node_queries</summary>
</details>

<details open><summary>tenant_nodes</summary>
</details>

<details open><summary>tenant_recipe_actions</summary>
</details>

<details open><summary>tenant_recipe_instances</summary>
</details>

<details open><summary>tenant_recipe_logs</summary>
</details>

<details open><summary>tenant_recipes</summary>
</details>

<details open><summary>tenant_snapshot_actions</summary>
</details>

<details open><summary>tenant_snapshots</summary>
</details>

<details open><summary>tenant_stats</summary>
</details>

<details open><summary>tenant_stats_history_long</summary>
</details>

<details open><summary>tenant_stats_history_short</summary>
</details>

<details open><summary>tenant_status</summary>
</details>

<details open><summary>tenant_storage</summary>
</details>

<details open><summary>tenants</summary>
</details>

<details open><summary>ui_branding</summary>
</details>

<details open><summary>update_actions</summary>
</details>

<details open><summary>update_branches</summary>
</details>

<details open><summary>update_file_finish</summary>
</details>

<details open><summary>update_file_verify</summary>
</details>

<details open><summary>update_files</summary>
</details>

<details open><summary>update_logs</summary>
</details>

<details open><summary>update_packages</summary>
</details>

<details open><summary>update_settings</summary>
</details>

<details open><summary>update_source_packages</summary>
</details>

<details open><summary>update_source_status</summary>
</details>

<details open><summary>update_sources</summary>
</details>

<details open><summary>user</summary>
</details>

<details open><summary>user_actions</summary>
</details>

<details open><summary>user_devices</summary>
</details>

<details open><summary>user_logs</summary>
</details>

<details open><summary>user_messages</summary>
</details>

<details open><summary>user_settings</summary>
</details>

<details open><summary>users</summary>
</details>

<details open><summary>v3_vm_import</summary>
</details>

<details open><summary>vm_actions</summary>
</details>

<details open><summary>vm_console_actions</summary>
</details>

<details open><summary>vm_favorites</summary>
</details>

<details open><summary>vm_import_logs</summary>
</details>

<details open><summary>vm_imports</summary>
</details>

<details open><summary>vm_paste_configs</summary>
</details>

<details open><summary>vm_recipe_actions</summary>
</details>

<details open><summary>vm_recipe_instances</summary>
</details>

<details open><summary>vm_recipe_logs</summary>
</details>

<details open><summary>vm_recipes</summary>
</details>

<details open><summary>vm_service_antivirus</summary>
</details>

<details open><summary>vm_service_cifs</summary>
</details>

<details open><summary>vm_service_nfs</summary>
</details>

<details open><summary>vm_service_queries</summary>
</details>

<details open><summary>vm_service_user_logs</summary>
</details>

<details open><summary>vm_service_user_status</summary>
</details>

<details open><summary>vm_service_users</summary>
</details>

<details open><summary>vm_services</summary>
</details>

<details open><summary>vms</summary>
</details>

<details open><summary>vmware_container_actions</summary>
</details>

<details open><summary>vmware_container_api</summary>
</details>

<details open><summary>vmware_container_backup_job_actions</summary>
</details>

<details open><summary>vmware_container_queries</summary>
</details>

<details open><summary>vmware_container_restore_job_actions</summary>
</details>

<details open><summary>vmware_container_storage</summary>
</details>

<details open><summary>vmware_containers</summary>
</details>

<details open><summary>vnet_actions</summary>
</details>

<details open><summary>vnet_addresses</summary>
</details>

<details open><summary>vnet_bgp</summary>
</details>

<details open><summary>vnet_bgp_interface_commands</summary>
</details>

<details open><summary>vnet_bgp_interfaces</summary>
</details>

<details open><summary>vnet_bgp_ip</summary>
</details>

<details open><summary>vnet_bgp_routemap_commands</summary>
</details>

<details open><summary>vnet_bgp_routemaps</summary>
</details>

<details open><summary>vnet_bgp_router_commands</summary>
</details>

<details open><summary>vnet_bgp_routers</summary>
</details>

<details open><summary>vnet_bonds</summary>
</details>

<details open><summary>vnet_cidrs</summary>
</details>

<details open><summary>vnet_dns_views</summary>
</details>

<details open><summary>vnet_dns_zone_records</summary>
</details>

<details open><summary>vnet_dns_zones</summary>
</details>

<details open><summary>vnet_hosts</summary>
</details>

<details open><summary>vnet_ipsec_connections</summary>
</details>

<details open><summary>vnet_ipsec_phase1s</summary>
</details>

<details open><summary>vnet_ipsec_phase2s</summary>
</details>

<details open><summary>vnet_ipsecs</summary>
</details>

<details open><summary>vnet_monitor_stats_history_long</summary>
</details>

<details open><summary>vnet_monitor_stats_history_short</summary>
</details>

<details open><summary>vnet_ospf_commands</summary>
</details>

<details open><summary>vnet_queries</summary>
</details>

<details open><summary>vnet_rule_aliases</summary>
</details>

<details open><summary>vnet_rule_references</summary>
</details>

<details open><summary>vnet_rules</summary>
</details>

<details open><summary>vnet_wireguard_peer_status</summary>
</details>

<details open><summary>vnet_wireguard_peers</summary>
</details>

<details open><summary>vnet_wireguards</summary>
</details>

<details open><summary>vnet_wires</summary>
</details>

<details open><summary>vnets</summary>
</details>

<details open><summary>volume_actions</summary>
</details>

<details open><summary>volume_antivirus</summary>
</details>

<details open><summary>volume_antivirus_actions</summary>
</details>

<details open><summary>volume_antivirus_infections</summary>
</details>

<details open><summary>volume_antivirus_logs</summary>
</details>

<details open><summary>volume_antivirus_stats</summary>
</details>

<details open><summary>volume_antivirus_status</summary>
</details>

<details open><summary>volume_browser</summary>
</details>

<details open><summary>volume_cifs_shares</summary>
</details>

<details open><summary>volume_logs</summary>
</details>

<details open><summary>volume_nfs_shares</summary>
</details>

<details open><summary>volume_share_logs</summary>
</details>

<details open><summary>volume_share_status</summary>
</details>

<details open><summary>volume_snapshots</summary>
</details>

<details open><summary>volume_status</summary>
</details>

<details open><summary>volume_sync_actions</summary>
</details>

<details open><summary>volume_sync_logs</summary>
</details>

<details open><summary>volume_sync_progresses</summary>
</details>

<details open><summary>volume_syncs</summary>
</details>

<details open><summary>volume_vm_export_actions</summary>
</details>

<details open><summary>volume_vm_export_stats</summary>
</details>

<details open><summary>volume_vm_exports</summary>
</details>

<details open><summary>volumes</summary>
</details>

<details open><summary>vsan_queries</summary>
</details>

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
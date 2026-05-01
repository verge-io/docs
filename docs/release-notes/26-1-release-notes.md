---
title: "26.1 Release Notes"
description: "Release notes for VergeOS 26.1, introducing partial snapshots with tag-based filtering, oVirt API compatibility for third-party backups, N+2 (RF3) vSAN redundancy, and significant disk repair and sync performance improvements."
semantic_keywords:
  - "VergeOS 26.1 release notes new features"
  - "VergeOS partial snapshots tag-based backup"
  - "VergeOS oVirt API backup integration"
  - "VergeOS N+2 RF3 vSAN redundancy"
  - "VergeOS 26.1 performance improvements and bug fixes"
use_cases:
  - review_26_1_new_features
  - plan_upgrade_to_26_1
  - configure_partial_snapshots
  - integrate_ovirt_backup_tools
  - enable_rf3_redundancy
  - check_26_1_bug_fixes
tags:
  - release-notes
  - vergeos-26
  - partial-snapshots
  - ovirt-api
  - rf3-redundancy
  - vsan
  - performance
  - ssl-tls
  - vgpu
  - site-syncs
categories:
  - Release Notes
---

# 26.1 Release Notes

!!! info "Release Information"
    - **Release Date**: January 2026
    - **Latest Version**: 26.1.3.1 (March 2026)
    - **Status**: Latest Production Release
    - **End-of-Life**: TBD

## Major Features & Themes

### Partial Snapshots

!!! success "Tag-Based Snapshot Control"
    - Create snapshots that include or exclude resources based on tags
    - Supports virtual machines, tenants, and NAS services
    - Control quiescing behavior per tagged resource
    - Full sync support for partial snapshots

### Performance Improvements

!!! benchmark "Storage & System Performance"
    - Disk repair performance improved by approximately 4x
    - Faster controller walk times after reboot
    - Improved sync performance with cross-directory file threading
    - Enhanced storage cache usage for database on controller nodes
    - Faster node start times through CPU type property caching

### oVirt API Compatibility

!!! success "Third-Party Backup Integration"
    - Native oVirt-compatible API endpoint for third-party backup integration
    - Enables backup support for VergeOS environments via oVirt-compatible tools

### N+2 Redundancy (RF3)

!!! success "Enhanced Data Protection"
    - Added support for N+2 (RF3) vSAN redundancy, also known as Replication Factor 3
    - Provides additional fault tolerance beyond standard N+1 configurations

## 26.1.3.1 (March 2026)

### Bug Fixes

#### Virtual Machines
- Fixed VM power on regression
- Fixed VM Console paste when toggling hidden text for the first time
- VM dashboard fixes and refactoring
- Added a check for modifying a VM recipe instance

#### VMware Service
- Fixed an issue starting a VMware service container if the node does not have `/dev/dri`

#### User Interface
- Fixed device list refresh on no-type list, added tenant column, and improved parent display
- Fixed dashboard delete actions causing 404 errors due to breadcrumb issues

#### System Administration
- Refactored system group creation and deletion based on validation with automatic cleanup for stray groups
- Changed swappiness from 0 to 1 to improve memory overcommit behavior

### Operating System & Performance

#### Core System
- Fixed SSL error causing some downloads to fail when write buffer is full
- Fixed a vSAN stability issue when using 2 drives on an N+2 system

### Known Issues

#### oVirt API

!!! warning "oVirt API Issues in 26.1.3.1"
    The following issues affect oVirt-compatible backup integrations in this release. All are resolved in **26.1.4**.

- **Authentication does not reuse tokens** — The oVirt API logs in on every request (~every minute), creating excessive audit log entries and hitting the 100-session-per-user limit
- **Tenant backup connectivity issues** — Shared GUIDs (e.g., cluster IDs) between tenants and the root tenant can cause backup vendors to misidentify tenant infrastructure, leading to connectivity and identification errors
- **Incorrect HTTP error codes** — Some API errors are not returned per the oVirt specification (wrong HTTP status codes and error format)
- **Upload/download activity not visible** — File uploads and downloads do not show activity on the oVirt dashboard

#### Deprecated Hardware

- **NVIDIA Tesla P40** — The Tesla P40 GPU is not functional in this release. Existing deployments using Tesla P40 cards should plan to migrate to a supported GPU model.

---

## 26.1.3 (March 2026)

### New Features

#### Alarms & Monitoring
- Added alarms to the home dashboard
- Alarms now show friendly resolution names
- Added ability to acknowledge alarms (or snooze if acknowledgment isn't available)
- Update server can now raise alarms

#### Security & SSL/TLS
- Improved SSL/TLS security by disabling older protocols (SSLv2/SSLv3) and enforcing TLS 1.2+
- Added configurable SSL version controls
- Auto-created certificates can now be deleted

#### vGPU & Hardware
- Added support for NVIDIA vGPU profiles (including RTX 8000, RTX PRO 6000 Blackwell, and heterogeneous profiles)
- Added MIG vGPU support for newer NVIDIA cards

#### System Snapshots
- Added ability to recover Files and VMware Services from system snapshots
- Remote snapshots can now be made immutable
- Added more audit logging for system snapshots

### Bug Fixes

#### Tenant & Site Management
- Fixed storage and node button issues on tenant dashboard
- Fixed cluster status to ignore offline clusters
- Tenant dashboard now redirects to the correct page after creating a new IP address
- Fixed issue where provider snapshot expiration wasn't updating in tenants
- Reduced log noise when snapshot expiration settings change in the root tenant

#### VMware Service
- Fixed VM placement when "Default" cluster is selected
- Fixed an issue where cloning a VM with quiescing could leave behind a snapshot that prevents future clones

#### Security & Authentication
- Fixed 2FA setup when password change is required
- Fixed password validation during 2FA setup
- Physical access users now require a name starting with a letter (not a number)
- Fixed editing users when physical access is enabled
- Fixed displaying certificate chains when editing certificates
- Fixed an issue editing an authorization source's private key
- Fixed certificate domain matching for mixed and uppercase domains

#### Storage & Volumes
- Fixed editing volume notes
- Fixed SMART metrics when drives are replaced with models that don't support the same metrics

#### UI Improvements
- Fixed breadcrumbs across multiple areas (logs, NAS, recipes, snapshots, device lists)
- Added enable/disable options to list views that were missing them
- Fixed remote statistics display
- Fixed various button issues on dashboards
- Fixed delete errors when users have a mix of owned VMs
- Reworded the Appserver Exit alarm to include timestamp

#### Network
- Fixed bug preventing new IPSec tunnels from being created
- Added note when changing WireGuard listening port
- Blocked setting remote expiration to dates earlier than currently set

#### VM Recipes
- Preserved original ISO names on CD-ROMs
- Fixed errors displaying in UI

#### SR-IOV
- Fixed SR-IOV to properly clean up virtual functions when disabled

#### Installation & Updates
- Fixed N+2 install on 3rd controller
- Added delays when installing updates and restarting on node 1

---

## 26.1.2 (February 2026)

### New Features

#### oVirt API Compatibility
- Implemented oVirt-compatible API endpoint for third-party backup integration

#### Storage & vSAN
- Added support for N+2 (RF3) vSAN redundancy, also known as Replication Factor 3

### Bug Fixes

#### Snapshots & Restore
- Fixed issue where only one snapshot profile period would run when two are scheduled at the same time
- Fixed weekly snapshot frequency with "Any Day" option incorrectly taking snapshots daily
- Fixed tenant snapshot restore from host only allowing one attempt
- Fixed "Pending restore does not exist" error when restoring tenant snapshots
- Fixed error message appearing when overwriting a pending tenant snapshot restore
- Added audit logging for snapshot profile and profile period deletions

#### Virtual Machines & Export
- Fixed tags not being included with exported VMs
- Fixed VM event filter categories showing "Value" instead of proper labels (Snapshot, OS Family, Console Type)

#### Tenants & Themes
- Fixed cloned tenant reverting theme access setting to default instead of inheriting source tenant setting
- Fixed all themes being exposed to tenants regardless of theme access permissions
- Fixed tenants only retaining one marketplace recipe per catalog

#### User Interface
- Fixed tag alphabetization sorting capitalized tags separately from lowercase
- Fixed grammar issue (missing apostrophe) when creating a new site
- Fixed missing name field on NAS Service edit screen
- Fixed blank page when clicking browser back button from Sites History
- Fixed "Reboot & Apply Updates" modal getting stuck until reboot begins
- Fixed Download menu link appearing active but not functioning for optional updates

#### Sites & History
- Fixed "ID and Section are required" error when viewing a site's history

#### Authentication & Users
- Fixed auth source edit form defaulting to visible client secret
- Fixed forgot password link generating an invalid token

#### System Administration
- Fixed removing system help URL from tenants causing a 404 error
- Fixed editing a cluster resetting the RAM amount per machine

---

## 26.1.1 (January 2026)

### New Features

#### Partial Snapshots
- Added partial snapshot support using tags for include or exclude filtering
- Supports virtual machines, tenants, and NAS services
- Control which resources are quiesced during partial snapshots
- Partial snapshot settings now displayed in edit view
- Multiple tags properly displayed in snapshot list view

#### Site Syncs & Backup
- Added sync support for partial snapshots
- Enhanced sync audit logging with status, progress, and failure details
- Added synclist to outgoing sync logs

#### Task Automation
- Added task support helpers for auto sync creation and configuration
- Added task execute and profile period links to sync dashboard
- New task creation confirmation helper for auto-syncs
- Multiple task UI enhancements

### Functionality Changes & Improvements

#### Virtual Machines
- VM Export now supports tags in ybvm files
- Added OVF export output support
- VM snapshot drives now inherit a generated UUID from the source drive
- Added advanced options for video card devices (e.g., `vga.virtio.X`, `vga.std.X`, `vga.vmware.X`)
- "Auto" is now the default selection on migration popups (VMs, service containers, tenant nodes, VMware containers)

#### User Interface
- Added password visibility toggle for user creation and login forms
- Changed millisecond displays to friendlier format (cluster tiers, vnet dashboard, VM paste configs)
- Added members link to tag picker
- Breadcrumb enhancements for viewing system snapshots from volumes/VMs
- Renamed remaining "Media Images" references to "Files"
- Cleaned up cluster dashboard display when compute is disabled

#### Storage & vSAN
- Added ability to specify vDisk vendor via advanced system setting (inherits to tenants)
- Cluster tiers now show progress even at 0% when status is working

#### Networking & Syncs
- Removed password confirmation requirement on remote repositories
- Added ability to specify HTTP method and append to URL for webhooks

#### NAS
- Antivirus is now disabled by default for new NAS services

#### GPU Support
- Added NVIDIA GRID vGPU drivers 19.4, 18.6, and 16.13

### Operating System & Performance

#### Core System
- Updated QEMU to 10.0.7
- Added bash completion for `jvcmd`
- Sped up node start times by caching best CPU type properties

#### vSAN Performance
- Improved performance when hundreds of VMs run in the same tenant
- Improved storage cache usage for database on controller nodes
- Improved disk repair performance by approximately 4x (parallel repairs, defaults to 4 threads)
- Improved initial controller walk time after reboot
- Improved sync performance with cross-directory file threading
- Implemented readahead for full walks when cache memory is limited

### Bug Fixes

#### Snapshots & Restore
- Fixed immutable snapshots not syncing properly to backup sites
- Fixed NAS Service VMs not retaining tags when restored from snapshots
- Fixed restoring NAS Service VMs from partial snapshots
- Fixed manually synced system snapshots using incorrect prefix on destination
- Fixed "Never Expires" option leaving calendar selector visible on form

#### Site Syncs
- Fixed offline site cards showing as online without branding logo
- Fixed enable/disable dialog and tooltip issues on outgoing sync dashboard
- Fixed left navigation menu options (Delete, Disable, Enable) not working for outgoing syncs
- Added stats logging for paused/disabled/error syncs
- Fixed refresh errors occurring on backup site during incoming syncs

#### Authentication & Users
- Fixed password change loop when using TOTP 2FA with required password change
- Fixed password confirmation mismatch being accepted when 2FA is enabled
- Fixed 2FA email when password change is required

#### Virtual Machines
- Fixed VM service cloning not copying export settings and data
- Fixed "New Virtual Machine" page proceeding with selection instead of searching when pressing Enter
- Fixed cloud-init variable not being set for cluster name
- Fixed downloading VM recipes when Cloudflare is unavailable

#### Storage & vSAN
- Fixed adding storage to compute node causing incorrect drive distribution for first 2 drives
- Fixed vSAN crash when recreating a tier that was deleted before upgrading to version 26
- Fixed SMBIOS manufacturer and disk vendor not passing to tenants
- Fixed previous regression affecting Storware backup integration

#### User Interface
- Fixed product help links broken or incorrect on multiple dashboards
- Fixed VM NIC "Add IP Address" breadcrumb navigation
- Fixed link to LLDP neighbors from node NICs
- Fixed cluster tier dashboard not showing all nodes
- Fixed incorrect verbiage on NIC asset field note (mentioned drive instead of NIC)
- Fixed issue recovering large number of objects simultaneously from system snapshot

#### Certificates
- Fixed duplicate certificates being created with new systems
- Cleaned up duplicate verge-api self-signed certificates
- Fixed certificates that included IP addresses
- Automatic cleanup of duplicate certificates when upgrading to 26.1

#### Installation
- Fixed installing encrypted vSAN on second controller node
- Removed EFI question unless using advanced installer
- Fixed installer allowing overwrite of vSAN encryption key disk as boot-only

#### Other Fixes
- Fixed Swagger documentation for fields pointing to '*' table row type
- Fixed SMTP widget email field on forms
- Fixed issue where update completion logged "idle" status twice
- Fixed AI Workspace file uploads showing 0% then disappearing
- Fixed general file uploads staying at 0% after refresh

---

## Upgrade Notes

!!! warning "Important Upgrade Information"
    - **Reboot Required**: Yes - all nodes will require restart
    - **Certificate Cleanup**: Duplicate certificates are automatically cleaned up during upgrade
    - **NAS Antivirus**: New NAS services have antivirus disabled by default; existing services unchanged
    - **Partial Snapshots**: New feature requires tagging resources before creating partial snapshots

!!! info "Post-Upgrade Actions"
    - Review and configure partial snapshot profiles if tag-based backups are desired
    - Verify sync configurations after upgrade

## Known Issues

!!! note "Current Limitations"
    - Partial snapshots cannot be used for full system restore; use for individual resource recovery or syncs only

---

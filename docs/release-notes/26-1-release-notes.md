# 26.1 Release Notes

!!! info "Release Information"
    - **Release Date**: January 2026
    - **Latest Version**: 26.1.2 (February 2026)
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

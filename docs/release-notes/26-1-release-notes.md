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
    - **Latest Version**: 26.1.7 (July 2026)
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

## 26.1.7 (July 2026)

VergeOS 26.1.7 is a maintenance release focused on stability improvements, bug fixes, and usability enhancements. Highlights include a change to the update process for systems running 26.1.6, significant vSAN shutdown reliability improvements, serial console stability fixes, and UI/UX enhancements across VMware integration, advanced settings, and snapshot management.

### Update Process

!!! warning "Upgrading from 26.1.6"
    When upgrading from 26.1.6, node1 is now updated **last**. This prevents large or busy systems from running a transaction validation (introduced in 26.1.6) when reconnecting back to node1 after the update.

- A pre-flight check now runs before installing any update packages. This will be used going forward to notify users of any actions that must be taken before updating, particularly as features move from deprecated to removed.

### New Features

#### Networking
- Added manually-configured PTP (Precision Time Protocol) support; UI support will follow in a future release

#### Virtual Machines
- Offline VM drives can now be erased while the VM is running, without shutting down the VM
- The VergeOS icon can now be used in VM and tenant recipes

#### User Interface
- Browser tab titles now show the VM or object name first, making it easier to identify pages when multiple VergeOS tabs are open; this behavior can be changed in **System > Settings**
- Removed upper limits on SMART warning thresholds (pending sectors, offline uncorrectable sectors, reallocated sectors), allowing administrators to configure higher values
- Added tooltip titles to dashboard count boxes displaying large numbers

### Bug Fixes

#### Storage (vSAN)
- Fixed a critical timing scenario during shutdown: on systems with dedicated controller nodes, if node1 was rebooted while a tier 0 walk was still running, the vSAN could stop before the walk completed, causing node2 to fail to take over as the UI controller with database I/O errors
- Reworked the vSAN shutdown process with improved timeout handling
- Fixed a potential race condition that could cause a vSAN crash when decreasing node channels live during heavy write activity
- Improved timeout handling during forced node disconnect operations
- Changed how snapshot files are saved on the vSAN to avoid unnecessary tier changes

#### Serial Console
- Fixed a reconnect issue with the VM serial console emulator that could cause the console to lock up after 64 connect/disconnect cycles
- Fixed the initial width of the xterm-based serial console

#### User Interface
- Tenant name changes now appear on the login screen immediately, without requiring a restart
- Fixed the VMware "New Restore Job" form where the Default Resource dropdown was rendered struck-through and unselectable, preventing users from submitting restore jobs
- Relabeled the Interface Network dropdown on internal and external network forms from "-- Default --" to "-- None --" for clarity
- Added numeric validation to Advanced Settings fields — SMART thresholds and other number-based settings now reject non-integer and non-numeric values
- Fixed auto-disabling of UI actions that was incorrectly affecting actions not limited to multi or single selection
- Fixed an issue where editing a USB machine device on a VM or tenant node could show the wrong resource group in the list

#### Virtual Machines
- Improved oVirt/RHV import consistency: VM properties (OS type, CPU cores, RAM, disk driver interfaces) are now properly set during restore, drive/NIC interfaces are checked case-insensitively, and Windows VM OS types are correctly identified; added support for importing VMs with unplugged NICs and additional OVF file variants
- Fixed an issue where Ovirt backup jobs initiated from a tenant could not list the tenant's VMs
- When a VM is detached from a recipe, its recipe metadata is now cleaned up properly

#### Snapshots & Sites
- Fixed an issue where setting an existing system snapshot to immutable would incorrectly set the unlock period to one week from the current date
- Fixed an issue where modifying a remote snapshot's expiration on the remote site would not persist — the expiration would revert on the next refresh
- System snapshot expiration audit log entries are now hidden to reduce audit log noise

#### Authentication & Email
- Fixed an issue where the system allowed attempting to send email (via Test or a Task) even when SMTP was disabled
- Added additional protection against deleting the admin user account

#### Networking
- Fixed an issue booting PXE nodes via UEFI

#### NAS
- NAS volumes now ignore the serial number property on a drive to avoid confusion and potential serial number duplicates that could cause volumes to lose their drive reference inside the guest

#### Hardware & Alarms
- Fixed an issue matching a DIMM to an ECC error on certain hardware
- When an alarm type changes, the previous alarm is now properly lowered and a new one raised
- Duplicate alarms are now cleaned up on system startup

#### Installer
- Fixed an issue where installing a compute node would not prompt to install boot partitions on smaller disks

#### Performance & Stability
- Fixed a potential stability issue in the web server
- SMTP refreshes can now only happen one at a time to prevent conflicts
- Modifying a resource group without changing any settings no longer triggers a "reload driver required" event
- Renaming a File that has a public link now updates the public link to the new filename

---

## 26.1.6 (May 2026)

VergeOS 26.1.6 is a maintenance release delivering targeted bug fixes and stability improvements across the platform. Key areas include NTP configuration in clustered environments, vSAN race condition fixes, boot loader improvements (GRUB/PXE), update installation reliability, and various UI corrections.

### Bug Fixes

#### Security
- Removed debug logging from the well-known authentication source

#### Authentication & Authorization
- Deleting system snapshots as an administrator user other than `admin` now returns the correct error message

#### User Interface
- Fixed capitalization in the NAS Volume Snapshot "Restore To New" breadcrumb navigation for consistency
- Emulated VM NVMe drives are temporarily hidden from the UI until live migration support is implemented

#### Networking
- Fixed NTP configuration in clustered environments: nodes 2 and beyond now correctly sync with node 1 instead of external NTP servers
- NTP pool addresses (e.g., `0.pool.time.org`) are now correctly written to `ntp.conf` using the `pool` directive instead of `server`
- Removed `time.nist.gov` from the default NTP server list (no longer recommended)

#### Storage (vSAN)
- vSAN node add/delete operations now run outside of transactions with longer timeouts, improving reliability while scaling out
- Fixed an issue where a vSAN sync completing could trigger an unwanted transaction snapshot
- Fixed a race condition in `RefreshTierMap` where maps could be partially initialized during startup
- Fixed a race condition when topology changes occur during writes

#### Virtual Machines
- Fixed custom scripts not executing properly
- Fixed an issue where "VM unresponsive" detection could be accidentally disabled when powering off node 2 without maintenance mode in a 2-node cluster
- VMs now attempt a graceful shutdown when the server is stopped outside of maintenance mode

#### Performance & Stability
- Fixed an issue where downloading an update would hold a database transaction open, potentially blocking other operations
- Added proper alarm dependencies for SMTP tables — SMTP alarms are now only generated during a refresh
- Fixed a timing issue when creating a new tenant where the appserver would restart before catalog refresh completed
- Fixed connection lifecycle refcount and busycount issues in appserver
- Fixed race conditions in appserver connection handling during errors
- Added proper error codes to node drive loop logging

#### Boot & Firmware
- Fixed GRUB patching — the system now correctly uses GRUB instead of only syslinux
- Improved the N+2 message to clearly indicate which nodes need to be rebooted

#### Installer
- All pre-install checks now complete before any packages are installed, preventing partial installations
- Fixed an issue where pressing `CTRL-C` on the Replace Drive form incorrectly continued as if "No" was selected
- Early-boot vSAN mount interruption now drops to a shell without a panic warning
- Added validation when setting the default gateway for the external network to ensure the gateway is within the netmask
- Fixed an issue where PXE boot installs incorrectly reported failure despite completing successfully

---

## 26.1.5 (May 2026)

VergeOS 26.1.5 is a maintenance release focused on stability, security hardening, and improved tenant isolation. Highlights include enhanced audit logging for tags, categories, and members, expanded NVIDIA GRID driver support, critical fixes to VLAN validation and VM cloning, a universal pre-patched OVMF vars file for Secure Boot across all operating systems, and new hardware support for PERC H975i and Intel E610 controllers.

### New Features

#### Hardware Support
- Added support for the Broadcom PERC H975i RAID controller
- Added support for the Intel E610 network controller

#### NVIDIA GRID vGPU
- Added support for NVIDIA GRID driver versions 20.1, 19.5, and 16.14 (in addition to the previously supported 20.0)

#### Secure Boot & OVMF
- Universal pre-patched OVMF vars file (`OVMF_VARS_4M.ms.2023.fd`) now supports Windows, Debian, Ubuntu, Red Hat, and other operating systems with a single file
- Pre-patched OVMF vars file now included in the overlay for immediate availability during installation
- Added the 2023 Microsoft Cross-Root Certificate Authority Secure Boot EFI disk patch for Windows VMs

#### Audit Logging
- Added comprehensive audit logging for changes to tags, categories, and member assignments
- Tasks now track the actual creator for accurate audit-trail attribution

### Bug Fixes

#### Security & Access Control
- Tenant update settings are now hidden from tenant users (tenants can no longer access system update configuration or see branch information)
- "Forgot Password" lookup is now case-insensitive (matches login behavior)

#### Virtual Machines
- Fixed VLAN ID 4095 being accepted during configuration but causing interface creation to fail (now properly rejected as invalid)
- Added additional error handling for VMs when the controller is temporarily unavailable, improving resilience during brief outages
- VM and drive clone operations now correctly preserve drive serial numbers from the source
- Fixed VM console keyboard focus being lost after pasting text or executing Ctrl+Alt+Delete
- Fixed reboot flag not being properly cleared when a VM is stopped

#### Alarms & Diagnostics
- Fixed syslog integration for raising and lowering alarms
- Fixed issues with vSAN and appserver alarm generation and reporting
- Fixed the resolve button on alarms so it correctly clears acknowledged alarms
- Fixed vSAN diagnostics functionality that was not operating correctly
- Fixed VM power-on events not being correctly recorded in the audit log

#### User Interface
- Fixed tenant dashboard tag member assignment and removed a debug console log
- Confirmation popups now consistently place the positive/confirm action on the right, matching standard UI conventions
- Clarified the misleading "vSAN Exit" button label on the node banner shown when vSAN has unexpectedly exited
- Removed an errant link from the delete license section in settings

### OS & Installer

#### Installer Improvements
- Updated the universal vars script with improvements
- Removed an outdated script and binary from the installation

---

## 26.1.4 (April 2026)

VergeOS 26.1.4 is a maintenance release focused on stability, security, and usability improvements. Highlights include a completely overhauled serial console with live migration support, critical fixes to API key IP allow/deny list enforcement, improved upgrade path reliability, and enhanced password generation that respects strict tenant password policies. This release also resolves the oVirt API issues identified in 26.1.3.1.

### Bug Fixes

#### Security
- **API Keys IP Allow/Deny List enforcement** — IP Allow Lists now correctly restrict access to only listed addresses, and IP Deny Lists properly block specified addresses (previously not enforced)
- **API Keys IP range conflict detection** — Creating an API key with overlapping CIDR ranges in Allow and Deny lists now shows a validation error; the IP range displayed in error messages for CIDR entries is now accurate
- **Blocked `0.0.0.0/0` in IP allow/deny lists** — Using `0.0.0.0/0` is no longer allowed (previously had inverted or unexpected effects)
- **TOTP bypass prevention** — Users created via API with TOTP enabled can no longer log in without providing the TOTP code
- **Account lockout enforcement** — Changing the failed login lockout setting now takes effect immediately
- **Login flood protection** — A flood of simultaneous login attempts no longer causes the system to become unresponsive
- **Last logged-in IP tracking** — The "Last Logged In IP" field now correctly displays when authentication is performed via API calls
- Additional obfuscation added for auth source credentials stored in the system
- Temporary login credentials created during PAM authentication are now properly cleaned up
- Added protection against deeply nested JSON payloads that could cause system issues

#### Authentication & SSO
- **`verge.io` auth driver removed** — The driver had a critical bug causing authentication to fail with "Invalid state" errors and has been removed until a proper fix is available. Use the `openid-well-known` driver instead.
- Auth sources now support multiple redirect URIs, allowing systems accessible via multiple domains to authenticate correctly
- Auth sources can now work through proxy servers
- OAuth flows now support redirecting to a custom link after successful authentication
- Entering Unicode characters in the login username field no longer causes the browser to hang
- Submitting the "Forgot Username" form no longer generates a false "login failed" audit log entry
- Enter/Return now works correctly on the TOTP setup modal

#### Virtual Machines
- Fixed an issue where provisioning a tenant from a recipe could leave the tenant in an unresponsive state when the tenant has strict password rules
- Fixed the VergeOS marketplace recipe failing with a "preferred tier no such file or directory" error after the recent throttling change
- Fixed the default node selection when migrating a VM
- Guest-initiated reboots are now correctly logged as reboots instead of being reported as hard resets
- NVMe drives for VMs are now available in the UI
- NVIDIA vGPU improvements: fixed issues with legacy-mdev devices, added proper sorting for vGPU driver files, added support for client config tokens for licensing, and duplicate PCI devices are now detected and cleaned up
- Fixed an issue adding multiple NICs on the same node to the same SR-IOV resource group
- Added support for importing cloud-init files when using a VergeOS-generated OVF file
- VM and tenant recipe icons now accept numeric characters, and the `bi-` prefix is optional when setting icons
- Non-existent variables in recipe questions and cloud-init files now render as empty strings instead of leaving the variable placeholder in the output
- Modifying tenant recipe questions no longer results in a blank page
- Powering on a VM from the VM dashboard now works with a single click
- Clipboard paste no longer defaults text to hidden

#### Serial Console
- **Complete serial console overhaul** — Replaced `vncterm` with a custom serial console that supports framebuffering, multiple simultaneous connections, and live migration. Serial consoles now auto-reconnect instead of showing a pop-up.
- Serial port contents remain consistent during VM live migration
- The new serial console is backward compatible with older versions of VergeOS
- VM serial consoles now default to 80x24 (standard for most operating systems), with a resize toggle available
- Changed default console type to `isa-serial` for better compatibility with older operating systems

#### User Interface
- Fixed power, guest info, and clipboard options that were non-functional in the node remote console; console now resizes properly on initial load
- Fixed incorrect total disk space display on the vSAN Tiers dashboard
- Fixed multiple issues with the VM Export volume browser: browsing volumes with only one item, the "Rename" modal not having input fields, and the UI hanging after selecting "New VM Import Job"
- Fixed multiple issues on the VM dashboard
- Fixed error display for new volume VM import jobs
- Fixed display issues for schedule triggers and styling on the execute button in the task dashboard
- Fixed alarm snooze intervals, snooze on listview, and acknowledgment loop issues; alarm history table has been streamlined
- Added proper sorting to the permissions page
- Added tenant name to the machine device list on resource groups
- Fixed double "restart needed" alert on node dashboard; added overcommit RAM to RAM usage calculations
- Two-factor auth type is hidden from the user dashboard when 2FA is not enabled
- Deleting a group now fully removes all remnants, allowing a new group with the same name to be created
- Creating a group with invalid characters no longer leaves stray data in the system
- Deleting objects no longer creates 404 errors in the UI
- Added order ID display in DNS zone records table; fixed breadcrumbs on the modify DNS zone record page
- Fixed alignment issues in the DHCP section of the network dashboard; fixed IP alias display for Bind and Proxy-enabled networks
- Fixed breadcrumbs on resource pages and user-initiated filters on Node USB/vGPU devices and NVIDIA PCI devices list pages

#### Networking
- Fixed fabric information not displaying in the UI on HP blade chassis systems when the physical network was in a trunked VLAN
- Fixed proxy FQDN matching so that `test.example.com` no longer incorrectly matches `a-test.example.com`; added an option to match entire subdomains
- Fixed deleting a proxy from the vnet dashboard leaving stale proxy configuration on the vnet (proxy options disappeared but edit view still showed proxy enabled with wiped config)
- Fixed an issue where creating a new static IP could randomly assign ownership to a tenant; virtual IPs can now be assigned to tenants from internal networks
- Added network conflict detection when configuring the network; quick installs now monitor network links before starting the core network
- Fixed network issues that occurred on reboot
- HA proxy now loads after IP aliases are configured

#### Storage (vSAN)
- When vSAN unexpectedly exits, a longer delay ensures other nodes receive confirmation before the host reboots
- Fixed potential timing issues during outbound sync errors
- Fixed device map assignment when there are insufficient drives
- Fixed a crash in vSAN when the system has only 2 drives but is configured for N+2
- vSAN issues are now properly surfaced in the UI after a restart
- Added vSAN and Fabric status options to the CLI login menu

#### NAS
- Fixed missing `gcs2` binary on NAS update that caused NAS service VMs to spam "Error running command guest-info: -8" after power-on

#### Scheduling & Tasks
- Fixed multiple scheduler bugs including time-of-day filtering, future start date alignment, daylight saving time handling, and issues with minutely schedules and time range filters
- Fixed the outgoing sync refresh task that was failing after migration
- Fixed error messaging on task schedule UI, added a summary field to task schedules list, and fixed banner summary display for times
- Fixed "Next Run Times" to show correct local time for noon and midnight schedules
- Webhooks now update `last_attempt` timestamp; removed a required flag on headers

#### oVirt Integration
- **oVirt engine ID uniqueness** — Fixed tenant system ID inheritance that caused duplicate oVirt engine IDs across the environment, which prevented oVirt from adding tenants as additional managed servers
- Fixed an oVirt login regression introduced after upgrading that prevented oVirt from connecting to the oVirt KVM Manager
- Fixed an error when attempting oVirt backups reporting "No available worker was found"
- oVirt backup jobs with tags now work correctly
- When restoring a VM to its original location, oVirt now allows characters in the name that are valid in VergeOS
- Updated VMware Python scripts for updated SDKs; added a script to retrieve VMware tags
- Removed the restriction requiring the "Network" field to be filled in for VMware services

#### Password Management
- Generated passwords now properly respect strict tenant password requirements; password generation no longer includes symbols when the policy doesn't allow them
- Removed password complexity validation for node credentials

#### System Stability
- **Upgrade reliability** — Added backwards compatibility for node login during out-of-order upgrades; an older controller can now log in to updated nodes and vice versa, preventing migration stalls
- Added guard pages to catch stack overflows immediately, with crash handling that fires even when the stack overflows
- Improved detection and logging for stack crashes and malformed JSON
- Session timeouts no longer affect internal system communication
- Fixed an issue where powering off or rebooting node1 caused the UI to be unavailable for approximately one minute
- Improved power-on sequencing after system restore and sped up network recovery; slowed down unresponsive machine detection on startup to reduce false positives
- Changed log rotation to be more frequent to prevent runaway loggers from filling the root partition
- Fixed memory leaks in proxy processing
- Fixed an issue where web connections could get stuck during error floods

#### Installer
- Fixed network loading issues during quick-install and bonding configuration
- Fixed an issue where the installer always installed `ovirt-engine` regardless of configuration
- Improved error message when attempting to add more nodes than the license allows
- SMTP is now disabled during install if the SMTP from address is empty

#### API
- API key logins now include IP address information in audit logs
- Unique constraint errors now return HTTP 409 instead of 422
- Improved audit log wording for invalid API calls; added token information to audit events

### Other
- Updated QEMU to 10.0.9
- Added NVIDIA GRID vGPU support for version 20.0
- Custom UI branding now gets properly enabled when using an offline license
- Fixed an issue where removing the powered-by setting didn't revert to the default value
- Fixed an error logged after snapshot expiration when all snapshot profile periods were deleted
- Fixed minor issues with SMTP reports and SMTP settings alarm triggers; fixed an error when using the Send Test Email modal
- Fixed the server setting in `boot/install-settings` rsyslog configuration
- Nodes now flash boot partition on specific setting changes; fixed update boot partition and LED locate commands
- Setting overcommit now properly flags online machines for reboot
- Fixed an issue where the auth source client secret field was being cleared unexpectedly
- Cleaned up headers to use VergeOS or generic naming

---

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

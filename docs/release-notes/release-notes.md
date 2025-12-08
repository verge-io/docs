# 26.0 Release Notes

!!! info "Release Information"
    - **Release Date**: October 2025
    - **Latest Version**: 26.0.2.2 (December 2025)
    - **Status**: Latest Production Release
    - **End-of-Life**: TBD

## Major Features & Themes

### AI Services Integration

!!! success "AI Platform Capabilities"
    - Native AI model hosting in GGUF format
    - Built-in UI integration for model management
    - OpenAI-compatible API endpoint
    - Support for pre-defined and custom models

### Enhanced User Experience

!!! tip "UI & Customization"
    - Complete theme engine replacing basic branding
    - Comprehensive UI appearance customization
    - Enhanced task automation with reusable schedules
    - System-wide tagging support
    - Improved API documentation interface

### Storage & Data Protection

!!! benchmark "Storage Improvements"
    - Immutable snapshot support
    - Enhanced vSAN tier management
    - System snapshot improvements (renamed from Cloud Snapshots)
    - Better storage diagnostics and management

### Security & Authentication

!!! security "Security Features"
    - API key authentication for users
    - Multiple SSL certificate management
    - Enhanced alarm system with email notifications
    - Improved audit logging capabilities

## 26.0.2.2 (December 2025)

!!! info "Hotfix Release"
    No reboot required (if System is currently on 26.0.2.x).

### Features & Fixes

#### User Interface & Caching
* Added cache buster to custom themes
* Fixed issue where modifying current theme wouldn't reload page
* Added cache busting to all dependencies and JavaScript modules
* Fixed issue where xterm was being minified, causing serial console issues for VMs

#### Snapshots & Synchronization
* Fixed immutable snapshots showing up on remote sites
* Fixed immutable snapshots not appearing after sync
* Fixed system snapshot manual-sync prefix on destination
* Fixed timing scenario where vSAN incorrectly triggered transaction snapshot due to settier operation

#### System Administration
* Fixed action menu item for restore job dashboard
* Fixed action menu items on site syncs outgoing
* Fixed delete tag category functionality
* Added action to update manual certificates
* Fixed 'allow insecure' flag not functioning in webhooks

#### Authentication & Users
* Fixed modify user form for auth sources

## 26.0.2.1 (November 2025)

!!! info "Hotfix Release"
    No reboot required (if System is currently on 26.0.2).

### Bug Fixes
- Fixed kernel issue with NAS where extended attributes stopped working (resolved Storware backup issues)
- Fixed New VM and New Tenant forms where hitting enter on search filters caused unintended form submission
- General improvements to New VM and New Tenant forms
- Fixed auto-refresh functionality on VMware backup VM dashboard

## 26.0.2 (November 2025)

### Features & Fixes

#### User Interface & Experience
- Enhanced navigation and organization:
    - Changed "Tasks" to "Tasks Dashboard" in main navigation
    - Added tags to tag categories list
    - Added tags to most list pages where applicable
    - Added select all/none to filter menu
    - Alphabetical sorting applied to actions on home
    - Added automatic sort for action menu
    - Added colors for form controls
- Fixed multiple breadcrumb navigation issues
- Fixed "Building List..." bug appearing randomly on forms
- Enhanced form components:
    - Fixed network selector to account for current network (core or disabled networks)
    - Toned down task script max height for better display
    - Fixed cloud-init header column arrangement
- Improved dashboard displays:
    - Added CPU base clock rate to node dashboard
    - Removed duplicate alerts on VM dashboard
    - Fixed machines dashboard issues
    - Fixed resource dashboard JavaScript error
    - Fixed VM dashboard infinity bug when cluster in maintenance
- Enhanced list views and actions:
    - Fixed migrate/popups on VM/VMs/Tenant Node/Service Container/VMware Container
    - Added new device shortcuts to tenant/machine dashboards and main navigation

#### Task Automation & Events
- Enhanced task event functionality:
    - Made event field read-only for consistency
    - Prevented edits on task events with owners
    - Task events list now has clickable link back to task
    - Task dashboard displays events table with clickable tasks
    - Fixed handling of non-string values
    - Changed VM fire event behavior
    - New VM events delayed to handle recipes making API calls
- Improved task logging and audit:
    - Fixed task logs name for executing state
    - Fixed audit log for task edits
    - Fixed audit log for task creation/deletion
    - Fixed audit log for task creation
    - Fixed counts on task dashboard with condensed lists and sorting
- Enhanced task management UI:
    - Made task event edit UI more user-friendly
    - Added task-related features to scripts page for ease of use
    - Fixed task dashboard owner field display
- Fixed delete messages on task events/schedule triggers and task scripts

#### Virtual Machine Management
- Enhanced VM operations:
    - Fixed issue starting machines with multiple devices from same resource group
    - Fixed potential issue where failed machine starts could leave devices reserved
    - Fixed VM import duplicate fields
    - Fixed cloning TPM devices
- Improved VM creation and recovery:
    - Changed error message to friendlier version when creating VM from recipe
    - Fixed issue restoring VMs from system snapshot when recovery took >2 minutes
    - Fixed issue restoring NAS VM from cloud snapshot where network no longer exists
    - Fixed event issue when creating VM from wizard
- Fixed issue triggering tasks on VMs that aren't snapshots

#### Tenant Management
- Enhanced tenant functionality:
    - Fixed tenant device status display
    - New tenant node form now adds tenant filter to hide snapshots
    - Fixed vnet rule headers
- Theme management improvements:
    - Fixed breadcrumb on modify tenant theme access page
    - Fixed theme access removal code
    - Fixed real-time tenant theme access changes
    - Fixed notification to nodes for specified themes

#### Storage & Snapshots
- Immutable snapshot enhancements:
    - Log user attempts to delete immutable snapshots
    - On unlock, clear snapshot alarm for immutable snapshots
    - Fixed unlocking to unlocked status transition
- File management improvements:
    - File upload overwrite now carries description over
    - Fixed potential browser credential popup when downloading files
    - Added bzip download filter via API for URL downloads

#### Sites & Synchronization
- Fixed site status for refreshing on down/unreachable systems
- Fixed map pin icon display
- Fixed site dashboard JavaScript error when adding logs with nothing enabled
- Fixed authentication to invalid URLs

#### Networking & WireGuard
- Fixed WireGuard interface dashboard display
- Fixed issue with IPSec Phase 1 modifications (JavaScript error)

#### Security & Alarms
- Admin 2FA alarm can now be acknowledged to dismiss
- Fixed issue with vSAN repair alarms

#### VMware Integration
- Fixed backup VM expiration from list view
- Fixed pause backup job/restore job functionality
- Added hidden setting to purge VMware container snapshots from cloud snapshots

#### System Administration
- Enhanced help system:
    - Added handling for help links with query parameters
- Enhanced resource management:
    - Fixed Host GPU settings typo
- Improved error handling:
    - Fixed issue clicking error dialog with "View References" option
- Swagger generation now refreshes page even with autorefresh disabled
- Added failback code for updates/marketplace/system diagnostics/license refreshes when part of internet is down
- Fixed issue verifying node versions during install
- Fixed issue installing asset packages

#### Permissions & Access
- Fixed issue where modifypermissions page might not load correct row

#### Notes & Documentation
- Added notes field to service container and VMware container dashboards
- Updated notes edit capability for service containers and outgoing syncs

### OS & Installation

#### Installation Process
- Fixed issue replacing node with 26.0.x
- Removed ability to replace drives while replacing node (support involvement now required)
- Fixed several bonding-related issues
- Added more accurate progress bar while installing packages on first node
- Fixed several node and version validation issues

#### Core System
- Enhanced appserver functionality:
    - Added pm and pt filters (pattern match and pattern match text compare)
    - Added support for et (equal text compare) filter operator
    - Added filter support for delimlist(rows)
    - Increased max passwords to 8K
    - Fixed issue where invalid token in cookies could temporarily prevent login
    - Deleting credentials now auto-deletes all sessions using it
    - Added support for range HTTP header for partial downloads
- Removed rndis-host USB driver
- Enhanced GCS functionality:
    - Removed some functions from usermode

#### vSAN Management
- Enhanced vSAN operations:
    - Changed initial dev file state to add tier
    - Fixed scale-out used redundancy check
    - Fixed node tier removal refresh
    - Fixed stacking transaction snapshots when tier walking slowly with active repairs
    - Fixed issue where new tier on node required reboot
    - Added automatic tier deletion when no drives remain on tier

## 26.0.1.2 (October 2025)

!!! info "Hotfix Release"
    No reboot required (if System is currently on 26.0.1 or 26.0.1.1).

### Bug Fixes
* Fixed issue where LACP settings could get reconfigured when updating from 4.13.4.x version

## 26.0.1.1 (October 2025)

!!! info "Hotfix Release"
    No reboot required (if System is currently on 26.0.1).

### Bug Fixes
* Fixed issue where "Reboot" option was not available when upgrading from 4.13.4.x version
* Fixed VNC console password authentication issues introduced in 26.0.1

## 26.0.1 (October 2025)

### Features / Fixes

#### AI Services
- Added AI support for running pre-defined or custom models in GGUF format
- Built-in UI integration for AI model management
- OpenAI-compatible API endpoint for AI services

#### User Interface & Theming
- Revamped user interface with new theme engine
- Changed custom branding into full-fledged theme engine with comprehensive customization
- VM console now opens in popout window instead of inline
- Enhanced paste functionality in VM console
- Fixed styling issues with JSON field types on forms
- Enhanced API documentation with improved interface

#### Task Automation & Scheduling
- Deprecated schedule_tasks feature
- Implemented powerful new task engine with reusable schedules
- Added event-driven automation capabilities
- New events available:
    - New VM Created
    - Tenant Online/Offline/Error states
    - Alarm Raised/Lowered
    - Before/After Let's Encrypt renewal
- Added webhook support to task engine
- Added new task/action for automated node maintenance (maintenance mode → reboot → exit maintenance)
- Added tagging support with task engine integration

#### Storage & Snapshots
- Implemented immutable snapshots for enhanced data protection
- Renamed Cloud Snapshots to System Snapshots
- System snapshots now support cloning
- Cluster shutdown now takes 24-hour system snapshot by default
- Fixed issue where generated diagnostics file could end up on wrong vSAN tier
- Fixed bug preventing preferred tier retention when using Overwrite during file upload
- Increased machine limits (tenants >1TB RAM now visible in system snapshots)

#### Virtual Machine Management
- Added virtual IOMMU support for guest VMs
- Fixed VM migration issue where VMs could migrate indefinitely during cluster changes with node maintenance cycling
- If VM gets out-of-space error, it no longer continuously attempts to boot
- Added warning when CPU type differs from cluster recommendation on VM dashboard
- Enhanced device management:
    - Machine devices can be marked as optional (allows VM/Tenant to boot without device)
    - On startup, tenants clean up devices which are recreated on refresh
- When VM is sent kill action while stopped, all devices are forced offline
- Fixed issue where setting VM to "pc" or "q35" pins latest value instead of changing with new machine types
- Enhanced SR-IOV NIC handling:
    - Fixed cloning issues
    - Fixed snapshot issues
    - Proper class assignment
- Added multiqueue support to virtio network cards (enabled on new VMs, disabled on existing)
- NIC hotplug now limited to once every 3 seconds for stability
- Fixed VMware restore issue for null controllerkey
- Enhanced VMware refresh for improper guest tool installations
- Advanced CPU parameters now supported (e.g., cpu.split-lock-detect=off)

#### Networking
- Renamed Virtual Wires to Virtual Switch Ports
- Fixed issue where stale core NIC could cause vxlan devices to get 1500 MTU
- Enhanced network creation with proper sorting when adding Layer 2 networks to tenants
- Added note to VLAN bonding indicating Active-Backup mode (not LACP compatible)
- Generated WireGuard configs now include static routes in CIDR format
- Fixed issue where non-/32 WireGuard IPs generated incorrect configs
- Added TCP MTU Probing advanced option (enabled by default)
- Changed default bonded network mode to LACP

#### Tenant Management
- Added events for tenant state changes (online, offline, error)
- Fixed issue where tenants didn't receive devices from service provider recipe catalogs (TPM, vGPU, PCI)
- Fixed issue where tenant network creation errors showed incorrect tenant name error
- Fixed issue with proxy FQDN support
- Added Proxy FQDN field to tenant dashboard
- Proxy FQDNs now filter out tenant snapshots
- Fixed tenant inheritance of parent database flush settings
- Fixed issue with invalid characters in tenant rename
- Tenant nodes now report running version
- Tenant nodes log internal container reboots
- Added CPU/RAM tracking to vnet containers
- Fixed devices list display on tenant node dashboard

#### Security & Authentication
- Added API key authentication for users
- Enhanced audit logging:
    - Auth source user login failures
    - All failed login attempts bubble up to main dashboard logs
    - Manual system snapshot deletions (not expired)
- Improved SSL certificate management:
    - Systems can manage multiple SSL certificates
    - Let's Encrypt cache wiped when certificate forced to renew
    - Support for multiple domains in single Let's Encrypt certificate using subjectAltName (comma-delimited list)
    - Enhanced error handling for OIDC applications with default/wildcard certificates
- Added UI for registering Root CAs with system
- Added advanced setting for system logon banner

#### System Administration & Monitoring
- Added comprehensive alarm system:
    - Proactive notification for problems and issues
    - Default email notifications to admin user/group for error alarms
    - Events for alarms raised/lowered
    - Fabric communication issue alarms
    - License expiration warnings (7 days)
- Enhanced node management:
    - Version restrictions when adding new nodes
    - Unlicensed nodes attempt license revalidation every minute
    - Fixed maintenance mode for unlicensed nodes with running networks
    - When node exits maintenance mode, workloads forced back even if HA group restricts
    - If node flagged as needing restart, treated as needing update
- Added CSV downloading capability to list views
- Enhanced diagnostics file handling
- Improved HA Group descriptions
- Added better upload URL handling with size check bypass option
- Fixed issue where non-admin users couldn't favorite VMs

#### Media & Files
- Renamed Media Images to Files
- Fixed URL parsing on upload form
- Renamed Make Passthrough to Make Resource

#### Recipe Management
- Added support for proxy FQDNs with tenant recipes
- Added new recipe question type: "hostname"
- Added retries when cleaning up after NAS recipe build
- Removed 30-day POC tenant recipe (no longer maintained)
- Fixed issue where tenants didn't get recipe catalog devices

#### NAS & Storage Services
- Enhanced NFS support:
    - NFSv4 mount options display for both versions
    - Fixed issue where NAS used wrong NFS version in tenants (affecting backup application change block tracking / extended attributes)

#### GPU & Hardware Support
- Added support for NVIDIA vGPU drivers 16.1 through 19.2
- Added vGPU and AI support for NVIDIA Blackwell GPUs
- Added new resource group type "Host GPU" for AI acceleration (NVIDIA, AMD, Intel)
- Fixed issue where tenants wouldn't receive vGPU/GPU devices
- Hid false error logs when NVIDIA drivers installed

#### Package & Update Management
- Added support for optional packages on updates page
- Fixed issue preventing downgrade after changing update branch
- Clone ISO hosted on update server with build options removed from UI (API intact)

#### Permissions & Access
- Added additional permission types
- Enhanced permissions handling throughout system

#### Recovery & Backup
- Fixed issue where recovered tenant from system snapshot with password reset showed wrong status
- Fixed timing issue when tenant creates system snapshot simultaneously with provider using same name

#### vSAN Management
- Modified vSAN tier field to read-only
- Added ability to disable network integrity checks for syncs
- Enhanced vSAN diagnostics capabilities
- Added guard-rails to integrity check with fix option (verification and alert banner)
- Fixed issue where manual vSAN drive addition via diagnostics was possible

#### Miscellaneous
- Added table schema and deprecation info to swapper/API Docs
- Enhanced catalog refresh throttling in tenants (single job)
- Fixed offline license compatibility with themes
- Only generate audit logs for manually deleted system snapshots
- Added hostname and domain fields to all L3 network types
- Removed obsolete v3 import tables

### OS

#### Core System
- Upgraded Kernel to 6.6.115
- Upgraded QEMU to 10.0.5
- Enhanced appserver functionality:
    - Fixed two potential deadlocks during controller handover
    - Fixed scheduler issues with DST and minute schedules
    - Fixed stack-based buffer overflow when network buffers fill during progress updates
    - Fixed integrity check startup check
    - Implemented lastlogin_ip update for credentials
    - Added IP allow/deny list support for credentials
    - Added authorization bearer support with API keys
    - Fixed audit event handling for failed sys token logins
    - Added cookies to login handling
    - Added reverse proxy support
    - Fixed timeout issue for scripts during shutdown
    - Fixed crash on shutdown with open SSL connections
    - Added fields and perm_check options to actions
    - Overhaul of permissions cache
    - Added HTTP response for exceeded connections
    - Added vector support to internal database

#### Storage & vSAN
- Enhanced vSAN functionality:
    - Added out-of-space handling to return errors to client
    - Added redundant device maps
    - Changed balancing to match node balancing
    - Fixed error codes for syncs
    - Out-of-space no longer overflows to tier 0
    - deletenode now requires storage removal first
    - Hash map changes check for required available storage
    - Changed default fuse_minworkers to 4 (from CPU core count)
    - Added /sys snapshots support
    - Added changeencpassword capability
    - Fixed fuse IO queue lockup
    - Rewrote IO queues to fix performance drop at depth limits
    - Added sequential readahead
    - Fixed abort procedure when committing deleted file
    - Fixed shutdown hang when settier called with no change
    - Added immutable snapshot type

#### Networking & Drivers
- Added kernel drivers for additional serial devices
- Added workaround for Intel E810 NICs using RDMA (prevents network reset during high activity)
- Added USB network device support
- Time synchronized by fabric instead of NTP during boot
- Fixed NVMe boot partition flashing with multichannel enabled
- Added workaround for NVMe controllers supporting multipath

#### Security & Access
- Fixed caching issue for PAM when API down
- Fixed issue where restarting fabric from SSH could cause fabric process exit
- Added ability to start OS without appserver running
- Enhanced PAM handling

#### System Services
- Added GCS with SSE commands for help
- Added script for checking device map balance
- Appserver unexpected shutdown only reboots node if vSAN can enter maintenance mode
- Made several utility scripts executable
- Added webserver JSON socket and json-api helper
- When powering off node, running VMs gracefully powered off (with timeout) and flagged for restart on power-up

---

## Upgrade Notes

!!! warning "Important Upgrade Information"
    - **Reboot Required**: Yes - all nodes will require restart
    - **Theme Migration**: Custom branding settings automatically migrated to new theme engine
    - **Task Migration**: Existing schedule_tasks automatically converted to new task engine
    - **Terminology Changes**: Cloud Snapshots → System Snapshots, Virtual Wires → Virtual Switch Ports, Media Images → Files
    - **Network Defaults**: New bonded networks default to LACP instead of Active-Backup
    - **VM NIC Changes**: New VMs have multiqueue enabled; existing VMs retain disabled state

!!! info "Post-Upgrade Actions"
    - Review and test new alarm notifications
    - Configure API keys for programmatic access if needed
    - Review converted task automation schedules
    - Consider implementing immutable snapshots for critical data
    - Update any external integrations referencing renamed features

## Known Issues

!!! note "Current Limitations"
    - Some NVMe drives have known issues with power management; cluster setting available to disable if needed
    - VLAN bonding uses Active-Backup mode only (not compatible with LACP)

---

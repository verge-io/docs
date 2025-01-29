---
title: 4.13 Release Notes
description: Release notes for the 4.13 series of VergeOS
#icon: material/text-box-outline
status: new
---

# 4.13 Release Notes

!!! info "Series Information"
    - **Initial Release**: November 2024 (4.13.0)
    - **Latest Version**: 4.13.3 (January 2025)
    - **Status**: Latest
    - **End-of-Life**: TBD

## Major Features & Themes

### Hardware Virtualization & Resource Management

!!! success "Resource Management"
    - Comprehensive hardware passthrough capabilities (USB/PCI/SRIOV)
    - Experimental vGPU live migration support
    - Enhanced GPU support with latest NVIDIA GRID drivers
    - Increased resource limits (1024 CPUs, 256TB disks)
    - Advanced SRIOV and device management

### Storage & Data Management

!!! tip "Storage Enhancements"
    - Improved VM Export functionality
    - Enhanced cloud snapshot capabilities
    - Advanced vSAN management features
    - Multipath and multichannel support
    - Volume tier throttling
    - Improved backup integration
    - Ability to emulate USB storage devices

### Network Infrastructure

!!! benchmark "Network Improvements"
    - Enhanced bonding capabilities
    - Split brain detection for external networks
    - Improved high-speed network utilization
    - Advanced network container features

### System Administration

!!! security "Management Features"
    - Enhanced two-factor authentication
    - Improved update process with parallel updates
    - Advanced maintenance mode capabilities
    - Enhanced VMware integration
    - Improved tenant management
    - Comprehensive HA improvements

## 4.13.3 (January 2025)

### Features & Improvements

#### Virtual Machine Management
- Enhanced VM configuration capabilities:
    - Added ability to specify VM smbios data using advanced options (e.g. smbios.type1.serial=XXXYYY)
    - Added support for advanced CPU parameters (e.g. cpu.split-lock-detect=off)
    - Added VM advanced options support for machine, smp, and rtc parameters
    - Fixed CD-ROM "Optimize For" setting adherence
    - Added UTF-8 support for VM paste mapping configurations
    - Improved VM console focus after ctrl-alt-del
    - Fixed best CPU flag detection for nested virtualization
    - Fixed issue where editing a VM could reset paste keymap or RTC settings
- Enhanced cloud-init handling:
    - Improved file cleanup when VM is stopped
    - Added cloud-init support for installation

#### Authentication & Security
- Enhanced Two-Factor Authentication:
    - Added audit logging for failed 2FA code attempts
    - Improved TOTP code validation (15-second time offset tolerance)
- Improved authentication source management:
    - Fixed group membership updates with auth sources
    - Added auto-cleanup of groups when deleting auth source
    - Added automatic debug mode timeout (1 hour)
    - Enhanced OIDC application support for group management

#### System Administration
- Enhanced maintenance mode:
    - Improved handling of tenant reserve nodes during shutdown
    - Added forced maintenance mode option without redundancy
    - Fixed maintenance mode issues with tenant node reserves
- Improved tenant management:
    - Added queue system for tenant provisioning operations
    - Enhanced tenant node statistics tracking
    - Improved cleanup of temporary tenant node directories
    - Added system password requirement enforcement for tenants
    - Fixed virtual IP ownership display in tenants

#### Storage & Infrastructure
- Enhanced vSAN functionality:
    - Improved integrity check monitoring in diagnostics
    - Enhanced vSAN shutdown logging
    - Improved connection handling during network instability
- Upload improvements:
    - Added system-wide preferred tier inheritance for URL uploads
    - Improved upload transfer rate accuracy

#### VMware Integration
- Enhanced backup functionality:
    - Added fix for differential backups of non-4k aligned disks
    - Improved error handling for portgroup lookups
    - Enhanced disk size display precision (3 decimal places)
    - Improved import option consistency

### System Updates
- Core system improvements:
    - Upgraded to kernel 6.6.66
    - Upgraded QEMU to 9.0.4
    - Enhanced wireguard TCP performance with GSO
    - Added power-save CPU frequency governor
    - Improved core network DNS and gateway configuration
    - Updated documentation links to docs.verge.io
- Installation enhancements:
    - Added automated node shutdown option post-installation
    - Improved network auto-detection
    - Enhanced drive selection process
    - Added more detailed console output during boot/shutdown
    - Fixed advanced installer network configuration issues

### Bug Fixes
- Fixed various issues with:
    - NAS recipe status during drive formatting
    - Cloud snapshot timing conflicts
    - SSL certificate Common Name parsing
    - Virtual wire configuration
    - VMware backup and import processes
    - Network connection maintenance during migrations
    - vGPU profile placement IDs
    - Recipe field type display

## 4.13.2 (December 2024)

### Features & Improvements

#### Virtual Machine Management
- Enhanced VM recipe functionality:
    - Added automatic recipe detachment when guest agent connects
    - Improved provisioning continuity during unexpected reboots
- Added API support:
    - PUT support for machine power state
    - Cloud-init file creation via API
- Fixed deprecated QEMU log for VMs with console password
- Improved auto-start capabilities:
    - Added power-on flagging for networks, VMs, tenant nodes, and VMware services when resources become available

#### VMware Integration
- Fixed downloading of VMware files:
    - Improved handling of vmx, nvram, and vmxf files/assets

#### System Administration
- Enhanced maintenance mode:
    - Added support for single problematic node maintenance (failed drive scenarios)
- Improved UI/UX:
    - Fixed node drive temperature dashboard display
    - Enhanced vSAN dashboard walk progress display
    - Changed full walk progress visibility
    - Improved form dropdowns with default text sorting
    - Fixed long history graphs display for 0 bytes
    - Fixed VNET list poweroff popup for online machines
- Modified backend package installation process

#### Storage & vSAN
- Enhanced vSAN functionality:
    - Improved controller votes during startup for better split-brain detection
    - Fixed dashboard walk progress display during idle state
- Fixed bonded interface handling for External networks requiring restart

### OS & Installation

#### System Infrastructure
- Enhanced storage support:
    - Added NVMe multipath support
    - Fixed fiberchannel device lists
    - Improved boot partition flashing with FC cards
- System improvements:
    - Changed grub boot title to "VergeOS"
    - Accelerated boot partition flashing during shutdown
    - Fixed potential memory issue during vSAN sync

#### System Management
- Enhanced framework handling:
    - Improved controller handoff from node2 to node1
    - Fixed rare lockup during node connection phase
- Improved physical access:
    - Fixed login issues
    - Removed false-positive error logs

## 4.13.1 (November 2024)

### Virtual Machine Management

#### UI Improvements
- Fixed core checkbox persistence on VM dashboard refresh
- Enhanced core checkbox behavior on statistics graph
- Improved cluster-based node filtering for VM migration
- Enhanced vGPU profile sorting by name
- Updated audit logs for hard reset/restart actions

#### Functionality
- Added download completion check for Marketplace recipe VMs requiring ISOs
- Enhanced ISO management:
    - Fixed renaming attached ISOs when VM is offline
    - Improved media handling

### System Administration

#### Resource Management
- Enhanced resource group functionality:
    - Added resource group specification for machine devices
    - Fixed resource group deletion with attached devices
    - Improved device management
- Added vGPU profile display improvements:
    - Added framerate information
    - Added VRAM details
- Implemented automatic node resource cleanup on startup

#### System Tools
- Enhanced system diagnostics:
    - Implemented 256K chunk uploads
    - Improved performance and reliability
- Improved scheduled tasks:
    - Removed legacy 2019 default date
    - Enhanced scheduling functionality

#### VMware Integration
- Enhanced backup job management:
    - Added pause/resume/stop controls to list view
    - Added backup mode display
    - Removed kernel warning for container service startup

### Storage & Infrastructure

#### VSAN Improvements
- Fixed critical scenarios:
    - Resolved same-tier data movement triggering trans snap
    - Fixed drive listing with FC card present
    - Enhanced integrity check for large repair counts (>500 repairs)

#### System Services
- Enhanced appserver functionality:
    - Added proxy source IP support from URL
    - Improved cache settings (private to public) for files
    - Added general proxy source IP support
- Updated Samba configuration:
    - Optimized ACL handling
    - Removed automatic DFS enabling when AD is not joined

### OS & Installation
- Upgraded to Kernel 6.6.60
- Fixed various stability issues
- Enhanced service configuration
- Updated system endpoints to vergeos.com
- Removed unnecessary debug logging

## 4.13.0 (November 2024)

### Major Features & Themes

#### Hardware & Resource Management
- Added resource passthrough capabilities:
    - Support for USB, PCI, and SRIOV NICs passthrough to VMs and tenant nodes
    - New dashboard for system resource visibility
    - Added SRIOV eswitch support for mlx5
- Implemented experimental vGPU live migration (cluster setting)
- Added support for NVIDIA GRID versions:
    - 16.6, 16.7, 16.8
    - 17.2, 17.3, 17.4
- Removed NVIDIA GRID driver support prior to 16.6 (kernel incompatibility)

#### Virtual Machine Enhancements
- Increased capabilities:
    - Maximum file size for virtual disks now 256TB
    - Increased max CPU per tenant node to 1024
    - All machine types using 9.0 or newer automatically include USB controller
- Added SMBIOS improvements:
    - Product vendor and serial number provided to VMs
- Enhanced VM Management:
    - New graceful reboot option (most reliable with guest agent)
    - Changed Reset to "Hard Reset" and Reboot to "Restart"
    - Hot-pluggable virtual USB controller for drive interfaces
    - Optimized VM drive quiescing
    - New machine types for QEMU 9.0

#### Networking & Infrastructure
- Enhanced bonding capabilities:
    - Support for multiple core physical interfaces into VLAN
    - Changed default bond settings to prevent misconfiguration
    - Support for bonded core physical NICs with tagged VLAN
    - Added ability to change physical network to bonded after install
- Improved network management:
    - Added split brain detection for external networks with static IPs
    - Added a Allow Ping rule on the External network that is created with new system deployments (where you access the UI). This rule is disabled by default.
    - Support for IP aliases in proxy-enabled networks

#### Storage & Backup
- Enhanced VM Export functionality:
    - Increased max Volume VM Exports to 100 (from 20)
    - Added NFSv4 and extended attribute support
    - Added read-write support for backup vendors
    - Faster VM importing (no disk copy/conversion needed)
    - API support for name override and VM list
- Improved cloud snapshot capabilities:
    - Increased maximum from 1000 to 2048
    - Now includes node and tier directories from sys directory
    - Added vSAN config copying
    - Support for multiple selections in tenant/VM recovery

### Functionality Improvements

#### VMware Integration
- Enhanced backup functionality:
    - Removed 50 VM limit on pre-import list
    - Fixed handling of VMs with <256M RAM
    - Added setting for backup jobs without full refresh
    - Fixed CPU usage reporting for VMware Backup Service
- Improved VM import:
    - Support for interface overrides (drives and NICs)
    - Option to ignore optical drives

#### Authentication & Security
- Enhanced two factor authentication:
    - Added verification requirement before enabling
    - Added type to user dashboard, list, and profile
    - Fixed OpenSSL Cipher URL
- Fixed issues with:
    - Administrator permission management
    - Invalid auth source icon handling
    - OIDC login with long usernames

#### System & Cluster Management
- Enhanced update process:
    - Added new settings:
        - Warm Reboot: Faster node reboot during updates (bypasses BIOS/EFI)
        - Multi-Cluster Update: Simultaneous updates across clusters
    - Process improvements:
        - Updates pause if users manually reboot servers
        - Status/logs only update after successful maintenance mode
        - Removed redundant storage redundancy requirement
        - Parallel updates possible (one node per cluster after node1)
        - Enhanced status logging during controller failover
- Improved maintenance mode:
    - Support for multiple simultaneous nodes (respecting vSAN redundancy)
    - API support for forced maintenance mode
    - Enhanced VM migration during maintenance:
        - 4 VMs for >40Gbps networks
        - 2 VMs for >10Gbps networks
        - Configurable via Advanced Settings

#### Storage & vSAN
- Enhanced vSAN management:
    - Improved cluster tier dashboard with comprehensive node listing
    - Added manual drive addition via vSAN Diagnostics
    - Added Get Tier Status to diagnostics
    - Better tracking of vSAN connectivity
    - Drives set to initializing during scale-up
    - Changed default timeout for IO from 30 to 7 seconds
    - Implemented multipath for fiber channel and DAS storage (active/passive)
    - Implemented multichannel communication between nodes
    - Added volume tier throttling for tenant usage control
- Storage improvements:
    - Removed offline requirement for VM drive tier changes
    - Fixed volume sync deletion issues
    - Enhanced snapshot management in backup clusters

#### Tenant Management
- Enhanced tenant features:
    - Support for all media image types (not just ISOs)
    - Added machine device counts to dashboards
    - Automatic sites and syncs disable on clone
    - Fixed certificate visibility in cloned tenants
    - Better handling of tenant default routes
    - Improved device offline status during cloning
- Added HA Group improvements:
    - New '+' prefix feature for co-location preferences
    - Enhanced VM placement optimization

#### Network & Connectivity
- Improved network operations:
    - Virtual wire connection delayed until migration completion
    - Enhanced wireguard peer creation
    - Better IP address ownership visibility
    - Improved bonded network configuration
- Added "My DMZ" back in network rules for Route/Translate
- Fixed Layer2 type change issues with physical interfaces

### System Administration

#### Configuration & Management
- SMTP improvements:
    - Changed NTP restart behavior
    - Removed default From Address in fresh installs
    - Added warning for missing From Address
    - Enhanced mail file handling
- UI/UX updates:
    - Changed "Refresh PCI Devices" to "Refresh Devices"
    - Added preferred tier space check notification
    - Enhanced license management and marketplace interaction
    - Improved share status visibility for CIFS/NFS

#### File Management & Upload
- Enhanced file upload capabilities:
    - Added on-the-fly decompression for xz/gz formats via API
    - Improved upload status monitoring
    - Enhanced public link handling
- Added ISO generation capabilities:
    - Support for zip files and other ISOs via API
    - Automatic guest driver ISO creation for vGPU setups

### OS & Installation

#### Installation Process
- Enhanced network configuration:
    - Improved core network NIC scanning for conflict detection
    - Better MTU problem detection and messaging
    - Removed physical switch configuration prompt
    - Enhanced auto-network detection
    - Support for single node without physical core network
- Added system classification prompt (POC/Trial/Homelab or Production)
- Improved drive management:
    - Better multipath drive handling
    - Enhanced vSAN device selection
    - Option for remaining disk boot partition flashing
    - Improved drive formatting during scale-out/node replacement

#### System Infrastructure
- Kernel and Core Updates:
    - Upgraded to kernel 6.6.56
    - Upgraded base QEMU to 9.0.3
    - Added RPKI package for frr
    - Enhanced TCP and network buffer settings
- Hardware Support:
    - Added Xilinx and USB Network drivers
    - Disabled hardware offloading for certain Broadcom NICs
    - Added code for buggy NVMe drive handling
    - Enhanced mlx5 driver support
    - Added ability to relax RMRR with IOMMU

#### Boot & System Management
- Enhanced boot process:
    - Added quick reboot using kexec
    - Improved EFI handling
    - Better bonded NIC detection after PCI slot changes
    - Faster boot with unlinked NICs
- Security improvements:
    - Added SSH password disable option
    - Enhanced physical access login tracking
    - Improved login brute-force handling
    - Better multiple SSH session management

### Bug Fixes
- Fixed various issues with:
    - Cloud snapshot recovery scenarios
    - Guest agent functionality after VM reset
    - Volume export share FSID stability
    - Tenant snapshot timing scenarios
    - Database question handling in tenant recipes
    - Node CPU usage reporting
    - IPSec Phase1 pre-shared-key visibility
    - Site sync statistics display
    - VM export quiescing
    - Boot partition updates via API
    - NTP leap second handling
    - Syslog regex filter reloading
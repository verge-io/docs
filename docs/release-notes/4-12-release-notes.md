---
description: Release notes for the 4.12 series of VergeOS
#icon: material/text-box-outline
---

# 4.12 Release Notes

!!! info "Series Information"
    - **Initial Release**: February 2024 (4.12.0)
    - **Latest Version**: 4.12.6 (July 2024)
    - **Status**: Supported (Superseded by 4.13)
    - **End-of-Life**: TBD

## Major Features & Themes

### Enhanced User Experience

!!! success "Key Improvements"
    - New dark mode user interface
    - Improved VM management interface
    - Enhanced recipe handling
    - Streamlined tenant management

### Virtualization Improvements

!!! tip "Performance Updates"
    - Enhanced nested virtualization support
    - Live migration of named CPUs
    - Support for latest AMD/Intel processors
    - Increased VM core count (up to 1024)
    - Improved VM storage performance

### Security & Authentication

!!! security "Security Features"
    - TOTP 2-Factor authentication
    - Support for offline systems and licensing
    - Enhanced tenant isolation
    - Improved password management
    - Support for latest NVIDIA security updates

### Performance

!!! benchmark "Performance Gains"
    - 25% faster network migrations
    - Improved storage performance during contention
    - Enhanced disk operations
    - Dedicated vSAN meta cache
    - Upgraded to Linux kernel 6.1

## 4.12.6 (July 2024)

### Features & Fixes

#### Security & Authentication
- Added TOTP 2-Factor authentication
- Added support for 2FA (email or TOTP) logins from the console/ssh
- Optimized brute-force attack handling during login
- Updated SSH to address CVE-2024-6387 (regreSSHion) - applies to systems with SSH enabled via External firewall on public network
- Fixed SSH-related issues:
    - Resolved sshd issue where /home/root would get created on root login
    - Fixed UI audit logging for root user SSH key login
    - Removed deprecation warning with pam and sshd

#### Virtual Machine Management
- Increased max VM core count to 1024 (requires q35-8.1 or newer)
- Enhanced VM boot process:
    - EFI disks now created at first boot vs creation time
    - Added ability to detach VM from recipe at first boot using "YB_DETACH_RECIPE=firstboot"
    - Added cloud-init disable option via recipe ("YB_DISABLE_CLOUDINIT" with values: true, false, or purge)
- Fixed issues with:
    - VM Exports volume browsing from New VM form
    - Cloning VM nested virtualization properties
    - Nested virtualization in tenants
    - VMware backups presenting VMX/nvram files

#### Cloud & Storage
- Increased maximum cloud snapshots from 1000 to 2048
- Extended maximum SMART hours to 10 years for older drive warning status
- Added support for device assets for advanced options
- Improved snapshot management:
    - Auto-deletion of Volume and VM snapshots in non-redundant VSAN state
    - Fixed restoration from cloud snapshots without UUID specification
- Volume syncs now prevent:
    - VM Exports use as destination
    - Snapshot creation when used as source
- Added metadata extraction for vendor change-block-tracking from VM Exports

#### Networking
- Added IPv6 support on Layer2 networks
- Enhanced network functionality:
    - Added physical device passthrough to network containers for MAC-based filtering
    - Fixed issues with wireguard peer creation (>27 peers) in tenant/smaller systems
    - Resolved Let's Encrypt issues in proxy-enabled tenants
    - Fixed VMware Service container network changes during runtime
    - Improved physical interface detachment during layer2 type changes
    - Fixed bond configuration for multiple bonded networks
    - Resolved network migration "Initializing" status issues

#### User Interface & Experience
- Improved tenant management:
    - Fixed dashboard graph display
    - New tenant form now defaults to "Custom"
    - Added resource availability notifications for vGPU/GPU cluster status
- Enhanced user experience:
    - Public links default to filename
    - Fixed session timeout login popup
    - Fixed permissions form capitalization
    - Fixed marketplace error state on fresh install with pending license

#### System Administration
- Fixed issues with:
    - License acquisition on low space root filesystem
    - Tenant node/vnet power state reporting
    - Recipe question import logging
    - Remote repository recipe questions import logging

### OS & Installation

#### Installation & Boot Management
- Added support for:
    - iPXE config boot
    - Serial console resizing via xterm (using "resize" command)
- Enhanced installation process:
    - Improved external network selection
    - Maintenance network question limited to advanced installer
    - Removed license credential prompt on resume if blank
    - Fixed scale-out node configuration after first boot
    - SWAP no longer requested after node1

#### System Infrastructure
- Improved GPU driver management:
    - Syslog now reports skipped NVIDIA driver installation
    - Enhanced PCI device handling during installation
- Enhanced boot and storage:
    - Fixed boot partition flashing for EFI
    - Improved storage-node boot with non-bootable VSAN disks
    - Fixed controller node storage mounting from non-vsan boot
    - Increased disk partitioning timeout to 30 seconds
- Network improvements:
    - Faster auto-network detection with VLAN conflict detection
    - Fixed NTP synchronization with IPv6
    - Improved yb-api functionality:
        - Enhanced token login
        - Added username/token auto-detection for physical access
        - Fixed /sys/tokens posting
- Added system diagnostics for filesystem and memory debugging

## 4.12.5 (May 2024)

### Features & Fixes

#### Virtual Machine & Console
- Added Windows key to virtual keyboard toggle on VM console page
- Increased VM console paste limit to 1024 characters
- VMware backups will now make a copy of VMX files
- Fixed a false-positive error that could be logged during a VM migration

#### Networking
- BGP now handles graceful restarts more efficiently
- Added advanced network option to enable 802.1ad (QinQ)
- Enhanced virtual IP management:
    - Fixed issue where deleting a virtual IP address was automatically applying firewall rules
    - Optimized refresh handling for batch virtual IP operations (single refresh for multiple IPs)
- Network diagnostic queries will now clean themselves up if they become stale
- Fixed an issue where max vxlan fdb entries might not get set to 0

#### System Administration
- Changed maximum password length from 64 to 256
- Improved cluster management:
    - Cluster's Target max ram pct updates now reflect in overall cluster RAM usage
- Enhanced node diagnostics:
    - Fixed inability to send diagnostic queries to unresponsive nodes
- User Management:
    - Fixed issue where creating users with invalid display names left database references
- Performance Improvements:
    - Sped up generating the NAS recipe
    - Optimized machines dashboard API query

### OS & Installation

#### Storage Management
- Fixed storage tier removal completion requiring node1 reboot
- Added online vSAN drive deletion capability (CLI only)
- Fixed rare vSAN repair detection issues under specific CPU conditions

#### System Infrastructure
- Added support for additional NIC vendors and devices
- Enhanced kernel functionality:
    - Added missing NFT counter module for firewall tracking in 5.10 kernel
    - Fixed PXE booted nodes using incorrect kernel version
- Improved disk management:
    - Fixed partitioning and discovery issues
    - Adjusted partitioning timeout for systems with slow drive discovery

## 4.12.4 (April 2024)

### Features & Fixes

#### Virtual Machine & GPU Management
- Each machine now has a unique, permanent UUID (read-only)
- Added warning display for VMs with virtio-scsi drives and UEFI compatibility issues
- Enhanced GPU management:
    - Fixed GPU device attachment to tenant VMs with TPM devices
    - Improved tenant node GPU device handling and assignment
    - Added support for additional GPUs on Intel based systems
    - Tenant node GPU devices now show offline state when disabled
- Fixed issue where graphs still show data after VM power-off
- Fixed VMware Service attachment to layer 2 network issues

#### Authentication & Security
- Fixed group synchronization with DUO auth source
- Improved two factor authentication validation message links
- Fixed volume antivirus profile detachment issues

#### User Interface & Experience
- Fixed multiple dark mode issues
- Enhanced user prompts for MAC preservation and preferred tier during shared object imports
- Sites dashboard improvements:
    - Better site status reflection
    - Fixed site visibility issues for some users
    - Hidden IP address field on vnets dashboard for 'none' router type
- Added log filtering in diagnostics
- Fixed arp-scan functionality in diagnostics

#### System Administration
- Modified update process to prevent individual package selection
- Enhanced diagnostic capabilities

### OS & System

#### Boot & Hardware Management
- Accelerated boot partition flashing
- Enhanced hardware synchronization:
    - Forced node hardware clock sync with UTC
    - Improved EFI boot registration with boot-next option
- Added qemu-guest-agent package
- Fixed API token expiration 404 errors
- Various vSAN fixes and enhancements

### Installation

#### Network Configuration
- Automated Core and DMZ network MTU determination
- Enhanced installation process:
    - Improved swap configuration visualization
    - Removed VLAN option for non-core physical networks
    - Better error output for cluster validation
    - Additional unattended options
    - Minimum MTU warning (9000) on core networks
    - IP conflict detection at install time
    - EFI boot option registration at install time
- Storage optimization:
    - 10-second improvement in NVMe drive formatting
    - Increased boot-only drive partition size to 4G (from 1G)

## 4.12.3 (April 2024)

### Features & Fixes

#### System & Configuration
- Fixed cluster CPU auto-detection issues on slower systems
- Fixed several issues with SMTP and settings
- Fixed VM recovery from cloud snapshots when attached to non-existent recipes
- Fixed styling issues related to dark mode

### OS & Installation
- Added additional advanced vSAN settings for tweaking high-latency environments
- Fixed boot option availability issue when hard-power off occurs during boot partition updates

## 4.12.2 (April 2024)

### Features & Fixes

#### GPU & Hardware Support
- Added support for NVIDIA 16.5 driver
- Enhanced hardware management:
    - Fixed CPU vendor detection for host mode Intel CPU
    - Added fiber channel scan for drive refresh
    - Enhanced IPMI service management:
        - Automatic restart for devices marked as "busy"
        - Fixed IPMI address loading in UI

#### Storage & vSAN Management
- Enhanced vSAN capabilities:
    - Added ability to clear reference counts from VSAN diagnostics
    - Added VSAN online since and up since times to node drives
    - Fixed total read/write on node drive dashboard
    - Added multiselect support for VSAN drives (closing/initializing/formatting)
- VSAN rates on main dashboard now show decimals

#### Authentication & Security
- Complete overhaul of Two Factor Authentication and Require Password Change
- Added API support for root CA registration
- Fixed SMTP refresh settings on startup

#### Networking & BGP
- Fixed issues with:
    - BGP network initialization
    - BGP interface deletion with associated firewall rules
    - L2 networks diagnostic query expiration
    - Apply Proxy firewall rule refresh
- Enhanced FQDN Proxy feature for tenants

#### Tenant & Virtual Machine Management
- Improved tenant creation:
    - Added MAC address offset randomization
    - Added support for ${$random} and ${$random:start:end} recipe variables
- Enhanced VM management:
    - Added option to remove ctrl-alt-delete confirmation on VM console
    - Fixed auto-machine-power-on logic enabled flag
    - Fixed OVA imports from NAS volume
- Increased supported nodes per-cluster to 255
- Fixed remote recipe device downloads

#### User Interface & System Tools
- Several UI/theme fixes
- Enhanced upload functionality:
    - Added ability to skip file size check for Upload from URL (for 1-time URLs)
- Changed "cluster power off" to "cluster shutdown"
- Improved cluster CPU auto-detection
- Fixed license request file generation
- Fixed spice console password
- Fixed clone ISO build issues

### OS & Installation
- Service improvements:
    - Started lxc.service before appserver for cgroups/dependencies
    - Fixed older NVIDIA GRID driver compatibility issues
    - Fixed multiple ipmievd issues
- Installation enhancements:
    - Added version display in header
    - Enabled LLPD in installer
    - Fixed time sync during quick install
    - Fixed CLI login menu reboot
- System updates:
    - Updated base QEMU to 8.1.5
    - Updated to Kernel 6.1.81 and 5.10.212
    - Added additional FC drivers
- Fixed issues with:
    - Scale-out VSAN warning status
    - VSAN encryption key auto-negotiation during boot
    - Installer restart with tagged VLAN on core physical network
    - Drive selection and tier settings during installation

Over 50 additional minor fixes and enhancements were also included in this release.

## 4.12.1 (March 2024)

### Features & Fixes
- Fixed NAS volume export availability for NFS

### Security Updates
- Added support for NVIDIA drivers:
    - Version 13.10
    - Version 16.4
    - See [NVIDIA security portal](https://www.nvidia.com/en-us/security/) for complete security details

## 4.12.0 (February 2024)

### Major Features

#### Virtualization & CPU Support
- Added nested virtualization advanced option to all CPU types per VM
- Enhanced live migration capabilities:
    - Support for named CPUs with nested virtualization
    - Full support for Intel processors
    - Partial support for AMD processors
- Added support for newer AMD and Intel processors
- Enhanced VM networking:
    - Added numtxqueues and numrxqueues configuration for VM NICs via advanced settings
    - Enabled direct VM NIC attachment to VPN network
    - Added MTU configuration for wireguard interfaces

#### User Interface & Experience
- Introduced new dark mode for the UI
- Enhanced VM management interface:
    - New VM screen shows and allows recipe updates
    - Added CPU type recommendations based on cluster
    - Added RAM usage to VM history
    - Added clipboard text hiding option for VM console
- Product help now links to public wiki

#### System & Security
- Implemented support for disconnected systems
- Added offline licensing support
- Introduced Tenant Isolation feature

### Performance Improvements

#### Storage & System
- Enhanced VM storage performance during per-node contention
- Added dedicated meta cache to vSAN
- Improved storage management:
    - Increased disk delete performance
    - Reduced impact for larger drives
    - Enhanced drive hotplug performance
    - Automatic device integrity check on bad block detection
- Updated to Linux kernel 6.1

#### Network & Synchronization
- Network migrations are now 25% faster
- Increased site synchronization speed for low latency networks
- Enhanced VMware integration performance

### Functionality Enhancements

#### GPU & Hardware Support
- Added support for NVIDIA drivers 13.9, 15.4, 16.3
- Enhanced GPU management:
    - vGPU/GPU machine drives now filter based on parent machines cluster
    - Various improvements to GPU setup
- Added support for wear level detection on older Intel SSDs

#### Virtual Machine Management
- Enhanced VM snapshots:
    - Snapshots marked as quiesced when specified and machine is offline
- Drive tier changes restricted while VM is running (temporary limitation)
- Improved UEFI support:
    - Newer UEFI VMs now use 4M layout (addresses Windows 10 issues)
    - Fixed readonly flag for OVMF legacy VMs

#### System Administration
- Enhanced tenant management:
    - Storage usage now updated every minute (previously 5 seconds)
    - Non-compute cluster selection restricted for VMs/tenants
    - Fixed MSS clamping
- Added diagnostic node query for network bonding
- Added confirmation for hotplug/unplug commands in NAS
- Added override for long physical drive timeouts

### Bug Fixes

#### Virtual Machine & Network
- Fixed issues with:
    - Audio devices for spice
    - Core NIC renaming in VLANs
    - Long NIC device names
    - VMs having hosts with invalid port group data (switchid/vlan)
    - Remote recipe downloads automatically setting to first cluster
    - GPUs set to NVIDIA vGPU without populated profiles

#### System & Configuration
- Fixed hostname validation for NAS
- Improved BGP functionality
- Various minor performance and stability improvements


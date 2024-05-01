---
title: Release Notes
description: 
published: true
date: 2024-04-19T22:25:57.221Z
tags: release notes
editor: markdown
dateCreated: 2022-08-19T20:39:26.714Z
---

# 4.12.4 - April 2024

## Features / Fixes
* Fixed an issue synchronizing a group with a DUO auth source
* A warning is now displayed if a VM won't boot properly with virtio-scsi drives and UEFI
* Fixed an issue attaching a GPU device to a tenants VM if it also has a TPM device
* Fixed several issues with dark mode
* Fixed an issue attaching a VMware Service to a layer 2 network
* Tenant node GPU devices now show as offline when they are disabled
* Each machine now has a UUID that is generated once and never changes (read-only)
* Enhanced how tenant nodes are assigned GPU devices
* Added support for additional GPUs on Intel based systems
* Users are now asked for MAC preservation and preferred tier when importing shared objects
* Fixed the two factor authentication validation message link
* Fixed an issue detatching volume antivirus profiles
* Fixed an issue running an arp-scan in diagnostics
* Added a filter for logs in diagnostics
* Updating no longer allows individual packages to be clicked on, downloaded, and installed
* Sites dashboard now reflects site status
* The IP address field is now hidden on vnets dashboard if router type is to none
* Fixed an issue where graphs still show data after a VM is powered off
* Fix an issue where some user could not see sites

## OS
* Sped up flashing the boot partitions
* The node hardware clock is now forced to sync with UTC
* EFI boot registration now sets the boot-next option
* Added the qemu-guest-agent package
* Fixed a 404 error that can occur when an API token expires
* Various vSAN fixes and enhancements

## Install
* Core and DMZ network MTU is now determined by the install
* Changed the swap configuration screen to better reflect how much swap the system will have during the install
* Removed the VLAN option when configuring a non-core physical network
* Changed wording and error output when failing to find a valid cluster
* Install now has additional unattended options
* Changed minimum MTU warning on the core networks to 9000
* IP conflicts are now detected at install time to prevent issues with existing systems
* EFI boot options can now be registered at install time
* NVMe drives now format 10 seconds faster
* Boot-only drives now partition at 4G instead of the default 1G

# 4.12.3 - April 2024

## Features / Fixes
* Fixed and issue auto-detecting the best cluster CPU on slower systems
* Fixed several issues with SMTP and settings
* Fixed an issue recovering a VM from a cloud snapshot that was attached to a recipe that no longer exists
* Fixed styling issues related to dark mode

## OS / Install
* Added additional advanced VSAN settings for tweaking high-latency environments
* Fixed an issue where the current boot option could be unusable if you hard-power off a node while the boot partitions are being updated


# 4.12.2 - April 2024

## Features / Fixes
* Added support for NVIDIA 16.5 driver
* When you disable a site, it's status is now set to idle
* Two Factor Authentication and Require Password Change have been completely overhauled
* Fixed an issue where IPMI addresses weren't being loaded into the UI
* You can now issue a clear reference counts from VSAN diagnostics
* VSAN rates on the main dashboard now show decimals
* IPMI services are now restarted if the device is marked as "busy"
* Fixed an issue where L2 networks would allow you to run a diagnostic query, but they would never expire
* You can now register a root CA with the system using the API
* Creating a tenant from a recipe now randomizes it's mac address offset
* You can now use \${\$random} and \${\$random:start:end} as a recipe variable
* Increased supported nodes per-cluster to 255
* Fixed a couple minor issues initializing BGP in a network
* Fixed issue downloading remote recipe devices
* You can now multiselect VSAN drives for closing/initializing/formatting
* Fixed CPU vendor for host mode Intel cpu
* Added fiber channel scan to refresh drives
* Changed cluster power off to cluster shutdown
* Reworked cluster CPU auto-detection
* Fixed OVA imports from a NAS volume
* Fixed an issue where you could not delete a BGP interface if it's associated firewall rules still existed
* Fixed issue where Apply Proxy would refresh all firewall rules for that network instead of just the proxy settings
* Fixed an issue where the auto-machine-power-on logic wasn't acknowledging the enabled flag
* Several UI/theme fixes
* Added an option to remove the confirmation for ctrl-alt-delete on the VM console page
* Fixed SMTP refresh settings on startup
* Several changes/fixes to the FQDN Proxy feature for tenants
* Over 50 additional minor fixes and enhancements
* Added the ability to skip the file size when using Upload from URL (for 1-time URLs that get burned after their first use)
* Fixed an issue where the license request file was incorrect
* Added VSAN online since and up since times to node drives
* Fixed total read / write on the node drive dashboard
* Fixed spice console password
* Fixed an issue building the clone ISO

## OS / Install
* Started lxc.service before the appserver in case there are unloaded cgroups/dependencies
* Fixed an issue installing older NVIDIA GRID drivers due to compatibility
* Fixed network-install DNS/MTU popup
* Fixed several issues with ipmievd
* Install version now shows in the header
* LLPD now runs in the installer
* Fixed an issue syncing time during the quick install
* Fixed issue rebooting from the CLI login menu
* Updated base QEMU to 8.1.5
* Fixed an issue with the install where if you didn't select every drive in the list, the tier settings would be off
* Kernel 6.1.81 and 5.10.212
* Added additional FC drivers
* Fixed an issue restarting the installer when using a core physical network that has a tagged vlan
* Fixed a scale-out issue where the VSAN could stay in a warning status
* Fixed an issue auto-negotiating the VSAN encryption key during boot


# 4.12.1 - March 2024

## Fixes
* Fixed an issue in the NAS where volume export was not available for NFS
## Security Fixes
* Added support for NVIDIA drivers 13.10 and 16.4. See [https://www.nvidia.com/en-us/security/](https://www.nvidia.com/en-us/security/).

# 4.12.0 - February 2024

## Features
* Added nested virtualization advanced option to all cpu types per vm
* Added support for systems disconnected from the internet, and offline licensing support
* Added Tenant Isolation
* Live migration of named cpus with nested virtualization (not host cpu) now supported for Intel processors and some AMD processors.
* Added support for newer AMD and Intel processors
* New dark mode for the UI
* You can now specify numtxqueues and numrxqueues for VM NICs via the advanced settings
* You can now attach a vm nic directly to a VPN network
* New VM screen now shows and allows updates to recipes
* You can now set the MTU of a wireguard interface
* VM history now includes ram usage
* Added link when creating/editing a vm to recommend a cpu type based on the cluster

## Performance
* Increased performance for vm storage during per node contention
* Increased site synchronization speed for low latency networks
* Network migrations are now about 25% faster
* Added dedicated meta cache to vsan
* Increased disk delete performance and reduced impact for larger drives
* Updated linux kernel to 6.1
* Increased performance for VMWare integration

## Functionality
* vGPU/GPU machine drives now filter based on parent machines cluster
* Tenant storage usage is now updated every minute instead of 5 seconds
* Added support for NVIDIA drivers 13.9, 15.4, 16.3 drivers
* VM snapshots will now be marked as quiesced if specified and the machine is offline
* Drive tiers can no longer be changed while vm is running (this will change in the future)
* Add diagnostic node query for network bonding
* Improved drive hotplug performance
* You can no longer select a non-compute cluster for vms/tenants
* Added confirmation before completing a hotplug/unplug command in the NAS
* Various improvements to gpu setup
* Product help now links to public wiki
* You can now hide the clipboard text on the VM console page
* Storage will now automatically kick off a device integ check if a bad block is detected
* Many additional improvements

## Fixes
* Fixed audio devices for spice
* Fixed an issue renaming core NICs that are in a VLAN
* Added support to some older intel SSD for wear level detection
* Fixed issue if there are gpus set to nvidia vgpu but have no profiles populated
* Fixed issue with long nic device names
* Fix for an issue for VMs having hosts with invalid port group data (switchid/vlan)
* Fixed hostname validation for the NAS
* Fixed an issue where downloading a remote recipe would automatically set the cluster to the first cluster in the system
* Fixed MSS clamping for tenants
* Fixed readonly flag for OVMF legacy VMs
* Improvements to BGP
* Newer UEFI VMs will now use the 4M layout instead of the smaller version (this addresses some issues with Windows 10)
* Added override to long physical drive timeouts
* Wide range of minor issues resolved


# 4.11.4.3 - January 2024 (Hotfix Release) :fire:
> Migrations and reboots are not needed when updating from version 4.11.4, 4.11.4.1 and 4.11.4.2
{.is-info}

## Features / Fixes
* Fixed an issue where deleting a NAS volume would log improperly
* You can now attach VM NICs to VPN networks
* Fixed an issue with MSS clamping for the Core network in tenants
* Changed default VXLAN max address setting from 5000 to 0 to address an issue with tenant networks and virtual wires
* You can no longer change the preferred tier on an online machine drive (will be able to in a future release)
* Fixed an issue identifying GPU/vGPU devices in tenants
* Fixed an issue restoring a VMWare VM that used e1000e nics with port backing
* When a volume snapshot is deleted, the reference to the snapshot will be removed from sync progresses

# 4.11.4.1 - Atria - October 2023 (Hotfix Release) :fire:

* Fixed a regression issue passing through a GPU that has an audio device
* Fix an issue for when a PCI device mode is set to none on a GPU device
* Fixed a regression issue where tenant nodes weren't being notified that a new GPU/vGPU is available

# 4.11.4 - September 2023

## Features / Fixes
* Clipboard text on the VM console page can now be hidden
* Fixed an issue where an online GPU/vGPU device could be deleted
* Deleted remote recipes will now be cleaned up as long as there are no instaces attached to it
* Added a login credential hint to CIFS shares
* You can now specify a Vendor and device model for GPU Passthrough devices
* NVIDIA vGPU devices can now specify profiles with differing levels of granularity
* Logout redirects can now be disabled for "Azure AD" and "Well-known-URL" authorization sources
* "Idle" GPU(s) attached to tenant nodes can now be deleted
* Various fixes for the machine device GPU/vGPU count property
* Fixed an issue where wireguard firewall rules weren't being automatically generated when a peer was created
* Added support for NVIDIA GRID 16.1 drivers
* Multiple GPU/vGPU devices can now be created in a single form
* Fixed an issue where the VFIO driver would always show that it is waiting for a reboot to be installed
* Added ZIP files to the file upload form
* Fixed TPM device creation/edit in tenants
* Added IOMMU group to PCI devices
* Passing through a GPU will now also pass in all other devices in the IOMMU group (usually audio devices)
* Fixed the interface filter for new wireguard peers
* Fixed an issue where clicking the tenant recipe section on the catalog dashboard would redirect to the wrong page
* Added safe-guards to prevent users from downgrading their system accidentally
* Creating tenant/vm recipes without any local catalogs will now prompt for catalog creation first
* Fixed an issue where tenant cluster settings weren't updating if the tenant had more than one cluster
* Devices are now marked offline when tenant nodes or virtual machines are marked "Unresponsive" or killed
* Added optional caching for VM recipe drives that are created with a URL
* Fixed an issue where the YB_RECIPE and YB_RECIPE_VERSION variables were not available to use in database automation questions
* Added additional validation when cloning files
* Tenant recipes can now specify the cluster per-tenant node with a question named "YB_NODE_X_CLUSTER" and "YB_NODE_X_CLUSTER_FAILOVER" where the "X" is the node index (e.g. YB_NODE_1_CLUSTER would be the first node)
* Removed the "display" database field from the VMs table as it was deprecated in a previous release
* Fixed an issue where a custom branding logo would not automatically get loaded in running tenants
* Fixed an issue where VDI users could not change their passwords by default
* Updated wording on the "change password" form to include the plus (+) symbol as an invalid character
* Node1 will be rebooted last when upgrading from 4.11.3.x

## OS / Install
* Fixed several odd scenarios when installing/uninstalling node drivers
* GPU drivers are now attached to every PCI device in an IOMMU group
* Addressed several issues regarding controller fail-back procedures

# 4.11.3.2 - Atria - August 8 2023 (Hotfix Release) :fire:
> Migrations and reboots are not needed when updating from version 4.11.3
{.is-info}

## Fixes
* Fixed an issue where tenant nodes were unaware that a new GPU/vGPU was available for use
* Fixed an issue where a multi-cluster tenant would have an incorrect default CPU type set on any cluster other than the primary

# 4.11.3 - Atria - August 4 2023

## Features / Fixes
* Added support for NVIDIA GRID drivers 15.2, 15.3, and 16.0
* Fixed an issue where uninstalling a GPU driver wouldn't properly clean up after itself
* Fixed an issue where GPU drivers could get stuck showing "Waiting for install"
* Increased the speed of driver installation significantly
* Fixed an issue creating the NTP servers setting if it was missing from a system
* Fixed an issue where network connectivity could be lost through a virtual wire if a VM that was plugged into the L2 network moved off of node1
* Network migrations are now queued during maintenance mode
* Increased the speed of network migrations by 25%
* VM snapshots are now filtered from the list by default when viewing VMs inside of a cloud snapshot,
* Fixed an issue where creating a cloud snapshot with a name that already exists would cause the original snapshot to be cleaned up
* Added the ability to edit machine devices that are offline while a VM is running
* Fixed an issue where overwriting a large media image could cause the UI to hang
* Tenant recipes can now pass the DNS server to newly created internal networks
* Fixed an issue where database find variables were unusable when using the standard variable rendering engine for cloud-init files
* Fixed an issue where some tiers that were encrypted would show as unencrypted in the UI
* Fixed sorting on vnet rules (aliases, networks, etc)
* Implemented a retry when sending a system diagnostic to Verge.io support
* Fixed an issue where physical NIC speeds could be -1
* Various minor bug fixes

## OS / Install
* Updated AMD microcode to address [zenbleed](https://www.tomshardware.com/news/zenbleed-bug-allows-data-theft-from-amds-zen-2-processors-patches-released) vulnerability
* Added the NIC(s) MAC address when running a chassis replacement
* Freshly partitioned disks now use grub for EFI
* NVMe drives no longer attempt to flash a legacy MBR
* When an NVME drive is formatted, we now detect the optimal data size for the namespace and reformat it if necessary
* Boot UUID can now be passed as a kernel argument
* Fixed issue where the unattended install would still ask bonding related questions
* Site ID and System ID are now the same at install time
* Added missing DNS option to the Network Install config
* Improved vSAN performance when the system is under heavy contention
* Added vSAN journal walk optimizations to speed up walk times for large systems



# 4.11.2 - Atria - March 28 2023

## Features / Fixes
* Added the ability to change a VM drives optimized IO settings
* Added advanced options for VM drives
* Fixed an issue where NAS volume statuses could be incorrect if recovering a NAS from a cloud snapshot
* Optimized VM hibernation speeds
* Top compute clusters now go to the clusters list view when clicked
* Fixed wording inconsistencies in the VMware-related features
* Fixed some issues with pasting text into the VM console
* Clone ISO: Fixed issue canceling the build
* VMWare backup: fixed importing a VM with EFI that uses SCSI controllers
* Fixed an issue broadcasting a network interface changes to more than a single node
* Modifying the NTP servers now broadcasts an update to all nodes in the system
* The NAS now reports a friendlier error when it's unable to update its antivirus definitions
* Backup/DR bug fixes for left navigation, log pane, and add audit logs for Clone ISO
* Fixed a timing issue where modifying a network rule may result in one of the IP addresses being shown as Unknown
* Sites, auto-configure sync-back on bi-directional sync creation, fixed sending passwords with non-friendly characters over basic authentication
* Fixed a potential timeout when quiescing a snapshot


## OS / Install / Clone ISO

* Latest security fixes and optimizations
* Fixed an issue setting the frequency that the database flushes to disk
* Minor wording changes to the install ISO to make things more clear
* Fixed an API issue when filtering on multiple index fields
* Fixed an issue with creating the home directory for local physical-access users that are using an SSH key
* Added audit logs when logging in to the system with SSH keys
* Updated Kernel to 5.10.174
* Fixed an issue selecting the OS type in the Clone ISO utility


# 4.11.1.2 - Atria - March 9 2023 (Hotfix Release) :fire:
> Migrations and reboots are not needed when updating from version 4.11.1 or 4.11.1.X
{.is-info}

## Features / Fixes
* Fixed an issue with canceling a build of the Clone ISO
* Fixed an issue where tenants were unable to use some of the Marketplace VMs
* Fixed a styling issue with breadcrumbs when using a custom theme
* Fixed an issue with creating a new auto-generated wireguard peer while leaving the "Allowed IPs" field blank
* Fixed an issue with applying firewall rules when you only have a single custom destination IP in a translate rule
* Fixed an issue where a volume or machine snapshot may not be taken if you are using more than one snapshot profile

# 4.11.1.1 - Atria - March 1 2023 (Hotfix Release) :fire:
> Migrations and reboots are not needed when updating from version 4.11.1
{.is-info}

## Features / Fixes
* Fixed an issue where pasting into a VM could cause duplicate keys to be skipped
* Fixed an issue while importing a VMware backup into VergeOS
* Fixed an issue creating a VM export volume from the Backup/DR section
* Replaced forgot user/pass confirmation with a notification box on the login form
* Set the needs-restart flag when devices are added to a running VM
* Changed "retention" to "remote expiration date" for the outgoing sync queue
* The outgoing sync queue is now sorted based on priority and then sorted by the remote expiration date
* Powering off a tenant node is no longer immediately treated as an error. There is now a 90 second delay to delete the tenant node before it is considered as an error condition.
* The session is now shared for each recipe download when recipes are downloaded from the marketplace
* Fixed an issue where giving a GPU to a tenant node might cause a delay before the tenant realizes it has the new resource

# 4.11.1 - Atria - February 22 2023
## Features / Fixes
* Increased the performance when pasting into a VM
* Added support for customizable VM paste keyboard layouts (useful for non-en-us keyboards)
* Fixed an issue where the Upload From URL form had a scroll bar
* Fixed a scenario where syncing from a pre-Atria release could result in the snapshots not showing up in the destination even though the data was sent
* Fixed an issue where migrating or restarting a network that had NAT rules could cause active TCP connections to drop
* Increased network migration performance when a node is put into maintenance mode
* Volume syncs are now aborted if the source snapshot cannot be created
* Scheduled tasks now filter out snapshots
* Fixed an issue where a new VMware backup service could not start
* Updated the home icon for site maps
* Fixed an issue where some VMware logs were not being cleaned up
* Added an advanced setting to control how often the appserver database flushes (for Edge deployments with consumer grade SSDs)
* Added additional logging when there is a problem connecting to the update server, remote repository, or license server
* If there is a problem connecting to the license server, a retry happens every 5 minutes instead of every 30 minutes
* Fixed an issue where a VM or Volume snapshot may not be taken if it's expiration is set to Never
* Changed the colors of the attention popups
* Fixed minor issues with the system diagnostics list page
* All nodes are now notified if the timezone setting is changed
* The timezone setting has been moved outside of "Advanced Settings"
* System generated passwords now adhere to the password policy of the system (sites/syncs)
* Added a fix for invalid network configs in regards to port groups for the VMware backup service
* Fixed a rare scenario issue where the update process could potentially reboot a node if the vSAN wasn't fully redundant
* UI breadcrumbs are now consolidated into a menu
* Added a user setting to control how many breadcrumbs are allowed to be shown
## OS / Install
* Increased search speed for missing NICs
* Suppressed output from update-boot during install
* Fixed an issue where logging in with a ssh key could result in the users home directory not existing
* Upgraded the kernel base to 5.10.167

# 4.11.0 - Atria - February 2023
## What's New

### Site Manager
VergeOS Atria includes Site Manager’s integrated global monitoring and management capability. Customers can now monitor and operate all their sites from anywhere.  Site Manager enables one or more locations to monitoring and adminster multiple VergeOS systems, regarless of location. You can view top-level statistics from all the systems on a single dashboard, with drill-down links to access and view more detailed information.

![sites-dashboard.png](/public/sites-dashboard.png =90%x)

### Marketplace
VergeOS Atria takes the next step in simplifying IT with its Recipe Marketplace, which powers faster startup and more rapid response to ongoing provisioning requests. This release includes over a dozen recipes, with more to come. Enterprises and service providers can create their own recipes and marketplace to offer to their organizations or customers for true self-service IT. We have also included improvements to help you develop your own marketplace, including simulating the creation of a recipe, and rendering cloud-init templates server-side to create recipe functionality dynamically.

![market-os.png](/public/market-os.png =70%x)

### OIDC Applications
IT admins can now centralize logins for all their separate environments. Managed Service Providers can streamline support processes by having a central login linked back to their environment in all their tenants. You no longer need to create an authentication application or token in your upstream authentication provider (Google, Azure, etc..) for all physical environments or tenants. Simply create one token/application and point it to your primary environment.

![auth-oidc-applications.png](/public/auth-oidc-applications.png =70%x)
![auth-tenant-oidc.png](/public/auth-tenant-oidc.png =70%x)

### Virtual Machine Export
VergeOS Atria introduces the feature of Virtual Machine Exporting, for those with requirements to have a 3rd party backup solution. The release introduces a new filesystem type named "Verge.io VM Export" to VergeOS' integrated NAS service. Backing up is as simple as creating the volume and exposing a share to your backup service.
![export-dash.png](/public/export-dash.png =50%x) ![export-volume.png](/public/export-volume.png =49%x)

# Changelog - Atria

## Features
* The New VM form now defaults to a marketplace recipe that simplifies the steps of going from nothing to booting
* You can now export VMs to a NAS volume which allows for 3rd party vendors to backup/import the machines
* Added support for offline licenses
* You can now install VergeOS updates using an install ISO that has been uploaded to Media Images (Offline Update)
* Added a retry when uploading system diagnostics
* You can now set advanced parameters on vgpu devices on a vm
* Recipes can now specify which versions they are compatible with
* Network rule aliases can now point to DNS records or database references (IP addresses, networks, etc) and can be shared with tenants by setting their "Scope" property
* Added the ability to enable/disable proxy_arp on a network via the API
* Added a new system setting for VXLAN maximum forward database entries
* When a remote repository fails to refresh, it now keeps retrying every 15 minutes
* Attention popups now include helpful links such as "Apply Firewall Rules"
* Added read-ahead to NAS volumes
* Added a new status to the NAS diagnostics when restarting ClamAV / Samba
* Added guest info to the VM console page
* List view filters now sort properly
* Added better handling for refreshing vnet rules that use DNS entries
* VM/Tenant recipes can now have an icon
* Database recipe questions can now trigger a failable error if a condition is not met (instead of just logging an error and creating the VM/Tenant)
* Recipe questions using the type "List" will now also have an additional property (NAME:$display) that shows the friendly version of the value
* Added the ability to override DNS servers for External networks that have a dynamic (DHCP) IP
* Added events for NAS volume shares (online/offline/error)
* Add tasks/events for resetting a NAS volume
* Changed log about failing to start ipmievd to a warning
* You can now clone a firewall rule to another network
* Dropdowns are now properly sorted
* Networks that are configured to be DHCP clients now request the same IP from the DHCP server after being restarted
* Added AMD GPUs to the pass-through supported list
* Added the transaction start time to the cluster tier status
* Add the ability for UI users to be able to log in via SSH or the console
* TPM 1.2/2.0 Support added to virtual machines
* Added the ability to force all users to reset their password after changing the password complexity requirements
* You can now have an outgoing sync take a new cloud snapshot and immediately send it
* Issuing a restore from a cloud snapshot can now be aborted/canceled
* Added Network diagnostic command for 'nmap'
* Authorization sources can now be put into a menu on the login screen
* Added performance/energy profiles to clusters

## Fixes
* Fixed an issue showing Advanced Settings in the Edit VM form
* Fixed a display issue where the DMZ IP Address column was offset by 1 in the Networks list page
* Fixed an issue where a new tenant's core DNS would be incorrect if the parent-tenant had multiple DNS servers in its core network
* Fixed issue where spinning disks weren't calculating their wear level properly
* Fixed an issue where some GPUs were not appearing in the list of usable PCI devices
* Fixed an issue where it was possible to run workloads on a cluster that didn't have compute resources
* Fix decimal length when showing bytes in a human-readable format when less than 1KB
* Fixed an issue where changing a snapshot profile period from hourly, to yearly, and then back to hourly, would render the period useless
* Fixed percentage issue when uploading a system diagnostics archive
* Fixed an issue where recovering a VM from a cloud snapshot was not preserving the drive/NIC asset property
* Fixed an issue where filtering lists with single quotes in it would always return empty results
* Improved/tweaked the VM console paste feature

## Recipe Engine
* Remote repositories now only track recipes that are in a "local" repository on the remote system
* You can now simulate a VM recipe to see what variables and cloud_init files will be generated
* Added a new recipe question type "Database Field" which copies the settings from the database schema for the selected field
* The default value is now shown for recipe questions of the type Network, Cluster, Cluster, and Virtual IP
* Fixed an issue where the onchange wasn't firing for recipe questions if the field used an API query to generate its contents
* You can now grow a VM disk after it's done importing by passing the parameter 'minsize'
* You can now import a drive via a URL with the API
* You can now clone recipe questions and sections
* Recipe sections/questions are now shown for remote recipes that have been downloaded
* Cloudinit file names are now scrubbed when they are created
* Cloudinit files now use the field "render" instead of "contains_variables" but the latter still exists for backward compatibility
* VM recipes that do not have any disks attached to them will be automatically downloaded from remote repositories
* Cloudinit files can now be rendered server-side using Jinja2. This allows you to create optional functionality in recipe questions (i.e. A checkbox that optionally installs software)
* Added an option to hide the null/none option from row-selection recipe questions
* When creating a "Network" question for a recipe, a new option is now available that allows the creation of a new internal network
* You can now add a recipe question "YB_DETACH_RECIPE" and set it to true. This will detach the new VM from the recipe upon creation. **This is only useful if you are not using cloud-init as all answers will be lost before the VM starts up**.
* You can now view a VM snapshots cloud-init files in read-only mode
* Non-downloaded remote recipes will now show up in the New VM wizard
* Added a link to cloud-init files on a VM recipes dashboard
* When using a Row Selection recipe question, all fields that are in the list will now be added to the recipe **(ex: if the fields are $ key, name for a question named QUESTION you will see the variables QUESTION, QUESTION:$key, QUESTION:name)**
* Added validation to Row Selection question types
* The VM recipe list now shows the size of the recipe

## OS
* Revamped user management so UI users can log into the CLI via SSH or console
* Enabled additional kernel security features
* Updated kernel to 5.10.165
* Fixed an issue with DNS overrides when using DHCP
* Added the ability to have DHCP-client networks override the DNS server provided by the DHCP server
* Added a new helper script "attach-container" which attaches to a container by its name
* Updated Linux firmware base to 20221109
* Added initial support for wireless cards
* Fixed issue detecting partition types when updating boot partitions
* Fixed issue with yb-api where --upload-name was considered an invalid parameter
* Fixed issue booting the clone iso with EFI when it's booting on a system that has VergeOS installed
* When restoring from a cloud snapshot, tenant snapshots are now pulled in from the previously live version of the system
* Added support for setting energy/performance policies
* Changed where systemd-journald logs are stored
* Automatically fix virtual disk usage if it would have gone negative due to an old issue
* Filesystem checks are now run every time a boot device is mounted for update-boot
* Changed clone-iso default threads to 4
* Tenant nodes now wait for their config to be registered before attempting to start up
* Encryption partition lookup now checks for the label in all caps
* Fixed issue passing --keyfile into create-vsan-encryption-key-disk

## Install
* Added changes to allow for a fully unattended install
* Added VLAN awareness to the auto-detect-network feature
* VLANs are now an option on physical networks
* Core/DMZ VLANs are now only asked for in the advanced install
* Added additional PXE boot options for running the installer (including providing an install-seed file via a webserver)
* Reworded an error in the installer when you don't select a core NIC
* When adding the first node to a new cluster, you can now pick the node that you are most "like"
* Changed the default hostname for external networks to VergeIO
* Added the ability to set energy policy at install time

# 4.10.3.1 - January 2023
## Fixes
* Fixed a regression issue where VMware backup jobs were showing incorrect statistics

# 4.10.3 - December 2022
## Features
* Added an advanced option to allow cpu pinning on guests
* Recipe drive downloads now show a progress when downloading from a 3rd party webserver
* Max RAM setting is now 1TB for machines
* Added "DMZ IP" to potential fields on vnets list
* Added a friendly unique constraint error to machine nics
* NAS volume syncs now sync and flush the write cache to ensure a clean state for the source volume thats being branched
* Tenants are now more portable when moving between environments that have different network settings
* The live migration speed for virtual machines is now a configurable option
* Cluster tiers now show an encrypted flag
* The compute ability can now be disabled on existing clusters
* Added an advanced option to configure the queue length for NICs
* Notes and power cycle timeout settings now get copied when cloning a VM
* Added GPU passthrough support for some cards that have a display port
* Added the "peer IP" to the wireguard dashboard
* Added an alias shortcut on the vnets overall dashboard
* An accept firewall rule is now automatically created when creating a new external network with the DHCP server option checked
* Delimited list components (firewall rule aliases, dns servers, etc) can now be modified in an advanced mode instead of the wizard
* Changed default network hostname to "router"
* Added a helper to Network Rules that will resolve to the client's IP address that sent the API request
* Addded SMART stat monitoring for additional drives
* The CD-ROM eject menu is now alphabetically sorted on the VM console page
* Tenant cloud snapshots can now expire even if the tenant is powered off
* Secure boot setting is now hidden if UEFI is not enabled for a VM
* Added additional options to vSAN diagnostics
* Tenant nodes now wait for their IP to be registered before being allowed to start up
* Tenant snapshots are now pulled in from the previous live version of the system when restoring from a cloud snapshot

## Fixes
* Fixed an issue setting a checkbox value with a recipe question
* Fixed an issue where refreshing a catalog would show a question mark for the icon
* Fixed an issue updating SMTP Queue when an email is deferred
* Fixed an issue where a VM created from a recipe would be marked as needing a reboot after it's network changed
* Removed autocomplete from the update settings form
* Fixed a vendor issue when emulating Intel CPUs on an AMD processor
* Fixed a timing issue where you could get an error taking a snapshot of a NAS at the same time a volume snapshot was expiring
* Changed "Download" to "Download/Update" on the VM recipes list page
* Fixed the link to certificate cipher help
* Changed the "Edit Bond Setting" to "Edit Bond Settings" on the vnet dashboard
* Fixed a timing issue where an error could be logged if a tenant has the same cloud snapshot names as their parent
* Fixed an issue where physical bridged networks don't show in the list of options for virtual wires
* Fixed an issue setting the core DNS on a new tenant where the parent has multiple dns servers
* Fixed an issue where a VM that was in the "init migrate" status could not be powered off
* Fixed the seconds display on scheduled tasks that end at the end of a day
* Fixed an issue with GPU passthrough in a tenant
* Fixed a typo in a vnets DNS configuration section
* Fixed an issue where NIC speeds could be set to a negative value
* Fixed an issue where you could add a serial port even though the console type is serial on a VM
* Fixed an issue where modifying a snapshot that is set to never expire may change the expiration
* Fixed an issue where cloning a tenant would not carry over the "Allow Branding" property
* Fixed an issue where a VM power cycles with the "Host CPU" type and nested virtualization is disabled

## OS
* Added significant performance improvements in the vSAN (turbocharger):rocket::moon:
* Updated to Kernel 5.10.158
* Lowered RAM requirments for smaller systems
* Added the ability to reboot a node from the console login menu
* Flashing the boot partitions is up to 10x faster
* Updated the Verge.io logo on the console login screen
* Improved performance for large physical drives

## Install
* Changed the install iso name to "verge-io-install.iso"
* Added more changes to enable a fully unattended install
* Added additional PXE boot options for running the installer (including providing an install-seed file via a webserver)
* You can now pick the node that you are most "like" when adding the first node to a new cluster
* VLANs are now an option on physical networks
* Core/DMZ VLANs are now only asked for in the advanced install
* More menus can now be bypassed with an install-seed file
* Added VLAN awareness to the "Auto Detect Network" feature

## Verge Clone Utility (MOVE) :cow2:
* Changed the clone-iso default threads to 4
* Fixed an issue where the clone ISO would show an error -71 while uploading a disk
* Fixed an issue booting the clone iso with EFI and when its booting on a system that has VergeOS installed

# 4.10.2.1 - September 2022 (Hotfix Release) :fire:
> Migrations and reboots are not needed when updating from version 4.10.2
{.is-info}
## Features
* Added <kbd>shift</kbd> + <kbd>click</kbd> support to selectable lists (e.g. VM list page)
* You can now create a network by specifying the IP as 192.168.1.1/24 and by leaving the "network" field blank
* "Most recent" is now the default for IPMI log diagnostics
* You can now set a blank DH Group for an IPSec Phase 2 cipher
* Subscriptions will now have a link to the system if there is a valid SSL certificate
* The secure boot setting is now duplicated when you clone a VM
* Recipe questions that interact with the database are now executed in order instead of where they exist in a section
* Removed restriction preventing use of more than a single pass-through GPU on a VM

## Fixes
* Fixed several issues where GPU device statuses could be marked as offline even though the VM is running with a GPU attached
* Fixed a bug where the VM dashboard would stop auto-refreshing if the VM went unresponsive
* Fixed issue refreshing cloud snapshots after an incoming sync has been deleted
* Fixed issue where an NVIDIA A16 GPU could have issues when starting more than a single VM
* Fixed issue where changing a node GPU from vGPU to pass-through would leave the profile and max-instances
* Fixed issue where an error could be logged if a tenant had the same snapshot profile period as it's parent
* Fixed issue cloning a VM recipe from a remote repository
* Fixed issue where recovering a tenant from a cloud snapshot could have the tenant stuck in a "provisioning" status
* Fixed issue on mobile regarding left menu expansion on a list page
* System diagnostics now account for offline nodes
* Fixed an issue where VNET DNS zone records would duplicate the "Needs Apply" notification during a refresh
# 4.10.2 - July 14 2022

## Fixes
* Optimized priority of Core network traffic vs internal networks

## OS
* Fixed a memory usage regression when a system is using disk-level encryption
* Network paths that are dropping packets are now degraded for 30 seconds instead of being completely removed upon detection

# 4.10.1 - July 2022

## Fixes
* Hide the send to support option for system diagnostics in tenants
* Fixed the node NIC rates on tenants dashboard
* You can no longer modify the RAM of a tenant reserve node
* Added the ability to omit display fields from scheduled subscriptions by prefixing the field with OMIT_
* Added a note to the on_power_loss field type
* Changed IPMI interface from v1.5 to v2.0 with a fallback if the command fails

## OS
* System logs on the vsan are no longer cleaned up when generating a system diagnostic
* Improved vSAN communication thread allocation
* Improved vSAN encryption performance
* Added additional backwards compatibility when upgrading from a release before 4.9.0
* Upgraded kernel to 5.10.129 base
* When connecting to the UI from the servers console you will no longer be asked to accept an invalid certificate in the browser

## Install

* Fixed issue aborting auto-detect network
* Restarting the install now ensures all processes are stopped first
* The admin user name is now run through validation
* Automatic network detection can now run across all NICs instead of only finding one
* If you type in the wrong credentials for adding a node, it will now ask you for them again
* Temporary core IP is now an advanced question
* Fixed timing issue when restarting the fabric for a hostname change
* You can now press CTRL-C to abort the NTP sync
* Only controllers can set drives to tier 0

# :tada: 4.10.0 - June 2022 :tada:
## Features / Enhancements
* NVIDIA Virtual GPU (vGPU) support
* CPU C-States can now be disabled per cluster to enable high performance
* Added a generic notes section to machines (VMs, Tenants, etc)
* VM console keyboard layouts are no longer forced to be "en-US"
* Added a status of "Waiting for resources" regarding when a VM/tenant is restarted but there are no longer enough resources to boot, the machine status will be set to "Waiting for resources" and will be powered on when enough resources are available
* Color scheme and logo have been updated
* Non-migratable VMs can optionally be power-cycled during maintenance
* Added pass-through support for non-3d controller NVIDIA GPUs
* Added inflated used storage to storage tier dashboard and list view
* VMs that are hibernated no longer appear as if they are online
* When cloning a provider/remote VM recipe, you can now have it auto-create a new VM to be used as the gold-image
* Added a new system and per VM setting for the migration power-cycle timeout
* Changed timeout of guest shutdown command for the guest agent to 1 hour to handle slow guest OS updates
* Added timezone info to guest agent display
* The guest clock is now told to update if the guest agent is installed when a VM is resumed from hibernation
* Added additional infomation to the system diagnostics archive
* Added the interface network to the lldp neighbors page
* VM snapshots now show the snapshot description on the dashboard
* Empty node RAM slots will now show as offline
* Path is now optional for the vSAN diagnostics "Get Volume Usage" command
* Added a node action that generates files and updates the boot partitions
* New installs now get rules pre-created for site syncs (default disabled) in the external networks firewall
* SSH rules are now disabled by default on new installs
* If a memory log is found in IPMI SEL, it now gets logged as an error regardless if it can locate the DIMM in node memory
* VM migration/hibernation is now allowed if the CPU type is set to "Host" and the cluster setting for nested virtualization is off
* Added the ability to override some parameters on a VM drive (mainly to override the cache setting). EX syntax: "disk(ASSET).cache=writeback"
* Changed default diagnostics tcpdump timeout to 15 seconds
* Added descriptions to vSAN tiers that match the installer
* Added remote user column to the users list view
* A warning will now be displayed if a user attempts to power off a network that has machines plugged in to it
* You can now auto-detach machines from a snapshot profile when deleting it
* Added a shortcut to turn on/off a drives location light from the drives dashboard
* A machine NIC can now be deleted if its status is set to "unknown"
* Increased the unresponsive machine timeout for tenants based on their hosts timeout setting + 20s
* Added a BGP interface count box to the Network dashboard
* Added copy icons for peers in the Wireguard dashboard
* NAS CIFS settings now split the Active Directory user/password into two fields
* Added dropped percentage for Gateway monitor stats
* Added logging and settings for a nodes temperatures
* Added additional views for Wireguard
* Repair servers can now be configured in the UI for the vSAN
* VMs can now be multi-selected from list view to change their snapshot profiles
* Disk sizes now allow decimals (e.g. 10.5TB)

## Fixes
* Fixed a timing issue where a node could be stuck in maintenance mode during an update
* Fixed several scenarios where sub-tenants could fail to migrate during an update
* Fixed an issue where killing an unresponsive vnet wasn't marking it as offline
* Fixed an issue where a user with only read/modify permissions to a vnet couldn't send it an action
* Removed the error log where no response is received when a guest shutdown occurs
* Fixed an issue where when sending an ACPI shutdown and the guest agent wasn't connected yet, it was ignoring the agent command
* Fixed an issue where the drive asset field wasn't being preserved for recipes
* Fixed an issue generating registration code for incoming syncs
* Fixed an issue where the Guest Agent checkbox didn't show up on the New VM form
* Fixed an issue where powering off a NAS could result in a harmless error log
* Fixed an issue sending API queries in swagger when the table has a key that is a string
* Fixed an IOP stat tracking issue where an incorrect value would be displayed if the IOP count is >= 100K
* Fixed an issue where conflicting recipe names could result in a recipe failing to publish
* Fixed a timing issue where two snapshot refreshes could stack up and cause a false-positive error about not being able to create a snapshot
* Fixed an issue where some vsan commands might not execute in a timely fashion when the system is under heavy load (tier status, drive status, etc)
* Fixed a timeout issue when migrating a NAS from a version older than 4.8
* Fixed a tenant migration issue when coming from a pre-4.7 release
* Fixed an issue migrating a tenant node that has it's "On Power Loss" value set to "Power On"
* Fixed a MTU validation error with BGP interfaces
* Fixed throttles for warnings/errors with node temperatures
* Removed the auto-create option from CIFS and NFS shares

## OS
* Updated to Kernel version 5.10.122
* Added ipv6 to the kernel (disabled by default)
* Added additional details to system diagnostics
* Fixed issue during restore where the controller rolls back the journal
* Enabled Filesystem DAX for pmem
* Install now detects pmem namespaces
* Fixed issue changing the tier of a VM disk while the VM was online
* Changed EDAC to a loadable module so it can be disabled
* Fixed stability issue when discarding a VM drive larger than 10TB
* Improved performance when the storage is under high contention
* Updated BIOS/UEFI splash screens
* Updated smart database to include new drive types
* Fixed a memory leak that occurred when the system was heavily taxed
* Changed VFIO to be a module instead of a built-in package
* Changed default TCP congestion algorithm to H-TCP and added additional algorithms
* Fixed stability issue when node2 becomes the controller multiple times without being restarted
* Added x-frame-options "sameorigin" header to web requests
* Added support for the Intel ICE firmware

# 4.9.2 - February 2022

## Features / Fixes
* Fixed issue where you couldn't download the NAS recipe if you had the storage clusters max RAM below 2G
* Fixed sorting and filtering problems on list view pages
* Fixed issue where node drives could be displayed incorrectly after a replace
* An error is now logged when a vsan drive goes missing
* When a tenants changes the tier of a virtual drive, a log is now bubbled up to the hosting environment
* Fixed issue where deleting a dynamic IP address was not releasing the IP from the DHCP server
* Fixed issue where changing a NAS CIFS setting wasn't sending a refresh
* AD user property is now emptied after a successful join
* Add fail-safe for stopping recurring imports losing track of their monitoring process
* Fixed issue where SMART diagnostics query would only show the results from the first drive in the list

## OS
* Added more information when generating a diagnostics file
* Fixed issue where drives weren't properly formatting during a node+drive replacement
* Added the ability to load the installer over the network (net-install)

## Verge Clone Utility (MOVE) :cow2:
* Fixed issue when no drives are selected
* Fixed drive interface detection bugs and added virtio

# 4.9.1 - January 2022

## Features / Fixes
* Implemented East/West port mirroring
* Default sorting is now case-insensitive for most list pages
* Fixed issue where nodes could show duplicate drives after a disk failure
* Recipe catalogs are now deleted if they have been removed upstream
* Added a new drive status when hot-plugging VM drives
* Site sync queue: allow expiration of snaps marked 'do not expire' if the sync is disabled, or if the retention period has passed
* Fixed several issues with creating NAS users and added audit logging
* UI tweaks and permission changes for VDI users
* Fixed issue where non-vsan drives were showing -1 as the ID on the node dashboard
* Fixed issue where the Update Settings form would auto-complete the password if there was one saved by the browser
* Added a dialog that asks for the encryption key when enabling an encrypted NAS volume
* Increased speed of processing an action on multiple items in a list (ex: powering on multiple VMs at the same time)
* Fixed issue where the NAS might not boot if you had lots of volumes
* Making changes to a NAS recipe instance will now update the network/RAM/cores/cluster on the VM itself
* You can now move VM/Tenant recipes between catalogs in local repositories
* Enhancements/fixes for header menu
* Fixed issue where warning/alert toasts weren't appearing for VMs
* The NAS VM now gets flagged as needing a reboot after some CIFS/NFS settings change (e.g. Min SMB version)
* Diagnostics: IP Connection Tracking will now pull netstat if there is no netfilter running
* Fixed issue where you could create an External network with a static IP blank, or the Network blank
* Fixed issue where you could not modify certain Events/Tasks
* Fixed issue where Allowed IPs was hidden for auto-generated wireguard peers
* Media images: provide user feedback when upload from URL fails
* Fixed issue where the VM dashboard showed that it needed a recipe update, but the button didn't do anything
* Added an audit log when adding additional storage to an existing tier for a tenant
* Fixed regression issue where virtual wires weren't deleting VLANs in the allowed list
* Fixed issue where storage tier stats weren't updating during a full journal walk
* Volume syncs: fixed run-as-user permission issue
* Modifying a cloud-init file now flags recipes as needing to be republished
* When tenants request a cloud snapshot from provider, monitor and refresh the cloud snapshots and issue an auto-refresh
* Double clicking a cloud-init file now acts as if you clicked "Edit"
* Added warnings for migrating/hibernating vms with host cpu type
* NAS dashboard: add clone option to left nav
* Fixed issue pulling a server out of maintenance mode while it was still entering it
* Fixed regression issue where a tenant was failing to delete if it had multiple virtual IPs attached to it
* Fixed issue where creating a tenant from a recipe could take up to 10 minutes
* You can now pass "auto" as an IP to automatically create the next available IP in a network
* Fixed minor issue when restoring a tenant from a cloud snapshot (while it was running at the time the snap was taken)
* Restored tenants (from cloud snapshots) now update their cloud name (as do clones)
* Tenants no longer mark machines as unresponsive after being recovered from a cloud snapshot
* When VMs or tenants go unresponsive, they are checked to make sure there is no disk activity in them before taking them down
* Fixed potential issue where you couldn't undelete tenants if node1 was offline
* Added audit logs to BGP
* Fixed issues when editing/updating recipe instance's virtual IPs or NIC IP addresses
* Recipes can now specify "auto" for a NICs IP address (if the question is enabled)
* Added a 30 minute timeout to searching a cloud snapshot for VMs/Tenants
* Fixed issue editing NICs and not having the properties update the recipe instance answers
* Editing a recipe instance will no longer fail if you have a question that is marked as required AND read-only
* API: When posting to vnet addresses, it will now give you the IP in the response property if it is auto-calculated
* API: Added VM key to the response when posting to vm_recipe_instances
* Added "trim" to the post-processing property in recipe questions
* You can now have an internal network find a new unique network address by specifying "unique:192.168.0.0/16/24" as the ip address.  The specified example will find a new 192.168.x.x/24 network within the 192.168.0.0/16 range
* When creating a new external network with DHCP enabled the DHCP start/stop addresses will be auto-populated if left blank
* Added better recovery handling for when a VM/tenant goes unresponsive due to a network blip (ex: switch reboot)
* Nested tenant snapshots are now purged from cloud snapshots (to help prevent snap-ception)
* Node IPMI logs: add view logs shortcut to node dashboard
* NICs for a vnet now get set to "up" when starte
* Fixed issue where changing a vnets layer2 ID wouldn't broadcast the change system-wide during a restart (causing there to be inconsistencies in between nodes)
* Updated swagger to 4.1.2 and auto-configured auth to use the existing token so that it doesn't require you to type in the username/password again
* NAS: Local volumes are now brought online before remote volumes
* Increased the maximum RAM a node can have to 5TB

## OS /  Install
* Upgraded kernel to 5.10.86
* Upgraded Wireguard-tools to v1.0.20210914
* Disabled LLDP filter for i40e NICs
* Added vim-tiny editor
* Added regex validation to IP/Networks in the install
* Changed Multicast option to Core-Network (yes/no).  The multicast can be selected in the advanced install
* During the quick install, it no longer asks you for a temporary core IP unless you are in advanced mode
* Fixed install issues with PXE and compute-only nodes
* Fixed an issue where the controller node1 wouldn't have a core ip address during an install
* Added backup-database script that exports the v4 and sys databases to a tarball
* Added error reporting if the vsan gives a reason for not starting (ex: wrong encryption key)
* API: Added `++` `--` for case-insensitive sorting

# 4.9.0.1 - October 2021 Hotfix Release :fire:

## Bug fixes
* Fixed a regression issue that caused short term history statistics to not be cleaned up on time

## Release Notes
* If you are already on 4.9.0, this hotfix can be installed without rebooting or requiring maintenance

# 4.9.0 - October 2021 Release

## Features
* Revamped the UI and changed default theme to blue
* Release notes will now be available as a link on the Update dashboard
* You can now create a new network from a Network Block (CIDR) resource
* You can now add multiple IPs/networks to a route rule destination
* Added North/South port-mirroring for virtual NICs
* Persistent Storage (pstore) is now monitored for software/hardware issues
* The help link can now be overridden for tenants
* Show number of snapshots estimated to be created on a profile period (first pass)
* Added Wireguard peer statistics (last handshake, data transferred)
* Virtual machines can now be power-cycled instead of migrated when maintenance is performed (implemented for non-migratable workloads)
* Implemented 1:1 GPU pass-through for supported NVidia cards
* Added a configurable minimum retention count for cloud/remote/machine snapshots
* Added offline uncorrectable and current pending sectors to drive and health monitoring
* Node memory is now tracked as an asset and ECC memory errors are tracked
* Node PCI devices are now tracked as an asset
* Added an advanced options field to VMs that lets you override PCI/QEMU parameters
* Added IPMI system event log statistics to the node dashboard
* Added UI tracking for VRAM (swap) usage on tenant nodes
* Physical nodes will now be flagged as needing to be rebooted after certain cluster changes
* Added the ability to power off a cluster
* Added UI for configuring a Backup/DR remote repair server (live-data recovery in the event of a double failure)
* Allow custom ACME servers for letsencrypt certificates
* You can now pin firewall rules to the top or bottom of the list
* Added email based two-factor authentication for normal user accounts
* You can now recover deleted tenants from cloud snapshots in the UI
* Added a "forgot username" link to the login page
* You can now wipe/erase a VM drive
* SATA VM drives now support discard
* You can now test IPMI connectivity for a node from it's dashboard
* VM Cloning can now be quiesced
* Improved MOVE (Verge.io Clone ISO) transfer rates by up to 10x
* System logs can now be stored to a persistent volume (system-logs) in the NAS

## OS
* Updated application framework (performance tweaks, optimized database I/O)
* Upgraded upstream kernel to 5.10.69
* IPMI credentials can now be configured during the install
* Improved storage performance during heavy contention
* Tier statuses are tracked independently instead of being bundled together
* Added progress to tier verification

## Bug fixes
* Prevent users from lowering tenant node memory to dangerous levels
* Fixed issue waiting for clone ISO to build in a tenant
* Fixed where changing the domain would not trigger letsencrypt to update the certificate
* Fixed issue where the NAS could take up to 6 minutes while shutting down or rebooting
* Fixed issue where IPSEC disconnect did not work
* VM Console, fix pasting invalid unicode chars
* Fixed intermittent VM console disconnects
* Hundreds of miscellaneous performance enhancements and bug fixes

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
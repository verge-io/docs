Here's a draft Release Notes page based on the provided information:

# Release Notes

## 4.12.6 - July 2024

### Features / Fixes

- Added TOTP 2-Factor authentication
- Added support for NVIDIA GRID drivers 17.0 and 17.1
- Fixed an issue browsing a VM Exports volume from the New VM form
- Increased the maximum cloud snapshots count from 1000 to 2048
- Fixed an issue with tenant dashboards where graphs might not show properly
- Increased the max VM core count to 1024 (only works with q35-8.1 or newer)
- Fixed an issue with creating more than 27 wireguard peers in a tenant or smaller system
- Fixed an issue using Let's Encrypt in a tenant that is using the proxy feature for UI/API access
- Added the ability to pass a physical device directly into a network container to support some bare-metal services that filter based on the MAC address
- Fixed a logging issue for when a recipe question could not be imported from a remote repository
- Fixed an issue where a fresh install would show the marketplace in an error state until a valid license was obtained
- Fixed an issue restoring a VM or a tenant from a cloud snapshot where the object did not have a UUID specified
- Public links now default to use the filename
- Added support for device assets so that you can use advanced options properly
- Fixed an issue with changing a VMware Service container network while in a running state
- Fixed an issue detaching a physical interface from a network when the layer2 type changes on the fly
- Fixed a logging issue with backing up VMware VMs
- Fixed an issue generating the bond configuration if you had more than 1 bonded network
- Increased maximum SMART hours to 10 years to accommodate for the warning status on older drives
- Fixed an issue where if a network couldn't migrate it could get stuck in the "Migration Initializing" status
- Fixed an issue where killing the power to an unresponsive tenant node or vnet was setting the power-state to online
- Fixed an issue where obtaining a valid license would fail if the root filesystem was low on space
- Added additional text letting the user know that the resource isn't available in the current cluster when vGPU/GPU cannot be found to start a machine
- The new tenant form now always defaults to "Custom"
- Fixed an issue where cloning a VM wouldn't copy the nested virtualization properties
- VMware backups will no longer abort if VMware has an issue presenting its VMX/nvram files
- You can now detach a VM from a recipe when it first boots with the question "YB_DETACH_RECIPE=firstboot"
- You can now disable cloud init on a VM with a recipe by setting the question "YB_DISABLE_CLOUDINIT". Valid values are 'true', 'false', or 'purge' (which will delete all cloud-init files)
- Fixed an issue where the browser would show a login popup when a session times out
- Fixed a capitalization error on the modify permissions form
- Fixed an issue where nested virtualization was not working in tenants
- EFI disks now get created when the VM first boots vs on creation
- Added an advanced setting for enabling IPv6 on a Layer2 network
- Volume and VM snapshots will now get deleted if the VSAN is in a non-redundant state which accommodates for long running drive replacements
- Volume syncs now block VM Exports from being used as a destination and creating snapshots when used as the source

### OS / Install

- Added the ability to extract meta data for files so that vendors can extract change-block-tracking information from a VM Exports volume
- Auto-network detection is now faster and detects conflicting VLANs
- Fixed an issue where a scale-out node didn't have its full config after its first boot
- Fixed an issue with yb-api and logging in with a token
- SWAP is no longer asked for on nodes after node1
- Syslog will now report which nvidia driver it is skipping during installation
- Added xterm for serial console resizing (this is useful when installing via a serial console and can be run by executing "resize" from the terminal)
- Fixed an issue with selecting the external network during the install
- The maintenance network question is now only asked in the advanced installer
- The installer no longer asks you for the license user/password when resuming if they were left blank
- Optimized how brute-force attacks are handled during login
- Partitioning a boot-only device on a storage-node will now be able to properly boot if the VSAN disks are not bootable
- When installing GPU drivers, any existing driver is now unbound from the PCI device before installing anything (this allows support for PCI-passthrough on some GPUs that have built-in USB controllers)
- Fixed an issue where NTP might not sync if you enable IPv6
- Fixed an issue where a controller node would not attempt to mount the storage if it was booted from a non-vsan drive
- Fixed an issue flashing the boot partitions during initramfs for EFI partitions
- Increased udev timeout to 30 seconds while partitioning disks and made it so it doesn't fail if it does time out (due to a hardware error or a slow storage controller)
- yb-api can now auto-detect the username and token when connected via physical access (for easier API access from the CLI)
- Added filesystem and memory debug information to System Diagnostics
- Fixed sshd issue where /home/root would get created if you logged in as root
- Fixed an issue where if you ssh as the root user with an ssh key, the UI wasn't auditing the login
- Removed deprecation warning with pam and sshd
- Added support for 2FA (email or TOTP) logins from the console/ssh
- Fixed an issue posting to /sys/tokens with yb-api
- Added the ability to fully boot the install from an iPXE config
- Updated SSH to address CVE-2024-6387 (regreSSHion). This fix only applies to systems that have SSH enabled via the External firewall on a public network

## 4.12.5 - May 2024

### Features / Fixes

- Added the Windows key to the virtual keyboard toggle on the VM console page
- Fixed an issue where deleting a virtual IP address was automatically applying firewall rules
- BGP now handles graceful restarts more efficiently
- If you create multiple virtual IPs at once and assign them to a tenant (or delete them), only a single refresh is sent
- Network diagnostic queries will now clean themselves up if they become stale
- Sped up generating the NAS recipe
- Fixed an issue where creating a user with an invalid display name would leave a reference to the user in the database
- Increased the VM console paste limit to 1024 characters
- VMware backups will now make a copy of VMX files
- Fixed a false-positive error that could be logged during a VM migration
- Added an advanced network option to enable 802.1ad (QinQ)
- Optimized the machines dashboard API query
- If a node went unresponsive, you were unable to send diagnostic queries to the node until it was rebooted
- Changing a cluster's Target max ram pct will now update the overall cluster RAM usage
- Changed the maximum password length from 64 to 256
- Fixed an issue where max vxlan fdb entries might not get set to 0

### OS / Install

- Fixed an issue where removing a tier of storage would not complete the process until node1 was rebooted
- Added the ability to delete a vSAN drive while the node was online (CLI only)
- Fixed a rare scenario where repairs could be found on the vSAN under certain conditions with certain CPUs
- Added support for additional NIC vendors and devices
- Added missing NFT counter module for firewall tracking in the 5.10 kernel
- Fixed an issue where PXE booted nodes were using the 5.10 kernel
- Fixed an issue partitioning and discovering disks
- Changed the timeout while partitioning disks to accommodate for systems with slow drive discovery

## 4.12.4 - April 2024

### Features / Fixes

- Fixed an issue synchronizing a group with a DUO auth source
- A warning is now displayed if a VM won't boot properly with virtio-scsi drives and UEFI
- Fixed an issue attaching a GPU device to a tenant's VM if it also has a TPM device
- Fixed several issues with dark mode
- Fixed an issue attaching a VMware Service to a layer 2 network
- Tenant node GPU devices now show as offline when they are disabled
- Each machine now has a UUID that is generated once and never changes (read-only)
- Enhanced how tenant nodes are assigned GPU devices
- Added support for additional GPUs on Intel based systems
- Users are now asked for MAC preservation and preferred tier when importing shared objects
- Fixed the two factor authentication validation message link
- Fixed an issue detaching volume antivirus profiles
- Fixed an issue running an arp-scan in diagnostics
- Added a filter for logs in diagnostics
- Updating no longer allows individual packages to be clicked on, downloaded, and installed
- Sites dashboard now reflects site status
- The IP address field is now hidden on vnets dashboard if router type is set to none
- Fixed an issue where graphs still show data after a VM is powered off
- Fixed an issue where some users could not see sites

### OS

- Sped up flashing the boot partitions
- The node hardware clock is now forced to sync with UTC
- EFI boot registration now sets the boot-next option
- Added the qemu-guest-agent package
- Fixed a 404 error that can occur when an API token expires
- Various vSAN fixes and enhancements

### Install

- Core and DMZ network MTU is now determined by the install
- Changed the swap configuration screen to better reflect how much swap the system will have during the install
- Removed the VLAN option when configuring a non-core physical network
- Changed wording and error output when failing to find a valid cluster
- Install now has additional unattended options
- Changed minimum MTU warning on the core networks to 9000
- IP conflicts are now detected at install time to prevent issues with existing systems
- EFI boot options can now be registered at install time
- NVMe drives now format 10 seconds faster
- Boot-only drives now partition at 4G instead of the default 1G

## 4.12.3 - April 2024

### Features / Fixes

- Fixed an issue auto-detecting the best cluster CPU on slower systems
- Fixed several issues with SMTP and settings
- Fixed an issue recovering a VM from a cloud snapshot that was attached to a recipe that no longer exists
- Fixed styling issues related to dark mode

### OS / Install

- Added additional advanced VSAN settings for tweaking high-latency environments
- Fixed an issue where the current boot option could be unusable if you hard-power off a node while the boot partitions are being updated

## 4.12.2 - April 2024

### Features / Fixes

- Added support for NVIDIA 16.5 driver
- When you disable a site, its status is now set to idle
- Two Factor Authentication and Require Password Change have been completely overhauled
- Fixed an issue where IPMI addresses weren't being loaded into the UI
- You can now issue a clear reference counts from VSAN diagnostics
- VSAN rates on the main dashboard now show decimals
- IPMI services are now restarted if the device is marked as "busy"
- Fixed an issue where L2 networks would allow you to run a diagnostic query, but they would never expire
- You can now register a root CA with the system using the API
- Creating a tenant from a recipe now randomizes its mac address offset
- You can now use ${$random} and ${$random:start:end} as a recipe variable
- Increased supported nodes per-cluster to 255
- Fixed a couple minor issues initializing BGP in a network
- Fixed issue downloading remote recipe devices
- You can now multiselect VSAN drives for closing/initializing/formatting
- Fixed CPU vendor for host mode Intel cpu
- Added fiber channel scan to refresh drives
- Changed cluster power off to cluster shutdown
- Reworked cluster CPU auto-detection
- Fixed OVA imports from a NAS volume
- Fixed an issue where you could not delete a BGP interface if its associated firewall rules still existed
- Fixed issue where Apply Proxy would refresh all firewall rules for that network instead of just the proxy settings
- Fixed an issue where the auto-machine-power-on logic wasn't acknowledging the enabled flag
- Several UI/theme fixes
- Added an option to remove the confirmation for ctrl-alt-delete on the VM console page
- Fixed SMTP refresh settings on startup
- Several changes/fixes to the FQDN Proxy feature for tenants
- Over 50 additional minor fixes and enhancements
- Added the ability to skip the file size when using Upload from URL (for 1-time URLs that get burned after their first use)
- Fixed an issue where the license request file was incorrect
- Added VSAN online since and up since times to node drives
- Fixed total read / write on the node drive dashboard
- Fixed spice console password
- Fixed an issue building the clone ISO

### OS / Install

- Started lxc.service before the appserver in case there are unloaded cgroups/dependencies
- Fixed an issue installing older NVIDIA GRID drivers due to compatibility
- Fixed network-install DNS/MTU popup
- Fixed several issues with ipmievd
- Install version now shows in the header
- LLPD now runs in the installer
- Fixed an issue syncing time during the quick install
- Fixed issue rebooting from the CLI login menu
- Updated base QEMU to 8.1.5
- Fixed an issue with the install where if you didn't select every drive in the list, the tier settings would be off
- Kernel 6.1.81 and 5.10.212
- Added additional FC drivers
- Fixed an issue restarting the installer when using a core physical network that has a tagged vlan
- Fixed a scale-out issue where the VSAN could stay in a warning status
- Fixed an issue auto-negotiating the VSAN encryption key during boot

## 4.12.1 - March 2024

### Fixes

- Fixed an issue in the NAS where volume export was not available for NFS

### Security Fixes

- Added support for NVIDIA drivers 13.10 and 16.4. See https://www.nvidia.com/en-us/security/.

## 4.12.0 - February 2024

### Features

- Added nested virtualization advanced option to all cpu types per vm
- Added support for systems disconnected from the internet, and offline licensing support
- Added Tenant Isolation
- Live migration of named cpus with nested virtualization (not host cpu) now supported for Intel processors and some AMD processors.
- Added support for newer AMD and Intel processors
- New dark mode for the UI
- You can now specify numtxqueues and numrxqueues for VM NICs via the advanced settings
- You can now attach a vm nic directly to a VPN network
- New VM screen now shows and allows updates to recipes
- You can now set the MTU of a wireguard interface
- VM history now includes ram usage
- Added link when creating/editing a vm to recommend a cpu type based on the cluster

### Performance

- Increased performance for vm storage during per node contention
- Increased site synchronization speed for low latency networks
- Network migrations are now about 25% faster
- Added dedicated meta cache to vsan
- Increased disk delete performance and reduced impact for larger drives
- Updated linux kernel to 6.1
- Increased performance for VMWare integration

### Functionality

- vGPU/GPU machine drives now filter based on parent machines cluster
- Tenant storage usage is now updated every minute instead of 5 seconds
- Added support for NVIDIA drivers 13.9, 15.4, 16.3 drivers
- VM snapshots will now be marked as quiesced if specified and the machine is offline
- Drive tiers can no longer be changed while vm is running (this will change in the future)
- Add diagnostic node query for network bonding
- Improved drive hotplug performance
- You can no longer select a non-compute cluster for vms/tenants
- Added confirmation before completing a hotplug/unplug command in the NAS
- Various improvements to gpu setup
- Product help now links to public wiki
- You can now hide the clipboard text on the VM console page
- Storage will now automatically kick off a device integ check if a bad block is detected
- Many additional improvements

### Fixes

- Fixed audio devices for spice
- Fixed an issue renaming core NICs that are in a VLAN
- Added support to some older intel SSD for wear level detection
- Fixed issue if there are gpus set to nvidia vgpu but have no profiles populated
- Fixed issue with long nic device names
- Fix for an issue for VMs having hosts with invalid port group data (switchid/vlan)
- Fixed hostname validation for the NAS
- Fixed an issue where downloading a remote recipe would automatically set the cluster to the first cluster in the system
- Fixed MSS clamping for tenants
- Fixed readonly flag for OVMF legacy VMs
- Improvements to BGP
- Newer UEFI VMs will now use the 4M layout instead of the smaller version (this addresses some issues with Windows 10)
- Added override to long physical drive timeouts
- Wide range of minor issues resolved
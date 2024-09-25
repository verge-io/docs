hide: - toc

# Advanced System Settings

These settings can be found under ***System > Settings > Advanced***.

!!! danger "Exercise Caution with Advanced Settings"

    These settings should only be modified by experienced administrators or under direct guidance from VergeIO technical support. Alterations can significantly impact system behavior and performance. Always:

    1. Fully understand the implications before making changes
    2. Test modifications in a non-production environment first
    3. Document all changes for future reference
    4. Have a rollback plan in place

    For detailed information on these settings and their effects, please contact VergeIO support.

!!! note "Some settings may be empty if not configured."

| Setting | Description | Default Value |
|---------|-------------|---------------|
| ***Auto check for catalog updates*** | Interval (in hours) at which to automatically scan recipe catalogs for changes. | 24 |
| ***Cloud snapshot profile*** | Snapshot Profile to use for Cloud snapshots. The "Cloud Snapshots" profile is automatically created during installation.  You can modify this included profile or select a different profile here. | Cloud Snapshots |
| ***Contact email for processing offline/air-gap license files*** | Email address used for processing license files in offline or air-gapped environments. | license@verge.io |
| ***Day of the month to generate billing report*** | Specifies the day each month when the system generates billing reports. | 1 |
| ***Default VM drive tier*** | Sets the default storage tier for new VM drives. Higher tiers typically offer better performance. | 4 |
| ***Default cluster for VMs*** | Specifies the default cluster where new VMs will be created if not otherwise specified. | |
| ***Default cluster for VMware Service containers*** | Designates the default cluster for new VMware Service container deployments. | |
| ***Default cluster for networks*** | Sets the default cluster for new network creations. | |
| ***Default cluster for tenant nodes*** | Specifies the default cluster for new tenant node allocations. | |
| ***Default external network MTU*** | Sets the default Maximum Transmission Unit (MTU) size for external networks. | 1500 |
| ***Default failover cluster for VMs*** | Designates the secondary cluster for VM failover if the primary cluster becomes unavailable. | |
| ***Default failover cluster for VMware containers*** | Specifies the backup cluster for VMware container failover. | |
| ***Default failover cluster for networks*** | Sets the secondary cluster for network failover. | |
| ***Default failover cluster for tenant nodes*** | Designates the backup cluster for tenant node failover. | |
| ***Default internal network MTU*** | Changes the default MTU of all Internal Networks created | 9000 |
| ***Default internal network address*** | Changing default network addressing is typically not recommended.  Work closely with VergeOS Support to implement any network addressing changes. | 192.168.0.0/24 |
| ***Default media file tier*** | Sets the default tier of storage used for storage files in Media Images | 4 |
| ***Default tenant network address*** | Changing default network addressing in typically not recommended.  Work closely with VergeOS Support to implement network addressing changes.| 100.96.255.0/24 |
| ***Enable IPv6*** | IPV6 traffic in/out of the system is blocked by default.  This setting does not need to be changed to allow internal VM-to-VM ipv6 traffic. | false |
| ***Failed login attempts before an account is locked (0 disables lockout)*** | Specifies the number of consecutive failed login attempts allowed before an account is temporarily locked. Setting this to 0 disables the lockout feature. Note: VergeOS has built-in protection against brute-force attacks. Enable with caution, as aggressive lockouts can potentially lead to denial-of-service situations. | 0 |
| ***Flush the application framework database every X ms*** | **Do not modify this setting unless expressly directed by VergeIO support** | 5000 |
| ***Historical long term stats expire every X second(s)***|Defaults for historical stat expiration settings are optimized for 95th-percentile calculations/reporting. The default for long term stat expiration allows more than 30 days to ensure that monthly data will be available.   | 3888000 |
| ***Historical short term stats expire every X second(s)***|Defaults for historical stat expiration settings are optimized for 95th-percentile calculations| 300 |
| ***List of NTP servers to synchronize time with (space delimited)*** | time.nist.gov 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org |
| ***MAC address prefix for machine NICs*** | Default is the Verge.io(aka Yottabyte) OUI IEEE registered Prefix. VergeOS uses this OUI plus a system ID to ensure unique MAC addressing. | F0:DB:30 |
| ***MSS (Maximal Segment Size) of the core network's default route (set to 1460 for an MTU of 1500)*** | **Do not modify this setting unless expressly directed by VergeIO support** | 1460 |
| ***Machine migration power-cycle timeout*** | Specifies the maximum time (in seconds) the system waits for a non-responsive VM during migration before initiating a power cycle. This helps prevent migration processes from hanging indefinitely. | 1800 |
| ***Machine migration speed throttle (bytes/sec)*** | Sets the maximum data transfer rate for VM migrations. This helps balance migration speed with network performance for other operations. The default allows for roughly 1 GB/s. | 1048576000 |
| ***Maximum estimated snapshots per profile (0 to disable warning)*** | Defines the threshold for the number of snapshots in a profile before triggering a warning. This helps manage storage usage and snapshot proliferation. Setting to 0 disables the warning. | 200 |
| ***Maximum number of VXLAN FDB entries (changing this anything other than 0 can result in dropped packets)*** | Limits the number of entries in the VXLAN Forwarding Database. Changing from 0 (unlimited) may impact network performance and should only be done with caution. | 0 |
| ***Minutes an account is locked for*** | Specifies the duration (in minutes) that a user account remains locked after exceeding the failed login attempt limit. This helps protect against brute-force attacks. | 15 |
| ***Name of domain for this Cloud***|This field provides an override for the otherwise defaulted (extracted from system SSL cert) domain | |
| ***Name of this Cloud***|name to identify this system. This cloud name will appear in the user interface and reports/alerts sent via subscriptions.  The Cloud name will also identify the system in sync jobs. | *name set during installation |
| ***Override physical network for new tenants (172.17.0.0/24)*** | **Do not modify this setting unless expressly directed by VergeIO support** | |
| ***Password Complexity Requirement*** | Options include lower case, upper case, number and symbol requirements; minimum length; force password resets(all users); any combination of options can be selected.  | length:8 |
| ***Remote syslog server (tcp: @@ name/ip:port, udp: @ name/ip:port)*** | specify syslog server for log export | |
| ***SMART max hours a drive can reach before a warning is set*** | Sets the maximum operational hours for a drive before triggering a warning. This helps identify aging drives. | 43800 |
| ***SMART max number of current pending sectors a drive can have before a warning is set*** | Defines the threshold for pending sectors (sectors waiting to be remapped) before issuing a warning. Indicates potential drive issues. | 1 |
| ***SMART max number of offline uncorrectable sectors a drive can have before a warning is set*** | Specifies the maximum number of sectors that couldn't be read during offline tests before triggering a warning. Suggests serious drive problems. | 1 |
| ***SMART max number of reallocated sectors a drive can have before a warning is set*** | Sets the limit for reallocated sectors (bad sectors that have been replaced) before warning. Indicates drive degradation. | 1 |
| ***SMART max temperature (celsius) a drive can reach before a warning is set*** | Defines the maximum temperature a drive can reach before triggering a temperature warning. Helps prevent heat-related failures. | 51 |
| ***SMART max wear (percent) a drive can reach before a warning is set*** | Specifies the maximum wear level (as a percentage) for SSDs before issuing a warning. Helps track SSD lifespan. | 95 |
| ***SMART value in minutes how often diagnostics run on physical drives*** | Sets the frequency of SMART diagnostic checks on physical drives. Regular checks help in early detection of potential drive issues. | 30 |
| ***Session expiration (seconds)*** | length of time before a user is automatically logged out and required to sign in again. | 259200 |
| ***Session inactivity timeout (seconds)*** | length of time (that user is inactive) before being automatically logged out | 86400 |
| ***System ID***|WARNING: changing your system ID will affect your VergeOS license, which can stop the system from running workloads. | *will vary* |
| ***Template to define for syslog server (See rsyslog for format)***|Consult *rsyslog* documentation for proper input syntax. | |
| ***Timeout in seconds before a machine becomes unresponsive***|threshold time for the system to deem a VM unresponsive and attempt starting the VM on an alternate node | 120 |
| ***Timeout in seconds before an unresponsive node is rebooted via IPMI***|threshold time for the system to consider a physical node unresponsive and auto reboot via IPMI (reboot would required proper IPMI configuration) | 3600 |
| ***Two-factor authentication*** | Default enabled: default on for new users; default disabled: default off for new users;   | Default off |
hide: - toc

# Advanced System Settings

This page documents the advanced settings. These settings can be found under ***System > Settings > Advanced***.


!!! warning "Use Caution when modifying advanced settings!"

    Advanced settings should only be adjusted by advanced administrators or under guidance from VergeIO technical support.  Changing these settings may have significant impacts on system behavior and performance; always ensure you understand the implications of changing a setting before modifying it. Contact VergeIO support for more information on these settings and their effects. 


<br />


> Some settings may be empty if not configured.


| Setting | Default Value |
|---------|---------------|
| ***Auto check for catalog updates:*** - Interval (in hours) at which to automatically scan recipe catalogs for changes. | 24 |
| ***Cloud snapshot profile*** - Snapshot Profile to use for Cloud snapshots. The "Cloud Snapshots" profile is automatically created during installation.  You can modify this included profile (System-> Snapshots-> double click "Cloud Snapshots") or select a different profile here. | "Cloud Snapshots" |
| ***Contact email for processing offline/air-gap license files*** | license@verge.io |
| ***Day of the month to generate billing report***  | 1 |
| ***Default VM drive tier*** | 4 |
| ***Default cluster for VMs***| |
| ***Default cluster for VMware containers*** | |
| ***Default cluster for networks*** | |
| ***Default cluster for tenant nodes*** | |
| ***Default external network MTU*** | 1500 |
| ***Default failover cluster for VMs*** | |
| ***Default failover cluster for VMware containers*** | |
| ***Default failover cluster for networks*** | |
| ***Default failover cluster for tenant nodes*** | |
| ***Default internal network MTU | 9000*** |
| ***Default internal network address*** Changing default network addressing is typically not recommended.  Work closely with VergeOS Support to implement any network addressing changes. | 192.168.0.0/24 |
| ***Default media file tier***|  4 |
| ***Default tenant network address*** Changing default network addressing in typically not recommended.  Work closely with VergeOS Support to implement network addressing changes.| 100.96.255.0/24 |
| ***Enable IPv6*** - IPV6 traffic in/out of the system is blocked by default.  This setting does not need to be changed to allow internal VM-to-VM ipv6 traffic. | false |
| ***Failed login attempts before an account is locked (0 disables lockout)*** - Note: VergeOS employs automatic brute-force protection for user logins.  If considering enabling this setting, it is important to consider that account lockout mechanisms can be prone to DOS attacks.    | 0 |
| ***Flush the application framework database every X ms*** Do not modify this setting unless expressly directed by VergeOS support. Increasing the value of this setting can result in loss/corruption of workload data; decreasing the default value can have serious performance issues. | 5000 |
|   **Note: ||
| ***Historical long term stats expire every X second(s)*** - Defaults for historical stat expiration settings are optimized for 95th-percentile calculations/reporting. The default for long term stat expiration allows more than 30 days to ensure that monthly data will be available.   | 3888000 |
| ***Historical short term stats expire every X second(s)*** - Defaults for historical stat expiration settings are optimized for 95th-percentile calculations| 300 |
| ***List of NTP servers to synchronize time with (space delimited)*** | time.nist.gov 0.pool.ntp.org 1.pool.ntp.org 2.pool.ntp.org 3.pool.ntp.org |
| ***MAC address prefix for machine NICs*** - Default is the Verge.io(aka Yottabyte) OUI IEEE registered Prefix. VergeOS uses this OUI plus a system ID to ensure unique MAC addressing. | F0:DB:30 |
| ***MSS (Maximal Segment Size) of the core network's default route (set to 1460 for an MTU of 1500)*** Do not modify this setting unless expressly directed by VergeOS support. | 1460 |
| ***Machine migration power-cycle timeout*** - length of time system waits for a non-responsive migrating VM | 1800 |
| ***Machine migration speed throttle (bytes/sec)*** | 1048576000 |
| ***Maximum estimated snapshots per profile (0 to disable warning)*** | 200 |
| ***Maximum number of VXLAN FDB entries (changing this anything other than 0 can result in dropped packets)*** | 0 |
| ***Minutes an account is locked for*** | 15 |
| ***Name of domain for this Cloud*** - This field provides an override for the otherwise defaulted (extracted from system SSL cert) domain   | |
| ***Name of this Cloud*** - name to identify this system. This cloud name will appear in the user interface and reports/alerts sent via subscriptions.  The Cloud name will also identify the system in sync jobs. | *name set during installation |
| ***Override physical network for new tenants (172.17.0.0/24)*** Changing default network addressing in typically not recommended.  Work closely with VergeOS Support to implement any network addressing changes. | |
| ***Password Complexity Requirement*** - options include lower case, upper case, number and symbol requirements; minimum length; force password resets(all users); any combination of options can be selected.  | length:8 |
| ***Remote syslog server (tcp: @@ name/ip:port, udp: @ name/ip:port)*** specify syslog server for log export| |
| ***SMART max hours a drive can reach before a warning is set*** | 43800 |
| ***SMART max number of current pending sectors a drive can have before a warning is set*** | 1 |
| ***SMART max number of offline uncorrectable sectors a drive can have before a warning is set*** | 1 |
| ***SMART max number of reallocated sectors a drive can have before a warning is set*** | 1 |
| ***SMART max temperature (celsius) a drive can reach before a warning is set*** | 51 |
| ***SMART max wear (percent) a drive can reach before a warning is set*** | 95 |
| ***SMART value in minutes how often diagnostics run on physical drives*** | 30 |
| ***Session expiration (seconds)*** length of time before a user is automatically logged out and required to sign in again. | 259200 |
| ***Session inactivity timeout (seconds)*** - length of time (that user is inactive) before being automatically logged out | 86400 |
| ***System ID*** - WARNING: changing your system ID will affect your VergeOS license, which can stop the system from running workloads. | *will vary* |
| ***Template to define for syslog server (See rsyslog for format)*** - Consult *rsyslog* documentation for proper input syntax. | |
| ***Timeout in seconds before a machine becomes unresponsive*** - threshold time for the system to deem a VM unresponsive and attempt starting the VM on an alternate node | 120 |
| ***Timeout in seconds before an unresponsive node is rebooted via IPMI*** - threshold time for the system to consider a physical node unresponsive and auto reboot via IPMI (reboot would required proper IPMI configuration) | 3600 |
| ***Two-factor authentication*** -  Default enabled: default on for new users; default disabled: default off for new users;   | Default off |




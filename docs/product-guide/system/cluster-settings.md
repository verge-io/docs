# Cluster Setting Field Descriptions

!!! tip "Most cluster setting changes will require a reboot of each cluster node.  Select the *Need Restart* option (left menu or in the reboot/restart message at the top of the cluster dashboard) to manage the node reboots." 

# Cluster Settings

The Cluster Settings form allows you to configure various parameters for your cluster, relating to compute resources, swap, and node hardware.

## Cluster

This section defines the fundamental properties of your cluster.

* **Enabled:** by default, the cluster will be enabled.  There is typically no reason to disable a cluster but it can be disabled if needed for reconfiguring a misconfigured setup, etc.
* **Name:** Named during installation, name can be changed?
* **Description:** optional text area to provide a brief description of the cluster's purpose or characteristics.
* **Default CPU Type:** - CPU type is detected and automatically selected during installation.  Typically, this setting should not be changed.  Review the setting to verify accurate cpu type was detected correctly.  
- may possibly want to change this to accommodate portability to a different cluster or a DR system in which the CPU type is older/lower spec.? 
    !!! warning "All nodes within a cluster should contain the same CPU hardware; mixed CPU types within the same  cluster can cause performance and workload migration issues."
* **Storage buffer per node:**
    * **Numeric Field with Unit (GB/MB):** Additional RAM to allocate per node for vSAN performance caching.  This can provide higher I/O performance.  The default setting is 2GB. consider increasing this if 1) you have an abundance of physical RAM, definitely if this is a storage only cluster, benefit can be read/write performance and less internode storage traffic with a larger local vSAN cache
        * *Default Example:* `2` GB - this default does allow for a decent amount of storage cache, but consider increase in some situations ---- 

### Cluster Security/Performance Mitigations

This subsection allows you to enable or disable various security and performance-related features and mitigations for all nodes in the cluster.

* **Allocate Hugepages for Storage:**
    * **Checkbox:** generally, always recommended. Extremely limited situations where it would be advantageous to disable hugepages -- extremely tiny vms or incompatible, antiquated guest operating systems. 
* **Disable CPU Security Mitigations:**
    * **Checkbox:** If selected, disables all CPU security mitigations controlled at the kernel level for that cluster.
    * IMPORTANT - Only disable when you completely trust all of the guests running in this cluster - know the workloads and have no external vulnerabilities (e.g. airgapped systems)
* **Disable Speculative Store Bypass:**
    * **Checkbox:** Disables Speculative Store Bypass mitigation.
    * *Note:* "Disabling this will have a performance impact (risky for full mitigation you need to disable SMT)."
* **Disable SMT:**
    * **Checkbox:** Disables Simultaneous Multi-threading (SMT). will almost always cut your cores in half
    disable at runtime. (note: The recommended way to disable SMT is in the BIOS) 
    theoretical risks, highly-sensitive environments

    * *Note:* "This will disable hyper-threading (note: The recommended way to disable SMT is in the BIOS)."
For highly sensitive environments (e.g., cloud providers running untrusted virtual machines, financial institutions), disabling SMT has been a recommended mitigation to completely eliminate this cross-thread data leakage risk, even if it comes at a performance cost.
provides extreme isolation against potential 
While software patches and microcode updates have been released to mitigate many of these vulnerabilities, disabling SMT offers the strongest isolation against certain types of SMT-based side-channel attacks.


Disabling SMT is typically done in the BIOS/UEFI settings of your computer. The exact name of the setting can vary by motherboard manufacturer and CPU type, but common names include:

"Intel Hyper-Threading Technology" (for Intel CPUs)

"Hyper-Threading"

"SMT Mode" (for AMD Ryzen CPUs)

"Simultaneous Multithreading"

You'll usually find this setting under:

"CPU Configuration"

"Advanced CPU Settings"

"Performance"

"Security" (sometimes, as it's a security mitigation)

You'll need to reboot your system and enter the BIOS/UEFI setup (usually by pressing a key like Delete, F2, F10, or F12 during startup) to find and change this setting.

* **Disable sleep states for CPUs:**
    * **Checkbox:** Select to disable CPU sleep states. not selected by default
When selected, VergeOS will disable c1 state? to avoid popping in and out of a sleep condition, which would really kill performance without providing much benefit  --- short idle bursts -- can we always do this? or does the bios sometimes keep us from successfully disabling??
    * *Note:* "Selecting this option can increase temperatures and power usage."
* **Enable Split Lock Detection:**
    * **Checkbox:** Enable this feature to detect split locks.
    * *Note:* "Enabling this can have a performance impact on Virtual Machines that trigger a split lock."
* **Energy-Performance Policy:**
    * **Dropdown:** Select the energy-performance policy for the cluster.
        * *Example Options:* "Performance"
* **CPU Scaling Governor:**
    * **Dropdown:** Choose the CPU scaling governor.
        * *Example Options:* "Performance"

### System Log Filter

* **System Log Filter:**
    * **Text Area:** Define a comma-delimited list of examples (regular expressions) for log entries to be excluded or filtered.
    * *Example:* `.*/vmisvc/v3/raiddaemon.html,^postfix`
    * *Note:* "Filter syslog with comma delimited list (Example which would include all warning priority logs of 4 or less, except postfix and scsi/md: `.*,^postfix,^scsi/md`)."

## Compute

This section configures the compute resources within your cluster.

* **Max RAM per machine:**
    * **Numeric Field with Unit (GB):** Set the maximum amount of RAM (in GB) that can be allocated to a single virtual machine.
        * *Default Example:* `64` GB
* **Max cores per machine:**
    * **Numeric Field:** Set the maximum number of CPU cores that can be allocated to a single virtual machine.
        * *Default Example:* `16`
* **Target max ram pct:**
    * **Numeric Field (%):** Specify the target maximum percentage of RAM to be utilized across the cluster.
        * *Default Example:* `80`
* **% of reserve ram to use for machines:**
    * **Numeric Field (%):** Define the percentage of RAM to reserve specifically for virtual machines.
        * *Default Example:* `0`
* **Nested Virtualization:**
    * **Checkbox:** Allow nested virtualization, enabling you to run a virtual machine inside another virtual machine using hardware acceleration from the host.
* **Allow Nested Virtualization Live Migration:**
    * **Checkbox:** Allow virtual machines with nested virtualization to be live migrated.
* **Allow VGPU Live Migration:**
    * **Checkbox:** Allow virtual machines with vGPU devices to be live migrated (experimental).
    * *Note:* "If not enough vGPU devices are available, workloads may be temporarily powered off during maintenance."

## Storage

This section focuses on storage configurations.

* **Tier used for swap:**
    * **Dropdown:** Select the storage tier to be used for swap space.
        * *Note:* "Disabled when value is 0. Changing this only applies to newly formatted disks."
* **Swap per drive:**
    * **Numeric Field with Unit (GB):** Define the amount of swap space to allocate per drive in gigabytes.
        * *Default Example:* `4` GB
        * *Note:* "Changing this only applies to newly formatted disks."

## Node Temperature

This section allows you to set temperature thresholds for the cluster nodes.

* **Maximum Core Temperature (Celsius):**

top maximum
typically query from cpu chip hardware - recommended for most real server hardware 
    if not real server hardware may not support
some processors have protection to shutdown automatically or hard lock 
can disable this but not recommended, can be appropriate in some situations - e.g. bare metal where its not your responsibility to monitor hardware or maybe if this is running as virtual system
this is really just to show in UI
* **Maximum Core Temperature Warning Threshold %:**
    * **Dropdown:** Set the percentage threshold relative to the maximum core temperature at which a warning should be issued. - to show warnings in the vergeos UI, also can trigger alerts based on this with subscriptions
        turns the status guage to yellow and produces a warning in the system log
* **Critical Core Temperature (Celsius):**
    * **Dropdown:** Set the critical core temperature in Celsius, beyond which the system may take emergency actions.
        turns the status guage to red and produces a critical warning/error in the system log.

---

* **CPU Power Management:**

It’s generally recommended to configure VergeOS nodes in **High Performance mode**, rather than power-saving settings that throttle CPU speed or enable sleep states to reduce energy use and noise. VergeOS typically enforces high-performance settings automatically, though some BIOS platforms may require manual adjustment if overrides aren’t supported.  Disabling CPU power-saving features can be especially beneficial on newly deployed systems, where workloads are gradually added. In these cases, idle nodes must quickly respond as demand increases, something High Performance mode is designed to handle.

!!! tip "Different BIOS vendors often use slightly different terminology for what essentially amounts to High Performance mode. Several examples you might encounter across systems, include: - *Performance/High Performance/Max Performance, Optimized Defaults, CPU Performance Mode, Turbo Mode, Disable C-States, Disable CPU Power Saving*.
The exact label and location vary by manufacturer and BIOS version. Consult the motherboard manual or UEFI help text if unsure."
 
* **Security Mitigations**

BIOS-level security mitigations are hardware and firmware protections, such as: Secure Boot, TPM, and SMM Security Mitigation, that help defend against low-level attacks before the operating system loads. In environments where workloads are known and trusted, administrators may choose to disable some of these settings to optimize performance. However, this approach is strongly discouraged in service provider or third-party tenant environments, where guest workloads may be untrusted or vulnerable to exploitation. In such cases, it is important to keep mitigations enabled to protect system integrity and security boundaries.

!!! warning "Only consider disabling of security mitigations when all workloads are known and trusted."
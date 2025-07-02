# Cluster Setting Field Descriptions

!!! warning "Most cluster setting changes require a reboot of each cluster node."

# Cluster Settings

The Cluster Settings form allows you to configure various parameters for your cluster, relating to compute resources, swap, and node hardware.

## Cluster

This section defines the fundamental properties of your cluster.

* **Enabled:**
    * **Checkbox:** Select this to enable the cluster; default enabled
* **Name:**
    * **Text Field:** Enter a unique name for your cluster (e.g., `testverge`).
* **Description:**
    * **Text Area:** Provide a brief description of the cluster's purpose or characteristics.
* **Default CPU Type:**
    * **Dropdown:** CPU type is detected and automatically selected during installation.  Typically, this setting should not be changed. 
    !!! warning "All nodes within a cluster should contain the same CPU hardware; mixed CPU types within the same  cluster can cause performance and workload migration issues."
* **Storage buffer per node:**
    * **Numeric Field with Unit (GB/MB):** Specify the amount of storage buffer to allocate per node in gigabytes.
        * *Default Example:* `2` GB

### Cluster Security/Performance Mitigations

This subsection allows you to enable or disable various security and performance-related features and mitigations for all nodes in the cluster.

* **Allocate Hugepages for Storage:**
    * **Checkbox:** Enable this option to allocate hugepages for storage operations, which can improve performance.
* **Disable CPU Security Mitigations:**
    * **Checkbox:** If selected, disables all CPU security mitigations for that cluster.
    * *Note:* "Only disable if you trust all of the guests running in this cluster."
* **Disable Speculative Store Bypass:**
    * **Checkbox:** Disables Speculative Store Bypass mitigation.
    * *Note:* "Disabling this will have a performance impact (risky for full mitigation you need to disable SMT)."
* **Disable SMT:**
    * **Checkbox:** Disables Simultaneous Multi-threading (SMT).
    * *Note:* "This will disable hyper-threading (note: The recommended way to disable SMT is in the BIOS)."
For highly sensitive environments (e.g., cloud providers running untrusted virtual machines, financial institutions), disabling SMT has been a recommended mitigation to completely eliminate this cross-thread data leakage risk, even if it comes at a performance cost.

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
    * **Checkbox:** Select to disable CPU sleep states.
    * *Note:* "Disabling this will increase temperatures and power usage."
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
* **Allow KSPU Live Migration:**
    * **Checkbox:** Allow virtual machines with KSPU devices to be live migrated (experimental).
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
    * **Dropdown:** Set the maximum allowable core temperature in Celsius before a warning or action is triggered.
        * *Example options:* "Disable"
* **Maximum Core Temperature Warning Threshold %:**
    * **Dropdown:** Set the percentage threshold relative to the maximum core temperature at which a warning should be issued.
        * *Example options:* "Disable"
* **Critical Core Temperature (Celsius):**
    * **Dropdown:** Set the critical core temperature in Celsius, beyond which the system may take emergency actions.
        * *Example options:* "Disable"

---

**Actions:**

* **Cancel Button:** Discard any changes made and return to the previous page.
* **Submit Button:** Save the configured settings and apply them to the cluster.

* **CPU Power Management:**

It’s generally recommended to configure VergeOS nodes in **High Performance mode**, rather than power-saving settings that throttle CPU speed or enable sleep states to reduce energy use and noise. VergeOS typically enforces high-performance settings automatically, though some BIOS platforms may require manual adjustment if overrides aren’t supported.  Disabling CPU power-saving features can be especially beneficial on newly deployed systems, where workloads are gradually added. In these cases, idle nodes must quickly respond as demand increases, something High Performance mode is designed to handle.

!!! tip "Different BIOS vendors often use slightly different terminology for what essentially amounts to High Performance mode. Several examples you might encounter across systems, include: - *Performance/High Performance/Max Performance, Optimized Defaults, CPU Performance Mode, Turbo Mode, Disable C-States, Disable CPU Power Saving*.
The exact label and location vary by manufacturer and BIOS version. Consult the motherboard manual or UEFI help text if unsure."
 
* **Security Mitigations**

BIOS-level security mitigations are hardware and firmware protections, such as: Secure Boot, TPM, and SMM Security Mitigation, that help defend against low-level attacks before the operating system loads. In environments where workloads are known and trusted, administrators may choose to disable some of these settings to optimize performance. However, this approach is strongly discouraged in service provider or third-party tenant environments, where guest workloads may be untrusted or vulnerable to exploitation. In such cases, it is important to keep mitigations enabled to protect system integrity and security boundaries.

!!! warning "Only consider disabling of security mitigations when all workloads are known and trusted."
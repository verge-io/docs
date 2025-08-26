# Cluster Settings

The *Cluster Settings* form enables you to configure key parameters relating to performance, security, allocation, thermal monitoring, and swap. While the majority of default settings are appropriate for most environments, it's recommended to review them when creating a new cluster and periodically thereafter to ensure alignment with your organization's policies and operational requirements.

!!! tip "Most cluster setting changes will require a reboot of each cluster node.  A message will appear at the top of the cluster dashboard when a reboot is necessary.  Select the *Need Restart* option (within the reboot/restart message at the top of the cluster dashboard or left menu option) to manage reboots of the cluster nodes.  Always follow proper [Maintenance Mode procedures](/product-guide/operations/maintenance-mode) when rebooting nodes to avoid workload disruptions." 

## Accessing Cluster Settings

From the **Main Dashboard** > **Clusters** > **double-click the desired cluster** > click **Edit** on the left menu. 


## Cluster

This section defines the fundamental properties of your cluster.

1. **Enabled:** By default, the cluster will be enabled.  Typically, there is no reason to disable it; however, doing so may be useful in certain situations, such as during a complete cluster reconfiguration.
2. **Name:** A cluster is typically named during installation but can be renamed without issue. 
3. **Description:** Optional text area to provide a brief description of the cluster's purpose or characteristics.
4. **Default CPU Type:** Defines the default/recommended CPU type for virtual machines with this cluster designated.  This setting is automatically selected during cluster installation, based on detected CPU hardware. During initial configuration, review the setting to verify accurate CPU type was detected.  

!!! tip "To accommodate migration/failover of virtual machines to another cluster using a lower class of CPU chip, *Default CPU type* can be changed to the lower class type to allow virtual machines to be ported to the older chip hardware without issue."

!!! warning "All nodes within a cluster should contain the same CPU hardware; mixed CPU types within the same cluster can cause performance and workload migration issues."


5. **Storage buffer per node (default 2 GB):** The amount of additional RAM to allocate per node for vSAN performance caching.     
!!! note "Considerations"
    - When there is available RAM, beyond system and virtual workload needs, consider increasing this setting
    - Increasing the *Storage buffer per node* can significantly improve read/write performance
    - As a general rule of thumb, aim for no more than 80% RAM utilization during normal operation  


### Cluster Security/Performance

This subsection allows you to enable/disable various performance and security-related features and mitigations for all nodes in the cluster.

1. **Allocate Hugepages for Storage (default enabled):** Enabling hugepages is strongly recommended in most cases, as it enhances memory storage performance for workloads. Disabling this setting is generally discouraged, except in rare scenarios, such as when running only very small virtual machines or legacy guest operating systems with limited hugepage support.

2. **Disable CPU Security Mitigations:** If selected, kernel-level CPU security mitigations are disabled for the cluster.  
!!! warning "IMPORTANT: Although disabling CPU security mitigations can improve performance, this can be risky. Only select this option when you completely trust all guests running in this cluster and can be sure the workloads have no external vulnerabilities (e.g. airgapped systems)."

3. **Disable Speculative Store Bypass:** If selected, disables Speculative Store Bypass (SSB) at runtime. Disabling SSB can result in a modest to moderate performance drop, depending on system workloads. 
   
4. **Disable SMT:** If selected, disables simultaneous multi-threading (SMT) at runtime.  

!!! Notes
    - Disabling SMT will significantly impair performance as it disables hyper-threading 
    - While modern software and microcode updates generally mitigate many of the vulnerabilities involved with SMT, some highly-sensitive environments may choose to disable it, even if it comes at a performance cost 
    - The recommended way to disable SMT is in the BIOS.  The exact name of the setting can vary by manufacturer; consult your hardware documentation if unsure 

5. **Disable sleep states for CPUs:** If selected, VergeOS automatically disables low level sleep state(s). This can eliminate unnecessary sleep state transitions due to short idle bursts that would otherwise cause a notable drop in performance with minimal benefit in power efficiency. 

!!! Considerations
    - Disabling CPU sleep states can be especially beneficial on newly deployed systems, where workloads are gradually added. In these cases, idle nodes must quickly respond as demand increases
    - Selecting this option can lead to higher temperatures and power usage, depending on system workloads

6. **Enable Split Lock Detection:** Detects split lock events within workloads and reports them in the system log. Enabling this option can have a performance impact on virtual machines that trigger a split lock.
    
7. **Energy-Performance Policy (default=*Performance*):** Policy setting that guides the processor’s internal logic to balance performance vs. power efficiency. This setting is typically best left at its default, allowing the system to dynamically optimize for performance at runtime. Alternative energy-versus-performance options are available to support non-enterprise environments such as consumer-grade systems, home labs, or proof-of-concept (POC) deployments.

8. **CPU Scaling Governor (default=*Performance*):** Policy for kernel-level, dynamic CPU frequency adjustment based on system load. This setting is typically best left at its default, allowing the system to dynamically optimize for performance at runtime. Alternative energy-versus-performance options are available to support non-enterprise environments such as consumer-grade systems, home labs, or proof-of-concept (POC) deployments.
  

### System Log Filter

1. **System Log Filter (default `*:3,ipmievd:5,rasdaemon,!ntpd,!postfix`):** A comma-separated list of filters in rsyslog syntax that determines which log entries to display in the user interface.  Entries matching these filters are shown; all others are excluded from the UI view. This syntax supports facility and priority filters, as well as program-specific inclusions or exclusions.  
!!! tip "Unfiltered logs remain accessible via *Node Diagnostics* (Navigate to *Nodes* > double-click the desired node > select *Diagnostics* from the left menu.)"


## Compute

This section configures compute resource policies for your cluster.  These settings will not apply for storage-only clusters.

1. **Max RAM per machine:** Specifies the maximum amount of RAM that can be allocated to a single workload (such as a virtual machine, tenant node, or NAS service). 

!!! tip "Considerations"
    - If any running workloads (e.g. VMs) are using more RAM than this limit, they will be unable to migrate after the setting is lowered.
    - The limit affects workload startup and migration (i.e., starting on a new node). It does not prohibit you from creating a workload with more RAM, but only prevents it from starting if the limit is exceeded. 
    - As a general rule, choose the lowest RAM value that still meets the needs of your largest expected workload. Lower RAM allocations to individual workloads will maximize flexibility for migrations, failovers, and workload portability and enable faster failover times.
    - **Be cautious when setting this limit close to a node's physical RAM capacity**. If you set this limit to match a node's total RAM (e.g., 128GB) and then create a VM using that full amount, the VM will be unable to start or migrate because:
        - VergeOS reserves RAM for system operations and vSAN functionality
        - During maintenance or failover, workloads must migrate to other available nodes
        - A VM consuming nearly all available RAM cannot successfully migrate to another node
    - **Recommended approach:** Set this limit to no more than 70-80% of your smallest node's physical RAM, ensuring VMs can always migrate during maintenance or failover scenarios.
    
2. **Max cores per machine:** Specifies the maximum number of CPU cores that can be allocated to a single workload (such as a virtual machine, tenant node, or NAS service)
!!! tip "Considerations"
     - If any running workloads (e.g. VMs) are using more cores than this limit, they will be unable to migrate after the setting is lowered.
    - In nearly all cases, this value **should not exceed** the number of cores available within a **single CPU socket**.
    - **This value should never exceed the total number of physical cores in a single node**

3. **Target max ram pct (default 80):** Specifies the maximum percentage of physical RAM that a cluster node should use under normal conditions.  This threshold helps prevent over-allocation from new workloads. However, it may be exceeded in special circumstances such as failover or workload migration to maintain service continuity. 

??? example "Example of *Target max ram pct*"
    - A cluster node has **252GB physical RAM available** (256GB with 252GB after BIOS/video card overhead)
    - ***Target max ram pct*** is set to the default of **80**
    - 252G * 80% = **approximately 200G** usable under normal conditions
    - **System/vSAN RAM overhead 16G** (note: vSAN overhead will vary, depending on the amount of cluster storage)
    - **Available for new workloads:** 184GB (usable minus overhead), staying within the 80% usage target
    - **During failover or migration:** Workload RAM usage **may temporarily exceed 184GB** to support relocated workloads

4. **% of reserve ram to use for machines:** defines a portion (in percentage) of swap reserved specifically to simulate additional workload RAM when physical RAM is exhausted.  This virtual RAM can be configured as a fallback for RAM overprovisioning.   
!!! warning "RAM Overprovisioning Cautions"
    - Using this reserve RAM feature is typically only intended as a fallback for RAM overprovisioning
    - Avoid overprovisioning on clusters with high workload memory utilization or critical workloads
    - Consider rightsizing VMs by reducing RAM allocations where usage is consistently low
    - If too many VMs demand their full memory allocation simultaneously, workload performance may be degraded as virtual RAM is orders of magnitude slower than physical RAM (milliseconds vs. nanoseconds)
     

5. **Nested Virtualization:** Enables using a virtual machine inside another virtual machine using hardware acceleration from the host.
!!! note "Nested virtualization can involve security implications and issues with fair queuing/metering."  

6. **Allow Nested Virtualization Live Migration*:** Allows live migration of virtual machines with nested virtualization. 

7. **Allow VGPU Live Migration*:** Allows virtual machines with vGPU devices to be live migrated (experimental). Although not fully verified in testing, live migration of vGPU workloads has been seen to generally work reliably when the latest NVIDIA drivers are used on both host and guest.  

!!! info "If not enough vGPU devices are available, workloads may be temporarily powered off during maintenance." 

!!! tip "*Live Migrations"
    The virtual machine setting: *Migration Method* allows defining migration behavior per VM (e.g. require manual shutdown, attempt live migration) 

## Storage (Swap Settings)

!!! warning "Swap settings are specified during cluster installation. Swap setting changes will only apply to newly formatted disks."

1. **Tier used for swap:** Storage tier to be used for swap space. Swap is disabled when value is 0
  
2. **Swap per drive:** Amount of swap space to allocate per drive 


## Node Temperature

This section allows you to define settings for VergeOS alerting behavior related to higher CPU thermal readings on cluster nodes.  Timely notification, in advance of reaching CPU max temperatures, can allow taking actions to avoid outages and harm to physical equipment; allowing CPU hardware to reach its maximum temperature limits can cause the CPU to automatically shut itself down or cause hard locks, and potential hardware damage.  

1. **Maximum Core Temperature (Celsius)** Establishes a peak temperature to use for VergeOS temperature monitoring (used in combination with the next setting: *Maximum Core Temperature Warning Threshold %*).
    - ***query from hardware* (default)** - retrieves the hardware-defined maximum temperature from the CPU  
    !!! info "Non-server hardware and some legacy servers may not support this query; in such cases, the *custom* setting can be selected to establish a max temperature in which to base VergeOS warnings." 
    - ***custom*** - allows for manually defining a specific peak temperature. Refer to your hardware documentation to verify your CPU max temperature.
    - ***disable*** - this selection can be used when you do not wish to monitor temperature within VergeOS (when you are not responsible for monitoring the hardware, e.g. bare metal provider, or VergeOS is running within a virtual environment)

2. **Maximum Core Temperature Warning Threshold %** Sets a percentage boundary relative to the maximum core temperature (above) at which to trigger a warning state. A warning state will cause a yellow node status and system log warning entry will be created.  Typically, a threshold of at least 10% or higher is recommended to allow time to take proper measures in reaction to a thermal issue.

!!! example "Example"
    If *Maximum Core Temperature (Celsius)* is set to 80 degrees and *Maximum Core Temperature Warning Threshold %* is set to 10, warning status will trigger when CPU hardware reports 72 degrees.

3. **Critical Core Temperature (Celsius):** Defines temperature at which to trigger an error state in VergeOS.  
When reported hardware temperatures reach this temperature, the node status will turn to red and an error entry will appear in the system log. 
    - ***query from hardware* (default)** - retrieves the hardware-defined critical temperature from the CPU    
    !!! info "Non-server hardware and some legacy servers may not support this query; in such cases, the *custom* setting can be selected to establish a critical temperature setting."
    - ***custom*** - allows for manually defining a critical temperature. Refer to your hardware documentation to verify your CPU max temperature.
    - ***disable*** - this selection can be used when you do not wish to monitor temperature within VergeOS (when you are not responsible for monitoring the hardware, e.g. bare metal provider, or VergeOS is running within a virtual environment) 







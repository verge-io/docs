# Virtual Machine Fields

**Name (required)**
Searchable field. Displayable characters only; double quotations not allowed; spaces not allowed as first or last character. VM Name field is changeable after creation.

**Enabled \[checkbox\]**
Default is selected(enabled). When a VM is disabled, it cannot be powered on.

**Description (optional)**
Multi-line field, allows for storing additional information about the VM. Description can prove very helpful in systems with large numbers of virtual machines and/or high virtual machine turnover.

**OS Family \[dropdown\]**
Select the OS type that will be installed/run on this virtual machine. Virtualization Flags are used to optimize based on the guest OS type. Performance can be adversely affected if an incorrect OS Family is selected.

  * *FreeBSD*
  * *Linux*
  * *Windows*
  * *Other*

**OS Description (optional)**
Provides further documentation area for the VM; intended for additional information about the guest OS (ex: "RC1", "SP2", "Dev Edition", "Enterprise" etc.)

**Snapshot Profile \[dropdown\]**
Defines the snapshot schedule for the individual VM. Typically, this field is left blank because VM restores can easily be extracted from system snapshots. However, defining a snapshot profile here provides a way to perform additional, more frequent snapshots, and/or longer snapshot retention, and/or quiesced snapshots of the VM. The selection list includes all [Snapshot Profiles](/product-guide/backup-dr/snapshot-profiles) available in the system.

**HA Group** (optional)
HA Group value is used to define node affinity:

* **Affinity Group** - (value starts with a "+", e.g. "+webapp1") The system attempts to run VMS with the same +HA Group on the same node, allowing you to keep related workloads together for optimized performance.
* **Anti-Affinity Group** The system attempts to run VMs with the same HA group value across separate nodes.  This is typically used to provide high availability of an application or service.  (value must not start with a "+".)

**Cluster \[dropdown\]**
Defines the primary-choice cluster (at the time of VM Power On) to be used for the VM compute resources. Options include all clusters to which the user has permissions

**Failover cluster (optional) \[dropdown\]**
Defines secondary-choice cluster to be used when the primary cluster is unavailable (at the time of VM Power On). Options include all clusters to which the user has permissions.

**Preferred node (optional) \[dropdown\]**
Select the host node on which the VM will first try to start up. Options include all nodes within the selected cluster.

**Cloud-init Datasource \[dropdown\]**
Cloud-init Integration option

  * *None* - No Cloud-init functionality  
  * *Config Drive V2* (Standard Cloud-init)
  * *NoCloud* (Standard Cloud-init, intended for configuration without a network connection)

**Owner User (optional) \[dropdown\]**
Allows for assigning a user to the given VM. Assigning *Owner User* will automatically assign List/Read permissions for the VM to the given user and will auto-delete the VM if the assigned user account is deleted.

**RAM**
The amount of RAM to allocate to the VM. (with GB or MB unit selection)
The UI will allow assigning a VM a higher amount of memory than is actually available. However, if the defined amount of RAM is not available when a Power on command is issued, an error will be thrown and the VM will not start.

**Cores**
The number of CPU cores to allocate to the VM. Cores can be over-provisioned; however, VM can only use actual cores available.

**CPU Type \[dropdown\]**
Typically it is recommended to keep the default setting as this will automatically select the CPU type that is optimized for the underlying physical host hardware (at VM creation). A different CPU type can be selected to accommodate legacy operating systems/applications and for allowing porting systems to failover sites where different physical host hardware is employed.

**Boot Order \[dropdown\]**
Defines the order in which disk devices are checked for a bootable operating system.

  * *Disk*
  * *Disk, CD-ROM (default)*  
  * *Disk, CD-ROM, Network*
  * *CD-ROM*
  * *CD-ROM, Disk*
  * *Network*
  * *Network, Disk*
  * *Disk Order ID*

**Machine Type \[dropdown\]**
Emulated board architecture.

  * *Q35* - AHCI (recommended)
  * *PC* - IDE

**Allow Hotplug (selected by default)**
This allows drives and NICs to be added without restarting the VM. Disable if guest OS or emulated hardware does not support it.

**Console Type \[dropdown\]**

  * *VNC* - provides basic graphical console connectivity; no audio or virtual USB support; adequate for most administrative uses
  * *Spice* - audio pass-through support; USB pass-through support (Note: audio and USB support require Spice client software.)
  * *Serial Console* - when selected, no graphics card is added and all VM output is directed to the serial port. A terminal emulator (xterm.js) can be used to connect to the serial port.
  * *None* - no console access is provided through the VergeOS user interface.

**Console Password Enabled (deselected by default)**
If enabled, login is required with specified username/password for accessing the remote console option.
Prompts for username and password fields displayed when the *Console Password Enabled* field is checked.

**USB Tablet (selected by default)**
When selected, a tablet pointer is emulated rather than a mouse, providing for less overhead and network traffic. For a command-line only VM, with no mouse, this option is unnecessary. For spice VMs that will use the client agent, this option is unnecessary.

**Video Card \[dropdown\]**

  * *Standard VESA 2.0* (default) - recommended for most modern OS installations (except where high-performance video hardware is utilized).
  * *Cirrus logic* - very compatible with many installations. It is useful for older OS versions.
  * *QXL* - required when using Spice remote console protocol
  * *VMWare SVGA-II compatible* - this driver may be necessary for imported VMware VMs.
  * *VirtIO* - provides VGA passthrough. This is the best option to leverage better video adapter hardware (e.g. hardware accelerated) on physical nodes; typically the best choice for VDI solutions, where high-performance physical video adapters are used. This option is not recommended when physical nodes employ low-performance, basic video adapter hardware.

**RTC Base**
Sets the time clock for the VM

  * *UTC* - Universal Time Clock
  * *Local Time* - local time, based on the timezone of the VergeOS system
  
!!! tip
    - Linux typically expects time in UTC format
    - Windows typically expects time in local time; hence, this setting should be set to Local Time -OR- appropriate registry change can be made within Windows to use UTC.  The following KB article provides additional information: [Windows Time Shift](/knowledge-base/windows-time-shift).

**UEFI (deselected by default)**
Selection needed will typically depend on the guest OS to be used on the VM. (selected=UEFI, unselected=BIOS) Modifying this option on an existing VM requires a power cycle of the VM.

**Serial Port \[checkbox\]**
When enabled, a virtual serial port is created; used only for guest OS compatibility (ex: Ubuntu Cloud images require a serial port for installation.) Note: When Serial Console is selected for the *Console Type*, this option is not displayed and a serial port is automatically created and assigned to the console.

**Boot Delay (optional)**
(in Seconds) Used to control the timing of booting the VM when the owning tenant/cloud is powered on. For example, a delay can be specified on a web server to allow time for its database server to boot and load first, before the web server VM is powered on.

**On Power Loss \[dropdown\]**
Determines the action taken when power is restored to the VM. (This can be after a physical power loss or after the owning tenant is powered off/on in the VergeOS UI.)

  * *Last State* - VM will only be powered on if it was on at the time of power loss.
  * *Leave Off* - VM will not be powered on when power is restored (regardless of its state at time of power loss)
  * *Power On* - VM will be powered on when power is restored (regardless of its state at the time of power loss)

**Disable Power Cycle \[checkbox\]**
By default, when a reboot is initiated from the guest OS, the system will perform a complete power cycle (which re-initiates all the VM hardware.) When this option is selected, a guest-OS-initiated reboot will simply reset the guest operating system without a power cycle/hardware reset.

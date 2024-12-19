

# Virtual Machine Best Practices

The following recommendations are for creating virtual machines to be used within VergeOS. Some involve the settings of the machine e.g. (RAM allocation, NICs, etc), while others pertain to configuration within the guest OS. Following best practice guidelines can avoid potential issues and provide better performance.

<br>
<br>

## Recommendations for Importing from existing VMs or migrating physical to virtual:

-   Prior to export from other systems, uninstall all hypervisor guest applications e.g. VMware guest agent, Hyper-V integration components, etc. These guest applications will serve no purpose when running in VergeOS, thus wasting resources and potentially causing other adverse results.

-   Remove any hardware-specific drivers/software (for example BIOS update monitors, etc) prior to exporting a physical image.

-   Prior to performing an export of the physical drives, uninstall hardware that will not exist in the virtual machine.

-   Otherwise, keep hardware configuration as similar as possible (number and size of drives, number and type of CPU(s))

-   Often, it is preferable to keep MAC addresses from the previous machine the same on the new VergeOS machine, otherwise, a different MAC address will detect as a new network device within the guest OS and require reconfiguration of all guest network settings. For a machine that was imported using VergeOS auto import utilities, you are prompted with the choice to reserve the MAC address or auto-generate a new MAC address. For machines that are manually imported (e.g. VM shell created and drives imported,) the MAC address can be noted from the existing machine and then manually entered when creating the new machine NIC.

> It is important to remember that two machines should never be running within the same network using the same MAC address. {.is-warning}

> Migrating a physical Windows machine to virtual may require reinitializing Windows license keys.{.is-info}

<br>

## Ram Allocation
The amount of RAM to allocate to a VM is the amount needed to adequately run the workloads within the VM. When a VM is powered on, RAM is allocated to that VM out of an available pool of memory and then cannot be allocated to other VMs (this is regardless of activity within the guest OS.). Generally, a virtual machine in VergeOS can be given less RAM than when run bare metal and in other virtual environments; RAM that would typically be needed within the VM to accommodate disk performance functions, caching, etc. is not needed because these functions are handled automatically by the vSAN.

<br>

## Selecting CPU Type

- A default CPU type is provided per cluster, based on the detected CPU type of the host hardware; this is typically the best option to select for each machine.

- If a virtual machine is imported and the CPU type is changing, Windows license re-activation/additional power cycles may be necessary.

- If a machine might eventually be migrated/failed over to clusters with different host CPU hardware, select the lowest class of CPU chip type used among the clusters when creating the new VM. This will ensure the machine can be ported to older chip classes without issue.
<br>

## OS Family

Selecting the correct OS Family (e.g. Windows/Linux/FreeBSD)) for the VM will help to ensure the correct QEMU flags are used when starting the VM, which in turn can affect performance. This is particularly important for Windows-based VMs.

<br>

## Power Saving

All power-saving features should be disabled within the guest OS as these features will provide no benefit and most likely will cause problems. Select a *Performance* profile rather than a power-saving profile.

<br>

## ACPI

Without ACPI support, it will be necessary to enter the guest operating system to carry out a clean shutdown of the VM; this is not optimal, particularly with a larger quantity of machines. ACPI should be enabled and configured within the guest operating system to allow for gracefully powering down a VM from the VergeOS management interface (or via API). Before putting a VM into production, it is recommended to test *Restart* and *Power Off* operations from the VergeOS dashboard, while the VM is at a login prompt/locked screen within the guest OS, to verify ACPI is configured correctly.

<br>

## Clock synchronization

Generally all VM servers, particularly those running time-critical applications, should have NTP configured and installed within the guest OS. Computers automatically sync with their hardware clock when power cycled and in between power cycles as controlled by their guest OS; most often this alone is not frequent enough to keep a VM adequately time synchronized. NTP is intended to keep computers synchronized on a more frequent basis (to keep clock synchronization within a few milliseconds.) NTP servers should be chosen with care, with edge servers pointing to NTP sources known to be reliable and geographically appropriate. As it is important for host nodes and guests to be in sync, guest machines should be configured to use their host nodes as NTP server or should be configured to use the same NTP servers as the physical host nodes.

<br>


### UTC/Local Time - Windows VMs

By default, the system provides the time to virtual machines in UTC format. Windows, by default, expects to receive time in local time; therefore, for Windows virtual machines, do one of the following:

-   **Configure VergeOS settings to use Local time (for the VM)** - Select local time for the clock source in the VM settings.
-   **Configure Windows to use UTC** - Make appropriate registry key changes within the Windows VM to use UTC format.

<br>



## VM drives

- Virtio drivers typically provide the best performance. Most versions of Linux operating systems natively contain virtio drivers.  
For Windows machines, the latest virtio drivers can be downloaded here: [https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)

- The system provides thin provisioning on storage and therefore space allocated to a virtual drive, but unused, is not actually consumed; therefore it may be preferable, in many cases, to allocate a larger amount to a drive, to avoid the need to increase drive size later.

- Virtio-SCSI drives can be resized without a power cycle. Some guest OS/file systems do not support drive down-sizing. Check guest OS documentation to verify if downsizing a drive is supported.*

<br>


## Security

It is important to remember that the remote console provides direct monitor/keyboard-mouse access to a virtual machine; gaining console access provides access to the current state of the system (e.g if previous user leaves guest OS logged in, a subsequent user then has access under that guest OS login.) When the Spice or VNC console option is enabled for a machine, a console password can be assigned to provide access control. A console password, however, does not substitute for using smart login guidelines within the guest operating system (e.g. individual logins, complex password requirements, etc). VergeOS permissions allow very granular control of user access. Utilize user and group permissions to limit access to virtual machines where appropriate.

<br>


## Networking

- Use virtio network drivers when possible as will normally provide the best performance. The latest stable virtio drivers are available for download at: [https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)  
Use legacy network drivers when necessary, but consider upgrading your operating system to a newer version if it will not support virtio network drivers.

- Keep in mind -- NIC teaming is generally not beneficial on VergeOS VMs as network redundancy and load balancing are already provided through the infrastructure. Using NIC teaming within the guest OS would consume unnecessary resources and potentially cause issues. (The only exception to this rule would be in cases where the machine is using physical network pass-through hardware.)


<br>


## Graphics

-   Disable all screensavers within the guest OS.
-   Remove all graphical effects (e.g. drag or minimize effects)within the guest OS.


<br>


## Data Protection - Snapshots and Syncs

A wise data-protection plan will include use of both snapshots and syncs.

- **Cloud Snapshots** provide rollback points for an entire system, allowing restoration of that entire VergeOS cloud to a particular point in time. Typically it is best to configure your snapshots at the cloud level; this will include everything within that Cloud and allows for restoration of the entire system, including individual VMs and Tenants. There is generally no need to configure additional snapshots at the VM level unless there are particular VMs that should be captured on a more frequent basis or retained longer.

- **Manual VM Snapshots** can be taken immediately prior to making changes, such as a guest OS/Application update or advanced configuration change; snapshots can then be saved until VM changes are verified.

- **Site Syncs** allow for copying data to remote VergeOS systems/locations. Syncs are an important strategy for allowing data protection and business continuity by getting a quick-recovery copy of data off-site.

Contact Support for assistance in designing your data protection strategy using built-in VergeOS functionality.


<br>


## Guest Software

-   Uninstall any guest applications that are intended for other virtualization platforms.
-   Check the list of automatically started services and disable any that are unnecessary.
-   Only install software that is actually needed.

<br>



## Remote Console Options

Only select the Spice console option when using the spice thick client to get audio passthrough/remote USB/video streaming. Otherwise, it is better to utilize VNC. Spice should normally only be considered for virtual desktop VMs. Servers should always be configured to use VNC unless there is an absolute need for remote USB; otherwise there is too much unnecessary overhead with Spice.

> Changing the *Remote Console* Option (VNC/Spice/None) requires a power cycle and video change.{.is-success}

<br>



## Machine Type (motherboard architecture emulation)

Q35 is the default emulation for VMs and generally will provide the best performance and features. Typically, when creating a new VM, it is best to leave the default selection for Machine Type (which will pin the chipset to the latest Q35 version currently installed on the physical hosts). Older versions of Q35 emulation and i440FX emulation options are provided for legacy compatibility. There is also an option to select *Q35-...Latest*  as an option for Machine Type. This will automatically upgrade the VM to the newest Q35 version available (when VM is power cycled), as new Q35 versions are to become available when a host system is upgraded.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}



<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
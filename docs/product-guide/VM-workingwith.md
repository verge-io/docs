# Working With Virtual Machines (VMs)

## VM Console Access

The [Remote Console](/product-guide/VM-RemoteConsole) provides video/keyboard-mouse access to your VMs through the VergeOS user interface.

- **Open a single VM Remote Console**: Navigate to the VM dashboard and click Remote Console on the left nav menu.
- **Open Remote Console for multiple VMs (in separate tabs)**: Select VMs in the Virtual Machines listing, click Remote Console on the left nav menu. (This can be blocked by some pop-up blockers.)

## Cloning a VM

The cloning feature allows you to create a new VM instance as a replica of an existing VM (with or without same MAC addresses). This can come in handy for a variety of uses: testing, deployment, data recovery, etc. Cloning a VM in VergeOS is nearly instantaneous and an easy process.

!!! tip
    While cloning allows you to make a simple copy of a VM, [Recipes](/product-guide/VM-Recipes) empower you to generate new custom VM instances based on a template VM; recipe questions provide for adjusting details per instance, as it is created, such as IP address, guest username/passwords, allocated resources, etc.

### To Clone a VM:

1. When possible, **stop the VM** before cloning it.
2. From the **VM Dashboard or on the Virtual Machines listing** page with a VM selected, select **Clone** from the left menu.  
   The name of the source VM along with the resources (cores/RAM, OS, # of drives, and # of NICs) is displayed.
3. The **VM Name** will default to original VM Name + "clone"; the name can be changed as desired.
4. By default, a new unique MAC address (different from the source VM) is created for each NIC device in the new instance. The "Preserve MAC Addresses" option can be enabled to copy MAC addresses from the original VM to the new clone instance. 
5. Click **Submit**. The VM instance is created and the new VM's dashboard page appears.

!!! warning
    The Preserve MAC address setting should be used with caution to avoid duplicate addresses running on the same network, which will cause problems.

## Deleting a VM

Considerations when deleting a VM:

- The system will not allow a VM to be deleted if it is running.
- A VM that is currently the basis of a VM Recipe cannot be deleted.
- Deleting a VM will also delete its VM snapshots; however, the VM will still be included in Cloud Snapshots that were taken while the VM existed.
- The VM must be powered down before it can be deleted.

## Power off / Reset / Kill power

It's important to understand the different behaviors of the Power off / Reset / Kill power commands for VMs.

- **Power off** - This issues an ACPI command to the VM and relies on ACPI being enabled and configured within the guest OS. Power off initiates a graceful shutdown of the VM. Before putting a server into production, it is recommended to test a Power Off operation from the VergeOS user interface (while a user is logged into the guest OS as well as when no user is logged in). 

- **Reset** - Exits the guest operating system, returns to virtual bios, but never powers off the virtual hardware. Unlike Power cycle, reset does not relinquish its virtual resources. Some hardware changes will require a power cycle as opposed to a reset in order to take effect.  

- **Kill Power** - This option should only be used when it is not possible to access the guest OS for graceful shutdown (e.g. the guest OS crashed or locked). This would be equivalent to pulling the power plug on a bare metal machine.

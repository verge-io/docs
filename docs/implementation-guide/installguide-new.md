
# DRAFT -- New Installation Guide


This document provides general instructions for installing a VergeOS system.   <!-- VergeOS is designed to be flexible for different environments.  --> 
For production systems,  use datacenter-quality hardware and following [**Reference architecture Recommendations**](/docs/implementation-guide/concepts).


## Installation Workflow



![installflow.png](/docs/assets/installflow.png)


The VergeOS installation is a single [bootable ISO image](/docs/implementation-guide/install-media) containing all packages needed for a complete VergeOS system.  



## Preinstall
### Network
- Establish the networks that will be used for your new Verge system and check your network cabling. Verify each node is connected to each core fabric switch. 

- Prior to installing a node, **identify the MAC address for each NIC** and the network to which it will be connected (Core Switch1/Core Switch2/External/Maintenance, etc.).

 - If necessary, have **VLAN id(s)** available to specify during install. PVID ports are always preferred, but vlan tags can be accommodated where necessary.


### Server BIOS settings
Proper BIOS settings will help towards ensuring successful VergeOS operation. 
These BIOS settings should be verified on each node prior to install: 

- Virtualization enabled 
- All storage adapters and/or RAID cards set to JBOD




## Installing the Primary Controller Node 
!!! warning "VergeOS is installed as a complete operating system.  Selected drives are formatted and existing data on those drives will be lost." 

- **Boot** the first node with the VergeIO install ISO.  The full installer will load into memory. The loading progress is indicated on the screen. Loading times will vary depending on the medium used to install.  
- Select **Standard Install** (default).  This is the default selection; the install process will automatically continue with this selection.  Non-standard install options should only be selected when you are working closely with VergeIO Support.

- Select **Controller** (default selection). (The first two nodes of the system will be controller nodes.)
- Select **Yes** to indicate this is a **new install**.
- Select appropriate **Timezone, NTP, date and time settings**.  
<!-- possibly put in something here about importance of correct time here and what is involved in adjusting time later when the system is in operation.  Are the default NTP server entries good enough normally? -->
- Enter a **System Name**.  This will be the name of your cloud and appears in your dashboard, alerts and reports coming from this system and system-to-system synch configurations. System name can be changed post-install from within the UI. 

- Enter **admin user credentials and email address**.  Password must be at least 8 characters. These credentials can be changed post-install, however it is important to have username/password available for initial login to the system.

!!! warning "Make sure to note the admin user credentials established during install; without them you may be left with no way to access the system." 

- Enter **admin email address**.  This address is used for receiving subscription alerts and reports directed to the admin user.
<!--resetting the admin pw too? --> 

### Node Network Configuration:

<!--- Select the **Number of physical networks the system will be plugged into**.  This number defaults to the number of NICs detected.  If no port bonding is in use, you can simply accept this default number.  If bonding (LAG) is used on external network ports, this number would be reduced: bonded ports should only be counted as one physical network.  For example if two of the installed NICs will be employing LAG ports, the number of physical networks should be reduced by one. 

!!! tip "Configure physical networks to account for all the detected NICs in your server, even if the NIC is not currently plugged in or being used.  This will simplify configuration if you decide to use the NIC later on."-->


#### Configuring Physical Networks
This is where you will be telling the install about all the physical networks to which your node connects.  The following instructions will be reiterated to configure each separate physical network.
 <!-- possibly something here about the abstraction put in place for flexibility, ease of configuration...helps accomodate lots of different configuration options based on how many networks you will employ, use of vlans, bonded ports, etc.-->

Repeat the following steps to define all of the physical networks for the node. It is typically recommended, at a minimum to establish multiple physical Core networks for redundancy.  

<!-- Keyboard hints here --> 
- A list of all detected NICs is displayed.  **Select a NIC (or multiple NICs,for port-bonded)**, to configure the associated physical network.  Port bonding (LAG) is not recommended for core networks as the VergeOS system utilizes built-in redundancy based on multiple physical core networks.
<!-- additional here about how the LAG could interfere with core network operation?? -->

- **Network Settings:**
    * **Name** - This name will display in the VergeIO User interface for the physical network.  Enter a name that will help to identify where this NIC is plugged in, such as the switch hostname or organizational labeling scheme (such as rack location, etc.).  <!--any characters that should not be used? max characters?>

    * **Description** (optional) - Text can be entered here to provide any additional administrative information. 

    * **MTU** - The MTU setting must always be a value supported by the physical switching hardware.  For core networks, the MTU should be large enough to support the levels of tenancy that will be provided; the default is 9192,a setting that is compatible with many switches and will support about 5 levels of nested tenancy.   

!!! tip "When configuring external networks: The Internet standard MTU for most Ethernet networks is 1500.  The standard for VPN connections is 1400 bytes (will vary depending on the service.)" 
 
    * **Core-Network:** 
If a core network will reside here, the value needs to be "yes".  Otherwise, change the value to blank or "no"
<!-- verify blank can be used here -->

**VLAN** - PVID port is always preferred (0 or blank for none), but a vLAN tag can be accommodated by entering the correct vlan ID here.   


Repeat the above steps to configure all of your physical networks until every NIC has been assigned.  If there is a NIC that is not plugged in or otherwise not being used, it is still recommended to set it up; this will allow for easier configuration later should you decide to eventually use it.      

- Select a **physical external network that will provide UI/LAN/WAN access**. (Use [Space bar] to select/deselect ) 
!!! tip "During the installation, select a single external physical network to provide UI access.  If you would like to use multiple physical external networks for UI access, this can be configured post-install from within the UI."


- Enter appropriate **VLAN ID for the External/UI network**; leave blank for no VLAN id.  
!!! note "Use PVID port when possible (0 or blank)"


- Specify a **network address** for the external/UI network:
    * **Static:** Enter an address in CIDR format (for example 10.10.0.0/24).  You will also be prompted for the default gateway and DNS server address(es).
    * **DHCP:** An entry of blank or ‘dhcp’ allows the network to receive an external DHCP address.  Using DHCP will limit the network to a single IP address; this is typically appropriate for test or evaluation systems or storage-only systems. If DHCP is selected, you will also be prompted for the name/domain to be used by DHCP client.


- Enter **license server settings** (user name and password).  License server credentials are provided from your VergeOS sales or implementation representative.  These settings can be left blank and added later via the VergeOS UI.  <!-- verify this is true - that you just cannot run any VMs without licensing.> 

!!! note "Although license key credentials are not needed to complete the install, they must be in place to be able to run workloads or syncs on your installed system."


- Configure **Encryption settings**. (optional at-rest encryption).  This option is not reversible and cannot be changed post-install. Changing from encrypted to unencrypted or vice versa, would require a system rebuild.

    * If encryption is selected, you will be prompted for an **AES256 encryption key**.  
<!--What information do we need here - what does the key need to be?-->

    * Optionally, the install can **write the encryption key to a USB drive/dedicated device**.  Before selecting "Yes" to this option, make sure the USB drive/dedicated storage device is plugged in.  On the next screen, verify the intended device is selected before hitting <OK>.
<!-- information here about how to use that device.  Otherwise, is the encryption key entered manually upon coldstart of the system?
Also, include the information about how the key is not needed for maintenance mode, system updates, etc where a single node reboots at a time. 
to write the key does the usb device need to be inserted beforehand, or can you put it in right at this point?-->

- **Select drives that will be used in the vSAN**.  Detected drives are displayed/selected by default. Deselect any drives that should be excluded.  
Make sure to deselect any removable devices or any drives that will be used to store an optional encryption key.  The system will display an automatically selected tier for each drive in the list.  Take notice of these tier assignments; automatic drive tier assignments can be modified in a subsequent dialog, if desired.

!!! warning "Selected drives display an asterisk; make sure any drives that you want to deselect do not have the asterisk on the far left before hitting <OK>. "

- **Change Drive Tier Assignments (optional)**
If you verified all drive tiers were selected as desired (previous screen), simply [Enter] to proceed.  Otherwise, select < Yes >
 and [Enter] to view all drives and optionally change any tier assignments.
<!-- Do we want to include any warnings or considerations here?
Need to define the similar geometry of drives for a tier.  
*Do we want to recommend that they change a tier to accommodate meta tiering??
Note: detected tier shows to the far right, tier selection shows in the parentheses.
Why does my virtual system show tier4, but automatically setting them to tier3? -->


 - Configure **Swap**: There are multiple factors to consider in planning swap including: availability of storage, system use, disk type, etc. Consult with the VergeIO implementation team for further information. <!--Development should discuss this and come up with recommendations/best practices for this -->


<!-- UEFI partitions?  asks and you should say yes?  Any notes or cautions here? -->

When installation selections are finalized, the vSAN is initialized and packages are installed.  Each selected drive is formatted one by one (large drives may take several minutes to format) and added to the vSan.

When the install is complete, remove the install media and hit [Enter] to reboot. 

### After Reboot 
Press [Enter] to select **User Interface**. This will bring you to the main dashboard for your new system.  The dashboard should display all green status indicators.  


## Install Secondary Controller Node
!!! note "The primary controller node needs to be fully installed and booted before installing the secondary controller node."  

- Select controller (default selection)
- Select **No** to indicate this is a new install **(Not a new system)**.  

!!! warning "Important: MMM it will try to create a new separate system rather than joining the system already established with the installed primary node controller."

- Enter the **admin credentials** created on the previous (primary controller node) installation.  You will be prompted to enter the admin (root) password for the system you are joining.


- Select **Yes** to attempt automatic detection of existing network configuration.  This is recommended as it will attempt to detect the installed core network and automatically configure the new node accordingly, avoiding manual network misconfigurations.  Network detection may take a minute or two.

Upon successful detection of the core network (configured on the previous install) information for the associated NIC will display.  **Verify** this is the correct NIC to connect to the first core network and click **Yes** to continue automatic network configuration.   
<!-- Later we should include a link to troubleshooting information when it does not successfully detect the networks, for ex:  double check configuration and physical connections and restart install as needed - either primary controller again or reseat cables and restart secondary controller node install. -->

- Select **Encryption settings**; these settings must match those entered during the primary controller installation. 

- Select **drives that will be used in the vSAN** and **(optionally) change Drive Tier assignments**; these selections should be made to coincide with the drive/tier configurations made on the of the primary controller node (previous install). 
<!-- include more detailed info here - what other guidance can we provide here about matching the drive assignment?  maybe a link here to explain the need for like-geometry on drives?--> 

- When the install is finished, remove install media and hit [Enter] to reboot.
 

### After Reboot 
- Wait for the node to finish rebooting.
- Log into the user interface to verify green status indicators before proceeding with a subsequent node install.  



## Install Additional Nodes (as needed)
Additional nodes can be installed as needed. These nodes can be:

* Scale-out: Member nodes that expand the vSAN storage
* Compute: Compute-only nodes without vSAN (boot device only)
* PXE: Compute nodes that boot from a network boot image (no local boot device). PXE nodes can be storage nodes or compute-only nodes. 

<!-- add any additional information needed for these install types, either here or link to separate pages. -->



## Next Steps (after Node Installations)
When node installations are complete, see [**Post Installation**](/docs/implementation-guide/post-installation) for next steps.   

  










 








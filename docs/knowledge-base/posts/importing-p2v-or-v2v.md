---
title: Importing a Physical/Virtual Machine into VergeOS
slug: importing-a-physicalvirtual-machine-into-vergeio
description: 
published: true
date: 2024-02-07T14:21:34.627Z
tags: vtov, ptov, p2v, v2v, import, migrate, clone
categories:
  - Migration
editor: markdown
dateCreated: 2022-08-10T19:18:14.014Z
---

## How to import Physical/Virtual Machines into VergeOS 
**Clone ISO Transfer Utility**
ISO Version 4.8.2

The VergeOS Clone Utility (VergeOS-clone.iso) can be used to import external servers (physical or virtual) into VergeOS virtual machines.  Zero block detection is used in transferring source drives, providing efficiency as only used blocks require transfer.  The VergeOS Clone Utility is recommended for PtoV imports (importing physical computers) and non-VMware VtoV (importing existing virtual machines). The VergeOS VMware connector is recommended for importing VMware virtual machines.

### Prerequisites

1. **VergeOS System (destination):**
	-   Network URL that can be accessible from Source VMs to be imported.
	-   VergeOS username/password with permissions to create VMs
	-   Adequate available vSAN storage for cloned VM drives (Note: VergeOS vSAN global deduplication handles zero blocks; thus, only actual used drive space is required.) 
	-   Although not necessary for the clone-import process, adequate resources (RAM/CPU) will need to be available on the destination system to run imported VMs.

1. **VM/Physical Machine to Clone (Source):**
	-   Network connection (attached to a network that can reach the destination system)
	-   Attached USB/CD-ROM device (containing VergeOS -clone.iso)
	-   Minimum 1GB RAM (to boot from/run the iso)

1. **Determining Appropriate Sync Method**
The appropriate sync method to use will depend on the nature of the network connection between the Source VM and the destination system. 

1. **Https Upload**
Transferring using this method has minimal network configuration requirements. This transfer method is automatically selected by default. 

1. **vSAN-direct Sync**
The vSAN-direct sync method can be used for optimum throughput over a LAN connection. It is not intended for WAN connections.

1. **vSAN-direct syncs are only allowed to the host system (not directly to a tenant)** 
This method provides for faster transfer speeds but involves additional network requirements. The vSAN-direct method can be selected under **Advanced** settings from the confirmation screen (last dialog). 

1. **Additional Network Requirements for vSAN-direct Sync method:**
	- 	Source side static IP
	- 	Destination VergeOS system static IP
	- 	NAT and SNAT rules on the UI(external) and core networks of the VergeOS system
<br>

### Obtaining the VergeOS-clone.iso File

1. From the **Main Dashboard**, click **Backup/DR** on the left menu.
2. Click the **Add Clone ISO** button in the Clone ISO Utility section. 
   ![cloneisoutility.png](/docs/public/cloneisoutility.png)

3. The Clone ISO dialog appears, giving options for the creation of a public download link for the ISO file: 

-   **No** No public download link is created.  The Clone ISO will only be downloadable from the VergeOS UI.
-   **Yes, make the link Anonymous (UUID) (default selection)** - creates a public download link with GUID (128bit long number) 

*(ex: https://Verge.example.com/273b5d6a--b205-1e1b-6ae6-01cfa7cj1233)*

-   **Yes, use the filename as the link -** creates a public download link using the original file name *(ex: https://verge.example.com/VergeIO -clone.iso)*
-   **Yes, specify a custom name -** creates a public download link with file name entered *(ex: https://verge.example.com/myfilename.iso)*
   ![enablecloneiso2.png](/docs/public/enablecloneiso2.png)

4. Click **OK** after selecting the desired option. The build process may take a few minutes to complete.  

   ![enablecloneiso3.png](/docs/public/enablecloneiso3.png)

5. Once the build is complete, the Clone ISO section will show a Ready status. Additionally, the version, public link (if applicable), and the build date/time will display.    
> **Note:** the copy icon next to the public link field can be used to copy the URL to the clipboard.  
{.is-info}

6. Download the ISO; it can now be downloaded from: 

-   Within the VergeOS UI
    \-OR-
-   The public link (if created)

The bootable Clone ISO can be used on CD or USB. See [bootable-usb](/docs/public/kb/bootable-usb) for instructions on making a bootable USB. Substitute the Clone ISO.
<br>

### Using the VergeOS Clone Utility

1. Power down the source computer and **boot from the Clone ISO** ( VergeOS-clone.iso)
1. Hit <kbd>Enter</kbd> or allow the clone utility to boot automatically. 

   ![enablecloneiso4.png](/docs/public/enablecloneiso4.png)

3. Select **Launch Clone Utility**.

   ![enablecloneiso5.png](/docs/public/enablecloneiso5.png)

4.  Hit <kbd>Enter</kbd> to confirm the introduction message. 

   ![enablecloneiso6.png](/docs/public/enablecloneiso6.png)

5.  **Select the NIC** to be used to connect to the destination VergeOS system.  Only one NIC is selected for connecting to the destination; however, all NICS from the source system are brought over in the VM import. 

   ![enablecloneiso7.png](/docs/public/enablecloneiso7.png)

6. Select the appropriate choice (**DHCP or Static**) for the connecting network. 

   ![enablecloneiso8.png](/docs/public/enablecloneiso8.png)

### Static IP configuration

 If static IP configuration is selected, use **up/down ↑/↓ arrows** to select different fields. The selected field is highlighted in blue. Hit <kbd>Enter</kbd> while a field is selected to modify that field. Once all the static fields are configured as needed, use arrow keys to highlight the **Done** option and <kbd>Enter</kbd> to proceed.  

   ![enablecloneiso9.png](/docs/public/enablecloneiso9.png)

   ![enablecloneiso10.png](/docs/public/enablecloneiso10.png)

1. Enter the VergeOS system's URL (hostname or IP address).

2. Enter VergeOS username and password. 
  >**Note:** The user must have permission to create and modify virtual machines to complete a clone import.
{.is-warning}

   ![enablecloneiso11.png](/docs/public/enablecloneiso11.png)

   ![enablecloneiso12.png](/docs/public/enablecloneiso12.png)

3. A success message displays if the utility successfully connects to the VergeOS system. 

   ![enablecloneiso13.png](/docs/public/enablecloneiso13.png)

<br>

### Clone Utility Troubleshooting

Enter a name for the VM (the name given to the VM created on the VergeOS system). 

   ![enablecloneiso14.png](/docs/public/enablecloneiso14.png)

Use arrows and spacebar to **select/deselect drives for import**. By default, the boot device containing the ISO (e.g., CD/DVD, USB) is not selected as it is not necessary to import the contents of the clone iso. Not selected drives are created as empty devices on the destination virtual machine.  

   ![enablecloneiso15.png](/docs/public/enablecloneiso15.png)
<br>

### Advanced Settings

> **NOTE: Use the following with EXTREME CAUTION. Adjusting the settings here can cause additional stress on your system and could cause performance issues. Contact VergeOS support for more information.**
{.is-warning}

Advanced options are accessed by selecting **Advanced** and hitting <kbd>Enter</kbd>.

   ![enablecloneiso16.png](/docs/public/enablecloneiso16.png)

   ![enablecloneiso17.png](/docs/public/enablecloneiso17.png)

**Send Threads -** number of parallel threads to use for clone transfer.
- Default=4

The default thread setting is optimized for typical WAN connections and usually does not need to be changed. However, threads can be increased to maximize bandwidth use in situations with high latency or over high-speed connections.

> **Note:** Setting threads too high can hurt performance.  
{.is-info}

**MAC addresses -** Clone existing or create new MAC addresses 
- Default = Clone (MAC addresses are duplicated from the Source)

**Local Network -** NIC selection for connecting to the VergeOS destination system.
- Default = Previously selected NIC

**Connecting Using vSAN -**  The method for transfer to destination VergeOS system
- Default = No (Use the standard https transfer method)

**Guest** - (legacy/deprecated) 

**Yes**/**Sync directly**  Use direct vSAN connection method. This method can provide faster transfers, allowing for writing directly to the VergeOS vSAN.  This method requires additional network configuration. Contact Support for more information.

   ![enablecloneiso18.png](/docs/public/enablecloneiso18.png)

1.  <kbd>Enter</kbd> while the **Start Clone** field is selected to confirm and begin the clone. 
2. Progress updates will display. As each drive is cloned, the number of bytes already transferred, percentage complete, transfer rate, and elapsed time of this drive transfer are reported. 

   ![enablecloneiso19.png](/docs/public/enablecloneiso19.png)

> **NOTE: Once the import is complete, before powering up VM for the first time in VergeOS , it is _highly recommended_ to take a snapshot. If needed, this will allow returning to the original version after any initial guest OS/driver changes are performed.**
{.is-info}

A Snapshot of an individual VM can be created using the **Take Snapshot** option on the left menu of the VM Dashboard.   

Taking a Snapshot before making any changes or booting the new VM for the first time will allow for rolling back a change if necessary.  Once it is verified that the new VM is booting successfully and no additional configuration or driver changes are needed, the Snapshot is no longer needed. 

## **Resuming a Clone import**

A Clone import that successfully started but did not complete (due to network disruption, for example) can be resumed.   

1. Boot the source computer from the VergeOS clone ISO again and follow the same process, ensuring to input the VM name exactly as it was the first time.  (The VM name can be verified on the destination VergeOS system in the **Virtual Machines** list.)

   ![enablecloneiso20.png](/docs/public/enablecloneiso20.png)

2.  Use the right arrow **→ key** or <kbd>Tab</kbd> to select the **Resume** option, and hit <kbd>Enter</kbd>.

   ![enablecloneiso21.png](/docs/public/enablecloneiso21.png)

The clone import will continue from where it left off. 

## Rebuilding the Clone ISO

The Clone ISO can be rebuilt to take advantage of code updates.  

**To manually initiate this process:** 

1. Click **Backup/DR** on the left menu from the Main Dashboard.
2. Click **Edit Clone ISO** on the left menu. 
3. Check the **Force Rebuild** checkbox.
4. Click **OK.**

The rebuild may take a few minutes. While in process, the status will indicate "Building."

   ![enablecloneiso22.png](/docs/public/enablecloneiso22.png)

The status will change to "Ready" when the ISO build is complete. 

Rebuilding the ISO can be automated. Some customers opt to update the clone ISO anytime the system is updated.

**To schedule automatic ISO rebuilds:**

1. Click **System** on the left menu from the main dashboard.
2. Click **Tasks/Events** on the left menu. 
3. Click **New** on the left menu. 
4. Configure the task as shown to automatically rebuild the ISO each time the VergeOS system is updated :

   ![enablecloneiso23.png](/docs/public/enablecloneiso23.png)

1. Click **Submit** to save the new task.

## **Direct vSAN Network Configuration**

**Direct vSAN transfer method is provided for use over local networks; it is not intended for use over WAN connections.**

**Direct vSAN transfer method can only be used to transfer to a root system (not directly to a Tenant).**

To use the vSAN Mount (direct sync) method of the Clone ISO utility, three networking rules must be in place (2 on the core network and 1 on the external UI network).

The following section outlines the network rules for a system to accept a Clone ISO transfer using the direct vSAN method.  Some of these rules may already be in place for a VergeOS system that has been configured to accept incoming syncs.  

### Core Network  Rule - 14201 PAT Rule

*Note: For systems already configured for accepting incoming syncs, this Rule may already be in place.*

-   **Name (required):** ex: “vSAN PAT”
-   **Action:** _Translate_
-   **Protocol:** _TCP_
-   **Direction:** _Incoming_
-   **Source:** _Any / None (default)_
-   **Destination Type:** *_Custom_ \***Custom Filter:** _ui_* **Destination Ports:** *_14201_*
-   **Target Type:** *_IP/Custom_   **\*Target IP:** _ui_* 

 *\*  UI is a VergeOS keyword; it must be entered in lower case, exactly as noted.*

   ![enablecloneiso24.png](/docs/public/enablecloneiso24.png)


### Core Network SNAT

-   **Name (required):** ex: “vSAN SNAT for Clone Utility”
-   **Action:** _Translate_
-   **Protocol:** _TCP_
-   **Direction:** _Outgoing_
-   **Interface**: _Router_ 
-   **Source:** _Any / None (default)_
-   **Destination Type:** *_My Network Address_*  **Destination Ports/Ranges:** *_14201_*
-   **Target Type:** *_My Router IP_*

The new rules will appear in the Rules list for the Core network.

Click **Apply Rules** on the left menu to put the new rules into effect.

### External Network - 14201 PAT rule

-   **Name (required):** ex: “vsan PAT”
-   **Action:** _Translate_
-   **Protocol:** _TCP_
-   **Direction:** I_ncoming_
-   **Source:** Source IP/IP range from which clone transfer will come. ***Note:** It is important to include a source IP/Network here in order to restrict incoming 14201 traffic to only valid sync/clone transfer sources.* 
-   **Destination Type:** *_My Router IP_*   **Destination Ports/Ranges:** *_14201_*
-   **Target Type:** *_IP/Custom_*   **Target IP:** *_ui_  **(**This is a VergeOS keyword; it must be entered in lower case, exactly as noted)*

The new External vSAN Rule will appear in the Rules list for the External network.

Click **Apply Rules** on the left menu to put the new rule into effect.

## **Clone Utility Troubleshooting**

**ISSUE: Failed DHCP**

DHCP option was selected, but no DHCP service was found

   ![enablecloneiso25.png](/docs/public/enablecloneiso25.png)

-   Verify there is a DHCP service available via the selected NIC.
-   Verify the selected network actually has a connection.  

**ISSUE: Login failed message**

   ![enablecloneiso26.png](/docs/public/enablecloneiso26.png)

-   Verify input of correct username and password 
-   The Login failed message can also appear when there is an issue with network connection or URL.  Verify input of correct VergeOS system host/IP address. 
> **Note:** The address should be entered without preceding "https://"
{.is-warning}

-   Verify static IP configuration information (if applicable)
    -   The IP address and gateway must be valid addresses for the attached network. Note: The IP address must be entered in CIDR notation (e.g. 192.168.0.50/24).
    -   Verify that there are no IP conflict with the used IP address.
    -   The correct DNS address must be used to connect the VergeOS system via hostname.
-   Verify underlying network connection. Boot the computer without the clone ISO to test reaching the VergeOS host/IP address; confirm connection over specific NIC, using the same configuration (e.g., DHCP or static addressing).

**ISSUE: OpenSSL errors during the transfer**

OpenSSL errors during the transfer indicate a network issue. The clone operation will retry and can often recover from an OpenSSL error. The clone operation will abort if timeout or number of retries threshold reached.

   ![enablecloneiso27.png](/docs/public/enablecloneiso27.png)

-   A possible cause for sporadic OpenSSL errors, can be MTU size mismatches. Verify the MTU configuration on connecting networks.  

If a network issue causes a clone import to fail before finishing: a partial clone import can be restarted where it left off by:

-    Resetting the machine and booting again from the VergeOS Clone ISO

\-or- 

-    Use the <kbd>ESC</kbd> key to return to the command line and use the command: 
`/usr/bin/VergeIO -clone-vm.sh`

**ISSUE: Permission denied**

If the VergeOS user provided does not have adequate permissions, the clone will begin and create the new Virtual Machine record; however, it will not be able to create any VM drives or NICs.

   ![enablecloneiso28.png](/docs/public/enablecloneiso28.png)

-   Restart the clone ISO providing username/password of a VergeOS user with List, Read, Create and Modify permissions to Virtual Machines.
> **Note:** Since the empty VM will have been created on the destination VergeOS system (when run initially without adequate permissions): when run again with proper permissions, the clone operation can be performed as a resume, or the VM can be removed on the destination system before starting the clone again.  
{.is-info}

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
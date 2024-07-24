---
title: Product Guide - Creating Virtual Machines (VMs)
description: Description of the 4 different methods of creating a VM (custom, from recipe, import, clone) ; general instructions for custom, recipe and clone methods
published: true
date: 2023-06-28T13:50:29.003Z
tags: 
editor: markdown
dateCreated: 2023-04-08T00:27:35.821Z
---

# Creating Virtual Machines (VMs)

There are multiple methods to Create a VM

-   [**Create a Custom VM**](#create-a-new-custom-vm)
A blank custom VM is created without drives or NICs. (Drives and NICs can be added after VM creation.) A guest operating system can be installed by adding a CD-ROM device with media file set to a bootable install ISO or adding an import disk that has OS installed. See [**Virtual Machine Drives**](/public/ProductGuide/VMdrives) and [**Virtual Machine NICs**](/public/ProductGuide/VMNics) for help in adding drives/NICs.
<br>

-   [**Create a VM from a Recipe**](#create-a-vm-from-a-recipe)
The VM is created using a predefined recipe; recipes are VM image templates that allow quick launching of new VMs with a preloaded operating systems, applications, configuration info., etc. Recipes allow for very quick and convenient launching of new instances of machines with various preloaded software and configurations. Recipes can contain questions to be asked at the time of creation to customize each instance (such as drive sizes or RAM amount). Some service-VM recipes are included in your installation; your Service Provider may also provide recipes. Every VeregOS Cloud can create and use their own local recipes as well.
<br>
-   [**Import**](/public/ProductGuide/importingVMs)
VM is created from a standard format configuration file (e.g. OVF, VMX, XML, etc) with associated drives created from disk image files, such as \*.VMDK. See: [**VM Import Methods**](/public/ProductGuide/importingVMs)
<br>

-   [**Create a VM from a Clone**](#create-a-vm-from-a-clone)
A new VM instance is launched as a copy of an existing VM. A clone, by default, will be given different MAC address(es) than the original VM allowing the clone to run in the same network as the original VM without causing an IP conflict; optionally, MAC addresses can be preserved when needed.

<br>
<br>


## Best Practices

**Review [**Virtual Machine Best Practices**](/public/ProductGuide/VMbestpractices) for important considerations and recommendations regarding creating VMs.**

<br>
<br>

 
<a name="custom"></a>
## Create a new Custom VM

> Creating a new Custom VM will require an *.iso file or a startup USB image file (e.g. created from a hybrid image) for booting/installing the guest OS.  See [**Uploading to the vSAN(Media Images)**](/public/ProductGuide/uploadingtovSAN) for instructions on uploading these files to the vSAN. {.is-success}


1.  From the Cloud Dashboard, click **Machines** on the left menu.
2.  Click **Virtual Machines** from the menu or click the Virtual Machines quick-link on the dashboard.
3.  Click **New** from the left menu.
4.  From the options list on the left, select **\-- Custom --**.
    -   ***"Custom VM"*** will now display under the selection area on the right and will be the selected item.*
5.  Click **Next** (bottom of the screen).
6.  Enter/select fields as appropriate for the desired VM. Virtual Machine Field Descriptions are available [**here**](/public/ProductGuide/VMfielddescriptions).
7.  When fields are completed, click **Submit**.
8.  A message should appear indicating the VM was created successfully and stating drives and NICS can now be created for the VM. Click Ok to see the Dashboard page for the VM.
9.  Add drives to the VM as needed. See [**Virtual Machine Drives**](/public/ProductGuide/VMdrives)  for instructions.
10.  Add NICs to the VM as needed. See [**Virtual Machine NICs**](/public/ProductGuide/VMNics) for instructions.

<br>
<br>

<a name="recipe"></a>
## Create a VM from a Recipe
> Recipe files may be available for download from your VeregOS Service Provider's Repository.  Each Tenant is also able to create and use its own VM recipes.{.is-success}

1.  From the Cloud Dashboard, select **Machines** from the menu or click the Machines quick-link on the dashboard.
2.  Click **Virtual Machines** from the menu or click the Virtual Machines quick-link on the dashboard.
3.  Click **New** from the left menu.
4.  A list of Available Catalogs displays at the top of the Options list on the **left**. ***Select a Catalog*** from the list.  As different Catalogs are selected on the left, a list of recipes contained in the selected Catalog displays on the right.
5.  **Select the desired recipe** from the ***Selections Available*** list on the **right**.
6.  Click **Next** (bottom of the screen).
7.  Enter/select fields as appropriate for the desired VM. Specific entry fields will vary per recipe; See [**Virtual Machine Field Descriptions**](/public/ProductGuide/VMfielddescriptions) or consult with the service provider or recipe publisher for more information regarding specific entry fields. 
8.  When fields are completed, click **Submit**.
9.  A message should appear indicating the VM was created successfully and stating drives and NICS can now be created for the VM. Click ***Ok*** to see the Dashboard page for the VM.
10.  Typically, VM drive(s) and NIC(s) will be included in the VM recipe. Additional drives and NICs can be added to the VM as needed: See [**Virtual Machine Drives**](/public/ProductGuide/VMdrives) and [**Virtual Machine NICs**](/public/ProductGuide/VMNics) for instructions. 

<br>
<br>

<a name="clone"></a>
## Create a VM from a Clone

1.  From the Cloud Dashboard, select **Machines** from the menu or click the Machines quick-link on the dashboard.
2.  Click **Virtual Machines** from the menu or click the Virtual Machines quick-link on the dashboard.
3.  Click **New** from the left menu.
4.  Select **\--Clone--** from the Options list on the left. The Selection list on the right will now be populated with **a list of all existing VMs**.
5.  **Select the VM to clone** from the Selections Available list (on the right),
6.  Click **Next** (bottom of page).
7.  The ***VM Name*** will default to the original VM Name + "clone"; however, **the name can be changed** as desired.
8.  By default, the new clone instance will employ unique MAC address(es) that are different from the source VM (for all NIC devices). **"Preserve MAC Addresses"** option can be enabled in order to copy MAC addresses from the original VM to the new clone instance; however, this option should be used with caution as NICs with duplicate addresses running on the same network will cause problems.
9.  ***Preserve Device UUIDs*** can be checked to create the clone with same UUIDs as the original. VMs running with the same UUIDs may cause problems. Use this option only if required.
10.  ***Quiesce File System*** provides for an application-consistent clone of a VM that is in a running state. **(VeregOS Guest Agent must be installed and running on the VM.)**  
    When the option is selected: if the source VM is running the file system is put into a state suitable for backups (i.e. notify VSS-aware applications, freeze filesystem. flush buffers, etc.)
11.  Click **Submit.**
12.  A message should appear indicating the VM was created successfully and stating drives and NICS can now be created for the VM. Click **Ok** to see the Dashboard page for the VM.
13.  VM drive(s) and NIC(s) from the original VM will automatically carry over to the cloned VM. Additional drives and NICs can be added to the VM as needed: see See [**Virtual Machine Drives**](/public/ProductGuide/VMdrives) and [**Virtual Machine NICs**](/public/ProductGuide/VMNics) for instructions.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}



<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
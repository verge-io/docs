---
title: Product Guide - Importing VMs from a NAS Volume
description: General instructions for importing a VM from a NAS volume (VM sync'd into a NAS volume to be imported);  not the recommended method for VMware imports
published: true
date: 2023-06-23T14:56:29.468Z
tags: 
editor: markdown
dateCreated: 2023-04-09T14:07:38.856Z
---

# Importing VMs from a NAS Volume

This method allows for the import of many VMs at once. It does not require uploading any files to the vSAN, but rather, allows for pulling data from an NFS or CIFS share. Note: For production, live, VMware environments, it is best to utilize the VMware Service to [**Import from a VMware Backup Job**](/product-guide/importvmware)

> Import should be performed from VMs that are powered down. {.is-warning}

<br>


## Import from Volume

1.  To utilize an external NFS or CIFS share for VM import, the external source must be set up as a **Remote Volume** in the NAS. See [**Remote Volumes**](/product-guide/nasremotevolumes) for instructions.
2.  From the Cloud Dashboard, select **Machines** from the menu or click the Machines quick-link on the dashboard.
3.  Select **New VM** from the left menu.
4.  Select Type of (on the left), **\--Import from Volume--**.
5.  Existing Volumes are displayed on the right. Click to **select the appropriate CIFS/NFS Remote Volume**.
6.  Click **Next** (bottom of the screen).
7.  The screen will display existing folders within the selected NAS volume. ***Select folders*** where the desired VM files reside.  VMs will also be imported from subdirectories of selected folders. (Click the top left checkbox to select all folders in the Volume.)
8.  Click **Next** (bottom of the screen).
9.  The import job is given a default name of "Import Volume" + *NameofVolume*. **Import job Name can be changed.** as desired.
10.  By default, ***MAC Addresses*** will be preserved (MAC addresses will stay the same as the source VMs from which they are imported); this is typically recommended to avoid necessary reconfiguration with the guest OS. If this option is unselected, the system will generate new, unique MAC addresses for all NICs.
11.  ***Preferred Tier*** can be selected or left at **\--default--**. This determines the tier first attempted for VM storage. The [**Preferred Tiers**](/product-guide/preferredtiers) page provides a detailed explanation of Preferred Tier.
12.  When fields are entered as desired, click **Submit**.
13.  The import is initiated and the **Import Job Dashboard** will appear. The following information (as well as additional data) is provided:
  -   ***Status*** (Initializing/Importing/Complete)
  -   ***Created Date***
  -   ***Child Import Jobs List***, a child job for each individual VM, with:
  		-   status, status messages if applicable, VM name, source volume, preferred tier, preserve MAC setting, Created and last update date/time
   -   ***Job Logs***
   -   ***Number of completed Child Jobs(VMs) / total number of Jobs (VMs) detected***
   <br>

See [**Viewing Import Jobs**](/product-guide/viewimportjobs)  for more information on viewing the details of an import job.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}



<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }


# Importing VMs from a VMware Service Backup Job

This is the recommended method for importing a number of production VMware VMs. The VergeIO VMware service creates a direct agent connection to a VMware environment and provides for synchronizing backups of running VMs to VergeIO.

Typically, for import: a backup operation is run multiple times while VMs are still running in production. After the backup job runs one or more times, the duration of each backup job should begin to decrease. When backup job durations start to level off (e.g. backup duration is about the same each time) one last backup is performed while the VMs are powered down and then the import operation is completed using that backup job (directions below).

<br>


## Import from Backup Job (VMware Service)

> **The following directions cover importing from an existing VMware backup Job**. See the [**VMware-Backup-DR-Guide**](/public/kb/vmware-backup-dr-guide) for full instructions to configure the VMware Backup service.{.is-info}

1.  From the ***Main Dashboard***, click **Backup/DR** on the left menu.
2.  Click **VMware** on the left menu.
3.  **Double-click the appropriate VMware service** in the listing.
4.  Click **Backup Jobs** on the left menu.
5.  **Double-click the desired Backup Job** in the listing.
6.  Click **Import VMs** on the left menu.
7.  All VMs that were included in the backup job are selected, by default. **Individual VMs can be deselected to exclude from the import, if desired.**
8.  By default, the ***Preserve MAC Addresses*** option is selected, which will carry over MAC addresses. Typically, this is the preferred setting to avoid necessary network reconfiguration within VM (guest OS will see new MAC addresses as new network devices). This option can be deselected to create new MAC addresses on the imported VMs, if needed.
9.  Select ***Preferred Tier***, or leave at **\--default--**. This determines the tier first attempted for VM storage. See the [**Preferred Tiers**](/public/ProductGuide/preferredtiers) page for more information.

See [**Viewing Import Jobs**](/public/ProductGuide/viewimportjobs) for instructions on viewing the details of an import job.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
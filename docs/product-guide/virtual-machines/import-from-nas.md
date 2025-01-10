# Importing VMs from a NAS Volume

This method allows for the import of many VMs at once. It does not require uploading any files to the vSAN, but rather, allows for pulling data from an NFS or CIFS share. Note: For production, live, VMware environments, it is best to utilize the VMware Service to [**Import from a VMware Backup Job**](/product-guide/virtual-machines/import-from-vmware)

!!! warning "Import should be performed from VMs that are powered down."

!!! info "NAS Import is only for VMs, not disks. This process is for VMX or OVF files only. Any other formats will need to [Import from Media Images](/knowledge-base/import-vms-from-media)."

## Import from Volume

1. To utilize an external NFS or CIFS share for VM import, the external source must be set up as a **Remote Volume** in the NAS. See [**Remote Volumes**](/product-guide/nas/nas-remote-volumes) for instructions.
2. From the cloud Dashboard, select **Machines** from the menu or click the Machines quick-link on the dashboard.
3. Select **New VM** from the left menu.
4. Select Type of (on the left), **--Import from Volume--**.
5. Existing volumes are displayed on the right. Click to **select the appropriate CIFS/NFS Remote Volume**.
6. Click **Next** (bottom of the screen).
7. The screen will display existing folders within the selected NAS volume. ***Select folders*** where the desired VM files reside. VMs will also be imported from subdirectories of selected folders. (Click the top left checkbox to select all folders in the volume.)
8. Click **Next** (bottom of the screen).
9. The import job is given a default name of "Import Volume" + *NameofVolume*. **Import job Name can be changed** as desired.
10. By default, ***MAC Addresses*** will be preserved (MAC addresses will stay the same as the source VMs from which they are imported); this is typically recommended to avoid necessary reconfiguration with the guest OS. If this option is unselected, the system will generate new, unique MAC addresses for all NICs.
11. ***Preferred Tier*** can be selected or left at **--default--**. This determines the tier first attempted for VM storage. The [**Preferred Tiers**](/product-guide/vsan/preferred-tiers) page provides a detailed explanation of Preferred Tier.
12. When fields are entered as desired, click **Submit**.
13. The import is initiated and the **Import Job Dashboard** will display. The following information (as well as additional data) is provided:
    - ***Status*** (Initializing/Importing/Complete)
    - ***Created Date***
    - ***Child Import Jobs List***, a child job for each individual VM, with:
        - status, status messages if applicable, VM name, source volume, preferred tier, preserve MAC setting, Created and last update date/time
    - ***Job Logs***
    - ***Number of completed Child Jobs(VMs) / total number of Jobs (VMs) detected***

See [**Viewing Import Jobs**](/product-guide/virtual-machines/view-import-jobs) for more information on viewing the details of an import job.

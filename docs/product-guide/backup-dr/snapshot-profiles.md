# Snapshot Profiles (Snapshot Scheduling)

A **snapshot profile** defines a schedule for taking snapshots and automatically expiring them based on retention settings.


## Default Snapshot Profiles

Multiple, default snapshot profiles are created by the VergeOS installation. These profiles can be modified, and you can create additional profiles to provide custom scheduling. 


??? "Snapshots Profiles Included with Installation" 
    The following are default snapshot profiles automatically created at system installation.  
    ### **SOX (Sarbanes-Oxley)**  
       * Yearly snapshots retained for 7 years  
       * Monthly snapshots retained for 1 year  
       * Weekly snapshots retained for 31 days  
       * Daily snapshots retained for 7 days  

    ### HIPAA (Health Insurance Portability & Accountability Act)  
    * Yearly snapshots retained indefinitely (no expiration)
    * Monthly snapshots retained for 1 year  
    * Weekly snapshots retained for 31 days  
    * Daily snapshots retained for 7 days  

    ### NAS Volume Syncs
    * Daily (at 6pm) snapshots retained for 3 days

    ### *System Snapshots (Default Profile for entire-system snapshots)
    * hourly snapshots retained for 3 hours 
    * Daily-at midnight snapshots retained for 3 days
    * Daily-at noon snapshots retained for 1 day

    * profile assigned at installation to take full snapshots of the entire system according to this schedule. 
    * More detail about system snapshots can be found at: [System Snapshots and Restores](/product-guide/backup-dr/system-snapshots)

## Creating a Custom Snapshot Schedule (New Snapshot Profile)

1. Navigate to **System** > **Snapshot Profiles** 
2. Click **New** on the left menu.
3. Enter a descriptive **Name** for the new profile.  (e.g. Webservers, premium tenants, weekly-quiesce,  etc.)
4. Optionally, you can enter additional **Description** information.
5. Click **Submit** to save the profile.   
6. The new snapshot profile is created.   
**Add profile periods** to implement a schedule within the profile.   

!!! tip "After creating a new snapshot profile, its dashboard opens automatically, where you can create new periods.  To return to this page later, navigate to: **System** > **Snapshot Profiles** > **double-click the profile**." 

## Profile Periods

A profile period defines both the frequency and retention for snapshots. Adding multiple periods allows incorporating various frequencies and retentions within the same profile.
     
**To Add a Period**: 

* Click **Add Period** on the left menu. 

### Profile Period Configuration 
* **Snapshot Profile**: Pre-selected when accessed from the snapshot profile dashboard. 
* **Name**: (required). Enter a descriptive name to identify the period (ex: weekly, 6pm, Mondays, etc).
  
* **Frequency**: defines how often snapshots are taken.
    * Options include ***Month, Day of Month, Day of Week Hour, Minute***.
    * Available fields vary based on the frequency selected
    * ***Custom*** allows specifying a one‑time execution at an exact date and time. 


* **Retention**: Specifies how long to keep snapshots before automatic expiration.
    * Enter a **(value)** and select **Units**: *Days*(default),* Hours*, *Years*, *Forever* (retained indefinitely) 
     
!!! warning "Long‑term or indefinite retention can significantly increase storage usage. Consider your data‑change rate and available storage when configuring retention."


* **Minimum Snapshots**: (default:1) Ensures a minimum number of snapshots are always available. 
    * Snapshots may be kept past expiration, if necessary to maintain the defined minimum. 
    * This helps to ensure there are available recovery points after prolonged outages by preventing automatic purging of an expired snapshot when there is no replacement snapshot. 

!!! tip "Snapshots kept past expiration to satisfy the minimum will be marked as "Held" and display "x days over" in the 'Time to Expiration' column. They are deleted only when a new scheduled snapshot replaces them or if manually removed."  
      
#### System Snapshot Settings (applies only to system snapshots) 

* **Private**: when selected, snapshots from this period are hidden from tenants
* **Immutable**: when selected, deletion of snapshots is blocked for all users until expiration or the immutable flag is removed with a mandatory waiting period.  
!!! warning "Immutable snapshots cannot be deleted until unlocked and mandatory waiting period expires. Ensure retention settings align with available storage. For more guidance, see the [Immutable Snapshots Guide](/product-guide/backup-dr/immutable-snapshots)."
* **Snapshot Type**:
    * ***Full***: captures the entire system; required for full-system recovery
    * ***Partial Exclude Tags***: capture of all VMs/tenants *except* those with specified tag
    * ***Partial Include Tags***: captures only VMs/tenants with the specified tag
        * **Exclude/Include Tags** (Partial snapshots only): Click the ellipse button [<i class="bi bi-three-dots"></i>] to select one or more tags. 
        * **Quiesce Tags** (optional; Partial snapshots only): Click the ellipse button [<i class="bi bi-three-dots"></i>] to select one or more tags. VMs with the specified tags will temporarily freeze disk activity during capture to provide an application-consistent snapshot.  Requires [VM Guest Agent](/product-guide/virtual-machines/vm-guest-agent) support.



#### Machine Snapshot Settings (Applies to VM and volume snapshots; not used for system snapshots)

* **Quiesce Snapshots**: If enabled, disk activity will temporarily freeze while the snapshot is being taken.
    * Provides application-consistent backups for VMs  
    * VMs require [VM guest agent](/product-guide/virtual-machines/vm-guest-agent) support 

* **Max Tier for Storing Snapshot**: (default= Tier 1). Controls the highest storage tier allowed for snapshot data.
    * Snapshot data normally uses the same tier as the source.
    * If the source tier exceeds the max tier, the snapshot is stored at the max tier instead.
    * Tier 1 means no restrictions because it is the most expensive tier
    * See [**Storage Tiers**](/product-guide/storage/storage-tiers) for details.


## Modify an Existing Snapshot Profile

1. Navigate to **System** > **Snapshot Profiles**.
2. **Double-click the profile** to open it.
3. Scroll to the *Periods* section.  Add, modify or remove periods to alter the existing schedule as desired. (Reference above instructions for configuring periods.)
    * **Add** a period: click the **+Add Period** link. 
    * **modify** an existing period: click the pencil icon <i class="bi bi-pencil"></i>.
    * **remove** an existing period: click the trash can icon <i class="bi bi-trash"></i> 


## Assigning Snapshot Profiles

Snapshot profiles can be assigned to different snapshot types:

### Full System Snapshots
 It is typically recommended that you use the default *'System Snapshots'* profile for your full system snapshots. This profile can be modified to customize scheduling and can include partial snapshots in addition to full system snapshots.  See [System Snapshots](/product-guide/backup-dr/system-snapshots) for more information

### Partial System Snapshots  
Select VMs and/or tenants based on custom tagging.  These can be added to your [System Snapshots](/product-guide/backup-dr/system-snapshots) schedule or added to a separate snapshot profile. 

### Individual NAS Volumes  
 See [NAS Volume Snapshots and Restores - Schedule Volume Snapshots ](/product-guide/nas/volume-snapshots-restores#schedule-volume-snapshots)

### Individual VMs  
See [VM Snapshots and Restores - Assign a Snapshot Profile](/product-guide/backup-dr/vm-snapshots-restores#assign-a-snapshot-profile-to-an-individual-vm) 

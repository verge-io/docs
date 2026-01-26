# Snapshot Profiles (Snapshot Scheduling)

A snapshot profile defines a schedule for taking and expiring snapshots. Snapshot profiles can be used to schedule the following different types of snapshots: 
- Full System 
- Partial System (select VMs/tenants)
- Individual VM
- Individual NAS volume. 



## Default Snapshot Profiles

Multiple, default snapshot profiles are created by the installation. These default profiles can be modified, and new snapshot profiles can be created, to provide custom scheduling. 


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
    * More detail about system snapshots can be found at: [System Snapshots and Restores](/product-guide/backup-dr/system-snapshots-restores)

## Creating a Custom Snapshot Schedule (New Snapshot Profile)

1. Navigate to **System* > **Snapshot Profiles**.
2. Select **New** from the left menu.
3. Enter a ***Name*** for the new profile (required). Use a descriptive name that notes the frequency/retention and/or elements to be snapped (e.g. Webservers, premium tenants, etc.)
4. Optionally, a ***Description*** can be entered.
5. Click **Submit** to save the profile.   
6. The new snapshot profile is created. At this point, it is an empty profile; **Add profile periods** to implement a schedule within the profile.   

!!! tip "After following the instructions above to create a new snapshot profile, the dashboard for that new profile is displayed, where you can create new periods.  To return to this page later, navigate to: **System** > **Snapshot Profiles** > **double-click the profile** in the list." 

## Profile Periods

A profile period defines a frequency and retention term. Adding multiple periods allows incorporating various frequencies and retentions within the same profile.
     
**To Add a Period**: Click **Add Period** on the left menu.  The snapshot profile field is automatically populated. 

**Profile Period Configuration**:
* **Snapshot Profile**: Pre-selected when accessed from the snapshot profile dashboard. 
* **Name**: (required). Enter a descriptive name to identify the period (ex: weekly, 6pm, Mondays, etc).
  
* **Frequency**: select options for how often to take the snapshots for this period.  
  * values for ***Month, Day of Month, Day of Week Hour, Minute*** allow you to schedule the snapshots
  * input fields will vary depending on the frequency selected
  * the *Custom* option allows you to define specific date and time for one-time execution

* ***Retention*** 
** enter (value) and **Units** to set length of time to set for the expiration :*Days* (default), *Hours*, *Years*, *Forever* (retained indefinitely).  This determines when the system is scheduled to automatically purge/cleanup the snapshots.

!!! warning "Snapshots retained indefinitely or for long periods are likely to greatly increase storage usage over time; it is important to consider your data change rate and the amount of storage available for storing long term snapshots."

* **Minimum Snapshots**: (default:1) Snapshots for this period are kept past their expiration, if necessary to maintain the defined minimum; this helps to ensure there are available recovery points after prolonged outages by preventing automatic purging of an expired snapshot when there is no replacement snapshot. 

!!! tip "Snapshots kept past expiration to maintain a minimum will show as "X days over" in the 'Time to Expiration' column, but they won't be deleted until: a new scheduled snapshot replaces it, OR It's manually deleted."
      
**System Snapshot Settings**
* **Private**: when selected, snapshot from this period are hidden from tenants (applies to system snapshots only)
* **Immutable**: when selected, deletion of snapshots is blocked for all users until expiration or the immutable flag is removed with a mandatory waiting period.  
!!! warning "It is important to understand how immutable snapshots work and possible risks.  See the [Immutable Snapshots Guide](/product-guide/backup-dr/immutable-snapshots) for detailed information."
* **Snapshot Type**:
  * ***Full***: snapshot includes the entire system, can be used for complete system recovery
  * ***Partial Exclude Tags***: snapshot of all VMs/tenants without the specified tag
  * ***Partial Include Tags***: snapshot of VMs/tenants with the specified tag

**Machine Snapshot Settings**
* **Quiesce Snapshots**: If enabled, disk activity will temporarily freeze while the snapshot is being taken.
  * Applies to VMs and volumes only
  * provides application-consistent backups for VMs
  * Requires [VM guest agent](/product-guide/virtual-machines/vm-guest-agent) support 
  * **Does not apply to System Snapshots**
  
* **Max Tier for Storing Snapshot**: (default= Tier 1). Snapshot data will be stored on the same tier as source data except when the max tier defined here is a less expensive tier (less expensive = higher number). 
  * Tier 1 means no restrictions because it is the most expensive tier
  * If the source tier is higher than this max, tier will be set this tier. 
  * See [**Storage Tiers**](/product-guide/storage/storage-tiers) for more information about storage tiering.
  * **Does not apply to System Snapshots**


## Modify an Existing Snapshot Profile

1. Navigate **System* > **Snapshot Profiles**.
2. **Double-click the desired profile** in the list.
3. The dashboard for the selected profile will appear; add, modify or remove periods to alter the existing schedule as desired. (Reference above instructions for configuring periods.)
    * To add periods to the profile: click the ***+Add Period*** link. (A snapshot profile can contain multiple periods.)
    * To modify an existing period: click the (pencil icon) to the far right.
    * To remove existing periods: click the (trash can icon) to the far right.


## Assigning Snapshot Profiles


## System Snapshots
It is typically recommended that you use the default *'System Snapshots'* profile for system snapshots.  This default profile can be modified to customize scheduling and can include partial snapshots in addition to full system snapshots.  See [System Snapshots and Restores](/product-guide/backup-dr/system-snapshots-restores) for detailed information. 

## Individual NAS Volumes
[NAS Volume Snapshots and Restores - Schedule Volume Snapshots ](/product-guide/nas/volume-snapshots-restores#schedule-volume-snapshots)

## Individual VMs
[VM Snapshots and Restores - Assign a Snapshot Profile](/product-guide/backup-dr/vm-snapshots-restores#assign-a-snapshot-profile-to-an-individual-vm)

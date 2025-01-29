# Snapshot Profiles (Snapshot Scheduling)

A snapshot profile defines a schedule for taking and expiring snapshots. A snapshot profile can be assigned to an entire VergeOS cloud, a VM, or a NAS volume. Multiple, default snapshot profiles are created by the installation; these default profiles can be modified. Additionally, new snapshot profiles can be created.

## Default Snapshot Profiles

The following are default snapshot profiles automatically created at system installation.

### SOX (Sarbanes-Oxley)

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

### *Cloud Snapshots (Default Profile for entire-system snapshots)

* Hourly for 3 hours
* Daily (at midnight) snapshots retained for 3 days
* Daily (at noon) snapshots retained for 1 day

!!! note "The **Cloud Snapshots** profile is assigned to any new VergeOS installation to provide snapshots of the entire system according to this schedule. The schedule for cloud snapshots can be modified by altering this default profile or assigning a different profile (System -> Cloud Snapshots -> Select desired profile from the dropdown list)."

## Create a New Snapshot Profile

1. From the main dashboard, select **System** from the left menu
2. Select **Snapshot Profiles** from the left menu.
3. Select **New** from the left menu.
4. Enter a ***Name*** for the new profile (required). It is recommended to use a name that is descriptive of the frequency/retention (e.g. houly3hrs-daily-4days) or descriptive of the elements to which it will be assigned (e.g. WebServers)
5. Optionally, a ***Description*** can be entered.
6. Click **Submit** at the bottom of the page.  The snapshot profile is created, and its dashboard is displayed. At this point it is an empty profile; periods need to be added to actually implement a schedule.

7. **Add Periods to the Profile:**
      * A period defines a frequency and retention term. Adding multiple periods allows incorporating various frequencies and retentions within the same profile.
      * Click the ***+Add Period*** link midway down the page.
      * Enter a ***Period Name*** (required) (ex: weekly, 6pm, Mondays, etc).
      * Select a ***Max Tier for Storing Snapshot*** (default = Tier 1, which is most expensive Tier). Snapshot data will be stored on the same tier as source data except when the max tier defined here is a less expensive tier (less expensive = higher number). See [**Storage Tiers**](/product-guide/vsan/storage-tiers) for more information about storage tiering.
      * Select ***Frequency*** for how often to take the snapshots.
      * Select values for ***(Month, Day of Month, Day of Week Hour, Minute)*** to schedule the snapshots (fields will vary depending upon the frequency selected)
      * Select ***Retention*** (value) and ***Units*** to define the length of time for which to keep this period's snapshots. *Days* (default), *Hours*, *Years*, *Forever* (retained indefinitely)
!!! warning "Snapshots retained indefinitely or for long periods are likely to greatly increase storage usage over time; it is important to consider your data change rate and the amount of storage available for storing long term snapshots."

8. The **Quiesce VM Snapshots** option can be selected to freeze disk activity while the snapshot is being taken. This provides application-consistent backups for VMs. The [**VM Guest Agent**](/product-guide/virtual-machines/vm-guest-agent) must be installed and registered on VM for quiesced snapshots.
9. Click **Submit** at the bottom of the page to add the period to the snapshot profile.
10. Click the ***+Add Period*** link and repeat steps 7-10 if additional periods are desired within this profile.

## Modify the Scheduling of an Existing Snapshot Profile

1. From the main dashboard, click **System** from the left menu.
2. Click **Snapshot Profiles** from the left menu.
3. **Double-click the desired profile** in the list.
4. The dashboard for the selected profile will appear; add, modify or remove periods to alter the existing schedule as desired. (Reference above instructions for configuring periods.)
    * To add periods to the profile: click the ***+Add Period*** link. (A snapshot profile can contain multiple periods.)
    * To modify an existing period: click the (pencil icon) to the far right.
    * To remove existing periods: click the (trash can icon) to the far right.

## Change the Snapshot Profile Assigned at the Cloud level

The profile set here determines the schedule used for creating snapshots of the entire system. At install, a new VergeOS system is assigned the built-in "Cloud Snapshots" profile.

1. From the main dashboard, click **System** on the left menu.
2. Click **Cloud Snapshots** from the left menu.
3. Click **Select Snapshot Profile** from the left menu.
4. Select desired ***snapshot profile*** from the dropdown list.
5. Click **Submit** at the bottom of the page.

## Assign a Snapshot Profile to a VM

Virtual machines do not necessarily need a snapshot profile defined because cloud snapshots automatically include restorable snapshots of each VM. You can assign a snapshot profile to an individual VM in order to provide a different schedule. For example, it may be desirable to capture more frequent snapshots and/or retain snapshots longer for certain VMs. VM-level snapshots also provide for quiescing (guest agent required), which a cloud snapshot does not provide.

1. From the VM dashboard, click **Edit** on the left menu.
2. In the **Snapshot profile** field, ***select the desired profile*** from the dropdown list.
3. Click **Submit** at the bottom of the page.

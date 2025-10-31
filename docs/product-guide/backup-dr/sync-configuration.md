# Configuring a Site Sync

Site sync provides replication of system snapshots to a separate VergeOS system; this allows off-site data backup, facilitating disaster recovery and business continuity.

## Site Sync Configuration Steps

1. [Network Configuration](#network-configuration)
2. [Create Incoming Sync](#create-incoming-sync)
3. [Create Outgoing Sync](#create-outgoing-sync)
4. [Specify Snapshots to Auto Sync and Remote Retention](#specifying-snapshots-to-auto-sync-along-with-remote-retention)
5. [Sync Scheduling](#sync-scheduling)
6. [Configure a Repair Server](#repair-server)

## Network Configuration

!!! success "**Quick Setup for VergeOS 4.13.x and Later**: Starting with VergeOS version 4.13.x, the necessary site sync PAT rules are pre-created on both the Core and initial External Network during system installation. For most users, you can simply enable the existing "Sync Rule" on **both** the Core Network **and** the External Network (look for the network that has your management UI IP assigned to it), then apply the rules for both networks. After enabling these pre-created rules, you can skip directly to the [Create Incoming Sync](#create-incoming-sync) section below."

Network rules are necessary to translate incoming sync traffic to the vSAN. These rules are created at the **host level, not within a tenant**.

!!! info "**When to Create Rules Manually**: The manual rule creation steps below are still valuable for scenarios such as: systems running VergeOS versions prior to 4.13.x, customizing rules for specific source IP filtering, or setting up sync traffic on additional/separate External Networks beyond the default management network."

### Configure 14201 PAT Rule for Sync traffic to the vSAN

(Create this rule once to accommodate all incoming syncs to this system.)

1. **Login** to the **receiving** VergeOS system at the **HOST level (not in tenant)**.
2. Navigate to **Networks**.
3. Click **All Networks**.
4. Double-click on the **Core Network** to access its dashboard.
5. Click **Rules** on the left menu.
6. Click **New** on the left menu.
7. Configure **General Rule values**:  
    - **Name** (required): Should be something helpful for future administration
    - **Action**: ***Translate***
    - **Protocol**: ***TCP***
    - **Direction**: ***Incoming***
    - **Interface**: ***Auto***
    - **Pin**: ***No***
8. Define **Source values**:
    - **Type**: ***Any/None***
    - **Source/Ports/Ranges** (Source locking this to a specific IP or subnet is highly recommended!)
9. Configure **Destination values**:
    - **Type**: ***Custom***
    -  **Custom Filter**: ***ui*** (This is a VergeOS keyword; it must be entered in lower case, exactly as noted)
    - **Destination Ports/Ranges**: ***14201***
10. Define Target values:
    - **Type**: ***IP/Custom***
    - **Target IP**: ***ui*** (This is a VergeOS keyword; it must be entered in lower case, exactly as noted)
![rule-core-vsanpat.png](/product-guide/screenshots/rule-core-vsanpat.png)

11. Click **Submit** to save the new rule.
12. The system will prompt to Apply Rules. Click **Apply Rules** on the left menu to put the rule into effect.

### Create PAT Rule for Incoming Sync

!!! info "Incoming syncs will require PAT rule(s) for port 14201. Source-filtering based on incoming sync sources is recommended; for multiple sync sources, this can be done with a separate rule for each different source or by using a list of addresses (separated by commas) in the Source field within a single rule."

1. **Login** to the **receiving** VergeOS system at the **HOST level (not in tenant)**.
2. Navigate to **Networks**.
3. Click **Externals**.
4. Double-click the appropriate **External Network**.
5. Click **Rules** on the left menu.
6. Click **New** on the left menu.
7. Configure general **Rule** values:
    - **Name**(required): Use a name that will be helpful to future administration, for example: sNAT-customername
    - **Action**: ***Translate***
    - **Protocol**: ***TCP***
    - **Direction**: ***Incoming***
    - **Interface**: ***Auto***
8. Define **Source values**:
    - **Type**: ***Custom***
    - **Custom Filter** (recommended): Enter the IP address of the sending VergeOS system. If adding to an existing vSAN NAT rule, add the IP address making sure all addresses are separated by commas.
9. Configure **Destination values**:
    - **Type**: ***My Router IP***
    - **Destination Ports/Ranges**: ***14201***
10. Define **Target** values:
    - **Type**: ***IP/Custom***
    - **Target**: ***ui*** (This is a VergeOS keyword; it must be entered in lower case, exactly as noted)
![sync-snat.png](/product-guide/screenshots/sync-snat.png)

11. Click **Submit** to save the new rule.
12. Click **Apply Rules** on the left menu to put the rule into effect.

!!! success "If the hostname/IP for receiving syncs is different from the vSAN address, there is a system setting to override: on the sync receiving system (host level): **System > Settings > Advanced Settings > VSAN host/ip override (used for incoming site syncs)**."

## Create Incoming Sync

!!! success "Note: Incoming syncs may be auto-generated via system snapshot send/receive options when adding a site to the *Sites Dashboard*; when incoming/outgoing syncs are auto-created through adding sites, proceed to the *Specifying Snapshots to Sync and Retention on the Receiving System* section to complete the site sync configuration."

### Configure the Incoming sync (creates authorization key)

1. **Login** to the **receiving tenant** system.
2. Navigate to **Backup / DR** > **Incoming Syncs**.
3. Click **New** on the left menu.
4. Complete the Configuration for the Incoming Sync:
    - **Name** (required): Provide a name that is helpful for administration, for example, the name of the site the sync will come from.
    - **Description**: Optionally, more administrative information can be stored for this incoming sync.
    - **Force Tier**: This can be defined to select a tier to which this sync will be directed, regardless of the originating tier or any outgoing sync settings. (If the selected tier does not exist, the next appropriate tier will be used.) Leave this field set to ***-- None --*** to allow the sync tier to be determined from the sending system.
    - **URL of this system that the remote system will use to connect**: This is the URL to the system you are currently logged into. This URL should be reachable from the sending system.
    - **vSAN Host**: URL for the vSAN Host. This will default to the URL of the current (receiving) system.
    - **vSAN Port** (Default 14201): This is the port used in the PAT rule that was created above.
    - **Minimum Snapshots** (Default 1): This is the minimum number of snapshots that the system will retain regardless of retention periods defined. This helps prevent having all snapshots expire in the event of a prolonged outage or incorrect retention setup.
5. Click **Submit** to save the incoming sync.
6. The *Incoming Syncs* list appears. Double-click the sync just created. The dashboard for the incoming sync appears, along with a Registration Code (It may take a minute or two for the Registration Code to generate.).
7. When the Registration key appears, click the **Copy** button to copy the key to the clipboard. A message will appear to indicate: "Text copied to the Clipboard". **This key will be needed when creating the coordinating outgoing sync on the sending system.**

## Create Outgoing Sync

!!! success "Outgoing syncs may be auto-generated via system snapshot send/receive options when adding a site to the Sites Dashboard; if incoming/outgoing syncs were auto-created through adding sites, proceed to the [Specifying Snapshots to Sync and Retention on the Receiving System](#specify-snapshots-to-auto-sync-and-remote-retention) section to complete the site sync configuration."

### Configure the Outgoing Sync Job and Register with the Receiving System

1. **Login** to the **Sending system**. (This can be at HOST level or at tenant level depending on which system should be synchronized.)
2. Navigate to **Backup / DR** > **Outgoing Syncs** on the left menu.
3. Click **New** on the left menu.
4. **Paste the Registration Code** copied above into the form and click **Verify**.
If successful, a green Key Verified message will appear briefly.
5. Complete the **Sync Settings** form:
    - **Name** (required): This should be a name that is helpful for future administration.
    - **Description**: Optionally, more administrative information can be stored for this outgoing sync.
    - **Remote URL**: This field is auto-populated with the IP address/domain to the receiving system (extracted from the registration key); typically, this setting can be left at the auto-set value.
6. Click the **Connect and Register** button.
If registration was successful, the *Outgoing Syncs* list appears with the new sync in the listing.
!!! success "At this point, on the receiving system (incoming sync dashboard), the key will indicate '--Used--' with a Registered date and time."

7. Double-click the outgoing sync in the list to access its dashboard.

### Adjusting Sync Settings (optional)

After the sync is created, additional settings can be configured by clicking **Edit** on the left menu.

#### Retries

- **Queue Retry Count** (default 10): The number of times a queued snapshot will be attempted during the sync window. A value of 0 disables retries.
- **Queue Retry Interval** (default 1 minute): The time to wait in between each retry.
- **Queue Retry Interval Multiplier** (default enabled): When enabled, each retry interval is increased to the retry number multiplied by the spacing interval. (For higher Queue Retry Interval values, it may be best to disable this feature.)

#### Advanced

- **Override Destination Storage Tier** (default = --None--): Controls the tier(s) to which sync data will be aimed going into the destination. When set to the default (--None--) the sync will attempt to send snapshot data to the same tier (as its source) on the destination system. For example, data within the snapshot residing on tier2 on the sending server will attempt to send to tier2 on the receiving server; while snapshot data from tier4 will attempt to send to tier4 on the receiving system.
When a specific tier(1-5) is selected here, the sync directs all data to the selected tier on the destination system.

!!! success "Ultimately, the destination tier of sync data will depend on the existence of particular tiers on the receiving vSAN and/or any force tier setting employed on the incoming sync configuration on the receiving system."

- **Sync Threads** (default = 8): This default setting is optimized for typical WAN synchronization and normally won't need to be changed. However, threads can be increased to maximize sync bandwidth use; this can be helpful in situations of high latency on high bandwidth -OR- when synchronizing over much faster connections (e.g. over LAN), in order to fully take advantage of the available bandwidth.

!!! warning "Sync Threads set too high can have a negative impact on processor utilization; best practice is to increase setting incrementally from the default until the desired bandwidth target is reached. Typically, the setting should not be set to a number higher than the number of physical drives within a single node on the sending system."

- **Send Throttle** (default = 0 or no throttling): A setting other than 0 will set a max data flow for the sync.
- **Encryption** (default enabled): Can be disabled to allow for faster syncs.

!!! warning "Encryption should only be disabled when sync is not performed across public lines, for example: a sync from one system to another on the same LAN."

- **Remote Minimum Snapshots** (default = 0): Minimum number of snapshots to retain on the remote host. This helps prevent having all snapshots expire in the event of a prolonged outage.

## Specify Snapshots to Auto Sync and Remote Retention

!!! success "The system snapshot profile determines the snapshot take and retention schedule for the entire local system (system snapshots include a complete recovery point of the entire VDC, including: VMs, networks, tenants, vSAN, NAS, etc.) These are the snapshots that can be selected for an automatic site sync. To change the profile used to control local system snapshots: System > System Snapshots > Select Snapshot Profile. For more information about system snapshots: see [**System Snapshots and Restores**](/product-guide/backup-dr/cloud-snapshot-restore)"

### Select Snapshots and Remote Retentions for Auto Sync

1. Navigate to **Backup/DR**.
2. Click **Outgoing Syncs** on the left menu.
3. Double-click the desired outgoing sync to access its dashboard.
4. In the **Auto Sync Configuration** section, click the **Add Item** link.  
The Configuration form will appear.
![sync-periodretention.png](/product-guide/screenshots/sync-periodretention.png)

5. In the **Sync Snapshots From** dropdown list, select a desired profile period (e.g. ***"Hourly for 3 hours"***, ***"Midnight"***, ***"Noon"***). The options that appear will depend on the periods defined in the snapshot profile assigned for the local system (by default, this will be the *System Snapshots* profile.)
6. **Remote Retention** will default to the local retention of the selected period; change if a different retention setting is desired for the remote copy. (Changing the Remote Retention does not affect the local retention.)
7. **Priority** (0-9) can be specified to arrange different periods into sequence by priority, with lower number taking precedence over a higher number; for example: a period set to priority 1 will sync before a different period set to priority 2.
8. **Do not expire snapshot** option can be selected to ensure a snapshot will not expire locally before it syncs; this can be important for snapshots configured with a short retention period locally, but a longer retention on the remote system.
9. **Prefix the snapshot name with this on the destination** can be used to assign added text to the beginning of the existing snapshot name. This is optional, but recommended, in order to avoid potential conflicts with other snapshots on the destination.
10. Click **Submit** to add the selected period to the auto sync configuration.
11. Repeat the above steps to add all the desired profile periods to the sync (any number of the available profile periods can be added.)

## Sync Scheduling

When no schedule is defined for the sync, snapshots defined in the auto sync configuration are immediately synchronized as they are created (or put into the queue, when something else currently syncing). A specific sync schedule can be defined to confine syncs to particular days/times (e.g. outside of business hours). Additionally, syncs can be configured to run with specific throttles during particular time frames, for example: a tighter throttle used during daytime hours, with a less-restrictive or no throttle during evening hours.

### To Contain a Sync to a Specific Schedule

1. Navigate to the outgoing sync dashboard (Main Dashboard > Backup /DR > Outgoing Syncs > double-click on the sync in the listing).
2. Under **Sync Schedule Configuration**, click the **Add Item** link.
3. Create a task with **Task type** = ***Enable*** to set a start time for the sync.
4. Create an additional task with **Task type** = ***Disable*** to set a stop time for the sync.

More information on creating automated tasks is available here: [**Create Tasks**](/product-guide/automation/create-tasks)

### Configure Throttle Scheduling

1. Navigate to the outgoing sync dashboard (Main Dashboard > Backup /DR > Outgoing Syncs > double-click on the sync in the listing).
2. Under **Sync Schedule Configuration**, click the **Add Item** link.
3. Create a task with **Task type** = ***Throttle Sync***, configure the schedule and select desired bandwidth limit in the Send throttle field.
4. Create an additional task with **Task type** = ***Disable Throttle Sync*** configuring a schedule for the throttle to be turned off
   **-OR-**
   Create an additional task with **Task type** = ***Throttle Sync*** configuring a schedule to implement an alternate bandwidth limit for throttle.

More information on creating automated tasks is available here: [**Create Tasks**](/product-guide/automation/create-tasks)

## Repair Server

A repair server will allow vSAN data blocks to be replicated from the sync destination back to the source when needed; this provides automatic restoration attempts in the event of hardware or power issues that surpass redundancy levels. See the [**Repair Server**](/product-guide/backup-dr/repair-server) page for more information.

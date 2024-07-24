

# Local Volumes

Local volumes are file systems stored within VergeIO, consuming storage in the VergeIO vSAN. Each local volume can have different sharing, syncing, tiering, and permission settings.

> A NAS Service must be in place before creating volumes. See the [**NAS Service**](/public/ProductGuide/NASservice)   page for instructions. {.is-success}

<br>

### Create a Local Volume

1.  From the Main Dashboard, select **NAS** from the left menu.
2.  Select **Volumes** from the left menu.
3.  Select **New** from the left menu.
4.  Select the appropriate ***NAS Service*** from the dropdown list.
5.  Enter a ***Name*** for the volume (required). Note: spaces are not permitted.
6.  Enter a ***Description*** for the volume (optional).
7.  In the ***Filesystem Type*** dropdown list, select **Local Volume (EXT4)**.
8.  The ***Encrypt Volume*** option can be selected to encrypt the entire volume (AES-XTS).


> **Encryption Considerations:**
<br>- **Encryption selection is only available during creation creating**; a volume cannot be changed from encrypted to unencrypted or vice-versa after creation. 
<br>- **Minor to moderate performance implications** are involved with enabling volume encryption {.is-info}
    
   <br>
   
   - When encryption is selected, **Encryption Key** is also required.  
    
> The **original encryption key** (defined when creating the volume) is needed for the lifetime of the volume; this encryption key must be **entered each time the volume is brought online** (e.g. after disabling/enabling a volume or after its NAS service is rebooted, etc.) **Without the encryption key, it will not be possible to bring the volume back online!** {.is-warning} 

9.  Specify a ***Max Size*** for the volume, by entering an integer and selecting the unit (B/KB/MB/GB/TB). (When Max size is reached, the volume will show out of space and will continue to be readable, but will not allow further writes.)
10.  The ***Discard*** option is enabled by default. When Discard enabled: as data is deleted from the volume, that space is reclaimed back to the vSAN.
11.  The volume can optionally be set to **Read Only**.
12.  The ***Automatically Mount Snapshots*** option can be selected to make snapshots readily available for browsing/file restores.
13.  Specify ***Owner*** for the volume directory (optional).
14.  Specify a ***Group*** for volume directory (optional).
15.  Select a ***Snapshot Profile*** for the volume (optional). See [**Snapshot Profiles (Snapshot Scheduling)**](/public/ProductGuide/snapshot-profiles) for information regarding Snapshot Profiles.
16.  Select ***Preferred Tier*** for storing this volume. Preferred tier is the tier first attempted. See [**Preferred Tiers**](/public/ProductGuide/preferredtiers) for more information.
17.  Click **Submit** to save the settings and create the local volume.
18.  The Dashboard for the new local volume is displayed. It may take a few minutes for the new Volume to come online. If the Volume Status does not become Online, refer to the logs section (bottom of Dashboard) to view error messages for troubleshooting.
19.  Files in the online volume can be viewed using the **Browse** option from the left menu.
20.  To expose the local volume, create CIFS and/or NFS [**Share(s)**](/public/ProductGuide/nasshares).

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
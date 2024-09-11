hide: - toc -->

<style>
 
.data-md-color-scheme=slate {
    --md-default-fg-color-light: white;

}

.smallerfont {
    font-size: .90em;
}


.md-typeset h4 {
   margin-top: 70px; 

}

</style>

<span >



# VergeFS vSAN

!!! abstract inline end "Learn More"

    The [**VergeFS vSAN Whitepaper**](/docs/whitepapers/vsanwhitepaper.md) provides an in-depth look at VergeFS vSAN architecture and features

VergeFS vSAN (Virtual Storage Area Network) is the storage component of the VergeOS integrated data center operating system. Local storage from individual server nodes is aggregated into a single, distributed array that is made seamlessly available for workload and tenant storage allocation.  VergeFS vSAN is architected for resiliency, data integrity, and performance and includes a wide range of built-in features. 


</br>

<div class="grid cards smallerfont"  markdown>


-  ### Related User Manual Pages

    ---
    :simple-pushbullet: &nbsp; [Uploading Files to the vSAN](/docs/product-guide/uploadingtovSAN.md)

    :simple-pushbullet: &nbsp; [Removing ISO File References](/docs/product-guide/removing-isorefs.md)

    :simple-pushbullet: &nbsp; [Configure a NAS Service](/docs/product-guide/NASservice.md)
    
    :simple-pushbullet: &nbsp; [Replacing a Defective or EOL Drive](/docs/product-guide/DriveReplacement.md)

   


-  ### Top vSAN KB Articles

    ---
    :simple-pushbullet: &nbsp; [Adding Storage](docs/knowledge-base/posts/adding-storage.md) 

    :simple-pushbullet: &nbsp; [ Identifying a Failed Disk](docs/knowledge-base/posts/identifying-a-failed-disk.md)

    :simple-pushbullet: &nbsp; [Sharing Files to a Tenant](docs/knowledge-base/posts/add-media-to-tenants.md)

    :simple-pushbullet: &nbsp; [Managing Media Images](docs/knowledge-base/posts/managing-media-images.md)

    :simple-pushbullet: &nbsp; [Preferred Tier Usage](docs/knowledge-base/posts/preferred-tier-usage.md)

    :simple-pushbullet: &nbsp; [Sharing Files to a Tenant](docs/knowledge-base/posts/scaling-up-a-vsan.md)

    :simple-pushbullet: &nbsp; [How to TRIM your drives ](docs/knowledge-base/posts/trim.md)

    :simple-pushbullet: &nbsp; [Unexpected vSAN Growth ](docs/knowledge-base/posts/unexpected-vsan-growth.md)

    :simple-pushbullet: &nbsp; [vSAN Encryption ](docs/knowledge-base/posts/vsan-encryption.md)


-  ### Key Concepts

    ---
    [Storage Tiers](/docs/product-guide/storagetiers) 
   

    [Preferred Tier](/docs/product-guide/preferredtier)


-  ### Reference 

    ---
    [Storage FAQ](reference/FAQ.md#Storage)


    [Using the Verge-API](docs/knowledge-base/API-Tables.md)


</div> 

<br>
<br>

__Latest vSAN Updates__ (1)
{ .annotate }

1. 
* 4.12.6 - 7/2024
    - Increased maximum SMART hours to 10 years to accommodate for the warning status on older drives
    - Volume and VM snapshots will now get deleted if the VSAN is in a non-redundant state which accommodates for long running drive replacements
    - Added filesystem and memory debug information to System Diagnostics  
* 4.12.5 - 5/2024
    - Fixed issue partitioning and discovering disks
    - Changed the timeout while partitioning disks to accommodate for systems with slow drive discovery  
* 4.12.4 - 4/2024
    - Various vSAN fixes and enhancements
    - NVMe drives now format 10 seconds faster
    - Boot-only drives now partition at 4G instead of the default 1G  
* 4.12.0 - 2/2024 
    - Added support to some older intel SSD for wear level detection
    - Added dedicated meta cache to vsan
    - increased disk delete performance and reduced impact for larger drives
    - increased performance for vm storage during per node contention
    - Added dedicated meta cache to vsan
    - Tenant storage usage is now updated every minute instead of 5 seconds
    - Drive tiers can no longer be changed while vm is running (this will change in the future)
    - Storage will now automatically kick off a device integ check if a bad block is detected












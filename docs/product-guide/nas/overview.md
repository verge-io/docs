# NAS Overview

The NAS feature provides file-level storage/access within a VergeOS system, allowing you to create volumes of files on top of your distributed storage and mount external
file systems.  

## Benefits of the NAS Feature

* Manage and backup file-level storage within your VergeOS storage
* Take advantage of VergeOS storage efficiencies, such as deduplication, for file-level storage
* Mount external file systems to access within your VergeOS environment
* Easily import data to your VergeOS system for absorbing existing workloads, performing backups, etc. 
* Easily export data and/or workloads from VergeOS for third-party backup, compliance, etc.

## NAS Setup Steps 

1. [**Add a NAS Service**](/product-guide/nas/nas-service)

2. **Optional - **[**Integrate with Active Directory**](/product-guide/nas/nas-join-ad-domain)

3. **Create Volumes** (Each volume is its own directory tree that can be customized for security, snapshot, access, antivirus, max size, and sharing settings.)

    * [**Local Volumes**](/product-guide/nas/nas-local-volumes) are stored within VergeOS, consuming vSAN storage.
    * [**Remote Volumes**](/product-guide/nas/nas-remote-volumes) are external file systems that are mounted to the VergeOS system and presented as if local.

4. [**Create Shares**](/product-guide/nas/nas-shares) to provide NFS and/or CIFS access to NAS volumes.
5. **Optional - **[**Configure Volume Snapshots**](/product-guide/nas/volume-snapshots-restores) for customized volume retention and/or quiesced snapshots (Non-quiesced NAS volumes can be restored from cloud snapshots to be used for restore.)
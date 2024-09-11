hide: - toc

# Storage FAQ


## VergeFS vSAN


<details>
<summary>How does the VergeFS vSAN provide data integrity?
Hashing, built-in redundancy, walks, </summary>

</details>


<details>
<summary>How does VergeFS vSAN compare to traditional commercial SANs?</summary>
reduced complexity, reduced cost
</details>

<details>
<summary>How is VergeFS vSAN different from other VSAN alternatives in the market?</summary>
core component, integrated part of the Cloud operating system - there is no need for a special virtual appliance to run , no extra software to install or maintain, no extra licensing, can start with 2 hosts  no extra cluster needed, reduced complexity, reduced cost
</details>

<details>
<summary>security?</summary
</details>

<details>
<summary>snapshots/data protection</summary>
</details>

<details>
<summary>MAx size?<summary>

<details>

<details>
<summary>Block Storage?  LUNS?</summary>
</details>

<summary>Can spinning disk be used for the vSAN?</summary>
Spinning disks are typically used for archive/backup environments or cold data.  They are not recommended for production/hot data.  
Spinning disks larger than 8TB in size are not recommended as the rebuild time in larger spinning drives can take an extended period of time leaving a single point of failure.
</details>

<details>
<summary>At what RAID level does the VSAN work?</summary>

</details>

<details>
<summary>What encryption options are available?</summary>
- AE6256 encryption is used for in-flight data (e.g. syncs, API requests). 
- (optional) storage (at rest) encryption is available utilizing AES256 encryption. 

</details>
  

<details>
<summary>What are the RAM requirements for VergeFS vSAN?</summary>
1G per TB storage, when more?  less for archive storage?
</details>


<details>
<summary>Can existing external storage be utilized in a VergeOS environment?</summary>
While local node storage is preferred, however, existing fiber-channel-attached storage can be integrated as virtual drives. 
</details>



## VergeOS NAS


<details>
<summary>What is the VergeOS NAS feature?</summary>
The NAS feature provides file-level storage/access within a VergeOS system. 
</details>


<details>
<summary>Is additional software needed to take advantage of the NAS feature?</summary>
The NAS feature is included and can be installed by simply implementing an instance of the built-in NAS VM Recipe. 
NAS services can be implemented within tenant systems as well as within a host system. 
</details>


<details>
<summary>What are typical uses for the NAS feature?</summary>
Customers use the NAS to provide users file-based interaction with VergeOS, file-based export/import/backup of VMS, and backup of external file systems.
</details>


<details>
<summary>What file system protocols are supported on NAS?</summary>
VergeOS NAS supports NFS and SMB/CIFS for file sharing. 
</details>
 

<details>
<summary>What resources are required to run a NAS?</summary>
The default NAS Service defaults to 4 cores and 8GB RAM, which is sufficient for a typical NAS deployment.  Additional RAM may improve performance in NAS deployments that have a very high number of volumes or those that involve many or frequent synch operations.  
</details>


<details>
<summary>What size limitations does the NAS have?</summary>
An individual NAS service is limited to roughly 1000 volumes.  Multiple NAS services can be run within the same system.
</details>










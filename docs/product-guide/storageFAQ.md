hide: - toc

# Storage FAQ

notes for a later page

## vSAN

<details>
<summary>How does VergeFS vSAN compare to traditional storage alternatives on the market?</summary>
VergeFS vSAN is unlike any single storage alternative, but rather combines the advantages of other conventional solutions (such as SAN, VSAN, NAS, Filesystems, etc).  VergeFS provides portability and reduced complexity with a distributed file system that communicates directly with the storage hardware.  It is optimized for large disk images for Virtual machines and eliminates the overhead of running a separate file system and block storage manager. efficiency for cloning, snapshot
administrator does not have to worry about creating/tracking LUNs  storage array  present virtual, file-based LUN, benefits of SAN presented a s avirutla file system, consumed like a filesystem efficient cloning, branching for snapshots, no perf hit of separate FS running with block storage. thin provisioning.  we take RAIN and combine into one block system. performance efficiency of block with reduced complexity and portability.. traditional file systems point at a one partciular indiv block. special algorithm avoids multiple lookup tables
</details>

geometry - same number of drives with same capacity per drive - consistent performance, also drive wear on hdd at least

<details>
<summary>How does the VergeFS vSAN provide data integrity?
VergeFS is designed to eliminate single points of failure.  VergeFS communicates directly with storage hardware, and not relying on physical error checking (which is often lacking/inaccurate/scenarios missed) to assure data integrity, automatically correcting with redundant block data.  Also repair server functionality to provide an automatic repair mechanism when there might be hw failures beyond local redundancy. Specialized algorithm to evenly distribute data across local drives with a mirror of each piece of data on a separate node.  specialized algorithm evenly distributes data in a way that allows easier node expansion and allowing more efficient rebuild times following hardware failures.   system notices errors when hardware error correction mechanisms within physical devices.  always have hardware defects - physical defects, end of life, inadequate error detection/correction function.  Every time data is read it is re-hashed and validated for integrity
bit rot aka silent corruption aka data decay. can severely affect information. 


RAIN, unique algorith used to distribute data blocks evenly across drives and nodes to provide redundancy and allow for faster,  more efficient rebuilds and scaleouts. 
very balanced. dedup built in  every time data read it is checked.  ? checked on restarts too? walks?   manual integrity checks?

Hashing, built-in redundancy, walks The vSAN stores a SHA1 hash of every block of data that is written to it. When that data is read, it is re-hashed and validated for integrity. This technique protects against silent corruption and bit rot. In the event of finding a bad block of data, our algorithm will check for redundant copies locally within the environment. If that block of data cannot be found, DR/Backup sites will be checked in real time, and the data block will be retrieved and repaired seamlessly without user interaction with no down time. 

how are we handling hardware failures, many ways that hw can fail, built with the assumption that hw will fail, no single point of failure, take care of corrupt hw firmware, silent corruption detection (corrupted on hw but not reported as a failure - we will still detect it and auto correct - try to repair other nodes and repair server.  dont rely on CRC error checking within the drive, on hardware - which can be wrong.  power failures - never recommended, dont rely on it for data integrity</summary>

</details>

<details>
<summary>security - encryption - inflight, api and OS crypto-verified only signed packages, enforcement policies (2-factor auth, pw, etc.), one of the biggest factors is that it's integrated... limited entry points for vulnerability....not separate products with different openings.  vsan is not exposed, b/c it doesnt have to be.  benefit of ultraconvergence.</summary>
</details>

<details>
<summary>snapshots/data protection</summary>
</details>

<details>
<summary>MAx size?</summary>

practical limit long before actual/hard/programmed limits.  64TB phys drive, 64k nodes, other limits will hit first, such as supplying enough RAM to suppport very large number of drives, connecting that excessive number of drives per node, etc.

</details>

<details>
<summary>Block Storage?  LUNS?</summary>
</details>

<details>
<summary>Can spinning disk be used for the vSAN?</summary>
Spinning disks are typically used for archive/backup environments or cold data only.  They are not recommended for production/hot data.  
Spinning disks larger than 8TB in size are not recommended as a rebuild of a larger spinning drive (i.e. in the event of a drive failure) can take an extended period of time leaving a single point of failure.
</details>

<details>
<summary>What RAID level does the VSAN use?</summary>
The vSAN works as a Redundant Array of Independant Nodes (RAIN). This is accomplished by striping data across all drives of a tier while concurrently writing the data set to its mirror on another node participating in the same tier of storage thereby guaranteeing data integrity.
</details>

<details>
<summary>What encryption options are available?</summary>
- AES256 encryption is used for in-flight data (e.g. syncs, API requests). 
- (optional) storage/at-rest encryption is available utilizing AES256 encryption. 
</details>
  


<details>
<summary>What are the RAM requirements for VergeFS vSAN?</summary>
As a general rule of thumb, there should be 1G RAM per TB storage, ram that is not used by VMs, tenants, etc. 
Additional RAM can support higher performance through caching and buffering. 

Archive-only systems:
1/2GB RAM per TB storage Archive-only systems can 



</details>


<details>
<summary>Can existing external storage be utilized in a VergeOS environment?</summary>
When acquiring new hardware, local node storage is always preferred; however, existing fiber-channel-attached storage can be leveraged to be integrated as virtual drives. 
</details>

<br>
<br>



## VergeOS NAS


<details>
<summary>What is the VergeOS NAS feature?</summary>
The NAS feature provides file-level storage/access within a VergeOS system.  
</details>


<details>
<summary>Is additional software needed to take advantage of the NAS feature?</summary>
No additional software or licensing is required to use the NAS feature as it is built into the product.  The NAS feature can be installed by simply implementing an instance of the built-in NAS VM Recipe.  Tenants can also implement NAs within their own VergeOS Clouds. 
</details>


<details>
<summary>What are typical uses for the NAS feature?</summary>
Customers use the NAS to provide file-based accesss to VergeOS storage, file-based export/import/backup of VMS, and backup storage for external file systems.
</details>


<details>
<summary>What file system protocols are supported on NAS?</summary>
VergeOS NAS supports NFS and SMB/CIFS for file sharing. 
</details>
 

<details>
<summary>What resources are required to run a NAS?</summary>
The default NAS Service defaults to 4 cores and 8GB RAM, which is sufficient for a typical NAS deployment.  Additional RAM may improve performance in deployments that have a very high number of volumes or those that involve many or frequent synch operations.  
</details>


<details>
<summary>What size limitations does the NAS have?</summary>
An individual NAS service is limited to roughly 1000 volumes.  Multiple NAS services can be run within the same VergeOS cloud. 
</details>










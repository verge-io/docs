

# Storage Tiers

Storage tiering is the method of storing data on various types of media based on performance, availability and recovery requirements. Utilizing this method significantly reduces storage costs while still meeting necessary data access demands for different workloads.
<br>


## Typically, tiers are defined as follows:

<br>

**Tier 0**
High performance, such as NVMe - High write endurance.  Generally used for metadata dedicated to the vSAN, not available for storage.

<br>

**Tier 1**
SSD/NVMe (solid state) - Highest write endurance, intended for write-intensive workloads.

<br>

**Tier 2**
SSD/NVMe (solid state) - Mid-level write endurance, intended for mixed usage(read and write) workloads.

<br>

**Tier 3**
SSD/NVMe (solid state) - Lower end write endurance, designed for read-intensive workloads.


<br>

**Tier 4**
HDD (spinning disk) - Suitable for many VM workloads; slower performance than SSD, but provides high-capacity/lower-cost storage.

<br>

**Tier 5**
HDD (spinning disk) - Intended for cold storage needs, slower performance on read and write, but very low-cost/high-capacity storage.

***Tenants should contact their service provider for information regarding available storage tiers and associated pricing.***
<br>   




<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
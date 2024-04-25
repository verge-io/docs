# Memory Considerations
***

This is intended to provide general guidance in planning appropriate RAM design in physical VergeIO nodes. The multiple factors to be considered (collectively) in order to accurately determine sufficient RAM are explained, followed by specific case study examples.

Additionally, the VergeIO Reference Architecture provides examples of specific hardware configurations certified for various uses, such as:
- Archive / Disaster Recovery
- General Production 
- Elevated Performance Workloads

There may be many different variables pertinent to the design of a new system, so always consult with your VergeIO implementation specialists before acquiring hardware or installing a production VergeIO system.


### Ram Sizing Factors
-   RAM requirements for Storage (amount and storage use-case) 
-   RAM requirements for Compute (Hypervisor) 
-   Overhead for workload Failover (allowing for all workloads even when a node is down due to maintenance or hardware failure)
-   Optimized RAM (Normal Runtime Utilization)
<br>
### RAM Requirements
Physical memory is needed to support vSAN operation; As a minimum, 1GB RAM is needed per 1TB of storage.  Additional RAM provides caching and buffering to support higher performance. The following general guidelines can be used to determine vSAN RAM requirements: 

####  Non-Production Storage
**E.G. Dev-test or archive only**
Storage RAM Requirement: 1GB RAM per 1TB of storage
**Example: 2 Node cluster used only for backup storage**

 - RAW Storage per node: 80TB (8x10TB drives)
 - RAM requirement for vSAN storage: 80GB per node (1GB per 1TB storage)
 - Additional RAM needed to run the VergeIO Appserver and OS: 8-16GB
	  - Minimum RAM specification: 96GB per node 
    - Recommended specification Specification: 128GB per node
<br>

####  Production - Standard-Use Storage  
Storage RAM Requirement: 1GB RAM per 1TB of storage
**Example: 4 Node cluster purposed for standard-use storage**
-   RAW Storage per node: 48TB of raw storage (6x8TB drives)
-   RAM requirements for vSAN storage: 48GB per node (1GB per 1TB storage)
-   Additional RAM needed to run the VergeIO Appserver and OS: 8-16GB
	- Minimum RAM specification: 64GB per node 
    - Recommended RAM Specification: 96GB per node
<br>

####  Production - High-Performance Storage 
Storage RAM requirement: 2GB RAM per 1TB of storage
**Example: 2 Node cluster purposed for high-performance storage**
Nodes containing 60TB raw storage used for high performance (e.g.): plan for at least 120GB RAM to support the vSAN storage in that node.

-   RAW Storage per node:  60TB (10x6TB drives)
-   RAM requirements for vSAN storage: 120GB per node (2GB per 1TB storage)
-   Additional RAM needed to run the VergeIO Appserver and OS: 8-16GB
	  - Minimum RAM specification: 136GB per node
    - Recommended RAM specification 192GB
<br>

####  RAM Requirements for Compute (Hypervisor) 
RAM requirements for Compute will include what is needed for:   

-  Tenant consumption
-  VM consumption (VMs that will not reside within a tenant)
-	 VergeIO Appserver and OS
-  Additional available for failure scenarios (e.g. hardware failures, upgrades, maintenance operations).  
<br>

###  RAM Consumption 
<br>

####  Overall Tenant RAM Consumption 
The amount of RAM needed for tenants is the total that will be allocated for tenant consumption, with an extra 2GB RAM for each tenant. 
Total Amount of RAM to be allocated to tenants + Number of tenants \* 2

**Example:**
```
10 tenants \* average 32GB to allocate per tenant = 320GB 
Add 10 \* 2GB for tenant overhead = 20GB
320 +20 = 340GB to support tenants
```
<br>

#### **Overall Total VM RAM Consumption**
!!! note "VMS contained within the tenants will already be accounted for in the tenant RAM consumption calculation above. Because RAM is thick provisioned tenants will own the RAM they have been allocated for their own workloads."

### **NAS**
Beyond the RAM requirements already involved for the storage (covered above), there are typically only modest additional RAM needs for running a NAS service in VergeIO.  
Each NAS Service requires a minimum of 4GB of RAM.

-   Additional RAM will be necessary when heavy sync activity from larger numbers of volumes.
-   Additional RAM will be necessary where there is high anti-virus operation (e.g. real-time monitoring with high I/O)
<br>

### **Failovers/Migrations**
VM failover/migration allows for continuous uptime during a hardware failure, update, or other maintenance operation. This is only possible when adequate RAM is available on nodes in order to receive migrated workloads (VMs, Tenant Nodes, NAS Services)   
<br>

#### **The N-1 Rule to Ensure Proper RAM to Handle Failovers**
To ensure all workloads can failover properly and continue running during a maintenance/upgrade operation, or node failure, n-1 (compute node count, subtracting one) must contain the total amount of RAM needed for tenant and VM and NAS workloads.  

**Example Scenario:** 
A 4 node cluster containing 128GB (4x32GB) of workload RAM suffers a failure effectively taking usable RAM to 96GB. All 128GB of RAM was in use during the failure leaving workloads from the failed node in a no start situation. If only 75% of the usable RAM was used during normal operations the workloads would have the option to restart on running nodes due to the N-1 rule.
<br>

#### **Enough Free RAM to Handle the Largest VM/Tenant Node in a Failover**
Enough free RAM must be available on each node to accommodate the largest RAM workload to ensure it’s successful failover during a node-down situation. Determine the largest RAM consumer (tenant node or single VM) that will be supported. If there is not sufficient RAM on a single node, a VM/tenant node will not migrate; a single workload’s RAM cannot be split across nodes.
<br>

### **Optimized Usage Ranges**

RAM function is optimized (in nearly any system - including VergeIO) when memory stores do not run at full or near full capacity during normal runtime.  It is best to keep RAM utilization to a portion of the total available RAM, avoiding any continual near-full utilization.    

As a general rule of thumb, RAM should be sized such that normal runtime RAM usage remains under 80%.  This does not mean that RAM usage should never go above this point: but rather, during typical circumstances (all nodes running and not including occasional spikes in usage).  Using 80% as a threshold is a starting guide point, with optimal normal run percentage depending on the system’s amount of I/O activity and performance requirements; for example: it can be fine to run an archive-only environment at a higher percentage on a regular basis, whereas, an ultra-performance environment (with highly, data-active research applications, for instance) would get better RAM utilization if normal usage is around 60%.

<br>

<br>

!!! note "Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>"


<br>
[🚗 Take a Test Drive Today!](https://www.verge.io/test-drive){ .md-button .md-button--primary }
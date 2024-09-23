# Monitoring Tenants

This page discusses the use of Dashboards and Subscriptions to oversee Tenants.  Dashboards will provide a lot of helpful information about Tenants.  VergeIO Subscriptions can be configured to provide regularly scheduled Tenant reports and on-demand alerts upon various events, such as thresholds, errors, warnings, etc. 


## The All-Tenants Dashboard (summary info)
The All-Tenants Dashboard provides an overview of Tenants and links to drill down to more detailed information.


**To access the All-Tenants Dashboard:**
Click on **Tenants** from the Main Dashboard (**Quick link or left menu**).

**Counts/Status Indicators**
In the top left of the Tenants Dashboard, the Counts and status indicators will show the number of Tenants powered on/total number of Tenants; and the number of Tenant Nodes powered on/total number of Tenant Nodes.  In the following example, there are 2 Tenants powered on out of a total of 18 existing Tenants. 2 of the 21 Tenant Nodes are powered on. You can click on these count boxes to access the list of Tenants, list of Tenant Nodes, respectively.


**Tenants Usage**
This view provides a **quick view** of the top usage among your Tenants, across **CPU, RAM, Storage, and Network**. Each list entry in these sections is also a **link** to that Tenant’s Dashboard to quickly access more detailed information about the particular Tenant.   


</br >
 
## Individual Tenant Dashboards
Each Network has its own Dashboard to show configuration and summary information about that particular Network, with each card on the dashboard providing a link to increased detail.


**To access a particular Tenant’s Dashboard:**
1. From the (All) Tenants Dashboard, click **Tenants**.
1. A list of all Tenants appears.
1. **Double-click** on the **desired Tenant**. 



<!-- will rework this section because it is not clear. Obviously was put in because there is customer confusion around the issue, but this probably won't help.
**Storage Used/Provisioned/Allocated**

Tenant Storage numbers can be confusing. The Storage section shows you all the Storage Tiers and Usage statistics. Here is an explanation for each:
**Used/Provisioned** - 

**Allocated/Provisioned** - 

- **Storage Used** - This is the current actually used storage across the entire storage tier. This includes storage used for the entire tenant. This number is the deduplicated amount used. The actual amount used can be much higher if exported outside of VergeOS. 
- **Storage Provisioned** - Provisioned storage is the amount of storage that was provisioned when creating this tier. You can use more than the provisioned amount as long as the host has enough storage available. Caution should be used as you do not ever want to run out of storage at the host level. 
- **Storage Allocated** - This is the amount of storage allocated to the tenant and all of its workloads. For example, when creating VMs this is the total size of the drives. This also includes the allocated storage in your snapshots as well. 



In general, you should always Provision more storage than Used or even Allocated. -->

### Understanding Storage Used/Provisioned/Allocated

* **Provisioned** - the amount of (post-deduplication **\***) storage that has been specified as available to the tenant.  
!!! note "A Tenant's provisioned storage is not a hard limit.  However, alerts are triggered based on this threshold, so it is important to monitor the All-Tenants Dashboard for warnings and alerts.  **Subscriptions** (below) provide an easy way to track tenant dashboards, alerts and errors." <!-- check on this - what alerts/errors/warnings trigger for this exactly?  automatic at a certain percentage? -->

* **Used** - reflects the tenant's actual consumed storage, after deduplication **\***. 

* **Allocated** - represents the high-end amount of storage that would be utilized should all the Tenant's disk devices be filled to capacity. The amount of allocated storage can often show a much larger number than used or provisioned because device files are thin provisioned; the amount of storage allocated to a VM drive/NAS volume is not actually consumed by the vSAN until actually used, e.g. a 4TB VM drive that only contains 200GB of data has 4TB allocated, but only consumes 200GB of vSAN space(minus any deduplication)

    **\*** <span style="font-size:.75em">Tenant storage numbers only consider deduplication within the tenant's own stored data. Cross-tenant deduplication is not factored in.</span>


**Usage**
CPU, RAM, and Storage usage for the Tenant is provided in graph form (**5-minute intervals**) as well as statistic listings for the current **5-second “heartbeat”**, with statistics information saved for the **5-minute** intervals (**corresponding to standard 95th percentile standards for billing**). History links allow you to gather usage information for specific periods. 

**To see more granular detail on graphs:** Click and drag a subset of the graph to see more detail for that selected timeframe.
Double-click to back out to the original detail level.

**Logs**  

The most recent log entries will show on the Dashboard screen. Errors are highlighted in red for easy recognition. Click the **--View More--** link at the bottom to view further back in the logs. 

<br>

## Subscriptions
Subscriptions can provide you with both regularly scheduled reports and on-demand alerts when errors, warnings, or specified changes occur, or if configured thresholds are reached.   


The Subscription engine allows you to customize how and when you receive reports and notifications.  The Following examples demonstrat Tenant-related Subscriptions that can help in ongoing monitoring of the health and resource usage of Tenants.  


**I. Example configuration - receive alerts for any status errors or warnings related to Tenants:**


![tenantssubscription-alert](/assets/tenantssubscription-alert.png)


**II. Example configuration - 7:15 am daily report of the All-Tenants Dashboard (overview information):**


![tenantssubscription-report](/assets/tenantssubscription-report.png)


**III. Example configuration - weekly report (to the Administrators Group) showing summary information for a specific Tenant:**

  
![singletenantsubscription-report](/assets/singletenantsubscription-report.png)


There are many options available when creating subscriptions.  See full instructions here: [**Subscriptions-Overview](/product-guide/subscriptions-overview)
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
- **Storage Used** - This is the current actually used storage across the entire storage tier. This includes storage used for the entire tenant. This number is the deduplicated amount used. The actual amount used can be much higher if exported outside of VergeOS. 
- **Storage Provisioned** - Provisioned storage is the amount of storage that was provisioned when creating this tier. You can use more than the provisioned amount as long as the host has enough storage available. Caution should be used as you do not ever want to run out of storage at the host level. 
- **Storage Allocated** - This is the amount of storage allocated to the tenant and all of its workloads. For example, when creating VMs this is the total size of the drives. This also includes the allocated storage in your snapshots as well. 



In general, you should always Provision more storage than Used or even Allocated. -->


**Usage**
CPU, RAM, and Storage usage for the Tenant is provided in graph form (**5-minute intervals**) as well as statistic listings for the current **5-second “heartbeat”**, with statistics information saved for the **5-minute** intervals (**corresponding to standard 95th percentile standards for billing**). History links allow you to gather usage information for specific periods. 

**To see more granular detail on graphs:** Click and drag a subset of the graph to see more detail for that selected timeframe.
Double-click to back out to the original detail level.

**Logs**
The most recent log entries will show on the Dashboard screen. Errors are highlighted in Red for easy recognition. Click the **--View More--** link at the bottom to view further back in the logs. 

<br>

## Subscriptions
Subscriptions can provide you with both regularly scheduled reports and on-demand alerts when errors, warnings, or specified changes occur, or if configured thresholds are reached. Instructions for a few typical Tenant-related subscriptions follow. For more information regarding Subscriptions, consult contact VergeIO Support for assistance.

**All Tenants**
To Create a Subscription to Receive Alerts for Status Errors or Warnings related to Tenants:

1. From the **Tenants Dashboard**, click **Subscriptions** on the left menu. 
1. Click **New**.
1. Select **User Type** (User or Group).
1. Select **Owner** (specific User/Group).
1. The **Target Type and Type fields are already populated as needed** since Subscriptions was selected from the Tenants Dashboard. 
1. Enter a **Name for the Subscription**.  The name you enter will appear in the **email message sent**. 
1. In the Subscription **Type**, select **On-demand**. 
1. In the Subscription profile, select **Tenants Dashboard Status Warnings** or **Errors**.
1. **Reminder while active and Throttle to..** fields can be configured to control the frequency of alerts.

![monit-7.png](/public/monit-7.png)

**To Create a Daily Subscription with a Summary of all Tenants (Tenants Dashboard):**

1. From the **Tenants Dashboard**, click **Subscriptions** on the left menu. 
1. Click **New**.
1. Select **User Type** (User or Group).
1. Select **Owner** (specific User/Group).
1. The **Target Type and Type fields are already populated as needed** since Subscriptions was selected from the Tenants Dashboard. 
1. Enter a **Name** for the Subscription.  
1. In the Subscription **Type**, select **Scheduled**. 
1. In Subscription profile, select **Tenants Dashboard**. 
1. In the **Frequency** field, select **Daily**.
1. Select **Hour and Minute** fields for desired time. 
1. Click **Submit**. 

The following screenshot shows a Daily Subscription configured to send each day at 7:15 AM. 
![monit-8.1.png](/public/monit-8.1.png)

**Individual Tenant**

**To Create a Weekly Subscription with a Summary of  an Individual Tenant (individual Tenant Dashboard):**

1. From the **particular Tenant Dashboard**, click **Subscriptions** on the left menu. 
1. Click **New**.
1. Select **User Type** (User or Group).
1. Select **Owner** (specific User/Group).
1. The **Target Type and Type fields are already populated as needed** since Subscriptions was selected from the desired Tenant Dashboard. 
1. Enter a **Name** for the Subscription.  
1. In the Subscription **Type**, select **Scheduled**. 
1. In the **Subscription** profile, select **Tenants Dashboard**. 
1. In the **Frequency** field, select **Weekly**.
1. Select the desired **Day of Week**.
1. Select **Hour and Minute** fields for desired time. 
1. Click **Submit**. 


The following screenshot shows a **Subscription** configured to receive a weekly Dashboard report for the “**CustomerABC**” Tenant, every **Monday** at **12:00 PM**.  The Subscription is configured to go to the “**SrvAdmin**” Group. 

![monit-9.png](/public/monit-9.png)
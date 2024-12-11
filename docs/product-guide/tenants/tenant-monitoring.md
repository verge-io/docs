# Monitoring Tenants

This page discusses the use of Dashboards and Subscriptions to oversee Tenants. Dashboards will provide a lot of helpful information about Tenants. Subscriptions allow for sending reports and on-demand alerts based upon various events.

## The All-Tenants Dashboard (summary info)

The All-Tenants Dashboard provides an overview of Tenants with links to drill down to more detailed information.

**To access the All-Tenants Dashboard:**

Click on **Tenants** from the Main Dashboard (**Quick-link or left menu**).

### Counts/Status Indicators

In the top left of the Tenants Dashboard, counts and status indicators will show the number of Tenants powered on/total number of Tenants; and the number of Tenant Nodes powered on/total number of Tenant Nodes. These count boxes are clickable to access the list of Tenants or list of Tenant Nodes, respectively.

### Usage

Usage sections provide a **quick view** of the **top usage** among your Tenants, across **CPU, RAM, Storage, and Network**. Each list entry here is also a **link** to the individual Tenant Dashboard to quickly access more detailed information about the particular Tenant.

## Individual Tenant Dashboards

Each Tenant has its own Dashboard to show configuration and summary information for the individual Tenant, with each card on the dashboard providing a link to increased detail.

**To access a particular Tenant's Dashboard:**

1. From the (All) Tenants Dashboard, click **Tenants**.
2. **Double-click** on the **desired Tenant** in the list.

### Understanding Storage Used/Provisioned/Allocated

* **Provisioned** - the amount of (post-deduplication*) storage that has been specified as available to the tenant. A Tenant's provisioned storage is not a hard limit. However, log alerts are triggered based on this threshold; monitor the All-Tenants Dashboard and Logs for warnings and alerts.

!!! tip
    Subscriptions (covered below) are a good tool to use for monitoring Tenant storage; You can get dashboard reports on a regular basis and notifications based on storage thresholds.

* **Used** - reflects the tenant's actual consumed storage, after deduplication*.

* **Allocated** - identifies the top amount of storage that would be utilized should all the Tenant's disk devices be filled to capacity. The amount of allocated storage can often show a much larger number than used or provisioned because device files are thin provisioned; the amount of storage allocated to a VM drive/NAS volume is not consumed by the vSAN until actually used, e.g. a 4TB VM drive that only contains 200GB of data has 4TB allocated, but only uses 200GB (minus any deduplication*) of vSAN space

!!! info
    Tenant storage numbers only consider deduplication within the Tenant's own stored data. Cross-tenant deduplication is not factored in.*

### Usage Statistics

CPU, RAM, and Storage usage for the Tenant is provided in graph form in **5-minute intervals**. Statistic listings for the current **5-second "heartbeat"** are displayed under the graph. History links allow you to see beyond the current 5-minute interval and gather usage information for specific periods. Historical statistical information is saved at **5-minute** intervals, **corresponding to standard 95th percentile standards for billing**.

**To see more granular detail on graphs:** Click and drag a subset of the graph to see more detail for that selected timeframe. Double-click to back out to the original detail level.

### Logs

The most recent log entries will show on the Dashboard screen. Errors are highlighted in red for easy recognition. Click the **--View More--** link at the bottom to view further back in the logs.

## Subscriptions

Subscriptions can provide both scheduled reports and on-demand alerts when errors, warnings, or specified changes occur, or if configured thresholds are reached. Subscription emails are sent to the defined email address(es) of the user(s).

The Subscription engine allows you to customize how and when you receive reports and notifications. The following examples demonstrate Tenant-related Subscriptions that can help in ongoing monitoring of the health and usage of Tenants.

### I. Example configuration - receive alerts for any status errors or warnings related to Tenants:

![tenantssubscription-alert](screenshots/tenantssubscription-alert.png)

### II. Example configuration - 7:15 am daily report of the All-Tenants Dashboard (overview information):

![tenantssubscription-report](screenshots/tenantssubscription-report.png)

### III. Example configuration - weekly report (to the Administrators Group) showing summary information for a specific Tenant:

![singletenantsubscription-report](screenshots/singletenantsubscription-report.png)

There are many options available when creating Subscriptions. For more information see: [**Subscriptions-Overview**](/product-guide/subscriptions-overview)

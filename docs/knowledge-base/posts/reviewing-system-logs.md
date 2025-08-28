---
title: System Logs
slug: system-logs
description: 
draft: false
date: 2023-08-30T18:05:00.332Z
tags:
  - logs
  - cluster
  - troubleshooting
  - support
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2022-08-23T19:19:56.461Z
---

# System Logs

---

## Overview

System logs are essential for monitoring and troubleshooting the performance and security of your systems. This article provides a guide on how to review system logs within the dashboard, configure third-party logging, and understand the log retention period.

## Types of Logs

1. **System Logs**:
   - System logs capture activities related to vSAN, VM activities, and other system-related operations. These logs are essential for understanding the detailed operations and performance of the entire system

2. **Sync Logs**:
   - Sync logs are available on both incoming and outgoing sync dashboards. These logs display entries for the start and completion of each Snapshot sync. Each entry includes statistics for the amount checked, scanned, sent, net sent, and the count of directories and files.

3. **System Event Log (SEL)**:
   - The SEL contains events from the hardware IPMI interface. Since this log is stored on hardware, it has limited capacity. The node dashboard displays a percentage bar indicating the amount of SEL capacity currently used.

---

## Reviewing System Logs

### Example of Logged Activity

The log in the following screenshot shows several specific events as examples of logged activity.

![system_logs.png](/product-guide/screenshots/system_logs.png)

- From the entry time-stamped on March 28th, 2022 at 9:21:35, there is a record of the IP address from where the admin user logged in, along with the date and time of the login.
- The entry at 9:21:55 shows that the user named 'admin' had the password changed from the root environment.
- The entry at 9:22:53 records the admin user changing their own password in this environment.

### Log Retention Period

- VergeOS retains logs for **45 days**. After this period, logs are automatically deleted. For compliance and troubleshooting, consider this retention period and enable third-party logging for long-term storage.

### Viewing Context-Specific Logs

- In many areas of the platform, such as a specific VM dashboard, there is a **Logs** button to view logs specific to that context. This helps filter out unrelated logged events.

---


## Reviewing Sync Logs

- Sync logs can be accessed directly from the sync dashboard.
- Each log entry provides detailed information about the sync process, including:
  - Start and stop times
  - Amount of data checked
  - Amount of data scanned
  - Amount of data sent
  - Net data sent
  - Directory and file counts

---

## Reviewing SEL

1. **Check SEL Capacity**:
   - The node dashboard displays a percentage bar showing the current usage of SEL capacity. Monitor this to ensure that the SEL does not become full, which would prevent new events from being recorded.

2. **Clear SEL**:
   - If the SEL is nearing full capacity, clear it by following these steps:
     1. From the **Main Dashboard**, select **Nodes**.
     2. Double-click the desired node to access the **Node dashboard**.
     3. Click **Clear SEL** on the left menu.
     4. Click **Yes** to confirm.

---

## Third-party Log Collection

VergeOS records user-initiated and automated activity in *System logs*, accessible at the bottom of the Main Dashboard page or by selecting *Logs* in the left navigation menu. Logged activity is typically available within the VergeOS user interface for a maximum of 45 days. To retain logs beyond this period, configure a third-party Syslog collection service.  Instructions for configuring VergeOS log forwarding to an external service are available at: **[KB Enabling Third-party Log Collection](/knowledge-base/configuring-remote-log-forwarding)**

---

## Best Practices

- **Regular Monitoring**: Regularly monitor system logs to stay informed about system health and performance.
- **Clear SEL as Needed**: Ensure the SEL is cleared periodically to avoid the loss of new event data.
- **Review Sync Logs**: Regularly review sync logs to ensure synchronization processes are running smoothly and to diagnose any potential issues.
- **Utilize 3rd Party Tools**: Use third-party logging tools for enhanced log analysis, long-term storage, and better integration with your overall monitoring setup.



---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

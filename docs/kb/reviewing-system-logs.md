---
title: Reviewing System Logs
description: 
published: true
date: 2023-08-30T18:05:00.332Z
tags: 
editor: markdown
dateCreated: 2022-08-23T19:19:56.461Z
---

## How to Review the System Logs and Configure Syslogging.

VergeOS records user initiated and automated activity and displays it in the system Log. System logs can be reviewed from the Main Dashboard at the bottom of the page or by selecting the **Logs** button in the left navigation menu.  
  
VergeOS keeps logged activity for a maximum of **45** days. Logs can be exported out of the system by configuring a 3^rd^ party log collection service for long-term record keeping. 

To configure a 3^rd^ party system logger;
1. Select **System** in the left navigation menu from the main dashboard 
1. Inside of the System menu select **Settings** in the left navigation menu
1. Select **Advanced Settings** on the left 
1. Search "syslog"
1. Select and edit "Remote syslog server (tcp: @@name/ip:port, udp: @name/ip:port)"
1. Configure that setting following the implied syntax in the setting name.  
**Examples:** **For TCP**: @@10.10.10.10:514 or **For UDP**: @10.10.10.10:514
1. Search "syslog"
1. Select and edit "Template to define for syslog server (See rsyslog for format)"
1. Enter a syslog template format that is compatible with the syslog server
**Example:** 
```
GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.HOSTNAME_HERE %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
```
For more information on syslog templates visit the [Rsyslog Website](https://www.rsyslog.com/doc/master/configuration/examples.html).

Additionally, in many areas of the platform, such as a specific VM dashboard, there is a **Logs** button to view only logs specific to that context. This is often helpful in filtering out many logged events that aren't relevant to a specific area of the platform.  
  
The log in the following screenshot shows several specific events as examples of logged activity.  
 
![system_logs.png](/public/system_logs.png)

-   From the entry time-stamped on March 28th, 2022 at 9:21:35, there is a record of the IP address from where the admin user logged in (IP address) and the date and time of the login.
-   From the entry time-stamped on March 28th, 2022 at 9:21:55, this log entry recorded that the user named 'admin' had the password changed from the root environment (parent system) above this tenant.
-   From the entry time-stamped on March 28th, 2022 at 9:22:53, the user, admin, changed their own password in this environment.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
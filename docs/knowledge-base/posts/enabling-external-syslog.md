---
title: Enabling External Log Collection (Syslog)
slug: enabling-external-log-collection
description: 
draft: false
date: 2023-08-30T18:05:00.332Z
tags:
  - logs
  - troubleshooting
  - support
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2022-08-23T19:19:56.461Z
---


## Enabling Third-Party Log Collection

VergeOS can be configured to forward logs to a remote Syslog server, an important capability for organizations leveraging log aggregation for centralized management, log archival, and compliance. 

!!! tip "Logged activity is typically available within the VergeOS user interface for a maximum of **45 days**.  Configure third-party log collection to retain logs for longer periods. "  


To configure log forwarding to a third-party Syslog server:

1. From the Main Dashboard, navigate to **System > Settings > Advanced Settings**.

2. **Search and Configure Syslog**:
   - Under the "Setting" column heading, type "**syslog***" and enter to search. 
   - Select and edit **Remote syslog server (tcp: @@name/ip:port, udp: @name/ip:port)**.
   - Configure this setting according to the syntax expected on the remote server:
     - **Examples:** 
       - For TCP: `@@10.10.10.10:514`
       - For UDP: `@10.10.10.10:514`
   - Click **Submit** at the bottom of the page.
   - Search "syslog" again.
   - Select and edit **Template to define for syslog server (See rsyslog for format)**.
   - Enter a syslog template format that is compatible with the remote syslog server.
     - **Example:**
       ```plaintext
       GRAYLOGRFC5424,"<%PRI%>%PROTOCOL-VERSION% %TIMESTAMP:::date-rfc3339% %HOSTNAME%.HOSTNAME_HERE %APP-NAME% %PROCID% %MSGID% %STRUCTURED-DATA% %msg%\n"
      ```
     - For more information on syslog templates, visit the [Rsyslog Website](https://www.rsyslog.com/doc/master/
     configuration/examples.html).  
   - Click **Submit** at the bottom of the page to save the format.
     


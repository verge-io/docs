---
title: Product Guide -Update Settings
description: Listing of all update settings along with explanation of each
published: true
date: 2023-06-27T14:32:26.092Z
tags: 
editor: markdown
dateCreated: 2023-04-07T17:40:20.697Z
---

# Update Settings

> Update Server settings do not commonly need adjustment; they are typically configured during install and implementation. {.is-success}  

<br>
  
**Update Server**
Should be set to "**Vergeio Updates**"
<br>

**User/Password**
Login credentials for the Update Server (provided by the VergeIO Implementation Team) 
> It is cruicial to have proper username/password entered here; without authentication to the Update Server, system functionality will effectually be disabled (virtual machines cannot be started, no NAS functionality, etc.) {.is-warning}

<br>

**Branch**
Reflects the product version (e.g 4.10, 4.11, etc.). Updates for download and install will reside in the selected branch. If updates are discovered in a newer branch, a message will display on the Updates Dashboard giving the option to change to the newer branch.
<br>

**Auto Check for Updates (checkbox)**
Enabled by default. When enabled, the system will check for updates hourly. Available updates are reflected on the Updates Dashboard. Enabling this option simply checks for available updates; it does not automatically install/download discovered updates.
<br>

**Auto Update (checkbox)**
When enabled, updates are initiated automatically at the time specified in the ***Update Time*** field below
<br>

**Update Time**
Time of day to apply Auto Updates (if enabled), based on 24-hr clock.
<br>

**Max vSAN Usage Percentage**
Threshold at which Node reboots will need to be done manually for the update process. If the vSAN usage is above the specified max, manual reboot of Nodes will be necessary to apply updates.

<br> 

**Take Cloud Snapshot on Update (checkbox)**
When enabled, a cloud snapshot is taken immediately prior to update. By default this option is enabled. It is typically recommended to keep enabled as it allows for a roll back to pre-update state e.g. for use when an update has to be cancelled mid-process or in some way produces an unwanted result.
<br>

**Cloud snapshot expiration period / Units**
Determines the amount of time to retain the update snapshot (taken pre-update when above option enabled). The default setting is 6 hours.

>The *Cloud snapshot expiration period* setting will determine the initial retention for an update snapshot; expiration can also be manually changed to retain the particular snapshot for a shorter or longer time frame.{.is-success}

<br>

**Keep System Information Anonymous When Sending Usage Statistics**
Excludes proprietary information, such as VM, tenant and network names from usage information that is sent to the Update Server.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
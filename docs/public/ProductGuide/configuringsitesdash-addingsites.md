---
title: Product Guide - Adding Sites to the Dashboard
description: Instructions for adding a site to the Sites Dashboard, with information about configuration settings for: snapshot sync, statistic syncing, remote machine management, and enabling repair servers, 
published: true
date: 2023-06-26T15:12:04.583Z
tags: 
editor: markdown
dateCreated: 2023-03-31T20:36:12.523Z
---

# Configuring the Sites Dashboard (Adding Sites)

Each site that is added to the Sites Dashboard can be included with options:
- **sync** (incoming and/or outgoing)
- **statistics monitoring**
- **(cross-system) machine management**
- **repair server** (incoming and/or outgoing)

<br>

## To Add a Site to the Dashboard

1.  From the Main Dashboard, Click **Sites** on the left menu.
2.  Click **New Site** on the left menu.
![newsiteform.png](/public/userguide-sshots/newsiteform.png)

3.  Enter a ***Name*** that clearly identifies the system, such as a location description.
4.  Enter the ***URL*** to reach the system, Ex: https:/[]()/Chicago-verge.abcco.com  (URL must be reachable from this VergeIO system)
5.  ***Allow Insecure SSL Connection*** will permit site connections without a valid CA-signed certificate (e.g. missing, invalid, expired, or self-signed certs). 

> ***The Allow Insecure SSL Connection* option is NOT intended for normal use; it should only be selected in cases where site connections are secure (e.g. behind a common firewall, connected via private lines), or for short durations to troubleshoot initial connection issues.** {.is-warning}

6.  Enter ***User*** of the remote system. (admin-level user required).
7.  Enter the ***Password*** for the user entered above.
<br>


<a name="config"></a>
#### Configuration
8.  ***Cloud Snapshots***: - system-to-system transfer of cloud snapshots to facilitate data archiving, DR, etc.; also referred to as **site sync**.
    -   **Disabled** - does not configure snapshot sync between these systems
    -   **Send cloud snapshots to this site**\* - auto creates outgoing sync on this system and incoming sync on the other side to allow transferring snapshots from this system to the remote one
    -   **Receive cloud snapshots from this site**\* - auto creates incoming sync on this system and outgoing sync on the other side to allow transferring snapshots from the remote system to this one.
    -   **Send and receive cloud snapshots from this site**\* - auto creates incoming and outgoing syncs on both sides to facilitate snapshot transfer both ways

> **\*** Selecting these options will auto generate the necessary incoming/outgoing syncs, and auto registers with receiving systems. Additional configuration is required on the outgoing system to select the snapshots to synchronize; additionally, the sync can be scheduled to occur within specific time frames (e.g. outside of regular business hours); see [Sync Configuration](/public/ProductGuide/sync-configuration) for instructions. {.is-info}    
    
9.  ***Sync Statistics***:  - continual status information transfer between sites, for simpler monitoring of multiple  systems: displays high-level status info for each site with the ability to drill down on a specific site for more detailed information
    -   **Disabled** - does not configure statistics transfer between these systems
    -   **Send statistics to this site** - will send statistics from this system to the remote one
    -   **Receive statistics from this site** - will send statistics from the remote system to this one
    -   **Send and receive statistics from this site** - will send local statistics to the remote system and from the remote system to this one
    
    <br>
    
10.  ***Machine Management***: - allows power on/power off, reset and kill power of VMs from the site dashboard

> Sync statistics must be configured (above) to allow machine management.{.is-info}

-   **Disabled** - does not configure remote machine management between the systems
-   **Manage this site's machines** - allows management of the other system's VMs to be performed from this system
-   **This site can manage my machines** allows management of this local system's VMs from the other system
-   **Allow bi-directional management of machines** - allows management of both systems's VMs from the other

<br>



11.  ***Repair Server***:  - automatic potential rehabilitation if a system experiences problems extending its redundancy tolerance, such as multiple, simultaneous drive failures across nodes, Typically, a repair server would be a sync destination that contains a relatively recent replication of the given system. More information about repair servers can be found here: [Repair Servers](/public/ProductGuide/repairserver)


   -   **Disabled** - does not configure repair servers between these systems
   -   **Connect to this site for repairs** - configures the remote site as a repair server for the local system
   -   **Receive connections from this site for repairs** - configures local system as a repair server for the remote site
   -   **Enable bi-directional repair servers** - configures both systems to provide repairs for the other
   
<br>

2.  Click **Submit** (bottom of page) to finish adding the site.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
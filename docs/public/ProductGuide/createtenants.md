---
title: Product Guide - Creating Tenants
description: Instructions for creating a new tenant, using 3 methods: Custom Tenant Wizard, cloning, tenant recipes
published: true
date: 2024-03-25T17:50:14.978Z
tags: 
editor: markdown
dateCreated: 2023-04-06T20:32:11.428Z
---

# Creating Tenants

### There are 3 methods available for creating a new tenant:

<br>

-   Using the **Custom Tenant Wizard**
-   **Cloning** an Existing tenant
-   Using a **Tenant Recipe**

<br>
<br>


## Method 1: Custom Tenant Wizard

The Custom Tenant Wizard steps through multiple input forms to create a new custom tenant.

<br>

### To Create a New Tenant via the Custom Tenant Wizard:

1.  Click **Tenants** from the Main Dashboard (quick-link or left menu).
2.  Click **New Tenant** on the left menu.
3.  From the **Catalog list** (top left), select ***\--Custom--.***
***Custom Tenant*** will now display under the Selection area on the right and will be the selected item.

4.  Click **Next** (bottom of the screen). The ***Tenant Settings* form appears.**

6.  Enter a ***Name*** for the tenant.
7.  ***URL*** is simply a helper field to provide a link to the tenant's UI. (The ***Connect to UI*** menu link in the service provider's VergeIO user interface.) This field can be left blank as it will automatically be populated when the first External IP is assigned to the tenant.
8.  Enter an ***Admin User Password*** and again in the ***Confirm Admin User Password*** field (required). This sets the password for the tenant’s “admin” root user that will be auto-created.
9.  **Optionally,** ***Require Password Change*** (checkbox) can be selected to “force” a password change when the tenant admin initially logs in.
10.  **Optionally**, a ***Description*** can be entered to record more information about the tenant.
11.  By default, the ***Expose Cloud Snapshots*** option (checkbox) is selected. When selected, the tenant is able to browse the cloud snapshots of the parent and “self-serve” download their own tenant snapshot from the provider's snapshot timestamps.
12.  **Optionally**, the ***Allow Custom Branding*** option (checkbox) can be selected to enable the tenant to customize their own VergeIO dashboard with different colors and logo.
13.  **Optionally**, the ***Custom help URL*** allows for providing alternate help content for the tenant by providing a URL to the location of the alternate help content. When a URL is defined here, the tenant users will see the content at the provided URL rather than the built-in help content.
14.  Click **Submit** (bottom of page) to proceed. The ***New Tenant Node* form appears**.

> Settings defined on the New Tenant Node form will apply to the single tenant node created with the wizard. Additional tenant nodes (if needed) can be created upon completion of the wizard.{.is-success}

15.  Select the number of ***Cores*** to provision to the tenant node.
16.  Select the amount of ***RAM*** to provision to the tenant node (can be specified in Gigabyte or Megabyte).
17.  **Optionally**, a ***Cluster*** can be selected to run the tenant, or it can be left at --Default -- (specified by System ->Settings ->Default cluster for tenant nodes)
18.  **Optionally**, a ***Failover cluster*** can be selected to run the tenant if the primary selected cluster is not available. Or it can be left at --Default -- (specified by ***System -> Settings ->Default cluster for tenant nodes***)
19.  Defining a ***Preferred node*** is **Typically Not Recommended** for a tenant node. This is an advanced setting for tenant nodes; setting this incorrectly can adversely affect built-in redundancy. Use this setting with care and consult with Support for additional assistance.
20.  **Optionally**, a ***Description*** can be entered to record further information for this initial tenant node.
21.  Select desired ***On Power Loss*** setting:
    -   **Last State** - tenant will only be powered on if it was on at the time of power loss.
    -   **Leave Off** - tenant will not be powered on when power is restored (regardless of its state at the time of power loss).
    -   **Power On** - tenant will be powered on when power is restored (regardless of its state at the time of power loss).
22.  Click the **Submit** button (bottom of page) to proceed. The ***New Tenant Storage* form appears**.

23.  Select a ***Storage Tier*** from the dropdown list.
24.  Enter an amount in ***Provisioned*** and select the desired unit of measure: Byte(B), Kilobyte(KB), Megabyte(MB), Gigabyte(GB), Terabyte(TB). NOTE: Storage is thin provisioned.
25.  Click **Submit** (to provision defined storage)  

**-OR -- Skip** to proceed without provisioning storage (can be provisioned later).
    
26.  Here you can optionally assign one External IP to the tenant. External IPs can be assigned to a tenant after creation as well. By default, the first External IP assigned to a tenant is configured to be the tenant's UI address.

> Remember that an External IP is one that is simply external to the VergeIO system; it may or may not be a public Internet address; an External IP can be a private address on your external LAN/WAN, for example: 10.10.10.100. {.is-success}

   -   Select from the ***Assign External IP\**** dropdown. (This list will include all unassigned Virtual IPs defined in the Parent).
**-OR-**
   If the desired IP is not already configured as a Virtual IP in the parent system, click the ***Create a new External IP*** link to create the IP.
   <br>
         ***Create External IP input form:***
        - ***Network*** - select appropriate network from the dropdown list.
        - ***Type***  - make sure **Virtual IP** is selected.
        - ***IP Address*** - enter the Public(external) IP address or leave blank to auto-create the next available IP in the network.
        - **Hostname and Description fields** -can be left blank.
        - ***Owner*** (dropdown) should display the name of the new tenant.
27.  Click **Submit** to finish. You should see a message saying the tenant was created successfully and you are taken to the new tenant dashboard.

> If External IP(s) were assigned to the tenant, rules will need to be applied to the selected external network. Click the orange-highlighted message "Needs Apply Rules" on the tenant dashboard to apply the necessary rules.{.is-info}


***To Start the New Tenant:***
Upon creating a tenant, the UI will land at the tenant dashboard page. From this dashboard page, the tenant can be started by clicking **Power On** on the left menu.

<br>
<br>
<br>

## Method 2: Tenant Clone

Cloning a tenant will make a duplicate of an existing tenant. This can be very useful for testing, development, restores, and other scenarios when you need a copy of a tenant (such as running the tenant in a separate network for testing).

<br>

### To Create a New Tenant from a Clone:

1.  Click **Tenants** from the Main Dashboard (quick-link or left menu.)
2.  Click **New Tenant** from the left menu.
3.  From the ***Catalog list (top left)***, select ***\--Clone Existing--***.
4.  All VMs will be listed under the ***Selection*** area on the right. **Select the desired VM.** Click **Next** (bottom of page).

    The ***Name* input form appears**.
    
5.  The ***Name*** for the tenant clone can be changed as desired. (The Name will default to the *NameofSourceVM* +”clone”, for example: when cloning a tenant named “Tenant2”, the Name will default to “Tenant2 clone”.)
6.  Optionally, the ***Clone as New Tenant*** option can be selected to create the new tenant instance without accompanying history statistics, logs, and snapshots with expiration; this is the recommended option when these items are not needed.
7.  Click **Submit** (bottom of page).
The tenant is created and the new tenant dashboard appears.


<br>

**To Start the New Tenant:**
From the tenant dashboard page the tenant can be started by clicking Power On on the left menu.



<br>
<br>

## Method 3: Tenant from Recipe

Tenant recipes allow for creating an entire tenant from an existing, predefined tenant. Recipes have questions that allow customizing each new tenant.

<br>

### To Create a New Tenant using a Recipe:

1.  Click **Tenants** from the Main Dashboard (quick-link or left menu.)
2.  Click **Tenant Recipes** from the left menu or count box.
3.  **Double-click the desired recipe** to use (or check the box and click View on the left menu).
4.  Click **New From Recipe** on the left menu.
5.  The next screen will be unique based on the questions defined in the tenant recipe. **Fill out all the appropriate fields**.
6.  Click **Submit** (bottom of page).

**To Start the New Tenant:**
Upon creating a tenant, the UI will land at the tenant dashboard page. From this dashboard page, the tenant can be started by clicking **Power On** on the left menu.  
<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
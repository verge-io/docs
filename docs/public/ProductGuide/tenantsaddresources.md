---
title: Product Guide - Increasing a Tenant's Resources
description: Instructions and considerations for allotting additional resources to a tenant - including storage, RAM and cores
published: true
date: 2023-06-27T13:47:33.391Z
tags: 
editor: markdown
dateCreated: 2023-04-07T14:25:53.744Z
---

# Increasing a Tenant's Resources


<br>

## Adding Cores/RAM

When increasing a tenant’s compute resources, evaluate if the needed increase can be added to an existing tenant node or scaling out with an additional node is necessary. The maximum resources that can be added to a single tenant node is determined by the cluster settings: ***Max RAM per machine*** and ***Max cores per machine*** for the cluster to which the tenant node is assigned.

<br>

## **Tenant Node Planning**

In General, it is best to max out the compute resources assigned to each tenant node before adding an additional node; however, there may be situations where it will be better to balance resources between tenant nodes. 

**Example:**

-   A customer needs a total of 64GB RAM, and the max allowed on the cluster is 62GB.
-   Rather than max out the first tenant node at 62GB and add a second node at only 2GB, it would be better to equally balance between 2 - each with 32GB RAM, as it would not be practical to run a node with only 2GB.

For additional guidance in planning tenant node resources, contact Support. Instructions below cover adding resources to an existing tenant node and adding another tenant node.

<br>

### Adding Resources to an Existing Tenant Node:

1.  From the **tenant dashboard**, click **Nodes** on the left menu.
2.  The node list appears. **Double-click** the desired **node**.
3.  The **tenant node Dashboard** appears.
4.  Click **Edit** on the left menu.
5.  Modify the Cores and/or RAM fields as desired.
6.  Click **Submit**.


<br>

### Adding a Tenant Node:

1.  From the **tenant dashboard**, click **Nodes** on the left menu.
2.  Click **New** on the left menu.
3.  Select the number of ***Cores*** to provision to the tenant node.
4.  Select the amount of ***RAM*** to provision to the tenant node (can be specified in Gigabyte or Megabyte) **NOTE:** The system will always allow assignment of Cores/RAM to a tenant node regardless of how much RAM has already been provisioned; however, the resources must actually be available to power on the tenant node.
5.  **Optionally**, a ***Cluster*** can be selected on which to run the tenant, or it can be left at --Default -- (specified by System > Settings > Default cluster for tenant nodes).
6.  **Optionally**, a ***Failover cluster*** can be selected on which to run the tenant if the primary selected cluster is not available. Or it can be left at --Default -- (specified by **System > Settings >** ***Default cluster for tenant nodes***)
7.  Setting a ***Preferred node*** is **not typically recommended** for tenant nodes. This is an advanced setting for tenant nodes; setting incorrectly can adversely affect built-in redundancy. Use this setting with care. Consult with  Support for additional assistance, if needed.
8.  **Optionally**, a ***Description*** can be entered to record further information for this tenant node.
9.  Select desired ***On Power Loss*** setting:
    -   **Last State** - tenant will only be powered on if it was on at the time of power loss.
    -   **Leave Off** - tenant will not be powered on when power is restored (regardless of its state at the time of power loss).
    -   **Power On** - tenant will be powered on when power is restored (regardless of its state at the time of power loss).
10.  Click **Submit**.


<br>

## Provisioning Additional Storage to a Tenant

<br>
<br>

### To Provision a New Tier of Storage to a Tenant:

1.  Navigate to the **tenant dashboard**.
2.  Click **Add Storage** on the left menu.
3.  **Select** the **desired Tier** from the dropdown list.
4.  Enter the desired amount of storage in the ***Provisioned*** field and select the desired unit of measure (B, KB, MB, GB, TB)
5.  Click **Submit** to add the provisioned storage.

<br>
<br>

### To Add More Storage on a Tier that is Already Provisioned to the Tenant:

1.  Navigate to the **tenant dashboard**.
2.  **Scroll** down to the **Storage** section.
3.  Click the **Edit button** (far right) for the **desired tier**.
4.  Change the ***Provisioned*** field to the total amount to be provisioned to the tenant. (For example, if the current amount is 50GB and you want to add 25GB, enter the new desired total: 75GB).
5.  Click **Submit** to save the change.

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
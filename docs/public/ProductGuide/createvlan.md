---
title: Product Guide - Creating VLANs
description: Instructions for configuring VLANs within the VeregOS environment
published: false
date: 2023-08-03T14:54:34.759Z
tags: 
editor: markdown
dateCreated: 2023-06-15T15:43:25.482Z
---

# VLANs

<br>
<br>

> For VLAN configuration **at the host level:** verify switchports are configured appropriately so that physical VeregOS nodes have access to the desired VLAN(s).
{.is-info}

> For VLAN configuration within a **tenant:** [**Virtual Wires**](/product-guide/virtualwires) must first be configured to provide external layer2 access to the tenant. {.is-info} 

<br>
<br>


## Configure a VLAN 


<br>

1. From the **Main Dashboard** click the **Networks** quick-link or left menu option.
2. Click **New External** on the left menu.
3. Enter a **Name** for the network. Use a name that will be helpful for administration, such as 
a description of the VLAN purpose and/or ID.
4. In the **Layer 2 Type** dropdown list, select ***vLan***.
5. Enter the appropriate **Layer 2 ID**. 
6. Select the appropriate physical network from the **Interface Network** selection list.
    - ***Host networks:** *the network selected here **must be a physical network where the VLAN enters the VeregOS environment**.  Typically, physical networks are created during install with the word "Switch" appended to the name, for ex: "External1 Switch" 
    - ***Tenants:*** select **"Physical"**
    <br>

7. In the ***IP Address Type*** field, select ***None***.

7. **Typically, all other fields** can be left at their **default settings**.  
<!--check about MTU -- is this just always default at 1500?  should we mention it should probably be set at the same as the physical network is set, in most cases?-->

8. Click **Submit** (bottom of page) to complete the VLAN configuration.

The dashboard for the newly created network should now appear and show  **Status: Running**.

> This new network can be selected on VM NICs in order to attach workloads to the associated VLAN(s). {.is-success}






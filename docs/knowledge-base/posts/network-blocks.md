---
title: Network Blocks
slug: network-blocks
description: Creating Network Blocks
draft: false
date: 2024-01-03T18:42:31.354Z
tags: network, networking, network blocks, subnet
categories:
  - Network
editor: markdown
dateCreated: 2024-01-03T17:19:47.187Z
---

## Network Blocks Overview

Network blocks in VergeOS are a powerful way to assign multiple IP addresses to tenants or networks for workloads. This method is preferred over virtual wires since VergeOS focuses on Layer 3 connectivity, avoiding the common issues associated with Layer 2 connections (like virtual wires). Network blocks also allow the direct assignment of public IP addresses to VMs inside an internal network or a tenant.

## Creating a Network Block

1. In the **VergeOS UI**, navigate to the **External Network** where the network block will originate.
2. In the left menu, select **Network Blocks**, then click **New**.
3. Enter the network block information in **CIDR notation** (e.g., a.b.c.d/n).
4. To assign the block to a tenant at creation, set the **Owner Type** to **Tenant**, then select the tenant from the **Owner** drop-down.
   ![new-network-block.png](/docs/public/new-network-block.png)
5. Submit your work to create the block.
6. To apply the automatically created rules, select the **External** breadcrumb in the header to return to the network dashboard. Then, select **Apply Rules** from the left menu or click the notification pop-up.
   ![net-block-rules.png](/docs/public/net-block-rules.png)

## Creating a Network from a Network Block

1. Log in to the tenant's URL with the necessary credentials.
2. Navigate to **Networks**, then go to the **External Network Dashboard**.
3. In the left menu, select **Network Blocks**.
4. Select the network block assigned to the tenant.
5. Click **New Network** in the left menu.
   ![new-net-from-block.png](/docs/public/new-net-from-block.png)
6. Give the new network a **name**. The rest of the details will be pre-filled based on the CIDR information.
7. Modify any details in the form if necessary, then submit to create the network.
8. After creation, the system will redirect you to the new network's dashboard. The necessary routes and accept rules will be set up automatically, but note that **inbound traffic will be dropped by default**. Add appropriate firewall rules to allow inbound access.
9. **Power on** the network using the option in the left menu.
10. Assign any desired virtual machines to the network and **test connectivity**.


---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

---
title: Network Blocks
slug: network-blocks
description: Creating Network Blocks
published: true
date: 2024-01-03T18:42:31.354Z
tags: network, networking, network blocks, subnet
categories:
  - Network
editor: markdown
dateCreated: 2024-01-03T17:19:47.187Z
---

Network blocks are a handy way to assign multiple IP addresses to a tenant or network for workload use. It is the preferred method over virtual wires since the VeregOS network foundation is focused on Layer 3 connectivity. Using this method helps to circumnavigate the pitfalls of relying on Layer 2 (virtual wires) for tenant workload connectivity to resources originating outside of the environment.  It also gives you the ability to assign public IP addresses directly to VMs inside of an Internal network or a Tenant.

## Creating a Network Block
1. In the VeregOS UI navigate to the external network that the network block will originate from.
1. In the left menu select "Network Blocks" then select "New".
1. Enter the information for the corresponding block (in CIDR notation a.b.c.d/n). 
1. To assign the new block to a tenant on creation set the Owner Type to "Tenant" and then select the destination tenant from the Owner drop down.
![new-network-block.png](/public/new-network-block.png)
1. Submit your work.
1. To apply the automatically created rules select the "External" breadcrumb in the header to navigate back to the networks dashboard and then select "Apply Rules" on the left menu or on the notification pop up.
![net-block-rules.png](/public/net-block-rules.png)
1. To create a network from the new block for use inside of the tenant navigate to the tenants URL and login with the necessary credentials.
1. Navigate to networks, then to the External network dashboard.
1. Select "Network Blocks" in the left menu.
1. Select the network block assigned to the tenant.
1. Select "New Network" from the left menu.
![new-net-from-block.png](/public/new-net-from-block.png)
1. Give the new network a name. All other details will be automatically filled out with the provided information from the CIDR. Edit any information within the new network form that the default selections do not satisfy.
1. Submit your work to be redirected to the new networks dashboard. A new network with all of the necessary route and accept rules will be created for use. (Note: the new network will drop inbound traffic by default so you will need to add the appropriate firewall rules to allow inbound access.)
1. Power on the network using "Power On" in the left menu.
1. Assign any desired virtual machines and test connectivity.
<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/public/kb"><button class="button-25" style="appearance: button; background-color: #64B5f6; border-radius: 8px; color: #ffffff; padding: 10px 21px;">🢀  Back to Knowledgebase</button></a>   
<a href="https://www.verge.io/test-drive"><button class="button-25" style="appearance: button; background-color: #D9693B; border-radius: 8px; color: #ffffff; padding: 10px 21px;">Request Trial</button></a>
</div>
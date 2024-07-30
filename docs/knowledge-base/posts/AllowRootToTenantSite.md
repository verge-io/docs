---
title: Allow Root to Tenant Site Connection
slug: allow-root-to-tenant-site-connection
description: Instructions for how to create a site from a root system to a tenant
published: true
date: 2023-09-12T15:19:47.449Z
tags: routing, network, tenant, dmz, external, rules, root, translate
categories:
  - Network Rules
  - Network
  - Tenant
editor: markdown
dateCreated: 2023-09-12T14:48:12.332Z
---

## How To Allow a Root system to connect to a Tenant as a Site

> Warning: Adding this rule will allow tenants to connect on the DMZ network. By default we disable this for security reasons. 
{.is-warning}

The Sites feature was designed to connect two **VergeOS** sites together. The root system already has a list of tenants and can manage them from the tenant screen. If you wish to use the Sites features for your Tenants, a special rule is required on the Root system's **External** Network. This rule will translate outgoing traffic from the **DMZ Interface** network to use the **Router IP**. Without this the request will get blocked. Here is how to add the rule:

1. In the **Root** System, click on **Networks** then **External Networks**. 
1. Double-click on the **External** network.
1. In the **Left** menu, click on **Rules**.
1. Before adding the rule, check that it doesn't exist already.
1. Click **New** on the **Left** menu.
1. Enter the following details:
	- **Name**: Enter a descriptive name like "Allow Tenant to Root"
	- **Action**: Translate
	- **Protocol**: ANY
	- **Direction**: Outgoing
	- **Interface**: DMZ
	- **Source**: Other Network Address: DMZ
	- **Destination**: Any/None
	- **Target**: My Router IP
![2023-09-12_10_28_52-training___edit_rule__allow_tenant_to_root.png](/docs/public/2023-09-12_10_28_52-training___edit_rule__allow_tenant_to_root.png)
1. Click **Submit**.
1. Click on **Apply Rules** at the top or **Left** Menu.

After this rule is applied, you should now be able to connect to the **Tenant** Site from the **Root** system. 

## Testing Rule

To test is this works, follow the instructions below:
1. From the **Home** screen, Click **System** on the **Left** menu.
1. Click on **Nodes** on the **Left** menu.
1. **Double-Click** on **Node1** or Select **Node1** and click **View** on the **Left** menu.
1. Click on **Diagnostics** on the **Left** menu.
1. Change the **Query** to **TCP Connection Test**.
1. Set **Host** to the **UI IP/Host** of the **Tenant** system.
1. Set **Port** to **443**.
1. Click **Send**.
![2023-09-12_11_12_21-training___diagnostics.png](/docs/public/2023-09-12_11_12_21-training___diagnostics.png)

The **Response** should say **Connection successful**. If it doesn't, double check the rule for accuracy. Note that the **Interface** is set to **DMZ** instead of the normal **Auto**. Make sure there are not any block rules.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
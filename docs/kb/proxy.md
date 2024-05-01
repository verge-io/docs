---
title: Configuring Proxy
description: Configuring a Proxy Connection for a Tenant
published: true
date: 2024-04-11T16:30:54.826Z
tags: 
editor: markdown
dateCreated: 2024-04-08T16:15:30.034Z
---

Using a Proxy grants the ability to use 1 IP address for multiple Tenant environments by mapping FQDN hostnames. This bypasses the need to have 1 IP address per tenant and helps to preserve ipv4 addresses.

## Enabling Proxy
1. From the external network used to access tenant environments;
   - Select 'Edit' in the left menu
   - Enable Proxy
   - In most cases the proxy listen address field can be left blank. This will default to 0.0.0.0 which means to listen on all addresses.

> Prior to version 4.12.4 Bind DNS will need to be temporarily enabled if it is not already in use on the network. This will expose the IP Alias selection in the UI (step 2).
{.is-warning}
   - Submit the settings but **_DO NOT RESTART THE NETWORK OR APPLY RULES YET!_**

2. From the same external network;
   - Select 'IP Addresses' in the left menu
   - Edit or create an IP Address to use the type 'IP Alias'
   - Submit
   - Set the external network DNS back to the original setting (Prior to Version 4.12.4)
   - Select 'Rules'
   - Create a new rule that looks like the following image
   ![proxy_accept_rule.png](/public/proxy_accept_rule.png)
   - Restart the network and apply the rules
   - Test the rule by opening a browser tab and navigating to the URL using the IP Alias address assigned in the previous step. If it works properly the UI login page will open on the IP Alias address.

## Creating a New Tenant with Proxy
1. Create an A record for the new tenant in your domain registrar to point to the assigned IP Alias
1. Create a new tenant;
   - Enter all of the desired settings leaving the URL blank
1. In the 'UI Management' tab of the tenant creation page select 'Create a new FQDN'
1. In the 'Proxy Tenant Config' page;
   - Select the network the proxy service is running on
   - Select the tenant name
   - Enter the FQDN of the tenant (The A record created in step 1 of this section)
   - Submit
1. Select skip at the bottom of the 'UI Management' page to avoid assigning an IP directly to the tenant
> A tenant cannot have a UI IP address **AND** a proxied FQDN
{.is-info}

6. In the new tenant dashboard select 'Apply Proxy' in the highlighted warning
   ![apply_proxy.png](/public/apply_proxy.png)
7. Start the tenant and navigate to its URL in a browser tab to login

## Editing an Existing Tenant to use Proxy
1. Create an A record for the tenant in your domain registrar to point to the assigned IP Alias if one does not already exist
1. From the tenant dashboard select 'Edit' in the left menu;
   - In the 'UI Address' field select 'None'
1. Navigate to the network running the proxy service;
   - Select 'Proxy' in the left menu
1. From the Proxy Dashboard;
   - Select 'View Tenants'
   - Select 'New'
1. In the 'Proxy Tenant Config' page;
   - Select the network the proxy service is running on
   - Select the tenant name
   - Enter the FQDN of the tenant (The A record created in step 1 of this section)
1. Navigate to the tenant dashboard and select 'Apply Proxy' in the highlighted warning
   ![apply_proxy.png](/public/apply_proxy.png)
1. Select the tenant network (highlighted) from the tenant dashboard
   ![tenant_apply_rules.png](/public/tenant_apply_rules.png)
1. Select 'Apply Rules' in the highlighted warning
   ![tenant_rules_highlighted.png](/public/tenant_rules_highlighted.png)
1. Test access to the tenant by navigating to it's url in a browser tab

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
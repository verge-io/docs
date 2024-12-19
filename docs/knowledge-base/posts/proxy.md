---
title: Configuring Proxy
slug: configuring-proxy
description: Configuring a Proxy Connection for a Tenant
draft: false
date: 2024-04-11T16:30:54.826Z
tags:
  - proxy setup
  - network
  - alia
  - tenant
  - DNS
  - proxy
categories:
  - Tenant
  - Cluster Settings
editor: markdown
dateCreated: 2024-04-08T16:15:30.034Z
---

Using a Proxy grants the ability to use 1 IP address for multiple Tenant environments by mapping FQDN hostnames. This bypasses the need to have 1 IP address per tenant and helps to preserve ipv4 addresses.

## Enabling Proxy

1. From the external network used to access tenant environments:
   - Select **Edit** in the left menu.
   - Enable **Proxy**.
   - In most cases, the **Proxy Listen Address** field can be left blank. This will default to `0.0.0.0`, meaning it will listen on all addresses.

!!! warning "For VergeOS verions 4.12.6 and older"
    'Bind DNS' will need to be temporarily enabled if it is not already in use on the network. This will expose the IP Alias selection in the UI (step 2).

   - Submit the settings but **_DO NOT RESTART THE NETWORK OR APPLY RULES YET!_**

2. From the same external network:
   - Select **IP Addresses** in the left menu.
   - Edit or create an IP Address, setting the **Type** to **IP Alias**.
   - Submit.
   - Set the external network DNS back to the original setting (Prior to Version 4.12.4).
   - Select **Rules**.
   - Create a new rule that looks like the following image:
   
   ![proxy_accept_rule.png](/product-guide/screenshots/proxy_accept_rule.png)
   
   - Restart the network and apply the rules.
   - Test the rule by opening a browser tab and navigating to the URL using the IP Alias address assigned in the previous step. If it works properly, the UI login page will open on the IP Alias address.

## Creating a New Tenant with Proxy

1. Create an **A Record** for the new tenant in your domain registrar to point to the assigned IP Alias.
2. Create a new tenant:
   - Enter all desired settings, leaving the **URL** blank.
3. In the **UI Management** tab of the tenant creation page, select **Create a new FQDN**.
4. In the **Proxy Tenant Config** page:
   - Select the network the proxy service is running on.
   - Select the tenant name.
   - Enter the FQDN of the tenant (the A Record created in step 1).
   - Submit.
5. Select **Skip** at the bottom of the **UI Management** page to avoid assigning an IP directly to the tenant.

!!! info "A tenant cannot have a UI IP address **AND** a proxied FQDN."

6. In the new tenant dashboard, select **Apply Proxy** in the highlighted warning.

7. Start the tenant and navigate to its URL in a browser tab to log in.

## Editing an Existing Tenant to use Proxy

1. Create an **A Record** for the tenant in your domain registrar to point to the assigned IP Alias (if one does not already exist).
2. From the tenant dashboard, select **Edit** in the left menu:
   - In the **UI Address** field, select **None**.
3. Navigate to the network running the proxy service:
   - Select **Proxy** in the left menu.
4. From the **Proxy Dashboard**:
   - Select **View Tenants**.
   - Select **New**.
5. In the **Proxy Tenant Config** page:
   - Select the network the proxy service is running on.
   - Select the tenant name.
   - Enter the FQDN of the tenant (the A Record created in step 1).
6. Navigate to the tenant dashboard and select **Apply Proxy** in the highlighted warning.

7. Select the tenant network (highlighted) from the tenant dashboard.

   ![tenant_apply_rules.png](/product-guide/screenshots/tenant_apply_rules.png)

8. Select **Apply Rules** in the highlighted warning.

9. Test access to the tenant by navigating to its URL in a browser tab.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

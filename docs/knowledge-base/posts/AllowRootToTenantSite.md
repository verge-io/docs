---
title: Allow Root to Tenant Site Connection
slug: allow-root-to-tenant-site-connection
description: Instructions for how to create a site from a root system to a tenant
draft: false
date: 2023-09-12T15:19:47.449Z
tags:
  - routing
  - network
  - tenant
  - dmz
  - external
  - rules
  - root
  - translate
categories:
  - Network Rules
  - Network
  - Tenant
editor: markdown
dateCreated: 2023-09-12T14:48:12.332Z
---

# Allow Root to Tenant Site Connection

## Overview

!!! warning "Important"
    Adding this rule will allow tenants to connect on the DMZ network. By default, this is disabled for security reasons.

This guide provides instructions on how to connect a root system to a tenant site in VergeOS. The **Sites** feature is typically used to connect two VergeOS sites together, but to extend this functionality to a tenant site, you’ll need to add a specific rule on the root system's **External** network.

## Prerequisites

- Access to the **Root** system with administrative privileges.
- A basic understanding of network rules and DMZ interfaces in VergeOS.

## Steps

1. **Access External Networks**
   - In the **Root** system, navigate to **Networks** and then **External Networks**.
   - Double-click on the **External** network.

2. **Add the Rule**
   - In the left menu, click on **Rules**.
   - Before adding a new rule, ensure it doesn’t already exist.
   - Click **New** in the left menu.
   - Enter the following details:
   
     - **Name**: Enter a descriptive name such as "Allow Tenant to Root".
     - **Action**: Translate.
     - **Protocol**: ANY.
     - **Direction**: Outgoing.
     - **Interface**: DMZ.
     - **Source**: Other Network Address (DMZ).
     - **Destination**: Any/None.
     - **Target**: My Router IP.

   ![Rule Configuration](/product-guide/screenshots/allow-tenant-root-rule.png)

3. **Submit and Apply**
   - Click **Submit**.
   - In the left menu or at the top, click **Apply Rules** to activate the new rule.

After the rule is applied, the root system should now be able to connect to the tenant site.

## Testing the Rule

To verify that the rule works, follow these steps:

1. From the **Home** screen, click **System** in the left menu.
2. Click on **Nodes** in the left menu.
3. **Double-click** on **Node1** or select **Node1** and click **View**.
4. In the left menu, click on **Diagnostics**.
5. Change the **Query** to **TCP Connection Test**.
6. Set **Host** to the **UI IP/Host** of the tenant system.
7. Set **Port** to **443**.
8. Click **Send**.

The **Response** should say **Connection successful**. If the connection fails, review the rule to ensure accuracy, particularly ensuring that the **Interface** is set to **DMZ** rather than **Auto**.

## Troubleshooting

!!! warning "Common Issues"
    - **Issue:** Connection test fails.
      - **Solution:** Double-check that the rule is configured correctly, especially the interface settings. Also, ensure there are no blocking rules that could prevent the connection.

## Additional Resources

- [Network Overview](/product-guide/networks/network-overview)
- [Tenant Management](/product-guide/tenants/create-tenants/)

## Feedback

!!! question "Need Help?"
    If you encounter any issues while setting up the root-to-tenant site connection, or have any questions, feel free to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2023-09-12
    - VergeOS Version: 4.12.6

---
title: "Assigning External IP Addresses to a Tenant"
description: "Instructions for assigning external IP addresses to a tenant, including creating virtual IPs and applying network rules for tenant external access."
semantic_keywords:
  - "assign external IP address to tenant VergeOS"
  - "tenant virtual IP network access configuration"
  - "tenant external network routing rules"
  - "provide internet access to tenant"
use_cases:
  - "assign_external_ip_to_tenant"
  - "configure_tenant_network_access"
  - "create_virtual_ip_for_tenant"
tags:
  - tenants
  - networking
  - ip-addresses
  - virtual-ip
  - external-network
  - network-rules
categories:
  - Tenants
---

# Assigning External IP Addresses to a Tenant

External IP addresses can be assigned to tenants. When an external IP is assigned, appropriate routing rules are created automatically.

## Assign an External IP to a Tenant

1. Navigate to the appropriate host **external network dashboard**; this should be the external network where the tenant has external access. In most cases this will be the network named "External".
2. Click **IP Addresses** on the left menu.
3. Click **New**.
4. In the ***Type*** field, select **Virtual IP**.
5. In the ***IP Address*** field, enter the **external IP Address**.
6. ***Hostname*** can be left blank.
7. **Optionally**, a ***Description*** can be entered to record additional administrative information.
8. In the ***Owner Type*** dropdown list, select **tenant**.
9. In the ***Owner*** dropdown list, select the **name of the tenant**.
10. Click **Submit** at the bottom of the page.
11. From the **external network dashboard**, click **Apply Rules** on the left menu (to apply to the host external network). 
!!! tip  "To return to the external network dashboard you can click the appropriate breadcrumb at the top or use the browser back button."
12. Navigate to the **tenant network Dashboard** (from the top menu: Networks > Dashboard > Tenants > double-click the intended tenant network).
13. Click **Apply Rules** (to apply to the tenant network).

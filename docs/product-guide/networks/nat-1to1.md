---
title: "Configuring NAT 1-to-1 Translation"
description: "Create a NAT 1-to-1 translate rule to map an external public IP address to an internal private IP address for full bidirectional traffic forwarding."
semantic_keywords:
  - "NAT 1-to-1 translation external to internal IP"
  - "map public IP to private IP address VergeOS"
  - "translate rule NAT external internal network"
  - "one-to-one NAT port forwarding VergeOS"
use_cases:
  - configure_1to1_nat_translation
  - map_external_ip_to_internal_vm
  - enable_bidirectional_nat
  - expose_internal_server_with_public_ip
tags:
  - networking
  - nat
  - translation
  - external-ip
  - internal-network
  - firewall-rules
categories:
  - Networking
---

# Configuring NAT 1-to-1 Translation

Before creating the translate rule to NAT an external IP to an internal IP:

- [**Define a static (private) IP for the destination VM**](/product-guide/networks/dhcp-static-lease)
- [**Assign an external IP to the internal network**](/product-guide/networks/assign-external-ip)

## Create a Translate Rule to NAT External IP to Internal IP

1. From the **Internal network Dashboard**, click **Rules** on the left menu.
2. Click **New**.
3. Enter a **Name** that will be helpful to future administration.
4. Optionally, a **Description** can be entered to record additional administration information.
5. In the **Action** dropdown, select ***Translate***.
6. In the **Protocol** dropdown, select ***ANY***.
7. In the **Direction** dropdown, select ***Incoming***.
8. **Define Source:** In the **Type** dropdown, select ***Any/None***.
9. **Define Destination:**  
    - In the **Type** dropdown, select ***My IP Addresses***.  
    - In the **IP Address** dropdown, select the external IP address.
10. **Define Target:**
    - In the **Type** dropdown, select ***My IP Addresses***.
    - In the **IP Address** dropdown, select the internal IP address (that was given a static IP address assignment).
11. Click **Submit** to save the rule.
12. Click **Apply Rules** on the left menu to put the new rule into effect.

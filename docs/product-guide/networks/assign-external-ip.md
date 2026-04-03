---
title: "Assigning External IP Addresses to Internal Networks"
description: "Assign public external IP addresses to internal VergeOS networks with automatic routing rule creation for inbound connectivity."
semantic_keywords:
  - "assign external IP to internal network"
  - "public IP address virtual IP VergeOS"
  - "map external address to internal network"
  - "inbound routing external IP assignment"
use_cases:
  - assign_public_ip_to_internal_network
  - enable_inbound_connectivity
  - configure_virtual_ip_addresses
  - expose_internal_services_externally
tags:
  - networking
  - external-ip
  - virtual-ip
  - routing
  - internal-network
  - ip-assignment
categories:
  - Networking
---

# Assigning External IP Addresses to Internal Networks

External IP addresses can be assigned to internal networks. When an external IP is assigned, appropriate routing rules are created automatically.

## Assign an External IP to an Internal Network

1. From the **External Network Dashboard**, click **IP Addresses** on the left menu.
2. Click **New**.
3. In the ***Type*** field, select **Virtual IP**
4. In the ***IP Address*** field, enter the **public IP address**.
5. Enter the ***Hostname***.
6. Optionally, a ***Description*** can be entered to record additional administrative information.
7. In the ***Owner Type*** dropdown list, select **Network**.
8. In the ***Owner*** dropdown list, select the **name of the internal network**.
9. Click **Submit**.
10. While still on the **External Network Dashboard**, click **Apply Rules** on the left menu (to apply to the External Network).
11. Navigate to the **Internal Network Dashboard**
12. Click **Apply Rules** (to apply to the Internal Network).
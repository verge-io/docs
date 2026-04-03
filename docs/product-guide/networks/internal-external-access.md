---
title: "Creating an Internal Network with External Access"
description: "Give an internal network internet or LAN/WAN access by configuring the default gateway to route through an external network."
semantic_keywords:
  - "internal network external access internet"
  - "default gateway route external network"
  - "give internal network internet connectivity"
  - "internal network outbound routing VergeOS"
use_cases:
  - provide_internet_access_to_internal_network
  - configure_default_gateway_routing
  - connect_internal_network_to_external
tags:
  - networking
  - internal-network
  - external-access
  - default-gateway
  - routing
categories:
  - Networking
---

# Creating an Internal Network with External Access

Giving an internal network external access requires having the proper default gateway rule in place to route through an external network.

## Automatically Create the Default Gateway Rule (during network creation)

Select an appropriate external network in the **Default Gateway** field when creating a new internal network. The gateway will automatically create the appropriate routing rules to provide LAN and/or WAN access (depending on the physical connection/settings of the external network selected) to the internal network.

![setdefgw.png](/product-guide/screenshots/setdefgw.png)

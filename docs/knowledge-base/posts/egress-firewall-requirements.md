---
title: Egress Firewall Requirements for VergeOS
slug: egress-firewall-requirements
description: Outbound firewall allow-list for VergeOS systems — ports and destinations required to reach the Update Server and Marketplace.
author: VergeOS Documentation Team
draft: false
date: 2026-06-03
tags:
  - firewall
  - networking
  - updates
  - marketplace
  - security
categories:
  - Networking
  - Maintenance
editor: markdown
dateCreated: 2026-06-03
---

# Egress Firewall Requirements for VergeOS

If your VergeOS system operates behind a restrictive egress firewall or proxy, you must allow outbound access to the **Update Server**. Access to the **Marketplace** is optional, but required if you want to use Verge.io-provided recipes. This article describes what to allow and how to find the exact destinations for your environment.

!!! tip "Systems without any outbound internet access require air-gap licensing. See [Air-Gapped Environments](#air-gapped-environments) below."


## Outbound Access

| Service | Required | Protocol | Port | Source IP |
|---|---|---|---|---|
| Update Server | Yes | TCP | 443 | Management/UI IP |
| Marketplace | No | TCP | 443 | Management/UI IP |

All outbound traffic originates from your system's **management (UI) IP address** — not from individual node IPs.

## Finding the Destination FQDNs

VergeOS may serve different regions from different hostnames. Locate the exact destinations directly in your UI:

### Update Server URL

1. Navigate to **System > Updates**.
2. The **URL** field on the dashboard shows the update server address (e.g., `https://updates.vergeos.com`).

### Marketplace URL**

1. From the top menu, navigate to **Repositories > List**.
2. Locate the **Marketplace** entry and note its URL (e.g., `https://marketplace.vergeos.com`).

Allow outbound TCP 443 from your management IP to each of these hostnames.

## Air-Gapped Environments

Systems that cannot allow any outbound internet access require a special air-gap license. See the following resources:

- [Requesting an Air-Gap License](/knowledge-base/requesting-an-airgap-license/)
- [Updating a VergeOS System with Air-Gap License](/knowledge-base/updating-vergeos-system-with-airgap-license/)


## Additional Resources

* [VergeOS Marketplace](/product-guide/automation/marketplace-vm-recipes)
* [Licensing and Software Updates](/product-guide/system/licensing-and-updates)

---

!!! note "Document Information"
    - Last Updated: 2026-06-03
    - VergeOS Version: 26.1

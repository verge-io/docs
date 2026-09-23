---
title: Move a VergeOS System to a New Subnet
slug: move-system-to-new-subnet
description: How to re-address a VergeOS system when its upstream management subnet changes, by updating the External network's IP address, DNS, and default route gateway without touching the core network.
author: Carl Rodabaugh
draft: false
date: 2026-09-23
semantic_keywords:
  - "move vergeos system to new subnet"
  - "change vergeos external network ip address gateway dns"
  - "re-ip vergeos cluster after datacenter move"
  - "new ip addresses for vergeos nodes"
  - "change default gateway external network vergeos"
use_cases:
  - readdress_system_new_subnet
  - change_external_network_gateway
  - relocate_vergeos_system
tags:
  - network
  - external network
  - subnet
  - ip address
  - gateway
  - dns
  - default route
  - re-ip
  - relocation
  - site sync
  - two-factor
categories:
  - Network
  - System Administration
editor: markdown
dateCreated: 2026-09-23
---

# Move a VergeOS System to a New Subnet

## Overview

!!! info "Key Points"
    - Only the External network changes: its IP address, DNS servers, and default route gateway.
    - Leave the core network alone. The nodes talk to each other over a private core network that has nothing to do with your management subnet.
    - Set up out-of-band console access (IPMI) on the new subnet before you start, because the UI moves partway through.
    - No node reboots, maintenance mode, or vSAN repairs are involved.

When a system is relocated and its upstream subnet changes, the usual request is "we need new IP addresses on the nodes." That isn't the job. The VergeOS nodes don't hold addresses on your management subnet. Their node-to-node addressing lives on the private core network, and changing that is what breaks the cluster.

What actually moves is the External network. Its address is where the VergeOS UI answers, so re-addressing it changes where you log in and nothing underneath it.

## Prerequisites

- The new subnet's IP address for the system, its gateway, and its DNS servers.
- Console access to a node that still works after the old address is gone, such as the node's IPMI web interface on the new subnet.
- An admin account you can log in with during the change window.

!!! warning "You will lose UI access partway through"
    The moment you apply the new address, the UI stops answering at the old one. If the new gateway isn't reachable yet, or your login needs an emailed code that can't get out, you'll have no way back in except the console. Complete steps 1 and 2 before you touch the network.

## Steps

1. **Get console access on the new subnet first.**
    - Make sure you can reach at least one node's IPMI interface (or a physical console) from where you'll be working after the move. That's your path to the UI once the old address stops answering.

2. **Move your login account off email two-factor codes for the window.**
    - If the account you'll use has two-factor authentication set to emailed codes, and mail can't leave the system mid-change, the code never arrives and you're locked out.
    - Go to **System → Users**, select the user, and click **Edit**. Either set **Two Factor Type** to **Authenticator (TOTP)** or clear **Two Factor Authentication** until the move is done.

3. **Leave the core network alone.**
    - Don't edit the core network or the core switch addressing. Only the External network changes.

4. **Update the External network's IP address and DNS.**
    - Go to **Networks → List**, open the **External** network, and click **Edit**.
    - Change **IP Address** and **Network Address** (CIDR) to the new subnet, and update **DNS Servers**.
    - Click **Submit**.

5. **Update the gateway in the network's Rules, then apply them.**
    - The gateway isn't a field on the network itself. It's the **Target IP** of the External network's default route rule.
    - From the External network dashboard, click **Rules**, open the rule named **Default gateway** (Action **Route**, Direction **Outgoing**, Destination **default**), and edit it. Set **Target IP** to the new gateway.
    - Click **Apply Rules**. The UI comes back on the new address.

6. **Repoint any incoming site sync.**
    - If another VergeOS system sends snapshots to this one, the sending side stores this system's URL in its Site entry.
    - On the sending system, go to **Backup/DR**, open this system's site, edit its settings, and change the **URL** to the new address.

7. **Turn two-factor back on** for the account you changed in step 2, if you changed it.

!!! tip "Pro Tip"
    Stage the new gateway and DNS values before the window and check that the new gateway actually routes the new subnet. A wrong gateway looks exactly like a failed move: the UI goes quiet and only the console can reach it.

## Troubleshooting

!!! warning "Common Issues"
    - Problem: The UI doesn't answer at the new address after Apply Rules.
      - Solution: From the console, check the default route rule's **Target IP** and the External network's **IP Address** and **Network Address**. Confirm the upstream switch port carries the new subnet (and its VLAN, if tagged).
    - Problem: You can't log in because the two-factor code never arrives.
      - Solution: Log in with an account that uses an authenticator app, or have another admin clear two-factor on your account.
    - Problem: Site sync to this system fails after the move.
      - Solution: Update the **URL** in the sending system's Site entry for this system.

## Additional Resources

- [External Networks](https://docs.verge.io/learn-the-platform/module-4-networking/02-external-networks)
- [How to Create an External Network](https://docs.verge.io/knowledge-base/networking/create-external-network)
- [Network Rules](https://docs.verge.io/run-the-platform/networking/network-rules)
- [Two-Factor Authentication (MFA)](https://docs.verge.io/run-the-platform/authentication/multifactor-auth)
- [IPMI](https://docs.verge.io/run-the-platform/system-administration/ipmi)
- [Sites Dashboard](https://docs.verge.io/run-the-platform/system-administration/sites-overview)

---

!!! note "Document Information"
    - Last Updated: 2026-09-23
    - VergeOS Version: 26.1.x

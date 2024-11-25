---
title: Change a Physical External Network to Bonded
slug: chg-physical-to-bonded
description: Instuctions to change an existing physical network, used for external connection, to use bonding
author: VergeOS Documentation Team
draft: true
date: 2024-11-24T18:38:59.908Z
tags: bonded, network, bonding, physical network, external
categories:
  - Network
  - Network Configuration
editor: markdown
dateCreated: 2024-11-24T18:38:59.908Z
---

# Changing a Physical Network to Bonded (Post Install)

## Overview

!!! info "Key Points"
    - the connection is vlanned before bonding
    - core networks should never be bonded
    - it is possible to change an external network to vlan/bonded without downtime

?s
correct wording for the new feature that we are providing now?

do all internals get a layer2 ID?  Was this always the case - don't remember seeing it in the UI before.
clone install test system - doesnt show that bonding is enabled when i installed as bonded.
as far as installing initially - i want to select multiple links 
when we do a second node and do not utilize the automatic network detection/configuration, do we have to have exact same names on the switches?
obviously, we do need same mtu, vlan, and core network yesorno setting....


is the wording in the release notes incorrect? we only want bonding on non-core networks, right?
what do you think we should actually document?  I was going to create a kb page about modifying physical external to bonded post install? 
should we also have some more general instructions as well?
difference between selecting bond/bond secondary in layer 2 type as opposed to selecting enable bonding and selecting bond interfaces? 
lets talk about exact steps to modify a physical external to bonded post install - what type of scenario are we looking at typically?

we dont support lacp at all, just active/passive, right? - and that would be selecting bond and bond secondary in the layer 2 type?
describe the actual redundancy that we are getting by assigning vlan first and bonding after that?


Support for bonded physical NICs was added in version 4.13.  This document provides instructions for changing an existing physical network to bonded after install.

## Prerequisites


- alternate access method setup before install (ipmi, local console)
- username/password for the "admin" user #1 or physical access??
- solid understanding of networking and current network config

## Steps

1. Navigate to the physical network dashboard (Main Dashboard > Networks > Externals > double-click intended external network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (vLAN number)

3. Check the **Enable Bonding** checkbox and select the physical networks.  

!!! tip "Pro Tip"
possibly something here about avoiding downtime and being ready to use physical/ipmi console access.

## Examples

```bash
sudo dnf install open-vm-tools
```

[Provide one or more examples of how to apply the information in this article within the context of vergeOS]

## Troubleshooting

!!! warning "Common Issues"
    [List common issues and their solutions]

    - Problem: [Describe the issue]
      - Solution: [Provide steps to resolve]

## Additional Resources

- [Link to related vergeOS documentation]
- [Link to vergeOS video tutorials if available]

## Feedback

!!! question "Need Help?"
    If you need further assistance or have any questions about this article, please don't hesitate to reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: [YYYY-MM-DD]
    - vergeOS Version: [x.x.x]
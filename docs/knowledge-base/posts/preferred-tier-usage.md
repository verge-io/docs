---
title: Preferred Tier Usage
slug: preferred-tier-usage
description: 
published: true
date: 2023-01-24T19:25:57.114Z
tags: tier, preferred tier, vsan, vm, disk, media
categories:
  - vSAN
editor: markdown
dateCreated: 2022-09-01T16:25:52.340Z
---

## How Preferred Tier settings determine which Tier to use.

Users can set a preferred tier when creating or modifying a virtual machine (VM) disk drive.  In most cases, users leave it set to default (which can be configured under System > System Settings > Default VM drive Tier).  However, setting a VM disk drive to a specific tier may behave unexpectedly, if that configured tier does not exist. In these scenarios, this is how the system will select which tier to use.

- When setting a preferred tier to a value that doesn't exist, for example setting it to Tier 3 in a system with only Tier 1 and Tier 4 storage available, the system will next attempt to pick the next higher (slower) tier.  In this example, since there is no Tier 3 storage available, the system will default to Tier 4 instead.
- When setting a preferred tier to a value that doesn't exist, for example setting it to Tier 3 in a system with only Tier 1 and Tier 2 storage available, that does not have a lower tier of storage available, the system will next attempt to pick the next lower (faster) tier.  In this example, since there is no Tier 3 storage available, the system will pick Tier 2 instead.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
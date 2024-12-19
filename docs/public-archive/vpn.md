---
title: VPN
description: Supported VPN Protocols
published: true
date: 2023-01-27T21:50:21.723Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:32:16.773Z
---

## Integrated VPN

VergeOS currently supports the IPSec and Wireguard VPN protocols natively within the network stack.

## Wireguard
[Wireguard](https://www.wireguard.com/) is a lightweight, simple to use VPN protocol built directly into the Linux kernel. VergeOS has taken advantage of this and implemented it directly into the networking suite giving admins the ability to easily create site-to-site or "road warrior" VPN tunnels to access their workloads. Each vnet created has the ability to create it's own unique Wireguard VPN tunnel allowing admins to segregate traffic flow on a per network basis and make sure users can only access the workloads that they are given permission to.

## IPSec
IPSec is implemented using the [strongSwan](https://www.strongswan.org/) Linux kernel module. This allows multiple IPSec VPN tunnels to be created giving admins the ability to easily create a hub and spoke architecture so all remote sites can access the environment in a central point over a secure Layer 3 tunnel.
<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
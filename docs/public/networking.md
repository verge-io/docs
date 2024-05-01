---
title: Networking
description: Networking in VergeIO
published: true
date: 2023-04-19T13:45:06.181Z
tags: bgp, ospf, vlan, vxlan, vnet, routing, virtual wire, dhcp, vpn, ipsec, wireguard, qos, dns, authoritative
editor: markdown
dateCreated: 2022-02-15T15:45:42.608Z
---

## Network Features
The foundation of the VergeIO networking stack was built with layer 3 in mind. By default all virtual networks (vnets) are created to be a fully functional router with firewall capabilities to include;
- Network Address Translation & Port Address Translation (NAT / PAT)
- Quality of Service (QOS)
- Static Routing
- Rule Tracking Statistics 
- Trace Debugging
- DHCP (Client and Server)
- Authoritative DNS
- Port Mirroring (North/South) & (East/West)

## Routing
VergeIO supports the Border Gateway Protocol (BGP) & Open Shortest Path First (OSPF) routing protocols natively within a vnet. Integrating these protocols allows a system to be the "full stack" including being the first point of entry into the data center.
## VLANs
For further flexibility, VLANs are able to be brought into the environment to maintain backwards compatability with existing network infrastructure. They may also be passed into a [tenant](/public/tenants) for consumption by the use of [virtual wires](/public/kb/virtual-wires). 
## VPN
VergeIO includes the ability to create [VPN](/public/vpn) tunnels directly in the interface of your environment at every level of tenancy. With a bit of network planning a virtual appliance can be used in place of the integrated VPN function as well.
## VXLANs
VXLANs are used to control network high availabilty within the VergeIO environment.
> They cannot be connected up to an existing VXLAN infrastructure outside of the environment.
{.is-info}
## Port Bonding
Port bonding is available for external connections with high availabilty switching environments. The supported bond modes are as follows;
- Active-Backup
- LACP (802.3AD)
- Balance ALB
- Balance RR
- Balance TLB
- Balance XOR
- Broadcast

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>

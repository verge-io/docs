---
title: Routing Layer 2 Networks with VergeOS
slug: routing-l2-networks
description: Describes an overview and specific scenario in which physical devices are routed via Layer 3 Verge networks.
draft: false
date: 2025-04-09T18:42:31.354Z
tags:
  - network
  - networking
  - network blocks
  - subnet
  - Virtual Switch Port
  - vwire
  - layer2
  - l2
categories:
  - Network
editor: markdown
dateCreated: 2025-04-09T11:15:31.354Z
---

## Routing IP Traffic to L2 physical networks
This article will walk through an efficient method of routing layer 3 IP traffic for layer 2 physical networks with the powerful VergeOS networking system. There are multiple ways to achieve this, however the objective of this article is to provide clear and concise guidance on a specific common scenario. This article should be particularly of use and interest to engineers and administrators of Edge deployments in which physical devices like phones, cctv cameras, or network equipment require communication with workloads in VergeOS that may be running on different IP subnets. Using this method, an operator can achieve direct local communication between those physical devices outside of VergeOS and the internal VergeOS managed networks.
    
### Steps Overview
1. Create Layer2 External network
	- It is important that this network is created with no IP information. If the IP block is already assigned to this interface, it cannot be added to the default route in the next step.
2. [Create IP block on the External network](/knowledge-base/network-blocks/?h=block#creating-a-network-block) that will route the traffic (Likely default External)
	- By adding the IP block here, we're telling VergeOS to expect this IP traffic to come in via this interface, and in our next step we will tell Verge networking where to send it.
	- Assign IP block to step 1 external network (or tenant)
	- Upon saving, VergeOS will automatically create route(s) to send inbound traffic with matching destination IPs to our Layer2 network which may also have VMs attached, allowing all clients to communicate across networks within Verge (with appropriate firewall rules) and to networks outside of Verge via the default route.
3. Return to the Layer2 External to Assign IPs and other L3 options
    - Depending on your upstream configuration, you may need to set additional routes outside of Verge in upstream routers to route traffic destined for this subnet (192.168.2.0/24 in our example) via the Verge External IP.

!!! info "Helpful Related Documents"
	Introduction to Network Blocks : [Network Blocks Overview](/knowledge-base/network-blocks/) <br>
	Routing Basics : [Routing Internal Networks](/knowledge-base/routing-between-internal-vergeio-networks/) <br>
    Network Rules : [VergeOS Product Guide - Network Rules](/product-guide/networks/network-rules/) <br>
    Network Troubleshooting : [VergeOS Product Guide - Network Troubleshooting](/product-guide/networks/net-troubleshooting/)

### Demo Scenario
In our sample scenario below, we'll be routing the 192.168.2.0/24 address space via the VergeOS External interface to a layer2 network named "l2demo". In this scenario, any VM attached to l2demo with a static IP (in the correct address space) or with DHCP enabled would be able to reach the internet, as would any physical devices outside of Verge, via the L2 interface. Inbound traffic could be allowed and controlled via further rules. Outbound traffic could be restricted via further rules as well, paying attention to rule order.

#### Demo Scenario Details
- IP Block to Route: 192.168.2.0/24
- Verge External IP: 10.1.1.2
- Verge External L2 Network: l2demo
- L2 Network ID : 1010
- Verge Upstream Gateway: 10.1.1.1
- Verge Physical Interface: phys1

#### Create the L2 network
	From the Networks Menu:
1. Click New External
2. Name: l2demo
3. Description: Optional
4. Layer 2 Type: vLan
5. Layer 2 ID: 1010
6. IP Address Type: None
7. Interface Network: phys1
8. Click Submit to save.
9. Click "Power On" on the network page after saving. 
   - Ensure the network powers up without errors in the Log box
    
#### Create IP block on External and Assign it
1. Click "Network Blocks" on the External network page
2.  Click "New"
3.  Network Block: 192.168.2.0/24
4.  Owner Type: Network
5.  Owner: l2demo
6.  Click Submit
You will be returned to the Network Blocks page, now showing your new block and the Owner it is assigned to.
    
#### Assign IP info to L2 network
1. Return to the l2demo network
2. Click "Rules"
  - Confirm Firewall rules are awaiting application. Check to confirm there is now an Outgoing route; the new rule. We'll apply it later.
  - Click Cancel to exit back to the network page
3. Click Edit to assign IP info to the network.
4. IP Address Type: Static
5. IP Address: 192.168.2.1
6. Network Address 192.168.2.0/24
7. DNS: Simple
8. DNS Server: 10.1.1.1
9. DHCP: enable
10. Dynamic DHCP: enable
11. DHCP Start Address: 192.168.2.200
12. DHCP Stop Address: 192.168.2.254
13. Click Submit to save

At this point you have created everything you should need, but it's still pending application and a network restart to add Layer2 to l2demo.
- Return to your Networks Dashboard and click All Networks
- Note the External and l2demo networks marked as "Needs FW Apply" and l2demo "Needs Restart"
- Restart the l2demo network by selecting it and clicking "Restart".
  - Accept the offer to apply firewall rules on restart and click "yes" to confirm.
- Apply FW Rules on External by selecting it and clicking "Apply Rules".
  - Click "yes" to confirm
- OUTSIDE OF VERGE (In the upstream router): Set a route on 10.1.1.1 to send 192.168.2.0/24 via 10.1.1.2 and set any other required policies for traffic on that device.

### Tenant Variation
When applying the above process to a Tenant there are two generally common implementations. 

- Ideally, a tenant VM that needs to access a physical layer 2 network would do so via routes, creating appropriate routes and rules to allow traffic from an internal tenant network to a layer 2 network; e.g. our previous "l2demo" network via the 192.168.2.1 gateway. 
- If Native layer 2 access is required inside tenant networks, see [Provide Layer 2 Access to a Tenant](/knowledge-base/provide-layer2-to-tenant/) to create a Virtual Switch Port connecting the tenant network to the Layer 2 External interface outside of the tenant. 
  
!!! warning
	If devices cannot reach the internet, double-check:
	- Upstream route to 192.168.2.0/24 is set <br>
	- Firewall rules are applied in correct order <br>
	- VM or device IP/subnet matches the assigned block <br>

---


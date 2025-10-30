---
title: How to Use External IPs in Tenants
slug: how-to-use-external-ips-in-tenants
description: Examples of Route-based and Translation-based common methods for using Public/External IP addresses inside Tenants
draft: false
date: 2025-02-17T14:30:00.000Z
tags:
  - tenant networking
  - network security
  - internal networks
  - network rules
  - routing
  - public ip
  - address translation
categories:
  - Network Security
  - Best Practices
  - Network Configuration
editor: markdown
dateCreated: 2025-02-13T14:30:00.000Z
---


# How to Use Root External IPs in Tenants in VergeOS

In VergeOS Virtual Data Centers leveraging Tenants, a tenant may need a public IP address (External IP) from the root External network for use by VMs inside the tenant space. 

## Using Network Blocks

Network Blocks can be used to assign a group of IPs as a single unit, and often represent the most straightforward method of using an External IP inside a tenant space for VM NICs. They are created on the root External network, or the external interface upon which the IPs you intend to use are routable.

!!! note "Pro/Cons"
    Pro - Allows direct assignment of a public IP to a tenant VM's network interface.<br>
    Pro - Leverages built-in Layer 3 functions, maintaining full visibility of the configuration for diagnostic and troubleshooting.<br>
    Con - Requires at minimum 4 total IP addresses to deliver 1 usable IP to a device; a /30 network block.<br>

### Creating a Network Block

In the VergeOS system root:

1. Navigate to the network that represents the 'edge' of your VergeOS system; this is very often the root External network.
2. Click *Network Blocks* from the left menu.
3. Click *New* to create a new block.
4. Enter your Network Block IP address in CIDR format. (a.b.c.d/n)
5. *Optional* : Add a helpful description to your block.
6. Since we're using this block with a tenant, set "Owner Type" to *Tenant* and set "Owner" to the tenant you'd like to assign this block to.
7. Click *Submit* to save and assign the Block.
!!! note "Block Addressing"
    When creating Network Blocks, VergeOS will validate the Block when applying the firewall rules in further steps. Failure to set a proper starting IP for a given range will result in an error.  e.g. 10.1.2.108/30 would be a valid block. 10.1.2.110/30, while representing in many cases the same block, will fail to validate in the following steps and not function. Validate with a subnet calculator if you are unsure.
8. Return to the main page for the network you just added the Block to.
9. At the top, note the "Rule changes need to be applied" message. You may click "Apply Rules" here, or click "Rules" in the left menu to validate before applying. You may also leave rule application for later, but you must return and apply before your Block will be routed and functional.
10. Navigate to the Tenant Networks view and, using the top filters, select "Needs FW Apply" "Yes"; your tenant network should be listed. 
11. Select the network with a click, then *Apply Rules* in the left menu to complete delivery of the Network Block to the tenant.

In the Tenant interface:

1. Navigate to your External network. You will find your root-assigned Network Block listed with the description "External Network Address from service provider".
2. Select the Block with a click, then click *New Network* on the left menu. This will create a new Internal network in the tenant using the address block.
1. Note the Address Type is automatically set to Static with the Network Block address already set. Dynamic DHCP will also be enabled with the available IP range remaining usable already filled.
3. Give the new network a name.
4. When finished with any other customizations you require, click *Submit* to create the network.
5. You will exit to the new network. Click *Power On* from the left menu to bring the network online. You will be presented a confirmation window to prevent accidental power-on.

Attach a VM NIC to the network with DHCP enabled to have the IP assigned to the NIC automatically. Alternatively, set the IP address(es) within your guest OS manually.

## Creating a Virtual Switch Port

Virtual Switch Ports are another common method to consume root-level IP space by tenant workloads. These are roughly analogous to physical wires in that they allow Layer 2 network traffic to "skip" routed network segments, in this case allowing a Tenant Internal network to communicate directly with a network outside of VergeOS. This may be a "WAN" network directly, or other network configured outside of VergeOS that has address space usable and is routable out to the internet.

!!! note "Pro/Cons"
    Pro - Simple configuration within VergeOS, bypassing internal Layer 3 routing configuration.<br>
    Pro - Allows direct usage of External IPs on edge devices by consumers.<br>
    Pro - Minimal address space overhead; only the IP addresses used by clients.<br>
    Con - Virtual Switch Ports only function when both networks they connect are running on the same node. <br>
      -This requires the External network and Tenant Node1 use a High Availability (HA) Grouping to maintain their grouping, which may impact HA event expectations.<br>
    Con - May make troubleshooting and diagnostic more difficult by removing VergeOS WebUI and native routing visibility.   

For instructions on creating a Virtual Switch Port, see [Creating a Virtual Switch Port](https://docs.verge.io/knowledge-base/provide-layer2-to-tenant/).

Once your Virtual Switch Port is in place, virtual machines and other workloads with NICs connected to the Internal network the vwire is attached to will have a Layer 2 connection out of VergeOS and will function similarly to a VLAN in a traditional switch with regards to addressing and routing.

## Address Translation

If a workload must have a consistent IP address, but does not need the address assigned to it directly, Address Translation may be the best method. This allows standard Layer 3 routing from your Public/External IP pool to any given workload in VergeOS via the built-in Rules and Networking system.

!!! note "Pro/Cons"
    Pro - Follows standard and well understood routing conventions.<br>
    Pro - Allows full route visibility and control within VergeOS WebUI panels, which can aid troubleshooting and future changes.<br>
    Con - Does not allow the end device to be assigned the Public IP natively.<br>
    Con - Not all network traffic survives Address Translation, particularly if source/destination validation is required.<br>

Due to the very extensive and flexible nature of VergeOS's network possibilities, we will provide 2 example configurations, with the Address Translation at differing points in the routing journey.

### DNAT and SNAT Rules on Tenant Internal Network

1. Navigate to the network that represents the 'edge' of your VergeOS system; this is very often the root External network.
2. Click *IP Addresses* from the left menu.
3. Click *New* to create a new IP.
4. Set "Type" to *Virtual IP*.
5. Fill in the IP Address.
6. *Optional* : Add a helpful description.
7. Set "Owner Type" to "Tenant"
8. Set "Owner" to the tenant you'd like to assign this IP to.
9. Click *Submit* to save.
1. You will be returned to the "IP Addresses" view.
10. Return to the main page for the network you just added the Block to.
11. At the top, note the "Rule changes need to be applied" message. You may click "Apply Rules" here, or click "Rules" in the left menu to validate before applying. You may also leave rule application for later, but you must return and apply before your Address will be routed and functional.
12. Navigate to the Tenant Networks view and, using the top filters, select "Needs FW Apply" "Yes"; your tenant network should be listed. 
13. Select the network with a click, then *Apply Rules* in the left menu to complete delivery of the IP Address to the tenant.

In the Tenant interface:

1. Navigate to your External network. You will find your root-assigned IP Address listed with the description "External IP from service provider".
2. Select the IP Address with a click, then click *Edit* on the left menu.
3. Set "Owner Type" to "Network".
4. Set "Owner" to the network your VM's NIC is attached to.
5. Click *Submit* to save.
6. Return to the Tenant External network view.
7. Click *Apply Rules* to activate the automatic rule created to route your IP.
8. Navigate to the Tenant network you set in step 4.

DNAT Option: (If your workload is compatible)

1. Click *Rules* in the left panel.
2. Click *New* in the left panel to create a new Rule.
3. Give your rule a Name.
4. *Optional* : Write a helpful Description..
5. Set "Action" to *Translate*.
6. Set "Destination Type" to *My IP Addresses*.
   1. Select the IP Address you've passed along from the list.
7. Set "Target" to either:
   1. "Type" *My IP Addresses* and select the Static IP Address you have already configured for this VM NIC in VergeOS.
   2. OR "Type" *IP/Custom* and manually enter the static IP you have set the *Local IP* you have set on the VM NIC already.
8. Click *Submit* to save.

SNAT Configuration: (Required for outgoing translation)

1. Click *Rules* in the left panel.
2. Click *New* in the left panel to create a new Rule.
3. Give your rule a Name.
4. *Optional* Write a helpful Description.
5. Set "Action" to *Translate*.
7. Set "Source" to either: (Using the same IP as the "Target" from the previous steps)
1. "Type" *My IP Addresses* and select the Static IP Address you have already configured for this VM NIC in VergeOS.
2. OR "Type" *IP/Custom* and manually enter the static IP you have set the *Local IP* you have set on the VM NIC already.
6. Set "Destination Type" to *My IP Addresses*.
   1. Select the IP Address you've passed along from the list.
8. Set "Pin" to *Top* to set this Rule above others, ensuring it is applied early.
9. Click *Submit* to save.

Routing Option: (May be useful if your workload is not DNAT compatible)

If your workload does not support DNAT, clients must access it with the native IP on the device, AND you have only 1 IP available, there is an alternative to the "DNAT Option" above. Follow the "DNAT Option" instructions above, and at *Step 5* set your action to *Route* rather than Translate. This will send traffic for the public IP to the VM via the native private IP. Then, on the NIC in your Guest OS, set a *secondary* IP with the public IP and a /32 (255.255.255.255) subnet. Follow the "SNAT Configuration" as written to translate the outbound traffic. This option is *entirely* GuestOS dependent and may not work in all situations.

To use this method, follow the "DNAT Option" instructions above with *1 change, Step 5. changes to:*
5. Set "Action" to *Route*.

Set the Public/External IP address as a *secondary* address on the VM NIC, inside the guest OS. This will allow traffic bound for the IP to be routed to the native internal IP, then allow the guest OS to handle it on the /32 single IP. The "SNAT Configuration" steps will likely still need to be followed; the outbound traffic from the VM NIC will still originate from the local IP, not the public assigned as a secondary address, and thus Source NAT will need to change it on the way out.

---

!!! note "Document Information"
    - Last Updated: 2025-02-17
    - VergeOS Version: 4.13.3

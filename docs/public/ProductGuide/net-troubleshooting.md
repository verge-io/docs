---
title: Product Guide - Networking Troubleshooting Tips
description: General steps to troubleshoot common network connection issues
published: true
date: 2023-06-27T19:47:06.447Z
tags: 
editor: markdown
dateCreated: 2023-03-31T18:21:54.880Z
---

# Network Troubleshooting

This page contains common network testing/troubleshooting steps.

<br>
<br>


## Ping tests within a VM (to test network connectivity/DNS)

1.  **ping <code>google.com</code>**
    -   A ping reply indicates Internet connectivity; if problems were reported; gather more detailed information, such as specific sites that were not accessible, in order to troubleshoot further.
    -   If no ping reply: Continue with the next ping test.
2.  **ping 8.8.8.8**
    -   A ping reply indicates Internet connectivity. If there was a reply here but no reply from the test above (google.com), investigate [DNS](#dns).
    -   If no ping reply: run the next ping test to check the VM connection to the network router.
3.  **Ping the network router address.** To check a network's addressing, see [Determining Network Addresses](#determining-network-addresses)
    -   A ping reply indicates the VM is connecting to the network; if the VM receives a ping reply here, but is unable to reach the Internet (failed the above ping tests): see the [Common Network Diagnostics](#common-network-diagnostics section to investigate issues with the network.
    -   If no Ping reply: continue testing the VM configuration below.


<br>
<br>

## Verify VM has Appropriate IP Address

> By default, an Internal VergeIO network is configured to serve DHCP addresses. {.is-success}

**To Check if the VM received a DHCP address:**

1.  Navigate to the VM Dashboard.
2.  Scroll down to the ***NICs*** section of the screen.
If the Network assigned a DHCP address to the NIC, it will display in the IP Address field.
![troubleshooting-verifyipaddress.png](/public/userguide-sshots/troubleshooting-verifyipaddress.png)

**If an IP address was manually assigned within the guest OS (rather than utilizing DHCP):**

3.  Verify assigned IP address lies within the network's address range.




> Default addressing for a Layer3 Internal network: network segment: 192.168.0.0/24; router address: 192.168.0.1   
To check a network's addressing, see [Determining Network Addresses](#determining-network-addresses) {.is-success}

4.  Verify appropriate subnet mask and gateway (gateway should be network router IP address)
5.  Verify the IP address is not duplicated (in use by another NIC) on the same network.

>  It is generally recommended to use DHCP on Internal networks, rather than simply assigning addresses within the VM guest OS.  Static DHCP can be configured to reserve particular addresses to particular VMs: [**Create a DHCP Static Entry**](/public/ProductGuide/dhcpstaticlease) {.is-info}


<br>
<br>

## Verify Correct NIC Interface and Driver

Virtio is generally the recommended interface for NIC devices, as it typically will provide the best performance. Virtio drivers need to be added for Windows VMs. VergeIO custom Windows Iso files include Virtio drivers and can be used for initial guest OS installation; otherwise, the latest Virtio drivers can be downloaded at: https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso 

**To check the NIC interface:**

1.  Navigate to the VM Dashboard.
2.  Scroll down to the ***NICs*** section of the screen.
3.  The ***Interface*** column will display for each NIC.
![troubleshooting-verifyinterface.png](/public/userguide-sshots/troubleshooting-verifyinterface.png)

<br>
<br>

## Check Guest Firewalls and AV software

If a VM is still unable to reach its network router after the NIC interface/driver and IP addressing have been verified, check guest software such as OS firewalls, Anti-virus programs, etc that can block outgoing access. Consult associated help menus/documentation for these products for configuration instructions.

<br>
<br>
 
<a name="netdiagnostics"></a>

## Common Network Diagnostics

Some common network diagnostic queries are explained within this section; see [**Network - Diagnostics**](/public/ProductGuide/netdiagnostics) for additional information regarding the built-in Diagnostics Tool.

 - ### Check that a Network has Internet Connectivity:

   1.  Navigate to the network dashboard.
> A quick way to navigate to the network on which a NIC is connected: from the VM Dashboard, scroll down to the NICs section and click on the network listed for the NIC.
{.is-success}


2.  Click **Diagnostics** on the left menu. 

   3.  Select ***Ping*** from the Diagnostics Query dropdown list.

![diagnostics-querylist.png](/public/userguide-sshots/diagnostics-querylist.png)

   4.  Click **Send** to test a ping to 8.8.8.8 (This is the default Host value; it is Google's Public DNS.)
5.  An unsuccessful ping may indicate an incorrect network configuration.
6.  If the ping test is successful; you can test further to verify DNS is working properly; change the ***Host*** value to an Internet DNS name (e.g. google.com) and click **Send**

<br>
<br>

## Default Gateway Rule (for an Internal network to route through an External network)

In order for an internal network to receive Internet connectivity, it must have a default gateway rule to route through an external network.

**Check the Default Gateway Route Rule:**

1.  Navigate to the network dashboard.
2.  Click **Rules** on the left menu.
3.  Verify there is a route rule with the appropriate External network defined as the Target.  
    ***Example:***
![showdefgwrule.png](/public/userguide-sshots/showdefgwrule.png)

>    **Hint:** When creating a new internal network, select the external network in the Default Gateway setting; this will automatically create the needed default gateway route rule. A route rule can also be manually created after network creation,using the following instructions. {.is-success}

**To Create a Default Gateway Route Rule:**
1.  Navigate to the network dashboard.
5.  Click **Rules** on the left menu.
6.  Click **New** on the left menu.
7.  Enter a ***Name*** for the Rule (recommended name: "Default Gateway").
8.  In the ***Action*** field, select Route.
9.  In the ***Direction*** field, select Outgoing.
10.  In the ***(Target) Type*** field, select Other Network DMZ IP.
11.  In the ***Target Network*** field, select the appropriate external network.

**Example:**
![defaultgw-create.png](/public/userguide-sshots/defaultgw-create.png) <br>
 <br>
  
  
 
<a name="netaddresses"></a>
## Determining Network Addresses
### (router/network segment)

A network's gateway address and network segment can be found on the network dashboard.

-   **Network**: network segment in CIDR format (ex: 192.168.0.0/24; 10.10.0.0/24)
-   **IP Address**: network router address (ex: 192.168.01; 10.10.0.1)

![findnetworkaddress.png](/public/userguide-sshots/findnetworkaddress.png)

> By default, internal layer-3 networks are configured with network segment: 192.168.0.0/24 and router IP Address: 192.168.0.1 {.is-info}

  
  
 

 
## <a name="dns"></a>DNS

### Test DNS on a Network

1.  Navigate to the networks Dashboard.
2.  Click **Diagnostics** on the left menu.
3.  Select **DNS Lookup** in the Query dropdown list.
4.  **Default values can be used to run a basic DNS test.** Values can be changed if needed:
    -  Host (URL)
    -  Query Type (record type)
    -  DNS Server (optional, use to specify particular DNS server, overriding default.)
   <br>

1.  Click **Send-** to submit the query.
2.  The Responses window will show the result; a successful DNS lookup will return the corresponding IP address for the entered Host.

<br>


### Test DNS from a VM

When a VM is able to reach Internet IP addresses but not URL addresses, a DNS problem is indicated. If DNS function is validated from the network, but not from the VM itself, check DNS configuration within the VM guest OS; DNS lookup tests that can be performed will vary per guest OS version (nslookup, dig, etc.)

> If the VM is configured with DHCP and successfully receiving an address it will also automatically receive DNS configuration from the network {.is-success}

For Additional Troubleshooting help, contact the VergeIO Support Team at: Support@Verge.io

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }

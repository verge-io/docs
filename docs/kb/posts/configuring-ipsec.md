---
title: Setting up an IPSEC VPN
slug: setting-up-an-ipsec-vpn
description: 
published: true
date: 2024-02-05T18:35:40.364Z
tags: ipsec, vpn, dmz, security
editor: markdown
dateCreated: 2022-10-04T18:38:59.908Z
---

## How to create an IPSEC VPN tunnel in VergeIO

In VergeIO, the **DMZ Network** is where the basic routing between networks is handled.
-   Every **router** has a **NIC and an IP address in the DMZ**. This is how traffic transverses from network to network inside the VergeIO platform.
-   Each **vNet** is its own **VXLAN or VLAN**.
<br>

> These instructions are for setting up the IPsec Tunnel to connect to a VergeOS **Internal Network**. If you are connecting the tunnel to an **External Network** or have a special use case, the network rules below will have to be adjusted to accomodate those changes.
{.is-info}


1.  Reserve a **static IP** address on the **Internal (LAN) network** which will be used by the VPN connection on that network.  In this example, an **IP address of 192.168.0.254** was set to **static** on the **internal network** named Internal.
![ipsec-1.png](/public/ipsec-1.png) 

   -   For **Type**, set to **Static**.
   -   For **IP Address**, choose one of the available IP addresses in the system.  If there are no unused IP addresses, an additional IP will need to be added.

<br>

2.  Navigate to **Main Dashboard > Networks** and click **New VPN** on the left menu.
These settings are variable based on each connection but are important to define.
    - For Network, **Layer 2** - configure as required by the connection.
    - For Network, **Interface Network** - Select the network being bridged to the VPN Connection.
    - For Network, set the **IP Addr**ess Type** to **Static**.
    - For **Network Router**, **IP Address** - Enter the IP address reserved in Step 1.
    ![ipsec-2.png](/public/ipsec-2.png) 

<br>

3. From the **newly created VPN Dashboard**, click on **Edit IPSec** to edit the configuration if necessary to add/update **connection-specific information**.
![ipsec-3.png](/public/ipsec-3.png) 

<br>

4. Click on **IPSec Tunnels** to start creating the IPSec Tunnel between the Verge.io environment and the remote site.
   -   For **Remote Gateway** - configure as required by the connection.
   -   For **Phase 1 Proposal (Authentication)**, define the Authentication Method and Pre-Shared Key with connection-specific information.
   ![ipsec-4.png](/public/ipsec-4.png) 
<br>

1. When completing the Phase 1 setup, you will automatically be launched to configuring Phase 2.
If navigating manually, navigate to **Main Dashboard > Networks Dashboard > VPNs > *VPN Connection*> Phase 1s**. Highlight the Phase 1 created previously, and click **‘View P2s’**
    -   For **Mode**, set to **Tunnel**.
    -   For **Local Network**, configure as required by the connection.
    -   For **Remote Network** - configure as required by the connection.
    -   For **Phase 2 Proposal**, configure as required by the connection.
    ![ipsec-5.png](/public/ipsec-5.png) 
> **NOTE:** This will **automatically create rules** on the VPN network.
{.is-info}

6. **VPN Network Rules** - **Review the rules** to verify their configuration.

   -   **Accept incoming**, named **Allow IKE**, Protocol **UDP**, Destination IP: **My Router IP**, Port: **500**
   -   **Accept incoming**, named **Allow IPSEC NAT - Traversal**, **UDP**, Destination IP: **My Router** IP, Port **4500**
   -   **Accept incoming**, named **Allow ESP**, Protocol **ESP**, Destination IP: **My Router IP**
   -   **Accept incoming**, named **Allow AH**, Protocol **AH**, Destination IP: **My Router IP**
   ![ipsec-6.png](/public/ipsec-6.png) 
<br>

1.  **External Network Virtual IP Assignment** - Assign a **new virtual IP** to the new **VPN network** from the **External network**.  This will be the **Public** side of the VPN tunnel.
![ipsec-7.png](/public/ipsec-7.png) 
    - **VPN Network Rule** - This will **automatically** create an **outgoing route rule** on the **VPN network with that virtual IP address**, which will have to have the rule applied.  **Verify that the rule is present** and then **Apply Rules** to save the changes.
![ipsec-8.png](/public/ipsec-8.png)
<br>

1.  **VPN Network Rule** - Create a **Default Route** rule for the new VPN network to define the **default path outbound** for **traffic inside this network**.
![ipsec-9.png](/public/ipsec-9.png)
<br>

1.  **VPN Network Rule** - **Create an sNAT rule** on the new VPN network to mask external traffic
![ipsec-10.png](/public/ipsec-10.png)
<br>

1.  **VPN Network Rule** - **Create a general sNAT rule** to work as a **catchall** for traffic from this network.
![ipsec-11.png](/public/ipsec-11.png)
<br>

1.  **VPN Network Rule** - **Create a new Translate rule** to **allow traffic** from the **VPN tunnel to access this network**.
![ipsec-12.png](/public/ipsec-12.png)
<br>

1.  **VPN Network Rule** - **Create a new accept rule** on the **VPN network** to allow traffic from the **remote network** incoming.
![ipsec-14.png](/public/ipsec-14.png)
<br>

1.  **VPN Network Rule** - **Create a new accept rule** on the **VPN network** to allow traffic
![ipsec-16.png](/public/ipsec-16.png)
<br>

1.  **Internal Network Rule** - **Create a new route rule** on the **internal network** to send traffic **properly out of the VPN tunnel**.
![ipsec-13.png](/public/ipsec-13.png)
<br>

1.  **Internal Network Rule** - **Create a new accept rule** on the **internal network** to allow traffic **from the remote network**.
![ipsec-15.png](/public/ipsec-15.png)
<br>

#### Connecting to IPsec

1. Open the **VPN network's Dashboard** (Networks->VPNs then double-click on the Network).
1. Scroll down to the **IPsec Connections** section and click the plug icon to connect.
![2024-02-05_ipsec_connect.png](/public/knowledgebase/2024-02-05_ipsec_connect.png)
1. Watch for the **IPsec** status to show **connected**. If it doesn't, continue on to the next step.

## Troubleshooting Guide

This guide will take you through some common testing and diagnostic tools to help troubleshoot why the IPsec VPN is not working. 


### Checking Logs/Status

Logs will not be shown in the VPN logs section for the IPsec connection. These are shown in diagnostics. 

1. Click on **Diagnostics** on the left menu.
1. Change the **Query** to **Logs** and click **Send**.
![2024-02-05_09_47_04-logs.png](/public/knowledgebase/2024-02-05_09_47_04-logs.png)
1. Scroll down to the latest logs at the bottom and review the errors. 
![2024-02-05_09_49_29-retransmit.png](/public/knowledgebase/2024-02-05_09_49_29-retransmit.png)
1. The most common cause of issues is not able to connect to the tunnel as you can see above it will retry.

### Connection issues

If you are receiving a bunch of retransmit messages then you may be having connection issues. Most commonly this is caused by incorrect network rules or firewall setups. Below is a common list of things to check.

1. Click on **Diagnostics** on the left menu.
1. Change the **Query** to **Ping**.
1. Change the **Host** to the IP of the VPN network's **Remote Gateway**.
1. Hit **Send** and look for packet failures.

If you are not able to ping the **Remote Gateway** then you have something blocking your connection or a missing route. This is also assuming that the gateway is responding to pings, confirm this by pinging the **Remote Gateway** outside of **VergeOS**. 

#### Other things to check

1. Test if you can ping **8.8.8.8**, this will tell you if you have internet on this network. If you can't, confirm that you have a **Default Route** in your **Rules**. 
1. Run the diagnostic query "What's My IP". Assuming your VPN is over the WAN, you should get a response.
1. Run a diagnostic **TCP Connection test** to the **Remote Gateway** on the **IKE port** (default 500). This is assuming your firewall has TCP and UDP allowed on that port, if you are only allowing UDP incoming then this will fail anyway but a lot of times both are open and it's a good test. 
1. Run a diagnostic **Trace Route** to the **Remote Gateway**. Check that the traffic is routing correctly. If not, look at your **Default route** rules in the **VPN** and **External** networks. 
1. Run a diagnostic **IPsec** with **Status All**. This will give you the current state of the IPsec Tunnel. You can also change this to **Show Config** and review the config for accuracy. 
1. Check for other logs in the Diagnostics **Logs**. You can change the results to show more than 100 lines if needed. 


<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
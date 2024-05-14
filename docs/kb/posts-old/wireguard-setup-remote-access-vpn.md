---
title: Wireguard - Setup Remote Access VPN
description: How to setup a Remote Access VPN using Wireguard
published: true
date: 2024-02-06T18:49:12.726Z
tags: network, vpn, wireguard, remote access, networking, 4.11
editor: markdown
dateCreated: 2022-06-28T16:17:24.344Z
---

## How to Setup a Wireguard Remote Access VPN

Here are instructions on how to set up a Remote Access VPN using the Built-In Wireguard capabilities of VergeOS. More information can be found in the Help section of the VergeOS User Interface. 
<br>

### Create the Wireguard Setup on your Internal Network
> You can use an existing Internal Network or **create a new** Internal Network.
{.is-info}

1. In the Verge OS UI, Navigate to **Networks->Internals** and View or **double-click** on the Internal Network that you want to use.
1. In the left menu, Click on **Wireguard (VPN)**
1. Click on **Add New Interface**
![wireguardvpn-img1.png](/public/wireguardvpn-img1.png)

1. Enter the Information below:
	- Enter a unique **Name** for this Interface
	- Enter a **Description** (optional)
	- Check **Enabled**
	- Enter the **IP Address** to be used for this Wireguard Internal Network. This **must be** separate from your existing Internal network IP scheme. For example: If your Internal Network is using 192.168.0.1/24, you must choose a different unique IP scheme like 192.168.255.1/24.
	- Enter the **Listen Port** to be used when connecting to the VPN (**Default: 51820**). This is the port that you will use on your External network to send VPN traffic into your Internal Network.
	- Enter a **Private Key** or leave it blank to Auto-generate a key.
	- Enter an **Endpoint IP** or leave it blank and the system will attempt to auto-detect the IP. We **highly recommend** you enter the IP manually to ensure the correct config. This IP is the External IP of your environment, Usually, it is the same IP as your UI. You can find your External IP by going to **Networks->Externals** and viewing your External network. In the Network Router section, it should be the IP address as seen below:
![wireguardvpn-img3-fixed.png](/public/wireguardvpn-img3-fixed.png)

1. Click **Submit** to add the new interface
1. After adding the interface, it will take you to the dashboard where you will see your new interface.
![wireguardvpn-img2.png](/public/wireguardvpn-img2.png)

1. Click **Apply Rules** on the left menu bar to apply the firewall rules. Here are the rules that it adds:
![wireguardvpn-img-intrules.png](/public/wireguardvpn-img-intrules.png)

- It automatically creates two firewall rules to accept inbound UDP traffic on port 51820 to both the Router IP and the DMZ IP of the **Internal Network**.
<br>

### External Network PAT Rule

In order for the internal network to be connected, we need an external **PAT** (Port Address Translation) rule to translate the port (**default 51820**) to the **internal network**. 

![2023-09-06_11_56_18-training___rules.png](/public/2023-09-06_11_56_18-training___rules.png)

**Add External PAT Rule**

1.  From the **External network** Dashboard, Click **Rules** on the left menu.
2.  Click **New** on the left menu.
3.  Enter a ***Name*** that will be helpful to future administration.
4.  **Optionally**, a ***Description*** can be entered to record additional administration information.
5.  In the ***Action*** dropdown, select **Translate**.
6.  In the ***Protocol*** dropdown, select **UDP**.
7.  In the ***Direction*** dropdown, select **Incoming**.

**Source:**
8.  In the ***Type*** dropdown, select **Any/None**.  **Optionally** you can source-lock the VPN traffic here if you have that requirement.

**Destination:**
9.  In the ***Type*** dropdown, select **My Router IP**. If you are inside of a **Tenant**, change this to **My IP Addresses** and choose the IP of the **Tenant UI**. This should be the same as the **Endpoint IP** used above. If you plan to use a different IP than the UI IP, we recommend that you to create a **SNAT** rule on the **External** network. See <a href="#snat">below for instructions</a>.
10.  In the ***Destination Ports/Ranges*** field, enter the **Port** (Default Port is 51820)

**Target:**
11.  In the ***Type*** dropdown, select **Other Network DMZ IP**.
12.  In the ***Target Network*** dropdown, select the **Target Network**.
13.  In the ***Target Ports/Ranges*** field, leave this **blank**.
14.  Click **Submit**.
15.  Click **Apply Rules** on the left menu to put the new rule into effect.

<br>

<a id="snat"></a>
 
### SNAT rule recommended if not using the UI IP

If you are adding **Wireguard** and you are not using the IP address of the **UI**, we recommend creating an **SNAT** rule on the **External** network. 

1.  From the **External network** Dashboard, Click **Rules** on the left menu.
2.  Click **New** on the left menu.
3.  Enter a ***Name*** that will be helpful to future administration.
4.  **Optionally**, a ***Description*** can be entered to record additional administration information.
5.  In the ***Action*** dropdown, select **Translate**.
6.  In the ***Protocol*** dropdown, select **UDP**.
7.  In the ***Direction*** dropdown, select **Outgoing**.

**Source:**
8.  In the ***Type*** dropdown, select **Other Network DMZ IP**.
9.  In the ***Network*** dropdown, select the Internal Network that Wireguard is on. 
10. In the ***Source Ports/Ranges*** field, leave this **blank**.

**Destination:**
11.  In the ***Type*** dropdown, select **Any / None**. 
12.  In the ***Destination Ports/Ranges*** field, leave this **blank**.

**Target:**
13.  In the ***Type*** dropdown, select **My IP Addresses**.
14.  In the ***IP Address*** dropdown, select the **IP address** you want to use.
15.  In the ***Target Ports/Ranges*** field, leave this **blank**.
16.  Click **Submit**.
17.  Click **Apply Rules** on the left menu to put the new rule into effect.

> This SNAT rule is recommended to force any outgoing traffic coming from the DMZ IP of the internal network to use the correct IP instead. By default it will go out the IP of the UI and this can cause some flapping issues.
{.is-info}



<br>


### Adding a Remote User Peer

> You will set up a **Peer** for each User connecting to the VPN
{.is-info}

1. From the Wireguard Interface screen, Click **Add new peer**.
![wireguardvpn-img4.png](/public/wireguardvpn-img4.png)

1. Assign a **Name** to the peer, such as the remote user's name.
1. Optionally, a **Description** can be entered to store additional information about this peer.
1. Check the **Auto-Generate Peer Configuration** checkbox to automate settings and create a configuration file that can be used on the client.
1. Enter the **Endpoint** for the Peer (the external-facing IP address, hostname, or URL this system will use to communicate with the peer). This can be left blank if the internal network will never be initiating traffic across the VPN (i.e. roaming client).
1. For **Allowed IPs**, Enter the /32 IP for this peer.
1. In the **Configure Firewall** dropdown, select **Remote User**
1. Click **Submit** to save the new peer entry.
<!--![2023-03-02_13_04_44-support___new_peer.png](/public/2023-03-02_13_04_44-support___new_peer.png)-->

9. This will create a Firewall rule to allow the Peer to connect through UDP on port 51820 to the Router IP on the Internal Network.
![wireguardvpn-img6.png](/public/wireguardvpn-img6.png)

#### Download the Configuration File:

10. Click the Download Config button on the peer record and select a location for the file; download to a location that will be accessible to the client computer or from which can otherwise be transferred to the client.

![download-link.png](/public/download-link.png)
![configuration-file.png](/public/configuration-file.png)

#### Install WireGuard Software on Client:

WireGuard Client software can be downloaded from: https://wireguard.com/install . (In this example, we download and install WireGuard for Windows-64bit to use on a Windows 10 Pro machine.)

![add-tunnel.png](/public/add-tunnel.png)

11. Click Add Tunnel.
12. Navigate to and select the generated configuration file.
13. The configuration file is used to automatically create interface and peer on the client machine. Click the Activate button to open the tunnel, if it was not automatically activated.
![tunnel-active.png](/public/tunnel-active.png)

<br>

<!--
## Troubleshooting Guide

This guide will take you through some common testing and diagnostic tools to help troubleshoot why the **VPN** is not working. 

### WireGuard Status

The WireGuard status diagnostics tool can give you an idea of the peers that are connecting and what their settings are.

1. Navigate to the **WireGuard Interface**.
1. Click on the **Heart Pulse** icon near the top. 
![2024-02-06_13_46_55-diaghearticon.png](/public/knowledgebase/2024-02-06_13_46_55-diaghearticon.png)
1. Set the **Query** to **WireGuard** and hit send
![2024-02-06_10_35_23-wireguarddiags.png](/public/knowledgebase/2024-02-06_10_35_23-wireguarddiags.png)
1. This will show you interface settings and peers. Check to make sure everything looks correct. Specifically look to make sure the **Allowed IPs** are set correctly. 



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




-->

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
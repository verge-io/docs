---
title: Setting up an IPSEC VPN
slug: setting-up-an-ipsec-vpn
description: How to create and configure an IPsec VPN in VergeOS.
draft: false
date: 2024-02-05T18:35:40.364Z
tags: ipsec, vpn, dmz, security
categories:
  - VPN
editor: markdown
dateCreated: 2022-10-04T18:38:59.908Z
---

# How to Create an IPsec VPN Tunnel in VergeOS

In VergeOS, the **DMZ Network** handles basic routing between networks:
- Every **router** has a **NIC and an IP address in the DMZ** to route traffic between networks inside VergeOS.
- Each **vNet** represents its own **VXLAN or VLAN**.

!!! note "These instructions focus on setting up the IPsec Tunnel to connect to a VergeOS **Internal Network**. If you are connecting to an **External Network** or have special use cases, network rules must be adjusted accordingly."

## Steps to Create an IPsec VPN Tunnel

### Step 1: Reserve a Static IP Address
Reserve a **static IP** on the **Internal (LAN) network** that the VPN connection will use.

- In this example, the **IP address 192.168.0.254** is set to **static** on the internal network named **Internal**.

    ![Reserve Static IP](/docs/public/ipsec-1.png)

    - **Type**: Set to **Static**.
    - **IP Address**: Select an available IP address from the system. If there are no available IPs, add a new IP.

### Step 2: Create the VPN Connection
1. Navigate to **Main Dashboard > Networks**.
2. Click **New VPN** on the left menu.
   
   Configure the settings as required by the connection:

   - **Layer 2**: Set the network layer configuration.
   - **Interface Network**: Select the network that will be bridged to the VPN connection.
   - **IP Address Type**: Set to **Static**.
   - **Network Router IP**: Enter the IP address reserved in Step 1.

    ![Create VPN Connection](/docs/public/ipsec-2.png)

### Step 3: Edit IPsec Configuration
1. From the **VPN Dashboard**, click on **Edit IPsec** to modify or add connection-specific details.

    ![Edit IPsec](/docs/public/ipsec-3.png)

### Step 4: Create the IPsec Tunnel
1. Click on **IPsec Tunnels** to start creating the tunnel between VergeOS and the remote site.
2. 
   - **Remote Gateway**: Configure according to the connection requirements.
   - **Phase 1 Proposal (Authentication)**: Set the authentication method and Pre-Shared Key.

    ![Phase 1 Setup](/docs/public/ipsec-4.png)

### Step 5: Configure Phase 2
After completing Phase 1, you will be prompted to configure Phase 2.

- **Mode**: Set to **Tunnel**.
- **Local Network** and **Remote Network**: Configure as required.
- **Phase 2 Proposal**: Enter the details as needed for the connection.

    ![Phase 2 Setup](/docs/public/ipsec-5.png)

!!! note "This will **automatically create rules** for the VPN network."

## Reviewing and Configuring VPN Network Rules

### Step 6: Review VPN Network Rules
Verify the rules that were automatically created during VPN setup.

- **Allow IKE**: Accept incoming UDP traffic on port 500 to **My Router IP**.
- **Allow IPsec NAT-Traversal**: Accept incoming UDP traffic on port 4500 to **My Router IP**.
- **Allow ESP**: Accept incoming ESP protocol traffic to **My Router IP**.
- **Allow AH**: Accept incoming AH protocol traffic to **My Router IP**.

    ![Review Rules](/docs/public/ipsec-6.png)

### Step 7: Assign a Virtual IP to the VPN Network

Assign a **new virtual IP** to the **VPN network** from the **External network** (Public side of the VPN tunnel).

![Assign Virtual IP](/docs/public/ipsec-7.png)

!!! note "This automatically creates an **outgoing route rule** on the VPN network with that virtual IP address. Ensure the rule is applied."

### Step 8: Create VPN Network Rules
1. **Create a Default Route** rule for the new VPN network to define the default outbound path for traffic inside this network.

    ![Create Default Route](/docs/public/ipsec-9.png)

2. **Create an sNAT Rule** on the new VPN network to mask external traffic.

    ![Create sNAT Rule](/docs/public/ipsec-10.png)

3. **Create a General sNAT Rule** as a catchall for traffic from this network.

    ![General sNAT Rule](/docs/public/ipsec-11.png)

4. **Create a Translate Rule** to allow traffic from the VPN tunnel to access this network.

    ![Translate Rule](/docs/public/ipsec-12.png)

5. **Create Accept Rules**:
    - One rule to allow incoming traffic from the remote network.
    - Another rule to accept traffic within the VPN network.

    ![Create Accept Rules](/docs/public/ipsec-16.png)

### Step 9: Create Internal Network Rules
1. **Create a Route Rule** on the **Internal network** to send traffic properly through the VPN tunnel.

    ![Internal Route Rule](/docs/public/ipsec-13.png)

2. **Create an Accept Rule** on the **Internal network** to allow traffic from the remote network.

    ![Internal Accept Rule](/docs/public/ipsec-15.png)

## Connecting to IPsec

1. Open the **VPN network's Dashboard** (Networks > VPNs > select VPN).
2. Scroll down to the **IPsec Connections** section.
3. Click the plug icon to connect.

    ![Connect IPsec](/docs/public/knowledgebase/2024-02-05_ipsec_connect.png)

4. Watch for the **IPsec** status to show **connected**.

If the connection fails, proceed to the troubleshooting steps below.

## Troubleshooting Guide

### Checking Logs and Status
1. Go to **Diagnostics** on the left menu.
2. Change the **Query** to **Logs** and click **Send**.
3. Review the latest logs for errors, such as retransmission attempts.

    ![Check Logs](/docs/public/knowledgebase/2024-02-05_09_49_29-retransmit.png)

### Common Connection Issues
If you see many retransmit messages, this could indicate connection issues, often caused by incorrect network rules or firewall setups.

- Test connectivity with **Ping**.
  - Change the **Host** to the **Remote Gateway** IP and check for packet failures.

If pinging the **Remote Gateway** fails, verify that your connection is not blocked and that the correct route is in place.

### Other Diagnostics
1. **Ping 8.8.8.8** to test for internet connectivity. If this fails, check the **Default Route** rule.
2. Run **"What's My IP"** to verify the VPN's WAN connection.
3. Use **TCP Connection Test** to check the **IKE port** (port 500) on the Remote Gateway.
4. Run a **Trace Route** to the Remote Gateway to confirm correct traffic routing.
5. Use **IPsec** diagnostics with **Status All** to view the current state of the IPsec Tunnel or **Show Config** to review the configuration.
6. Review **Logs** in Diagnostics, increasing the line count if necessary.

---

By following these steps and rules, you can successfully set up an IPsec VPN tunnel in VergeOS, troubleshoot common issues, and ensure that traffic flows properly between networks.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

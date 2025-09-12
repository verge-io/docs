---
title: Configure Authoritative DNS in VergeOS
slug: configure-authoritative-dns-vergeos
description: Complete guide to setting up authoritative DNS services in VergeOS using BIND, including DNS views, zones, records, and firewall configuration
draft: false
date: 2025-09-10T14:10:54.764Z
tags:
  - dns
  - bind
  - authoritative
  - zones
  - records
  - network
  - configuration
  - firewall
  - views
  - split-horizon
categories:
  - Network Services
editor: markdown
dateCreated: 2025-09-10T14:10:54.764Z
---

# Configure Authoritative DNS in VergeOS

## Overview

This guide walks you through configuring authoritative DNS services in VergeOS using the built-in BIND DNS server. You'll learn how to enable DNS services on a network, create DNS views for access control, configure DNS zones for your domains, and manage DNS records. By the end of this guide, you'll have a fully functional authoritative DNS server running in your VergeOS environment.

Authoritative DNS allows your VergeOS system to be the definitive source for DNS records in domains you control, providing complete management over domain name resolution while integrating with your existing network infrastructure.

## What You'll Learn

After completing this guide, you will be able to:

• **Enable BIND DNS services** on VergeOS networks and understand the configuration options
• **Create and configure DNS views** to control access and implement split-horizon DNS
• **Set up DNS zones** for domains you want to host authoritatively
• **Manage DNS records** including A, CNAME, MX, and other record types
• **Configure firewall rules** to allow DNS traffic while maintaining security
• **Set up zone transfers** for redundant DNS configurations
• **Verify DNS functionality** and troubleshoot common issues

**Common User Questions This Guide Answers:**
- How do I enable authoritative DNS on my VergeOS network?
- What's the difference between LAN and WAN DNS views and how do I configure them?
- How do I create a DNS zone for my domain?
- What firewall rules do I need for public-facing DNS services?
- How do I add different types of DNS records?
- How do I set up DNS zone transfers for redundancy?
- Why isn't my DNS server providing internet resolution to internal clients?

## Requirements

**VergeOS Version**: v4.0 or later  
**Access Level**: Cluster Admin or Tenant Admin permissions  
**Network Prerequisites**: Properly configured network with external connectivity (for public DNS)  
**Domain Requirements**: Domain registered with ability to modify name server settings (for public DNS)

**Background Knowledge**:
- Understanding of DNS fundamentals (zones, records, resolution)
- Familiarity with VergeOS network configuration
- Basic understanding of firewall rules

## Time Estimate

**Completion Time**: 20-45 minutes  
**Setup Prerequisites**: 10-15 minutes (firewall rules, network verification)

## Quick Reference

| Action | Location | Purpose |
|--------|----------|---------|
| Enable BIND DNS | Networks > Edit Network > DNS: Bind | Activates authoritative DNS services |
| Create DNS View | Networks > DNS Views > New | Configure client access policies |
| Create DNS Zone | Networks > DNS Views > [View] > DNS Zones > New | Add domain for authoritative hosting |
| Add DNS Records | Networks > DNS Views > [View] > DNS Zones > [Zone] | Manage domain records |
| Configure Firewall | Networks > Rules > New | Allow DNS traffic (ports 53 UDP/TCP) |
| Test DNS | Networks > Diagnostics > DNS Lookup | Verify DNS functionality |

## Step-by-Step Configuration

### Step 1: Enable BIND DNS on a Network

The first step is enabling BIND DNS services on the network that will provide authoritative DNS. You can enable DNS on any existing network (internal or external), though external networks are typically used for public-facing DNS services.

1. **Navigate to your target network**:
   - From the **Main Dashboard**, click **Networks**
   - Select the network where you want to enable DNS services
   - Click **Edit** from the left menu

2. **Configure DNS settings**:
   - Locate the **DNS** dropdown field
   - Select **Bind** from the available options:
     - ***Bind*** - Enables full authoritative DNS server capabilities
     - ***Simple*** - Basic DNS forwarding (not authoritative)
     - ***Disabled*** - No DNS services
     - ***Other Network*** - Forward to another network's DNS
   
3. **Configure additional network settings** if needed:
   - Verify **IP Address Type** is set to **Static** (required for DNS services)
   - Ensure appropriate **DNS server list** entries for upstream resolution
   - Configure **DHCP** settings if clients will receive DNS configuration automatically

4. **Submit the configuration**:
   - Click **Submit** to save the network configuration
   - The network will need to be restarted to apply DNS changes

!!! warning "Important Network Behavior Change"
    When you enable BIND on a network, recursion is **disabled by default**. This means internal systems will use the network's default route for internet DNS resolution until you configure DNS views with recursion enabled.

### Step 2: Create DNS Views

DNS views control how the DNS server responds to different types of clients. This section explains how to create both internal (LAN) and external (WAN) views for split-horizon DNS configuration.

1. **Access DNS Views**:
   - From your DNS-enabled network dashboard
   - Click **DNS Views** from the left menu
   - You'll see an empty list ready for view configuration

2. **Create the LAN (Internal) View**:
   - Click **New** from the left menu
   - Configure the LAN view settings:
     - **Network**: Select your DNS network from the dropdown
     - **Name**: Enter `LAN` (or another descriptive internal name)
     - **Recursion**: Check the box to **enable recursion**
     - **Order ID**: Enter `1` (views are processed in order)

3. **Configure LAN view client matching**:
   - In the **Match Clients** section, click the **+** icon to add client networks
   - Add your internal network ranges (these clients will get recursive DNS):
     - `10.0.0.0/8` (private Class A networks)
     - `192.168.0.0/16` (private Class C networks)
     - `172.16.0.0/12` (private Class B networks)
     - Add any other internal networks used in your environment
   - **Match Destinations**: Leave empty for most configurations
   - **Max Cache Size**: Set to `32` MB (or adjust based on your needs)

4. **Create the WAN (External) View**:
   - Click **New** from the left menu again
   - Configure the WAN view settings:
     - **Network**: Select your DNS network from the dropdown  
     - **Name**: Enter `WAN` (or another descriptive external name)
     - **Recursion**: Leave **unchecked** (disabled for security)
     - **Order ID**: Enter `2` (processed after LAN view)

5. **Configure WAN view client matching**:
   - **Match Clients**: Leave empty (matches all other clients not caught by LAN view)
   - **Match Destinations**: Leave empty
   - **Max Cache Size**: Set to `32` MB or as appropriate

6. **Submit both views**:
   - Click **Submit** for each view configuration
   - Both views should now appear in your DNS Views list

!!! info "View Processing Logic"
    Views are processed in order based on Order ID. The first view that matches the client's IP address will handle the request. LAN view (Order ID 1) catches internal clients and provides recursion, while WAN view (Order ID 2) catches all other clients and provides authoritative answers only.

### Step 3: Configure DNS Zones

DNS zones define the domains for which your server is authoritative. This section covers creating zones and configuring their basic settings.

1. **Access zone configuration**:
   - From the **DNS Views** list, click on your **LAN** view
   - Click **DNS Zones** from the left menu
   - Click **New** to create a new zone

2. **Configure basic zone settings**:
   - **Type**: Select **Primary** (this server will be the master)
   - **Domain**: Enter your domain name (e.g., `company.com`)
   - **Name Server**: Enter the FQDN of your name server
     - For external name servers: `ns1.example.com.` (note the trailing period)
     - For in-domain name servers: `ns1.company.com.` (requires glue records)
   - **Email**: Enter admin email in DNS format (e.g., `admin.company.com`)

3. **Configure zone timing settings**:
   - **Default TTL**: Set to `1h` (3600 seconds) for most environments
   - **Negative Cache TTL**: Set to `10m` (600 seconds)
   - **Refresh Interval**: Set to `3h` (10800 seconds) for zone transfers
   - **Retry Interval**: Set to `30m` (1800 seconds) for failed transfers
   - **Expiry Period**: Set to `3w` (1814400 seconds) for zone expiration

4. **Configure zone transfer settings** (for redundancy):
   - **Notify**: Select **Yes** to enable change notifications
   - **Also Notify**: Enter IP addresses of secondary DNS servers (semicolon-separated)
     - Example: `192.168.1.100;203.0.113.50`
   - **Allow Transfer**: Enter IP addresses authorized for zone transfers
     - Example: `192.168.1.100;203.0.113.50`
   - **Forwarders**: Leave empty for authoritative zones

5. **Submit the zone configuration**:
   - Click **Submit** to create the zone
   - The zone will appear in your DNS Zones list

6. **Create the zone in the WAN view** (for public access):
   - Go back to **DNS Views** and select your **WAN** view
   - Repeat the zone creation process with identical settings
   - This ensures both internal and external clients can resolve the domain

!!! tip "Name Server Recommendations"
    For public domains, use name servers outside your domain (e.g., `ns1.dnsProvider.com`) to avoid circular dependencies. If using in-domain name servers (e.g., `ns1.yourDomain.com`), you must configure glue records at your domain registrar.

### Step 4: Add DNS Records

With zones created, you can now add DNS records for your domains. This section covers creating common record types.

1. **Access DNS records**:
   - Navigate to **DNS Views** > **[Your View]** > **DNS Zones**
   - Click on your domain zone to access its records
   - You'll see automatically created NS (Name Server) records

2. **Create A records** (IPv4 address mappings):
   - Click **New** from the left menu
   - Configure the A record:
     - **Type**: Select **A**
     - **Host**: Enter the hostname (e.g., `www` for www.company.com)
     - **Value**: Enter the IPv4 address (e.g., `192.168.1.100`)
     - **TTL**: Use `0` for default, or specify custom TTL
     - **Order ID**: Use ascending numbers (1, 2, 3, etc.)

3. **Create CNAME records** (aliases):
   - Click **New** from the left menu
   - Configure the CNAME record:
     - **Type**: Select **CNAME**
     - **Host**: Enter the alias name (e.g., `mail`)
     - **Value**: Enter the target FQDN with trailing period (e.g., `smtp.company.com.`)
     - **TTL**: Use `0` for default
     - **Order ID**: Continue sequential numbering

4. **Create MX records** (mail servers):
   - Click **New** from the left menu
   - Configure the MX record:
     - **Type**: Select **MX**
     - **Host**: Leave blank for domain apex, or enter subdomain
     - **Value**: Enter priority and mail server (e.g., `10 mail.company.com.`)
     - **TTL**: Use `0` for default
     - **Order ID**: Continue sequential numbering

5. **Create domain apex record**:
   - Click **New** from the left menu
   - Configure the apex A record:
     - **Type**: Select **A**
     - **Host**: Enter the full domain with trailing period (e.g., `company.com.`)
     - **Value**: Enter the IPv4 address for the bare domain
     - **TTL**: Use `0` for default
     - **Order ID**: Use `1` (typically first record)

6. **Repeat in both views**:
   - Add identical records to both LAN and WAN views
   - This ensures consistent resolution for internal and external clients
   - Consider different IP addresses for split-horizon configurations

!!! info "FQDN Format Requirements"
    Always use fully qualified domain names (ending with a period) in the Value field to avoid confusion. For Host fields, you can use either relative names (e.g., `www`) or FQDNs (e.g., `www.company.com.`). Using FQDNs consistently is recommended.

### Step 5: Configure Network Firewall Rules

DNS services require specific firewall rules to allow client queries and zone transfers. This section covers the necessary rule configurations.

1. **Navigate to network rules**:
   - From your DNS network dashboard
   - Click **Rules** from the left menu
   - Review existing rules to avoid conflicts

2. **Create UDP DNS rule** (for standard queries):
   - Click **New** from the left menu
   - Configure the UDP rule:
     - **Name**: `Allow DNS UDP`
     - **Action**: Select **Accept**
     - **Direction**: Select **Incoming**
     - **Protocol**: Select **UDP**
     - **Port/Port Range**: Enter `53`
     - **Source**: Leave as **Any** for public DNS, or specify networks for private DNS
     - **Interface**: Select **Any** or specific interface

3. **Create TCP DNS rule** (for zone transfers and large responses):
   - Click **New** from the left menu  
   - Configure the TCP rule:
     - **Name**: `Allow DNS TCP`
     - **Action**: Select **Accept**
     - **Direction**: Select **Incoming**
     - **Protocol**: Select **TCP**
     - **Port/Port Range**: Enter `53`
     - **Source**: For security, specify only authorized secondary DNS server IPs
     - **Interface**: Select **Any** or specific interface

4. **Apply firewall rules**:
   - Click **Submit** for each rule
   - From the network dashboard, click **Apply Rules** from the left menu
   - Confirm rule application to activate the changes

!!! warning "TCP Rule Security"
    For public-facing DNS, only allow TCP port 53 from authorized secondary DNS servers to prevent potential zone transfer attacks. UDP port 53 can typically be allowed from anywhere for standard DNS queries.

### Step 6: Verify DNS Configuration

After configuration, it's important to test your DNS services to ensure proper functionality.

1. **Test DNS from the network**:
   - Navigate to your DNS network dashboard
   - Click **Diagnostics** from the left menu
   - Select **DNS Lookup** from the Query dropdown
   - Configure the test:
     - **Host**: Enter a domain you configured (e.g., `www.company.com`)
     - **Query Type**: Select **A** or appropriate record type
     - **DNS Server**: Leave blank to use local DNS, or specify `127.0.0.1`
   - Click **Send** to perform the lookup

2. **Test recursive resolution** (internal clients):
   - Use the same Diagnostics interface
   - Test external domain resolution (e.g., `google.com`)
   - Should work for LAN view clients, fail for WAN view clients

3. **Test from external clients**:
   - Use external DNS testing tools (e.g., `nslookup`, `dig`)
   - Query your DNS server's public IP address
   - Verify authoritative responses for your domains

4. **Verify zone transfer functionality** (if configured):
   - From secondary DNS servers, test zone transfer requests
   - Check DNS logs for successful transfer notifications
   - Verify record synchronization between primary and secondary

!!! success "Testing Tips"
    Use external DNS testing websites like `whatsmydns.net` to verify global DNS propagation. Test both authoritative responses (for your domains) and recursive resolution (for internal clients) to ensure complete functionality.

## Advanced Configuration

### Setting Up Zone Transfers

Zone transfers provide redundancy by replicating your DNS zones to secondary servers.

1. **Configure primary zone for transfers**:
   - In your zone configuration, enable **Notify: Yes**
   - Add secondary server IPs to **Also Notify** field
   - Add same IPs to **Allow Transfer** field
   - Ensure TCP port 53 firewall rules allow these IPs

2. **Configure secondary server**:
   - Create a new zone with **Type: Secondary**
   - Specify the primary server's IP address
   - No records need to be manually created (they're transferred automatically)

### Split-Horizon DNS Implementation

Provide different answers to internal vs external clients:

1. **Create different records in LAN vs WAN views**:
   - LAN view: Internal IP addresses for services
   - WAN view: Public IP addresses for the same services
   - Clients get appropriate addresses based on their location

2. **Example configuration**:
   - LAN view: `mail.company.com` → `192.168.1.50` (internal mail server)
   - WAN view: `mail.company.com` → `203.0.113.50` (public mail server IP)

## Troubleshooting Index

| Problem/Symptom | Likely Cause | Solution |
|-----------------|--------------|----------|
| Internal clients can't reach internet sites | Recursion not enabled in LAN view | Enable recursion in LAN DNS view |
| External clients get no DNS response | Firewall blocking UDP port 53 | Add firewall rule allowing UDP port 53 |
| Zone transfer fails | TCP port 53 blocked or IP not authorized | Check firewall rules and Allow Transfer settings |
| DNS queries timeout | Network connectivity issues | Verify network routing and firewall rules |
| Records not resolving | FQDN format incorrect | Ensure trailing periods on FQDNs in Value fields |
| Secondary not receiving updates | Notify settings incorrect | Verify Also Notify IPs and notification settings |

### Common DNS Resolution Issues

**Problem**: Clients cannot resolve external domains
- **Check**: LAN view recursion setting enabled
- **Check**: Upstream DNS servers configured on network
- **Check**: Default gateway configured for internet access

**Problem**: Public DNS queries not working
- **Check**: Firewall allows UDP port 53 from internet
- **Check**: Network has public IP address
- **Check**: Domain registrar has correct name server settings

**Problem**: Zone transfers not working
- **Check**: TCP port 53 allowed from secondary servers
- **Check**: Secondary server IPs in Allow Transfer list
- **Check**: Network connectivity between primary and secondary

## Next Steps

After successfully configuring authoritative DNS, consider these additional implementations:

**Monitoring and Maintenance**:
- Set up DNS query logging and monitoring
- Implement automated DNS record management
- Plan for DNS server updates and maintenance

**Advanced Features**:
- Explore DNSSEC implementation for enhanced security
- Consider DNS load balancing for high availability
- Investigate integration with dynamic DNS services

**Related Documentation**:
- [VergeOS Network Troubleshooting](/knowledge-base/network-troubleshooting)
- [VergeOS Firewall Rules Configuration](/knowledge-base/firewall-rules)
- [VergeOS Network Monitoring](/knowledge-base/network-monitoring)

For additional support with DNS configuration, contact VergeOS Support with specific details about your implementation requirements and any error messages encountered.

---

!!! note "Document Information"
    - Document Type: Knowledge Base Configuration Guide
    - Category: Network Services
    - Last Updated: 2025-09-11
    - VergeOS Version: 4.12 and later
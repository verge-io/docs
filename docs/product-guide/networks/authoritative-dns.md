# VergeOS Authoritative DNS

## Overview

VergeOS includes a powerful authoritative DNS service built on BIND (Berkeley Internet Name Domain), one of the most widely-used DNS server implementations. This service allows you to host authoritative DNS zones for your domains directly within your VergeOS infrastructure, providing complete control over domain name resolution while integrating seamlessly with your existing network configuration.

Unlike simple DNS forwarding, authoritative DNS makes your VergeOS network the definitive source for DNS records in the domains you control. This capability is essential for organizations that need to manage their own domain name resolution, implement split-horizon DNS configurations, or provide DNS services as part of their infrastructure offerings.

## What You'll Learn

This guide covers the core concepts and capabilities of VergeOS Authoritative DNS, helping you understand when and how to implement this powerful networking feature. You'll gain knowledge about:

• **DNS Service Architecture**: How VergeOS implements authoritative DNS using BIND and integrates with network services
• **Zone Management**: Understanding DNS zones, their role in domain resolution, and how they're managed in VergeOS
• **DNS Views**: Implementing access control and split-horizon DNS configurations through view-based policies
• **Recursion vs Authority**: The critical differences between recursive and authoritative DNS services
• **Network Integration**: How authoritative DNS interacts with VergeOS network routing and firewall rules

**Common Questions This Guide Answers:**
- When should I use authoritative DNS instead of simple DNS forwarding?
- How does VergeOS DNS integrate with external domain registrars?
- What's the difference between DNS views and how do I use them effectively?
- How do I implement split-horizon DNS for internal and external clients?
- What are the network requirements for public-facing authoritative DNS?
- How does DNS zone transfer work for redundancy?
- Can I use VergeOS DNS for both internal and external domain resolution?

## Requirements

**VergeOS Platform**: Version 4.12 or later  
**Access Level**: Cluster Admin or Tenant Admin permissions  
**Network Prerequisites**: Properly configured external network connectivity for public DNS services  
**Domain Management**: Access to domain registrar settings if hosting public-facing domains  

**Background Knowledge Recommended:**
- Understanding of DNS fundamentals (A records, NS records, zones)
- Basic network administration concepts
- Familiarity with VergeOS network configuration

## Related Documentation

For step-by-step configuration instructions and detailed implementation guidance, see:

- **[Configure Authoritative DNS in VergeOS](/knowledge-base/configure-authoritative-dns-vergeos)** - Complete configuration guide with detailed steps for enabling BIND DNS, creating DNS views, configuring zones, adding records, and setting up firewall rules

## DNS Service Architecture in VergeOS

### BIND Integration

VergeOS implements authoritative DNS through BIND, providing enterprise-grade DNS capabilities including:

- **Full Zone Management**: Complete control over DNS records and zone configuration
- **DNS Views**: Advanced access control allowing different responses based on client location
- **Zone Transfers**: Built-in support for primary/secondary DNS configurations
- **Performance Optimization**: Integrated caching and query optimization
- **Security Features**: Access controls and query filtering capabilities

### Network-Level DNS Selection

DNS services in VergeOS are configured at the network level, giving you granular control over which networks provide DNS services. When editing a network, you can select from several DNS options:

- **Bind**: Enables full authoritative DNS capabilities on the network
- **Simple**: Provides DNS forwarding without authoritative capabilities  
- **Other Network**: Forwards DNS requests to another VergeOS network
- **Disabled**: No DNS services provided by this network

### Default Behavior and Recursion

When you enable BIND on a network, it becomes an authoritative DNS server by default with **no recursion enabled**. This means:

- The entire VergeOS system (core network, internal networks, VMs) will use the network's default route for recursive DNS queries
- The authoritative DNS server will only respond to queries for domains it hosts
- For internet DNS resolution, queries are forwarded to upstream DNS servers via the default gateway

This design ensures clean separation between authoritative and recursive DNS functions while maintaining system-wide DNS connectivity.

## DNS Views: Advanced Access Control

### Understanding DNS Views

DNS views are a powerful BIND feature that allows you to provide different DNS responses based on who is making the query. In VergeOS, views act as intelligent traffic processors that determine how to handle DNS requests based on:

- **Client IP Addresses**: Match specific networks or IP ranges
- **Query Type**: Different handling for different DNS record types
- **Access Policies**: Enable or disable recursion per view

### Common View Configurations

**LAN View (Private/Internal)**:
- Matches internal network IP ranges (10.0.0.0/8, 192.168.0.0/16, etc.)
- Recursion enabled for internal clients
- Provides both authoritative answers and internet DNS resolution
- Used by VPN clients and internal systems

**WAN View (Public/External)**:
- Matches all other traffic (typically internet-facing)
- Recursion disabled for security
- Provides only authoritative answers for hosted domains
- Protects against DNS amplification attacks

### View Processing Order

DNS views are processed in order, with the first matching view handling the request. This allows you to create specific rules for internal clients while having a catch-all rule for external traffic.

## DNS Zones: Managing Your Domains

### Zone Basics

A DNS zone represents a domain or subdomain for which your VergeOS system is authoritative. Each zone contains:

- **Domain Name**: The domain being served (e.g., company.com)
- **Name Server Records**: Identifies this server as authoritative for the domain  
- **Administrative Contact**: Email address for zone administration
- **Timing Parameters**: TTL values, refresh intervals, retry periods

### Name Server Configuration

When configuring zones, you'll specify name servers that are authoritative for the domain. You have two main approaches:

**External Name Servers**: Name servers outside your domain (recommended)
- Example: `ns1.dnsprovider.com` for domain `company.com`
- Avoids circular dependency issues
- Simpler for public DNS delegation

**In-Domain Name Servers**: Name servers within the domain being served
- Example: `ns1.company.com` for domain `company.com`  
- Requires "glue records" at your domain registrar
- Provides complete control but increases complexity

### Glue Records and Domain Delegation

When using in-domain name servers, you must configure glue records at your domain registrar. These A records tell the world the IP addresses of your name servers, breaking the circular dependency where someone needs to resolve `ns1.company.com` to find the authoritative server for `company.com`.

### Domain Name Formatting

VergeOS follows standard DNS conventions for domain names:

- **Fully Qualified Domain Names (FQDN)**: End with a period (e.g., `mail.company.com.`)
- **Relative Names**: Automatically appended with the zone name
- **Consistency**: Use FQDNs throughout to avoid confusion

## Record Management

### Record Types

VergeOS supports all standard DNS record types:

- **A Records**: IPv4 address mappings
- **AAAA Records**: IPv6 address mappings  
- **CNAME Records**: Canonical name aliases
- **MX Records**: Mail server priorities
- **TXT Records**: Text data for verification and policies
- **NS Records**: Name server delegations
- **SRV Records**: Service location records

### Record Ordering and Inheritance

Within zones, record order can affect resolution, particularly when using relative names or special characters. Best practices include:

- Use fully qualified domain names for clarity
- Place zone apex records (bare domain) first
- Maintain consistent formatting throughout the zone

## Zone Transfers and Redundancy

### Primary/Secondary Configuration

VergeOS supports standard DNS zone transfer mechanisms for redundancy:

**Primary Server Configuration**:
- Hosts the master copy of zone data
- Configured through VergeOS interface
- Sends notifications when zones change

**Secondary Server Configuration**:
- Receives zone data via transfer
- Can be another VergeOS instance or external DNS server
- Automatically updates when notified of changes

### Transfer Security

Zone transfers occur over TCP port 53 and should be restricted to authorized secondary servers. VergeOS allows you to specify which IP addresses can request zone transfers, preventing unauthorized access to your DNS data.

### Notification System

When records change on the primary server, VergeOS automatically sends notifications to configured secondary servers, ensuring rapid propagation of DNS updates across your infrastructure.

## Network Requirements

### Port Requirements

Authoritative DNS requires specific network access:

**UDP Port 53**: Standard DNS queries from clients worldwide  
**TCP Port 53**: Zone transfers and large DNS responses  

### Firewall Configuration  

For public-facing authoritative DNS:

- **Allow UDP 53** from anywhere for general DNS queries
- **Restrict TCP 53** to authorized secondary DNS servers only
- Consider rate limiting to prevent abuse

### Network Placement

Authoritative DNS is typically configured on external networks to provide public accessibility. However, you can run authoritative DNS on internal networks for private domains or split-horizon configurations.

## Security Considerations

### Query Restriction

By default, authoritative DNS in VergeOS:
- Provides authoritative answers to any client
- Disables recursion for external clients
- Allows recursion only for specified internal networks

### Access Control

DNS views provide granular access control:
- Internal clients get full DNS services (authoritative + recursive)
- External clients get authoritative answers only
- Prevents your DNS server from being used in amplification attacks

### Zone Transfer Security

Limit zone transfers to:
- Known secondary DNS servers
- Specific IP addresses or networks
- Authenticated transfer mechanisms where available

## Use Cases and Implementation Scenarios

### Corporate DNS Infrastructure

**Scenario**: Company managing internal domains and public web presence  
**Implementation**: 
- External network with authoritative DNS for public domains
- Internal view providing recursion for employees
- External view serving public DNS records only

### Service Provider DNS

**Scenario**: Hosting DNS services for multiple customer domains  
**Implementation**:
- Multiple zones for different customer domains
- Restricted zone transfers to customer-specified secondaries
- Monitoring and logging for service quality

### Split-Horizon DNS

**Scenario**: Different DNS answers for internal vs external clients  
**Implementation**:
- Internal view with internal IP addresses for services
- External view with public IP addresses for the same services
- Seamless experience for both client types

### Development and Testing

**Scenario**: Private domains for development environments  
**Implementation**:
- Internal network with authoritative DNS
- Development domains not exposed to internet
- Complete control over test domain resolution

## Integration with VergeOS Features

### Network Services Coordination

Authoritative DNS integrates seamlessly with other VergeOS network services:
- **DHCP Integration**: Automatic A record creation for DHCP clients when configured
- **Firewall Coordination**: DNS queries respect network firewall rules

### High Availability

DNS services benefit from VergeOS high availability features:
- **Node Failover**: DNS services automatically migrate during node failures
- **Cluster Coordination**: DNS configuration synchronized across cluster nodes
- **Backup Integration**: Zone data included in system backup procedures

### Monitoring and Logging

VergeOS provides comprehensive DNS monitoring:
- **Query Logging**: Track DNS requests and responses
- **Performance Metrics**: Monitor query response times and volumes
- **Error Tracking**: Identify and troubleshoot DNS issues

## Best Practices

### Planning Your DNS Architecture

1. **Separate Concerns**: Use dedicated networks for public vs private DNS services
2. **Plan for Redundancy**: Implement secondary DNS servers from day one  
3. **Security First**: Restrict recursion and zone transfers appropriately
4. **Monitor Performance**: Establish baseline metrics for DNS performance

### Zone Management

1. **Use FQDNs**: Always use fully qualified domain names in zone records
2. **Consistent Formatting**: Maintain consistent record formatting and organization
3. **Document Changes**: Keep records of DNS modifications and their purposes
4. **Test Thoroughly**: Verify DNS changes from both internal and external perspectives

### Network Configuration

1. **Firewall Rules**: Implement appropriate firewall rules for DNS traffic
2. **Rate Limiting**: Consider rate limiting for public-facing DNS services
3. **Monitoring**: Set up monitoring for DNS service availability and performance

## Troubleshooting Common Issues

### DNS Resolution Problems

**Symptom**: Clients cannot resolve domains  
**Check**: Network firewall rules, DNS view configuration, zone record accuracy

**Symptom**: Internal clients cannot reach internet sites  
**Check**: Recursion settings in DNS views, upstream DNS configuration

### Zone Transfer Issues

**Symptom**: Secondary servers not receiving updates  
**Check**: Notification configuration, TCP port 53 access, secondary server configuration

**Symptom**: Unauthorized zone transfer attempts  
**Check**: Transfer restrictions, firewall rules, monitoring logs

### Performance Issues

**Symptom**: Slow DNS responses  
**Check**: Network connectivity, cache configuration, query volume vs capacity

## Conclusion

VergeOS Authoritative DNS provides enterprise-grade domain name services with the flexibility and security features needed for modern network infrastructure. By understanding the relationship between networks, views, zones, and records, you can implement powerful DNS solutions that serve both internal and external clients while maintaining security and performance.

The integration with VergeOS networking features ensures that your DNS services benefit from the same high availability, monitoring, and management capabilities as the rest of your infrastructure, providing a comprehensive solution for domain name resolution needs.

Whether you're implementing corporate DNS infrastructure, providing DNS services to customers, or creating development environments, VergeOS Authoritative DNS offers the tools and flexibility to meet your requirements while maintaining the reliability and security standards your organization demands.
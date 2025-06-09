# Networking (VergeFabric)

*VergeFabric* provides integrated, software-defined networking (SDN) to your VergeOS environment, enabling the creation of logical networks independent of physical infrastructure. With VergeFabric, you can create and manage virtual networks on demand and deploy networks instantly, without complicated configurations or reliance on networking specialists.

## Getting Started

New to VergeOS networking? Start here:

1. **[Learn networking concepts](/product-guide/networks/network-overview)** - Understand VergeOS network fundamentals
2. **[Follow quick start tasks](/product-guide/networks/network-quickstart)** - Complete common networking configurations
3. **[Connect to existing infrastructure](/product-guide/networks/connect-lan-wan)** - Integrate with your current network

## Key Features

### Integrated SDN Functionality

* **Native to VergeOS** – No extra hardware or appliances required
* **Centralized Management** – Manage all networking components within a unified interface, alongside VergeOS hypervisor and storage controls
* **Embedded IP Administration** - DHCP, DNS, routing and firewall functionality built-in
* **Dynamic Routing** – BGP/OSPF support for advanced networking capabilities

### Advanced Security & Segmentation
* **Micro-segmentation** – Enforce security at the tenant level or down to individual VMs with dedicated internal networks
* **Distributed Firewall (DFW)** – Applies granular security rules inside the network, beyond traditional perimeter-based controls
* **Built-in Monitoring & Diagnostics** – Track and control network performance with rate limiting, logging, and integrated diagnostic tools

### Automation & Orchestration

* **API-First Networking** – Fully programmable networking via REST APIs and IaC tools like Terraform
* **Self-Service Networking** – Tenants and developers can deploy, modify, and manage virtual networks without IT intervention
* **Task Engine Integration** – Automate networking tasks based on scheduling or event triggers

### Multi-Cloud & VPN Support
* **Multi-cloud Design** – Securely connect multi-tenant environments and multiple sites
* **VPN Integration** – Site-to-Site and Client VPN access using WireGuard or IPsec

## Network Types & Use Cases

### External Networks
Connect VergeOS to existing LAN/WAN infrastructure for integration with physical networks.

**Common scenarios:**

- **Corporate LAN integration** - Connect to existing enterprise networks
- **Internet connectivity** - Provide external access for workloads
- **Multi-site connectivity** - Link distributed VergeOS installations

### Internal Networks
Create isolated virtual networks within VergeOS for workload segmentation and security.

**Common scenarios:**

- **Application tiers** - Separate web, application, and database layers
- **Development environments** - Isolated networks for dev/test workloads
- **Tenant isolation** - Dedicated networks for multi-tenant deployments

### VPN Networks
Establish secure tunnels for remote access and site-to-site connectivity.

**Common scenarios:**

- **Remote user access** - Secure connectivity for distributed workforce
- **Branch office connectivity** - Site-to-site VPN between locations
- **Partner access** - Controlled external access to specific resources

## Benefits by Use Case

### For Service Providers

- **Multi-tenant isolation** with complete network segmentation
- **Self-service capabilities** reducing operational overhead
- **Scalable architecture** supporting thousands of virtual networks
- **Advanced monitoring** for SLA compliance and billing

### For Enterprises

- **Simplified management** of complex network topologies
- **Enhanced security** through micro-segmentation
- **Rapid deployment** of new network segments
- **Integration capabilities** with existing infrastructure

### For Development Teams

- **On-demand networking** for dynamic environments
- **Consistent configurations** across dev/test/production
- **API-driven workflows** for infrastructure as code
- **Isolated environments** for safe testing

## Advanced Capabilities

### Traffic Management

- **Quality of Service (QoS)** controls for bandwidth prioritization
- **Rate limiting** to prevent resource contention
- **Load balancing** for high availability applications
- **Traffic shaping** for optimized performance

### Security Features

- **Network-level firewalls** with stateful packet inspection
- **Intrusion detection** capabilities
- **Network access control** with granular permissions
- **Audit logging** for compliance and troubleshooting

### Monitoring & Diagnostics

- **Real-time traffic analysis** with detailed metrics
- **Network topology visualization** for infrastructure mapping
- **Performance monitoring** with historical data
- **Built-in troubleshooting tools** for rapid issue resolution

## Integration & Compatibility

### Infrastructure Integration

- **Physical network compatibility** with existing switches and routers
- **VLAN support** for network segmentation
- **Bonding and redundancy** for high availability
- **Multi-path networking** for performance optimization

### Third-Party Integration

- **Monitoring system compatibility** for centralized management
- **Automation platform support** for workflow integration
- **Security tool integration** for comprehensive protection
- **Compliance reporting** for regulatory requirements

## Related Documentation

### Getting Started

- [Networking Overview](/product-guide/networks/network-overview)
- [Quick Start Guide](/product-guide/networks/network-quickstart)
- [Connect to Existing Networks](/product-guide/networks/connect-lan-wan)

### Network Configuration

- [Internal Networks](/product-guide/networks/internal-networks)
- [Network Rules & Firewall](/product-guide/networks/network-rules)
- [VPN Configuration](/product-guide/vpn/vpn-overview)
- [VLAN Configuration](/product-guide/networks/create-vlan)

### Monitoring & Management

- [Network Dashboards](/product-guide/networks/network-dashboards)
- [Network Diagnostics](/product-guide/networks/net-diagnostics)
- [Troubleshooting](/product-guide/networks/net-troubleshooting)

### Advanced Topics

- [Aliases & IP Management](/product-guide/networks/aliases)
- [Port Mirroring](/product-guide/networks/port-mirroring)
- [WireGuard VPN](/product-guide/vpn/wireguard-config)
- [IPSec Configuration](/product-guide/vpn/ipsec)

## Support & Professional Services

For assistance with complex networking requirements, contact [VergeOS Support](/support). Our team can help with:

- **Network architecture design** and planning
- **Migration strategies** from existing infrastructure
- **Performance optimization** and troubleshooting
- **Security implementation** and compliance requirements
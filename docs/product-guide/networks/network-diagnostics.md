# Network Diagnostics Guide

## Overview

The Network Diagnostics tool provides comprehensive network troubleshooting capabilities within VergeOS. These diagnostic commands allow system administrators to perform real-time network analysis, troubleshoot connectivity issues, and monitor network performance from within the VergeOS interface.

!!! info "What You'll Learn"
    - How to access and use network diagnostic tools
    - Understanding of each diagnostic command and its purpose
    - Best practices for network troubleshooting in VergeOS
    - When to use specific diagnostic commands

## Prerequisites

- Access to VergeOS interface
- Network administrator privileges
- Basic understanding of networking concepts

!!! note "Tenant Networks"
    Tenants have access to their own network diagnostics for tenant-specific networks. These tools operate within the tenant's network scope.

## Accessing Network Diagnostics

1. **Navigate to Network Diagnostics:**
   - Navigate to **Networks** > **List**
   - Select the desired **network** from the list
   - Click **Diagnostics** in the left menu

2. **Using Diagnostic Commands:**
   - Select desired command from the **Query** dropdown menu
   - Configure available parameters on the right side
   - Click **Send →** to execute the command

!!! tip "Command Visibility"
    Enable **"Show Command"** to view the exact command being executed, useful for SSH execution or script automation.

## Diagnostic Commands Reference

### ARP Scan

**Purpose:** Discovers active devices on the local network using ARP (Address Resolution Protocol) packets.

**When to Use:**

- Device discovery on network segments
- Verifying network connectivity
- Identifying unauthorized devices

**Parameters:**

- Target IP range (automatically populated based on network configuration)

**CLI Syntax:**

```bash
nmap -sn [IP_RANGE]
```

!!! warning "Network Impact"
    ARP scans can be disruptive to network performance. Use carefully in production environments.

---

### ARP Table

**Purpose:** Displays the current ARP cache showing IP-to-MAC address mappings.

**When to Use:**

- Troubleshooting connectivity issues
- Verifying device MAC addresses
- Checking for ARP conflicts

**CLI Syntax:**

```bash
arp -a
```

---

### DHCP Release/Renew

**Purpose:** Forces DHCP lease release and renewal for networks configured as DHCP clients.

**When to Use:**

- After network reconfiguration
- Resolving IP addressing issues
- Following power outages or network interruptions
- Edge installations requiring IP refresh

**CLI Syntax:**

```bash
dhclient -r && dhclient
```

!!! note "DHCP Client Networks Only"
    This command only applies to networks configured to receive IP addresses via DHCP.

---

### DNS Lookup

**Purpose:** Tests DNS resolution functionality and queries specific hostnames.

**When to Use:**

- Troubleshooting name resolution issues
- Verifying DNS server configuration
- Testing external connectivity

**Parameters:**

- **Hostname:** Target hostname to resolve
- **Query Type:** A, AAAA, MX, NS, PTR, etc.

**CLI Syntax:**

```bash
nslookup [HOSTNAME] [DNS_SERVER]
dig [HOSTNAME] [QUERY_TYPE]
```

---

### FRRouting BGP/OSPF

**Purpose:** Displays routing protocol information for networks using dynamic routing.

**When to Use:**

- Troubleshooting routing issues
- Verifying BGP/OSPF neighbor relationships
- Monitoring route advertisements

**CLI Syntax:**

```bash
vtysh -c "show ip bgp"
vtysh -c "show ip ospf neighbor"
```

!!! info "Advanced Routing"
    This command is primarily used in environments with complex routing requirements.

---

### IP

**Purpose:** Provides access to Linux IP command for advanced interface and routing troubleshooting.

**When to Use:**

- Advanced network interface diagnostics
- Routing table analysis
- Low-level network configuration verification

**Parameters:**

- **Command:** Various IP command options (route, addr, link, etc.)

**CLI Syntax:**

```bash
ip [COMMAND] [OPTIONS]
```

**Common Commands:**

- `ip route show` - Display routing table
- `ip addr show` - Show interface addresses
- `ip link show` - Display network interfaces

---

### IPsec

**Purpose:** Controls and monitors IPsec VPN connections and IKE daemon.

**When to Use:**

- Troubleshooting VPN connectivity
- Monitoring IPsec tunnel status
- Verifying encryption parameters

**CLI Syntax:**

```bash
ipsec [COMMAND]
```

---

### Logs

**Purpose:** Displays the network container's system logs.

**When to Use:**

- Troubleshooting network service issues
- Reviewing error messages
- Monitoring network events

**CLI Syntax:**

```bash
journalctl -u [SERVICE_NAME]
```

---

### NMAP (Network Mapper)

**Purpose:** Network discovery and security auditing tool for mapping network topology.

**When to Use:**

- Network reconnaissance
- Port scanning
- Service discovery
- Security assessments

**Parameters:**

- **Target:** IP address or range to scan
- **Options:** Various NMAP scanning options

**CLI Syntax:**

```bash
nmap [OPTIONS] [TARGET]
```

!!! warning "Security Considerations"
    Use NMAP responsibly and only on networks you own or have permission to scan.

---

### Ping

**Purpose:** Tests network connectivity using ICMP echo requests.

**When to Use:**

- Basic connectivity testing
- Measuring round-trip time
- Verifying network path availability

**Parameters:**

- **Destination:** Target IP address or hostname
- **Count:** Number of ping packets to send
- **Interval:** Time between packets

**CLI Syntax:**

```bash
ping -c [COUNT] [DESTINATION]
```

---

### Show Firewall Rules

**Purpose:** Displays low-level NFT format firewall rules.

**When to Use:**

- Advanced firewall troubleshooting
- Verifying rule translation
- Debugging complex firewall configurations

**CLI Syntax:**

```bash
nft list ruleset
```

!!! info "UI Alternative"
    Most firewall configuration can be viewed through the VergeOS Rules interface. This command is for advanced troubleshooting.

---

### TCP Connection Test

**Purpose:** Tests TCP connectivity to specific ports on remote hosts.

**When to Use:**

- Verifying service availability
- Testing firewall rules
- Troubleshooting application connectivity

**Parameters:**

- **Host:** Target hostname or IP address
- **Port:** TCP port number to test

**CLI Syntax:**

```bash
telnet [HOST] [PORT]
nc -zv [HOST] [PORT]
```

---

### TCP Dump

**Purpose:** Captures and analyzes network packet traffic.

**When to Use:**

- Deep packet inspection
- Protocol analysis
- Security incident investigation
- Performance troubleshooting

**Parameters:**

- **Interface:** Network interface to monitor
- **Filter:** Berkeley Packet Filter (BPF) expression
- **Count:** Number of packets to capture

**CLI Syntax:**

```bash
tcpdump -i [INTERFACE] [FILTER]
```

!!! danger "Performance Impact"
    Packet capture can impact network performance. Use judiciously in production environments.

---

### Top CPU Usage

**Purpose:** Displays processes consuming the most CPU resources on the network container.

**When to Use:**

- Performance troubleshooting
- Identifying resource-intensive processes
- System monitoring

**CLI Syntax:**

```bash
top -o %CPU
```

---

### Top Network Usage

**Purpose:** Shows processes with highest network utilization.

**When to Use:**

- Identifying bandwidth-heavy applications
- Network performance analysis
- Troubleshooting network saturation

**CLI Syntax:**

```bash
iftop
nethogs
```

---

### Trace Route

**Purpose:** Traces the network path packets take to reach a destination.

**When to Use:**

- Identifying routing issues
- Troubleshooting packet loss
- Network path analysis
- Latency troubleshooting

**Parameters:**

- **Destination:** Target IP address or hostname
- **Max Hops:** Maximum number of hops to trace

**CLI Syntax:**

```bash
traceroute [DESTINATION]
mtr [DESTINATION]
```

---

### Trace/Debug Firewall Rules

**Purpose:** Enables detailed logging and tracing of firewall rule processing.

**When to Use:**

- Debugging firewall rule behavior
- Troubleshooting packet filtering issues
- Security policy verification

**CLI Syntax:**

```bash
nft add rule [TABLE] [CHAIN] log prefix "DEBUG: "
```

!!! warning "Log Volume"
    Firewall debugging can generate large volumes of log data. Enable only when necessary and disable after troubleshooting.

---

### What's My IP

**Purpose:** Displays the network's external IP address as seen by internet services.

**When to Use:**

- Verifying NAT configuration
- Confirming external connectivity
- Troubleshooting external access issues

**CLI Syntax:**

```bash
curl ifconfig.me
curl ipinfo.io/ip
```

## Best Practices

### General Guidelines

- **Start Simple:** Begin with basic tools like ping and DNS lookup before using advanced diagnostics
- **Document Results:** Keep records of diagnostic outputs for comparison and analysis
- **Consider Impact:** Some diagnostic tools can affect network performance
- **Use Appropriate Scope:** Select the correct network context for your troubleshooting

### Troubleshooting Workflow

1. **Identify the Problem:** Clearly define what is not working
2. **Check Basic Connectivity:** Use ping to verify basic network connectivity
3. **Verify DNS Resolution:** Use DNS lookup to test name resolution
4. **Analyze Network Path:** Use traceroute to identify routing issues
5. **Deep Dive:** Use advanced tools like TCP dump for detailed analysis

### Security Considerations

- **Limit Access:** Ensure only authorized personnel have access to diagnostic tools
- **Monitor Usage:** Track usage of diagnostic commands for security auditing
- **Protect Captured Data:** Securely handle any packet captures or network dumps
- **Follow Policies:** Adhere to organizational security policies when using diagnostic tools

## Troubleshooting Common Issues

### Connectivity Problems

1. Start with **Ping** to test basic connectivity
2. Use **Traceroute** to identify where packets are being dropped
3. Check **ARP Table** for MAC address resolution issues

### DNS Issues

1. Use **DNS Lookup** to test name resolution
2. Try different DNS servers or query types
3. Check network's DNS configuration

### Performance Problems

1. Use **Top Network Usage** to identify bandwidth consumers
2. Employ **TCP Dump** for detailed traffic analysis
3. Check **Top CPU Usage** for resource constraints

### Firewall Issues

1. Review **Show Firewall Rules** for rule configuration
2. Use **Trace/Debug Firewall Rules** for detailed rule processing
3. Test specific connections with **TCP Connection Test**

## Next Steps

After mastering network diagnostics, consider exploring:

- Advanced firewall configuration and troubleshooting
- Network performance optimization techniques
- Integration with external monitoring tools
- Automated diagnostic scripting

For additional assistance with network troubleshooting, contact [VergeOS Support](/support) with your diagnostic results and specific issue details.

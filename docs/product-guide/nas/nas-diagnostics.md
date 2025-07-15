# NAS Diagnostics Guide

## Overview

The NAS (Network Attached Storage) Diagnostics tool provides comprehensive file sharing and network storage troubleshooting capabilities within VergeOS. These diagnostic commands enable system administrators to monitor NAS performance, troubleshoot file sharing issues, and maintain optimal NAS service health for SMB/CIFS, NFS, and other network storage protocols.

!!! info "What You'll Learn"
    - How to access and use NAS diagnostic tools
    - Understanding of each diagnostic command and its file sharing focus
    - Best practices for NAS troubleshooting and maintenance
    - When to use specific diagnostic commands for network storage issues

## Prerequisites

- Access to VergeOS interface with NAS service management privileges
- Basic understanding of network file sharing protocols (SMB/CIFS, NFS)
- Knowledge of VergeOS NAS service architecture

!!! note "NAS Service Context"
    NAS diagnostics are specific to individual NAS service instances. Each NAS service has its own diagnostic interface and commands.

## Accessing NAS Diagnostics

1. **Navigate to NAS Diagnostics:**
   - From the **Main Dashboard**, click **Services** in the left menu
   - Select the desired **NAS service** from the list
   - Click **Diagnostics** in the left menu

2. **Using Diagnostic Commands:**
   - Select desired command from the **Diagnostics Query** dropdown menu
   - Configure available parameters on the right side
   - Click **Send →** to execute the command

!!! tip "Command Visibility"
    Enable **"Show Command"** to view the exact command being executed, useful for SSH execution or script automation.

## Diagnostic Commands Reference

### ARP Scan

**Purpose:** Discovers active devices on the NAS service's network using ARP packets.

**When to Use:**
- Network connectivity troubleshooting
- Client discovery on NAS network segments
- Network topology verification

**Parameters:**
- **Interface:** Network interface to scan from (e.g., eth0)

**CLI Syntax:**
```bash
nmap -sn [NETWORK_RANGE]
```

---

### ARP Table

**Purpose:** Displays the NAS service's ARP cache showing IP-to-MAC address mappings.

**When to Use:**
- Client connectivity troubleshooting
- Network neighbor verification
- MAC address conflict resolution

**CLI Syntax:**
```bash
arp -a
```

---

### Date/Time

**Purpose:** Shows current system date and time configuration for the NAS service.

**When to Use:**
- Time synchronization troubleshooting
- Log timestamp verification
- Authentication issue diagnosis (Kerberos, domain joins)

**CLI Syntax:**
```bash
date
timedatectl status
```

---

### DNS Lookup

**Purpose:** Tests DNS resolution from the NAS service perspective.

**When to Use:**
- Domain name resolution troubleshooting
- Active Directory connectivity issues
- External service access verification

**Parameters:**
- **Hostname:** Target hostname to resolve
- **DNS Server:** Specific DNS server to query

**CLI Syntax:**
```bash
nslookup [HOSTNAME]
dig [HOSTNAME]
```

---

### Groups

**Purpose:** Displays system groups and group membership information.

**When to Use:**
- User access troubleshooting
- Permission issue diagnosis
- Group-based access control verification

**CLI Syntax:**
```bash
getent group
groups [USERNAME]
```

---

### IP

**Purpose:** Advanced IP command access for network interface and routing diagnostics.

**When to Use:**
- Network configuration verification
- Routing table analysis
- Interface troubleshooting

**Parameters:**
- **Command:** IP command options (addr, route, link, etc.)

**CLI Syntax:**
```bash
ip [COMMAND] [OPTIONS]
```

**Common Commands:**
- `ip addr show` - Display interface addresses
- `ip route show` - Show routing table
- `ip link show` - Display network interfaces

---

### Logs

**Purpose:** Displays NAS service system logs and events.

**When to Use:**
- Service troubleshooting
- Error analysis
- Performance issue investigation
- Security event monitoring

**CLI Syntax:**
```bash
journalctl -u [NAS_SERVICE]
tail -f /var/log/samba/log.*
```

---

### NFS

**Purpose:** Shows Network File System (NFS) service status and configuration.

**When to Use:**
- NFS service troubleshooting
- Export configuration verification
- Client mount issue diagnosis

**CLI Syntax:**
```bash
exportfs -v
rpcinfo -p
showmount -e
```

---

### NTP Query

**Purpose:** Queries Network Time Protocol (NTP) servers and synchronization status.

**When to Use:**
- Time synchronization troubleshooting
- NTP server connectivity testing
- Clock drift analysis

**Parameters:**
- **NTP Server:** Target NTP server to query

**CLI Syntax:**
```bash
ntpq -p
chrony sources
```

---

### Ping

**Purpose:** Tests network connectivity from the NAS service.

**When to Use:**
- Basic connectivity testing
- Network latency measurement
- Client reachability verification

**Parameters:**
- **Destination:** Target IP address or hostname
- **Count:** Number of ping packets

**CLI Syntax:**
```bash
ping -c [COUNT] [DESTINATION]
```

---

### Samba

**Purpose:** Displays Samba/SMB service status, configuration, and active connections.

**When to Use:**
- SMB/CIFS service troubleshooting
- Share access issues
- Client connection analysis
- Performance optimization

**CLI Syntax:**
```bash
smbstatus
testparm
smbclient -L localhost
```

---

### Services

**Purpose:** Shows status of all services running on the NAS system.

**When to Use:**
- Service availability verification
- Dependency troubleshooting
- Performance analysis
- Service startup issues

**CLI Syntax:**
```bash
systemctl list-units --type=service
service --status-all
```

---

### TCP Connection Test

**Purpose:** Tests TCP connectivity to specific ports on remote hosts.

**When to Use:**
- Service port accessibility testing
- Firewall rule verification
- Client-server communication troubleshooting

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

**Purpose:** Captures and analyzes network packet traffic for the NAS service.

**When to Use:**
- Deep packet inspection
- Protocol troubleshooting
- Security analysis
- Performance diagnostics

**Parameters:**
- **Interface:** Network interface to monitor
- **Filter:** Berkeley Packet Filter expression

**CLI Syntax:**
```bash
tcpdump -i [INTERFACE] [FILTER]
```

!!! warning "Performance Impact"
    Packet capture can impact NAS performance. Use judiciously in production environments.

---

### Top CPU Usage

**Purpose:** Shows processes consuming the most CPU resources on the NAS service.

**When to Use:**
- Performance troubleshooting
- Resource utilization analysis
- Process optimization

**CLI Syntax:**
```bash
top -o %CPU
htop
```

---

### Top Network Usage

**Purpose:** Displays processes with highest network utilization.

**When to Use:**
- Network performance analysis
- Bandwidth utilization troubleshooting
- Connection monitoring

**CLI Syntax:**
```bash
iftop
nethogs
ss -tuln
```

---

### Trace Route

**Purpose:** Traces network path from the NAS service to a destination.

**When to Use:**
- Network routing troubleshooting
- Path analysis
- Connectivity issue diagnosis

**Parameters:**
- **Destination:** Target IP address or hostname

**CLI Syntax:**
```bash
traceroute [DESTINATION]
mtr [DESTINATION]
```

---

### Users

**Purpose:** Displays system users and user account information.

**When to Use:**
- User access troubleshooting
- Account verification
- Permission issue diagnosis

**CLI Syntax:**
```bash
getent passwd
who
w
```

---

### What's My IP

**Purpose:** Shows the NAS service's external IP address.

**When to Use:**
- External connectivity verification
- NAT configuration troubleshooting
- Network configuration validation

**CLI Syntax:**
```bash
curl ifconfig.me
curl ipinfo.io/ip
```

---

### Winbind

**Purpose:** Displays Winbind service status for Active Directory integration.

**When to Use:**
- Active Directory integration troubleshooting
- Domain authentication issues
- User/group resolution problems

**CLI Syntax:**
```bash
wbinfo -t
wbinfo -u
wbinfo -g
```

## Best Practices

### NAS Health Monitoring Workflow

1. **Service Status:** Check Services and specific protocol status (Samba/NFS)
2. **Network Connectivity:** Verify basic connectivity with Ping and network configuration
3. **Authentication:** Test Users, Groups, and Winbind (if applicable)
4. **Performance:** Monitor Top CPU Usage and Top Network Usage
5. **Logs:** Review service logs for errors or warnings

### File Sharing Troubleshooting

- **SMB/CIFS Issues:** Use Samba diagnostics to check shares and connections
- **NFS Problems:** Verify NFS service status and export configurations
- **Permission Issues:** Check Users and Groups for proper access rights
- **Authentication:** Test Winbind for domain-joined environments

### Performance Optimization

- **Resource Monitoring:** Regularly check CPU and network usage patterns
- **Connection Analysis:** Monitor active connections and client loads
- **Network Tuning:** Use network diagnostics to optimize performance
- **Time Synchronization:** Ensure proper NTP configuration for authentication

## Troubleshooting Common NAS Issues

### Connectivity Problems
1. Start with **Ping** to test basic network connectivity
2. Use **ARP Table** and **ARP Scan** for network discovery issues
3. Check **IP** configuration for interface problems
4. Use **Trace Route** for routing issues

### File Sharing Issues
1. Check **Samba** status for SMB/CIFS problems
2. Verify **NFS** service for NFS-related issues
3. Review **Services** for service availability
4. Test specific ports with **TCP Connection Test**

### Authentication Problems
1. Verify **Users** and **Groups** configuration
2. Test **Winbind** for Active Directory integration
3. Check **DNS Lookup** for domain name resolution
4. Verify **Date/Time** for Kerberos authentication

### Performance Issues
1. Monitor **Top CPU Usage** for resource constraints
2. Check **Top Network Usage** for bandwidth utilization
3. Use **TCP Dump** for detailed traffic analysis
4. Review **Logs** for performance-related errors

## Advanced Diagnostics

### Protocol Analysis
- Use **TCP Dump** with specific filters for SMB or NFS traffic
- Monitor **Samba** connections for SMB-specific issues
- Check **NFS** exports and mount status

### Security Monitoring
- Review **Logs** for security events and failed access attempts
- Monitor **Users** and **Groups** for unauthorized changes
- Use **TCP Dump** for security analysis when needed

### Network Optimization
- Analyze **Top Network Usage** patterns for optimization
- Use **IP** commands for advanced network tuning
- Monitor **ARP Table** for network efficiency

## Integration Considerations

### Active Directory Integration
- Use **Winbind** diagnostics for domain troubleshooting
- Verify **DNS Lookup** for proper domain resolution
- Check **Date/Time** synchronization with domain controllers

### Multi-Protocol Support
- Balance **Samba** and **NFS** service performance
- Monitor protocol-specific usage patterns
- Optimize network configuration for multiple protocols

## Next Steps

After mastering NAS diagnostics, consider exploring:

- Advanced file sharing protocol optimization
- Integration with external authentication systems
- Automated monitoring and alerting for NAS services
- Performance tuning for high-availability environments

For complex NAS issues or performance optimization guidance, contact [VergeOS Support](/support) with detailed diagnostic output and service configuration information.

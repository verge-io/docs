# Node Diagnostics Guide

## Overview

The Node Diagnostics tool provides comprehensive hardware and system-level troubleshooting capabilities for individual VergeOS nodes. These diagnostic commands enable system administrators to perform detailed hardware analysis, monitor system performance, and troubleshoot node-specific issues directly from the VergeOS interface.

!!! info "What You'll Learn"
    - How to access and use node diagnostic tools
    - Understanding of each diagnostic command and its hardware focus
    - Best practices for node-level troubleshooting
    - When to use specific diagnostic commands for hardware issues

## Prerequisites

- Access to VergeOS interface with node management privileges
- Basic understanding of server hardware components
- Knowledge of networking and storage concepts

!!! note "Node Access"
    Node diagnostics provide deep hardware-level access and should be used by experienced system administrators.

## Accessing Node Diagnostics

1. **Navigate to Node Diagnostics:**
   - From the **Main Dashboard**, click **Nodes** in the left menu
   - Select the desired **node** from the list
   - Click **Diagnostics** in the left menu

2. **Using Diagnostic Commands:**
   - Select desired command from the **Query** dropdown menu
   - Configure available parameters on the right side
   - Click **Send →** to execute the command

!!! tip "Command Visibility"
    Enable **"Show Command"** to view the exact command being executed, useful for SSH execution or script automation.

## Diagnostic Commands Reference

### ARP Scan

**Purpose:** Discovers active devices on the node's network interfaces using ARP packets.

**When to Use:**

- Network connectivity verification from node perspective
- Identifying devices on node's local network segments
- Troubleshooting node network configuration

**Parameters:**

- **Interface:** Network interface to scan from

**CLI Syntax:**

```bash
nmap -sn [NETWORK_RANGE]
```

---

### ARP Table

**Purpose:** Displays the node's ARP cache showing IP-to-MAC address mappings.

**When to Use:**

- Troubleshooting node network connectivity
- Verifying network neighbor discovery
- Checking for ARP conflicts affecting the node

**CLI Syntax:**

```bash
arp -a
```

---

### Bridge Addresses

**Purpose:** Shows MAC address tables for network bridges on the node.

**When to Use:**

- Troubleshooting network bridge configuration
- Verifying MAC learning on virtual switches
- Network topology analysis

**CLI Syntax:**

```bash
brctl showmacs [BRIDGE_NAME]
```

---

### Clear Persistent Storage

**Purpose:** Clears persistent storage caches and temporary data on the node.

**When to Use:**

- Resolving storage-related performance issues
- Clearing corrupted cache data
- Preparing for storage reconfiguration

!!! danger "Data Impact Warning"
    This command may affect system performance and should only be used under support guidance.

**CLI Syntax:**

```bash
sync && echo 3 > /proc/sys/vm/drop_caches
```

---

### DMI Table

**Purpose:** Displays Desktop Management Interface (DMI) information including hardware details.

**When to Use:**

- Hardware inventory and identification
- Verifying system specifications
- Troubleshooting hardware compatibility

**CLI Syntax:**

```bash
dmidecode
```

---

### DNS Lookup

**Purpose:** Tests DNS resolution from the node's perspective.

**When to Use:**

- Troubleshooting node DNS configuration
- Verifying external connectivity from node
- Testing name resolution services

**Parameters:**

- **Hostname:** Target hostname to resolve
- **DNS Server:** Specific DNS server to query

**CLI Syntax:**

```bash
nslookup [HOSTNAME]
dig [HOSTNAME]
```

---

### Ethernet Tool

**Purpose:** Provides detailed ethernet interface information and configuration.

**When to Use:**

- Diagnosing network interface issues
- Checking link speed and duplex settings
- Troubleshooting physical network connectivity

**Parameters:**

- **Interface:** Network interface to examine

**CLI Syntax:**

```bash
ethtool [INTERFACE]
```

---

### Fabric Configuration

**Purpose:** Displays VergeOS fabric network configuration for the node.

**When to Use:**

- Troubleshooting inter-node communication
- Verifying fabric network setup
- Diagnosing cluster connectivity issues

**CLI Syntax:**

```bash
verge fabric show
```

---

### IP

**Purpose:** Advanced IP command access for interface and routing diagnostics.

**When to Use:**

- Detailed network interface analysis
- Routing table examination
- Advanced network troubleshooting

**Parameters:**

- **Command:** IP command options (route, addr, link, etc.)

**CLI Syntax:**

```bash
ip [COMMAND] [OPTIONS]
```

---

### IPMI BMC Info

**Purpose:** Displays Baseboard Management Controller information.

**When to Use:**

- Hardware management troubleshooting
- Verifying IPMI configuration
- Remote management diagnostics

**CLI Syntax:**

```bash
ipmitool bmc info
```

---

### IPMI Chassis Status

**Purpose:** Shows physical chassis status and power information.

**When to Use:**

- Power management troubleshooting
- Hardware status verification
- Physical system diagnostics

**CLI Syntax:**

```bash
ipmitool chassis status
```

---

### IPMI FRU Info

**Purpose:** Displays Field Replaceable Unit information from IPMI.

**When to Use:**

- Hardware inventory management
- Component identification
- Warranty and support information

**CLI Syntax:**

```bash
ipmitool fru print
```

---

### IPMI LAN Info

**Purpose:** Shows IPMI network configuration details.

**When to Use:**

- IPMI network troubleshooting
- Remote management connectivity issues
- BMC network configuration verification

**CLI Syntax:**

```bash
ipmitool lan print
```

---

### IPMI MC Reset

**Purpose:** Resets the Management Controller (BMC).

**When to Use:**

- Resolving IPMI communication issues
- BMC troubleshooting
- Management interface recovery

!!! warning "Management Impact"
    This will temporarily disrupt IPMI/BMC functionality during reset.

**CLI Syntax:**

```bash
ipmitool mc reset cold
```

---

### IPMI Sensor Data Repository

**Purpose:** Displays comprehensive sensor data repository information.

**When to Use:**

- Detailed hardware monitoring
- Sensor configuration verification
- Hardware diagnostics and analysis

**CLI Syntax:**

```bash
ipmitool sdr list
```

---

### IPMI Sensors

**Purpose:** Shows current sensor readings (temperature, voltage, fans, etc.).

**When to Use:**

- Hardware health monitoring
- Temperature and power diagnostics
- Environmental troubleshooting

**CLI Syntax:**

```bash
ipmitool sensor list
```

---

### IPMI System Event Logs

**Purpose:** Displays system event logs from IPMI.

**When to Use:**

- Hardware error analysis
- System event troubleshooting
- Historical hardware issue investigation

**CLI Syntax:**

```bash
ipmitool sel list
```

---

### LED Control (Drive)

**Purpose:** Controls LED indicators on storage drives for physical identification.

**When to Use:**

- Physical drive identification
- Drive replacement procedures
- Hardware maintenance tasks

**Parameters:**

- **Drive:** Target drive identifier
- **Action:** LED on/off/blink

**CLI Syntax:**

```bash
ledctl locate=[DRIVE_PATH]
```

---

### Logs

**Purpose:** Displays node system logs and journal entries.

**When to Use:**

- System troubleshooting
- Error analysis
- Performance issue investigation

**CLI Syntax:**

```bash
journalctl -n 100
dmesg
```

---

### Network Bonding

**Purpose:** Shows network bonding configuration and status.

**When to Use:**

- Network redundancy troubleshooting
- Bond interface diagnostics
- Link aggregation verification

**CLI Syntax:**

```bash
cat /proc/net/bonding/[BOND_NAME]
```

---

### OpenSSL Speed

**Purpose:** Tests cryptographic performance of the node's CPU.

**When to Use:**

- Performance benchmarking
- Cryptographic capability testing
- Hardware acceleration verification

**CLI Syntax:**

```bash
openssl speed
```

---

### Ping

**Purpose:** Tests network connectivity from the node.

**When to Use:**

- Basic connectivity testing
- Network path verification
- Latency measurement

**Parameters:**

- **Destination:** Target IP or hostname
- **Count:** Number of ping packets

**CLI Syntax:**

```bash
ping -c [COUNT] [DESTINATION]
```

---

### RAS Query

**Purpose:** Queries Reliability, Availability, and Serviceability information.

**When to Use:**

- Hardware reliability assessment
- Error correction status
- Memory and processor diagnostics

**CLI Syntax:**

```bash
ras-mc-ctl --summary
```

---

### S.M.A.R.T. Diagnostic Test

**Purpose:** Initiates SMART diagnostic tests on storage drives.

**When to Use:**

- Proactive drive health testing
- Storage troubleshooting
- Preventive maintenance

**Parameters:**

- **Drive:** Target drive for testing
- **Test Type:** Short, long, or conveyance test

**CLI Syntax:**

```bash
smartctl -t [TEST_TYPE] [DRIVE_PATH]
```

!!! info "Test Duration"
    SMART tests can take significant time to complete, especially long tests.

---

### S.M.A.R.T. Information

**Purpose:** Displays SMART attributes and health information for drives.

**When to Use:**

- Drive health assessment
- Predictive failure analysis
- Storage performance monitoring

**Parameters:**

- **Drive:** Target drive identifier

**CLI Syntax:**

```bash
smartctl -a [DRIVE_PATH]
```

---

### Show Block Devices

**Purpose:** Lists all block devices visible to the node.

**When to Use:**

- Storage device inventory
- Drive recognition troubleshooting
- Storage configuration verification

**CLI Syntax:**
```bash
lsblk
fdisk -l
```

---

### TCP Connection Test

**Purpose:** Tests TCP connectivity to remote hosts and ports.

**When to Use:**

- Service connectivity verification
- Firewall rule testing
- Network troubleshooting

**Parameters:**

- **Host:** Target hostname or IP
- **Port:** TCP port number

**CLI Syntax:**
```bash
telnet [HOST] [PORT]
nc -zv [HOST] [PORT]
```

---

### TCP Dump

**Purpose:** Captures network packets for detailed traffic analysis.

**When to Use:**

- Network troubleshooting
- Security analysis
- Protocol debugging

**Parameters:**

- **Interface:** Network interface to monitor
- **Filter:** Packet filter expression

**CLI Syntax:**

```bash
tcpdump -i [INTERFACE] [FILTER]
```

!!! warning "Performance Impact"
    Packet capture can affect node performance. Use carefully in production.

---

### Top CPU Usage

**Purpose:** Shows processes consuming the most CPU resources.

**When to Use:**

- Performance troubleshooting
- Resource utilization analysis
- Process monitoring

**CLI Syntax:**

```bash
top -o %CPU
```

---

### Top Network Usage

**Purpose:** Displays processes with highest network utilization.

**When to Use:**

- Network performance analysis
- Bandwidth utilization troubleshooting
- Network-intensive process identification

**CLI Syntax:**

```bash
iftop
nethogs
```

---

### Trace Route

**Purpose:** Traces network path from the node to a destination.

**When to Use:**

- Network routing troubleshooting
- Path analysis
- Connectivity issue diagnosis

**Parameters:**

- **Destination:** Target IP or hostname

**CLI Syntax:**

```bash
traceroute [DESTINATION]
mtr [DESTINATION]
```

---

### What's My IP

**Purpose:** Shows the node's external IP address.

**When to Use:**

- External connectivity verification
- NAT configuration troubleshooting
- Network configuration validation

**CLI Syntax:**

```bash
curl ifconfig.me
```

## Best Practices

### Hardware Diagnostics Workflow

1. **System Overview:** Start with DMI Table and IPMI Chassis Status
2. **Health Check:** Review IPMI Sensors and System Event Logs
3. **Storage Analysis:** Use S.M.A.R.T. Information and tests
4. **Network Verification:** Check network bonding and interface status
5. **Performance Assessment:** Monitor CPU and network usage

### Preventive Maintenance

- **Regular Health Checks:** Monitor IPMI sensors and SMART data
- **Log Review:** Regularly check system event logs
- **Performance Monitoring:** Track CPU and network utilization trends
- **Drive Health:** Schedule periodic SMART diagnostic tests

### Safety Considerations

- **Impact Assessment:** Consider the impact of diagnostic commands on production systems
- **Support Coordination:** Involve VergeOS support for complex hardware issues
- **Documentation:** Keep records of diagnostic results for trend analysis
- **Change Control:** Follow change management procedures for hardware modifications

## Troubleshooting Common Node Issues

### Hardware Problems

1. Check **IPMI Sensors** for temperature, voltage, and fan issues
2. Review **IPMI System Event Logs** for hardware errors
3. Use **S.M.A.R.T. Information** to assess drive health

### Network Issues

1. Verify **Network Bonding** status and configuration
2. Use **Ethernet Tool** to check interface settings
3. Test connectivity with **Ping** and **Trace Route**

### Performance Issues

1. Monitor **Top CPU Usage** for resource constraints
2. Check **Top Network Usage** for bandwidth utilization
3. Review **Logs** for performance-related errors

### Storage Issues

1. Use **Show Block Devices** to verify drive recognition
2. Run **S.M.A.R.T. Diagnostic Tests** for comprehensive drive testing
3. Check **RAS Query** for memory and storage error information

## Next Steps

After mastering node diagnostics, consider exploring:

- Advanced hardware monitoring and alerting
- Automated diagnostic scripting
- Integration with external monitoring systems
- Preventive maintenance scheduling

For complex hardware issues or unusual diagnostic results, contact [VergeOS Support](/support) with detailed diagnostic output and system information.

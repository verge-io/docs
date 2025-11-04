# vSAN Diagnostics Guide

## Overview

The vSAN Diagnostics tool provides comprehensive storage system analysis and troubleshooting capabilities for VergeOS virtual Storage Area Networks. These diagnostic commands enable system administrators to monitor storage performance, troubleshoot storage issues, and maintain optimal vSAN health across the entire cluster.

!!! info "What You'll Learn"
    - How to access and use vSAN diagnostic tools
    - Understanding of each diagnostic command and its storage focus
    - Best practices for vSAN troubleshooting and maintenance
    - When to use specific diagnostic commands for storage issues

## Prerequisites

- Access to VergeOS interface with vSAN management privileges
- Basic understanding of distributed storage concepts
- Knowledge of VergeOS vSAN architecture

!!! note "vSAN Access"
    vSAN diagnostics are only available at the root/parent level. Tenants do not have access to vSAN diagnostic tools.

## Accessing vSAN Diagnostics

1. **Navigate to vSAN Diagnostics:**
   - Select **System** → **vSAN Diagnostics** from the top menu.
   - Or alternatively: From the Main Dashboard, click the **vSAN Tiers** count box → **vSAN Diagnostics** from the left menu.

2. **Using Diagnostic Commands:**
   - Select desired command from the **Query** dropdown menu
   - Configure available parameters on the right side
   - Click **Send →** to execute the command

!!! tip "Command Visibility"
    Enable **"Show Command"** to view the exact command being executed, useful for SSH execution or script automation.

## Diagnostic Commands Reference

### Find Inode

**Purpose:** Locates specific inodes within the vSAN file system for detailed analysis.

**When to Use:**
- Troubleshooting file system corruption
- Locating specific data blocks
- Advanced storage troubleshooting

**Parameters:**
- **Inode Number:** Specific inode identifier to locate

**CLI Syntax:**
```bash
vcmd find --inode=[INODE_NUMBER]
```

---

### Get Cache Info

**Purpose:** Displays comprehensive caching system information and statistics.

**When to Use:**
- Performance optimization
- Cache hit/miss ratio analysis
- Memory usage assessment
- Storage performance troubleshooting

**CLI Syntax:**
```bash
vcmd cache info
```

---

### Get Clients

**Purpose:** Shows active vSAN clients and their connection details.

**When to Use:**
- Connection troubleshooting
- Client performance analysis
- Network connectivity verification
- Load distribution assessment

**CLI Syntax:**
```bash
vcmd clients list
```

---

### Get Cluster Rates

**Purpose:** Displays cluster-wide performance metrics and throughput rates.

**When to Use:**
- Cluster performance monitoring
- Throughput analysis
- Performance baseline establishment
- Capacity planning

**CLI Syntax:**
```bash
vcmd cluster rates
```

---

### Get Cluster Usage

**Purpose:** Shows comprehensive cluster storage utilization statistics.

**When to Use:**
- Capacity planning
- Storage utilization monitoring
- Space allocation analysis
- Growth trend assessment

**CLI Syntax:**
```bash
vcmd cluster usage
```

---

### Get Current Master

**Purpose:** Identifies the current vSAN master node in the cluster.

**When to Use:**
- Cluster leadership troubleshooting
- Master failover analysis
- Cluster coordination issues
- Performance optimization

**CLI Syntax:**
```bash
vcmd master current
```

---

### Get Device List

**Purpose:** Lists all storage devices participating in the vSAN.

**When to Use:**
- Device inventory management
- Storage configuration verification
- Device status monitoring
- Capacity assessment

**CLI Syntax:**
```bash
vcmd devices list
```

---

### Get Device Status

**Purpose:** Displays detailed status information for vSAN storage devices.

**When to Use:**
- Device health monitoring
- Failure detection
- Performance analysis
- Maintenance planning

**Parameters:**
- **Device ID:** Specific device to query

**CLI Syntax:**
```bash
vcmd device status [DEVICE_ID]
```

---

### Get Device Usage

**Purpose:** Shows usage statistics for individual storage devices.

**When to Use:**
- Device utilization monitoring
- Load balancing analysis
- Performance optimization
- Wear leveling assessment

**Parameters:**
- **Device ID:** Target device for analysis

**CLI Syntax:**
```bash
vcmd device usage [DEVICE_ID]
```

---

### Get File Status

**Purpose:** Retrieves detailed status information for specific files in vSAN.

**When to Use:**
- File integrity verification
- Replication status checking
- Data location tracking
- Corruption investigation

**Parameters:**
- **File Path:** Target file for analysis

**CLI Syntax:**
```bash
vcmd file status [FILE_PATH]
```

---

### Get Fuse Info

**Purpose:** Displays FUSE (Filesystem in Userspace) mount and operation information.

**When to Use:**
- File system mount troubleshooting
- FUSE performance analysis
- Mount point verification
- Access issue diagnosis

**CLI Syntax:**
```bash
vcmd fuse info
```

---

### Get Integ Check Status

**Purpose:** Shows the status of ongoing or completed integrity check operations.

**When to Use:**
- Data integrity monitoring
- Verification process tracking
- Corruption detection
- Maintenance status checking

**CLI Syntax:**
```bash
vcmd integcheck status
```

---

### Get Journal Status

**Purpose:** Displays vSAN journal status and operation information.

**When to Use:**
- Write performance troubleshooting
- Journal space monitoring
- Transaction logging analysis
- Performance optimization

**CLI Syntax:**
```bash
vcmd journal status
```

---

### Get Node Device List

**Purpose:** Lists storage devices for specific nodes in the cluster.

**When to Use:**
- Node-specific device inventory
- Per-node capacity planning
- Device distribution analysis
- Node maintenance preparation

**Parameters:**
- **Node ID:** Target node for device listing

**CLI Syntax:**
```bash
vcmd node devices [NODE_ID]
```

---

### Get Node Info

**Purpose:** Displays comprehensive information about specific vSAN nodes.

**When to Use:**
- Node health assessment
- Configuration verification
- Performance analysis
- Troubleshooting node issues

**Parameters:**
- **Node ID:** Target node identifier

**CLI Syntax:**
```bash
vcmd node info [NODE_ID]
```

---

### Get Node List

**Purpose:** Lists all nodes participating in the vSAN cluster.

**When to Use:**
- Cluster membership verification
- Node inventory management
- Cluster topology analysis
- Health status overview

**CLI Syntax:**
```bash
vcmd nodes list
```

---

### Get Path from Inode

**Purpose:** Resolves file system paths from inode numbers.

**When to Use:**
- File system navigation
- Inode-to-path mapping
- Corruption analysis
- Advanced troubleshooting

**Parameters:**
- **Inode Number:** Source inode for path resolution

**CLI Syntax:**
```bash
vcmd path from-inode [INODE_NUMBER]
```

---

### Get Read Ahead

**Purpose:** Shows read-ahead caching configuration and statistics.

**When to Use:**
- Read performance optimization
- Cache tuning
- Sequential access analysis
- Performance troubleshooting

**CLI Syntax:**
```bash
vcmd readahead status
```

---

### Get Repair Status

**Purpose:** Displays status of ongoing repair operations and data reconstruction.

**When to Use:**
- Data repair monitoring
- Recovery process tracking
- Failure recovery assessment
- Maintenance status checking

**CLI Syntax:**
```bash
vcmd repair status
```

---

### Get Running Conf

**Purpose:** Shows the current running configuration of the vSAN system.

**When to Use:**
- Configuration verification
- Troubleshooting configuration issues
- Backup configuration reference
- Change management

**CLI Syntax:**
```bash
vcmd config show
```

---

### Get Sync List

**Purpose:** Lists synchronization operations and their status.

**When to Use:**
- Data synchronization monitoring
- Replication status tracking
- Consistency verification
- Performance analysis

**CLI Syntax:**
```bash
vcmd sync list
```

---

### Get Tier Device Maps

**Purpose:** Shows device mapping across different storage tiers.

**When to Use:**
- Tier configuration verification
- Device placement analysis
- Performance optimization
- Capacity planning

**CLI Syntax:**
```bash
vcmd tier device-maps
```

---

### Get Tier Node Maps

**Purpose:** Displays how storage tiers are distributed across cluster nodes.

**When to Use:**
- Tier distribution analysis
- Load balancing verification
- Performance optimization
- Capacity planning

**CLI Syntax:**
```bash
vcmd tier node-maps
```

---

### Get Tier Status

**Purpose:** Shows comprehensive status information for storage tiers.

**When to Use:**
- Tier health monitoring
- Performance analysis
- Capacity utilization tracking
- Tier optimization

**CLI Syntax:**
```bash
vcmd tier status
```

---

### Get Top Usage Rates

**Purpose:** Identifies top consumers of storage resources and performance.

**When to Use:**
- Performance bottleneck identification
- Resource utilization analysis
- Capacity planning
- Usage optimization

**CLI Syntax:**
```bash
vcmd usage top-rates
```

---

### Get Usage

**Purpose:** Displays comprehensive vSAN usage statistics and metrics.

**When to Use:**
- Overall system utilization monitoring
- Capacity planning
- Performance baseline establishment
- Resource allocation analysis

**CLI Syntax:**
```bash
vcmd usage show
```

---

### Get Volume Usage

**Purpose:** Shows usage statistics for individual volumes within vSAN.

**When to Use:**
- Volume-specific capacity monitoring
- Performance analysis
- Space allocation verification
- Growth tracking

**Parameters:**
- **Volume ID:** Target volume for analysis

**CLI Syntax:**
```bash
vcmd volume usage [VOLUME_ID]
```

---

### Integ Check

**Purpose:** Initiates comprehensive data integrity checking across the vSAN.

**When to Use:**
- Scheduled maintenance
- Data corruption investigation
- Preventive health checks
- Post-failure verification

!!! warning "Performance Impact"
    Integrity checks can significantly impact system performance and should be scheduled during maintenance windows.

**CLI Syntax:**
```bash
vcmd integcheck start
```

---

### Integ Check Device

**Purpose:** Performs integrity checking on specific storage devices.

**When to Use:**
- Device-specific integrity verification
- Targeted troubleshooting
- Post-repair verification
- Selective maintenance

**Parameters:**
- **Device ID:** Target device for integrity check

**CLI Syntax:**
```bash
vcmd integcheck device [DEVICE_ID]
```

---

### Summarize Disk Usage

**Purpose:** Provides comprehensive disk usage summary across the entire vSAN.

**When to Use:**
- Capacity reporting
- Usage trend analysis
- Storage optimization planning
- Executive reporting

**CLI Syntax:**
```bash
vcmd usage summarize
```

## Best Practices

### vSAN Health Monitoring Workflow

1. **System Overview:** Start with Get Cluster Usage and Get Cluster Rates
2. **Performance Analysis:** Review Get Top Usage Rates and device-specific metrics
3. **Health Assessment:** Check Get Repair Status and Get Integ Check Status
4. **Capacity Planning:** Use Summarize Disk Usage and tier information
5. **Troubleshooting:** Employ device-specific and node-specific commands as needed

### Preventive Maintenance

- **Regular Health Checks:** Monitor cluster usage, repair status, and device health
- **Performance Monitoring:** Track cluster rates and top usage patterns
- **Integrity Verification:** Schedule periodic integrity checks during maintenance windows
- **Capacity Planning:** Regularly review usage trends and growth patterns

### Performance Optimization

- **Cache Analysis:** Monitor cache info and hit ratios for optimization opportunities
- **Tier Management:** Review tier device maps and node maps for balanced distribution
- **Load Balancing:** Use client and usage information to optimize workload distribution
- **Read Optimization:** Tune read-ahead settings based on access patterns

## Troubleshooting Common vSAN Issues

### Performance Problems
1. Check **Get Cluster Rates** and **Get Top Usage Rates** for bottlenecks
2. Review **Get Cache Info** for cache efficiency
3. Analyze **Get Device Usage** for individual device performance

### Capacity Issues
1. Use **Get Cluster Usage** and **Summarize Disk Usage** for space analysis
2. Review **Get Tier Status** for tier-specific capacity
3. Check **Get Volume Usage** for individual volume consumption

### Data Integrity Concerns
1. Review **Get Integ Check Status** for recent integrity checks
2. Check **Get Repair Status** for ongoing repairs
3. Use **Get File Status** for specific file integrity verification

### Cluster Health Issues
1. Verify **Get Current Master** for leadership status
2. Check **Get Node List** and **Get Node Info** for node health
3. Review **Get Sync List** for synchronization issues

### Device Problems
1. Use **Get Device List** and **Get Device Status** for device health
2. Check **Get Node Device List** for node-specific device issues
3. Run **Integ Check Device** for suspected device problems

## Advanced Diagnostics

### File System Analysis
- Use **Find Inode** and **Get Path from Inode** for file system investigation
- Employ **Get File Status** for detailed file analysis
- Check **Get Fuse Info** for mount-related issues

### Configuration Management
- Review **Get Running Conf** for current configuration
- Verify tier and device mappings with mapping commands
- Cross-reference node and device information for consistency

### Performance Tuning
- Analyze cache and read-ahead statistics for optimization
- Monitor client connections and usage patterns
- Review journal status for write performance optimization

## Next Steps

After mastering vSAN diagnostics, consider exploring:

- Advanced vSAN performance tuning techniques
- Automated monitoring and alerting systems
- Integration with external storage management tools
- Disaster recovery and backup strategies

For complex vSAN issues or performance optimization guidance, contact [VergeOS Support](/support) with detailed diagnostic output and system configuration information.

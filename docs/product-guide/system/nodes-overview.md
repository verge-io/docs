# Nodes Overview

A node in VergeOS represents a physical or virtual server that contributes compute, storage, and networking resources to your environment. The Nodes dashboard provides comprehensive monitoring and management capabilities for each node in your system.

## Key Components

### Node Status Information

- **Status**: Shows the current operational state (Running/Offline)
- **Running**: Indicates the node is actively operational
- **Maintenance Mode**: Indicates if the node is in maintenance state
- **Last Powered On**: Timestamp of when the node was last started
- **Local Time**: Current time on the node
- **IPMI Status**: Displays the status of the Intelligent Platform Management Interface
- **IPMI Network Address**: Network address for remote management access
- **System Version**: Shows current VergeOS version (OS Version, vSAN Version, Appserver Version, Kernel Version)

### Hardware Configuration

- **CPU**: Processor model and generation
- **CPU Cores**: Number of physical processor cores
- **RAM**: Total physical memory capacity
- **Failover RAM**: Memory reserved for failover scenarios
- **Overcommit RAM**: Memory available for oversubscription
- **Cluster**: The cluster this node belongs to
- **PXE Network**: Network used for PXE boot operations
- **Model**: Hardware platform information
- **Series**: Product series designation

### Asset Tags and Features

- **Physical**: Indicates physical hardware asset
- **Capture System Logs**: System logging status
- **LLDP**: Link Layer Discovery Protocol status
- **iOMMU (VT-d) Support**: Hardware virtualization support
- **Needs Reboot**: Indicates if a reboot is required
- **Needs Driver Reload**: Indicates if driver updates require reload

### Resource Metrics

The dashboard provides real-time and historical monitoring through:

- **CPU Usage Graph**: Displays current, average, and maximum CPU utilization with historical trend visualization
    - Total CPU
    - Core peak
    - Usage (User, System, IO Wait, VM Usage, IRQ)

### Node Statistics

The dashboard provides key metrics organized by category:

- **Physical RAM**: Current memory utilization percentage and capacity
- **Virtual RAM**: Allocated virtual memory (typically 0% when not overcommitted)
- **Temperature**: Current node temperature with visual indicator (green/yellow/red based on thresholds)
- **Running Machines**: Count of active workloads on the node
- **Cores Usage**: Percentage of CPU cores in use
- **RAM Usage**: Memory consumption across running machines

### Hardware Resources

#### Drives

Displays all physical drives attached to the node:

- **Status**: Online/Offline indicator
- **Name**: Drive identifier (e.g., nvme0n1, nvme1n1)
- **Model**: Manufacturer and model number
- **Tier**: vSAN storage tier assignment
- **vSAN Drive ID**: Unique identifier within vSAN
- **Firmware**: Drive firmware version
- **Bus**: Hardware bus connection
- **Usage**: Capacity utilization with visual indicator
- **Repairing**: Drive rebuild status
- **Read/Write Errors**: Error counters for drive health monitoring

#### Network Interface Cards (NICs)

Comprehensive NIC information and status:

- **Status**: Operational state (Up/Down)
- **Fabric Status**: Core fabric connectivity status (Confirmed/Not Confirmed) with visual indicator
    - The globe icon indicates NICs connected to the core fabric
    - Confirmed status means the NIC is properly integrated into the network fabric
- **Name**: Interface identifier (e.g., enp2s0f0, enp8s0)
- **Model**: Network adapter model
- **Vendor**: Network adapter manufacturer
- **Driver**: Network driver in use
- **Port**: Physical port number
- **Speed**: Link speed (e.g., 10000Mb/s, 2500Mb/s)
- **MAC**: Hardware MAC address
- **Network**: Associated VergeOS network
- **RX/TX**: Received and transmitted data volume
- **RX/TX Rate**: Current transfer rates
- **Actions**: Quick access icons for NIC operations (console, graphs, configuration)

#### Memory Modules

Displays installed RAM configuration:

- Module count and capacity
- Memory type and specifications

#### LLDP Neighbors

Shows Link Layer Discovery Protocol information for connected network devices:

- Connected switch information
- Port mappings
- Network topology visualization

#### PCI Devices

Lists all PCI/PCIe devices:

- Device types and models
- Bus assignments
- Passthrough availability

#### SR-IOV NIC Devices

Virtual function information for Single Root I/O Virtualization capable NICs:

- Virtual function count
- Assignment status

#### NVIDIA vGPU DEVICES

GPU resources available for virtual GPU assignments (if applicable):

- GPU model and capacity
- vGPU profiles available
- Allocation status

#### USB Devices

Connected USB devices:

- Device identification
- Passthrough capability

#### Resources

Resource allocation and limits:

- Core assignments
- Memory allocations
- Storage assignments

#### Tasks

Active and scheduled tasks:

- Running operations
- Queued jobs
- Task history

### Running Machines

Displays active workloads with detailed resource consumption:

- **Status**: Running state indicator
- **Type**: Workload type (Virtual Machine, vNet Container)
- **Name**: Machine identifier
- **CPU Cores**: Number of assigned cores
- **CPU Usage**: Current processor utilization percentage
- **RAM**: Allocated memory with utilization percentage and visual indicator
- **Last Started**: Timestamp of when the machine was started

Common machine types include:

- Virtual Machines (VMs)
- vNet Containers (network services)
- System services (NAS, DMZ, External, etc.)

## Key Features

### Management Operations

Available from the left-side menu:

- **Power Control**: 
    - Power On/Off
    - Reboot
    - Kill Power (force shutdown)
- **Maintenance Operations**:
    - Enable/Disable Maintenance mode
    - Scale Up (add resources to cluster)
- **Remote Console**: Direct access to node console for troubleshooting
- **Configuration**:
    - Edit node settings
    - Assign Tags for organization
    - Delete node (when appropriate)
    - Add notes for documentation
- **Refresh**: Update dashboard data
- **IPMI Management**: Remote management interface access

### Monitoring

- **Real-time Resource Utilization**: Live graphs for CPU, memory, and temperature
- **Historical Performance Data**: Trend analysis through the History link
- **Event Logs**: Comprehensive logging of node events with:
    - **Level**: Warning/Info/Error classification
    - **Time**: Timestamp of each event
    - **Source**: Originating component (e.g., node1)
    - **Message**: Detailed event description (e.g., temperature warnings)
    - View More option for extended log history
- **Hardware Health Status**: Drive errors, NIC status, and component monitoring

### Logs and Diagnostics

The Logs section provides critical system events:

- **Temperature Warnings**: Core temperature threshold alerts
- **Hardware Events**: Drive status changes, NIC events
- **System Events**: Power state changes, maintenance mode transitions
- **Performance Alerts**: Resource utilization warnings

Common log entries include core temperature warnings with specific threshold values (e.g., "Core has reached warning temperature '96 / 95").

## Best Practices

- **Monitor Node Health**: Regularly review node health metrics, especially temperature and drive status
- **Maintenance Mode**: Always enable maintenance mode before performing system updates or hardware changes
- **Review Logs**: Periodically check logs for potential issues, particularly temperature warnings and drive errors
- **Load Balancing**: Maintain balanced workload distribution across nodes in your cluster
- **Stay Updated**: Keep firmware and system software up to date through the System menu
- **Remote Console Access**: Use the remote console feature for direct troubleshooting when physical console or SSH access is needed
- **Fabric Status Monitoring**: Monitor the fabric status of core NICs to ensure proper network integration and redundancy
- **Drive Health**: Monitor drive error counters and repairing status to proactively address storage issues
- **Temperature Management**: Address repeated temperature warnings by checking cooling systems and airflow
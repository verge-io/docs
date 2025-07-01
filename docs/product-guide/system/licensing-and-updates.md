# Licensing and Software Updates

This guide explains how to manage software updates and licensing in VergeOS.

## Accessing System Updates

1. From the Main Dashboard, click **System** on the left menu.
2. Click **Updates** on the left menu.
   
## Update Server Dashboard

The Update Server dashboard provides information about:

- Current update server status
- Package versions and availability
- Update logs and history
- System update settings

### Current Status Information

The dashboard displays key information about the update server:

- **Status**: Current state (e.g., Idle, Updating)
- **Name**: Update server name (Verge.io Updates)
- **Description**: Server purpose and capabilities
- **URL**: Update server address
- **Account User**: Account Username
- **Last Checked**: Timestamp of last update check
- **Last Updated**: Timestamp of last successful update

### Package Information

The Packages section shows:

- Package names and versions
- Associated branch (e.g., stable-4.13)
- Package descriptions
- Last modified dates

## Update Process

The update process consists of three main steps:

1. **Download**: 
   - After checking for updates, newly available packages can be downloaded
   - Progress can be monitored in the Updates dashboard

2. **Install**: 
   - Downloaded updates are distributed to all nodes
   - System prepares updates for application

3. **Reboot**: 
   - Updates are applied one node at a time
   - For each node:
     - Workloads are automatically migrated to other nodes
     - Node is rebooted and updated
     - Node returns to service
     - Process continues to next node
   - No system downtime if adequate resources are available for workload migration

!!! note
    The system handles workload migration transparently during the update process. VMs and other workloads continue running without interruption as long as there are sufficient resources available on the remaining nodes.

!!! tip
    Monitor the Updates dashboard during the process to track progress across all nodes. The "Nodes Updated" counter shows how many nodes have completed the update process.

## Update Settings

### Required Settings

- **Update Source**: Select the appropriate update server
    - "Verge.io Updates" for normal installations
    - "Verge.io Trial/NFR" for POC and Not-for-resale licenses

- **User/Password**: Authentication credentials provided by [Verge.io Support](/support) team

- **Branch**: Selects product version (e.g., 4.13 Release)
    - Updates are available within the selected branch
    - System notifies when updates in newer branches are available

!!! warning "Critical Setting"
    Proper authentication is required for core system functionality including:
    - Virtual machine operations
    - NAS functionality
    - System updates

### Automatic Update Options

- **Auto Check For Updates**: 
    - Enabled by default
    - Checks hourly for available updates
    - Updates appear in Updates Dashboard
    - Does not automatically install updates

- **Auto Update**:
    - Optional automatic update installation
    - Requires specified update time

- **Update Time**: 
    - Scheduled time for automatic updates
    - Uses 24-hour format (e.g., 00:46)

### System Update Settings

- **Max vSAN Usage Percentage**:
    - Default: 80
    - Defines threshold for automatic node updates
    - Manual updates required if vSAN usage exceeds this percentage

- **Warm Reboot (Fast)**:
    - When enabled, uses kexec for node reboots
    - Bypasses BIOS/EFI
    - Faster than standard reboot

- **Multi-Cluster Update**:
    - When enabled, allows multiple clusters to update simultaneously
    - Improves update efficiency in multi-cluster environments

### Snapshot Settings

- **Take Cloud Snapshot on Update**:
    - Enabled by default
    - Creates system snapshot before updates
    - Allows rollback if needed

- **Cloud Snapshot Expiration**:
    - Default: 6 hours
    - Configurable retention period
    - Units can be selected (e.g., Hours)

### Privacy Settings

- **Keep System Information Anonymous When Sending Usage Statistics**:
    - Optional anonymization of system information
    - Removes identifying information like VM/tenant names
    - Applies to update server communications

## Update Status Dashboard

The dashboard provides real-time information about:

- **Nodes Updated**: Count of updated nodes
- **Tasks**: Active update tasks
- **Events**: Update-related events
- **Update Logs**: Detailed system update logs

## Air-Gap Licensing

!!! warning "Air-gap licensing is not common and requires justification."

For environments without outbound internet access, VergeOS supports air-gap licensing. This process involves:

1. Generating a license request file from the system
2. Emailing the request file to [Verge.io Support](/support)
3. Receiving and applying an air-gap license file

!!! note "Air-Gap Updates"
    Systems with air-gap licensing can be updated using ISO files. See [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license/) for detailed instructions.

## Additional Resources

- [Updating the VergeOS System](/knowledge-base/updating-vergeos-system/)
- [Requesting an Airgap License](/knowledge-base/requesting-an-airgap-license/)
- [Updating a VergeOS System with Airgap License](/knowledge-base/updating-vergeos-system-with-airgap-license/)
- [Cloud Snapshots and Restores](/product-guide/backup-dr/cloud-snapshot-restore/)

!!! tip
    Regular monitoring of the Update Status Dashboard helps ensure system health and security.

# VergeOS PowerShell Module (PSVergeOS)

## Overview

PSVergeOS is a PowerShell module for managing VergeOS infrastructure through the REST API. It provides over 200 cmdlets for automating VM lifecycle, networking, storage, multi-tenant operations, and disaster recovery workflows, enabling administrators to leverage their PowerShell expertise for VergeOS management.

## Key Features

- **VM Management**: Creation, configuration, power control, cloning, snapshots, and migration
- **Advanced Networking**: Virtual networks, firewall rules, DHCP, DNS, IPSec VPN, and WireGuard
- **NAS & Storage**: Volume management, CIFS/NFS shares, and synchronization
- **Multi-Tenancy**: Tenant provisioning with resource isolation
- **Disaster Recovery**: Cloud snapshots, site synchronization, recovery workflows
- **Pipeline Support**: Chainable cmdlets for bulk operations
- **Cross-Platform**: Windows, macOS, and Linux with PowerShell 7.4+

## Requirements

- PowerShell 7.4 or later
- VergeOS 26.0 or later

## Installation

### From PowerShell Gallery (Recommended)

```powershell
Install-Module -Name PSVergeOS -Scope CurrentUser
```

### Manual Installation

```powershell
git clone https://github.com/verge-io/PSVergeOS.git
Import-Module ./PSVergeOS/PSVergeOS.psd1
```

## Authentication

The module supports multiple authentication methods:

- **Interactive credentials**: Prompt for username and password at runtime
- **PSCredential objects**: Automate authentication with stored credentials
- **API tokens**: Use pre-generated tokens for non-interactive scenarios
- **Self-signed certificates**: Option to skip certificate validation for test environments

## Available Cmdlets

The module contains over 200 cmdlets organized by category:

| Category | Description |
|----------|-------------|
| Connection | Connect, disconnect, and manage server connections |
| Virtual Machines | Lifecycle, snapshots, drives, NICs |
| Networking | Networks, rules, DNS, DHCP, diagnostics |
| VPN | IPSec connections/policies, WireGuard interfaces/peers |
| NAS/Storage | Services, volumes, shares, snapshots, synchronization |
| Tenants | Provisioning, snapshots, storage allocation |
| Users & Groups | Account management, permissions, API keys |
| System | Clusters, nodes, licenses, settings |
| Monitoring | Alarms, logs, tasks |
| Backup & DR | Profiles, cloud snapshots, site management |

## Usage Examples

### Bulk VM Operations

```powershell
# Stop all VMs matching a pattern
Get-VergeVM -Name "test-*" | Stop-VergeVM

# Snapshot all production VMs
Get-VergeVM -Tag "production" | New-VergeVMSnapshot -Name "daily-backup"

# Export VM inventory to CSV
Get-VergeVM | Select-Object Name, CPUCores, RAM, Status | Export-Csv vms.csv
```

### Multi-Server Management

```powershell
# Connect to multiple VergeOS systems
$cred = Get-Credential
Connect-VergeOS -Server "site1.example.com" -Credential $cred
Connect-VergeOS -Server "site2.example.com" -Credential $cred

# View current connection
Get-VergeConnection
```

### Network Configuration

```powershell
# Create a network with DHCP
$network = New-VergeNetwork -Name "app-network" -Address "10.0.1.0/24" -DHCPEnabled

# Add a firewall rule
New-VergeNetworkRule -Network $network -Name "Allow-HTTPS" `
    -Direction Incoming -Protocol TCP -Port 443 -Action Accept

# Apply network changes
Update-VergeNetwork -Network $network
```

## Documentation and Resources

For complete documentation, including all cmdlets, parameters, and detailed usage examples, visit the official repository:

- [GitHub Repository](https://github.com/verge-io/PSVergeOS){target="_blank"}
- [PowerShell Gallery](https://www.powershellgallery.com/packages/PSVergeOS){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/PSVergeOS/issues](https://github.com/verge-io/PSVergeOS/issues){target="_blank"}

## Additional Resources

- [PowerShell Documentation](https://learn.microsoft.com/en-us/powershell/){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)

# VergeOS Go SDK (govergeos)

## Overview

govergeos is a Go client library for managing VergeOS infrastructure through the REST API. It provides a type-safe, idiomatic Go interface for automating VM lifecycle, networking, storage, multi-tenant operations, and disaster recovery workflows, making it ideal for building tools, operators, and infrastructure automation.

## Key Features

- **VM Management**: Creation, configuration, power control, cloning, and snapshots
- **Advanced Networking**: Virtual networks, firewall rules, DHCP, DNS, IPSec VPN, and WireGuard
- **NAS & Storage**: Volume management, CIFS/NFS shares, async volume browsing, and synchronization
- **Multi-Tenancy**: Tenant provisioning with resource isolation and node management
- **Disaster Recovery**: Cloud snapshots, site synchronization, and recovery workflows
- **Type-Safe API**: Full Go interfaces for mocking, context support, and thread-safe concurrent operations
- **Zero Dependencies**: Standard library only—no external dependencies
- **Cross-Platform**: Windows, macOS, and Linux support

## Requirements

- Go 1.21 or later
- VergeOS 26.0 or later

## Installation

### Using go get

```bash
go get github.com/verge-io/govergeos
```

### In go.mod

```go
require github.com/verge-io/govergeos v0.1.2
```

## Authentication

The SDK supports multiple authentication methods:

### Username/Password

```go
import vergeos "github.com/verge-io/govergeos"

client, err := vergeos.NewClient(
    vergeos.WithBaseURL("https://192.168.1.100"),
    vergeos.WithCredentials("admin", "secret"),
    vergeos.WithInsecureTLS(true), // For self-signed certificates
)
if err != nil {
    log.Fatal(err)
}
```

!!! note "SSL Certificate Verification"
    Set `WithInsecureTLS(true)` only for environments with self-signed certificates. For production environments with valid certificates, omit this option.

### API Key

```go
client, err := vergeos.NewClient(
    vergeos.WithBaseURL("https://192.168.1.100"),
    vergeos.WithAPIKey("your-api-key-token"),
)
```

### Environment Variables

```bash
export VERGEOS_HOST=https://192.168.1.100
export VERGEOS_USERNAME=admin
export VERGEOS_PASSWORD=secret
export VERGEOS_VERIFY_SSL=false
```

```go
client, err := vergeos.NewClient(vergeos.WithEnvConfig())
```

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VERGEOS_HOST` | Yes | — | Base URL (e.g., `https://vergeos.example.com`) |
| `VERGEOS_USERNAME` | No* | — | Username for basic auth |
| `VERGEOS_PASSWORD` | No* | — | Password for basic auth |
| `VERGEOS_API_KEY` | No* | — | API key for bearer auth |
| `VERGEOS_VERIFY_SSL` | No | `true` | Verify TLS certificates |
| `VERGEOS_TIMEOUT` | No | `30` | Request timeout in seconds |

*One of (USERNAME+PASSWORD) or API_KEY is required.

!!! tip "Recommended for Production"
    Using environment variables keeps credentials out of your source code and makes it easy to use different credentials across environments.

### Client Options

The client supports additional configuration options:

```go
client, err := vergeos.NewClient(
    vergeos.WithBaseURL("https://192.168.1.100"),
    vergeos.WithCredentials("admin", "secret"),
    vergeos.WithTimeout(60 * time.Second),
    vergeos.WithUserAgent("my-automation/1.0"),
    vergeos.WithHTTPClient(customHTTPClient),
)
```

## Available Resources

The SDK provides access to the following VergeOS resources:

| Category | Services |
|----------|----------|
| Virtual Machines | VMs, VMDrives, VMNICs, VMSnapshots, VMDevices |
| Networking | Networks, VNetRules, VNetAddresses, VNetHosts, VNetDNSViews/Zones/Records |
| VPN | VNetIPSecs, VNetIPSecPhase1s/Phase2s, VNetWireGuards, VNetWireGuardPeers |
| NAS/Storage | NASServices, Volumes, VolumeSnapshots, VolumeCIFSShares, VolumeNFSShares, VolumeSyncs |
| Tenants | Tenants, TenantNodes, TenantStorage, TenantSnapshots, TenantLayer2Networks |
| Users & Groups | Users, Groups, Members, Permissions, UserAPIKeys |
| System | Clusters, Nodes, Settings, System, Certificates |
| Monitoring | Alarms, Logs, Tasks, StorageTiers, ClusterTiers |
| Backup & DR | SnapshotProfiles, CloudSnapshots, Sites, SiteSyncs |
| Automation | Files, CloudInitFiles, WebhookURLs, Webhooks |
| Organization | Tags, TagCategories, TagMembers, ResourceGroups |

## Usage Examples

### Managing Virtual Machines

```go
import (
    "context"
    "fmt"
    "log"

    vergeos "github.com/verge-io/govergeos"
)

func main() {
    client, err := vergeos.NewClient(
        vergeos.WithBaseURL("https://192.168.1.100"),
        vergeos.WithCredentials("admin", "secret"),
        vergeos.WithInsecureTLS(true),
    )
    if err != nil {
        log.Fatal(err)
    }

    ctx := context.Background()

    // List all VMs
    vms, err := client.VMs.List(ctx)
    if err != nil {
        log.Fatal(err)
    }
    for _, vm := range vms {
        fmt.Printf("%s: %dMB RAM, %d cores\n", vm.Name, vm.RAM, vm.CPUCores)
    }

    // Get a specific VM
    vm, err := client.VMs.Get(ctx, 42)
    if err != nil {
        log.Fatal(err)
    }

    // Create a VM
    newVM, err := client.VMs.Create(ctx, &vergeos.VMCreateRequest{
        Name:     "test-vm",
        RAM:      2048,
        CPUCores: 2,
        Cluster:  1,
    })
    if err != nil {
        log.Fatal(err)
    }

    // Power operations (use ID.Int() to get the integer ID)
    _ = client.VMs.PowerOn(ctx, newVM.ID.Int())
    _ = client.VMs.PowerOff(ctx, newVM.ID.Int())
    _ = client.VMs.Reset(ctx, newVM.ID.Int())

    // Create a snapshot
    _ = client.VMs.Snapshot(ctx, newVM.ID.Int(), &vergeos.VMSnapshotOptions{
        Name: "pre-upgrade",
    })

    // Clone a VM
    clone, _ := client.VMs.Clone(ctx, vm.ID.Int(), &vergeos.VMCloneOptions{
        Name: "test-clone",
    })
    fmt.Printf("Cloned VM: %s\n", clone.Name)
}
```

### Creating and Managing Networks

```go
ctx := context.Background()

// Create a virtual network
network, err := client.Networks.Create(ctx, &vergeos.NetworkCreateRequest{
    Name:        "app-network",
    Network:     "10.10.1.0/24",
    IPAddress:   "10.10.1.1",
    DHCPEnabled: vergeos.Ptr(true),
    DHCPStart:   "10.10.1.100",
    DHCPStop:    "10.10.1.200",
})
if err != nil {
    log.Fatal(err)
}

// Power on the network
_ = client.Networks.PowerOn(ctx, network.ID.Int())

// Add a firewall rule
rule, err := client.VNetRules.Create(ctx, &vergeos.VNetRuleCreateRequest{
    VNet:             network.ID.Int(),
    Name:             "Allow SSH",
    Action:           vergeos.Ptr("accept"),
    Protocol:         vergeos.Ptr("tcp"),
    Direction:        vergeos.Ptr("incoming"),
    DestinationPorts: vergeos.Ptr("22"),
})
if err != nil {
    log.Fatal(err)
}

// Apply the rules
_ = client.Networks.ApplyRules(ctx, network.ID.Int())
```

### Filtering Resources

The SDK supports flexible filtering with list options:

=== "Basic Filtering"

    ```go
    // Filter VMs by power state (running)
    vms, err := client.VMs.List(ctx,
        vergeos.WithFilter("powerstate eq true"),
    )
    ```

=== "Multiple Options"

    ```go
    // Combine filter, sort, and pagination
    vms, err := client.VMs.List(ctx,
        vergeos.WithFilter("os_family eq 'linux' and ram gt 2048"),
        vergeos.WithSort("name"),
        vergeos.WithLimit(10),
        vergeos.WithOffset(0),
    )
    ```

=== "Field Selection"

    ```go
    // Return only specific fields (use $key for the ID field)
    vms, err := client.VMs.List(ctx,
        vergeos.WithFields("$key,name,powerstate,ram"),
    )
    ```

### Concurrent Operations

The SDK is thread-safe and supports concurrent operations using goroutines:

```go
import "sync"

var wg sync.WaitGroup
vmIDs := []int{1, 2, 3, 4, 5}

for _, id := range vmIDs {
    wg.Add(1)
    go func(vmID int) {
        defer wg.Done()
        vm, err := client.VMs.Get(ctx, vmID)
        if err != nil {
            log.Printf("Error fetching VM %d: %v", vmID, err)
            return
        }
        status := "stopped"
        if vm.PowerState {
            status = "running"
        }
        fmt.Printf("VM: %s, Power: %s\n", vm.Name, status)
    }(id)
}
wg.Wait()
```

!!! tip "Context Cancellation"
    All methods accept a `context.Context`, allowing you to set timeouts and handle cancellation for long-running operations.

## Error Handling

The SDK provides specific error types for different error conditions:

```go
import vergeos "github.com/verge-io/govergeos"

vm, err := client.VMs.Get(ctx, 999)
if err != nil {
    if vergeos.IsNotFoundError(err) {
        fmt.Println("VM not found")
    } else if vergeos.IsAuthError(err) {
        fmt.Println("Authentication failed")
    } else if vergeos.IsValidationError(err) {
        fmt.Println("Invalid request parameters")
    } else {
        fmt.Printf("Unexpected error: %v\n", err)
    }
}
```

??? example "Available Error Types"
    | Error Type | Helper Function | Description |
    |-----------|-----------------|-------------|
    | `APIError` | — | Base error for all API errors |
    | `AuthError` | `IsAuthError(err)` | Invalid credentials or expired token |
    | `NotFoundError` | `IsNotFoundError(err)` | Requested resource does not exist |
    | `ValidationError` | `IsValidationError(err)` | Invalid parameter values |
    | `UnsupportedVersionError` | `IsUnsupportedVersionError(err)` | VergeOS version not supported |

## Common Use Cases

- **Infrastructure automation**: Provision VMs, networks, and storage programmatically
- **Kubernetes operators**: Build custom controllers for VergeOS resources
- **CI/CD integration**: Create and destroy test environments in pipelines
- **Monitoring tools**: Query resource status and build custom dashboards
- **Backup automation**: Schedule and manage snapshots and cloud backups
- **Multi-tenant provisioning**: Automate tenant creation and resource allocation

## Documentation and Resources

For complete documentation, including all available methods and detailed usage examples, visit the official repository:

- [GitHub Repository](https://github.com/verge-io/govergeos){target="_blank"}
- [Go Package Documentation](https://pkg.go.dev/github.com/verge-io/govergeos){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/govergeos/issues](https://github.com/verge-io/govergeos/issues){target="_blank"}

## Additional Resources

- [Go Documentation](https://go.dev/doc/){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)
- [Python SDK (pyvergeos)](python-sdk.md) - Python alternative
- [Terraform Provider](terraform-provider.md) - Infrastructure as code

# VergeOS Python SDK (pyvergeos)

## Overview

pyvergeos is a Python SDK for managing VergeOS infrastructure through the REST API. It provides a Pythonic, type-annotated interface for automating VM lifecycle, networking, storage, multi-tenant operations, and disaster recovery workflows, making it ideal for automation scripts, tooling development, and integrations.

## Key Features

- **VM Management**: Creation, configuration, power control, cloning, and snapshots
- **Advanced Networking**: Virtual networks, firewall rules, DHCP, DNS, IPSec VPN, and WireGuard
- **NAS & Storage**: Volume management, CIFS/NFS shares, and synchronization
- **Multi-Tenancy**: Tenant provisioning with resource isolation
- **Disaster Recovery**: Cloud snapshots, site synchronization, and recovery workflows
- **Filtering**: OData filter support with a fluent filter builder API
- **Type Annotations**: Full type hints for IDE autocompletion and static analysis
- **Cross-Platform**: Windows, macOS, and Linux support

## Requirements

- Python 3.9 or later
- VergeOS 26.0 or later

## Installation

### From PyPI (Recommended)

```bash
pip install pyvergeos
```

### Using uv

```bash
uv add pyvergeos
```

### From Source

```bash
git clone https://github.com/verge-io/pyvergeos.git
cd pyvergeos
pip install .
```

## Authentication

The SDK supports multiple authentication methods:

### Username/Password

```python
from pyvergeos import VergeClient

client = VergeClient(
    host="192.168.1.100",
    username="admin",
    password="secret",
    verify_ssl=False  # For self-signed certificates
)
```

!!! note "SSL Certificate Verification"
    Set `verify_ssl=False` only for environments with self-signed certificates. For production environments with valid certificates, omit this parameter or set it to `True`.

### API Token

```python
client = VergeClient(
    host="192.168.1.100",
    token="your-api-token"
)
```

### Environment Variables

```bash
export VERGE_HOST=192.168.1.100
export VERGE_USERNAME=admin
export VERGE_PASSWORD=secret
```

```python
client = VergeClient.from_env()
```

!!! tip "Recommended for Production"
    Using environment variables keeps credentials out of your source code and makes it easy to use different credentials across environments.

### Context Manager

```python
with VergeClient(host="192.168.1.100", token="api-token") as client:
    vms = client.vms.list()
```

!!! tip "Automatic Cleanup"
    Using the context manager (`with` statement) ensures the connection is properly closed, even if an exception occurs.

## Available Resources

The SDK provides access to the following VergeOS resources:

| Category | Resources |
|----------|-----------|
| Virtual Machines | VMs, drives, NICs, snapshots |
| Networking | Networks, rules, DNS, DHCP, aliases, hosts |
| VPN | IPSec connections, WireGuard interfaces and peers |
| NAS/Storage | Services, volumes, CIFS/NFS shares, volume syncs |
| Tenants | Tenant management, snapshots, storage, network blocks |
| Users & Groups | Users, groups, permissions, API keys |
| System | Clusters, nodes, storage tiers, certificates |
| Monitoring | Alarms, logs, tasks |
| Backup & DR | Snapshot profiles, cloud snapshots, sites, site syncs |

## Usage Examples

### Managing Virtual Machines

```python
from pyvergeos import VergeClient

client = VergeClient(host="192.168.1.100", username="admin", password="secret")

# List all VMs
for vm in client.vms.list():
    print(f"{vm.name}: {vm.ram}MB RAM, {vm.cpu_cores} cores")

# Get a specific VM
vm = client.vms.get(name="web-server")

# Create a VM
new_vm = client.vms.create(
    name="test-vm",
    ram=2048,
    cpu_cores=2,
    os_family="linux"
)

# Power operations
vm.power_on()
vm.power_off()
vm.reset()

# Snapshots
vm.snapshot(retention=86400, quiesce=True)

# Clone a VM
clone = vm.clone(name="test-clone")

# Add drives and NICs
vm.drives.add(name="data", size=50*1024*1024*1024)
vm.nics.add(network=network.key)

client.disconnect()
```

### Creating and Managing Networks

```python
# Create a virtual network
network = client.networks.create(
    name="app-network",
    network_address="10.10.1.0/24",
    ip_address="10.10.1.1",
    dhcp_enabled=True
)

network.power_on()
network.apply_rules()

# Add firewall rules
network.rules.create(
    name="Allow SSH",
    action="accept",
    protocol="tcp",
    dest_port=22
)
```

### Filtering Resources

The SDK supports multiple filtering approaches:

=== "Keyword Arguments"

    ```python
    # Simple and readable for basic filters
    vms = client.vms.list(status="running", name="prod-*")
    ```

=== "OData Filter String"

    ```python
    # Full OData filter syntax for complex queries
    vms = client.vms.list(filter="os_family eq 'linux' and ram gt 2048")
    ```

=== "Filter Builder"

    ```python
    # Fluent API for building filters programmatically
    from pyvergeos import Filter

    f = Filter().eq("os_family", "linux").and_().gt("ram", 2048)
    vms = client.vms.list(filter=str(f))
    ```

### Task Waiting

Many operations in VergeOS run asynchronously. Use the task manager to wait for completion:

```python
result = vm.snapshot()
task = client.tasks.wait(result["task"], timeout=300)
```

!!! info "Async Operations"
    Operations like snapshots, clones, and migrations return immediately with a task ID. Use `client.tasks.wait()` to block until the operation completes.

## Error Handling

The SDK provides specific exception types for different error conditions:

```python
from pyvergeos import NotFoundError, AuthenticationError, TaskTimeoutError

try:
    vm = client.vms.get(name="nonexistent")
except NotFoundError:
    print("VM not found")

try:
    task = client.tasks.wait(task_id, timeout=60)
except TaskTimeoutError as e:
    print(f"Task {e.task_id} timed out")
```

??? example "Available Exception Types"
    | Exception | Description |
    |-----------|-------------|
    | `VergeError` | Base exception for all SDK errors |
    | `AuthenticationError` | Invalid credentials or expired token |
    | `NotFoundError` | Requested resource does not exist |
    | `ConflictError` | Resource state conflict (e.g., VM already running) |
    | `ValidationError` | Invalid parameter values |
    | `TaskTimeoutError` | Task did not complete within timeout |
    | `TaskError` | Task failed during execution |

## Common Use Cases

- **Infrastructure automation**: Provision VMs, networks, and storage programmatically
- **CI/CD integration**: Create and destroy test environments in pipelines
- **Monitoring and reporting**: Query resource status and generate inventory reports
- **Backup automation**: Schedule and manage snapshots and cloud backups
- **Multi-tenant provisioning**: Automate tenant creation and resource allocation

## Documentation and Resources

For complete documentation, including all available methods and detailed usage examples, visit the official repository:

- [GitHub Repository](https://github.com/verge-io/pyvergeos){target="_blank"}
- [PyPI Package](https://pypi.org/project/pyvergeos/){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/pyvergeos/issues](https://github.com/verge-io/pyvergeos/issues){target="_blank"}

## Additional Resources

- [Python Documentation](https://docs.python.org/3/){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)
- [PSVergeOS PowerShell Module](powershell-module.md) - PowerShell alternative
- [Terraform Provider](terraform-provider.md) - Infrastructure as code

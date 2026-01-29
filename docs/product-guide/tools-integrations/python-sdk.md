# VergeOS Python SDK (pyVergeOS)

## Overview

pyVergeOS is a Python SDK for managing VergeOS infrastructure through the REST API. It provides a clean, type-annotated interface for automating VM lifecycle, networking, storage, and multi-tenant operations, enabling developers to integrate VergeOS management into Python applications and automation workflows.

## Key Features

- **VM Management**: List, create, update, delete, power control, cloning, and snapshots
- **Networking**: Virtual networks, diagnostics, and statistics
- **NAS & Storage**: Volumes, CIFS/NFS shares, and storage tiers
- **Multi-Tenancy**: Tenant provisioning and management
- **Backup & DR**: Cloud snapshots, site syncs, and snapshot profiles
- **Advanced Filtering**: Keyword arguments, OData filter strings, and filter builder class
- **Async Task Support**: Wait for long-running operations with timeout handling
- **Context Manager**: Clean resource management with `with` statements
- **Type Annotations**: Full type hints for IDE autocompletion and static analysis

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

## Authentication

The SDK supports multiple authentication methods:

### Username and Password

```python
from pyvergeos import VergeClient

client = VergeClient(
    host="192.168.1.100",
    username="admin",
    password="secret"
)
```

### API Token

```python
from pyvergeos import VergeClient

client = VergeClient(
    host="192.168.1.100",
    token="your-api-token"
)
```

### Environment Variables

Set the following environment variables:

- `VERGE_HOST` - VergeOS server address
- `VERGE_USERNAME` - Username for authentication
- `VERGE_PASSWORD` - Password for authentication

Then initialize the client:

```python
from pyvergeos import VergeClient

client = VergeClient.from_env()
```

## Available Modules

The SDK provides access to VergeOS resources through the client object:

| Module | Description |
|--------|-------------|
| `client.vms` | Virtual machine lifecycle management |
| `client.networks` | Virtual networks, diagnostics, statistics |
| `client.tenants` | Tenant provisioning and management |
| `client.nas_services` | NAS service configuration |
| `client.nas_volumes` | NAS volume management |
| `client.cifs_shares` | CIFS/SMB share configuration |
| `client.nfs_shares` | NFS share configuration |
| `client.cloud_snapshots` | Cloud-level snapshots |
| `client.snapshot_profiles` | Snapshot scheduling profiles |
| `client.site_syncs` | Site synchronization for DR |
| `client.nodes` | Node management |
| `client.clusters` | Cluster configuration |
| `client.users` | User account management |
| `client.groups` | Group management |
| `client.tasks` | Task monitoring and async operations |
| `client.logs` | System log access |
| `client.alarms` | Alarm monitoring |

## Common Use Cases

### List Running VMs

```python
from pyvergeos import VergeClient

with VergeClient.from_env() as client:
    running_vms = client.vms.list_running()
    for vm in running_vms:
        print(vm.name)
```

### Power Operations

Power operations are methods on VM objects:

```python
# Get a VM
vm = client.vms.get(vm_key)

# Power on
vm.power_on()

# Power off (graceful)
vm.power_off()

# Power off (force)
vm.power_off(force=True)

# Reset
vm.reset()

# Guest shutdown (requires guest agent)
vm.guest_shutdown()
```

### Create a Snapshot

```python
vm = client.vms.get(vm_key)

# Create snapshot with options
vm.snapshot(
    name="pre-upgrade-snapshot",
    retention=86400,  # seconds (default: 24 hours)
    quiesce=True
)
```

### Clone a VM

```python
vm = client.vms.get(vm_key)

# Clone with new name
result = vm.clone(
    name="cloned-vm",
    preserve_macs=False
)
```

### Manage VM Drives and NICs

Each VM object has managers for drives and NICs:

```python
vm = client.vms.get(vm_key)

# List drives
drives = vm.drives.list()

# List NICs
nics = vm.nics.list()

# List snapshots
snapshots = vm.snapshots.list()
```

### Filter VMs

```python
from pyvergeos.filters import Filter

# Using keyword arguments
vms = client.vms.list(status="running")

# Using OData filter string
vms = client.vms.list(filter="status eq 'running'")

# Using filter builder
f = Filter().eq("status", "running")
vms = client.vms.list(filter=f)
```

### Wait for Async Tasks

```python
# Clone returns a task
result = vm.clone(name="cloned-vm")

# Wait for completion with timeout
task = client.tasks.wait(
    key=result["task_key"],
    timeout=300,        # seconds
    poll_interval=2     # seconds between checks
)
```

### Network Operations

```python
# List all networks
networks = client.networks.list()

# List only internal networks
internal = client.networks.list_internal()

# List only external networks
external = client.networks.list_external()

# Get network diagnostics
diag = client.networks.diagnostics(network_key)

# Get network statistics
stats = client.networks.statistics(network_key)
```

## Exception Handling

The SDK provides custom exceptions for common error scenarios:

```python
from pyvergeos import VergeClient
from pyvergeos.exceptions import NotFoundError, AuthenticationError, TaskTimeoutError

try:
    client = VergeClient.from_env()
    vm = client.vms.get(999)
except AuthenticationError:
    print("Invalid credentials")
except NotFoundError:
    print("VM not found")
except TaskTimeoutError:
    print("Operation timed out")
```

## Documentation and Resources

For complete documentation, including all methods, parameters, and detailed usage examples, visit the official repository:

- [GitHub Repository](https://github.com/verge-io/pyVergeOS){target="_blank"}
- [PyPI Package](https://pypi.org/project/pyvergeos/){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the GitHub repository:

[https://github.com/verge-io/pyVergeOS/issues](https://github.com/verge-io/pyVergeOS/issues){target="_blank"}

## Additional Resources

- [Python Documentation](https://docs.python.org/3/){target="_blank"}
- [VergeOS API Documentation](/knowledge-base/category/api-reference/)
- [VergeOS PowerShell Module](powershell-module.md)

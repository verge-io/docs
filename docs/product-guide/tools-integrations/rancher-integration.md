# Rancher Integration

## Overview

VergeOS integrates with [Rancher](https://www.rancher.com/){target="_blank"} through a Docker Machine node driver and a UI extension. Together, these components let us provision and manage RKE2/K3s clusters on VergeOS infrastructure directly from the Rancher interface.

| Component | Type | Version | Purpose |
|-----------|------|---------|---------|
| [Docker Machine Driver](#docker-machine-driver) | Go binary | v1.0.0 | Provisions VergeOS VMs as Kubernetes nodes |
| [UI Extension](#ui-extension) | Vue.js / Helm | v0.1.0 | Adds VergeOS cloud credential and machine config to Rancher |

Once clusters are running, the [Kubernetes Integration](kubernetes-integration.md) components (CSI Driver and Cloud Controller Manager) provide persistent storage and node lifecycle management — these work with any Kubernetes cluster on VergeOS, not just Rancher-provisioned ones.

```
┌──────────────────────────────────────────────────────────┐
│                    Rancher Server                         │
│           (UI Extension for VergeOS)                      │
│                                                          │
│  Cloud Credentials ──► Docker Machine Driver ──► VMs     │
└────────────────────────────┬─────────────────────────────┘
                             │
                             ▼
┌──────────────────────────────────────────────────────────┐
│              RKE2/K3s Cluster (VergeOS VMs)               │
│                                                          │
│  Cloud Controller Manager    CSI Driver                  │
│  ├── Node metadata           ├── NAS (ReadWriteMany)     │
│  ├── Node lifecycle          └── Block (ReadWriteOnce)   │
│  └── Load balancers                                      │
└──────────────────────────────────────────────────────────┘
```

### Prerequisites

- A VergeOS environment with API access
- A Rancher Server installation (v2.10+)
- A template VM running Ubuntu 24.04 with cloud-init installed
- A VergeOS API key (generated in User Settings)
- `kubectl` and `helm` CLI tools

---

## Docker Machine Driver

The Docker Machine driver is the foundation of the Rancher integration. It manages the full VM lifecycle through the VergeOS API — cloning template VMs, injecting SSH keys via cloud-init, and creating machines when clusters are provisioned. When a cluster is removed, the driver automatically deletes the VMs it created.

### How It Works

1. **Clones** the template VM with the requested machine name
2. **Configures** CPU cores, RAM, and cloud-init (SSH keys + hostname + optional user-data)
3. **Resizes** the primary disk if a custom size is specified
4. **Attaches** the VM to the specified network
5. **Powers on** and waits for an IP address (QEMU guest agent preferred, NIC DHCP fallback)

If any step fails, the driver cleans up the partially-created VM automatically.

### Template VM Preparation

Before provisioning clusters, we need a template VM in VergeOS with the following:

**Required:**

- **cloud-init** installed and enabled — the driver injects SSH keys and sets the hostname via a multi-part MIME cloud-init payload

**Required:**

- **Ubuntu 24.04** (Noble Numbat) — the only supported template OS at this time

**Recommended:**

- **QEMU guest agent** — enables accurate IP discovery; without it the driver falls back to NIC DHCP lease IPs

!!! tip "Ubuntu 24.04 Specifics"
    The driver automatically handles several Ubuntu 24.04 specifics via cloud-init:

    - **Netplan DHCP configuration** — writes a netplan config matching `en*` interfaces with `dhcp4: true`, handling PCI slot name changes across clones
    - **Machine-ID regeneration** — regenerates `/etc/machine-id` on each clone so that each VM gets a unique DHCP client identifier
    - **Cached DHCP lease cleanup** — removes stale DHCP leases inherited from the template

!!! warning "Memory Requirements"
    For Rancher use, allocate at least **4 GB RAM** per node (8 GB recommended). A single-node RKE2 cluster with Calico CNI will OOM with 2 GB.

Docker is **not** required on the template — Rancher installs its own container runtime (containerd) via the system agent. The template only needs cloud-init and the guest agent.

### Installing the Node Driver in Rancher

The driver must be registered in Rancher via `kubectl` (the Rancher UI's "Add Node Driver" form does not support the required credential field annotations).

1. Download the driver binary from the [GitHub Releases](https://github.com/verge-io/docker-machine-driver-vergeos/releases){target="_blank"} page
2. Host it on an HTTP/HTTPS server accessible from the Rancher cluster
3. Apply the node driver manifest:

```bash
kubectl apply -f - <<'EOF'
apiVersion: management.cattle.io/v3
kind: NodeDriver
metadata:
  annotations:
    lifecycle.cattle.io/create.node-driver-controller: "true"
    privateCredentialFields: "apiKey"
    publicCredentialFields: "host,insecure"
  finalizers:
  - controller.cattle.io/node-driver-controller
  labels:
    cattle.io/creator: norman
  name: vergeos
spec:
  active: true
  displayName: vergeos
  url: "http://<hostname-or-ip>/docker-machine-driver-vergeos-linux-amd64"
EOF
```

Replace the `url` with the actual location of the hosted binary.

After applying, restart Rancher so it picks up the new driver schema:

```bash
kubectl rollout restart deployment rancher -n cattle-system
```

Once Rancher restarts, **VergeOS** will appear as a node driver option when creating clusters.

### Driver Options

| Flag | Env Variable | Default | Description |
|------|-------------|---------|-------------|
| `--vergeos-host` | `VERGEOS_HOST` | — | VergeOS host or URL (defaults to https://) |
| `--vergeos-api-key` | `VERGEOS_API_KEY` | — | API key for authentication (required) |
| `--vergeos-insecure` | `VERGEOS_INSECURE` | `false` | Skip TLS certificate verification |
| `--vergeos-template-vm` | `VERGEOS_TEMPLATE_VM` | — | Name of the template VM to clone (required) |
| `--vergeos-network` | `VERGEOS_NETWORK` | — | Name of the network to attach to (required) |
| `--vergeos-cpu-cores` | `VERGEOS_CPU_CORES` | `2` | Number of CPU cores |
| `--vergeos-ram` | `VERGEOS_RAM` | `2048` | RAM in MB |
| `--vergeos-disk-size` | `VERGEOS_DISK_SIZE` | `0` | Primary disk size in GB (0 = keep template size) |
| `--vergeos-userdata` | `VERGEOS_USERDATA` | — | Path to cloud-init user-data file, or inline cloud-config |
| `--vergeos-ssh-user` | `VERGEOS_SSH_USER` | `root` | SSH username |
| `--vergeos-ssh-port` | `VERGEOS_SSH_PORT` | `22` | SSH port |

### Standalone Usage

The driver also works outside of Rancher with Docker Machine directly:

```bash
docker-machine create \
  --driver vergeos \
  --vergeos-host vergeos.example.com \
  --vergeos-api-key your-api-key \
  --vergeos-insecure \
  --vergeos-template-vm ubuntu-2404 \
  --vergeos-network your-network-name \
  --vergeos-ssh-user ubuntu \
  --vergeos-cpu-cores 2 \
  --vergeos-ram 4096 \
  --vergeos-disk-size 30 \
  my-docker-host
```

!!! note "Docker Required for Standalone Use"
    When used as a standalone Docker Machine driver (not through Rancher), the template VM also needs Docker installed, or we can use `--vergeos-userdata` to install it on first boot.

---

## UI Extension

The UI extension adds VergeOS-specific components to the Rancher interface, providing a native experience when creating cloud credentials and configuring machines.

### What It Adds

**Cloud Credential Form** — prompts for:

- VergeOS host URL
- API key (stored as a Rancher secret)
- TLS verification toggle

**Machine Configuration Form** — provides:

- Template VM selector (auto-populated from VergeOS API, filtered to Ubuntu 24.04 VMs with guest agent)
- Network selector (auto-populated from VergeOS VNets)
- CPU cores, RAM, and disk size inputs
- Cloud-init user-data field
- SSH user and port configuration

### Installation

The extension is deployed as a Helm chart into the Rancher cluster:

```bash
helm install vergeos-ui oci://ghcr.io/verge-io/ui-extension-vergeos/charts/vergeos \
  --namespace cattle-ui-plugin-system \
  --create-namespace \
  --version 0.1.0
```

Alternatively, add it via the Rancher **Extensions** page:

1. Navigate to **Extensions** in Rancher
2. Click the **⋮** menu and select **Manage Repositories**
3. Add a new repository with the chart URL
4. Install the **VergeOS Node Driver** extension

!!! info "Compatibility"
    The UI extension requires Rancher v2.10+ and the Rancher Extensions framework v3.x.

---

## Repositories

| Repository | Description |
|------------|-------------|
| [docker-machine-driver-vergeos](https://github.com/verge-io/docker-machine-driver-vergeos){target="_blank"} | Docker Machine / Rancher node driver |
| [ui-extension-vergeos](https://github.com/verge-io/ui-extension-vergeos){target="_blank"} | Rancher UI extension |

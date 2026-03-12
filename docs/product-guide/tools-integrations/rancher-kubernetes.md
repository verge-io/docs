# Rancher and Kubernetes Integration

## Overview

VergeOS provides Kubernetes and [Rancher](https://www.rancher.com/){target="_blank"} integration through a set of open-source components that work together as a full stack. With these tools, we can provision and manage RKE2/K3s clusters on VergeOS infrastructure using standard Kubernetes tooling — with Rancher as the management plane.

The integration consists of four components:

| Component | Type | Version | Purpose |
|-----------|------|---------|---------|
| [Docker Machine Driver](#docker-machine-driver) | Go binary | v1.0.0 | Provisions VergeOS VMs as Kubernetes nodes |
| [Rancher UI Extension](#rancher-ui-extension) | Vue.js / Helm | v0.1.0 | Adds VergeOS cloud credential and machine config to Rancher |
| [CSI Driver](#csi-driver) | Container image | v0.1.0 | Persistent storage for Kubernetes pods via VergeOS vSAN |
| [Cloud Controller Manager](#cloud-controller-manager) | Container image | v0.1.0 | Node lifecycle and load balancer integration |

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

### What We'll Need

- A VergeOS environment with API access
- A Rancher Server installation (v2.10+)
- A template VM with cloud-init installed (Ubuntu 24.04 recommended)
- A VergeOS API key (generated in User Settings)
- `kubectl` and `helm` CLI tools

---

## Docker Machine Driver

The Docker Machine driver is the foundation of the integration. It manages the full VM lifecycle through the VergeOS API — cloning template VMs, injecting SSH keys via cloud-init, and creating machines when clusters are provisioned. When a cluster is removed, the driver automatically deletes the VMs it created.

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

**Recommended:**

- **QEMU guest agent** — enables accurate IP discovery; without it the driver falls back to NIC DHCP lease IPs
- **Ubuntu 24.04** (Noble Numbat) — the recommended template OS

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

## Rancher UI Extension

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

## CSI Driver

The Container Storage Interface (CSI) driver lets Kubernetes pods request and mount VergeOS storage as persistent volumes. It delegates storage operations directly to the VergeOS API, using the vSAN for what it was built for — deduplication, multi-tier placement, and distributed redundancy.

### Storage Backends

The CSI driver supports two backends, both served by a single Go binary:

| Backend | CSI Driver Name | Access Mode | Description |
|---------|----------------|-------------|-------------|
| **NAS** | `csi-nas.verge.io` | ReadWriteMany | EXT4 volumes on VergeOS NAS services, exposed over NFS |
| **Block** | `csi-block.verge.io` | ReadWriteOnce | VM drives hotplugged to VergeOS VMs via the vSAN |

??? note "Why Not Longhorn?"
    Longhorn runs its own replicated storage engine *inside* Kubernetes, layering replication, snapshots, and scheduling on top of the hypervisor. On VergeOS this creates a redundant storage stack:

    - **No double replication** — the vSAN's distributed mirror architecture already provides data redundancy
    - **Inline deduplication** — vSAN dedup is global across the cluster; Longhorn volumes are opaque blobs that can't participate
    - **Multi-tier placement** — volumes land on the correct vSAN tier (NVMe, SSD, HDD) based on the StorageClass
    - **Unified management** — volumes appear in the VergeOS UI alongside VMs, snapshots, and NAS shares

### Prerequisites

1. **Download kubeconfig from Rancher** — navigate to Cluster Management > select our cluster > **⋮** > Download KubeConfig:

    ```bash
    export KUBECONFIG=~/Downloads/<cluster>-kubeconfig.yaml
    kubectl get nodes  # verify access
    ```

2. **Create a pool VM in VergeOS** (for block storage) — create an empty VM named `k8spool`. It never needs to boot; it just holds idle block drives. Look up its ID:

    ```bash
    curl -sk -H "x-yottabyte-token: <API_KEY>" \
      'https://<VERGEOS_HOST>/api/v4/vms?fields=name,$key' | grep k8spool
    ```

    ```
    {"name":"k8spool","$key":65}
    ```

### Installation with Helm

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update

helm install vergeos-csi verge-io/vergeos-csi \
  --namespace kube-system \
  --set vergeos.host=https://<VERGEOS_HOST> \
  --set vergeos.apiKey=<API_KEY> \
  --set block.poolVmId=<POOL_VM_ID>
```

To install only the NAS driver (skip block):

```bash
helm install vergeos-csi verge-io/vergeos-csi \
  --namespace kube-system \
  --set vergeos.host=https://<VERGEOS_HOST> \
  --set vergeos.apiKey=<API_KEY> \
  --set block.enabled=false
```

Verify the installation:

```bash
kubectl -n kube-system get pods | grep csi
kubectl get csidrivers
kubectl get storageclasses
```

### Helm Values

| Value | Default | Description |
|-------|---------|-------------|
| `vergeos.host` | `""` | VergeOS API URL (include `https://`) |
| `vergeos.apiKey` | `""` | VergeOS API key |
| `vergeos.existingSecret` | `""` | Use a pre-created Secret instead |
| `nas.enabled` | `true` | Deploy the NAS driver |
| `nas.storageClass.nasServiceName` | `k8s-nas` | VergeOS NAS service name |
| `nas.storageClass.preferredTier` | `1` | vSAN tier for NAS volumes (1–5) |
| `block.enabled` | `true` | Deploy the Block driver |
| `block.poolVmId` | `0` | VergeOS VM ID to hold idle block drives |
| `block.storageClass.interface` | `virtio-scsi` | VM drive interface type |
| `logLevel` | `5` | klog verbosity (0–10) |

### StorageClass Examples

The Helm chart creates default StorageClasses automatically. Here are the definitions for reference:

```yaml
# NAS StorageClass — ReadWriteMany
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: vergeos-nas
provisioner: csi-nas.verge.io
parameters:
  nasServiceName: "k8s-nas"
  preferredTier: "1"
reclaimPolicy: Delete
volumeBindingMode: Immediate
```

```yaml
# Block StorageClass — ReadWriteOnce
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: vergeos-block
provisioner: csi-block.verge.io
parameters:
  interface: "virtio-scsi"
reclaimPolicy: Delete
volumeBindingMode: Immediate
```

### Using Persistent Volumes

Once the CSI driver is installed, pods can request storage using PersistentVolumeClaims:

```yaml
# NAS volume (shared across pods)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: shared-data
spec:
  accessModes:
    - ReadWriteMany
  storageClassName: vergeos-nas
  resources:
    requests:
      storage: 10Gi
```

```yaml
# Block volume (single pod)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: database-data
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: vergeos-block
  resources:
    requests:
      storage: 50Gi
```

---

## Cloud Controller Manager

The Cloud Controller Manager (CCM) is the standard Kubernetes cloud provider interface for VergeOS. It handles node lifecycle management and load balancer provisioning.

### Features

- **Node Management** — Populates Kubernetes node metadata (provider ID, instance type, internal IPs) from VergeOS VMs. Detects VM existence and power state for node lifecycle management.
- **Load Balancing** — Provisions VergeOS VNet NAT/translate rules for `type: LoadBalancer` Services. Allocates IPs from a configurable pool and maps service ports to node ports automatically.

### Installation with Helm

Basic installation (node management only):

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update

helm install vergeos-ccm verge-io/vergeos-cloud-controller-manager \
  --namespace kube-system \
  --set vergeos.host=<VERGEOS_HOST> \
  --set vergeos.apiKey=<API_KEY>
```

With load balancing enabled (requires a VergeOS VNet network ID and IP pool):

```bash
helm install vergeos-ccm verge-io/vergeos-cloud-controller-manager \
  --namespace kube-system \
  --set vergeos.host=<VERGEOS_HOST> \
  --set vergeos.apiKey=<API_KEY> \
  --set loadBalancer.enabled=true \
  --set loadBalancer.networkID=<VNET_ID> \
  --set 'loadBalancer.ipPool[0]=10.0.0.100' \
  --set 'loadBalancer.ipPool[1]=10.0.0.101'
```

Verify the installation:

```bash
kubectl -n kube-system get pods -l app=vergeos-ccm
kubectl get nodes -o wide  # check for ProviderID and addresses
```

### Helm Values

| Value | Default | Description |
|-------|---------|-------------|
| `vergeos.host` | `""` | VergeOS API host |
| `vergeos.apiKey` | `""` | API key for authentication |
| `vergeos.verifySSL` | `false` | TLS certificate verification |
| `vergeos.existingSecret` | `""` | Use an existing Secret for credentials |
| `loadBalancer.enabled` | `true` | Enable LoadBalancer support |
| `loadBalancer.networkID` | `0` | VNet network ID for load balancer rules |
| `loadBalancer.ipPool` | `[]` | Available load balancer IP addresses |
| `replicaCount` | `1` | Number of replicas |

### How Node Lifecycle Works

The CCM implements the Kubernetes `InstancesV2` interface:

1. **InstanceMetadata** — Resolves a Kubernetes node to a VergeOS VM (by provider ID or name), then returns the provider ID (`vergeos://<vm-id>`), instance type (`<cpu>cpu-<ram>mb`), and internal IP addresses from VM NICs
2. **InstanceExists** — Checks whether the backing VM still exists in VergeOS
3. **InstanceShutdown** — Reports whether the VM is powered off

### How Load Balancing Works

The CCM implements the Kubernetes `LoadBalancer` interface using VergeOS VNet rules:

1. **EnsureLoadBalancer** — Allocates an IP from the pool, then creates a VNet NAT rule per service port. Rules translate `<allocated-ip>:<port>` to `<node-ips>:<nodePort>`. Calls `ApplyRules` to activate.
2. **UpdateLoadBalancer** — Updates the target IPs on existing rules when nodes change
3. **EnsureLoadBalancerDeleted** — Deletes all VNet rules for the service and applies the change

To use a load balancer, create a Service with `type: LoadBalancer`:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
spec:
  type: LoadBalancer
  ports:
    - port: 80
      targetPort: 8080
  selector:
    app: my-app
```

The CCM will automatically allocate an IP from the pool and create the appropriate VNet rules.

---

## Repositories and Resources

| Repository | Description |
|------------|-------------|
| [docker-machine-driver-vergeos](https://github.com/verge-io/docker-machine-driver-vergeos){target="_blank"} | Docker Machine / Rancher node driver |
| [ui-extension-vergeos](https://github.com/verge-io/ui-extension-vergeos){target="_blank"} | Rancher UI extension |
| [helm-charts](https://github.com/verge-io/helm-charts){target="_blank"} | Helm chart repository |

### Container Images

| Image | Version |
|-------|---------|
| `ghcr.io/verge-io/csi-vergeos` | `0.1.0` |
| `ghcr.io/verge-io/vergeos-cloud-controller-manager` | `v0.1.0` |

### Helm Repository

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update
helm search repo verge-io
```

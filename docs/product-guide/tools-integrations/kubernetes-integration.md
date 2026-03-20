# Kubernetes Integration

## Overview

VergeOS provides native Kubernetes integration through a CSI storage driver and a Cloud Controller Manager (CCM). These components connect any Kubernetes cluster running on VergeOS VMs — whether provisioned through [Rancher](rancher-integration.md), kubeadm, or any other method — to the underlying VergeOS platform.

| Component | Type | Version | Purpose |
|-----------|------|---------|---------|
| [CSI Driver](#csi-driver) | Container image | v0.2.0 | Persistent storage for Kubernetes pods via VergeOS vSAN |
| [Cloud Controller Manager](#cloud-controller-manager) | Container image | v0.2.0 | Node lifecycle and load balancer integration |

### Prerequisites

- A Kubernetes cluster running on VergeOS VMs (RKE2, K3s, kubeadm, etc.)
- A VergeOS API key (generated in User Settings)
- `kubectl` and `helm` CLI tools
- Access to the cluster's kubeconfig

### Add the Helm Repository

Both components are installed from the same Helm repository:

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update
```

!!! info "Self-Signed Certificates"
    If the VergeOS environment uses a self-signed certificate, set `vergeos.verifySSL=false` when installing the CSI driver and CCM Helm charts. This is the default, but worth noting if we change it later.

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
    Longhorn runs its own replicated storage engine *inside* Kubernetes, layering replication, snapshots, and scheduling on top of the hypervisor. On VergeOS, the native CSI driver is a better fit:

    - **No double replication** — the vSAN's distributed mirror architecture already provides data redundancy
    - **Inline deduplication** — vSAN dedup is global across the cluster; Longhorn volumes are opaque blobs that can't participate
    - **Multi-tier placement** — volumes land on the correct vSAN tier (NVMe, SSD, HDD) based on the StorageClass
    - **Unified management** — volumes appear in the VergeOS UI alongside VMs, snapshots, and NAS shares

### Prerequisites

1. **Kubeconfig access** — if using Rancher, download the kubeconfig from Cluster Management > select the cluster > **⋮** > Download KubeConfig:

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
helm install vergeos-ccm verge-io/vergeos-cloud-controller-manager \
  --namespace kube-system \
  --set vergeos.host=https://<VERGEOS_HOST> \
  --set vergeos.apiKey=<API_KEY> \
  --set loadBalancer.enabled=false
```

With load balancing enabled (requires a VergeOS VNet network ID and IP pool):

```bash
helm install vergeos-ccm verge-io/vergeos-cloud-controller-manager \
  --namespace kube-system \
  --set vergeos.host=https://<VERGEOS_HOST> \
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

## Cluster Autoscaler

The [Kubernetes Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler){target="_blank"} works with VergeOS-backed clusters provisioned through [Rancher](rancher-integration.md). It automatically adjusts the number of nodes in a pool based on pending pod resource requests — scaling up when pods can't be scheduled and scaling down when nodes are underutilized.

### How It Works

The autoscaler uses Rancher's API to manage node pools:

1. **Scale up** — When pods are pending due to insufficient resources, the autoscaler increases the node pool size. Rancher then uses the Docker Machine driver to provision new VergeOS VMs.
2. **Scale down** — When nodes are underutilized for a configurable period, the autoscaler cordons, drains, and removes them. The driver deletes the backing VergeOS VMs.

### Enabling in Rancher

Cluster autoscaling is configured per node pool in Rancher:

1. Navigate to **Cluster Management** > select the cluster > **Machine Pools**
2. Edit the node pool and enable **Auto Replace** and set min/max node counts
3. The autoscaler respects these bounds when scaling

!!! tip "Resource Requests"
    The autoscaler makes scaling decisions based on pod resource requests, not actual usage. Make sure workloads define `requests` in their pod specs for accurate scaling behavior.

---

## Helm Charts Reference

All VergeOS Kubernetes components are distributed as Helm charts from a single repository.

### Repository Setup

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update
helm search repo verge-io
```

### Available Charts

| Chart | Version | App Version | Kubernetes | Description |
|-------|---------|-------------|------------|-------------|
| `verge-io/vergeos-csi` | `0.2.0` | `0.2.0` | >= 1.16 | CSI driver for NAS (NFS/EXT4) and Block (VM drive) storage |
| `verge-io/vergeos-cloud-controller-manager` | `0.2.0` | `0.2.0` | >= 1.16 | Cloud controller for node lifecycle and load balancing |
| `verge-io/vergeos-node-driver` | `0.1.0` | `1.0.0` | >= 1.16 | Node driver and UI extension for [Rancher](rancher-integration.md) |

### Container Images

| Image | Version |
|-------|---------|
| `ghcr.io/verge-io/csi-vergeos` | `0.2.0` |
| `ghcr.io/verge-io/vergeos-cloud-controller-manager` | `0.2.0` |

### Source

Charts are published to [verge-io/helm-charts](https://github.com/verge-io/helm-charts){target="_blank"} on GitHub Pages.

# Kubernetes Integration

## Overview

VergeOS provides native Kubernetes integration through a CSI storage driver and a Cloud Controller Manager (CCM). These components connect any Kubernetes cluster running on VergeOS VMs — whether provisioned through [Rancher](rancher-integration.md), kubeadm, or any other method — to the underlying VergeOS platform.

| Component | Purpose |
|-----------|---------|
| [CSI Driver](#csi-driver) | Persistent storage for Kubernetes pods via VergeOS vSAN |
| [Cloud Controller Manager](#cloud-controller-manager) | Node lifecycle and load balancer integration |

### Prerequisites

- A Kubernetes cluster running on VergeOS VMs (RKE2, K3s, kubeadm, etc.)
- A VergeOS API key (generated in User Settings)
- `kubectl` and `helm` CLI tools
- Access to the cluster's kubeconfig

!!! info "Self-Signed Certificates"
    If the VergeOS environment uses a self-signed certificate, set `vergeos.verifySSL=false` when installing the CSI driver and CCM Helm charts. This is the default, but worth noting if we change it later.

---

## CSI Driver

The Container Storage Interface (CSI) driver lets Kubernetes pods request and mount VergeOS storage as persistent volumes. It delegates storage operations directly to the VergeOS API, using the vSAN for what it was built for — deduplication, multi-tier placement, and distributed redundancy.

### Storage Backends

The CSI driver supports two backends, both served by a single Go binary:

| Backend | Access Mode | Description |
|---------|-------------|-------------|
| **NAS** | ReadWriteMany | EXT4 volumes on VergeOS NAS services, exposed over NFS |
| **Block** | ReadWriteOnce | VM drives hotplugged to VergeOS VMs via the vSAN |

??? note "Why Not Longhorn?"
    Longhorn runs its own replicated storage engine *inside* Kubernetes, layering replication, snapshots, and scheduling on top of the hypervisor. On VergeOS, the native CSI driver is a better fit:

    - **No double replication** — the vSAN's distributed mirror architecture already provides data redundancy
    - **Inline deduplication** — vSAN dedup is global across the cluster; Longhorn volumes are opaque blobs that can't participate
    - **Multi-tier placement** — volumes land on the correct vSAN tier (NVMe, SSD, HDD) based on the StorageClass
    - **Unified management** — volumes appear in the VergeOS UI alongside VMs, snapshots, and NAS shares

### Block Storage Pool VM

For block storage, create an empty VM in VergeOS named `k8spool`. It never needs to boot — it just holds idle block drives. The VM's ID is passed to the Helm chart during installation.

### Installation

For installation instructions, Helm values, and configuration options, see the CSI driver repository:

[https://github.com/verge-io/vergeos-csi](https://github.com/verge-io/vergeos-csi){target="_blank"}

The chart can also be installed through the **Rancher Apps UI** on downstream clusters — add `https://verge-io.github.io/helm-charts` as a repository, then install from **Charts**.

!!! warning "Downstream Cluster"
    The Helm repository must be added on the **downstream cluster**, not the Rancher management cluster. ClusterRepos do not propagate from the management cluster.

---

## Cloud Controller Manager

The Cloud Controller Manager (CCM) is the standard Kubernetes cloud provider interface for VergeOS. It handles node lifecycle management and load balancer provisioning.

### Features

- **Node Management** — Populates Kubernetes node metadata (provider ID, instance type, internal IPs) from VergeOS VMs. Detects VM existence and power state for node lifecycle management.
- **Load Balancing** — Provisions VergeOS VNet NAT/translate rules for `type: LoadBalancer` Services. Allocates IPs from a configurable pool and maps service ports to node ports automatically.

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

### Installation

For installation instructions, Helm values, and configuration options, see the CCM repository:

[https://github.com/verge-io/vergeos-cloud-controller-manager](https://github.com/verge-io/vergeos-cloud-controller-manager){target="_blank"}

Like the CSI driver, the CCM can also be installed through the Rancher Apps UI on the downstream cluster.

---

## Cluster Autoscaler

The [Kubernetes Cluster Autoscaler](https://github.com/kubernetes/autoscaler/tree/master/cluster-autoscaler){target="_blank"} works with VergeOS-backed clusters provisioned through [Rancher](rancher-integration.md). It automatically adjusts the number of nodes in a pool based on pending pod resource requests — scaling up when pods can't be scheduled and scaling down when nodes are underutilized.

### How It Works

The autoscaler uses Rancher's API to manage node pools:

1. **Scale up** — When pods are pending due to insufficient resources, the autoscaler increases the node pool size. Rancher then uses the Docker Machine driver to provision new VergeOS VMs.
2. **Scale down** — When nodes are underutilized for a configurable period, the autoscaler cordons, drains, and removes them. The driver deletes the backing VergeOS VMs.

!!! tip "Resource Requests"
    The autoscaler makes scaling decisions based on pod resource requests, not actual usage. Make sure workloads define `requests` in their pod specs for accurate scaling behavior.

---

## Helm Charts

All VergeOS Kubernetes components are distributed as Helm charts from a single repository:

```bash
helm repo add verge-io https://verge-io.github.io/helm-charts
helm repo update
helm search repo verge-io
```

For chart versions, values, and detailed installation instructions, see the Helm charts repository:

[https://github.com/verge-io/helm-charts](https://github.com/verge-io/helm-charts){target="_blank"}

## Support

If you encounter issues or have feature requests, please open an issue on the relevant GitHub repository:

- [CSI Driver Issues](https://github.com/verge-io/vergeos-csi/issues){target="_blank"}
- [CCM Issues](https://github.com/verge-io/vergeos-cloud-controller-manager/issues){target="_blank"}
- [Helm Charts Issues](https://github.com/verge-io/helm-charts/issues){target="_blank"}

# VergeOS Product Features

## [Storage](/product-guide/storage/overview)


### [vSAN (VergeFS)](/product-guide/vsan/architecture)

??? "Key Benefits"
    - High-availability, resilient storage
    - integrated directly into your virtualization environment
    - aggregated internal node storage
    - Repair Server
    - Deduplication
    - Automatic Bit-Rot detection/repair

### [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service)

File-level storage and access within your VergeOS system 

??? "Key Benefits"

    - File-level
    - Deduplication for optimized storage
    - Volume-level management for granular access control, snapshot, syncs, etc.
    - Remote volume mounting for migration and backup
    - Active Directory, CIFS and NFS integration -->

---

## [Data Backup/DR/Business Continuity](/product-guide/backup-dr/overview)

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - simple replication of complete systems off-site for DR and business continuity


---

## [Compute](/product-guide/compute-overview)

### Hypervisor 
* Built-in KVM-based hypervisor for tight integration with your networking and storage
* [Remote Console](/product-guide/virtual-machines/vm-remote-console) - full Web-based to control your Virtual machines through a browser

### Orchestration
complete automation of management and coordination of virtual machines to ensure workloads are efficiently deployed, scaled, and maintained - including resource allocation, task scheduling, fault tolerance, auto-scaling, monitoring/reporting, security policies and access controls, live migration.

### Virtualized Resource Assignment (PCI/USB/GPU/vGPU)
Efficiently leverage hardware resources of all types within your workloads: 

* Seamless utilization of [NVIDIA's GRID **vGPU** platform](/product-guide/system/nvigia-vgpu) and direct allocation of [GPU devices](/product-guide/system/generic-pci-passthrough)
* [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough) - harness all types of physical PCI devices within your VMs 
* [SR-IOV NICs](/product-guide/system/sriov-nics) 
* [USB Passthrough](/product-guide/system/usb-passthrough) - provide devices such as drives, security cameras, keyboard/mouse, etc. to your VMs


### Recipes 
VM Recipes provide automation to allow rapid and streamlined workload deployment 
non-persistent disks?


### Import/Export all standard formats VMware integration, VM import volumes

---

## [Tenancy](product-guide/tenants/overview)

Multi-Tenancy provides for allocating a system's resources into isolated, complete, autonomous virtual data centers (VDCs)
Nested Tenancy allows for layers of tenancy where a tenant can allocate portions of their own resources to their child tenants.

---

## Network (VergeFabric)
software-defined networking (SDN) provides streamlined and straightforward network management integrated directly in with your other virtualization components. closely no extra licensing costs, greatly simplifies and streamlines networking management, replaces external appliances and the complexity of integration with those appliances, closely integrated networking allows for straightforward, innate, failover capabilities no SDN licensing fees, network segmentation at the VM, VDC, tenant level
* BGP switch
* firewalls
* routers
* switches
* Integrated network diagnostic tools
* tracing/tracking/rate limiting tools
* DHCP
* DNS
* Proxy?
* VPN
* load balancing?

---

## User management
granular user permissions system
OIDC provider for identity management
Centralize identity management across multiple VergeOS systems


---

## Alerting/Reporting/monitoring
* subscriptions
* extensive dashboards throughout the UI for every facet


---

## Automation
Tenant Recipes
VM Recipes
Task Engine?

---

## Integrations
API-first?
VMware for backups and imports
Inuvika - VDI 
Storware
Terraform
Exporter
Clone import tool

# VergeOS Product Feature List

## Storage

* [vSAN (VergeFS)](/product-guide/vsan/architecture) Integrated, resilient, distributed storage
* [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service) - File-level storage access


## Data Backup/DR/Business Continuity

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - easy replication of complete systems off-site for DR and business continuity


## Compute

* [Virtual Machine Management](/product-guide/virtual-machines) - with the **Built-in KVM-based hypervisor** for tight integration with your networking and storage
* [Remote Console](/product-guide/virtual-machines/vm-remote-console) - full Web-based to control your Virtual machines through a browser
<!-- live migration?? -->
* **Virtualized Resource Assignment (PCI/USB/GPU/vGPU)** - efficiently leverage hardware within your workloads, using: [NVIDIA's GRID vGPU](/product-guide/system/nvigia-vgpu),  [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough), and [USB Passthrough](/product-guide/system/usb-passthrough)
* [VM Recipes](/product-guide/automation/vm-recipes) - templates and automation for rapid, streamlined workload deployment
* [VMware VM Import](/product-guide/virtual-machines/import-from-vmware)
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

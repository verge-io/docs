# VergeOS Product Features

## Storage

* [vSAN (VergeFS)](/product-guide/storage/vsan-architecture) Integrated, resilient, distributed storage
* [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service) - File-level storage access


## Data Backup DR and Business Continuity

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - easy replication of complete systems off-site for DR and business continuity


## Compute

* [Virtual Machine Management](/product-guide/virtual-machines) - embedded **KVM-based hypervisor** for tight integration with your networking and storage
* [Remote Console](/product-guide/virtual-machines/vm-remote-console) - full Web-based to control your Virtual machines through a browser
<!-- live migration?? -->
* **Virtualized Resource Assignment (PCI/USB/GPU/vGPU)** - efficient leveraging of hardware within your workloads, using: [NVIDIA's GRID vGPU](/product-guide/system/nvigia-vgpu),  [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough), and [USB Passthrough](/product-guide/system/usb-passthrough)
* [VM Recipes](/product-guide/automation/vm-recipes) - templates and automation for rapid, streamlined workload deployment
* [VMware VM Imports](/product-guide/virtual-machines/import-from-vmware) - streamlined batch imports from VMware environments
* **Universal VM Imports:** easily import single VMs from individual files [Import from Media Images](/product-guide/virtual-machines/import-from-upload) -OR- bring in larger groups of VMs at once using [NAS VM Imports](/product-guide/virtual-machines/import-from-nas) 
* **VDI:** Golden Image for non-persistent disks, VDI desktop, VDI integration 

## [Tenancy](product-guide/tenants/overview)

* **Multi-Tenancy** allows you to allocate system resources into isolated, complete, autonomous virtual data centers (VDCs) called [Tenants](/product-guide/tenants/overview)
* **Nested Tenancy** provides for layers of tenancy where a tenant can allocate portions of their own resources to their child tenants.
* **Automated Tenancy Deployment** [Tenant Recipes](/product-guide/automation/te) can refine and simplify tenant creation down to just a few clicks.
* **Tenant-level reporting for billing** allows you to track and bill individual customers, business groups, or projects running in individual tenant systems 

## Network (VergeFabric)

* Software-defined networking (SDN) provides streamlined and straightforward network management integrated directly in with your compute and storage.
* Micro Segmentation
* BGP switch
* Firewalls
* Routers
* Switches
* Integrated Network Diagnostics
* Tracing/Rate limiting
* DHCP
* DNS
* Proxy
* VPN
* load balancing?

---

## User management
granular user permissions system
multifactor authentication
OIDC provider for identity management
Centralize identity management across multiple VergeOS systems

## Alerting/Reporting/monitoring
* subscriptions
* extensive dashboards throughout the UI for every facet
* 

## Automation
Tenant Recipes
VM Recipes
Task Engine?

## Integrations
API-first?
VMware for backups and imports
Inuvika - VDI 
Storware
Terraform
Exporter
Clone import tool

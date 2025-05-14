# VergeOS Product Features

## Storage

* [vSAN (VergeFS)](/product-guide/storage/vsan-architecture) - Integrated, resilient, distributed storage
* [Media Images](/product-guide/storage/uploading-files-to-vsan) - upload and manage individual ISO, disk images, etc
* [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service) - File-level storage access


## Data Backup DR and Business Continuity

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - easy replication of complete systems off-site for DR and business continuity


## Compute

* [Virtual Machine Management](/product-guide/virtual-machines) - embedded **KVM-based hypervisor** for tight integration with your networking and storage
* [Remote Console](/product-guide/virtual-machines/vm-remote-console) - full Web-based to control your Virtual machines through a browser
<!-- live migration?? -->
* **Virtualized Resource Assignment (PCI/USB/GPU/vGPU)** - efficient leveraging of hardware within your workloads, using: [NVIDIA's GRID vGPU](/product-guide/system/nvigia-vgpu), [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough), and [USB Passthrough](/product-guide/system/usb-passthrough)
* [VM Recipes](/product-guide/automation/vm-recipes) - templates and automation for rapid, streamlined workload deployment
* [VMware VM Imports](/product-guide/virtual-machines/import-from-vmware) - streamlined batch imports from VMware environments
* **Universal VM Imports:** easily import single VMs from individual files [Import from Media Images](/product-guide/virtual-machines/import-from-upload) -OR- bring in larger groups of VMs at once using [NAS VM Imports](/product-guide/virtual-machines/import-from-nas) 
* **VDI** - embedded basic VDI desktop features and [**Enterprise-level VDI Integration (Inuvika)**](/product-guide/tools-integrations/inuvika)
* **Golden VM Images** - [**Non-persistent VM Drives**] provide a "master copy" of a pre-configured, standard templates that can be used for compliancy, security and managment optimization

## [Tenancy](product-guide/tenants/overview)

* **Multi-Tenancy** allows you to allocate system resources into isolated, complete, autonomous virtual data centers (VDCs) called [Tenants](/product-guide/tenants/overview)
* **Nested Tenancy** provides for layers of tenancy where a tenant can allocate portions of their own resources to their child tenants.
* **Automated Tenancy Deployment** [Tenant Recipes](/product-guide/automation/te) simplified, expedited tenant creation down to just a few clicks.
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


## User management
* **Granular user permissions** -
* **Multifactor authentication (mfa)** -
* **OIDC identity management** - Centralize identity management across multiple VergeOS systems
* **Third-party Identity integration** - 

## Alerting/Reporting/monitoring
* **Scheduled and Event-based Notifications** - [**Subscriptions**](/product-guide/system/subscriptions) to send reports and alerts to appropriate personnel
* **Dashboards** - an extensive [UI dashboard hierarchy]([product-guide/intro/ui-overview) starting at a system overview and allowing you to click through wherever you need to see more and more detail.

## Automation
* **Automated Workload Deployment** - [VM Recipes](/product-guide/automation/vm-recipes) - provide automation for rapid, streamlined workload deployment
* **Automated Tenant Deployment** - [Tenant Recipes](/product-guide/automation/te) allow simplified expedited tenant creation down to just a few clicks.
* **Self-executing Routines** - [Create Tasks](/product-guide/automation/create-tasks) to trigger automatic operations based on schedule or events 
* [**VergeOS API**](/knowledge-base/verge-api-guide) - API-first design provides ability for automating any VergeOS task

## Integrations
* [**VergeOS API**](/knowledge-base/verge-api-guide) - integrate with external solutions (e.g. ticketing, billing, alerting, etc.)
* [**VMware Connector**](/knowledge-base/vmwarebackupdrguide) - backup and/or migration of VMware workloads into VergeOS
* [**Inuvika**](/product-guide/tools-integrations/inuvika) - comprehensive Virtual desktop Infrastructure (VDI)
* [**Storware**](/product-guide/tools-integrations/storware-backup-recovery) - enterprise policy-based backups of VMs
* [**Terraform Provider**](/product-guide/tools-integrations/terraform-provider) - manage VergeOS as part of infrastructure-as-code (IaC) workflows
* [**Export Volumes**](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio) allow easily extracting VMs for third-party backup or other purposes
* [**VergeOS Clone Utility**](/knowledge-base/importing-a-physicalvirtual-machine-into-verge.io) for **universal import capability** of physical or virtual machines into VergeOS

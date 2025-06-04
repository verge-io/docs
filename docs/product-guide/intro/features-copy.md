# VergeOS Product Features

## Storage

* [**vSAN (VergeFS)**](/product-guide/storage/vsan-architecture) - Integrated, resilient, distributed storage
* [**Media Images**](/product-guide/storage/uploading-files-to-vsan) - convenient upload and management of individual ISOs, disk images, etc
* [**NAS (Network Attached Storage) Service**](/product-guide/nas/nas-service) - File-level storage and access


## Data Backup DR and Business Continuity

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - save recovery points of your system and individual tenants/VMs/NAS volumes
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - efficient replication of complete systems off-site for DR and business continuity


## Compute

* **Virtual Machine Management** embedded **KVM-based hypervisor**- tight integration with your networking and storage
* [**Remote Console**](/product-guide/virtual-machines/vm-remote-console) - full control of your workloads through a standard browser
* [**Live VM Migrations**](/product-guide/virtual-machines/live-migrations/#vm-live-migrations) - move running VMs between nodes without service interruption.  The system automatically handles VM migrations during maintenance, updates, and after hardware failures (given sufficient resources on alternate nodes). [Manual VM Migrations](/product-guide/virtual-machines/vm-manual-migration) can also be performed when needed.
* [**Virtualized Resource Assignment (Device Passthrough)**](/product-guide/system/device-pass-overview) - efficient leveraging of hardware within your workloads, using: [NVIDIA's GRID vGPU](/product-guide/system/nvidia-vgpu), [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough), [SRIOV NICs](/product-guide/system/sriov-nics) and [USB Passthrough](/product-guide/system/usb-passthrough)
* [**VM Recipes**](/product-guide/automation/vm-recipes) - templates and automation for rapid, streamlined workload deployment
* [**VMware VM Imports**](/product-guide/virtual-machines/import-from-vmware) - streamlined batch imports from VMware environments
* **Universal VM Import Tools**: easily import physical or virtual machines using the [**VergeOS Clone Utility**](/knowledge-base/importing-a-physicalvirtual-machine-into-verge.io), bring in single VMs from individual files by [Importing from Media Images](/product-guide/virtual-machines/import-from-upload), or bring in larger groups of VMs at once using [NAS VM Imports](/product-guide/virtual-machines/import-from-nas)
* [**Embedded VDI Desktop**](/product-guide/virtual-machines/vdi-overview) and [**Enterprise-level VDI Integration (Inuvika)**](/product-guide/tools-integrations/inuvika)
* [**Golden VM Images (Non-persistent VM Drives)**](/knowledge-base/making-a-nonpersistent-vm) provide a "master copy" of pre-configured, VM drives that can be used for compliancy, security and management optimization

## Tenancy

* **Multi-Tenancy** allows you to allocate system resources into isolated, complete, autonomous virtual data centers (VDCs) called [**Tenants**](/product-guide/tenants/overview)
* **Nested Tenancy** provides for layers of tenancy where a tenant can allocate portions of their resources to create their own child tenants.
* [**Tenant Recipes**](/product-guide/automation/tenant-recipes) simplified, expedited tenant creation
* [**Tenant-level Reporting for Billing**](/product-guide/tenants/tenant-usagereports) to track and bill per each customer, business group, or project running in individual tenant systems 

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
* [**Granular User Permission System**](/product-guide/system/permissions) allows precise access control
* [**Multifactor authentication (mfa)**](/product-guide/auth/multifactor-auth) provides additional security for user logins
* [**OIDC identity management**](/product-guide/auth/oidc-apps-overview) supports centralized identity management across multiple VergeOS systems
* [**Third-party Identity integration**](product-guide/auth/overview) enables you to utilize Oauth2 management systems such as Okta, Gitlab, Azure AD/Entra, and Google to control logins

## Alerting/Reporting/monitoring
* **Scheduled and Event-based Notifications** - [**Subscriptions**](/product-guide/system/subscriptions) to send reports and alerts to appropriate personnel
* **Dashboards** - an extensive [UI dashboard hierarchy]([product-guide/intro/ui-overview) starting at a system overview and allowing you to click through wherever you need to see more and more detail.


## Automation
* **Automated Workload and VDC Deployment** - [**VergeOS Recipes**](/product-guide/automation/recipes-overview) provide automation for rapid, streamlined deployment of workloads and entire Virtual Data Centers (tenants)
* **Self-executing Routines** - [**VergeOS Task Engine**](/product-guide/automation/create-tasks) allows you to trigger automatic operations based on a schedule or events 
* **API-First Design** - The [**VergeOS API**](/knowledge-base/verge-api-guide) empowers you to automate any VergeOS task

## Integrations
* [**VergeOS API**](/knowledge-base/verge-api-guide) - integrate with external solutions (e.g. ticketing, billing, alerting, etc.)
* [**VMware Connector**](/knowledge-base/vmwarebackupdrguide) - backup and/or migration of VMware workloads into VergeOS
* [**Inuvika**](/product-guide/tools-integrations/inuvika) - comprehensive Virtual desktop Infrastructure (VDI)
* [**Storware**](/product-guide/tools-integrations/storware-backup-recovery) - enterprise policy-based backups of VMs
* [**Terraform Provider**](/product-guide/tools-integrations/terraform-provider) - manage VergeOS as part of infrastructure-as-code (IaC) workflows
* [**Export Volumes**](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio) allow easily extracting VMs for third-party backup or other purposes


# VergeOS Product Features

## Storage

**[Overview](/product-guide/storage/overview)** - Get familiar with VergeOS storage features

* [vSAN (VergeFS)](/product-guide/storage/vsan-architecture) - Utilize integrated, resilient, distributed storage
* [Media Images](/product-guide/storage/uploading-files-to-vsan) - Easily upload and manage your individual ISOs, disk images, logos, and more
* [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service) - Establish file-level storage and access on your VergeFS distributed storage


## Backup and Disaster Recovery (BC/DR)

[Overview](/product-guide/backup-dr/overview) - Learn about VergeOS Backup and Recovery features

* [Snapshots](/product-guide/backup-dr/snapshots-overview) - Protect your data and operations with recovery points for the entire system and individual tenants/VMs/NAS volumes
* [Site Syncs](/product-guide/backup-dr/sync-configuration) - Replicate recovery points of your complete system off-site for BC/DR and 


## Compute (VergeHV)

[Virtual Machine Management](product-guide/virtual-machines/vm-management) - Explore how the VergeHV hypervisor can simplify your workload deployments and day-to-day operations

* [Remote Console](/product-guide/virtual-machines/vm-remote-console) - Obtain real-time, in-guest access to your workloads directly from the VergeOS unified user interface
* [Live VM Migrations](/product-guide/virtual-machines/live-migrations/#vm-live-migration) - Realize VergeOS resiliency that automatically handles VM migrations during maintenance, updates, and after hardware failures (sufficient resources required). 
* [Manual VM Migrations](/product-guide/virtual-machines/vm-manual-migration) - Manually move workloads when needed
* [Virtualized Resource Assignment (Device Passthrough)](/product-guide/system/device-pass-overview) - Efficiently leverage special hardware within your virtual machines:

    - [NVIDIA's GRID vGPU](/product-guide/system/nvidia-vgpu)
    - [Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough)
    - [SRIOV NICs](/product-guide/system/sriov-nics)
    - [USB Passthrough](/product-guide/system/usb-passthrough)
    
* [VM Recipes](/product-guide/automation/vm-recipes) - templates and automation for rapid, streamlined workload deployment
* [Embedded VDI Desktop](/product-guide/virtual-machines/vdi-overview) and [ Enterprise-level VDI Integration (Inuvika)](/product-guide/tools-integrations/inuvika)
* [Golden VM Images (Non-persistent VM Drives)](/knowledge-base/making-a-nonpersistent-vm) to utilize a "master copy" of pre-configured, VM drives that can be used for compliancy, security and management optimization


## VM Imports

* [VMware VM Imports](/product-guide/virtual-machines/import-from-vmware) - streamlined batch imports from VMware environments
* [VergeOS Clone Utility](/knowledge-base/importing-a-physicalvirtual-machine-into-verge.io) - easy import of physical or virtual machines from a bootable utility
* [Import from Media Images](/product-guide/virtual-machines/import-from-upload) - individual VM disk and configuration file uploads to VergeFS for import
* [NAS VM Imports](/product-guide/virtual-machines/import-from-nas) - convenient, large-batch VM imports (non-VMware)


## Tenancy

Native, nested, multi-tenancy allows you to subdivide system resources into multiple, secure and autonomous VDCs called Tenants that can further divide their resources to create subtenants of their own.     

* [Tenants](product-guide/tenants/overview) - secure segregation of customers, business groups, or individual projects
* [Tenant Recipes](/product-guide/automation/tenant-recipes) - streamlined, expedited tenant creation
* [Tenant-level Reporting for Billing](/product-guide/tenants/tenant-usagereports) resource tracking per tenant to facilitate billing, auditing, and/or planning purposes 

## Network (VergeFabric)

[VergeFabric](/product-guide/networks/overview) - streamlined and straightforward network management to your VergeOS environment
VergeFabric includes embedded network management to replace **DHCP and DNS servers, firewalls, routers, switches, and load balancers**  

### Additional Networking Features:
  * [Rules](/product-guide/networks/network-rules) - advanced control at each network with **static routes, translations(NAT/PAT), and security policies (accept/reject/drop)** 
  * [VPN](/product-guide/vpn/vpn-overview) - integrated, secure remote access and site-to-site connections using WireGuard and IPsec 
  * [Micro Segmentation](/knowledge-base/) - isolation available at the VDC(tenant) level and the individual workload(VM)
  * [Statistic Tracking](/product-guide/networks/tracking-net-statistics) - granular network tracking options per network rule
  * [Integrated Network Diagnostics](/product-guide/networks/net-diagnosticss) - convenient and comprehensive network troubleshooting tools for every network
  * [Port Mirroring](/product-guide/networks/port-mirroring) - option to duplicate all of a network's traffic to a VM for in-depth monitoring or analysis


## User management
* [Granular User Permission System](/product-guide/system/permissions) - precise access controls
* [Multifactor authentication (MFA)](/product-guide/auth/multifactor-auth) - additional security optins for user logins
* [OIDC identity Management](/product-guide/auth/oidc-apps-overview) - centralized user identity administration across multiple VergeOS systems
* [Third-party Identity integration](product-guide/auth/overview) - options for Oauth2 management systems such as Okta, Gitlab, Azure AD/Entra, and Google to control logins

## Monitoring Reporting and Alerting
* [Comprehensive Dashboard System]([product-guide/intro/ui-overview) - intuitive user interface with system overview at a glance and seamless access to deeper insights as needed
* [Subscriptions](/product-guide/system/subscriptions) automated alerts and reports to appropriate personnel or external monitoring systems
* [Third-Party Log Support](/knowledge-base/system-logs/#enabling-3rd-party-logging) - for transmitting VergeOS log data to external log management solutions, e.g. Graylog


## Automation
* [VergeOS Recipes](/product-guide/automation/recipes-overview) - tools to create accelerated, systematic workload and VDC deployments
* [VergeOS Task Engine](/product-guide/automation/create-tasks) - utility to define automatic operations based on schedule or specific events 
* [API-First Design](/knowledge-base/verge-api-guide) - to automate any VergeOS task 

## Integrations

* [VMware Connector](/knowledge-base/vmwarebackupdrguide) - backup and/or migration of VMware workloads into VergeOS
* [Inuvika](/product-guide/tools-integrations/inuvika) - comprehensive Virtual desktop Infrastructure (VDI)
* [Storware](/product-guide/tools-integrations/storware-backup-recovery) - enterprise policy-based backups of VMs
* [Terraform Provider](/product-guide/tools-integrations/terraform-provider) - management of VergeOS as part of infrastructure-as-code (IaC) workflows
* [Export Volumes](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio) - easy extraction of VMs for third-party backup or other purposes
* [VergeOS API](/knowledge-base/verge-api-guide) - automation and integration with external solutions (e.g. ticketing, billing, alerting, etc.)

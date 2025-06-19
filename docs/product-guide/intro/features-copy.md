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
    
* [VM Recipes](/product-guide/automation/vm-recipes) - Automate and streamline your workload deployments

* [Embedded VDI Desktop](/product-guide/virtual-machines/vdi-overview) - use built-in VDI functionality to provide VDI desktops

* [Enterprise-level VDI Integration (Inuvika)](/product-guide/tools-integrations/inuvika) - Leverage Inuvika-VergeOS integration for advanced enterprise VDI functionality

* [Golden VM Images (Non-persistent VM Drives)](/knowledge-base/making-a-nonpersistent-vm) Standardize VM deployments using a "master copy" of pre-configured VM drives to use for compliancy, security, and management optimization

## VM Imports

* [VMware VM Imports](/product-guide/virtual-machines/import-from-vmware) - Import entire VMware workload environments non-disruptively
* [VergeOS Clone Utility](/knowledge-base/importing-a-physicalvirtual-machine-into-verge.io) - Import individual physical or virtual machines with a convenient, highly-compatible bootable utility
* [Import from Media Images](/product-guide/virtual-machines/import-from-upload) - Upload individual VM disk and configuration file to VergeFS for importing workloads
* [NAS VM Imports](/product-guide/virtual-machines/import-from-nas) - Perform large-batch VM imports (non-VMware)

## Tenancy

[Overview](/product-guide/tenants/overview) - Discover how VergeOS nested multi-tenancy can help you create segregated and secure enclaves within your system for different customers, business groups, and projects.

* [Tenant Recipes](/product-guide/automation/tenant-recipes) - Accelerate and standardize tenant deployment for efficiency, compliancy and self-serve systems
* [Tenant-level Reporting for Billing](/product-guide/tenants/tenant-usagereports) resource tracking per tenant to facilitate billing, auditing, and/or planning purposes
* [Tenant Snapshots](/product-guide/tenants/tenant-snapshots)

## Network (VergeFabric)

[Overview](/product-guide/networks/overview) - Discover the benefits of VergeFabric, embedded software defined networking (SDN) for simplified and flexible network managment

* [Micro Segmentation](/knowledge-base/) - Segment and isolate workloads at the VDC(tenant) level, by groups or at the individual workload(VM)
* [Rules](/product-guide/networks/network-rules) - Use rules for very precise control of traffic for each virtual network **[static routes, translations(NAT/PAT), and security policies (accept/reject/drop)]**
* [Track Traffic](/product-guide/networks/tracking-net-statistics) - Monitor and analyze network tracking  network rule
* [VPN](/product-guide/vpn/vpn-overview) - Establish secure-tunnel remote access and site-to-site connections using WireGuard and IPsec
* [Integrated Network Diagnostics](/product-guide/networks/net-diagnosticss) - Utilize convenient and comprehensive network troubleshooting tools for each network directly from the VergeOS dashboard
* [Port Mirroring](/product-guide/networks/port-mirroring) - Duplicate all of a network's traffic to a VM for in-depth monitoring or analysis

## User management

* [Granular User Permission System](/product-guide/system/permissions) - Configure precise access controls to all your VergeOS assets
* [Multifactor authentication (MFA)](/product-guide/auth/multifactor-auth) - Ensure only authorized users access your systems and data by requiring an added layer of authentication
* [OIDC identity Management](/product-guide/auth/oidc-apps-overview) - Centralize user identity administration across multiple VergeOS systems
* [Third-party Identity integration](product-guide/auth/overview) - Leverage your existing Oauth2 management systems such as Okta, Gitlab, Azure AD/Entra, Google  Cloud Identify for VergeOS logins

## Monitoring Reporting and Alerting

* [Comprehensive Dashboard System]([product-guide/intro/ui-overview) - intuitive user interface with system overview at a glance and seamless access to deeper insights as needed
* [Subscriptions](/product-guide/system/subscriptions) Create customized and automated alerts and reports to appropriate personnel or external monitoring systems
* [Third-Party Log Support](/knowledge-base/system-logs/#enabling-3rd-party-logging) - Automatically transmit VergeOS log data to external log management solutions, e.g. Graylog


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

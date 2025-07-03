# VergeOS Platform Capabilities

## Overview

This comprehensive guide outlines all major capabilities available in the VergeOS platform. Each section provides an overview of key features with links to detailed implementation guides.

Whether you're evaluating VergeOS for your organization or planning your implementation, this guide serves as your roadmap to understanding what's possible with the platform. This guide assumes you're familiar with core VergeOS concepts like Virtual Data Centers (VDCs), the unified architecture, and basic terminology. If you're new to VergeOS, start with [What is VergeOS](/product-guide/intro/what-is-vergeos) to build your foundational understanding.

---

## Distributed Storage (VergeFS)

**[Get an overview of VergeOS storage solutions →](/product-guide/storage/overview)**

* **[vSAN (VergeFS)](/product-guide/storage/vsan-architecture)** - Utilize integrated, resilient, distributed storage with global deduplication and automatic tiering
* **[Media Images](/product-guide/storage/uploading-files-to-vsan)** - Easily upload and manage your individual ISOs, disk images, logos, and other files
* **[NAS (Network Attached Storage) Service](/product-guide/nas/overview)** - Establish file-level storage and access on your VergeFS distributed storage

## Backup and Disaster Recovery (BC/DR)

**[Learn about VergeOS Backup and Recovery features →](/product-guide/backup-dr/overview)** 

* **[Snapshots](/product-guide/backup-dr/snapshots-overview)** - Protect your data and operations with restore points for the entire system and individual tenants/VMs/NAS volumes
* **[Site Syncs](/product-guide/backup-dr/sync-configuration)** - Replicate copies of your complete system off-site, ready for quick recovery

## Compute Virtualization (VergeHV)

**[Discover simplified workload deployment and administration →](/product-guide/virtual-machines/overview)**

* **[Remote Console](/product-guide/virtual-machines/vm-remote-console)** - Obtain real-time, in-guest access to your workloads directly from the VergeOS unified user interface
* **[Live VM Migrations](/product-guide/virtual-machines/live-migrations/#vm-live-migration)** - Understand VergeOS resiliency that automatically handles VM migrations during maintenance, updates, and after hardware failures (sufficient resources required)
* **[Manual VM Migrations](/product-guide/virtual-machines/vm-manual-migration)** - Manually move workloads as needed for optimal resource utilization
* **[Resource Assignment (Device Passthrough)](/product-guide/system/device-pass-overview)** - Efficiently leverage host hardware within your virtual machines:
    - **[NVIDIA vGPU](/product-guide/system/nvidia-vgpu)** - Virtualize GPU resources for high-performance computing workloads
    - **[Direct PCI Passthrough](/product-guide/system/generic-pci-passthrough)** - Provide VMs with direct access to physical hardware devices
    - **[SRIOV NICs](/product-guide/system/sriov-nics)** - Enable high-performance network virtualization with hardware acceleration
    - **[USB Passthrough](/product-guide/system/usb-passthrough)** - Connect physical USB devices directly to virtual machines
* **[VM Recipes](/product-guide/automation/vm-recipes)** - Automate and streamline your workload deployments with customizable templates
* **[Golden VM Images (Non-persistent VM Drives)](/knowledge-base/making-a-nonpersistent-vm)** - Standardize VM deployments using a "master copy" of pre-configured VM drives for compliance, security, and management optimization
* **[Embedded VDI Desktop](/product-guide/virtual-machines/vdi-overview)** - Use built-in VDI functionality to provide virtual desktops

!!! tip "VDI Integration"
    **[Inuvika Integration with VergeOS](/product-guide/tools-integrations/inuvika)** provides complimentary, advanced VDI functionality in conjunction with VergeOS efficient virtualization.

## Importing Existing Workloads into VergeOS

**[Determine your best method for migrating workloads from other platforms →](/product-guide/virtual-machines/vm-migration-overview)**

* **[VMware VM Imports](/product-guide/virtual-machines/import-from-vmware)** - Import entire VMware workload environments non-disruptively
* **[VergeOS Clone Utility](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio)** - Conveniently import individual physical or virtual machines with this highly-compatible bootable utility
* **[Import from Media Images](/product-guide/virtual-machines/import-from-upload)** - Upload individual VM disk and configuration files (e.g., vmdk/vhd/vhdx, ovf/ova, qcow/qcow2, vmx, raw) to VergeFS for importing workloads
* **[NAS Volume Imports](/product-guide/virtual-machines/import-from-nas)** - Perform individual or batch VM imports directly from source storage

!!! tip "Enterprise Integration"
    **[Cirrus Data Integration with VergeOS](/product-guide/tools-integrations/cirrus-data)** - Cirrus-VergeOS integration provides auxiliary tools that automate and accelerate large-scale imports to VergeOS from any cloud or on-premises platform.

## Multi-Tenancy

Tenants allow you to segregate system resources into secure enclaves for different customers, business groups, and projects  

**[Explore How to Use Tenants →](/product-guide/tenants/overview)**

* **[Tenant Recipes](/product-guide/automation/tenant-recipes)** - Accelerate and standardize tenant deployment for efficiency, compliance, and self-serve systems
* **[Tenant-level Reporting for Billing](/product-guide/tenants/tenant-usagereports)** - Track resource usage per tenant to facilitate billing, auditing, and/or planning purposes
* **[Tenant Snapshots](/product-guide/tenants/tenant-snapshots)** - Restore any tenant from your complete-system cloud snapshot; while each tenant can also have the ability to control their own individual snapshot and retention schedule

## Software-Defined Networking (VergeFabric)

VergeFabric delivers software-defined networking (SDN) for simplified and flexible network management

**[Get Familiar with VergeFabric Basics →](/product-guide/networks/overview)**

* **[Virtual Networks](/product-guide/networks/internal-networks)** - Create up to thousands of virtual networks and optionally use embedded IP management for DHCP, DNS, firewall, routing, NAT/PAT
* **[Micro Segmentation](/knowledge-base/how-to-achieve-network-micro-segmentation-on-vergeos)** - Segment and isolate workloads at the VDC (tenant) level, by groups or at the individual workload (VM) level
* **[Fine-tuned Network Control (Rules)](/product-guide/networks/network-rules)** - Use network rules for very precise control of traffic at each virtual network (routes, translations (NAT/PAT), and security policies)
* **[Granular Traffic Monitoring](/product-guide/networks/tracking-net-statistics)** - Measure and analyze network traffic per network rule for performance optimization
* **[VPN](/product-guide/vpn/vpn-overview)** - Establish secure-tunnel remote access and site-to-site connections using WireGuard and IPsec
* **[Integrated Network Diagnostics](/product-guide/networks/net-diagnostics)** - Utilize convenient and comprehensive network troubleshooting tools for each network, directly from the VergeOS dashboard
* **[Port Mirroring Option](/product-guide/networks/port-mirroring)** - Duplicate all of a network's traffic to a VM for in-depth monitoring or analysis with your tool of choice

## User Management

* **[Granular User Permissions](/product-guide/system/permissions)** - Configure precise access control for all your VergeOS assets with role-based permissions
* **[Multifactor Authentication (MFA)](/product-guide/auth/multifactor-auth)** - Ensure only authorized users access your systems and data by requiring an added layer of authentication
* **[OIDC Identity Management](/product-guide/auth/oidc-apps-overview)** - Centralize user identity administration across multiple VergeOS systems
* **[Third-party Identity Integration](/product-guide/auth/auth-sources-overview)** - Employ your existing OAuth2 management systems (such as Okta, GitLab, Azure AD/Entra, or Google Cloud Identity) for VergeOS logins

## Monitoring and Alerting

* **[Comprehensive Dashboard System](/product-guide/ui-overview)** - Gain operational oversight of your entire system from VergeOS's intuitive, overview-to-detail dashboard navigation model
* **[Subscriptions](/product-guide/system/subscriptions-overview)** - Create customized, automated alerts and reports to be delivered to appropriate personnel and/or external monitoring systems
* **[Third-Party Log Support](/knowledge-base/system-logs/#enabling-3rd-party-logging)** - Automatically forward VergeOS log data, in your preferred format, to external log management solutions, such as Graylog

## Automation

* **[VergeOS Recipes](/product-guide/automation/recipes-overview)** - Create customizable templates for accelerated workload and VDC deployments while enforcing important policies
* **[VergeOS Task Engine](/product-guide/automation/create-tasks)** - Establish automatic operations to trigger based on schedule and/or events for streamlined operations
* **[API-First Design](/knowledge-base/verge-api-guide)** - Optimize operations with programmatic automation of VergeOS functions through comprehensive RESTful APIs

## Integrations

* **[Cirrus Data Integration with VergeOS](/product-guide/tools-integrations/cirrus-data)** - Harness enterprise integration for highly automated and accelerated large-scale transitions from other platforms
* **[VMware Connector](/knowledge-base/vmwarebackupdrguide)** - Backup VMware workloads to VergeOS resilient storage for BC/DR purposes or for import
* **[Inuvika](/product-guide/tools-integrations/inuvika)** - Leverage the advantages of VergeOS combined with Inuvika's advanced virtual desktop infrastructure (VDI) features
* **[Storware](/product-guide/tools-integrations/storware-backup-recovery)** - Utilize Storware integration to layer additional enterprise backup functionality and/or comply with mandatory third-party backup requirements
* **[Terraform Provider](/product-guide/tools-integrations/terraform-provider)** - Manage VergeOS as part of your infrastructure-as-code (IaC) workflows
* **[Export Volumes](/knowledge-base/configuring-a-vm-export-volume)** - Easily extract VergeOS VMs for third-party backup, compliance, or migration purposes
* **[VergeOS API](/knowledge-base/verge-api-guide)** - Integrate with external systems, such as ticketing, billing, or alerting to streamline workflows with VergeOS's developer-ready, complete-access API

## Getting Started

New to implementing VergeOS features? We recommend this learning path:

1. **Core Infrastructure Setup** - Configure VergeFS storage, VergeFabric networking, and VergeHV compute resources
2. **Virtual Machine Deployment** - Create your first VMs and explore migration options from existing platforms
3. **Multi-Tenancy Implementation** - Set up isolated tenant environments for different use cases or customers
4. **Data Protection Configuration** - Implement snapshots, backup, and disaster recovery processes
5. **Integration and Automation** - Leverage APIs, recipes, and third-party integrations to optimize operations

Each capability builds on the previous ones, ensuring a solid foundation for your VergeOS deployment. For detailed implementation guidance, follow the links throughout this guide to access step-by-step instructions and best practices.

---

Ready to dive deeper into VergeOS? Each section above provides direct links to comprehensive implementation guides that will help you make the most of your VergeOS platform.

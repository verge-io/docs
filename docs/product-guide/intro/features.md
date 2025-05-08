# VergeOS Product Features

## [Storage](/product-guide/storage/overview)


### [vSAN (VergeFS)](/product-guide/vsan/architecture)

 High-availability, resilient storage integrated directly into your virtualization environment with aggregated internal node storage. 

??? "Key Benefits"

    - Repair Server
    - Deduplication
    - Automatic Bit-Rot detection/repair

### [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service)

File-level storage and access within your VergeOS system 

??? "Key Benefits"

    - Deduplication for optimized storage
    - Volume-level management for granular access control, snapshot, syncs, etc.
    - Remote volume mounting for migration and backup
    - Active Directory, CIFS and NFS integration -->

---

## [Data Backup/DR/Business Continuity](/product-guide/backup-dr/overview)

### [Snapshots](/product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
### [Site Syncs](/product-guide/backup-dr/sync-configuration) - simple replication of complete systems off-site for DR and business continuity


---

## [Compute](/product-guide/compute-overview)

### Built-in KVM-based Hypervisor for tight integration with your networking and storage
### Full Web-based [Remote Console](/product-guide/virtual-machines/vm-remote-console) for controlling VMs through a browser
### Orchestration
resource allocation
task scheduling
fault tolerance
auto-scaling 
security policies, access controls
monitoring and reporting
live migration

### Virtualized resource assignment - gpu, pci devices, usb


* Workload deployment automation - VM Recipes and Cloning
non-persistent disks?
* import/export all standard formats VMware integration, VM import volumes

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

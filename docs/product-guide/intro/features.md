# VergeOS Product Features

## Storage

### [vSAN (VergeFS)](/product-guide/vsan)

 High-availability, resilient storage integrated directly into your virtualization environment with aggregated internal node storage. 

 * Repair Server
 * Deduplication
 * Automatic Bit-Rot detection/repair

### [NAS (Network Attached Storage) Service](/product-guide/nas/nas-service)

File-level storage and access within your VergeOS system 

  * Fully integrated management interface
  * Deduplication for optimized storage
  * Volume-level management for granular access control, snapshot, syncs, etc.
  * Remote volume mounting for migration and backup
  * Active Directory, CIFS and NFS integration

## Backup and Disaster Recovery

Simplified backup and DR for rapid, reliable data/system recovery

  * [Snapshots](product-guide/backup-dr/snapshots-overview) - recovery points at the tenant, VM, NAS, volume level, and entire system level.
  * The [Sync Engine](product-guide/backup-dr/sync-configurations) for simple replication of complete systems off-site for DR and business continuity


## Compute
* Hypervisor Complete virtualization management -- strong security, superior performance provides flexibility works hand-in-hand with your storage and netowrking for ease of use<!-- check marketing docs for more info>
full-featured hypervisor
* orchestration capabilites - task manager, etc.
* virtualized resource assignment - gpu, pci devices, usb
* workload deployment automation using VM Recipes, cloning
* something about the perf optimization/boot storms/etc?
non-persistent disks?
* import/export all standard formats VMware integration, VM import volumes
* Remote Console do most hypervisors have built in remote console? or is ours anything special?


## Networking
* VergeOS Fabric built-in network automation, built-in VergeFabric - like other components, integrated directly closely no extra licensing costs, greatly simplifies and streamlines networking management, replaces external appliances and the complexity of integration with those appliances, closely integrated networking allows for straightforward, innate, failover capabilities no SDN licensing fees, network segmentation at the VM, VDC, tenant level
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


## User management
granular user permissions system
OIDC provider for identity management
Centralize identity management across multiple VergeOS systems

## Alerting/Reporting/monitoring
* subscriptions
* extensive dashboards throughout the UI for every facet


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

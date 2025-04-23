Storage
distributed, block storage with built-in file system, most efficient because it eliminates the need for multiple layers  <!-- review aa audio and check marketing docs for more info>
built-in snapshots
sync engine
deduplication
NAS service - file-based storage
SAN

Compute
Complete virtualization management -- strong security, superior performance provides flexibility works hand-in-hand with your storage and netowrking for ease of use<!-- check marketing docs for more info>
full-featured hypervisor
orchestration capabilites - task manager, etc.
virtualized resource assignment - gpu, pci devices, usb
automation for workload deployment using VM Recipes, cloning
something about the perf optimization/boot storms/etc?
non-persistent disks?
import/export all standard formats VMware integration, VM import volumes
do most hypervisors have built in remote console? or is ours anything special?


Networking
built-in network automation, built-in VergeFabric - like other components, integrated directly closely no extra licensing costs, greatly simplifies and streamlines networking management, replaces external appliances and the complexity of integration with those appliances, closely integrated networking allows for straightforward, innate, failover capabilities no SDN licensing fees, network segmentation at the VM, VDC, tenant level
BGP switch
firewalls
routers
switches
network diagnostic tools
tracing/tracking/rate limiting tools
DHCP
DNS
Proxy?
VPN
load balancing?


## Backup/DR
Snapshots at the system, tenant, VM, NAS, volume level
Sync engine to get complete systems off-site and ready for DR


## User management
granular user permissions system
OIDC provider for identity management
Centralize identity management across multiple VergeOS systems

## Alerting/Reporting/monitoring
- subscriptions
- extensive dashboards throughout the UI for every facet


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

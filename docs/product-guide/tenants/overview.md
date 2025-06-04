# Tenants

VergeOS provides native support for multi-tenancy, allowing a single installation to host multiple, encapsulated, secure enclaves called **tenants**.  Each tenant is a separate and complete virtual data center that includes all the functionality of a base VergeOS environment (excluding hardware management).  Every tenant has access to its own user interface via a unique URL.

Privacy and security are ensured with full network encapsulation and exclusive storage volumes, providing true isolation between tenants, unlike other strategies, such as VLAN-based segmentation.


## Key Features

- **Built-in functionality:** Comprehensive solution for tenancy (No additional licensing, tools, or applications needed)
- **Nested Multi-tenancy:** Each tenant can create sub-tenants from its own allocated resources, providing a hierarchical structure of delegation and resource management
- **Resource Tracking:** Per-tenant resource tracking, including deduplication statistics, facilitates billing and capacity planning
- **User Management Flexibility:** Optionally, a tenant can be configured for centralized identity management through: its parent, another VergeOS system, or a third-party identity provider 
- **Individualized backup/DR:** DR protocols can be customized per tenant
- **Portability:** Each tenant is portable is a self-contained system that can be moved to a different location as one unit
- **Automated Deployment:** [Tenant Recipes](/product-guide/automation/tenant-recipes) allow for rapid deployment, compliance, self-service applications, etc.
- **Custom Branding:** Parent systems can permit a tenant to "brand" its user interface with its own company logos, color schemes and font selections (can be allowed/disallowed on a per-tenant basis) 

## Practical Applications

Examples of VergeOS tenancy used in the field:

* A **Service Provider** creates secure, full-featured virtual data centers for their clients, which in turn can create virtual data centers for their own customers
* An **Enterprise** centralizes infrastructure management while separating workloads and delegating administration to different regions or business groups
* An **Educational Institution** provides specialized environments to separate faculties or research projects, eliminating traditional siloed, stand-alone systems  


## Related Links

* [**Creating Tenants**](/product-guide/tenants/create-tenants)
* [**Assigning External IP Addresses to a Tenant**](/product-guide/tenants/assign-ip-to-tenant)
* [**Monitoring Tenants**](/product-guide/tenants/tenant-monitoring)
* [**Modifying Tenant Properties**](/product-guide/tenants/tenant-modifications)
* [**Tenant Usage Reports**](/product-guide/tenants/tenant-usagereports)
* [**Sharing Files with a Tenant**](/product-guide/tenants/provide-files-to-tenant)
* [**Sharing VMs with a Tenant**](/product-guide/tenants/share-vm-snapshot)
* [**Increasing a Tenant's Resources**](/product-guide/tenants/add-tenant-resources)
* [**Reducing a Tenant's Resources**](/product-guide/tenants/reduce-tenant-resources)
* [**Tenant Restores**](/product-guide/tenants/tenant-restores)
* [**Tenant Snapshots**](/product-guide/tenants/tenant-snapshots)


# Modifying Tenants

This page provides information for **editing the base configuration** of a tenant.  

See [**Increasing a Tenant's Resources**](/product-guide/tenants/add-tenant-resources) or [**Reducing a Tenant's Resources**](/product-guide/tenants/reduce-tenant-resources) for instructions regarding modifying resources.

## Tenant Properties

To modify any of the following properties of an existing tenant, navigate to the **individual tenant Dashboard** and click **Edit** on the left menu.

* **Name** - can be changed without causing issues, as each tenant is tracked with a unique identifier that is independent of name.

* **URL Link** - The link used **from your own Dashboard** to connect to the tenant's UI. It will default to the UI Address (link used by tenant to connect to their own UI), but can be modified to accommodate different connection URLs for provider and tenant.

* **Admin Password** - This can be edited to perform a password reset for a tenant admin account.

* **Require Password Change** - This option can be enabled anytime to require the tenant to set a new admin password at next login. This can be helpful to ensure that credentials remain secure after resetting a forgotten tenant admin password.

* **Expose System Snapshots** - Can be **enabled / disabled** at any time. When enabled, the tenant will see the list of your (provider's) available snapshots and can download to restore their own system or individual VMs.

* **Theme access**: 
    * ***Cannot create new themes, read-only access to all host themes***
    * ***Cannot create new themes, read-only access specified host themes***
    * ***Can create new themes, no access to host themes***
    * ***Can create new themes, read-only access to host themes***

!!! warning "Changing Theme Access"
    Restricting a tenant's theme access after they have created custom themes may cause problems

* **Custom help URL** - Address for the Help link within the tenant UI

  * **"default"** - link to standard VergeOS help content
  * **blank** - disables tenant Help links (Help links within the tenant UI will produce a 404 error page)
  * **custom URL** - URL can be provided to accommodate a custom document store for help content

* **UI Address** - Link for the tenant to access their own VergeOS UI. This field is **autopopulated** with the [**first External IP**](/product-guide/tenants/assign-ip-to-tenant) assigned to the tenant. If/when additional external IPs are assigned to a tenant, the **UI address can be changed** to one of the other IP addresses. Rules will **automatically** be updated by the system; *Apply Rules* to **both** the associated **External** network and **tenant** network if *UI Address* is modified.

* **UI FQDN** - Only applies when a [**Proxy**](/knowledge-base/configuring-proxy) is being used. Select desired FQDN from the dropdown list.  

* **OIDC Application** - Allows selection of a centralized authorization source. Configured authorization sources will appear in the dropdown list.

# Modifying Tenants

This page provides information for **editing the base configuration** of a Tenant.  

See [**Increasing a Tenant's Resources**](/product-guide/tenants/add-tenant-resources) or [**Reducing a Tenant's Resources**](/product-guide/tenants/reduce-tenant-resources) for instructions regarding modifying resources.

## Tenant Properties

To modify any of the following properties of an existing Tenant, navigate to the **individual Tenant Dashboard** and click **Edit** on the left menu.

* **Name** - can be changed without causing issues, as each tenant is tracked with a unique identifier that is independent of name.

* **URL Link** - The link used **from your own Dashboard** to connect to the Tenant's UI. It will default to the UI Address (link used by Tenant to connect to their own UI), but can be modified to accommodate different connection URLs for provider and tenant.

* **Admin Password** - This can be edited to perform a password reset for a Tenant Admin account.

* **Require Password Change** - This option can be enabled anytime to require the Tenant to set a new admin password at next login. This can be helpful to ensure that credentials remain secure after resetting a forgotten Tenant admin password.

* **Expose Cloud Snapshots** - Can be **enabled / disabled** at any time. When enabled, the Tenant will see the list of your (provider's) available snapshots and can download to restore their own system or individual VMs.

* **Allow Custom Branding** - When enabled, the Tenant can change colors and logos for their VergeOS UI.  

!!! warning "Custom Branding Disable"
    If Custom Branding is disabled after Tenant has already implemented custom branding, the **branding changes will be lost**.

* **Custom help URL** - Address for the Help link within the Tenant UI
  * **"default"** - link to standard VergeOS help content
  * **blank** - disables Tenant Help links (Help links within the Tenant UI will produce a 404 error page)
  * **custom URL** - URL can be provided to accommodate a custom document store for help content

* **UI Address** - Link for the Tenant to access their own VergeOS UI. This field is **autopopulated** with the [**first External IP**](/product-guide/tenants/assign-ip-to-tenant) assigned to the Tenant. If/when additional external IPs are assigned to a Tenant, the **UI address can be changed** to one of the other IP addresses. Rules will **automatically** be updated by the system; Apply Rules to **both** the associated **External** Network and **Tenant** Network if UI Address is modified.

* **UI FQDN** - Only applies when a [**Proxy**](/knowledge-base/configuring-proxy) is being used. Select desired FQDN from the dropdown list.  

* **OIDC Application** - Allows selection of a centralized authorization source. Configured authorization sources will appear in the dropdown list.

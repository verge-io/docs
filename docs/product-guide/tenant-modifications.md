# Modifying Tenants

This page provides information for **editing the base configuration** of a Tenant.  See [**Increasing a Tenant's Resources](/product-guide/tenantsaddresources) or [**Reducing a Tenant's Resources](/product-guide/reducetenantresources) for instructions regarding modifying resources.



## Tenant Properties

To modify any of the following properties of an existing Tenant, navigate to the **individual Tenant Dashboard** and click **Edit** on the left menu. 

* **URL Link** - The link used **from your own Dashboard** to connect to the Tenant's UI.  It will default to the UI Address (link for the Tenant to connect to their own UI), but can be modified to accommodate a different connection URLs for provider and tenant.  
* **Admin Password** -
  This can be edited to perform a password reset for a Tenant Admin account.
* **Require Password Change** - 
  This option can be enabled anytime to require the Tenant to set a new admin password at next login. This can be helpful to ensure that credentials remain secure after resetting a forgotten Tenant admin password.
* **Expose Cloud Snapshots** -
  Can be **enabled / disabled** at any time. When enabled the Tenant will see the list of your (provider's) available snapshots and can download to restore their own system or individual VMs.

* **Allow Custom Branding** - when enabled, the Tenant can change colors / logos for their VergeIO UI.  
!!! note "If this **option is disabled** after Tenant has already implemented custom branding, the **branding changes will be lost**" 

* **Custom help URL** - address for the Help link within the Tenant UI 

    * **'default'** - link to standard VergeOS help content
    * **blank** - disables Tenant Help link
    * **custom URL** - a custom address can be provided to accommodate a custom document store for help content

* **UI Address** - link for the Tenant to access their own VergeOS UI. 
This field is **auto-populated** with the **first External IP** assigned to the Tenant. If / When additional External IPs are assigned to a Tenant, the **UI address can be changed** to one of the other IP addresses.  Rules will **automatically** be updated by the system; Apply Rules to **both** the associated **External** Network and **Tenant** Network if UI Address is modified. 

* **UI FQDN** - applies when proxy is being used.  Select proxy list from the dropdown list.  <!-- need to expand on this when proxy documentation is in place. -->

* **OIDC Application** - select the appropriate authorization list from the dropdown list. <!-- need to expand on this when putting in OIDC/TTPT docuemntaiton soon. -->


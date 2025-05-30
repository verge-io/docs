# Creating Tenants

## Tenant Creation Methods

VergeOS provides multiple methods for creating new tenants:

- Using the [**Tenant Wizard**](#tenant-wizard)
- [**Cloning**](#tenant-cloning) an Existing tenant
- Using a [**Tenant Recipe**](#tenants-from-recipes)

## Tenant Wizard

The *Tenant Wizard* steps through multiple input forms to create a new custom tenant.

### Create a New Tenant Using the Tenant Wizard

1. Click **Tenants** from the Main Dashboard (quick-link card or left menu).
2. Click **New Tenant** on the left menu.
3. From the **Catalog list** (top left), select ***\--Custom--***
4. Click **Next** (bottom of the screen). The ***Tenant Settings* form is presented.**
5. Enter a ***Name*** for the tenant.
6. ***URL*** is simply a helper field to provide a link to the tenant's UI from the **Connect to UI** menu link in the service provider's VergeOS user interface. This field can be left blank as it will automatically be populated when the first external IP is assigned to the tenant.
7. Enter an ***Admin User Password*** and again in the ***Confirm Admin User Password*** field (required). This sets the password for the tenant’s “admin” root user that will be auto-created.
8. **Optionally**, the **Require Password Change** option can be selected to force a password change when the tenant admin initially logs in.
9. **Optionally**, a **Description** can be entered to record more information about the tenant.
10. By default, the **Expose Cloud Snapshots** option (checkbox) is selected. When selected, the tenant is able to browse the cloud snapshots of the parent and “self-serve” download their own tenant snapshot from the provider's snapshot timestamps.
11. **Optionally**, the **Allow Custom Branding** option (checkbox) can be selected to enable the tenant to customize their own VergeOS dashboard with different colors and logo.
12. **Optionally**, the **Custom help URL** allows for providing a location for alternate help content for the tenant. Tenant users are directed to this URL when they click help links in the VergeOS UI.
13. **OIDC Application** allows for defining an authorization source for the tenant.  The selection list will include OIDC applications defined on the parent.  When *--None--* is selected, the local tenant user database is used for authentication.
14. Click **Submit** (bottom of page) to proceed. Continue with the ***New Tenant Node* form**.

### New Tenant Node Form

!!! info "Tenant Node Creation"
    Settings defined here will apply to the single tenant node created with the wizard. Additional tenant nodes, if needed, can be created upon completion of the wizard.

1. Select the number of ***Cores*** and amount of ***RAM*** to provision to the tenant node.  
2. **Optionally**, a ***Cluster*** can be selected to run the tenant, or it can be left at --Default -- (specified by *System >Settings > Default cluster for tenant nodes*)  
3. **Optionally**, a **Failover cluster** can be selected to run the tenant if the primary selected cluster is not available. Or it can be left at *--Default --* (specified by *System > Settings > Default failover cluster for tenant nodes*)  
4. Defining a **Preferred node** is **Typically Not Recommended for a tenant node**. This is an advanced setting for tenant nodes; setting it incorrectly can adversely affect built-in redundancy. Consult with VergeOS Support for additional assistance.  
5. **Optionally**, a **Description** can be entered to record further information for this initial tenant node.  
6. Select desired ***On Power Loss*** setting:
    - ***Last State*** - tenant will only be powered on if it was on at the time of power loss.
    - ***Leave Off*** - tenant will not be powered on when power is restored (regardless of its state at the time of power loss).
    - ***Power On*** - tenant will be powered on when power is restored (regardless of its state at the time of power loss).  
7. Click the **Submit** button (bottom of page) to proceed. Continue with the ***New Tenant Storage* form**.

### New Tenant Storage Form

1. Select which **Tier** to use for tenant storage from the **Tier** dropdown menu.  
2. Select the amount of storage capacity to be provisioned for the tenant.
3. Click the **Submit** button (bottom of page) to proceed. Continue with the ***UI Management* form**.

### UI Management Form

1. You can optionally assign one external IP to the tenant. External IPs can be assigned to a tenant after creation as well. By default, the first one assigned to a tenant is configured to be the tenant's UI address.  
2. Select from the **Assign External IP*** dropdown. (This list will include all unassigned Virtual IPs defined in the parent).  
3. If the desired IP is not already configured as a Virtual IP in the parent system, click ***Create a new External IP*** to create the address:
    - **Network** - select appropriate network from the dropdown list.
    - **Type** - **Virtual IP**  
    - **IP Address** - enter the public(external) IP address or leave blank to auto-create the next available IP in the network.
    - **Hostname and Description fields** - can be left blank.
    - **Owner** (dropdown) - name of the new tenant.  
!!! tip "Remember that an external IP is one that is external to the VergeOS system; it may or may not be a public Internet address. An external IP can be a private address on your external LAN/WAN, for example: 10.10.10.100"

4. Click **Submit** to finish. You should see a message saying the tenant was created successfully and the new tenant dashboard is presented.

!!! success "Apply Rules"
    If external IP(s) were assigned to the tenant, rules will need to be applied to the selected external network. Click the orange-highlighted message "Needs Apply Rules" on the tenant dashboard to apply the necessary rules.

**To Start the New Tenant:**  
Upon creating a tenant, the UI will land at the tenant dashboard page. From this dashboard page, the tenant can be started by clicking ***Power On*** on the left menu.

## Tenant Cloning

Cloning a tenant will make a duplicate of an existing tenant. This can be very useful for testing, development, restores, and other scenarios when you need a copy of a tenant.

!!! warning "Cloning Considerations"
    When creating clones, be careful to avoid producing conflicts from duplicate IP addresses, MAC addresses, application instances, etc.  running on the same network.

### Create a New Tenant from a Clone

1. Click **Tenants** from the Main Dashboard (quick-link or left menu.)
2. Click **New Tenant** from the left menu.
3. From the ***Catalog list (top left)***, select ***\--Clone Existing--***.
4. All VMs will be listed under the ***Selection*** area on the right. **Select the desired VM.** Click **Next** (bottom of page).  The ***Name* input form appears**.
5. The ***Name*** for the tenant clone can be changed as desired. (The Name will default to the *NameofSourceVM* +”clone”, for example: when cloning a tenant named “Tenant2”, the Name will default to “Tenant2 clone”.)
6. Optionally, the ***Clone as New Tenant*** option can be selected to create the new tenant instance without accompanying history statistics, logs, and snapshots with expiration. This is the recommended option when these items are not needed.
7. Click **Submit** (bottom of page).
The tenant is created and the new tenant dashboard appears.

**To Start the New Tenant:**  
From the tenant dashboard page the tenant can be started by clicking ***Power On*** from the left menu.

## Tenants from Recipes

Tenant recipes allow for automated creation of tenants using a base tenant template and questions that allow customizing each new tenant instance.  

The [Tenant Recipes page](/product-guide/automation/tenant-recipes) provides information about creating and using tenant recipes.

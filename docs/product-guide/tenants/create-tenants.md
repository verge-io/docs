# Creating Tenants

## Tenant Creation Methods

There are 3 methods available for creating a new tenant.

- Using the [**Custom Tenant Wizard**](#create-a-new-tenant-using-the-custom-tenant-wizard)
- [**Cloning**](#method-2-create-a-new-tenant-by-clone) an Existing tenant
- Using a [**Tenant Recipe**](#create-a-new-tenant-using-a-recipe)

## Custom Tenant Wizard

The Custom Tenant Wizard steps through multiple input forms to create a new custom tenant.

### Create a New Tenant Using the Custom Tenant Wizard

1. Click **Tenants** from the Main Dashboard (quick-link card or left menu).
2. Click **New Tenant** on the left menu.
3. From the **Catalog list** (top left), select ***\--Custom--.***
***Custom Tenant*** will now display as selected in the *Selection* area on the right.
4. Click **Next** (bottom of the screen). The ***Tenant Settings* form is presented.**
5. Enter a ***Name*** for the tenant.
6. ***URL*** is simply a helper field to provide a link to the tenant's UI from the **Connect to UI** menu link in the service provider's VergeOS user interface. This field can be left blank as it will automatically be populated when the first External IP is assigned to the tenant.
7. Enter an ***Admin User Password*** and again in the ***Confirm Admin User Password*** field (required). This sets the password for the tenant’s “admin” root user that will be auto-created.
8. **Optionally, Require Password Change** (checkbox) can be selected to force a password change when the tenant admin initially logs in.
9. **Optionally**, a **Description** can be entered to record more information about the tenant.
10. By default, the **Expose Cloud Snapshots** option (checkbox) is selected. When selected, the tenant is able to browse the cloud snapshots of the parent and “self-serve” download their own tenant snapshot from the provider's snapshot timestamps.
11. **Optionally**, the **Allow Custom Branding** option (checkbox) can be selected to enable the tenant to customize their own VergeOS dashboard with different colors and logo.
12. **Optionally**, the **Custom help URL** allows for providing a location for alternate help content for the tenant. Tenant users are directed to this URL when they click help links in the VergeOS UI.
13. **OIDC Application** allows for defining an authorization source for the tenant.  Selection list will include OIDC applications defined on the parent.  When *--None--* is selected, the local tenant user database is used for authentication.
14. Click **Submit** (bottom of page) to proceed. The ***New Tenant Node* form appears**.
!!! "Tenant Node Creation"
    Settings defined on the *New Tenant Node* form will apply to the single tenant node created with the wizard. Additional tenant nodes (if needed) can be created upon completion of the wizard.
**New Tenant Node Form:**
15. Select the number of ***Cores*** and amount of ***RAM*** to provision to the tenant node.
16. **Optionally**, a ***Cluster*** can be selected to run the tenant, or it can be left at --Default -- (specified by *System >Settings > Default cluster for tenant nodes*)
17. **Optionally**, a **Failover cluster** can be selected to run the tenant if the primary selected cluster is not available. Or it can be left at *--Default --* (specified by *System > Settings > Default failover cluster for tenant nodes*)
18. Defining a **Preferred node** is **Typically Not Recommended** for a tenant node. This is an advanced setting for tenant nodes; setting this incorrectly can adversely affect built-in redundancy. Use this setting with care and consult with Support for additional assistance.
19. **Optionally**, a **Description** can be entered to record further information for this initial tenant node.
20. Select desired ***On Power Loss*** setting:
    - ***Last State**** - tenant will only be powered on if it was on at the time of power loss.
    - ***Leave Off*** - tenant will not be powered on when power is restored (regardless of its state at the time of power loss).
    - ***Power On*** - tenant will be powered on when power is restored (regardless of its state at the time of power loss).
21. Click the **Submit** button (bottom of page) to proceed. The ***New Tenant Storage* form appears**.
**New Tenant Storage Form:**
22. You can optionally assign one External IP to the tenant. External IPs can be assigned to a tenant after creation as well. By default, the first External IP assigned to a tenant is configured to be the tenant's UI address.
23. Select from the **Assign External IP*** dropdown. (This list will include all unassigned Virtual IPs defined in the parent).
**-OR-** If the desired IP is not already configured as a Virtual IP in the parent system, click the ***Create a new External IP*** link to create the IP.  
**Create External IP Form:**
    - **Network** select appropriate network from the dropdown list.
    - **Type** make sure **Virtual IP** is selected.
    - **IP Address** enter the Public(external) IP address or leave blank to auto-create the next available IP in the network.
    - **Hostname and Description fields** can be left blank.
    - **Owner** (dropdown) should display the name of the new tenant.
!!! tip "Remember that an External IP is one that is external to the VergeOS system; it may or may not be a public Internet address; an External IP can be a private address on your external LAN/WAN, for example: 10.10.10.100"

24. Click **Submit** to finish. You should see a message saying the tenant was created successfully and the new tenant dashboard is presented.

!!! "If External IP(s) were assigned to the tenant, rules will need to be applied to the selected external network. Click the orange-highlighted message "Needs Apply Rules" on the tenant dashboard to apply the necessary rules."

**To Start the New Tenant:**  
Upon creating a tenant, the UI will land at the tenant dashboard page. From this dashboard page, the tenant can be started by clicking ***Power On*** on the left menu.

## Tenant Cloning

Cloning a tenant will make a duplicate of an existing tenant. This can be very useful for testing, development, restores, and other scenarios when you need a copy of a tenant (such as running the tenant in a separate network for testing).

!!! warning "Cloning Considerations"
    When creating clones, be careful to avoid producing conflicts from duplicate IP addresses, MAC addresses, application instances, etc. that running on the same network.

### Create a New Tenant from a Clone

1. Click **Tenants** from the Main Dashboard (quick-link or left menu.)
2. Click **New Tenant** from the left menu.
3. From the ***Catalog list (top left)***, select ***\--Clone Existing--***.
4. All VMs will be listed under the ***Selection*** area on the right. **Select the desired VM.** Click **Next** (bottom of page).  The ***Name* input form appears**.
5. The ***Name*** for the tenant clone can be changed as desired. (The Name will default to the *NameofSourceVM* +”clone”, for example: when cloning a tenant named “Tenant2”, the Name will default to “Tenant2 clone”.)
6. Optionally, the ***Clone as New Tenant*** option can be selected to create the new tenant instance without accompanying history statistics, logs, and snapshots with expiration; this is the recommended option when these items are not needed.
7. Click **Submit** (bottom of page).
The tenant is created and the new tenant dashboard appears.

**To Start the New Tenant:**  
From the tenant dashboard page the tenant can be started by clicking ***Power On*** from the left menu.

## Tenants from Recipes

Tenant recipes allow for creating an entire tenant from an existing, predefined tenant with recipe questions that allow customizing each new tenant instance.  

The [Tenant Recipes Product Guide](/product-guide/automation/tenant-recipes) provides information about creating and using tenant recipes.
# Recipe Organization

This page discusses Repositories and Catalogs, the containers used to organize both Tenant and VM Recipes.  Instructions for sharing Recipes are also included.  

## Repositories

### What is a Repository?

A Repository is a site collection of Recipes.  A Repository can contain multiple Catalogs of Recipes.  

```mermaid
graph TD
    A["Repository"] --> B("Catalog 1")
    A --> C("Catalog 2")
    A --> D("Catalog 3")
    B --> E("VM Recipe")
    B --> F("VM Recipe")
    C --> G("Tenant Recipe")
    C --> H("Tenant Recipe")
    D --> I("VM Recipe")
    D --> J("Tenant Recipe")
    D --> K("VM Recipe")
```

* **Local Repositories**: Catalogs/Recipes are created and maintained on the local system.

* **Remote Repositories**: Catalogs of Recipes, created and maintained on another VergeOS system, are retrieved for use on the local system. Sharing via remote repositories eliminates the need to administer the same recipes in multiple locations.

### Auto-Installed Repositories

***"MarketPlace"***  
Host-level systems are installed with **Marketplace**, a special remote VergeOS-provided repository which includes a wide variety of Linux and Windows VM Recipes. By default, the Recipe Catalogs contained in Marketplace are set to scope="global", which allows them to be also be used by all the system's Tenants as well.  

***"Local"***
By default, your new VergeOS system will have an empty local Repository named **Local** that is ready in which to create new Catalogs/Recipes.  

## Catalogs

### What is a Catalog?

Catalogs allow you to group your related recipes within a Repository.  For example, one catalog may contain various Windows VM recipes, while another contains all our your Linux-based VM recipes. Administrators can use catalogs to organize in whatever way makes sense for their particular organization. Catalogs can also be configured to be shared with your Tenants or other external VergeOS systems.

### Create a New Catalog

1. Navigate to **Repositories** and **double-click the Repository** where the Catalog should reside.  This will need to be a local Repository; remote repositories are maintained at the remote system. (The default *"Local"* Repository created in every new VergeOS system and Tenant that can be used.)
2. Click **Catalogs** on the left menu and then click **New**.
3. Provide a descriptive **Name** for the Catalog.  Optionally, additional administrative information can be added to the description field.
4. Select a **Publishing Scope** to define the accessibility of the Catalog:  

    * **Private** - only available to this particular Cloud.
    * **None** - disabled, not available anywhere
    * **Tenant** - available to this particular Cloud and its own tenants
    * **Global** - available to any VergeOS system/tenant, including external systems(user credentials necessary)

## Sharing Recipes

### Share Catalogs with Your Tenants

1. Set the Catalog's **Publishing Scope =** ***'Tenants'*** (or 'Global', which will also allow access to external systems using proper credentials).
2. Switch to the Tenant's UI for the rest of steps.
3. Navigate to the ***Service Provider*** Repository and click **Refresh**.
4. **Double-click the desired Catalog** to see the Recipes contained within.
5. Click **VM Recipes** -or- **Tenant Recipes** to see the respective listing.
6. **Select the desired Recipe(s).**
7. Click **Download/Update** on the left menu to download into the Tenant environment.
When a Recipe displays a status of *Online* it is available for use.

!!! note "When a Recipe is updated at the source it will show a message in the Tenant UI indicating that an update is available for download."

<!--### Moving a Recipe from One Catalog to Another? -->

### Share Catalogs to a Remote System

**Give Access to a Catalog (sharing side)**  

1. Create a **new User, with Type: API**, to be used for authentication from the Remote system/tenant.  Note username and password.
2. Navigate to **Catalog dashboard**.
3. Click **Permissions** on the left menu.
4. Click **Add User** on the left menu.
5. Set the following fields for the new permission:
    * **Grantee**: the API user created above
    * **Permissions:** List and Read
    * **Type:** Catalogs
    * **Name:** name of the Catalog that is being shared
6. Click **Submit** to save the new permission.

**Connect to a Remote Catalog (receiving side):**  

1. From the Main Dashboard, navigate to **Repositories -> New**.
2. Complete **fields** for the new Repository:  

* **Name**: a descriptive name that helps distinguish this Repository.
* **Description**: (optional) additional information entered here can be helpful for future administration.
* **Type**: Remote
* **URL**: the IP or DNS entry of the hosting system, e.g. `https://RemoteVergeSystem.example.com`
* **User/Password**: use credentials of API user created on the host system (above).
* **Allow Insecure Certificates**: option is provided to accommodate a self-signed certificate within the same private network; using a public URL without secure SSL can be risky.  
* **Max Fastest Tier**: allows you to specify the best tier to use for Recipe drives (e.g. Recipe has a drive on tier 2 on the remote system, if this setting is set to tier 4, the drive will be moved to tier 4 when downloaded.)
  
1. Click **Submit** to save the new Repository.
2. Once created, navigate to the **Repository dashboard** and click **Refresh** to reload its Catalogs.  Recipes can be downloaded locally and then will be available to use when creating a new VM/Tenant.

!!! note "When the remote system creates the Repository that connects to your system, they will have access to any of your Catalogs for which the given API user has permissions."

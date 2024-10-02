# Recipe Organization

This page discusses Repositories and Catalogs, the containers used to organize Recipes (both Tenant and VM Recipes).  Instructions related to organizing and sharing Recipes are also covered.  


<!-- mermaid graph -->


## <a name="repositories"> Working With Repositories


## What is a Repository?

A Repository is a site collection of Recipes.  The Repository can contain one or more Catalogs of Recipes.   

* **Local Repositories**: Catalogs/Recipes are created and maintained on the local system.

* **Remote Repositories**: Catalogs of Recipes are retrieved from another VergeOS system; the Recipes are created and maintained on the remote system, but made available to the local system.  By sharing recipes remotely, administrators can reduce time creating and maintaining recipes in multiple environments.


## Auto-Installed Repositories

#### MarketPlace
  Host-level systems are installed with **Marketplace**, a special remote VergeOS-provided repository which includes a wide variety of Linux and Windows VM Recipes. By default, the Recipe Catalogs contained in Marketplace are set to scope="global", which allows them to be also be used by all the system's Tenants, as well.    
  

#### Local 
By default, your new VergeOS system will have an empty local Repository named **Local** that is ready in which to create Catalogs/Recipes.  


## Sharing a Repository Between Systems

### To Connect to a Remote Repository
1. From the Main Dashboard, navigate to **Repositories -> New**.
2. Enter a descriptive **Name** for the new Repository, and (optionally), additional administrative information in the  **Description** field.
3. Select **Remote** for the ***Type***.
4. **Enter fields as described**
* **URL**: the IP or DNS entry of the VergeIO UI for the hosting system
Example: https://training.verge.io
* **User**: use the API user created (above)
* **Password**: use the password used when creating the user
* **Allow Insecure Certificates**: check (enabled)
* **Max Fastest Tier**: typically this should reflect the highest tier of storage available.
5. Click **Submit** to save.
6. Once created, navigate to the Repository dashboard and click Refresh to reload its Catalogs.  Recipes can be downloaded locally and then will be available for use when creating a new VM instance. 


This setting allows you to specify the max tier that drives can exist on (e.g. Recipe has a drive on tier 2, this setting is tier 4, the drive will be moved to tier 4 when downloaded)

4. Click **Submit** to save the new Repository.

### To Allow A Remote VergeOS System Access to a Local Repository






## <a name="catalogs"> Catalogs
- organize within repository
- any way that makes sense for you/your organization
- for ex: different catalogs for windows, linux or for different business units
- link to page with more info about catalogs


### Creating a New Catalog

### Viewing a Catalog

### Deleting a Catalog?

### Making a Catalog Available to Tenants

### Moving a Recipe from One Catalog to Another







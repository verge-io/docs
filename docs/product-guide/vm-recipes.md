# VM Recipes


What is a VM Recipe?
A VM recipe is a customizable template for launching new virtual machine instances. A VM recipe can include initial hardware specifications (e.g. number of cores, RAM, CPU type, drives, NICs) and resource pool specification. Additionally, custom fields can be added to the recipe to gather input at the time of recipe consumption. This data, input by the recipe consumer, can then be utilized to adjust elements within the new vm guest at first startup. For example, a recipe can be configured to prompt for a database username and password, or select a specific set of packages to install. Due to tight integration with cloud-init, VM recipe questions can be configured using either "NoCloud" or "Config Drive v2" as the data source. The variables from the data source can then be turned into questions in the VM recipe to be answered right from the VergeIO user interface.


[**catalogs**](#testout)

Organizing Recipes


Recipes are organized into [**catalogs**](/product-guide/recipe-organization#catalogs).  A [**Repository**](/product-guide/repositories) can contain many catalogs.

mermaid graph



Repositories
- top level
- default repository?
- remote and local
- multiple?
- link to page with more information about repositories


Catalogs
- organize within repository
- any way that makes sense for you/your organization
- for ex: different catalogs for windows, linux or for different business units
- link to page with more info about catalogs


Link to page on VM Recipes


Link to page on Tenant Recipes


 default repository?
- remote and local
- multiple?
- link to page with more information about repositories


Catalogs
- organize within repository
- any way that makes sense for you/your organization
- for ex: different catalogs for windows, linux or for different business units
- link to page with more info about catalogs


Link to page on VM Recipes


Link to page on Tenant Recipes


## <a name="testout">
amdlkajdsf;kjsadfkl;sdjf

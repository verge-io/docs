# VM Recipes

VM recipes provide a powerful way to quickly deploy instance-specific virtual machines from a standard configuration. This page will walk you through the process of creating and using VM recipes.

## What is a VM Recipe?

VM recipes are customizable templates for launching new unique virtual machines. They can include initial hardware specifications, resource pool assignments, and custom configuration options via a key value store created at VM instantiation.  For example, a recipe can be configured to prompt for a database username and password, or select a specific set of packages to install. Users can determine options right from the user interface when creating the new VM instance.  Recipes can also be leveraged along with the VergeOS API to create rich user experience and further streamline processes by integrating with existing systems, e.g. service portals.  

**Industry Standard Integration**  
VergeOS supports both **Cloud-Init** (Linux) and **Cloudbase-Init** (Windows) to customize VMs during first boot.  This can include tasks like setting up users, installing packages, or running scripts.  Recipes can allow you to rapidly deploy cloud-init/Cloudbase-init implementations by providing the user interface to collect input and dynamically creating the associated answer files.  See [Advanced Usage](#advanced-usage) below for more information.

**Benefits of Using VM Recipes**  

* Rapid deployment of new virtual machines
* Consistency across VM configurations
* Reduced manual setup time
* Customizable to meet specific application needs

## Included VM Recipes

A VergeOS system automatically includes the **Service Provider(Marketplace) Repository** comprised of VM recipes that can be used straightaway to create new virtual machines of many types.  The list of these available VM recipes can be viewed by navigating to **Repositories -> (double-click) MarketPlace repository -> VM Recipes**.

![marketplaceVMlisting](/product-guide/screenshots/marketplaceVMlisting.png)

 You can double-click on an individual VM recipe to view its configuration.  

![included-recipe-config](/product-guide/screenshots/included-recipe-config.png)

## Create a New VM Recipe

### Base Configuration

1. Create a VM to serve as the base template for the Recipe.  The VM should be generalized and suitable for the replication/customization process.
2. From the Main Dashboard, navigate to **Machines -> New VM Recipe**.
!!! note "Recipes are stored in [Catalogs](/product-guide/recipe-organization#catalogs). If you do not have a local catalog created yet, you will be prompted to create a new one first."  
3. **Recipe Fields**
    * **Name:** Use a descriptive name that adequately identifies the recipe and can help users in locating suitable recipes.
    * **Description:** (optional) You can store any additional information about this recipe here.  This can be a good place to provide basic documentation on the intended purpose and general guidelines.
    * **Icon:** (optional) a Font-Awesome icon can be associated with the recipe.  Icons can help users to easily identify different recipes/recipe types.
    * **Catalog:** Select a catalog in which to store the recipe. Catalogs are helpful to keep recipes organized.
    * **Virtual Machine:** Select a template VM or select --None-- if the recipe will simply rely on a Cloud Image URL for configuration
    * **Version:** Assign a version number. This field will automatically increment each time the recipe is modified, to help track changes.

    ??? example "Version Numbering"
        A version number of 1.0.0 would be incremented to 1.0.0-1 and then 1.0.0-2 and so forth. Additionally, you can manually edit the version number to reflect larger version changes, such as changing the version to 2.0.0 after making significant modifications.

    * **Use Asset for Question Names:** When enabled, drive and NIC question names are based on the assigned asset number rather than ordinal number.
    !!! tip "When a recipe is based on a virtual machine, drive questions are created automatically for each of the VM's drives, e.g. YB_DRIVE_1_SIZE, YB_DRIVE_3_NONPERSISTENT, YB_DRIVE_2_SERIAL, etc."

    * **Version Dependencies:** (Not applicable for recipes that will only be used on the local system and its own tenants).  Dependencies can be specified when there are VergeOS features required for the recipe to work properly (to prevent a remote system from using a recipe that it can not accommodate).

4. Click **Submit** to save the base configuration.  The VM Recipe Dashboard will display where you can configure your sections and questions.  

### Sections

Sections allow you to group your questions on the input form.  You must define at least one section.

1. Click **Sections** on the left menu, and click **New** to create.  Each section will require name and can optionally include a description.
When finished with sections, use the back button or breadcrumb to return to the VM Recipe Dashboard.

### Questions

Recipe questions are used to determine key values.  When a recipe is created, some questions are included automatically.  Some of these questions are disabled by default and would need to be enabled if you wish to use them.

1. **(Optional) Enable disabled defaulted question(s):** Click Questions (left menu or dashboard card), select the question(s), and click Enable on the left menu.  
2. To configure additional questions, Click **Questions** on the left menu, and then **New**.

**Question Fields**:

* **Section:** each question belongs to one section.  
* **Name:** serves as the variable name that can be referenced in scripts; use a descriptive name to aid in script maintenance and troubleshooting; alpha-numeric characters only (no spaces or special characters)  
* **Type:** determines how the data is collected: via user input, interacting with the VergeOS database, downloading cloud images, etc. <!--The [Question Types Listing](#question-types-listing) below, provides descriptions for question types. -->  

* **Order ID:** used to determine the order in which questions are displayed (within the selected section)
* **Display:** text displayed in the VergeOS UI for the user to answer recipe questions
* **Default Value:** (optional) defines an initial answer value for the question
* **Regex Validation:** (optional) regular expression string used to validate input  
* **Placeholder Text:** (optional) greyed text displayed to give the user an example of the expected input  
* **Tooltip Text:** (optional) user help text displayed in a popup when the field is hovered with a mouse  
* **Note Text:** (optional) user help text displayed directly under the input field  
* **On Change:** allows for hiding/showing other questions when this field is changed.  (Example code is shown in this field when creating a new question.)  

    Additional configuration options may be available dependent on the type selected.

 <!-- Following are common additional fields:
    **Required**
    **Read-Only**
    **Don't Store**
    **Hide NULL**
    **Normalize**
    **Minimum**
    **Maximum**
    **Post-Processing**
    **Conditions**

    **VergeOS Database-related**
    **Database Values**
    **Database Table**
    **Database Filters and Fields** (Database Find)
    **Database Table**
    **Database Filter**
    **Database Fields**  -->

## Simulate a VM recipe

You can simulate a VM recipe to test.  Simulating the recipe will allow you to view the user input form, test field validation and create sample answer files to verify your configuration.  

To simply view the User input form, while at the VM recipe dashboard, click **Simulate Recipe** from the left menu.
From the simulated input form, you can test input validation and generate test answer files by clicking the **Simulate** button at the bottom of the form.
A list of variable/value pairs, along with a printout of simulated result files will display.  To proceed with creating a VM from the inputs, click the Create button.

## Modify a VM Recipe

When any changes are made to a recipe, it will need to be republished in order to make those changes available.  The top of the recipe dashboard will display a message indicating that it must be republished for changes to take effect.  You can use the **Republish** link within this message or click Republish on the left menu.  
!!! tip "When you make changes and republish a recipe, remote systems and tenants are notified that an update is available (notification at the top of the VM recipe dashboard and update available checkbox); they must update the recipe to access the changes.

## Use a VM Recipe

VM recipes are available for use when creating a new Virtual Machine. All accessible catalogs (local and remote) are listed on the left of the screen; select a catalog to view the individual recipes available.

## Recipe Instances

An Instance refers to a Virtual Machine that is associated with a VM recipe.  When a Virtual Machine is created with a recipe it is considered an instance of the recipe until it is deleted or detached from the recipe.

Click **Instances** on the left menu of a VM recipe dashboard to quickly access a listing of associated VMs. A VM recipe cannot be deleted when there are any VM Instances.

## Advanced Usage

### Cloud-Init and Cloudbase-init Integration

**To use with a VM template:**

* Set the **Cloud-init Datasource field = *Config Drive v2***.
* Install Cloud-init and associated scripts within the VM template.

**To use an Online OS Image:**  
VergeOS recipes allow for taking advantage of the many pre-installed, cloud-init OS images available for download by most Linux and FreeBSD operating systems.  To utilize a specific downloaded image, you can create a recipe question configured as follows:

* **Name=*"OS_DL_URL"***
* **Type=*Hidden***
* **Default Value**: the download URL (e.g. `https://cloud-images.example.com/releases/jammy/release/ubuntu-22.04-server-cloudimg-amd64-disk-kvm.img`, `http://download.rockylinux.org/pub/rocky/8/images/x86_64/Rocky-8-GenericCloud.latest.x86_64.qcow2`)

To stream a cloud image over the web, you could create a recipe question configured as follows:

* **Name=*"OS_URL"***
* **Type=*Hidden***
* **Default Value**: the image URL (e.g. `https://cloud/debian.org/images/cloud/bullseye/latest/debian-11-generic-amd64.qcow2`)

<!--more info to be added here about the drive automatically created, standard files created to support cloud-init integration; troubleshooting informaiton, best practices, etc. >
<!-- also need to cover the "NoCloud" option on VMs -->

**Reference Examples:**  
[Marketplace Recipes](#included-vm-recipes) provide good examples for using cloud-init/cloudbase-init OS images in a recipe.  

Integration with Cloud-init/Cloudbase-init allows for many solutions and a variety of potential approaches. Contact VergeOS Support if you need additional assistance.

<!--
## Question Types Listing

boolean - standard boolean, displayed as checkbox, code true/false or yes/no?
Cluster -
Date/Time - collect standard date/time?  does it default to current?  what parts of it are required, how is it stored?
Disk Size - size for a VM disk, what units can it be defined in?
Hidden - does not show on the form.  So just hard-coded?  can it be changed within the script dependent on values of other fields, for ex.?
List - selection of items provided to user in dropdown.
Network -
Number -
Password - allows for password entry with confirmation field; entries hidden with placeholder character.
RAM - allows for entry
Row Selection -
Seconds -
String -
Text Area -
Virtual IP Address -
Database Create - create a new record in the VergeOS database?
Database Edit - edit a record in the VergeOS database?
database Field -
database Find -
-->

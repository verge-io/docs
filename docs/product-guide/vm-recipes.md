# VM Recipes

VM recipes provide a powerful way to quickly deploy instance-specific virtual machines from a standard configuration. This page will walk you through the process of creating and using VM Recipe.

## What are VM Recipes?
VM recipes are customizable templates for launching new virtual machine instances. They can include initial hardware specifications, resource pool assignments, and custom configuration options via an answer file.  For example, a recipe can be configured to prompt for a database username and password, or select a specific set of packages to install. Users can determine options right from the user interface when creating the new VM instance.  Recipes can also be leveraged along with the VergeOS API to create rich user experience and further streamline processes by integrating with existing systems, e.g. service portals.

VergeOS supports both **Cloud-Init**(Linux) and **Cloudbase-Init**(Windows) to customize VMs during first boot. 


Benefits of Using VM Recipes

* Rapid deployment of new virtual machines
* Consistency across VM configurations
* Reduced manual setup time
* Customizable to meet specific application needs



## Included VM Recipes
A VergeOS system install automatically includes the Service Provider(Marketplace) Repository comprised of standard VM recipes that you can be use straightaway to create new virtual machines.  The list of these available VM Recipes can be viewed by navigating to **Repositories -> (double-click) MarketPlace repository -> VM Recipes**. 

![marketplaceVMlisting](/product-guide/screenshots/marketplaceVMlisting.png)

</br >
 You can double-click on an individual VM Recipe to view its configuration.  

![included-recipe-config](/product-guide/screenshots/included-recipe-config.png)




## Create a New VM Recipe

### Base Configuration

Typically, a Recipe can be: 
* based on a particular VM that serves as the generic template for new VM instances.
When using this method, you will create a VM to serve as the base template. The VM should be generalized and suitable for the replication/customization process.
<!--would like to include some examples of what you would not want in a VM used as a recipe template -->

* configured with a Cloud image URL.
When using this method, you should locate the image to employ <!--along with list of items that need to be specified? -->  



2. From the Main Dashboard, navigate to **Machines -> New VM Recipe**.

!!! note 
Recipes are stored in [Catalogs](/product-guide/recipe-organization#Catalogs). If you do not have a local Catalog created yet, you will be prompted to create a new one first.  

3. **Recipe Fields**
    * **Name:** Use a descriptive name that adequately identifies the Recipe can help users in locating suitable recipes.
    * **Description:** (optional) You can store any additional information about this recipe here.  This is a good place to provide some documentation on the intended purpose and general guidelines of the particular Recipe. 
    * **Icon:** (optional) a Font-Awesome icon can be associated with the Recipe.  Icons can help users to easily identify different Recipes. 
    * **Catalog:** Select a Catalog in which to store the Recipe. Catalogs are helpful to keep Recipes organized.   
    * **Virtual Machine:** Select a template VM or select --None-- if the Recipe will instead utilize a Cloud Image URL. 
    * **Version:** Assign a version number. This field will automatically increment each time the recipe to help track changes.

    ??? example "Version Numbering"
        A version number of 1.0.0 would be incremented to 1.0.0-1 and then 1.0.0-2 and so forth; and you could manually edit the version number to reflect larger version changes, such as changing the version to 2.0.0 after making significant modifications. 

    * **Use Asset for Question Names:** When enabled, drive question names are based on the drive asset number rather than ordinal number.
    !!! tip "When a Recipe is based on a Virtual Machine, drive questions are created automatically (disabled by default) for each of the VM's drives, e.g.  YB_DRIVE_4_SIZE, YB_DRIVE_3_NONPERSISTENT. 

    * **Version Dependencies:** (Not applicable for Recipes that will only be used on the local system and its own tenants).  Dependencies can be specified when there are VergeOS features required for the Recipe to work properly (to prevent a remote system from using a Recipe that it can not accommodate).

4. Click **Submit** to save the base configuration.  The Recipe Dashboard will display where you can configure your sections and questions.  

### Sections
Sections allow you to group your questions.  You must define at least one section.  

5. Click **Sections** on the left menu, and click New to create.  Each section will require name and can optionally include a description.
When finished with sections, use the back button or breadcrumb to return to the VM Recipe Dashboard.

### Questions
When a Recipe is created, some questions are included automatically.  Some of these questions are disabled by default and would need to be enabled if you wish to use them.

6. To add additional questions to the Click **Questions** on the left menu, and then **New**, to add new questions. 
7. **Question Fields**
    **Section:** each question belongs to one section.
    **Name:** serves as the variable name that can be referenced in scripts; use a descriptive name to aid in script maintenance and troubleshooting; alpha-numeric characters only (no spaces or special characters)
    **Type:** determines how the data is collected via user input, interacting with the VergeOS database, downloading cloud images, etc.  The [Question Types Listing](#Types) provides descriptions below. 
    **Order ID:** used to determine the order questions are displayed (within the selected section)
    **Display:** text displayed in the VergeOS for the user to answer recipe questions
    **Default Value:** (optional) defines an initial answer value for the question
    **Regex Validation:** (optional) regular expression string used to validate input
    **Placeholder Text:** (optional) greyed text displayed to give the user an example of the expected input
    **Tooltip Text:** (optional) user help text displayed in a popup when the field is hovered with mouse
    **Note Text:** (optional) user help text displayed directly under the input field
    **On Change:** allows for hiding/showing other questions when this field is changed.  (Example code is shown in this field when creating a new question.)

Republish??

## Simulate a VM Recipe
You can simulate a VM Recipe to test out the user input form and create the answer files? but doesnt actually create the VM??

When you are finished with modifications/anytime you make mods, republish to make the changes available? what exactly does republish do? are your changes not available even locally until it is republished?


## Using a VM Recipe (from the VergeOS UI)

1. From the **Main Dashboard, navigate to Machines-> Virtual Machines -> New**.


2. **Select a VM Recipe**  
From the Catalog list at the top left, select the desired catalog containing VM recipes. In the Selections Available area on the right, choose the appropriate VM recipe. Click Next at the bottom of the screen.

3. **Configure the New VM**

Fill out the required fields. Fields will vary depending on the recipe, but typically include:

* VM Name
* Number of CPU cores
* RAM allocation
* Storage allocation

??others, network config custom??


Custom questions may include:

* Network configurations
* Application-specific settings
* OS customization options


4. **Review and Create**

Review all the entered information to ensure accuracy.
Click Submit at the bottom of the page to create the new VM.

5. Post-Creation Steps

The system will create the new VM based on the recipe and your inputs.
Once creation is complete, you'll be taken to the new VM's dashboard.
Review the VM settings and make any necessary adjustments.
Power on the VM by clicking Power On on the left menu.

## Advanced Usage
Cloud-Init/Cloudbase-init Integration
Many VM recipes in VergeOS are compatible with Cloud-Init, allowing for advanced customization:

During VM creation, look for Cloud-Init specific fields.
You can input custom Cloud-Init data to further customize the VM on first boot.
This can include tasks like setting up users, installing packages, or running scripts.

Tips for Using VM Recipes

Before creating a VM, ensure you're familiar with the recipe's requirements and included components.
Pay attention to any resource requirements specified in the recipe description.
For frequently used configurations, consider creating your own custom VM recipes.

Troubleshooting
If you encounter issues while using a VM recipe:

Verify that all input fields are filled out correctly.
Ensure your VergeOS environment has sufficient resources for the new VM.
Check the VM's console log for any boot-time errors.
If problems persist, consult your VergeOS administrator or support team.

By effectively using VM recipes, you can significantly streamline the process of creating and configuring new virtual machines in your VergeOS environment.



<a name="Types"></a>
## Question Types Listing
boolean - standard boolean, displayed as checkbox, code true/false or yes/no?
Cluster - 
Database Create - create a new record in the VergeOS database?
Database Edit - edit a record in the VergeOS database?
database Field - 
database Find - 
Date/Time - collect standard date/time?  does it default to current?  what parts of it are required, how is it stored?
Disk Size - size for a VM disk, what units can it be defined in?
Hidden - does not show on the form.  So just hard-coded?  can it be changed within the script dependent on values of other fields, for ex.?
List - 
Network - 
Number - 
Password - allows for password entry with confirmation field; entries hidden with placeholder character. 
RAM - allows for entry 
Row Selection - 
Seconds - 
String - 
Text Area - 
Virtual IP Address - 



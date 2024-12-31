# Tenant Recipes

Tenant recipes allow automating tenant deployment. A tenant recipe can include everything needed to spawn a completely functional new tenant instance, including: tenant settings, networking configuration, included virtual machines, and automation for tasks such as creating randomized passwords, establishing unique hostnames/passwords/usernames, registering DHCP and DNS entries, sending notifications, and more. This page will walk you through the basic process of creating and using tenant recipes.

**Benefits of Using Tenant Recipes:**  

* Rapid deployment of entire tenants
* Consistency across tenant configurations
* Reduced manual setup time, in turn reducing possibility of human error
* Golden images for compliancy

## Create a Tenant Recipe

1. **Build a tenant to serve as the base template.**  A tenant recipe is based on a tenant that serves as the beginning template.  Create the tenant to include settings, VMs, and networks that should be part of the generic configuration.  The tenant must be powered off prior to creating the recipe.  
!!! tip "A tenant used as the base of a recipe should be dedicated for this purpose.  If you would like to base a recipe from a tenant that is in use, you may want to work from a clone of the original.  Be sure to remove any specific information, such as passwords, particular usernames, customer data, etc. from the cloned tenant instance prior to using it as a recipe template."

2. Navigate to the **Tenant Recipes dashboard** (Home > Catalogs > Tenant Recipes).
3. Click **New** on the left menu.
4. Configure tenant recipe **fields:**
    * **Name:** Use a name that adequately identifies the recipe to help users in locating suitable recipes.
    * **Description:** (optional) You can store any additional information about the recipe here. This can be a good place to provide basic documentation on the intended purpose and any general guidelines.
    * **Icon:** (optional) a Font-Awesome icon can be associated with the recipe. Icons can help users to easily identify different recipes/recipe types. A listing of available icons is available [here](https://fontawesome.com/v4/icons/){:target="_blank"}.
    * **Catalog:** Select a catalog in which to store the recipe. Catalogs are helpful to keep recipes organized.  See [Recipe Organization](/product-guide/automation/recipes-organization) for more information about catalogs.
    * **Tenant:** Select the tenant that will serve as the base of the recipe.
    * **Version:** This field will automatically increment each time the recipe is modified, to help track changes. The default is 1.0.0, but can be changed if you would like to start the versioning with a different number.
    ??? example "Version Numbering"
        A version number of 1.0.0 would be incremented to 1.0.0-1 and then 1.0.0-2 and so forth. Additionally, you can manually edit the version number to reflect larger version changes, such as changing the version to 2.0.0 after making significant recipe modifications.

    * **Preserve SSL Certs:** When selected, SSL certificates installed in the base tenant are copied to tenant instances created with the recipe.
    * **Version Dependencies:** (not applicable for recipes that will only be used on the local system and its own tenants).  Dependencies can be specified when there are VergeOS features required for the recipe to work properly (to prevent a remote system from using a recipe that it can not accommodate).

5. Click **Submit** to save the recipe.  The tenant recipe dashboard will display where recipe questions can be customized.

## Questions

Questions provide customization values for individual tenants created with a recipe, by capturing input from the user or interacting with the VergeOS database.  A tenant recipe will automatically include system questions. Some of these questions are disabled by default and will need to be enabled if you wish to use them.  

**(Optional) Enable default disabled question(s):**  
Click **Questions** (left menu or dashboard card), **select the question(s)**, and click **Enable** on the left menu.
!!! tip "System questions can be disabled, but cannot be deleted."

To configure additional questions, Click **Questions** on the left menu, and then **New**.

**Question Fields**:

* **Section:** Sections allow you to group your questions on the input form. Some sections are created automatically and you can create additional sections for your questions from the tenant recipe dashboard.  
* **Name:** serves as the variable name that can be referenced in scripts; use a descriptive name to aid in script maintenance and troubleshooting; alpha-numeric characters only, no spaces or special characters.  
* **Type:** determines how the data is collected: via user input, interacting with the VergeOS database, etc.
* **Order ID:** used to determine the order in which questions are displayed, within the selected section.
* **Display:** the text label displayed on the user input form for the question
* **Default Value:** (optional) defines an initial answer value for the question
* **Regex Validation:** (optional) regular expression string used to validate input (standard Regex syntax)
* **Placeholder Text:** (optional) greyed text displayed to give the user an example of the expected input  
* **Tooltip Text:** (optional) user help text displayed in a popup when the field is hovered with a mouse
* **Note Text:** (optional) user help text displayed directly under the input field to provide extra user guidance.
* **On Change:** allows for hiding/showing other questions when this field is changed.  (Example code is shown in this field when creating a new question.)  

Additional configuration options may be available dependent on the type selected.

### Interacting with the VergeOS Database

Some question types allow you to lookup database information or create/edit database records.  Notice placeholder text (greyed text displaying example input) when configuring database interaction questions for hints.  These Knowledge Base articles provide additional information about working with the VergeOS database: [The API Tables Description](/knowledge-base/api-tables-description) and [The API Guide](/knowledge-base/verge-api-guide)  

#### Database Context

The *Database Context* field allows you to choose to interact with the local database (the parent system) or the database of the newly-created tenant.  This applies to question types: *Database Create, Database Edit, and Database Find*.

## Modify a Recipe

When any changes are made to a recipe, it will need to be republished in order to make those changes available.  The top of the recipe dashboard will display a message indicating that it must be republished for changes to take effect.  You can use the **Republish** link within this message or click Republish on the left menu.

!!! tip "When you make changes and republish a recipe, remote systems and tenants with access to the recipe are notified that an update is available (notification at the top of the tenant recipe dashboard and update available checkbox); they must update the recipe to access the changes."

## Use a Tenant Recipe

### Create a Tenant from Recipe

1. From the Main Dashboard, click **Tenants > New**.
2. Click the desired **catalog** from the catalogs section on the left.
3. The individual tenant recipes available in the selected catalog will appear on the right side.  **Select the desired recipe** and click **Next** at the bottom of the screen.
4. Input fields are presented as defined by the recipe's questions.
5. Enter/Configure fields and click **Submit** to create the new tenant.  Recipe question configuration will determine required fields and other field validation.

## Recipe Instances

An instance refers to a specific tenant that is associated with a tenant recipe.  When a tenant is created from a recipe it is considered an instance of the recipe until it is deleted or detached from the recipe.

Click **Instances** on the left menu of a tenant recipe dashboard to quickly access a listing of associated tenants. A recipe cannot be deleted when there are any associated instances.

!!! tip "**Reference Example**"
    The "***30-Day Trial (POC)***", shared by default to your tenant recipes, provides an example of some of the things that can be done with a tenant recipe. Although it cannot be directly edited, you can clone this recipe to view the question configuration as a reference.

Recipes allow for a wide variety of potential solutions. Contact VergeOS Support for additional assistance in automating your tenant deployments using recipes.

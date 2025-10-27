# Getting Started with the VergeOS UI

The following guide provides an overview of the VergeOS User Interface (UI), covering the most basic, essential UI concepts to help you get oriented quickly.


??? note "Transitioning from version 4.13 to version 26"
    If you are already familiar with a previous version of VergeOS, this section can give you the basics for shifting to the updated user interface.

    While VergeOSv26 introduces a refreshed look and several usability enhancements, the core structure remains comfortably familiar. The interface still follows the **overview-to-detail dashboard model** that echoes the layout of version 4.13. Users will find the same general flow, with minor organizational updates that improve clarity and accessibility.

    ## What’s New in 26

    While the UI retains much of its familiar structure, a few notable changes enhance usability:

    - **Persistent top navigation bar**: The main menu now remains visible at all times, making it easier to switch contexts without losing your place.
    - **Status indicators redesigned**: Tiles and cards now display **status bars** instead of circular indicators, offering clearer visual feedback.
    - **Minor menu reorganization**: Some navigation elements have been regrouped for better logical flow.
    - **Session History Navigation**: Rather than relying on breadcrumbs, the browser's back button can be used to effectively move backward through the session's history of pages.    

    Key improvements include:  

    * Enhanced visual cues to help you better **understand where you are** in the interface and **see all available options** at a glance.
    * A **modernized look and feel**, offering a more polished and intuitive experience.
    * Continued focus on delivering a **robust, convenient interface** that supports both new and experienced users.

    

## Navigation Model

* Overview-to-Detail 
* convenient, quick way to get the information you need
* starting at the top level summary information and drill down to individual assets and more and more detail as needed
* counts, status indicators, summaries, alarms at the high levels
* Click on these items to view more granular information about the summary or asset, etc.


## Dashboards

Starting at the home screen - the Main Dashboard for your VergeOS Cloud. It provides overall system information, including:

- Top-level, statistical information for the VergeOS Cloud
- Main system logs
- Left Navigation menu to access subsections of the application
- Quick links within the Dashboard section to drill down to subsections

From there, you can click on different general areas of the system, such as networking, virtual machines, Users to see information more specific to those sections.  Within those sections, you can select specific instances - such as a particular network, or an individual VM, to investigate the particular object. 

### Dashboard Examples

Dashboards, providing at-a-glance information (and quick-link access to more detailed information), are available throughout the system. Subsections, such as networks, machines, and storage each have one. Specific instances of objects also have their own dashboard as well, such as each individual: VM, network, node, tenant, etc. Every dashboard contains many links that can be used to dive further into more detailed information.

#### Example 1: Networks Dashboard

The Networks Dashboard provides overall network statistics, network-related logs, and links to drill down into more detailed information per network, network device, etc.

![Networks Dashboard](/product-guide/screenshots/networksdashboard.png)

#### Example 2: VM Dashboard

There is a dashboard available for each individual virtual machine. The dashboard for a VM will show important information for the specific instance. Links on the VM dashboard allow for accessing detailed information regarding its drives, NICS, snapshots, devices, host node, etc.

![VM Dashboard](/product-guide/screenshots/vmdashboard.png)


## Menus

* **Top Navigation:**  
A persistent menu bar that provides access to all major application modules, regardless of your current location within the interface
* The **Left menu:**  
Displays context-sensitive actions based on your current location in the application. Your current module or view is indicated near the top of the screen, adjacent to this menu. 
* **User Menu:** 
Located in the top-right corner, this menu offers user-specific settings such as updating your display name, changing your password, managing SSH keys, and more.


## Themes

Themes control the look and feel for the user interface, including colors and icons, allowing you to customize the visual experience without changing any underlying functionality.  VergeOS includes a **default Light Mode** and a **default Dark Mode** theme.  Customers can also create custom themes, such as a branded theme to match a company's identity.  


To select a different theme, click the theme icon in the utility bar (top right).  


## Auto-Refresh 

icon in user menu (top right) 
include icon
toggle between auto refresh enabled and disabled
orange = enabled
white = disabled
when auto refresh enabled:
when disabled: 
enabled by default
why would you disable?



## Product Documentation/Help

Context-sensitive help documentation can be accessed from the user interface:
  * *Product Guide* Link at the bottom of the page   
  * Click the [?] icon in the utility bar and select *Product Guide*


## Object Tagging
The [Tagging System](/product-guide/system/tagging) allows you to create user-defined tags and categories to customize identification and organization of objects within your system.
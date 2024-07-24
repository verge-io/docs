---
title: Product Guide - Permissions
description: Explanation of permissions structure and defaults along with examples.  Also includes instructions for viewing, granting, and modifying permissions.
published: true
date: 2023-06-26T15:10:28.485Z
tags: 
editor: markdown
dateCreated: 2023-03-31T20:02:44.625Z
---

# Permissions

User and group permissions provide for a high degree of granularity, allowing access to be configured down to a particular object instance. Users are created and administered for each separate cloud; each tenant created is a separate VergeIO cloud and thus has its own users, groups and permission settings to control activity within the tenant.

<br>
<br>

## Permission Levels

The following Permission levels are used throughout the system:

-   list
-   read
-   create
-   modify
-   delete

<br>

## Permission Scopes

-   **Cloud level** - Permission applies to the entire Cloud - all areas
-   **Object Types** - Permission applies to all objects of that Type (e.g. virtual machines, tenants, users, networks, etc))
-   **Individual objects** - Permission applies to a specific object instance e.g. individual virtual machine, a particular tenant, a specific user, etc.

<br>


## Root-Level "admin" Account

When a VergeIO cloud is created (during initial install on hardware or when a new tenant is created,) **a root-level user account is automatically created and is granted full access (list/read/create/modify/delete) to the entire cloud.** By default, this user is named 'admin'; however, the account can be named as desired during hardware installation or can be changed post-installation/post-tenant creation. This special system user cannot be deleted.
<br>


## New User Default Permissions

-   **Type = Normal/API:** list/read to everything; list/read/modify to his/her own user
-   **Type = VDI:** list to everything; list/read/modify to his/her own user.

After a user is created, the user's permissions can be customized as needed.
<br>
<br>

## Effective Permissions

The effective permissions of a user is cumulative of all permissions assigned to the user, including those directly assigned, and permissions via group memberships. Permissions can be granted at an object-type level giving the user permissions to all objects of a certain type or can be given to specific instances of objects. Permissions are verified at the time an action is initiated; if any permission assigned to the user (or to a group of which the user is a member) applies, the operation is allowed.

<br>

### Example 1:

-   JSmith is assigned list/read permissions to the Cloud.
-   JSmith is a member of the "machine-operators" group; the "machine-operators" group is assigned full (list/read/create/modify/ delete) permissions to virtual machines.
-   JSmith is a member of the "assistants" group; the "assistants" group is assigned only list/read/modify permissions to several particular virtual machines.
-   Effective permissions for JSmith for all virtual machines: list/read/create/modify.
   ***Since permissions are cumulative, JSmith would have list/read/create/modify/delete permissions to all virtual machines, even if more restrictive permissions were defined on a particular virtual machine instance.***
<br>

### Example 2:

-   RJohnson is assigned list/read permissions to the Cloud.
-   RJohnson is a member of the "tenant-admins" group; the "tenant-admins" group is assigned permissions of list/read/modify to tenants.
-   RJohnson is assigned list/read/modify/delete permissions to the particular "Zcorp" tenant.
-   Effective permissions for RJohnson for all tenants: list/read/modify
-   Effective permissions for RJohnson for the "Zcorp" tenant: list/read/modify/delete.


<br>
<br>

## To Give a User Full Permissions to Entire VergeIO Cloud:

1.  From the Cloud Dashboard, select **System**.
2.  Click **Permissions**.
3.  Click **Add User**.
4.  Select the desired user from the ***User Name*** dropdown.
5.  Check the boxes for ***list***, ***read***, ***create***, ***modify***, and ***delete***.
6.  In the ***Type*** dropdown field, select **"Your Cloud" (default)**.
7.  ***\--All sections--*** will be selected by default
8.  Click the **Submit** button.
<br>


## To View a User's Permissions:

1.  From the Cloud dashboard, Click **System**.
2.  Click **Users**. This will display a list of all users.
3.  **Double-click the desired user** in the list The user Dashboard appears, all permissions assigned to the user are displayed. 

> Remember: users can also have permissions via group memberships; group memberships are also displayed on the User Dashboard.{.is-success}

<br>


## To Give a User/Group Permissions to All Objects of a Certain Type (e.g. machines, users, tenants, etc)

1.  From the Cloud Dashboard, Click **System**.
2.  Click **Permissions**.
3.  Click **Add User** or **Add Group**
4.  Select the desired **User/Group** from the first dropdown.
5.  Check the boxes for desired access levels (***list/read/create/modify/delete***).
6.  In the ***Type*** dropdown field, select the object type to apply this permission to.
7.  In the ***Name*** dropdown field, select ***\--All--***
8.  Click the **Submit** button.
<br>


## To Give a User/Group Permissions to a Specific Object Instance (e.g. a particular VM)

1.  From the Cloud Dashboard, select **System**.
2.  Select **Permissions**.
3.  Click **Add User** or **Add Group**.
    -   Select the desired **User/Group** from the first dropdown.
    -   Check the boxes for desired access levels (***list/read/create/modify/delete***).
    -   In the ***Type*** dropdown field, select the object type to apply this permission to.
    -   In the ***Name*** dropdown field, select the particular object (for example, the name of the particular virtual machine)
4.  Click the **Submit** button.
<br>


## To View all Permissions:
This will display all permissions defined for the VergeIO Cloud.
1.  From the Main Dashboard, click **System**.
2.  Click **Permissions**.
3.  All permissions for the entire cloud are displayed. Hint: List can be sorted or filtered to focus on certain permissions.
4.  Permissions can be selected from the list to edit/delete.
<br>


##  To View Permissions for a Particular Section:
Permissions can be viewed for a particular section of the system; for example, from the Virtual Machines Dashboard - view all the permissions for VMs; or from a specific virtual machine dashboard - view all the permissions for that particular VM.

1.  From the desired section, click **Permissions** on the left menu. Hint: The Type field will display the general section to which the permission applies; while the Name field will indicate it applies to all objects of that particular type or will display the name of the particular object to which it applies.
2.  Permissions can be selected from the list to edit or delete.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
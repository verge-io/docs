---
title: Product Guide -VDI Instructions for the Administrator
description: VDI instructions for the administrator, including creating a VDI user, giving console access to a VDI user, assigning a VM owner, adding VMs to a normal user's VM favorites
published: true
date: 2023-06-23T14:57:30.203Z
tags: 
editor: markdown
dateCreated: 2023-04-10T19:52:01.777Z
---

# VDI Instructions for the Administrator
<br>

<br>

## User type=VDI

A user of type=VDI accesses only the VDI portion of the user interface. When a VDI user logs in, the VDI Dashboard appear displaying all of the VMS to which the user has access.

The following screenshot shows a sample VDI User Dashboard. In this example, the VDI User has access to 5 VMs.

![vdi-myvirtualmachines.png](/public/userguide-sshots/vdi-myvirtualmachines.png)

<br>



> To create a VDI User, create a new user and select VDI in the user type field. {.is-info}


<br>



### To Give VM Console Access to a VDI User:
> A VDI User has console access to any VM to which they have at least List and Read permissions (either directly or indirectly via Group membership). The following instructions give the simplest way to give a user console access to multiple VMs at once; this automatically assigns the List/Read permissions.{.is-success}

1.  Navigate to the **User Dashboard** (Users ->double-click User in the listing.)
2.  Click **VM Console Access** on the left menu.
3.  Click **Add VMs to Direct** on the left menu.
4.  **Select the desired VM(s)** in the list. (***Hint:*** *Holding Shift or Ctrl allows selecting multiple VMs.)*
5.  When desired VM(s) selected, click **Add.**
You are returned to the VM Console Access page.

![vdi-consoleaccesss-screen.png](/public/userguide-sshots/vdi-consoleaccesss-screen.png)

<br>

#### To Additionally Give the VDI User Permission to Power on the VM (Optional):

6.  Navigate to the **User Dashboard** (Users ->Double-click User in the listing.)
7.  Click **Permissions** on the left menu.
8.  **Double-click** the existing **Permission for the VM** in the list (Type=Virtual Machines, Name=*NameofVM*)
9.  Enable the Permissions ***modify*** checkbox.
10.  Click **Submit** to save the change.


<br>
<br>
<br>

## **User type=Normal**

A user of type=Normal has access to the complete user interface. When a normal user logs in, they are taken to the main Dashboard from which all system components can be accessed (user-permission dependent). A normal user accesses his VDI Dashboard by selecting ***My Virtual Machines*** from the left menu. A Normal User sees favorited VMs in their VDI Dashboard.

<br>

### To add VMs to a Normal User's VM Favorites (adds the VM to the User's VDI Dashboard):

1.  Navigate to the **User Dashboard** (Users ->Double-click User in the listing.)
2.  Click **VM favorites** on the left menu.
3.  Click **Add VMs** on the left menu.
4.  **Select** the desired **VM(s)** in the list. (***Hint:*** *Hold Shift or Ctrl to select multiple VMs.)*
5.  When desired VM(s) selected, click **Add.**

> Normal Users can also add their own VM favorites, by clicking the star icon at the top of a VM's dashboard page.{.is-info}

<br>
<br>
<br>

## **VM Owner**

If a VM is assigned an ***Owner User***, the VM will automatically be deleted if the associated *owner User* is deleted. Assigning a user as the *Owner User* will also automatically assign proper permissions to give the user console access to the VM (List/Read permissions).

<br>


### To Assign an Owner User to a VM:

1.  Navigate to the **VM Dashboard** (Main Dashboard ->Machines -> Virtual Machines ->double-click the VM in the listing.)
2.  Click **Edit** on the left menu.
3.  In the ***Owner User*** field, select the User from the dropdown list.
4.  Click **Submit** to save the change.

<br>   

   > If you would like to request a KB based on a specific subject, please email our support team at <a href="mailto:support@verge.io?subject=KB Request" target="_blank" rel="noopener noreferrer">support@verge.io.</a>{.is-info}



<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }
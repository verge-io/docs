# VDI Administrator Instructions

## User type=VDI

A user of type=VDI accesses only the VDI portion of the user interface. When a VDI user logs in, their VDI Dashboard is displayed with all of the VMs to which they have access.

!!! info
    To create a VDI user, create a new user and select VDI in the user type field.

### Give VM Console Access to a VDI user

!!! success
    A VDI user has console access to any VM to which they have at least List and Read permissions (either directly or indirectly via Group membership). The following instructions give the simplest way to give a user console access to multiple VMs at once; this automatically assigns the List/Read permissions.

1. Navigate to the **user Dashboard** (Users > double-click user in the listing.)
2. Click **VM Console Access** on the left menu.
3. Click **Add VMs to Direct** on the left menu.
4. **Select the desired VM(s)** in the list. (***Hint:*** *Holding Shift or Ctrl allows selecting multiple VMs.)*
5. When desired VM(s) selected, click **Add.**
You are returned to the VM Console Access page.
6. **To Additionally Give the VDI user Permission to Power on the VM (Optional):**
    - Navigate to the **user Dashboard** (Users ->Double-click user in the listing.)
    - Click **Permissions** on the left menu.
    - **Double-click** the existing **Permission for the VM** in the list (Type=Virtual Machines, Name=*NameofVM*)
    - Enable the Permissions ***modify*** checkbox.

7. Click **Submit** to save the change.

## User type=Normal

A user of type=Normal has access to the complete user interface. When a normal user logs in, they are taken to the Main Dashboard from which all system components can be accessed (user-permission dependent). A normal user accesses their VDI Dashboard by selecting ***My Virtual Machines*** from the left menu. A Normal user sees favorited VMs in their VDI Dashboard.

### Add VMs to a Normal user's VM Favorites

The following steps add VM(s) to the user's VDI Dashboard

1. Navigate to the **user dashboard** (Users > Double-click user in the listing.)
2. Click **VM favorites** on the left menu.
3. Click **Add VMs** on the left menu.
4. **Select** the desired **VM(s)** in the list. (***Hint:*** *Hold Shift or Ctrl to select multiple VMs.)*
5. When desired VM(s) selected, click **Add.**

!!! info
    Normal users can also add their own VM favorites, by clicking the star icon at the top of a VM's dashboard page.

## **VM Owner**

If a VM is assigned an ***Owner user***, the VM will automatically be deleted if the associated *owner user* is deleted. Assigning a user as the *Owner user* will also automatically assign proper permissions to give the user console access to the VM (List/Read permissions).

### Assign an *Owner user* to a VM

1. Navigate to the **VM Dashboard** (from the top menu: Virtual Machines > List > double-click the VM in the listing.)
2. Click **Edit** on the left menu.
3. In the ***Owner user*** field, select the user from the dropdown list.
4. Click **Submit** to save the change.

---
title: "VDI User Instructions"
description: "End-user guide for accessing virtual desktops via the VDI dashboard, using the VM console, changing passwords, and managing two-factor authentication."
semantic_keywords:
  - "VDI user how to access virtual desktop"
  - "use VM console from VDI dashboard"
  - "change password two-factor authentication VDI"
  - "VDI favorites and message center"
use_cases:
  - access_virtual_desktop
  - use_vm_console
  - change_vdi_password
  - configure_two_factor_authentication
tags:
  - vdi
  - virtual-desktops
  - user-guide
  - console
  - authentication
  - password
  - virtual-machines
categories:
  - Virtual Machines
  - VDI
---

# VDI User Instructions

## The VDI Dashboard

### VDI users

- Your VDI Dashboard displays all the virtual desktops to which you have access.
- Your VDI Dashboard displays immediately upon login.

### Normal users

- Your VDI Dashboard displays all VMs that have been designated as **Favorites**.
- To access your VDI Dashboard navigate to: **Machines** > **My Virtual Machines**.

## Using the VM Console

The console gives you keyboard and mouse access to the virtual machine. To access the console, simply click the desired Virtual Machine on your VDI Dashboard. Note: VM must be running; if it is not, a message will appear for you to confirm powering on the VM (permission required); click Yes to confirm. Once the VM shows running, click again to access the Remote Console. See [**Using the Console**](/product-guide/virtual-machines/vm-remote-console) for help with working within the remote console.

## Changing Password or user Settings

### To Change your Password

1. **Click your Username** in the top right corner.
2. Click **Edit user** in the drop-down menu.
3. Enter the new ***Password***
4. Enter the new password again into the Confirm Password field.
!!! info
    The password will only be accepted if it meets the requirements for your organization; requirements will appear in the tip under the confirm password entry field. (Requirements may include: a minimum length, one special character; one number; one capital letter, etc.)

5. Click **Submit** to save the change.

### Two Factor Authentication

Two Factor Authentication establishes additional security for logins by requiring additional authorization through your email address or a special TOTP (time-based, one-time passcode), in addition to proper username and password. **If your system administrator has required Two Factor Authentication, it is automatically enabled for all users and the option does not appear in your settings.**

If the *Two Factor Authentication* option is disabled (unchecked), you will simply need to enter the appropriate username and password to log in to the user interface. If the option is enabled (checked), login will also require a code that is sent to your associated email address or obtained using a TOTP application.  

!!! warning
    When *Two-Factor Authentication* (via Email) is enabled, it is very important that the email address configured on your account is an email to which you have access, in order to retrieve the code for successful login.

## Messages

The Message Center icon will indicate if you have any new messages from the administrator.

**To View your Messages:**

1. **Click the Message Center icon** near the top right corner.
2. **Double-click the desired message** to see the full communication.
3. Click **Acknowledge** on the left menu to keep the message and mark it as acknowledged and click **Yes** to confirm.

!!! success
    - Click the Message Inbox breadcrumb (near the top left) to return to the Message listing.
    - Click the My Virtual Machines breadcrumb (near the top left) to return to the VDI Dashboard.

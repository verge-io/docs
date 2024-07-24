---
title: Product Guide - Two-Factor Authentication
description: Explanation and configuration instructions for Two-factor authentication
published: true
date: 2023-06-27T13:35:12.686Z
tags: 
editor: markdown
dateCreated: 2023-03-23T15:31:28.363Z
---

# Two Factor Authentication

Two-factor authentication is an option that provides an added layer of security for user logins. When two-factor authentication is enabled, login requires authorization via the user's email address in addition to the username and password. The first time a user initiates login from a new device, a security code is emailed to the user's email address. This code then must be entered to complete the login process. Optionally, the user can select to store the security code on the local device, for automatic retrieval on subsequent login actions from the same local device. (This function is intended for personal devices, such as a user's home computer, personal laptop, cellphone, etc.)


<br>

## System Settings for Two Factor Authentication

To access these settings, navigate to **System -> Settings -> Advanced Settings**  from the Main Dashboard.

- ***Two-factor authentication:***

  -   **Default Disabled (off)*** - new users are created with Two Factor authentication disabled; optionally it can be enabled per user.
  -   **Default Enabled** - new users are created with Two Factor authentication option enabled; option can be disabled per user.
  -   **Required** - all users automatically set to use Two Factor authentication; option cannot be disabled for any user.

<br>

- ***Two-factor authentication expiration time for temporary codes (seconds)***
  **default = 300 seconds (5 min)**
This setting determines the length of time a security code is valid.  For example, using the default setting of 300 seconds, the code must be entered within 5 minutes (300 seconds) of the time it was issued.

<br>

- ***Two-factor authentication expiration time for authenticated user devices (0 for never expire)***
**default = 7884000 seconds (roughly 91 days)**
This setting determines the amount of time a security code is stored on a user's local device. For example: On a system in which the setting is changed to 864000; a user logs into a laptop, uses the security code received via email and selects the option labeled "This is a private computer"; the security code is stored and automatically applied for the user on this device for 864000 seconds (10 days) so the user will not need to retrieve the security code from email and enter it in again during all the login attempts for the next 10 days.  If the system setting is set to 0, there is no expiration on locally stored security codes.

<br>
<br>

### To Enable Two-Factor Authentication for a User

> If the system setting is set as Two-factor authentication = Required, all users automatically have Two-factor authentication enabled and the option does not appear on the User edit form. {.is-info}

1.  From the Main Dashboard, click the **Users** quick link.
2.  Click to **Select the desired User**.
3.  Click **Edit** on the left menu.
4.  Select the checkbox option ***Two Factor Authentication***.
5.  The ***Email Address*** field becomes required when Two Factor Authentication is enabled. Verify that a valid, accessible email address is entered for the user as security codes (necessary for login) will be sent to the Email address specified.
6.  Click **Submit** to save the change.

<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

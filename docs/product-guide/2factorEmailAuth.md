# Multi-Factor Authentication

## Overview

The two-factor authentication option provides an added layer of security for user logins authenticated through VergeOS. When two-factor authentication is enabled, login requires additional verification for login.  Users configured with two-factor Authentication are required to provide a code in addition to their username and password.  Two-factor authentication can be configured to use either the user's email or a TOTP standard authenticator application to provide the necessary code for login.

## System Settings for Two-Factor Authentication

To access these settings, navigate to **System > Settings > Advanced Settings** from the Main Dashboard.

**Two-factor authentication**:

* **Default Disabled (off)** - new users are created with Two-factor authentication disabled; optionally it can be enabled per user.
* **Default Enabled** - new users are created with two-factor authentication option enabled; option can be disabled per user.
* **Required** - all users automatically set to use two-factor authentication; option cannot be disabled for any user.

**Two-factor authentication expiration time for temporary codes (seconds)**:

* **default = 300 seconds (5 min)**
* This setting determines the length of time a security code is valid.  For example, using the default setting of 300 seconds, the code must be entered within 5 minutes (300 seconds) of the time it was issued.

**Two-factor authentication expiration time for authenticated user devices (0 for never expire)**:

* **default = 7884000 seconds (roughly 91 days)**
* This setting determines the amount of time a security code is stored on a user's local device. For example: On a system in which the setting is changed to 864000; a user logs into a laptop, uses the security code received via email and selects the option labeled "This is a private computer"; the security code is stored and automatically applied for the user on this device for 864000 seconds (10 days) so the user will not need to retrieve the security code from email and enter it in again during all the login attempts for the next 10 days.  If the system setting is set to 0, there is no expiration on locally stored security codes.

## Configure User Two-Factor Authentication

1. Create a new User/Edit an existing User (For full user Configuration instructions see: [Users](/product-guide/usersgroups))
2. Select the checkbox option: **Two Factor Authentication** and select the **Two Factor Type *(Email or TOTP)***.
!!! tip "If the system setting is set as Two-factor authentication = Required, all users automatically have Two-factor authentication enabled and the checkbox option does not appear on the User entry form."
3. Select the **Two Factor Type**: ***Email or TOTP***.
4. When Type is set to ***TOTP***: selecting the checkbox option **Configure 2FA At Next Login** will allow the user to configure their own authenticator app account upon first login.  If you do not select this option, you will be prompted to configure TOTP for the user when you hit submit.
5. **Email Address** is required when *Two Factor* Authentication is enabled. Verify that a valid, accessible email address is entered for the user as Email security codes, necessary for login, will be sent to the address specified.
6. Click **Submit** to save the change.

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }


# Configure a VergeOS OIDC Client System

This guide provides instructions for configuring a system or tenant to utilize a VergeOS OIDC identify provider (a host or remote system with a configured OIDC application).

1. [**Obtain Well Known Configuration URL**](/product-guide/auth/oidc-create-application#next-steps) from the VergeOS OIDC provider system.

2. [**Obtain Client ID and Client Secret**](/product-guide/auth/oidc-create-application#next-steps) from the VergeOS OIDC provider system.

3. From the Main Dashboard click **System** on the left menu.
4. Click **Authorization Sources** on the left menu.
5. Click **New** on the left menu.

6. **Configure:**  

* **Name**: provide a label to identify this authorization source; it will appear on the sign-in button of the VergeOS login page.

* **Driver**: ***OpenID (Well Known Config)***
* **Base URL:** Paste the Well Known Configuration URL copied from the VergeOS provider system (e.g. `https://myvergesystem.example.com/oauth2/.well-known/openid-configuration`) See Step 1.
* **Redirect URI:** Full URL to this VergeOS client system
* **Token hint parameter for logout session**: *default:"post_logout_redirect_uri"* Typically, this field should be left at the default value. Value is the actual ID Token that was received earlier from the OIDC provider.
* **Redirect parameter for logout session**: *default:"post_logout_redirect_uri"* Typically, this field should be left at the default value. This is also commonly named "logout_redirect".
* **Client ID**: Paste client ID from the VergeOS provider. (See step 2.)
* **Client Secret**: Paste Client Secret from the VergeOS provider. (See step 2.)

## Recommended Enabled options

* **Decode ID Token:** this option should typically be enabled for VergeOS ODIC clients. When unchecked, requests are sent to userinfo endpoint.
* **Update Remote User:** updates the *Remote Username* field of the user from the provider system
* **Update User Email Address:** updates Email address field based on email address from the provider system
* **Update User Display Name:** updates user display name based on display name from the provider system
* **Update Group Membership:** update user's group membership (each time user logs in) to correspond with group membership from the provider system

## Further Options

**Scope:** *default: "openid profile email groups"* In most cases this field should be left at the default value.
**Group Scope:** should be left at the default value: "groups". **Note:** Group Scope is **required when using the *Update Group Membership*** option.
**Require Verified Email Address:** this option should be left disabled.

**Debug Mode:*** (checkbox) turns on verbose logging for this authorization source; this should only be enabled when troubleshooting because large amounts of authentication logging can potentially impact performance.

**Show In A Menu:** (checkbox) changes the login display to show a drop-down menu instead of a button.

---

## User Creation

* **Auto-Create Users:** users are created automatically (on-demand, upon initial VergeOS login) corresponding to users in the provider system. Use "**.\***" without the quotes to apply to all users.
* **Auto-Create Users in Group:** only users within specified source groups are created automatically, on-demand, upon initial login. A specific group name can be entered or a regular expression to include group(s) with matching pattern.

!!! tip "In order to auto-create users based on group(s), the *Auto-Create Users* field should be blank."

!!! note "Manual User Creation (optional)"
    Users can optionally be created manually; when creating the new user: select appropriate **Authorization Source** (dropdown list). Set ***Remote Username*** to match one of the fields defined in *Remote User Fields* (fields that are used to find the user in the external authorization source); username should be matched to username on the source system.

## Login Styling

Login styling defines the appearance of the sign-in button on the VergeOS login page.

* ***Sign-in Button Background Color:*** background color for the sign-in button.
* ***Sign-in Button Text Color:*** text color of the sign-in button.
* **Sign-in Button Font Awesome Icon:*** specifies an alternate icon for the sign-in button; a listing of available Font Awesome Icons can be found: [here](https://fontawesome.com/v4.7.0/cheatsheet/).
* ***Sign-in Button Font Awesome Icon Color:*** specifies an alternate color for the sign-in button; use standard HEX code, e.g. #FF5733.

7. When finished entering/configuring options, click **Submit** to save the new authorization source.

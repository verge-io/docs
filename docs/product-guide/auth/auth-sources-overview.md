
# Authorization Sources - Overview

Authorization Sources allow utilizing third party Oauth2 identity management systems (such as: Okta, GitLab, Azure AD, Google) for user authentication in VergeOS.

!!! note "While Oauth2 is a standard specification, different implementations will vary. This page provides **generalized instructions** for configuring a third-party Oauth Source to be used for VergeOS authentication; specific fields and settings will differ depending on the selected driver (Google, Azure, OpenID, GitLab, etc.). Consult specific Oauth source documentation for information on particular options."

The following links provide source-specific instructions:  

* [Google](/product-guide/auth/google-auth)
* [Azure](/product-guide/auth/azure-auth)
* [VergeOS OIDC](/product-guide/auth/oidc-vergeos-relying-party)

## Creating an Authorization Source - General Instructions

1. Obtain **Client ID** and **Client Secret** from the third-party system; these credentials must be created **based on the URL of the VergeOS system**.  These values willl be needed in a later step.
2. From the VergeOS Main Dashboard, click **System** on the left menu.
3. Click **Auth Sources** on the left menu.
4. Click **New** on the left menu.
5. ***Name:*** a name to identify this authorization source; this name will appear on the sign on button on the VergeOS login page.
6. ***Driver:*** (dropdown list)
- Azure AD
- GitLab
- Google
- Okta
- Open ID **\***
- Open ID (Well-Known Config)
- code>Verge.io</code> (This can be used to allow streamlined access for support; contact the VergeOS Support team for configuring this type of auth source.)

> *The OpenID setting provides a generic option that could work for any OpenID source, while specific options, such as: Google, GitLab, Okta, and Azure AD provide wrappers with configuration forms that are more specialized for that particular implementation. {.is-success}

7. ***Redirect URI:*** automatically populated with the address of the VergeOS UI and normally shouldn't be changed. **This address must be a public address or otherwise accessible by the remote Oauth source.**
8. ***Client ID*** and ***Client Secret:*** values generated on the remote Oauth source, based on the URL of the VergeOS system.
9. Additional Configuration:


## Additional Fields

***Remote User Fields:*** defines one or more fields that can be used for locating users in the Oauth source. The field is auto-populated with a default list of common fields (sub,preferred\_username,email,nickname) that work across various common Oauth implementations
> **For security reasons, it is Not recommended to locate remote users based on fields that are changeable by end user on the Oauth sources.** {.is-warning}

### Recommended Options (It is recommended these options be enabled.)

- ***Update Remote User:*** updates the *Remote Username* field,of the VergeOS user, to the unique ID from the Oauth Source. Enabling this option allows for initially locating the user based on more friendly fields (defined in *Remote User Fields*, above) but subsequently changing the VergeOS *Remote Username* field to match a unique id from the Source system. This ensures the user record remains constant even as extraneous fields such as email address or friendly username may change over time.
- ***Update User Email Address:*** updates Email address field based on email address from the Oauth source.
- ***Update User Display Name:*** updates user display name based on display name from the Oauth source.

### Additional Optional Fields:

- ***Scope:*** varies with different implementations; consult source Oauth2 documentation, where appropriate for more information. In most cases the default "openid profile email" will work.
- ***Group Scope:*** varies with different implementations; consult source Oauth2 documentation for more information. In most cases, the Group Scope can be set to the word "groups". **Note:** Group Scope is **required when using the *Update Group Membership*** option.
- ***Require Verified Email Address:*** (for Oauth2 implementations that support verifying user email address) only allow authentication of users with the verified email address flag enabled/true in the source.
- ***Update Group Membership:*** update user's group membership (each time user logs in) to correspond with group membership from the Oauth source

***Debug Mode:*** (checkbox) turns on verbose logging for this authorization source; this should only be enabled when troubleshooting because large amounts of authentication logging can potentially impact performance.

***Show In A Menu:*** (checkbox) changes the display to show a drop-down menu instead of a list.

---

### User Creation

- ***Auto-Create Users:*** users are created automatically (on-demand, upon initial VergeOS login) corresponding to users in the Oauth source. Use "**.\***" without the quotes to apply to all users.
- ***Auto-Create Users in Group:*** only users within specified Oauth2 source groups are created automatically, on-demand, upon initial login. A specific group name can be entered or a regular expression to include group(s) with matching pattern.

> In order to auto-create users based on group(s), the *Auto-Create Users* field should be blank. {.is-info}
> Users that will use an external Authorization Source can optionally be created manually in VergeOS; when creating the new VergeOS user:
Select appropriate ***Authorization Source*** (dropdown list).
Set ***Remote Username*** to match one of the fields defined in *Remote User Fields* (fields that are used to find the user in the external authorization source); typically it is best to use the user's login name or unique user ID. {.is-info}

### Login Styling

Login styling defines the appearance of the sign-in button on the VergeOS login page.

- ***Sign-in Button Background Color:*** background color for the sign-in button.
- ***Sign-in Button Text Color:*** text color of the sign-in button.
- **Sign-in Button Font Awesome Icon:*** specifies an alternate icon for the sign-in button; a listing of available Font Awesome Icons can be found: [here](https://fontawesome.com/v4.7.0/cheatsheet/).
- ***Sign-in Button Font Awesome Icon Color:*** specifies an alternate color for the sign-in button; use standard HEX code, ex: #FF5733.

# Authorization Sources - General Information

Authorization sources allow utilizing third party OAuth2 identity management systems (such as: Okta, GitLab, Azure AD, Google) for user authentication in VergeOS.

!!! info  "While OAuth2 is a standard specification, different implementations will vary. This page provides **generalized instructions** for configuring a third-party OAuth source to be used for VergeOS authentication; specific fields and settings will differ depending on the selected driver (Google, Azure, OpenID, GitLab, etc.). Consult specific OAuth source documentation for information on particular options."


## General Instructions for Creating an Authorization Source

1. Obtain **Client ID** and **Client Secret** from the third-party system; these credentials must be created **based on the URL of the VergeOS system**. These values will be needed in a later step.
2. From the VergeOS Main Dashboard, click **System** on the left menu.
3. Click **Auth Sources** on the left menu.
4. Click **New** on the left menu.

### Configuration

- ***Name:*** a name to identify this authorization source; this name will appear on the sign on button on the VergeOS login page.
- ***Driver:*** (dropdown list)

  - ***Azure AD***
  - ***GitLab***
  - ***Google***
  - ***Okta***
  - ***Open ID***
  - ***Open ID (Well-Known Config)***
  - ***Verge.io*** (This can be used to allow streamlined access for support; contact the VergeOS Support team for configuring this type of auth source.)

!!! success
    The OpenID setting provides a generic option that could work for any OpenID source, while specific options, such as: Google, GitLab, Okta, and Azure AD provide wrappers with configuration forms that are more specialized for that particular implementation.

- **Redirect URI:** automatically populated with the address of the VergeOS UI and normally shouldn't be changed. **This address must be a public address or otherwise accessible by the remote OAuth source.**
- **Client ID** and **Client Secret:** values generated on the remote OAuth source, based on the URL of the VergeOS system.
- **Remote User Fields:** defines one or more fields that can be used for locating users in the OAuth source. The field is auto-populated with a default list of common fields (sub,preferred_username,email,nickname) that work across various common OAuth implementations 
!!! warning
    For security reasons, it is Not recommended to locate remote users based on fields that are changeable by end user on the OAuth sources.

#### Options (It is recommended to enable these options.)

- **Update Remote User:** updates the *Remote Username* field of the VergeOS user to the unique ID from the OAuth source. Enabling this option allows for initially locating the user based on more friendly fields (defined in *Remote User Fields*, above) but subsequently changing the VergeOS *Remote Username* field to match a unique id from the OAuth source system. This ensures the user record remains constant even as extraneous fields such as email address or friendly username may change over time.
- **Update User Email Address:** updates email address field based on email address from the OAuth source.
- **Update User Display Name:** updates user display name based on display name from the OAuth source.

#### Additional Optional Fields

- **Scope:** varies with different implementations; consult source OAuth2 documentation for more information. In most cases the default "openid profile email" will work.
- **Group Scope:** varies with different implementations; consult source OAuth2 documentation for more information. In most cases, the Group Scope can be set to the word "groups". **Note:** Group Scope is **required when using the *Update Group Membership*** option.
- **Require Verified Email Address:** (for OAuth2 implementations that support verifying user email address) only allow authentication of users with the verified email address flag enabled/true in the OAuth2 source.  
- **Update Group Membership:** update user's group membership (each time user logs in) to correspond with group membership from the OAuth source

#### User Creation

- **Auto-Create Users:** users are created automatically (on-demand, upon initial VergeOS login) corresponding to users in the OAuth source. Use "**.\***" without the quotes to apply to all users.
- **Auto-Create Users in Group:** only users within specified OAuth2 source groups are created automatically, on-demand, upon initial login. A specific group name can be entered or a regular expression to include group(s) with matching pattern.  In order to auto-create users based on group(s), the *Auto-Create Users* field should be blank.
!!! tip
    Users that will use an external authorization source can optionally be created manually in VergeOS; when creating the new VergeOS user: select appropriate ***Authorization Source*** (dropdown list), Set ***Remote Username*** to match one of the fields defined in *Remote User Fields* (fields that are used to find the user in the external authorization source); typically it is best to use the user's login name or unique user ID.

#### Login Styling - defines the appearance of the sign-in button on the VergeOS login page

- **Sign-in Button Background Color:** background color for the sign-in button.
- **Sign-in Button Text Color:** text color of the sign-in button.
- **Sign-in Button Font Awesome Icon:** specifies an alternate icon for the sign-in button; [https://fontawesome.com/v4.7.0/cheatsheet/](https://fontawesome.com/v4.7.0/cheatsheet/) contains a listing of available Font Awesome Icons.
- **Sign-in Button Font Awesome Icon Color:** specifies an alternate color for the sign-in button; use standard HEX code, ex: #FF5733.

**Debug Mode:** (checkbox) turns on verbose logging for this authorization source; this should only be enabled when troubleshooting because large amounts of authentication logging can potentially impact performance.

**Show In A Menu:** (checkbox) changes the login display to show a dropdown menu instead of a list.

# Create an OIDC Application (Establish VergeOS as an Identity Provider)

Creating an OpenID Connect (OIDC) application allows you to establish the VergeOS system as an identity provider for other VergeOS systems and tenants.  Upstream third-party providers (e.g. Google, Azure, Okta, Gitlab) can also be configured centrally to be utilized across all the systems and tenants using the VergeOS OIDC application.

!!! tip "The VergeOS system will need to have a valid SSL certificate for the OIDC application to function."

## Configure a New OIDC Application

1. From the Main Dashboard, click **System** on the left menu.
2. Click **OIDC Applications** on the left menu.
3. Click **New** on the left menu.
4. Enter/configure fields:

* **Name (required)**: name to identify the OIDC application
* **Enabled**: must be checked for the application to be activated
* **Description (optional)**: optional additional details about this application can be entered.

* **Redirect URI**: enter the callback URL, to the VergeOS system, where users will be redirected after authentication, this will be the URL where users would normally connect to the client system, e.g. Verge-proda@example.com.

!!! tip "Multiple Redirect URIs can be entered to establish a single OIDC application to service various client VergeOS systems."

!!! tip "Wildcards"
    Wildcards can be used in redirect URIs. This is intended for referencing multiple systems within the same domain, e.g. `https://examplecorp-site*.example.com`, or to accommodate multiple subdomains, e.g. `https://vergesystem.*.example.com`, with a single entry.

* **Force Authorization Source**: Optionally, a third-party authorization source, configured on this local VergeOS system (e.g. Google, Okta, Azure), can be selected to require client systems authenticate through the upstream source.  If an authorization source is not selected here, users of this application will be able to authenticate via local, built-in VergeOS accounts or any third-party authorization source that exists on this system.  See [Authorization Sources Overview](/product-guide/auth/auth-sources-general) for information regarding upstream authorization source configuration.

* **Map User**: allows any user that is verified, to be logged into the client system as the selected user.
!!! note "Benefits of the Map User function"
    The Map user function can provide a convenient, and yet secure method for your support teams to access client systems.  While each team member is required to authenticate individually, only one mapped user, e.g. "support-user" needs to be maintained.

* **Scope Settings:**
By default, **Profile Scope, Email Scope and Groups Scope** settings are enabled.  When a scope is enabled, the client system is permitted read-only access to the respective user information from this provider system.  If a client system tries to access a scope that is not enabled (unchecked), the authentication request is rejected.

* **Restrict Access:** By default, this option is not selected, allowing all users to authenticate with this application.  The option can be enabled to limit which users/groups can use this application (users/groups selection presented when option is checked.)

1. Click **Submit** to create the OIDC application.

!!! tip "Multiple OIDC applications"
    Multiple OIDC applications can be created on the same system to allow different configurations. For example, you may choose to provide varying options or restrictions across various client systems, or there may be situations that call for creating multiple OIDC applications to service the same client system, with different settings for different sets of users.

## Next Steps

### Obtain Client ID, Client Secret, Well Known Configuration URL

The system will generate a unique client identifier and client secret. These values, along with the Well Known Config (URL), will be needed for a client system to access this application.  

1. **Navigate to the OIDC Application dashboard** (Main Dashboard > System > OIDC Applications > double-click the intended application in the list.)  
2. **Client ID** can be copied by selecting the displayed value or clicking the copy icon to the right.
3. **Client Secret** is not displayed (for security reasons) but can be copied by clicking the copy icon.
!!! hint "The Client ID/Client Secret copy icons are only available for users with adequate permissions."
4. **Well Known Configuration** is displayed and can be copied by selecting the displayed value or clicking its copy icon.

### Configure Client Identity Systems

[**The VergeOS OIDC Client Guide**](/product-guide/auth/oidc-vergeos-relying-party) provides instructions for configuring a VergeOS system/tenant to utilize the created OIDC application.  

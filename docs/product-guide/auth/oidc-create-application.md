# Create an OIDC Application

Creating an OpenID Connect (OIDC) application allows you to establish the VergeOS system as an identity provider for other VergeOS systems and tenants.  Upstream third-party providers (e.g. Google, Azure, Okta, Gitlab) can also be configured centrally to be utilized across all the systems and tenants using the VergeOS OIDC application.

!!! tip "The VergeOS system will need to have a valid SSL certificate for the OIDC application to function."

## Configure a New OIDC Application

1. From the Main Dashboard, click **System** on the left menu.
2. Click **OIDC Applications** on the left menu.
3. Click **New** on the left menu.
4. Enter/configure fields:

**Name (required)**: Enter a name for the OIDC application
**Enabled**: must be checked for the application to be activated
**Description (optional)**: optional additional details about this application can be entered.

**Redirect URI**: enter the callback URL, to the VergeOS system, where users will be redirected after authentication, e.g. Verge-proda@example.com.  

!!! tip "Wildcards"
    Wildcards can be used in redirect URIs. This is intended for referencing multiple systems in the same  domain, e.g. `https://ABXcompany*.example.com` or to accommodate subdomains with a single entry, e.g. `https://vergesystem.*.example.com`

!!! "Multiple Redirect URIs can be entered to allow a single OIDC application to service multiple client VergeOS systems.

**Force Authorization Source**: Optionally, a third-party Auth source, set up on this local VergeOS system (e.g. Google, Okta, Azure), can be selected to require client systems authenticate through the upstream source.  If an Auth source is not selected here, users will be able to authenticate via local, built-in VergeOS accounts or any third-party auth source that exists on this system.  See [Product Guide Auth Sources](/product-guide/auth/auth-sources-general) for information regarding Auth Source Configuration.

**Map User**:  allows any user that is verified to be logged into the client system as a particular user. This function can be used to allow multiple support or administration personnel to log into customer systems under a common standardized account while each authenticates with their own unique credentials.

rather than having many users share login credentials to a common user account (which isnt secure) and don't have to have a specific login and permissions setup for all support personnel.

!!! example "Map User - Example Use"
 A typical example use for this:  for this would be accommodating multiple support team members to log into customer system(s) under a common username on the local system, where each team member will authenticate with their own unique credential. This is more convenient as it is not necessary to create separate user accounts and permissions for each support employee on the client system, yet secure, because it does not require multiple employees to use shared credentials to access customer systems.

**Scope Settings:**
By default, **Profile Scope, Email Scope and Groups Scope** settings are enabled.  When a scope is enabled, the client system is permitted read-only access to the respective user information on the source system.  If a client system tries to access a scope that is unchecked, the authentication request is rejected.

**Restrict Access**:

* By default, this option is not selected, allowing  all
users to authenticate with this application.

* Enable the option to limit which users/groups can use this application (users/groups selection presented when option is checked.)

5. Click **Submit** to create the OIDC application.

!!! tip "Multiple OIDC applications"
Multiple OIDC applications can be created on the same system to allow different configurations. For example, you may choose to provide different options or restrictions across different client systems, or there may be situations that call for creating multiple OIDC applications to service the same client system."

## Next Steps

After Creating the OIDC Application, you can:

### Obtain Client ID and Secret
The system will generate a unique client identifier and client secret. Client ID and secret are needed to create an Auth Source on the client identity system to access this OIDC application.

Navigate to the OIDC Application dashboard (Main Dashboard > System > OIDC Applications > double-click the intended application in the list.)  Client ID is displayed; client secret is hidden; both can be copied by clicking their respective copy icons. The icons are to the right of the items, copy icon is not available for users with inadequate permissions.

### Configure Client Identity Systems
 See: [Configure VergeOS Auth Source](/product-guide/auth/oidc-verge-auth.md) for instructions on configuring a VergeOS system or tenant to utilize the created OIDC application.

Contact VergeOS Support for additional assistance with OIDC configuration and troubleshooting.

Get vergeOS license keys{ target="_blank" .md-button } 
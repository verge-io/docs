# Create an OIDC Application

Creating an OpenID Connect (OIDC) application allows you to establish the VergeOS system as an identity provider for tenants and other VergeOS systems.  Upstream third-party providers (e.g. Google, Azure, Okta, Gitlab) can be configured centrally to be utilized across all the systems and tenants using the VergeOS OIDC application.

## Configure a New OIDC Application

1. From the Main Dashboard, click **System** on the left menu.
2. Click **OIDC Applications** on the left menu.
3. Click **New** on the left menu.
4. Enter/configure the following fields:

Basic Settings

Name (required) - Enter a name for the OIDC application
Enabled - Check this box to activate the application
Description (optional) - Enter additional details about this application's purpose

Redirect URI - Enter the callback URL where users will be redirected after authentication. This can include multiple
client system urls.
Wildcards can be used in redirect URLs. This is intended for referencing multiple systems in the same company domain or for subdomains, for ex: https://vergesystem.*.example.com
ex: https://ABC-Verge*.example.com
a recommendation here about using wildcards wisely and not too widely.


Multiple Redirect URIs because a single oidc application can be created to service multiple systems. 

Multiple oidc applications can be created to allow different configurations for different client systems.

Application Details


Force Authorization Source - Select the upstream authentication provider to use. 
Upstream auth sources set up on this local system
for instance, if the local system has a google auth source configured, users must use that source (rather than local, built-in verge users or other auth sources that exist on this system)

When it is not forced, users are able to authenticate via  VergeOS users on the source VergeOS system or any third-party auth source that exists on this local system.


Map User - Select a user to map all logins to, or leave as "--None--"
Mapping a user - This allows any user that is verified to be logged into the client system as a particular user.
As an example, a typical use for this would be accommodating multiple support team members to log into customer system(s) under a common username on the local system, where each team member will authenticate with their own unique credential. This is more convenient as it is not necessary to create separate user accounts and permissions for each support employee on the client system, yet secure, because it does not require multiple employees to use shared credentials to access customer systems.


Scope Settings
by default these 3 scope settings are selected, which means that the client system can access this information (read-only).  If a scope option is unchecked and the client application attempts to access the field, the authentication will fail. 
Profile Scope - Enable to grant read-only access to user profile information
Email Scope - Enable to grant read-only access to user email
Groups Scope - Enable to grant read-only access to user 
group memberships

Access Control

Restrict Access - Enable to limit which users/groups can use this application (when the checkbox is not selected, all users are allowed to access.)
Allowed Users/Groups - When access is restricted, specify the permitted users/groups.

Click Submit to create the OIDC application.

## Next Steps

[test]()

After Creating the OIDC Application, you can:

## Obtain Client ID and Secret
Navigate to the OIDC Application dashboard (Main Dashboard > System > OIDC Applications > double-click the intended application in the list.)  Client ID is displayed; client secret is hidden; both can be copied by clicking their respective copy icons. The icons are to the right of the items, copy icon is not available for users with inadequate permissions.

Obtain the Client ID - The system will generate a unique client identifier
This client ID can be used to create an Auth source on client systems to access this oidc application.

### Configure Client Identity Systems
For instructions on configuring a tenant or other VergeOS system to utilize the oidc application, see: [Configure VergeOS Auth Source](/product-guide/auth/oidc-verge-auth.md) for instructions on configuring a tenant/other system to utilize the created OIDC application. 

Contact VergeOS Support for additional assistance with OIDC configuration and troubleshooting.

Get vergeOS license keys{ target="_blank" .md-button } 
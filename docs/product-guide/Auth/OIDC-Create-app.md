# Create an OIDC Application

Creating an OpenID Connect (OIDC) application in a VergeOS system allows you to establish the system as an identity provider for other VergeOS systems and tenants.  Upstream third party providers (such as Google, Azure, Okta) can be configured centrally on the VergeOS provider system to be used across systems and tenants using the VergeOS OIDC source.

Configure a New OIDC Application

From the Main Dashboard, click System on the left menu.
Click OIDC Applications on the left menu.
Click New on the left menu.
Enter/configure the following fields:

Basic Settings

Name (required) - Enter a name for the OIDC application
Enabled - Check this box to activate the application
Description (optional) - Enter additional details about this application's purpose

Redirect URI - Enter the callback URL where users will be redirected after authentication. This can include:
List of VergeOS client system urls ex: https://sitea.example.com
It is possible to also point a non-verge system here too

URLs may contain wildcards, such as https://*.example.com

Application Details


Force Authorization Source - Select the authentication provider to use
Upstream auth sources set up on this local system
for instance, if the local system has a google auth source configured, users must use that source (rather than local, built-in verge users or other auth sources that exist on this system)

When it is not forced, users are able to authenticate via other configured auth sources or local VergeOS user that exists on the verge system.


Map User - Select a user to map all logins to, or leave as "--None--"
Mapping a user - This allows any user that is verified to be logged into the client system as a particular user.
As an example, a typical use for this would be accommodating multiple support team members to log into customer system(s) under a common username on the local system, where each team member will authenticate with their own unique credential. This is more convenient as it is not necessary to create separate user accounts and permissions for each support employee on the client system, yet secure, because it does not require multiple employees to use shared credentials to access customer systems.


Scope Settings

Profile Scope - Enable to grant read-only access to user profile information
Email Scope - Enable to grant read-only access to user email
Groups Scope - Enable to grant read-only access to user group memberships

Access Control

Restrict Access - Enable to limit which users/groups can use this application
Allowed Users - When access is restricted, specify the permitted users


Click Submit to create the OIDC application.

After creating the application, you can:

Obtain the Client ID - The system will generate a unique client identifier
This client ID can be used to create a Verge.io Auth source on client systems.

link here to page that describes setting up a Verge.io auth source on the client system.


Contact VergeOS Support for additional assistance with OIDC configuration and troubleshooting.

Get vergeOS license keys{ target="_blank" .md-button } 

# Configure a *Verge.io* Authorization Source

Using Verge OIDC application for Authentication/Authorization

This guide will provide instructions to configure a VergeOS system to utilize a VergeOS OIDC identify provider (A host or remote system with a configured OIDC application).

1. [**Obtain Client ID and Client Secret from the VergeOS OIDC provider system**](/product-guide/oidc-create-application#next-steps)

2. From the VergeOS Main Dashboard click **System** on the left menu.
3. Click **Authorization Sources** on the left menu.
4. Click **New** on the left menu.

**Fields:**  
**Name**: provide a label to identify this authorization source; it will appear on the sign-in button of the VergeOS login page.

**Driver**: **OpenID (Well Known Config)**
**Base URL:** URL of the VergeOS provider system where OIDC application is configured.
**Redirect URI** URL to this VergeOS client system
**Token hint parameter for logout session**:  Typically, this field should be left at the default value.
default="id_token_hint" (value is the actual ID Token that was received earlier from the OIDC provider).
**Redirect parameter for logout session**: Typically, this field should be left at the default value.  default="post_logout_redirect_uri" this is also commonly  named"logout_redirect".
**Client ID**: Paste the client ID from the VergeOS provider (from step #1).
**Client Secret**: Paste the Client Secret from the VergeOS provider (from step #1).

**Debug Mode:** (checkbox) turns on verbose logging for this authorization source.  Debug log information can be found in node diagnostics of the current controller node.(Normally, this is node1.)
!!! warning "Only enable Debug Mode when actively troubleshooting because large amounts of authentication logging can potentially impact performance."

**Login Styling:**  
Login styling defines the appearance of the sign-in button on the VergeOS login page.

- **Sign-in Button Background Color**: background color for the sign-in button.
- **Sign-in Button Text Color**: text color of the sign-in button.
- **Sign-in Button Font Awesome Icon**: specifies an alternate icon for the sign-in button; [The Font Awesome Cheatsheet](https://fontawesome.com/v4.7.0/cheatsheet/) contains a listing of available Font Awesome Icons.
- **Sign-in Button Font Awesome Icon Color**: specifies an alternate color for the sign-in button; use standard HEX code, ex: #FF5733.
- **Show In A Menu**: (checkbox) changes the display to show a drop down menu instead of a list.

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
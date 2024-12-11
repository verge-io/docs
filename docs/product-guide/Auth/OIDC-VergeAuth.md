
# Using Verge OIDC application for Authentication/Authorization

This guide will provide instructions to configure a VergeOS system to utilize a VergeOS OIDC identify provider.

1. **Obtain Client ID and Client Secret from the VergeOS OIDC provider system:** Navigate to the OIDC Application dashboard (Main Dashboard > System > OIDC Applications > double-click the intended application in the list.)  Client ID is displayed; client secret is hidden; both can be copied by clicking their respective copy icons. The icons are to the right of the items, copy icon is not available for users with inadequate permissions.

## Configure a *Verge.io* Authorization Source

1. From the VergeOS Main Dashboard click **System** on the left menu.
2. Click **Authorization Sources** on the left menu.
3. Click **New** on the left menu.

**Fields:**  
**Name**: provide a label to identify this authorization source; it will appear on the sign-in button of the VergeOS login page.

**Driver**: **Verge.io**
**Base URL:** URL of the VergeOS provider system
**Redirect URI** URL to this VergeOS client system
**Token hint parameter for logout session**: default="id_token_hint"  --- value is the actual ID Token that was received earlier from the OIDC provider.
**Redirect parameter for logout session**: default="post_logout_redirect_uri" other common name="logout_redirect"
**Client ID**: Paste the client ID from the VergeOS provider (from step #1).
**Client Secret**: Paste the Client Secret from the VergeOS provider (from step #1).

**Debug Mode:** (checkbox) turns on verbose logging for this authorization source; only enable this option when actively troubleshooting because large amounts of authentication logging can potentially impact performance.

**Login Styling:**  
Login styling defines the appearance of the sign-in button on the VergeOS login page.

- **Sign-in Button Background Color**: background color for the sign-in button.
- **Sign-in Button Text Color**: text color of the sign-in button.
- **Sign-in Button Font Awesome Icon**: specifies an alternate icon for the sign-in button; [The Font Awesome Cheatsheet](https://fontawesome.com/v4.7.0/cheatsheet/) contains a listing of available Font Awesome Icons.
- **Sign-in Button Font Awesome Icon Color**: specifies an alternate color for the sign-in button; use standard HEX code, ex: #FF5733.
- **Show In A Menu**: (checkbox) changes the display to show a drop down menu instead of a list.

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
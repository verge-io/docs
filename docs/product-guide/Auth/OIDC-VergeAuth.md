
# Using Verge OIDC application for Authentication/Authorization

This guide will provide instructions to configure a VergeOS system as an OIDC client of a VergeOS OIDC identify provider.

1. Obtain Client Id and Client Secret from the VergeOS OIDC provider application
Navigate to the OIDC Application dashboard (Main Dashboard > System > OIDC Applications > double-click the intended application in the list.)

## Configure a Verge.io Authorization Source

1. From the VergeOS Main Dashboard click **System** on the left menu.
2. Click **Authorization Sources** on the left menu.
3. Click **New** on the left menu.

Fields:
**Name**: to identify this authorization source; it will appear on the sign-in button of the VergeOS login page.

**Driver**: **Verge.io**
**Base URL:** URL of the VergeOS provider system
**Redirect URI** URL to this VergeOS client system
**Token hint parameter for logout session**: default="id_token_hint"  --- value is the actual ID Token that was received earlier from the OIDC provider.
**Redirect parameter for logout session**: default="post_logout_redirect_uri" other common name="logout_redirect"
**Client ID**: Obtain client ID from the provider system: System > OIDC Application > double-click OIDC application in the list. 
**Client Secret**:
**Login Styling**
Login styling defines the appearance of the sign-in button on the VergeOS login page.

- **Sign-in Button Background Color**: background color for the sign-in button.
- **Sign-in Button Text Color**: text color of the sign-in button.
- **Sign-in Button Font Awesome Icon**: specifies an alternate icon for the sign-in button; [https://fontawesome.com/v4.7.0/cheatsheet/](https://fontawesome.com/v4.7.0/cheatsheet/) contains a listing of available Font Awesome Icons.
- **Sign-in Button Font Awesome Icon Color**: specifies an alternate color for the sign-in button; use standard HEX code, ex: #FF5733.
- **Show In A Menu**: (checkbox) changes the display to show a drop down menu instead of a list.

***Debug Mode:*** (checkbox) turns on verbose logging for this authorization source; this should only be enabled when troubleshooting because large amounts of authentication logging can potentially impact performance.

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
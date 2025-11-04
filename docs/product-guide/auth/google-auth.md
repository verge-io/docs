# Using Google for Authentication

VergeOS can be configured to allow users to authenticate using their corporate Google credentials.  This page will walk you through the configuration process.

## Configure a Google Authorization Source

1. Obtain **Client ID** and **Client Secret** from the Google system. These values should be generated based on the public URL of the VergeOS system. See Google documentation for instructions, such as [**https://developers.google.com/identity/protocols/oauth2**](https://developers.google.com/identity/protocols/oauth2)
!!! tip
    Client ID and Secret can typically be generated at: [***https://console.developers.google.com***](https://console.developers.google.com/)

2. Click **System** on the top menu.
3. Select **Auth Sources**. 
4. Click **New** on the left menu.
5. Enter a ***Name*** for the source (such as "Google"). This name will appear on the sign-in button of the VergeOS login page.
6. In the ***Driver*** field (dropdown list), select **Google**.
7. ***Redirect URI*** should be populated with URL of the VergeOS system. This must be a public address that can be accessed by the Google API.
8. Enter the ***Client ID*** and ***Client Secret*** values obtained from Google.
9. ***Remote User Fields*** is the list of fields used to initially find the Google user; this field is auto-populated with (sub,preferred_username,email nickname), a default list that can typically work for Google implementations. **Note: For security reasons, it is not recommended to locate remote users based on fields that are changeable by the end user on the remote system.**

10. **Options (It is recommended to enable these options.)**
    - ***Update Remote User:*** - once user is located in the Google system, update VergeOS user *Remote Username* field to the corresponding Google unique ID (sub string)
    - **Update User Email Address:** - update VergeOS user email address to match email address within Google.
    - **Update User Display Name:** - update VergeOS user display name to match display name within Google.
!!! Success "Enabling the *Update Remote User* field will allow the VergeOS system to store the unique Google ID in the VergeOS user record (after initially locating the Google user with fields defined in Remote User Fields), so the unique identifier can subsequently be used for finding the Google user; this is typically recommended since fields such as email address are subject to change."

11. **Additional Optional Fields**
See [**Authorization Sources - Overview**](/product-guide/auth/auth-sources-overview) for information regarding additional optional Fields.

12. After completing the configuration, click **Submit** to save the new authorization source.

## Add VergeOS Users that will use Google Auth

After the authorization source is created, users can be created to utilize the Google source for login.
**Create new VergeOS users with the following configuration:**  

- ***Authorization Source:*** Select the Google source from the dropdown list
- ***Username:*** unique name within the VergeOS system; typically it is recommended to use the same login name used within Google.
- ***Remote Username:*** use value of one of the fields defined as Remote User fields, which are fields that are searched on in Google; user email address or the sub string, which is equivalent to the user's Google ID, are typically best.
- ***Display Name:*** (optional) If *Update User Display Name* is enabled on the Google auth source, display name will synchronize from the Google user.
- ***Email Address:*** (optional) If *Update User Email Address* is enabled on the Google auth source, email address will synchronize from the Google user.

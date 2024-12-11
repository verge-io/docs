

# Using Google Authorization

<br>

### To Configure a Google Authorization Source

1.  Obtain **Client ID** and **Client Secret** from the Google system. These values should be generated based on the public URL of the VergeOS system. See Google documentation for instructions, such as [**https://developers.google.com/identity/protocols/oauth2**](https://developers.google.com/identity/protocols/oauth2)
> Client ID and Secret can typically be generated at:  [***https://console.developers.google.com***](https://console.developers.google.com/) {.is-success}

<br>

2.  From the  VergeOS Main Dashboard, click **System** on the left menu.
2.  Click **Authorization Sources** on the left menu.
3.  Click **New** on the left menu.
4.  Enter a ***Name*** for the source (such as "Google"). This name will appear on the sign-in button of the  VergeOS login page.
5.  In the ***Driver*** field (dropdown list), select **Google**.
6.  ***Redirect URI*** should be populated with URL of the  VergeOS system . This must be a public address that can be accessed by the Google API.
7.  Enter the ***Client ID*** and ***Client Secret*** values obtained from Google.
8.  ***Remote User Fields*** is the list of fields used to initially find the Google user; this field is auto-populated with (sub,preferred\_username,email nickname), a default list that can typically work for Google implementations. **Note: For security reasons, it is not recommended to locate remote users based on fields that are changeable by the end user on the remote system.**

<br>


10. #### Options (It is recommended to enable these options.):

- ***Update Remote User:*** \- once user is located in the Google system, update  VergeOS user *Remote Username* field to the corresponding Google unique ID (sub string)

> Enabling the Update Remote User will allow the*  VergeOS *system to store the unique Google ID in the*  VergeOS *user record (after initially locating the Google user with fields defined in Remote User Fields), so the unique identifier can subsequently be used for finding the Google user; this is typically recommended since fields such as email address are subject to change. {.is-info}

-   ***Update User Email Address:*** \- update  VergeOS user Email address to match email address within Google.
-   ***Update User Display Name:*** \- update  VergeOS user display name to match display name within Google.

<br>

11. #### Additional Optional Fields:

See  [**Authorization Sources (General)**](/product-guide/AuthSources-General) for information regarding additional optional Fields.

<br>
<br>


## To Add  VergeOS Users that will use Google Auth

After the authorization source is created, users can be created to utilize the Google source for login. 
**Create new VergeOS users with the following configuration:**  

-   ***Authorization Source:*** Select the Google source from the dropdown list
-   ***Username:*** unique name within the  VergeOS system; typically it is recommended to use the same login name used within Google.
-   ***Remote Username:*** use value of one of the fields defined as Remote User fields, which are fields that are searched on in Google;User email address or the sub string, which is equivalent to the user's Google ID, are typically best.
-   ***Display Name:*** (optional) If *Update User Display Name* is enabled on the Google auth source, display name will synchronize from the Google user.
-   ***Email Address:*** (optional) If *Update User Email Address* is enabled on the Google auth source, Email address will synchronize from the Google user.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }


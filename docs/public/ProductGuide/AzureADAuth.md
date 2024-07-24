---
title: Product Guide - Using Azure AD for Authentication
description: Configuration instructions for using an Azure AD for VeregOS user authentication
published: true
date: 2024-03-29T18:27:21.806Z
tags: 
editor: markdown
dateCreated: 2023-03-22T18:46:18.889Z
---

# Using Azure AD for Authentication

### To Configure an Azure AD Authorization Source

1.  In Azure services: register a single-tenant web application, setting the ***Redirect URI*** to the URL of the VeregOS system and creating a new client secret. **Azure Active Directory -> App Registrations -> New Registration**
![azurereg1.png](/public/userguide-sshots/azurereg1.png)

![](/public/userguide-sshots/azurereg2.png)

2.  Create a new client secret. **App Registrations -> Client Credentials -> Add a certificate or secret. Click +New client secret.**
    -   Enter a **description and expiration date** for the new client secret.
    -   **Obtain the following from Azure** to be used in configuration of the authorization source within VeregOS:
    
        -   **Tenant ID**  (<span style="color: orange">**Hint:**</span>  **All services -> Azure Active Directory -> Overview.** The Tenant ID is listed under Basic Information.)
        
        <br>

 		-   **Client ID**   (<span style="color: orange">**Hint:**</span>  **Azure App Registrations-> Configured Item -> Client Credentials**.)
    <br>
    
    	-   **Client Secret** (<span style="color: orange">**Hint:**</span>  **Azure App Registrations-> Configured Item -> Client Credentials**; use the "VALUE" field.)
    <br>

![](/public/userguide-sshots/azureclientsecretadd.png)
![](/public/userguide-sshots/azureclientsecret2.png)


3.  From the VeregOS Main Dashboard click **System** on the left menu.
2.  Click **Authorization Sources** on the left menu.
3.  Click **New** on the left menu.
4.  Enter a ***Name*** for the source (such as "Azure"). This name will appear on the sign-in button of the VeregOS login page.

![](/public/userguide-sshots/azureauthform.png)

7.  In the ***Driver*** field (dropdown list), select **Azure AD**.
6.  Enter the ***Tenant ID*** obtained in the previous step.
7.  The ***Redirect URI*** should be the URL to your VeregOS system 
(for ex: https:/[]()/verge.io.mycompanyabc.com)
8.  Enter ***Endpoint URL for user to logout session token*** 
(https:/[]()/login.microsoftonline.com/***TENANTID***/oauth2/v2.0/logout)
9.  ***Scope*** should typically be left at the default value: "OpenID profile email".
10.  ***Group Scope*** needs to be set if users should be auto-created based on group membership; typically, this is set to the word "groups" with no punctuation.
11.  Enter the ***Client ID*** obtained in the previous step.
12.  Enter the ***Client Secret*** obtained in the previous step.
13.  ***Remote User Fields*** defines the list of fields used to initially find the Azure user; this field is auto-populated with (sub,preferred\_username,email nickname), a default list that can typically work for most implementations. **Note: For security reasons, it is not recommended to locate remote users based on fields that are changeable by the end user on the remote system.**
14.  To carry over group membership from Azure to VeregOS, check the ***Update Group Membership*** checkbox. Groups must be created in VeregOS using instructions below.
15.  **User Auto-Creation Features (optional)**: 
Users can be auto-created upon initial login to VeregOS; this can be selected for all Azure AD users -OR- limited to users in specified Azure AD groups.

-  
  -   ***Auto-Create Users*** -If all users should be auto-created, enter **\*** here.
    
  -   ***Auto Create Users in Group*** - To only auto-create users that are members of specified Azure AD groups, enter the Azure group object ID(s) in regular expression (regex) form. 
  > Multiple specific group IDs can be entered using the format: (ID)|(ID)|(ID) {.is-success}

 	-   the **Group Scope** must be defined. (Group Scope field defined above)
 	-   **Token Configuration** must be setup in Azure AD (instructions below).
 	-   Azure AD **groups** specified for Auto Create **must be created on the VeregOS side** (instructions below).
	 -   To auto-create based on group, the ***Auto Create Users*** **field must be blank**

<br>

18. #### Options (recommended to be enabled):

- ***Update Remote User:*** \- once the user is located in Azure AD, update VeregOS user *Remote Username* field to the corresponding Azure unique ID.

> Enabling the Update Remote User will allow the VeregOS system to store the unique Azure ID in the VeregOS user record (after initially locating the Azure AD user with fields defined in Remote User Fields), so the unique identifier can subsequently be used for finding Azure AD user; this is typically recommended since fields such as email address are subject to change. {.is-info}

-   ***Update User Email Address:*** \- Update VeregOS user Email address to match email address within Azure.
-   ***Update User Display Name:*** \- Update VeregOS user display name to match display name within Azure.
-   ***Update Group Membership:*** \- Update the groups that a VeregOS user is a member of. (A Group Scope is required for this to function.)


<br>

19. #### Additional Optional Fields:


See  [**Authorization Sources (General)**](/public/ProductGuide/AuthSources-General) for information regarding additional optional Fields.


<br>
<br>

## Adding Azure Groups to Verge OS

Interfacing with Azure groups requires a token on the Azure AD app registration and creation of groups in VeregOS:
<br>


### To set up a Token Configuration in Azure AD

1.  Navigate to the **App registration page** for the App created above.
2.  Click on **Token Configuration** on the left menu and click **+Add groups claim**.
3.  Check the appropriate **group types**.
4.  Set the **ID, Access, and SAML to sAMAccountName**.

![](/public/userguide-sshots/azure-editgroupsclaim.png)

<br>

### To Add Azure Groups to Verge OS

1.  Navigate to **System -> Groups.**
2.  Click **New** on the left menu.
3.  Enter the group ***Name*** to match the group name in Azure AD.
4.  Optionally, an ***Email*** can be entered for the group. This email address is used for sending subscription alerts and/or reports assigned to the group.
5.  Copy the coordinating **Object Id** from the Groups/All Groups page in Azure AD to the ***Identifier*** field.
6.  Click **Submit** (bottom of the page) to save the new group.

![](/public/userguide-sshots/azure-groupspage.png)

![](/public/userguide-sshots/azure-creategroup.png)


<br>
<br>
<br>

## Manually Adding Users from Azure

After the Azure auth source is created, users can be manually created in VeregOS to utilize the Authorization source for login authentication. Manually creating users is only necessary when users are not configured to be auto-created.

<br>

### To Add VeregOS Users that will use the Azure AD Auth

When creating the new user, use the following configuration:

-   ***Authorization Source:*** Select the Azure AD source from the dropdown list
-   ***Username:*** unique name within the VeregOS system; typically it is recommended to use the Azure principal name.
-   ***Remote Username:*** use value of one of the fields defined as *Remote User fields* these are fields that are searched on in Azure (e.g. username, email)
-   ***Display Name:*** (optional) If *Update User Display Name* is enabled on the Azure AD auth source, display name will automatically synchronize from the Azure AD user.
-   ***Email Address:*** (optional) If *Update User Email Address* is enabled on the Azure AD auth source, Email address will automatically synchronize from the Azure AD user.

![](/public/userguide-sshots/azure-newuser.png)

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
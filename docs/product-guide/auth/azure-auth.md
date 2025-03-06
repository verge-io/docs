
# Using Azure AD for Authentication

VergeOS can be configured to allow users to authenticate using their corporate Azure credentials. This page will walk you through the configuration process.

## Configure an Azure AD Authorization Source

1. In Azure services: register a single-tenant web application, setting the ***Redirect URI*** to the URL of the VergeOS system and creating a new client secret. **Azure Active Directory > App Registrations > New Registration**
    ![azurereg1.png](/product-guide/screenshots/azurereg1.png)

    ![azurereg2.png](/product-guide/screenshots/azurereg2.png)

2. Create a new client secret. **App Registrations > Client Credentials > Add a certificate or secret. Click +New client secret.**
   - Enter a **description and expiration date** for the new client secret.
   - **Obtain the following from Azure** to be used in configuration of the authorization source within VergeOS:
       - **Tenant ID** - **hint: *All services > Azure Active Directory > Overview.* The Tenant ID is listed under Basic Information.**
       - **Client ID** - **hint: *Azure App Registrations > Configured Item > Client Credentials***
       - **Client Secret** - **hint: *Azure App Registrations > Configured Item > Client Credentials* Use the "VALUE" field.**

    ![azureclientsecretadd.png](/product-guide/screenshots/azureclientsecretadd.png)
    ![azureclientsecret2.png](/product-guide/screenshots/azureclientsecret2.png)

3. From the VergeOS Main Dashboard click **System** on the left menu.
4. Click **Authorization Sources** on the left menu.
5. Click **New** on the left menu.
6. Enter a ***Name*** for the source (such as "Azure"). This name will appear on the sign-in button of the VergeOS login page.
    ![azureauthform.png](/product-guide/screenshots/azureauthform.png)

7. In the ***Driver*** field (dropdown list), select **Azure AD**.
8. Enter the ***Tenant ID*** obtained in the previous step.
9. The ***Redirect URI*** should be the URL to your VergeOS system
(for ex: https:/[]/verge.io.mycompanyabc.com)
10. Enter ***Endpoint URL for user to logout session token***
(https:/[]/login.microsoftonline.com/***TENANTID***/oauth2/v2.0/logout)
11. ***Scope*** should typically be left at the default value: "OpenID profile email".
12. ***Group Scope*** needs to be set if users should be auto-created based on group membership; typically, this is set to the word "groups" with no punctuation.
13. Enter the ***Client ID*** obtained in the previous step.
14. Enter the ***Client Secret*** obtained in the previous step.
15. ***Remote User Fields*** defines the list of fields used to initially find the Azure user; this field is auto-populated with (sub,preferred_username,email nickname), a default list that can typically work for most implementations. **Note: For security reasons, it is not recommended to locate remote users based on fields that are changeable by the end user on the remote system.**
16. To carry over group membership from Azure to VergeOS, check the ***Update Group Membership*** checkbox. Groups must be created in VergeOS using instructions below.
17. **User Auto-Creation Features (optional)**: Users can be auto-created upon initial login to VergeOS; this can be selected for all Azure AD users -OR- limited to users in specified Azure AD groups.
    - ***Auto-Create Users*** - If all users should be auto-created, enter **\*** here.
    - ***Auto Create Users in Group*** - To only auto-create users that are members of specified Azure AD groups, enter the Azure group object ID(s) in regular expression (regex) form.
!!! info "Auto Creating Users in Groups"
      - The **Group Scope** must be defined. (Group Scope field defined above)
      - **Token Configuration** must be setup in Azure AD (instructions below).
      - Azure AD **groups** specified for Auto Create **must be created on the VergeOS side** (instructions below).
      - To auto-create based on group, the ***Auto Create Users*** **field must be blank**
      - Multiple specific group IDs can be entered using the format: (ID)|(ID)|(ID) 

18. **Options (recommended enabled):**

- ***Update Remote User:*** - once the user is located in Azure AD, update VergeOS user *Remote Username* field to the corresponding Azure unique ID.
!!! success "Enabling the Update Remote User will allow the VergeOS system to store the unique Azure ID in the VergeOS user record (after initially locating the Azure AD user with fields defined in Remote User Fields), so the unique identifier can subsequently be used for finding Azure AD user; this is typically recommended since fields such as email address are subject to change."

- ***Update User Email Address:*** - Update VergeOS user email address to match email address within Azure.
- ***Update User Display Name:*** - Update VergeOS user display name to match display name within Azure.
- ***Update Group Membership:*** - Update the groups that a VergeOS user is a member of. (A Group Scope is required for this to function.)

19. **Additional Optional Fields:**  See [**Authorization Sources (General)**](product-guide/auth/auth-sources-overview) for information regarding additional optional Fields.

## Add Azure Groups to VergeOS

Interfacing with Azure groups requires a token on the Azure AD app registration and creation of groups in VergeOS:

### Set up a Token Configuration in Azure AD

1. Navigate to the **App registration page** for the App created above.
2. Click on **Token Configuration** on the left menu and click **+Add groups claim**.
3. Check the appropriate **group types**.
4. Set the **ID, Access, and SAML to sAMAccountName**.

![azure-editgroupsclaim.pn](/product-guide/screenshots/azure-editgroupsclaim.png)

### Steps to Add Azure Groups

1. Navigate to **System > Groups.**
2. Click **New** on the left menu.
3. Enter the group ***Name*** to match the group name in Azure AD.
4. Optionally, an ***Email*** can be entered for the group. This email address is used for sending subscription alerts and/or reports assigned to the group.
5. Copy the coordinating **Object Id** from the Groups/All Groups page in Azure AD to the ***Identifier*** field.
6. Click **Submit** (bottom of the page) to save the new group.

![azure-groupspage.png](/product-guide/screenshots/azure-groupspage.png)

![azure-creategroup.png](/product-guide/screenshots/azure-creategroup.png)

## Manually Add Users from Azure

After the Azure auth source is created, users can be manually created in VergeOS to utilize the authorization source for login authentication. Manually creating users is only necessary when users are not configured to be auto-created.

### Add VergeOS Users that will use the Azure AD Auth

When creating the new user, use the following configuration:

- ***Authorization Source:*** Select the Azure AD source from the dropdown list
- ***Username:*** unique name within the VergeOS system; typically it is recommended to use the Azure principal name.
- ***Remote Username:*** use value of one of the fields defined as *Remote User fields* these are fields that are searched on in Azure (e.g. username, email)
- ***Display Name:*** (optional) If *Update User Display Name* is enabled on the Azure AD auth source, display name will automatically synchronize from the Azure AD user.
- ***Email Address:*** (optional) If *Update User Email Address* is enabled on the Azure AD auth source, email address will automatically synchronize from the Azure AD user.

![azure-newuser.png](/product-guide/screenshots/azure-newuser.png)
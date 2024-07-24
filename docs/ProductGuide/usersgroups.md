

# Users
A separate user account should be created for each individual that will utilize the system. 

> When using an Authorization Source, there is an option to auto-create users from the source. {.is-success}

<br>

## User Types:

-   **Normal** - intended for full UI access
-   **API** - intended for service accounts only; e.g. running scripts, syncs, etc.
-   **VDI** - VDI user dashboard only

<br>



# Groups
A group is a collection of users. Groups can also contain other groups.  Administration of permissions and subscriptions can often be simplified by the use of groups.

<br>

---

<br>



## To Create a New User:

1.  From the Main Dashboard, select **System**.
2.  Select **Users**.
3.  Select **New**.
4.  Select an ***Authorization Source*** if appropriate (This field will not display if no third-party authorization sources are configured for the system.). The default selection of "--None--" creates a user that authenticates directly via VergeIO.
5.  Enter a ***Username***; this will be the user's login name. The username must be unique within this cloud (Note: each tenant is a separate VergeIO Cloud).
6.  Select appropriate user ***Type***:
    -   **Normal** - users that will log in to the full UI
    -   **API** - used for service accounts, such as those used for site syncs
    -   **VDI** - user that will log in only to a VDI dashboard
7.  Enter a ***Password*** for the user. Passwords must conform to password complexity settings defined for this VergeIO cloud; requirements are listed underneath the field. Complexity settings are defined in System -> Settings -> Password Complexity Requirement.
8.  Re-enter the password in the ***Confirm Password*** field.
9.  Optionally, the ***Require Password Change*** option can be enabled to prompt the user to create their own password upon first login.
10.  Optionally, a ***Display Name*** can be specified for the user. The Display Name is shown in the top right corner of the screen when the user is logged into the UI.
11.  When enabled, ***Two Factor Authentication*** requires use of a security code (received via user email) in addition to username/password for login to the VergeIO system.
12.  ***Email Address*** is used when sending subscription reports and alerts assigned to the user and for Two-Factor Authentication, if applicable.
13.  The ***Physical Access*** option can be checked to allow the user direct console access to nodes. 
> **CAUTION:** Enabling the *Physical Access* option allows the account to log in at the command-line via physical access (e.g. crashcart, ipmi remote control) and SSH. **This should only be granted to users entrusted with low-level VergeIO server administration.** {.is-warning}

 - **SSH Keys** can be added to provide key-based authentication for SSH; multiple keys can be defined to allow the user to authenticate by ssh key from various computers. Note: SSH Keys are optional; a user granted physical access can log into an SSH session with username/password in the absence of an associated SSH key.
    <div style="background:lightgrey">
  
    **To Add a new SSH Key entry:**
   -   An initial blank line will appear where an SSH key can be typed in.
    -   Additional keys can be added, as needed, by clicking the plus \[ \] button which will insert a new blank line where an SSH key can be typed in.
  
    **To Select and Deselect Key(s) for Move/Edit/Delete:**
    -   Selected entries will display a check in the box at the left.
    -   Selection is a toggle: click an unselected entry to select it; click a selected entry to deselect it.
    -   Multiple keys can be selected for a delete or move.
  
    **To Edit an Existing Key entry:**
    -   Click to select the desired key for edit.
    -   Click the edit \[ \] button.
    -   The selected key appears and can be modified. When editing is complete, click the edit \[ \] button again to save the changes.
  
    **To Delete an Existing Key entry:**
    -   Click to select the desired key for deletion.
    -   Click the delete \[ \] button.
  </span>
    <br>
14.  Optionally, under ***Member of Groups***, groups can be selected in which to add the user. Hint: Multiple groups can be selected by holding down the Shift or Ctrl key.
15.  Click **Submit** to save the new user.

<br>

## To Create a New Group

1.  From the **Main Dashboard**, select **Groups** from the top quick-links.
2.  Select **New** on the left menu.
3.  Enter a ***Name*** for the group (required).
4.  Optionally, a ***Description*** can be specified for the group.
5.  Optionally, an ***Email Address*** can be specified to receive subscription alerts and reports assigned to the group.
6.  Click **Submit** to save the new group.

<br>

## To Add Members (users and/or groups) to a Group

1.  From the **Main Dashboard**, select **Groups** from the top quick-links.
2.  **Double-click the desired group** in the list to display the group dashboard.
3.  Click **Members**.
4.  Click **Add Users** or **Add Groups** on the left menu.
5.  Select users/groups from the displayed list. Hint: Multiple groups can be selected by holding down the Shift or Ctrl key.
6.  Click **Submit** to apply the changes.

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
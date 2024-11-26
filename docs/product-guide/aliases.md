# Aliases

Aliases are helpers that centralize management of address sets that will be used in multiple places.  For example, if we have a group of remote administrators we are specifically allowing port access, based on IP address, an alias called "PortAccess" could be created to include the list of allowed addresses.  The alias can then be selected in the configuration of necessary rules, eliminating the need to manually input or maintain the list in each rule.

## Create a New Alias

1. From the **Main Dashboard**, click **Networks**.
2. Click **Aliases** on the left menu.
3. Click **New** on the left menu.
4. Enter a **Name** for the alias. Use a name that is descriptive and useful for future administration.  
5. Optionally, a **Description** can be entered to provide further information about the alias and its purpose.
6. **Create the address set:** Click the edit button (pencil icon) to type in a pipe-delimited list (ex: 10.10.10.10|10.200.10.0/32|10.200.1.1)
**or** to administer individual entries, see ***Managing a List Field*** instructions at the bottom of the page.
7. Select a **Publishing Scope**:

* **Private**: only for use within the same cloud.
* **Global**: for use within the source cloud and additionally available for use by tenants.

8. Click **Submit** (bottom of the page) to save the new alias.

## Modify an Alias

1. From the Main Dashboard, click **Networks**.
2. Click **Aliases** on the left menu.
3. A list of existing rules is displayed.  **Double-click** the desired rule.
4. **To Modify the address list:**. Click the edit button (pencil icon) to directly edit the pipe-delimited list (e.g. 10.10.10.10|10.200.10.0/32|10.200.1.1) **or** administer individual entries. See ***Managing a List Field*** instructions at the bottom of the page.
5. When desired changes have been completed, click **Submit** (bottom of page).
6. If the address list was modified, changes will need to be applied to networks where the alias is used within a rule.  **Navigate to each associated network dashboard** and click **Apply Rules** on the left menu.**

## Use an Alias

When creating network rules, select ***Type*** = *Alias* in the Source/Destination field.  This provides a selection list of available aliases.

</br>

___

### Managing a List Field

**To add a new entry:** &nbsp; ![icon-plus-add.png](/product-guide/screenshots/icon-plus-add.png)

* An initial blank line will appear where an entry can be typed in.
* To add more entries, click the add button to insert a new blank line where an entry can be typed in.

**To select and deselect entries for move/edit/delete:**

* Selection is a toggle: click to select/unselect  
* Selected entries will display a check in the box at the left.
* Multiple entries can be selected to delete or move.

**To edit an existing entry:**&nbsp; ![icon-pencil-edit.png](/product-guide/screenshots/icon-pencil-edit.png)

* Click to select the desired entry for edit.
* Click the edit button.
* The selected entry appears and can be modified. When editing is complete, click the edit button again to save the changes.
  
**To delete an existing entry:** &nbsp; ![icon-trash-delete.png](/product-guide/screenshots/icon-trash-delete.png)

* Click to select intended entry.
* Click the delete button.

___


[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }


---
title: Product Guide - Using Aliases
description: Explanation of aliases and instructions for common uses.
published: true
date: 2023-06-26T15:27:27.578Z
tags: 
editor: markdown
dateCreated: 2023-05-19T15:22:54.181Z
---



# Aliases

Aliases are helpers that centralize management of address sets that will be used in multiple places.  For example, if we have a group of remote administrators we are specifically allowing port access, based on IP address, an alias called "PortAccess" could be created to include the list of allowed addresses.  The alias can then be selected in the configuration of necessary rules, eliminating the need to manually input all the addresses in each rule. Thereafter, whenever the list needs to change, it can be modified in the alias configuration rather than modifying all the associated rules.  
<br>



## To Create a New Alias
1. From the **Main Dashboard**, click **Networks** (on the left menu or the dashboard quick-link).
2. Click **Aliases** on the left menu. 
3. Click **New** on the left menu. 
4. Enter a **Name** for the alias. Use a name that is descriptive and useful for future administration.  <!-- any names that can't or shouldn't be used? -->
5. Optionally, a **Description** can be entered to provide further information about the alias and its purpose.
6. **Create the address set:** 
   - Click the edit button ![icon-pencil-edit.png](/public/userguide-sshots/icon-pencil-edit.png) to enter in a pipe( | )- delimited list (ex: 10.10.10.10|10.200.10.0/32|10.200.1.1)
**\-OR\-**
   - To administer individual entries, see ***Managing a List Field*** instructions at the bottom of the page.
 
    
 7. Select a **Publishing Scope**:
        - **Private** - only for use within the same cloud. 
        - **Global** - for use within the source cloud and additionally available for use by tenants.
          
        
   8. Click **Submit** (bottom of the page) to save the new alias.         


<br>
<br>


## To Modify an Alias

1. From the Main Dashboard, click **Networks** (left menu or the dashboard quick-link).
2. Click **Aliases** on the left menu. 
3. A list of existing rules is displayed.  **Double-click** on the desired rule.
5. **To Modify the address list:**
   - Click the edit button [] to directly edit the pipe( | )- delimited list
**\-OR\-**
   - To administer individual entries, see ***Managing a List Field*** instructions at the bottom of the page.

</div>

5. When desired changes have been completed, click **Submit** (bottom of page). 
6. If the address list was modified, changes will need to be applied to networks using the alias within a rule.  **Navigate to each associated network dashboard and click *Apply Rules* on the left menu.** 


<br>
<br>

## Using an Alias
When creating network rules, select ***Type*** = *Alias* in the  Source/Destination field.  This  provides a selection list of available aliases that can be used. 


<br>




<div style="border-color: #6ebaf0; border-radius: 5px; font-size:89%; color: #3558c0; margin-top: 1em; margin-left: 1em; margin-right: 10em; border-style: none none none solid; border-width: 40; padding-left: 1em; padding-bottom: 1em; background-color: #EEF2F5;" >
  
  <p style="font-size: 125%; font-weight: 800;">Managing a List Field</p>
  
  
**To add a new entry:**
  An initial blank line will appear where an entry can be typed in.
  To add more entries, click the add button to insert a new blank line where an address can be typed in. ![icon-plus-add.png](/public/userguide-sshots/icon-plus-add.png)

    
**To select and deselect entries for move/edit/delete:**
Selection is a toggle: click to select/unselect
Selected entries will display a check in the box at the left.
Multiple entries can be selected for a delete or move.

  
**To edit an existing IP entry:**
Click to select the desired entry for edit.
Click the edit button ![icon-pencil-edit.png](/public/userguide-sshots/icon-pencil-edit.png).
The selected entry appears and can be modified. When editing is complete, click the edit button again to save the changes.
  
**To delete an existing entry:**
Click to select the desired entry.
Click the delete button. ![icon-trash-delete.png](/public/userguide-sshots/icon-trash-delete.png)
</div>


<!--  background-color: #d8e7f2;-->

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>


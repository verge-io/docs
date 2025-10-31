# Aliases

Aliases centralize the management of IP address sets that will be used across multiple network rules. This helps streamline administration by allowing you to maintain address lists in one place rather than updating individual rules.

## Create a New Alias

1. Navigate to **Networks** > **Aliases**.
2. Click **New** on the left menu
3. Complete the alias configuration:

    - **Name** - Enter a descriptive name that will be helpful for administration
    - **Description** (optional) - Provide additional details about the alias's purpose
    - **Address Set** - Define the IP addresses using one of these methods:
        - Enter a pipe-delimited list (e.g., `10.10.10.10|10.200.10.0/32|10.200.1.1`)
        - Add individual entries using the list management tools
    - **Publishing Scope**:
        - **Private** - Available only within this cloud
        - **Global** - Available to this cloud and its tenants

4. Click **Submit** to create the alias

## Modify an Alias

1. Navigate to **Networks > Aliases**
2. Double-click the alias you want to modify
3. Update the address list using either method:
    - Edit the pipe-delimited list directly 
    - Manage individual entries using the list tools
4. Click **Submit** to save changes
5. On each network using this alias in its rules, click **Apply Rules** to implement the changes

## Use Aliases in Network Rules

When creating network rules, set **Type** to **Alias** in the Source/Destination field to select from available aliases.

## Manage List Entries

The list management interface provides these functions:

- **Add Entry** - Click the + icon to insert a new line
- **Edit Entry** - Select an entry and click the pencil icon
- **Delete Entry** - Select an entry and click the trash icon
- **Select Multiple** - Click entries to toggle selection for bulk operations

!!! tip "When modifying aliases used in existing rules, remember to apply the rules on affected networks for changes to take effect."

---
requirements:
  vergeos_version: "26.0 or later"
  access_levels: ["Cluster Admin", "Tenant Admin"]
  background_knowledge: ["VergeOS UI navigation"]

key_concepts:
  - "Tag Categories"
  - "Tag Assignment"
  - "Object Labeling"
  - "Asset Organization"

semantic_keywords:
  - "VergeOS tags"
  - "tagging system configuration"
  - "how to create tags in VergeOS"
  - "assign tags to virtual machines"
  - "organize VergeOS objects"
  - "tag categories setup"

use_cases:
  - "Categorizing VMs by operating system or application"
  - "Organizing tenants by support level or time zone"
  - "Filtering and reporting on tagged assets"
---

# Tags

## Overview

The VergeOS tagging system is a flexible labeling engine that enables administrators to categorize system objects using customized tags. These tags, organized into user-defined categories, allow for efficient indexing, identification, and selection of assets during management activities.

Organizations can tailor tagging to meet their specific operational needs. Tag categories and individual tags may vary widely across environments.

### Example Use Cases
- Tag virtual machines (VMs) by installed operating system
- Tag VMs by installed applications
- Tag VMs by environment (e.g., production vs. testing)
- Tag tenants by support level
- Tag tenants by time zone

---

## Categories

A **category** defines a class or type of tag. Administrators configure categories to specify: 

* Which object types the tags can be assigned to
* Whether the category supports single or multiple tag selections per object

### Example Categories
| Category        | Assignable To         | Selection Type | Example Tags                          |
|----------------|------------------------|----------------|----------------------------------------|
| Operating System | Virtual Machines       | Single         | `Windows 11`, `Debian`                 |
| Application     | Virtual Machines       | Multiple       | `SQL Server`, `Apache`, `Salesforce`   |
| Time Zone       | Tenants, Tenant Nodes  | Single         | `UTC-5`, `UTC+1`, `Asia/Tokyo`         |

Administrators can create any number of categories to suit their organizational structure and workflows.

---

## Create a New Tag Category

1. Navigate to **System** > **Tags**.
2. Click **New** on the left menu.
3. Enter a descriptive **Name** for the category.
4. Optionally, add a **Description**.
5. Configure **Single Tag Selection**: If enabled, only one tag from this category can be assigned to an object. For example, you may want a VM to have only one "Operating System" tag.
6. Toggle **Supported Types** to enable tagging for specific object types.
!!! tip  "All types are disabled by default. Click to toggle between disabled/enabled (enabled = button to the right)."
7. Click **Submit** to save the category.

## Create a New Tag

!!! tip "Tags must belong to an existing category."

1. Navigate to **System** > **Tags**.
2. **Double-click the desired category** from the list.
3. Click **New** on the left menu.
4. Enter a descriptive **Name** for the tag.
5. Optionally, add a **Description**.
6. Click **Submit** to save the tag.


## Assigning Tags to Objects

Tags can be assigned from list views, object dashboards, or the system menu.

To assign tags from a list view:

1. Navigate to the object listing (e.g., *Virtual Machines* > *List*, *NAS* > *Volumes*, etc.)
2. **Select** the desired **object(s)**.
3. Click **Assign Tags** on the left menu.
4. **Select the desired tags** from the available list.
!!! tip "Use the *Search* option to quickly locate tags in large sets."
5. Click **Assign**.


## Viewing, Adding, or Deleting Tags from an Object

To administer tags from an object’s dashboard:

1. Navigate to the object dashboard (e.g. to select a particular VM: *Virtual Machines* > *List*, then double-click the VM).
2. Scroll to the **Tags** section.

### Actions:
- **Delete a tag:** Click the **“x”** on the right next to the tag.
- **Add a tag:** Click the **“+ Assign Tags”** button.

---

## Best Practices

- Use **descriptive names** for both categories and tags to ensure clarity and consistency.
- Align tag structures with operational workflows and reporting needs.
- Review tag usage periodically to maintain relevance and avoid clutter.

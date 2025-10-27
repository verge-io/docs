# Getting Started with the VergeOS UI



This guide introduces the VergeOS User Interface (UI), highlighting primary concepts to help you get oriented quickly.

??? tip "Transitioning from Version 4.13 to Version 26"

    If you're familiar with VergeOS v4.13, this section outlines key updates in v26 to ease your transition.

    While VergeOS v26 introduces a refreshed look and several usability enhancements, the core structure remains comfortably familiar. The interface continues to follow the **overview-to-detail dashboard model**, preserving the general flow while improving clarity and accessibility.

    **What’s New in v26**

    - **Persistent Top Navigation Bar**  
    The main menu now remains visible at all times, allowing seamless context switching.

    - **Redesigned Status Indicators**  
    Tiles and cards now use horizontal status bars instead of circular indicators for clearer visual feedback.

    - **Menu Reorganization**  
    Navigation elements have been regrouped for improved logical flow.

    - **Session History Navigation**  
    The browser’s back button now functions reliably for navigating backward through your session history, reducing reliance on breadcrumbs.

    **Additional Enhancements**

    - Improved visual cues to help you understand your current location and available options.
    - A modernized look and feel for a more intuitive experience.
    - Continued focus on a robust, user-friendly interface for both new and experienced users.

---

## Navigation Model: Overview to Detail

VergeOS uses an **overview-to-detail** navigation model that allows you to start with high-level summaries and drill down into specific assets as needed.

- Top-level views include counts, status indicators, summaries, and alarms.
- Clicking on any item reveals more granular information about that object or category.
- This model supports fast, intuitive access to both broad system insights and detailed diagnostics.

---

## Dashboards

The VergeOS UI is built around dashboards that provide at-a-glance information and quick access to deeper insights.

### Main Dashboard

The home screen displays the Main Dashboard for your VergeOS Cloud, including:

- System-wide statistics
- Main system logs
- Left navigation menu for accessing application subsections
- Quick links to drill down into specific areas

From here, you can explore modules like **Networking**, **Virtual Machines**, and **Users**, and then select individual instances (e.g., a specific VM or network) for detailed investigation.

### Dashboard Examples

Dashboards are available across the system:

- **Module Dashboards**: Networks, Virtual Machines, Storage, etc.
- **Object Dashboards**: Each VM, network, node, tenant, etc. has its own dashboard.

Each dashboard includes links to deeper views and related components.

#### Module Dashboard Example: Networks Dashboard

Provides overall network statistics, logs, and links to individual network devices.

  ![Light mode image](/product-guide/screenshots/networks-dashboard-light.png#only-light)
  ![Dark mode image](/product-guide/screenshots/networks-dashboard-dark.png#only-dark)



#### Object Dashboard Example: VM Dashboard

Displays key information for a specific virtual machine, with links to its drives, NICs, snapshots, devices, and host node.

![Light mode image](/product-guide/screenshots/vm-dashboard-light.png#only-light)
![Dark mode image](/product-guide/screenshots/vm-dashboard-dark.png#only-dark)

---

## Menus

VergeOS includes three primary menu areas:

- **Top Navigation**  
  A persistent menu bar offering access to all major application modules, regardless of your current location.

- **Left Menu**  
  Displays context-sensitive actions based on your current view. Your current module location is indicated near the top of the screen, adjacent to this menu.

- **User Menu**  
  Located in the top-right corner, this menu provides user-specific settings such as:
      * Updating your display name
      * Changing your password
      * Managing SSH keys


## Themes

Themes control the visual styling of the VergeOS UI, including colors and icons. VergeOS includes:

- **Default Light Mode** <i class="bi bi-sun-fill"></i>
- **Default Dark Mode** <i class="bi bi-moon-stars-fill"></i>
- **Custom Themes**: Create branded themes to match your organization’s identity. (Themes must be added by an administrator; once added, a custom theme can be utilized by all users)

To change your selected theme, click the theme icon in the utility bar (top right).


## Auto-Refresh

The auto-refresh toggle is located in the utility bar (top right). It controls whether the UI automatically updates data in real time.

- **Orange icon** <i class="bi bi-arrow-clockwise" style="color:orange;"></i> = Auto-refresh enabled (default)

- **Black/White icon** <i class="bi bi-arrow-clockwise"></i> = Auto-refresh disabled

Disabling auto-refresh may be useful during troubleshooting or when reviewing static data snapshots.

---

## Product Documentation & Help

VergeOS provides context-sensitive help directly within the UI:

- Click the **Product Guide** link at the bottom of any page
- Or click the *question icon* <i class="bi bi-question-square"></i> in the utility bar (top right) and select *Product Guide*

---

## Object Tagging

The [Tagging System](/product-guide/system/tags) allows you to define custom tags and categories for organizing objects within VergeOS. Tags support flexible filtering, grouping, and identification across modules.

---


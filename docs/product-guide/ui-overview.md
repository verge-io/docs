---
# Prerequisites: None (standalone guide)

# Environment & access details
requirements:
  vergeos_version: "26.0 or later"
  access_levels: ["Any authenticated user"]
  background_knowledge: ["Basic web browser usage"]

key_concepts:
  - "VergeOS dashboard navigation model"
  - "Module vs. object views"
  - "Status indicators and monitoring"
  - "Theme customization"

semantic_keywords:
  - "VergeOS UI navigation"
  - "VergeOS 26 interface overview"
  - "getting started VergeOS UI"
  - "VergeOS dashboard explained"
  - "migrate from VergeOS 4.13 to 26.0"

use_cases:
  - "New administrator onboarding"
  - "4.13 user transition to 26.0"
  - "Daily system navigation and monitoring"
---

# Getting Started with the VergeOS 26 UI

This guide introduces the VergeOS User Interface (UI), highlighting primary concepts to help you get oriented quickly and navigate confidently.

## Overview

The VergeOS UI provides a unified management experience for your entire virtualized infrastructure. Whether you're monitoring system health, configuring networks, or managing virtual machines, the interface follows consistent patterns that make complex tasks intuitive.

This document will help you understand how to navigate the VergeOS interface, interpret dashboard information, and locate the tools you need for day-to-day administration.

---

??? tip "Transitioning from VergeOS 4.13 to 26.0"

    If you're familiar with VergeOS 4.13, this section outlines key updates in 26.0 to ease your transition.

    While VergeOS 26 introduces a refreshed look and several usability enhancements, the core structure remains comfortably familiar. The interface continues to follow the **overview-to-detail dashboard model**, preserving the general flow while improving clarity and accessibility.

    **What Stays the Same**
    
    - Overview-to-detail dashboard model and workflow logic
    - Left navigation menu structure and organization
    - Core management workflows for VMs, networks, and storage
    - User menu location and account settings access
    - Dashboard-centric approach with drill-down capabilities

    **What's New in 26**

    - **Terminology Updates**: Virtual Wires are now called **Virtual Switch Ports**, and Cloud Snapshots are now called **System Snapshots**, and Media Images is now called **Files**
    - **Persistent Top Navigation Bar**: The main menu now remains visible at all times, allowing seamless context switching without losing your place
    - **Redesigned Status Indicators**: Tiles and cards now use horizontal status bars instead of circular indicators for clearer visual feedback
    - **Menu Reorganization**: Navigation elements have been regrouped for improved logical flow and faster access to related functions
    - **Enhanced Browser Navigation**: The browser's back button now works reliably, complementing the existing breadcrumb navigation for flexible movement through your session history
    - **Improved Visual Cues**: Better visual hierarchy helps you understand your current location and available options
    - **Modernized Aesthetics**: Updated color schemes and typography create a more contemporary and professional appearance

    **Migration Quick Wins**
    
    - Use the persistent top navigation to quickly switch between major modules (VMs, Networks, Storage) without returning to the main dashboard
    - Look for horizontal status bars instead of circular progress indicators when assessing resource health
    - Take advantage of improved browser back button functionality for faster navigation
    - Explore the reorganized menus to discover more intuitive groupings of related features
    - Try both light and dark themes via the user menu to find your preferred working environment

---

## Navigation Model: Overview to Detail

VergeOS uses an **overview-to-detail** navigation model that allows you to start with high-level summaries and drill down into specific assets as needed. This hierarchical approach organizes information from system-wide summaries down to individual components.

### How It Works

The navigation model follows a consistent three-level pattern throughout the system:

1. **System Level**: The Main Dashboard shows aggregate statistics and health across all resources
2. **Module Level**: Dashboards for VMs, Networks, Storage, etc., display summaries for that resource type
3. **Object Level**: Individual resource dashboards (specific VM, network, or node) provide detailed information and management controls

At each level, you can:

- View summary statistics and current status
- Access relevant logs and activity history
- Click through to more detailed views
- Navigate directly to related resources

**Example Navigation Flow**:
```
Main Dashboard → Networks Module → Internal Network Object → NIC Configuration
```

This model supports both broad monitoring (checking overall system health) and targeted administration (configuring a specific component).

---

## Dashboards

Dashboards are the foundation of the VergeOS UI, providing information and serving as navigation hubs. Every major area of the system has a dashboard, from the system-wide Main Dashboard down to individual resource instances.

### Main Dashboard

The home screen displays the Main Dashboard for your VergeOS system, serving as your primary starting point. This view includes:

**System-Wide Statistics**

- Aggregate counts for VMs, networks, storage, tenants, and nodes
- Current resource utilization (CPU, RAM, storage)
- Health status indicators with color-coded alerts

**Activity and Monitoring**

- Real-time system logs showing recent events and actions
- Performance metrics and trending indicators
- Alert notifications for issues requiring attention

**Navigation Elements**

- Left menu for accessing major system modules
- Quick links to frequently used resources
- Direct access to administrative functions

**Quick Access Sections**

- Top compute resources by utilization
- Most active networks
- vSAN tier status and capacity
- Tenant resource consumption (in multi-tenant environments)

From the Main Dashboard, you can quickly assess system health and navigate to any area requiring attention or configuration.

### Module Dashboards

Each major functional area has its own dashboard that aggregates information for that resource type. These module dashboards provide a middle layer between system-wide views and individual resources.

#### Example: Networks Dashboard

The Networks Dashboard provides:

- Overall network statistics (total networks, active connections, throughput)
- List of all networks with their status and configuration
- Network-specific logs and recent activity
- Links to individual network dashboards for detailed management

  ![Light mode Networks Dashboard](/product-guide/screenshots/networks-dashboard-light.png#only-light)
  ![Dark mode Networks Dashboard](/product-guide/screenshots/networks-dashboard-dark.png#only-dark)

**Common Use Cases**:

- Quickly check which networks are experiencing high traffic
- Identify misconfigured or offline networks
- Access logs to troubleshoot connectivity issues
- Create new networks or modify existing ones

### Object Dashboards

Each individual resource instance has its own dedicated dashboard providing granular detail and management controls.

#### Example: VM Dashboard

A virtual machine's dashboard displays:

**Configuration Summary**

- VM name, power state, and resource allocation
- Operating system and guest tools status
- Assigned compute cluster and host node

**Performance Metrics**

- Current CPU and RAM utilization
- Disk I/O statistics
- Network throughput per NIC

**Component Access**

- Links to drives, NICs, and other virtual devices
- Snapshot management and history
- Console and remote access options

**Related Resources**

- Host node details and health
- Network assignments and connectivity
- Storage tier and volume information

![Light mode VM Dashboard](/product-guide/screenshots/vm-dashboard-light.png#only-light)
![Dark mode VM Dashboard](/product-guide/screenshots/vm-dashboard-dark.png#only-dark)

**Common Actions from VM Dashboard**:

- Power on/off or restart the VM
- Open a console session
- Take or restore snapshots
- Modify VM configuration
- Review performance history

---

## Menus

VergeOS includes three primary menu systems that work together to provide comprehensive access to all system functions. Understanding how these menus work and when to use each one streamlines your workflow.

### Top Navigation Bar

The top navigation bar remains visible at all times (new in v26), providing persistent access to major system modules. This menu includes:

**Primary Modules**

- Dashboard (returns to Main Dashboard)
- Virtual Machines
- Networks
- Storage
- Tenants
- System

**Utility Functions** (right side)

- Notifications center (bell icon)
- Messages and communications (envelope icon)
- RSS feeds and activity streams
- Download center for exports and reports
- User menu and settings

The top navigation allows you to quickly switch between different areas of the system without losing your current context. For example, you can switch from managing a VM to reviewing network configuration, then return to the VM exactly where you left off.

### Left Context Menu

The left menu displays context-sensitive options based on your current location in the interface. As you navigate through the system, this menu dynamically updates to show relevant actions and views, with menu items organized alphabetically.

**At Module Level** (e.g., on Networks Dashboard):

- Dashboard (module overview)
- New (create new resource)
- Settings (module configuration)
- Help (module-specific documentation)

**At Object Level** (e.g., viewing a specific VM):

- Dashboard (resource overview)
- View (detailed information)
- Edit (configuration changes)
- Power (start/stop controls)
- Snapshots (backup management)
- Console (direct access)
- Advanced (specialized functions)

Your current module location is indicated near the top of the left menu, helping you maintain awareness of where you are in the system hierarchy.

### User Menu

Located in the top-right corner (click your username), this menu provides user-specific settings and actions:

**Account Management**

- Update display name
- Change password
- Configure two-factor authentication
- Manage SSH keys

**Preferences**

- Theme selection (light/dark/custom)
- Notification settings
- Default landing page

**Session Controls**

- Switch tenant context (in multi-tenant environments)
- Logout

---

## Themes

VergeOS includes **Default Light Mode** <i class="bi bi-sun-fill"></i> and **Default Dark Mode** <i class="bi bi-moon-stars-fill"></i> themes. Organizations can also create custom branded themes.

**To change your theme**: Click the theme toggle icon in the utility bar (top-right corner). Your preference is automatically saved for future sessions.

For details on creating and managing custom themes, see the [Themes documentation](/product-guide/system/themes).

---

## Auto-Refresh

The auto-refresh feature controls whether dashboard data automatically updates in real time. This toggle is located in the utility bar (top-right corner).

**Status Indicators**:
- **Orange icon** <i class="bi bi-arrow-clockwise" style="color:orange;"></i> = Auto-refresh enabled (default)
- **Black/White icon** <i class="bi bi-arrow-clockwise"></i> = Auto-refresh disabled

### When to Use Auto-Refresh

**Enable (Orange) When**:

- Monitoring active processes or operations
- Watching real-time performance metrics
- Tracking ongoing migrations or backups
- Managing live production workloads

**Disable (Black/White) When**:

- Reviewing historical data or logs
- Taking screenshots for documentation
- Troubleshooting specific issues that require static data
- Reducing system load during maintenance windows

Your auto-refresh preference persists throughout your session but resets to enabled (orange) when you log in again.

---

## Product Documentation & Help

VergeOS provides multiple ways to access help and documentation directly from the interface, ensuring you can find answers without leaving your workflow.

### Accessing the Product Guide

**Method 1**: Click the **Product Guide** link at the bottom of any page

**Method 2**: Click the question mark icon <i class="bi bi-question-square"></i> in the utility bar (top-right) and select **Product Guide**

The Product Guide opens in a new browser tab, allowing you to reference documentation while continuing your work in the main interface.

### Context-Sensitive Help

Many configuration screens and forms include contextual help:

- **Field Labels**: Hover over field labels to see detailed explanations
- **Info Icons**: Click the information icon next to complex settings for additional guidance
- **Validation Messages**: Form fields provide real-time feedback on input requirements and formatting

---

## Object Tagging

Tags allow you to organize and categorize objects throughout VergeOS. For details on creating and using tags, see the [Tags documentation](/product-guide/system/tags).

---

## Verification & Next Steps

### Verify Your Understanding

To confirm you're comfortable with the VergeOS UI, try these quick exercises:

1. **Navigation Practice**: 

   - Start at the Main Dashboard
   - Navigate to the Virtual Machines module
   - Select a specific VM and view its dashboard
   - Return to the Main Dashboard using the breadcrumb or top navigation

2. **Dashboard Exploration**:

   - Identify the current resource utilization from the Main Dashboard
   - Find a module dashboard (Networks, Storage, etc.) and review its statistics
   - Compare information density between module and object dashboards

3. **Menu Familiarity**:

   - Switch between light and dark themes
   - Locate the notification center and check for any alerts
   - Find the user menu and review available options

4. **Help Access**:

   - Open the Product Guide in a new tab
   - Hover over a configuration field to see contextual help
   - Locate the version information displayed in the interface

### Common Issues

| Issue | Solution |
|-------|----------|
| **Can't find a specific feature** | Use the top navigation to access major modules, then drill down using the left context menu |
| **Dashboard data not updating** | Check that auto-refresh is enabled (orange icon) in the utility bar |
| **Interface looks different than expected** | Verify you're using the correct theme (light/dark toggle in top-right) |
| **Navigation breadcrumbs missing** | Click the home icon (system name) in the top-left to reset to Main Dashboard |

---

## Feedback

Your experience with this guide helps us improve VergeOS documentation. If you found any sections confusing or have suggestions for additional topics, please share your feedback with the documentation team.

!!! question "Need Help?"
    If you have questions about navigating the VergeOS interface or need assistance with specific tasks, contact the VergeOS support team through the support portal accessible from the user menu.

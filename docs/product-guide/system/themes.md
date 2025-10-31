# VergeOS Theme Functionality

VergeOS provides a comprehensive Theme system that allows administrators to customize the visual appearance of the user interface. The Theme functionality offers granular control over colors across different UI components including graphs, navigation elements, headers, loaders, and general interface elements.

## Overview

The VergeOS Theme system enables organizations to create custom visual themes that modify interface colors and branding elements. This functionality goes beyond basic UI branding by providing detailed control over specific UI component groups, allowing for comprehensive visual customization that can align with corporate branding or improve user experience.

## What You'll Learn

This guide explains the VergeOS Theme functionality, including where to access theme features, what customization options are available, and how the different theme components work together to create a cohesive interface appearance.

You'll understand:

- Where to find theme management in VergeOS
- What theme property groups are available for customization
- How theme creation and management works
- What file formats and assets are supported
- How themes integrate with the existing UI branding system

## Requirements

**Environment Setup:**

- VergeOS v25.2.0 or later (Theme functionality introduced in this version)
- Administrative access (Cluster Admin or Tenant Admin permissions)

**Background Knowledge:**

- Basic VergeOS navigation and system settings access

## Time Estimate

**Exploration Time:** 10-15 minutes to understand all theme options and functionality

## Accessing Theme Management

### Navigation Path

The Theme system is located within the VergeOS system settings, accessible through the administrative interface.

1. **Access System Settings**:
Navigate to **System** > **Settings** to access the system configuration area

2. **Theme Management Location**:

   - In the left navigation menu of System Settings, you'll find **Themes** as a dedicated section
   - The Themes area shows existing themes in a table format with Name, Description, and Modified date columns

### Theme Management Interface

The System Settings page displays existing themes in the **Themes** section, showing:

- **Name**: The theme identifier (e.g., "light")
- **Description**: Theme description (e.g., "Light theme pack for Verge.io")
- **Modified**: Last modification date and time

## Theme Creation and Management

### Creating New Themes

**New Theme Access**: Click **New Theme** in the left navigation menu to access the theme creation interface.

**Theme Creation Interface Components**:

#### Basic Theme Configuration
- **Name Field**: Required field for theme identification
- **Description Field**: Optional descriptive text for theme documentation
- **Enabled Toggle**: Activates or deactivates the theme
- **Based On Dropdown**: Choose between "Light system theme" or "Dark system theme" as the foundation

#### Color Property Groups

The Colors section organizes customizable UI elements into logical groups:

**Graphs**:

- Six individual graph color properties (Graph 1-6)
- Each property controls colors for different data series in charts and visualizations
- Includes color picker, hex value input, opacity slider, and individual reset functionality

**Loader**:

- **Loader Property**: Controls main loading indicator appearance
- **Loader Chaser**: Configures animated loading element colors
- Real-time preview of loading animations

**Left Navigation**:

- **Background**: Navigation panel background color
- **Text**: Standard navigation text color
- **Hover**: Background color for hover states
- **Hover Text**: Text color during hover interactions
- **Text Disabled**: Color for inactive navigation items

**Header**:

- **Background**: Main header bar background
- **Button Active**: Active button highlighting
- **Button Text**: Standard button text color
- **Button Hover Text**: Text color during button hover
- **Navigation Bar Background**: Sub-header navigation area color

**General**:

- **Background**: Overall application background
- **Card Background**: Background for card-style components
- **Card Border**: Border colors for panels and cards
- **Text**: Primary text color throughout the interface

#### Assets Management

**Custom Logo Options**:

- **Custom Logo (Large)**: 144x36 pixel images for standard logo display
- **Custom Logo (Small)**: 44x44 pixel images for compact areas
- Supported formats: JPG, PNG, SVG

**Custom Favicon**:

- ICO file format support for browser tab customization
- Links to Files section for asset upload management

#### Color Customization Tools

**Individual Property Controls**:

- **Color Picker**: Visual color selection interface
- **Hex Value Input**: Direct hexadecimal color code entry
- **Opacity Slider**: Transparency control for each color property
- **Reset Button**: Individual property reset to default values
- **Global Reset**: "Reset" link to restore all properties in a group

#### Preview Functionality

**Real-Time Preview**:

- **Preview Section**: Shows live representation of theme changes
- **Context-Sensitive Previews**: Different visualizations based on selected property group
- **Interactive Elements**: Preview includes hover states and interactive components

## Theme Property Groups Explained

### Graphs Property Group
Controls the color palette for charts, graphs, and data visualizations throughout VergeOS. Each Graph property (1-6) represents different data series colors, allowing for consistent data visualization branding across dashboards and reporting interfaces.

### Loader Property Group
Manages the appearance of loading indicators and progress elements. The Loader property controls the main spinner or progress bar color, while Loader Chaser handles animated elements within loading interfaces.

### Left Navigation Property Group
Customizes the main navigation panel that appears on the left side of the VergeOS interface. Properties control background colors, text colors, and interactive states to ensure navigation remains functional and visually consistent.

### Header Property Group
Manages the top header bar and its components including buttons, navigation elements, and background colors. These settings affect the primary interface header that contains system navigation and user controls.

### General Property Group
Controls fundamental interface elements including overall backgrounds, card components, borders, and primary text colors. These properties establish the foundation visual appearance that other components build upon.

## Integration with Existing Branding

### Relationship to UI Branding
The Theme functionality introduced in VergeOS v25.2.0 represents an evolution from the previous UI Branding system. What was formerly called "UI Branding" in earlier versions has been enhanced and rebranded as the "Theme" system, providing expanded customization capabilities beyond the original branding features.

### Asset Integration
Custom logos and favicons uploaded through the Theme system integrate with the color schemes to provide complete visual customization. Assets maintain their quality and positioning while adapting to the chosen color palette.

## Theme Application and Management

### Theme Activation
Themes are applied immediately upon saving with the Submit button. The Enabled toggle allows themes to be created and stored without immediate activation.

### Theme Hierarchy
In multi-tenant environments, themes apply to the current tenant level and inherit to lower levels unless overridden. This allows for consistent branding across organizational hierarchies while permitting customization where needed.

### Theme Persistence
Theme settings are stored as part of the VergeOS system configuration and persist across system updates and reboots. Theme configurations can be exported and imported as part of system backup and restoration processes.

## Supported File Formats and Specifications

### Logo Requirements

- **Large Logo**: 144x36 pixels, JPG/PNG/SVG formats
- **Small Logo**: 44x44 pixels, JPG/PNG/SVG formats
- File size recommendations: Under 1MB for optimal performance

### Favicon Specifications

- **Format**: ICO file format required
- **Recommended sizes**: 16x16, 32x32, 48x48 pixels within single ICO file
- Fallback support for PNG format in modern browsers

### Color Format Support

- **Hex Values**: Standard 6-digit hexadecimal color codes (#RRGGBB)
- **Opacity**: Percentage-based transparency (0-100%)
- **Color Picker**: Visual RGB/HSV selection interface
- **Reset Functionality**: Immediate return to system defaults

The VergeOS Theme functionality provides comprehensive visual customization capabilities that enable organizations to create cohesive, branded interfaces while maintaining usability and accessibility standards across their virtualization platform.
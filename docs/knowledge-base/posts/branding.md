---
title: Customizing the User Interface
slug: customizing-the-user-interface
description: Guide on how to customize branding and colors in the VergeOS UI.
draft: false
date: 2025-10-29T14:02:02.831Z
tags:
  - branding
  - color
  - dashboard
  - logo
categories:
  - UI
  - Branding
editor: markdown
dateCreated: 2022-06-29T18:26:45.499Z
---

# Customizing the VergeOS User Interface

VergeOS supports custom branding at every tenancy layer (if permitted), using the **Themes** feature. This guide walks you through modifying the user interface (UI) with your organization’s branding elements—including logos, colors, and favicons.

!!! note "What's New in VergeOS v26"
    - **Light and Dark Modes**: VergeOS includes default light and dark themes, and supports custom themes based on either mode.
    - **Multiple Theme Variants**: Administrators can create multiple branded themes, such as light and dark versions, and make them available for user selection.

   
## How to Change your UI Branding

Follow these steps to customize your VergeOS environment:

1. **Upload Logo and Icon files**:
    - Upload the desired logo in `.png` or `.jpg` format. For best results, use a **144x36** image for the large logo and **44x44** for the small logo.
    - If desired, upload a favicon in `.ico` format. 

!!! tip "Instructions for uploading files to the vSAN can be found [here](/product-guide/storage/uploading-files-to-vsan)"

2. **Create one or more Custom Themes**: to implement your branding  
Refer to the [Themes Product Guide](/product-guide/system/themes) for instructions. 

3. **Control User Theme Options**:   
All enabled themes are presented as options for users to select (from the utility bar).  **To enforce exclusive custom branding, you must disable the standard default VergeOS themes (light/dark).**  

## Best Practices for UI Customization

### Visual Design

- **Create Light and Dark Variants:** Offer both light and dark versions of your custom theme to support different lighting environments and user preferences. Light mode enhances visibility in bright settings, while dark mode reduces glare and can conserve battery life on OLED devices. 
- **Consistency**: Ensure that the colors and logos you choose for the branding align with your organization's style guide for consistency.
- **Logo Dimensions**: Upload logos with the correct dimensions to prevent distortion or scaling issues.

### Accessibility & Readability

- **Readability**: Use contrasting colors for text and background elements to ensure readability across different devices.
- **Test Across Themes:** Verify that all UI elements remain legible and visually coherent in both light and dark modes.


### Theme Management & User Experience 

- **Preview Before Enabling**: Setting a new theme to disabled initially can give you time to verify branding guidelines and usability before enabling it for user selection.
- **Disable Unused Themes:** Users can select from all enabled themes. To enforce exclusive branding, disable the default VergeOS themes (light/dark); remove any outdated custom themes you no longer wish to offer.
- **Name Themes Clearly**: Use descriptive names (e.g., “Acme Light” or “Acme Dark”) to help users easily identify the appropriate version.



---

By following these steps and using the available options, you can fully customize the VergeOS UI to reflect your organization's brand. Make sure to save your settings once you're satisfied with the changes.

---

!!! note "Document Information"
    - Last Updated: 2025-10-29
    - vergeOS Version: 26.0

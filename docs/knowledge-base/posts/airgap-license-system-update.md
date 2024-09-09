---
title: Updating a VergeOS System with Airgap License
slug: updating-vergeos-system-with-airgap-license
description: Step-by-step guide on how to perform a software update on a VergeOS system using air-gap licensing
draft: false
date: 2024-08-19T16:30:00.000Z
tags:
  - airgap
  - license
  - verge
  - vergeos
  - air-gapped
  - software update
  - system update
categories:
  - System Administration
  - Software Updates
editor: markdown
dateCreated: 2024-08-19T16:30:00.000Z
---

# Updating a VergeOS System with Airgap License

## Overview

!!! info "Key Points"
    - This guide details the process of manually updating a VergeOS system using an air-gap license.
    - The update is performed using an ISO file, ensuring that systems without internet access can be kept up-to-date.
    - Ensure you have a valid air-gap license and the latest ISO file before starting.

This guide provides a step-by-step process to manually update your air-gapped VergeOS system using an ISO file.

## Prerequisites

- Access to the VergeOS Cloud Dashboard.
- The latest VergeOS update ISO file.
- A valid air-gap license.
- A recent backup of your VergeOS system.

## Steps

1. **Download the Update ISO**
   - Visit the VergeOS updates page at [https://updates.verge.io/download](https://updates.verge.io/download).
   - Download the latest VergeOS release ISO file.
   
   !!! tip "Pro Tip"
       Ensure that the ISO file corresponds to your current VergeOS version to avoid compatibility issues.

2. **Upload the ISO to VergeOS**
   - Log in to your VergeOS Cloud Dashboard.
   - Navigate to **Media Images** in the left-hand menu.
   - Upload the downloaded ISO file to the **Media Images** section.

   !!! note
       The upload process may take a few minutes depending on your network speed.

3. **Configure Update Settings**
   - Go to **System** > **Updates** > **Edit Settings**.
   - In the **Update Source** dropdown menu, select `-- Update ISO --`.
   - Choose the ISO file you just uploaded from the **Media Images**.
   - Click **Submit** to save the settings.

4. **Perform the Update**
   - Return to the **Updates** section and click **Check For Updates**.
   - Once the update is detected, click **Download**.
   - After the download completes, click **Install**.
   - Follow the prompts to **Reboot** the system to apply the updates.

   !!! warning "Important"
       Do not interrupt the update process. Ensure that the system remains powered on and connected during the update.

## Troubleshooting

!!! warning "Common Issues"
    - **Issue:** Update not detected after uploading the ISO.
      - **Solution:** Ensure the ISO was uploaded correctly and reselect it in the Update Source settings.
    
    - **Issue:** Errors during the update process.
      - **Solution:** Check system logs for detailed error messages and verify that your air-gap license is valid.
    
    - **Issue:** System fails to reboot after the update.
      - **Solution:** Contact Verge support for assistance.
      - 
## Additional Resources

- [VergeOS ISO Downloads](https://updates.verge.io/download)
- [Sanpshots](/product-guide/snapshots-overview/)
- [VergeOS Product Guide](/product-guide)

## Feedback

!!! question "Need Help?"
    If you encounter any issues during the update process or have any questions, please reach out to our support team.

---

!!! note "Document Information"
    - Last Updated: 2024-08-19
    - VergeOS Version: 4.12.6

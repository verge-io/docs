---
title: Updating a VergeOS System with Airgap License
slug: updating-vergeos-system-with-airgap-license
description: Step-by-step guide on how to perform a software update on a VergeOS system using air-gap licensing
published: true
date: 2024-08-19T16:30:00.000Z
tags: airgap, license, verge, vergeos, air-gapped, software update, system update
categories:
  - System Administration
  - Software Updates
editor: markdown
dateCreated: 2024-08-19T16:30:00.000Z
---

# Updating a VergeOS System with Airgap License

For VergeOS systems using air-gap licensing, software updates must be performed manually using an ISO file. This guide will walk you through the process of updating your air-gapped VergeOS system.

## Prerequisites

- Access to the VergeOS Cloud Dashboard
- The latest VergeOS update ISO file
- A valid airgap license

## Update Process

Follow these steps to update your VergeOS system:

1. **Download the Update ISO**
   - Visit https://updates.verge.io/download
   - Download the latest VergeOS release ISO file

2. **Upload the ISO to VergeOS**
   - Log in to your VergeOS Cloud Dashboard
   - Navigate to the Media Images section
   - Upload the downloaded ISO file to Media Images

3. **Configure Update Settings**
   - Go to **System** > **Updates** > **Edit Settings**
   - Change the **Update Source** to "-- Update ISO --"
   - Select the ISO that you just uploaded to Media Images
   - Click **Submit** to save the settings

4. **Perform the Update**
   - In the Updates section, click **Check For Updates**
   - Once updates are detected, click **Download**
   - After the download completes, click **Install**
   - When prompted, **Reboot** the system to apply the updates

## Important Considerations

- Always create a backup of your system before performing any software updates
- Ensure that your airgap license is valid and up-to-date before initiating the update process
- The update process may take some time. Do not interrupt the process once it has started

## Troubleshooting

If you encounter any issues during the update process:

1. Check the system logs for any error messages
2. Ensure that the ISO file was downloaded and uploaded correctly
3. Verify that your airgap license is valid and not expired

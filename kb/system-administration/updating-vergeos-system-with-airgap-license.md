---
description: "Step-by-step guide on how to perform a software update on an air-gapped VergeOS system using an ISO file, including downloading, uploading, configuring update settings, and applying the update."
---

# Updating a VergeOS System with Airgap License

## Overview

{% hint style="info" %}
**Key Points**

- System updates should be performed during a maintenance window
- This guide details the process of manually updating a VergeOS system using an air-gap license.
- The update is performed using an ISO file, ensuring that systems without internet access can be kept up-to-date.
- Ensure you have a valid air-gap license and the latest ISO file before starting.
{% endhint %}

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

   > **Pro Tip:** Ensure that the ISO file corresponds to your current VergeOS version to avoid compatibility issues.

2. **Upload the ISO to VergeOS**
   - Log in to your VergeOS environment.
   - Navigate to **Files**
   - Upload the downloaded ISO file to the **Files** section.

   > **Note:** The upload process may take a few minutes depending on your network speed.

3. **Configure Update Settings**
   - Go to **System** > **Updates** > **Edit Settings**.
   - In the **Update Source** dropdown menu, select `-- Update ISO --`.
   - Choose the ISO file you just uploaded from the ***Files***.
   - Click **Submit** to save the settings.

4. **Perform the Update**
   - Return to the **Updates** section and click **Check For Updates**.
   - Once the update is detected, click **Download**.
   - After the download completes, click **Install**.
   - Follow the prompts to **Reboot** the system to apply the updates.

   > **Important:** Do not interrupt the update process. Ensure that the system remains powered on and connected during the update.

## Troubleshooting

{% hint style="warning" %}
**Common Issues**

- **Issue:** Update not detected after uploading the ISO.
  - **Solution:** Ensure the ISO was uploaded correctly and reselect it in the Update Source settings.

- **Issue:** Errors during the update process.
  - **Solution:** Check system logs for detailed error messages and verify that your air-gap license is valid.

- **Issue:** System fails to reboot after the update.
  - **Solution:** Contact Verge support for assistance.
  -
{% endhint %}

## Additional Resources

- [VergeOS ISO Download](https://updates.verge.io/download)
- [Snapshots](https://docs.verge.io/product-guide/backup-dr/snapshots-overview/)

## Feedback

{% hint style="info" %}
**Need Help?**

If you encounter any issues during the update process or have any questions, please reach out to our support team.
{% endhint %}

---

{% hint style="info" %}
**Document Information**

- Last Updated: 2024-08-19
- VergeOS Version: 4.12.6
{% endhint %}

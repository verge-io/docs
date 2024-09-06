---
title: Requesting an Airgap License
slug: requesting-an-airgap-license
description: Guide on how to request and obtain an airgap license for VergeOS Systems with no outbound Internet access
draft: false
date: 2024-08-19T15:41:14.296Z
tags: [airgap, license, verge, vergeos, air-gapped]
categories:
  - Licensing
  - System Administration
editor: markdown
dateCreated: 2024-08-19T19:08:58.594Z
---

# Requesting an Airgap License for VergeOS

## Overview

!!! info "Key Points"
    - VergeOS requires a valid license for operation
    - Airgapped environments need a special airgap license
    - The process involves generating a license request file and emailing it to Verge

This guide walks you through the process of requesting an airgap license for VergeOS systems in environments without outbound Internet access.

## Prerequisites

- Access to the VergeOS Cloud Dashboard
- A working email client on a machine that can send external emails
- Understanding of your system's airgapped status

## Steps

1. Navigate to System Settings
   - From the Cloud Dashboard, click **System** on the left menu
   - Click **Settings** on the left menu

2. Initiate License Request
   - In the **License** section, click the **Request License** button

3. Generate License Request File
   - A popup window titled "Request Generated" will appear
   - This window displays information about the license request file
   
   ![Request License Popup](/api/placeholder/400/320)

4. Download Request File
   - Click the **Download Request File** button
   - Save the license request file to your local machine

5. Prepare Email to Verge
   - Click the **Email license@Verge.io** button
   - This opens your default email client with a pre-addressed email

6. Send License Request
   - Attach the downloaded license request file to the email
   - Provide additional information in the email body (e.g., company name, purpose of license)
   - Send the email to Verge's licensing team

## What Happens Next

1. Verge processes your request and generates an airgap license file
2. You receive a reply email with the airgap license file attached
3. Upload the received license file to your VergeOS system (covered in a separate guide)

!!! note "Processing Time"
    If you haven't received a response within 2 business days, please follow up with Verge's support team.

## Important Considerations

- Ensure the system requesting the license is the one you intend to license
- Keep the license request file secure
- For multiple systems, repeat this process for each system individually

## Troubleshooting

!!! warning "Common Issues"
    - Problem: Unable to generate license request file
      - Solution: Verify your access permissions in the VergeOS Cloud Dashboard
    
    - Problem: Email client doesn't open automatically
      - Solution: Manually compose an email to license@Verge.io and attach the downloaded request file

## Additional Resources

- [Understanding VergeOS Licensing]
- [Uploading an Airgap License to VergeOS]
- [VergeOS System Requirements]

## Feedback

!!! question "Need Help?"
    If you encounter any issues while requesting an airgap license or have questions about this process, please don't hesitate to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2024-08-19T15:41:14.296Z
    - VergeOS Version: 4.12.6

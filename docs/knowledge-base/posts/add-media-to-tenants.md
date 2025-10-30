---
title: Sharing Files to Tenants
slug: sharing-files-to-tenants
description: Learn how to share files from a Service Provider to Tenants in the VergeOS system.
author: vergeOS Documentation Team
draft: false
date: 2023-01-24T19:20:42.724Z
tags:
  - media
  - tenant
  - media images
  - files
  - tenants
categories:
  - Tenant
  - Media Images
editor: markdown
dateCreated: 2022-08-01T20:59:20.590Z
---

# Sharing Files to Tenants

## Overview

!!! info "Key Points"
    - Service Providers can share files with Tenants
    - Files must already be uploaded to the vSAN
    - Process is quick and uses a branch command

This article guides Service Providers through the process of sharing files, such as media images, with their Tenants in the VergeOS system. This feature allows Tenants to access specific files within their own *Files* section.

## Prerequisites

- Access to the VergeOS system as a Service Provider
- Files already uploaded to the vSAN
- Existing Tenants in the system

## Steps

1. Navigate to the Tenants Dashboard
   - From the Main Dashboard, select "Tenants" on the left menu

2. Access Tenant List
   - Select "Tenants" to view a listing of all your Tenants

3. Select the Desired Tenant
   - Double click on the Tenant you want to share files with

4. Access the Add File Feature
   - Select "Add File" in the left menu

5. Choose File Type
   - Select File Type from the dropdown list
   
!!! note "Tip"
    Select "ALL" to get a listing of all files available, regardless of type. This will include .raw files (VM disk images) from the parent VDC.

6. Select Specific File
   - Choose the specific file you want to share from the dropdown list

7. Submit Changes
   - Click the submit button at the bottom of the page

8. Confirmation
   - The process is near-instant as it is done with a branch command
   - The file is now available to the Tenant within their own *Files* section

## Troubleshooting

!!! warning "Common Issues"
    - Problem: File not appearing in Tenant's *Files* section
      - Solution: 
        1. Verify that the file was successfully uploaded
        2. Check if the correct file type was selected
        3. Ensure that the changes were submitted properly

    - Problem: Unable to select a specific file
      - Solution: 
        1. Confirm that the file exists in the *Files* section
        2. Try selecting "ALL" in the File Type dropdown to see if the file appears

## Additional Resources

- [Understanding vSAN in VergeOS](/product-guide/storage/vsan-architecture)
- [Managing Tenants](/product-guide/tenants/create-tenants)
- [Uploading Files](/product-guide/storage/uploading-files-to-vsan)

## Feedback

!!! question "Need Help?"
    If you encounter any issues while sharing files to tenants or have questions about this process, please don't hesitate to contact our support team.

---

!!! note "Document Information"
    - Last Updated: 2023-08-24
    - VergeOS Version: 4.12.6

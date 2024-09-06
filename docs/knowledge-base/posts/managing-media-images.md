---
title: Managing Media Images  
slug: managing-media-images  
description:  
draft: false  
date: 2023-01-23T22:25:11.107Z  
tags: media, images, managing, cd, dvd, iso  
categories:  
  - Media Images  
editor: markdown  
dateCreated: 2022-07-11T18:35:05.374Z  
---

## How To Create, Upload, and Manage Media Images

The **Media Images** section provides a central location to upload files for use in VergeOS. It supports ISOs, VM disk images, logos for custom branding, and general file sharing between sites and tenants.

### How to Upload Files to Media Images

To upload a media image, ensure that the file is in one of the supported formats.

!!! note "Other extensions can be uploaded to the server but may not be recognized as usable by VergeOS."

1. From the **Main Dashboard**, select **Media Images** from the left menu and click **Upload**.
2. You may also choose **Upload from URL** if you are sharing a file from another site or have a URL.

![mediaimages1.png](/docs/public/mediaimages1.png)

Once the file transfer completes, it will be available in the **Media Images** list for use.

### Creating a Public Link

1. To create a **Public Link**, select a file and click **Add Public Link** from the left menu.

![mediaimages2.png](/docs/public/mediaimages2.png)

2. Choose the format for sharing the file:

#### Link Format

- **Anonymous (uuid)**: Appends the file's UUID to the end of the link.
- **Custom**: Allows for a custom name to be used in the link.
- **Use file name**: Appends the existing file name and extension to the link.

#### Expiration Type

- **Never Expire**: The link will remain active indefinitely.
- **Set Date**: Set a specific expiration date and time for the link.

![pub-link-format.png](/docs/public/pub-link-format.png)

The **Public Link** can be shared with other systems, for general file sharing, or with local tenants to provide access without requiring an internet download. However, sharing via this method uses network bandwidth. For a more efficient way to share files to a tenant, see the [Add Media to Tenants](/docs/knowledge-base/sharing-media-images-to-tenants/) guide.

!!! info "In the **Media Images** section, you can also:"  
    - Manipulate **Public Links**  
    - **Download** files  
    - **Edit** file names and storage tiers  
    - **View and Remove References** to files  
    - **Delete** files."


---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

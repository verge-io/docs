---
title: "Uploading Files to the vSAN"
description: "Upload ISO images, VM disk images, and other files to the VergeOS vSAN from a local computer or web URL, and optionally share them via public download links."
semantic_keywords:
  - "upload ISO to vSAN, upload disk image to VergeOS, add files to vSAN storage"
  - "URL upload, download ISO from URL, import media images"
  - "public download link, share file from vSAN, file sharing"
  - "supported file formats, qcow2 vmdk raw vhd iso upload"
use_cases:
  - vm_provisioning
  - storage_management
  - initial_setup
tags:
  - vsan
  - upload
  - files
  - iso
  - media-images
  - storage
  - disk-images
  - public-links
categories:
  - Storage
  - Virtual Machines
---

# Uploading Files to the vSAN

The **Files** section provides for uploading files to the VergeOS vSAN, allowing ISO images, drive images, VM definition files, and other media to be easily accessible for creating, installing, and importing VMs.

!!! info "Supported File Formats"
    The vSAN accepts the following file types:

    | Category | Formats |
    |----------|---------|
    | **VM disk images** | `.raw`, `.qcow2`, `.qcow`, `.qed`, `.vmdk`, `.vdi`, `.vhd`, `.vhdx`, `.img` |
    | **VM packages** | `.ova`, `.ovf`, `.vmx` |
    | **Disc images** | `.iso` |

    The maximum individual file size is **256 TiB**. For large files (over 10 GB), the URL upload method is recommended to avoid browser timeout issues.

!!! warning "File Record Limit"
    The files subsystem supports a maximum of **50,000 file records** per system. When this limit is reached, new file uploads and VM disk image creation will fail until existing file records are removed. Implement lifecycle policies to remove obsolete VM images and ISOs.

!!! note
    Optionally, files uploaded to the **Files** section can be shared via a public download link.

## Upload a File from the Local Computer

1. From the main dashboard, select **Files** from the top menu.
2. Select **Upload**.
3. Click the **Choose Files** button.
4. Browse to the desired folder and select the file(s). Multiple files can be selected.
5. Click the **Open** button.
6. Click the **Upload** button.
7. An upload progress popup tracks each file. From this window, you can pause or cancel individual uploads. Completed files display in green.

!!! warning
    Reloading the browser window will interrupt the file upload.

## Upload a File from a Web Link (URL)

1. From the main dashboard, select **Files** from the top menu.
2. Select the **Upload from URL** button.
3. Enter a valid URL (for example: `https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso`).
4. Enter a **Name** for the file.
5. Optionally, enter a **File Description** to provide additional information.
6. Select a **Preferred Tier** to control which storage tier hosts this file, or leave at **Default** to use the system-configured tier. See [Preferred Tiers](/product-guide/storage/preferred-tiers) for details on tier behavior.
7. **Allow insecure SSL links** permits downloads from HTTPS servers with invalid, expired, or self-signed certificates. Enable this for internal servers or lab environments that do not have CA-signed certificates. Do not enable for downloads from untrusted sources.
8. **Skip header check** skips the HTTP HEAD pre-flight validation that checks content type and size before downloading. Enable this if the remote server does not support HEAD requests or returns non-standard headers that cause the upload to fail. This does not affect the integrity of the downloaded file itself.
9. Click the **Submit** button.
10. The file will appear in the **Files** listing.

## Create a Download Link for an Uploaded File

1. From the main dashboard, select **Files** from the top menu.
2. Select the desired **File** from the list.
3. Click **Add Public Link** on the left menu.
4. Select a **Link Format**:
    - **Anonymous (uuid)** -- creates a public download link using a GUID (128-bit number).
      *Example: `https://verge.example.com/273b5d6a--b205-1e1b-6ae6-01cfa7ed1233`*
    - **Custom** -- creates a public download link using the name entered.
      *Example: `https://verge.example.com/customname`*
    - **Use File Name (recommended)** -- creates a public download link using the original filename.
      *Example: `https://verge.example.com/virtio-win-1.9.6.iso`*
5. Select an **Expiration Type**:
    - **Never Expire (default)** -- the download link remains active indefinitely. It can be manually edited or deleted later.
    - **Set Date** -- select a specific date and time for the link to expire.
6. Click **Submit** to save the link.

!!! note "Link Names Are Permanent"
    Once a public link is created, its name (URL path) cannot be changed. To use a different link name, delete the existing link and create a new one.

![Files list showing download link and copy icon](/product-guide/screenshots/mediaimages-link-copy.png)

The Files list appears. Download options appear on the far right of the given file:

- Click **Link** to directly download the file from the page.
- Click the **copy icon** to copy the download address to the clipboard.

## Related Pages

- [Preferred Tiers](/product-guide/storage/preferred-tiers) -- control which storage tier hosts specific files and workloads.
- [Importing VMs from Uploaded Media Images](/product-guide/virtual-machines/import-from-upload) -- use uploaded disk images to create VMs.
- [Virtual Machine Drives](/product-guide/virtual-machines/vm-drives) -- attach uploaded disk images and ISOs to VMs.
- [Removing ISO References](/product-guide/storage/removing-iso-refs) -- detach ISO files from VMs before deletion.

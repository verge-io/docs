---
title: Exporting a Virtual Machine
slug: exporting-a-virtual-machine
description: Learn how to export a virtual machine from VergeOS and download its disk as a .raw file.
draft: false
date: 2023-01-24T19:22:21.109Z
tags: vm, export
categories:
  - Backup
  - VM
  - Snapshot
editor: markdown
dateCreated: 2022-07-11T18:16:54.516Z
---

# Exporting Virtual Machines from VergeOS

Exporting a virtual machine (VM) from VergeOS allows you to download the VM’s disk in **.raw** format, which is compatible with many hypervisors. This guide outlines the steps to export a VM and download its virtual disk.

## Steps to Export a Virtual Machine

1. **Log in** to the VergeOS platform and navigate to the **dashboard of the virtual machine** you wish to export.
2. From the **left-hand menu**, click on **Drives** to view a list of the **virtual disk drives** attached to the VM.
3. Select the **drive** you want to export, then choose **Download** from the left-hand menu. The virtual disk will be downloaded in **.raw** format.
    - The **.raw** disk format is widely supported by many modern hypervisors.
4. The system will automatically begin downloading the **disk image**.
5. Once the download completes, refer to the **documentation for your destination hypervisor** for instructions on how to **import, upload, or convert** the **.raw** disk image.

## Important Considerations

- **.raw format**: The exported VM drive is downloaded in **.raw** format. This format is compatible with most hypervisors, but some may require converting the image to another format such as **.qcow2** or **.vmdk**. Check your destination hypervisor’s documentation for conversion tools or instructions.
- **File size**: Depending on the size of the virtual disk, the download can be large. Ensure you have enough disk space available on the system where you are downloading the file.


By following these steps, you can successfully export and download virtual machines from VergeOS for use in other environments.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

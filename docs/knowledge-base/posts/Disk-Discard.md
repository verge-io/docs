---
title: VM Disk Discard
slug: vm-disk-discard
description: Managing disk discard settings for virtual machines in VergeOS to optimize storage usage.
draft: false
date: 2023-09-12T16:53:09.094Z
tags: disk management, trim, discard, storage, vsan, disk performance, disk
categories:
  - Best Practices
  - VM
editor: markdown
dateCreated: 2023-03-30T13:36:19.727Z
---

# VM Disk Discard

The **Discard** option on a VM Disk in VergeOS is responsible for managing unused storage blocks by issuing **TRIM** or **DISCARD** commands. When **Discard** is enabled, the system automatically frees up unused blocks, helping to maintain efficient storage usage on the **vSAN**.

## Enabling or Disabling Disk Discard

When creating or editing a VM disk, you have the option to enable or disable **Discard**. By default, **Discard** is enabled, and it is highly recommended to leave it enabled for optimal storage efficiency. When **Discard** is disabled, deleted files on the virtual disk do not immediately free up the corresponding storage, leading to potential overuse of storage resources.

Here’s what happens when **Discard** is enabled:

- The system periodically identifies and frees unused disk blocks.
- **vSAN** storage remains optimized, as unused blocks are reclaimed.
- Disk space usage more accurately reflects the actual data stored on the VM.

![2023-03-30_10_43_52-diskdiscardwindow.png](/docs/public/2023-03-30_10_43_52-diskdiscardwindow.png)

---

!!! warning "Only disable Discard for performance reasons"
    Disabling **Discard** can lead to storage inefficiencies and should only be done for specific performance-related reasons. Always consult with **VergeOS Support** before disabling this feature.

## Why Use Disk Discard?

- **Efficient Storage Management**: When a file is deleted from a VM, the unused blocks are immediately flagged as free, allowing the **vSAN** to reuse that space for other data.
- **Improved Disk Performance**: Discard operations help maintain a clean and optimized storage system, reducing overhead from managing fragmented or unused blocks.
- **Space Reclamation**: Particularly in environments with high storage churn (i.e., frequent file creation and deletion), **Discard** ensures that space is consistently reclaimed, avoiding storage bloat.

## When to Disable Disk Discard

In rare circumstances, you may need to disable **Discard** to improve performance, particularly on certain workloads where the overhead of issuing TRIM/DISCARD commands may cause delays or slowdowns. Before making this change, it's critical to understand the trade-offs in terms of storage efficiency and consult with VergeOS Support for further guidance.

---

By keeping **Discard** enabled, you ensure that VergeOS optimizes storage for virtual machines, maintaining high efficiency and minimizing wasted space.

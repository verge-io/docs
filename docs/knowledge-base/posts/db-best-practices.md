---
title: Database Best Practices
slug: database-best-practices
description: Best practices for optimizing database performance on Microsoft Windows in VergeOS.
draft: false
date: 2023-04-21T13:37:38.002Z
tags: sql, best practice, database, db
categories:
  - Best Practices
editor: markdown
dateCreated: 2022-09-01T17:00:25.460Z
---

# Database Performance Best Practices on VergeOS

Running databases on VergeOS can deliver excellent performance when properly configured. Below are the recommended best practices for optimizing database performance, specifically for databases running on **Microsoft Windows** within the VergeOS environment.

---

## Key Adjustments for Optimizing Performance

- **Backup Location**: Always store database backups directly within VergeOS. This ensures faster read/write access and better overall performance for backup operations.

- **Decrypt Databases Before Migration**: If your database is encrypted, it is recommended to **decrypt** the database before migrating it onto VergeOS. This prevents potential performance degradation during the initial transfer and ensures optimal operation within the environment.

- **Disable Automatic Defragmentation**: The built-in Windows **automatic defrag job** should be disabled. Defragging on virtual disks can lead to performance issues, especially on SSDs or highly fragmented virtual environments like VergeOS.

- **Disable Windows Defender**: Windows Defender, while useful for security, can significantly affect database performance due to real-time scanning. Disable Defender or, at the very least, **exclude** the following from being scanned:
    - The path or drive where the **database files** are stored
    - **Log files** and **transaction log drives**
    
- **Turn Off Non-Essential Windows Services**: Many Windows services are unnecessary for database performance and can consume valuable resources. Disable any non-essential services to free up CPU, RAM, and disk I/O for database operations.

- **Core Overcommitment**: Avoid overcommitting CPU cores, especially if multiple database VMs are sharing the same physical CPU cores. Overcommitting can lead to resource contention, reducing performance for each VM.

- **Disable Fsync on Log Drives**: For virtual disks used to store logs, consider disabling **Fsync**. This can improve I/O performance by reducing the frequency of forced data synchronization on log writes. You can do this by editing the specific virtual disk settings in VergeOS.

    !!! warning "Important"
    Disabling Fsync can lead to data loss in case of a crash. Ensure this aligns with your database's tolerance for I/O performance versus reliability trade-offs.

- **Core Allocation Limits**: Limit the number of cores allocated to a database VM so that it does not exceed the **physical cores available on a single CPU socket**. Do not count hyperthreaded cores in this calculation.

    **Example**: On a dual-socket system with 8 physical cores per socket (16 cores, 32 threads), limit the VM to use **8 cores** (1 physical socket), avoiding overcommitment across multiple sockets.

- **Memory Allocation**: Ensure that the memory allocated to the database VM does not exceed the physical memory available in a single CPU socket. This ensures memory access is localized and reduces memory access latency.

---

## Network and Storage Optimizations

- **Use VirtIO Drivers**: For network performance, it is recommended to use **VirtIO network drivers** whenever possible. These drivers are optimized for performance in virtual environments and provide significantly better throughput compared to emulated drivers (e.g., e1000).

    You can download the latest stable VirtIO drivers from the following link:
    [Download VirtIO Drivers](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)

- **Monitor Disk I/O**: Regularly monitor the disk I/O performance, especially on high-write activity volumes like log files or tempdb files, and consider allocating high-performance SSD or NVMe drives if required.

By following these best practices, you can optimize the performance and reliability of your database systems running on VergeOS. If further fine-tuning is required, VergeOS supports additional features that can help monitor and improve VM performance in real-time.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

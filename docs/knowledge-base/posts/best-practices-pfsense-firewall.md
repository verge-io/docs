---
title: Best Practices - Running a pfSense Virtual Firewall
slug: running-a-pfsense-virtual-firewall
description: Best practices for deploying and managing pfSense as a virtual firewall within VergeOS.
draft: false
date: 2023-01-24T19:25:40.944Z
tags:
  - pfsense
  - firewall
  - best
  - practice
categories:
  - Firewall
  - Best Practices
editor: markdown
dateCreated: 2022-09-01T16:45:24.147Z
---

# Best Practices - Running a pfSense Virtual Firewall

pfSense is a widely-used open-source firewall and router software that can be run as a virtual machine (VM) within VergeOS. Leveraging pfSense inside VergeOS allows for highly customizable and flexible firewall configurations. Below are the best practices for creating and maintaining a pfSense virtual firewall in VergeOS.

## 1. Configuring Disk and Network Interfaces

When deploying pfSense as a virtual machine, ensure that the disk and network interfaces are configured for optimal performance.

- **Disk and Network Interface Type**: Set both the disk and network interfaces to **VirtIO**. This configuration provides better performance compared to the default options.
    - **VirtIO for NIC**: By default, VergeOS may configure the network interface to use **E1000**. While this can work, it's recommended to switch to **VirtIO** for better throughput and reduced CPU overhead. Failure to use VirtIO can lead to intermittent traffic issues or slowness, especially under high network loads.
    - **VirtIO for Storage**: Using VirtIO for storage ensures faster disk I/O, reducing bottlenecks in the system when dealing with large firewall logs or managing stateful connections.

## 2. Disabling Hardware Checksum Offloading

In certain environments, pfSense may experience network performance issues like packet loss, slowness, or connection timeouts. This is commonly due to hardware checksum offloading on virtualized NICs.

- **Disable Hardware Checksum Offloading**: 
    - Within the pfSense UI, navigate to **System** > **Advanced** > **Networking** and disable **Hardware Checksum Offloading**.
    - When enabled, pfSense offloads the processing of checksums to the virtual NIC. However, this feature is better suited for physical NICs, and in virtualized environments, it can cause performance degradation by generating unnecessary processing overhead on the virtual machine.
  
  ![pfSense NIC Offloading Settings](/public/pfsense-offloading.png)

## 3. Assigning Adequate Resources

- **CPU and RAM Allocation**: 
    - Depending on the size of your network and the complexity of your firewall rules, ensure you assign adequate **CPU cores** and **RAM** to your pfSense VM.
    - For small to medium environments, 2 CPU cores and 2GB of RAM is usually sufficient. For more complex configurations or higher network traffic, consider increasing these resources to ensure optimal performance.

- **Disk Space**
    - Allocate enough disk space for system logs, caching, and configuration backups. Start with at least **10GB** of disk space and increase based on the features in use, such as VPNs or IPS/IDS logging.

## 4. Snapshots and Rollbacks

- **Use VergeOS Snapshots**: 
    - Before making significant changes to your pfSense configuration or performing major upgrades, create a VergeOS snapshot of the pfSense VM. This allows for a quick rollback in case of misconfiguration or failure.

- **Automate Snapshots**: 
    - Automate your snapshots for pfSense to ensure regular backups of your firewall’s state. These snapshots can be scheduled in VergeOS and easily restored when needed.

---

Following these best practices ensures that pfSense operates efficiently and securely within VergeOS, providing a reliable and high-performance firewall solution for your virtualized network environment.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

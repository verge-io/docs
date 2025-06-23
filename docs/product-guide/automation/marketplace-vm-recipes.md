---
title: Marketplace Catalog - VM Recipes
slug: marketplace-vm-recipes
description: Explore the pre-configured virtual machine recipes available in the VergeOS Marketplace Catalog for rapid, self-service VM deployment.
author: VergeOS Documentation Team
draft: false
date: 2024-07-29T10:00:00.000Z
tags:
  - vm
  - recipe
  - marketplace
  - catalog
  - automation
  - operating system
categories:
  - Automation
  - Virtual Machines
editor: markdown
dateCreated: 2024-07-29T10:00:00.000Z
---

# VergeOS Marketplace Catalog: VM Recipes

## Overview

!!! info "Key Points"
    - The VergeOS Marketplace Catalog provides a curated collection of pre-configured VM recipes.
    - Recipes enable rapid, self-service deployment of virtual machines with optimized settings.
    - Each recipe streamlines the provisioning of common operating systems and applications.
    - Users can customize key parameters like CPU, RAM, storage, and networking during deployment.

The VergeOS Marketplace Catalog offers a powerful way to accelerate your virtual machine deployments. Instead of manually configuring each new VM, the Marketplace provides ready-to-use recipes for a variety of operating systems and applications. These recipes are optimized for the VergeOS environment, ensuring efficient resource utilization and consistent configurations.

This guide will introduce you to the VM recipes available in your Marketplace Catalog and explain the common configuration options you can expect when deploying them.

## Accessing the Marketplace Catalog

To access and deploy VM recipes from the Marketplace:

1. Log into your VergeOS system.
2. Navigate to **Machines** from the left-hand menu.
3. Click **New VM**.
4. In the "Select Type" section on the left, choose Marketplace (or a specific Marketplace catalog like "Operating Systems (Marketplace)" or "Applications (Marketplace)").

The available recipes will then appear for selection, categorized by their primary function (e.g., Operating Systems, Applications, Services).

## Common Recipe Configuration Options

When deploying a VM from a Marketplace recipe, you will typically be presented with a set of questions that allow you to customize the new virtual machine instance. These questions are designed to cover the most common configuration needs.

Here are the typical categories of settings you can expect to configure:

### 1. VM Instance Settings

These options control the core hardware and identity of your virtual machine:

* **Cores (`YB_CPU_CORES`):** The number of virtual CPU cores allocated to the VM.
* **RAM (`YB_RAM`):** The amount of virtual RAM allocated to the VM (e.g., in MB or GB).
* **Hostname (`YB_HOSTNAME`):** The network hostname for the VM.
* **Enable UEFI (`SELECT_CREATE_UEFI`):** A boolean (Yes/No) option to enable Unified Extensible Firmware Interface (UEFI) boot mode for the VM.
* **Disable Cloud-init after first boot (`YB_DISABLE_CLOUDINIT`):** For Linux VMs, this allows disabling the cloud-init service after its initial run, preventing further configuration changes on subsequent boots. Options often include `true`, `false`, or `purge`.
* **Detach Recipe Instance (`YB_DETACH_RECIPE`):** A hidden option that might control if the VM remains linked to the recipe (for future updates) or becomes a standalone VM after creation.

### 2. Networking Settings

These options define how your VM will connect to networks and obtain IP addresses:

* **Select the IP Address Type (`YB_IP_ADDR_TYPE`):** Choose between `dhcp` (Dynamic Host Configuration Protocol) for automatic IP assignment or `static` for manual configuration.
* **Network for external network (`YB_NIC_ETH0_EXTERNAL_GATEWAY`):** The external network that the VM's primary NIC (eth0) will connect to.
* **IP address for (eth0) (`YB_NIC_ETH0_IP_ADDR`):** If `static` IP is selected, this is where you input the specific IP address for the VM.
* **Subnet Mask CIDR (`YB_NIC_ETH0_CIDR`):** The subnet mask for the static IP address (e.g., `/24`).
* **Default Gateway (`YB_NIC_ETH0_GW`):** The default gateway for the VM's network.
* **Nameservers (`YB_NIC_ETH0_NS`):** A comma-separated list of DNS server IP addresses.

### 3. Storage Settings

These options control the size of the VM's primary disk:

* **OS Drive Size (`YB_DRIVE_OS_SIZE`):** The size of the virtual disk for the operating system (e.g., in GB).
* **OS Drive Tier (`SELECT_OS_TIER`):** Selects the preferred storage tier for the VM's OS drive (e.g., Tier 1 for high performance, Tier 5 for archival).

### 4. User Account Creation

Recipes often include options to create initial user accounts within the guest operating system:

* **User Name (`YB_USER`):** The username for the initial administrator or standard user account.
* **Password (`YB_PASSWORD`):** The password for the specified user.

### 5. OS-Specific Customizations

Some recipes include options tailored to the specific operating system they deploy:

* **Windows ISO (`WINDOWS_ISO`):** For Windows recipes, this allows selecting the specific ISO image for the Windows installation (e.g., `windows-2025-evaluation-os-disk.iso`).
* **Windows License Key (`WINDOWS_LICENSE_KEY`):** An optional field to input a Windows license key for activation.
* **Enable RDP (`ENABLE_RDP`):** A boolean (Yes/No) option to enable Remote Desktop Protocol for Windows VMs.
* **Access UI from Internal (`YB_ACCESS_UI_FROM_INTERNAL`):** For some Windows-based VergeOS instances, this option controls access to its UI from internal networks.
* **VirtIO DL Name (`VIRTIO_DL_NAME`):** For Windows, this references the VirtIO driver ISO to be used for injecting drivers into the guest OS.

### 6. Behind-the-Scenes Automation (`Sdatabase` Type Questions)

Many recipes include advanced automation steps that might interact with the VergeOS database or other services. These questions often appear with an `Sdatabase` type and are typically pre-configured by the recipe publisher. Examples include:

* **Create OS Drive (`CREATE_OS_DRIVE`):** Automatically creates the OS virtual disk.
* **Download Windows ISO (`YB_DOWNLOAD_WINDOWS_ISO`):** Initiates a download of the Windows ISO from a specified URL.
* **Download VirtIO (`YB_DOWNLOAD_VIRTIO`):** Initiates a download of the VirtIO driver ISO.
* **Create VirtIO CDROM (`YB_CREATE_VIRTIO_CD_DL`):** Creates a virtual CD-ROM drive and attaches the downloaded VirtIO ISO for automatic driver installation.
* **Get Cluster CPU (`GET_CLUSTER_CPU`):** Queries the cluster for available CPU information.
* **Change Cluster CPU (`CHANGE_CLUSTER_CPU`):** Modifies cluster CPU settings programmatically.
* **Edit Machine Type (`EDIT_MACHINE_TYPE`):** Adjusts the VM's machine type post-creation.

These `Sdatabase` operations highlight the power of VergeOS recipes to not only deploy VMs but also to perform complex, automated tasks during provisioning.

## Available Recipes in the Marketplace Catalog

The Marketplace Catalog is continuously updated with new recipes. Below is a list of commonly available recipes, categorized by their primary use:

### Operating Systems

These recipes provide pre-configured virtual machines with various Linux and Windows operating systems. They typically come with default settings that can be customized using the options described above.

* **AlmaLinux 8 & 9 (Latest):** Minimal installations of AlmaLinux for enterprise environments.
* **CentOS 7 (Latest):** A stable and widely used Linux distribution.
* **CentOS Stream 8:** A rolling-release Linux distribution.
* **Debian 10 (Buster), 11 (Bullseye):** Stable and popular Debian-based distributions.
* **Fedora 35, 36, 37, 38:** Cutting-edge Fedora releases for development and testing.
* **Rocky Linux 8 & 9 (Latest):** RHEL binary-compatible enterprise Linux distributions.
* **Ubuntu Server 18.04 (Bionic Beaver), 20.04 (Focal Fossa), 22.04 (Jammy Jellyfish), 24.04 (Noble Numbat):** Long-Term Support (LTS) versions of Ubuntu Server, ideal for production workloads.
* **Windows 2025 - Evaluation:** An evaluation image for the upcoming Windows Server release.
* **Windows 2022 - Evaluation:** An evaluation image for Windows Server 2022.
* **Windows 2019 Server Evaluation:** An evaluation image for Windows Server 2019.
* **Amazon Linux 2 LTS:** An Amazon-optimized Linux distribution.

### Applications

These recipes typically build on an underlying operating system and include pre-installed applications for specific use cases.

* **LAMP Stack:** A Linux, Apache, MySQL, PHP web server stack.
* **Docker:** A containerization platform pre-installed.
* **Grafana:** A popular open-source platform for monitoring and observability.
* **OpenVPN-AS:** OpenVPN Access Server for VPN solutions.
* **Kubernetes K3S:** A lightweight Kubernetes distribution.

### Services

These recipes offer specialized services or utility VMs for managing your VergeOS environment.

* **Tenant Crash Cart:** A utility VM often used for troubleshooting or recovery within a tenant environment.

## Using a Recipe

Once you select a recipe and click "Next", you will be guided through the "Questions" form, where you can input your desired configurations. After filling in all required fields, click "Submit" to initiate the VM creation process. The recipe automation will then provision your new virtual machine based on your selections.

## Benefits of Using Marketplace Recipes

* **Speed:** Deploy new VMs in minutes, not hours.
* **Consistency:** Ensure all deployments adhere to predefined best practices.
* **Simplicity:** Reduce the complexity of manual VM setup.
* **Self-Service:** Empower users to provision their own resources with controlled options.
* **Automation:** Leverage the powerful VergeOS recipe engine for advanced provisioning tasks.

---

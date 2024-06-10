# VergeOS Storage Node Installation Guide

## Introduction

This guide provides instructions on how to add a storage node to your VergeOS environment

## Prerequisites

Ensure the following before beginning the installation:
- An operational VergeOS environment with an existing cluster.
- Access to the VergeOS web UI with administrative privileges.

## Steps to Create a New Storage Cluster

### 1. Create a New Cluster in the VergeOS UI
- Navigate to the **Clusters** section in the VergeOS web UI.
- Click **New** to create a new cluster.
- Enter a name for your new cluster and adjust any other necessary settings to tailor the cluster configuration to your needs.
- **Important:** Check the **Storage** box to designate this as a storage cluster. This action configures the cluster specifically for storage operations.

## Installation of Storage Node

### 1. Boot from the VergeOS USB Installer
- Insert the VergeOS USB installer into the server designated as the new storage node.
- Reboot the server and select the USB drive as the boot device from the boot menu.

### 2. Begin Installation Process
- When prompted by the installer, choose **Storage Node**.

### 3. **Enter Admin Credentials:**
   - You will be prompted to enter the admin credentials for the VergeOS cluster. These credentials are necessary to authenticate and authorize the addition of the new node to the existing cluster.

### 3. Select Node Model
- During the installation, you will be prompted to select a node that the new storage nodes are similar to. Choose the node model that best matches the hardware configuration of the new storage node. This selection helps VergeOS make assumptions about networking and other configuration details based on the chosen model.

### 4. Network Configuration
- The installation process will proceed with network configurations, automatically detecting settings where possible. Ensure all network configurations align with those used in existing clusters to maintain consistency and connectivity.

### 5. Complete Installation
- After all settings are configured, the installer will proceed to format necessary drives, install VergeOS, and integrate the node into the newly created storage cluster.
- The node will automatically reboot once the installation is complete.

## Verify Installation

After the node reboots:
- Log into the VergeOS web UI using the cluster’s IP address.
- Navigate to the cluster configuration page to verify that the new storage node has been successfully added and is operational within the new storage cluster.

---

### 2. Select a Storage Tier
- It is crucial to select a different storage tier from what is already in use within your existing cluster. For example, if your current cluster utilizes Tier 1 storage, choose either Tier 2 or Tier 3 for the new storage cluster.
- **Note:** Selecting the same storage tier as an existing cluster can cause the UI to display only the nodes from the initial cluster and not the new cluster. Ensure you select a different tier to avoid this issue.
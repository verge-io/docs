# VergeOS Compute Only Node Installation Guide

## Introduction

Welcome to the Compute Only Node Installation Guide for VergeOS. This guide provides step-by-step instructions for installing Compute Only nodes using a USB installer. 

By deploying Compute Only nodes, you augment the computational capabilities of your hyper-converged environment without impacting existing storage infrastructures. This type of deployment can optimize operations that require high processing power, such as data analysis, machine learning workloads, or graphics rendering.

This guide will help ensure that your addition of Compute Only nodes is executed smoothly and effectively, maintaining the high standards of efficiency and reliability expected in your VergeOS environment.

---

## Prerequisites

Ensure the following before starting the installation of a Compute Only node:

* A VergeOS cluster is installed and fully operational.
* All network configurations, including VLANs and physical NIC assignments, have been set up according to the main installation guide.

!!! warning "If this will be the first node in a new **compute** cluster"
    In the VergeOS UI navigate to Clusters and Create a new cluster selecting only **Compute**

---

## Installation Steps

1. **Boot from the VergeOS USB Installer:**
   - Insert the VergeOS USB installer into the server designated as the Compute Only node.
   - Reboot the server and select the USB drive as the boot device from the boot menu.

2. **Select Node Type:**
   - When prompted by the installer, select the "Compute Only" option. This indicates that the node is being installed specifically to enhance computational resources without adding storage capacity.

3. **Enter Admin Credentials:**
   - You will be prompted to enter the admin credentials for the VergeOS cluster. These credentials are necessary to authenticate and authorize the addition of the new node to the existing cluster.

4. **Network Configuration:**
   - Allow the installer to auto-detect the network configuration, ensuring that NICs are correctly cabled and match the configuration documented during the initial setup.

5. **Cluster Selection:** (OPTIONAL)
   - If prompted, select the cluster your Compute Only node is joining.
   - Select the node this new node resembles the most.

6. **Complete Installation:**
   - The installer will configure the necessary network settings, install VergeOS, and integrate the node into your cluster without configuring local storage.
   - The node will automatically reboot upon the completion of the installation process.

7. **Verify Installation:**
   - After rebooting, log into the VergeOS web UI using the cluster’s IP address.
   - Check the Nodes page to ensure that the Compute Only node has been successfully added and is operational.

---

## Troubleshooting & Support

If issues arise during installation:
- Press `Esc` to cancel and get a command prompt.
- Type `yb-install` to resume or `yb-install --restart` to start over.



---

This guide now focuses on Compute Only nodes, emphasizing their role in boosting computational power without contributing to storage management, which is essential for certain types of deployments where high processing capabilities are prioritized.
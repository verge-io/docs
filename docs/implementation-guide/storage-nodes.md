# Storage Node Installation Guide


## Introduction

Welcome to the Storage Only Node Installation Guide for VergeOS. This guide provides step-by-step instructions for installing additional Storage Only nodes using a USB installer.

By deploying additional Storage Only nodes, you effectively enhance your hyper-converged environment's capacity to handle larger data volumes and improve data accessibility. These nodes are pivotal in expanding the overall storage capabilities of your infrastructure, focusing solely on accommodating growth in data storage needs without altering compute capacities.

This guide will help ensure that your addition of Storage Only nodes is executed smoothly and effectively, maintaining the high standards of efficiency and reliability expected in your VergeOS environment, and maximizing your storage strategy.

---

## Prerequisites

Ensure the following before starting the installation of a Scale-out node:

* The 2 node cluster from the [Installation Guide](/implementation-guide/installation-guide) is installed and fully operational.
* All network configurations, including VLANs and physical NIC assignments, have been set up according to the main installation guide.

!!! warning "If this will be the first node in a new storage cluster"
    In the VergeOS UI navigate to Clusters and Create a new cluster selecting only **Storage**

---

## Installation Steps

1. **Boot from the VergeOS USB Installer:**

   * Insert the VergeOS USB installer into the server designated as the Scale-out node.

   * Reboot the server and select the USB drive as the boot device from the boot menu.

2. **Select Node Type:**
   
   * When prompted by the installer, select the "Scale-Out" option. This indicates that the node is being installed specifically to expand the existing vSAN storage.

3. **Enter Admin Credentials:**
   
   * You will be prompted to enter the admin credentials for the VergeOS cluster. These credentials are necessary to authenticate and authorize the addition of the new node to the existing cluster.

4. **Network Configuration:**

   * Allow the installer to auto-detect the network configuration, ensuring that NICs are correctly cabled and match the configuration documented during the initial setup.

!!! note "The installer may ask for you to identify which NIC is used for the EXTERNAL switch if it cannot autodetect"

5. **Cluster Selection:**

   * If prompted, select the cluster your scale-out node is joining.

   * Select the node this new nodes resembles the most
 
6. **vSAN Configuration:**

   * Confirm that the storage tiers or custom configurations align with the initial setup to maintain uniformity across the infrastructure.
   
   * Review and finalize the disk selections and storage configurations.

7. **Complete Installation:**

   * The installer will format the necessary drives, install VergeOS, and integrate the node into your cluster.

   * The node will automatically reboot upon the completion of the installation process.

8. **Verify Installation:**
   
   * After rebooting, log into the VergeOS web UI using the cluster’s IP address.
   
   * Check the Nodes page to ensure that the Scale-out node has been successfully added and is operational.

---

## Troubleshooting & Support

If issues arise during installation:

- Press `Esc` to cancel and get a command prompt
- Type `yb-install` to resume or `yb-install --restart` to start over


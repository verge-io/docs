# VergeOS Scale-out Node Installation Guide


## Introduction

Welcome to the Scale-out Node Installation Guide for VergeOS. This guide provides step-by-step instructions for installing additional Scale-out nodes using a USB installer. Scale-out nodes are essential for expanding your VergeOS hyper-converged cluster, as they add both storage and compute capacity.

These nodes are designed to have identical hardware specifications to your controller nodes, including CPU, storage, network capabilities, and RAM, ensuring uniformity and compatibility within your infrastructure. When added, the disks from Scale-out nodes will integrate seamlessly into your existing vSAN tiers, increasing your cluster's storage capacity.

By deploying additional Scale-out nodes, you effectively enlarge your hyper-converged cluster, boosting its overall performance and resilience. This guide will ensure that your expansion is executed smoothly and effectively, maintaining the high standards of efficiency and reliability expected in your VergeOS environment.

---

## Prerequisites

Ensure the following before starting the installation of a Scale-out node:

* The 2 node cluster from the [Installation Guide](implementation-guide/installation-guide.md) is installed and fully operational.
* All network configurations, including VLANs and physical NIC assignments, have been set up according to the main installation guide.

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
   
5. **vSAN Configuration:**

   * The installer will automatically configure this node to integrate with the existing vSAN. Confirm that the storage tiers or custom configurations align with the initial setup to maintain uniformity across the infrastructure.
   
   * Review and finalize the disk selections and storage configurations.

6. **Complete Installation:**

   * The installer will format the necessary drives, install VergeOS, and integrate the node into your cluster.

   * The node will automatically reboot upon the completion of the installation process.

7. **Verify Installation:**
   
   * After rebooting, log into the VergeOS web UI using the cluster’s IP address.
   
   * Check the Nodes page to ensure that the Scale-out node has been successfully added and is operational.

---

## Troubleshooting & Support

If issues arise during installation:

- Press `Esc` to cancel and get a command prompt
- Type `yb-install` to resume or `yb-install --restart` to start over

Need more help? Email [support@verge.io](mailto:support@verge.io) or call (855) 855-8300.
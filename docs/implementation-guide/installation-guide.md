Here is a revised installation guide following the guidelines for writing Verge guides:

---

# VergeOS Installation Guide

## Introduction 

Welcome! In this guide, we'll walk through installing VergeOS to get your environment optimally configured for performance and stability. 

Before we dive in, make sure to check out the Deployment Planning Guide for important guidance on hardware selection, network setup, VLANs and more to ensure a smooth installation.

## Configure Networking

Properly configured networks are critical for a successful VergeOS installation. Here's what you'll need to do:

1. Identify the physical NICs that will connect to your external network for regular operations and optionally a core network for troubleshooting and updates. 

2. Collect the MAC addresses for each NIC port from your network switches. This info is needed to configure network settings during install.

3. In the installer, you'll be prompted to configure the external and core networks. 

> Tip: Obtaining the MAC addresses for each server port from the switches helps identify the physical cabling.

## Install First Controller Node

Now you're ready to install the first controller node:

1. Boot the server from the VergeOS installer ISO image.

2. Select "Yes" when asked if this is a new install. 

3. Choose "Yes" to automatically detect network configuration. The installer will find the correct interface for each physical core network if NICs are cabled properly.

4. Decide if you want to enable encryption and select drives to include in the vSAN, unchecking any extra drives or USB devices.

5. Optionally set custom storage tiers for drives or use the defaults. 

The installer will format drives, install VergeOS, and reboot. Once complete, the VergeOS login screen will appear and the first controller node is ready!

## Add Second Controller Node  

With the first node installed, let's add the second controller:

1. Boot the second node from the installer ISO.

2. Select "No" when asked if this is a new install to join this node to the first one. 

3. Enter the admin username and password configured during the first node's installation.

4. As before, auto-detect the network config, enable encryption if desired, and select drives for the vSAN.

5. Ensure the storage tier assignments match the first node.

After drive formatting and installation, the second node will reboot and automatically join the first one to form an HA cluster. 

## Install Additional Nodes

You can now install additional nodes as needed:

- **Scale-out**: Member nodes that expand the vSAN storage 
- **Compute**: Compute-only nodes without vSAN (boot device only)
- **PXE**: Compute nodes that network boot (no local boot device)

> Note: The PXE option uses a network boot image of VergeOS, not the PXE installer

Follow the same process as the second controller node, selecting the appropriate node type when prompted.

## Verify and Next Steps

Once installation is complete:

1. Open the VergeOS web UI via the system's IP address 
2. Verify the new nodes were added successfully without errors
3. Start deploying VMs and containers!

> Note: "Root key" errors in the logs during node installation are normal and can be ignored

## Troubleshooting & Support

If issues arise during installation:

- Press `Esc` to cancel and get a command prompt
- Type `yb-install` to resume or `yb-install --restart` to start over

Need more help? Email support@verge.io or call (855) 855-8300.

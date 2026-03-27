# Replacing a Node Using the ISO Installer

## Overview

!!! info "Key Points"
    - This procedure replaces a node chassis while **reusing the original node drives** in the new hardware
    - Can be used for failed node replacement or proactive decommission of end-of-life hardware
    - Requires the VergeOS ISO installer matching the installed system version
    - Only one node should be replaced at a time

This guide covers replacing a physical VergeOS node by moving drives from the original server to replacement hardware and using the VergeOS ISO installer's **Replace Node** option to re-register the new chassis with the existing cluster.

!!! warning "Drives Must Be Moved from the Original Node"
    This procedure only applies when the original drives are transferred to the replacement node. If you need to replace a node **and** its drives, contact [VergeOS Support](/support) for assistance.

## Prerequisites

- An existing, healthy VergeOS cluster
    - with the exception of a failed node that this procedure is intended to replace
- Replacement server with all drives installed (transferred from the original node)
    - Replacement hardware must be compatible with the existing cluster nodes; exact duplicate hardware is preferred
- Bootable media containing VergeOS ISO installer - must match the version currently installed on the system
- Administrator-level credentials for the VergeOS system

## Before You Begin

- **Replace only one node at a time.** Verify no other nodes are currently in maintenance mode before starting.
- **Confirm system health.** Ensure the cluster is in a healthy state (all vSAN tiers green, no active alarms) before proceeding.
- **Plan for workload migration.** If adequate compute resources exist on the remaining nodes, the replacement can be performed with no downtime. Workloads can be migrated to other nodes during the procedure.
- **Ensure system snapshot retention is sufficient for potential rollback.** Take a system snapshot immediately prior to the replacement procedure or verify a recent system snapshot will be available if needed.

## Replacement Procedure

### Step 1: Take the Original Node Offline

The approach depends on whether the original node is still functional.

**If the node is still functional:**

1. In the VergeOS UI, navigate to **Infrastructure** > **Nodes**.
2. Double-click the node to open its dashboard.
3. Click **Enable Maintenance** on the left menu and confirm.
4. Wait for all running workloads to migrate off the node. Monitor the **Running Machines** section until it is empty. Shut down any workloads that cannot migrate.
5. Once the node is in maintenance mode with no running workloads, power it down.
6. Disconnect all network cables from the original node.

**If the node is no longer functional (not detected in the system):**

1. Power off the node if it is not already off.
2. Disconnect all network cables from the original node.

### Step 2: Prepare the Replacement Node

1. Record the MAC address of each NIC on the replacement server, noting which physical port corresponds to which network role (e.g., core1, core2, external). You will need this information during the installer's NIC confirmation step.
2. With the replacement node **powered off**, connect all network cables. The new node must be connected to the same networks as the original node.

### Step 3: Boot from the VergeOS ISO

1. Ensure the install media (e.g., USB drive containing the VergeOS ISO) is connected to the replacement node.
2. Power on the node and boot from the ISO.
3. When the installer menu appears, select **Replace Node**.
4. The node to replace is detected. Confirm the correct node is selected and press **Enter**.

### Step 4: Confirm Network Connections

The installer scans the network and lists all detected NICs. Review each entry and verify that the MAC address shown matches the correct network role (core1, core2, external, etc.).

!!! tip "NIC Mismatch"
    If NIC assignments do not appear to be connected to the correct networks, exit the installer and recheck your cabling and switch configurations. After correcting any connections, reboot to the installation media, and restart the installer.

### Step 5: Complete the Installation

1. A dialog will ask whether you are replacing the node's drives. Select **No** to indicate that the original drives have been moved into this new chassis.
!!! info "When replacing a node along with its drives contact Verge.io Support."


2. Wait for the installation to fully complete.
The installer completes the node replacement and registers the new chassis with the existing cluster. A message will indicate when the installation has completed and the node will automatically reboot. This process may take several minutes or more.


## Post-Replacement Steps

### Verification

1. **Confirm node status:**
Navigate to **Infrastructure** > **Nodes** and verify that all nodes, including the replacement, appear online with a healthy (green) status.

!!! tip "Disable Maintenance Mode"
    If the replaced node displays ***Maintenance Mode*** status, select the node and click **Disable Maintenance** on the left menu.

2. **Check for alarms:**
Navigate to **System** > **Alarms** and confirm no new alarms have been triggered.

3. **Verify network connections:**
Open the replacement node's dashboard (**Infrastructure** > **Nodes** > double-click the node).  Scroll to the **NICs** section. **Confirm:**
    - Core and external network connections show a Status of ***UP***
    - Core network connections display a Fabric Status of ***Confirmed***

### Start Workloads on Replaced Node

After the replacement has been fully verified, workloads can be migrated back to or restarted on the replacement node as needed.


## Troubleshooting

### No Suitable Node Found

#### Behavior:
- Error during installation indicating no suitable node was found for replacement

#### Solution:
- The original node must be powered off/disconnected. A node simply put into maintenance mode cannot be replaced.
- Verify the original node does not display as "Running" or "Maintenance Mode" in the VergeOS UI and boot the new node with the VergeOS install ISO again.

### Replacement install does not finish as expected

#### Behavior:
- The process stops after displaying "Stopping the appserver" and does not complete
- The installation drops to the command line reporting: "vergeos install cancelled"
- System log entries:
    ```
    ybsan: Error writing root key to node 'node2': (5) input/output error
    ```

#### Resolution:

- These conditions may indicate:
    - **Insufficient privileges:** Verify you are using credentials with administrator-level permissions
    - **Networking Misconfigurations:** Confirm the replacement node has correct connections to core networks and external network(s).

- After making necessary adjustments, you can restart the installation without a reboot:
    `yb-install --restart`



## Additional Resources

- [Maintenance Mode](/product-guide/operations/maintenance-mode/)
- [Nodes Overview](/product-guide/system/nodes-overview/)
- [Creating Bootable Installation Media](/implementation-guide/install-media/)

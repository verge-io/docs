
# Create a Bonded Network with Tagged VLAN

## Overview

This page provides general instructions for creating an active-backup bond for a vlanned external or maintenance network. Instructions more specific to bare-metal installations with a limitation of 2 NICs per node can be found in the KB article: [Change External Network to Bonded with tagged VLAN](/knowledge-base/change-external-vlan-to-bonded)

## Prerequisites

!!! warning annotate "Prior to making networking changes:"
    - **Ensure you have an alternative method to reach the nodes: physical console access or IPMI access.**
    - **Confirm the name/password for the "admin" user (user ID #1 (1)), in case command-line operations become needed.**

1. Hint: "Key=1" parameter is in the URL of the user's dashboard

## Change the Network to a Bonded Vlan

1. Navigate to the intended **external/maintenance network dashboard** (Main Dashboard > Networks > Externals > double-click intended network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (VLAN number).
3. **Select** the checkbox option for **all appropriate physical networks**.
4. Click **Submit** to save the change.
  
## Testing

1. Verify network still has connectivity.  The network diagnostics tool (left menu of the network's dashboard) provides convenient queries for testing.
2. Test Bond failover: Navigate to the modified network dashboard and select **NICs** to view the network adapters. Physically disconnect one of the associated network cables. The UI should now indicate the NIC is in a "Down" status; verify continued connectivity of the network.

!!! warning "Before disconnecting a network cable, verify it is: not a core network OR proper core network redundancy is in place."


# Create a Bonded Vlanned Network

## Overview

This page provides general instructions for create a bond across a common VLAN tag used for an external or maintenance network. Instructions more specific to bare-metal installations with a limitation of 2 NICs per node can be found in the KB article: [Change External Network to Bonded with tagged VLAN](/knowledge-base/change-external-vlan-to-bonded)

## Prerequisites

!!! warning annotate

Prior to making system changes
    - **Ensure you have an alternative method to reach the nodes: physical console access or IPMI access.**
    - **Confirm the name/password for the "admin" user (user ID #1 (1)), in case command-line operations become needed.**

1. Hint: "Key=1" parameter is in the URL of the user's dashboard

## Change the Network to a Bonded Vlan

1. Navigate to the **external or maintenance network dashboard** (Main Dashboard > Networks > Externals > double-click intended network) and click **Edit** on the left menu.  
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (VLAN number).
3. **Select** the checkbox option for **all appropriate physical networks**.
4. Click **Submit** to save the change.
  
## Testing

1. Verify network still has connectivity.  The network diagnostics tool (left menu of the modified network's dashboard) provides convenient queries for testing.
2. Test Bond failover: Navigate to the modified network dashboard and select **NICs** to view the network adapters. Physically disconnect one of the associated network cables. The UI should now indicate the NIC is in a "Down" status; verify continued connectivity of the network.  
!!! warning "Before disconnecting a network cable: verify it is not one that is used for a core network or that proper core network redundancy is in place.

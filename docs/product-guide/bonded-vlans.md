
# Bonded VLAN-tagged Networks

## Overview

This page provides general instructions for creating an active-backup bond on a vlanned external or maintenance network. Instructions more specific to bare-metal installations (with a limitation of 2 NICs per node) can be found in the KB article: [Change External Network to Bonded with tagged VLAN](/knowledge-base/change-external-vlan-to-bonded)

## Prerequisites

Verify associated network switch ports are configured for the VLAN tag.

!!! warning annotate "Prior to making networking changes:"
    - **Ensure you have an alternative method to reach the nodes: physical console access or IPMI access.**
    - **Confirm the name/password for the "admin" user (user ID #1(1)), in case command-line operations become needed.**

1. Hint: "Key=1" parameter is in the URL of the user's dashboard

## Create a Bonded VLAN-tagged Network  

1. Create/edit the network.
2. Change **Layer 2 Type** to ***vLAN*** and enter appropriate **Layer 2 ID** (VLAN number).
3. **Select** the checkbox option for **all appropriate physical networks**.
See KB article: [How to Create an External Network](/knowledge-base/create-external-network) for information on additional external network options.
4. Click **Submit** to save the change.
  
## Testing

1. Verify the network has connectivity.  The [Network Diagnostics Tool](/product-guide/netdiagnostics) provides convenient queries for testing a network.
2. Test Bond failover: navigate to the modified network dashboard and select **NICs** to view the network adapters. Physically disconnect one of the associated network cables. The UI should now indicate the NIC is in a "Down" status; verify continued connectivity of the network.

!!! warning "Before disconnecting a network cable, verify it is not a core network OR that proper core network redundancy is in place."

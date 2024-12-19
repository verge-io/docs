# Bonded VLAN-tagged Networks

## Overview

This guide provides instructions for creating an active-backup bond on an External or Maintenance Network. For specific instructions related to bare-metal installations with 2 NICs per node, see the KB article: [Change External Network to Bonded with tagged VLAN](/knowledge-base/change-external-vlan-to-bonded).

## Prerequisites

!!! warning "Before Making Network Changes"
    - Verify associated network switch ports are configured for the VLAN tag
    - Ensure you have an alternative method to reach the nodes: physical console access or IPMI access
    - Confirm the name/password for the "admin" user (user ID #1)
    Note: The user ID can be found in the URL of the user's dashboard (Key=1 parameter)

## Configuration Steps

### Basic Network Settings

1. Create or edit the network
2. Configure Layer 2 settings:
   - Set Layer 2 Type to vLAN
   - Enter the VLAN ID number in Layer 2 ID field

### Bonding Configuration

1. Enable Bonding by selecting the checkbox
2. Under Bond Interfaces:
    - Select specific core fabric switches (core-fabric-1 Switch, core-fabric-2 Switch) OR
    - Use "All" to select all available interfaces

!!! note
    - Selecting specific interfaces provides more control over which NICs are bonded
    - The bonded configuration provides network redundancy through active-backup mode, where one NIC remains active while others stand ready as backup

### Additional Network Settings

See KB article: [How to Create an External Network](/knowledge-base/create-external-network) for information on configuring other external network options.

## Testing and Verification

### Basic Connectivity Test

1. Verify the network has connectivity using the [Network Diagnostics Tool](/product-guide/networks/net-diagnostics)
2. Common diagnostic tests include:
    - Ping test to verify basic connectivity
    - DNS lookup to verify name resolution
    - TCP connection test to verify specific port connectivity

### Bond Failover Testing

1. Navigate to the modified network dashboard
2. Select NICs to view the network adapters
3. Test failover:
    - Physically disconnect one of the associated network cables
    - UI should indicate the disconnected NIC is in "Down" status
    - Verify network maintains connectivity through the backup NIC

!!! warning "Important"
    Before disconnecting any network cable, verify:

    - It is not a core network cable OR
    - Proper core network redundancy is in place

## Troubleshooting

If you encounter issues:

1. Verify switch configuration matches VLAN settings
2. Check physical cable connections
3. Confirm bond interface selections are correct
4. Review network logs for error messages
5. Test connectivity from multiple points in the network

## Related Articles

- [How to Create an External Network](/knowledge-base/create-external-network)
- [Change External Network to Bonded with tagged VLAN](/knowledge-base/change-external-vlan-to-bonded)
- [Network Diagnostics Tool](/product-guide/networks/net-diagnostics)
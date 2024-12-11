# Configuring VLANs

## Prerequisites

!!! info "Host Level Configuration"
    Before configuring VLANs, ensure that switchports are configured appropriately so that physical VergeOS nodes have access to the desired VLAN(s).

!!! info "Tenant Configuration"
    For VLAN configuration within a tenant, [Virtual Wires](/product-guide/virtualwires) must first be configured to provide external layer2 access to the tenant.

## Configuration Steps

### Creating a VLAN Network

1. Navigate to Networks:
   - From the **Main Dashboard**, click **Networks** (quick-link or left menu)
   - Click **New External** on the left menu

2. Configure Basic Settings:
   - Enter a descriptive **Name** for the network
     - Use naming that indicates VLAN purpose and/or ID
   - Select ***vLan*** in the **Layer 2 Type** dropdown
   - Enter the appropriate **Layer 2 ID**

3. Set Network Interface:
   - Select the appropriate physical network from **Interface Network** list

    !!! note "Network Selection"
        **For Host Networks:**
        - Must select a physical network where the VLAN enters the VergeOS environment
        - Physical networks typically created during install with "Switch" appended to name
        - Example: "External1 Switch"

        **For Tenants:**
        - Select "Physical"

4. Configure Additional Settings:
   - Set **IP Address Type** to ***None***
   - Leave other fields at default settings unless specific configuration needed

5. Complete Configuration:
   - Click **Submit** to create the VLAN network
   - Verify network dashboard appears with **Status: Running**

## Using the VLAN Network

!!! success "VM Configuration"
    The newly created VLAN network can be selected on VM NICs to attach workloads to the associated VLAN(s).

## Best Practices

- Use descriptive names that help identify VLAN purpose
- Document VLAN IDs and their intended use
- Verify physical switch configuration matches VergeOS VLAN settings
- Test connectivity after configuration

## Troubleshooting

If the VLAN network does not show as running:
1. Verify physical switch configuration
2. Check VLAN ID matches physical network configuration
3. Confirm Interface Network selection is correct
4. Review network logs for any error messages
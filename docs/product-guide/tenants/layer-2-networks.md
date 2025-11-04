---
requirements:
  vergeos_version: "v25.2 or later"
  access_levels: ["Cluster Admin"]
  background_knowledge: ["Networking fundamentals", "VLAN concepts", "Tenant management"]

key_concepts:
  - "Tenant Layer 2 Networks"
  - "VLAN pass-through"
  - "Physical network mapping"
  - "Tenant network isolation"

semantic_keywords:
  - "VergeOS tenant Layer 2 networks"
  - "tenant Layer 2 network configuration steps"
  - "how to configure tenant Layer2 networks in VergeOS"
  - "pass VLAN to tenant VergeOS"
  - "tenant physical network access"
  - "troubleshoot tenant Layer 2 connectivity VergeOS"

use_cases:
  - "Providing direct VLAN access to tenant environments"
  - "Enabling tenant-managed network infrastructure"
  - "Isolating tenant traffic at Layer 2"
  - "Multi-tenant network segmentation"
---

# Configure Tenant Layer 2 Networks

## Overview

Tenant Layer 2 Networks provide a streamlined method for passing VLANs directly to tenant environments in VergeOS. This feature creates direct Layer 2 connectivity between the host network infrastructure and tenant workloads, enabling tenants to access specific VLANs without complex Virtual Switch Port configurations.

When you configure a Tenant Layer 2 Network, VergeOS automatically creates corresponding External and Physical networks within the tenant environment, providing transparent VLAN access to tenant virtual machines.

**Target Audience:** System administrators and network engineers managing multi-tenant VergeOS environments who need to provide isolated Layer 2 network access to tenants.

## What You'll Learn

In this guide, you'll learn how to:

- Navigate to Tenant Layer 2 Networks configuration
- Create Layer 2 network pass-through for tenants
- Verify automatic network creation within tenants
- Attach tenant VMs to passed-through VLANs
- Troubleshoot common Layer 2 connectivity issues

**Common Questions This Guide Answers:**

- How do I pass a VLAN directly to a tenant in VergeOS?
- What's the difference between Tenant Layer 2 Networks and Virtual Switch Ports?
- How do I give tenant VMs direct access to physical network VLANs?
- What networks are automatically created when I configure a Tenant Layer 2 Network?
- How can I verify that my tenant has Layer 2 network access?
- Why would I use Tenant Layer 2 Networks instead of routed tenant connectivity?
- Can tenant administrators manage the passed-through VLANs themselves?

## Requirements

Before configuring Tenant Layer 2 Networks, ensure you have:

- VergeOS cluster running version 26.0 or later
- Cluster Admin access level
- An existing tenant environment
- Physical switch ports configured with appropriate VLAN access
- Understanding of the VLAN IDs that need to be passed to the tenant

## Time Estimate

**Estimated completion time:** 10-15 minutes per VLAN configuration

This includes creating the Tenant Layer 2 Network, verification within the tenant, and basic connectivity testing.

## Quick Reference

| Action | Location | Purpose |
|--------|----------|---------|
| Navigate to Tenant Layer 2 Networks | `Tenants → [Tenant Name] → Networks (left nav) → Layer2 Networks` | Access tenant network configuration |
| Create new Layer 2 network | Click `New` | Initiate VLAN pass-through |
| Select network | Network dropdown | Choose which VLAN to pass through |
| Enable network | Toggle `Enabled` | Activate Layer 2 pass-through |
| Verify in tenant | Tenant UI → `Networks` | Confirm automatic network creation |
| Attach VM | Tenant VM → `NICs` → Select External or Physical network | Connect workload to VLAN |

## Understanding Tenant Layer 2 Networks

Before diving into configuration, it's essential to understand what Tenant Layer 2 Networks are and how they differ from other tenant networking approaches in VergeOS.

### What Are Tenant Layer 2 Networks?

Tenant Layer 2 Networks provide direct VLAN connectivity from the host infrastructure to tenant environments. When configured, each physical tenant node receives a virtual NIC connected to the specified VLAN, enabling transparent Layer 2 access for tenant workloads.

### Automatic Network Creation

When you create a Tenant Layer 2 Network, VergeOS automatically provisions two networks within the tenant:

1. **External Network** - Appears in the tenant's network list with the name of the network you're passing through
2. **Physical Network** - Backend network infrastructure. Appears in the tenant's network list with the name of the network you're passing through, prepended by "**Physical -**"

Tenant virtual machines can attach NICs to these networks to gain direct access to the passed-through VLAN.

### Use Cases

Tenant Layer 2 Networks are ideal for scenarios requiring:

- **Direct VLAN Access:** Tenants need unfiltered access to specific VLANs
- **Tenant-Managed Networking:** Tenant administrators want full control over their network configuration
- **Legacy Application Support:** Applications requiring Layer 2 adjacency to physical infrastructure
- **Simplified Network Architecture:** Avoiding complex routing and firewall configurations for certain workloads

### Comparison with Virtual Switch Ports

| Feature | Tenant Layer 2 Networks | Virtual Switch Ports |
|---------|-------------------------|---------------|
| Configuration Complexity | Simple - single UI action | More complex - multiple steps |
| Supported VergeOS Version | v25.2 or later | All versions |
| Automatic Network Creation | Yes | No - manual configuration required |
| VLAN Trunking Support | Single VLAN per configuration | Can trunk multiple VLANs |
| Typical Use Case | Single VLAN pass-through | Complex multi-VLAN scenarios |

## Configuration Steps

This section walks you through creating a Tenant Layer 2 Network to pass a VLAN to a tenant environment. The process involves selecting the tenant, choosing the network, and enabling the pass-through.

### Step 1: Navigate to Tenant Networks

First, access the tenant's network configuration area where you'll create the Layer 2 network pass-through.

1. From the top menu, navigate to **Tenants** > **List**
2. Locate your target tenant in the tenant list
3. Click on the **tenant name** to open the tenant dashboard
4. In the left navigation menu, click **Networks**

You should now see the Tenant Networks view, which displays any existing Layer 2 networks configured for this tenant.

### Step 2: Create New Tenant Layer 2 Network

Next, initiate the creation of a new Layer 2 network pass-through for your tenant.

1. Click **New** in the left sidebar
2. The Tenant Layer2 Network configuration form appears

### Step 3: Configure Network Settings

Now configure which network (VLAN) you want to pass through to the tenant and enable the connection.

!!! warning
    VLANs 1, 100, 101, and 102 cannot be used in a Virtual Switch Port capacity. These VLANs are reserved for internal traffic.

1. In the **Network** dropdown field, select the VLAN you want to pass through to the tenant

   - Available options include External networks and VLANs configured on your host
   - The dropdown displays all Layer 2 networks available for pass-through

2. Toggle the **Enabled** switch to the ON position (blue)

   - This activates the Layer 2 pass-through
   - When disabled, the configuration remains but the VLAN is not accessible to the tenant

3. Click **Submit** to save the configuration

The system will process the request and create the necessary network infrastructure within the tenant.

### Step 4: Verify Automatic Network Creation

After submitting the configuration, VergeOS automatically creates the required networks within the tenant environment. Let's verify these were created successfully.

1. Wait 10-15 seconds for the configuration to propagate
2. Log into the **tenant UI** using tenant admin credentials
3. From the tenant's Main Dashboard, navigate to **Networks**
4. Verify the following networks appear in the tenant's network list:
   - **External Network** - Named after the selected VLAN (e.g., "External")
   - **Physical Network** - Backend infrastructure network (typically named "Physical")

Both networks should show **Status: Running** and appear in the tenant's network dashboard.

!!! success "Verification Checkpoint"
    At this point, you should see both the External and Physical networks running in the tenant's network dashboard. These networks represent the Layer 2 connectivity to the host VLAN.

## Using Tenant Layer 2 Networks

With the Tenant Layer 2 Network configured and verified, tenant administrators can now attach virtual machine workloads to the passed-through VLAN. This section explains how tenants use these networks.

### Attaching VMs to Layer 2 Networks

Tenant administrators attach VMs to the passed-through VLAN by selecting the appropriate network during NIC configuration:

1. **Within the tenant UI**, navigate to the VM you want to connect
2. Access the VM's **NICs** section
3. When creating or editing a NIC, select either:
   - **External Network** - For direct VLAN attachment
   - **Physical Network** - For backend connectivity

4. Save the NIC configuration
5. Power on or restart the VM for changes to take effect

### Network Placement Best Practices

When designing tenant network architecture with Layer 2 Networks:

- **VM Networks:** Place tenant-managed internal VM networks in the **External** network
- **Direct Workloads:** Attach VMs requiring direct VLAN access to the **External** or **Physical** network
- **Isolation:** Consider which VMs truly need Layer 2 access vs. those that can use internal tenant networks

### Tenant Management Considerations

Once configured, tenant administrators have full control over:

- Which VMs connect to the Layer 2 networks
- Network addressing and DHCP configuration (if IP management is required)
- Firewall rules governing traffic on these networks
- Internal routing between Layer 2 networks and other tenant networks

## Verification and Testing

After configuring Tenant Layer 2 Networks, verify connectivity and proper operation with these systematic checks. These tests confirm that Layer 2 pass-through is functioning correctly and that tenant workloads can communicate as expected.

### Host-Level Verification

From the host perspective, confirm the Tenant Layer 2 Network configuration:

1. Navigate to **Tenants → [Tenant Name] → Networks**
2. Verify the Layer 2 network appears in the list
3. Confirm **Enabled** toggle is ON (blue)
4. Check that no error messages appear in the log

### Tenant-Level Verification

Within the tenant environment, perform these checks:

1. **Network Presence:**

   - Log into tenant UI
   - Navigate to **Networks**
   - Verify External and Physical networks exist
   - Confirm both show **Status: Running**

2. **VM NIC Configuration:**

   - Open a test VM's configuration
   - Navigate to **NICs**
   - Verify the External or Physical network appears as a selectable option
   - Confirm VMs attached to these networks can power on successfully

3. **Connectivity Testing:**

   - Deploy a test VM connected to the Layer 2 network
   - Assign appropriate IP addressing for the VLAN
   - Test connectivity to other devices on the same VLAN
   - Verify expected network behavior (DHCP, routing, etc.)

### Physical Infrastructure Verification

Confirm the underlying physical network configuration:

1. Verify physical switch ports are configured correctly:
   - Ports connected to tenant nodes have VLAN access
   - VLAN tagging matches VergeOS configuration
   - Switch port mode is appropriate (access or trunk)

2. Test connectivity from physical devices on the same VLAN to tenant VMs

## Best Practices

Follow these recommendations for optimal Tenant Layer 2 Network implementation and management:

### Planning and Design

- **Document VLAN Assignments:** Maintain clear documentation of which VLANs are passed to which tenants
- **VLAN Reservation:** Reserve VLANs 1 and 100-102 for VergeOS internal use (these cannot be used for pass-through)
- **Security Segmentation:** Only pass necessary VLANs to tenants based on least-privilege principles
- **Naming Conventions:** Use descriptive names for Layer 2 networks that indicate purpose and VLAN ID

### Implementation

- **Test Before Production:** Create test VMs in tenant to verify connectivity before migrating production workloads
- **Staged Rollout:** Configure Layer 2 networks for one tenant at a time, verifying each before proceeding
- **Physical Infrastructure First:** Ensure physical switch configuration is complete before creating Tenant Layer 2 Networks
- **Tenant Communication:** Inform tenant administrators before configuring Layer 2 pass-through

### Security Considerations

- **VLAN Isolation:** Ensure physical switch properly isolates tenant VLANs
- **Firewall Rules:** Consider whether tenant-managed firewall rules are appropriate for your security model
- **Access Control:** Limit which administrators can create and modify Tenant Layer 2 Networks
- **Audit Trail:** Regularly review logs for any unauthorized network configuration changes

## Next Steps

After successfully configuring Tenant Layer 2 Networks, consider these related topics:

- **Advanced Tenant Networking:** Explore routing between tenant Layer 2 and internal networks
- **Virtual Switch Ports:** Learn when to use Virtual Switch Ports for more complex multi-VLAN scenarios
- **Tenant Network Rules:** Understand how to configure firewall rules within tenant environments
- **Network Monitoring:** Set up monitoring and alerting for tenant network health

### Related Documentation

- [Provide Layer 2 Access to a Tenant (Virtual Switch Ports)](/knowledge-base/provide-layer2-to-tenant) - Alternative method for multi-VLAN scenarios
- [Configuring VLANs](/product-guide/networks/create-vlan) - Creating VLAN networks at the host level
- [Network Concepts](/product-guide/networks/network-concepts) - Understanding VergeOS networking fundamentals
- [Tenant Overview](/product-guide/tenants/overview) - Comprehensive tenant networking guide
- [Network Troubleshooting](/product-guide/networks/net-troubleshooting) - Advanced network diagnostic procedures


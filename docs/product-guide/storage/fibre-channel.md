---
title: "Using Fibre Channel Storage with vSAN"
description: "Requirements, configuration, and maintenance procedures for integrating Fibre Channel LUNs into VergeOS vSAN storage tiers, including multipath management, monitoring, and troubleshooting."
semantic_keywords:
  - "Fibre Channel vSAN integration, FC LUN storage tier, SAN with VergeOS"
  - "FC HBA configuration, WWPN zoning, multipath failover, SAN setup"
  - "vSAN Fibre Channel requirements, FC LUN per node, external SAN tier"
  - "FC storage monitoring, path health, LUN detection, drive verification"
use_cases:
  - storage_management
  - tier_configuration
  - configuration
  - capacity_planning
  - monitoring
tags:
  - fibre-channel
  - vsan
  - storage
  - san
  - lun
  - hba
  - multipath
  - storage-tiers
categories:
  - Storage
---

# Using Fibre Channel Storage with vSAN

## Overview

VergeOS vSAN supports the use of Fibre Channel (FC) LUNs as storage devices within its tiered architecture. This enables integration with your existing SAN infrastructure while benefiting from vSAN's native redundancy, deduplication, and compression.

!!! note "Physical Disks vs. Fibre Channel LUNs"
    While VergeOS vSAN supports Fibre Channel LUNs, **Verge.io recommends using physical disks directly attached to nodes** for optimal performance and simplicity. Physical disks provide:

    - **Simpler configuration** -- No FC zoning, HBA management, or SAN coordination required
    - **Better performance** -- Direct access without SAN overhead and network bottlenecks
    - **Lower complexity** -- Fewer failure points and easier troubleshooting
    - **Cost efficiency** -- No need for FC infrastructure, HBAs, or SAN licensing

    Consider FC LUNs primarily when you have existing SAN investments or specific compliance requirements.

## Implementation Requirements

### Hardware

- Physical disks in VergeOS Systems vSAN [**Tier 0**](/product-guide/storage/storage-tiers/#tier-0-metadata-tier) (FC LUNs cannot serve as Tier 0)
- FC Host Bus Adapters (HBAs) in at least two cluster nodes
- Compatible FC switches (8/16/32 Gb)
- Redundant FC fabric highly recommended
- FC storage array with available LUNs

!!! warning "Unique LUNs Per Node"
    VergeOS vSAN treats Fibre Channel LUNs the same as locally-attached physical disks. Each node must be presented with **its own unique LUN(s)**. Do **NOT** present the same LUNs to multiple nodes. This is fundamentally different from traditional shared-storage clustering (VMware, Hyper-V) where multiple hosts access the same LUN.

### Fabric Configuration

- WWPN-based zoning configured on the FC switch
- Each node zoned to its own dedicated LUNs
- Redundant physical paths per node for failover

!!! tip "One LUN Per Physical Disk"
    For maximum efficiency and to avoid duplicate redundancy, we recommend **mapping each FC LUN to a dedicated physical disk** on the SAN.

!!! tip "SAN Deduplication: Check Your SAN's Capabilities"
    VergeOS vSAN handles data deduplication natively at the block level.

    - **SAN with per-LUN dedup only:** Disable deduplication. VergeOS distributes data across LUNs, so per-LUN dedup provides no benefit.
    - **SAN with global/cross-LUN dedup:** Leave enabled to reduce overall storage consumption.

!!! warning "Disable RAID and Automatic Tiering"
    VergeOS vSAN handles data redundancy natively. **Disable RAID and automatic tiering features** on the SAN for LUNs used by VergeOS. VergeOS stores two copies of data across different nodes, so SAN-level RAID adds overhead without benefit.

## Path Management

### Multipath Configuration

By default, VergeOS manages multiple paths to each LUN in an active/passive configuration:

- **Primary Path** -- Used for all I/O during normal operation
- **Secondary Paths** -- Automatically activated on primary path failure
- **Failover Timeout** -- 7-second delay before switching to the alternate path
- **Path Recovery** -- After failover, the alternate path remains active until manually overridden. The system does not automatically fail back to the original path.

!!! info "Multiple Disk Entries Are Normal"
    VergeOS automatically selects the best path for each LUN based on internal algorithms. It is normal to see multiple disks with identical serial numbers in the VergeOS UI--each entry represents a different path to the same physical LUN. This does **not** indicate a problem.

## Configuration Steps

!!! warning "Use Maintenance Mode"
    Always enter [**Maintenance Mode**](/product-guide/operations/maintenance-mode) before modifying storage configurations to prevent disruption to running workloads.

!!! warning "Use the Scale Up Procedure"
    Add all Fibre Channel LUNs using the [**Scaling Up a vSAN**](/knowledge-base/scaling-up-a-vsan) procedure. This ensures proper tier assignment and triggers the necessary data redistribution. Do not add drives through other methods.

### Step 1: Prepare the FC Environment

1. Configure WWPN-based zoning on the FC switch so each VergeOS node can see only its own dedicated LUNs
2. Present unique LUNs from the storage array to each node
3. Verify that each node has redundant physical paths to the FC fabric
4. Disable RAID and automatic tiering on the SAN for all LUNs that VergeOS will use

### Step 2: Verify LUN Detection

After physical installation and zoning are complete, confirm that VergeOS sees the new LUNs:

1. In the VergeOS UI, navigate to the node where LUNs were presented
2. Select **Refresh** from the left menu and choose **Drives & NICs** from the dropdown
3. Confirm by selecting **Yes**
4. Navigate to the node's drive list -- the FC LUNs should appear as new drives in an **offline** state
5. Verify that the drive count matches the number of LUNs you presented to that node

If drives do not appear, check the FC switch zoning, HBA connections, and SAN LUN masking configuration.

### Step 3: Add LUNs to a vSAN Tier

Follow the [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan) procedure:

1. Select the node you are scaling up
2. Select **Scale Up** from the left menu
3. The newly detected FC LUNs appear in an offline state -- select the LUN(s) you want to add
4. Under **Node Drives**, select the **Scale Up** function
5. Choose the appropriate tier (Tier 1 or above) and submit

After completion, the vSAN tier indicator turns **yellow** while data redistribution occurs. This is expected. The tier returns to **green/healthy** once the redistribution walk completes.

Repeat for each node.

### Step 4: Verify the Configuration

1. Navigate to the **vSAN** dashboard and confirm the tier shows the expected additional capacity
2. Verify that each node's drive list shows the FC LUNs in an **online** state within the correct tier
3. Confirm the tier health returns to green after the redistribution walk completes

## Monitoring and Maintenance

### What to Monitor

| Metric | Where to Check | What to Look For |
|--------|---------------|------------------|
| Path health | Node drive list in the VergeOS UI | Drives showing offline or degraded status |
| Tier status | vSAN dashboard | Yellow (repair in progress) or red (degraded) indicators |
| Drive errors | Node drive properties | Read/write error counts incrementing over time |
| Drive latency | Node drive properties | Unusually high I/O latency compared to baseline |
| Repair status | vSAN dashboard | Active repairs and estimated completion time |

### Checking Path Health

1. Navigate to the node in the VergeOS UI
2. Open the node's drive list
3. FC LUNs appear alongside local disks -- verify each shows an **online** status
4. If a drive shows **offline**, check the physical FC connection, switch zoning, and SAN health before taking further action

### Maintenance Procedures

- **HBA firmware updates:** Schedule during a maintenance window. Put the node into [Maintenance Mode](/product-guide/operations/maintenance-mode) before updating HBA firmware to allow workloads to migrate to other nodes.
- **FC switch maintenance:** If a single fabric path goes down for maintenance, the vSAN continues on the secondary path. Monitor the node's drive list to confirm drives remain online during the maintenance window.
- **SAN firmware updates:** Coordinate with your SAN vendor's procedures. If LUNs go temporarily offline, the vSAN treats it as a drive failure and begins operating from redundant copies on other nodes. When LUNs return, a repair walk re-synchronizes data.

## Removing FC LUNs from the vSAN

To decommission FC LUNs from a vSAN tier, follow the standard drive removal process:

1. Enter [Maintenance Mode](/product-guide/operations/maintenance-mode) on the affected node
2. Contact Verge.io support to initiate a controlled drive removal -- this triggers a data evacuation that migrates all data from the target LUN(s) to remaining drives in the tier
3. Wait for the evacuation and repair walk to complete (the tier returns to green/healthy)
4. Once the drives are fully evacuated, they can be safely removed from the SAN zoning and LUN masking configuration

!!! warning "Do Not Remove LUNs Without Evacuation"
    Removing a LUN from the SAN or changing zoning without first evacuating data through the vSAN will result in the vSAN treating it as a drive failure. While no data is lost (redundant copies exist on other nodes), this triggers an unplanned repair cycle and temporarily reduces redundancy.

## Troubleshooting

### Path Failures

- Verify physical FC cable connections at both the node HBA and the FC switch
- Confirm FC switch zoning has not changed
- Check HBA link status in the node's hardware information
- Verify the SAN array is healthy and the target LUNs are online
- If a path failure triggered failover, the vSAN continues on the secondary path -- check the node's drive list to confirm drives remain online

### LUNs Not Detected After Zoning

- Perform a **Refresh > Drives & NICs** on the affected node
- Verify WWPN zoning matches the HBA WWPNs visible in the node's hardware information
- Check that LUN masking on the SAN is configured to present LUNs to the correct HBA WWPNs
- Confirm the FC switch shows the HBA port as logged in

### Performance Bottlenecks

- Check queue depths -- sustained high queue depths may indicate LUN oversubscription
- Verify core network bandwidth is not the bottleneck (see bandwidth consideration below)
- Confirm proper multipath usage -- all I/O on a single path when two are available suggests a zoning or path configuration issue
- Identify whether specific LUNs are oversubscribed by checking per-drive I/O metrics in the node's drive properties

!!! info "Core Network Bandwidth Consideration"
    VergeOS vSAN uses the core network when reading and writing data. During a write operation, the system sends data to two nodes simultaneously over the core network.

    If your Fibre Channel SAN supports 32 Gb speeds but your core network is 25 Gb, the maximum write throughput will be constrained by the core network, not the SAN. Ensure the core network bandwidth exceeds the FC SAN bandwidth for write-intensive workloads.

## Best Practices

- Use redundant physical FC connections per node to protect against single-path failures
- Distribute LUNs evenly across FC paths to balance load
- Keep HBA firmware updated -- schedule updates during maintenance windows
- Establish a performance baseline after initial configuration so you can identify degradation

## Related Documentation

- [Storage Tiers](/product-guide/storage/storage-tiers)
- [vSAN Architecture](/product-guide/storage/vsan-architecture)
- [Maintenance Mode](/product-guide/operations/maintenance-mode)
- [Scaling Up a vSAN](/knowledge-base/scaling-up-a-vsan)
- [External Storage Integration](/product-guide/storage/external-storage-integration/)

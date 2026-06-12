---
description: "Step-by-step guide for adding Tier 0 metadata storage to an existing VergeOS system that was not configured with Tier 0 during initial installation."
---

# Adding Tier 0 to an Existing System

## Overview

{% hint style="info" %}
**Key Points**

- Tier 0 is normally configured during initial installation
- This procedure is for special cases requiring post-installation configuration
- Requires careful attention to device paths and hardware compatibility
{% endhint %}

This guide outlines the process for adding Tier 0 storage to an existing VergeOS system. While Tier 0 is typically configured during installation, these steps provide a method for adding it to production systems that cannot be reinstalled.

{% hint style="danger" %}
**Critical Warning**

- This procedure should only be performed by qualified VergeOS engineers or under direct support guidance
- Selected devices will be formatted and all existing data will be destroyed
- Incorrect device path selection can seriously damage your system
{% endhint %}

## Prerequisites

Before beginning this procedure, ensure:

- Storage devices are physically installed in the system
- Tier 0 devices are consistent across controller nodes
- Hardware meets specifications from the [Node Sizing Guide](https://docs.verge.io/implementation-guide/sizing/)

## Steps

### 1. Identify Device Paths

1. Navigate to **System > vSAN Diagnostics**.
2. Select **Get Node Device List** from the Query dropdown
3. Click **Send**
4. Identify unused devices (marked as "vsan = false")
5. Note the device paths (/dev/sd*) for each controller node

{% hint style="success" %}
Verify current vSAN drive assignments by checking **vSAN Tiers > [select tier] > Drives** to avoid selecting drives already in use.
{% endhint %}

### 2. Add Drives to Tier 0

For each drive:

1. In vSAN Diagnostics:
    - Set Query to **Add Drive to vSAN**
    - Select the appropriate **Node** (node0 or node1)
    - Enter the correct **Path** for the device
    - Set **Tier** to **Tier 0**
    - Configure **Swap** setting

{% hint style="warning" %}
**Swap Configuration**

- Enable swap on only ONE storage tier
- If swap is enabled on another tier, disable it for Tier 0
- Contact VergeOS Support for guidance on swap configuration if needed
{% endhint %}

2. Enter the verification phrase: *Yes I know what I'm doing*
3. Click **Send** to execute

### 3. Verify Configuration

1. Monitor the system dashboard for tier status
   - Status will show "online-no redundancy" during meta migration
2. Refresh node information:
   - Navigate to each controller node's dashboard
   - Select **Refresh > Drives & NICs**

## Post-Configuration

Monitor the vSAN tier status in the system dashboard. The tier should transition from "online-no redundancy" to "online" once meta migration completes.

## Additional Resources

- [vSAN Architecture Overview](https://docs.verge.io/product-guide/storage/vsan-architecture/)
<!--- [Storage Management](https://docs.verge.io/product-guide/storage/) -->
- [Node Sizing Guide](https://docs.verge.io/implementation-guide/sizing/)

---

{% hint style="info" %}
**Document Information**

- Last Updated: 2024-11-25
- VergeOS Version: 4.13
{% endhint %}

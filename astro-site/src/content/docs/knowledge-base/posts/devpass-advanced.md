---
title: Device Passthrough Advanced Configuration
slug: knowledge-base/dev-passthrough-advanced
description: Advanced configuration information for device passthrough - manual creation/editing of resource rules
date: 2024-11-10
---


# Device Passthrough Advanced Configuration (Manual Creation/Editing of Resource Rules)

Although allowing auto-generation of resource rules (e.g. when you select a device and use the *Make Resource* menu option) is easiest and usually recommended,
there may be situations where it may be useful to manually create a resource rule or to modify an auto-generated resource rule.

:::danger
It is important to read and be familiar with [**PCI Passthrough Risks and Precautions**](/product-guide/system/device-pass-overview#pci-passthrough-risksprecautions) before making passthrough configurations.
:::

## Manually Create a New Resource Rule

1. Navigate to Infrastructure > Resources.
2. Click **Rules** (ui card or on the left menu).
3. Click **New** on the left menu.
4. Provide a **Name** for the Rule; it is recommended to use a descriptive name can be helpful in future administration.
5. Select the **Resource Group** to which the resource rule will apply.
6. Select a specific **Node** or select *--None--* to apply the rule to all nodes.
7. Select the **Type** (PCI, USB, SR-IOV, or NVIDIA vGPU).
8. Leave the default value set to **--None--** in the field labeled *Automatically created based on PCI Device.*
9. Configure device filters as desired; filter fields will vary depending on the device type selected; see below.  (*Advanced Entry* [^1] option also available)

:::tip
Information on installed PCI devices, for use in filters, you can use the PCI devices listing: navigate to Infrastructure > Resources > PCI Devices.  To show additional fields, right-click in the heading section to select from the full list of available columns that can be displayed.
:::

## Edit an Existing Resource Rule

1. Navigate to the Associated **Resource Group dashboard** (Infrastructure > Resources > Groups > double-click the particular group).
2. In the ***Rules*** section, locate and **click the desired resource rule**.
3. Click **Edit** on the left menu.
4. Node selection and PCI Filters can be modified as needed. (*Advanced Entry* [^1] option also available)

[^1]:
The *Advanced Entry* section allows you to manually input filter syntax rather than using the filter entry fields.  Generally, it is preferable to allow system-generated syntax based on your filter field selections.

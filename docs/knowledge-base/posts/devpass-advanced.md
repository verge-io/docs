---
title: Device Passthrough Advanced Configuration
slug: dev-passthrough-advanced
description: Advanced configuration information for device passthrough - manual creation/editing of resource rules
draft: false
date: 2024-11-10T16:53:09.094Z
tags:
  - device passthrough
  - passthrough
  - sriov
  - vgpu
  - nvidia
  - pci
  - resource rules
  - device pool
categories:
  - system administration
  - VM
  - Virtual Machines
  - Tenant
editor: markdown
dateCreated: 2024-11-10T16:53:09.094Z
---


# Device Passthrough Advanced Configuration (Manual Creation/Editing of Resource Rules)

Although allowing auto-generation of resource rules (i.e. when you select a device and use the *Make Passthrough* menu option) is easiest and usually recommended,
there may be situations where it may be useful to manually create a resource rule or to modify an auto-generated resource rule.

## Manually Create a New Resource Rule

1. From the main dashboard, click Resources.
2. Click **Rules** (ui card or on the left menu).
3. Click **New** on the left menu.
4. Provide a **Name** for the Rule; it is recommended to use a descriptive name can be helpful in future administration.
5. Select the **Resource Group** to which the resource rule will apply.
6. Select a specific **Node** or select *--None--* to apply the rule to all nodes.
7. Select the **Type** (PCI, USB, SR-IOV, or NVIDIA vGPU).
8. Leave the default value set to **--None--** in the field labeled *Automatically created based on PCI Device.*
9. Configure device filters as desired; filter fields will vary depending on the device type selected; see below.  (*Advanced Entry* [^1] option also available)

!!! tip "Information on installed PCI devices, for use in filters, you can use the PCI devices listing: from the Main Dashboard, navigate to the Resources -> PCI Devices.  To show additional fields, right-click in the heading section to select from the full list of available columns that can be displayed."

## Edit an Existing Resource Rule

1. Navigate to the Associated **Resource Group dashboard** (Main Dashboard > Resources > Groups > double-click the particular group).
2. In the ***Rules*** section, locate and **click the desired resource rule**.
3. Click **Edit** on the left menu.
4. Node selection and PCI Filters can be modified as needed. (*Advanced Entry* [^1] option also available)  

[^1]:
The *Advanced Entry* section allows you to manually input filter syntax rather than using the filter entry fields.  Generally, it is preferable to allow system-generated syntax based on your filter field selections.

## Filters Per Device Type

### PCI Device Filters

| Field | Notes |
|-------|-------|
| **Name** | |
| **Slot** | |
| **Class** | |
| **Class HEX** | |
| **device_type** | |
| **Vendor** | |
| **Device** | |
| **Vendor Device (Hexidecimal)** |10de:1eb8|first 4 digits are the Vendor ID, last 4 digits are the Device ID|
| **Driver** | |

### NVIDIA Device Filters

| Field | Example | Notes |
|-------|---------|-------|
|**Name** | | |
|***Slot** | | |
|**Virtual Function** | | |
|**Vendor** | | |
|**Device** | | |
|**Vendor Device (Hexadecimal)** | | |
|**Physical Function** | | |
|**Type ID** | | |

### SR-IOV NIC Device Filters

| Field | Example | Notes |
|-------|---------|-------|
| **Name** | | |
| **Slot** | | |
| **Vendor** | | |
| **Device** | | |
| **Vendor Device (Hexidecimal)** | | |
| **Physical slot** | | |

### USB Device Filters

| Field | Example | Notes |
|-------|---------|-------|
| **Bus** | | |
| **Device** | | |
| **Path** | | |
| **Vendor ID** | | |
| **Model ID** | | |
| **Serial** | | |
| **USB Version** | | |
| **Speed** | | |
| **Interface Drivers** | | |

### Rule operators

| Operator | Notes |
|---------|--------|
| **Equal** | |
| **Not Equal** | |
| **Less than** | |
| **Less than or equal** | |
| **Greater than** | |
| **Greater than or equal** | |
| **Begins With** | |
| **Ends with** | |
| **Contains (case sensitive)** | |
| **Contains (case insensitive)** | |
| **Regex** | |

<!--
Id	Name	Note
00	Unclassified device	
01	Mass storage controller	
02	Network controller	
03	Display controller	
04	Multimedia controller	
05	Memory controller	
06	Bridge	
07	Communication controller	
08	Generic system peripheral	
09	Input device controller	
0a	Docking station	
0b	Processor	
0c	Serial bus controller	
0d	Wireless controller	
0e	Intelligent controller	
0f	Satellite communications controller	
10	Encryption controller	
11	Signal processing controller	
12	Processing accelerators	
13	Non-Essential Instrumentation	
14		
15		
16		
40	Coprocessor	
64		
ff	Unassigned class -->
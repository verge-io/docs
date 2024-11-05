# Device Passthrough Advanced Usage (Manual Creation/Editing of Resource Rules)

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

## Edit an Existing Resource Rule

1. Navigate to the Associated **Resource Group dashboard** (Main Dashboard -> Resources -> Groups -> double-click the particular group).
2. In the ***Rules*** section, locate and **click the desired resource rule**.
3. Click **Edit** on the left menu.
4. Node selection and PCI Filters can be modified as needed. (*Advanced Entry* [^1] option also available)  

[^1]:
The *Advanced Entry* section allows you to manually input filter syntax rather than using the filter entry fields.  Generally, it is preferable to allow system-generated syntax based on your filter field selections.

## Filters Per Device Type

### PCI Device Filters

| Field | Example | Notes |
|-------|---------|-------|
| **Name** | | |
| **Slot** | | |
| **Class** | | |
| **Class HEX** | | |
| **device_type** | | |
| **Vendor** | | |
| **Device** | | |
| **Vendor Device (Hexidecimal)** | | |
| **Driver** | | |

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

---
title: Preferred Tier Usage
slug: knowledge-base/preferred-tier-usage
date: 2023-01-24
---

## How Preferred Tier Settings Determine Which Tier to Use

When creating or modifying a virtual machine (VM) disk drive in VergeOS, users can set a **Preferred Tier**. In most cases, this is left at **default**, which can be configured under **System > System Settings > Default VM Drive Tier**. However, the system's behavior when a specified tier does not exist can be unexpected. Here's how VergeOS determines which tier to use in such cases:

- **Setting a preferred tier to a non-existent higher tier**:
    - Example: If a user selects **Tier 3** in a system that only has **Tier 1** and **Tier 4** storage available, the system will attempt to pick the next higher (slower) tier. In this case, the system will default to **Tier 4**.

- **Setting a preferred tier to a non-existent lower tier**:
    - Example: If a user selects **Tier 3** in a system that only has **Tier 1** and **Tier 2** storage, the system will pick the next lower (faster) tier. In this case, the system will default to **Tier 2**.

In both scenarios, VergeOS ensures that the closest available tier is selected based on the user's preference.


---

:::note[Document Information]
- Last Updated: 2024-08-29
- vergeOS Version: 4.12.6
:::

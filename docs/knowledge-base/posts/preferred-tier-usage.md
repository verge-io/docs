---
title: Preferred Tier Usage
slug: preferred-tier-usage
description: Explains how VergeOS determines which vSAN storage tier to use when a VM disk's preferred tier is set to a non-existent tier, including fallback behavior.
author: VergeOS Documentation Team
draft: false
date: 2023-01-24T19:25:57.114Z
semantic_keywords:
  - "preferred tier fallback behavior"
  - "vm disk storage tier selection"
  - "non-existent tier default assignment"
  - "vsan tier configuration settings"
use_cases:
  - understand_preferred_tier_behavior
  - configure_vm_disk_storage_tier
  - troubleshoot_tier_assignment
tags:
  - tier
  - preferred tier
  - vsan
  - vm
  - disk
  - media
categories:
  - vSAN
editor: markdown
dateCreated: 2022-09-01T16:25:52.340Z
---

## How Preferred Tier Settings Determine Which Tier to Use

When creating or modifying a virtual machine (VM) disk drive in VergeOS, users can set a **Preferred Tier**. In most cases, this is left at **default**, which can be configured under **System > System Settings > Default VM Drive Tier**. However, the system's behavior when a specified tier does not exist can be unexpected. Here's how VergeOS determines which tier to use in such cases:

- **Setting a preferred tier to a non-existent higher tier**:
    - Example: If a user selects **Tier 3** in a system that only has **Tier 1** and **Tier 4** storage available, the system will attempt to pick the next higher (slower) tier. In this case, the system will default to **Tier 4**.
  
- **Setting a preferred tier to a non-existent lower tier**:
    - Example: If a user selects **Tier 3** in a system that only has **Tier 1** and **Tier 2** storage, the system will pick the next lower (faster) tier. In this case, the system will default to **Tier 2**.

In both scenarios, VergeOS ensures that the closest available tier is selected based on the user’s preference.


---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

---
title: "Preferred Tier"
description: "Explains the Preferred Tier setting in VergeOS vSAN, which determines the first-choice storage tier for data placement with automatic fallback to alternative tiers when unavailable."
semantic_keywords:
  - "preferred storage tier setting VergeOS"
  - "vSAN tier selection fallback behavior"
  - "storage tier priority data placement"
  - "automatic tier failover configuration"
use_cases:
  - storage_tier_selection
  - data_placement_configuration
  - tier_fallback_planning
tags:
  - preferred-tier
  - storage-tiers
  - vsan
  - data-placement
  - configuration
categories:
  - Storage
---

# Preferred Tier

The *Preferred Tier* setting will establish a "first choice" for the storage tier to be used. If that tier is unavailable or there is inadequate space on the tier, the system will automatically move to the next less expensive (higher-numbered) tier, and next less expensive tier if that one is unavailable. If the specified preferred tier is unavailable and there is also no less expensive tier available, the system will move to the next more expensive(lower-numbered) tier.

## Preferred Tier Example

**The following illustration shows an example where tier 4 has been specified as the preferred tier:**

![preferredtier.png](/product-guide/screenshots/preferredtier.png)
---
description: "How to request a vSAN scale-down (drive removal) through VergeOS Support, including what to prepare before opening a ticket."
---

# Scaling Down a vSAN (Removing Drives)

## Overview

{% hint style="info" %}
**Key Points**

- Removing drives from a vSAN tier is **not a self-service operation**
- Drive removal must be coordinated with VergeOS Support
- The process requires data redistribution across the remaining drives before any drives can be safely removed
{% endhint %}

Scaling down a vSAN (removing physical drives to reduce storage capacity) is fundamentally different from [scaling up](scaling-up-a-vsan.md). Adding drives is an additive, low-risk operation. Removing them requires the system to first safely redistribute all data off the target drives, which involves careful coordination to avoid disruption or data loss.

For this reason, vSAN scale-down is handled exclusively by VergeOS Support.

## Why Drive Removal Requires Support

When a drive is removed from a vSAN tier, VergeOS must:

1. Confirm the remaining drives have sufficient free capacity to absorb the data from the drives being removed
2. Migrate all data off the target drives to maintain redundancy
3. Monitor repair and redistribution to completion before drives are physically pulled

If any of these steps are rushed or sequenced incorrectly, the vSAN tier can enter a degraded or unrecoverable state. Support engineers coordinate this process and monitor it through to a healthy green status before physical removal occurs.

## Before You Contact Support

Gathering the following information in advance will help Support scope the request and schedule the work:

- **Why you need to scale down** — repurposing drives, tier restructuring, etc.
- **Which tier** the drives belong to (Tier 0, Tier 1, Tier 2, etc.)
- **Number and size of drives** to be removed per node
- **Current tier capacity and usage** — available in the VergeOS UI under **Infrastructure > vSAN Tiers**
- **Current vSAN tier status** — confirm the tier is green/healthy before the call
- **Preferred maintenance window** — drive removal and data redistribution may take hours to complete depending on data volume

## Initiating the Request

[Open a support ticket](https://docs.verge.io/support/) and include the information above. For time-sensitive requests, note your preferred maintenance window in the ticket so Support can prioritize scheduling.

## What to Expect

Once the request is scheduled, Support will:

1. Review your current vSAN health and capacity headroom
2. Walk through the planned removal with you before beginning
3. Initiate the data redistribution process and monitor repair status
4. Confirm the tier returns to a healthy green state before any drives are physically removed
5. Guide you through the physical removal and any post-removal verification steps

## Related Documentation

- [vSAN Scale Up Guide](scaling-up-a-vsan.md) — the inverse operation, which is self-service
- [vSAN Scale Up SOP](https://docs.verge.io/product-guide/operations/vsan-scale-up-sop/) — preparation and verification best practices for storage operations
- [vSAN Architecture Overview](https://docs.verge.io/product-guide/storage/vsan-architecture/)

---

{% hint style="info" %}
**Document Information**

- Last Updated: 2026-04-20
- VergeOS Version: 4.13
{% endhint %}

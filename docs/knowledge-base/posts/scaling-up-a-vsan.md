---
title: Scaling Up a vSAN
slug: scaling-up-a-vsan
description: 
draft: false
date: 2024-11-07T19:15:40.203Z
tags:
  - scale up
  - vsan
  - scaling
categories:
  - vSAN
  - Scale Up
editor: markdown
dateCreated: 2022-08-17T15:48:21.549Z
---

To scale up a vSAN, follow the steps below. However, before proceeding, ensure that your current vSAN has at least **10% free capacity**.

!!! warning "Important"
    - All drives in a tier must be alike. If a drive of an incorrect size is added to an existing tier, the tier will only be able to use the space of the smallest drive.
    - Ensure that your vSAN has at least 10% free capacity unless you are doubling the capacity. If the free space is less than 10% and you are not doubling the drive count, consider scaling out by adding a node.

## Steps to Scale Up

1. **Physically add the drives or Fiber Channel LUNs** on the node you want to scale up.

2. **Log in to the host system's UI** and select the appropriate cluster you want to scale up from the **top compute cluster** section on the home page.

3. **Select the node** that you are scaling up.

4. **Refresh the system** to recognize the new drives:
   - Select **Refresh** from the left menu, and choose **Drives & NICs** from the dropdown.
   - Confirm by selecting **Yes**.

5. **Select the Scale Up option** on the left menu.

6. The page will now show the newly inserted drives in an **offline** state. Select the drive(s), then under **Node Drives**, select the **Scale Up** function.

7. **Select the appropriate tier** for the drive(s) and submit.

Upon completion, the screen will refresh and the drives will disappear from the view. Go back to the main page, where you will see the **vSAN tiers** change color to **yellow**, indicating that it is in a repair state. This is expected, and the vSAN will return to a **green/healthy** state after a few minutes, showing the newly added tier or increased space on an existing tier.

Repeat these steps for each node as necessary.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - VergeOS Version: 4.13

---
title: VergeIO Updates
description: Update Process
published: true
date: 2023-01-27T21:50:15.504Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:29:58.280Z
---

## VergeIO Updates
VergeIO targets a quarterly release schedule with new features and enhancements to the core product. Hotfixes and security updates are released on an as needed basis as soon as they are determined to be ready for general availability. When updates are available, administrators should apply them in a timely fashion.

## Update Features

- Completely user interface driven
- Can be applied automatically on a schedule or manually from the update dashboard
- Designed to be a **zero downtime** event through a rolling reboot process
- Uses the [maintenance mode](/public/maintenance) feature to gracefully migrate workloads to and from their original physical node
- A "cloud snapshot" is taken automatically and retained for a default of 12 hours in the event the environment needs to be rolled back after an update
- After a node reboot a data verification process is run automatically to ensure that data is consistent across the tiers of storage
> View the release notes [here](/public/release-notes)
{.is-info}

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
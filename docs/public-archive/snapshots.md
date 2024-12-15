---
title: Snapshots
description: Snapshot Engine
published: true
date: 2023-01-27T22:06:54.016Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:00:28.299Z
---

## Snapshot Overview
Snapshots create an instant point-in-time picture of workloads. This allows for the ability to roll back to a previous instance in the event of a hardware failure, failed software upgrade, vm bluescreens, etc. 
Snapshots/Restores can be done at various levels: 
1. Cloud (entire system)
1. Tenant
1. Virtual Machine
1. Individual vm disk and/or NAS volume

## Snapshot Features

- Cloud snapshots, when synchronized to another VergeOS system can be considered 'warm standby' for Business Continuity/Disaster Recovery (BC/DR) planning
- Recover a clone copy of a VM to perform upgrade testing
- Are branched against the initial data blocks, minimizing additional storage consumption
- Quickly revert an entire physical or virtual environment to a previous state, e.g. rapid recovery from a cryptolocker attack
- VergeOS architecture allows for rapid restores from snapshots by removing the need for collapsing disk images
- Providing disk images are not set to quiesce, snapshots are taken instantly by simply updating or adding a pointer to a data block during that point in time

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>

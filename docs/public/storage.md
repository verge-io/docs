---
title: VergeOS vSAN
description: vSAN Information
published: true
date: 2023-01-27T21:50:06.014Z
tags: 
editor: markdown
dateCreated: 2022-03-01T17:01:36.004Z
---

## vSAN Features
- Scalability
VergeOS was built around addressing the complexities of scale. Simply add more disks or another server to your cluster and VergeOS will gracefully distribute your data to the added storage as a background process.

- Global Inline Deduplication
The deduplication engine compares the blocks that an entire system encompasses before committing a write to disk. This technique allows for reduced data usage between vm's, tenants, and backup/DR sites.

- Silent Corruption Detection & Correction
The vSAN stores a checksum of every block of data that is written to it. When that block is read, it is verified for integrity. This technique protects against silent corruption and bit rot. In the event of finding a bad block, our algorithm will check for redundant copies locally within the system. If that block cannot be found then DR/Backup sites will be checked in real time. If a good copy of the block exists at a remote site it will be retrieved and repaired seamlessly without user interaction or down time.

- Optimized Remote Synchronization
If the destination site receiving backups already contains (for example) 90% of the same blocks, then VergeOS knows to only send the 10% of differentiating blocks. This technique allows for decreased sync times by leveraging deduplication across sites. Native compression also helps to reduce the amount of bandwidth used during sync operations.

- Automated Health Scanning
VergeOS uses a variety of open source tools to actively monitor a systems state for any possible hardware or software issues to ensure business continuity.

- Storage Multi Tiering:
Storage tiering allows for the flexibility to mix and match drive types within a single, fully integrated environment. Simply select the tier that the data should reside on.

- High Performance
Use commodity grade hardware and achieve enterprise level performance with VergeOS storage technology.

- 256-bit Data At Rest Encryption (DARE)
VergeOS supports AES 256-bit encryption as an optional function to be enabled during system installation.

- Instant Snapshots & Cloning
Take or restore snapshots of an entire system, tenant, or virtual machine instantly.

<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
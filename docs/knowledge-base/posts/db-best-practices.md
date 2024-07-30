---
title: Database Best Practices
slug: database-best-practices
description: 
published: true
date: 2023-04-21T13:37:38.002Z
tags: sql, best practice, database, db
categories:
  - Best Practices
editor: markdown
dateCreated: 2022-09-01T17:00:25.460Z
---

## Database Performance Adjustments
<br>

### Below are the best practices for running most databases and database applications on Microsoft Windows in VeregOS.
<br>

- **Locate** backups on VergeOS for best performance.
- If your database is encrypted, **decrypt it before moving it onto VergeOS**.
- **Disable** the Windows **automatic defrag job**.
- **Disable Windows Defender**, or at a minimum exclude the path/drive where the **DB is stored**, as well as any **LOGS and/or Transaction drives**.
- **Disable non-essential Windows services**.
- **Do not** overcommit cores if many DB VMs are sharing the same core.
- **Disable Fsync** on drives logs are written to. This is done by editing a virtual disk in VergeOS.
- **Do not allow** the DB VM to use more cores than are physically available on **1** CPU. (**not** hyperthreaded cores) 
   **Example**: If it is a dual socket, 8 core, 16 threads (16 x 32 total), do not exceed 8.
- **Do not** exceed memory in a single physical socket.
- Use virtIO network drivers **whenever possible** as they normally will provide the best performance. The latest stable virtIO drivers are available for download at [https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
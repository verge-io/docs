---
title: Product Guide - VM Import Methods
description: Short description of each VM import method along with links to pages detailing instructions for each method
published: true
date: 2024-03-25T18:03:20.605Z
tags: 
editor: markdown
dateCreated: 2023-04-08T00:42:30.042Z
---

# VM Import Methods

Multiple methods are available for importing existing VMs into VergeIO:

<br>

- [**From Media Images**](/public/ProductGuide/importfromupload)
To import one VM at a time; requires the upload of VM media files (*.vmx, *.vhd(x), *.qcow, *.etc.) to the vSAN.
<br>

- [**From a VMware Service Backup Job**](/public/ProductGuide/importvmware)
Data is accessed using the **VMware agent** for direct connection (independent of storage hardware). This is the best method for importing multiple VMs from a running, production VMware environment.
<br>
- [**From a NAS Volume**](/public/ProductGuide/importfromNAS)
Data is pulled from **CIFS or NFS share** accessing existing VM data storage.
<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }
---
title: Configuring a VM Export Volume
description: How to configure the VergeIO NAS VM Export Volume
published: true
date: 2024-02-27T19:42:16.752Z
tags: 
editor: markdown
dateCreated: 2023-05-25T19:53:15.389Z
---

## How To Configure VM Export

Within the VergeIO volume configuration, there is an option to create a volume that contains an export of selected VMs. This special volume can then be used to backup the VMs using 3^rd^ party backup software. This volume contains VM snapshots from the last time the VM Export was ran.
<br>

### To configure this volume, follow these steps:

1. **Edit any VMs** you want to export & check the option for "**Allow Export**" You can also choose to quiesce the VM images as well.
1. Create the **NAS**.
1. Start the **NAS**.
1. Create a **NAS user**.
> Additional Information about configuration of the NAS and NAS user          configuration can be found in the self-paced training at [https://wiki.verge.io/public/training/6-0](https://wiki.verge.io/public/training/6-0)
{.is-info}

5. **Create a new volume**. Set the Filesystem type to **VergeIO VM Export**
1. Under "**Export VMs**", select **Start** to start the VM export.
1. Answer **Yes** at the Confirmation screen.
1. The status will change to "**Reset Needed - There is a newer VM export available for this volume. Reset the volume to refresh**".
1. Select the **Reset** button from the **left menu**.
1. Answer **Yes** at the Confirmation screen. The VM Export volume has now been created. 
<br>

### How to setup a share to share the data.

1. **Create** a CIFS share to said volume. [https://wiki.verge.io/public/training/6-6](https://wiki.verge.io/public/training/6-6)
1. **Add** the user we created above to the allowable users.
1. **Browse** to **\\\IPorDNSnameoftheNAS\CIFSShareYouCreated**
1. When prompted for credentials, **use the user we created above**. You can also enable Guest mode, but Windows users will need to edit the GPO or the Registry to connect using the Guest account.
<br>

### Automating the export:

1. Create an **event** inside the VM Export Volume to schedule an export.




<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>


## How To Configure VM Export

Within the VergeIO volume configuration, there is an option to create a volume that contains an export of selected VMs. This special volume can then be used to backup the VMs using 3^rd^ party backup software. This volume contains VM snapshots from the last time the VM Export was ran.
<br>

### To configure this volume, follow these steps:

1. **Edit any VMs** you want to export & check the option for "**Allow Export**" You can also choose to quiesce the VM images as well.
1. Create the **NAS**.
1. Start the **NAS**.
1. Create a **NAS user**.
> Additional Information about configuration of the NAS and NAS user configuration can be found in the self-paced training at [https://wiki.verge.io/public/training/6-0](https://wiki.verge.io/public/training/6-0)
{.is-info}

5. **Create a new volume**. Set the Filesystem type to **VergeIO VM Export**
1. Under "**Export VMs**", select **Start** to start the VM export.
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

[Get vergeOS license keys](https://www.verge.io/test-drive){target="_blank"}{ .md-button }



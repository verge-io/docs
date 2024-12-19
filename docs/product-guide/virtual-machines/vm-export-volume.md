

## How To Configure VM Export

Within the VergeOS volume configuration, there is an option to create a volume that contains an export of selected VMs. This special volume can then be used to backup the VMs using 3^rd^ party backup software. This volume contains VM snapshots from the last time the VM Export was ran.
<br>

### To configure this volume, follow these steps:

1. **Edit any VMs** you want to export & check the option for "**Allow Export**" You can also choose to quiesce the VM images as well.
1. Create the **NAS**.
1. Start the **NAS**.
1. Create a **NAS user**.
> Additional Information about configuration of the NAS and NAS user configuration can be found at [NAS Service Overview](/product-guide/nas/nas-service)
{.is-info}

1. **Create a new volume**. Set the Filesystem type to **VergeOS VM Export**
2. Under "**Export VMs**", select **Start** to start the VM export.
3. Answer **Yes** at the Confirmation screen. The VM Export volume has now been created. 
<br>

### How to share the data

1. [**Create a CIFS share**](/product-guide/nas/nas-shares) to the volume.
2. **Add** the user we created above to the allowable users.
3. **Browse** to **\\\IPorDNSnameoftheNAS\CIFSShareYouCreated**
4. When prompted for credentials, **use the user we created above**. You can also enable Guest mode, but Windows users will need to edit the GPO or the Registry to connect using the Guest account.


### Automating the export:

1. Create an **event** inside the VM Export Volume to schedule an export.

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }



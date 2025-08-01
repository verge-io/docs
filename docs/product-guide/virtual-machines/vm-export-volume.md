# Configuring VM Export

Within the VergeOS volume configuration, there is an option to create a volume that contains an export of selected VMs. This special volume contains VM snapshots from the last time the VM export was run that can then be used to backup the VMs using 3rd party backup software.

## Configure a Volume for Export

1. **Edit any VMs** you want to export & check the option for "**Allow Export**" You can also choose to quiesce the VM images as well.
2. Create the **NAS**.
3. Start the **NAS**.
4. Create a **NAS user**.
    - Click **NAS Users** in the left sidebar of the newly started NAS Service
    - Click **New**
    - Fill in the credentials and optional fields on the **NAS User** page
    - Click **Submit**

!!! info
    Additional Information about configuration of the NAS can be found at [NAS Service Overview](/product-guide/nas/nas-service)

1. **Create a new volume**. Set the Filesystem type to **Verge.io VM Export**
2. Under **VM Export Settings**
    - Choose whether to put VMs in a quiesced state
    - Select number of exports to store
    - Choose whether to enable the creation of a "current" folder to contain most recent exports
3. Click **Submit**
4. Under "**Export VMs**" in the new volume's dashboard, select **Start** to start the VM export.
5. Answer **Yes** at the Confirmation screen. The VM export volume has now been created.

## Share Export Volume Data

1. [**Create a CIFS share**](/product-guide/nas/nas-shares#create-a-cifs-share) to the volume.
2. **Add** the user we created above to the allowable users.
3. Click **Submit**
4. **Copy** the Mount Path **\\\IPorDNSnameoftheNAS\CIFSShareName** in the CIFS share dashboard and **Browse** to it.
5. When prompted for credentials, **use the user we created above**. You can also enable Guest mode, but Windows users will need to edit the GPO or the Registry to connect using the Guest account.

## Automate the VM Export

1. Create an **event** inside the VM export volume to schedule an export.

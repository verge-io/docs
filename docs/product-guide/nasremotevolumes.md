

# Remote Volumes

Remote volumes are external file systems mounted to the VergeOS System via standard NFS or CIFS. A common use for a remote volume would be to allow syncing external data into the VergeOS vSAN (from other VergeOS sites or other storage systems), for a one-time operation or recurring backups.

> A [**NAS Service**](/product-guide/NASservice) must be in place before creating volumes. {.is-success} 


<br>
<br>


## Create a Remote CIFS Volume

1.  From the Main Dashboard, select **NAS** from the left menu.
2.  Select **Volumes** from the left menu.
3.  Select **New** from the left menu.
4.  Select the appropriate ***NAS Service*** from the dropdown list.
5.  Enter a ***Name*** for the volume (required). Note: spaces are not permitted.
6.  Enter a ***Description*** for the volume (optional).
7.  In the ***Filesystem Type*** dropdown list, select **Remote CIFS**.
8.  In the ***Remote Mount Target*** field enter the UNC path to access the CIFS Share. (Examples: /[]()/10.10.2.2/fshare, //file-01/corp)
9.  Enter an appropriate ***Username*** and ***Password***, if needed.
10.  Select the appropriate ***SMB Protocol Version*** from the dropdown list. Typically, leaving the default selection is recommended as it should work in the majority of situations. The system will auto-detect the version needed, using the newest version detected to be compatible.
11.  Enter ***Mount Options*** These are optional CIFS parameters for advanced use. More information is available at: [https://linux.die.net/man/8/mount](https://linux.die.net/man/8/mount.cifs))
12.  Select the ***Read Only*** checkbox if the file system should be mounted as read-only within the volume.(Note: Read-only access may already be determined by the user permissions defined on the source CIFS share.) 
13.  Click **Submit** to save the settings and create the new remote volume.
14.  The dashboard for the new remote volume is displayed. If the remote CIFS share was successfully mounted to the VergeOS system, an Online Status will appear; if the volume does not mount successfully, refer to the logs section toward the bottom of the dashboard to view error messages.

> Files in the online volume can be viewed using the Browse option from the left menu. {.is-success}

<br>
<br>

## Create a Remote NFS Volume

1.  From the Main Dashboard, select **NAS** from the left menu.
2.  Select **Volumes** from the left menu.
3.  Select **New** from the left menu.
4.  Select the appropriate ***NAS Service*** from the dropdown list.
5.  Enter a ***Name*** for the new volume (required). Note: spaces are not permitted.
6.  Enter a ***Description*** for the volume (optional).
7.  In the ***Filesystem Type*** dropdown list, select **Remote NFS**.
8.  In the ***Remote Mount Target*** field enter the NFS path. **NFS Path syntax: SERVER:/FullPathtoShare** (Example1: server01:/export/svrdata Example2: server01:/data/testdata/Jan)
9.  If necessary, select the proper ***NFS protocol version*** from the dropdown list. Typically, leaving the default selection is recommended as it should work in the majority of situations. The system will auto-detect the version needed, using the newest version detected to be compatible.
10.  Optionally, ***Mount Options*** can be entered. This allows for advanced, optional NFS mount parameters; more information is available at: [https://linux.die.net/man/5/nfs](https://linux.die.net/man/5/nfs)
11.  Select the ***Read Only*** checkbox if the file system should be mounted as a read-only within the volume.
12.  Click **Submit** to save the settings and create the new remote volume.
13.  The dashboard for the new remote volume is displayed. If the remote NFS share was successfully mounted to the VergeOS system, the status will display Online; if the volume does not mount successfully, refer to the logs section at the bottom of the dashboard to view encountered errors for troubleshooting.

> Files in the online volume can be viewed using the Browse option from the left menu. {.is-success}

<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
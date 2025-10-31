# Remote Volumes

Remote volumes are external file systems mounted to the VergeOS system via standard NFS or CIFS. A common use for a remote volume would be to allow syncing external data into the VergeOS vSAN (from other VergeOS sites or other storage systems), for a one-time operation or recurring backups.

!!! success "A [**NAS service**](/product-guide/nas/nas-service) must be in place before creating volumes."

## Create a Remote CIFS Volume

1. Navigate to **NAS** > **Volumes**.
2. Select **New** from the left menu.
3. Select the appropriate **NAS Service** from the dropdown list.
4. Enter a **Name** for the volume (required). Note: spaces are not permitted.
5. Enter a **Description** for the volume (optional).
6. In the **Filesystem Type** dropdown list, select ***Remote CIFS***.
7. In the **Remote Mount Target** field enter the UNC path to access the CIFS share. (Examples: //10.10.2.2/fshare, //file-01/corp)
8. Enter an appropriate **Username** and **Password**, if needed.
9. Select the appropriate **SMB Protocol Version** from the dropdown list. Typically, leaving the default selection is recommended as it should work in the majority of situations. The system will auto-detect the version needed, using the newest version detected to be compatible.
10. Enter **Mount Options**. These are optional CIFS parameters for advanced use. More information is available at: [https://linux.die.net/man/8/mount](https://linux.die.net/man/8/mount.cifs)
11. Select the **Read Only** checkbox if the file system should be mounted as read-only within the volume. (Note: Read-only access may already be determined by the user permissions defined on the source CIFS share.)
12. Click **Submit** to save the settings and create the new remote volume.
13. The dashboard for the new remote volume is displayed. If the remote CIFS share was successfully mounted to the VergeOS system, an online status will appear; if the volume does not mount successfully, refer to the *Logs* section toward the bottom of the dashboard to view error messages.

!!! success "Files in the online volume can be viewed using the *Browse* option from the left menu."

## Create a Remote NFS Volume

1. Navigate to **NAS** > **Volumes**.
2. Select **New** from the left menu.
3. Select the appropriate **NAS Service** from the dropdown list.
4. Enter a **Name** for the new volume (required). Note: spaces are not permitted.
5. Enter a **Description** for the volume (optional).
6. In the **Filesystem Type** dropdown list, select ***Remote NFS***.
7. In the **Remote Mount Target** field enter the NFS path. NFS Path syntax: SERVER:/FullPathtoShare (Example1: server01:/export/svrdata Example2: server01:/data/testdata/Jan)
8. If necessary, select the proper **NFS protocol version** from the dropdown list. Typically, leaving the default selection is recommended as it should work in the majority of situations. The system will auto-detect the version needed, using the newest version detected to be compatible.
9. Optionally, **Mount Options** can be entered. This allows for advanced, optional NFS mount parameters; more information is available at: [https://linux.die.net/man/5/nfs](https://linux.die.net/man/5/nfs)
10. Select the **Read Only** checkbox if the file system should be mounted as read-only within the volume.
11. Click **Submit** to save the settings and create the new remote volume.
12. The dashboard for the new remote volume is displayed. If the remote NFS share was successfully mounted to the VergeOS system, the status will display online; if the volume does not mount successfully, refer to the *Logs* section at the bottom of the dashboard to view encountered errors for troubleshooting.

!!! success "Files in the online volume can be viewed using the *Browse* option from the left menu."

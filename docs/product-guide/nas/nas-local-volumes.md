# Local Volumes

Local volumes are file systems stored within VergeOS, consuming storage in the VergeOS vSAN. Each local volume can have different sharing, syncing, tiering, and permission settings.

!!! success "A NAS service must be in place before creating volumes. See the [**NAS Service**](/product-guide/nas/nas-service) page for instructions."

## Create a Local Volume

1. From the Main Dashboard, select **NAS** from the left menu.
2. Select **Volumes** from the left menu.
3. Select **New** from the left menu.
4. Select the appropriate **NAS Service** from the dropdown list.
5. Enter a **Name** for the volume (required). Note: spaces are not permitted.
6. Enter a **Description** for the volume (optional).
7. In the **Filesystem Type** dropdown list, select ***Local Volume (EXT4)***.
8. The **Encrypt Volume** option can be selected to encrypt the entire volume (AES-XTS).
!!! info "Encryption Considerations:"
    - Encryption selection is only available during creation; a volume cannot be changed from encrypted to unencrypted or vice-versa after creation.
    - Minor to moderate performance implications are involved with enabling volume encryption.
9. When encryption is selected, **Encryption Key** is also required.  
!!! warning "The encryption key is needed for the lifetime of the volume. This encryption key must be entered each time the volume is brought online (e.g. after disabling/enabling a volume or after its NAS service is rebooted, etc.) Without the encryption key, it will not be possible to bring the volume back online!"

10. Specify a **Max Size** for the volume, by entering an integer and selecting the unit (B/KB/MB/GB/TB). (When max size is reached, the volume will show out of space and will continue to be readable, but will not allow further writes.)
11. The **Discard** option is enabled by default. When discard enabled: as data is deleted from the volume, that space is reclaimed back to the vSAN.
12. The volume can optionally be set to **Read Only**.
13. The **Automatically Mount Snapshots** option can be selected to make snapshots readily available for browsing/file restores.
14. Specify **Owner** for the volume directory (optional).
15. Specify a **Group** for volume directory (optional).
16. Select a **Snapshot Profile** for the volume (optional). See [**Snapshot Profiles**](/product-guide/backup-dr/snapshot-profiles) for information regarding snapshot profiles.
17. Select **Preferred Tier** for storing this volume. Preferred tier is the tier first attempted. See [**Preferred Tiers**](/product-guide/storage/preferred-tiers) for more information.
18. Click **Submit** to save the settings and create the local volume.
19. The dashboard for the new local volume is displayed. It may take a few minutes for the new volume to come online. If the volume status does not become online, refer to the logs section (bottom of dashboard) to view error messages for troubleshooting.
20. Files in the online volume can be viewed using the **Browse** option from the left menu.
21. To expose the local volume, create CIFS and/or NFS [**shares**](/product-guide/nas/nas-shares).

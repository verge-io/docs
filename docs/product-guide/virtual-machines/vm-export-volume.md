# VM Export Volume

The VergeOS NAS service provides a special volume type (*Verge.io VM Export*) to facilitate export of VMs. This special volume contains VM snapshots, created each time the export is run, that can then be made available to external systems and third-party backup software.

## Core Concepts

- VMs must have **Allow Export** enabled in their settings to be included in exports.
- The VM export workflow centers on creating a dedicated NAS volume designed specifically for generating exportable snapshots of selected virtual machines.
- Exports can be manually triggered or automated through task schedules.
- Each export produces a set of VM snapshots stored within the volume, organized by timestamped folders.
- To make the exported data accessible to external systems, such as third-party backup tools or external storage platforms:
    * The volume can be [shared over CIFS or NFS](/product-guide/nas/nas-shares)
    * Data can be [volume synchronized](/product-guide/nas/volume-syncs) to an external system (e.g. NAS appliance) via CIFS/NFS using a mounted [remote volume](/product-guide/nas/nas-remote-volumes)

## Export Settings

The VM export volume pane includes an **additional settings view** accessible via the **Settings** button in the Export VMs section. This view provides access to export configuration options, including:

- **Quiesced snapshots** — enable or disable quiescing for export snapshots
- **Max exports to store** — configure how many export instances are retained
- **Current folder** — configure whether a "current" folder is maintained with the latest export

These settings can be adjusted at any time without recreating the volume.

For detailed configuration instructions, see the KB article: **[How to Configure a Volume for VM Exports](/knowledge-base/configuring-a-vm-export-volume)**


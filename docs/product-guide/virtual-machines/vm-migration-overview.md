# Migrating Workloads into VergeOS

VergeOS offers flexible options for importing workloads from other systems, including tools for bulk migrations and comprehensive support for import from media images (VMDK/VHD/VHDX, OVF/OVA, VMX, QCOW2, etc.). Virtual machines can be transferred directly into the environment, allowing upload and configuration manually or through automated tools. This versatility makes it easy to transition from other platforms while maintaining control and continuity.

The following guide outlines various options available for importing existing workloads into VergeOS.

## Migration Methods

### Enterprise Migration Platform

!!! tip "Cirrus Data Integration with VergeOS"
    **Cirrus Data** - a leader in enterprise data migration - has included VergeOS integration in their *Compute Migration* and *MigrateOps* products, enabling **zero downtime import** of physical or virtual machines into VergeOS from any platform. Ideal for complex enterprise migrations requiring minimal business disruption. [Learn More…](/product-guide/tools-integrations/cirrus-data)

---

### Native VergeOS Import Methods

#### [**VergeOS VMware Connector**](/product-guide/virtual-machines/import-from-vmware) 

**Recommended for:** Small to large VMware production environments

A full backup of source virtual machines into VergeOS is performed using the VMware connector. Incremental backups are then performed to capture only the changes, leveraging VMware's Change Block Tracking (CBT) for efficient transfer. Once the incremental backup duration stabilizes, indicating minimal ongoing data churn, the system is considered ready for cutover with minimal downtime.

**Key Features:**

- Live migration from running VMware environments
- Incremental backup support leveraging VMware CBT
- Batch import capabilities for multiple VMs
- Hardware-independent data access
- Minimal cutover downtime

**Storage Optimization Note:**
VMs imported from thick-provisioned VMDKs will benefit from immediate TRIM operations post-import to reclaim unused space.

!!! note "Storage Optimization - Trim"
    VMs imported from thick-provisioned VMDKs will benefit from immediate TRIM operations post-import to reclaim unused space.

**Additional Resources:**
- [VMware Backup DR Guide](/knowledge-base/vmwarebackupdrguide)
- [Importing VMs from VMware Service Backup Jobs](/product-guide/virtual-machines/import-from-vmware)

#### [**Upload from Media Images**](/product-guide/virtual-machines/import-from-upload)

**Recommended for:** Individual VMs and mixed virtualization environments

Upload VM configuration and disk files (VMX, VMDK, OVF, VHD, QCOW2, etc.) to the vSAN and import them individually. This method provides maximum compatibility across different source platforms.

**Method Overview:**

- Disk image files are uploaded to the vSAN (VergeFS)
- VM configuration files (e.g. VMX/OVF) are uploaded
- **-OR-** The VM definition is created in VergeOS and VM disk(s) are created using the uploaded disk file(s)

**Key Features:**

- Supports 12+ file formats including VMware, Hyper-V, VirtualBox, and QEMU
- Ideal for importing VMs from shut-down environments
- Complete control over import process and timing
- Works with any virtualization platform that can export standard formats

**Storage Optimization Note:**
Uploaded thick-provisioned images should be trimmed after import to optimize vSAN storage utilization.

!!! note "Storage Optimization - Trim"
    Uploaded thick-provisioned images should be trimmed after import to optimize vSAN storage utilization.

#### [**NAS Volume Import**](/product-guide/virtual-machines/import-from-nas)

**Recommended for:** Batch imports from network storage

Import VMs directly from CIFS or NFS network shares where VM files are stored. Efficient for large-scale migrations when VM data is already accessible via network storage.

**Method Overview:**

- A NAS service is established within your VergeOS system
- A remote volume is created to mount the external storage source
- New VMs are created, selecting the *--Import from Volume--* option
- Progress is monitored from the Import Jobs dashboard

**Key Features:**

- Bulk import multiple VMs simultaneously
- Direct access to existing NFS/CIFS shares
- No need to upload files to vSAN first
- Supports VMX and OVF configuration formats

**Storage Optimization Note:**
When importing from thick-provisioned sources, run TRIM operations after import to ensure efficient storage utilization.

#### [**VergeOS Clone Utility**](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio)
**Recommended for:** Physical-to-virtual (P2V) and cross-platform migrations

Block-level migration utility for importing physical machines and VMs from various platforms directly into VergeOS with minimal downtime.

**Method Overview:**

- The vergeOS-clone.iso is downloaded from the dashboard
- Source machine is booted with the ISO file
- Options are selected for VM name, MAC address settings, and disks to include
- After efficient block-level data transfer is complete, the VM can be powered on in VergeOS

**Key Features:**

- Physical-to-virtual (P2V) migration support
- Virtual-to-virtual (V2V) migration from any platform
- Block-level data transfer for efficiency

**Storage Optimization Note:**
Block-level clones may require TRIM operations to optimize storage, especially when converting from thick-provisioned sources.

## Supported File Formats

VergeOS supports a wide range of VM file formats:

| Format | Source Platform | Description |
|--------|----------------|-------------|
| **VMX/VMDK** | VMware | Native VMware configuration and disk files |
| **OVF/OVA** | VMware, VirtualBox | Open virtualization standard |
| **VHD/VHDX** | Hyper-V | Microsoft virtualization formats |
| **QCOW/QCOW2** | QEMU, KVM | QEMU copy-on-write formats |
| **VDI** | VirtualBox | VirtualBox disk images |
| **IMG/RAW** | Various | Raw disk image formats |

## Migration Planning Guide

### Pre-Migration Checklist

**Source Environment Preparation:**

- Document VM specifications (CPU, RAM, disk sizes, network settings)
- Remove hypervisor-specific tools (VMware Tools, Hyper-V Integration Services, etc.)
- Ensure VMs are in a clean shutdown state for offline imports
- Verify network connectivity between source and VergeOS environments

**VergeOS Environment Preparation:**

- Verify sufficient storage capacity across appropriate tiers
- Configure network segments to match source environment VLANs
- Plan IP address assignments and DNS configurations
- Review [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility)

**Storage Optimization Readiness:**
- Plan for TRIM operations post-import to reclaim unused space
- Ensure guest OS supports TRIM/Discard operations
- Verify VirtIO drivers are available for optimal storage performance
- Consider temporary increased storage usage during thick-to-thin conversion

### Choosing the Right Method

**Use Cirrus Data Integration when:**

- Enterprise environment requiring near-zero downtime
- Complex multi-platform migrations
- Advanced bandwidth management needed
- Professional migration services preferred

**Use VMware Connector when:**

- Source is a production VMware environment
- Need to minimize downtime during migration
- Importing multiple VMs simultaneously
- Source VMs must remain operational during data migration
- Want to leverage VMware CBT for efficient transfers

**Use Media Images Import when:**

- Migrating from non-VMware platforms (Hyper-V, VirtualBox, KVM, Nutanix)
- Source VMs can be shut down for export
- Working with mixed virtualization environments
- Need maximum control over individual VM imports

**Use NAS Volume Import when:**

- VM files are stored on network-accessible storage
- Need to import many VMs from shared storage
- Working with VMX or OVF files already on NFS/CIFS shares
- Performing batch imports from shared storage

**Use VergeOS Clone Utility when:**

- Migrating physical machines to virtual (P2V)
- Converting VMs from non-VMware platforms (V2V)
- Need block-level migration efficiency
- Working with individual machines that aren't downtime sensitive

## Post-Import Optimization

### Essential Steps After Migration

1. **Install VirtIO Drivers**
   - Windows: Install virtio-win guest tools for optimal performance
   - Linux: Most distributions include native VirtIO support

2. **Network Configuration**
   - Verify network connectivity and IP assignments
   - Update DNS and DHCP reservations as needed
   - Test inter-VM communication

3. **Storage Optimization and TRIM Configuration**
   - Enable Discard on all virtual drives if not already enabled
   - Run initial TRIM operation to reclaim unused space from thick-provisioned sources
   - Configure automatic TRIM scheduling in guest OS
   - Monitor vSAN space reclamation in VergeOS dashboard
   - Consider migrating disks to appropriate storage tiers based on performance needs

4. **Security and Monitoring**
   - Enable QEMU Guest Agent for enhanced monitoring
   - Configure backup policies using VergeOS snapshots
   - Update guest OS and applications to latest versions

### Storage Optimization After Import

#### TRIM/Discard Configuration for Imported VMs

After importing VMs from other hypervisors, storage efficiency may be impacted if the source VMs were thick-provisioned. The free space inside the VM may not match what VergeOS reports due to unused blocks not being properly marked. To optimize storage utilization:

1. **Enable Discard on Virtual Drives**
   - Navigate to the imported VM's dashboard
   - Go to **Drives** and edit each virtual drive
   - Ensure **Discard** is enabled (default setting)
   - Verify drives are using **virtIO-SCSI** or **SATA** interface
   - Confirm drives are assigned to a **Solid State Tier** (typically tiers 1-3)

2. **Perform Initial TRIM Operation**
   
   **For Windows VMs:**
   ```powershell
   # Run as Administrator in PowerShell
   Optimize-Volume -DriveLetter C -ReTrim -Verbose
   
   # For additional drives
   Optimize-Volume -DriveLetter D -ReTrim -Verbose
   
   # Check if TRIM is enabled
   fsutil behavior query disabledeletenotify
   
   # Enable TRIM if needed (if value shows 1)
   fsutil behavior set disabledeletenotify 0
   ```
   
   **For Linux VMs:**
   ```bash
   # Run as root or with sudo
   sudo fstrim -av
   
   # Check TRIM timer status
   sudo systemctl status fstrim.timer
   
   # Check TRIM service status
   sudo systemctl status fstrim
   ```

3. **Configure Automatic TRIM**
   - **Windows**: TRIM typically runs automatically via Storage Optimizer
   - **Linux**: Enable automatic TRIM with:
     ```bash
     sudo systemctl enable fstrim.timer
     ```

!!! info "Storage Reclamation Benefits"
    Enabling TRIM/Discard ensures that deleted files immediately free up vSAN storage, maintaining accurate space reporting and optimal performance. This is especially important for VMs imported from thick-provisioned sources. As TRIM operations progress, you can watch the reported free space in the VergeOS dashboard increase as unused data is reclaimed.

!!! warning "Storage Space Discrepancies After Import"
    If the free space shown in VergeOS doesn't match what's available inside the VM after import:
    - This typically occurs with thick-provisioned source VMs
    - Ensure Discard is enabled on the virtual drives
    - Perform a manual TRIM operation from within the guest OS
    - Allow time for vSAN to process and reclaim the freed space
    - Monitor the VergeOS dashboard to verify space reclamation

## Best Practices and Tips

### Performance Optimization

- **Use VirtIO interfaces** whenever possible for best performance
- **Start with SATA/IDE interfaces** if experiencing boot issues, then migrate to VirtIO after driver installation
- **Preserve MAC addresses** during import to avoid network reconfiguration
- **Enable Discard** on all virtual drives for optimal storage efficiency
- **Schedule regular TRIM operations** for VMs with high file churn

### Post-Migration Optimization Planning

- Schedule TRIM operations for all imported VMs within the first 24 hours
- Plan for temporary increased storage usage during migration (thick to thin conversion)
- Prepare VirtIO driver installation media for Windows VMs
- Document pre and post-migration storage usage for capacity planning

### Troubleshooting Common Issues

**Boot Problems:**

- Try changing disk interface from VirtIO-SCSI to SATA or IDE
- Install VirtIO drivers, then switch back to VirtIO-SCSI
- Verify EFI/BIOS settings match source VM configuration

**Network Issues:**

- Check if VirtIO network drivers are installed
- Verify VLAN and network segment configurations
- Confirm MAC address preservation settings

**Performance Issues:**

- Ensure VirtIO drivers are installed and updated
- Verify adequate resource allocation (CPU, RAM)
- Consider storage tier placement for disk-intensive workloads
- Check that Discard is enabled for proper storage optimization

**Storage Issues:**

- Run TRIM operations if storage usage seems excessive
- Verify Discard is enabled on all virtual drives
- Check that drives are on appropriate storage tiers (SSD for TRIM)
- Monitor vSAN dashboard for space reclamation progress

## Migration Resources

### Documentation Links
- [Viewing Import Jobs](/product-guide/virtual-machines/view-import-jobs) - Monitor and track import progress
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices) - Comprehensive optimization guide
- [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) - Supported operating systems
- [Virtual Drive TRIM](/knowledge-base/virtual-drive-trim) - Detailed TRIM configuration guide

### Tools and Integrations
- [Cirrus Data Migration Platform](/product-guide/tools-integrations/cirrus-data) - Enterprise migration solutions
- [Terraform Provider](/product-guide/tools-integrations/terraform-provider) - Infrastructure as code for automated deployments

!!! success "Migration Success Tips"
    - **Start with a pilot migration** of non-critical VMs to validate the process
    - **Plan for adequate bandwidth** especially for large VM imports
    - **Schedule migration windows** to minimize business impact
    - **Test thoroughly** before decommissioning source infrastructure
    - **Run TRIM operations** immediately after import to optimize storage
    - **Monitor storage usage** before and after TRIM to verify space reclamation

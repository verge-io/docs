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

**Additional Resources:**
- [VMware Backup DR Guide](/knowledge-base/vmwarebackupdrguide)

- [Importing VMs from VMware Service Backup Jobs](/product-guide/virtual-machines/import-from-vmware)

#### [**Import from Uploaded File**](/product-guide/virtual-machines/import-from-upload)

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

3. **Storage Optimization**
   - Migrate disks to appropriate storage tiers if needed
   - Consider enabling disk compression for space efficiency

4. **Security and Monitoring**
   - Enable QEMU Guest Agent for enhanced monitoring
   - Configure backup policies using VergeOS snapshots
   - Update guest OS and applications to latest versions

## Best Practices and Tips

### Performance Optimization

- **Use VirtIO interfaces** whenever possible for best performance
- **Start with SATA/IDE interfaces** if experiencing boot issues, then migrate to VirtIO after driver installation
- **Preserve MAC addresses** during import to avoid network reconfiguration

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

## Migration Resources

### Documentation Links
- [Viewing Import Jobs](/product-guide/virtual-machines/view-import-jobs) - Monitor and track import progress
- [VM Best Practices](/product-guide/virtual-machines/vm-best-practices) - Comprehensive optimization guide
- [Guest OS Compatibility](/product-guide/virtual-machines/guest-os-compatibility) - Supported operating systems

### Tools and Integrations
- [Cirrus Data Migration Platform](/product-guide/tools-integrations/cirrus-data) - Enterprise migration solutions
- [Terraform Provider](/product-guide/tools-integrations/terraform-provider) - Infrastructure as code for automated deployments

!!! success "Migration Success Tips"
    - **Start with a pilot migration** of non-critical VMs to validate the process
    - **Plan for adequate bandwidth** especially for large VM imports
    - **Schedule migration windows** to minimize business impact
    - **Test thoroughly** before decommissioning source infrastructure

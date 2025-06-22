# Importing Virtual Machines - Overview

VergeOS offers flexible options for importing workloads from other systems, including tools for bulk migrations and support for import from media images (e.g. VMDK/VHD/VHDX, OVF/OVA, VMX, QCOW2 etc.). Virtual machines can be transferred directly into the environment, allowing upload and configuration manually or through automated tools. This versatility makes it easy to transition from other platforms while maintaining control and continuity.

The following guide outlines various options available for importing existing workloads into VergeOS. 

!!! tip "Cirrus Data Integration with VergeOS"
     Cirrus Data - a leader in enterprise data migration - has included VergeOS integration in their *Compute Migration* and *MigrateOps* products, enabling zero downtime import of physical or virtual machines into VergeOS from any platform.  [Learn More…](/product-guide/tools-integrations/cirrus-data)


## VergeOS VMware Connector

**Recommended for:** Small to large VMware production environments

### Method Overview

* A full backup of source virtual machines into VergeOS is performed using the VMware connector  
* Incremental backups are then performed to capture only the changes, leveraging VMware’s Change Block Tracking (CBT) for efficient transfer.
* Once the incremental backup duration stabilizes, indicating minimal ongoing data churn, the system is considered ready for cutover with minimal downtime.

### More Information

* [VMware Backup DR Guide ](/knowledge-base/vmwarebackupdrguide)
* [Importing VMs from VMware Service Backup Jobs](/product-guide/virtual-machines/import-from-vmware)

---

## Upload from Media Images

**Recommended for:** Individual VMs

### Method Overview

* Disk image files are uploaded to the vSAN (VergeFS)
* VM configuration files (e.g. *vmx*/*ovf*) are uploaded   
**-OR-**
* The VM definition is created in VergeOS and VM disk(s) are created using the uploaded disk file(s).

### More Information

[Importing VMs from Uploaded Images](/product-guide/virtual-machines/import-from-upload)


---

## NAS Volume Import

**Recommended for:** Small to large batch imports, non-VMware VMs

### Method Overview
* A NAS service is established within your VergeOS system
* A remote volume is created to mount the external storage source
* New VMs are created, selecting the *--Import from Volume--* option
* Progress is monitored from the Import Jobs dashboard.


### More Information

[Importing VMs from a NAS Volume](/product-guide/virtual-machines/import-from-nas)

---

## VergeOS Clone Utility

**Recommended for:** Individual non-VMware VMs and physical machines (P2V and V2V migrations)  

### Method Overview
* The vergeOS-clone.iso is downloaded from the dashboard
* Source machine is booted with the ISO file
* Options are selected for VM name, MAC address settings, and disks to include
* After efficient block-level data transfer is complete, the VM can be powered on in VergeOS

### More Information

[Importing Physical/Virtual Machines using the VergeOS Clone Utility](/knowledge-base/importing-a-physicalvirtual-machine-into-vergeio)




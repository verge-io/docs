
# VM Import Methods

Multiple methods are available for importing existing VMs into VergeOS:

- [**From Media Images**](/product-guide/virtual-machines/import-from-upload)
To import one VM at a time; requires the upload of VM media files (*.vmx,*.vhd(x), *.qcow,*.etc.) to the vSAN.

- [**From a VMware Service Backup Job**](/product-guide/virtual-machines/import-from-vmware)
Data is accessed using the **VMware agent** for direct connection (independent of storage hardware). This is the best method for importing multiple VMs from a running, production VMware environment.

- [**From a NAS Volume**](/product-guide/virtual-machines/import-from-nas)
Data is pulled from **CIFS or NFS share** accessing existing VM data storage.

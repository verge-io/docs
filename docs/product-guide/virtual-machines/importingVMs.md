

# VM Import Methods

Multiple methods are available for importing existing VMs into VergeOS:

<br>

- [**From Media Images**](/product-guide/importfromupload)
To import one VM at a time; requires the upload of VM media files (*.vmx, *.vhd(x), *.qcow, *.etc.) to the vSAN.
<br>

- [**From a VMware Service Backup Job**](/product-guide/importvmware)
Data is accessed using the **VMware agent** for direct connection (independent of storage hardware). This is the best method for importing multiple VMs from a running, production VMware environment.
<br>
- [**From a NAS Volume**](/product-guide/importfromNAS)
Data is pulled from **CIFS or NFS share** accessing existing VM data storage.
<br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
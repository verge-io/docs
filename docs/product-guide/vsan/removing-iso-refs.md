# Removing ISO Files with References

ISO files that are currently referenced (loaded on a VM's CD-ROM drive) cannot be deleted until those references are removed.  

The error: **Media Image: field 'references' must be empty to delete.** will appear when a file delete operation fails because there are current references to that file. 

## View Existing References of an ISO File

1. From the Main Dashboard, click **Media Images** on the left menu.
2. Click to **select the desired ISO file.**
3. Click **View References** on the left menu.
A listing page will appear to display CD-ROM drives referencing this ISO. Individual entries can be clicked to access the Edit form, from which the Media File can be modified to select a different ISO if desired. The directions below provide steps to delete all ISO references at once.

## Remove All References of an ISO File

1. From the Main Dashboard, click **Media Images** on the left menu.
2. Click **Remove References** on the left menu.
3. Click **Yes** to confirm deleting references.
When all references are removed, the ISO file can be deleted from the vSAN using the *Delete* option on the left menu.
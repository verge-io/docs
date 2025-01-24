# System Diagnostics

Built-in feature to build a diagnostics file with all log information from all nodes that are up at that point in time.

Maybe all the information is already available but building the file just grabs everything and puts it into a tar.gz?

Allows for compiling all these logs to download and/or send to VergeIO for analysis

## Build a Diagnostics File

Navigate to **System > Diagnostics**
Click **Build** on the left menu.
Log/System data is retrieved from all online nodes in your system.  Depending on the number of nodes and size of the logs, this build may take a few to several minutes or more. 


Status Info field will indicate how many nodes have been retreived. progress info % done
When building is done successfully, will show complete in the status


the file can be directly sent to VergeOS support (with Internet connected systems)
-or-
downloaded and sent via alternative methods for airgap systems.

Considerations?
vsan usage
performance hit while you run it


Troubleshooting





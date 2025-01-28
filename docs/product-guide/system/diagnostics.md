# System Diagnostics

Built-in feature to build a diagnostics file with all log information from all nodes that are up at that point in time.
comprehensive diagnostic/troubleshooting information about configuration and state of the system

???
what is not included
common items to diagnose easily with this file?
when do logs get archived, compressed? tr2 has Feb 16, 2022; Oct 19, 2021; Aug 24, 2021

do the boot/install-settings only reflect what was initially installed? or do they correlate to the current settings?
good way to get information without having to run command line items?
additional files because of current controller?
read journal file?
sysstat files?


instructions for finding/viewing a tenant

Maybe all the information is already available but building the file just grabs everything and puts it into a tar.gz?

Allows for compiling all these logs to download and/or send to VergeIO for analysis

## Build a Diagnostics File

Navigate to **System** > **System Diagnostics**
Click **Build** on the left menu.
Log/System data is retrieved from all online nodes in your system.  Depending on the number of nodes and size of the logs, this build may take a few to several minutes or more. 


specific times for system events - such as node reboots, vm and network migrations, configuration changes, updates, etc.

help to diagnose/troubleshoot a problem, help to determine precise timing and order of events to analyze incidents and behavior



Status Info field will indicate how many nodes have been retreived. progress info % done
When building is done successfully, will show complete in the status


the file can be directly sent to VergeOS support (with Internet connected systems)
-or-
downloaded and sent via alternative methods for airgap systems.

Considerations?
vsan usage
performance hit while you run it


Troubleshooting



Contents

    each node
        boot
            ybos-version.txt
            vsan-options.txt
            network-config.txt physical networks (macs, mtus, nic names, switch names, multicast and addresses, switch db key?)
            install-settings.txt boot partitions, cloud name, cluster swap settings, domaainname, drive list
        container_logs
            tenant folder (each by id#)
                container_name.txt
                syslog
            vnet (each by id#)
        Journal
            journal file 
        kernel_logs
            "no files found" 0 byte file is the default
        lsblk
            txt file for each drive (ex: nvmeon1.txt, sdd.txt) 
        network
            arp.txt
            bridgefdb.txt
            bridgevlan.txt
            ifconfig.txt
            ipaddr.txt
            iproute.txt
            lldpneighbors.txt
            nicinfo.txt
            ybfabric.txt  
        proc
            cpuinfo.txt
            diskstats.txt
            interrupts.txt
            meminfo.txt
            stat.txt
            version.txt
            vmstat.txt

        smart
            txt file for each drive (ex: nvmeon1.txt, sdd.txt)

        sysstat

        Tenant_Logs


        vsan
            cacheinfo.txt
            currentmaster.txt
            deviceinteg.txt
            devicestatus.txt
            deviceusage.txt
            fuseinfo.txt
            getclients.txt
            getfhlist-w.txt
            getfhlist.txt
            journalstatus.txt
            nodeinfo.txt
            repairstatus.txt
            runningconf.txt
            serverlist.txt
            synclist.txt
            tierdevmaps.txt


only run one at a time
name and Description recommended, but optional - if no name, it will just name it $SystemName_diags_date
cannot be cancelled once it is in progress

you can change name and description and choose to send to support on edit

files are read-only, of course

status info will indicate when a report was sent to support

is the name/description sent to support too?


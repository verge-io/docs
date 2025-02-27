# System Diagnostics

?s
name/description stored in file?
vsan usage? as big as the file is or deduplication?
how much of an impact can it have on performance?
can the file maybe ever be too large to email?
why don't we have option to send directly to support anymore?
anything different about running this in tenant?  any special considerations, etc.?
any considerations about sending to VergeOS support?  should we have warning before they send?  Do we like them to name the file anything in particular? how do we receive this information - is it easy for us to miss this if the customer doesn't tell us they are running/sending?

!!! info "System Diagnostics - Key Points"
Generating a *System Diagnostics* file allows you to quickly and easily gather comprehensive information about your VergeOS system into a single compressed file.
A System Diagnostics file contains all logs, configuration information, state data, and other metrics that can be utilized by Verge.io support or other experienced engineers for analyzing and troubleshooting.  
A System Diagnostics file can be directly sent to Verge.io Support. It can also be downloaded for manual delivery or local inspection.

## When to Run System Diagnostics

Often will be asked to by support team
gather comprehensive information
can provide a baseline when we are trying different things to address a tricky issue, ex run one before making a signficant change and then again after the change is in place so that they can be compared.

!!! warning "Preformance Considerations"
- can affect performance
- each stored system diagnostic does consume storage

## Steps to Generate a System Diagnostics File

1. Navigate to **System** > **System Diagnostics**
2. Click **Build** on the left menu.
3. Optionally, a name and description can be provided for the diagnostic build.  When a name is not entered, the system will auto-generate a name with format: SYSTEMNAME_diags_yyyymmdd_hhmmss.  Name and Description can also be edited after the system diagnostic file is generated.
4. If you are working with Verge.io Support and your system has internet connectivity, you can select the option to "Send 
!!! info "Sending a System Diagnostics File to VergeOS Support"

when build or edit select the checkbox to "Send diagnostic information to Verge.io support".

For airgapped systems or otherwise unable to reach the internet, select the diagnostic file and click Download.  When the file has finished downloading, email to support@verge.io?  what if the file is too large??

4. Click **Submit** to generate.
Log/System data is retrieved from all online nodes in your system.  Depending on the number of nodes and size of the logs, this build may take a few to several minutes or more.  Status will display "Building" while it is generating and "Complete" when the diagnostics file is finished building.




how big can these files be?

when you are sure you have it downloaded?
when you are sure it has been received by support?
how many should i keep at a time?  or is it purely about space needed?

## General Best Practices/Warnings/Tips/considerations etc
run during low usage times or otherwise when necessary - can impact system peformance


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





Status Info field will indicate how many nodes have been retreived. progress info % done
When building is done successfully, will show complete in the status  Nodes reporting and compressing archive and adding archive to system

the file can be directly sent to VergeOS support (with Internet connected systems)
-or-
downloaded and sent via alternative methods for airgap systems.

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

download and save to an alternate location when possible?  

Security of the file (sensitive information?)

you can change name and description and choose to send to support on edit

files are read-only, of course

status info will indicate when a report was sent to support

is the name/description sent to support too?


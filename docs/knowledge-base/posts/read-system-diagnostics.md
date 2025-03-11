---
title: Reading a System Diagnostics File File Inspection
slug: read-system-diagnostics
description: Guide for using a System Diagnostics file for troubleshooting issues
draft: false
date: 2025-02-21T15:26:24.755Z
tags:
 - system
 - troubleshooting
 - logs
 - hardware
 - diagnosis
categories:
  - Troubleshooting
editor: markdown
dateCreated: 2024-09-09T14:38:43.388Z
---


# Using a System Diagnostics File

!!! info "Key Points"
      - [Product Guide - System Diagnostics](/product-guide/system/diagnostics) provides fundamental information and instructions for generating a System Diagnostics file.
      - Sending this file to VergeOS Support can often help them efficiently troubleshoot an issue.
      - This guide is provided for customers that may also choose to inspect their own System Diagnostic files to gather information.

## Basic Information/Key Information Locations

System Diagnostics files are named with the name format: *SYSTEMNAME*_diags_YYYMMDD_hhmmss.tar.gz

Information is organized per node (only nodes that are powered on and not in maint mode??) reminder that node1/node2 are controller nodes

Each node contains node-specific information:
    - what extra stuff on node1 or maybe cover just generally that it contains more information
    - smart - physical drive metrics -- not applicable to tenants?
    - network utility results
    - lsblk - storage information - applicable  when run inside of tenant?
  - lsblk - list block devices gather structural and descriptive info abut block devices. at the os level, logical view of storage. 
SMART - drive-level, physical, focusing on health, reliability, and potential failure of drives - such as reallocated sectors, temperature, power_on hours, etc. 
Brainstorm: Disk health, errors, failures, temperature, lifespan, wear leveling, drive internals.
Purpose: To monitor the health and reliability of individual physical drives. Think of it like a health check-up for your drives at a hardware/physical level.
    - vsan - results of vsan tools/commands/utilities
        these results seem to be the same on every node (other than the controller)?
        reason to have them on each node?  could they be different per?
    - proc - low level linux commands
    - network - linux commands and ybfabric.txt?
    - kernel_logs
    - journal - system logs in binary format, structured data storage. journalctl utility is used to read logs in this format.  system logs can also be read with standard text editors from the folder.
    - container_logs
    - boot - info
    - yottabyte-boot.log - a subset of the system logs?  logs while system is booting, before system log events kick in? what's different between boot-syslog and yottabyte-boot.log??
    - archived system logs revolving - keeps 3 in .tgz format - they are archived when a system is shutdown/rebooted?
    - containerslist.txt will show you the tenant id_tenantnode# = tenant name
    - finished - 0 byte file just shows that the process actually completed for the node??
  
- container folders ("container_logs") with a subfolder for each diff container on the node, each folder "container_name.txt" and syslog  -- is this the journal for the tenant?  Is this a bug where the file is always called "container_name.txt" instead of the tenant name??
- each node has kernel_logs --- normally will have a 0byte file named "no files found".  If there is something else there this means there is a kernel issue??  examples?  
- vsan folder contains over a dozen vsan diagnostics results that all can be obtained in vsan diagnostics?  
- 3 recent log files archived --- saved at system reboots?
- yottabyte-boot.log
- Aaa84AD45

## Basic Diagnostic Tips

### Kernel Logs

Kernel logs can be crucial for serious issues.  Kernel logs are typically empty, but should be the first place to check when troubleshooting a crash.

### Tenant-related

node 1 - Tenant_Logs - all tenants, by ID/db/_eachnode/syslog.xz/syslog -- why separate folder, and then log file? just startup logs?

- Search for tenant name to find the tenant_ID that can be used to locate applicable log folder within *container_logs*
 /CONTROLLERNODE/Tenant_Logs
 - each tenant has a subfolder (tenant id#)
 - 
- container_logs:
  Tenants are commonly comprised of multiple tenant nodes running across multiple physical nodes. The last digit of the tenant log folder denotes the node number, for example: "tenant_17_1" would be the logs for tenant node 1 of tenant ID 17.



Storage Physical drives
SMART info

### Virtual Wire Configuration


### GPUs


### Resource Issue



## General Best Practices/Warnings/Tips/considerations etc
run during low usage times or otherwise when necessary - can impact system peformance

instructions for finding/viewing a tenant - search for tenant name first - across all files/folders. Then you get the tenant id, for example "tenant_17_1"  -- why are there 2 numbers for tenant id?


Maybe all the information is already available but building the file just grabs everything and puts it into a tar.gz?

Allows for compiling all these logs to download and/or send to VergeIO for analysis


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


download and save to an alternate location when possible?  

Security of the file (sensitive information?)

you can change name and description and choose to send to support on edit

files are read-only, of course

status info will indicate when a report was sent to support

is the name/description sent to support too?


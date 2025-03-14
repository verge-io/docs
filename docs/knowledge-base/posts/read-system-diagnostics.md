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

- test node in maint



# Using a System Diagnostics File

!!! info "Key Points"
      - [Product Guide - System Diagnostics](/product-guide/system/diagnostics) provides fundamental information and instructions for generating a System Diagnostics file.
      - This feature was developed for easily sending comprehensive system information to VergeOS Support to allow them to efficiently troubleshoot an issue.
      - This guide is provided for customers that may also choose to inspect their own System Diagnostic files to gather information.
      - Information available in a System Diagnostics is typically easier to gather from within the VergeOS UI. 

## Basic Information/Key Information Locations

System Diagnostics files are named with the name format: *SYSTEMNAME*_diags_YYYMMDD_hhmmss.tar.gz

Information is organized per node (only nodes that are powered on and not in maint mode??) reminder that node1/node2 are controller nodes

Each node contains node-specific information:
    - what extra stuff on node1 or maybe cover just generally that it contains more information
    - smart - physical drive metrics -- not applicable to tenants?
    - network utility results
    - lsblk - storage information - applicable  when run inside of tenant?
  - lsblk - list block devices gather structural and descriptive info abut block devices. at the os level, logical view of storage. 

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

## Troubleshooting Tips

## Appserver/vSAN

- "Out to lunch" indicates appserver unresponsiveness (typically 6+ seconds)


### Kernel Logs

Kernel logs can be crucial for serious issues.  Kernel logs are typically empty, but should be the first place to check when troubleshooting a system or node crash.  Kernel log entries are also available within system logs

Memory constraints can cause crashes if running above watermark.


### Tenants

Gather information about specific tenants, such as where (i.e. which host node) a tenant node is running, events, errors, etc.

- Tenant node logs are located in container_logs for the physical node where running (/[PHYSICAL_NODE]/*container_logs*/*tenant_*[TENANTID]*_[TENANTNODENUMBER]) for example: 
folder: /node4/tenant_8_2 contains the tenant name and system log for tenant id 8 node 2 running on physical node 4.

- The Current Controller node (typically node1) also includes the *Tenant_Logs* folder containing tenant node logs.  
Examples:
/node1/Tenant_Logs/19/db/_node1 : logs for the first node of tenant id 19
/node1/Tenant_Logs/8/db/_node3 : logs for the third node of tenant id 8


## Physical Drives

- the */smart* subfolders contain a report for each detected physical drive device reporting health, reliability, and potential failure.  Reported metrics include reallocated sectors, temperature, power_on hours, wear-leveling, etc.

S.M.A.R.T query reports can also be run for individual drives, from within the UI: navigating to tier dashboard, click Drives
- Reallocated_Sector_Ct: Indicates the number of bad sectors that have been replaced with spare sectors. A high value here is a red flag.

Reserve_Block_Count: Shows the number of spare blocks remaining. A low value suggests the SSD is running out of spare blocks.

Wear_Leveling_Count: Reflects the wear on the SSD's memory cells. A value of 0 means the drive is at the end of its lifespan.

This is just an example, and actual SMART reports may vary depending on the tool or software used. If you’re analyzing a real SMART report, focus on attributes marked as "Pre-fail" or "FAILING_NOW" to assess the drive's health.

Yes, it’s possible for a SMART report to fail in recognizing issues with a drive. While SMART is a useful tool for monitoring drive health, it has limitations:

Undetected Failures: Not all types of failures are monitored by SMART. For instance, sudden electronic failures or firmware issues might not generate any SMART warnings beforehand.

Threshold-Based Alerts: SMART attributes rely on predefined thresholds. Some failures may occur before the threshold is crossed, meaning the drive appears "healthy" in the report.

Non-Comprehensive Data: A SMART report depends on the drive's built-in sensors and firmware. If these components are faulty or not well-implemented, issues may go unnoticed.

Intermittent Failures: Drives can sometimes exhibit symptoms like slow performance or occasional errors that don’t trigger SMART warnings but still indicate underlying problems.

Tool/Software Limitations: Some tools used to generate SMART reports may not fully interpret the data provided by the drive, leading to incomplete or misleading results.

For this reason, it's important to combine SMART data with other diagnostics, such as:

Running manufacturer-specific diagnostic tools.


### GPUs/Device Passthrough

- Direct GPU passthrough and vGPU require the same BIOS settings. Further information about Configuring GPU passthrough can be found in the [Device Passthrough section of the Product Guide](/docs/product-guide/system/device-pass-overview.md). 
- The VFIO driver needs to load before the NVIDIA driver is loaded. 
- check lspci.txt in corresponding node folder to verify correct driver (VFIO-PCI) is loaded. 
- Oversubscription of GPU resources can occur when multiple teams involved, particularly if manual API overrides used to bypass resource protection.  Manual API overrides can bypass resource protection 
- Search ***"Module VFIO PCI"*** to locate system log entries pertaining to GPUs/passthrough
- Search ***"GPU requested"*** for vGPU/GPU troubleshooting 


### Networking

The *container_logs* folder shows DMZ, core network and external network logs (vnet folders)
network diagnostics

#### Virtual Wire Configuration
Virtual wires, used to bring layer 2 access into a tenant, rely on the external network and tenant network to be running on the same physical node.  Problems can sometimes arise during updates or other maintenance windows when networks are migrated. 



## General Best Practices/Warnings/Tips/considerations etc
run during low usage times when possible - can impact system peformance
hardware problems could be exaserbated?



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

 





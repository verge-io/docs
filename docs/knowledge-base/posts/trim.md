---
title: Virtual Drive TRIM
slug: virtual-drive-trim
description: How to regain space on a virtual SSD
draft: false
date: 2023-01-24T14:15:07.757Z
tags: disk management, trim, discard, storage, vsan, disk performance, disk
categories:
  - VM
editor: markdown
dateCreated: 2022-05-18T21:40:52.344Z
---

## How to TRIM your drives

After importing a virtual machine from another hypervisor, sometimes the free space available inside the virtual machine does not match the free space reported to the VergeOS platform. This is likely the result of the virtual disk being thick provisioned from the VM source and the VergeOS hypervisor is unaware of the blank (unused) portion of the disk in terms of size. To correct this, a TRIM/UNMAP operation needs to be run on the virtual disk from within the virtual machine.

## Prerequisites for running a trim command

1. Edit the virtual drive(s) in question in the VergeOS UI and ensure 'Discard' is enabled
1. Ensure the virtual drive(s) is using a drive type of virtIO-SCSI or SATA
1. Ensure the virtual drive(s) is assigned to a Solid State tier (usually tier 1-3)

## Trimming a Windows Drive
To perform a manual TRIM operation in a Windows environment, perform the following steps:

1. Launch Powershell as an admin user
1. From the powershell prompt, type the following command:
`Optimize-Volume -DriveLetter YourDriveLetter -ReTrim -Verbose`
   Sample syntax:
	 `Optimize-Volume -DriveLetter E -ReTrim -Verbose`
1. Press enter and wait while the command completes.

As the TRIM operation is progressing, administrators can watch the reported free space from the VergeOS dashboard begin to increase as the blank data on the volume is removed.

If this does not resolve the issue, then trim is not enabled. To fix this, do the following from a command prompt (and then rerun the trim commands).

To check if trim is not enabled run an FSUTIL command: 
`Fsutil behavior query disabledeletenotify`
If the value is _1_ then trim is not enabled on this drive.

To set the trim option
``` Fsutil behavior set disabledeletenotify 0 ```
<br>
## Trimming a Linux Drive
Newer Linux distros have trim enabled by default using a systemd service or a cron job. You can check if automated TRIM is enabled by doing the following.

***Ensure the prerequisite steps from above are complete***

Example: Ubuntu Server
1. Launch a terminal
1. Enter the following commands to check status
1. Check trim Timer/Schedule Status
``` sudo systemctl status fstrim.time ```
1. Check Trim Status
``` sudo systemctl status ```

If trim is enabled an operation will run on the next scheduled time based from the above commands.

If trim is not enabled a manual trim can be run from the terminal using ``` fstrim -av ```.

> It is recommended you enable the automatic trim option to ensure data usage is reflected accurately between VergeOS and the guest OS.
{.is-info}


To enable auto trim run ``` sudo systemctl enable fstrim.time ``` from the terminal.

For more information on fstrim you can visit the man page [here](https://man7.org/linux/man-pages/man8/fstrim.8.html).

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
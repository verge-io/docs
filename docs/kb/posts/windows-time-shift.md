---
title: Windows - Time Shift
slug: windows--time-shift
description: 
published: true
date: 2023-01-24T14:20:54.833Z
tags: windows, time, ntp, utc, dst, drift
categories:
  - Troubleshooting
  - VM
editor: markdown
dateCreated: 2022-10-12T14:45:26.462Z
---

## Description of The Issue
VergeOS Virtual Machines (VMs) running **Windows OS** may experience ‘**time shift**’ where the guest OS will periodically adjust the time to an incorrect value. This is caused by the Windows OS, which is expecting time from the physical motherboard to be in local time (**RTC**) instead of Coordinated Universal Time (**UTC**).

VergeOS provides time in **UTC**, which has become the industry standard as it compensates for Daylight Saving Time (**DST**) changes. The guest OS will automatically adjust the time when comparing its clock value against an authoritative time source because it assumes the time provided by the hardware is local instead of UTC. This comparison causes periodic discrepancies because the guest OS is unable to adjust the physical node clock to match what it perceives as the correct time.

### VergeOS Configuration Option: RTC Base

RTC Base is an individual VM setting that allows VergeOS administrators to set the time provided to the OS as either local or UTC. The value can be found when editing any VM.

![rtcbase-utc-screenshot.png](/public/rtcbase-utc-screenshot.png)

With this configuration setting, administrators can granularly control every machine, though it is important to understand the expected behavior of each option. 

### Local Time
Setting **RTC Base** to **Local Time** will pass the time from the physical nodes to the virtual guest OS. This emulates the legacy behavior which Windows expects. When Windows compares the local time clock against an authoritative time service, Windows will adjust the time within the guest OS based on the time zone defined in the Windows configuration. This can result in unexpected behavior.  
Things to consider with local time are:
- The physical node time zone will be presented the same to any guest OS.  If VergeOS is hosting VMs for different time zones, each Windows VM will perceive local time as the same value.
- The physical node time and the guest OS will require proper configuration to avoid issues when Daylight Saving Time (DST) starts or stops each year.  RTC clocks will need to be adjusted through software.  Historically, issues have arisen when guidelines for DST have changed.

### UTC Time
Setting RTC Base to UTC will pass the time from physical nodes into guest VMs as coordinated universal time.  This is the industry standard for modern software applications that handle time.
When using the UTC setting in VergeOS, Windows VMs should be configured to recognize that time is presented as universal. For most Windows operating systems, the adjustment is made in the Windows Registry by adding a value to recognize “RealTimeIsUniversal”.  

- For 64-Bit Operating Systems
Under the registry key HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\TimeZoneInformation, there needs to be a REG_QWORD entry  with the following values:
	- Name: RealTimeIsUniversal
	- Value data: 1

After adjusting this setting, administrators will need to completely ‘Power Off’ the VM and then ‘Power On’ the VM before the change takes effect.

> **NOTE:** When making software adjustments to guest OS or applications, administrators should check with production documentation for that software, including latest KB articles, updates, and release notes.
{.is-info}

<br>

### Additional Reading on this Topic
- [https://www.meinbergglobal.com/english/sw/ntp.htm](https://www.meinbergglobal.com/english/sw/ntp.htm) can be installed and set to get time from any of the servers listed at [https://tf.nist.gov/tf-cgi/servers.cgi](https://tf.nist.gov/tf-cgi/servers.cgi). Meinberg NTP software can be set to correct time hourly, daily, weekly, etc. This will allow you to "set it and forget it".
<br>
- Additional information about the history of this issue, including chronology of changes in Windows, can be found here: [https://www.cl.cam.ac.uk/~mgk25/mswish/ut-rtc.html](https://www.cl.cam.ac.uk/~mgk25/mswish/ut-rtc.html)

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-25" style="appearance: button; background-color: #64B5f6; border-radius: 8px; color: #ffffff; padding: 10px 21px;">🢀  Back to Knowledgebase</button></a>   
<a href="https://www.verge.io/test-drive"><button class="button-25" style="appearance: button; background-color: #D9693B; border-radius: 8px; color: #ffffff; padding: 10px 21px;">🚗 Take a Test Drive Today!</button></a>
</div>

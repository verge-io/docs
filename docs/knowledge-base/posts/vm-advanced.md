---
title: VM Advanced Options
slug: vm-advanced-options
description: Guide to configuring advanced VM options for fine-tuning performance, hardware emulation, and device behavior
published: true
date: 2025-07-07T10:30:00.000Z
tags:
 - vm
 - virtual machine
 - advanced options
 - performance
 - optimization
 - smbios
 - cpu
 - memory
 - configuration
 - qemu
 - tuning
categories:
 - Virtual Machines
 - Advanced Configuration
editor: markdown
dateCreated: 2025-07-07T10:30:00.000Z
---

# VM Advanced Options

## Overview

The VM Advanced Options field allows power users to fine-tune virtual machine parameters beyond what's available in the standard UI. These options provide granular control over CPU features, hardware emulation, and device behavior.

!!! warning "Use with Caution"
    Advanced options can significantly impact VM performance and stability. Only modify these settings if you understand their implications. Incorrect values may prevent your VM from starting.

## Format

Advanced options use a simple key-value format, with one option per line:

```
option1=value1
option2=value2
option3=value3
```

## Available Options

### CPU and Memory

#### CPU Threads
```
cpu.threads=2
```
Sets the number of CPU threads per core. Default is 1.

**Use case:** Enabling SMT (Simultaneous Multi-Threading) for applications that benefit from hyperthreading.

#### Memory Pre-allocation
```
mem-prealloc=1
```
Pre-allocates all VM memory at startup instead of allocating on demand.

**Use case:** Reduces memory allocation latency for performance-critical workloads. Useful for real-time applications or when using hugepages.

### SMBIOS Customization

SMBIOS (System Management BIOS) options allow you to customize the hardware information presented to the guest OS.

#### Type 0 - BIOS Information
```
smbios.type0.vendor=American Megatrends Inc.
smbios.type0.version=2.0
smbios.type0.date=01/01/2023
```

#### Type 1 - System Information
```
smbios.type1.product=Custom Server
smbios.type1.version=1.0
smbios.type1.sku=SKU123
smbios.type1.family=Server Family
```

#### Type 2 - Baseboard Information
```
smbios.type2.manufacturer=Custom Manufacturer
smbios.type2.product=Custom Board
smbios.type2.version=1.0
```

#### Type 3 - Enclosure Information
```
smbios.type3.manufacturer=Custom Chassis
smbios.type3.version=1.0
smbios.type3.sku=CHASSIS123
```

#### Type 4 - Processor Information
```
smbios.type4.version=Intel(R) Xeon(R) CPU E5-2680 v4
smbios.type4.manufacturer=Intel
```

**Use cases for SMBIOS:**
- Software licensing that checks hardware signatures
- Applications expecting specific hardware configurations
- Testing scenarios requiring specific system identification

### Network Interface Tuning

For each NIC, you can tune queue parameters using the NIC's asset ID:

```
nic1.txqueuelen=2000
nic1.numtxqueues=4
nic1.numrxqueues=4
```

**Use cases:**
- High-throughput network applications
- Reducing network latency
- Optimizing for specific network workloads

### Machine-Specific Parameters

Customize QEMU machine parameters:

```
machine.cap-cfpc=broken
machine.cap-sbbc=broken
machine.cap-ibs=broken
```

**Use cases:**
- Working around CPU security mitigation issues
- Compatibility with specific guest operating systems
- Performance optimization for trusted environments

### RTC (Real-Time Clock) Options

```
rtc.drift-fix=slew
```

**Use cases:**
- Fixing time drift issues in VMs
- Synchronization requirements for time-sensitive applications

## Device-Specific Options

You can set parameters for any device using its asset ID:

```
device1.guest-reset=true
device1.guest-resets-all=false
```

For drives:
```
drive1.cache=writeback
drive1.detect-zeroes=on
```

## Common Use Cases

### High-Performance Computing
```
cpu.threads=2
mem-prealloc=1
nic1.numtxqueues=8
nic1.numrxqueues=8
```

### Windows Licensing Compliance
```
smbios.type1.manufacturer=Dell Inc.
smbios.type1.product=PowerEdge R740
smbios.type1.serial=ABC123
```

### Network Optimization
```
nic1.txqueuelen=5000
nic1.numtxqueues=4
nic1.numrxqueues=4
```

## Best Practices

!!! tip "Testing Recommendations"
    1. Test advanced options in a non-production environment first
    2. Document any advanced options you use for future reference
    3. Only add options that solve specific problems or requirements
    4. Monitor VM performance after applying advanced options

## Troubleshooting

If your VM fails to start after adding advanced options:

1. Remove all advanced options and try starting the VM
2. Add options back one at a time to identify the problematic setting
3. Check the VM logs for specific error messages
4. Verify the syntax - ensure each option is on its own line with no extra spaces

!!! note "Version Compatibility"
    Some advanced options may not be available on all VergeOS versions. Options are processed dynamically, so unsupported options are typically ignored rather than causing errors.


!!! note "Document Information"
    - Last Updated: 2025-07-07
    - VergeOS Version: 4.13.4

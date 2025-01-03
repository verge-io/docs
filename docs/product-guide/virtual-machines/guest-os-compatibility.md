# VergeOS Guest OS Compatibility

VergeOS provides comprehensive support for x86-64 guest operating systems, encompassing most Windows versions, Linux distributions, and FreeBSD releases. While any x86-64-compatible operating system should work without issues, this guide outlines the most commonly used and tested guest operating systems.

!!! tip "This guide covers commonly used versions. If your desired operating system isn't listed, it may still be compatible. Contact support for verification and assistance."

## Microsoft Windows Support

### Desktop Versions

- Windows 11
- Windows 10
- Windows 8
- Windows 7

### Server Versions

- Windows Server 2022
- Windows Server 2019
- Windows Server 2016
- Windows Server 2012
- Windows Server 2008
- Windows Server 2003

!!! note "VirtIO drivers may need to be installed for optimal performance."

## Linux Distribution Support

### Enterprise Linux

- Red Hat Enterprise Linux (RHEL) 7, 8, 9
- SUSE Linux Enterprise 11, 12, 15
- Oracle Linux 6, 7, 8, 9

### Community Enterprise Linux

- AlmaLinux 8, 9
- Rocky Linux 8, 9
- CentOS 7, 8
- CentOS Stream 8

### Debian-based Distributions

- Debian 8, 9, 10, 11, 11.5, 12
- Ubuntu 12.04, 14.04, 16.04, 18.04, 19.04, 20.04, 22.04, 24.04

### Other Linux Distributions

- Fedora CoreOS 32
- RancherOS v1.5

## FreeBSD Support

- FreeBSD 13
- FreeBSD 12
- FreeBSD 11
- FreeBSD 10
- FreeBSD 9

## Technical Considerations

!!! note "System Architecture"
    - Official support is limited to 64-bit operating systems.
    - 32-bit versions may function with PAE kernel support, but are not officially supported.

!!! note "Hardware Compatibility"
    - Legacy operating systems may require a SATA/IDE disk interface when VirtIO is not supported.
    - Some operating systems may need specialized node hardware based on their specific requirements. Consult the operating system's documentation for detailed hardware compatibility guidelines.

!!! note "Performance Optimization"
    - VirtIO drivers are typically recommended for optimal performance.
    - Newer operating systems generally provide better hardware virtualization support.
    - Consider using supported versions for production environments. VergeOS is compatible with x86-64 guest operating systems and therefore successfully works with most: Windows versions, Linux distributions, and FreeBSD releases.

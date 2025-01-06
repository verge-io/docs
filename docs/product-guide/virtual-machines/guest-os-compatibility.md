# VergeOS Guest OS Compatibility

VergeOS, built on Linux KVM technology, provides extensive compatibility for x86_64 guest operating systems. This includes Windows, Linux distributions, FreeBSD, and virtual appliances designed for KVM environments. While any x86_64-compatible operating system should work without issues, this guide outlines commonly tested configurations.

!!! tip "Virtual Appliances"
    Virtual appliances packaged for KVM environments are fully compatible with VergeOS. This includes OVA/OVF formats from vendors who support KVM-based deployments.

## Microsoft Windows Support

### Windows Desktop Versions

| Version | Recommended Interface | Minimum RAM | Notes |
|---------|---------------------|-------------|--------|
| Windows 11 | VirtIO | 4 GB | Best performance with latest VirtIO drivers |
| Windows 10 | VirtIO | 2 GB | Supports all editions (Home, Pro, Enterprise) |
| Windows 8.1 | VirtIO/IDE | 2 GB | May require legacy hardware support |
| Windows 7 | IDE/SATA | 2 GB | Legacy OS - Limited driver support |

### Windows Server Versions

| Version | Recommended Interface | Minimum RAM | Notes |
|---------|---------------------|-------------|--------|
| Server 2022 | VirtIO | 2 GB | Optimal performance with latest drivers |
| Server 2019 | VirtIO | 2 GB | Supports all roles and features |
| Server 2016 | VirtIO | 2 GB | Recommended for production use |
| Server 2012 R2 | VirtIO/IDE | 2 GB | Extended support ends 2023 |
| Server 2008 R2 | IDE/SATA | 2 GB | Legacy support only |

## Linux Support

### Enterprise Linux Distributions

| Distribution | Versions | Recommended Interface | Minimum RAM | Notes |
|-------------|----------|---------------------|-------------|--------|
| RHEL | 7, 8, 9 | VirtIO | 2 GB | Native VirtIO support |
| SUSE Enterprise | 11, 12, 15 | VirtIO | 2 GB | Built-in driver support |
| Oracle Linux | 6, 7, 8, 9 | VirtIO | 2 GB | UEK kernel recommended |

### Community Enterprise Linux

| Distribution | Versions | Recommended Interface | Minimum RAM | Notes |
|-------------|----------|---------------------|-------------|--------|
| AlmaLinux | 8, 9 | VirtIO | 2 GB | RHEL binary compatible |
| Rocky Linux | 8, 9 | VirtIO | 2 GB | Native driver support |
| CentOS | 7, 8 | VirtIO | 2 GB | Built-in VirtIO support |
| CentOS Stream | 8 | VirtIO | 2 GB | Rolling release model |

### Debian-based Distributions

| Distribution | Versions | Recommended Interface | Minimum RAM | Notes |
|-------------|----------|---------------------|-------------|--------|
| Debian | 8, 9, 10, 11, 12 | VirtIO | 1 GB | Native driver support |
| Ubuntu LTS | 20.04, 22.04, 24.04 | VirtIO | 2 GB | Recommended for production |
| Ubuntu | 12.04 - 19.04 | VirtIO | 1 GB | Older releases - limited support |

### FreeBSD Support

| Version | Support Status | Recommended Interface | Minimum RAM | Notes |
|---------|---------------|---------------------|-------------|--------|
| FreeBSD 13 | Full | VirtIO | 1 GB | Best performance with VirtIO |
| FreeBSD 12 | Full | VirtIO | 1 GB | Production ready |
| FreeBSD 11 | Limited | VirtIO/SATA | 1 GB | Legacy support |
| FreeBSD 10 | Limited | SATA | 1 GB | Basic compatibility |

!!! note "Driver Support"
    For optimal performance, VirtIO drivers are recommended where supported. Windows guests may require additional driver installation, while most modern Linux distributions include native VirtIO support.

!!! info "Additional OS Support"
    While this list represents commonly tested configurations, VergeOS's KVM foundation enables support for virtually any x86_64 operating system or KVM-compatible virtual appliance. Contact support for guidance on specific operating systems or virtual appliances not listed here.

## Technical Considerations

!!! note "System Requirements"
    - RAM requirements vary by operating system and workload
    - Always consult vendor documentation for production sizing
    - Consider additional overhead for virtualization

!!! tip "Storage Interface Options"
    - VirtIO: Modern interface offering best performance (recommended)
    - SATA: Compatible with most operating systems, requires Q35 machine type
    - IDE: Available for legacy operating system support, requires i440FX machine type

!!! warning "Architecture Support"
    - VergeOS supports 64-bit (x86_64) operating systems
    - 32-bit operating systems are not officially supported

!!! info "Performance Optimization"
    - Install and configure VirtIO drivers where supported
    - Windows guests require additional VirtIO driver installation
    - Most modern Linux distributions include VirtIO support
    - Keep guest operating systems and drivers updated

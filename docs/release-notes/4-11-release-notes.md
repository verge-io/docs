---
description: Release notes for the 4.11 series of VergeOS
#icon: material/text-box-outline
status: deprecated
---

# 4.11 Release Notes

!!! info "Series Information"
    - **Initial Release**: February 2023 (4.11.0 Atria)
    - **Latest Version**: 4.11.4.3 (January 2024)
    - **Status**: Supported (Superseded by 4.12)
    - **End-of-Life**: TBD

## Major Features & Themes

### Site Manager & Global Administration

!!! success "Enterprise Management"
    - Integrated global monitoring across all sites
    - Centralized management dashboard
    - Multi-location administration capabilities
    - Top-level statistics with drill-down functionality
    - Cross-site monitoring and operations

### Recipe Marketplace & Self-Service

!!! tip "Deployment Automation"
    - Launch of Recipe Marketplace with dozens of ready-to-use recipes
    - Self-service IT enablement
    - Custom marketplace creation capabilities
    - Server-side cloud-init template rendering
    - Enhanced recipe development tools
    - Dynamic recipe functionality

### Authentication & Access Control

!!! security "Identity Management"
    - OIDC Applications support
    - Centralized login management
    - Streamlined MSP support processes
    - Simplified authentication token management
    - Integration with upstream providers (Google, Azure)
    - Enhanced password management and security

### Infrastructure & Performance

!!! benchmark "System Enhancements"
    - Virtual Machine Export capability
    - TPM 1.2/2.0 Support
    - Improved VM performance
    - Enhanced GPU passthrough support
    - Network optimization and acceleration
    - vSAN performance improvements
    - Support for latest NVIDIA drivers
    - Advanced CPU management features

### Notable Improvements

!!! note "Key Updates"
    - **Virtual Machine Management**:
        - Enhanced VM export functionality
        - Improved VM console performance
        - Advanced VM drive options
        - Optimized VM hibernation
    
    - **Storage & Backup**:
        - Third-party backup solution support
        - Enhanced NAS functionality
        - Improved snapshot management
        - Cloud snapshot enhancements
    
    - **Networking**:
        - 25% faster network migrations
        - Enhanced firewall rule management
        - Improved network diagnostics
        - Advanced VXLAN configuration
    
    - **Security & System**:
        - Offline license support
        - Enhanced password policies
        - Improved system diagnostics
        - Advanced monitoring capabilities

## 4.11.4.3 (January 2024)

!!! info "Hotfix Release"
    Migrations and reboots are not needed when updating from version 4.11.4, 4.11.4.1 and 4.11.4.2

### Features / Fixes
- Fixed NAS volume logging issue
- Added VM NIC to VPN network attachment capability
- Fixed MSS clamping for Core network in tenants
- Changed default VXLAN max address setting (5000 to 0)
- Improved GPU/vGPU device handling in tenants
- Fixed VMWare VM restoration with e1000e NICs
- Enhanced volume snapshot reference management

## 4.11.4.1 (October 2023)

!!! info "Hotfix Release"
    - Fixed GPU passthrough with audio device regression
    - Resolved PCI device mode issue for GPU devices
    - Fixed tenant node GPU/vGPU availability notification

### Bug Fixes
- Fixed regression issues with GPU passthrough
- Resolved PCI device mode configuration
- Improved tenant node GPU notification system

## 4.11.4 (September 2023)

### Features

#### GPU & Device Management
- Enhanced GPU/vGPU device handling
- Added Vendor and device model specifications for GPU Passthrough
- Improved NVIDIA vGPU profile granularity
- Added IOMMU group support for PCI devices
- Added support for NVIDIA GRID 16.1 drivers

#### Virtual Machine Improvements
- Added clipboard text hiding for VM console
- Enhanced TPM device handling in tenants
- Added ZIP file support to upload form
- Improved VM recipe drive caching options

#### Security & System
- Added safe-guards against system downgrades
- Enhanced tenant cluster settings management
- Improved device offline handling
- Added additional validation for file cloning

### OS / Install
- Improved node driver installation
- Enhanced GPU driver IOMMU group handling
- Optimized controller fail-back procedures

## 4.11.3.2 (August 2023)

!!! info "Hotfix Release"
    Migrations and reboots are not needed when updating from version 4.11.3

### Fixes
- Resolved tenant node GPU/vGPU availability issues
- Fixed multi-cluster tenant CPU type configuration

## 4.11.3 (August 2023)

### Features

#### GPU Support
- Added support for NVIDIA GRID drivers 15.2, 15.3, and 16.0
- Improved GPU driver installation and cleanup
- Increased driver installation speed

#### Network Improvements
- Enhanced network migration performance (25% faster)
- Improved virtual wire connectivity
- Added network migration queuing during maintenance

#### Cloud & Storage
- Enhanced cloud snapshot management
- Improved large media image handling
- Added DNS server configuration for tenant recipes

### OS / Install
- Updated AMD microcode (addressed Zenbleed vulnerability)
- Improved NVMe drive handling
- Enhanced vSAN performance under contention

## 4.11.2 (March 2023)

### Features

#### Virtual Machine Enhancements
- Added VM drive optimization settings
- Improved VM hibernation speeds
- Enhanced VM console text pasting

#### System Improvements
- Optimized NTP server management
- Enhanced network interface broadcasting
- Improved backup/DR functionality

### OS / Install
- Updated kernel to 5.10.174
- Enhanced Clone ISO utility
- Improved system security and optimization

## 4.11.1.2 (March 2023)

!!! info "Hotfix Release"
    Migrations and reboots are not needed when updating from version 4.11.1 or 4.11.1.X

### Fixes
- Resolved Clone ISO build cancellation
- Fixed tenant Marketplace VM access
- Improved custom theme compatibility
- Enhanced wireguard peer configuration
- Fixed firewall rule application

## 4.11.1.1 (March 2023)

!!! info "Hotfix Release"
    Migrations and reboots are not needed when updating from version 4.11.1

### Features / Fixes
- Improved VM paste functionality
- Enhanced VMware backup import
- Optimized VM export volume creation
- Improved tenant node power management
- Enhanced recipe download handling

## 4.11.1 (February 2023)

### Features

#### Virtual Machine Improvements
- Enhanced VM paste performance
- Added customizable VM paste keyboard layouts
- Improved VM/Volume snapshot handling

#### Networking
- Improved network migration performance
- Enhanced NAT rule handling
- Optimized VMware backup service

#### System Enhancements
- Added advanced database flush controls
- Improved license server connectivity
- Enhanced system diagnostics

### OS / Install
- Updated kernel to 5.10.167
- Improved SSH key login handling
- Enhanced system search capabilities

## 4.11.0 (February 2023)

### Major New Features

#### Site Manager
- Integrated global monitoring
- Centralized management dashboard
- Multi-location administration

#### Marketplace
- Recipe Marketplace launch
- Self-service IT enablement
- Enhanced recipe development tools

#### OIDC Applications
- Centralized login management
- Streamlined authentication
- Enhanced provider integration

#### Virtual Machine Export
- New VM Export filesystem type
- Third-party backup solution support
- Integrated NAS service support

### System Improvements

#### Features
- Enhanced recipe engine capabilities
- Improved network rule management
- Added TPM 1.2/2.0 Support
- Enhanced performance/energy profiles

#### OS & Installation
- Updated to kernel 5.10.165
- Enhanced user management
- Improved system security features
- Advanced installation options

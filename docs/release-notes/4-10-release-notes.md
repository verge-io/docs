---
description: Release notes for the 4.10 series of VergeOS
#icon: material/text-box-outline
status: deprecated
---

# 4.10 Release Notes

!!! info "Series Information"
    - **Initial Release**: June 2022 (4.10.0)
    - **Latest Version**: 4.10.3.1 (January 2023)
    - **Status**: Deprecated (Superseded by 4.11)
    - **End-of-Life**: November 2024

## Major Features & Themes

### GPU & Virtualization

!!! success "GPU Enhancements"
    - NVIDIA Virtual GPU (vGPU) support
    - Enhanced GPU passthrough capabilities
    - Support for display port GPU cards
    - Multi-GPU support per VM
    - Improved GPU device status handling

### Performance & Resource Management

!!! benchmark "System Optimization"
    - CPU C-States management for high performance
    - Enhanced vSAN performance (turbocharger)
    - Improved live migration capabilities
    - Optimized VM storage operations
    - Enhanced resource waiting states

### System Administration

!!! tip "Management Features"
    - Enhanced VM console functionality
    - Improved tenant portability
    - Advanced NIC queue configuration
    - Enhanced VLAN management
    - Improved system diagnostics

### Security & Networking

!!! security "Network Improvements"
    - Enhanced firewall rule management
    - Improved DHCP handling
    - Advanced wireguard configuration
    - Enhanced network diagnostics
    - Optimized core network traffic

# Release Notes

## 4.10.3.1 (January 2023)

### Fixes
- Fixed VMware backup jobs statistics regression

## 4.10.3 (December 2022)

### Features

#### Virtual Machine Management
- Added CPU pinning for guests
- Increased max RAM to 1TB for machines
- Enhanced VM cloning functionality
- Improved secure boot handling

#### Networking
- Enhanced wireguard dashboard
- Improved firewall rule management
- Added advanced network rule capabilities
- Enhanced tenant networking features

#### Storage & System
- Enhanced NAS volume sync mechanisms
- Improved vSAN diagnostics
- Enhanced SMART monitoring
- Added tenant snapshot improvements

### OS & Installation
- Significant vSAN performance improvements
- Updated to Kernel 5.10.158
- Improved boot partition operations
- Enhanced installation automation

## 4.10.2.1 (September 2022)

!!! info "Hotfix Release"
    Migrations and reboots are not needed when updating from version 4.10.2

### Features
- Added multi-select support for lists
- Enhanced network creation workflow
- Improved IPMI logging
- Enhanced recipe question handling
- Improved GPU device management

### Bug Fixes
- Resolved GPU status display issues
- Fixed VM dashboard refresh problems
- Enhanced cloud snapshot management
- Improved tenant provisioning stability

## 4.10.2 (July 2022)

### Improvements
- Optimized Core network traffic priorities
- Enhanced network packet handling
- Improved system stability

## 4.10.1 (July 2022)

### Features
- Enhanced system diagnostics
- Improved tenant management
- Enhanced IPMI interface support
- Advanced scheduled subscription options

### System Updates
- Enhanced vSAN performance
- Upgraded to kernel 5.10.129
- Improved system security
- Enhanced installation workflow

## 4.10.0 (June 2022)

### Major Features

#### Virtualization
- NVIDIA Virtual GPU (vGPU) support
- Enhanced CPU state management
- Improved VM resource handling
- Advanced VM console features

#### System Management
- Enhanced machine notes system
- Improved resource waiting states
- Advanced migration controls
- Enhanced guest agent integration

#### Performance
- Improved VM hibernation
- Enhanced storage management
- Optimized machine migration
- Advanced timer synchronization

---
title: How to Add a TPM Device to a Virtual Machine
slug: add-tpm-device-to-vm
description: Step-by-step instructions for adding a Trusted Platform Module (TPM) device to a virtual machine in VergeOS
author: VergeOS Documentation Team
draft: false
date: 2025-07-02T15:30:00.000Z
tags:
  - TPM
  - virtual machine
  - device
  - security
  - UEFI
  - secure boot
  - BitLocker
  - Windows 11
categories:
  - VM
  - Security
editor: markdown
dateCreated: 2025-07-02T15:30:00.000Z
---

# How to Add a TPM Device to a Virtual Machine

## Overview

This article provides step-by-step instructions for adding a Trusted Platform Module (TPM) device to a virtual machine in VergeOS. TPM devices provide hardware-based security features including secure boot, encryption key management, and attestation capabilities.

!!! info "Key Points"
    - TPM devices enable hardware-based security features
    - Requires UEFI boot mode for full functionality
    - VM restart required after adding TPM device
    - Guest OS may require additional configuration

## Prerequisites

Before adding a TPM device to your VM, ensure the following requirements are met:

- **UEFI Boot Mode**: The VM should be configured to use UEFI boot for optimal TPM functionality
- **Supported Guest OS**: Ensure your guest operating system supports TPM devices
- **VM Power State**: The VM should be powered off before adding the TPM device
- **Proper Permissions**: You must have modify permissions for the virtual machine

!!! warning "UEFI Boot Requirement"
    For Windows VMs requiring TPM (such as Windows 11), UEFI boot mode is mandatory. Legacy BIOS mode will not support TPM functionality.

## Steps to Add TPM Device

### 1. Access VM Configuration

1. Navigate to the **VM Dashboard**
   - Go to **Virtual Machines** > **List**
   - Double-click your target VM from the list

2. **Power off the VM** if it's currently running
   - Click **Power Off** from the left menu if the VM is running
   - Wait for the VM to completely shut down

### 2. Enable UEFI Boot (if not already enabled)

1. From the VM dashboard, click **Edit** in the left menu
2. Locate the **UEFI Boot** option and enable it
3. Click **Submit** to save the changes

!!! tip "UEFI Conversion"
    If converting an existing VM from Legacy BIOS to UEFI, create a snapshot before making changes to enable easy rollback if needed.

### 3. Add TPM Device

1. From the VM dashboard, click **Devices** in the left menu
2. Click **New** from the left menu
3. Configure the TPM device settings:
   - **Name**: Enter a descriptive name (e.g., "TPM-2.0") or leave blank for auto-generation
   - **Type**: Select **TPM** from the dropdown
   - **Description** (optional): Add administrative notes about the device
   - **Version**: Select TPM version (typically TPM 2.0 for modern requirements)

4. Click **Submit** to create the TPM device

### 4. Start the Virtual Machine

1. From the VM dashboard, click **Power On** in the left menu
2. Wait for the VM to boot completely
3. Access the VM console to verify TPM functionality

## Guest OS Configuration

### Windows Configuration

For Windows guests (especially Windows 11):

1. **Verify TPM Detection**
   - Open **Device Manager**
   - Look for "Security devices" section
   - Confirm TPM device is listed and functioning

2. **Enable TPM in Windows**
   - Run `tpm.msc` from the Run dialog
   - Verify TPM status shows as "Ready for use"
   - Initialize TPM if prompted

3. **Configure BitLocker** (if needed)
   - Go to **Control Panel** > **System and Security** > **BitLocker Drive Encryption**
   - Follow prompts to enable BitLocker with TPM

### Linux Configuration

For Linux guests:

1. **Check TPM Detection**
   ```bash
   ls /dev/tpm*
   ```

2. **Install TPM Tools** (if needed)
   ```bash
   # Ubuntu/Debian
   sudo apt-get install tpm2-tools
   
   # RHEL/CentOS
   sudo yum install tpm2-tools
   ```

3. **Verify TPM Functionality**
   ```bash
   tpm2_getcap properties-fixed
   ```

## Troubleshooting

### Common Issues

1. **TPM Not Detected in Guest OS**
   - **Solution**: Verify UEFI boot is enabled and VM has been restarted
   - Check guest OS TPM driver support

2. **Windows 11 Installation Requirements**
   - **Solution**: Ensure both UEFI boot and TPM 2.0 are enabled before installation
   - Use Windows 11 compatible installation media

3. **TPM Initialization Errors**
   - **Solution**: 
     1. Power off the VM completely
     2. Remove and re-add the TPM device
     3. Restart the VM and retry initialization

4. **BitLocker Configuration Issues**
   - **Solution**: Ensure TPM is properly initialized before configuring BitLocker
   - Check Windows TPM management console (tpm.msc) for status

### Performance Considerations

- TPM devices have minimal performance impact on VM operations
- No additional CPU or memory resources required
- TPM operations are handled efficiently by the VergeOS hypervisor

## Best Practices

1. **Backup Before Changes**
   - Create a VM snapshot before adding TPM devices
   - Test TPM functionality in a development environment first

2. **Security Configuration**
   - Enable Secure Boot alongside TPM for enhanced security
   - Configure appropriate TPM policies based on security requirements

3. **Documentation**
   - Document TPM configuration for compliance and audit purposes
   - Maintain records of TPM-enabled VMs for security tracking

4. **Updates and Maintenance**
   - Keep guest OS TPM drivers updated
   - Monitor TPM device status regularly
   - Include TPM configuration in VM documentation

## Supported Features

With TPM enabled, your VM can support:

- **Secure Boot**: Verify boot integrity and prevent unauthorized boot modifications
- **BitLocker Drive Encryption**: Hardware-based encryption key management
- **Windows Hello**: Biometric authentication (with additional hardware)
- **Device Attestation**: Verify device integrity and compliance
- **Certificate Storage**: Secure storage for digital certificates

## Additional Resources

- [Virtual Machine Best Practices](/product-guide/virtual-machines/vm-best-practices)
- [UEFI Import Guide](/knowledge-base/importing-windows-server-with-uefi-into-vergeos)
- [Device Passthrough Overview](/product-guide/system/device-pass-overview)

---

!!! note "Document Information"
    - Last Updated: 2025-07-02
    - VergeOS Version: 4.12.6+
    - Applies to: All VergeOS environments with TPM support

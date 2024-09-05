---
title: Changing Resolution on a UEFI VM
slug: changing-resolution-on-a-uefi-vm
description: Steps to change the screen resolution on a UEFI-based VM.
draft: false
date: 2023-11-15T21:13:25.425Z
tags: vm, uefi, resolution
categories:
  - VM
  - Troubleshooting
editor: markdown
dateCreated: 2022-09-07T17:26:07.927Z
---

# Changing Resolution on a UEFI VM

In a UEFI-based virtual machine (VM), the screen resolution is controlled by the OVMF (Open Virtual Machine Firmware) Platform Configuration. By default, only the resolution configured in the platform settings is available to the VM. If you need to change the display resolution, follow the steps outlined below.

## Steps to Change the Screen Resolution

1. **Reboot the VM** while connected to the console (through the VergeOS UI or any console manager you're using).
   
2. As the VM starts, **press** <kbd>ESC</kbd> to enter the UEFI Settings menu.

3. Once in the UEFI menu, navigate to **Device Manager**.

4. In Device Manager, select **OVMF Platform Configuration**.

5. Choose your desired **Preferred Resolution** from the list of available options.

6. **Save** the configuration changes and reboot the VM for the new resolution to take effect.

## Notes and Considerations

- The resolution options available depend on the firmware and the display capabilities of the guest operating system.
- If you are still experiencing resolution issues, ensure that your guest OS has the necessary display drivers installed.
- UEFI settings may vary slightly depending on the VM and configuration, so some steps may look a little different in certain environments.

By following these steps, you can successfully adjust the screen resolution for your UEFI-based VM.

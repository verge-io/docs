---
title: Bypassing TPM Requirements in Windows 11
slug: bypassing-tpm-requirements-in-windows-11
description: 
draft: false
date: 2023-02-21T21:28:53.099Z
tags:
  - windows
  - tpm
  - troubleshooting
  - bypass
  - registry
categories:
  - Troubleshooting
  - VM
  - Migration
editor: markdown
dateCreated: 2022-10-28T14:00:42.477Z
---

## How to Bypass Windows 11's TPM Requirement Using the Registry Editor during the installation

---

!!! warning "**This only applies to Versions of Verge.io previous to 4.11 (Atria).**"


If you have the Windows 11 install disk or ISO, you can bypass the Windows TPM and RAM requirements by making registry changes during the install.  
> **Note:** This method only works on a clean install and does not allow you to bypass the requirement for at least a dual-core CPU. 
{.is-info}


1. **Boot** off of your Windows 11 install disk. [If you don't have one, one can be downloaded from here.](https://www.microsoft.com/en-us/software-download/windows11) The first screen should ask you to choose the language of your install (which should be correct).
![tpm-1.png](/product-guide/screenshots/tpm-1.png)

---

2. Press **<kbd>SHIFT</kbd> + <kbd>F10</kbd>** to launch the command prompt. 
![tpm-2.png](/product-guide/screenshots/tpm-2.png)

---

3. Type **regedit** and hit <kbd>Enter</kbd> to launch registry editor.
![tpm-3.png](/product-guide/screenshots/tpm-3.png)

---

4. Navigate to **HKEY_LOCAL_MACHINE\SYSTEM\Setup**. 
![tpm-4.png](/product-guide/screenshots/tpm-4.png)

---

5. Create a **new registry key** under Setup and name it **LabConfig**. To create a registry key, **right click** in the right window pane and select **New->Key**. Then enter the key name.
![tpm-5.png](/product-guide/screenshots/tpm-5.png)

---

6. Within **LabConfig**, create 2 new **DWORD** values called **BypassTPMCheck** and **BypassSecureBoot** and set each to **1**. To create a new DWORD value, **right click** in the right window and select new **DWORD (32-bit) Value** then name the key, **double-click** to open it and set it to **1**.
If you also want to bypass the RAM requirement, add a DWORD values for BypassRAMCheck.
![tpm-6.png](/product-guide/screenshots//tpm-6.png)

---



7. Close regedit and <kbd>exit</kbd> the command prompt. You can now continue with your Windows 11 installation as normal.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.11

---
title: Bypassing TPM Requirements in Windows 11
slug: bypassing-tpm-requirements-in-windows-11
description: 
published: true
date: 2023-02-21T21:28:53.099Z
tags: 
editor: markdown
dateCreated: 2022-10-28T14:00:42.477Z
---

## How to Bypass Windows 11's TPM Requirement Using the Registry Editor during the installation
<br>

> **This only applies to Versions of Verge.io previous to 4.11 (Atria).**
{.is-danger}

If you have the Windows 11 install disk or ISO, you can bypass the Windows TPM and RAM requirements by making registry changes during the install.  
> **Note:** This method only works on a clean install and does not allow you to bypass the requirement for at least a dual-core CPU. 
{.is-info}


1. **Boot** off of your Windows 11 install disk. [If you don't have one, one can be downloaded from here.](https://www.microsoft.com/en-us/software-download/windows11) The first screen should ask you to choose the language of your install (which should be correct).
![tpm-1.png](/public/tpm-1.png)
<br>

2. Press **<kbd>SHIFT</kbd> + <kbd>F10</kbd>** to launch the command prompt. 
![tpm-2.png](/public/tpm-2.png)
<br>

3. Type **regedit** and hit <kbd>Enter</kbd> to launch registry editor.
![tpm-3.png](/public/tpm-3.png)
<br>

4. Navigate to **HKEY_LOCAL_MACHINE\SYSTEM\Setup**. 
![tpm-4.png](/public/tpm-4.png)
<br>

5. Create a **new registry key** under Setup and name it **LabConfig**. To create a registry key, **right click** in the right window pane and select **New->Key**. Then enter the key name.
![tpm-5.png](/public/tpm-5.png)
<br>

6. Within **LabConfig**, create 2 new **DWORD** values called **BypassTPMCheck** and **BypassSecureBoot** and set each to **1**. To create a new DWORD value, **right click** in the right window and select new **DWORD (32-bit) Value** then name the key, **double-click** to open it and set it to **1**.
If you also want to bypass the RAM requirement, add a DWORD values for BypassRAMCheck.
![tpm-6.png](/public/tpm-6.png)
<br>



7. Close regedit and <kbd>exit</kbd> the command prompt. You can now continue with your Windows 11 installation as normal.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
---
title: Accessing the Verge.io UI from a VM  
slug: accessing-the-verge_io-ui-from-a-vm  
description:  
published: true  
date: 2023-01-24T19:21:32.815Z  
tags: vm, access, ui, hairpin, hair-pin, hairpinning, hair-pinning  
categories:  
  - Network Rules  
  - Network  
editor: markdown  
dateCreated: 2022-09-07T17:52:09.082Z  
---

## How to Access the VergeIO UI from a VM

In networking terminology, this process is commonly known as hair-pinning. Hair-pinning occurs when a packet travels to an interface, goes out towards the Internet, but instead of continuing, it makes a “hairpin turn” and comes back in on the same interface.

### Steps to Create a New Rule on the Internal Network

To access the VergeIO UI from a VM running inside the platform, follow these steps to create a new rule:

1. **Navigate to the Internal Network**: Go to the internal network that the VM is currently connected to.

2. **Create a New Rule**:

   - Under **Rule**, set the following values:
     - **Name**: Use a reference name, such as **hit ui**
     - **Action**: Translate
     - **Protocol**: TCP
     - **Direction**: Incoming
     - **Interface**: Auto
     - **Pin**: No

   - Under **Source**, set the following values:
     - **Type**: Any / None
     - **Source Ports/Ranges**: Leave this blank

   - Under **Destination**, set the following values:
     - **Type**: My Network Address
     - **Destination Ports/Ranges**: 80, 443

   - Under **Target**, set the following values:
     - **Type**: Other Network DMZ IP
     - **Target Network**: Core
     - **Target Ports/Ranges**: Leave this blank

3. **Submit the Rule**: Click **Submit** to save the rule. 

4. **Apply the Rule**: Click **Apply Rules** to apply the new rule to the running network.

![hairpin.png](/public/hairpin.png)

### Accessing the VergeIO UI from the VM

From within the VM, use a web browser to navigate to the IP address of the internal network instead of the standard address. For example, if the internal network has an IP address of 192.168.0.1, use this address to access the VergeIO platform.


> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
---
title: Product Guide - Virtual Machine Network Interfaces (NICs)
description: Instructions for adding, removing, modifying and disabling a Virtual Machine NIC. 
published: true
date: 2024-03-25T18:01:03.908Z
tags: 
editor: markdown
dateCreated: 2023-09-28T16:11:40.019Z
---

# Virtual Machine Network Interfaces (NICs)

<br>

## Add a NIC to a VM

> When a new Virtual Machine is created, you are taken to the VM dashboard. {.is-success}

1.  From the VM Dashboard, select **NICs** from the left menu.
2.  Select **New** from the left menu.
3.  By default, the NIC is enabled. De-select the Enabled checkbox if it should be disabled for now.
4.  Enter a ***Name*** for the NIC (optional, but recommended if the VM will have more than one NIC).
5.  Select ***Interface*** for the device:
    -   **Virtio (default option)** Virtio is typically recommended for best performance. Most Linux distributions contain virtio drivers, by default; **The latest virtio drivers can be downloaded here:** [https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/stable-virtio/virtio-win.iso)
    -   **Intel E1000** - the most compatible natively for most modern operating systems. Simulates 1Gb Nic
    -   **AMD PCnet** - interface provided for legacy compatibility.
    -   **Realtek 8139** - interface provided for legacy compatibility.
6.  Select the desired ***Network***.
    -   Options include all available networks.
    -   \--None-- can be selected to simulate an unplugged network card.
    <br>
7.  Optionally, a ***MAC address*** can be specified (if a specific MAC is needed); otherwise, the system will auto-generate a unique MAC address for the NIC.
8.  Enter a ***Description*** for the NIC (optional)
9.  ***Asset*** - is a freeform field, where any combination of alpha-numeric characters can be used to define a unique identifier in order to distinguish this NIC from other NICs within the same VM, for use in recipes.
10.  Click **Submit.**
11.  Repeat the process to add more network devices to the VM, as needed.

<br>

## Remove a NIC from a VM

1.  From the VM Dashboard, select **NICs** from the left menu. The VM NIC listing will appear on the right.
2.  **Click to select the NIC** to be deleted.
3.  Select **Delete** from the left menu.
4.  Click **Yes** to confirm the deletion.

<br>

## Modify a VM NIC

1.  From the VM Dashboard, select **NICs** from the left menu. The VM NIC listing will appear on the right.
2.  **Click to select the NIC** to be modified.
3.  Select **Edit** from the left menu.
4.  All fields can be modified. However, there are considerations for editing some fields. See below.
    -   ***Name*** - can be modified as desired; must not be the same name as another NIC attached to the same VM.
    -   ***Order ID*** - This field controls the order in which the guest OS loads multiple NICS at boot time. Changing the order ID after a machine has already been booted with the given NICs may then also require configuration changes within the guest OS.  Order ID is only relevant when there is more than one (enabled) NIC attached to the VM.   
    -   ***Interface*** - can be changed. It is important to make sure proper drivers are installed within the guest OS in order for the NIC to function properly.
    -   ***Network*** - changing the network to which this NIC is attached will most likely result in a new IP assignment. Additionally, if there were any special routes and rules pertaining to this NIC, they may need to be re-created or reconfigured once changed to a new Network.
    -   ***MAC Address*** - it is typically recommended to use the system-assigned (unique) MAC address, changing the MAC address after the NIC has already been in use will likely also require configuration changes within the guest OS.
    -   ***Description*** - can be modified as desired.
    -   ***Asset*** - is a freeform field, where any combination of alpha-numeric characters can be used to define a unique identifier in order to distinguish this NIC from other NICs within the same VM, for use in recipes.
5.  Click **Submit** to save changes.

<br>

## Disabling a NIC

1.  From the VM Dashboard, Select **NICS** on the left menu.
2.  Select the NIC to be modified.
3.  Select **Edit** from the left menu.
4.  **Deselect the Enabled checkbox**.
5.  Click **Submit.**
6.  If the VM is currently running, the NIC will not be disabled until reboot.

> You can also modify a NIC's Network field to ***--None--***  **to "unplug"** it from the network while the VM is running (does not require a reset/reboot.) {.is-success}

<br>   



> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
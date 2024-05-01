---
title: VLAN Creation
description: Adding a VLAN to the Verge.io Environment
published: true
date: 2023-06-06T14:17:24.473Z
tags: vlan, networking
editor: markdown
dateCreated: 2022-06-30T15:23:20.794Z
---

## Adding a VLAN in the User Interface
1. Add the desired VLAN(s) to the appropriate switchports so they are accessible to the nodes running the VergeIO environment.
1. From the **Main Dashboard** navigate to **Networks**, then **select "New External"** in the left menu.
1. In the network creation page enter the following settings:
![new-vlan.png](/public/new-vlan.png)
> **NOTE:** For the "Interface Network" option be sure to select the physical network on the nodes that the VLAN enters the environment on. These are typically appended with the name "Switch" during install. For	all other settings the default options are typically sufficient.
{.is-info}
4. Submit your configuration, you will then be brought to the newly created networks dashboard where you should see a status of **"Running"** if the same configuration from above was used.
1. Workloads can now be attached to the newly created network. 

>**NOTE:** See the [Virtual Wires KB](/public/kb/virtual-wires) article for adding VLANS into Tenants.
{.is-info}

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
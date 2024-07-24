---
title: Max RAM per machine
slug: max-ram-per-machine
description: Adjusting the Max RAM per machine Cluster Setting
published: true
date: 2024-04-18T23:14:17.032Z
tags: cluster settings, cluster, configuration, vm, settings
categories:
  - Cluster Settings
editor: markdown
dateCreated: 2024-04-18T16:22:33.961Z
---

## Max RAM per machine setting explained
The Max RAM per machine setting determines the maximum amount of RAM a virtual machine can own on a particular cluster. The setting prevents a user from maliciously using all available memory on a cluster node. 

At install time the default max RAM setting is 64GB. In order to run a virtual machine that is larger than 64GB this setting must be changed post install. The setting can be changed run time meaning **a node reboot is not required to apply the setting**.
 
If a machine that has more RAM allocated than allowed tries to start a "**Machine exceeds the max amount of ram allowed on this cluster**" error will be logged. The setting must be adjusted to accomdate for the large workload.
![vm_max_ram_exceeded.png](/public/vm_max_ram_exceeded.png)
## Adjusting the setting
1. From the main dashboard navigate to system then clusters in the left menu or select the clusters count box in the top row
1. In the cluster list view page select the cluster that the virtual machine is set to run on
1. Select edit in the left menu
1. Adjust the Max RAM per machine setting to accommodate the virtual machine
![max_ram_per_machine.png](/public/max_ram_per_machine.png)
1. Submit the page
1. Start the virtual machine

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
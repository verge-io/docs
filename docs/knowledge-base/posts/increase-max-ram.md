---
title: Max RAM per machine  
slug: max-ram-per-machine  
description: Adjusting the Max RAM per machine Cluster Setting  
draft: false  
date: 2024-04-18T23:14:17.032Z  
tags:
  - cluster settings
  - cluster
  - configuration
  - vm
  - settings
categories:  
  - Cluster Settings  
editor: markdown  
dateCreated: 2024-04-18T16:22:33.961Z  
---

# Max RAM per machine setting explained

The **Max RAM per machine** setting determines the maximum amount of RAM that a virtual machine can utilize on a particular cluster. This setting helps prevent a single VM from consuming excessive resources and affecting the cluster's overall performance.

At the time of installation, the default maximum RAM setting is **64GB**. To run a virtual machine requiring more than 64GB, this setting must be adjusted. Fortunately, changes can be made at runtime, so **a node reboot is not required** to apply the updated setting.

If a VM attempts to use more RAM than allowed by the cluster, an error message, **"Machine exceeds the max amount of RAM allowed on this cluster"**, will be logged. To resolve this, adjust the setting to accommodate the workload.
![vm_max_ram_exceeded.png](/public/vm_max_ram_exceeded.png)

## Adjusting the Max RAM per machine setting

Follow these steps to adjust the setting:

1. From the **Main Dashboard**, navigate to **System** and then **Clusters** in the left-hand menu, or select the **Clusters count box** in the top row.
2. In the **Cluster list view**, select the cluster where the virtual machine is set to run.
3. Select **Edit** in the left-hand menu.
4. Adjust the **Max RAM per machine** setting to accommodate the virtual machine's requirements.
   ![max_ram_per_machine.png](/public/max_ram_per_machine.png)
5. Submit the changes by clicking **Submit** at the bottom of the page.
6. Start the virtual machine to confirm the changes.

By increasing the Max RAM per machine setting, larger VMs can be successfully launched on the cluster.


---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

---
title: Accessing the User Interface from an Internal Network
slug: accessing-the-user-interface-from-an-internal-network
description: 
published: true
date: 2023-01-24T15:41:14.296Z
tags: internal network, UI access, network routing, rule, UI, routing
categories:
  - Network Rules
editor: markdown
dateCreated: 2022-07-25T19:08:58.594Z
---

## How to Set Up an Internal UI Route

Sometimes, you may need to access the User Interface (UI) from a virtual machine (VM) within a VeregOS environment. To achieve this, you need to create a special route rule on the network (usually an internal network) to which the VM is connected.

### Steps to Create the Route Rule

1. **Navigate to the Dashboard**: Go to the dashboard of the network that your VM is connected to.

2. **Create a New Rule**: Create a new rule using the settings shown in the example below:
   
   ![ui-access-rule.png](/public/ui-access-rule.png)

3. **Submit the Rule**: Submit the rule. You will be taken back to the list view of the rules on the network.

4. **Select and Apply the Rule**: Select the newly created rule, which will be highlighted, and apply it.

5. **Access the UI from the VM**: Open a web browser within the VM and navigate to the IP address of the network router, for example: `https://192.168.4.1`.

<br>
<div style="text-align: center">
<a href="https://www.verge.io/test-drive" target="_blank"><button class="button-orange">Request Trial</button></a>
</div>

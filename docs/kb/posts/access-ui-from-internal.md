---
title: Accessing the User Interface from an Internal Network
slug: accessing-the-user-interface-from-an-internal-network
description: 
published: true
date: 2023-01-24T15:41:14.296Z
tags: 
editor: markdown
dateCreated: 2022-07-25T19:08:58.594Z
---

## How To Set Up An Internal UI Route

On occasion a user will need to access the User Interface from within a virtual machine located in a VergeIO environment. To do this a special route rule will need to be created on the network (typically an internal network) the VM is attached to.

1. Navigate to the dashboard of the network that the virtual machine is attached to
1. Create a new rule using the settings in the following example
![ui-access-rule.png](/public/ui-access-rule.png)
1. Submit the rule to be brought back a list view of the rules on the network
1. Select and apply the newly created rule which will be highlighted
1. Within the virtual machine open a web browser and navigate to the IP address of the network router ex: https://192.168.4.1

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
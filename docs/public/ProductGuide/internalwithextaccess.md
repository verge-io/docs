---
title: Product Guide - Create an Internal Network with External Access
description: Instructions for providing external access (outside of the VergeIO environment) to an internal network
published: true
date: 2023-06-27T14:18:47.959Z
tags: 
editor: markdown
dateCreated: 2023-03-29T21:21:37.557Z
---

## Creating an Internal Network with External Access

Giving an internal network external access requires having the proper default gateway rule in place to route through an external network.



<br> 

### To Automatically Create the Default Gateway Rule (during network creation)

Select an appropriate external network in the *Default Gateway* field, when creating a new internal network. The gateway will automatically create the appropriate routing rules to route to the specified network and provide LAN and/or WAN access to the internal network (depending on the physical connection/settings of the external network selected).

![setdefgw.png](/public/userguide-sshots/setdefgw.png)

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
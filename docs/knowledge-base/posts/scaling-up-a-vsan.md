---
title: Scaling Up a vSAN
slug: scaling-up-a-vsan
description: 
published: true
date: 2023-01-24T19:15:40.203Z
tags: scale up, vsan, scaling
categories:
  - vSAN
  - Scale Up
editor: markdown
dateCreated: 2022-08-17T15:48:21.549Z
---

## Scaling Up a vSAN

- Physically add the drives into the available empty slots on the Node you want to scale up.
- Login to the host system's UI and select the appropriate cluster you want to scale out from the top compute cluster section on the home page.
![scaleupvsan1.png](/public/scaleupvsan1.png)
- Select the node that you are scaling up.
![scaleupvsan2.png](/public/scaleupvsan2.png)
 - Select "Refresh" on the left menu, and choose "Drives & NICs" from the dropdown. Select Yes to confirm your choice.
![scaleupvsan4.png](/public/scaleupvsan4.png)

 - Select the Scale Up option on the left menu.
![scaleupvsan3.png](/public/scaleupvsan3.png)


- The page will now show the new inserted drives in an offline state.
- Select the drive(s), then under Node Drives, select the “Scale Up” function.
![scaleupvsan5.png](/public/scaleupvsan5.png)

Select the appropriate tier for the drive(s) and submit. 

> **WARNING:** All drives in a tier must be alike, if a drive of the incorrect size is added to an existing tier that tier will only be able to use the space of the smallest drive.
{.is-warning}


Upon completion, the screen will refresh and the drives will disappear. Go back to the main page you will see the vSAN tiers has changed its color to yellow and is in a repair state. This is to be expected and there is nothing to worry about. After a few minutes the vSAN will go back to a green/healthy state also revealing the new tier or increased space on an existing tier.
Repeat the steps for each node as necessary.

<br>
[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
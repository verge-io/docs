---
title: Product Guide - Configuring NAT 1-to-1 Translation
description: Instructions for mapping one internal private IP address to one external IP address
published: true
date: 2023-06-27T19:50:43.542Z
tags: 
editor: markdown
dateCreated: 2023-03-29T21:31:35.969Z
---

# Configuring NAT 1-to-1 translation

<br>

Before creating the translate rule to NAT an external IP to an internal IP:

-   [**Define a static (private) IP for the destination VM**](/public/ProductGuide/dhcpstaticlease)

-   [**Assign an external IP to the internal network**](/public/ProductGuide/assignexternalIP)


<br>
<br>

## To Create a Translate Rule to NAT External IP to Internal IP:

1.  From the **Internal network** Dashboard, Click **Rules** on the left menu.
2.  Click **New** on the left menu.
3.  Enter a ***Name*** that will be helpful to future administration.
4.  **Optionally**, a ***Description*** can be entered to record additional administration information.
5.  In the ***Action*** dropdown, select **Translate**.
6.  In the ***Protocol*** dropdown, select **ANY**.
7.  In the ***Direction*** dropdown, select **Incoming**.
<br>
##### Source:
8.  In the ***Type*** dropdown, select **Any/None**.
<br>

##### Destination:
9.  In the ***Type*** dropdown, select **My IP Addresses**.
10.  In the ***IP Address*** dropdown, select the **External IP address.**
<br>

##### Target:
11.  In the ***Type*** dropdown, select **My IP Addresses**.
12.  In the ***IP Address*** dropdown, select the **Internal IP address** (that was given a static IP address assignment.)
13.  Click **Submit**.
14.  Click **Apply Rules** on the left menu to put the new rule into effect.


<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
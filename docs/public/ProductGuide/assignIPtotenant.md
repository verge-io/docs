---
title: Product Guide - Assign IPs to a Tenant
description: Instructions for giving external IP addresses to a tenant
published: true
date: 2023-06-26T12:33:28.336Z
tags: 
editor: markdown
dateCreated: 2023-05-17T18:13:46.900Z
---

# Assigning External IP Addresses to a Tenant

External IP addresses can be assigned to tenants. When an external IP is assigned, appropriate routing rules are created automatically.

<br>
<br>


## To Assign an External IP to a Tenant:

1.  Navigate to the appropriate host **external network dashboard**; this should be the external network where the tenant has external access. In most cases this will be the network named "External".
2.  Click **IP Addresses** on the left menu.
3.  Click **New**.
4.  In the ***Type*** field, select **Virtual IP**.
5.  In the ***IP Address*** field, enter the **external IP Address**.
6.  ***Hostname*** can be left blank.
7.  **Optionally**, a ***Description*** can be entered to record additional administrative information.
8.  In the ***Owner Type*** dropdown list, select **Tenant**.
9.  In the ***Owner*** dropdown list, select the **name of the tenant**.
10.  Click **Submit** at the bottom of the page.
11.  From the **external network dashboard**, click **Apply Rules** on the left menu (to apply to the host external network). ***Hint:** To return to the external network dashboard you can click the appropriate breadcrumb at the top or use the browser back button.*
12.  Navigate to the **Tenant Network Dashboard** (Main Dashboard -> Networks -> Tenant Networks -> double click the tenant network).
13.  Click **Apply Rules** (to apply to the tenant network).

<br>   

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>{.is-info}

<br>

<div style="text-align:center; margin-bottom:5px">
  <a href="../ProductGuide/menu"><button class="button-grey"><b>↺</b> Back to the Product Guide</button></a>
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>
---
title: Troubleshooting NAS shares
slug: troubleshooting-nas-shares
description: 
published: false
date: 2023-09-18T15:54:21.904Z
tags: cifs, nas, nfs, shares, volumes, troubleshooting, troubleshoot, guest, lanmanager, smb
editor: markdown
dateCreated: 2023-09-18T15:20:34.352Z
---

## Troubleshooting NAS CIFS Shares

-   [**Connectivity Errors**](#connectivityerrors)



<a id="connectivityerrors"></a>
### Connectivity Errors

Most likely you need to Enable insecure guest logins for SMB shares in Windows.

- Open the Local Group Policy Editor (gpedit.msc) on your Windows device.
- In the console tree, select Computer Configuration > Administrative Templates > Network > Lanman Workstation.
- For the setting, right-click Enable insecure guest logons and select Edit.
- Select Enabled > OK.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>
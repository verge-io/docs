---
title: Wireguard - Adding Nameserver entries to Client Configs
description: 
published: true
date: 2023-01-24T15:48:19.439Z
tags: windows, wireguard, nameserver, config, linux
editor: markdown
dateCreated: 2022-09-13T15:37:08.228Z
---

## Wireguard Config Entries

The following is instructions for adding a postup and postdown script to the **Wireguard** config.
For **Windows**, this adds **Powershell** commands for adding and removing a **DNS Client Rule** when the client connects and disconnects.  

<br>

### Windows Clients
1. In the **Windows** Wireguard client, **edit the config**.
1. Add the following commands in the **[Interface]** section

<div class="codem">
<b>PostUp</b> = powershell -command "Add-DnsClientNrptRule -Namespace '<b>domainname.com</b>' -NameServers '<b>10.1.10.2</b>'"
<br>
<b>PostDown</b> = powershell -command "Get-DnsClientNrptRule | Where { $_.Namespace -match '.*<b>domainname\.com</b>' } | Remove-DnsClientNrptRule -force"
</div>

3. Change the following entries to match **your** setup:
- **Namespace** - A comma-separated list of domain names to add.
- **NameServers** - A comma-separated list of name server IP addresses.

> For the **-match** make sure to include a **backslash** (\\) before each **period** (.)
{.is-info}

<br>

### Linux Clients
This may be different based on your distribution of Linux.

1. **Edit the config file** on the **Linux** client.
2. In the **[Interface]** section, add the following:

<div class="codem">
<b>PostUp</b> = resolvectl dns %i <b>10.1.10.2</b>; resolvectl domain %i <b>domainname.com</b>
<br><b>PreUp</b> = iptables -A INPUT -i wg -m state --state ESTABLISHED,RELATED -j ACCEPT
<br><b>PreUp</b> = iptables -A INPUT -i wg -j REJECT
<br><b>PostDown</b> = iptables -D INPUT -i wg -m state --state ESTABLISHED,RELATED -j ACCEPT
<br><b>PostDown</b> = iptables -D INPUT -i wg -j REJECT
</div>

3. Replace **10.1.10.2** with the correct IP of your **nameserver**.
4. Replace domainname.com with your domain name.

<br>

> Need more Help? Email <a href="mailto:support@verge.io?subject=Support Inquiry" target="_blank" rel="noopener noreferrer">support@verge.io</a> or call us at <a href="tel:+855-855-8300">(855) 855-8300</a>
{.is-info}

<br>
<div style="text-align: center">
  <a href="https://wiki.verge.io/en/public/kb"><button class="button-grey"> <b>↺</b> Back to Knowledgebase</button></a>
<a href="https://www.verge.io/test-drive"><button class="button-orange">🚗 Take a Test Drive Today!</button></a>
</div>


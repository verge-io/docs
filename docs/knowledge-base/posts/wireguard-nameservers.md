---
title: Wireguard - Adding Nameserver entries to Client Configs
slug: wireguard--adding-nameserver-entries-to-client-configs
description: 
draft: false
date: 2023-01-24T15:48:19.439Z
tags:
  - windows
  - wireguard
  - nameserver
  - config
  - linux
categories:
  - VPN
editor: markdown
dateCreated: 2022-09-13T15:37:08.228Z
---

## Wireguard Config Entries

The following are instructions for adding a **PostUp** and **PostDown** script to the **Wireguard** config.  
For **Windows**, this adds **Powershell** commands for adding and removing a **DNS Client Rule** when the client connects and disconnects.

### Windows Clients

1. In the **Windows** Wireguard client, **edit the config**.
2. Add the following commands in the **[Interface]** section:

```pwsh
PostUp = powershell -command "Add-DnsClientNrptRule -Namespace 'domainname.com' -NameServers '10.1.10.2'"
PostDown = powershell -command "Get-DnsClientNrptRule | Where { $_.Namespace -match '.*domainname\.com' } | Remove-DnsClientNrptRule -force"
```

3. Change the following entries to match **your** setup:
    - **Namespace**: A comma-separated list of domain names to add.
    - **NameServers**: A comma-separated list of nameserver IP addresses.

!!! info "For the **-match**, make sure to include a **backslash** (\\) before each **period** (.)"

---

### Linux Clients

This may vary based on your Linux distribution.

1. **Edit the config file** on the **Linux** client.
2. In the **[Interface]** section, add the following:

```bash
PostUp = resolvectl dns %i 10.1.10.2; resolvectl domain %i domainname.com
PreUp = iptables -A INPUT -i wg -m state --state ESTABLISHED,RELATED -j ACCEPT
PreUp = iptables -A INPUT -i wg -j REJECT
PostDown = iptables -D INPUT -i wg -m state --state ESTABLISHED,RELATED -j ACCEPT
PostDown = iptables -D INPUT -i wg -j REJECT
```

3. Replace **10.1.10.2** with the correct IP of your **nameserver**.
4. Replace **domainname.com** with your domain name.

---

!!! note "Document Information"
    - Last Updated: 2024-08-29
    - vergeOS Version: 4.12.6

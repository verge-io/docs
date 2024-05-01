---
title: FAQ
description: A collection of the most frequently asked questions
published: true
date: 2024-02-22T14:35:33.304Z
tags: 
editor: markdown
dateCreated: 2022-03-14T21:44:55.830Z
---

<details>

<summary>What does a vnet use for layer 3 capabilities?</summary>
  
At its base, a network is built off of the linux [nftables](https://wiki.nftables.org/wiki-nftables/index.php/Main_Page) kernel module.

</details>
<details>

<summary>Can a network run as a DHCP client?</summary>
  
An externally facing network has the ability to become a DHCP client, an internal network does not. It can however be a router with a static IP and serve a different DHCP server address to virtual machines attached to it.  

</details>
<details>  

<summary>Can I use my existing storage infrastructure with a VergeIO environment?</summary>
  
Guest workloads can be connected to external storage, but VergeIO cannot leverage 3rd party storage architectures.

</details>
<details>
  
<summary>What is VergeIO based on?</summary>

VergeIO is a custom linux distro.

</details>
<details>
  
<summary>Can I install VergeIO myself?</summary>

Yes, follow the installation instructions [here](/public/implementation/3-2).

</details>
<details>
  
<summary>Can I run containers?</summary>

Containers cannot be run natively in VergeIO. However running containers can be achieved by creating a virtual machine and running your specific containerization platform inside of the vm.

</details>
<details>
  
<summary>Can I use my existing VXLAN(s) inside of the environment?</summary>

VXLAN capabilities within VergeIO do not extend outside of the environment. They are created specifically to control high availability of any network that exists inside of VergeIO.

</details>
<details>
  
<summary>What drive format do virtual disks use?</summary>

Virtual disks use the **.raw** format since it is the most universal drive format.

</details>
<details>

<summary>Can I run a single node?</summary>

A miniumum of two nodes are required to maintain high availability.
  
</details>
<details>
  
<summary>How often do you release updates?</summary>
  
Bug fixes, hotfixes, security updates are released on an un-fixed schedule as needed.  Platform updates with additional features are released quarterly.

</details>
<details>
  
<summary>How does the vSAN ensure data integrity?</summary>
  
The vSAN stores a SHA1 hash of every block of data that is written to it. When that data is read, it is re-hashed and validated for integrity. This technique protects against silent corruption and bit rot. In the event of finding a bad block of data, our algorithm will check for redundant copies locally within the environment. If that block of data cannot be found, DR/Backup sites will be checked in real time, and the data block will be retrieved and repaired seamlessly without user interaction with no down time.

</details>
<details>
  
<summary>Can I use large spinning drives in my environment?</summary>
  
Yes, VergeIO does not have a size limitation on drives. It is important to note that through extensive research and testing that drives larger than 8TB in size are not recommended. Typically the rebuild time in larger drives can take an extended period of time leaving the possibility for a single point of failure. Spinning disks aren't recommended for production (hot) data and are typically used for archive/backup environments or (cold) data.

</details>
<details>

<summary>How are updates performed?</summary>
  
Updates can be run in two forms, either a rolling update or a full environment reboot. 
  - #### Rolling Update
	A rolling update gracefully puts each node into maintenance mode applying the update to one node at a time. During maintenance mode all guest workloads are gracefully moved to another running node within the same cluster using a stateful start/stop method providing minimal interruption. Once the physical node is rebooted it will automatically leave maintenance mode and return the workloads to their original physical node.
  - #### Environment Reboot 
	An environment reboot requires all running workloads to be shutdown and the physical nodes to be rebooted all at once. While this method is faster it does require downtime for all running workloads.

</details>  
<details>
  
<summary>What RAID level does the vSAN work at?</summary>
  
The VergeIO vSAN works as a Redundant Array of Independant Nodes (RAIN). This is accomplished by striping the data across all drives in a tier of storage while concurrently writing the data set to its mirror on another node participating in the same tier of storage thereby guaranteeing data integrity.
  
</details>
<details>
  
<summary>Can VergeIO restrict, disable, and prevent the use of nonessential programs, functions, ports, protocols, and services?</summary>
  
VergeIO will not control anything within the guest. Port management of traffic, protocols, and services can be managed via the VergeIO firewall. 

</details>
<details>
  
<summary>How does VergeIO isolate service-specific traffic?</summary>
  
Creating different internal networks inside the VergeIO platform allows for the delivery of multiple manageable networks that are all completely isolated from one another.
  
</details>
<details>
  
<summary>Can data be taken or read from an individual drive in VergeIO?</summary>
  
No, all data is cryptohashed and cryptoverified on every disk VergeIO is installed on.

</details>  
<details>  
  
<summary>Does VergeIO support encryption?</summary>
  
Data at rest (DARE) is AES 256bit encrypted **if** encryption is turned on at the time of install.

</details>
<details>

<summary>How is data between VergeIO sites encrypted?</summary>

SSL encryption, and AES 256 for synchronization.

</details>
<details>
  
<summary>How does VergeIO handle network isolation?</summary>

VxLAN and containerized networks. VxLANs give you the ability to segregate networks with the same IP address scheme.

</details>
<details>
  
<summary>How much compute resources does a vnet container use?</summary>

The containers are designed to only have network functions running. The resources used to run them are extremely minimal.
  
</details>
<details>
  
<summary>Does a vnet have IPAM capabilities?</summary>

Only if the vnet is the router and/or dhcp server for the network.
  
</details>
<details>
  
<summary>Is Active Directory/LDAP or SAML supported?</summary>

No, to view a list of supported auth sources please see the [auth sources](/public/auth) wiki page.
  
</details>
<br>
<br>
<div style="text-align:center; margin-bottom:5px">
  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">🚗 Take a Test Drive Today!</button></a>
</div>



# Connect VergeIO  to an Existing LAN/WAN

<br>

Connecting to a network that exists outside of your VergeIO environment (such as an existing company LAN, or a WAN connection) requires a VergeIO  external network. Typically one external network is created during the VergeIO  system install and mapped to a physical network that is also defined during installation. Multiple Externals can be created to take advantage of multiple available phsicals. Additionally, more than one external network can be mapped to the same physical network, with each utilizing a different vLAN. The following instructions walk through creating an external network after install, from the VergeIO  UI; all settings are reviewed and thus can also be used to guide modifying the external network created during installation if needed.

<br>
<br>

## Create a New External Network

1.  From the Cloud Dashboard, select **Networks** from the left menu.
2.  Select **New External** from the left menu.
3.  Enter a ***Name*** for the network(required). The name should be something helpful for future administration. Note: spaces are not permitted.
4.  **Optionally**, a ***Description*** can be entered for the network.
5.  **Optionally**, a ***HA Group*** can be defined for the network. HA Groups define two or more networks to provide high availability. When multiple networks are assigned to the same HA Group, the system attempts to run the networks across different physical nodes to increase availability.
6.  Select the appropriate ***Layer 2 Type***:
    -   **vLan** (vlan id specified in Layer 2 ID field)
    -   **Bond\*** - supports switch ports configured for lag group-active/main physical device
    -   **Bond Slave\*** - supports switches configured for lag group-secondary device
    -   **none** \- simple direct connect
    -   **vxLan** (vxLan id specified in Layer 2 ID field)
7.  Enter a ***Layer 2 ID***, if applicable (vLAN /vxLAN)
8.  Enter the appropriate ***MTU size*** for the existing network.
9.  **Optionally**, a specific ***Cluster*** can be selected to specify the primary cluster where this vnet will run.
10.  **Optionally**, a specific ***Failover Cluster*** can be selected to specify a cluster on which to run if the primary is not available.
11.  **Optionally**, a ***Preferred node*** can be selected to specify a particular Node as a "first-choice" on which to run the vnet.
12.  **Optionally**, this network can be set to allow ***PXE*** boot for VergeIO  nodes (by default PXE is not enabled.)
13.  Select the appropriate ***Interface Network*** from the dropdown list of physical and external Networks. Typically, a physical network would be selected here; selecting an external (rather than a physical) would be for Q-in-Q (vlan inside of vlan).
14.  Select the appropriate ***IP Address Type***:
    -   **Static** - to specify a particular address for the network
    -   **Dynamic** - to configure the network as a DHCP client (This is only used in small test or archive systems as it will limit the network to a single address.)
    -   **BGP/OSPF**
    -   **None** - Layer 2 network connection
15.  Enter ***IP Address*** (Does not apply if Type Dynamic is selected.)
16.  Enter ***Network Address*** (in CIDR format) for the network, ex: 192.168.2.0/24
17.  Specify a ***DNS server list***; each entry separated by a comma. (ex: 10.10.25.3, 10.10.25.4)
18.  Select a ***DNS*** Setting:
    -   **Disabled** - no DNS management provided
    -   **Bind** \- for networks that will act as an authoritative DNS
    -   **Simple** - DNS provided for the network without holding actual DNS records
19.  Optionally, check the ***DHCP*** checkbox to run a DHCP server for the network's clients:
    -   **Domain Name** for this network (optional)
    -   **Gateway**
    -   **Hostname** (for this vNet's router)
    -   **Dynamic DHCP** option(checkbox) - when selected, DHCP start/stop addresses can be entered to specify the scope for dynamic allocation. Additionally DHCP sequential Addresses option (checkbox) can be selected to allocate addresses in a consecutive manner.
20.  Select action to be taken when power is restored to the network ***On Power Loss*** (This would be after a physical node power loss or for a tenant: after the tenant is powered off/on.)
    -   **Last State** - network will only be powered on if it was on at the time of power loss
    -   **Leave Off** - network will not be powered on when power is restored (regardless of its state at the time of power loss)
    -   **Power On** - network will be powered on when power is restored (regardless of its state at the time of power loss)
21.  **Optionally,** the following options (checkboxes) can be selected:
    -   ***Track Statistics*** for All Rules to automatically turn on tracking for all Rules applied to this network.
    -   ***Track DMZ Statistics*** to track total packets/bytes from this network through the DMZ network.
    -   ***Enable Rate Limiting on Routing*** to define limits on this overall network. (Example usage: consumption-based billing, etc.)
    -   ***Rate Limit*** overall throttle on network traffic
    -   ***Rate Type*** (ex: Packets per second, Megabytes per day, Bytes per Hour, etc.)
    -   ***Rate Limit Burst*** - allow this burst rate as long as the rate limit is staying within the averages defined.
22.  Click **Submit** to finish creation of the new network.
23.  The **dashboard** for the new network appears. Click **Power on** from the left menu to start the network.

<br>   



<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
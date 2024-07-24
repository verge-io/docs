

# Internal Networks (General Instructions)
Internal networks are originated within VergeIO; an internal network can be created as [**Layer3**](../ProductGuide/internal-layer3) (recommended)  or  [**Layer2**](../ProductGuide/internal-layer2)

<br>
<br>



## To Create an Internal Network

1.  From the Main Dashboard, select **Networks** from the left menu.
2.  Click the **Internals** quick-link.
3.  Click **New Internal** from the left menu.
4.  Enter a ***Name*** for the network (required). Note: spaces are not permitted.
5.  Enter a ***Description*** for the network (optional).
6.  Optionally, a ***HA Group*** can be specified. HA Groups define two or more networks to provide high availability. When multiple networks are assigned to the same HA Group, the system attempts to run the networks across different physical nodes to increase availability.
7.  Select a ***Cluster*** on which the network will run, or leave at the -- Default -- setting to use the system-defined default cluster (System -> Settings -> Advanced -> *Default cluster for networks*) .
8.  Select a ***Failover cluster*** to define a cluster to run the network when the primary cluster is unavailable -or- leave at the -- Default -- setting to use the system-defined default failover cluster (System -> Settings -> Advanced -> *Default failover cluster for networks*).
9.  Select a ***Preferred Node*** to specify a "first-choice" node for running this network -OR- leave at the -- Default -- setting to use the system-defined default for the preferred node.
10.  Select a ***Port Mirroring*** setting. The default value is Off. Port mirroring can be enabled to replicate network traffic to a VM NIC, allowing packet analysis:
    -   North/South - only mirror traffic that passes through the router
    -   East/West\* - mirror all traffic, including traffic between VMs in the network and traffic through the router
> East/West port mirroring is typically only recommended for short durations. See: [**Port Mirroring**](/public/ProductGuide/portmirroring) for additional instructions. {.is-info}  
    
11.  Select ***IP Address Type***:
    -   **static (default)** - creates a layer 3 network with routing, DNS, DHCP features available
    -   **None** - produces a simple layer2 network in which network administration is to be performed via third-party applications
    
> By default, a new internal network is assigned the address defined in System -> Settings -> Advanced -> Default internal network address. (The installed default for this setting is 192.168.0.0/24, with a static IP address of 192.168.0.1.) Since each internal network is a separate vxlan, unique network addresses are not necessarily required for each internal network that will remain behind NAT. However, where there are to be direct routes between internal networks, these networks must have different addressing. If network/IP address need to be changed from the default, check the Advanced Options checkbox to make modifications.  {.is-info} 
    
<br>

### Advanced Options
   
12.  Choose a ***DNS option***:
    -   **Bind** - run a full-featured DNS server (authoritative, etc)
    -   **Disabled** - do not run a DNS server but offer the DNS server list to DHCP clients
    -   **Other Network** - forward DNS requests to another network and auto-create A records for DHCP clients
    -   **Simple (default)** - run a forwarding DNS server(s). If no forwarding servers are listed, the default gateway network dns is used.
    
13.  If applicable, enter a ***DNS server list***:
- **To add a new entry:**
    -   An initial blank line will appear where a server address can be typed in.
    -   Additional entries can be added, as needed, by clicking the plus \[ \] button which will insert a new blank line where an address can be typed in.
    
- **To select and deselect entries for move/delete/edit:**
    -   Selection is a toggle: click an unselected entry to select it; click a selected entry to deselect it.
    -   Selected entries will display a check in the box at the left.
    -   Multiple entries can be selected for a delete or move.
    
- **To edit an existing server entry:**
    -   Click to select the desired entry for edit.
    -   Click the edit \[ \] button.
    -   The selected key appears and can be modified. When editing is complete, click the edit \[ \] button again to save the changes.
    
- **To delete an entry:**
    -   Click to select the desired entry for deletion.
    -   Click the delete \[ \] button.
    
- **To rearrange the order of entries:**
    -   Click to select entries to move.
    -   Click the up or down arrow \[ \] / \[ \] button to move the entries up or down one position at a time.

<br>

14.  Select an existing VergeIO network from the dropdown list as the ***Default Gateway*** -OR- leave set to -- None -- to not select a gateway.

> To give an Internal network access outside of this VergeIO Cloud (e.g. the Internet, external Corporate network), select the proper external network as the default gateway; an appropriate routing rule will be created automatically. If no default gateway is selected while creating the network, appropriate rules will need to be created manually to route through an external network.15.  The ***DHCP*** option is checked by default. This sets up a DHCP server and displays associated configuration options. {.is-success}


16.  The ***Monitor Gateway*** option can be selected to perform a continual ping of the gateway and report uptime to the UI. When this option is enabled, additional cards are added to the network dashboard displaying history of gateway quality and latency statistics.
17.  ***On Power Loss*** determines the action taken when power is restored to the network (This would be after a physical node power loss or in the case of a network within a tenant: after the tenant is powered off/on in VergeIO UI.)
    -   **Last State** - network will only be powered on if it was on at the time of power loss.
    -   **Leave Off** - network will not be powered on when power is restored (regardless of its state at the time of power loss).
    -   **Power On** - network will be powered on when power is restored (regardless of its state at the time of power loss).
18.  The ***Track Statistics For All Rules*** option allows tracking total packets/bytes, per rule, for all rules assigned to this network.  (Tracking does not apply to route rules.) 
19.  The ***Track DMZ Statistics*** option allows tracking total packets/bytes from this network through the DMZ network.
20.  The ***Trace/Debug Rules*** option traces all traffic through the firewall for diagnostic purposes.
21.  Optionally, the ***Enable Rate Limiting On Routing*** can be selected to to set a throttle on the network router.
    -   ***Rate Limit*** - limit amount.
    -   ***Rate Type*** - limit rate type, e.g. Megabytes Per Second.
    -   ***Rate Limit Burst*** - amount allowed when the rate exceeds the specified rate limit.
   
   
<br>   
    
### Network DHCP Options
The following options appear when the DHCP option is selected (checked): 

22.  Enter ***Domain name for this network*** (optional). This allows setting DNS domain name for guest VMs (fully qualified domain names(FQDN)).
23.  Optionally, a ***Gateway*** option can be defined for dhcp clients. By default, the network router address is used as the dhcp client gateway.
24.  The ***Dynamic DHCP*** option is enabled by default - allowing the network to assign dynamic addresses to hosts; this option can be disabled to only allow static addresses via the DHCP server.
> The following three fields only apply when *Dynamic DHCP* option is enabled: {.is-info}
-  ***DHCP Start Address*** defines the beginning of the DHCP scope (range of addresses to assign dynamically).
 - ***DHCP Stop Address*** defines the end of the DHCP scope (range of addresses to assign dynamically).
 - ***DHCP Sequential Addresses*** allows the option to assign dynamic addresses (from the scope defined with stop and start addresses,) in sequential order. Sequential DHCP addressing is generally not recommended as clients which allow a lease to expire are much more likely to obtain a different IP address.
 > Default (non-sequential) DHCP addressing allows IP to be chosen based on a hash of the client's MAC address, greatly increasing the chances that a client will receive the same IP again after a lease expire/re-lease. {.is-success}
 
<br>

<div style="text-align:center; margin-bottom:5px">

  <a href="https://www.verge.io/test-drive#Demo-Section"><button class="button-cta">Request Trial</button></a>
</div>
 
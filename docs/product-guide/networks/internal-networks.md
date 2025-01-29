# Internal Networks (General Instructions)

Internal networks are VNets originated within VergeOS; an internal network can be created as [**Layer3**](/product-guide/networks/internal-layer3) (typically recommended) or [**Layer2**](/product-guide/networks/internal-layer2).

## Create an Internal Network

1. From the Main Dashboard, select **Networks** from the left menu.
2. Click the **Internals** quick-link.
3. Click **New Internal** from the left menu.
4. Enter a **Name** for the network (required). Note: spaces are not permitted.
5. Enter a **Description** for the network (optional).
6. Optionally, a **HA Group** can be specified. HA Groups define two or more networks to provide high availability. When multiple networks are assigned to the same HA Group, the system attempts to run the networks across different physical nodes to increase availability.
7. Select a **Cluster** on which the network will run, or leave at the ***-- Default --*** setting to use the system-defined default cluster (System > Settings > Advanced > *Default cluster for networks*).
8. Select a **Failover cluster** to define a cluster to run the network when the primary cluster is unavailable -or- leave at the ***-- Default --*** setting to use the system-defined default failover cluster (System > Settings > Advanced > *Default failover cluster for networks*).
9. Select a **Preferred Node** to specify a "first-choice" node for running this network -OR- leave at the ***-- Default --*** setting to use the system-defined default for the preferred node.
10. Select a **Port Mirroring** setting. The default value is ***Off***. Port mirroring can be enabled to replicate network traffic to a VM NIC, allowing packet analysis:
    - ***North/South*** - only mirror traffic that passes through the router
    - ***East/West*** - mirror all traffic, including traffic between VMs in the network and traffic through the router
!!! info "East/West port mirroring is typically only recommended for short durations. See: [**Port Mirroring**](/product-guide/networks/port-mirroring) for additional instructions."

11. Select **IP Address Type**:
    - ***static (default)*** - creates a layer 3 network with routing, DNS, DHCP features available
    - ***None*** - produces a simple layer2 network in which network administration is to be performed via third-party applications
!!! tip "Advanced Options"
    By default, a new internal network is assigned the address defined in System > Settings > Advanced > Default internal network address. (The installed default for this setting is 192.168.0.0/24, with a static IP address of 192.168.0.1.) Since each internal network is a separate VXLAN, unique network addresses are not necessarily required for each internal network that will remain behind NAT. However, where there are to be direct routes between internal networks, these networks must have different addressing. If network/IP address need to be changed from the default, check the Advanced Options checkbox to make modifications.

12. Choose a **DNS option**:
      - ***Bind*** - run a full-featured DNS server (authoritative, etc)
      - ***Disabled*** - do not run a DNS server but offer the DNS server list to DHCP clients
      - ***Other Network*** - forward DNS requests to another network and auto-create A records for DHCP clients
      - ***Simple (default)*** - run a forwarding DNS server(s). If no forwarding servers are listed, the default gateway network DNS is used

13. If applicable, enter a **DNS server list**.  The list management interface provides these functions:
    - **Add Entry** - Click the + icon to insert a new line
    - **Edit Entry** - Select an entry and click the pencil icon
    - **Delete Entry** - Select an entry and click the trash icon
    - **Select Multiple** - Click entries to toggle selection for bulk operations

14. Select an existing VergeOS network from the dropdown list as the **Default Gateway** -OR- leave set to ***-- None --*** to not select a gateway.
!!! success "To give an internal network access outside of this VergeOS cloud (e.g. the Internet, external corporate network), select the proper external network as the default gateway; an appropriate routing rule will be created automatically. If no default gateway is selected while creating the network, appropriate rules will need to be created manually to route through an external network."

15. The **DHCP** option is checked by default. This sets up a DHCP server and displays associated configuration options.

16. The **Monitor Gateway** option can be selected to perform a continual ping of the gateway and report uptime to the UI. When this option is enabled, additional cards are added to the network dashboard displaying history of gateway quality and latency statistics.

17. **On Power Loss** determines the action taken when power is restored to the network (This would be after a physical node power loss or in the case of a network within a tenant: after the tenant is powered off/on in VergeOS UI.)
    - ***Last State*** - network will only be powered on if it was on at the time of power loss
    - ***Leave Off*** - network will not be powered on when power is restored (regardless of its state at the time of power loss)
    - ***Power On*** - network will be powered on when power is restored (regardless of its state at the time of power loss)

18. The **Track Statistics For All Rules** option allows tracking total packets/bytes, per rule, for all rules assigned to this network. (Tracking does not apply to route rules.)

19. The **Track DMZ Statistics** option allows tracking total packets/bytes from this network through the DMZ network.

20. The **Trace/Debug Rules** option traces all traffic through the firewall for diagnostic purposes.

21. Optionally, the **Enable Rate Limiting On Routing** can be selected to set a throttle on the network router.
    - **Rate Limit** - limit amount
    - **Rate Type** - limit rate type, e.g. Megabytes Per Second
    - **Rate Limit Burst** - amount allowed when the rate exceeds the specified rate limit

22. **Network DHCP Options** - The following options appear when the DHCP option is selected (checked):
    - Enter **Domain name for this network** (optional). This allows setting DNS domain name for guest VMs (fully qualified domain names(FQDN)).

    - Optionally, a **Gateway** option can be defined for DHCP clients. By default, the network router address is used as the DHCP client gateway.

    - The **Dynamic DHCP** option is enabled by default - allowing the network to assign dynamic addresses to hosts; this option can be disabled to only allow static addresses via the DHCP server.

23. **Dynamic DHCP Options** -The following three fields apply when the *Dynamic DHCP* option is enabled:
    - **DHCP Start Address** defines the beginning of the DHCP scope (range of addresses to assign dynamically)
    - **DHCP Stop Address** defines the end of the DHCP scope (range of addresses to assign dynamically)
    - **DHCP Sequential Addresses** allows the option to assign dynamic addresses (from the scope defined with stop and start addresses) in sequential order.
!!! success "Default (non-sequential) DHCP addressing allows IP to be chosen based on a hash of the client's MAC address, greatly increasing the chances that a client will receive the same IP again after a lease expire/re-lease."

24. When configuration is complete, click **Submit** to complete network creation.

# Create a DHCP Static Lease

A network with the **Dynamic DHCP** option enabled will automatically assign IP addresses to clients. For virtual machines where it's advantageous to ensure the same address is always assigned, you can create a static IP address assigned to the associated MAC address.

**A Static Address can be assigned in one of two ways:**

- **Change a Dynamic Entry to Static**  
After the VM has already received a DHCP address and currently still holds the lease, designate the address to be static from now on.

- **Create a New Static Entry**  
Create a new IP address entry, specifying the MAC address from the VM NIC and the desired IP address.

## Change a Dynamic Entry to Static

1. From the Network Dashboard, click **IP Addresses** on the left menu.
2. Find the DHCP address, appearing in the IP Addresses listing as type "Dynamic"
3. Double-click the entry and change the **Type** to ***Static***.
4. Click **Submit** to save the change.

## Create a New Static Entry

1. Obtain the MAC address (within the guest OS or from the VM Dashboard-NICs section.)
2. From the Network Dashboard, click **New** from the left menu.
3. In the **Type** field, select ***Static***.
4. Enter the desired **IP Address**.
!!! warning "Make sure to assign an IP address that is within the network's address range and not used by another VM on this network."
5. Enter the **MAC Address**.
6. Enter the **Hostname** of the server.
7. Optionally, a **Description** can be entered to record additional administrative information.
8. Click **Submit**.

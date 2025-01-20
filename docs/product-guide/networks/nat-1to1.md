# Configuring NAT 1-to-1 translation

Before creating the translate rule to NAT an external IP to an internal IP:

- [**Define a static (private) IP for the destination VM**](/product-guide/networks/dhcp-static-lease)
- [**Assign an external IP to the internal network**](/product-guide/networks/assign-external-ip)

## Create a Translate Rule to NAT External IP to Internal IP

1. From the **Internal network Dashboard**, click **Rules** on the left menu.
2. Click **New**.
3. Enter a **Name** that will be helpful to future administration.
4. Optionally, a **Description** can be entered to record additional administration information.
5. In the **Action** dropdown, select ***Translate***.
6. In the **Protocol** dropdown, select ***ANY***.
7. In the **Direction** dropdown, select ***Incoming***.
8. **Define Source:** In the **Type** dropdown, select ***Any/None***.
9. **Define Destination:**  
    - In the **Type** dropdown, select ***My IP Addresses***.  
    - In the **IP Address** dropdown, select the external IP address.
10. **Define Target:**
    - In the **Type** dropdown, select ***My IP Addresses***.
    - In the **IP Address** dropdown, select the internal IP address (that was given a static IP address assignment).
11. Click **Submit** to save the rule.
12. Click **Apply Rules** on the left menu to put the new rule into effect.

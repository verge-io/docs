# Assigning External IP Addresses to a Tenant

External IP addresses can be assigned to tenants. When an external IP is assigned, appropriate routing rules are created automatically.

## To Assign an External IP to a Tenant

1. Navigate to the appropriate host **external network dashboard**; this should be the external network where the tenant has external access. In most cases this will be the network named "External".
2. Click **IP Addresses** on the left menu.
3. Click **New**.
4. In the ***Type*** field, select **Virtual IP**.
5. In the ***IP Address*** field, enter the **external IP Address**.
6. ***Hostname*** can be left blank.
7. **Optionally**, a ***Description*** can be entered to record additional administrative information.
8. In the ***Owner Type*** dropdown list, select **Tenant**.
9. In the ***Owner*** dropdown list, select the **name of the tenant**.
10. Click **Submit** at the bottom of the page.
11. From the **external network dashboard**, click **Apply Rules** on the left menu (to apply to the host external network). ***Hint:** To return to the external network dashboard you can click the appropriate breadcrumb at the top or use the browser back button.*
12. Navigate to the **Tenant Network Dashboard** (Main Dashboard -> Networks -> Tenant Networks -> double click the tenant network).
13. Click **Apply Rules** (to apply to the tenant network).

</br>

[Get vergeOS license keys](https://www.verge.io/test-drive){ target="_blank" .md-button }
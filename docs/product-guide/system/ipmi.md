
# IPMI

IPMI is a universal standard, supported by almost all hardware, for managing and accessing servers. It is accessible even when a server is powered off and allows for remotely controlling servers and monitoring hardware status, including things such as temperature, power consumption, voltage, hardware errors, etc. VergeOS integrates with IPMI to provide for remote server power control (power on, power cycle, etc.) and convenient access via the VergeOS user interface.

!!! info
    Because IPMI deals with physical hardware, it only applies to host level nodes (not tenant nodes).

## Test IPMI Connectivity

1. Navigate to **Infrastructure** > **Nodes** from the top menu.
2. **Double-click the desired node** to access the node dashboard.
3. Under the **IPMI** submenu, click **Test** on the left menu.

### IPMI Connection Status

The node dashboard will indicate IPMI ***status*** and ***date/time of last time connected***:

- **IPMI Status** - "OK" indicates that the last attempt to connect was successful. If the last attempt was unsuccessful, an error message is displayed.

- **IPMI Last Connected** - displays the last date/time the VergeOS system successfully connected to IPMI. (If there was never a successful IPMI connection, the field will report "NA".)

## Change Stored IPMI login credentials

!!! tip
    The following instructions provide for changing the IPMI credentials a node will use to interface with IPMI. Changing these fields does not perform IPMI user administration; connect to your IPMI web interface to add or change IPMI users.

1. From the Node Dashboard, click **Edit** on the from the left menu.
2. Enter a valid ***IPMI User***. (IPMI user should have administrator-level privileges.)
3. Enter ***IPMI Password***.
4. Click **Submit** to save the changes to the node.

## Access the IPMI Web Interface

!!! info
    Successfully connecting to the IPMI web interface through the VergeOS user interface requires valid IPMI username/password is stored and appropriate networking configuration is in place for the system to interact with the node's IPMI.

1. Navigate to **Infrastructure** > **Nodes** from the top menu.
2. **Double-click the desired node** to access the node dashboard.
3. Under the **IPMI** submenu on the left menu, click **Connect**.
4. A new browser tab is opened to the IPMI web interface login page.

# Network Dashboards

Network Dashboards provide a wealth of helpful information: data that can assist to monitor, tune, and troubleshoot networks in your system. They provide at-a-glance information and allow many clickable areas for "drilling down" to access more specific information where needed. There is a Networks Dashboard that displays summary information for all your Networks and links to more detailed information, such as the Dashboard for any individual Network.

## The Networks Dashboard (all Networks)

The Networks Dashboard contains summary information for all the networks in the system.

**To access the Networks Dashboard:**  
Select **Networks** > **Dashboard** from the top menu.

### Counts / Quick-Links

The *Counts* section shows a quick summary of your different types of networks as well as all Machine NICs. Each box shows the count/status for the associated list and provides a quick-link to access the corresponding list, where a specific network/NIC can be selected to view more detailed information.

### Status Indicators

* Green - No errors or warnings
* Yellow - Warnings
* Red - Errors
* Grey - Disabled / Turned Off

When red or yellow indicators are present, there are errors or warnings; you can click the card to drill down and find more information about the issue.

### Top Stats

The Networks Dashboard also displays real-time statistical information with a current view of top network utilization. This gives a summary of highest transfer/receive rates broken out for: External, Internal, Tenant Networks, and VM NICs.

Each individual Network/NIC list entry:

* Reflects current status (e.g. running, stopped)
* Is a clickable link to that individual Network/NIC

### Logs

The Logs section will show the most recent log entries for all your VergeOS Networks. Error entries are highlighted in red, Warning entries are highlighted yellow. Scroll down to view all the log entries on the first page. To view further back in network logs, click anywhere in the logs section.

## Individual Network Dashboards

Each individual Network has its own Dashboard to show summary information about that particular Network with links to more detailed information.

### To Access an individual Network Dashboard:

1. From the Networks Dashboard, **click on one of the Count Quick-links**:  

    * Externals
    * Internals
    * Tenants
    * All Networks

2. When you click on one of the above quick-links a listing of the corresponding networks will appear. From the listing, **double-click on the desired Network**.

## Network Graphs

**To see more granular detail on graphs:** Click and drag a subset of the graph to see more detail for that selected timeframe.
Double-click to back out to the original detail level.

### Network Statistics and History

Network Statistics are collected in 5-second "heartbeat" intervals, with sums/averages/maxes processed and stored for each 5-minute interval, corresponding to 95th percentile standards.

Click the **History Link** on the left menu to see network traffic statistics going farther back. A specific time period can be selected to view that desired period (week, month, or custom- with from / to specific dates).  

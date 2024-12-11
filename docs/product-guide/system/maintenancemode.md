# Maintenance Mode

Maintenance Mode prepares a node to be taken offline. **Maintenance Mode should be used prior to any operation that will include a reboot / powercycle or will otherwise render the node unavailable.**

## Putting a Node into Maintenance Mode

When a node is put into Maintenance Mode, the system attempts to gracefully migrate all workloads (including virtual machines, tenant nodes, vNet containers) to different nodes within the cluster.

!!! note
    VMs that cannot be migrated, e.g. those containing GPU devices or employing virtualization passthrough (CPU type = host processor), need to be powered down and restarted on another suitable node or powered on again when the node maintenance is completed. Setting a VM's Migration Method = Automatic allows the system to automatically power down a non-migratable VM when a node is put into maintenance; otherwise, the VM will need to be powered down manually.

!!! warning
    Before starting any maintenance, verify node servers can be reached via a backup method, i.e. physical console or ipmi access.

1. From the main dashboard, click **Nodes**.
2. **Double-click the desired node** in the list.
3. Click **Enable Maintenance** on the left menu.

    The system will only allow putting a node into Maintenance Mode when proper conditions are detected, such as: all other nodes are running, no nodes currently in maintenance mode, no drive repairs in progress, sufficient memory in place for redundancy, etc.

4. A Confirmation message will appear. Click **Yes** to continue with placing the node into Maintenance Mode.
5. **Monitor Progress.** The node dashboard will provide information about the Maintenance Mode progress:

    - **Node Logs**
    
        Scroll to the bottom of the node dashboard to view node logs. A log entry will appear for each machine the system attempts to migrate. A log entry indicating the status is now *'Maintenance Mode'* indicates when the maintenance process completes successfully. 

        ![Node log complete](/public/userguide-sshots/nodelogcomplete.png)

        If any machines could not be migrated, an error entry will appear in the node logs; those machines will need to be powered off manually; see note above regarding Non-Migratable workloads.

        ![Node log error migrating](/public/userguide-sshots/nodelog-errormigrating.png)

    - **Running Machines**
    
        The *Running Machines* section indicates workloads currently on the node, both running and migrating. To successfully move into maintenance mode, all running machines need to be migrated or powered off; the Running Machines section will be empty when this has occurred. 

        ![Running machines - one migrating](/public/userguide-sshots/runningmachines-onemigrating.png)

    - **Node Status**
    
        Node Status is displayed at the top of the node dashboard. While a node is in the process of migrating workloads, a status of ***"Migrating"*** is displayed.

        ![Node status migrating](/public/userguide-sshots/nodestatusmigrating.png)

        A status of ***"Maintenance Mode"*** indicates that all workloads have been successfully migrated/powered off.

        ![Node status maintenance mode](/public/userguide-sshots/nodestatusmaintenancemode.png)

6. After verifying the ***Node Status*** displays **Maintenance Mode**, perform maintenance operations, using the **Reboot** **\-And/Or-** **Power Off** options (on the left menu of the node dashboard) as needed.

7. **After all service is completed** and the node is ready to be utilized again, **take the node out of Maintenance Mode** so it can service workloads again.

## Taking a Node out of Maintenance Mode

!!! info
    Take a node out of maintenance **when all powercycle/reboot operations are complete** and it is ready to come back into service.

1. From the **node dashboard**, click **Disable Maintenance** on the left menu.
2. A Confirmation message will appear. Click **Yes** to continue taking the node out of Maintenance Mode.
3. The ***Node Status*** displays "Leaving Maintenance" while in the process of coming out of Maintenance Mode. 

    ![Node status leaving maintenance](/public/userguide-sshots/nodestatusleavingmaint.png)

4. The ***Node Status*** field will display "Running" when it has fully come out of Maintenance Mode and workloads have been migrated back to the node. 

    ![Node status running](/public/userguide-sshots/nodestatusrunning.png)

5. If necessary, **power on any non-migratable VMs or tenant nodes that were shutdown for maintenance**.
